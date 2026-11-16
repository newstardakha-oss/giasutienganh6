import fs from 'fs';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import { EventEmitter } from 'events';
import express from 'express';
import {
  AppDataSchema,
  StudentAccount,
  TeacherAccount,
  AuditLogEntry,
  AuditLogSnapshotItem,
} from '../types';
import {
  normalizeClassName,
  normalizeFullName,
  normalizeSchoolName,
  getCanonicalSchoolsDirectory,
  resolveCanonicalLocationStrict,
  buildCanonicalClassId,
  createAuditLogEntry,
  appendAuditLog,
  pruneExpiredAuditLogs,
  runDirectoryCodeMigration,
  undoBulkActionByAuditLog,
  hashPasswordSync,
  generateRecoveryCode,
  suggestAvailableUsernames,
  MAX_EXPORT_STUDENTS_LIMIT,
  getDefaultAdminTeacher,
  ensureDefaultAdminTeacher,
} from './storage';
import { SGK_UNITS, DEMO_QUESTIONS, INITIAL_PROGRESS } from '../data/sgkData';

const DATA_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), 'giasu_ai_english6_data')
  : path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'server_store.json');
const BACKUP_FILE = path.join(DATA_DIR, 'server_store.backup.json');
const TOKEN_SECRET = process.env.SESSION_SECRET || 'giasu_ai_english6_hmac_secret_2026';
const SSE_TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes
const SESSION_TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export interface AuthSessionPayload {
  sub: string; // teacherId or studentId
  role: 'admin' | 'teacher' | 'student';
  schoolId?: string;
  managedClasses?: string[];
  purpose: 'session' | 'sse';
  exp: number;
}

/**
 * Pluggable Pub/Sub Bus for Multi-Instance SSE Synchronization.
 * In single-node mode, uses Node EventEmitter.
 * In multi-instance mode (horizontal scaling), connect Redis Pub/Sub or Postgres LISTEN/NOTIFY
 * to `publishClusterEvent` / `onClusterEvent` so every instance pushes SSE updates to its connected clients.
 */
class ClusterEventBus extends EventEmitter {
  public instanceId = `inst_${process.pid}_${Math.random().toString(36).slice(2, 6)}`;

  publishStateChange(event: {
    revision: number;
    eventType: string;
    schoolId?: string;
    classId?: string;
    timestamp: string;
  }) {
    this.emit('state_change', { ...event, originInstance: this.instanceId });
  }
}

export const clusterBus = new ClusterEventBus();
clusterBus.setMaxListeners(500);

// In-memory Single Source of Truth + Composite Indexes
let memoryStore: AppDataSchema | null = null;

interface CompositeIndexes {
  bySchoolId: Map<string, string[]>; // schoolId -> studentId[]
  bySchoolAndClass: Map<string, string[]>; // `${schoolId}__${className}` -> studentId[]
  byProvinceCode: Map<string, string[]>; // provinceCode -> studentId[]
  byCommuneCode: Map<string, string[]>; // communeCode -> studentId[]
  byStudentId: Map<string, StudentAccount>;
  byUsername: Map<string, string>; // lowerUsername -> studentId
}

let memoryIndexes: CompositeIndexes = {
  bySchoolId: new Map(),
  bySchoolAndClass: new Map(),
  byProvinceCode: new Map(),
  byCommuneCode: new Map(),
  byStudentId: new Map(),
  byUsername: new Map(),
};

function createEmptyStore(): AppDataSchema {
  return {
    units: SGK_UNITS,
    questions: DEMO_QUESTIONS,
    sessions: [],
    progress: { ...INITIAL_PROGRESS },
    students: [],
    currentStudentId: null,
    isTeacherLoggedIn: false,
    currentTeacherId: null,
    teachers: [getDefaultAdminTeacher()],
    activationCodes: [],
    customClasses: [],
    schools: getCanonicalSchoolsDirectory({}),
    customCommunes: {},
    classCurrentUnits: { DEFAULT: 'unit-1' },
    auditLogs: [],
    unmappedMigrationQueue: [],
    revision: 1,
    teacherAccount: getDefaultAdminTeacher(),
    settings: {
      geminiApiKey: '',
      selectedModel: 'gemini-3.6-flash',
      soundEnabled: true,
      speechSpeed: 1.0,
      theme: 'light',
      autoSave: true,
    },
    customDocuments: [],
  };
}

function rebuildIndexes(store: AppDataSchema) {
  const bySchoolId = new Map<string, string[]>();
  const bySchoolAndClass = new Map<string, string[]>();
  const byProvinceCode = new Map<string, string[]>();
  const byCommuneCode = new Map<string, string[]>();
  const byStudentId = new Map<string, StudentAccount>();
  const byUsername = new Map<string, string>();

  const pushMap = (map: Map<string, string[]>, key: string | undefined, id: string) => {
    if (!key) return;
    const arr = map.get(key);
    if (arr) arr.push(id);
    else map.set(key, [id]);
  };

  for (const st of store.students) {
    byStudentId.set(st.id, st);
    if (st.username) {
      byUsername.set(st.username.trim().toLowerCase(), st.id);
    }
    pushMap(bySchoolId, st.schoolId, st.id);
    pushMap(byProvinceCode, st.provinceCode, st.id);
    pushMap(byCommuneCode, st.communeCode, st.id);
    if (st.schoolId && st.className) {
      const cKey = buildCanonicalClassId(st.schoolId, st.className);
      pushMap(bySchoolAndClass, cKey, st.id);
    }
  }

  memoryIndexes = {
    bySchoolId,
    bySchoolAndClass,
    byProvinceCode,
    byCommuneCode,
    byStudentId,
    byUsername,
  };
}

export function getServerStore(): AppDataSchema {
  if (memoryStore) return memoryStore;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryStore = {
        ...createEmptyStore(),
        ...parsed,
        teachers: ensureDefaultAdminTeacher(Array.isArray(parsed.teachers) ? parsed.teachers : []),
        schools: getCanonicalSchoolsDirectory({
          schools: parsed.schools,
          customCommunes: parsed.customCommunes,
        }),
        auditLogs: pruneExpiredAuditLogs(parsed.auditLogs || []),
        revision: parsed.revision || 1,
      };
      rebuildIndexes(memoryStore);
      return memoryStore;
    }
  } catch (err) {
    console.error('Failed to load server store:', err);
  }
  memoryStore = createEmptyStore();
  rebuildIndexes(memoryStore);
  saveServerStore(memoryStore, 'INIT', false);
  return memoryStore;
}

export function saveServerStore(
  nextStore: AppDataSchema,
  eventType: string = 'UPDATE',
  bumpRevision: boolean = true,
  scope?: { schoolId?: string; classId?: string }
): AppDataSchema {
  const updated: AppDataSchema = {
    ...nextStore,
    auditLogs: pruneExpiredAuditLogs(nextStore.auditLogs || []),
    revision: bumpRevision ? (nextStore.revision || 0) + 1 : nextStore.revision || 1,
  };
  memoryStore = updated;
  rebuildIndexes(updated);

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tmpFile = `${STORE_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(updated, null, 2), 'utf-8');
    fs.renameSync(tmpFile, STORE_FILE);
  } catch (err) {
    console.warn('Server store disk persistence skipped (read-only/serverless env):', (err as any)?.message);
  }

  if (bumpRevision) {
    clusterBus.publishStateChange({
      revision: updated.revision || 1,
      eventType,
      schoolId: scope?.schoolId,
      classId: scope?.classId,
      timestamp: new Date().toISOString(),
    });
  }
  return updated;
}

export function backupServerStoreBeforeMigration(): string {
  const current = getServerStore();
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(current, null, 2), 'utf-8');
  } catch {
    // ignore in read-only env
  }
  return BACKUP_FILE;
}

// ===== HMAC TOKEN & COOKIE HELPERS =====
export function signAuthToken(payload: Omit<AuthSessionPayload, 'exp'>, ttlMs?: number): string {
  const fullPayload: AuthSessionPayload = {
    ...payload,
    exp: Date.now() + (ttlMs ?? (payload.purpose === 'sse' ? SSE_TOKEN_TTL_MS : SESSION_TOKEN_TTL_MS)),
  };
  const dataB64 = Buffer.from(JSON.stringify(fullPayload), 'utf-8').toString('base64url');
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(dataB64).digest('base64url');
  return `${dataB64}.${sig}`;
}

export function verifyAuthToken(token?: string | null): AuthSessionPayload | null {
  if (!token || !token.includes('.')) return null;
  const [dataB64, sig] = token.split('.');
  if (!dataB64 || !sig) return null;
  const expectedSig = crypto.createHmac('sha256', TOKEN_SECRET).update(dataB64).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const parsed = JSON.parse(Buffer.from(dataB64, 'base64url').toString('utf-8')) as AuthSessionPayload;
    if (!parsed.exp || Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  cookieHeader.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx > 0) {
      const k = pair.slice(0, idx).trim();
      const v = pair.slice(idx + 1).trim();
      out[k] = decodeURIComponent(v);
    }
  });
  return out;
}

/**
 * Resolve current caller session from Authorization Bearer, HttpOnly cookie, or SSE query token.
 * Always re-reads the live teacher record from Server Store so revoked/updated managedClasses take effect immediately.
 */
export function resolveCallerSession(req: express.Request): AuthSessionPayload | null {
  const authHeader = req.headers.authorization;
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const cookies = parseCookies(req.headers.cookie);
  const queryToken = typeof req.query.token === 'string' ? req.query.token : null;

  const rawToken = bearer || cookies['giasu_session'] || queryToken;
  const verified = verifyAuthToken(rawToken);
  if (!verified) return null;

  const store = getServerStore();
  if (verified.role === 'student') {
    return verified;
  }

  const teacher = store.teachers.find((t) => t.id === verified.sub && t.isActive);
  if (!teacher) return null;

  const context = { schools: store.schools || [], customCommunes: store.customCommunes || {} };
  const resolvedSchoolId =
    teacher.schoolId ||
    (() => {
      const r = resolveCanonicalLocationStrict(context, {
        provinceName: teacher.provinceName,
        communeName: teacher.communeName,
        schoolName: teacher.schoolName,
      });
      return r.mapped ? r.schoolId : undefined;
    })();

  return {
    sub: teacher.id,
    role: teacher.role,
    schoolId: resolvedSchoolId,
    managedClasses: (teacher.managedClasses || []).map((c) => normalizeClassName(c)),
    purpose: verified.purpose,
    exp: verified.exp,
  };
}

/**
 * RLS Helper: Check if a teacher session can access a specific student
 */
export function canTeacherAccessStudent(
  session: AuthSessionPayload,
  student: StudentAccount
): boolean {
  if (session.role === 'admin') return true;
  if (session.role !== 'teacher') return false;
  if (!session.schoolId || !student.schoolId || session.schoolId !== student.schoolId) {
    return false;
  }
  const managed = new Set((session.managedClasses || []).map((c) => normalizeClassName(c)));
  const normClass = normalizeClassName(student.className);
  return managed.has(normClass) || Boolean(student.classId && managed.has(student.classId));
}

// ===== REGISTER MANAGEMENT & SSE ROUTES ON EXPRESS APP =====
export function registerManagementRoutes(app: express.Express) {
  // 0. Issue Auth Session / Cookie or Sync Initial Client Store if Server Store is empty
  app.post(['/api/auth/session', '/auth/session'], (req, res) => {
    const { actorType, actorId, clientStoreSnapshot } = req.body || {};
    let store = getServerStore();

    // Merge clientStoreSnapshot teachers & students into server store so prior browser registrations are never lost
    if (
      clientStoreSnapshot &&
      (Array.isArray(clientStoreSnapshot.teachers) || Array.isArray(clientStoreSnapshot.students))
    ) {
      const teacherMap = new Map<string, TeacherAccount>();
      store.teachers.forEach((t) => teacherMap.set(t.id, t));
      (clientStoreSnapshot.teachers || []).forEach((ct: TeacherAccount) => {
        if (ct && ct.id) {
          teacherMap.set(ct.id, { ...(teacherMap.get(ct.id) || {}), ...ct });
        }
      });

      const studentMap = new Map<string, StudentAccount>();
      store.students.forEach((s) => studentMap.set(s.id, s));
      (clientStoreSnapshot.students || []).forEach((cs: StudentAccount) => {
        if (cs && cs.id) {
          const existing = studentMap.get(cs.id);
          if (!existing || (cs.sessions?.length || 0) >= (existing.sessions?.length || 0)) {
            studentMap.set(cs.id, { ...(existing || {}), ...cs });
          }
        }
      });

      store = saveServerStore(
        {
          ...store,
          teachers: ensureDefaultAdminTeacher(Array.from(teacherMap.values())),
          students: Array.from(studentMap.values()),
          schools: getCanonicalSchoolsDirectory({
            schools: [...(store.schools || []), ...(clientStoreSnapshot.schools || [])],
            customCommunes: {
              ...(store.customCommunes || {}),
              ...(clientStoreSnapshot.customCommunes || {}),
            },
          }),
          customCommunes: {
            ...(store.customCommunes || {}),
            ...(clientStoreSnapshot.customCommunes || {}),
          },
          customClasses: Array.from(
            new Set([...(store.customClasses || []), ...(clientStoreSnapshot.customClasses || [])])
          ),
          activationCodes:
            (clientStoreSnapshot.activationCodes || []).length > store.activationCodes.length
              ? clientStoreSnapshot.activationCodes
              : store.activationCodes,
          classCurrentUnits: {
            ...(store.classCurrentUnits || { DEFAULT: 'unit-1' }),
            ...(clientStoreSnapshot.classCurrentUnits || {}),
          },
        },
        'BOOTSTRAP_MERGE',
        false
      );
    }

    if (actorType === 'student') {
      const student = store.students.find((s) => s.id === actorId);
      if (!student) {
        return res.status(401).json({ error: 'Học sinh không hợp lệ.' });
      }
      const token = signAuthToken({
        sub: student.id,
        role: 'student',
        schoolId: student.schoolId,
        purpose: 'session',
      });
      res.setHeader(
        'Set-Cookie',
        `giasu_session=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=43200`
      );
      return res.json({ token, role: 'student', revision: store.revision || 1 });
    }

    if (actorType === 'teacher') {
      const teacher = store.teachers.find((t) => t.id === actorId && t.isActive);
      if (!teacher) {
        return res.status(401).json({ error: 'Giáo viên không tồn tại hoặc đã bị khoá.' });
      }
      const token = signAuthToken({
        sub: teacher.id,
        role: teacher.role,
        schoolId: teacher.schoolId,
        managedClasses: teacher.managedClasses,
        purpose: 'session',
      });
      const sseToken = signAuthToken(
        {
          sub: teacher.id,
          role: teacher.role,
          schoolId: teacher.schoolId,
          managedClasses: teacher.managedClasses,
          purpose: 'sse',
        },
        SSE_TOKEN_TTL_MS
      );
      res.setHeader(
        'Set-Cookie',
        `giasu_session=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=43200`
      );
      return res.json({
        token,
        sseToken,
        role: teacher.role,
        schoolId: teacher.schoolId,
        managedClasses: teacher.managedClasses,
        revision: store.revision || 1,
      });
    }

    return res.status(400).json({ error: 'Thiếu thông tin phiên đăng nhập.' });
  });

  // Issue short-lived SSE token (5 minutes TTL)
  app.post(['/api/auth/sse-token', '/auth/sse-token'], (req, res) => {
    const session = resolveCallerSession(req);
    if (!session || session.role === 'student') {
      return res.status(403).json({ error: 'Forbidden: Chỉ Giáo viên/Admin được mở kênh SSE quản lý.' });
    }
    const sseToken = signAuthToken(
      {
        sub: session.sub,
        role: session.role,
        schoolId: session.schoolId,
        managedClasses: session.managedClasses,
        purpose: 'sse',
      },
      SSE_TOKEN_TTL_MS
    );
    return res.json({ sseToken, expiresInMs: SSE_TOKEN_TTL_MS });
  });

  // Allow client to sync new student/teacher registration to server single source of truth
  app.post(['/api/sync/register-entity', '/sync/register-entity'], (req, res) => {
    const { entityType, entity, schools, customCommunes } = req.body || {};
    let store = getServerStore();
    if (schools || customCommunes) {
      store = {
        ...store,
        schools: getCanonicalSchoolsDirectory({
          schools: schools || store.schools,
          customCommunes: customCommunes || store.customCommunes,
        }),
        customCommunes: customCommunes || store.customCommunes,
      };
    }

    if (entityType === 'student' && entity && entity.id) {
      const loc = resolveCanonicalLocationStrict(store, {
        provinceCode: entity.provinceCode,
        communeCode: entity.communeCode,
        schoolId: entity.schoolId,
        provinceName: entity.provinceName,
        communeName: entity.communeName,
        schoolName: entity.schoolName,
        className: entity.className,
        requireClass: true,
      });
      const enriched: StudentAccount = loc.mapped
        ? {
            ...entity,
            provinceCode: loc.provinceCode,
            provinceName: loc.provinceName,
            communeCode: loc.communeCode,
            communeName: loc.communeName,
            schoolId: loc.schoolId,
            schoolName: loc.schoolName,
            className: loc.className!,
            classId: loc.classId,
            migrationStatus: 'mapped',
          }
        : { ...entity, migrationStatus: 'pending_review' };

      const exists = store.students.some((s) => s.id === enriched.id);
      const nextStudents = exists
        ? store.students.map((s) => (s.id === enriched.id ? enriched : s))
        : [enriched, ...store.students];

      const saved = saveServerStore(
        { ...store, students: nextStudents },
        'STUDENT_REGISTERED',
        true,
        { schoolId: enriched.schoolId, classId: enriched.classId }
      );
      return res.json({ ok: true, revision: saved.revision, student: enriched });
    }

    if (entityType === 'teacher' && entity && entity.id) {
      const loc = resolveCanonicalLocationStrict(store, {
        provinceCode: entity.provinceCode,
        communeCode: entity.communeCode,
        schoolId: entity.schoolId,
        provinceName: entity.provinceName,
        communeName: entity.communeName,
        schoolName: entity.schoolName,
        requireClass: false,
      });
      const isFirstAdmin = !store.teachers.some((t) => t.role === 'admin' && t.isActive);
      const enriched: TeacherAccount = {
        ...entity,
        role: isFirstAdmin ? 'admin' : entity.role === 'admin' ? 'admin' : 'teacher',
        managedClasses: isFirstAdmin ? entity.managedClasses || [] : [],
        provinceCode: loc.mapped ? loc.provinceCode : entity.provinceCode,
        provinceName: loc.mapped ? loc.provinceName : entity.provinceName,
        communeCode: loc.mapped ? loc.communeCode : entity.communeCode,
        communeName: loc.mapped ? loc.communeName : entity.communeName,
        schoolId: loc.mapped ? loc.schoolId : entity.schoolId,
        schoolName: loc.mapped ? loc.schoolName : entity.schoolName,
        migrationStatus: loc.mapped ? 'mapped' : 'pending_review',
      };
      const exists = store.teachers.some((t) => t.id === enriched.id);
      const nextTeachers = exists
        ? store.teachers.map((t) => (t.id === enriched.id ? enriched : t))
        : [enriched, ...store.teachers];
      const saved = saveServerStore(
        { ...store, teachers: nextTeachers },
        'TEACHER_REGISTERED',
        true,
        { schoolId: enriched.schoolId }
      );
      return res.json({ ok: true, revision: saved.revision, teacher: enriched });
    }

    return res.status(400).json({ error: 'Invalid entity payload' });
  });

  // ===== REALTIME SSE STREAM (/api/events) =====
  app.get(['/api/events', '/events'], (req, res) => {
    const session = resolveCallerSession(req);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: Phiên SSE không hợp lệ hoặc đã hết hạn.' });
    }
    if (session.role === 'student') {
      return res.status(403).json({ error: 'Forbidden: Học sinh không được phép kết nối SSE quản lý.' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const store = getServerStore();
    const currentRev = store.revision || 1;
    const lastEventIdHeader = req.headers['last-event-id'];
    const sinceRevParam = req.query.sinceRevision;
    const clientRev = Number(lastEventIdHeader || sinceRevParam || 0);

    // Send initial connected event; if client missed revisions while offline, flag syncRequired: true
    const initPayload = {
      type: clientRev > 0 && clientRev < currentRev ? 'sync_required' : 'connected',
      revision: currentRev,
      missedRevisions: clientRev > 0 ? Math.max(0, currentRev - clientRev) : 0,
      instanceId: clusterBus.instanceId,
      timestamp: new Date().toISOString(),
    };
    res.write(`id: ${currentRev}\nevent: message\ndata: ${JSON.stringify(initPayload)}\n\n`);

    const onStateChange = (ev: {
      revision: number;
      eventType: string;
      schoolId?: string;
      classId?: string;
      timestamp: string;
    }) => {
      // RLS filter on SSE stream: non-admin teachers only receive events for their school or global
      if (session.role !== 'admin' && ev.schoolId && session.schoolId && ev.schoolId !== session.schoolId) {
        return;
      }
      res.write(
        `id: ${ev.revision}\nevent: message\ndata: ${JSON.stringify({
          type: 'state_change',
          ...ev,
        })}\n\n`
      );
    };

    clusterBus.on('state_change', onStateChange);

    const heartbeat = setInterval(() => {
      res.write(`: heartbeat ${Date.now()}\n\n`);
    }, 20000);

    req.on('close', () => {
      clearInterval(heartbeat);
      clusterBus.off('state_change', onStateChange);
    });
  });

  // ===== RLS MIDDLEWARE FOR ALL /api/manage/* ROUTES =====
  app.use(['/api/manage', '/manage'], (req, res, next) => {
    const session = resolveCallerSession(req);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: Vui lòng đăng nhập tài khoản Giáo viên/Admin.' });
    }
    if (session.role === 'student') {
      return res.status(403).json({
        error: 'Forbidden: Học sinh không có quyền truy cập API quản lý (/api/manage/*).',
      });
    }
    (req as any).authSession = session;
    next();
  });

  // 1. Get RLS-scoped state snapshot (called on initial load & after SSE reconnect)
  app.get(['/api/manage/state', '/manage/state'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    const store = getServerStore();

    const scopedStudents =
      session.role === 'admin'
        ? store.students
        : store.students.filter((s) => canTeacherAccessStudent(session, s));

    const scopedTeachers =
      session.role === 'admin'
        ? store.teachers
        : store.teachers.filter((t) => t.id === session.sub);

    const scopedLogs =
      session.role === 'admin'
        ? store.auditLogs || []
        : (store.auditLogs || []).filter((l) => l.actorId === session.sub);

    return res.json({
      revision: store.revision || 1,
      role: session.role,
      schoolId: session.schoolId,
      managedClasses: session.managedClasses || [],
      schools: store.schools || [],
      customCommunes: store.customCommunes || {},
      customClasses: store.customClasses || [],
      classCurrentUnits: store.classCurrentUnits || { DEFAULT: 'unit-1' },
      students: scopedStudents,
      teachers: scopedTeachers,
      activationCodes: session.role === 'admin' ? store.activationCodes : [],
      auditLogs: scopedLogs,
      unmappedMigrationQueue:
        session.role === 'admin' ? store.unmappedMigrationQueue || [] : [],
    });
  });

  // 2. Indexed & Paginated Student Query (GET /api/manage/students)
  app.get(['/api/manage/students', '/manage/students'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    const store = getServerStore();

    const provinceCode = typeof req.query.provinceCode === 'string' ? req.query.provinceCode.trim() : '';
    const communeCode = typeof req.query.communeCode === 'string' ? req.query.communeCode.trim() : '';
    const schoolId = typeof req.query.schoolId === 'string' ? req.query.schoolId.trim() : '';
    const className = typeof req.query.className === 'string' ? req.query.className.trim() : '';
    const classId = typeof req.query.classId === 'string' ? req.query.classId.trim() : '';
    const q = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20));

    // RLS Enforcement: Non-admin teacher cannot query another school or unassigned class
    if (session.role !== 'admin') {
      if (schoolId && schoolId !== 'all' && schoolId !== session.schoolId) {
        return res.status(403).json({
          error: 'Forbidden: Giáo viên không có quyền truy cập học sinh của trường khác.',
        });
      }
      const normReqClass = className && className !== 'all' ? normalizeClassName(className) : '';
      if (normReqClass) {
        const allowed = new Set((session.managedClasses || []).map((c) => normalizeClassName(c)));
        if (!allowed.has(normReqClass)) {
          return res.status(403).json({
            error: `Forbidden: Giáo viên không được phân quyền phụ trách lớp ${normReqClass}.`,
          });
        }
      }
      if (classId && classId !== 'all') {
        const allowed = new Set((session.managedClasses || []).map((c) => normalizeClassName(c)));
        const extractedClass = classId.includes('__') ? classId.split('__').pop()! : classId;
        if (
          !allowed.has(normalizeClassName(extractedClass)) ||
          (session.schoolId && !classId.startsWith(session.schoolId))
        ) {
          return res.status(403).json({
            error: `Forbidden: Giáo viên không có quyền truy cập mã lớp ${classId}.`,
          });
        }
      }
    }

    // Use Composite Indexes first instead of full scan when possible
    const effectiveSchoolId =
      session.role !== 'admin'
        ? session.schoolId || '__NONE__'
        : schoolId && schoolId !== 'all'
        ? schoolId
        : '';
    const normClassFilter =
      className && className !== 'all'
        ? normalizeClassName(className)
        : classId && classId !== 'all' && classId.includes('__')
        ? normalizeClassName(classId.split('__').pop()!)
        : '';

    let candidateIds: string[] | null = null;
    let indexUsed = 'primary_scan';

    if (effectiveSchoolId && normClassFilter) {
      const compositeKey = buildCanonicalClassId(effectiveSchoolId, normClassFilter);
      candidateIds = memoryIndexes.bySchoolAndClass.get(compositeKey) || [];
      indexUsed = 'idx_schoolId_className';
    } else if (effectiveSchoolId) {
      candidateIds = memoryIndexes.bySchoolId.get(effectiveSchoolId) || [];
      indexUsed = 'idx_schoolId';
    } else if (communeCode && communeCode !== 'all') {
      candidateIds = memoryIndexes.byCommuneCode.get(communeCode) || [];
      indexUsed = 'idx_communeCode';
    } else if (provinceCode && provinceCode !== 'all') {
      candidateIds = memoryIndexes.byProvinceCode.get(provinceCode) || [];
      indexUsed = 'idx_provinceCode';
    }

    let candidates: StudentAccount[] = candidateIds
      ? candidateIds.map((id) => memoryIndexes.byStudentId.get(id)!).filter(Boolean)
      : store.students;

    // Apply RLS + remaining filters by code
    candidates = candidates.filter((st) => {
      if (!canTeacherAccessStudent(session, st)) return false;
      if (provinceCode && provinceCode !== 'all' && st.provinceCode !== provinceCode) return false;
      if (communeCode && communeCode !== 'all' && st.communeCode !== communeCode) return false;
      if (effectiveSchoolId && st.schoolId !== effectiveSchoolId) return false;
      if (normClassFilter && normalizeClassName(st.className) !== normClassFilter) return false;
      if (q) {
        const matchName = st.fullName.toLowerCase().includes(q);
        const matchUser = st.username.toLowerCase().includes(q);
        if (!matchName && !matchUser) return false;
      }
      return true;
    });

    const total = candidates.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const startIdx = (page - 1) * pageSize;
    const items = candidates.slice(startIdx, startIdx + pageSize);

    return res.json({
      items,
      page,
      pageSize,
      total,
      totalPages,
      indexUsed,
      revision: store.revision || 1,
    });
  });

  // 3. Indexed & Paginated Class/School Statistics (GET /api/manage/stats)
  app.get(['/api/manage/stats', '/manage/stats'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    const store = getServerStore();

    const provinceCode = typeof req.query.provinceCode === 'string' ? req.query.provinceCode.trim() : '';
    const communeCode = typeof req.query.communeCode === 'string' ? req.query.communeCode.trim() : '';
    const schoolId = typeof req.query.schoolId === 'string' ? req.query.schoolId.trim() : '';
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize) || 10));

    if (session.role !== 'admin' && schoolId && schoolId !== 'all' && schoolId !== session.schoolId) {
      return res.status(403).json({ error: 'Forbidden: Không có quyền xem thống kê trường khác.' });
    }

    const groupRows: Array<{
      classId: string;
      schoolId: string;
      schoolName: string;
      provinceCode: string;
      communeCode: string;
      className: string;
      studentCount: number;
      activeTodayCount: number;
      totalSessions: number;
      avgAccuracy: number;
    }> = [];

    const todayStr = new Date().toISOString().split('T')[0];

    for (const [compositeClassId, studentIds] of memoryIndexes.bySchoolAndClass.entries()) {
      const studentsInClass = studentIds
        .map((id) => memoryIndexes.byStudentId.get(id)!)
        .filter((s) => s && canTeacherAccessStudent(session, s));

      if (studentsInClass.length === 0) continue;
      const sample = studentsInClass[0];
      if (provinceCode && provinceCode !== 'all' && sample.provinceCode !== provinceCode) continue;
      if (communeCode && communeCode !== 'all' && sample.communeCode !== communeCode) continue;
      if (schoolId && schoolId !== 'all' && sample.schoolId !== schoolId) continue;

      let activeToday = 0;
      let totalSess = 0;
      let accSum = 0;

      for (const st of studentsInClass) {
        if ((st.dailyLogs?.[todayStr]?.timeSpentSeconds || 0) > 0) activeToday++;
        totalSess += st.sessions.length;
        const sessAvg =
          st.sessions.length > 0
            ? Math.round(st.sessions.reduce((a, b) => a + b.score, 0) / st.sessions.length)
            : 0;
        accSum += sessAvg;
      }

      groupRows.push({
        classId: compositeClassId,
        schoolId: sample.schoolId || '',
        schoolName: sample.schoolName || '',
        provinceCode: sample.provinceCode || '',
        communeCode: sample.communeCode || '',
        className: normalizeClassName(sample.className),
        studentCount: studentsInClass.length,
        activeTodayCount: activeToday,
        totalSessions: totalSess,
        avgAccuracy: Math.round(accSum / studentsInClass.length),
      });
    }

    groupRows.sort((a, b) => a.classId.localeCompare(b.classId));
    const total = groupRows.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const items = groupRows.slice((page - 1) * pageSize, page * pageSize);

    return res.json({
      items,
      page,
      pageSize,
      total,
      totalPages,
      indexUsed: 'idx_schoolId_className',
      revision: store.revision || 1,
    });
  });

  // 4. Admin-only: Assign managedClasses to a teacher (with AuditLog)
  app.post(['/api/manage/teachers/:teacherId/classes', '/manage/teachers/:teacherId/classes'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    if (session.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden: Chỉ Admin mới có quyền phân công lớp phụ trách (managedClasses).',
      });
    }

    const { teacherId } = req.params;
    const { classes } = req.body || {};
    if (!Array.isArray(classes)) {
      return res.status(400).json({ error: 'Danh sách lớp không hợp lệ.' });
    }

    const store = getServerStore();
    const target = store.teachers.find((t) => t.id === teacherId);
    if (!target) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản giáo viên.' });
    }

    const prevClasses = (target.managedClasses || []).map((c) => normalizeClassName(c));
    const nextClasses = Array.from(
      new Set(classes.map((c: string) => normalizeClassName(c)).filter(Boolean))
    ).sort();

    const updatedTeachers = store.teachers.map((t) =>
      t.id === teacherId ? { ...t, managedClasses: nextClasses } : t
    );

    const log = createAuditLogEntry({
      actorId: session.sub,
      actorRole: 'admin',
      action: 'ASSIGN_MANAGED_CLASSES',
      targetIds: [teacherId],
      beforeSnapshot: [{ id: teacherId, schoolId: target.schoolId, managedClasses: prevClasses }],
      afterSnapshot: [{ id: teacherId, schoolId: target.schoolId, managedClasses: nextClasses }],
    });

    const nextStore = saveServerStore(
      appendAuditLog({ ...store, teachers: updatedTeachers }, log),
      'ASSIGN_MANAGED_CLASSES',
      true,
      { schoolId: target.schoolId }
    );

    return res.json({
      ok: true,
      teacherId,
      managedClasses: nextClasses,
      auditLog: log,
      revision: nextStore.revision,
    });
  });

  // 5. Admin-only: Run Directory Code Migration (Dry-run or Live with Backup & Unmapped Queue)
  app.post(['/api/manage/migrate', '/manage/migrate'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    if (session.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden: Chỉ Admin mới được chạy chuẩn hoá mã định danh hệ thống.',
      });
    }

    const dryRun = Boolean(req.body?.dryRun);
    const store = getServerStore();
    let backupFile: string | null = null;
    if (!dryRun) {
      backupFile = backupServerStoreBeforeMigration();
    }

    const { data: migratedData, report } = runDirectoryCodeMigration(store, {
      dryRun,
      actorId: session.sub,
    });

    if (!dryRun) {
      const saved = saveServerStore(migratedData, 'MIGRATE_DIRECTORY_CODES', true);
      return res.json({
        ok: true,
        report: { ...report, backupKey: backupFile || report.backupKey },
        revision: saved.revision,
      });
    }

    return res.json({
      ok: true,
      report,
      revision: store.revision,
    });
  });

  // 6. Admin-only: Bulk Action Preview & Execute (Transfer Class, Normalize School, Bulk Import)
  const buildBulkPreview = (
    store: AppDataSchema,
    payload: {
      operation: 'BULK_TRANSFER_CLASS' | 'BULK_NORMALIZE_SCHOOL' | 'BULK_IMPORT_STUDENTS';
      studentIds?: string[];
      targetClassName?: string;
      targetProvinceCode?: string;
      targetCommuneCode?: string;
      targetSchoolId?: string;
      importRows?: Array<{
        fullName: string;
        className: string;
        provinceName?: string;
        communeName?: string;
        schoolName?: string;
        provinceCode?: string;
        communeCode?: string;
        schoolId?: string;
        username?: string;
        password?: string;
      }>;
    }
  ) => {
    const diffs: Array<{
      studentId: string;
      fullName: string;
      before: string;
      after: string;
      beforeSnap: AuditLogSnapshotItem;
      afterSnap: AuditLogSnapshotItem;
      newStudent?: StudentAccount;
      plainPassword?: string;
      recoveryCode?: string;
    }> = [];
    const duplicates: Array<{ rowOrId: string; reason: string }> = [];
    const errors: Array<{ rowOrId: string; reason: string }> = [];

    if (payload.operation === 'BULK_TRANSFER_CLASS') {
      const normTargetClass = normalizeClassName(payload.targetClassName || '');
      if (!normTargetClass || !/^6[A-Z0-9]+$/.test(normTargetClass)) {
        errors.push({ rowOrId: 'targetClassName', reason: 'Tên lớp đích không hợp lệ (VD: 6A1).' });
        return { diffs, duplicates, errors };
      }

      const targetIds = Array.isArray(payload.studentIds) ? payload.studentIds : [];
      for (const id of targetIds) {
        const st = store.students.find((s) => s.id === id);
        if (!st) {
          errors.push({ rowOrId: id, reason: 'Không tìm thấy học sinh.' });
          continue;
        }
        if (!st.schoolId) {
          errors.push({
            rowOrId: id,
            reason: `Học sinh ${st.fullName} chưa có mã trường chuẩn (schoolId).`,
          });
          continue;
        }
        const nextClassId = buildCanonicalClassId(st.schoolId, normTargetClass);
        if (normalizeClassName(st.className) === normTargetClass && st.classId === nextClassId) {
          continue;
        }
        // Check duplicate in target class (same fullName + same schoolId + targetClassName)
        const dup = store.students.find(
          (other) =>
            other.id !== st.id &&
            other.schoolId === st.schoolId &&
            normalizeClassName(other.className) === normTargetClass &&
            normalizeFullName(other.fullName).toLowerCase() ===
              normalizeFullName(st.fullName).toLowerCase()
        );
        if (dup) {
          duplicates.push({
            rowOrId: st.id,
            reason: `Trùng họ tên "${st.fullName}" đã tồn tại tại lớp ${normTargetClass} (@${dup.username}).`,
          });
          continue;
        }

        diffs.push({
          studentId: st.id,
          fullName: st.fullName,
          before: `${st.className} (${st.classId || 'chưa gán mã'})`,
          after: `${normTargetClass} (${nextClassId})`,
          beforeSnap: {
            id: st.id,
            provinceCode: st.provinceCode,
            communeCode: st.communeCode,
            schoolId: st.schoolId,
            classId: st.classId,
            className: st.className,
          },
          afterSnap: {
            id: st.id,
            provinceCode: st.provinceCode,
            communeCode: st.communeCode,
            schoolId: st.schoolId,
            classId: nextClassId,
            className: normTargetClass,
          },
        });
      }
    } else if (payload.operation === 'BULK_NORMALIZE_SCHOOL') {
      const loc = resolveCanonicalLocationStrict(store, {
        provinceCode: payload.targetProvinceCode,
        communeCode: payload.targetCommuneCode,
        schoolId: payload.targetSchoolId,
        requireClass: false,
      });
      if (!loc.mapped) {
        errors.push({ rowOrId: 'targetSchool', reason: loc.reason });
        return { diffs, duplicates, errors };
      }

      const targetIds = Array.isArray(payload.studentIds) ? payload.studentIds : [];
      for (const id of targetIds) {
        const st = store.students.find((s) => s.id === id);
        if (!st) {
          errors.push({ rowOrId: id, reason: 'Không tìm thấy học sinh.' });
          continue;
        }
        const normCls = normalizeClassName(st.className || '6A1');
        const nextClassId = buildCanonicalClassId(loc.schoolId, normCls);

        const dup = store.students.find(
          (other) =>
            other.id !== st.id &&
            other.schoolId === loc.schoolId &&
            normalizeClassName(other.className) === normCls &&
            normalizeFullName(other.fullName).toLowerCase() ===
              normalizeFullName(st.fullName).toLowerCase()
        );
        if (dup) {
          duplicates.push({
            rowOrId: st.id,
            reason: `Trùng học sinh "${st.fullName}" tại ${loc.schoolName} - Lớp ${normCls}.`,
          });
          continue;
        }

        diffs.push({
          studentId: st.id,
          fullName: st.fullName,
          before: `${st.schoolName || 'Chưa rõ'} (${st.schoolId || 'unmapped'})`,
          after: `${loc.schoolName} (${loc.schoolId})`,
          beforeSnap: {
            id: st.id,
            provinceCode: st.provinceCode,
            communeCode: st.communeCode,
            schoolId: st.schoolId,
            classId: st.classId,
            className: st.className,
          },
          afterSnap: {
            id: st.id,
            provinceCode: loc.provinceCode,
            communeCode: loc.communeCode,
            schoolId: loc.schoolId,
            classId: nextClassId,
            className: normCls,
          },
        });
      }
    } else if (payload.operation === 'BULK_IMPORT_STUDENTS') {
      const rows = Array.isArray(payload.importRows) ? payload.importRows : [];
      const seenUsernames = new Set(store.students.map((s) => s.username.toLowerCase()));
      const seenIdentity = new Set(
        store.students.map(
          (s) =>
            `${(s.schoolId || '').toLowerCase()}__${normalizeClassName(
              s.className
            )}__${normalizeFullName(s.fullName).toLowerCase()}`
        )
      );

      rows.forEach((r, idx) => {
        const rowLabel = `Dòng ${idx + 1} (${r.fullName || 'Trống'})`;
        const cleanName = normalizeFullName(r.fullName || '');
        if (!cleanName) {
          errors.push({ rowOrId: rowLabel, reason: 'Thiếu họ và tên học sinh.' });
          return;
        }

        const loc = resolveCanonicalLocationStrict(store, {
          provinceCode: r.provinceCode,
          communeCode: r.communeCode,
          schoolId: r.schoolId,
          provinceName: r.provinceName,
          communeName: r.communeName,
          schoolName: r.schoolName,
          className: r.className,
          requireClass: true,
        });

        if (!loc.mapped) {
          errors.push({ rowOrId: rowLabel, reason: loc.reason });
          return;
        }

        const identityKey = `${loc.schoolId.toLowerCase()}__${loc.className!}__${cleanName.toLowerCase()}`;
        if (seenIdentity.has(identityKey)) {
          duplicates.push({
            rowOrId: rowLabel,
            reason: `Học sinh "${cleanName}" đã tồn tại ở lớp ${loc.className} (${loc.schoolName}).`,
          });
          return;
        }

        let username = (r.username || '').trim().toLowerCase().replace(/\s+/g, '');
        if (username && seenUsernames.has(username)) {
          duplicates.push({
            rowOrId: rowLabel,
            reason: `Tên đăng nhập "${username}" đã tồn tại.`,
          });
          return;
        }
        if (!username) {
          const suggestions = suggestAvailableUsernames(cleanName, loc.className!, '', store.students);
          username =
            suggestions.find((cand) => !seenUsernames.has(cand.toLowerCase())) ||
            `hs_${Date.now().toString().slice(-4)}_${idx + 1}`;
        }

        seenUsernames.add(username.toLowerCase());
        seenIdentity.add(identityKey);

        const plainPassword = (r.password || '').trim() || `Hs@${Math.floor(100000 + Math.random() * 900000)}`;
        const hashedPassword = hashPasswordSync(plainPassword);
        const recoveryCode = generateRecoveryCode();
        const studentId = `student-bulk-${Date.now()}-${idx + 1}`;

        const newStudent: StudentAccount = {
          id: studentId,
          username,
          fullName: cleanName,
          grade: 6,
          className: loc.className!,
          provinceCode: loc.provinceCode,
          provinceName: loc.provinceName,
          communeCode: loc.communeCode,
          communeName: loc.communeName,
          schoolId: loc.schoolId,
          schoolName: loc.schoolName,
          classId: loc.classId,
          migrationStatus: 'mapped',
          passwordHash: hashedPassword,
          pinCode: hashedPassword,
          recoveryCodeHash: hashPasswordSync(recoveryCode),
          parentConsent: true,
          avatar: '👨‍🎓',
          dailyGoalMinutes: 20,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          progress: {
            ...INITIAL_PROGRESS,
            studentName: cleanName,
            grade: 6,
            skillMastery: { ...INITIAL_PROGRESS.skillMastery },
            unitProgress: {},
          },
          sessions: [],
          dailyLogs: {},
        };

        diffs.push({
          studentId,
          fullName: cleanName,
          before: '(Chưa tồn tại)',
          after: `@${username} • Lớp ${loc.className} • ${loc.schoolName}`,
          beforeSnap: { id: studentId, existed: false },
          afterSnap: {
            id: studentId,
            provinceCode: loc.provinceCode,
            communeCode: loc.communeCode,
            schoolId: loc.schoolId,
            classId: loc.classId,
            className: loc.className,
          },
          newStudent,
          plainPassword,
          recoveryCode,
        });
      });
    }

    return { diffs, duplicates, errors };
  };

  app.post(['/api/manage/bulk/preview', '/manage/bulk/preview'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    if (session.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden: Chỉ Admin mới có quyền thực hiện thao tác hàng loạt (Bulk Actions).',
      });
    }
    const store = getServerStore();
    const preview = buildBulkPreview(store, req.body || {});
    return res.json({
      ok: true,
      validCount: preview.diffs.length,
      duplicateCount: preview.duplicates.length,
      errorCount: preview.errors.length,
      diffs: preview.diffs.map((d) => ({
        studentId: d.studentId,
        fullName: d.fullName,
        before: d.before,
        after: d.after,
      })),
      duplicates: preview.duplicates,
      errors: preview.errors,
    });
  });

  app.post(['/api/manage/bulk/execute', '/manage/bulk/execute'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    if (session.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden: Chỉ Admin mới có quyền thực thi thao tác hàng loạt (Bulk Actions).',
      });
    }
    if (!req.body?.confirmed) {
      return res.status(400).json({ error: 'Vui lòng xác nhận (confirmed: true) sau khi xem trước.' });
    }

    const store = getServerStore();
    const operation = req.body.operation as
      | 'BULK_TRANSFER_CLASS'
      | 'BULK_NORMALIZE_SCHOOL'
      | 'BULK_IMPORT_STUDENTS';
    const preview = buildBulkPreview(store, req.body);

    if (preview.diffs.length === 0) {
      return res.status(400).json({
        error: 'Không có bản ghi hợp lệ nào để thực thi.',
        duplicates: preview.duplicates,
        errors: preview.errors,
      });
    }

    let nextStudents = [...store.students];
    const directory = getCanonicalSchoolsDirectory(store);

    if (operation === 'BULK_IMPORT_STUDENTS') {
      const created = preview.diffs.map((d) => d.newStudent!).filter(Boolean);
      nextStudents = [...created, ...nextStudents];
    } else {
      const afterMap = new Map(preview.diffs.map((d) => [d.studentId, d.afterSnap]));
      nextStudents = nextStudents.map((st) => {
        const snap = afterMap.get(st.id);
        if (!snap) return st;
        const schoolEntry = directory.find((sc) => sc.schoolId === snap.schoolId);
        return {
          ...st,
          provinceCode: snap.provinceCode ?? st.provinceCode,
          communeCode: snap.communeCode ?? st.communeCode,
          schoolId: snap.schoolId ?? st.schoolId,
          classId: snap.classId ?? st.classId,
          className: snap.className ?? st.className,
          provinceName: schoolEntry?.provinceName ?? st.provinceName,
          communeName: schoolEntry?.communeName ?? st.communeName,
          schoolName: schoolEntry?.schoolName ?? st.schoolName,
          migrationStatus: 'mapped',
        };
      });
    }

    const log = createAuditLogEntry({
      actorId: session.sub,
      actorRole: 'admin',
      action: operation,
      targetIds: preview.diffs.map((d) => d.studentId),
      beforeSnapshot: preview.diffs.map((d) => d.beforeSnap),
      afterSnapshot: preview.diffs.map((d) => d.afterSnap),
    });

    const resolvedIds = new Set(preview.diffs.map((d) => d.studentId));
    const nextQueue = (store.unmappedMigrationQueue || []).filter(
      (q) => !(q.entityType === 'student' && resolvedIds.has(q.entityId))
    );

    const saved = saveServerStore(
      appendAuditLog(
        {
          ...store,
          students: nextStudents,
          unmappedMigrationQueue: nextQueue,
        },
        log
      ),
      operation,
      true
    );

    return res.json({
      ok: true,
      appliedCount: preview.diffs.length,
      duplicateCount: preview.duplicates.length,
      errorCount: preview.errors.length,
      auditLog: log,
      createdCredentials:
        operation === 'BULK_IMPORT_STUDENTS'
          ? preview.diffs.map((d) => ({
              studentId: d.studentId,
              fullName: d.fullName,
              username: d.newStudent?.username,
              className: d.newStudent?.className,
              schoolName: d.newStudent?.schoolName,
              passwordPlain: d.plainPassword,
              recoveryCode: d.recoveryCode,
            }))
          : undefined,
      revision: saved.revision,
    });
  });

  // 7. Admin-only: Undo a Bulk Action via AuditLog ID
  app.post(['/api/manage/audit-logs/:logId/undo', '/manage/audit-logs/:logId/undo'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    if (session.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden: Chỉ Admin mới có quyền hoàn tác (Undo) nhật ký thay đổi hàng loạt.',
      });
    }

    const store = getServerStore();
    const result = undoBulkActionByAuditLog(store, req.params.logId, session.sub, 'admin');
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const saved = saveServerStore(result.data, 'UNDO_BULK_ACTION', true);
    return res.json({
      ok: true,
      revision: saved.revision,
      auditLogs: saved.auditLogs,
    });
  });

  // 8. Paginated Audit Logs Query (GET /api/manage/audit-logs)
  app.get(['/api/manage/audit-logs', '/manage/audit-logs'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    const store = getServerStore();
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize) || 15));

    const logs =
      session.role === 'admin'
        ? store.auditLogs || []
        : (store.auditLogs || []).filter((l) => l.actorId === session.sub);

    const total = logs.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const items = logs.slice((page - 1) * pageSize, page * pageSize);

    return res.json({
      items,
      page,
      pageSize,
      total,
      totalPages,
      ttlDays: 90,
      revision: store.revision || 1,
    });
  });

  // 9. Bounded Student List Export (POST /api/manage/export-students)
  app.post(['/api/manage/export-students', '/manage/export-students'], (req, res) => {
    const session: AuthSessionPayload = (req as any).authSession;
    const store = getServerStore();
    const { provinceCode, communeCode, schoolId, className } = req.body || {};

    if (session.role !== 'admin' && schoolId && schoolId !== 'all' && schoolId !== session.schoolId) {
      return res.status(403).json({ error: 'Forbidden: Không được xuất danh sách học sinh trường khác.' });
    }

    const normClass = className && className !== 'all' ? normalizeClassName(className) : '';
    if (session.role !== 'admin' && normClass) {
      const allowed = new Set((session.managedClasses || []).map((c) => normalizeClassName(c)));
      if (!allowed.has(normClass)) {
        return res.status(403).json({
          error: `Forbidden: Không có quyền xuất danh sách lớp ${normClass}.`,
        });
      }
    }

    const filtered = store.students.filter((st) => {
      if (!canTeacherAccessStudent(session, st)) return false;
      if (provinceCode && provinceCode !== 'all' && st.provinceCode !== provinceCode) return false;
      if (communeCode && communeCode !== 'all' && st.communeCode !== communeCode) return false;
      if (schoolId && schoolId !== 'all' && st.schoolId !== schoolId) return false;
      if (normClass && normalizeClassName(st.className) !== normClass) return false;
      return true;
    });

    if (filtered.length > MAX_EXPORT_STUDENTS_LIMIT) {
      return res.status(400).json({
        error: `Số lượng xuất (${filtered.length} HS) vượt quá giới hạn an toàn ${MAX_EXPORT_STUDENTS_LIMIT} học sinh/lần. Vui lòng lọc theo Lớp hoặc Trường cụ thể.`,
      });
    }

    const log = createAuditLogEntry({
      actorId: session.sub,
      actorRole: session.role === 'admin' ? 'admin' : 'teacher',
      action: 'EXPORT_STUDENTS',
      targetIds: filtered.map((s) => s.id),
      beforeSnapshot: [],
      afterSnapshot: [],
    });
    saveServerStore(appendAuditLog(store, log), 'EXPORT_STUDENTS', false);

    return res.json({
      ok: true,
      limit: MAX_EXPORT_STUDENTS_LIMIT,
      count: filtered.length,
      rows: filtered.map((s) => ({
        id: s.id,
        username: s.username,
        fullName: s.fullName,
        className: normalizeClassName(s.className),
        classId: s.classId || '',
        provinceCode: s.provinceCode || '',
        provinceName: s.provinceName || '',
        communeCode: s.communeCode || '',
        communeName: s.communeName || '',
        schoolId: s.schoolId || '',
        schoolName: s.schoolName || '',
      })),
    });
  });
}
