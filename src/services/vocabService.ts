import unit2VocabRaw from '../data/unit2_vocab.json';
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

/**
 * 2. Khởi tạo & Nạp dữ liệu với cơ chế kiểm tra trùng lặp (Seed Data)
 * Đảm bảo không chèn các từ vựng đã tồn tại (dựa trên 'word' không phân biệt hoa thường).
 */
export function seedUnit2Vocab(existingVocab: VocabItem[] = []): VocabItem[] {
  const vocabMap = new Map<string, VocabItem>();

  // Thêm các từ vựng hiện có
  existingVocab.forEach((item) => {
    vocabMap.set(item.word.toLowerCase().trim(), item);
  });

  // Nạp 61 từ vựng từ unit2_vocab.json nếu chưa tồn tại
  let newlyAddedCount = 0;
  UNIT2_VOCAB_DATA.forEach((item) => {
    const key = item.word.toLowerCase().trim();
    if (!vocabMap.has(key)) {
      vocabMap.set(key, item);
      newlyAddedCount++;
    }
  });

  console.log(`✅ [Seed Data] Đã nạp thành công. Tổng số từ vựng: ${vocabMap.size} (Thêm mới: ${newlyAddedCount})`);
  return Array.from(vocabMap.values());
}

/**
 * 3a. Lấy danh sách từ vựng theo bài học (part)
 * @param part Tên phần bài học (VD: "GETTING STARTED", "A CLOSER LOOK 1", "COMMUNICATION", "SKILLS 1", "SKILLS 2", "LOOKING BACK", "PROJECT")
 */
export function getVocabByPart(part: string): VocabItem[] {
  if (!part || part === 'ALL') {
    return UNIT2_VOCAB_DATA;
  }
  return UNIT2_VOCAB_DATA.filter(
    (item) => item.part.toUpperCase() === part.toUpperCase()
  );
}

/**
 * 3b. Lấy ngẫu nhiên N từ vựng cho các Mini-game (Flashcard, Word Search, Quiz)
 * Sử dụng thuật toán xáo trộn Fisher-Yates shuffle chuẩn xác.
 * @param count Số lượng từ vựng cần lấy (mặc định 10)
 * @param part (Tùy chọn) Lọc theo phần bài học
 */
export function getRandomVocabForGames(count: number = 10, part?: string): VocabItem[] {
  const sourceList = part ? getVocabByPart(part) : UNIT2_VOCAB_DATA;
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
export function convertVocabToQuestion(vocab: VocabItem): Question {
  const options = [vocab.word];
  const otherWords = UNIT2_VOCAB_DATA
    .filter((v) => v.word !== vocab.word)
    .map((v) => v.word);

  // Lấy 3 lựa chọn nhiễu ngẫu nhiên
  while (options.length < 4 && otherWords.length > 0) {
    const randIndex = Math.floor(Math.random() * otherWords.length);
    options.push(otherWords.splice(randIndex, 1)[0]);
  }

  // Xáo trộn đáp án
  options.sort(() => 0.5 - Math.random());

  return {
    id: `q-u2-v-${vocab.id}`,
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: `📌 [UNIT 2: MY HOME - ${vocab.part}]\n${vocab.example_en.replace(
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
