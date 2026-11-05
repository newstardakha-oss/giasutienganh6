import { Word } from './types';
import { getAllVocabByUnit, VocabItem } from '../services/vocabService';

export const UNIT_NAMES: Record<string, string> = {
  'unit-1': 'Unit 1 - My New School',
  'unit-2': 'Unit 2 - My House',
  'unit-3': 'Unit 3 - My Friends',
  'unit-4': 'Unit 4 - My Neighbourhood',
  'unit-5': 'Unit 5 - Natural Wonders of Viet Nam',
  'unit-6': 'Unit 6 - Our Tet Holiday',
  'unit-7': 'Unit 7 - Television',
  'unit-8': 'Unit 8 - Sports and Games',
  'unit-9': 'Unit 9 - Cities of the World',
  'unit-10': 'Unit 10 - Our Houses in the Future',
  'unit-11': 'Unit 11 - Our Greener World',
  'unit-12': 'Unit 12 - Robots',
};

/**
 * Dữ liệu mẫu chuẩn cho Unit 1 - My New School (Tiếng Anh 6 Global Success)
 * gồm đầy đủ 26 từ vựng có hình ảnh minh họa chính xác từ bộ thẻ hình ảnh Unit 1 (và từ mở rộng).
 * Mỗi từ chỉ dạy ĐÚNG MỘT nghĩa theo ngữ cảnh bài học, định nghĩa tiếng Anh ngắn gọn ở trình độ A1–A2.
 */
export const UNIT1_SEED_WORDS: Word[] = [
  // 1. School things (Đồ dùng học tập - 10 từ)
  {
    id: 'u1-school-bag',
    word: 'school bag',
    ipa: '/ˈskuːl bæɡ/',
    partOfSpeech: 'n',
    meaningVi: 'cặp sách',
    definitionEn: 'A bag that students use to carry books and school things.',
    example: 'Duy has a heavy school bag with many textbooks.',
    exampleVi: 'Duy có một chiếc cặp sách nặng đựng nhiều sách giáo khoa.',
    imageUrl: './images/vocab/unit1/school-bag.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-compass',
    word: 'compass',
    ipa: '/ˈkʌmpəs/',
    partOfSpeech: 'n',
    meaningVi: 'com-pa',
    definitionEn: 'A V-shaped school tool used for drawing circles.',
    example: 'Can I borrow your compass to draw a circle?',
    exampleVi: 'Cho mình mượn com-pa của bạn để vẽ một hình tròn nhé?',
    imageUrl: './images/vocab/unit1/compass.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-calculator',
    word: 'calculator',
    ipa: '/ˈkælkjuleɪtə(r)/',
    partOfSpeech: 'n',
    meaningVi: 'máy tính bỏ túi',
    definitionEn: 'A small electronic tool used for doing maths and working with numbers.',
    example: 'I use a calculator in my Maths class.',
    exampleVi: 'Mình dùng máy tính bỏ túi trong giờ Toán.',
    imageUrl: './images/vocab/unit1/calculator.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-pencil-case',
    word: 'pencil case',
    ipa: '/ˈpensl keɪs/',
    partOfSpeech: 'n',
    meaningVi: 'hộp bút',
    definitionEn: 'A small bag or box for keeping pens, pencils, and a ruler.',
    example: 'My new pencil case has two pens and a rubber inside.',
    exampleVi: 'Hộp bút mới của mình có hai chiếc bút mực và một cục tẩy bên trong.',
    imageUrl: './images/vocab/unit1/pencil-case.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-notebook',
    word: 'notebook',
    ipa: '/ˈnəʊtbʊk/',
    partOfSpeech: 'n',
    meaningVi: 'vở ghi',
    definitionEn: 'A book with blank or lined pages for writing notes in class.',
    example: 'Please write the new words in your notebook.',
    exampleVi: 'Các em hãy viết từ mới vào vở ghi của mình nhé.',
    imageUrl: './images/vocab/unit1/notebook.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-textbook',
    word: 'textbook',
    ipa: '/ˈtekstbʊk/',
    partOfSpeech: 'n',
    meaningVi: 'sách giáo khoa',
    definitionEn: 'A book that teaches a particular school subject, like an English book.',
    example: 'Open your English textbook to page 6.',
    exampleVi: 'Hãy mở sách giáo khoa Tiếng Anh trang 6.',
    imageUrl: './images/vocab/unit1/textbook.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-rubber',
    word: 'rubber',
    ipa: '/ˈrʌbə(r)/',
    partOfSpeech: 'n',
    meaningVi: 'cục tẩy',
    definitionEn: 'A small piece of rubber used to remove pencil marks from paper.',
    example: 'I need a rubber to clean this wrong word.',
    exampleVi: 'Mình cần một cục tẩy để xóa từ viết sai này.',
    imageUrl: './images/vocab/unit1/rubber.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-ruler',
    word: 'ruler',
    ipa: '/ˈruːlə(r)/',
    partOfSpeech: 'n',
    meaningVi: 'thước kẻ',
    definitionEn: 'A flat, straight tool used for measuring things and drawing straight lines.',
    example: 'Use a ruler to draw a straight line in your notebook.',
    exampleVi: 'Hãy dùng thước kẻ để vẽ một đường thẳng trong vở ghi.',
    imageUrl: './images/vocab/unit1/ruler.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-sharpener',
    word: 'sharpener',
    ipa: '/ˈʃɑːpənə(r)/',
    partOfSpeech: 'n',
    meaningVi: 'gọt bút chì',
    definitionEn: 'A small tool used for making the point of a pencil sharp.',
    example: 'May I borrow your pencil sharpener?',
    exampleVi: 'Cho mình mượn gọt bút chì của bạn được không?',
    imageUrl: './images/vocab/unit1/sharpener.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-uniform',
    word: 'uniform',
    ipa: '/ˈjuːnɪfɔːm/',
    partOfSpeech: 'n',
    meaningVi: 'đồng phục',
    definitionEn: 'Special clothes that all students wear to school.',
    example: 'We wear our new school uniform on Mondays.',
    exampleVi: 'Chúng mình mặc đồng phục mới của trường vào các ngày thứ Hai.',
    imageUrl: './images/vocab/unit1/uniform.jpg',
    unit: 'Unit 1 - My New School',
  },

  // 2. Con người và loại hình trường học (3 từ)
  {
    id: 'u1-classmate',
    word: 'classmate',
    ipa: '/ˈklɑːsmeɪt/',
    partOfSpeech: 'n',
    meaningVi: 'bạn cùng lớp',
    definitionEn: 'A friend who is in the same class as you at school.',
    example: 'Vy introduces her new classmate to Phong.',
    exampleVi: 'Vy giới thiệu bạn cùng lớp mới của mình với Phong.',
    imageUrl: './images/vocab/unit1/classmate.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-boarding-school',
    word: 'boarding school',
    ipa: '/ˈbɔːdɪŋ skuːl/',
    partOfSpeech: 'n',
    meaningVi: 'trường nội trú',
    definitionEn: 'A school where students live, eat, and sleep during the school term.',
    example: 'Sunrise is a boarding school in Sydney.',
    exampleVi: 'Sunrise là một trường nội trú ở Sydney.',
    imageUrl: './images/vocab/unit1/boarding-school.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-international-school',
    word: 'international school',
    ipa: '/ˌɪntəˈnæʃnəl skuːl/',
    partOfSpeech: 'n',
    meaningVi: 'trường quốc tế',
    definitionEn: 'A school where students from different countries study together, often in English.',
    example: 'Dream is an international school with students from many countries.',
    exampleVi: 'Dream là một trường quốc tế với học sinh đến từ nhiều quốc gia.',
    imageUrl: './images/vocab/unit1/international-school.jpg',
    unit: 'Unit 1 - My New School',
  },

  // 3. Subjects & Learning (Môn học & Học tập - 8 từ)
  {
    id: 'u1-subject',
    word: 'subject',
    ipa: '/ˈsʌbdʒɪkt/',
    partOfSpeech: 'n',
    meaningVi: 'môn học',
    definitionEn: 'An area of knowledge that you study at school, like Maths or English.',
    example: 'English is my favourite subject at school.',
    exampleVi: 'Tiếng Anh là môn học yêu thích của mình ở trường.',
    imageUrl: './images/vocab/unit1/subject.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-maths',
    word: 'maths',
    ipa: '/mæθs/',
    partOfSpeech: 'n',
    meaningVi: 'toán',
    definitionEn: 'The school subject about numbers, shapes, and calculations.',
    example: 'Duy and Phong have maths lessons every Tuesday.',
    exampleVi: 'Duy và Phong có tiết toán vào mỗi thứ Ba.',
    imageUrl: './images/vocab/unit1/maths.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-science',
    word: 'science',
    ipa: '/ˈsaɪəns/',
    partOfSpeech: 'n',
    meaningVi: 'khoa học',
    definitionEn: 'The school subject about nature, plants, animals, and how things work.',
    example: 'Students do fun experiments in the science club.',
    exampleVi: 'Học sinh làm các thí nghiệm thú vị trong câu lạc bộ Khoa học.',
    imageUrl: './images/vocab/unit1/science.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-history',
    word: 'history',
    ipa: '/ˈhɪstri/',
    partOfSpeech: 'n',
    meaningVi: 'lịch sử',
    definitionEn: 'The school subject about important events and people in the past.',
    example: 'We learn about old kings in our history lesson.',
    exampleVi: 'Chúng mình học về các vị vua thời xưa trong tiết Lịch sử.',
    imageUrl: './images/vocab/unit1/history.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-art',
    word: 'art',
    ipa: '/ɑːt/',
    partOfSpeech: 'n',
    meaningVi: 'mỹ thuật',
    definitionEn: 'The school subject where students draw, paint, and make creative pictures.',
    example: 'Girls in the art club can paint nice pictures.',
    exampleVi: 'Các bạn nữ trong câu lạc bộ Mỹ thuật vẽ tranh rất đẹp.',
    imageUrl: './images/vocab/unit1/art.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-homework',
    word: 'homework',
    ipa: '/ˈhəʊmwɜːk/',
    partOfSpeech: 'n',
    meaningVi: 'bài tập về nhà',
    definitionEn: 'School work that teachers give students to do at home.',
    example: 'I always do my homework after dinner.',
    exampleVi: 'Mình luôn làm bài tập về nhà sau bữa tối.',
    imageUrl: './images/vocab/unit1/homework.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-lesson',
    word: 'lesson',
    ipa: '/ˈlesn/',
    partOfSpeech: 'n',
    meaningVi: 'tiết học, bài học',
    definitionEn: 'A period of time when a teacher teaches students in class.',
    example: 'Our first lesson starts at 7:30 every morning.',
    exampleVi: 'Tiết học đầu tiên của chúng mình bắt đầu lúc 7 giờ 30 mỗi sáng.',
    imageUrl: './images/vocab/unit1/lesson.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-timetable',
    word: 'timetable',
    ipa: '/ˈtaɪmteɪbl/',
    partOfSpeech: 'n',
    meaningVi: 'thời khóa biểu',
    definitionEn: 'A chart showing the times and days of all your school lessons in a week.',
    example: 'Look at the timetable to see what subjects we have on Monday.',
    exampleVi: 'Hãy nhìn vào thời khóa biểu để xem thứ Hai chúng mình có những môn học nào.',
    imageUrl: './images/vocab/unit1/timetable.jpg',
    unit: 'Unit 1 - My New School',
  },

  // 4. School facilities (Cơ sở vật chất trường học - 5 từ)
  {
    id: 'u1-library',
    word: 'library',
    ipa: '/ˈlaɪbrəri/',
    partOfSpeech: 'n',
    meaningVi: 'thư viện',
    definitionEn: 'A quiet room or building at school where you can read or borrow books.',
    example: 'We often read storybooks in the school library at break time.',
    exampleVi: 'Chúng mình thường đọc truyện trong thư viện trường vào giờ ra chơi.',
    imageUrl: './images/vocab/unit1/library.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-canteen',
    word: 'canteen',
    ipa: '/kænˈtiːn/',
    partOfSpeech: 'n',
    meaningVi: 'căng-tin',
    definitionEn: 'A place in a school where students buy and eat food and drinks.',
    example: 'We have lunch with our friends in the school canteen.',
    exampleVi: 'Chúng mình ăn trưa cùng các bạn ở căng-tin trường.',
    imageUrl: './images/vocab/unit1/canteen.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-gym',
    word: 'gym',
    ipa: '/dʒɪm/',
    partOfSpeech: 'n',
    meaningVi: 'phòng thể chất',
    definitionEn: 'A large indoor room at school for playing sports and doing physical exercise.',
    example: 'The students play basketball in the gym when it rains.',
    exampleVi: 'Học sinh chơi bóng rổ trong phòng thể chất khi trời mưa.',
    imageUrl: './images/vocab/unit1/gym.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-playground',
    word: 'playground',
    ipa: '/ˈpleɪɡraʊnd/',
    partOfSpeech: 'n',
    meaningVi: 'sân chơi',
    definitionEn: 'An outdoor area at school where children play games and sports.',
    example: 'The children are playing in the playground at break time.',
    exampleVi: 'Các bạn học sinh đang vui chơi ở sân chơi vào giờ giải lao.',
    imageUrl: './images/vocab/unit1/playground.jpg',
    unit: 'Unit 1 - My New School',
  },
  {
    id: 'u1-classroom',
    word: 'classroom',
    ipa: '/ˈklɑːsruːm/',
    partOfSpeech: 'n',
    meaningVi: 'phòng học',
    definitionEn: 'A room in a school where a class of students studies with a teacher.',
    example: 'Our new classroom is on the second floor.',
    exampleVi: 'Phòng học mới của chúng mình nằm ở tầng hai.',
    imageUrl: './images/vocab/unit1/classroom.jpg',
    unit: 'Unit 1 - My New School',
  },

  // Từ mở rộng trong hội thoại Getting Started
  {
    id: 'u1-smart',
    word: 'smart',
    ipa: '/smɑːt/',
    partOfSpeech: 'adj',
    meaningVi: 'bảnh bao, gọn gàng',
    definitionEn: 'Looking clean, neat, and tidy in nice clothes.',
    example: 'You look very smart in your new uniform, Duy!',
    exampleVi: 'Cậu trông thật bảnh bao trong bộ đồng phục mới đấy, Duy!',
    unit: 'Unit 1 - My New School',
  },
];

/**
 * Từ điển định nghĩa tiếng Anh A1-A2 cho các từ phổ biến ở các Unit 2–12,
 * giúp toàn bộ 12 Unit trong app đều có định nghĩa chuẩn chỉnh theo bối cảnh.
 */
const EXTRA_DEFINITIONS_EN: Record<string, string> = {
  // Unit 2 - My House
  room: 'A part of the inside of a house that has its own walls, floor, and door.',
  flat: 'A set of rooms for living in, usually on one floor of a large building.',
  townhouse: 'A modern house built in a row with other houses in a town or city.',
  'living room': 'The room in a house where family members sit together, talk, and watch TV.',
  bedroom: 'The room in a house where you sleep at night.',
  kitchen: 'The room in a house where people cook food and wash dishes.',
  bathroom: 'The room in a house where you wash your hands, take a shower, or bath.',
  fridge: 'A kitchen box that keeps food and drinks cold and fresh.',
  dishwasher: 'A machine in the kitchen that washes dirty plates, bowls, and cups.',
  'chest of drawers': 'A piece of furniture with drawers used for keeping clothes.',
  wardrobe: 'A tall cupboard in the bedroom where you hang your clothes.',
  sink: 'A bowl attached to the wall in a kitchen or bathroom for washing dishes or hands.',
  lamp: 'An object that gives light when you study or read at night.',
  sofa: 'A long, soft, comfortable seat for two or three people in the living room.',
  pillow: 'A soft cushion for your head when you sleep in bed.',
  chopsticks: 'A pair of thin sticks used for eating rice and noodles in Asia.',
  // Unit 3 - My Friends
  careful: 'Giving attention to what you are doing so you do not make mistakes or get hurt.',
  caring: 'Kind and helpful to other people when they need support.',
  cheeky: 'A little rude or playful in a funny way.',
  clever: 'Quick at learning and understanding new things.',
  confident: 'Feeling sure about your own ability to do things well.',
  creative: 'Good at thinking of new ideas or making art and stories.',
  friendly: 'Acting in a kind, warm, and pleasant way towards other people.',
  funny: 'Making other people laugh and smile.',
  'hard-working': 'Always putting a lot of effort into schoolwork and tasks.',
  kind: 'Helpful, generous, and thinking about other people’s feelings.',
  shy: 'Nervous and quiet when meeting new people.',
  talkative: 'Liking to talk a lot with friends and people around.',
};

function buildSimpleDefinitionEn(item: VocabItem, unitTitle: string): string {
  const key = item.word.toLowerCase().trim();
  if (EXTRA_DEFINITIONS_EN[key]) {
    return EXTRA_DEFINITIONS_EN[key];
  }

  // Nếu câu ví dụ có chứa từ đó, tạo định nghĩa gắn với ngữ cảnh câu ví dụ & từ loại
  const maskedExample = item.example_en
    ? item.example_en.replace(new RegExp(`\\b${item.word}\\b`, 'gi'), '___')
    : '';

  const posMap: Record<string, string> = {
    n: 'A noun meaning a person, place, or thing',
    v: 'An action word (verb)',
    adj: 'A describing word (adjective)',
    adv: 'An adverb',
    prep: 'A preposition showing position or time',
  };
  const posPrefix = posMap[item.type?.toLowerCase()] || 'A vocabulary word';

  if (maskedExample && maskedExample !== item.example_en) {
    return `${posPrefix} from ${unitTitle}. Complete the context: "${maskedExample}"`;
  }
  return `${posPrefix} studied in ${unitTitle}. Example context: "${item.example_en || ''}"`;
}

/**
 * Tạo danh sách từ vựng khởi tạo cho toàn bộ 12 Unit (ưu tiên 15 từ chuẩn của Unit 1,
 * và nạp thêm tối đa 15 từ tiêu biểu cho mỗi Unit từ Unit 2 đến Unit 12).
 */
export function getInitialSeedWords(): Word[] {
  const allWords: Word[] = [...UNIT1_SEED_WORDS];

  for (let u = 2; u <= 12; u++) {
    const unitKey = `unit-${u}`;
    const unitLabel = UNIT_NAMES[unitKey] || `Unit ${u}`;
    const rawItems = getAllVocabByUnit(unitKey).slice(0, 15);
    rawItems.forEach((item, idx) => {
      allWords.push({
        id: `u${u}-${idx + 1}-${item.word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        word: item.word.trim(),
        ipa: item.phonetic || '',
        partOfSpeech: item.type || 'n',
        meaningVi: item.meaning.trim(),
        definitionEn: buildSimpleDefinitionEn(item, unitLabel),
        example: item.example_en || `This is an example with ${item.word}.`,
        exampleVi: item.example_vi || '',
        unit: unitLabel,
      });
    });
  }

  return allWords;
}
