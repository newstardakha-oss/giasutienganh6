import { useEffect, useRef, useState, useCallback } from 'react';
import {
  AppDataSchema,
  StudentAccount,
  TeacherAccount,
  AuditLogEntry,
  MigrationReport,
} from '../types';
import { loadAppData, saveAppData } from './storage';

const BROADCAST_CHANNEL_NAME = 'giasu_ai_realtime_v1';

let inMemorySessionToken: string | null = null;
let inMemorySseToken: string | null = null;
let lastKnownRevision: number = 0;

export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (inMemorySessionToken) {
    headers['Authorization'] = `Bearer ${inMemorySessionToken}`;
  }
  return headers;
}

export function broadcastLocalStateChange(revision?: number) {
  if (typeof window === 'undefined') return;
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.postMessage({
        type: 'local_storage_updated',
        revision: revision || Date.now(),
        timestamp: new Date().toISOString(),
      });
      bc.close();
    }
    window.dispatchEvent(
      new CustomEvent('giasu-realtime-update', {
        detail: { revision: revision || Date.now() },
      })
    );
  } catch {
    // ignore
  }
}

export async function establishServerSession(
  actorType: 'teacher' | 'student',
  actorId: string,
  clientStoreSnapshot?: AppDataSchema
): Promise<{ ok: boolean; revision?: number }> {
  try {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        actorType,
        actorId,
        clientStoreSnapshot,
      }),
    });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    if (data.token) inMemorySessionToken = data.token;
    if (data.sseToken) inMemorySseToken = data.sseToken;
    if (data.revision) lastKnownRevision = data.revision;
    return { ok: true, revision: data.revision };
  } catch {
    return { ok: false };
  }
}

export async function syncEntityToServer(
  entityType: 'student' | 'teacher',
  entity: StudentAccount | TeacherAccount,
  appData?: AppDataSchema
): Promise<void> {
  try {
    await fetch('/api/sync/register-entity', {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        entityType,
        entity,
        schools: appData?.schools,
        customCommunes: appData?.customCommunes,
      }),
    });
    broadcastLocalStateChange();
  } catch {
    // fallback silently when offline
  }
}

export async function fetchServerScopedState(): Promise<
  (Partial<AppDataSchema> & { role?: 'admin' | 'teacher'; schoolId?: string; managedClasses?: string[] }) | null
> {
  try {
    const res = await fetch('/api/manage/state', {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.revision) lastKnownRevision = data.revision;
    return data;
  } catch {
    return null;
  }
}

async function refreshShortLivedSseToken(): Promise<string | null> {
  try {
    const res = await fetch('/api/auth/sse-token', {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.sseToken) {
      inMemorySseToken = data.sseToken;
      return data.sseToken;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Hook lắng nghe thay đổi thời gian thực cho App, ParentDashboard và TeacherManagementPanel:
 * - Kết nối SSE (`/api/events`) với xác thực cookie/token ngắn hạn.
 * - Tự động kết nối lại (exponential backoff) khi mất mạng và gọi `fetchServerScopedState()` ngay sau khi nối lại.
 * - Kết hợp `BroadcastChannel` và `window.onstorage` để đồng bộ tức thì giữa các tab/trình duyệt.
 */
export function useRealtimeSync(params: {
  enabled: boolean;
  actorId: string | null;
  isTeacher: boolean;
  appData: AppDataSchema;
  onServerStateSynced: (updater: (prev: AppDataSchema) => AppDataSchema) => void;
}) {
  const { enabled, actorId, isTeacher, appData, onServerStateSynced } = params;
  const [connectionState, setConnectionState] = useState<'connected' | 'reconnecting' | 'offline'>(
    'offline'
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const appDataRef = useRef(appData);
  appDataRef.current = appData;

  const pullAndMergeServerState = useCallback(async () => {
    if (!isTeacher || !actorId) return;
    const remote = await fetchServerScopedState();
    if (!remote) return;

    onServerStateSynced((prev) => {
      // Merge remote students with local students so local registrations are never overwritten by an empty serverless instance
      const mergedStudentMap = new Map<string, StudentAccount>();
      prev.students.forEach((s) => mergedStudentMap.set(s.id, s));
      if (Array.isArray(remote.students)) {
        remote.students.forEach((rs) => {
          const existing = mergedStudentMap.get(rs.id);
          if (!existing || (rs.sessions?.length || 0) >= (existing.sessions?.length || 0)) {
            mergedStudentMap.set(rs.id, { ...(existing || {}), ...rs });
          }
        });
      }

      const mergedTeacherMap = new Map<string, TeacherAccount>();
      prev.teachers.forEach((t) => mergedTeacherMap.set(t.id, t));
      if (Array.isArray(remote.teachers)) {
        remote.teachers.forEach((rt) => {
          mergedTeacherMap.set(rt.id, { ...(mergedTeacherMap.get(rt.id) || {}), ...rt });
        });
      }

      const next: AppDataSchema = {
        ...prev,
        revision: remote.revision ?? prev.revision,
        schools: remote.schools && remote.schools.length > 0 ? remote.schools : prev.schools,
        customCommunes: remote.customCommunes || prev.customCommunes,
        customClasses: remote.customClasses || prev.customClasses,
        classCurrentUnits: remote.classCurrentUnits || prev.classCurrentUnits,
        students: Array.from(mergedStudentMap.values()),
        teachers: Array.from(mergedTeacherMap.values()),
        activationCodes:
          remote.role === 'admin' && Array.isArray(remote.activationCodes) && remote.activationCodes.length > 0
            ? remote.activationCodes
            : prev.activationCodes,
        auditLogs:
          Array.isArray(remote.auditLogs) && remote.auditLogs.length > 0
            ? remote.auditLogs
            : prev.auditLogs,
        unmappedMigrationQueue:
          remote.role === 'admin' && Array.isArray(remote.unmappedMigrationQueue)
            ? remote.unmappedMigrationQueue
            : prev.unmappedMigrationQueue,
      };
      saveAppData(next);
      return next;
    });
    setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'));
  }, [actorId, isTeacher, onServerStateSynced]);

  // 1. Storage & BroadcastChannel listeners (instant cross-tab sync)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLocalStorageChange = (e: StorageEvent) => {
      if (e.key === 'giasu_ai_english6_data_v1' && e.newValue) {
        const fresh = loadAppData();
        onServerStateSynced((prev) => ({
          ...fresh,
          isTeacherLoggedIn: prev.isTeacherLoggedIn,
          currentTeacherId: prev.currentTeacherId,
          currentStudentId: prev.currentStudentId,
        }));
        setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'));
      }
    };

    const handleCustomRealtime = () => {
      if (isTeacher && actorId) {
        pullAndMergeServerState();
      }
    };

    window.addEventListener('storage', handleLocalStorageChange);
    window.addEventListener('giasu-realtime-update', handleCustomRealtime);

    let bc: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.onmessage = () => {
        const fresh = loadAppData();
        onServerStateSynced((prev) => ({
          ...fresh,
          isTeacherLoggedIn: prev.isTeacherLoggedIn,
          currentTeacherId: prev.currentTeacherId,
          currentStudentId: prev.currentStudentId,
        }));
        if (isTeacher && actorId) {
          pullAndMergeServerState();
        }
        setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'));
      };
    }

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
      window.removeEventListener('giasu-realtime-update', handleCustomRealtime);
      bc?.close();
    };
  }, [actorId, isTeacher, onServerStateSynced, pullAndMergeServerState]);

  // 2. Authenticated SSE stream with auto-reconnect & post-reconnect state reload
  useEffect(() => {
    if (!enabled || !isTeacher || !actorId || typeof window === 'undefined') {
      setConnectionState('offline');
      return;
    }

    let isCancelled = false;
    let es: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let retryAttempt = 0;

    const connectSse = async () => {
      if (isCancelled) return;
      setConnectionState(retryAttempt > 0 ? 'reconnecting' : 'offline');

      const sessionRes = await establishServerSession('teacher', actorId, appDataRef.current);
      if (!sessionRes.ok || isCancelled) {
        scheduleReconnect();
        return;
      }

      const token = inMemorySseToken || (await refreshShortLivedSseToken());
      if (isCancelled) return;

      const url = `/api/events?sinceRevision=${lastKnownRevision}${
        token ? `&token=${encodeURIComponent(token)}` : ''
      }`;

      es = new EventSource(url, { withCredentials: true });

      es.onopen = () => {
        if (isCancelled) return;
        retryAttempt = 0;
        setConnectionState('connected');
        // Reload latest state immediately after connecting / reconnecting
        pullAndMergeServerState();
      };

      es.onmessage = (event) => {
        if (isCancelled) return;
        try {
          const payload = JSON.parse(event.data);
          if (payload.revision) {
            lastKnownRevision = payload.revision;
          }
          if (payload.type === 'state_change' || payload.type === 'sync_required') {
            pullAndMergeServerState();
          }
        } catch {
          // ignore malformed event
        }
      };

      es.onerror = () => {
        if (isCancelled) return;
        setConnectionState('reconnecting');
        es?.close();
        es = null;
        scheduleReconnect();
      };
    };

    const scheduleReconnect = () => {
      if (isCancelled) return;
      retryAttempt++;
      const delayMs = Math.min(15000, 1000 * Math.pow(1.6, Math.min(retryAttempt, 6)));
      reconnectTimer = setTimeout(() => {
        connectSse();
      }, delayMs);
    };

    const handleOnline = () => {
      if (isCancelled) return;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      es?.close();
      connectSse();
    };

    window.addEventListener('online', handleOnline);
    connectSse();

    return () => {
      isCancelled = true;
      window.removeEventListener('online', handleOnline);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      es?.close();
    };
  }, [enabled, isTeacher, actorId, pullAndMergeServerState]);

  return {
    connectionState,
    lastSyncedAt,
    refreshNow: pullAndMergeServerState,
  };
}

// ===== CLIENT MANAGEMENT API HELPERS =====
export async function assignTeacherManagedClassesApi(
  teacherId: string,
  classes: string[]
): Promise<{ ok: boolean; error?: string; auditLog?: AuditLogEntry }> {
  try {
    const res = await fetch(`/api/manage/teachers/${encodeURIComponent(teacherId)}/classes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ classes }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || 'Lỗi phân quyền lớp.' };
    broadcastLocalStateChange(data.revision);
    return { ok: true, auditLog: data.auditLog };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}

export async function runServerMigrationApi(
  dryRun: boolean
): Promise<{ ok: boolean; report?: MigrationReport; error?: string }> {
  try {
    const res = await fetch('/api/manage/migrate', {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ dryRun }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || 'Lỗi chạy migration.' };
    if (!dryRun) broadcastLocalStateChange(data.revision);
    return { ok: true, report: data.report };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}

export async function previewBulkActionApi(payload: any): Promise<{
  ok: boolean;
  validCount?: number;
  duplicateCount?: number;
  errorCount?: number;
  diffs?: Array<{ studentId: string; fullName: string; before: string; after: string }>;
  duplicates?: Array<{ rowOrId: string; reason: string }>;
  errors?: Array<{ rowOrId: string; reason: string }>;
  error?: string;
}> {
  try {
    const res = await fetch('/api/manage/bulk/preview', {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || 'Lỗi xem trước thao tác hàng loạt.' };
    return data;
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}

export async function executeBulkActionApi(payload: any): Promise<{
  ok: boolean;
  appliedCount?: number;
  auditLog?: AuditLogEntry;
  createdCredentials?: Array<{
    studentId: string;
    fullName: string;
    username: string;
    className: string;
    schoolName: string;
    passwordPlain: string;
    recoveryCode: string;
  }>;
  error?: string;
}> {
  try {
    const res = await fetch('/api/manage/bulk/execute', {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ ...payload, confirmed: true }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || 'Lỗi thực thi thao tác hàng loạt.' };
    broadcastLocalStateChange(data.revision);
    return data;
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}

export async function undoBulkActionApi(
  logId: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/manage/audit-logs/${encodeURIComponent(logId)}/undo`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || 'Không thể hoàn tác.' };
    broadcastLocalStateChange(data.revision);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}

export async function exportStudentsBoundedApi(filters: {
  provinceCode?: string;
  communeCode?: string;
  schoolId?: string;
  className?: string;
}): Promise<{
  ok: boolean;
  count?: number;
  limit?: number;
  rows?: Array<{
    id: string;
    username: string;
    fullName: string;
    className: string;
    classId: string;
    provinceCode: string;
    provinceName: string;
    communeCode: string;
    communeName: string;
    schoolId: string;
    schoolName: string;
  }>;
  error?: string;
}> {
  try {
    const res = await fetch('/api/manage/export-students', {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(filters),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || 'Lỗi xuất danh sách học sinh.' };
    return data;
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Lỗi kết nối máy chủ.' };
  }
}
