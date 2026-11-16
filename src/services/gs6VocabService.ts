import gs6VocabRaw from '../../gs6_vocab_data.json';

export type Gs6Pos = 'n' | 'v' | 'adj' | 'adv' | 'phr' | 'phr.v' | string;

export interface Gs6RawWord {
  word: string;
  ipa: string;
  pos: Gs6Pos;
  vi: string;
}

export interface Gs6RawTopic {
  topic: string;
  words: Gs6RawWord[];
}

export interface Gs6RawUnit {
  unit: number;
  title: string;
  topics: Gs6RawTopic[];
}

export interface Gs6RawDataset {
  meta: {
    source: string;
    total_words: number;
  };
  units: Gs6RawUnit[];
}

export interface Gs6VocabEntry {
  /** ID duy nhất theo từng vị trí xuất hiện trong Unit & Chủ đề (không loại trùng) */
  id: string;
  unitNumber: number;
  unitId: string; // e.g. 'unit-1'
  unitTitle: string;
  topic: string;
  word: string;
  ipa: string;
  pos: Gs6Pos;
  vi: string;
}

export type Gs6WordStatus = 'known' | 'review';

export interface Gs6WordMasteryRecord {
  entryId: string;
  status: Gs6WordStatus;
  correctCount: number;
  wrongCount: number;
  lastPracticedAt: string;
}

export interface Gs6StudentVocabProgress {
  studentId: string;
  updatedAt: string;
  /** Map từ entryId -> trạng thái thuộc / cần ôn & lịch sử đúng/sai */
  items: Record<string, Gs6WordMasteryRecord>;
}

export const POS_LABELS: Record<string, string> = {
  n: 'Danh từ (n)',
  v: 'Động từ (v)',
  adj: 'Tính từ (adj)',
  adv: 'Trạng từ (adv)',
  phr: 'Cụm từ (phr)',
  'phr.v': 'Cụm động từ (phr.v)',
};

export const POS_SHORT_BADGE: Record<string, { label: string; className: string }> = {
  n: { label: 'n (Danh từ)', className: 'bg-sky-100 text-sky-900 border-sky-300' },
  v: { label: 'v (Động từ)', className: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  adj: { label: 'adj (Tính từ)', className: 'bg-amber-100 text-amber-900 border-amber-300' },
  adv: { label: 'adv (Trạng từ)', className: 'bg-purple-100 text-purple-900 border-purple-300' },
  phr: { label: 'phr (Cụm từ)', className: 'bg-rose-100 text-rose-900 border-rose-300' },
  'phr.v': { label: 'phr.v (Cụm ĐT)', className: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
};

const DATASET: Gs6RawDataset = gs6VocabRaw as Gs6RawDataset;

/**
 * Flatten toàn bộ 761 mục từ trong `gs6_vocab_data.json` mà KHÔNG loại trùng
 * (vì một từ có thể xuất hiện ở nhiều chủ đề/unit khác nhau).
 */
let _cachedEntries: Gs6VocabEntry[] | null = null;

export function getGs6VocabDataset(): Gs6RawDataset {
  return DATASET;
}

export function getAllGs6VocabEntries(): Gs6VocabEntry[] {
  if (_cachedEntries) return _cachedEntries;
  const list: Gs6VocabEntry[] = [];
  DATASET.units.forEach((u) => {
    const unitId = `unit-${u.unit}`;
    u.topics.forEach((t, tIdx) => {
      t.words.forEach((w, wIdx) => {
        list.push({
          id: `gs6_u${u.unit}_t${tIdx}_w${wIdx}`,
          unitNumber: u.unit,
          unitId,
          unitTitle: u.title,
          topic: t.topic,
          word: w.word,
          ipa: w.ipa,
          pos: w.pos,
          vi: w.vi,
        });
      });
    });
  });
  _cachedEntries = list;
  return list;
}

/**
 * Phát âm từ tiếng Anh bằng Web Speech API (`window.speechSynthesis`) của trình duyệt,
 * hỗ trợ chọn giọng `en-US` hoặc `en-GB`, hoàn toàn miễn phí và không gọi API ngoài.
 */
export function speakGs6Word(
  text: string,
  lang: 'en-US' | 'en-GB' = 'en-GB',
  rate: number = 0.9
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const exactVoice =
        voices.find((v) => v.lang.replace('_', '-') === lang) ||
        voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
      if (exactVoice) {
        utter.voice = exactVoice;
      }
    }
    window.speechSynthesis.speak(utter);
  } catch {
    // ignore browser speech errors
  }
}

/**
 * Sinh 4 đáp án trắc nghiệm (1 đáp án đúng + 3 đáp án nhiễu lấy ngẫu nhiên CÙNG LOẠI TỪ `pos`).
 * Nếu trong phạm vi lọc không đủ 3 từ cùng `pos`, tự động lấy bổ sung từ cùng `pos` trong toàn bộ 761 từ.
 */
export function buildSamePosDistractors(
  target: Gs6VocabEntry,
  scopedPool: Gs6VocabEntry[]
): Gs6VocabEntry[] {
  const allEntries = getAllGs6VocabEntries();
  const normWord = target.word.trim().toLowerCase();
  const normVi = target.vi.trim().toLowerCase();

  const isValidDistractor = (cand: Gs6VocabEntry, picked: Gs6VocabEntry[]) => {
    if (cand.id === target.id) return false;
    if (cand.word.trim().toLowerCase() === normWord) return false;
    if (cand.vi.trim().toLowerCase() === normVi) return false;
    return !picked.some(
      (p) =>
        p.word.trim().toLowerCase() === cand.word.trim().toLowerCase() ||
        p.vi.trim().toLowerCase() === cand.vi.trim().toLowerCase()
    );
  };

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const distractors: Gs6VocabEntry[] = [];

  // Ưu tiên 1: Cùng loại từ (pos) trong tập đang lọc (cùng Unit/Chủ đề)
  const samePosInScope = shuffle(scopedPool.filter((e) => e.pos === target.pos));
  for (const cand of samePosInScope) {
    if (distractors.length >= 3) break;
    if (isValidDistractor(cand, distractors)) distractors.push(cand);
  }

  // Ưu tiên 2: Cùng loại từ (pos) trong toàn bộ kho 761 từ GS6
  if (distractors.length < 3) {
    const samePosGlobal = shuffle(allEntries.filter((e) => e.pos === target.pos));
    for (const cand of samePosGlobal) {
      if (distractors.length >= 3) break;
      if (isValidDistractor(cand, distractors)) distractors.push(cand);
    }
  }

  // Ưu tiên 3: Dự phòng bất kỳ từ nào khác nếu loại từ quá hiếm
  if (distractors.length < 3) {
    const anyGlobal = shuffle(allEntries);
    for (const cand of anyGlobal) {
      if (distractors.length >= 3) break;
      if (isValidDistractor(cand, distractors)) distractors.push(cand);
    }
  }

  return shuffle([target, ...distractors]);
}

// ============================================================================
// LƯU TRỮ & ĐỒNG BỘ TIẾN ĐỘ TỪ VỰNG GS6 CỦA TỪNG HỌC SINH
// ============================================================================

const GS6_VOCAB_PROGRESS_KEY = 'gs6_vocab_progress_by_student_v1';

interface Gs6ProgressRootMap {
  byStudent: Record<string, Gs6StudentVocabProgress>;
}

function readProgressRoot(): Gs6ProgressRootMap {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(GS6_VOCAB_PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.byStudent) {
          return parsed as Gs6ProgressRootMap;
        }
      }
    }
  } catch {
    // ignore
  }
  return { byStudent: {} };
}

function writeProgressRoot(root: Gs6ProgressRootMap): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(GS6_VOCAB_PROGRESS_KEY, JSON.stringify(root));
      window.dispatchEvent(new CustomEvent('gs6-vocab-progress-updated'));
    }
  } catch {
    // ignore
  }
}

export function loadStudentGs6VocabProgress(studentId?: string | null): Gs6StudentVocabProgress {
  const key = studentId || '__guest__';
  const root = readProgressRoot();
  return (
    root.byStudent[key] || {
      studentId: key,
      updatedAt: new Date().toISOString(),
      items: {},
    }
  );
}

export function loadClassGs6VocabProgress(
  studentIds: string[]
): Record<string, Gs6StudentVocabProgress> {
  const root = readProgressRoot();
  const out: Record<string, Gs6StudentVocabProgress> = {};
  for (const id of studentIds) {
    out[id] = root.byStudent[id] || {
      studentId: id,
      updatedAt: '',
      items: {},
    };
  }
  return out;
}

export function saveStudentGs6VocabProgress(
  progress: Gs6StudentVocabProgress,
  syncToServer = true
): Gs6StudentVocabProgress {
  const root = readProgressRoot();
  const updated: Gs6StudentVocabProgress = {
    ...progress,
    updatedAt: new Date().toISOString(),
  };
  root.byStudent[updated.studentId] = updated;
  writeProgressRoot(root);

  if (
    syncToServer &&
    updated.studentId &&
    updated.studentId !== '__guest__' &&
    typeof window !== 'undefined' &&
    typeof fetch === 'function'
  ) {
    void fetch('/api/sync/learning-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        studentId: updated.studentId,
        gs6VocabProgress: updated,
      }),
    }).catch(() => {});
  }

  return updated;
}

/**
 * Đánh dấu thủ công hoặc tự động sau khi trả lời câu hỏi luyện tập:
 * - Nếu trả lời ĐÚNG: tăng `correctCount`, nếu đúng >= 1 lần và người dùng chưa ép 'review' hoặc vừa trả lời đúng trong bài ôn thì chuyển sang `known`.
 * - Nếu trả lời SAI: tăng `wrongCount` và tự động gắn nhãn `review` ("Cần ôn") để gợi ý học sinh ôn lại từ sai.
 */
export function recordGs6WordPracticeResult(
  studentId: string | null | undefined,
  entryId: string,
  isCorrect: boolean
): Gs6StudentVocabProgress {
  const current = loadStudentGs6VocabProgress(studentId);
  const prevItem = current.items[entryId];
  const now = new Date().toISOString();

  const nextItem: Gs6WordMasteryRecord = {
    entryId,
    status: isCorrect ? 'known' : 'review',
    correctCount: (prevItem?.correctCount || 0) + (isCorrect ? 1 : 0),
    wrongCount: (prevItem?.wrongCount || 0) + (isCorrect ? 0 : 1),
    lastPracticedAt: now,
  };

  return saveStudentGs6VocabProgress({
    ...current,
    items: {
      ...current.items,
      [entryId]: nextItem,
    },
  });
}

/**
 * Cho phép học sinh bấm nút chọn trực tiếp "Đã thuộc" (`known`) hoặc "Cần ôn" (`review`) trên thẻ Flashcard
 */
export function toggleGs6WordManualStatus(
  studentId: string | null | undefined,
  entryId: string,
  targetStatus: Gs6WordStatus
): Gs6StudentVocabProgress {
  const current = loadStudentGs6VocabProgress(studentId);
  const prevItem = current.items[entryId];
  const now = new Date().toISOString();

  const nextItems = { ...current.items };
  if (prevItem && prevItem.status === targetStatus) {
    delete nextItems[entryId];
  } else {
    nextItems[entryId] = {
      entryId,
      status: targetStatus,
      correctCount: prevItem?.correctCount || (targetStatus === 'known' ? 1 : 0),
      wrongCount: prevItem?.wrongCount || (targetStatus === 'review' ? 1 : 0),
      lastPracticedAt: now,
    };
  }

  return saveStudentGs6VocabProgress({
    ...current,
    items: nextItems,
  });
}

/**
 * Hợp nhất dữ liệu tiến độ từ vựng GS6 từ máy chủ về máy Giáo viên
 */
export function mergeServerGs6VocabProgressIntoLocal(
  remoteByStudent?: Record<string, Gs6StudentVocabProgress>
): boolean {
  if (!remoteByStudent || typeof remoteByStudent !== 'object') return false;
  const root = readProgressRoot();
  let changed = false;

  for (const [stId, rProg] of Object.entries(remoteByStudent)) {
    if (!stId || !rProg || !rProg.items) continue;
    const lProg = root.byStudent[stId];
    if (
      !lProg ||
      Object.keys(rProg.items).length > Object.keys(lProg.items || {}).length ||
      (rProg.updatedAt && (!lProg.updatedAt || rProg.updatedAt > lProg.updatedAt))
    ) {
      root.byStudent[stId] = rProg;
      changed = true;
    }
  }

  if (changed) {
    writeProgressRoot(root);
  }
  return changed;
}
