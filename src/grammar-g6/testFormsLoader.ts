import rawTestFormsJson from '../data/test_forms.json';
import type {
  GrammarDataset,
  GrammarStudentStore,
  IndexedExerciseItem,
  Unit,
} from './types';

export type TestItemType = 'mcq' | 'gap' | 'reorder';
export type TestItemSkill = 'grammar' | 'vocab';

export interface TestFormItem {
  id: string;
  unit: number;
  type: TestItemType;
  skill: TestItemSkill;
  grammarPointId: string | null;
  instruction?: string;
  wordBank?: string;
  // mcq & gap
  prompt?: string;
  // mcq
  options?: string[];
  answerIndex?: number;
  // gap
  blanks?: Array<{ accept: string[] }>;
  // reorder
  tokens?: string[];
  accept?: string[];
  endPunct?: '.' | '?' | '!';
  // teacher-only explanation
  explanation?: string;
}

/**
 * Bản câu hỏi đã lọc bỏ hoàn toàn đáp án và lời giải thích trước khi gửi xuống màn hình làm bài của học sinh.
 */
export interface SanitizedTestFormItem {
  id: string;
  unit: number;
  type: TestItemType;
  skill: TestItemSkill;
  grammarPointId: string | null;
  instruction?: string;
  wordBank?: string;
  prompt?: string;
  options?: string[];
  blankCount?: number;
  tokens?: string[];
  endPunct?: '.' | '?' | '!';
}

export interface TestFormDef {
  id: 'hk1-A' | 'hk1-B' | 'hk2-A' | 'hk2-B' | string;
  semester: 'hk1' | 'hk2' | string;
  title: string;
  form: 'A' | 'B' | string;
  units: number[];
  items: TestFormItem[];
  coverage: {
    byUnit: Record<string, number>;
    byGrammarPoint: Record<string, number>;
  };
  updatedAt?: string;
  updatedBy?: string;
}

export interface SanitizedTestFormDef {
  id: string;
  semester: string;
  title: string;
  form: string;
  units: number[];
  items: SanitizedTestFormItem[];
}

export interface TestFormsDataset {
  version: string;
  seed: number;
  blueprint: {
    grammar: number;
    vocab: number;
    totalItems: number;
    durationMinutes: number;
    maxScore: number;
  };
  tests: TestFormDef[];
  reservedItemIds: string[];
}

export const TEST_FORMS_COLLECTION_KEY = 'firestore_collection_testForms';

/**
 * Trả về dữ liệu gốc từ file `src/data/test_forms.json` (không sửa đổi).
 */
export function getBaseTestFormsDataset(): TestFormsDataset {
  return JSON.parse(JSON.stringify(rawTestFormsJson)) as TestFormsDataset;
}

const customFormsMemoryStore: Record<string, TestFormDef> = {};

/**
 * Đọc các đề kiểm tra đã được giáo viên tuỳ chỉnh (đổi câu trong "Xem trước đề") từ collection `testForms`.
 */
export function loadCustomTestFormsMap(): Record<string, TestFormDef> {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { ...customFormsMemoryStore };
    }
    const raw = window.localStorage.getItem(TEST_FORMS_COLLECTION_KEY);
    if (!raw) return { ...customFormsMemoryStore };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return { ...customFormsMemoryStore, ...(parsed as Record<string, TestFormDef>) };
    }
  } catch {
    // ignore storage errors
  }
  return { ...customFormsMemoryStore };
}

/**
 * Lưu đề kiểm tra (khi giáo viên đổi câu trong trang "Xem trước đề") vào collection `testForms`.
 */
export function saveCustomTestForm(form: TestFormDef): void {
  try {
    customFormsMemoryStore[form.id] = form;
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current = loadCustomTestFormsMap();
    current[form.id] = form;
    window.localStorage.setItem(TEST_FORMS_COLLECTION_KEY, JSON.stringify(current));
  } catch {
    // ignore storage errors
  }
}

/**
 * Nạp bộ đề kiểm tra (kết hợp `test_forms.json` gốc và các câu đã đổi trong `testForms/{formId}`).
 */
export function getTestFormsDataset(): TestFormsDataset {
  const base = getBaseTestFormsDataset();
  const customMap = loadCustomTestFormsMap();
  const reservedSet = new Set<string>(base.reservedItemIds);

  const mergedTests = base.tests.map((t) => {
    const override = customMap[t.id];
    const activeForm = override && Array.isArray(override.items) ? override : t;
    for (const item of activeForm.items) {
      if (item.skill === 'grammar') {
        reservedSet.add(item.id);
      }
    }
    return activeForm;
  });

  return {
    ...base,
    tests: mergedTests,
    reservedItemIds: Array.from(reservedSet),
  };
}

/**
 * Tập hợp toàn bộ `id` câu hỏi được giữ riêng cho đề kiểm tra (bao gồm `reservedItemIds` gốc + mọi câu trong đề).
 */
export function getReservedItemIdSet(): Set<string> {
  const ds = getTestFormsDataset();
  const set = new Set<string>(ds.reservedItemIds);
  for (const t of ds.tests) {
    for (const it of t.items) {
      set.add(it.id);
    }
  }
  return set;
}

/**
 * Kiểm tra một `itemId` có nằm trong danh sách giữ riêng cho đề kiểm tra đầu vào/đầu ra hay không.
 */
export function isReservedTestItemId(itemId: string): boolean {
  return getReservedItemIdSet().has(itemId);
}

/**
 * Kiểm tra một chuỗi văn bản (câu hỏi gửi cho Gia sư AI / trợ lý bài tập) có chứa
 * mã câu hỏi hoặc nội dung câu hỏi thuộc danh sách `reservedItemIds` của đề kiểm tra hay không.
 */
export function containsReservedTestItemContent(text: string): boolean {
  const normalized = (text || '').trim().toLowerCase().replace(/\s+/g, ' ');
  const normalizedNoBlanks = normalized.replace(/___+/g, '').replace(/\s+/g, ' ').trim();
  if (!normalized) return false;
  const ds = getTestFormsDataset();
  for (const id of ds.reservedItemIds) {
    if (normalized.includes(id.toLowerCase())) return true;
  }
  for (const test of ds.tests) {
    for (const item of test.items) {
      if (normalized.includes(item.id.toLowerCase())) return true;
      if (item.prompt) {
        const rawPrompt = item.prompt.trim().toLowerCase().replace(/\s+/g, ' ');
        const cleanPrompt = rawPrompt.replace(/___+/g, '').replace(/\s+/g, ' ').trim();
        if (rawPrompt.length >= 16 && normalized.includes(rawPrompt)) {
          return true;
        }
        if (cleanPrompt.length >= 16 && normalizedNoBlanks.includes(cleanPrompt)) {
          return true;
        }
      }
    }
  }
  return false;
}


/**
 * Lọc bỏ hoàn toàn các câu thuộc `reservedItemIds` khỏi `GrammarDataset` dùng cho luyện tập.
 */
export function filterPracticeGrammarDataset(
  rawDataset: GrammarDataset,
  reservedIds: ReadonlySet<string> = getReservedItemIdSet()
): GrammarDataset {
  return {
    ...rawDataset,
    units: rawDataset.units.map((u) => ({
      ...u,
      exerciseSets: u.exerciseSets
        .map((s) => ({
          ...s,
          items: s.items.filter((it) => !reservedIds.has(it.id)),
        }))
        .filter((s) => s.items.length > 0),
    })),
  };
}

/**
 * Lấy danh sách `itemId` cho chức năng "Kiểm tra nhanh" của một Unit (đã loại bỏ `cloze` và `reservedItemIds`).
 */
export function getQuickTestItemPool(
  unit: Unit,
  reservedIds: ReadonlySet<string> = getReservedItemIdSet()
): string[] {
  return unit.exerciseSets
    .filter((s) => s.type !== 'cloze')
    .flatMap((s) => s.items.map((it) => it.id))
    .filter((id) => !reservedIds.has(id));
}

/**
 * Lấy danh sách `itemId` trong Sổ lỗi sai của học sinh (đã loại bỏ `reservedItemIds`).
 */
export function getMistakePracticePool(
  store: GrammarStudentStore,
  itemIndex: Record<string, IndexedExerciseItem>,
  reservedIds: ReadonlySet<string> = getReservedItemIdSet()
): string[] {
  return Object.keys(store.mistakes).filter(
    (id) => Boolean(itemIndex[id]) && !reservedIds.has(id)
  );
}

/**
 * Lọc bỏ đáp án (`answerIndex`, `blanks.accept`, `accept`, `explanation`) khỏi đề kiểm tra trước khi gửi cho học sinh.
 */
export function sanitizeTestFormForStudent(form: TestFormDef): SanitizedTestFormDef {
  return {
    id: form.id,
    semester: form.semester,
    title: form.title,
    form: form.form,
    units: [...form.units],
    items: form.items.map((it) => {
      const sanitized: SanitizedTestFormItem = {
        id: it.id,
        unit: it.unit,
        type: it.type,
        skill: it.skill,
        grammarPointId: it.grammarPointId,
      };
      if (it.instruction) sanitized.instruction = it.instruction;
      if (it.wordBank) sanitized.wordBank = it.wordBank;
      if (it.prompt !== undefined) sanitized.prompt = it.prompt;
      if (it.options) sanitized.options = [...it.options];
      if (it.blanks) sanitized.blankCount = it.blanks.length;
      if (it.tokens) sanitized.tokens = [...it.tokens];
      if (it.endPunct) sanitized.endPunct = it.endPunct;
      return sanitized;
    }),
  };
}
