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

/**
 * 5. Từ vựng tĩnh cho Unit 1 và Unit 10 (không có file JSON riêng)
 * Được tạo từ danh sách vocabulary trong SGK_UNITS (sgkData.ts)
 */
const UNIT1_VOCAB_INLINE: VocabItem[] = [
  { id: 'u1-1', word: 'calculator', phonetic: '/ˈkæl.kjə.leɪ.tər/', type: 'n', meaning: 'máy tính bỏ túi', example_en: 'I use a calculator in maths class.', example_vi: 'Tôi dùng máy tính bỏ túi trong giờ toán.', part: 'GETTING STARTED' },
  { id: 'u1-2', word: 'compass', phonetic: '/ˈkʌm.pəs/', type: 'n', meaning: 'com-pa', example_en: 'Can I borrow your compass?', example_vi: 'Cho tôi mượn com-pa của bạn được không?', part: 'GETTING STARTED' },
  { id: 'u1-3', word: 'pencil case', phonetic: '/ˈpen.sᵊl keɪs/', type: 'n', meaning: 'hộp bút', example_en: 'My pencil case is blue.', example_vi: 'Hộp bút của tôi màu xanh.', part: 'GETTING STARTED' },
  { id: 'u1-4', word: 'rubber', phonetic: '/ˈrʌb.ər/', type: 'n', meaning: 'cục tẩy', example_en: 'I need a rubber to erase this.', example_vi: 'Tôi cần một cục tẩy để xóa cái này.', part: 'GETTING STARTED' },
  { id: 'u1-5', word: 'school bag', phonetic: '/skuːl bæɡ/', type: 'n', meaning: 'cặp sách', example_en: 'My school bag is very heavy.', example_vi: 'Cặp sách của tôi rất nặng.', part: 'GETTING STARTED' },
  { id: 'u1-6', word: 'uniform', phonetic: '/ˈjuː.nɪ.fɔːm/', type: 'n', meaning: 'đồng phục', example_en: 'Students wear uniform at school.', example_vi: 'Học sinh mặc đồng phục ở trường.', part: 'GETTING STARTED' },
  { id: 'u1-7', word: 'history', phonetic: '/ˈhɪs.tər.i/', type: 'n', meaning: 'lịch sử', example_en: 'I have history on Monday.', example_vi: 'Tôi có môn lịch sử vào thứ Hai.', part: 'A CLOSER LOOK 1' },
  { id: 'u1-8', word: 'science', phonetic: '/ˈsaɪ.əns/', type: 'n', meaning: 'khoa học', example_en: 'Science is my favourite subject.', example_vi: 'Khoa học là môn yêu thích của tôi.', part: 'A CLOSER LOOK 1' },
  { id: 'u1-9', word: 'exercise', phonetic: '/ˈek.sər.saɪz/', type: 'n', meaning: 'bài tập', example_en: 'Please do exercise 1 on page 5.', example_vi: 'Hãy làm bài tập 1 ở trang 5.', part: 'A CLOSER LOOK 1' },
  { id: 'u1-10', word: 'homework', phonetic: '/ˈhəʊm.wɜːk/', type: 'n', meaning: 'bài tập về nhà', example_en: 'I do my homework every day.', example_vi: 'Tôi làm bài tập về nhà mỗi ngày.', part: 'A CLOSER LOOK 1' },
  { id: 'u1-11', word: 'subject', phonetic: '/ˈsʌb.dʒɪkt/', type: 'n', meaning: 'môn học', example_en: 'What is your favourite subject?', example_vi: 'Môn học yêu thích của bạn là gì?', part: 'A CLOSER LOOK 1' },
  { id: 'u1-12', word: 'timetable', phonetic: '/ˈtaɪm.teɪ.bᵊl/', type: 'n', meaning: 'thời khóa biểu', example_en: 'Look at the timetable.', example_vi: 'Hãy nhìn vào thời khóa biểu.', part: 'A CLOSER LOOK 1' },
  { id: 'u1-13', word: 'classmate', phonetic: '/ˈklɑːs.meɪt/', type: 'n', meaning: 'bạn cùng lớp', example_en: 'She is my new classmate.', example_vi: 'Cô ấy là bạn cùng lớp mới của tôi.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-14', word: 'library', phonetic: '/ˈlaɪ.brər.i/', type: 'n', meaning: 'thư viện', example_en: 'I read books in the library.', example_vi: 'Tôi đọc sách ở thư viện.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-15', word: 'playground', phonetic: '/ˈpleɪ.ɡraʊnd/', type: 'n', meaning: 'sân chơi', example_en: 'We play football in the playground.', example_vi: 'Chúng tôi chơi bóng đá ở sân chơi.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-16', word: 'always', phonetic: '/ˈɔːl.weɪz/', type: 'adv', meaning: 'luôn luôn', example_en: 'He always goes to school early.', example_vi: 'Anh ấy luôn đi học sớm.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-17', word: 'usually', phonetic: '/ˈjuː.ʒu.ə.li/', type: 'adv', meaning: 'thường xuyên', example_en: 'I usually have breakfast at 7.', example_vi: 'Tôi thường ăn sáng lúc 7 giờ.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-18', word: 'sometimes', phonetic: '/ˈsʌm.taɪmz/', type: 'adv', meaning: 'thỉnh thoảng', example_en: 'Sometimes I walk to school.', example_vi: 'Thỉnh thoảng tôi đi bộ đến trường.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-19', word: 'never', phonetic: '/ˈnev.ər/', type: 'adv', meaning: 'không bao giờ', example_en: 'I never skip breakfast.', example_vi: 'Tôi không bao giờ bỏ bữa sáng.', part: 'A CLOSER LOOK 2' },
  { id: 'u1-20', word: 'boarding school', phonetic: '/ˈbɔːdɪŋ skuːl/', type: 'n', meaning: 'trường nội trú', example_en: 'She studies at a boarding school.', example_vi: 'Cô ấy học ở trường nội trú.', part: 'SKILLS 1' },
];

const UNIT10_VOCAB_INLINE: VocabItem[] = [
  { id: 'u10-1', word: 'appliance', phonetic: '/əˈplaɪ.əns/', type: 'n', meaning: 'thiết bị, đồ dùng', example_en: 'There are many modern appliances in the kitchen.', example_vi: 'Có nhiều thiết bị hiện đại trong nhà bếp.', part: 'GETTING STARTED' },
  { id: 'u10-2', word: 'automatic', phonetic: '/ˌɔː.təˈmæt.ɪk/', type: 'adj', meaning: 'tự động', example_en: 'The door is automatic.', example_vi: 'Cánh cửa này tự động.', part: 'GETTING STARTED' },
  { id: 'u10-3', word: 'dishwasher', phonetic: '/ˈdɪʃ.wɒʃ.ər/', type: 'n', meaning: 'máy rửa bát', example_en: 'We will have an automatic dishwasher.', example_vi: 'Chúng ta sẽ có một máy rửa bát tự động.', part: 'GETTING STARTED' },
  { id: 'u10-4', word: 'hi-tech', phonetic: '/ˌhaɪˈtek/', type: 'adj', meaning: 'công nghệ cao', example_en: 'My future house will be hi-tech.', example_vi: 'Ngôi nhà tương lai của tôi sẽ là công nghệ cao.', part: 'GETTING STARTED' },
  { id: 'u10-5', word: 'solar energy', phonetic: '/ˌsəʊ.lər ˈen.ə.dʒi/', type: 'n', meaning: 'năng lượng mặt trời', example_en: 'The house will use solar energy.', example_vi: 'Ngôi nhà sẽ sử dụng năng lượng mặt trời.', part: 'GETTING STARTED' },
  { id: 'u10-6', word: 'space', phonetic: '/speɪs/', type: 'n', meaning: 'không gian, vũ trụ', example_en: 'People might live in space.', example_vi: 'Mọi người có thể sống trong vũ trụ.', part: 'A CLOSER LOOK 1' },
  { id: 'u10-7', word: 'UFO', phonetic: '/ˌjuːefˈəʊ/', type: 'n', meaning: 'đĩa bay (vật thể bay không xác định)', example_en: 'Some people believe in UFOs.', example_vi: 'Một số người tin vào đĩa bay.', part: 'A CLOSER LOOK 1' },
  { id: 'u10-8', word: 'wireless', phonetic: '/ˈwaɪə.ləs/', type: 'adj', meaning: 'không dây', example_en: 'We will have a wireless TV.', example_vi: 'Chúng ta sẽ có TV không dây.', part: 'A CLOSER LOOK 1' },
  { id: 'u10-9', word: 'smart', phonetic: '/smɑːt/', type: 'adj', meaning: 'thông minh', example_en: 'We will have a smart clock.', example_vi: 'Chúng ta sẽ có đồng hồ thông minh.', part: 'A CLOSER LOOK 1' },
  { id: 'u10-10', word: 'cottage', phonetic: '/ˈkɒt.ɪdʒ/', type: 'n', meaning: 'nhà tranh, nhà nhỏ ở nông thôn', example_en: 'They might live in a space cottage.', example_vi: 'Họ có thể sống trong một ngôi nhà nhỏ trong vũ trụ.', part: 'A CLOSER LOOK 1' },
  { id: 'u10-11', word: 'houseboat', phonetic: '/ˈhaʊs.bəʊt/', type: 'n', meaning: 'nhà thuyền', example_en: 'A houseboat is a house on water.', example_vi: 'Nhà thuyền là ngôi nhà trên mặt nước.', part: 'A CLOSER LOOK 2' },
  { id: 'u10-12', word: 'villa', phonetic: '/ˈvɪl.ə/', type: 'n', meaning: 'biệt thự', example_en: 'She will live in a villa.', example_vi: 'Cô ấy sẽ sống trong một biệt thự.', part: 'A CLOSER LOOK 2' },
  { id: 'u10-13', word: 'skyscraper', phonetic: '/ˈskaɪ.skreɪ.pər/', type: 'n', meaning: 'nhà chọc trời', example_en: 'There are many skyscrapers in the city.', example_vi: 'Có nhiều nhà chọc trời trong thành phố.', part: 'A CLOSER LOOK 2' },
  { id: 'u10-14', word: 'comfortable', phonetic: '/ˈkʌm.fə.tə.bᵊl/', type: 'adj', meaning: 'thoải mái', example_en: 'The house will be comfortable.', example_vi: 'Ngôi nhà sẽ rất thoải mái.', part: 'SKILLS 1' },
  { id: 'u10-15', word: 'modern', phonetic: '/ˈmɒd.ən/', type: 'adj', meaning: 'hiện đại', example_en: 'Our future house will be modern.', example_vi: 'Ngôi nhà tương lai sẽ hiện đại.', part: 'SKILLS 1' },
  { id: 'u10-16', word: 'robot', phonetic: '/ˈrəʊ.bɒt/', type: 'n', meaning: 'người máy', example_en: 'A robot will clean the house.', example_vi: 'Người máy sẽ dọn dẹp nhà.', part: 'SKILLS 1' },
  { id: 'u10-17', word: 'fridge', phonetic: '/frɪdʒ/', type: 'n', meaning: 'tủ lạnh', example_en: 'The fridge will tell us what to buy.', example_vi: 'Tủ lạnh sẽ cho biết cần mua gì.', part: 'SKILLS 2' },
  { id: 'u10-18', word: 'bedroom', phonetic: '/ˈbed.ruːm/', type: 'n', meaning: 'phòng ngủ', example_en: 'My bedroom will have a super TV.', example_vi: 'Phòng ngủ sẽ có TV siêu lớn.', part: 'SKILLS 2' },
];

/**
 * 6. Lấy toàn bộ từ vựng theo Unit ID (hỗ trợ tất cả 12 Units)
 * Đây là hàm chính để VocabFlashcard component sử dụng.
 */
export function getAllVocabByUnit(unitId: string): VocabItem[] {
  switch (unitId) {
    case 'unit-1': return UNIT1_VOCAB_INLINE;
    case 'unit-2': return UNIT2_VOCAB_DATA;
    case 'unit-3': return UNIT3_VOCAB_DATA;
    case 'unit-4': return UNIT4_VOCAB_DATA;
    case 'unit-5': return UNIT5_VOCAB_DATA;
    case 'unit-6': return UNIT6_VOCAB_DATA;
    case 'unit-7': return UNIT7_VOCAB_DATA;
    case 'unit-8': return UNIT8_VOCAB_DATA;
    case 'unit-9': return UNIT9_VOCAB_DATA;
    case 'unit-10': return UNIT10_VOCAB_INLINE;
    case 'unit-11': return UNIT11_VOCAB_DATA;
    case 'unit-12': return UNIT12_VOCAB_DATA;
    default: return [];
  }
}

/**
 * 7. Lấy danh sách các phần bài học (parts) duy nhất của 1 Unit
 */
export function getVocabParts(unitId: string): string[] {
  const vocab = getAllVocabByUnit(unitId);
  const parts = new Set(vocab.map((v) => v.part));
  return Array.from(parts);
}

/**
 * 8. Đếm tổng số từ vựng tất cả các Unit
 */
export function getTotalVocabCount(): number {
  let total = 0;
  for (let i = 1; i <= 12; i++) {
    total += getAllVocabByUnit(`unit-${i}`).length;
  }
  return total;
}

