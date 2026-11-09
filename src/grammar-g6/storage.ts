import type {
  AttemptRecord,
  GrammarStudentStore,
  SetProgress,
  Unit,
} from './types';

export const GRAMMAR_STORAGE_KEY = 'g6-grammar-progress-v1';
const MAX_ATTEMPT_RECORDS = 1500;

interface RawGrammarStorageRoot extends GrammarStudentStore {
  byStudent?: Record<string, GrammarStudentStore>;
}

function createEmptyStudentStore(): GrammarStudentStore {
  return {
    best: {},
    setProgress: {},
    mistakes: {},
    attempts: [],
  };
}

function sanitizeStudentStore(raw: Partial<GrammarStudentStore> | null | undefined): GrammarStudentStore {
  if (!raw || typeof raw !== 'object') return createEmptyStudentStore();

  const best: Record<string, number> = {};
  if (raw.best && typeof raw.best === 'object') {
    for (const [k, v] of Object.entries(raw.best)) {
      if (typeof v === 'number' && !Number.isNaN(v)) {
        best[k] = Math.max(0, Math.min(1, v));
      } else if (v && typeof v === 'object' && typeof (v as SetProgress).bestScore === 'number') {
        best[k] = Math.max(0, Math.min(1, (v as SetProgress).bestScore));
      }
    }
  }

  const setProgress: Record<string, SetProgress> = {};
  if (raw.setProgress && typeof raw.setProgress === 'object') {
    for (const [k, v] of Object.entries(raw.setProgress)) {
      if (v && typeof v === 'object' && typeof v.bestScore === 'number') {
        setProgress[k] = {
          setId: v.setId || k,
          bestScore: Math.max(0, Math.min(1, v.bestScore)),
          attempts: typeof v.attempts === 'number' ? v.attempts : 1,
          lastPlayedAt: v.lastPlayedAt || new Date().toISOString(),
        };
        best[k] = Math.max(best[k] ?? 0, setProgress[k].bestScore);
      }
    }
  }

  // Đồng bộ các khóa có trong best sang setProgress nếu chưa có
  for (const [setId, scoreVal] of Object.entries(best)) {
    if (!setProgress[setId]) {
      setProgress[setId] = {
        setId,
        bestScore: scoreVal,
        attempts: 1,
        lastPlayedAt: new Date().toISOString(),
      };
    }
  }

  const mistakes: Record<string, number> = {};
  if (raw.mistakes && typeof raw.mistakes === 'object') {
    for (const [k, v] of Object.entries(raw.mistakes)) {
      if (v) mistakes[k] = typeof v === 'number' ? v : 1;
    }
  }

  const attempts: AttemptRecord[] = Array.isArray(raw.attempts)
    ? raw.attempts.slice(-MAX_ATTEMPT_RECORDS)
    : [];

  return { best, setProgress, mistakes, attempts };
}

function readRawRoot(): RawGrammarStorageRoot {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const text = window.localStorage.getItem(GRAMMAR_STORAGE_KEY);
      if (text) {
        const parsed = JSON.parse(text) as RawGrammarStorageRoot;
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('[GrammarG6 Storage] Không thể đọc localStorage:', err);
  }
  return { ...createEmptyStudentStore(), byStudent: {} };
}

function writeRawRoot(root: RawGrammarStorageRoot): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(GRAMMAR_STORAGE_KEY, JSON.stringify(root));
    }
  } catch (err) {
    console.warn('[GrammarG6 Storage] Không thể ghi localStorage:', err);
  }
}

/**
 * Đọc tiến độ Ngữ pháp 6 của học sinh hiện tại (hoặc mặc định).
 * Nếu có `studentId`, chỉ trả về tiến độ riêng của đúng học sinh đó (nếu chưa học thì trả về rỗng,
 * tuyệt đối không lấy dữ liệu chung của thiết bị hay của học sinh trước đó).
 */
export function loadGrammarProgress(studentId?: string | null): GrammarStudentStore {
  const root = readRawRoot();
  if (studentId) {
    if (root.byStudent && root.byStudent[studentId]) {
      return sanitizeStudentStore(root.byStudent[studentId]);
    }
    return createEmptyStudentStore();
  }
  return sanitizeStudentStore(root);
}

/**
 * Đọc dữ liệu Sổ lỗi sai & tiến độ Ngữ pháp 6 của danh sách học sinh (phục vụ trang Giáo viên).
 */
export function loadClassGrammarStores(studentIds: string[]): Record<string, GrammarStudentStore> {
  const root = readRawRoot();
  const result: Record<string, GrammarStudentStore> = {};

  for (const id of studentIds) {
    if (root.byStudent && root.byStudent[id]) {
      result[id] = sanitizeStudentStore(root.byStudent[id]);
    } else {
      result[id] = createEmptyStudentStore();
    }
  }

  // Dữ liệu chung chưa gắn studentId (chế độ khách) không được gộp vào học sinh nào,
  // để báo cáo của giáo viên chỉ phản ánh đúng bài làm của từng học sinh.
  return result;
}

/**
 * Lưu tiến độ Ngữ pháp 6 xuống localStorage key `g6-grammar-progress-v1` (bọc try/catch).
 */
export function saveGrammarProgress(
  store: GrammarStudentStore,
  studentId?: string | null
): GrammarStudentStore {
  const clean = sanitizeStudentStore(store);
  const root = readRawRoot();
  const byStudent = { ...(root.byStudent || {}) };

  if (studentId) {
    byStudent[studentId] = clean;
    const updatedRoot: RawGrammarStorageRoot = {
      ...createEmptyStudentStore(),
      byStudent,
    };
    writeRawRoot(updatedRoot);
    return clean;
  }

  const updatedRoot: RawGrammarStorageRoot = {
    ...clean,
    byStudent,
  };
  writeRawRoot(updatedRoot);
  return clean;
}

/**
 * Ghi nhận một lần trả lời câu hỏi vào store (cập nhật Sổ lỗi sai + AttemptRecord).
 * Nếu học sinh làm đúng -> tự động xoá câu đó khỏi Sổ lỗi sai.
 */
export function recordItemAttempt(
  store: GrammarStudentStore,
  params: {
    itemId: string;
    setId: string;
    unitId: string;
    correct: boolean;
    answerText: string;
    clozeBlankResults?: { n: number; correct: boolean; value: string }[];
  },
  studentId?: string | null
): GrammarStudentStore {
  const now = new Date().toISOString();
  const nextMistakes = { ...store.mistakes };

  if (params.correct) {
    delete nextMistakes[params.itemId];
  } else {
    nextMistakes[params.itemId] = (nextMistakes[params.itemId] || 0) + 1;
  }

  const newRecords: AttemptRecord[] = [];
  if (params.clozeBlankResults && params.clozeBlankResults.length > 0) {
    for (const b of params.clozeBlankResults) {
      newRecords.push({
        itemId: `${params.itemId}#${b.n}`,
        setId: params.setId,
        unitId: params.unitId,
        correct: b.correct,
        answer: b.value,
        at: now,
      });
    }
  } else {
    newRecords.push({
      itemId: params.itemId,
      setId: params.setId,
      unitId: params.unitId,
      correct: params.correct,
      answer: params.answerText,
      at: now,
    });
  }

  const nextAttempts = [...store.attempts, ...newRecords].slice(-MAX_ATTEMPT_RECORDS);
  const nextStore: GrammarStudentStore = {
    ...store,
    mistakes: nextMistakes,
    attempts: nextAttempts,
  };

  return saveGrammarProgress(nextStore, studentId);
}

/**
 * Cập nhật điểm cao nhất (`bestScore` 0..1) của một bộ bài tập (`setId`).
 */
export function recordSetCompletion(
  store: GrammarStudentStore,
  setId: string,
  scoreRatio: number,
  studentId?: string | null
): GrammarStudentStore {
  const clamped = Math.max(0, Math.min(1, scoreRatio));
  const prevProgress = store.setProgress[setId];
  const prevBest = Math.max(store.best[setId] ?? 0, prevProgress?.bestScore ?? 0);
  const bestScore = Math.max(prevBest, clamped);

  const nextProgress: SetProgress = {
    setId,
    bestScore,
    attempts: (prevProgress?.attempts ?? 0) + 1,
    lastPlayedAt: new Date().toISOString(),
  };

  const nextStore: GrammarStudentStore = {
    ...store,
    best: {
      ...store.best,
      [setId]: bestScore,
    },
    setProgress: {
      ...store.setProgress,
      [setId]: nextProgress,
    },
  };

  return saveGrammarProgress(nextStore, studentId);
}

/**
 * Tính tiến độ hoàn thành của 1 Unit: số bộ bài đạt >= 80% / tổng số bộ bài.
 */
export function getUnitCompletion(unit: Unit, store: GrammarStudentStore): {
  completedSets: number;
  totalSets: number;
  ratio: number;
} {
  const totalSets = unit.exerciseSets.length;
  if (totalSets === 0) return { completedSets: 0, totalSets: 0, ratio: 0 };
  const completedSets = unit.exerciseSets.filter(
    (s) => (store.best[s.id] ?? store.setProgress[s.id]?.bestScore ?? 0) >= 0.8
  ).length;
  return {
    completedSets,
    totalSets,
    ratio: completedSets / totalSets,
  };
}
