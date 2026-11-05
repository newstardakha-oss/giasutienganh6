import type {
  GrammarDataset,
  Unit,
  GrammarPoint,
  ExerciseType,
  IndexedExerciseItem,
  ReorderItem,
  ErrorItem,
  ClassifyItem,
  McqItem,
  GapItem,
  RewriteItem,
} from './types';

export interface LoadedGrammarBundle {
  dataset: GrammarDataset;
  itemIndex: Record<string, IndexedExerciseItem>;
  grammarPointIndex: Record<string, { unit: Unit; point: GrammarPoint }>;
}

let cachedBundle: LoadedGrammarBundle | null = null;
let pendingPromise: Promise<LoadedGrammarBundle> | null = null;

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  mcq: 'Trắc nghiệm',
  gap: 'Điền từ',
  reorder: 'Sắp xếp câu',
  rewrite: 'Viết lại câu',
  error: 'Tìm lỗi sai',
  classify: 'Phân loại',
  cloze: 'Đoạn văn',
};

/**
 * Lazy-load dữ liệu grammar_g6.json khi người dùng truy cập module Ngữ pháp.
 */
export async function loadGrammarDataset(): Promise<LoadedGrammarBundle> {
  if (cachedBundle) return cachedBundle;
  if (pendingPromise) return pendingPromise;

  pendingPromise = import('../data/grammar_g6.json').then((mod) => {
    const dataset = (mod.default || mod) as GrammarDataset;
    const itemIndex: Record<string, IndexedExerciseItem> = {};
    const grammarPointIndex: Record<string, { unit: Unit; point: GrammarPoint }> = {};

    for (const unit of dataset.units) {
      for (const point of unit.grammarPoints) {
        grammarPointIndex[point.id] = { unit, point };
      }
      for (const set of unit.exerciseSets) {
        for (const item of set.items) {
          itemIndex[item.id] = { unit, set, item };
        }
      }
    }

    cachedBundle = { dataset, itemIndex, grammarPointIndex };
    return cachedBundle;
  });

  return pendingPromise;
}

/**
 * Chuyển đổi mã Unit từ grammar_g6 ("u1".."u12") sang mã Unit của App ("unit-1".."unit-12").
 */
export function toAppUnitId(grammarUnitId: string): string {
  const match = /^u(\d+)$/i.exec(grammarUnitId.trim());
  if (match) return `unit-${Number(match[1])}`;
  return grammarUnitId;
}

/**
 * Chuyển đổi mã Unit của App ("unit-1".."unit-12") sang mã Unit của grammar_g6 ("u1".."u12").
 */
export function toGrammarUnitId(appUnitId?: string | null): string | null {
  if (!appUnitId) return null;
  const trimmed = appUnitId.trim().toLowerCase();
  if (/^u\d+$/.test(trimmed)) return trimmed;
  const match = /^unit-(\d+)$/.exec(trimmed);
  if (match) return `u${Number(match[1])}`;
  return null;
}

/**
 * Trộn ngẫu nhiên mảng (Fisher-Yates).
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Tạo chuỗi xem trước ngắn gọn của câu hỏi (dùng trong màn Kết quả & Sổ lỗi sai).
 */
export function formatItemPreview(entry: IndexedExerciseItem): string {
  const { set, item } = entry;
  switch (set.type) {
    case 'reorder':
      return (item as ReorderItem).tokens.join(' / ');
    case 'error':
      return (item as ErrorItem).sentence;
    case 'classify':
      return (item as ClassifyItem).text;
    case 'cloze':
      return set.title;
    case 'mcq':
    case 'gap':
    case 'rewrite':
      return (item as McqItem | GapItem | RewriteItem).prompt;
  }
}
