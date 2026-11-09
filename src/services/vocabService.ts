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
  imageUrl?: string;
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
  const sourceList = getAllVocabByUnit(unitId);

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
  const sourceList = getAllVocabByUnit(unitId);

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
 * 5. Từ vựng chuẩn cho Unit 1 (bao gồm 26 từ vựng có hình ảnh minh họa chính xác từ bộ thẻ Unit 1) và Unit 10
 */
const UNIT1_VOCAB_INLINE: VocabItem[] = [
  // Nhóm 1: School things (Đồ dùng học tập)
  { id: 'u1-1', word: 'school bag', phonetic: '/ˈskuːl bæɡ/', type: 'n', meaning: 'cặp sách', example_en: 'My school bag is very heavy.', example_vi: 'Cặp sách của tôi rất nặng.', part: 'School things', imageUrl: './images/vocab/unit1/school-bag.jpg' },
  { id: 'u1-2', word: 'compass', phonetic: '/ˈkʌm.pəs/', type: 'n', meaning: 'com-pa', example_en: 'Can I borrow your compass?', example_vi: 'Cho tôi mượn com-pa của bạn được không?', part: 'School things', imageUrl: './images/vocab/unit1/compass.jpg' },
  { id: 'u1-3', word: 'calculator', phonetic: '/ˈkæl.kjə.leɪ.tər/', type: 'n', meaning: 'máy tính bỏ túi', example_en: 'I use a calculator in maths class.', example_vi: 'Tôi dùng máy tính bỏ túi trong giờ toán.', part: 'School things', imageUrl: './images/vocab/unit1/calculator.jpg' },
  { id: 'u1-4', word: 'pencil case', phonetic: '/ˈpen.sᵊl keɪs/', type: 'n', meaning: 'hộp bút', example_en: 'My pencil case has a pink flower on it.', example_vi: 'Hộp bút của tôi có hình bông hoa màu hồng.', part: 'School things', imageUrl: './images/vocab/unit1/pencil-case.jpg' },
  { id: 'u1-5', word: 'notebook', phonetic: '/ˈnəʊt.bʊk/', type: 'n', meaning: 'vở ghi', example_en: 'Write the new words in your notebook.', example_vi: 'Hãy viết các từ mới vào vở ghi của bạn.', part: 'School things', imageUrl: './images/vocab/unit1/notebook.jpg' },
  { id: 'u1-6', word: 'textbook', phonetic: '/ˈtekst.bʊk/', type: 'n', meaning: 'sách giáo khoa', example_en: 'Open your English textbook on page 6.', example_vi: 'Hãy mở sách giáo khoa Tiếng Anh trang 6.', part: 'School things', imageUrl: './images/vocab/unit1/textbook.jpg' },
  { id: 'u1-7', word: 'rubber', phonetic: '/ˈrʌb.ər/', type: 'n', meaning: 'cục tẩy', example_en: 'I need a rubber to erase this pencil mark.', example_vi: 'Tôi cần một cục tẩy để xóa vết bút chì này.', part: 'School things', imageUrl: './images/vocab/unit1/rubber.jpg' },
  { id: 'u1-8', word: 'ruler', phonetic: '/ˈruː.lər/', type: 'n', meaning: 'thước kẻ', example_en: 'Use a ruler to draw a straight line.', example_vi: 'Hãy dùng thước kẻ để kẻ một đường thẳng.', part: 'School things', imageUrl: './images/vocab/unit1/ruler.jpg' },
  { id: 'u1-9', word: 'sharpener', phonetic: '/ˈʃɑː.pən.ər/', type: 'n', meaning: 'gọt bút chì', example_en: 'I have a blue pencil sharpener.', example_vi: 'Tôi có một chiếc gọt bút chì màu xanh.', part: 'School things', imageUrl: './images/vocab/unit1/sharpener.jpg' },
  { id: 'u1-10', word: 'uniform', phonetic: '/ˈjuː.nɪ.fɔːm/', type: 'n', meaning: 'đồng phục', example_en: 'Students wear their uniform at school.', example_vi: 'Học sinh mặc đồng phục ở trường.', part: 'School things', imageUrl: './images/vocab/unit1/uniform.jpg' },

  // Nhóm 2: Con người và loại hình trường học
  { id: 'u1-11', word: 'classmate', phonetic: '/ˈklɑːs.meɪt/', type: 'n', meaning: 'bạn cùng lớp', example_en: 'She is my new classmate.', example_vi: 'Cô ấy là bạn cùng lớp mới của tôi.', part: 'Con người & Trường học', imageUrl: './images/vocab/unit1/classmate.jpg' },
  { id: 'u1-12', word: 'boarding school', phonetic: '/ˈbɔː.dɪŋ skuːl/', type: 'n', meaning: 'trường nội trú', example_en: 'Students live and study at a boarding school.', example_vi: 'Học sinh sống và học tập tại trường nội trú.', part: 'Con người & Trường học', imageUrl: './images/vocab/unit1/boarding-school.jpg' },
  { id: 'u1-13', word: 'international school', phonetic: '/ˌɪn.təˈnæʃ.ən.əl skuːl/', type: 'n', meaning: 'trường quốc tế', example_en: 'Students from many countries study at an international school.', example_vi: 'Học sinh từ nhiều quốc gia học tại trường quốc tế.', part: 'Con người & Trường học', imageUrl: './images/vocab/unit1/international-school.jpg' },

  // Nhóm 3: Subjects & Learning (Môn học & Học tập)
  { id: 'u1-14', word: 'subject', phonetic: '/ˈsʌb.dʒɪkt/', type: 'n', meaning: 'môn học', example_en: 'What is your favourite subject?', example_vi: 'Môn học yêu thích của bạn là gì?', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/subject.jpg' },
  { id: 'u1-15', word: 'maths', phonetic: '/mæθs/', type: 'n', meaning: 'toán', example_en: 'We learn numbers and shapes in maths.', example_vi: 'Chúng tôi học về số và hình học trong môn toán.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/maths.jpg' },
  { id: 'u1-16', word: 'science', phonetic: '/ˈsaɪ.əns/', type: 'n', meaning: 'khoa học', example_en: 'Science is my favourite subject.', example_vi: 'Khoa học là môn yêu thích của tôi.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/science.jpg' },
  { id: 'u1-17', word: 'history', phonetic: '/ˈhɪs.tər.i/', type: 'n', meaning: 'lịch sử', example_en: 'I have history on Monday.', example_vi: 'Tôi có môn lịch sử vào thứ Hai.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/history.jpg' },
  { id: 'u1-18', word: 'art', phonetic: '/ɑːt/', type: 'n', meaning: 'mỹ thuật', example_en: 'She loves drawing pictures in art class.', example_vi: 'Cô ấy thích vẽ tranh trong giờ mỹ thuật.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/art.jpg' },
  { id: 'u1-19', word: 'homework', phonetic: '/ˈhəʊm.wɜːk/', type: 'n', meaning: 'bài tập về nhà', example_en: 'I do my homework every evening.', example_vi: 'Tôi làm bài tập về nhà mỗi tối.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/homework.jpg' },
  { id: 'u1-20', word: 'lesson', phonetic: '/ˈles.ən/', type: 'n', meaning: 'tiết học, bài học', example_en: 'Our English lesson starts at 8 o’clock.', example_vi: 'Tiết học Tiếng Anh của chúng tôi bắt đầu lúc 8 giờ.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/lesson.jpg' },
  { id: 'u1-21', word: 'timetable', phonetic: '/ˈtaɪm.teɪ.bᵊl/', type: 'n', meaning: 'thời khóa biểu', example_en: 'Look at the school timetable on the wall.', example_vi: 'Hãy nhìn vào thời khóa biểu trên tường.', part: 'Subjects & Learning', imageUrl: './images/vocab/unit1/timetable.jpg' },

  // Nhóm 4: School facilities (Cơ sở vật chất trường học)
  { id: 'u1-22', word: 'library', phonetic: '/ˈlaɪ.brər.i/', type: 'n', meaning: 'thư viện', example_en: 'I read books in the school library.', example_vi: 'Tôi đọc sách ở thư viện trường.', part: 'School facilities', imageUrl: './images/vocab/unit1/library.jpg' },
  { id: 'u1-23', word: 'canteen', phonetic: '/kænˈtiːn/', type: 'n', meaning: 'căng-tin', example_en: 'We have lunch together in the school canteen.', example_vi: 'Chúng tôi ăn trưa cùng nhau ở căng-tin trường.', part: 'School facilities', imageUrl: './images/vocab/unit1/canteen.jpg' },
  { id: 'u1-24', word: 'gym', phonetic: '/dʒɪm/', type: 'n', meaning: 'phòng thể chất', example_en: 'The boys are playing basketball in the gym.', example_vi: 'Các bạn nam đang chơi bóng rổ trong phòng thể chất.', part: 'School facilities', imageUrl: './images/vocab/unit1/gym.jpg' },
  { id: 'u1-25', word: 'playground', phonetic: '/ˈpleɪ.ɡraʊnd/', type: 'n', meaning: 'sân chơi', example_en: 'Children play games in the playground at break time.', example_vi: 'Học sinh chơi trò chơi ở sân chơi vào giờ ra chơi.', part: 'School facilities', imageUrl: './images/vocab/unit1/playground.jpg' },
  { id: 'u1-26', word: 'classroom', phonetic: '/ˈklɑːs.ruːm/', type: 'n', meaning: 'phòng học', example_en: 'Our classroom is clean and bright.', example_vi: 'Phòng học của chúng tôi sạch sẽ và thoáng đãng.', part: 'School facilities', imageUrl: './images/vocab/unit1/classroom.jpg' },

  // Nhóm 5: Adjectives (Tính từ)
  { id: 'u1-27', word: 'excited', phonetic: '/ɪkˈsaɪ.tɪd/', type: 'adj', meaning: 'hào hứng', example_en: 'Duy is excited about his first day at school.', example_vi: 'Duy rất hào hứng với ngày đầu tiên đi học.', part: 'Adjectives', imageUrl: './images/vocab/unit1/excited.jpg' },
  { id: 'u1-28', word: 'helpful', phonetic: '/ˈhelp.fəl/', type: 'adj', meaning: 'hay giúp đỡ', example_en: 'My new classmates are friendly and helpful.', example_vi: 'Các bạn cùng lớp mới của tôi rất thân thiện và hay giúp đỡ.', part: 'Adjectives', imageUrl: './images/vocab/unit1/helpful.jpg' },
  { id: 'u1-29', word: 'creative', phonetic: '/kriˈeɪ.tɪv/', type: 'adj', meaning: 'sáng tạo', example_en: 'Students in the art club are very creative.', example_vi: 'Các bạn học sinh trong câu lạc bộ mỹ thuật rất sáng tạo.', part: 'Adjectives', imageUrl: './images/vocab/unit1/creative.jpg' },
  { id: 'u1-30', word: 'favourite', phonetic: '/ˈfeɪ.vər.ɪt/', type: 'adj', meaning: 'yêu thích', example_en: 'English is my favourite subject at school.', example_vi: 'Tiếng Anh là môn học yêu thích của tôi ở trường.', part: 'Adjectives', imageUrl: './images/vocab/unit1/favourite.jpg' },
];

const UNIT10_VOCAB_INLINE: VocabItem[] = [
  { id: 'u10-1', word: 'appliance', phonetic: '/əˈplaɪ.əns/', type: 'n', meaning: 'thiết bị, đồ dùng', example_en: 'There are many modern appliances in the kitchen.', example_vi: 'Có nhiều thiết bị hiện đại trong nhà bếp.', part: 'GETTING STARTED' },
  { id: 'u10-2', word: 'automatic', phonetic: '/ˌɔː.təˈmæt.ɪk/', type: 'adj', meaning: 'tự động', example_en: 'The door is automatic.', example_vi: 'Cánh cửa này tự động.', part: 'GETTING STARTED' },
  { id: 'u10-3', word: 'dishwasher', phonetic: '/ˈdɪʃ.wɒʃ.ər/', type: 'n', meaning: 'máy rửa bát', example_en: 'We will have an automatic dishwasher.', example_vi: 'Chúng ta sẽ có một máy rửa bát tự động.', part: 'GETTING STARTED', imageUrl: './images/vocab/unit2/dishwasher.jpg' },
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
  { id: 'u10-17', word: 'fridge', phonetic: '/frɪdʒ/', type: 'n', meaning: 'tủ lạnh', example_en: 'The fridge will tell us what to buy.', example_vi: 'Tủ lạnh sẽ cho biết cần mua gì.', part: 'SKILLS 2', imageUrl: './images/vocab/unit2/fridge.jpg' },
  { id: 'u10-18', word: 'bedroom', phonetic: '/ˈbed.ruːm/', type: 'n', meaning: 'phòng ngủ', example_en: 'My bedroom will have a super TV.', example_vi: 'Phòng ngủ sẽ có TV siêu lớn.', part: 'SKILLS 2', imageUrl: './images/vocab/unit2/bedroom.jpg' },
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

