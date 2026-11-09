import { AppDataSchema, SkillType, StudentAccount, StudySession, TeacherAccount } from '../types';
import { LoadedGrammarBundle, formatItemPreview } from '../grammar-g6/dataLoader';
import { GrammarStudentStore } from '../grammar-g6/types';
import { normalizeClassName } from './storage';

/**
 * Kỹ năng chuẩn hoá trong collection "attempts"
 */
export type AttemptSkill =
  | 'grammar'
  | 'vocab'
  | 'pronunciation'
  | 'reading'
  | 'writing'
  | 'game';

/**
 * Thiết bị làm bài của học sinh
 */
export type AttemptDevice = 'mobile' | 'desktop';

/**
 * Document trong collection "attempts" của Firestore.
 * QUY TẮC BẢO MẬT DỮ LIỆU CÁ NHÂN (PII):
 * Tuyệt đối KHÔNG lưu `fullName` / `studentName` vào document "attempts".
 * Họ tên học sinh chỉ nằm trong collection "students".
 */
export interface FirestoreAttemptDoc {
  id: string;
  studentId: string;
  schoolId: string;
  className: string;
  grade: number;
  unitId: string;
  skill: AttemptSkill;
  setId: string;
  itemId: string;
  grammarPointId?: string;
  correct: boolean;
  score: number; // 0..1
  answer: string;
  attemptNo: number;
  startedAt: string; // ISO 8601
  submittedAt: string; // ISO 8601
  durationSec: number;
  device: AttemptDevice;
}

/**
 * Document trong collection "dailyStats" của Firestore.
 * Tổng hợp sẵn theo ngày (YYYY-MM-DD) cho từng học sinh:
 * số phút học, số câu, tỉ lệ đúng — được cập nhật tức thì mỗi khi có attempt mới
 * để trang Báo cáo tải nhanh mà không phải quét toàn bộ lịch sử.
 */
export interface FirestoreDailyStatDoc {
  id: string; // `${studentId}_${date}`
  studentId: string;
  schoolId: string;
  className: string;
  grade: number;
  date: string; // YYYY-MM-DD
  studyMinutes: number;
  totalDurationSec: number;
  totalAttempts: number;
  correctAttempts: number;
  accuracyRate: number; // 0..1
  bySkill: Partial<
    Record<
      AttemptSkill,
      {
        attempts: number;
        correct: number;
        durationSec: number;
        scoreSum: number;
      }
    >
  >;
  byUnit: Record<
    string,
    {
      attempts: number;
      correct: number;
      durationSec: number;
      scoreSum: number;
    }
  >;
  updatedAt: string; // ISO 8601
}

export interface RecordAttemptInput {
  studentId: string;
  schoolId?: string;
  schoolName?: string;
  communeName?: string;
  provinceName?: string;
  className: string;
  grade?: number;
  unitId: string;
  skill: AttemptSkill;
  setId: string;
  itemId: string;
  grammarPointId?: string;
  correct: boolean;
  score?: number; // 0..1 (mặc định 1 nếu correct, 0 nếu sai)
  answer: string;
  startedAt?: string;
  submittedAt?: string;
  durationSec?: number;
  device?: AttemptDevice;
}

export interface AnalyticsReportFilter {
  schoolId: string; // 'all' hoặc mã trường cụ thể
  className: string; // 'all' hoặc tên lớp chuẩn hoá (VD: '6A1')
  unitId: string; // 'all' hoặc 'unit-1'..'unit-12'
  skill: 'all' | AttemptSkill;
  dateRange: '7d' | '30d' | '90d' | 'all' | 'custom';
  customFromDate?: string; // YYYY-MM-DD
  customToDate?: string; // YYYY-MM-DD
}

export interface WeeklyStudyPoint {
  weekKey: string;
  weekLabel: string;
  studyMinutes: number;
  studyHours: number;
  attemptCount: number;
  activeStudents: number;
}

export interface UnitAccuracyPoint {
  unitId: string;
  unitLabel: string;
  unitTitle: string;
  attemptCount: number;
  correctCount: number;
  accuracyPct: number;
  studyMinutes: number;
}

export interface TopMissedGrammarQuestionRow {
  rank: number;
  key: string;
  grammarPointId: string;
  grammarPointTitle: string;
  itemId: string;
  questionPrompt: string;
  unitId: string;
  unitNumber: number;
  skill: AttemptSkill;
  skillLabel: string;
  totalAttempts: number;
  wrongCount: number;
  errorRatePct: number;
  mostCommonWrongAnswer: string;
  mostCommonWrongCount: number;
  affectedStudentCount: number;
  affectedStudentIds: string[];
}

export interface StudentAnalyticsRow {
  studentId: string;
  anonymousCode: string; // HS01, HS02...
  fullName: string; // Chỉ tra cứu từ collection "students"
  username: string;
  avatar: string;
  className: string;
  schoolId: string;
  schoolName: string;
  studyMinutes: number;
  studyHours: number;
  totalDurationSec: number;
  attemptCount: number;
  correctCount: number;
  accuracyPct: number;
  lastStudiedAt: string | null;
  bySkill: Record<
    AttemptSkill,
    {
      attempts: number;
      correct: number;
      accuracyPct: number;
      studyMinutes: number;
    }
  >;
  dailyBreakdown: {
    date: string;
    studyMinutes: number;
    totalAttempts: number;
    correctAttempts: number;
    accuracyPct: number;
  }[];
  recentAttempts: FirestoreAttemptDoc[];
}

export interface ClassAnalyticsSummaryRow {
  className: string;
  schoolId: string;
  schoolName: string;
  totalStudents: number;
  activeStudents: number;
  studyMinutes: number;
  studyHours: number;
  attemptCount: number;
  correctCount: number;
  accuracyPct: number;
}

export interface TeacherAnalyticsReportResult {
  overview: {
    totalStudentsInScope: number;
    activeStudentsCount: number;
    totalStudyMinutes: number;
    totalStudyHours: number;
    totalAttempts: number;
    totalCorrect: number;
    avgAccuracyPct: number;
  };
  weeklyStudyChart: WeeklyStudyPoint[];
  unitAccuracyChart: UnitAccuracyPoint[];
  topMissedItems: TopMissedGrammarQuestionRow[];
  studentRows: StudentAnalyticsRow[];
  classRows: ClassAnalyticsSummaryRow[];
  filteredAttempts: FirestoreAttemptDoc[];
  availableSchools: { schoolId: string; schoolName: string }[];
  availableClasses: string[];
}

const ATTEMPTS_STORAGE_KEY = 'firestore_collection_attempts_v1';
const DAILY_STATS_STORAGE_KEY = 'firestore_collection_dailyStats_v1';
const MAX_LOCAL_ATTEMPTS = 8000;

export const ATTEMPT_SKILL_LABELS: Record<AttemptSkill, string> = {
  grammar: 'Ngữ pháp',
  vocab: 'Từ vựng',
  pronunciation: 'Phát âm',
  reading: 'Đọc hiểu',
  writing: 'Viết',
  game: 'Trò chơi',
};

/**
 * Chuyển đổi tên trường sang mã chuẩn `schoolId` dùng trong Firestore & Security Rules.
 */
export function toSchoolId(
  schoolName?: string | null,
  communeName?: string | null,
  provinceName?: string | null
): string {
  const raw = (schoolName || 'THCS Chu Văn An').trim().toLowerCase();
  const slug = raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const communeSlug = (communeName || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (communeSlug) {
    return `${slug}__${communeSlug}`;
  }
  const provSlug = (provinceName || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return provSlug ? `${slug}__${provSlug}` : slug || 'thcs-chu-van-an';
}

/**
 * Phát hiện thiết bị làm bài ('mobile' | 'desktop')
 */
export function detectDevice(): AttemptDevice {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'desktop';
  }
  const ua = navigator.userAgent || '';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return 'mobile';
  }
  if (window.innerWidth > 0 && window.innerWidth < 768) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Chuẩn hoá mã Unit về dạng `unit-1` .. `unit-12`
 */
export function normalizeUnitId(unitId?: string | null): string {
  if (!unitId) return 'unit-1';
  const trimmed = unitId.trim().toLowerCase();
  const match = trimmed.match(/^u(?:nit)?[-_]?(\d{1,2})$/);
  if (match) {
    const num = Math.max(1, Math.min(12, parseInt(match[1], 10)));
    return `unit-${num}`;
  }
  return trimmed;
}

/**
 * Chuyển đổi SkillType của ứng dụng sang AttemptSkill của Firestore
 */
export function mapAppSkillToAttemptSkill(skill: SkillType | string): AttemptSkill {
  const lower = String(skill).toLowerCase();
  if (lower.includes('grammar') || lower.includes('ngữ pháp')) return 'grammar';
  if (lower.includes('vocab') || lower.includes('từ vựng')) return 'vocab';
  if (lower.includes('pronun') || lower.includes('speech') || lower.includes('phát âm') || lower.includes('speaking') || lower.includes('listening')) {
    return 'pronunciation';
  }
  if (lower.includes('read') || lower.includes('đọc')) return 'reading';
  if (lower.includes('writ') || lower.includes('viết')) return 'writing';
  if (lower.includes('game') || lower.includes('trò chơi')) return 'game';
  return 'grammar';
}

/**
 * Loại bỏ triệt để mọi trường họ tên (nếu lỡ truyền vào) trước khi lưu vào collection "attempts".
 */
function stripPiiFromAttempt(raw: Record<string, unknown>): FirestoreAttemptDoc {
  const clone = { ...raw };
  delete clone.fullName;
  delete clone.studentName;
  delete clone.name;
  delete clone.username;
  delete clone.email;

  return {
    id: String(clone.id || `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`),
    studentId: String(clone.studentId || ''),
    schoolId: String(clone.schoolId || 'thcs-chu-van-an'),
    className: normalizeClassName(String(clone.className || '6A1')),
    grade: Number(clone.grade) || 6,
    unitId: normalizeUnitId(String(clone.unitId || 'unit-1')),
    skill: (clone.skill as AttemptSkill) || 'grammar',
    setId: String(clone.setId || 'general'),
    itemId: String(clone.itemId || 'item-1'),
    ...(clone.grammarPointId ? { grammarPointId: String(clone.grammarPointId) } : {}),
    correct: Boolean(clone.correct),
    score: Math.max(0, Math.min(1, Number(clone.score ?? (clone.correct ? 1 : 0)))),
    answer: String(clone.answer ?? ''),
    attemptNo: Math.max(1, Math.round(Number(clone.attemptNo) || 1)),
    startedAt: String(clone.startedAt || new Date().toISOString()),
    submittedAt: String(clone.submittedAt || new Date().toISOString()),
    durationSec: Math.max(1, Math.round(Number(clone.durationSec) || 10)),
    device: clone.device === 'mobile' ? 'mobile' : 'desktop',
  };
}

/**
 * Đọc toàn bộ collection "attempts" từ bộ nhớ đệm Firestore cục bộ
 */
export function loadAllAttemptsRaw(): FirestoreAttemptDoc[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => stripPiiFromAttempt(item as Record<string, unknown>));
  } catch (err) {
    console.warn('[FirebaseAnalytics] Không thể đọc collection attempts:', err);
    return [];
  }
}

function saveAllAttemptsRaw(attempts: FirestoreAttemptDoc[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const sanitized = attempts
      .slice(-MAX_LOCAL_ATTEMPTS)
      .map((a) => stripPiiFromAttempt(a as unknown as Record<string, unknown>));
    window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(sanitized));
  } catch (err) {
    console.warn('[FirebaseAnalytics] Không thể lưu collection attempts:', err);
  }
}

/**
 * Đọc toàn bộ collection "dailyStats" từ bộ nhớ đệm Firestore cục bộ
 */
export function loadAllDailyStatsRaw(): Record<string, FirestoreDailyStatDoc> {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(DAILY_STATS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as Record<string, FirestoreDailyStatDoc>;
  } catch (err) {
    console.warn('[FirebaseAnalytics] Không thể đọc collection dailyStats:', err);
    return {};
  }
}

function saveAllDailyStatsRaw(statsMap: Record<string, FirestoreDailyStatDoc>): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(DAILY_STATS_STORAGE_KEY, JSON.stringify(statsMap));
  } catch (err) {
    console.warn('[FirebaseAnalytics] Không thể lưu collection dailyStats:', err);
  }
}

/**
 * Đồng bộ không chặn (non-blocking) lên Cloud Firestore REST API nếu dự án đã cấu hình VITE_FIREBASE_PROJECT_ID
 */
async function syncDocToCloudFirestore(
  collectionName: 'attempts' | 'dailyStats',
  docId: string,
  payload: FirestoreAttemptDoc | FirestoreDailyStatDoc
): Promise<void> {
  try {
    const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
    const projectId = env.VITE_FIREBASE_PROJECT_ID;
    const apiKey = env.VITE_FIREBASE_API_KEY;
    if (!projectId || !apiKey) return;

    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(payload)) {
      if (v === undefined || v === null) continue;
      if (typeof v === 'string') fields[k] = { stringValue: v };
      else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
      else if (typeof v === 'number') {
        fields[k] = Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
      } else if (typeof v === 'object') {
        fields[k] = { stringValue: JSON.stringify(v) };
      }
    }

    const baseUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
      projectId
    )}/databases/(default)/documents/${collectionName}`;

    if (collectionName === 'attempts') {
      // attempts: chỉ cho phép create (POST), không cho phép ghi đè
      await fetch(`${baseUrl}?documentId=${encodeURIComponent(docId)}&key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      });
    } else {
      // dailyStats: cập nhật theo ngày (PATCH)
      await fetch(`${baseUrl}/${encodeURIComponent(docId)}?key=${encodeURIComponent(apiKey)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      });
    }
  } catch {
    // Hoạt động ngoại tuyến an toàn nếu chưa kết nối mạng
  }
}

/**
 * Cập nhật cộng dồn 1 attempt vào document `dailyStats/{studentId}_{YYYY-MM-DD}`
 */
function applyAttemptToDailyStatsMap(
  statsMap: Record<string, FirestoreDailyStatDoc>,
  attempt: FirestoreAttemptDoc
): FirestoreDailyStatDoc {
  const dateStr = attempt.submittedAt.slice(0, 10);
  const statId = `${attempt.studentId}_${dateStr}`;
  const existing = statsMap[statId];

  const base: FirestoreDailyStatDoc = existing || {
    id: statId,
    studentId: attempt.studentId,
    schoolId: attempt.schoolId,
    className: attempt.className,
    grade: attempt.grade || 6,
    date: dateStr,
    studyMinutes: 0,
    totalDurationSec: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    accuracyRate: 0,
    bySkill: {},
    byUnit: {},
    updatedAt: attempt.submittedAt,
  };

  const nextDurationSec = base.totalDurationSec + attempt.durationSec;
  const nextTotalAttempts = base.totalAttempts + 1;
  const nextCorrectAttempts = base.correctAttempts + (attempt.correct ? 1 : 0);
  const nextAccuracyRate =
    nextTotalAttempts > 0 ? Number((nextCorrectAttempts / nextTotalAttempts).toFixed(4)) : 0;
  const nextStudyMinutes = Math.max(1, Math.round((nextDurationSec / 60) * 10) / 10);

  const prevSkill = base.bySkill[attempt.skill] || {
    attempts: 0,
    correct: 0,
    durationSec: 0,
    scoreSum: 0,
  };
  const nextBySkill = {
    ...base.bySkill,
    [attempt.skill]: {
      attempts: prevSkill.attempts + 1,
      correct: prevSkill.correct + (attempt.correct ? 1 : 0),
      durationSec: prevSkill.durationSec + attempt.durationSec,
      scoreSum: Number((prevSkill.scoreSum + attempt.score).toFixed(4)),
    },
  };

  const prevUnit = base.byUnit[attempt.unitId] || {
    attempts: 0,
    correct: 0,
    durationSec: 0,
    scoreSum: 0,
  };
  const nextByUnit = {
    ...base.byUnit,
    [attempt.unitId]: {
      attempts: prevUnit.attempts + 1,
      correct: prevUnit.correct + (attempt.correct ? 1 : 0),
      durationSec: prevUnit.durationSec + attempt.durationSec,
      scoreSum: Number((prevUnit.scoreSum + attempt.score).toFixed(4)),
    },
  };

  const updated: FirestoreDailyStatDoc = {
    ...base,
    schoolId: attempt.schoolId || base.schoolId,
    className: attempt.className || base.className,
    studyMinutes: nextStudyMinutes,
    totalDurationSec: nextDurationSec,
    totalAttempts: nextTotalAttempts,
    correctAttempts: nextCorrectAttempts,
    accuracyRate: nextAccuracyRate,
    bySkill: nextBySkill,
    byUnit: nextByUnit,
    updatedAt: new Date().toISOString(),
  };

  statsMap[statId] = updated;
  return updated;
}

/**
 * Ghi nhận 1 lần nộp câu hỏi / bài tập vào collection `"attempts"`
 * VÀ cập nhật tức thì collection `"dailyStats"` cho học sinh đó.
 *
 * Tuân thủ Security Rules:
 * - Học sinh chỉ ghi (`create`) attempt của chính mình.
 * - Không ghi `fullName` vào attempt.
 */
export function recordAttemptAndUpdateDailyStats(
  input: RecordAttemptInput,
  authenticatedStudentId?: string | null
): { attempt: FirestoreAttemptDoc; dailyStat: FirestoreDailyStatDoc } | null {
  if (!input.studentId) return null;

  // Kiểm tra Security Rule phía client: Học sinh chỉ được ghi attempt của chính mình
  if (authenticatedStudentId && authenticatedStudentId !== input.studentId) {
    console.warn(
      '[SecurityRules] Từ chối ghi attempt: Học sinh chỉ được phép ghi attempt của chính mình.'
    );
    return null;
  }

  const allAttempts = loadAllAttemptsRaw();
  const previousCountForItem = allAttempts.filter(
    (a) => a.studentId === input.studentId && a.itemId === input.itemId
  ).length;

  const submittedAt = input.submittedAt || new Date().toISOString();
  const durationSec = Math.max(1, Math.round(input.durationSec ?? 12));
  const startedAt =
    input.startedAt ||
    new Date(new Date(submittedAt).getTime() - durationSec * 1000).toISOString();

  const schoolId =
    input.schoolId || toSchoolId(input.schoolName, input.communeName, input.provinceName);

  const attemptDoc = stripPiiFromAttempt({
    id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    studentId: input.studentId,
    schoolId,
    className: normalizeClassName(input.className || '6A1'),
    grade: input.grade || 6,
    unitId: normalizeUnitId(input.unitId),
    skill: input.skill,
    setId: input.setId || 'general',
    itemId: input.itemId || 'question-1',
    grammarPointId: input.grammarPointId,
    correct: Boolean(input.correct),
    score: input.score !== undefined ? input.score : input.correct ? 1 : 0,
    answer: input.answer,
    attemptNo: previousCountForItem + 1,
    startedAt,
    submittedAt,
    durationSec,
    device: input.device || detectDevice(),
  });

  allAttempts.push(attemptDoc);
  saveAllAttemptsRaw(allAttempts);

  const dailyStatsMap = loadAllDailyStatsRaw();
  const updatedDailyStat = applyAttemptToDailyStatsMap(dailyStatsMap, attemptDoc);
  saveAllDailyStatsRaw(dailyStatsMap);

  // Đồng bộ ngầm lên Cloud Firestore nếu có cấu hình
  void syncDocToCloudFirestore('attempts', attemptDoc.id, attemptDoc);
  void syncDocToCloudFirestore('dailyStats', updatedDailyStat.id, updatedDailyStat);

  return { attempt: attemptDoc, dailyStat: updatedDailyStat };
}

/**
 * Security Rules: Cấm sửa hoặc xoá attempt đã ghi (`allow update, delete: if false;`)
 */
export function updateAttempt(): never {
  throw new Error(
    '[Firestore Security Rules] Học sinh và giáo viên không được phép sửa (update) attempts đã ghi.'
  );
}

export function deleteAttempt(): never {
  throw new Error(
    '[Firestore Security Rules] Học sinh và giáo viên không được phép xoá (delete) attempts đã ghi.'
  );
}

/**
 * Chuyển 1 phiên học kỹ năng (Từ vựng, Phát âm, Đọc, Viết, Trò chơi) thành 1 attempt
 * (mỗi lần nộp bài = 1 document). Không chứa họ tên học sinh.
 */
export function buildSessionAttemptInput(
  student: StudentAccount,
  session: StudySession
): RecordAttemptInput {
  const skill = mapAppSkillToAttemptSkill(session.skill);
  const unitId = normalizeUnitId(session.unitId);
  const submittedAt = session.date || new Date().toISOString();
  const durationSec = Math.max(1, Math.round(session.timeSpentSeconds || 0));
  const scoreRatio = Math.max(0, Math.min(1, Number(((session.score || 0) / 100).toFixed(2))));
  return {
    studentId: student.id,
    schoolName: student.schoolName,
    communeName: student.communeName,
    provinceName: student.provinceName,
    className: student.className,
    grade: student.grade || 6,
    unitId,
    skill,
    setId: `${skill}-${unitId}`,
    itemId: `session_${session.id}`,
    // Một bài được tính "đúng" khi đạt từ 70% trở lên
    correct: scoreRatio >= 0.7,
    score: scoreRatio,
    answer: `Hoàn thành ${session.correctAnswers}/${session.totalQuestions} câu (${session.score}%)`,
    startedAt: new Date(new Date(submittedAt).getTime() - durationSec * 1000).toISOString(),
    submittedAt,
    durationSec,
  };
}

/**
 * Đồng bộ dữ liệu lịch sử sẵn có (từ `grammar-g6` và `sessions` của học sinh)
 * sang 2 collection `attempts` và `dailyStats` nếu chưa được đánh chỉ mục.
 */
export function ensureAnalyticsSyncedFromLocalData(
  appData: AppDataSchema,
  grammarBundle: LoadedGrammarBundle | null,
  classGrammarStores: Record<string, GrammarStudentStore>
): { attempts: FirestoreAttemptDoc[]; dailyStats: Record<string, FirestoreDailyStatDoc> } {
  const existingAttempts = loadAllAttemptsRaw();
  const existingStats = loadAllDailyStatsRaw();

  const studentMap = new Map<string, StudentAccount>();
  for (const st of appData.students) {
    studentMap.set(st.id, st);
  }

  // Chống trùng lặp:
  // - Ngữ pháp: cùng học sinh + cùng câu (itemId gốc) + thời điểm nộp lệch nhau <= 10 giây
  //   (attempt ghi trực tiếp lúc làm bài và bản ghi Sổ lỗi sai chênh nhau vài mili giây).
  // - Phiên kỹ năng (session): itemId `session_<id>` là duy nhất.
  const DEDUPE_WINDOW_MS = 10_000;
  const submittedTimesByItem = new Map<string, number[]>();
  const existingItemIds = new Set<string>();
  const itemAttemptCounts = new Map<string, number>();
  for (const a of existingAttempts) {
    const baseKey = `${a.studentId}|${a.itemId.split('#')[0]}`;
    const arr = submittedTimesByItem.get(baseKey) || [];
    arr.push(new Date(a.submittedAt).getTime());
    submittedTimesByItem.set(baseKey, arr);
    existingItemIds.add(`${a.studentId}|${a.itemId}`);
    itemAttemptCounts.set(baseKey, (itemAttemptCounts.get(baseKey) || 0) + 1);
  }
  const isDuplicateGrammar = (baseKey: string, atMs: number) =>
    (submittedTimesByItem.get(baseKey) || []).some((t) => Math.abs(t - atMs) <= DEDUPE_WINDOW_MS);

  let addedAny = false;

  // 1. Đồng bộ từ GrammarG6 attempts của từng học sinh
  for (const [studentId, store] of Object.entries(classGrammarStores)) {
    const st = studentMap.get(studentId);
    if (!st) continue;
    const schoolId = toSchoolId(st.schoolName, st.communeName, st.provinceName);
    const className = normalizeClassName(st.className || '6A1');

    // Gộp các ô trống của bài cloze (itemId#n cùng thời điểm) thành 1 lần nộp
    const grouped = new Map<
      string,
      { baseItemId: string; setId: string; unitId: string; at: string; parts: { correct: boolean; answer: string }[] }
    >();
    for (const rec of store.attempts || []) {
      const baseItemId = rec.itemId.split('#')[0];
      const at = rec.at || new Date().toISOString();
      const gKey = `${baseItemId}|${at}`;
      const g = grouped.get(gKey) || { baseItemId, setId: rec.setId, unitId: rec.unitId, at, parts: [] };
      g.parts.push({ correct: rec.correct, answer: rec.answer });
      grouped.set(gKey, g);
    }

    for (const g of grouped.values()) {
      const baseKey = `${studentId}|${g.baseItemId}`;
      const atMs = new Date(g.at).getTime();
      if (isDuplicateGrammar(baseKey, atMs)) continue;

      const entry = grammarBundle?.itemIndex[g.baseItemId];
      const grammarPointId = entry?.set.grammarPointId;
      const correctParts = g.parts.filter((p) => p.correct).length;
      const allCorrect = correctParts === g.parts.length;

      const nextNo = (itemAttemptCounts.get(baseKey) || 0) + 1;
      itemAttemptCounts.set(baseKey, nextNo);

      // Dữ liệu cũ không lưu thời lượng từng câu → ước tính 15 giây/câu
      const durationSec = 15;
      const startedAt = new Date(atMs - durationSec * 1000).toISOString();

      const attemptDoc = stripPiiFromAttempt({
        id: `att_sync_g6_${studentId}_${g.baseItemId}_${nextNo}`,
        studentId,
        schoolId,
        className,
        grade: st.grade || 6,
        unitId: normalizeUnitId(g.unitId),
        skill: 'grammar',
        setId: g.setId,
        itemId: g.baseItemId,
        grammarPointId,
        correct: allCorrect,
        score: g.parts.length > 0 ? Number((correctParts / g.parts.length).toFixed(2)) : 0,
        answer: g.parts.map((p) => p.answer).join(' | '),
        attemptNo: nextNo,
        startedAt,
        submittedAt: g.at,
        durationSec,
        device: 'desktop',
      });

      existingAttempts.push(attemptDoc);
      applyAttemptToDailyStatsMap(existingStats, attemptDoc);
      const arr = submittedTimesByItem.get(baseKey) || [];
      arr.push(atMs);
      submittedTimesByItem.set(baseKey, arr);
      addedAny = true;
    }
  }

  // 2. Đồng bộ từ StudySession của từng học sinh (Từ vựng, Phát âm, Đọc, Viết, Game)
  for (const st of appData.students) {
    const schoolId = toSchoolId(st.schoolName, st.communeName, st.provinceName);
    const className = normalizeClassName(st.className || '6A1');
    const sessions: StudySession[] = st.sessions || [];

    for (const sess of sessions) {
      // Phiên Ngữ pháp đã được ghi chi tiết từng câu ở bước 1 → bỏ qua để không đếm trùng
      if (mapAppSkillToAttemptSkill(sess.skill) === 'grammar') continue;
      const itemId = `session_${sess.id}`;
      if (existingItemIds.has(`${st.id}|${itemId}`)) continue;

      const input = buildSessionAttemptInput(st, sess);
      const attemptDoc = stripPiiFromAttempt({
        ...input,
        id: `att_sync_sess_${sess.id}`,
        schoolId,
        className,
        grade: st.grade || 6,
        unitId: normalizeUnitId(input.unitId),
        attemptNo: 1,
        device: 'desktop',
      });

      existingAttempts.push(attemptDoc);
      applyAttemptToDailyStatsMap(existingStats, attemptDoc);
      existingItemIds.add(`${st.id}|${itemId}`);
      addedAny = true;
    }
  }

  if (addedAny) {
    saveAllAttemptsRaw(existingAttempts);
    saveAllDailyStatsRaw(existingStats);
  }

  return { attempts: existingAttempts, dailyStats: existingStats };
}

/**
 * Kiểm tra quyền đọc của Giáo viên theo đúng Security Rules:
 * "Giáo viên chỉ đọc attempts của học sinh cùng trường" (Admin được đọc toàn hệ thống).
 */
export function canTeacherReadSchool(
  teacher: TeacherAccount | null,
  isAdmin: boolean,
  targetSchoolId: string
): boolean {
  if (isAdmin) return true;
  if (!teacher) return true; // Chế độ xem phụ huynh cục bộ trên cùng thiết bị
  const teacherSchoolId = toSchoolId(
    teacher.schoolName,
    teacher.communeName,
    teacher.provinceName
  );
  return isSameSchoolId(teacherSchoolId, targetSchoolId);
}

/**
 * So sánh 2 mã trường: cùng tên trường và (cùng xã/phường hoặc một bên chưa khai báo xã/phường).
 */
export function isSameSchoolId(a: string, b: string): boolean {
  if (a === b) return true;
  const [schoolA, placeA] = a.split('__');
  const [schoolB, placeB] = b.split('__');
  if (schoolA !== schoolB) return false;
  return !placeA || !placeB || placeA === placeB;
}

/**
 * Tính nhãn tuần từ ngày ISO (VD: "Tuần 02/11 - 08/11")
 */
function getWeekStartAndLabel(isoDateStr: string): { weekKey: string; weekLabel: string } {
  const d = new Date(isoDateStr);
  if (Number.isNaN(d.getTime())) {
    return { weekKey: 'unknown', weekLabel: 'Không rõ' };
  }
  const day = d.getDay(); // 0 (CN) .. 6 (T7)
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const yyyy = monday.getFullYear();
  const mm = String(monday.getMonth() + 1).padStart(2, '0');
  const dd = String(monday.getDate()).padStart(2, '0');
  const weekKey = `${yyyy}-${mm}-${dd}`;

  const endDd = String(sunday.getDate()).padStart(2, '0');
  const endMm = String(sunday.getMonth() + 1).padStart(2, '0');
  const weekLabel = `${dd}/${mm}–${endDd}/${endMm}`;

  return { weekKey, weekLabel };
}

/**
 * Truy vấn & Tổng hợp dữ liệu cho Trang "Báo cáo" của Giáo viên.
 * Sử dụng kết hợp `dailyStats` (để tính nhanh thời gian học & thống kê theo ngày)
 * và `attempts` (để lọc sâu theo Unit, kỹ năng, điểm ngữ pháp sai nhiều nhất + câu trả lời sai phổ biến).
 */
export function buildTeacherAnalyticsReport(params: {
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  filter: AnalyticsReportFilter;
  grammarBundle: LoadedGrammarBundle | null;
  classGrammarStores: Record<string, GrammarStudentStore>;
  /** Danh sách học sinh giáo viên phụ trách (từ getTeacherStudents); mặc định toàn bộ học sinh */
  scopeStudents?: StudentAccount[];
}): TeacherAnalyticsReportResult {
  const { appData, currentTeacher, isAdmin, filter, grammarBundle, classGrammarStores } = params;

  const { attempts: allAttempts, dailyStats: allDailyStats } =
    ensureAnalyticsSyncedFromLocalData(appData, grammarBundle, classGrammarStores);

  // 1. Xác định danh sách trường và học sinh mà giáo viên có quyền xem (theo Security Rules)
  const teacherSchoolId = currentTeacher
    ? toSchoolId(
        currentTeacher.schoolName,
        currentTeacher.communeName,
        currentTeacher.provinceName
      )
    : null;

  const baseStudents = params.scopeStudents ?? appData.students;
  const permittedStudents = baseStudents.filter((st) => {
    const stSchoolId = toSchoolId(st.schoolName, st.communeName, st.provinceName);
    if (
      !isAdmin &&
      currentTeacher &&
      teacherSchoolId &&
      !isSameSchoolId(stSchoolId, teacherSchoolId)
    ) {
      return false;
    }
    if (
      !params.scopeStudents &&
      !isAdmin &&
      currentTeacher &&
      currentTeacher.managedClasses &&
      currentTeacher.managedClasses.length > 0
    ) {
      const normCls = normalizeClassName(st.className);
      const allowed = currentTeacher.managedClasses.map((c) => normalizeClassName(c));
      if (!allowed.includes(normCls)) return false;
    }
    return true;
  });

  // Danh sách trường khả dụng trong phạm vi quyền của giáo viên
  const schoolMap = new Map<string, string>();
  if (currentTeacher?.schoolName) {
    const tId = toSchoolId(
      currentTeacher.schoolName,
      currentTeacher.communeName,
      currentTeacher.provinceName
    );
    schoolMap.set(tId, currentTeacher.schoolName);
  }
  for (const st of permittedStudents) {
    const sId = toSchoolId(st.schoolName, st.communeName, st.provinceName);
    const label = st.schoolName || 'THCS Chu Văn An';
    if (!schoolMap.has(sId)) {
      schoolMap.set(sId, label);
    }
  }
  const availableSchools = Array.from(schoolMap.entries()).map(([schoolId, schoolName]) => ({
    schoolId,
    schoolName,
  }));

  // Lọc học sinh theo Trường + Lớp
  const scopedStudents = permittedStudents.filter((st) => {
    const stSchoolId = toSchoolId(st.schoolName, st.communeName, st.provinceName);
    if (filter.schoolId !== 'all' && !isSameSchoolId(stSchoolId, filter.schoolId)) {
      return false;
    }
    if (
      filter.className !== 'all' &&
      normalizeClassName(st.className) !== normalizeClassName(filter.className)
    ) {
      return false;
    }
    return true;
  });

  // Sắp xếp học sinh theo Lớp -> Tên để gán mã ẩn danh HS01, HS02... cố định, nhất quán
  const sortedScopedStudents = [...scopedStudents].sort((a, b) => {
    const clsCmp = normalizeClassName(a.className).localeCompare(
      normalizeClassName(b.className),
      'vi'
    );
    if (clsCmp !== 0) return clsCmp;
    return a.fullName.localeCompare(b.fullName, 'vi');
  });

  const scopedStudentIdSet = new Set(sortedScopedStudents.map((s) => s.id));
  const studentLookup = new Map<string, { student: StudentAccount; anonymousCode: string }>();
  sortedScopedStudents.forEach((st, idx) => {
    const code = `HS${String(idx + 1).padStart(2, '0')}`;
    studentLookup.set(st.id, { student: st, anonymousCode: code });
  });

  const availableClasses = Array.from(
    new Set(
      permittedStudents
        .filter((st) =>
          filter.schoolId === 'all'
            ? true
            : isSameSchoolId(toSchoolId(st.schoolName, st.communeName, st.provinceName), filter.schoolId)
        )
        .map((st) => normalizeClassName(st.className))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'vi'));

  // 2. Xác định khoảng thời gian lọc (fromDate .. toDate)
  const now = new Date();
  let minDateStr: string | null = null;
  let maxDateStr: string | null = null;

  if (filter.dateRange === '7d') {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    minDateStr = d.toISOString().slice(0, 10);
  } else if (filter.dateRange === '30d') {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    minDateStr = d.toISOString().slice(0, 10);
  } else if (filter.dateRange === '90d') {
    const d = new Date(now);
    d.setDate(d.getDate() - 89);
    minDateStr = d.toISOString().slice(0, 10);
  } else if (filter.dateRange === 'custom') {
    if (filter.customFromDate) minDateStr = filter.customFromDate;
    if (filter.customToDate) maxDateStr = filter.customToDate;
  }

  // 3. Lọc danh sách `attempts` theo đúng Security Rules + 5 bộ lọc (Trường, Lớp, Unit, Kỹ năng, Thời gian)
  const filteredAttempts = allAttempts.filter((att) => {
    if (!scopedStudentIdSet.has(att.studentId)) return false;
    if (!canTeacherReadSchool(currentTeacher, isAdmin, att.schoolId)) return false;
    if (filter.schoolId !== 'all' && !isSameSchoolId(att.schoolId, filter.schoolId)) return false;
    if (
      filter.className !== 'all' &&
      normalizeClassName(att.className) !== normalizeClassName(filter.className)
    ) {
      return false;
    }
    if (filter.unitId !== 'all' && normalizeUnitId(att.unitId) !== normalizeUnitId(filter.unitId)) {
      return false;
    }
    if (filter.skill !== 'all' && att.skill !== filter.skill) {
      return false;
    }
    const dateStr = att.submittedAt.slice(0, 10);
    if (minDateStr && dateStr < minDateStr) return false;
    if (maxDateStr && dateStr > maxDateStr) return false;
    return true;
  });

  // Lọc `dailyStats` tương ứng (để phục vụ nạp nhanh khi không lọc sâu theo cả Unit + Skill cùng lúc)
  const filteredDailyStats = Object.values(allDailyStats).filter((stat) => {
    if (!scopedStudentIdSet.has(stat.studentId)) return false;
    if (!canTeacherReadSchool(currentTeacher, isAdmin, stat.schoolId)) return false;
    if (minDateStr && stat.date < minDateStr) return false;
    if (maxDateStr && stat.date > maxDateStr) return false;
    return true;
  });

  // 4. Tính toán bảng Học sinh & Thẻ tổng quan
  const allSkills: AttemptSkill[] = [
    'grammar',
    'vocab',
    'pronunciation',
    'reading',
    'writing',
    'game',
  ];

  const attemptsByStudent = new Map<string, FirestoreAttemptDoc[]>();
  for (const att of filteredAttempts) {
    const arr = attemptsByStudent.get(att.studentId) || [];
    arr.push(att);
    attemptsByStudent.set(att.studentId, arr);
  }

  const dailyStatsByStudent = new Map<string, FirestoreDailyStatDoc[]>();
  for (const stStat of filteredDailyStats) {
    const arr = dailyStatsByStudent.get(stStat.studentId) || [];
    arr.push(stStat);
    dailyStatsByStudent.set(stStat.studentId, arr);
  }

  const studentRows: StudentAnalyticsRow[] = sortedScopedStudents.map((st) => {
    const info = studentLookup.get(st.id)!;
    const stAttempts = (attemptsByStudent.get(st.id) || []).sort((a, b) =>
      b.submittedAt.localeCompare(a.submittedAt)
    );
    const stDailyStats = (dailyStatsByStudent.get(st.id) || []).sort((a, b) =>
      b.date.localeCompare(a.date)
    );

    const bySkill = {} as StudentAnalyticsRow['bySkill'];
    for (const sk of allSkills) {
      bySkill[sk] = { attempts: 0, correct: 0, accuracyPct: 0, studyMinutes: 0 };
    }

    let totalDurationSec = 0;
    let attemptCount = 0;
    let correctCount = 0;
    let lastStudiedAt: string | null = null;

    // Nếu không lọc theo Unit hoặc Skill, ưu tiên lấy tổng hợp nhanh từ collection `dailyStats`
    if (filter.unitId === 'all' && filter.skill === 'all' && stDailyStats.length > 0) {
      for (const ds of stDailyStats) {
        totalDurationSec += ds.totalDurationSec;
        attemptCount += ds.totalAttempts;
        correctCount += ds.correctAttempts;
        for (const sk of allSkills) {
          const skStat = ds.bySkill[sk];
          if (skStat) {
            bySkill[sk].attempts += skStat.attempts;
            bySkill[sk].correct += skStat.correct;
            bySkill[sk].studyMinutes =
              Math.round((bySkill[sk].studyMinutes + skStat.durationSec / 60) * 10) / 10;
          }
        }
      }
    } else {
      for (const att of stAttempts) {
        totalDurationSec += att.durationSec;
        attemptCount += 1;
        if (att.correct) correctCount += 1;
        bySkill[att.skill].attempts += 1;
        if (att.correct) bySkill[att.skill].correct += 1;
        bySkill[att.skill].studyMinutes =
          Math.round((bySkill[att.skill].studyMinutes + att.durationSec / 60) * 10) / 10;
      }
    }

    for (const sk of allSkills) {
      bySkill[sk].accuracyPct =
        bySkill[sk].attempts > 0
          ? Math.round((bySkill[sk].correct / bySkill[sk].attempts) * 100)
          : 0;
    }

    if (stAttempts.length > 0) {
      lastStudiedAt = stAttempts[0].submittedAt;
    } else if (stDailyStats.length > 0) {
      lastStudiedAt = stDailyStats[0].updatedAt || `${stDailyStats[0].date}T12:00:00.000Z`;
    }

    const studyMinutes = Math.round((totalDurationSec / 60) * 10) / 10;
    const studyHours = Math.round((studyMinutes / 60) * 100) / 100;
    const accuracyPct = attemptCount > 0 ? Math.round((correctCount / attemptCount) * 100) : 0;

    const dailyBreakdown = stDailyStats.map((ds) => ({
      date: ds.date,
      studyMinutes: ds.studyMinutes,
      totalAttempts: ds.totalAttempts,
      correctAttempts: ds.correctAttempts,
      accuracyPct: Math.round(ds.accuracyRate * 100),
    }));

    return {
      studentId: st.id,
      anonymousCode: info.anonymousCode,
      fullName: st.fullName,
      username: st.username,
      avatar: st.avatar || '🎓',
      className: normalizeClassName(st.className),
      schoolId: toSchoolId(st.schoolName, st.communeName, st.provinceName),
      schoolName: st.schoolName || 'THCS Chu Văn An',
      studyMinutes,
      studyHours,
      totalDurationSec,
      attemptCount,
      correctCount,
      accuracyPct,
      lastStudiedAt,
      bySkill,
      dailyBreakdown,
      recentAttempts: stAttempts.slice(0, 50),
    };
  });

  // Thẻ tổng quan (Overview cards)
  const activeStudentsCount = studentRows.filter((r) => r.attemptCount > 0).length;
  const totalStudyMinutes =
    Math.round(studentRows.reduce((acc, r) => acc + r.studyMinutes, 0) * 10) / 10;
  const totalStudyHours = Math.round((totalStudyMinutes / 60) * 100) / 100;
  const totalAttempts = studentRows.reduce((acc, r) => acc + r.attemptCount, 0);
  const totalCorrect = studentRows.reduce((acc, r) => acc + r.correctCount, 0);
  const avgAccuracyPct =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  // 5. Biểu đồ số phút học theo tuần
  const weekBuckets = new Map<
    string,
    {
      weekKey: string;
      weekLabel: string;
      durationSec: number;
      attemptCount: number;
      studentSet: Set<string>;
    }
  >();

  // Tạo sẵn 4 tuần gần nhất để biểu đồ luôn hiển thị đầy đủ trục thời gian
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    const { weekKey, weekLabel } = getWeekStartAndLabel(d.toISOString());
    if (!weekBuckets.has(weekKey)) {
      weekBuckets.set(weekKey, {
        weekKey,
        weekLabel,
        durationSec: 0,
        attemptCount: 0,
        studentSet: new Set(),
      });
    }
  }

  for (const att of filteredAttempts) {
    const { weekKey, weekLabel } = getWeekStartAndLabel(att.submittedAt);
    const bucket = weekBuckets.get(weekKey) || {
      weekKey,
      weekLabel,
      durationSec: 0,
      attemptCount: 0,
      studentSet: new Set<string>(),
    };
    bucket.durationSec += att.durationSec;
    bucket.attemptCount += 1;
    bucket.studentSet.add(att.studentId);
    weekBuckets.set(weekKey, bucket);
  }

  const weeklyStudyChart: WeeklyStudyPoint[] = Array.from(weekBuckets.values())
    .sort((a, b) => a.weekKey.localeCompare(b.weekKey))
    .slice(-8)
    .map((b) => {
      const mins = Math.round((b.durationSec / 60) * 10) / 10;
      return {
        weekKey: b.weekKey,
        weekLabel: b.weekLabel,
        studyMinutes: mins,
        studyHours: Math.round((mins / 60) * 100) / 100,
        attemptCount: b.attemptCount,
        activeStudents: b.studentSet.size,
      };
    });

  // 6. Biểu đồ tỉ lệ đúng theo Unit (Unit 1 .. Unit 12)
  const unitAccuracyChart: UnitAccuracyPoint[] = appData.units.map((u) => {
    const normU = normalizeUnitId(u.id);
    const unitAttempts = filteredAttempts.filter((a) => normalizeUnitId(a.unitId) === normU);
    const count = unitAttempts.length;
    const correct = unitAttempts.filter((a) => a.correct).length;
    const durationSec = unitAttempts.reduce((acc, a) => acc + a.durationSec, 0);
    return {
      unitId: normU,
      unitLabel: `U${u.unitNumber}`,
      unitTitle: `Unit ${u.unitNumber}: ${u.title}`,
      attemptCount: count,
      correctCount: correct,
      accuracyPct: count > 0 ? Math.round((correct / count) * 100) : 0,
      studyMinutes: Math.round((durationSec / 60) * 10) / 10,
    };
  });

  // 7. Bảng 10 điểm ngữ pháp / câu hỏi lớp sai nhiều nhất, kèm câu trả lời sai phổ biến nhất
  const itemAggMap = new Map<
    string,
    {
      itemId: string;
      grammarPointId?: string;
      unitId: string;
      skill: AttemptSkill;
      totalAttempts: number;
      wrongCount: number;
      wrongAnswersFreq: Map<string, number>;
      studentIdsWithMistake: Set<string>;
    }
  >();

  for (const att of filteredAttempts) {
    const baseItemId = att.itemId.split('#')[0];
    const agg = itemAggMap.get(baseItemId) || {
      itemId: baseItemId,
      grammarPointId: att.grammarPointId,
      unitId: att.unitId,
      skill: att.skill,
      totalAttempts: 0,
      wrongCount: 0,
      wrongAnswersFreq: new Map<string, number>(),
      studentIdsWithMistake: new Set<string>(),
    };

    agg.totalAttempts += 1;
    if (att.grammarPointId && !agg.grammarPointId) {
      agg.grammarPointId = att.grammarPointId;
    }

    if (!att.correct) {
      agg.wrongCount += 1;
      agg.studentIdsWithMistake.add(att.studentId);
      const cleanAns = (att.answer || '').trim() || '(Bỏ trống)';
      agg.wrongAnswersFreq.set(cleanAns, (agg.wrongAnswersFreq.get(cleanAns) || 0) + 1);
    }

    itemAggMap.set(baseItemId, agg);
  }

  const topMissedItems: TopMissedGrammarQuestionRow[] = Array.from(itemAggMap.values())
    .filter((it) => it.wrongCount > 0)
    .sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
      return b.studentIdsWithMistake.size - a.studentIdsWithMistake.size;
    })
    .slice(0, 10)
    .map((it, idx) => {
      const entry = grammarBundle?.itemIndex[it.itemId];
      const gpId = it.grammarPointId || entry?.set.grammarPointId || it.itemId;
      const gpEntry = gpId ? grammarBundle?.grammarPointIndex[gpId] : undefined;

      const grammarPointTitle = gpEntry
        ? `${gpEntry.point.titleVi} (${gpEntry.point.title})`
        : entry
        ? entry.set.title
        : `Chủ điểm ${ATTEMPT_SKILL_LABELS[it.skill]}`;

      const questionPrompt = entry
        ? formatItemPreview(entry)
        : `Bài tập ${ATTEMPT_SKILL_LABELS[it.skill]} (${it.itemId})`;

      let mostCommonWrongAnswer = '—';
      let mostCommonWrongCount = 0;
      for (const [ansText, freq] of it.wrongAnswersFreq.entries()) {
        if (freq > mostCommonWrongCount) {
          mostCommonWrongCount = freq;
          mostCommonWrongAnswer = ansText;
        }
      }

      const unitNumMatch = it.unitId.match(/(\d+)/);
      const unitNumber = unitNumMatch ? parseInt(unitNumMatch[1], 10) : 1;

      return {
        rank: idx + 1,
        key: it.itemId,
        grammarPointId: gpId,
        grammarPointTitle,
        itemId: it.itemId,
        questionPrompt,
        unitId: it.unitId,
        unitNumber,
        skill: it.skill,
        skillLabel: ATTEMPT_SKILL_LABELS[it.skill],
        totalAttempts: it.totalAttempts,
        wrongCount: it.wrongCount,
        errorRatePct:
          it.totalAttempts > 0 ? Math.round((it.wrongCount / it.totalAttempts) * 100) : 100,
        mostCommonWrongAnswer,
        mostCommonWrongCount,
        affectedStudentCount: it.studentIdsWithMistake.size,
        affectedStudentIds: Array.from(it.studentIdsWithMistake),
      };
    });

  // 8. Tổng hợp theo Lớp (phục vụ sheet "Theo lớp" khi xuất Excel)
  const classBuckets = new Map<string, StudentAnalyticsRow[]>();
  for (const row of studentRows) {
    const arr = classBuckets.get(row.className) || [];
    arr.push(row);
    classBuckets.set(row.className, arr);
  }

  const classRows: ClassAnalyticsSummaryRow[] = Array.from(classBuckets.entries())
    .sort(([clsA], [clsB]) => clsA.localeCompare(clsB, 'vi'))
    .map(([className, rows]) => {
      const totalStudents = rows.length;
      const activeStudents = rows.filter((r) => r.attemptCount > 0).length;
      const studyMinutes =
        Math.round(rows.reduce((acc, r) => acc + r.studyMinutes, 0) * 10) / 10;
      const studyHours = Math.round((studyMinutes / 60) * 100) / 100;
      const attemptCount = rows.reduce((acc, r) => acc + r.attemptCount, 0);
      const correctCount = rows.reduce((acc, r) => acc + r.correctCount, 0);
      const accuracyPct =
        attemptCount > 0 ? Math.round((correctCount / attemptCount) * 100) : 0;

      return {
        className,
        schoolId: rows[0]?.schoolId || 'thcs-chu-van-an',
        schoolName: rows[0]?.schoolName || 'THCS Chu Văn An',
        totalStudents,
        activeStudents,
        studyMinutes,
        studyHours,
        attemptCount,
        correctCount,
        accuracyPct,
      };
    });

  return {
    overview: {
      totalStudentsInScope: studentRows.length,
      activeStudentsCount,
      totalStudyMinutes,
      totalStudyHours,
      totalAttempts,
      totalCorrect,
      avgAccuracyPct,
    },
    weeklyStudyChart,
    unitAccuracyChart,
    topMissedItems,
    studentRows,
    classRows,
    filteredAttempts,
    availableSchools,
    availableClasses,
  };
}
