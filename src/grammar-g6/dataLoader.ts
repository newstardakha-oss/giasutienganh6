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
import {
  filterPracticeGrammarDataset,
  getReservedItemIdSet,
} from './testFormsLoader';

export interface LoadedGrammarBundle {
  /** Bộ dữ liệu luyện tập đã loại bỏ toàn bộ câu thuộc `reservedItemIds` */
  dataset: GrammarDataset;
  /** Chỉ mục câu hỏi luyện tập (không chứa `reservedItemIds`) */
  itemIndex: Record<string, IndexedExerciseItem>;
  /** Bộ dữ liệu gốc đầy đủ (chỉ dùng cho Giáo viên khi đổi câu trong "Xem trước đề") */
  rawDataset: GrammarDataset;
  /** Chỉ mục câu hỏi gốc đầy đủ (chỉ dùng cho Giáo viên) */
  rawItemIndex: Record<string, IndexedExerciseItem>;
  grammarPointIndex: Record<string, { unit: Unit; point: GrammarPoint }>;
}

let cachedBundle: LoadedGrammarBundle | null = null;
let pendingPromise: Promise<LoadedGrammarBundle> | null = null;

export function invalidateGrammarDatasetCache(): void {
  cachedBundle = null;
  pendingPromise = null;
}

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
 * Tự động loại bỏ mọi câu hỏi có `id` nằm trong `reservedItemIds` của `test_forms.json`
 * khỏi `dataset` và `itemIndex` dành cho học sinh luyện tập.
 */
export async function loadGrammarDataset(): Promise<LoadedGrammarBundle> {
  if (cachedBundle) return cachedBundle;
  if (pendingPromise) return pendingPromise;

  pendingPromise = import('../data/grammar_g6.json').then((mod) => {
    const rawDataset = (mod.default || mod) as GrammarDataset;
    const reservedIds = getReservedItemIdSet();
    const dataset = filterPracticeGrammarDataset(rawDataset, reservedIds);

    const itemIndex: Record<string, IndexedExerciseItem> = {};
    const rawItemIndex: Record<string, IndexedExerciseItem> = {};
    const grammarPointIndex: Record<string, { unit: Unit; point: GrammarPoint }> = {};

    for (const unit of rawDataset.units) {
      for (const point of unit.grammarPoints) {
        grammarPointIndex[point.id] = { unit, point };
      }
      for (const set of unit.exerciseSets) {
        for (const item of set.items) {
          rawItemIndex[item.id] = { unit, set, item };
        }
      }
    }

    for (const unit of dataset.units) {
      for (const set of unit.exerciseSets) {
        for (const item of set.items) {
          if (!reservedIds.has(item.id)) {
            itemIndex[item.id] = { unit, set, item };
          }
        }
      }
    }

    cachedBundle = {
      dataset,
      itemIndex,
      rawDataset,
      rawItemIndex,
      grammarPointIndex,
    };
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
