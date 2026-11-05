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
 */
export function loadGrammarProgress(studentId?: string | null): GrammarStudentStore {
  const root = readRawRoot();
  if (studentId && root.byStudent && root.byStudent[studentId]) {
    return sanitizeStudentStore(root.byStudent[studentId]);
  }
  return sanitizeStudentStore(root);
}

const DEMO_STUDENT_STORES: Record<string, GrammarStudentStore> = {
  'student-6a1-01': {
    best: { 'u1-s1': 0.8, 'u1-s5': 0.6, 'u2-s1': 0.7 },
    setProgress: {
      'u1-s1': { setId: 'u1-s1', bestScore: 0.8, attempts: 2, lastPlayedAt: '2026-11-04T08:00:00Z' },
      'u1-s5': { setId: 'u1-s5', bestScore: 0.6, attempts: 1, lastPlayedAt: '2026-11-04T09:00:00Z' },
      'u2-s1': { setId: 'u2-s1', bestScore: 0.7, attempts: 1, lastPlayedAt: '2026-11-05T07:00:00Z' },
    },
    mistakes: {
      'u1-s1-q2': 2,
      'u1-s6-q1': 2,
      'u1-s5-q2': 1,
      'u2-s1-q2': 2,
      'u2-s4-q5': 1,
    },
    attempts: [
      { itemId: 'u1-s1-q1', setId: 'u1-s1', unitId: 'u1', correct: true, answer: 'is', at: '2026-11-04T08:00:00Z' },
      { itemId: 'u1-s1-q2', setId: 'u1-s1', unitId: 'u1', correct: false, answer: 'study', at: '2026-11-04T08:01:00Z' },
      { itemId: 'u1-s6-q1', setId: 'u1-s6', unitId: 'u1', correct: false, answer: "She don't like Art.", at: '2026-11-04T08:05:00Z' },
      { itemId: 'u1-s5-q2', setId: 'u1-s5', unitId: 'u1', correct: false, answer: 'Lan always is friendly.', at: '2026-11-04T09:00:00Z' },
      { itemId: 'u2-s1-q2', setId: 'u2-s1', unitId: 'u2', correct: false, answer: "students's", at: '2026-11-05T07:00:00Z' },
      { itemId: 'u2-s4-q5', setId: 'u2-s4', unitId: 'u2', correct: false, answer: 'some', at: '2026-11-05T07:10:00Z' },
    ],
  },
  'student-6a2-02': {
    best: { 'u1-s1': 0.7, 'u2-s1': 0.6 },
    setProgress: {
      'u1-s1': { setId: 'u1-s1', bestScore: 0.7, attempts: 1, lastPlayedAt: '2026-11-04T10:00:00Z' },
      'u2-s1': { setId: 'u2-s1', bestScore: 0.6, attempts: 1, lastPlayedAt: '2026-11-05T08:00:00Z' },
    },
    mistakes: {
      'u1-s1-q2': 1,
      'u1-s1-q4': 2,
      'u2-s1-q3': 2,
      'u2-s3-q8': 1,
    },
    attempts: [
      { itemId: 'u1-s1-q2', setId: 'u1-s1', unitId: 'u1', correct: false, answer: 'study', at: '2026-11-04T10:00:00Z' },
      { itemId: 'u1-s1-q4', setId: 'u1-s1', unitId: 'u1', correct: false, answer: 'do', at: '2026-11-04T10:02:00Z' },
      { itemId: 'u2-s1-q3', setId: 'u2-s1', unitId: 'u2', correct: false, answer: "childrens'", at: '2026-11-05T08:00:00Z' },
      { itemId: 'u2-s3-q8', setId: 'u2-s3', unitId: 'u2', correct: false, answer: 'on', at: '2026-11-05T08:05:00Z' },
    ],
  },
};

/**
 * Đọc dữ liệu Sổ lỗi sai & tiến độ Ngữ pháp 6 của danh sách học sinh (phục vụ trang Giáo viên).
 */
export function loadClassGrammarStores(studentIds: string[]): Record<string, GrammarStudentStore> {
  const root = readRawRoot();
  const result: Record<string, GrammarStudentStore> = {};

  for (const id of studentIds) {
    if (root.byStudent && root.byStudent[id]) {
      result[id] = sanitizeStudentStore(root.byStudent[id]);
    } else if (DEMO_STUDENT_STORES[id]) {
      result[id] = sanitizeStudentStore(DEMO_STUDENT_STORES[id]);
    } else {
      result[id] = createEmptyStudentStore();
    }
  }

  // Nếu root có dữ liệu chung chưa gắn studentId, gộp vào học sinh đầu tiên trong danh sách để không sót lỗi
  const rootClean = sanitizeStudentStore(root);
  if (
    studentIds.length > 0 &&
    (Object.keys(rootClean.mistakes).length > 0 || rootClean.attempts.length > 0)
  ) {
    const firstId = studentIds[0];
    const hasAlready =
      root.byStudent &&
      Object.values(root.byStudent).some(
        (st) => Object.keys(st.mistakes || {}).length > 0 || (st.attempts || []).length > 0
      );
    if (!hasAlready) {
      const target = result[firstId] || createEmptyStudentStore();
      result[firstId] = {
        best: { ...target.best, ...rootClean.best },
        setProgress: { ...target.setProgress, ...rootClean.setProgress },
        mistakes: { ...target.mistakes, ...rootClean.mistakes },
        attempts: [...target.attempts, ...rootClean.attempts],
      };
    }
  }

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
