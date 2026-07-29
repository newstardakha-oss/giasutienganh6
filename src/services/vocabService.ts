import unit2VocabRaw from '../data/unit2_vocab.json';
import unit3VocabRaw from '../data/unit3_vocab.json';
import unit4VocabRaw from '../data/unit4_vocab.json';
import unit5VocabRaw from '../data/unit5_vocab.json';
import unit6VocabRaw from '../data/unit6_vocab.json';
import unit7VocabRaw from '../data/unit7_vocab.json';
import unit8VocabRaw from '../data/unit8_vocab.json';
import unit9VocabRaw from '../data/unit9_vocab.json';
import unit11VocabRaw from '../data/unit11_vocab.json';
import unit12VocabRaw from '../data/unit12_vocab.json';
import { Question } from '../types';

export interface VocabItem {
  id: number | string;
  word: string;
  phonetic: string;
  type: string;
  meaning: string;
  example_en: string;
  example_vi: string;
  part: string;
}

// 1. Tải danh sách từ vựng từ tệp JSON
export const UNIT2_VOCAB_DATA: VocabItem[] = unit2VocabRaw as VocabItem[];
export const UNIT3_VOCAB_DATA: VocabItem[] = unit3VocabRaw as VocabItem[];
export const UNIT4_VOCAB_DATA: VocabItem[] = unit4VocabRaw as VocabItem[];
export const UNIT5_VOCAB_DATA: VocabItem[] = unit5VocabRaw as VocabItem[];
export const UNIT6_VOCAB_DATA: VocabItem[] = unit6VocabRaw as VocabItem[];
export const UNIT7_VOCAB_DATA: VocabItem[] = unit7VocabRaw as VocabItem[];
export const UNIT8_VOCAB_DATA: VocabItem[] = unit8VocabRaw as VocabItem[];
export const UNIT9_VOCAB_DATA: VocabItem[] = unit9VocabRaw as VocabItem[];
export const UNIT11_VOCAB_DATA: VocabItem[] = unit11VocabRaw as VocabItem[];
export const UNIT12_VOCAB_DATA: VocabItem[] = unit12VocabRaw as VocabItem[];

/**
 * 2. Khởi tạo & Nạp dữ liệu với cơ chế kiểm tra trùng lặp (Seed Data)
 * Đảm bảo không chèn các từ vựng đã tồn tại (dựa trên 'word' không phân biệt hoa thường).
 */
export function seedVocabData(sourceData: VocabItem[], existingVocab: VocabItem[] = []): VocabItem[] {
  const vocabMap = new Map<string, VocabItem>();

  existingVocab.forEach((item) => {
    vocabMap.set(item.word.toLowerCase().trim(), item);
  });

  let newlyAddedCount = 0;
  sourceData.forEach((item) => {
    const key = item.word.toLowerCase().trim();
    if (!vocabMap.has(key)) {
      vocabMap.set(key, item);
      newlyAddedCount++;
    }
  });

  console.log(`✅ [Seed Data] Nạp thành công. Tổng số: ${vocabMap.size} (Thêm mới: ${newlyAddedCount})`);
  return Array.from(vocabMap.values());
}

export function seedUnit2Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT2_VOCAB_DATA, existingVocab);
}

export function seedUnit3Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT3_VOCAB_DATA, existingVocab);
}

export function seedUnit4Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT4_VOCAB_DATA, existingVocab);
}

export function seedUnit5Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT5_VOCAB_DATA, existingVocab);
}

export function seedUnit6Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT6_VOCAB_DATA, existingVocab);
}

export function seedUnit7Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT7_VOCAB_DATA, existingVocab);
}

export function seedUnit8Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT8_VOCAB_DATA, existingVocab);
}

export function seedUnit9Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT9_VOCAB_DATA, existingVocab);
}

export function seedUnit11Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT11_VOCAB_DATA, existingVocab);
}

export function seedUnit12Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  return seedVocabData(UNIT12_VOCAB_DATA, existingVocab);
}

/**
 * 3a. Lấy danh sách từ vựng theo bài học (part) và theo Unit
 * @param unitId "unit-2", "unit-3", "unit-4", "unit-5", "unit-6", "unit-7", "unit-8", "unit-9", "unit-11", "unit-12" (mặc định "unit-12")
 * @param part Tên phần bài học (VD: "GETTING STARTED", "A CLOSER LOOK 1", "SKILLS 1"...)
 */
export function getVocabByPart(part: string, unitId: string = 'unit-12'): VocabItem[] {
  let sourceList = UNIT12_VOCAB_DATA;
  if (unitId === 'unit-2') sourceList = UNIT2_VOCAB_DATA;
  if (unitId === 'unit-3') sourceList = UNIT3_VOCAB_DATA;
  if (unitId === 'unit-4') sourceList = UNIT4_VOCAB_DATA;
  if (unitId === 'unit-5') sourceList = UNIT5_VOCAB_DATA;
  if (unitId === 'unit-6') sourceList = UNIT6_VOCAB_DATA;
  if (unitId === 'unit-7') sourceList = UNIT7_VOCAB_DATA;
  if (unitId === 'unit-8') sourceList = UNIT8_VOCAB_DATA;
  if (unitId === 'unit-9') sourceList = UNIT9_VOCAB_DATA;
  if (unitId === 'unit-11') sourceList = UNIT11_VOCAB_DATA;

  if (!part || part === 'ALL') {
    return sourceList;
  }
  return sourceList.filter(
    (item) => item.part.toUpperCase() === part.toUpperCase()
  );
}

/**
 * 3b. Lấy ngẫu nhiên N từ vựng cho các Mini-game (Flashcard, Word Search, Quiz)
 * Sử dụng thuật toán xáo trộn Fisher-Yates shuffle chuẩn xác.
 * @param count Số lượng từ vựng cần lấy (mặc định 10)
 * @param unitId "unit-2", "unit-3", "unit-4", "unit-5", "unit-6", "unit-7", "unit-8", "unit-9", "unit-11", "unit-12"
 * @param part (Tùy chọn) Lọc theo phần bài học
 */
export function getRandomVocabForGames(count: number = 10, unitId: string = 'unit-12', part?: string): VocabItem[] {
  const sourceList = getVocabByPart(part || 'ALL', unitId);
  if (sourceList.length === 0) return [];

  const shuffled = [...sourceList];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * 4. Chuyển đổi dữ liệu VocabItem thành Question object để dùng trong PracticeHub & Mini-Games
 */
export function convertVocabToQuestion(vocab: VocabItem, unitId: string = 'unit-12'): Question {
  let sourceList = UNIT12_VOCAB_DATA;
  if (unitId === 'unit-2') sourceList = UNIT2_VOCAB_DATA;
  if (unitId === 'unit-3') sourceList = UNIT3_VOCAB_DATA;
  if (unitId === 'unit-4') sourceList = UNIT4_VOCAB_DATA;
  if (unitId === 'unit-5') sourceList = UNIT5_VOCAB_DATA;
  if (unitId === 'unit-6') sourceList = UNIT6_VOCAB_DATA;
  if (unitId === 'unit-7') sourceList = UNIT7_VOCAB_DATA;
  if (unitId === 'unit-8') sourceList = UNIT8_VOCAB_DATA;
  if (unitId === 'unit-9') sourceList = UNIT9_VOCAB_DATA;
  if (unitId === 'unit-11') sourceList = UNIT11_VOCAB_DATA;

  const options = [vocab.word];
  const otherWords = sourceList
    .filter((v) => v.word !== vocab.word)
    .map((v) => v.word);

  while (options.length < 4 && otherWords.length > 0) {
    const randIndex = Math.floor(Math.random() * otherWords.length);
    options.push(otherWords.splice(randIndex, 1)[0]);
  }

  options.sort(() => 0.5 - Math.random());

  return {
    id: `q-${unitId}-v-${vocab.id}`,
    unitId: unitId,
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: `📌 [${unitId.toUpperCase()} - ${vocab.part}]\n${vocab.example_en.replace(
      new RegExp(vocab.word, 'gi'),
      '________'
    )} (${vocab.meaning})`,
    options,
    correctAnswer: vocab.word,
    explanation: `Từ "${vocab.word}" (${vocab.phonetic}) thuộc loại từ (${vocab.type}), nghĩa là "${vocab.meaning}". Ví dụ: ${vocab.example_vi}`,
    hints: [
      `Gợi ý 1: Loại từ (${vocab.type}) có nghĩa là "${vocab.meaning}".`,
      `Gợi ý 2: Phiên âm: ${vocab.phonetic}.`,
    ],
    difficulty: 'Dễ',
  };
}
