import { matches } from '../grammar-g6/answerChecker';
import { invalidateGrammarDatasetCache } from '../grammar-g6/dataLoader';
import {
  SanitizedTestFormDef,
  TestFormDef,
  TestFormItem,
  getBaseTestFormsDataset,
  getTestFormsDataset,
  sanitizeTestFormForStudent,
  saveCustomTestForm,
} from '../grammar-g6/testFormsLoader';
import type { GrammarDataset } from '../grammar-g6/types';
import type { StudentAccount } from '../types';
import { detectDevice, toSchoolId } from './firebaseAnalytics';
import { normalizeClassName } from './storage';

export type TestRoundKind = 'pre' | 'post' | 'retention' | 'pilot';
export type ResearchGroupType = 'TN' | 'DC';
export type TestRoundStatus = 'draft' | 'open' | 'closed';
export type TestAttemptStatus = 'in_progress' | 'submitted' | 'auto_submitted' | 'voided';

export const TEST_ROUND_KIND_LABELS: Record<TestRoundKind, string> = {
  pre: 'Kiểm tra đầu vào (Pre-test)',
  post: 'Kiểm tra đầu ra (Post-test)',
  retention: 'Kiểm tra duy trì (Retention)',
  pilot: 'Thử nghiệm hệ thống (Pilot)',
};

export interface TestRoundClassEntry {
  className: string;
  group: ResearchGroupType;
}

export interface FirestoreTestRoundDoc {
  id: string;
  name: string;
  formId: string;
  kind: TestRoundKind;
  schoolId: string;
  classes: TestRoundClassEntry[];
  openAt: string; // ISO 8601
  closeAt: string; // ISO 8601
  durationMin: number; // default 40
  showScoreAfterSubmit: boolean; // default true
  status: TestRoundStatus;
  createdBy: string;
  createdAt: string;
}

export interface TestItemResponseRecord {
  answer: string;
  selectedShuffledIndex?: number;
  correct?: boolean;
  answeredAt: string;
  timeSec: number;
}

export interface FirestoreTestAttemptDoc {
  id: string;
  roundId: string;
  formId: string;
  studentId: string;
  schoolId: string;
  className: string;
  group: ResearchGroupType;
  itemOrder: string[];
  optionOrder: Record<string, number[]>;
  flaggedItems?: string[];
  currentItemIndex?: number;
  responses: Record<string, TestItemResponseRecord>;
  status: TestAttemptStatus;
  startedAt: string;
  submittedAt?: string;
  durationSec: number;
  rawCorrect: number;
  score10: number;
  bySkill: {
    grammar: { correct: number; total: number };
    vocab: { correct: number; total: number };
  };
  byGrammarPoint: Record<string, { correct: number; total: number }>;
  tabSwitchCount: number;
  device: 'mobile' | 'desktop';
  voidReason?: string;
  voidedAt?: string;
  voidedBy?: string;
  pendingOfflineSync?: boolean;
}

export interface FirestoreClassSettingDoc {
  id: string; // `${schoolId}_${className}`
  schoolId: string;
  className: string;
  researchGroup: ResearchGroupType | null;
  practiceLocked: boolean;
  updatedAt: string;
  updatedBy?: string;
}

export interface TestVoidLogEntry {
  id: string;
  attemptId: string;
  roundId: string;
  studentId: string;
  className: string;
  reason: string;
  voidedBy: string;
  voidedAt: string;
}

const ROUNDS_STORAGE_KEY = 'firestore_collection_testRounds';
const ATTEMPTS_STORAGE_KEY = 'firestore_collection_testAttempts';
const CLASS_SETTINGS_STORAGE_KEY = 'firestore_collection_classSettings';
const VOID_LOGS_STORAGE_KEY = 'firestore_collection_testVoidLogs';

const memStore: Record<string, string> = {};

function readStorageJson<T>(key: string, fallback: T): T {
  try {
    const raw =
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(key)
        : memStore[key] ?? null;
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorageJson<T>(key: string, data: T): void {
  try {
    const raw = JSON.stringify(data);
    memStore[key] = raw;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, raw);
      window.dispatchEvent(new CustomEvent('research-tests-updated', { detail: { key } }));
    }
  } catch {
    // ignore quota errors
  }
}

function shuffleIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleStrings(items: readonly string[]): string[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================================================
// 1. TEST FORMS & TEACHER QUESTION REPLACEMENT
// ============================================================================

export function getFormById(formId: string): TestFormDef | null {
  const ds = getTestFormsDataset();
  return ds.tests.find((t) => t.id === formId) ?? null;
}

/**
 * Trả về đề kiểm tra đã lọc bỏ toàn bộ đáp án (`answerIndex`, `blanks.accept`, `accept`, `explanation`)
 * để gửi xuống cho học sinh làm bài.
 */
export function getStudentSanitizedTestForm(formId: string): SanitizedTestFormDef | null {
  const form = getFormById(formId);
  if (!form) return null;
  return sanitizeTestFormForStudent(form);
}

/**
 * Tìm danh sách câu hỏi dự phòng cùng điểm ngữ pháp (`grammarPointId`) và cùng dạng (`type`)
 * mà giáo viên có thể chọn để đổi câu trong trang "Xem trước đề".
 */
export function getReplacementCandidatesForTestItem(
  formId: string,
  targetItem: TestFormItem,
  rawGrammarDataset: GrammarDataset | null
): TestFormItem[] {
  const ds = getTestFormsDataset();
  const usedIds = new Set<string>();
  for (const t of ds.tests) {
    for (const it of t.items) {
      usedIds.add(it.id);
    }
  }

  if (targetItem.skill === 'grammar' && rawGrammarDataset) {
    const candidates: TestFormItem[] = [];
    for (const u of rawGrammarDataset.units) {
      for (const s of u.exerciseSets) {
        if (s.type !== targetItem.type) continue;
        if (s.grammarPointId !== targetItem.grammarPointId) continue;
        if (s.instruction && s.instruction.includes('Bảng')) continue;

        for (const it of s.items as any[]) {
          if (usedIds.has(it.id)) continue;
          if (s.type === 'mcq' && ((it.options?.length ?? 0) < 3 || (it.prompt?.length ?? 0) > 160)) {
            continue;
          }
          if (s.type === 'gap' && (it.blanks?.length ?? 0) !== 1) continue;

          const candidate: TestFormItem = {
            ...it,
            unit: u.number,
            type: s.type as 'mcq' | 'gap' | 'reorder',
            skill: 'grammar',
            grammarPointId: s.grammarPointId,
            instruction: s.title,
          };
          if (s.instruction) {
            candidate.wordBank = s.instruction;
          }
          candidates.push(candidate);
        }
      }
    }
    return candidates;
  }

  return [];
}

/**
 * Đổi một câu hỏi trong đề kiểm tra sang câu dự phòng cùng điểm ngữ pháp và cùng dạng.
 */
export function replaceItemInTestForm(
  formId: string,
  oldItemId: string,
  newItem: TestFormItem,
  teacherId?: string
): TestFormDef | null {
  const form = getFormById(formId);
  if (!form) return null;
  const idx = form.items.findIndex((it) => it.id === oldItemId);
  if (idx === -1) return null;

  const updatedItems = [...form.items];
  updatedItems[idx] = { ...newItem };

  const byUnit: Record<string, number> = {};
  for (const n of form.units) {
    byUnit[String(n)] = updatedItems.filter((x) => x.unit === n).length;
  }
  const byGrammarPoint: Record<string, number> = {};
  for (const x of updatedItems) {
    if (x.grammarPointId) {
      byGrammarPoint[x.grammarPointId] = (byGrammarPoint[x.grammarPointId] || 0) + 1;
    }
  }

  const updatedForm: TestFormDef = {
    ...form,
    items: updatedItems,
    coverage: { byUnit, byGrammarPoint },
    updatedAt: new Date().toISOString(),
    updatedBy: teacherId,
  };

  saveCustomTestForm(updatedForm);
  invalidateGrammarDatasetCache();
  return updatedForm;
}

/**
 * Khôi phục một đề kiểm tra về mặc định ban đầu trong `test_forms.json`.
 */
export function resetTestFormToDefault(formId: string): TestFormDef | null {
  const base = getBaseTestFormsDataset();
  const orig = base.tests.find((t) => t.id === formId);
  if (!orig) return null;
  saveCustomTestForm(orig);
  invalidateGrammarDatasetCache();
  return orig;
}

// ============================================================================
// 2. CLASS SETTINGS (NHÓM TN / ĐC & KHOÁ LUYỆN TẬP)
// ============================================================================

export function getClassSettingDocId(schoolId: string, className: string): string {
  return `${schoolId || 'default'}_${normalizeClassName(className)}`;
}

export function loadAllClassSettings(): FirestoreClassSettingDoc[] {
  return readStorageJson<FirestoreClassSettingDoc[]>(CLASS_SETTINGS_STORAGE_KEY, []);
}

export function getClassSetting(
  schoolId: string,
  className: string
): FirestoreClassSettingDoc {
  const normClass = normalizeClassName(className);
  const id = getClassSettingDocId(schoolId, normClass);
  const all = loadAllClassSettings();
  const found =
    all.find((c) => c.id === id) ||
    all.find((c) => normalizeClassName(c.className) === normClass);
  if (found) return found;
  return {
    id,
    schoolId: schoolId || 'default',
    className: normClass,
    researchGroup: null,
    practiceLocked: false,
    updatedAt: new Date().toISOString(),
  };
}

export function upsertClassSetting(params: {
  schoolId: string;
  className: string;
  researchGroup: ResearchGroupType | null;
  practiceLocked: boolean;
  updatedBy?: string;
}): FirestoreClassSettingDoc {
  const normClass = normalizeClassName(params.className);
  const id = getClassSettingDocId(params.schoolId, normClass);
  const all = loadAllClassSettings();
  const nextDoc: FirestoreClassSettingDoc = {
    id,
    schoolId: params.schoolId || 'default',
    className: normClass,
    researchGroup: params.researchGroup,
    practiceLocked: params.practiceLocked,
    updatedAt: new Date().toISOString(),
    updatedBy: params.updatedBy,
  };
  const idx = all.findIndex((c) => c.id === id || normalizeClassName(c.className) === normClass);
  if (idx >= 0) {
    all[idx] = nextDoc;
  } else {
    all.push(nextDoc);
  }
  writeStorageJson(CLASS_SETTINGS_STORAGE_KEY, all);
  return nextDoc;
}

/**
 * Mở khoá luyện tập cho toàn bộ các lớp đối chứng (ĐC) khi kết thúc nghiên cứu (Mục 5).
 */
export function unlockAllControlClasses(schoolId?: string, teacherId?: string): number {
  const all = loadAllClassSettings();
  let count = 0;
  const now = new Date().toISOString();
  const updated = all.map((c) => {
    if ((!schoolId || schoolId === 'all' || c.schoolId === schoolId) && c.practiceLocked) {
      count++;
      return {
        ...c,
        practiceLocked: false,
        updatedAt: now,
        updatedBy: teacherId,
      };
    }
    return c;
  });
  writeStorageJson(CLASS_SETTINGS_STORAGE_KEY, updated);
  return count;
}

/**
 * Kiểm tra xem học sinh hiện tại có đang bị khoá phần luyện tập do thuộc lớp Đối chứng (ĐC) hay không.
 */
export function isStudentPracticeLocked(student?: StudentAccount | null): boolean {
  if (!student) return false;
  const schoolId = toSchoolId(student.schoolName, student.communeName, student.provinceName);
  const setting = getClassSetting(schoolId, student.className);
  return Boolean(setting.practiceLocked);
}

// ============================================================================
// 3. TEST ROUNDS (ĐỢT KIỂM TRA ĐẦU VÀO / ĐẦU RA / DUY TRÌ / THỬ NGHIỆM)
// ============================================================================

function createDefaultTestRounds(): FirestoreTestRoundDoc[] {
  const defaultClasses: TestRoundClassEntry[] = [
    { className: '6A1', group: 'TN' },
    { className: '6A2', group: 'DC' },
    { className: '6A3', group: 'TN' },
    { className: '6A4', group: 'DC' },
    { className: '6A5', group: 'TN' },
    { className: '6A6', group: 'DC' },
    { className: '6A7', group: 'TN' },
  ];
  const createdAt = '2026-09-01T00:00:00.000Z';
  return [
    {
      id: 'round-default-pre-hk1',
      name: 'Khảo sát Đầu vào Tiếng Anh 6 (Pre-test)',
      formId: 'hk1-A',
      kind: 'pre',
      schoolId: 'default',
      classes: defaultClasses,
      openAt: '',
      closeAt: '',
      durationMin: 40,
      showScoreAfterSubmit: true,
      status: 'open',
      createdBy: 'system',
      createdAt,
    },
    {
      id: 'round-default-post-hk1',
      name: 'Khảo sát Đầu ra Tiếng Anh 6 (Post-test)',
      formId: 'hk1-B',
      kind: 'post',
      schoolId: 'default',
      classes: defaultClasses,
      openAt: '',
      closeAt: '',
      durationMin: 40,
      showScoreAfterSubmit: true,
      status: 'open',
      createdBy: 'system',
      createdAt,
    },
  ];
}

export function loadAllTestRounds(): FirestoreTestRoundDoc[] {
  const existing = readStorageJson<FirestoreTestRoundDoc[] | null>(ROUNDS_STORAGE_KEY, null);
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    const defaults = createDefaultTestRounds();
    writeStorageJson(ROUNDS_STORAGE_KEY, defaults);
    return defaults;
  }
  return existing;
}

export function createTestRound(input: {
  name: string;
  formId: string;
  kind: TestRoundKind;
  schoolId: string;
  classes: TestRoundClassEntry[];
  openAt: string;
  closeAt: string;
  durationMin?: number;
  showScoreAfterSubmit?: boolean;
  status?: TestRoundStatus;
  createdBy: string;
}): FirestoreTestRoundDoc {
  const rounds = loadAllTestRounds();
  const normalizedClasses = input.classes.map((c) => ({
    className: normalizeClassName(c.className),
    group: c.group,
  }));

  const doc: FirestoreTestRoundDoc = {
    id: `round-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: input.name.trim(),
    formId: input.formId,
    kind: input.kind,
    schoolId: input.schoolId || 'default',
    classes: normalizedClasses,
    openAt: input.openAt,
    closeAt: input.closeAt,
    durationMin: input.durationMin ?? 40,
    showScoreAfterSubmit: input.showScoreAfterSubmit ?? true,
    status: input.status ?? 'open',
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };

  rounds.unshift(doc);
  writeStorageJson(ROUNDS_STORAGE_KEY, rounds);

  // Đồng bộ nhóm TN/ĐC vào classSettings nếu lớp chưa gán nhóm
  for (const cls of normalizedClasses) {
    const existing = getClassSetting(doc.schoolId, cls.className);
    if (!existing.researchGroup) {
      upsertClassSetting({
        schoolId: doc.schoolId,
        className: cls.className,
        researchGroup: cls.group,
        practiceLocked: cls.group === 'DC' ? existing.practiceLocked : false,
        updatedBy: input.createdBy,
      });
    }
  }

  return doc;
}

export function updateTestRoundStatus(
  roundId: string,
  status: TestRoundStatus
): FirestoreTestRoundDoc | null {
  const rounds = loadAllTestRounds();
  const idx = rounds.findIndex((r) => r.id === roundId);
  if (idx === -1) return null;
  rounds[idx] = { ...rounds[idx], status };
  writeStorageJson(ROUNDS_STORAGE_KEY, rounds);
  return rounds[idx];
}

export function deleteTestRound(roundId: string): void {
  const rounds = loadAllTestRounds().filter((r) => r.id !== roundId);
  writeStorageJson(ROUNDS_STORAGE_KEY, rounds);
}

/**
 * Kiểm tra đợt kiểm tra có đang mở cho học sinh vào làm bài hay không.
 */
export function isRoundCurrentlyOpen(round: FirestoreTestRoundDoc, nowMs = Date.now()): boolean {
  if (round.status !== 'open') return false;
  const openMs = round.openAt ? Date.parse(round.openAt) : NaN;
  const closeMs = round.closeAt ? Date.parse(round.closeAt) : NaN;
  if (Number.isFinite(openMs) && nowMs < openMs) return false;
  if (Number.isFinite(closeMs) && nowMs > closeMs) return false;
  return true;
}

/**
 * Tìm các đợt kiểm tra đang mở cho học sinh hiện tại.
 * Hỗ trợ tự động cho mọi lớp khối 6 (kể cả học sinh mới đăng ký lớp mới như 6A7, 6A8...)
 * đối với các đợt khảo sát mặc định hoặc các đợt áp dụng chung toàn trường.
 */
export function getAvailableRoundsForStudent(
  student: StudentAccount | null | undefined
): FirestoreTestRoundDoc[] {
  if (!student) return [];
  const normClass = normalizeClassName(student.className);
  const rounds = loadAllTestRounds();
  return rounds.filter((r) => {
    if (!isRoundCurrentlyOpen(r)) return false;
    if (!r.classes || r.classes.length === 0) return true;
    if (r.id.startsWith('round-default-') || r.schoolId === 'default') return true;
    return r.classes.some((c) => normalizeClassName(c.className) === normClass);
  });
}

// ============================================================================
// 4. TEST ATTEMPTS & SERVER-SIDE / SERVICE GRADING
// ============================================================================

export function loadAllTestAttempts(): FirestoreTestAttemptDoc[] {
  return readStorageJson<FirestoreTestAttemptDoc[]>(ATTEMPTS_STORAGE_KEY, []);
}

function saveAllTestAttempts(attempts: FirestoreTestAttemptDoc[]): void {
  writeStorageJson(ATTEMPTS_STORAGE_KEY, attempts);
}

/**
 * Lấy bài làm hợp lệ (không bị `voided`) của học sinh trong một đợt kiểm tra.
 */
export function getActiveStudentAttemptForRound(
  roundId: string,
  studentId: string
): FirestoreTestAttemptDoc | null {
  const all = loadAllTestAttempts();
  return (
    all.find(
      (a) => a.roundId === roundId && a.studentId === studentId && a.status !== 'voided'
    ) ?? null
  );
}

/**
 * Khởi tạo hoặc khôi phục bài làm (`in_progress`) của học sinh cho một đợt kiểm tra.
 * Mỗi đợt mỗi học sinh chỉ được làm 1 lần (trừ khi bài cũ đã được giáo viên `voided`).
 */
export function startOrResumeTestAttempt(params: {
  round: FirestoreTestRoundDoc;
  student: StudentAccount;
}): { attempt: FirestoreTestAttemptDoc; sanitizedForm: SanitizedTestFormDef } {
  const { round, student } = params;
  const sanitizedForm = getStudentSanitizedTestForm(round.formId);
  if (!sanitizedForm) {
    throw new Error(`Không tìm thấy đề kiểm tra ${round.formId}`);
  }

  const existing = getActiveStudentAttemptForRound(round.id, student.id);
  if (existing) {
    return { attempt: existing, sanitizedForm };
  }

  const normClass = normalizeClassName(student.className);
  const classEntry = round.classes.find(
    (c) => normalizeClassName(c.className) === normClass
  );
  const schoolId = toSchoolId(student.schoolName, student.communeName, student.provinceName);
  const classSetting = getClassSetting(schoolId, normClass);
  const group: ResearchGroupType =
    classEntry?.group || classSetting.researchGroup || 'TN';

  // Nếu lớp của học sinh (ví dụ 6A7 mới đăng ký) chưa nằm trong danh sách lớp của đợt thi, tự động bổ sung vào đợt thi
  if (normClass && !classEntry) {
    const allRounds = loadAllTestRounds();
    const rIdx = allRounds.findIndex((r) => r.id === round.id);
    if (rIdx >= 0) {
      allRounds[rIdx] = {
        ...allRounds[rIdx],
        classes: [...allRounds[rIdx].classes, { className: normClass, group }],
      };
      writeStorageJson(ROUNDS_STORAGE_KEY, allRounds);
    }
  }

  // Xáo trộn thứ tự 40 câu và thứ tự phương án trả lời riêng cho từng học sinh
  const itemOrder = shuffleStrings(sanitizedForm.items.map((it) => it.id));
  const optionOrder: Record<string, number[]> = {};
  for (const it of sanitizedForm.items) {
    if (it.type === 'mcq' && it.options && it.options.length > 0) {
      optionOrder[it.id] = shuffleIndices(it.options.length);
    } else if (it.type === 'reorder' && it.tokens && it.tokens.length > 0) {
      optionOrder[it.id] = shuffleIndices(it.tokens.length);
    }
  }

  const newAttempt: FirestoreTestAttemptDoc = {
    id: `tatt-${round.id}-${student.id}-${Date.now()}`,
    roundId: round.id,
    formId: round.formId,
    studentId: student.id,
    schoolId: schoolId || round.schoolId || 'default',
    className: normClass,
    group,
    itemOrder,
    optionOrder,
    flaggedItems: [],
    currentItemIndex: 0,
    responses: {},
    status: 'in_progress',
    startedAt: new Date().toISOString(),
    durationSec: 0,
    rawCorrect: 0,
    score10: 0,
    bySkill: {
      grammar: { correct: 0, total: 0 },
      vocab: { correct: 0, total: 0 },
    },
    byGrammarPoint: {},
    tabSwitchCount: 0,
    device: detectDevice(),
    pendingOfflineSync: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  };

  const all = loadAllTestAttempts();
  all.push(newAttempt);
  saveAllTestAttempts(all);

  return { attempt: newAttempt, sanitizedForm };
}

/**
 * Tự động lưu câu trả lời của học sinh trong lúc làm bài (không chấm đúng/sai để không lộ đáp án).
 */
export function saveStudentItemResponse(params: {
  attemptId: string;
  itemId: string;
  answer: string;
  selectedShuffledIndex?: number;
  timeSec: number;
  currentItemIndex?: number;
}): FirestoreTestAttemptDoc | null {
  const all = loadAllTestAttempts();
  const idx = all.findIndex((a) => a.id === params.attemptId);
  if (idx === -1) return null;
  const att = all[idx];
  if (att.status !== 'in_progress') return att;

  const prevResp = att.responses[params.itemId];
  const nextResponses: Record<string, TestItemResponseRecord> = {
    ...att.responses,
    [params.itemId]: {
      answer: params.answer,
      selectedShuffledIndex: params.selectedShuffledIndex,
      answeredAt: new Date().toISOString(),
      timeSec: (prevResp?.timeSec || 0) + Math.max(0, Math.round(params.timeSec)),
    },
  };

  const startedMs = Date.parse(att.startedAt);
  const elapsedSec = Number.isFinite(startedMs)
    ? Math.max(0, Math.round((Date.now() - startedMs) / 1000))
    : att.durationSec;

  const updated: FirestoreTestAttemptDoc = {
    ...att,
    responses: nextResponses,
    currentItemIndex: params.currentItemIndex ?? att.currentItemIndex,
    durationSec: elapsedSec,
    pendingOfflineSync: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  };

  all[idx] = updated;
  saveAllTestAttempts(all);
  return updated;
}

/**
 * Bật / tắt cờ "Đánh dấu xem lại" cho một câu hỏi trong lúc làm bài.
 */
export function toggleFlaggedTestItem(
  attemptId: string,
  itemId: string
): FirestoreTestAttemptDoc | null {
  const all = loadAllTestAttempts();
  const idx = all.findIndex((a) => a.id === attemptId);
  if (idx === -1) return null;
  const att = all[idx];
  if (att.status !== 'in_progress') return att;

  const set = new Set<string>(att.flaggedItems || []);
  if (set.has(itemId)) {
    set.delete(itemId);
  } else {
    set.add(itemId);
  }

  const updated: FirestoreTestAttemptDoc = {
    ...att,
    flaggedItems: Array.from(set),
  };
  all[idx] = updated;
  saveAllTestAttempts(all);
  return updated;
}

/**
 * Ghi nhận số lần học sinh rời khỏi tab làm bài (`visibilitychange` / `blur`).
 */
export function recordTestTabSwitch(attemptId: string): FirestoreTestAttemptDoc | null {
  const all = loadAllTestAttempts();
  const idx = all.findIndex((a) => a.id === attemptId);
  if (idx === -1) return null;
  const att = all[idx];
  if (att.status !== 'in_progress') return att;

  const updated: FirestoreTestAttemptDoc = {
    ...att,
    tabSwitchCount: (att.tabSwitchCount || 0) + 1,
  };
  all[idx] = updated;
  saveAllTestAttempts(all);
  return updated;
}

/**
 * Chấm điểm một câu hỏi trong đề kiểm tra (dùng trên server/service khi học sinh nộp bài).
 */
export function gradeSingleTestItem(
  item: TestFormItem,
  response: TestItemResponseRecord | undefined,
  optionPerm?: number[]
): boolean {
  if (!response) return false;
  const rawAns = (response.answer || '').trim();
  if (!rawAns && response.selectedShuffledIndex === undefined) return false;

  if (item.type === 'mcq' && item.options && typeof item.answerIndex === 'number') {
    if (
      typeof response.selectedShuffledIndex === 'number' &&
      Array.isArray(optionPerm) &&
      optionPerm.length === item.options.length
    ) {
      const origIdx = optionPerm[response.selectedShuffledIndex];
      if (origIdx === item.answerIndex) return true;
    }
    const correctOptionText = item.options[item.answerIndex];
    return rawAns === correctOptionText;
  }

  if (item.type === 'gap' && item.blanks && item.blanks.length > 0) {
    return matches(rawAns, item.blanks[0].accept);
  }

  if (item.type === 'reorder' && item.accept && item.accept.length > 0) {
    return matches(rawAns, item.accept);
  }

  return false;
}

/**
 * Thực hiện chấm điểm toàn bộ bài kiểm tra (`submitTestAttempt`).
 * Hàm này chạy độc lập trên cả máy chủ (`/api/test-attempts/submit`) và dịch vụ lưu trữ.
 */
export function evaluateAndFinalizeAttempt(
  attempt: FirestoreTestAttemptDoc,
  form: TestFormDef,
  autoSubmitted = false
): FirestoreTestAttemptDoc {
  const gradedResponses: Record<string, TestItemResponseRecord> = {};
  let rawCorrect = 0;
  const bySkill = {
    grammar: { correct: 0, total: 0 },
    vocab: { correct: 0, total: 0 },
  };
  const byGrammarPoint: Record<string, { correct: number; total: number }> = {};

  for (const item of form.items) {
    const resp = attempt.responses[item.id];
    const perm = attempt.optionOrder?.[item.id];
    const isCorrect = gradeSingleTestItem(item, resp, perm);

    if (isCorrect) rawCorrect++;

    if (item.skill === 'grammar') {
      bySkill.grammar.total++;
      if (isCorrect) bySkill.grammar.correct++;
    } else {
      bySkill.vocab.total++;
      if (isCorrect) bySkill.vocab.correct++;
    }

    if (item.grammarPointId) {
      if (!byGrammarPoint[item.grammarPointId]) {
        byGrammarPoint[item.grammarPointId] = { correct: 0, total: 0 };
      }
      byGrammarPoint[item.grammarPointId].total++;
      if (isCorrect) {
        byGrammarPoint[item.grammarPointId].correct++;
      }
    }

    gradedResponses[item.id] = {
      answer: resp?.answer ?? '',
      selectedShuffledIndex: resp?.selectedShuffledIndex,
      correct: isCorrect,
      answeredAt: resp?.answeredAt ?? new Date().toISOString(),
      timeSec: resp?.timeSec ?? 0,
    };
  }

  const submittedAt = new Date().toISOString();
  const startedMs = Date.parse(attempt.startedAt);
  const submittedMs = Date.parse(submittedAt);
  const durationSec =
    Number.isFinite(startedMs) && Number.isFinite(submittedMs)
      ? Math.max(1, Math.round((submittedMs - startedMs) / 1000))
      : attempt.durationSec;

  const totalItems = form.items.length || 40;
  const score10 = Math.round(((rawCorrect / totalItems) * 10) * 100) / 100;

  return {
    ...attempt,
    responses: gradedResponses,
    status: autoSubmitted ? 'auto_submitted' : 'submitted',
    submittedAt,
    durationSec,
    rawCorrect,
    score10,
    bySkill,
    byGrammarPoint,
    pendingOfflineSync: false,
  };
}

/**
 * Nộp bài kiểm tra của học sinh: gọi endpoint `/api/test-attempts/submit` (Cloud Function / Server)
 * để chấm điểm an toàn trên máy chủ và lưu kết quả vào `testAttempts`.
 */
export async function submitTestAttempt(
  attemptId: string,
  autoSubmitted = false
): Promise<FirestoreTestAttemptDoc | null> {
  const all = loadAllTestAttempts();
  const idx = all.findIndex((a) => a.id === attemptId);
  if (idx === -1) return null;
  const current = all[idx];
  if (current.status === 'submitted' || current.status === 'auto_submitted') {
    return current;
  }

  const form = getFormById(current.formId);
  if (!form) return null;

  let finalized = evaluateAndFinalizeAttempt(current, form, autoSubmitted);

  // Thử gọi máy chủ chấm điểm (/api/test-attempts/submit) nếu đang chạy trong trình duyệt
  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    try {
      const res = await fetch('/api/test-attempts/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attempt: current,
          autoSubmitted,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.attempt) {
          finalized = data.attempt as FirestoreTestAttemptDoc;
        }
      }
    } catch {
      // Nếu mất mạng khi nộp, vẫn lưu kết quả chấm chuẩn xác và đánh dấu đồng bộ
      finalized.pendingOfflineSync = typeof navigator !== 'undefined' ? !navigator.onLine : false;
    }
  }

  const latestAll = loadAllTestAttempts();
  const latestIdx = latestAll.findIndex((a) => a.id === attemptId);
  if (latestIdx >= 0) {
    latestAll[latestIdx] = finalized;
    saveAllTestAttempts(latestAll);
  }

  return finalized;
}

/**
 * Huỷ bài làm của học sinh (chỉ dành cho Giáo viên khi có sự cố kỹ thuật) và cho phép làm lại.
 * Bắt buộc ghi lý do (`reason`), lưu vào nhật ký `testVoidLogs`.
 */
export function voidStudentTestAttempt(params: {
  attemptId: string;
  reason: string;
  teacherId: string;
}): { success: boolean; error?: string; attempt?: FirestoreTestAttemptDoc } {
  const cleanReason = (params.reason || '').trim();
  if (!cleanReason) {
    return {
      success: false,
      error: 'Vui lòng nhập rõ lý do huỷ bài (VD: Mất điện, sập nguồn máy tính, rớt mạng...).',
    };
  }

  const all = loadAllTestAttempts();
  const idx = all.findIndex((a) => a.id === params.attemptId);
  if (idx === -1) {
    return { success: false, error: 'Không tìm thấy bài làm cần huỷ.' };
  }

  const now = new Date().toISOString();
  const updated: FirestoreTestAttemptDoc = {
    ...all[idx],
    status: 'voided',
    voidReason: cleanReason,
    voidedAt: now,
    voidedBy: params.teacherId,
  };
  all[idx] = updated;
  saveAllTestAttempts(all);

  const logs = readStorageJson<TestVoidLogEntry[]>(VOID_LOGS_STORAGE_KEY, []);
  logs.unshift({
    id: `vlog-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    attemptId: updated.id,
    roundId: updated.roundId,
    studentId: updated.studentId,
    className: updated.className,
    reason: cleanReason,
    voidedBy: params.teacherId,
    voidedAt: now,
  });
  writeStorageJson(VOID_LOGS_STORAGE_KEY, logs);

  return { success: true, attempt: updated };
}

export function loadTestVoidLogs(): TestVoidLogEntry[] {
  return readStorageJson<TestVoidLogEntry[]>(VOID_LOGS_STORAGE_KEY, []);
}
