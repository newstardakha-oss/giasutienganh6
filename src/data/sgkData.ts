import { SgkUnit, Question } from '../types';

export const SGK_UNITS: SgkUnit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'MY NEW SCHOOL',
    term: 1,
    theme: 'Our Communities',
    grammar: ['Present simple (Thì hiện tại đơn)', 'Adverbs of frequency (Trạng từ chỉ tần suất: always, usually, often, sometimes, rarely, never)'],
    vocabulary: ['calculator, compass, pencil case, rubber, school bag, uniform, history, science, exercise, homework'],
    pronunciationIPA: '/a:/ & /ʌ/ (smart, art vs subject, study)',
    skillsSummary: 'Đọc & Nghe thông tin trường học, Nói về loại trường yêu thích, Viết đoạn văn ngắn về trường học.',
    iconName: 'School'
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'MY HOUSE',
    term: 1,
    theme: 'Our Communities',
    grammar: ['Possessive case (Sở hữu cách: \'s)', 'Prepositions of place (Giới từ chỉ vị trí: in, on, behind, under, next to, in front of, between)'],
    vocabulary: ['balcony, bathroom, bedroom, hall, kitchen, living room, chest of drawers, dishwasher, fridge, wardrobe'],
    pronunciationIPA: '/s/ & /z/ (sinks, lamps vs rooms, sofas)',
    skillsSummary: 'Đọc email tả khách sạn/ngôi nhà, Tả các phòng và đồ đạc, Nghe vị trí đồ vật, Viết email tả ngôi nhà.',
    iconName: 'Home'
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'MY FRIENDS',
    term: 1,
    theme: 'Our Communities',
    grammar: ['Present continuous (Thì hiện tại tiếp diễn)', 'Adjectives for appearance & personality (Tính từ tả ngoại hình & tính cách)'],
    vocabulary: ['active, caring, clever, confident, creative, friendly, hard-working, kind, shy, cheek, elbow'],
    pronunciationIPA: '/b/ & /p/ (big, bear vs pig, pear)',
    skillsSummary: 'Đọc về trại hè, Nói về bạn bè và ngoại hình/tính cách, Nghe tả bạn thân, Viết nhật ký về bạn thân.',
    iconName: 'Users'
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'MY NEIGHBOURHOOD',
    term: 1,
    theme: 'Our Heritage',
    grammar: ['Comparative adjectives (So sánh hơn của tính từ ngắn và dài: -er / more + adj)'],
    vocabulary: ['art gallery, cathedral, palace, railway station, square, statue, temple, convenient, historic, peaceful'],
    pronunciationIPA: '/ɪ/ & /i:/ (busy, noisy vs peaceful, convenient)',
    skillsSummary: 'Hỏi và chỉ đường (Asking & Giving directions), So sánh nơi chốn, Viết bài tả khu phố em sống.',
    iconName: 'MapPin'
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'NATURAL WONDERS OF VIET NAM',
    term: 1,
    theme: 'Our Heritage',
    grammar: ['Countable & Uncountable nouns (Danh từ đếm được & không đếm được)', 'Modal verb: must / mustn\'t (Phải / Không được)'],
    vocabulary: ['cave, desert, forest, island, mountain, river, waterfall, backpack, compass, plaster, suncream, sleeping bag'],
    pronunciationIPA: '/t/ & /d/ (mountain, waterfall vs wonder, island)',
    skillsSummary: 'Đọc về kì quan thiên nhiên (Hạ Long Bay, Mũi Né), Lập quy tắc ứng xử, Viết đoạn văn tả kì quan.',
    iconName: 'Mountain'
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'OUR TET HOLIDAY',
    term: 1,
    theme: 'Our Heritage',
    grammar: ['Should / Shouldn\'t for advice (Nên / Không nên)', 'Some / Any for amount (Một vài / Bất kỳ)'],
    vocabulary: ['banh chung, fireworks, lucky money, peach flowers, relative, wish, celebrate, decorate, family gathering'],
    pronunciationIPA: '/s/ & /ʃ/ (shopping, shine vs spring, smile)',
    skillsSummary: 'Chúc Tết (Saying New Year wishes), Tục lệ Tết Việt Nam và thế giới, Viết email tả chuẩn bị Tết.',
    iconName: 'Sparkles'
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    title: 'TELEVISION',
    term: 2,
    theme: 'Our World',
    grammar: ['Wh-questions (Câu hỏi Wh-)', 'Conjunctions in compound sentences (and, but, so)'],
    vocabulary: ['animated film, cartoon, channel, comedy, documentary, educational programme, game show, viewer'],
    pronunciationIPA: '/θ/ & /ð/ (theatre, earth vs there, weather)',
    skillsSummary: 'Đọc lịch phát sóng TV guide, Phỏng vấn về thói quen xem TV, Viết về thói quen xem truyền hình.',
    iconName: 'Tv'
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    title: 'SPORTS AND GAMES',
    term: 2,
    theme: 'Our World',
    grammar: ['Past simple (Thì quá khứ đơn với động từ có quy tắc và bất quy tắc)', 'Imperatives (Câu mệnh lệnh: Keep quiet / Don\'t swim here)'],
    vocabulary: ['aerobics, badminton, chess, karate, marathon, table tennis, volleyball, champion, goggles, racket, sporty'],
    pronunciationIPA: '/e/ & /æ/ (chess, tennis vs racket, match)',
    skillsSummary: 'Đọc về các huyền thoại thể thao (Pelé, v.v.), Chúc mừng chiến thắng, Viết về môn thể thao yêu thích.',
    iconName: 'Trophy'
  },
  {
    id: 'unit-9',
    unitNumber: 9,
    title: 'CITIES OF THE WORLD',
    term: 2,
    theme: 'Our World',
    grammar: ['Possessive adjectives (Tính từ sở hữu: my, your, his, her, its, our, line)', 'Possessive pronouns (Đại từ sở hữu: mine, yours, his, hers, ours, theirs)'],
    vocabulary: ['attraction, capital, continent, landmark, palace, postcard, street food, crowded, famous, historic'],
    pronunciationIPA: '/əʊ/ & /aʊ/ (boat, coast vs house, town)',
    skillsSummary: 'Đọc bưu thiếp du lịch (Postcard), Thốt lên cảm xúc với "What a + N!", Viết bưu thiếp gửi gia đình.',
    iconName: 'Globe'
  },
  {
    id: 'unit-10',
    unitNumber: 10,
    title: 'OUR HOUSES IN THE FUTURE',
    term: 2,
    theme: 'Visions of the Future',
    grammar: ['Future simple: will / won\'t (Thì tương lai đơn)', 'Might for future possibility (Might + V chỉ khả năng xảy ra)'],
    vocabulary: ['appliance, automatic dishwasher, hi-tech, solar energy, space cottage, UFO, wireless TV, smart clock'],
    pronunciationIPA: 'Stress in 2-syllable words (\'picture, \'robot vs be\'gin, o\'bey)',
    skillsSummary: 'Đọc về các loại nhà tương lai (trên đảo, vũ trụ), Bày tỏ sự ngạc nhiên, Viết tả ngôi nhà mơ ước.',
    iconName: 'Bot'
  },
  {
    id: 'unit-11',
    unitNumber: 11,
    title: 'OUR GREENER WORLD',
    term: 2,
    theme: 'Visions of the Future',
    grammar: ['Articles: a / an / the (Mạo từ)', 'First conditional (Câu điều kiện loại 1: If + Present simple, Will + V)'],
    vocabulary: ['environment, plastic bag, recycle, reduce, refillable bottle, reuse, rubbish, 3Rs club, reusable'],
    pronunciationIPA: 'Rhythm in sentences (Nhịp điệu và trọng âm câu)',
    skillsSummary: 'Đọc bài phỏng vấn CLB 3Rs, Đưa ra cảnh báo thân thiện, Viết đoạn văn ý tưởng bảo vệ môi trường.',
    iconName: 'Leaf'
  },
  {
    id: 'unit-12',
    unitNumber: 12,
    title: 'ROBOTS',
    term: 2,
    theme: 'Visions of the Future',
    grammar: ['Superlative adjectives (So sánh nhất của tính từ ngắn: the -est)'],
    vocabulary: ['do the dishes, guard, heavy things, iron clothes, look after, repair, smart, worker robot, doctor robot'],
    pronunciationIPA: 'Falling tone in statements (Giọng điệu trầm xuống cuối câu khẳng định)',
    skillsSummary: 'Đọc về triển lãm Robot quốc tế, Đồng ý / Bất đồng ý kiến, Viết đoạn văn thiết kế robot tương lai.',
    iconName: 'Cpu'
  }
];

export const DEMO_QUESTIONS: Question[] = [
  // Unit 1
  {
    id: 'q1-read-1',
    unitId: 'unit-1',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 1: SKILL 1]\nSunrise is a new lower secondary school in Ha Noi. It is a large school with 30 modern classrooms. There are two computer rooms and a large library with many English books. Students can join many clubs like football, art, and music after school. My brother Phong likes the sports club very much because he can play basketball with his new friends.\n\n❓ Question: How many modern classrooms are there in Sunrise school?',
    options: ['30 classrooms', '20 classrooms', '15 classrooms', '40 classrooms'],
    correctAnswer: '30 classrooms',
    explanation: 'Đoạn văn ghi rõ: "It is a large school with 30 modern classrooms."',
    hints: [
      'Gợi ý 1: Đọc kĩ dòng thứ 2 của đoạn văn.',
      'Gợi ý 2: Tìm con số đứng trước từ "modern classrooms".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-write-1',
    unitId: 'unit-1',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 1: SKILL 2]\nChoose the correct reordered sentence from: "school / my / library / a / modern / has / very ."',
    options: [
      'My school has a very modern library.',
      'My library has a school very modern.',
      'Very modern school has a my library.',
      'My school modern very has a library.'
    ],
    correctAnswer: 'My school has a very modern library.',
    explanation: 'Cấu trúc câu hoàn chỉnh: S (My school) + V (has) + O (a very modern library).',
    hints: [
      'Gợi ý 1: Xác định chủ ngữ là "My school".',
      'Gợi ý 2: Động từ "has", tính từ "very modern" bổ nghĩa cho danh từ "library".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-1',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Duy _____ to school by bicycle every morning.',
    options: ['go', 'goes', 'going', 'is go'],
    correctAnswer: 'goes',
    explanation: 'Duy là chủ ngữ số ít (ngôi thứ 3 số ít), động từ "go" phải thêm "-es" trong thì Hiện tại đơn -> "goes".',
    hints: [
      'Gợi ý 1: Xác định chủ ngữ "Duy" là số ít hay số nhiều.',
      'Gợi ý 2: Thì hiện tại đơn đối với he/she/it/chủ ngữ số ít, động từ chia V(s/es).',
      'Gợi ý 3: Động từ tận cùng bằng "o" như "go" sẽ thêm "es".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-2',
    unitId: 'unit-1',
    skill: 'Pronunciation',
    type: 'pronunciation',
    content: 'Từ nào dưới đây có phần gạch chân phát âm là /ʌ/ khác với âm /a:/?',
    options: ['smart', 'art', 'subject', 'class'],
    correctAnswer: 'subject',
    explanation: '"smart", "art", "class" phát âm là /a:/ kéo dài. "subject" phát âm là /ˈsʌbdʒɪkt/ mang âm /ʌ/.',
    hints: [
      'Gợi ý 1: Hãy đọc to từ "smart" và "art", bạn nghe âm /a:/ ngân dài.',
      'Gợi ý 2: "subject" chứa chữ "u" phát âm ngắn và gọn là /ʌ/.'
    ],
    difficulty: 'Trung bình',
    targetPronunciation: {
      word: 'subject',
      ipa: '/ˈsʌbdʒɪkt/',
      focusPhoneme: '/ʌ/'
    }
  },
  {
    id: 'q1-3',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We use a ________ to draw accurate circles in geometry class.',
    correctAnswer: 'compass',
    explanation: 'Compass (com-pa) là dụng cụ học tập dùng để vẽ đường tròn trong môn hình học.',
    hints: [
      'Gợi ý 1: Đây là từ chỉ đồ dùng học tập bằng kim loại có 2 chân.',
      'Gợi ý 2: Trong Unit 1 SGK có liệt kê: calculator, compass, rubber, pencil case.',
      'Gợi ý 3: Bắt đầu bằng chữ "c", phát âm là /ˈkʌmpəs/.'
    ],
    difficulty: 'Dễ'
  },

  // Unit 2
  {
    id: 'q2-read-1',
    unitId: 'unit-2',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 2: SKILL 1]\nAn lives in a traditional stilt house in Tay Bac with his family. The house is built on wood posts and has six rooms. The living room is the biggest room in the house where the family gathers every evening. An loves his bedroom best because it is quiet and bright.\n\n❓ Question: Why does An love his bedroom best?',
    options: [
      'Because it is quiet and bright',
      'Because it is the biggest room',
      'Because it has a big television',
      'Because it is built on wood posts'
    ],
    correctAnswer: 'Because it is quiet and bright',
    explanation: 'Đoạn văn nêu rõ: "An loves his bedroom best because it is quiet and bright."',
    hints: [
      'Gợi ý 1: Đọc câu cuối cùng của bài đọc.',
      'Gợi ý 2: Tìm lý do đằng sau từ "because".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-write-1',
    unitId: 'unit-2',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 2: SKILL 2]\nChoose the sentence with the same meaning: "There are six rooms in my house."',
    options: [
      'My house has six rooms.',
      'My house is six rooms.',
      'Six rooms is in my house.',
      'My house have six rooms.'
    ],
    correctAnswer: 'My house has six rooms.',
    explanation: 'Viết lại câu cấu trúc "There is/are..." đổi sang "S + has/have..." với My house (số ít) đi với "has".',
    hints: [
      'Gợi ý 1: Chủ ngữ "My house" số ít đi với "has".',
      'Gợi ý 2: Structural transform: There are N in my house = My house has N.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-1',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'This is my _____ bedroom. They share it together.',
    options: ['brother\'s', 'brothers\'', 'brothers', 'brother'],
    correctAnswer: 'brothers\'',
    explanation: 'Do có từ "They share it together" (Các anh em tôi dùng chung), chủ ngữ là danh từ số nhiều "brothers", sở hữu cách sẽ thêm dấu phẩy đằng sau: brothers\'.',
    hints: [
      'Gợi ý 1: Chú ý từ "They" (họ) chứng tỏ có nhiều người anh/em trai.',
      'Gợi ý 2: Đối với danh từ số nhiều có "s" cuối, sở hữu cách chỉ cần thêm dấu \'.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q2-2',
    unitId: 'unit-2',
    skill: 'Pronunciation',
    type: 'pronunciation',
    content: 'Chọn từ có đuôi "-s" phát âm là /s/ khác với các từ còn lại:',
    options: ['lamps', 'sinks', 'flats', 'sofas'],
    correctAnswer: 'sofas',
    explanation: '"lamps", "sinks", "flats" kết thúc bằng phụ âm vô thanh (/p/, /k/, /t/) nên "-s" đọc là /s/. "sofas" kết thúc bằng nguyên âm nên "-s" đọc là /z/.',
    hints: [
      'Gợi ý 1: Nhớ quy tắc phát âm đuôi -s: sau p, k, f, t, θ thì đọc là /s/.',
      'Gợi ý 2: sofa kết thúc bằng nguyên âm "a".'
    ],
    difficulty: 'Trung bình',
    targetPronunciation: {
      word: 'lamps',
      ipa: '/læmps/',
      focusPhoneme: '/s/'
    }
  },

  // Unit 3
  {
    id: 'q3-read-1',
    unitId: 'unit-3',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 3: SKILL 1]\nMy best friend is Trang. She is 12 years old and attends grade 6 with me. Trang is very kind, creative, and hard-working. In her free time, she enjoys drawing pictures and reading comics. She always shares her snacks with friends and helps me when I am stuck on a math problem.\n\n❓ Question: What does Trang enjoy doing in her free time?',
    options: [
      'Drawing pictures and reading comics',
      'Playing football and swimming',
      'Cooking meals and watching TV',
      'Singing songs and dancing'
    ],
    correctAnswer: 'Drawing pictures and reading comics',
    explanation: 'Đoạn văn viết: "In her free time, she enjoys drawing pictures and reading comics."',
    hints: [
      'Gợi ý 1: Tìm cụm "In her free time" trong đoạn văn.',
      'Gợi ý 2: Đọc sở thích đằng sau từ "enjoys".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-write-1',
    unitId: 'unit-3',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 3: SKILL 2]\nChoose the correctly built sentence from: "Phong / have / short black hair / and / blue eyes ."',
    options: [
      'Phong has short black hair and blue eyes.',
      'Phong having short black hair and blue eyes.',
      'Phong is have short black hair and blue eyes.',
      'Phong has short black eyes and blue hair.'
    ],
    correctAnswer: 'Phong has short black hair and blue eyes.',
    explanation: 'Viết câu tả ngoại hình: Chủ ngữ "Phong" (số ít) đi với động từ "has". Hair đi với short black, eyes đi với blue.',
    hints: [
      'Gợi ý 1: Phong là chủ ngữ số ít nên chia "has".',
      'Gợi ý 2: Hair (tóc) màu đen, eyes (mắt) màu xanh.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-1',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Look! Mai ________ a picture of her best friend in the garden.',
    options: ['paints', 'is painting', 'painted', 'has painted'],
    correctAnswer: 'is painting',
    explanation: 'Có dấu hiệu "Look!" (Nhìn kìa!), hành động đang diễn ra ngay lúc nói -> chia thì Hiện tại tiếp diễn: is/am/are + V-ing.',
    hints: [
      'Gợi ý 1: Dấu hiệu "Look!" báo hiệu hành động đang diễn ra.',
      'Gợi ý 2: Cấu trúc hiện tại tiếp diễn là S + am/is/are + V-ing.'
    ],
    difficulty: 'Dễ'
  },

  // Unit 4
  {
    id: 'q4-read-1',
    unitId: 'unit-4',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 4: SKILL 1]\nKhang lives in Hoi An Old Town. His neighbourhood is famous for ancient yellow houses and narrow streets. There are many handicraft shops and cozy coffee shops nearby. The streets are very peaceful because cars are not allowed in the ancient town during the evening.\n\n❓ Question: Why are the streets in Khang\'s neighbourhood peaceful in the evening?',
    options: [
      'Because cars are not allowed in the ancient town in the evening',
      'Because nobody lives in the ancient town',
      'Because all coffee shops are closed early',
      'Because it is raining every evening'
    ],
    correctAnswer: 'Because cars are not allowed in the ancient town in the evening',
    explanation: 'Đoạn văn viết: "The streets are very peaceful because cars are not allowed in the ancient town during the evening."',
    hints: [
      'Gợi ý 1: Tìm từ "peaceful" trong đoạn văn.',
      'Gợi ý 2: Tìm lý do giải thích đằng sau từ "because".'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q4-write-1',
    unitId: 'unit-4',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 4: SKILL 2]\nChoose the sentence with the same meaning: "The streets in the city are noisier than the streets in the countryside."',
    options: [
      'The streets in the countryside are quieter than the streets in the city.',
      'The streets in the city are quieter than the streets in the countryside.',
      'The streets in the countryside are as noisy as the city.',
      'The streets in the city are more peaceful than the countryside.'
    ],
    correctAnswer: 'The streets in the countryside are quieter than the streets in the city.',
    explanation: 'Đường ở thành phố ồn ào hơn ở quê đồng nghĩa với Đường ở quê yên tĩnh hơn (quieter) ở thành phố.',
    hints: [
      'Gợi ý 1: So sánh hơn ngược nghĩa: "noisier than" (ồn hơn) <-> "quieter than" (yên tĩnh hơn).',
      'Gợi ý 2: Chú ý đổi vị trí hai vế thành phố và nông thôn.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q4-1',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Living in a city is usually ________ than living in the countryside.',
    options: ['more expensive', 'expensiver', 'most expensive', 'as expensive'],
    correctAnswer: 'more expensive',
    explanation: 'Expensive là tính từ dài (3 âm tiết), dạng so sánh hơn là "more + adj + than".',
    hints: [
      'Gợi ý 1: "expensive" có 3 âm tiết (tính từ dài).',
      'Gợi ý 2: So sánh hơn của tính từ dài dùng "more + tính từ".'
    ],
    difficulty: 'Dễ'
  },

  // Unit 5
  {
    id: 'q5-read-1',
    unitId: 'unit-5',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 5: SKILL 1]\nHa Long Bay in Quang Ninh is one of the most famous natural wonders of Viet Nam. It features thousands of limestone islands rising from the emerald water. Visitors can enjoy boat tours, explore impressive caves like Thien Cung, and eat fresh seafood. Tourists must remember not to litter to protect the sea environment.\n\n❓ Question: What must tourists remember when visiting Ha Long Bay?',
    options: [
      'Not to litter to protect the sea environment',
      'Not to take any photographs',
      'Not to go on boat tours',
      'Not to eat seafood'
    ],
    correctAnswer: 'Not to litter to protect the sea environment',
    explanation: 'Đoạn văn viết: "Tourists must remember not to litter to protect the sea environment."',
    hints: [
      'Gợi ý 1: Tìm cụm "Tourists must remember" ở cuối đoạn văn.',
      'Gợi ý 2: Litter có nghĩa là xả rác bừa bãi.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-write-1',
    unitId: 'unit-5',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 5: SKILL 2]\nChoose the sentence with the correct rule meaning: "It is strictly forbidden to throw rubbish into the cave."',
    options: [
      'You mustn\'t throw rubbish into the cave.',
      'You must throw rubbish into the cave.',
      'You can throw rubbish into the cave.',
      'You should throw rubbish into the cave.'
    ],
    correctAnswer: 'You mustn\'t throw rubbish into the cave.',
    explanation: 'Hành động bị cấm tuyệt đối (strictly forbidden) biểu thị bằng động từ khuyết thiếu "mustn\'t".',
    hints: [
      'Gợi ý 1: "strictly forbidden" có nghĩa là nghiêm cấm.',
      'Gợi ý 2: Động từ biểu thị sự cấm đoán là "mustn\'t".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-1',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'You ________ travel alone in the Himalayas. It is very dangerous!',
    options: ['must', 'mustn\'t', 'should', 'can'],
    correctAnswer: 'mustn\'t',
    explanation: 'Mustn\'t diễn tả sự cấm đoán hoặc hành động tuyệt đối không được làm vì nguy hiểm.',
    hints: [
      'Gợi ý 1: Vế sau có "It is very dangerous!" (Rất nguy hiểm!).',
      'Gợi ý 2: Khi điều gì đó nguy hiểm/bị cấm, ta dùng "mustn\'t".'
    ],
    difficulty: 'Dễ'
  },

  // Unit 6
  {
    id: 'q6-read-1',
    unitId: 'unit-6',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 6: SKILL 1]\nTet is the most important holiday in Viet Nam. Before Tet, families clean and decorate their homes with pink peach blossoms or yellow apricot flowers. On Tet days, people visit relatives, cook banh chung, and wish each other good health. Children look forward to Tet because they receive lucky money in red envelopes.\n\n❓ Question: Why do Vietnamese children look forward to Tet?',
    options: [
      'Because they receive lucky money in red envelopes',
      'Because they have to clean the house',
      'Because they go to school every day',
      'Because they stay at home alone'
    ],
    correctAnswer: 'Because they receive lucky money in red envelopes',
    explanation: 'Đoạn văn ghi rõ: "Children look forward to Tet because they receive lucky money in red envelopes."',
    hints: [
      'Gợi ý 1: Tìm cụm "look forward to Tet" ở câu cuối.',
      'Gợi ý 2: "lucky money in red envelopes" nghĩa là tiền lì xì trong bao đỏ.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-write-1',
    unitId: 'unit-6',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 6: SKILL 2]\nChoose the correct sentence giving polite advice for children during Tet holiday:',
    options: [
      'Children should behave well and wish adults good health.',
      'Children should break things and make a mess at Tet.',
      'Children shouldn\'t visit their grandparents.',
      'Children should demand lucky money impolitely.'
    ],
    correctAnswer: 'Children should behave well and wish adults good health.',
    explanation: 'Theo phong tục ngày Tết, trẻ em nên ngoan ngoãn và chúc sức khỏe người lớn (should behave well and wish adults good health).',
    hints: [
      'Gợi ý 1: Chọn lời khuyên tích cực phù hợp văn hóa Tết.',
      'Gợi ý 2: "behave well" (ngoan ngoãn), "wish adults good health" (chúc người lớn sức khỏe).'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-1',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Children usually receive ________ in red envelopes during Tet holiday.',
    options: ['lucky money', 'peach flowers', 'banh chung', 'fireworks'],
    correctAnswer: 'lucky money',
    explanation: 'Trẻ em nhận "lucky money" (tiền lì xì) trong các bao lì xì màu đỏ dịp Tết.',
    hints: [
      'Gợi ý 1: Đồ vật nằm trong "red envelopes" (phong bao đỏ).',
      'Gợi ý 2: Tiếng Việt gọi là tiền lì xì.'
    ],
    difficulty: 'Dễ'
  },

  // Unit 7
  {
    id: 'q7-read-1',
    unitId: 'unit-7',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 7: SKILL 1]\nVTV7 is an educational TV channel for children in Viet Nam. One of the most popular programmes is "Hello Fatty", an animated series about a friendly alien. It airs every Sunday morning at 8:30 a.m. Children love the show because it teaches valuable lessons about friendship through funny stories.\n\n❓ Question: What type of programme is "Hello Fatty"?',
    options: [
      'An animated series about a friendly alien',
      'A sports match between schools',
      'A music contest for teenagers',
      'A news show about world weather'
    ],
    correctAnswer: 'An animated series about a friendly alien',
    explanation: 'Bài đọc nêu: "One of the most popular programmes is \'Hello Fatty\', an animated series about a friendly alien."',
    hints: [
      'Gợi ý 1: Tìm tên chương trình "Hello Fatty" trong đoạn văn.',
      'Gợi ý 2: "animated series" có nghĩa là phim hoạt hình nhiều tập.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-write-1',
    unitId: 'unit-7',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 7: SKILL 2]\nCombine two sentences using "because": "I like watching \'Let\'s Learn English\'. It helps me learn vocabulary through fun songs."',
    options: [
      'I like watching "Let\'s Learn English" because it helps me learn vocabulary through fun songs.',
      'I like watching "Let\'s Learn English" so it helps me learn vocabulary through fun songs.',
      'I like watching "Let\'s Learn English" but it is very boring.',
      'I like watching "Let\'s Learn English" although it helps me learn vocabulary.'
    ],
    correctAnswer: 'I like watching "Let\'s Learn English" because it helps me learn vocabulary through fun songs.',
    explanation: 'Từ nối "because" dùng để chỉ nguyên nhân: Tôi thích xem chương trình VÌ nó giúp tôi học từ vựng qua bài hát.',
    hints: [
      'Gợi ý 1: "because" đứng trước mệnh đề chỉ nguyên nhân.',
      'Gợi ý 2: Kết nối hai câu nguyên vẹn bằng từ "because".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-1',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ hours a day do you watch TV? - About one hour.',
    options: ['How many', 'How much', 'How often', 'What'],
    correctAnswer: 'How many',
    explanation: 'Hours là danh từ đếm được số nhiều, câu hỏi số lượng đùng "How many + N(s)".',
    hints: [
      'Gợi ý 1: "Hours" (giờ) có chữ "s" cuối là danh từ đếm được số nhiều.',
      'Gợi ý 2: Hỏi bao nhiêu với danh từ đếm được ta dùng "How many".'
    ],
    difficulty: 'Dễ'
  },

  // Unit 8
  {
    id: 'q8-read-1',
    unitId: 'unit-8',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 8: SKILL 1]\nPele is widely considered one of the greatest football players of all time. He was born in Brazil in 1940. Pele started playing football at a young age and won his first World Cup trophy when he was only 17 years old. During his career, he scored over 1,000 goals and inspired millions of sports fans.\n\n❓ Question: How old was Pele when he won his first World Cup?',
    options: [
      '17 years old',
      '20 years old',
      '15 years old',
      '22 years old'
    ],
    correctAnswer: '17 years old',
    explanation: 'Bài đọc nêu rõ: "won his first World Cup trophy when he was only 17 years old."',
    hints: [
      'Gợi ý 1: Tìm mốc "first World Cup trophy".',
      'Gợi ý 2: Đọc số tuổi đứng ngay sau từ "he was only".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-write-1',
    unitId: 'unit-8',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 8: SKILL 2]\nChoose the correctly written past simple sentence describing a sports match:',
    options: [
      'Yesterday, Phong played table tennis with Duy and won the match.',
      'Yesterday, Phong plays table tennis with Duy and wins the match.',
      'Yesterday, Phong is playing table tennis with Duy and win the match.',
      'Yesterday, Phong play table tennis with Duy and woned the match.'
    ],
    correctAnswer: 'Yesterday, Phong played table tennis with Duy and won the match.',
    explanation: 'Trạng từ "Yesterday" yêu cầu thì Quá khứ đơn: play -> played, win -> won.',
    hints: [
      'Gợi ý 1: "Yesterday" đi với động từ quá khứ.',
      'Gợi ý 2: QUA KHỨ của play là played, của win là won (bất quy tắc).'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-1',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Yesterday, Phong ________ table tennis with Duy and won the match.',
    options: ['play', 'plays', 'played', 'is playing'],
    correctAnswer: 'played',
    explanation: 'Có từ "Yesterday" (Hôm qua), câu thuộc thì Quá quá đơn -> động từ play thêm "-ed" thành "played".',
    hints: [
      'Gợi ý 1: Trạng từ thời gian "Yesterday" chỉ quá khứ.',
      'Gợi ý 2: Động từ quy tắc dạng quá khứ thêm đuôi "-ed".'
    ],
    difficulty: 'Dễ'
  },

  // Unit 9
  {
    id: 'q9-read-1',
    unitId: 'unit-9',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 9: SKILL 1]\nSydney is the largest city in Australia, famous for its iconic Opera House and Harbour Bridge. The weather in Sydney is sunny and warm most of the year. Tourists love visiting Bondi Beach to go surfing or enjoying fresh seafood by the harbour.\n\n❓ Question: Which beach in Sydney is famous for surfing according to the passage?',
    options: [
      'Bondi Beach',
      'My Khe Beach',
      'Phuket Beach',
      'Miami Beach'
    ],
    correctAnswer: 'Bondi Beach',
    explanation: 'Đoạn văn nêu: "Tourists love visiting Bondi Beach to go surfing..."',
    hints: [
      'Gợi ý 1: Tìm tên bãi biển đứng trước từ "Beach".',
      'Gợi ý 2: Đọc dòng cuối cùng của đoạn văn.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-write-1',
    unitId: 'unit-9',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 9: SKILL 2]\nChoose the correct sentence using possessive pronouns for writing a postcard:',
    options: [
      'This postcard from London is mine, and that one on the table is yours.',
      'This postcard from London is my, and that one on the table is your.',
      'This postcard from London is me, and that one on the table is you.',
      'This postcard from London is mine, and that one on the table is your.'
    ],
    correctAnswer: 'This postcard from London is mine, and that one on the table is yours.',
    explanation: 'Đại từ sở hữu không đi kèm danh từ đằng sau: my postcard -> mine, your postcard -> yours.',
    hints: [
      'Gợi ý 1: Đằng sau không có danh từ "postcard" -> dùng đại từ sở hữu mine/yours.',
      'Gợi ý 2: mine = cái của tôi, yours = cái của bạn.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q9-1',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'This book is my book, not ________.',
    options: ['your book', 'your', 'yours', 'you'],
    correctAnswer: 'yours',
    explanation: 'Đứng một mình ở cuối không có danh từ đi kèm ta dùng đại từ sở hữu "yours" (= your book).',
    hints: [
      'Gợi ý 1: Đằng sau khoảng trống không có danh từ nào.',
      'Gợi ý 2: Đại từ sở hữu đại diện cho "your + N".'
    ],
    difficulty: 'Trung bình'
  },

  // Unit 10
  {
    id: 'q10-read-1',
    unitId: 'unit-10',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 10: SKILL 1]\nIn the future, many people will live in smart houses. These houses will have solar panels on the roof to generate clean electricity. Inside, smart appliances will be controlled by voice commands. A helper robot will do all house chores such as sweeping floors, washing dishes, and cooking meals.\n\n❓ Question: How will smart appliances be controlled inside future houses?',
    options: [
      'By voice commands',
      'By remote controls only',
      'By hand switches',
      'By mechanical keys'
    ],
    correctAnswer: 'By voice commands',
    explanation: 'Đoạn văn viết: "smart appliances will be controlled by voice commands."',
    hints: [
      'Gợi ý 1: Tìm cụm "smart appliances".',
      'Gợi ý 2: "voice commands" nghĩa là mệnh lệnh giọng nói.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-write-1',
    unitId: 'unit-10',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 10: SKILL 2]\nChoose the correct sentence describing a future dream house:',
    options: [
      'In 2050, my dream house will have solar panels and a helper robot.',
      'In 2050, my dream house has solar panels and a helper robot yesterday.',
      'In 2050, my dream house was having solar panels and a helper robot.',
      'In 2050, my dream house will having solar panels and a helper robot.'
    ],
    correctAnswer: 'In 2050, my dream house will have solar panels and a helper robot.',
    explanation: 'Mốc thời gian tương lai "In 2050" dùng thì Tương lai đơn: will + V nguyên thể (will have).',
    hints: [
      'Gợi ý 1: Năm 2050 là thời điểm trong tương lai.',
      'Gợi ý 2: Cấu trúc tương lai đơn: S + will + V (nguyên thể).'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-1',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'In 2050, we ________ live in smart houses powered by solar energy.',
    options: ['will', 'did', 'are', 'were'],
    correctAnswer: 'will',
    explanation: 'Mốc thời gian tương lai "In 2050" dùng thì Tương lai đơn với động từ khuyết thiếu "will + V".',
    hints: [
      'Gợi ý 1: Năm 2050 là thời điểm trong tương lai.',
      'Gợi ý 2: Thì tương lai đơn dùng "will" cộng động từ nguyên thể.'
    ],
    difficulty: 'Dễ'
  },

  // Unit 11
  {
    id: 'q11-read-1',
    unitId: 'unit-11',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 11: SKILL 1]\nThe 3Rs stand for Reduce, Reuse, and Recycle. Practicing the 3Rs helps protect our environment. We can reduce waste by turning off taps while brushing teeth. We can reuse plastic bottles as flower pots and recycle paper and cans. If everyone practices the 3Rs daily, our planet will be greener.\n\n❓ Question: What can we do with plastic bottles according to the passage?',
    options: [
      'Reuse them as flower pots',
      'Throw them into the sea',
      'Burn them in the schoolyard',
      'Use them only once'
    ],
    correctAnswer: 'Reuse them as flower pots',
    explanation: 'Đoạn văn nêu: "We can reuse plastic bottles as flower pots..."',
    hints: [
      'Gợi ý 1: Tìm cụm từ "plastic bottles".',
      'Gợi ý 2: Đọc hành động đằng sau từ "reuse".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-write-1',
    unitId: 'unit-11',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 11: SKILL 2]\nChoose the correct First Conditional sentence for environmental protection:',
    options: [
      'If students plant more trees, the schoolyard will become greener.',
      'If students will plant more trees, the schoolyard becomes greener.',
      'If students planted more trees, the schoolyard will become greener.',
      'If students plant more trees, the schoolyard became greener.'
    ],
    correctAnswer: 'If students plant more trees, the schoolyard will become greener.',
    explanation: 'Câu điều kiện loại 1: Mệnh đề If chia Hiện tại đơn (plant), mệnh đề chính chia Tương lai đơn (will become).',
    hints: [
      'Gợi ý 1: Cấu trúc Câu điều kiện loại 1: If + S + V(present simple), S + will + V.',
      'Gợi ý 2: Mệnh đề If dùng "plant", mệnh đề chính dùng "will become".'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q11-1',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'If people ________ reusable bags for shopping, they will help the environment.',
    options: ['use', 'will use', 'used', 'using'],
    correctAnswer: 'use',
    explanation: 'Mệnh đề "If" trong câu điều kiện loại 1 chia ở thì Hiện tại đơn (S + V1/s/es).',
    hints: [
      'Gợi ý 1: Đây là câu điều kiện loại 1 (If + Present simple, Will + V).',
      'Gợi ý 2: Chủ ngữ "people" số nhiều nên động từ "use" giữ nguyên.'
    ],
    difficulty: 'Trung bình'
  },

  // Unit 12
  {
    id: 'q12-read-1',
    unitId: 'unit-12',
    skill: 'Reading',
    type: 'multiple-choice',
    content: '📖 [READING PASSAGE - UNIT 12: SKILL 1]\nAt the International Robot Show in Tokyo, scientists introduced many new types of robots. Doctor robots can operate on patients and check body health. Home robots can clean rooms, water plants, and talk with old people. Space robots can explore distant planets where humans cannot go safely.\n\n❓ Question: What can space robots do according to the text?',
    options: [
      'Explore distant planets where humans cannot go safely',
      'Cook meals for big families',
      'Operate on patients in hospital',
      'Water flowers in the garden'
    ],
    correctAnswer: 'Explore distant planets where humans cannot go safely',
    explanation: 'Đoạn văn viết: "Space robots can explore distant planets where humans cannot go safely."',
    hints: [
      'Gợi ý 1: Tìm cụm "Space robots".',
      'Gợi ý 2: Đọc khả năng đằng sau từ "can explore".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-write-1',
    unitId: 'unit-12',
    skill: 'Writing',
    type: 'multiple-choice',
    content: '✍️ [WRITING - UNIT 12: SKILL 2]\nChoose the correct sentence using superlatives:',
    options: [
      'RoboMax is the smartest home robot in the exhibition.',
      'RoboMax is the smarter home robot in the exhibition.',
      'RoboMax is most smart home robot in the exhibition.',
      'RoboMax is the smart home robot in the exhibition.'
    ],
    correctAnswer: 'RoboMax is the smartest home robot in the exhibition.',
    explanation: 'So sánh nhất với tính từ ngắn "smart": the + smart + est -> "the smartest".',
    hints: [
      'Gợi ý 1: So sánh nhất có "the" đứng trước.',
      'Gợi ý 2: Tính từ ngắn "smart" thêm đuôi "-est" thành "smartest".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-1',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Shifa is the ________ doctor robot in the exhibition.',
    options: ['smartest', 'smarter', 'smart', 'more smart'],
    correctAnswer: 'smartest',
    explanation: 'Có mạo từ "the" đứng trước tính từ ngắn "smart" -> So sánh nhất thêm đuôi "-est" thành "the smartest".',
    hints: [
      'Gợi ý 1: Nhìn thấy từ "the" đứng trước khoảng trống.',
      'Gợi ý 2: So sánh nhất của tính từ ngắn = the + adj-est.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-g1',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'She ________ to school by bus with her friends every morning.',
    options: [
      'goes',
      'go',
      'is going',
      'went'
    ],
    correctAnswer: 'goes',
    explanation: 'Chủ ngữ "She" là ngôi thứ 3 số ít, câu có dấu hiệu "every morning" (thì Hiện tại đơn) nên động từ "go" chia thành "goes".',
    hints: [
      'Gợi ý 1: Tìm dấu hiệu nhận biết "every morning" (mỗi buổi sáng).',
      'Gợi ý 2: Chủ ngữ "She" đi với V-es.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-g2',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'They usually ________ their homework in the library after school.',
    options: [
      'do',
      'does',
      'doing',
      'are doing'
    ],
    correctAnswer: 'do',
    explanation: 'Chủ ngữ "They" (số nhiều) trong thì Hiện tại đơn giữ nguyên động từ nguyên mẫu "do".',
    hints: [
      'Gợi ý 1: Nhận biết trạng từ chỉ tần suất "usually".',
      'Gợi ý 2: "They" là chủ ngữ số nhiều.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-g3',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'My brother ________ play football on Sundays because he prefers swimming.',
    options: [
      'doesn\'t',
      'don\'t',
      'isn\'t',
      'aren\'t'
    ],
    correctAnswer: 'doesn\'t',
    explanation: 'Câu phủ định thì Hiện tại đơn với chủ ngữ số ít "My brother" dùng trợ động từ "doesn\'t + V_inf".',
    hints: [
      'Gợi ý 1: Trợ động từ phủ định cho chủ ngữ số ít là "doesn\'t".',
      'Gợi ý 2: Động từ chính "play" giữ nguyên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-g4',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ your new school have a large library and modern computer rooms?',
    options: [
      'Does',
      'Do',
      'Is',
      'Are'
    ],
    correctAnswer: 'Does',
    explanation: 'Câu hỏi Yes/No thì Hiện tại đơn với chủ ngữ số ít "your new school" dùng trợ động từ "Does".',
    hints: [
      'Gợi ý 1: Chủ ngữ "your new school" là danh từ số ít.',
      'Gợi ý 2: Động từ chính là "have" (động từ thường).'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-g5',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Mai ________ late for class; she is a very hard-working student.',
    options: [
      'is never',
      'never is',
      'doesn\'t never',
      'is don\'t'
    ],
    correctAnswer: 'is never',
    explanation: 'Trạng từ chỉ tần suất (never) luôn đứng SAU động từ To Be (is never late).',
    hints: [
      'Gợi ý 1: Trạng từ tần suất đứng đằng sau động từ "to be".',
      'Gợi ý 2: Cấu trúc: S + to be + Adverb of frequency + Adj.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-g6',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'How often ________ you read English books in your free time?',
    options: [
      'do',
      'does',
      'are',
      'is'
    ],
    correctAnswer: 'do',
    explanation: 'Câu hỏi tần suất "How often" với chủ ngữ "you" dùng trợ động từ "do".',
    hints: [
      'Gợi ý 1: Cấu trúc hỏi tần suất: How often + do/does + S + V?',
      'Gợi ý 2: "you" đi với trợ động từ "do".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-g7',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Nam usually ________ judo in the school gym with his classmates on Tuesdays.',
    options: [
      'does',
      'plays',
      'makes',
      'has'
    ],
    correctAnswer: 'does',
    explanation: 'Môn võ judo đi kèm với động từ "do" -> Nam (số ít) dùng "does judo".',
    hints: [
      'Gợi ý 1: Môn võ judo đi kèm với động từ nào?',
      'Gợi ý 2: "do judo" mang nghĩa tập judo.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-g8',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'We ________ many new subjects like Physics, History and Science in Grade 6.',
    options: [
      'have',
      'has',
      'having',
      'are have'
    ],
    correctAnswer: 'have',
    explanation: 'Chủ ngữ "We" (chúng tôi - số nhiều) đi với động từ nguyên mẫu "have" trong thì Hiện tại đơn.',
    hints: [
      'Gợi ý 1: Chủ ngữ "We" đi với "have" hay "has"?',
      'Gợi ý 2: "We" là số nhiều.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-g9',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Phong is a good student. He ________ arrives at school 15 minutes early.',
    options: [
      'always',
      'is always',
      'never',
      'rarely'
    ],
    correctAnswer: 'always',
    explanation: 'Trạng từ chỉ tần suất "always" (luôn luôn) đứng trước động từ thường "arrives".',
    hints: [
      'Gợi ý 1: "Good student" chỉ thói quen luôn luôn đúng giờ.',
      'Gợi ý 2: Cấu trúc: S + Adv + V_main.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-g10',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ do students wear uniform at your lower secondary school?',
    options: [
      'When',
      'Where',
      'How often',
      'Why'
    ],
    correctAnswer: 'When',
    explanation: 'Từ hỏi "When" (Khi nào) dùng để hỏi thời gian mặc đồng phục.',
    hints: [
      'Gợi ý 1: Hỏi thời gian cụ thể dùng từ hỏi nào?',
      'Gợi ý 2: "When" = Khi nào.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q2-g1',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'This is ________ bedroom. It is clean and painted in light blue.',
    options: [
      'An\'s',
      'An',
      'Ans\'',
      'An is'
    ],
    correctAnswer: 'An\'s',
    explanation: 'Sở hữu cách cho danh từ riêng số ít \'An\' là \'An\'s\' (Phòng ngủ của An).',
    hints: [
      'Gợi ý 1: Cấu trúc sở hữu cách: N + \'s + danh từ.',
      'Gợi ý 2: An\'s bedroom = Phòng ngủ của An.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-g2',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Where is the cat? - It is sleeping ________ the comfortable sofa.',
    options: [
      'on',
      'in',
      'between',
      'under'
    ],
    correctAnswer: 'on',
    explanation: 'Giới từ chỉ vị trí "on the sofa" có nghĩa là nằm TRÊN ghế sofa.',
    hints: [
      'Gợi ý 1: Nằm trên bề mặt ghế dùng giới từ gì?',
      'Gợi ý 2: "on" = trên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-g3',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'The family picture hangs ________ the wall, just above the television.',
    options: [
      'on',
      'in',
      'at',
      'behind'
    ],
    correctAnswer: 'on',
    explanation: 'Treo bức tranh TRÊN bức tường dùng giới từ "on the wall".',
    hints: [
      'Gợi ý 1: Trên tường dùng "on the wall".',
      'Gợi ý 2: "on" đi với wall.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-g4',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'The wooden wardrobe is standing ________ the bed and the study desk.',
    options: [
      'between',
      'in front of',
      'next to',
      'under'
    ],
    correctAnswer: 'between',
    explanation: 'Cấu trúc "between A and B" nghĩa là Ở GIỮA vật A và vật B.',
    hints: [
      'Gợi ý 1: Nhìn thấy từ "and" kết nối 2 vật.',
      'Gợi ý 2: "between... and..." = ở giữa... và...'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q2-g5',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'My ________ laptop is placed on the living room table.',
    options: [
      'brother\'s',
      'brothers',
      'brother',
      'brothers\'s'
    ],
    correctAnswer: 'brother\'s',
    explanation: 'Sở hữu cách cho danh từ số ít \'brother\' là \'brother\'s\' (Máy tính của anh trai tôi).',
    hints: [
      'Gợi ý 1: Chọn sở hữu cách đúng của danh từ số ít.',
      'Gợi ý 2: brother + \'s.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-g6',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'There is a beautiful flower garden ________ my house.',
    options: [
      'in front of',
      'between',
      'on',
      'in'
    ],
    correctAnswer: 'in front of',
    explanation: 'Cụm giới từ "in front of my house" nghĩa là Ở PHÍA TRƯỚC nhà tôi.',
    hints: [
      'Gợi ý 1: "in front of" = phía trước.',
      'Gợi ý 2: Khu vườn phía trước ngôi nhà.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q2-g7',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Don\'t leave your shoes ________ the bed! Put them in the shoe cabinet.',
    options: [
      'under',
      'on',
      'between',
      'behind'
    ],
    correctAnswer: 'under',
    explanation: 'Giới từ "under the bed" nghĩa là DƯỚI gầm giường.',
    hints: [
      'Gợi ý 1: Vị trí gầm giường dùng "under".',
      'Gợi ý 2: "under" = bên dưới.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-g8',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Is this ________ new bicycle? - Yes, she bought it last week.',
    options: [
      'Vy\'s',
      'Vy',
      'Vys',
      'Vy is'
    ],
    correctAnswer: 'Vy\'s',
    explanation: 'Vy\'s new bicycle = Xe đạp mới của Vy (sở hữu cách).',
    hints: [
      'Gợi ý 1: Thêm \'s vào tên riêng Vy.',
      'Gợi ý 2: Vy\'s bicycle.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-g9',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'The microwave is ________ the kitchen counter next to the fridge.',
    options: [
      'on',
      'under',
      'in',
      'between'
    ],
    correctAnswer: 'on',
    explanation: 'Lò vi sóng đặt TRÊN bàn bếp dùng giới từ "on".',
    hints: [
      'Gợi ý 1: "on" = đặt trên mặt bàn bếp.',
      'Gợi ý 2: On the kitchen counter.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q2-g10',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'In our country house, the bathroom is ________ the dining room.',
    options: [
      'next to',
      'between',
      'under',
      'in'
    ],
    correctAnswer: 'next to',
    explanation: '"next to" nghĩa là BÊN CẠNH phòng ăn.',
    hints: [
      'Gợi ý 1: "next to" = bên cạnh.',
      'Gợi ý 2: Đằng sau không có từ "and" nên chọn "next to".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g1',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Look! The students ________ basketball in the schoolyard.',
    options: [
      'are playing',
      'play',
      'played',
      'plays'
    ],
    correctAnswer: 'are playing',
    explanation: 'Từ gây chú ý "Look!" là dấu hiệu nhận biết thì Hiện tại tiếp diễn (S + am/is/are + V-ing). "The students" đi với "are playing".',
    hints: [
      'Gợi ý 1: Nhìn thấy từ gây chú ý "Look!".',
      'Gợi ý 2: Cấu trúc hiện tại tiếp diễn: S + am/is/are + V-ing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g2',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Listen! Someone ________ the piano in the music room beautifully.',
    options: [
      'is playing',
      'plays',
      'play',
      'played'
    ],
    correctAnswer: 'is playing',
    explanation: 'Từ gây chú ý "Listen!" chia thì Hiện tại tiếp diễn. "Someone" (đại từ bất định) đi với "is playing".',
    hints: [
      'Gợi ý 1: "Listen!" chỉ hành động đang diễn ra.',
      'Gợi ý 2: Someone + is + V-ing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g3',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'What ________ you ________ at present? - I am writing a short diary.',
    options: [
      'are / doing',
      'do / do',
      'is / doing',
      'did / do'
    ],
    correctAnswer: 'are / doing',
    explanation: 'Dấu hiệu "at present" (bây giờ) chia thì Hiện tại tiếp diễn: What + are + you + doing?',
    hints: [
      'Gợi ý 1: Dấu hiệu "at present" = hiện tại.',
      'Gợi ý 2: Cấu trúc câu hỏi: Wh + am/is/are + S + V-ing?'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g4',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Lan has long black hair and ________ brown eyes.',
    options: [
      'big',
      'long',
      'tall',
      'short'
    ],
    correctAnswer: 'big',
    explanation: 'Tính từ miêu tả đôi mắt phù hợp nhất là "big brown eyes" (đôi mắt to màu nâu).',
    hints: [
      'Gợi ý 1: Tính từ tả kích thước mắt.',
      'Gợi ý 2: Mắt to = big eyes.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g5',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Minh is very ________; he always helps his friends with difficult homework.',
    options: [
      'kind',
      'shy',
      'lazy',
      'creative'
    ],
    correctAnswer: 'kind',
    explanation: 'Luôn giúp đỡ bạn bè thể hiện tính cách tốt bụng ("kind").',
    hints: [
      'Gợi ý 1: Người hay giúp đỡ bạn bè là người như thế nào?',
      'Gợi ý 2: "kind" = tốt bụng.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g6',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Be quiet! The little baby ________ in the bedroom.',
    options: [
      'is sleeping',
      'sleeps',
      'sleep',
      'slept'
    ],
    correctAnswer: 'is sleeping',
    explanation: 'Mệnh lệnh "Be quiet!" chỉ hành động đang diễn ra tại thời điểm nói -> Chia "is sleeping".',
    hints: [
      'Gợi ý 1: "Be quiet!" = Yêu cầu giữ trật tự.',
      'Gợi ý 2: Em bé đang ngủ (is sleeping).'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g7',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Vy is very ________; she loves painting, drawing and writing stories.',
    options: [
      'creative',
      'shy',
      'patient',
      'talkative'
    ],
    correctAnswer: 'creative',
    explanation: 'Thích vẽ tranh và sáng tác truyện thể hiện sự sáng tạo ("creative").',
    hints: [
      'Gợi ý 1: Thích vẽ tranh sáng tác là tính cách gì?',
      'Gợi ý 2: "creative" = sáng tạo.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q3-g8',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Right now, my best friends ________ for the English test in the library.',
    options: [
      'are studying',
      'study',
      'studied',
      'studies'
    ],
    correctAnswer: 'are studying',
    explanation: 'Trạng ngữ "Right now" chỉ thì Hiện tại tiếp diễn. "My best friends" (số nhiều) đi với "are studying".',
    hints: [
      'Gợi ý 1: "Right now" = ngay lúc này.',
      'Gợi ý 2: S (số nhiều) + are + V-ing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-g9',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Phong is a ________ boy; he feels nervous when speaking in front of crowds.',
    options: [
      'shy',
      'confident',
      'friendly',
      'hard-working'
    ],
    correctAnswer: 'shy',
    explanation: 'Cảm thấy lo lắng khi nói trước đám đông là tính cách nhút nhát ("shy").',
    hints: [
      'Gợi ý 1: Hay xấu hổ lo lắng là tính cách gì?',
      'Gợi ý 2: "shy" = nhút nhát.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q4-g1',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'My new neighbourhood is ________ than my old one.',
    options: [
      'more peaceful',
      'peacefuler',
      'peaceful',
      'most peaceful'
    ],
    correctAnswer: 'more peaceful',
    explanation: '"peaceful" là tính từ dài (2 âm tiết). So sánh hơn của tính từ dài: more + adj + than -> "more peaceful".',
    hints: [
      'Gợi ý 1: "peaceful" là tính từ dài hay ngắn?',
      'Gợi ý 2: Tính từ dài dùng cấu trúc: more + adj.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-g2',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'The air in the countryside is ________ than the air in big cities.',
    options: [
      'cleaner',
      'more clean',
      'cleanest',
      'clean'
    ],
    correctAnswer: 'cleaner',
    explanation: '"clean" là tính từ ngắn 1 âm tiết. So sánh hơn của tính từ ngắn: adj + er -> "cleaner".',
    hints: [
      'Gợi ý 1: "clean" là tính từ ngắn 1 âm tiết.',
      'Gợi ý 2: Tính từ ngắn thêm đuôi -er.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-g3',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Houses in the city are usually ________ than houses in the village.',
    options: [
      'more expensive',
      'expensiver',
      'expensive',
      'most expensive'
    ],
    correctAnswer: 'more expensive',
    explanation: '"expensive" là tính từ dài 3 âm tiết -> So sánh hơn: more expensive.',
    hints: [
      'Gợi ý 1: "expensive" là tính từ 3 âm tiết.',
      'Gợi ý 2: more + expensive.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-g4',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'The streets in Hanoi are much ________ than those in my hometown.',
    options: [
      'busier',
      'more busy',
      'busiest',
      'busy'
    ],
    correctAnswer: 'busier',
    explanation: '"busy" tận cùng bằng "y", đổi "y" thành "i" rồi thêm "-er" -> "busier".',
    hints: [
      'Gợi ý 1: "busy" kết thúc bằng đuôi "-y".',
      'Gợi ý 2: Đổi "-y" thành "-ier".'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q4-g5',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Traveling by plane is ________ than traveling by train.',
    options: [
      'faster',
      'more fast',
      'fastest',
      'fast'
    ],
    correctAnswer: 'faster',
    explanation: '"fast" là tính từ ngắn -> fast + er = "faster".',
    hints: [
      'Gợi ý 1: "fast" là tính từ 1 âm tiết.',
      'Gợi ý 2: thêm đuôi "-er".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-g6',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'The art gallery is ________ than the old museum.',
    options: [
      'more modern',
      'moderner',
      'modern',
      'most modern'
    ],
    correctAnswer: 'more modern',
    explanation: '"modern" là tính từ dài 2 âm tiết -> "more modern".',
    hints: [
      'Gợi ý 1: "modern" dùng với "more".',
      'Gợi ý 2: more modern than.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-g7',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'This park is ________ than the one near our school.',
    options: [
      'larger',
      'more large',
      'largest',
      'large'
    ],
    correctAnswer: 'larger',
    explanation: '"large" tận cùng bằng "e" nên chỉ cần thêm "r" -> "larger".',
    hints: [
      'Gợi ý 1: Tính từ "large" đã có sẵn chữ "e".',
      'Gợi ý 2: Chỉ cần thêm "r".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-g8',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Living in an apartment is ________ than living in a tent.',
    options: [
      'more convenient',
      'convenienter',
      'convenient',
      'most convenient'
    ],
    correctAnswer: 'more convenient',
    explanation: '"convenient" là tính từ dài -> "more convenient".',
    hints: [
      'Gợi ý 1: "convenient" là tính từ dài.',
      'Gợi ý 2: Cấu trúc: more + adj + than.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-g1',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'You ________ travel alone in the Himalayas. It is very dangerous!',
    options: [
      'mustn\'t',
      'must',
      'should',
      'can'
    ],
    correctAnswer: 'mustn\'t',
    explanation: 'Cấm / Không được phép làm vì rất nguy hiểm dùng động từ khuyết thiếu "mustn\'t".',
    hints: [
      'Gợi ý 1: "dangerous" (nguy hiểm) chỉ điều cấm làm.',
      'Gợi ý 2: "mustn\'t" = Không được phép làm.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-g2',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'You ________ wear a life jacket when riding a boat in Ha Long Bay.',
    options: [
      'must',
      'mustn\'t',
      'can\'t',
      'wouldn\'t'
    ],
    correctAnswer: 'must',
    explanation: 'Bắt buộc phải tuân thủ quy định an toàn đi thuyền dùng "must" (Phải).',
    hints: [
      'Gợi ý 1: Mặc áo phao khi đi thuyền là bắt buộc.',
      'Gợi ý 2: "must" = Phải (bắt buộc).'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-g3',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'How ________ bottled water should we bring for the mountain trip?',
    options: [
      'much',
      'many',
      'some',
      'any'
    ],
    correctAnswer: 'much',
    explanation: '"water" là danh từ không đếm được -> Dùng "How much".',
    hints: [
      'Gợi ý 1: Nước (water) là danh từ đếm được hay không đếm được?',
      'Gợi ý 2: Không đếm được dùng "How much".'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q5-g4',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'How ________ islands are there in Phu Quoc?',
    options: [
      'many',
      'much',
      'some',
      'a little'
    ],
    correctAnswer: 'many',
    explanation: '"islands" là danh từ đếm được số nhiều -> Dùng "How many".',
    hints: [
      'Gợi ý 1: "islands" có đuôi "-s" đếm được.',
      'Gợi ý 2: Hỏi số lượng danh từ đếm được dùng "How many".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-g5',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Visitors ________ drop litter in the national park.',
    options: [
      'mustn\'t',
      'must',
      'can',
      'should'
    ],
    correctAnswer: 'mustn\'t',
    explanation: 'Tuyệt đối không được vứt rác bừa bãi trong vườn quốc gia -> "mustn\'t".',
    hints: [
      'Gợi ý 1: Vứt rác bừa bãi là hành vi cấm.',
      'Gợi ý 2: "mustn\'t" = Không được làm.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-g6',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Can you give me ________ suncream? My skin feels sunburnt.',
    options: [
      'some',
      'any',
      'many',
      'few'
    ],
    correctAnswer: 'some',
    explanation: 'Câu yêu cầu lịch sự "Can you give me..." dùng "some" với danh từ không đếm được "suncream".',
    hints: [
      'Gợi ý 1: Lời yêu cầu lịch sự dùng "some".',
      'Gợi ý 2: "some" đứng trong câu đề nghị/yêu cầu.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q6-g1',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Children ________ eat too many sweets before going to bed during Tet.',
    options: [
      'shouldn\'t',
      'should',
      'must',
      'can'
    ],
    correctAnswer: 'shouldn\'t',
    explanation: 'Lời khuyên không nên ăn quá nhiều kẹo vào buổi tối -> "shouldn\'t".',
    hints: [
      'Gợi ý 1: Lời khuyên không nên làm gì.',
      'Gợi ý 2: "shouldn\'t" = Không nên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-g2',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'We ________ help our parents decorate our home with peach blossoms.',
    options: [
      'should',
      'shouldn\'t',
      'mustn\'t',
      'couldn\'t'
    ],
    correctAnswer: 'should',
    explanation: 'Lời khuyên nên giúp bố mẹ dọn dẹp trang trí nhà dịp Tết -> "should".',
    hints: [
      'Gợi ý 1: Lời khuyên tốt nên làm.',
      'Gợi ý 2: "should" = Nên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-g3',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Are there ________ yellow apricot blossoms in the garden?',
    options: [
      'any',
      'some',
      'much',
      'a little'
    ],
    correctAnswer: 'any',
    explanation: 'Câu hỏi nghi vấn dùng "any" trước danh từ số nhiều "blossoms".',
    hints: [
      'Gợi ý 1: Câu hỏi Yes/No dùng "any".',
      'Gợi ý 2: Are there + any + N(plural)?'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-g4',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'You ________ break things on the first day of Tet because it brings bad luck.',
    options: [
      'shouldn\'t',
      'should',
      'must',
      'can'
    ],
    correctAnswer: 'shouldn\'t',
    explanation: 'Khuyên không nên làm vỡ đồ đạc mùng 1 Tết -> "shouldn\'t".',
    hints: [
      'Gợi ý 1: Làm vỡ đồ mang lại điềm xấu.',
      'Gợi ý 2: "shouldn\'t" = Không nên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-g5',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'My mother bought ________ delicious fruits for the five-fruit tray.',
    options: [
      'some',
      'any',
      'much',
      'a'
    ],
    correctAnswer: 'some',
    explanation: 'Câu khẳng định dùng "some" với danh từ số nhiều "fruits".',
    hints: [
      'Gợi ý 1: Câu khẳng định dùng "some".',
      'Gợi ý 2: "some" = một vài.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-g6',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'We ________ wish our grandparents good health and longevity on New Year\'s Day.',
    options: [
      'should',
      'shouldn\'t',
      'mustn\'t',
      'can\'t'
    ],
    correctAnswer: 'should',
    explanation: 'Nên chúc thọ ông bà dịp đầu năm mới -> "should".',
    hints: [
      'Gợi ý 1: Chúc Tết ông bà là việc làm hay.',
      'Gợi ý 2: "should" = Nên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-g1',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ do you like watching cartoons? - Because they are funny!',
    options: [
      'Why',
      'What',
      'Where',
      'When'
    ],
    correctAnswer: 'Why',
    explanation: 'Câu trả lời bắt đầu bằng "Because" (bởi vì) thì từ hỏi phải là "Why" (Tại sao).',
    hints: [
      'Gợi ý 1: Nhìn câu trả lời "Because...".',
      'Gợi ý 2: "Why" hỏi lý do.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-g2',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'I like animated films, ________ my brother prefers sports programmes.',
    options: [
      'but',
      'and',
      'so',
      'because'
    ],
    correctAnswer: 'but',
    explanation: 'Hai mệnh đề thể hiện sự đối lập (tôi thích phim hoạt hình, NHƯNG anh tôi thích thể thao) dùng từ nối "but".',
    hints: [
      'Gợi ý 1: 2 ý trái ngược nhau.',
      'Gợi ý 2: "but" = Nhưng.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-g3',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ is your favourite TV channel? - It\'s VTV7.',
    options: [
      'What',
      'Who',
      'Why',
      'How'
    ],
    correctAnswer: 'What',
    explanation: 'Hỏi về tên kênh truyền hình ưa thích dùng từ hỏi "What".',
    hints: [
      'Gợi ý 1: Hỏi "Kênh nào" dùng "What".',
      'Gợi ý 2: What is your favourite...'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-g4',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'She was very tired, ________ she went to bed early last night.',
    options: [
      'so',
      'because',
      'but',
      'and'
    ],
    correctAnswer: 'so',
    explanation: 'Mệnh đề chỉ kết quả (mệt mỏi NÊN đi ngủ sớm) dùng từ nối "so".',
    hints: [
      'Gợi ý 1: Chỉ kết quả xảy ra.',
      'Gợi ý 2: "so" = Vì vậy / Vì thế.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-g5',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ hours a day do you watch television? - About one hour.',
    options: [
      'How many',
      'How much',
      'How long',
      'How often'
    ],
    correctAnswer: 'How many',
    explanation: '"hours" là danh từ số nhiều đếm được -> Hỏi "How many hours".',
    hints: [
      'Gợi ý 1: "hours" đếm được số nhiều.',
      'Gợi ý 2: How many + N(plural).'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q7-g6',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'He loves the game show \'Are You Smarter Than a 5th Grader?\' ________ it is educational.',
    options: [
      'because',
      'so',
      'but',
      'and'
    ],
    correctAnswer: 'because',
    explanation: 'Mệnh đề nguyên nhân (BỞI VÌ nó mang tính giáo dục) dùng "because".',
    hints: [
      'Gợi ý 1: Chỉ nguyên nhân lý do.',
      'Gợi ý 2: "because" = Bởi vì.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-g1',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Yesterday, my school football team ________ a friendly match against Class 6B.',
    options: [
      'played',
      'play',
      'is playing',
      'will play'
    ],
    correctAnswer: 'played',
    explanation: 'Dấu hiệu "Yesterday" chia thì Quá khứ đơn (V-ed): play -> played.',
    hints: [
      'Gợi ý 1: Dấu hiệu nhận biết "Yesterday".',
      'Gợi ý 2: Thêm -ed vào động từ.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-g2',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Don\'t ________ in the deep pool! It\'s dangerous for beginners.',
    options: [
      'swim',
      'swimming',
      'swam',
      'swims'
    ],
    correctAnswer: 'swim',
    explanation: 'Câu mệnh lệnh phủ định: Don\'t + V_inf (nguyên mẫu) -> "Don\'t swim".',
    hints: [
      'Gợi ý 1: Đằng sau "Don\'t" dùng động từ dạng nào?',
      'Gợi ý 2: Động từ nguyên mẫu.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-g3',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Last week, Pelé ________ three goals in the final match.',
    options: [
      'scored',
      'scores',
      'is scoring',
      'score'
    ],
    correctAnswer: 'scored',
    explanation: 'Dấu hiệu "Last week" chia thì Quá khứ đơn (score -> scored).',
    hints: [
      'Gợi ý 1: "Last week" = Tuần trước.',
      'Gợi ý 2: Động từ chia quá khứ.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-g4',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '________ quiet! The P.E teacher is explaining the basketball rules.',
    options: [
      'Be',
      'Do',
      'Are',
      'Have'
    ],
    correctAnswer: 'Be',
    explanation: 'Câu mệnh lệnh khẳng định với tính từ "quiet": Be + adj -> "Be quiet!".',
    hints: [
      'Gợi ý 1: Mệnh lệnh yêu cầu trật tự.',
      'Gợi ý 2: "Be quiet!" = Hãy trật tự.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-g5',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'We ________ to the sports club last Sunday to practice karate.',
    options: [
      'went',
      'go',
      'going',
      'goes'
    ],
    correctAnswer: 'went',
    explanation: 'Động từ bất quy tắc của "go" ở quá khứ đơn (last Sunday) là "went".',
    hints: [
      'Gợi ý 1: Quá khứ của động từ "go".',
      'Gợi ý 2: go -> went.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-g6',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Please ________ your sports shoes before playing badminton on the court.',
    options: [
      'put on',
      'putting on',
      'putted on',
      'puts on'
    ],
    correctAnswer: 'put on',
    explanation: 'Lời đề nghị / Mệnh lệnh lịch sự bắt đầu bằng "Please + V_inf" -> "Please put on".',
    hints: [
      'Gợi ý 1: Please + Động từ nguyên mẫu.',
      'Gợi ý 2: put on.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-g1',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'This camera is mine, and that blue postcard is ________.',
    options: [
      'yours',
      'your',
      'you',
      'yours\''
    ],
    correctAnswer: 'yours',
    explanation: 'Đại từ sở hữu "yours" thay thế cho "your postcard" ở cuối câu.',
    hints: [
      'Gợi ý 1: Đứng cuối câu thay thế cho tính từ sở hữu + danh từ.',
      'Gợi ý 2: yours = your postcard.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-g2',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Tokyo is one of the ________ cities in the world.',
    options: [
      'most expensive',
      'expensivest',
      'more expensive',
      'expensive'
    ],
    correctAnswer: 'most expensive',
    explanation: 'So sánh nhất với tính từ dài "expensive": the + most + adj -> "the most expensive".',
    hints: [
      'Gợi ý 1: Nhìn thấy mạo từ "the".',
      'Gợi ý 2: So sánh nhất tính từ dài dùng "most".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-g3',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Is this travel guidebook ________ or hers?',
    options: [
      'his',
      'he',
      'him',
      'he\'s'
    ],
    correctAnswer: 'his',
    explanation: 'Đại từ sở hữu "his" (của anh ấy) đứng độc lập song song với "hers".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu của "he".',
      'Gợi ý 2: his.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-g4',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'London is the ________ historic city in Europe.',
    options: [
      'most famous',
      'famousest',
      'more famous',
      'famous'
    ],
    correctAnswer: 'most famous',
    explanation: 'So sánh nhất tính từ dài "famous": the + most famous.',
    hints: [
      'Gợi ý 1: So sánh nhất có "the".',
      'Gợi ý 2: the most famous.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-g5',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Our hotel room has a balcony, but ________ doesn\'t have one.',
    options: [
      'theirs',
      'their',
      'they',
      'them'
    ],
    correctAnswer: 'theirs',
    explanation: 'Đại từ sở hữu "theirs" làm chủ ngữ thay cho "their hotel room".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu thay thế cho "their room".',
      'Gợi ý 2: theirs.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q9-g6',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Landmark 81 is the ________ building in Ho Chi Minh City.',
    options: [
      'tallest',
      'most tall',
      'taller',
      'tall'
    ],
    correctAnswer: 'tallest',
    explanation: 'So sánh nhất tính từ ngắn "tall": the + tall + est -> "the tallest".',
    hints: [
      'Gợi ý 1: "tall" là tính từ ngắn.',
      'Gợi ý 2: the + tall + est.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-g1',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'In the future, smart home robots ________ do all our household chores.',
    options: [
      'will',
      'did',
      'are',
      'were'
    ],
    correctAnswer: 'will',
    explanation: 'Dự đoán tương lai chắc chắn dùng trợ động từ "will + V_inf".',
    hints: [
      'Gợi ý 1: "In the future" = Trong tương lai.',
      'Gợi ý 2: Trợ động từ tương lai đơn là "will".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-g2',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'We ________ live in space cottages if Earth gets too crowded.',
    options: [
      'might',
      'must',
      'should',
      'can\'t'
    ],
    correctAnswer: 'might',
    explanation: 'Diễn tả khả năng có thể xảy ra ở tương lai (không chắc chắn 100%) dùng "might".',
    hints: [
      'Gợi ý 1: Diễn tả khả năng có thể xảy ra trong tương lai.',
      'Gợi ý 2: "might" = Có thể.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-g3',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Automatic solar panels ________ save a lot of clean energy for future houses.',
    options: [
      'will',
      'won\'t',
      'did',
      'didn\'t'
    ],
    correctAnswer: 'will',
    explanation: 'Dự đoán tương lai khẳng định "will save".',
    hints: [
      'Gợi ý 1: "will" + V_inf.',
      'Gợi ý 2: Tương lai đơn.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-g4',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Take an umbrella with you! It ________ rain later this afternoon.',
    options: [
      'might',
      'will not',
      'mustn\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'might',
    explanation: 'Khả năng trời có thể mưa (không chắc chắn) dùng "might".',
    hints: [
      'Gợi ý 1: Khả năng thời tiết có thể xảy ra.',
      'Gợi ý 2: "might".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-g5',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'People ________ not use traditional keys; smart locks will open by fingerprint.',
    options: [
      'will',
      'do',
      'are',
      'have'
    ],
    correctAnswer: 'will',
    explanation: 'Dạng phủ định tương lai "will not use" (sẽ không dùng).',
    hints: [
      'Gợi ý 1: "will not" = won\'t.',
      'Gợi ý 2: will not use.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-g6',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'I am not completely sure, but we ________ travel to Mars for holiday in 2050.',
    options: [
      'might',
      'will',
      'must',
      'should'
    ],
    correctAnswer: 'might',
    explanation: 'Cụm "I am not completely sure" (tôi không chắc chắn) chỉ ra hành động "might" (có thể).',
    hints: [
      'Gợi ý 1: Nhìn cụm "not completely sure".',
      'Gợi ý 2: Dùng "might" cho khả năng chưa chắc chắn.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q11-g1',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'If we recycle paper and glass, we ________ energy and natural resources.',
    options: [
      'will save',
      'save',
      'saved',
      'saving'
    ],
    correctAnswer: 'will save',
    explanation: 'Câu điều kiện loại 1: Mệnh đề "If" chia Hiện tại đơn (recycle), mệnh đề chính chia Tương lai đơn (will save).',
    hints: [
      'Gợi ý 1: Cấu trúc điều kiện loại 1: If + S + V(pres), S + will + V.',
      'Gợi ý 2: will save.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-g2',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Our school 3Rs club planted ________ apple tree in the yard yesterday.',
    options: [
      'an',
      'a',
      'the',
      'x'
    ],
    correctAnswer: 'an',
    explanation: 'Danh từ "apple tree" bắt đầu bằng nguyên âm "a" và nhắc đến lần đầu tiên -> Dùng mạo từ "an".',
    hints: [
      'Gợi ý 1: Từ "apple" bắt đầu bằng nguyên âm "a".',
      'Gợi ý 2: Dùng mạo từ "an".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-g3',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'If people ________ reusable bags for shopping, they will reduce plastic waste.',
    options: [
      'use',
      'will use',
      'used',
      'using'
    ],
    correctAnswer: 'use',
    explanation: 'Mệnh đề "If" trong câu điều kiện loại 1 chia ở thì Hiện tại đơn: If + people + use.',
    hints: [
      'Gợi ý 1: Mệnh đề chứa "If" chia thì hiện tại đơn.',
      'Gợi ý 2: "people" số nhiều đi với "use".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-g4',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Look at ________ Sun! It provides clean solar energy for our town.',
    options: [
      'the',
      'a',
      'an',
      'x'
    ],
    correctAnswer: 'the',
    explanation: 'Vật thể độc nhất vô nhị (Mặt trời - Sun) dùng mạo từ xác định "the".',
    hints: [
      'Gợi ý 1: Mặt trời là vật thể duy nhất.',
      'Gợi ý 2: Dùng mạo từ "the Sun".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-g5',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'If you turn off electrical devices when leaving, you ________ electricity.',
    options: [
      'will save',
      'save',
      'saved',
      'are saving'
    ],
    correctAnswer: 'will save',
    explanation: 'Mệnh đề chính câu điều kiện loại 1: S + will + V_inf -> "will save".',
    hints: [
      'Gợi ý 1: Mệnh đề chính điều kiện loại 1 dùng "will".',
      'Gợi ý 2: will save.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-g6',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'He wants to become ________ environmental scientist in the future.',
    options: [
      'an',
      'a',
      'the',
      'x'
    ],
    correctAnswer: 'an',
    explanation: '"environmental" bắt đầu bằng nguyên âm "e" -> Dùng mạo từ "an".',
    hints: [
      'Gợi ý 1: Từ "environmental" bắt đầu bằng âm "e".',
      'Gợi ý 2: Dùng "an".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-g1',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Shifa is the ________ doctor robot in the technology exhibition.',
    options: [
      'smartest',
      'smarter',
      'smart',
      'more smart'
    ],
    correctAnswer: 'smartest',
    explanation: 'So sánh nhất với tính từ ngắn "smart": the + smart + est -> "the smartest".',
    hints: [
      'Gợi ý 1: Có mạo từ "the" phía trước.',
      'Gợi ý 2: smart + est.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-g2',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'When my grandfather was young, he ________ run very fast.',
    options: [
      'could',
      'can',
      'will',
      'must'
    ],
    correctAnswer: 'could',
    explanation: 'Khả năng trong quá khứ ("was young") dùng động từ khuyết thiếu "could".',
    hints: [
      'Gợi ý 1: Dấu hiệu thời quá khứ "was young".',
      'Gợi ý 2: Khả năng trong quá khứ dùng "could".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-g3',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'RoboMax is the ________ worker robot in the factory.',
    options: [
      'strongest',
      'stronger',
      'most strong',
      'strong'
    ],
    correctAnswer: 'strongest',
    explanation: 'So sánh nhất tính từ ngắn "strong": the + strong + est -> "the strongest".',
    hints: [
      'Gợi ý 1: "strong" là tính từ ngắn.',
      'Gợi ý 2: the + strong + est.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-g4',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'Ten years ago, home robots ________ do complex housework like ironing clothes.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Không thể làm gì trong quá khứ ("Ten years ago") dùng "couldn\'t".',
    hints: [
      'Gợi ý 1: Dấu hiệu quá khứ "Ten years ago".',
      'Gợi ý 2: Phủ định khả năng quá khứ là "couldn\'t".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-g5',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'When I was five years old, I ________ speak English fluently.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'mustn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Không thể làm gì lúc 5 tuổi trong quá khứ dùng "couldn\'t".',
    hints: [
      'Gợi ý 1: "When I was five years old" là thời quá khứ.',
      'Gợi ý 2: couldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-g6',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: 'This space exploration robot can jump the ________ among all tested models.',
    options: [
      'highest',
      'higher',
      'most high',
      'high'
    ],
    correctAnswer: 'highest',
    explanation: 'So sánh nhất của trạng từ / tính từ ngắn "high": the + high + est -> "highest".',
    hints: [
      'Gợi ý 1: So sánh nhất nhóm "among all".',
      'Gợi ý 2: the highest.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-acl2-1',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nBa and Phong ________ judo in the school gym every Tuesday afternoon.',
    options: [
      'do',
      'does',
      'doing',
      'are do'
    ],
    correctAnswer: 'do',
    explanation: 'Chủ ngữ "Ba and Phong" là danh từ số nhiều (2 người), thì Hiện tại đơn giữ nguyên động từ "do".',
    hints: [
      'Gợi ý 1: "Ba and Phong" là chủ ngữ số ít hay số nhiều?',
      'Gợi ý 2: Số nhiều đi với động từ nguyên mẫu.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-acl2-2',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nMy new school ________ a large playground and modern science labs.',
    options: [
      'has',
      'have',
      'having',
      'is has'
    ],
    correctAnswer: 'has',
    explanation: 'Chủ ngữ "My new school" là danh từ số ít, động từ "have" chuyển thành "has" ở thì Hiện tại đơn.',
    hints: [
      'Gợi ý 1: "My new school" là danh từ số ít.',
      'Gợi ý 2: Have chuyển thành has đối với ngôi số ít.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-acl2-3',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nThey ________ ride their bicycles to school on rainy days.',
    options: [
      'don\'t',
      'doesn\'t',
      'aren\'t',
      'not'
    ],
    correctAnswer: 'don\'t',
    explanation: 'Chủ ngữ "They" dùng trợ động từ phủ định "don\'t" + V_inf trong thì Hiện tại đơn.',
    hints: [
      'Gợi ý 1: "They" đi với don\'t hay doesn\'t?',
      'Gợi ý 2: They don\'t + V.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-acl2-4',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\n________ Vy always do her homework before watching television?',
    options: [
      'Does',
      'Do',
      'Is',
      'Are'
    ],
    correctAnswer: 'Does',
    explanation: 'Trợ động từ đứng đầu câu hỏi Yes/No với chủ ngữ số ít "Vy" là "Does".',
    hints: [
      'Gợi ý 1: Chủ ngữ "Vy" là ngôi thứ 3 số ít.',
      'Gợi ý 2: Cấu trúc: Does + S + V_inf?'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-acl2-5',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nNick is very punctual. He is ________ late for school.',
    options: [
      'never',
      'always',
      'usually',
      'often'
    ],
    correctAnswer: 'never',
    explanation: '"Punctual" nghĩa là đúng giờ -> Anh ấy KHÔNG BAO GIỜ (never) đi học muộn.',
    hints: [
      'Gợi ý 1: "Punctual" = đúng giờ.',
      'Gợi ý 2: Đúng giờ nghĩa là không bao giờ (never) đi muộn.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-acl2-6',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nHow often ________ your brother play table tennis with his friends?',
    options: [
      'does',
      'do',
      'is',
      'are'
    ],
    correctAnswer: 'does',
    explanation: 'Câu hỏi "How often" với chủ ngữ số ít "your brother" dùng trợ động từ "does".',
    hints: [
      'Gợi ý 1: "your brother" số ít.',
      'Gợi ý 2: How often + does + S + V?'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-acl2-7',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nMy mother usually ________ delicious meals for our family after work.',
    options: [
      'cooks',
      'cook',
      'cooking',
      'is cook'
    ],
    correctAnswer: 'cooks',
    explanation: 'Chủ ngữ số ít "My mother" đi với động từ thêm -s "cooks" ở thì Hiện tại đơn.',
    hints: [
      'Gợi ý 1: "My mother" là số ít.',
      'Gợi ý 2: Động từ "cook" thêm đuôi "-s".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-acl2-8',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nWe ________ school uniforms on Mondays and Thursdays.',
    options: [
      'wear',
      'wears',
      'wearing',
      'are wear'
    ],
    correctAnswer: 'wear',
    explanation: 'Chủ ngữ "We" (chúng tôi) đi với động từ nguyên mẫu "wear".',
    hints: [
      'Gợi ý 1: "We" là số nhiều.',
      'Gợi ý 2: Động từ giữ nguyên.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-acl2-9',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\nWhich sentence has the correct adverb of frequency position?',
    options: [
      'An usually goes to school on time.',
      'An goes usually to school on time.',
      'Usually An goes to school on time.',
      'An goes to school on time usually.'
    ],
    correctAnswer: 'An usually goes to school on time.',
    explanation: 'Trạng từ chỉ tần suất (usually) đứng TRƯỚC động từ thường (goes).',
    hints: [
      'Gợi ý 1: Vị trí trạng từ tần suất: đứng trước động từ thường.',
      'Gợi ý 2: S + adv + V.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q1-acl2-10',
    unitId: 'unit-1',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 1]\n________ you study English lessons on Saturday evenings?',
    options: [
      'Do',
      'Does',
      'Are',
      'Is'
    ],
    correctAnswer: 'Do',
    explanation: 'Câu hỏi với chủ ngữ "you" dùng trợ động từ "Do".',
    hints: [
      'Gợi ý 1: "you" đi với trợ động từ "Do".',
      'Gợi ý 2: Do + you + V?'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-1',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThis is ________ room. There is a study table and a bookshelf inside.',
    options: [
      'Elena\'s',
      'Elena',
      'Elenas\'',
      'Elena is'
    ],
    correctAnswer: 'Elena\'s',
    explanation: 'Sở hữu cách của danh từ riêng Elena là Elena\'s (Phòng của Elena).',
    hints: [
      'Gợi ý 1: Thêm \'s vào tên riêng.',
      'Gợi ý 2: Elena\'s room.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-2',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nWhere is the clock? - It is ________ the wall, above the picture.',
    options: [
      'on',
      'in',
      'at',
      'under'
    ],
    correctAnswer: 'on',
    explanation: 'Giới từ "on the wall" dùng cho đồ vật treo trên tường.',
    hints: [
      'Gợi ý 1: Treo trên tường dùng "on".',
      'Gợi ý 2: on the wall.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-3',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThe sofa is ________ the television and the lamp in the living room.',
    options: [
      'between',
      'next to',
      'under',
      'behind'
    ],
    correctAnswer: 'between',
    explanation: 'Cấu trúc "between A and B" chỉ vị trí ở giữa 2 vật.',
    hints: [
      'Gợi ý 1: Nhìn thấy từ "and".',
      'Gợi ý 2: between... and...'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-4',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nMy ________ house is very big with a balcony and six rooms.',
    options: [
      'uncle\'s',
      'uncles',
      'uncle',
      'uncles\'s'
    ],
    correctAnswer: 'uncle\'s',
    explanation: 'Sở hữu cách cho danh từ số ít \'uncle\' là uncle\'s (Nhà của chú tôi).',
    hints: [
      'Gợi ý 1: Danh từ số ít thêm \'s.',
      'Gợi ý 2: uncle\'s house.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-5',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThe dog is sleeping ________ the table in the dining room.',
    options: [
      'under',
      'on',
      'between',
      'above'
    ],
    correctAnswer: 'under',
    explanation: 'Giới từ "under the table" nghĩa là nằm dưới gầm bàn.',
    hints: [
      'Gợi ý 1: Vị trí gầm bàn.',
      'Gợi ý 2: "under" = bên dưới.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-6',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThere is a big mirror ________ the sink in the bathroom.',
    options: [
      'above',
      'under',
      'between',
      'in'
    ],
    correctAnswer: 'above',
    explanation: 'Gương treo "above the sink" nghĩa là ở phía trên bồn rửa mặt.',
    hints: [
      'Gợi ý 1: Phía bên trên bồn rửa.',
      'Gợi ý 2: "above" = ở phía trên.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q2-acl2-7',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThese are my ________ books for the new school year.',
    options: [
      'sister\'s',
      'sisters',
      'sister',
      'sisters\'s'
    ],
    correctAnswer: 'sister\'s',
    explanation: 'Sở hữu cách \'sister\'s books\' (Sách của chị gái tôi).',
    hints: [
      'Gợi ý 1: Thêm \'s vào danh từ sister.',
      'Gợi ý 2: sister\'s.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-8',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThe garden is ________ the house, near the main entrance door.',
    options: [
      'in front of',
      'between',
      'under',
      'on'
    ],
    correctAnswer: 'in front of',
    explanation: '"in front of the house" = phía trước ngôi nhà.',
    hints: [
      'Gợi ý 1: Phía trước cổng chính.',
      'Gợi ý 2: in front of.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-9',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nThe fridge is placed ________ the kitchen cabinet.',
    options: [
      'next to',
      'between',
      'under',
      'on'
    ],
    correctAnswer: 'next to',
    explanation: '"next to" nghĩa là ở bên cạnh tủ bếp.',
    hints: [
      'Gợi ý 1: Ở bên cạnh.',
      'Gợi ý 2: next to.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-acl2-10',
    unitId: 'unit-2',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 2]\nIs this ________ coat? - No, it belongs to Nam.',
    options: [
      'Phong\'s',
      'Phong',
      'Phongs',
      'Phong is'
    ],
    correctAnswer: 'Phong\'s',
    explanation: 'Sở hữu cách: Phong\'s coat (Áo khoác của Phong).',
    hints: [
      'Gợi ý 1: Phong + \'s.',
      'Gợi ý 2: Phong\'s.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-1',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nLook! My classmates ________ a picnic on the grass.',
    options: [
      'are having',
      'have',
      'has',
      'having'
    ],
    correctAnswer: 'are having',
    explanation: 'Dấu hiệu "Look!" chia thì Hiện tại tiếp diễn: S + am/is/are + V-ing. "My classmates" số nhiều đi với "are having".',
    hints: [
      'Gợi ý 1: "Look!" chỉ hành động đang diễn ra.',
      'Gợi ý 2: S (số nhiều) + are + V-ing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-2',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nListen! The music teacher ________ a song in the auditorium.',
    options: [
      'is singing',
      'sings',
      'sing',
      'sung'
    ],
    correctAnswer: 'is singing',
    explanation: 'Dấu hiệu "Listen!" chia Hiện tại tiếp diễn với "is singing".',
    hints: [
      'Gợi ý 1: "Listen!" = Hãy lắng nghe.',
      'Gợi ý 2: is singing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-3',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nWhat ________ Nam ________ right now? - He is playing chess.',
    options: [
      'is / doing',
      'does / do',
      'are / doing',
      'do / do'
    ],
    correctAnswer: 'is / doing',
    explanation: 'Dấu hiệu "right now" với chủ ngữ số ít "Nam": What + is + Nam + doing?',
    hints: [
      'Gợi ý 1: "right now" = ngay bây giờ.',
      'Gợi ý 2: Nam đi với "is".'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-4',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nThey ________ not watching TV now; they are doing homework.',
    options: [
      'are',
      'do',
      'is',
      'did'
    ],
    correctAnswer: 'are',
    explanation: 'Phủ định hiện tại tiếp diễn: They + are + not + V-ing.',
    hints: [
      'Gợi ý 1: "They" đi với tobe "are".',
      'Gợi ý 2: They are not.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-5',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nBe quiet! The baby ________ in her crib.',
    options: [
      'is sleeping',
      'sleeps',
      'sleep',
      'slept'
    ],
    correctAnswer: 'is sleeping',
    explanation: '"Be quiet!" -> Thì hiện tại tiếp diễn "is sleeping".',
    hints: [
      'Gợi ý 1: Cảnh báo hãy trật tự.',
      'Gợi ý 2: is sleeping.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-6',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nAt the moment, Mai ________ a letter to her pen friend in London.',
    options: [
      'is writing',
      'writes',
      'write',
      'wrote'
    ],
    correctAnswer: 'is writing',
    explanation: 'Dấu hiệu "At the moment" chia "is writing".',
    hints: [
      'Gợi ý 1: "At the moment" = lúc này.',
      'Gợi ý 2: is writing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-7',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nWhy ________ you ________ your jacket inside the warm house?',
    options: [
      'are / wearing',
      'do / wear',
      'is / wearing',
      'did / wear'
    ],
    correctAnswer: 'are / wearing',
    explanation: 'Hỏi về hành động mặc áo khoác lúc này: Why + are + you + wearing?',
    hints: [
      'Gợi ý 1: Hành động đang xảy ra với "you".',
      'Gợi ý 2: are you wearing.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q3-acl2-8',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nPhong and Duy ________ basketball in the sports center today.',
    options: [
      'are playing',
      'play',
      'plays',
      'played'
    ],
    correctAnswer: 'are playing',
    explanation: 'Hành động diễn ra hôm nay "today" dùng "are playing".',
    hints: [
      'Gợi ý 1: Chủ ngữ Phong and Duy là số nhiều.',
      'Gợi ý 2: are playing.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-acl2-9',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nLook at the clouds! It ________ to rain very soon.',
    options: [
      'is starting',
      'starts',
      'started',
      'start'
    ],
    correctAnswer: 'is starting',
    explanation: 'Hành động nhìn thấy mây đen đang sắp mưa -> "is starting".',
    hints: [
      'Gợi ý 1: Look at...! chỉ việc đang xảy ra.',
      'Gợi ý 2: is starting.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q3-acl2-10',
    unitId: 'unit-3',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 3]\nShe ________ for her glasses right now because she lost them.',
    options: [
      'is looking',
      'looks',
      'looked',
      'look'
    ],
    correctAnswer: 'is looking',
    explanation: 'Dấu hiệu "right now" -> "is looking".',
    hints: [
      'Gợi ý 1: right now.',
      'Gợi ý 2: is looking.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-1',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nThis street is ________ than that one near the market.',
    options: [
      'wider',
      'more wide',
      'widest',
      'wide'
    ],
    correctAnswer: 'wider',
    explanation: 'Tính từ ngắn "wide" chỉ cần thêm "-r" trong so sánh hơn -> "wider".',
    hints: [
      'Gợi ý 1: Tính từ "wide" đã có chữ "e".',
      'Gợi ý 2: wider than.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-2',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nLife in the countryside is ________ than in big cities.',
    options: [
      'more peaceful',
      'peacefuler',
      'peaceful',
      'most peaceful'
    ],
    correctAnswer: 'more peaceful',
    explanation: 'Tính từ dài "peaceful" dùng "more peaceful than".',
    hints: [
      'Gợi ý 1: "peaceful" là tính từ 2 âm tiết.',
      'Gợi ý 2: more peaceful.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-3',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nThe air in the mountain area is ________ than in the industrial park.',
    options: [
      'fresher',
      'more fresh',
      'freshest',
      'fresh'
    ],
    correctAnswer: 'fresher',
    explanation: 'Tính từ ngắn "fresh" -> "fresher".',
    hints: [
      'Gợi ý 1: "fresh" là tính từ 1 âm tiết.',
      'Gợi ý 2: fresher.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-4',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nThe supermarket is ________ than the small corner shop.',
    options: [
      'more convenient',
      'convenienter',
      'convenient',
      'most convenient'
    ],
    correctAnswer: 'more convenient',
    explanation: 'Tính từ dài "convenient" -> "more convenient".',
    hints: [
      'Gợi ý 1: "convenient" là tính từ dài.',
      'Gợi ý 2: more convenient.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-5',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nHotels in Paris are ________ than those in Hanoi.',
    options: [
      'more expensive',
      'expensiver',
      'expensive',
      'most expensive'
    ],
    correctAnswer: 'more expensive',
    explanation: 'Tính từ dài "expensive" -> "more expensive".',
    hints: [
      'Gợi ý 1: "expensive" 3 âm tiết.',
      'Gợi ý 2: more expensive.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-6',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nThe weather today is ________ than yesterday.',
    options: [
      'hotter',
      'more hot',
      'hottest',
      'hot'
    ],
    correctAnswer: 'hotter',
    explanation: 'Tính từ "hot" gấp đôi phụ âm cuối trước khi thêm "-er" -> "hotter".',
    hints: [
      'Gợi ý 1: "hot" có 1 nguyên âm đứng giữa 2 phụ âm.',
      'Gợi ý 2: Gấp đôi chữ t -> hotter.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q4-acl2-7',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nMy neighbourhood is ________ than yours; there are fewer vehicles.',
    options: [
      'quieter',
      'more quiet',
      'quietest',
      'quiet'
    ],
    correctAnswer: 'quieter',
    explanation: 'Tính từ "quiet" dùng dạng so sánh hơn "quieter".',
    hints: [
      'Gợi ý 1: "quiet" -> "quieter".',
      'Gợi ý 2: quieter than.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-8',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nThis museum is ________ than the old cathedral.',
    options: [
      'more modern',
      'moderner',
      'modern',
      'most modern'
    ],
    correctAnswer: 'more modern',
    explanation: 'Tính từ dài "modern" -> "more modern".',
    hints: [
      'Gợi ý 1: "modern" dùng với "more".',
      'Gợi ý 2: more modern.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-acl2-9',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nThe central square is ________ than the narrow alley.',
    options: [
      'busier',
      'more busy',
      'busiest',
      'busy'
    ],
    correctAnswer: 'busier',
    explanation: '"busy" -> đổi "y" thành "i" rồi thêm "-er" thành "busier".',
    hints: [
      'Gợi ý 1: Đuôi -y đổi thành -ier.',
      'Gợi ý 2: busier.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q4-acl2-10',
    unitId: 'unit-4',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 4]\nTraveling by bus is ________ than taking a taxi.',
    options: [
      'cheaper',
      'more cheap',
      'cheapest',
      'cheap'
    ],
    correctAnswer: 'cheaper',
    explanation: 'Tính từ ngắn "cheap" -> "cheaper".',
    hints: [
      'Gợi ý 1: "cheap" + er.',
      'Gợi ý 2: cheaper.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-1',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nYou ________ drop litter in the national park. It damages the environment!',
    options: [
      'mustn\'t',
      'must',
      'can',
      'should'
    ],
    correctAnswer: 'mustn\'t',
    explanation: 'Hành vi cấm vứt rác gây tổn hại môi trường dùng "mustn\'t".',
    hints: [
      'Gợi ý 1: Hành vi cấm làm.',
      'Gợi ý 2: mustn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-2',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nVisitors ________ wear warm clothes when visiting Mount Fansipan in winter.',
    options: [
      'must',
      'mustn\'t',
      'can\'t',
      'wouldn\'t'
    ],
    correctAnswer: 'must',
    explanation: 'Việc cần thiết phải mặc ấm khi lên đỉnh núi tuyết lạnh -> "must".',
    hints: [
      'Gợi ý 1: Cần thiết phải làm.',
      'Gợi ý 2: must.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-3',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nHow ________ fresh water do we need for the 3-day camping trip?',
    options: [
      'much',
      'many',
      'some',
      'any'
    ],
    correctAnswer: 'much',
    explanation: '"water" là danh từ không đếm được -> Dùng "How much".',
    hints: [
      'Gợi ý 1: Danh từ nước (water) không đếm được.',
      'Gợi ý 2: How much.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-4',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nHow ________ plaster rolls are left in the medical kit?',
    options: [
      'many',
      'much',
      'some',
      'a little'
    ],
    correctAnswer: 'many',
    explanation: '"plaster rolls" (cuộn băng gạc) là danh từ số nhiều đếm được -> "How many".',
    hints: [
      'Gợi ý 1: Cuộn băng gạc đếm được.',
      'Gợi ý 2: How many.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-5',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nYou ________ swim in this river; the current is very strong and dangerous.',
    options: [
      'mustn\'t',
      'must',
      'should',
      'can'
    ],
    correctAnswer: 'mustn\'t',
    explanation: 'Dòng nước siết nguy hiểm -> Cấm bơi "mustn\'t".',
    hints: [
      'Gợi ý 1: Nguy hiểm cấm bơi.',
      'Gợi ý 2: mustn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-6',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nWe need ________ suncream to protect our skin on the sunny beach.',
    options: [
      'some',
      'any',
      'many',
      'few'
    ],
    correctAnswer: 'some',
    explanation: 'Câu khẳng định dùng "some" trước danh từ không đếm được "suncream".',
    hints: [
      'Gợi ý 1: Câu khẳng định.',
      'Gợi ý 2: some suncream.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-7',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nYou ________ bring a compass when exploring the deep forest.',
    options: [
      'must',
      'mustn\'t',
      'can\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'must',
    explanation: 'Bắt buộc mang theo la bàn để tránh lạc trong rừng sâu -> "must".',
    hints: [
      'Gợi ý 1: Bắt buộc để không bị lạc.',
      'Gợi ý 2: must.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-8',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nAre there ________ sleeping bags in the storage tent?',
    options: [
      'any',
      'some',
      'much',
      'a little'
    ],
    correctAnswer: 'any',
    explanation: 'Câu hỏi Yes/No dùng "any" trước danh từ đếm được số nhiều.',
    hints: [
      'Gợi ý 1: Câu hỏi dùng "any".',
      'Gợi ý 2: any.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-9',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nYou ________ make campfires in dry pine forests without permission.',
    options: [
      'mustn\'t',
      'must',
      'can',
      'should'
    ],
    correctAnswer: 'mustn\'t',
    explanation: 'Cấm đốt lửa trại trong rừng thông khô -> "mustn\'t".',
    hints: [
      'Gợi ý 1: Hành vi nghiêm cấm.',
      'Gợi ý 2: mustn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-acl2-10',
    unitId: 'unit-5',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 5]\nHow ________ luggage can we carry on the boat tour?',
    options: [
      'much',
      'many',
      'some',
      'few'
    ],
    correctAnswer: 'much',
    explanation: '"luggage" (hành lý) là danh từ không đếm được -> "How much".',
    hints: [
      'Gợi ý 1: "luggage" không đếm được.',
      'Gợi ý 2: How much luggage.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q6-acl2-1',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nChildren ________ ask for lucky money greedily during Tet visits.',
    options: [
      'shouldn\'t',
      'should',
      'must',
      'can'
    ],
    correctAnswer: 'shouldn\'t',
    explanation: 'Khuyên trẻ em không nên đòi tiền mừng tuổi một cách tham lam -> "shouldn\'t".',
    hints: [
      'Gợi ý 1: Lời khuyên không nên.',
      'Gợi ý 2: shouldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-2',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nWe ________ help clean and decorate our house before New Year.',
    options: [
      'should',
      'shouldn\'t',
      'mustn\'t',
      'couldn\'t'
    ],
    correctAnswer: 'should',
    explanation: 'Nên giúp bố mẹ trang trí dọn dẹp nhà dịp Tết -> "should".',
    hints: [
      'Gợi ý 1: Lời khuyên nên làm.',
      'Gợi ý 2: should.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-3',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nDo you have ________ peach blossom trees in your garden?',
    options: [
      'any',
      'some',
      'much',
      'a little'
    ],
    correctAnswer: 'any',
    explanation: 'Câu hỏi nghi vấn dùng "any" trước danh từ số nhiều.',
    hints: [
      'Gợi ý 1: Câu hỏi dùng "any".',
      'Gợi ý 2: any.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-4',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nMy grandmother made ________ banh chung for our family gathering.',
    options: [
      'some',
      'any',
      'much',
      'a'
    ],
    correctAnswer: 'some',
    explanation: 'Câu khẳng định dùng "some banh chung".',
    hints: [
      'Gợi ý 1: Câu khẳng định.',
      'Gợi ý 2: some.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-5',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nYou ________ sweep the floor on the first day of Tet.',
    options: [
      'shouldn\'t',
      'should',
      'must',
      'can'
    ],
    correctAnswer: 'shouldn\'t',
    explanation: 'Theo phong tục không nên quét nhà ngày mùng 1 Tết -> "shouldn\'t".',
    hints: [
      'Gợi ý 1: Phong tục không nên làm.',
      'Gợi ý 2: shouldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-6',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nWe ________ wish our relatives happiness and good health in the New Year.',
    options: [
      'should',
      'shouldn\'t',
      'mustn\'t',
      'can\'t'
    ],
    correctAnswer: 'should',
    explanation: 'Nên chúc Tết người thân -> "should".',
    hints: [
      'Gợi ý 1: Việc nên làm.',
      'Gợi ý 2: should.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-7',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nIs there ________ red envelope left on the table?',
    options: [
      'any',
      'some',
      'many',
      'few'
    ],
    correctAnswer: 'any',
    explanation: 'Câu hỏi nghi vấn dùng "any".',
    hints: [
      'Gợi ý 1: Câu hỏi.',
      'Gợi ý 2: any.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-8',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nPeople ________ stay up late every night during Tet to stay healthy.',
    options: [
      'shouldn\'t',
      'should',
      'must',
      'could'
    ],
    correctAnswer: 'shouldn\'t',
    explanation: 'Không nên thức quá khuya -> "shouldn\'t".',
    hints: [
      'Gợi ý 1: Lời khuyên giữ sức khỏe.',
      'Gợi ý 2: shouldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-9',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nWe bought ________ fireworks to watch on New Year\'s Eve.',
    options: [
      'some',
      'any',
      'much',
      'a little'
    ],
    correctAnswer: 'some',
    explanation: 'Câu khẳng định dùng "some".',
    hints: [
      'Gợi ý 1: Câu khẳng định.',
      'Gợi ý 2: some.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-acl2-10',
    unitId: 'unit-6',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 6]\nYou ________ wear dark clothes on New Year\'s Day; wear bright ones instead.',
    options: [
      'shouldn\'t',
      'should',
      'must',
      'can'
    ],
    correctAnswer: 'shouldn\'t',
    explanation: 'Khuyên không nên mặc đồ tối màu ngày Tết -> "shouldn\'t".',
    hints: [
      'Gợi ý 1: Nên mặc đồ sáng màu thay vì đồ tối.',
      'Gợi ý 2: shouldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-1',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\n________ is your favourite game show host? - It is Mr. Lai Van Sam.',
    options: [
      'Who',
      'What',
      'Where',
      'When'
    ],
    correctAnswer: 'Who',
    explanation: 'Hỏi về người (MC dẫn chương trình) dùng "Who".',
    hints: [
      'Gợi ý 1: Hỏi về người.',
      'Gợi ý 2: Who.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-2',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\nThe cartoon is funny, ________ I watch it every evening.',
    options: [
      'so',
      'because',
      'but',
      'or'
    ],
    correctAnswer: 'so',
    explanation: 'Mệnh đề kết quả (phim hài hước NÊN tôi xem mỗi tối) dùng "so".',
    hints: [
      'Gợi ý 1: Mệnh đề chỉ kết quả.',
      'Gợi ý 2: so = vì thế.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-3',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\n________ do you usually watch TV? - In the living room.',
    options: [
      'Where',
      'When',
      'Why',
      'What'
    ],
    correctAnswer: 'Where',
    explanation: 'Hỏi về địa điểm (In the living room) dùng "Where".',
    hints: [
      'Gợi ý 1: Hỏi về vị trí / địa điểm.',
      'Gợi ý 2: Where.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-4',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\nI want to watch the football match, ________ I must finish my homework first.',
    options: [
      'but',
      'so',
      'because',
      'and'
    ],
    correctAnswer: 'but',
    explanation: 'Mệnh đề thể hiện sự đối lập (Muốn xem NHƯNG phải làm bài trước) dùng "but".',
    hints: [
      'Gợi ý 1: Sự đối lập.',
      'Gợi ý 2: but = nhưng.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-5',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\n________ do you watch the educational program? - At 8 p.m on Saturdays.',
    options: [
      'When',
      'Where',
      'Why',
      'Who'
    ],
    correctAnswer: 'When',
    explanation: 'Hỏi về thời gian (At 8 p.m) dùng từ hỏi "When".',
    hints: [
      'Gợi ý 1: Hỏi thời gian.',
      'Gợi ý 2: When.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-6',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\nHe turned off the TV ________ he wanted to go to bed early.',
    options: [
      'because',
      'so',
      'but',
      'and'
    ],
    correctAnswer: 'because',
    explanation: 'Mệnh đề chỉ nguyên nhân (BỞI VÌ muốn ngủ sớm) dùng "because".',
    hints: [
      'Gợi ý 1: Nguyên nhân.',
      'Gợi ý 2: because.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-7',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\n________ is the title of the documentary film? - It is "The Green Planet".',
    options: [
      'What',
      'Who',
      'Where',
      'Why'
    ],
    correctAnswer: 'What',
    explanation: 'Hỏi về tiêu đề bộ phim dùng từ hỏi "What".',
    hints: [
      'Gợi ý 1: Hỏi cái gì / tiêu đề gì.',
      'Gợi ý 2: What.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-8',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\nThe game show is exciting ________ educational for Grade 6 students.',
    options: [
      'and',
      'but',
      'so',
      'because'
    ],
    correctAnswer: 'and',
    explanation: 'Bổ sung thêm 2 tính từ tích cực (vừa hấp dẫn VÀ vừa có tính giáo dục) dùng "and".',
    hints: [
      'Gợi ý 1: Nối 2 tính từ cùng chiều.',
      'Gợi ý 2: and.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-9',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\n________ do children love watching Tom and Jerry? - Because it makes them laugh.',
    options: [
      'Why',
      'What',
      'When',
      'Where'
    ],
    correctAnswer: 'Why',
    explanation: 'Trả lời nguyên nhân bởi vì (Because...) -> Từ hỏi là "Why".',
    hints: [
      'Gợi ý 1: Hỏi lý do.',
      'Gợi ý 2: Why.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-acl2-10',
    unitId: 'unit-7',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 7]\nShe missed the talent show ________ her laptop ran out of battery.',
    options: [
      'because',
      'so',
      'but',
      'and'
    ],
    correctAnswer: 'because',
    explanation: 'Mệnh đề nguyên nhân dùng "because".',
    hints: [
      'Gợi ý 1: Chỉ lý do hết pin.',
      'Gợi ý 2: because.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-1',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\nLast Sunday, my brother ________ the first prize in the chess competition.',
    options: [
      'won',
      'win',
      'wins',
      'winning'
    ],
    correctAnswer: 'won',
    explanation: 'Dấu hiệu "Last Sunday" chia thì Quá khứ đơn của động từ bất quy tắc win -> "won".',
    hints: [
      'Gợi ý 1: "Last Sunday" chỉ thời quá khứ.',
      'Gợi ý 2: win -> won.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-2',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\n________ your sports shoes before entering the badminton court!',
    options: [
      'Put on',
      'Putting on',
      'Putted on',
      'Puts on'
    ],
    correctAnswer: 'Put on',
    explanation: 'Câu mệnh lệnh khẳng định bắt đầu bằng động từ nguyên mẫu: "Put on...!".',
    hints: [
      'Gợi ý 1: Mệnh lệnh bắt đầu bằng động từ nguyên mẫu.',
      'Gợi ý 2: Put on.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-3',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\nWe ________ a great swimming lesson yesterday afternoon.',
    options: [
      'had',
      'have',
      'has',
      'having'
    ],
    correctAnswer: 'had',
    explanation: 'Dấu hiệu "yesterday afternoon" chia quá khứ đơn of have -> "had".',
    hints: [
      'Gợi ý 1: Quá khứ của have.',
      'Gợi ý 2: had.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-4',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\nDon\'t ________ fast on the wet playground! You might fall.',
    options: [
      'run',
      'running',
      'ran',
      'runs'
    ],
    correctAnswer: 'run',
    explanation: 'Mệnh lệnh phủ định: Don\'t + V_inf -> "Don\'t run".',
    hints: [
      'Gợi ý 1: Don\'t + động từ nguyên mẫu.',
      'Gợi ý 2: run.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-5',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\nPhong ________ a new pair of goggles for swimming last Saturday.',
    options: [
      'bought',
      'buy',
      'buys',
      'buying'
    ],
    correctAnswer: 'bought',
    explanation: 'Quá khứ của buy (last Saturday) -> "bought".',
    hints: [
      'Gợi ý 1: buy -> bought.',
      'Gợi ý 2: bought.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-6',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\n________ warm-up exercises carefully before running the marathon!',
    options: [
      'Do',
      'Doing',
      'Did',
      'Done'
    ],
    correctAnswer: 'Do',
    explanation: 'Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu "Do".',
    hints: [
      'Gợi ý 1: Động từ nguyên mẫu đầu câu mệnh lệnh.',
      'Gợi ý 2: Do.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-7',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\n________ you see the basketball match on TV last night?',
    options: [
      'Did',
      'Do',
      'Are',
      'Were'
    ],
    correctAnswer: 'Did',
    explanation: 'Trợ động từ quá khứ đơn trong câu hỏi nghi vấn là "Did".',
    hints: [
      'Gợi ý 1: "last night" thời quá khứ.',
      'Gợi ý 2: Did + S + V?'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-8',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\nDon\'t ________ late for physical education class tomorrow!',
    options: [
      'be',
      'is',
      'are',
      'was'
    ],
    correctAnswer: 'be',
    explanation: 'Mệnh lệnh phủ định với tính từ: Don\'t + be + adj.',
    hints: [
      'Gợi ý 1: Don\'t be late.',
      'Gợi ý 2: be.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-9',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\nMy team ________ win the karate match two days ago.',
    options: [
      'didn\'t',
      'doesn\'t',
      'isn\'t',
      'wasn\'t'
    ],
    correctAnswer: 'didn\'t',
    explanation: 'Trợ động từ phủ định quá khứ đơn "didn\'t + V_inf".',
    hints: [
      'Gợi ý 1: "two days ago" thời quá khứ.',
      'Gợi ý 2: didn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-acl2-10',
    unitId: 'unit-8',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 8]\n________ quiet when the referee is talking!',
    options: [
      'Keep',
      'Keeping',
      'Kept',
      'Keeps'
    ],
    correctAnswer: 'Keep',
    explanation: 'Mệnh lệnh "Keep quiet!" (Hãy giữ trật tự!).',
    hints: [
      'Gợi ý 1: Mệnh lệnh khẳng định.',
      'Gợi ý 2: Keep.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-1',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nThis travel map is mine, and that camera is ________.',
    options: [
      'yours',
      'your',
      'you',
      'yours\''
    ],
    correctAnswer: 'yours',
    explanation: 'Đại từ sở hữu "yours" đứng ở cuối câu thay cho "your camera".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu.',
      'Gợi ý 2: yours.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-2',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nLondon is the ________ historic city I have ever visited.',
    options: [
      'most famous',
      'famousest',
      'more famous',
      'famous'
    ],
    correctAnswer: 'most famous',
    explanation: 'So sánh nhất tính từ dài "the most famous".',
    hints: [
      'Gợi ý 1: Có mạo từ "the".',
      'Gợi ý 2: the most famous.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-3',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nIs this red suitcase ________ or hers?',
    options: [
      'his',
      'he',
      'him',
      'he\'s'
    ],
    correctAnswer: 'his',
    explanation: 'Đại từ sở hữu "his" song song với "hers".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu của he.',
      'Gợi ý 2: his.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-4',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nTokyo is one of the ________ cities in Asia.',
    options: [
      'cleanest',
      'cleaner',
      'most clean',
      'clean'
    ],
    correctAnswer: 'cleanest',
    explanation: 'So sánh nhất tính từ ngắn "clean" -> "the cleanest".',
    hints: [
      'Gợi ý 1: "clean" là tính từ ngắn.',
      'Gợi ý 2: the cleanest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-5',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nOur postcard arrived today, but ________ hasn\'t arrived yet.',
    options: [
      'theirs',
      'their',
      'they',
      'them'
    ],
    correctAnswer: 'theirs',
    explanation: 'Đại từ sở hữu "theirs" làm chủ ngữ thay cho "their postcard".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu thay thế cho their postcard.',
      'Gợi ý 2: theirs.'
    ],
    difficulty: 'Trung bình'
  },
  {
    id: 'q9-acl2-6',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nWhat is the ________ skyscraper in Southeast Asia?',
    options: [
      'tallest',
      'most tall',
      'taller',
      'tall'
    ],
    correctAnswer: 'tallest',
    explanation: 'So sánh nhất tính từ ngắn "tall" -> "the tallest".',
    hints: [
      'Gợi ý 1: tall + est.',
      'Gợi ý 2: tallest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-7',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nMy hotel room has a city view, but ________ has a sea view.',
    options: [
      'hers',
      'her',
      'she',
      'hers\''
    ],
    correctAnswer: 'hers',
    explanation: 'Đại từ sở hữu "hers" thay thế cho "her hotel room".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu của she.',
      'Gợi ý 2: hers.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-8',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nMount Everest is the ________ mountain on Earth.',
    options: [
      'highest',
      'higher',
      'most high',
      'high'
    ],
    correctAnswer: 'highest',
    explanation: 'So sánh nhất "the highest".',
    hints: [
      'Gợi ý 1: high + est.',
      'Gợi ý 2: highest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-9',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nYour passport is in your bag, but where is ________?',
    options: [
      'mine',
      'my',
      'I',
      'me'
    ],
    correctAnswer: 'mine',
    explanation: 'Đại từ sở hữu "mine" thay thế cho "my passport".',
    hints: [
      'Gợi ý 1: Đại từ sở hữu của I.',
      'Gợi ý 2: mine.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-acl2-10',
    unitId: 'unit-9',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 9]\nHa Long Bay is one of the ________ natural attractions in Vietnam.',
    options: [
      'most popular',
      'popularer',
      'popular',
      'more popular'
    ],
    correctAnswer: 'most popular',
    explanation: 'So sánh nhất "the most popular".',
    hints: [
      'Gợi ý 1: popular 3 âm tiết.',
      'Gợi ý 2: most popular.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-1',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nIn 2050, smart home robots ________ clean all rooms automatically.',
    options: [
      'will',
      'did',
      'are',
      'were'
    ],
    correctAnswer: 'will',
    explanation: 'Dự đoán tương lai chắc chắn dùng "will".',
    hints: [
      'Gợi ý 1: Mốc thời gian tương lai 2050.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-2',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nWe ________ live in floating houses if sea levels rise in the future.',
    options: [
      'might',
      'must',
      'should',
      'can\'t'
    ],
    correctAnswer: 'might',
    explanation: 'Diễn tả khả năng tương lai có thể xảy ra dùng "might".',
    hints: [
      'Gợi ý 1: Khả năng tương lai không chắc chắn 100%.',
      'Gợi ý 2: might.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-3',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nSolar panels on roof ________ produce clean electricity for our house.',
    options: [
      'will',
      'won\'t',
      'did',
      'didn\'t'
    ],
    correctAnswer: 'will',
    explanation: 'Dự đoán tương lai khẳng định "will produce".',
    hints: [
      'Gợi ý 1: will + V.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-4',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nI am not sure, but we ________ travel to Mars for summer vacation.',
    options: [
      'might',
      'will',
      'must',
      'should'
    ],
    correctAnswer: 'might',
    explanation: 'Cụm "not sure" đi với "might".',
    hints: [
      'Gợi ý 1: "not sure" = chưa chắc chắn.',
      'Gợi ý 2: might.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-5',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nFuture houses ________ not use traditional coal energy.',
    options: [
      'will',
      'do',
      'are',
      'have'
    ],
    correctAnswer: 'will',
    explanation: 'Dạng phủ định "will not use".',
    hints: [
      'Gợi ý 1: will not use.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-6',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nSmart fridges ________ order food online when it runs out.',
    options: [
      'will',
      'did',
      'were',
      'are'
    ],
    correctAnswer: 'will',
    explanation: 'Tương lai đơn "will order".',
    hints: [
      'Gợi ý 1: Dự đoán thiết bị thông minh tương lai.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-7',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nHi-tech robots ________ replace human workers in dangerous places.',
    options: [
      'will',
      'did',
      'are',
      'were'
    ],
    correctAnswer: 'will',
    explanation: 'Dự đoán tương lai "will replace".',
    hints: [
      'Gợi ý 1: Tương lai đơn.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-8',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nTake an umbrella! It ________ rain later in the evening.',
    options: [
      'might',
      'will not',
      'mustn\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'might',
    explanation: 'Khả năng thời tiết có thể mưa "might".',
    hints: [
      'Gợi ý 1: Khả năng thời tiết.',
      'Gợi ý 2: might.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-9',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nPeople ________ drive flying cars in 2080.',
    options: [
      'might',
      'did',
      'were',
      'are'
    ],
    correctAnswer: 'might',
    explanation: 'Khả năng tương lai "might".',
    hints: [
      'Gợi ý 1: mốc thời gian 2080.',
      'Gợi ý 2: might.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-acl2-10',
    unitId: 'unit-10',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 10]\nAutomatic doors ________ open when you walk close to them.',
    options: [
      'will',
      'did',
      'were',
      'are'
    ],
    correctAnswer: 'will',
    explanation: 'Hành động của cửa tự động "will open".',
    hints: [
      'Gợi ý 1: will + V_inf.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-1',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nIf students plant more trees, the air ________ cleaner.',
    options: [
      'will become',
      'becomes',
      'became',
      'becoming'
    ],
    correctAnswer: 'will become',
    explanation: 'Mệnh đề chính câu điều kiện loại 1: S + will + V_inf -> "will become".',
    hints: [
      'Gợi ý 1: Mệnh đề chính của câu điều kiện 1.',
      'Gợi ý 2: will + V.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-2',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nLook at ________ Moon tonight! It is full and shining brightly.',
    options: [
      'the',
      'a',
      'an',
      'x'
    ],
    correctAnswer: 'the',
    explanation: 'Vật thể độc nhất vô nhị (Mặt trăng) dùng mạo từ "the".',
    hints: [
      'Gợi ý 1: Mặt trăng là vật thể duy nhất.',
      'Gợi ý 2: the Moon.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-3',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nIf we ________ plastic bottles, we will protect the marine life.',
    options: [
      'recycle',
      'will recycle',
      'recycled',
      'recycling'
    ],
    correctAnswer: 'recycle',
    explanation: 'Mệnh đề If chia Hiện tại đơn: If + we + recycle.',
    hints: [
      'Gợi ý 1: Mệnh đề chứa If chia hiện tại đơn.',
      'Gợi ý 2: recycle.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-4',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nOur 3Rs club member is ________ active student.',
    options: [
      'an',
      'a',
      'the',
      'x'
    ],
    correctAnswer: 'an',
    explanation: 'Từ "active" bắt đầu bằng nguyên âm "a" -> dùng "an".',
    hints: [
      'Gợi ý 1: Nguyên âm a.',
      'Gợi ý 2: an active.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-5',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nIf you turn off the tap while brushing teeth, you ________ water.',
    options: [
      'will save',
      'save',
      'saved',
      'are saving'
    ],
    correctAnswer: 'will save',
    explanation: 'Mệnh đề chính điều kiện loại 1 dùng "will save".',
    hints: [
      'Gợi ý 1: will + V.',
      'Gợi ý 2: will save.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-6',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nMy father works as ________ environmental officer.',
    options: [
      'an',
      'a',
      'the',
      'x'
    ],
    correctAnswer: 'an',
    explanation: 'Từ "environmental" bắt đầu bằng nguyên âm "e" -> "an".',
    hints: [
      'Gợi ý 1: Bắt đầu bằng âm e.',
      'Gợi ý 2: an.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-7',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nIf people ________ reusable bags, plastic waste will decrease.',
    options: [
      'use',
      'will use',
      'used',
      'using'
    ],
    correctAnswer: 'use',
    explanation: 'Mệnh đề If chia hiện tại đơn "use".',
    hints: [
      'Gợi ý 1: If + S + V(pres).',
      'Gợi ý 2: use.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-8',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\n________ Sun is the main source of renewable energy on Earth.',
    options: [
      'The',
      'A',
      'An',
      'X'
    ],
    correctAnswer: 'The',
    explanation: 'Vật thể độc nhất "The Sun".',
    hints: [
      'Gợi ý 1: Mặt trời dùng The.',
      'Gợi ý 2: The.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-9',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nIf we throw trash into rivers, fish ________ die.',
    options: [
      'will',
      'did',
      'are',
      'were'
    ],
    correctAnswer: 'will',
    explanation: 'Mệnh đề chính điều kiện 1: "will die".',
    hints: [
      'Gợi ý 1: will + V.',
      'Gợi ý 2: will.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-acl2-10',
    unitId: 'unit-11',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 11]\nWe should buy ________ reusable water bottle for daily use.',
    options: [
      'a',
      'an',
      'the',
      'x'
    ],
    correctAnswer: 'a',
    explanation: 'Từ "reusable" bắt đầu bằng phụ âm /r/ -> dùng "a".',
    hints: [
      'Gợi ý 1: Từ reusable bắt đầu bằng phụ âm.',
      'Gợi ý 2: a.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-1',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nShifa is the ________ doctor robot in our smart hospital.',
    options: [
      'smartest',
      'smarter',
      'smart',
      'more smart'
    ],
    correctAnswer: 'smartest',
    explanation: 'So sánh nhất "the smartest".',
    hints: [
      'Gợi ý 1: the + smart + est.',
      'Gợi ý 2: smartest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-2',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nWhen my grandfather was young, he ________ run very fast.',
    options: [
      'could',
      'can',
      'will',
      'must'
    ],
    correctAnswer: 'could',
    explanation: 'Khả năng trong quá khứ ("was young") -> "could".',
    hints: [
      'Gợi ý 1: Quá khứ của can là could.',
      'Gợi ý 2: could.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-3',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nRoboMax is the ________ worker robot in the factory.',
    options: [
      'strongest',
      'stronger',
      'most strong',
      'strong'
    ],
    correctAnswer: 'strongest',
    explanation: 'So sánh nhất "the strongest".',
    hints: [
      'Gợi ý 1: strong + est.',
      'Gợi ý 2: strongest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-4',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nTen years ago, home robots ________ iron clothes automatically.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Không thể trong quá khứ ("Ten years ago") -> "couldn\'t".',
    hints: [
      'Gợi ý 1: Quá khứ của can\'t là couldn\'t.',
      'Gợi ý 2: couldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-5',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nWhen I was five years old, I ________ swim in deep water.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'mustn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Khả năng phủ định quá khứ lúc 5 tuổi -> "couldn\'t".',
    hints: [
      'Gợi ý 1: Thời quá khứ lúc 5 tuổi.',
      'Gợi ý 2: couldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-6',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nThis robot model can jump the ________ in the competition.',
    options: [
      'highest',
      'higher',
      'most high',
      'high'
    ],
    correctAnswer: 'highest',
    explanation: 'So sánh nhất "the highest".',
    hints: [
      'Gợi ý 1: high + est.',
      'Gợi ý 2: highest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-7',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nIn 1995, scientists ________ create AI robots with human voice recognition.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Mốc thời gian quá khứ 1995 -> "couldn\'t".',
    hints: [
      'Gợi ý 1: Mốc quá khứ 1995.',
      'Gợi ý 2: couldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-8',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nLast year, my brother ________ speak English fluently, but now he can.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'shouldn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Năm ngoái chưa thể -> "couldn\'t".',
    hints: [
      'Gợi ý 1: Dấu hiệu "Last year".',
      'Gợi ý 2: couldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-9',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nWhat is the ________ robot in the world exhibition?',
    options: [
      'fastest',
      'faster',
      'most fast',
      'fast'
    ],
    correctAnswer: 'fastest',
    explanation: 'So sánh nhất tính từ ngắn "fast" -> "the fastest".',
    hints: [
      'Gợi ý 1: fast + est.',
      'Gợi ý 2: fastest.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-acl2-10',
    unitId: 'unit-12',
    skill: 'Grammar',
    type: 'multiple-choice',
    content: '📌 [A CLOSER LOOK 2 - UNIT 12]\nIn the 20th century, robots ________ perform surgical operations like today.',
    options: [
      'couldn\'t',
      'can\'t',
      'won\'t',
      'mustn\'t'
    ],
    correctAnswer: 'couldn\'t',
    explanation: 'Thế kỷ 20 trong quá khứ -> "couldn\'t".',
    hints: [
      'Gợi ý 1: Quá khứ ở thế kỷ 20.',
      'Gợi ý 2: couldn\'t.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v1',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We use a ________ to draw accurate circles in geometry class.',
    options: [
      'compass',
      'calculator',
      'rubber',
      'ruler'
    ],
    correctAnswer: 'compass',
    explanation: 'Từ "compass" trong Tiếng Anh 6 Unit 1 có nghĩa là cái com-pa (dùng để vẽ hình tròn).',
    hints: [
      'Gợi ý 1: Dụng cụ học tập dùng để vẽ hình tròn.',
      'Gợi ý 2: compass.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v2',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Students in our school wear a white shirt and blue trousers as their ________.',
    options: [
      'uniform',
      'textbook',
      'pencil case',
      'calculator'
    ],
    correctAnswer: 'uniform',
    explanation: '"uniform" nghĩa là bộ đồng phục học sinh.',
    hints: [
      'Gợi ý 1: Trang phục mặc đi học.',
      'Gợi ý 2: uniform.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v3',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'I need a ________ to do complex mathematical calculations for Math homework.',
    options: [
      'calculator',
      'compass',
      'rubber',
      'sharpener'
    ],
    correctAnswer: 'calculator',
    explanation: '"calculator" là máy tính cầm tay giúp tính toán nhanh các phép toán.',
    hints: [
      'Gợi ý 1: Thiết bị dùng để tính toán con số.',
      'Gợi ý 2: calculator.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v4',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Put your pens, pencils and rulers into your ________ before going to class.',
    options: [
      'pencil case',
      'schoolbag',
      'notebook',
      'textbook'
    ],
    correctAnswer: 'pencil case',
    explanation: '"pencil case" là hộp bút / bóp đựng bút.',
    hints: [
      'Gợi ý 1: Vật dụng đựng bút, thước.',
      'Gợi ý 2: pencil case.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v5',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Lan uses a ________ to erase pencil mistakes in her drawing workbook.',
    options: [
      'rubber',
      'compass',
      'calculator',
      'ruler'
    ],
    correctAnswer: 'rubber',
    explanation: '"rubber" (hoặc eraser) là cục tẩy / gôm học sinh.',
    hints: [
      'Gợi ý 1: Dụng cụ dùng để xóa vết bút chì.',
      'Gợi ý 2: rubber.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v6',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'My father bought me a sturdy ________ to carry all my heavy books to school.',
    options: [
      'schoolbag',
      'pencil case',
      'uniform',
      'calculator'
    ],
    correctAnswer: 'schoolbag',
    explanation: '"schoolbag" là chiếc cặp sách / ba lô đi học.',
    hints: [
      'Gợi ý 1: Túi/ba lô dùng để đựng sách vở đi học.',
      'Gợi ý 2: schoolbag.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v1',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We keep fresh milk, butter and cold drinks in the ________ in our kitchen.',
    options: [
      'fridge',
      'microwave',
      'wardrobe',
      'cupboard'
    ],
    correctAnswer: 'fridge',
    explanation: '"fridge" (tủ lạnh) dùng để bảo quản thực phẩm tươi sống và đồ uống lạnh.',
    hints: [
      'Gợi ý 1: Thiết bị làm lạnh thức ăn trong bếp.',
      'Gợi ý 2: fridge.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v2',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'My grandfather likes sitting on the comfortable ________ in the living room to read newspapers.',
    options: [
      'sofa',
      'dishwasher',
      'chest of drawers',
      'sink'
    ],
    correctAnswer: 'sofa',
    explanation: '"sofa" là ghế sofa dài êm ái ở phòng khách.',
    hints: [
      'Gợi ý 1: Ghế dài êm ái đặt ở phòng khách.',
      'Gợi ý 2: sofa.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v3',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Hang your shirts and winter coats inside the wooden ________ in your bedroom.',
    options: [
      'wardrobe',
      'fridge',
      'microwave',
      'sofa'
    ],
    correctAnswer: 'wardrobe',
    explanation: '"wardrobe" là tủ quần áo.',
    hints: [
      'Gợi ý 1: Tủ dùng để treo quần áo.',
      'Gợi ý 2: wardrobe.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v4',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'We heat up cold soup quickly using the ________ on the kitchen counter.',
    options: [
      'microwave',
      'fridge',
      'wardrobe',
      'shelf'
    ],
    correctAnswer: 'microwave',
    explanation: '"microwave" là lò vi sóng dùng để hâm nóng thức ăn.',
    hints: [
      'Gợi ý 1: Thiết bị dùng để hâm nóng thức ăn.',
      'Gợi ý 2: microwave.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-v1',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Mai is very ________; she always draws lovely pictures and writes exciting stories.',
    options: [
      'creative',
      'shy',
      'lazy',
      'talkative'
    ],
    correctAnswer: 'creative',
    explanation: '"creative" nghĩa là sáng tạo.',
    hints: [
      'Gợi ý 1: Tính cách hay vẽ tranh, sáng tác.',
      'Gợi ý 2: creative.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-v2',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Nam is a ________ boy; he always shares his lunch and helps weak classmates.',
    options: [
      'kind',
      'shy',
      'selfish',
      'strict'
    ],
    correctAnswer: 'kind',
    explanation: '"kind" nghĩa là tốt bụng, nhân ái.',
    hints: [
      'Gợi ý 1: Hay chia sẻ và giúp đỡ bạn bè.',
      'Gợi ý 2: kind.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-v3',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'He feels ________ when he has to speak in front of a big audience.',
    options: [
      'shy',
      'friendly',
      'creative',
      'talkative'
    ],
    correctAnswer: 'shy',
    explanation: '"shy" nghĩa là nhút nhát, hay e ngại.',
    hints: [
      'Gợi ý 1: Ngại ngùng trước đám đông.',
      'Gợi ý 2: shy.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-v1',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'The local art ________ displays famous paintings by Vietnamese artists.',
    options: [
      'gallery',
      'square',
      'suburb',
      'cathedral'
    ],
    correctAnswer: 'gallery',
    explanation: '"art gallery" là phòng trưng bày nghệ thuật / bảo tàng mỹ thuật.',
    hints: [
      'Gợi ý 1: Nơi trưng bày tranh vẽ nghệ thuật.',
      'Gợi ý 2: gallery.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-v2',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Many tourists visit the central ________ to see the ancient town fountain.',
    options: [
      'square',
      'suburb',
      'gallery',
      'station'
    ],
    correctAnswer: 'square',
    explanation: '"square" là quảng trường ở trung tâm thành phố.',
    hints: [
      'Gợi ý 1: Quảng trường trung tâm.',
      'Gợi ý 2: square.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-v1',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Ha Long Bay is a famous natural ________ recognized by UNESCO.',
    options: [
      'wonder',
      'cave',
      'valley',
      'island'
    ],
    correctAnswer: 'wonder',
    explanation: '"natural wonder" là kỳ quan thiên nhiên.',
    hints: [
      'Gợi ý 1: Kỳ quan thiên nhiên.',
      'Gợi ý 2: wonder.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-v2',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Remember to pack a sleeping ________ for overnight camping on the mountain.',
    options: [
      'bag',
      'coat',
      'tent',
      'box'
    ],
    correctAnswer: 'bag',
    explanation: '"sleeping bag" là túi ngủ dã ngoại.',
    hints: [
      'Gợi ý 1: Túi ngủ cắm trại.',
      'Gợi ý 2: sleeping bag.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-v1',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Children are excited to receive lucky ________ in red envelopes during Tet.',
    options: [
      'money',
      'blossoms',
      'cakes',
      'wishes'
    ],
    correctAnswer: 'money',
    explanation: '"lucky money" là tiền mừng tuổi / lì xì.',
    hints: [
      'Gợi ý 1: Tiền lì xì đầu năm.',
      'Gợi ý 2: lucky money.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-v2',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'In Southern Vietnam, people decorate their houses with yellow apricot ________.',
    options: [
      'blossoms',
      'trees',
      'fruits',
      'leaves'
    ],
    correctAnswer: 'blossoms',
    explanation: '"apricot blossoms" là hoa mai vàng ngày Tết.',
    hints: [
      'Gợi ý 1: Hoa mai vàng ngày Tết.',
      'Gợi ý 2: blossoms.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-v1',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Tom and Jerry is a famous animated ________ loved by children worldwide.',
    options: [
      'cartoon',
      'documentary',
      'game show',
      'news'
    ],
    correctAnswer: 'cartoon',
    explanation: '"cartoon" là phim hoạt hình.',
    hints: [
      'Gợi ý 1: Phim hoạt hình.',
      'Gợi ý 2: cartoon.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-v2',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'We watch the weather ________ to know if it will rain tomorrow.',
    options: [
      'forecast',
      'channel',
      'programme',
      'show'
    ],
    correctAnswer: 'forecast',
    explanation: '"weather forecast" là bản tin dự báo thời tiết.',
    hints: [
      'Gợi ý 1: Bản tin dự báo thời tiết.',
      'Gợi ý 2: weather forecast.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-v1',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'You need a pair of swimming ________ to protect your eyes underwater.',
    options: [
      'goggles',
      'shoes',
      'rackets',
      'bats'
    ],
    correctAnswer: 'goggles',
    explanation: '"goggles" là kính bơi.',
    hints: [
      'Gợi ý 1: Kính đeo khi bơi.',
      'Gợi ý 2: goggles.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-v2',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'To play badminton, players use a shuttlecock and a light ________.',
    options: [
      'racket',
      'bat',
      'ball',
      'goggles'
    ],
    correctAnswer: 'racket',
    explanation: '"racket" là vợt cầu lông / vợt tennis.',
    hints: [
      'Gợi ý 1: Vợt cầu lông.',
      'Gợi ý 2: racket.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q9-v1',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'The Eiffel Tower is a iconic ________ of Paris.',
    options: [
      'landmark',
      'postcard',
      'palace',
      'suburb'
    ],
    correctAnswer: 'landmark',
    explanation: '"landmark" là địa danh / công trình biểu tượng nổi tiếng.',
    hints: [
      'Gợi ý 1: Biểu tượng nổi tiếng của thành phố.',
      'Gợi ý 2: landmark.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q10-v1',
    unitId: 'unit-10',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Future eco-friendly houses will generate electricity from solar ________ on the roof.',
    options: [
      'panels',
      'doors',
      'windows',
      'fridges'
    ],
    correctAnswer: 'panels',
    explanation: '"solar panels" là các tấm pin năng lượng mặt trời.',
    hints: [
      'Gợi ý 1: Tấm pin mặt trời.',
      'Gợi ý 2: solar panels.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q11-v1',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We should ________ plastic bottles and cans to protect our green environment.',
    options: [
      'recycle',
      'pollute',
      'destroy',
      'burn'
    ],
    correctAnswer: 'recycle',
    explanation: '"recycle" nghĩa là tái chế rác thải.',
    hints: [
      'Gợi ý 1: Tái chế.',
      'Gợi ý 2: recycle.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q12-v1',
    unitId: 'unit-12',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Smart doctor robots will help nurses ________ heavy medical equipment.',
    options: [
      'lift',
      'cook',
      'iron',
      'speak'
    ],
    correctAnswer: 'lift',
    explanation: '"lift heavy equipment" nghĩa là nâng / nhấc đồ đạc nặng.',
    hints: [
      'Gợi ý 1: Nâng/nhấc đồ nặng.',
      'Gợi ý 2: lift.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-1',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nHis ________ looks so big.',
    options: [
      'clock',
      'bathroom',
      'room',
      'sister'
    ],
    correctAnswer: 'room',
    explanation: 'Từ "room" (/ruːm/) có nghĩa tiếng Việt là "phòng". Ví dụ: Phòng của anh ấy trông thật lớn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng" (n).',
      'Gợi ý 2: Phiên âm: /ruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-2',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nShe is my ________.',
    options: [
      'wardrobe',
      'bookshelf',
      'sister',
      'grandmother'
    ],
    correctAnswer: 'sister',
    explanation: 'Từ "sister" (/ˈsɪstə(r)/) có nghĩa tiếng Việt là "em gái, chị gái". Ví dụ: Cô ấy là em gái của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "em gái, chị gái" (n).',
      'Gợi ý 2: Phiên âm: /ˈsɪstə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-3',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nIs there a TV ________ you?',
    options: [
      'behind',
      'grandmother',
      'window',
      'sofa'
    ],
    correctAnswer: 'behind',
    explanation: 'Từ "behind" (/bɪˈhaɪnd/) có nghĩa tiếng Việt là "phía sau". Ví dụ: Có TV phía sau bạn không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phía sau" (prep).',
      'Gợi ý 2: Phiên âm: /bɪˈhaɪnd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-4',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\n________ do you live, Mi?',
    options: [
      'where',
      'under',
      'room',
      'department store'
    ],
    correctAnswer: 'where',
    explanation: 'Từ "where" (/weə(r)/) có nghĩa tiếng Việt là "ở đâu". Ví dụ: Mi sống ở đâu vậy?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở đâu" (adv).',
      'Gợi ý 2: Phiên âm: /weə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-5',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nI ________ near here.',
    options: [
      'hall',
      'live',
      'behind',
      'window'
    ],
    correctAnswer: 'live',
    explanation: 'Từ "live" (/lɪv/) có nghĩa tiếng Việt là "sống". Ví dụ: Tôi sống gần đây.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sống" (v).',
      'Gợi ý 2: Phiên âm: /lɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-6',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nI live in a ________.',
    options: [
      'mum',
      'small',
      'middle',
      'townhouse'
    ],
    correctAnswer: 'townhouse',
    explanation: 'Từ "townhouse" (/ˈtaʊn.haʊs/) có nghĩa tiếng Việt là "căn nhà phố". Ví dụ: Tôi sống trong một căn nhà phố.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "căn nhà phố" (n).',
      'Gợi ý 2: Phiên âm: /ˈtaʊn.haʊs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-7',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nMy ________ and younger brother.',
    options: [
      'flat',
      'decorate',
      'parents',
      'bedroom'
    ],
    correctAnswer: 'parents',
    explanation: 'Từ "parents" (/ˈpeərənts/) có nghĩa tiếng Việt là "bố mẹ". Ví dụ: Bố mẹ và em trai tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bố mẹ" (n).',
      'Gợi ý 2: Phiên âm: /ˈpeərənts/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-8',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nWe are moving to a ________ next month!',
    options: [
      'flat',
      'aunt',
      'chest of drawers',
      'uncle'
    ],
    correctAnswer: 'flat',
    explanation: 'Từ "flat" (/flæt/) có nghĩa tiếng Việt là "căn hộ". Ví dụ: Chúng tôi sẽ chuyển sang một căn hộ vào tháng tới!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "căn hộ" (n).',
      'Gợi ý 2: Phiên âm: /flæt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-9',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nMy ________ lives near there.',
    options: [
      'grandfather',
      'wall',
      'live',
      'aunt'
    ],
    correctAnswer: 'aunt',
    explanation: 'Từ "aunt" (/ɑːnt/) có nghĩa tiếng Việt là "dì, cô, bác gái". Ví dụ: Dì tôi sống gần đó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dì, cô, bác gái" (n).',
      'Gợi ý 2: Phiên âm: /ɑːnt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-10',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nI can play with my ________.',
    options: [
      'cousin',
      'lamp',
      'wall',
      'kitchen'
    ],
    correctAnswer: 'cousin',
    explanation: 'Từ "cousin" (/ˈkʌzn/) có nghĩa tiếng Việt là "anh chị em họ". Ví dụ: Tôi có thể chơi với anh họ của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "anh chị em họ" (n).',
      'Gợi ý 2: Phiên âm: /ˈkʌzn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-11',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nThere is a ________.',
    options: [
      'brother',
      'uncle',
      'middle',
      'living room'
    ],
    correctAnswer: 'living room',
    explanation: 'Từ "living room" (/ˈlɪvɪŋ ruːm/) có nghĩa tiếng Việt là "phòng khách". Ví dụ: Đây là một phòng khách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng khách" (n).',
      'Gợi ý 2: Phiên âm: /ˈlɪvɪŋ ruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-12',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nThere\'s a ________.',
    options: [
      'picture',
      'school bag',
      'lamp',
      'bedroom'
    ],
    correctAnswer: 'bedroom',
    explanation: 'Từ "bedroom" (/ˈbedruːm/) có nghĩa tiếng Việt là "phòng ngủ". Ví dụ: Có một phòng ngủ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng ngủ" (n).',
      'Gợi ý 2: Phiên âm: /ˈbedruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-13',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nThere\'s a ________.',
    options: [
      'hotel',
      'kitchen',
      'flat',
      'behind'
    ],
    correctAnswer: 'kitchen',
    explanation: 'Từ "kitchen" (/ˈkɪtʃɪn/) có nghĩa tiếng Việt là "phòng bếp". Ví dụ: Có một phòng bếp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng bếp" (n).',
      'Gợi ý 2: Phiên âm: /ˈkɪtʃɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-14',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nThere are two ________s.',
    options: [
      'buy',
      'bathroom',
      'hall',
      'fridge'
    ],
    correctAnswer: 'bathroom',
    explanation: 'Từ "bathroom" (/ˈbɑːθruːm/) có nghĩa tiếng Việt là "phòng tắm". Ví dụ: Có hai phòng tắm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng tắm" (n).',
      'Gợi ý 2: Phiên âm: /ˈbɑːθruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-15',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nWhere did you ________ them?',
    options: [
      'wall',
      'townhouse',
      'brother',
      'buy'
    ],
    correctAnswer: 'buy',
    explanation: 'Từ "buy" (/baɪ/) có nghĩa tiếng Việt là "mua". Ví dụ: Bạn mua chúng ở đâu vậy?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mua" (v).',
      'Gợi ý 2: Phiên âm: /baɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-16',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nIn the department store near our ________.',
    options: [
      'mum',
      'in front of',
      'buy',
      'house'
    ],
    correctAnswer: 'house',
    explanation: 'Từ "house" (/haʊs/) có nghĩa tiếng Việt là "nhà". Ví dụ: Trong cửa hàng bách hóa gần nhà của chúng tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà" (n).',
      'Gợi ý 2: Phiên âm: /haʊs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-17',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - GETTING STARTED]\nDon\'t forget we need two ________s for my bedroom.',
    options: [
      'townhouse',
      'picture',
      'hotel',
      'lamp'
    ],
    correctAnswer: 'lamp',
    explanation: 'Từ "lamp" (/læmp/) có nghĩa tiếng Việt là "đèn". Ví dụ: Đừng quên chúng ta cần hai chiếc đèn cho phòng ngủ của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đèn" (n).',
      'Gợi ý 2: Phiên âm: /læmp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-18',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nMy room has two ________s.',
    options: [
      'middle',
      'kitchen',
      'sink',
      'fridge'
    ],
    correctAnswer: 'sink',
    explanation: 'Từ "sink" (/sɪŋk/) có nghĩa tiếng Việt là "bồn rửa". Ví dụ: Phòng của tôi có hai bồn rửa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bồn rửa" (n).',
      'Gợi ý 2: Phiên âm: /sɪŋk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-19',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have a ________ in my kitchen.',
    options: [
      'dishwasher',
      'window',
      'toilet',
      'kitchen'
    ],
    correctAnswer: 'dishwasher',
    explanation: 'Từ "dishwasher" (/ˈdɪʃwɒʃə(r)/) có nghĩa tiếng Việt là "máy rửa bát". Ví dụ: Tôi có một máy rửa bát trong nhà bếp của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "máy rửa bát" (n).',
      'Gợi ý 2: Phiên âm: /ˈdɪʃwɒʃə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-20',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have one ________ in my room.',
    options: [
      'house',
      'bowl',
      'chest of drawers',
      'television'
    ],
    correctAnswer: 'chest of drawers',
    explanation: 'Từ "chest of drawers" (/ˌtʃest əv ˈdrɔːz/) có nghĩa tiếng Việt là "tủ có nhiều ngăn kéo". Ví dụ: Tôi có một tủ ngăn kéo trong phòng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tủ có nhiều ngăn kéo" (n).',
      'Gợi ý 2: Phiên âm: /ˌtʃest əv ˈdrɔːz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-21',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have a ________ in my living room.',
    options: [
      'fridge',
      'family',
      'under',
      'room'
    ],
    correctAnswer: 'fridge',
    explanation: 'Từ "fridge" (/frɪdʒ/) có nghĩa tiếng Việt là "tủ lạnh". Ví dụ: Tôi có một tủ lạnh trong phòng khách của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tủ lạnh" (n).',
      'Gợi ý 2: Phiên âm: /frɪdʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-22',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have a ________ in my living room.',
    options: [
      'picture',
      'where',
      'people',
      'living room'
    ],
    correctAnswer: 'picture',
    explanation: 'Từ "picture" (/ˈpɪktʃə(r)/) có nghĩa tiếng Việt là "bức tranh". Ví dụ: Tôi có một bức tranh trong phòng khách của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bức tranh" (n).',
      'Gợi ý 2: Phiên âm: /ˈpɪktʃə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-23',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nThere is a meeting room down the ________ from my office.',
    options: [
      'hall',
      'clock',
      'desk',
      'people'
    ],
    correctAnswer: 'hall',
    explanation: 'Từ "hall" (/hɔːl/) có nghĩa tiếng Việt là "hành lang, sảnh". Ví dụ: Có một phòng họp ở cuối hành lang từ văn phòng của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hành lang, sảnh" (n).',
      'Gợi ý 2: Phiên âm: /hɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-24',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have one ________ in my bathroom.',
    options: [
      'toilet',
      'wardrobe',
      'where',
      'who'
    ],
    correctAnswer: 'toilet',
    explanation: 'Từ "toilet" (/ˈtɔɪlət/) có nghĩa tiếng Việt là "nhà vệ sinh, bồn cầu". Ví dụ: Tôi có một nhà vệ sinh trong phòng tắm của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà vệ sinh, bồn cầu" (n).',
      'Gợi ý 2: Phiên âm: /ˈtɔɪlət/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-25',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nMy house has two ________s.',
    options: [
      'house',
      'television',
      'grandmother',
      'sofa'
    ],
    correctAnswer: 'sofa',
    explanation: 'Từ "sofa" (/ˈsəʊfə/) có nghĩa tiếng Việt là "ghế sofa". Ví dụ: Nhà tôi có hai chiếc ghế sofa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ghế sofa" (n).',
      'Gợi ý 2: Phiên âm: /ˈsəʊfə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-26',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have a sofa and a ________.',
    options: [
      'townhouse',
      'television',
      'hotel',
      'room'
    ],
    correctAnswer: 'television',
    explanation: 'Từ "television" (/ˈtelɪvɪʒn/) có nghĩa tiếng Việt là "tivi, truyền hình". Ví dụ: Tôi có một chiếc ghế sofa và một chiếc tivi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tivi, truyền hình" (n).',
      'Gợi ý 2: Phiên âm: /ˈtelɪvɪʒn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-27',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nMy ________\'s house is in Hanoi.',
    options: [
      'aunt',
      'chest of drawers',
      'school bag',
      'grandmother'
    ],
    correctAnswer: 'grandmother',
    explanation: 'Từ "grandmother" (/ˈɡrænmʌðə(r)/) có nghĩa tiếng Việt là "bà". Ví dụ: Nhà bà tôi ở Hà Nội.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bà" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡrænmʌðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-28',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nThis is my sister\'s ________.',
    options: [
      'desk',
      'kitchen',
      'middle',
      'department store'
    ],
    correctAnswer: 'desk',
    explanation: 'Từ "desk" (/desk/) có nghĩa tiếng Việt là "bàn làm việc, bàn học". Ví dụ: Đây là bàn của em gái tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bàn làm việc, bàn học" (n).',
      'Gợi ý 2: Phiên âm: /desk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-29',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nMy cousin\'s dad is my ________.',
    options: [
      'buy',
      'aunt',
      'brother',
      'uncle'
    ],
    correctAnswer: 'uncle',
    explanation: 'Từ "uncle" (/ˈʌŋkl/) có nghĩa tiếng Việt là "chú, bác, cậu". Ví dụ: Bố của anh họ tôi là chú của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chú, bác, cậu" (n).',
      'Gợi ý 2: Phiên âm: /ˈʌŋkl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-30',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nNam\'s house is ________.',
    options: [
      'small',
      'bedroom',
      'dishwasher',
      'who'
    ],
    correctAnswer: 'small',
    explanation: 'Từ "small" (/smɔːl/) có nghĩa tiếng Việt là "nhỏ". Ví dụ: Nhà của Nam nhỏ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhỏ" (adj).',
      'Gợi ý 2: Phiên âm: /smɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-31',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\n________, are you home?',
    options: [
      'chopsticks',
      'family',
      'shark',
      'mum'
    ],
    correctAnswer: 'mum',
    explanation: 'Từ "mum" (/mʌm/) có nghĩa tiếng Việt là "mẹ". Ví dụ: Mẹ, mẹ có nhà không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mẹ" (n).',
      'Gợi ý 2: Phiên âm: /mʌm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-32',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nI have bought these new bowls and ________.',
    options: [
      'bedroom',
      'chopsticks',
      'computer',
      'family'
    ],
    correctAnswer: 'chopsticks',
    explanation: 'Từ "chopsticks" (/ˈtʃɒpstɪks/) có nghĩa tiếng Việt là "đôi đũa". Ví dụ: Tôi đã mua những chiếc bát và đôi đũa mới này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đôi đũa" (n).',
      'Gợi ý 2: Phiên âm: /ˈtʃɒpstɪks/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-33',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nMy house has a lot of ________s.',
    options: [
      'kitchen',
      'fridge',
      'bowl',
      'middle'
    ],
    correctAnswer: 'bowl',
    explanation: 'Từ "bowl" (/bəʊl/) có nghĩa tiếng Việt là "bát, chén". Ví dụ: Nhà tôi có rất nhiều bát.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bát, chén" (n).',
      'Gợi ý 2: Phiên âm: /bəʊl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-34',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nThe dog is ________ the chair.',
    options: [
      'draw',
      'school bag',
      'desk',
      'on'
    ],
    correctAnswer: 'on',
    explanation: 'Từ "on" (/ɒn/) có nghĩa tiếng Việt là "ở trên". Ví dụ: Con chó đang ở trên ghế.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở trên" (prep).',
      'Gợi ý 2: Phiên âm: /ɒn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-35',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nThe dog is ________ the house.',
    options: [
      'in front of',
      'picture',
      'behind',
      'townhouse'
    ],
    correctAnswer: 'in front of',
    explanation: 'Từ "in front of" (/ɪn frʌnt əv/) có nghĩa tiếng Việt là "ở phía trước". Ví dụ: Con chó ở trước nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở phía trước" (prep).',
      'Gợi ý 2: Phiên âm: /ɪn frʌnt əv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-36',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nThe cat is ________ the lamp and chair.',
    options: [
      'bowl',
      'television',
      'lamp',
      'between'
    ],
    correctAnswer: 'between',
    explanation: 'Từ "between" (/bɪˈtwiːn/) có nghĩa tiếng Việt là "ở giữa". Ví dụ: Con mèo ở giữa đèn và ghế.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở giữa" (prep).',
      'Gợi ý 2: Phiên âm: /bɪˈtwiːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-37',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - A CLOSER LOOK 1]\nThe cat is ________ the lamp.',
    options: [
      'furniture',
      'behind',
      'on',
      'under'
    ],
    correctAnswer: 'under',
    explanation: 'Từ "under" (/ˈʌndə(r)/) có nghĩa tiếng Việt là "ở dưới". Ví dụ: Con mèo ở dưới ngọn đèn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở dưới" (prep).',
      'Gợi ý 2: Phiên âm: /ˈʌndə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-38',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nHow about putting a picture on the ________?',
    options: [
      'where',
      'furniture',
      'wall',
      'television'
    ],
    correctAnswer: 'wall',
    explanation: 'Từ "wall" (/wɔːl/) có nghĩa tiếng Việt là "tường". Ví dụ: Hay là treo một bức tranh lên tường?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tường" (n).',
      'Gợi ý 2: Phiên âm: /wɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-39',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nLet\'s go to the ________ to buy one.',
    options: [
      'bowl',
      'department store',
      'kitchen',
      'townhouse'
    ],
    correctAnswer: 'department store',
    explanation: 'Từ "department store" (/dɪˈpɑːtmənt stɔː(r)/) có nghĩa tiếng Việt là "cửa hàng bách hóa". Ví dụ: Hãy đến cửa hàng bách hóa để mua một cái.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cửa hàng bách hóa" (n).',
      'Gợi ý 2: Phiên âm: /dɪˈpɑːtmənt stɔː(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-40',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nThe ________ is on the table.',
    options: [
      'living room',
      'behind',
      'aunt',
      'school bag'
    ],
    correctAnswer: 'school bag',
    explanation: 'Từ "school bag" (/ˈskuːl bæɡ/) có nghĩa tiếng Việt là "cặp học sinh". Ví dụ: Cái cặp ở trên bàn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cặp học sinh" (n).',
      'Gợi ý 2: Phiên âm: /ˈskuːl bæɡ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-41',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nThe picture is between the ________s.',
    options: [
      'clock',
      'room',
      'department store',
      'bookshelf'
    ],
    correctAnswer: 'clock',
    explanation: 'Từ "clock" (/klɒk/) có nghĩa tiếng Việt là "đồng hồ". Ví dụ: Bức tranh nằm giữa những chiếc đồng hồ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đồng hồ" (n).',
      'Gợi ý 2: Phiên âm: /klɒk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-42',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nThe cat is in front of the ________.',
    options: [
      'window',
      'computer',
      'uncle',
      'desk'
    ],
    correctAnswer: 'computer',
    explanation: 'Từ "computer" (/kəmˈpjuːtə(r)/) có nghĩa tiếng Việt là "máy tính". Ví dụ: Con mèo đang ở phía trước máy tính.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "máy tính" (n).',
      'Gợi ý 2: Phiên âm: /kəmˈpjuːtə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-43',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nThe cap is under the ________.',
    options: [
      'school bag',
      'uncle',
      'kitchen',
      'pillow'
    ],
    correctAnswer: 'pillow',
    explanation: 'Từ "pillow" (/ˈpɪləʊ/) có nghĩa tiếng Việt là "gối". Ví dụ: Cái mũ đang ở dưới gối.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gối" (n).',
      'Gợi ý 2: Phiên âm: /ˈpɪləʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-44',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nThere is a big ________ in this room.',
    options: [
      'window',
      'on',
      'pillow',
      'picture'
    ],
    correctAnswer: 'window',
    explanation: 'Từ "window" (/ˈwɪndəʊ/) có nghĩa tiếng Việt là "cửa sổ". Ví dụ: Có một cửa sổ lớn trong phòng này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cửa sổ" (n).',
      'Gợi ý 2: Phiên âm: /ˈwɪndəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-45',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nA table in the ________ of the room.',
    options: [
      'chopsticks',
      'bookshelf',
      'grandmother',
      'middle'
    ],
    correctAnswer: 'middle',
    explanation: 'Từ "middle" (/ˈmɪdl/) có nghĩa tiếng Việt là "ở giữa". Ví dụ: Một cái bàn ở giữa phòng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở giữa" (n).',
      'Gợi ý 2: Phiên âm: /ˈmɪdl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-46',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - COMMUNICATION]\nThere are two ________ photos on the wall.',
    options: [
      'shark',
      'family',
      'grandfather',
      'pillow'
    ],
    correctAnswer: 'family',
    explanation: 'Từ "family" (/ˈfæməli/) có nghĩa tiếng Việt là "gia đình". Ví dụ: Có hai bức ảnh gia đình trên tường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gia đình" (n).',
      'Gợi ý 2: Phiên âm: /ˈfæməli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-47',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 1]\nIs it an email or a ________?',
    options: [
      'letter',
      'middle',
      'sofa',
      'brother'
    ],
    correctAnswer: 'letter',
    explanation: 'Từ "letter" (/ˈletə(r)/) có nghĩa tiếng Việt là "bức thư". Ví dụ: Đó là một email hay một bức thư?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bức thư" (n).',
      'Gợi ý 2: Phiên âm: /ˈletə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-48',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 1]\n________ is Nick in Da Lat with?',
    options: [
      'lamp',
      'room',
      'where',
      'who'
    ],
    correctAnswer: 'who',
    explanation: 'Từ "who" (/huː/) có nghĩa tiếng Việt là "ai". Ví dụ: Nick ở Đà Lạt với ai?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ai" (pronoun).',
      'Gợi ý 2: Phiên âm: /huː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-49',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 1]\nHow many rooms are there in the ________?',
    options: [
      'dishwasher',
      'room',
      'furniture',
      'hotel'
    ],
    correctAnswer: 'hotel',
    explanation: 'Từ "hotel" (/həʊˈtel/) có nghĩa tiếng Việt là "khách sạn". Ví dụ: Có bao nhiêu phòng trong khách sạn?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khách sạn" (n).',
      'Gợi ý 2: Phiên âm: /həʊˈtel/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-50',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 1]\nI ________ my bag under the bed.',
    options: [
      'put',
      'furniture',
      'wall',
      'buy'
    ],
    correctAnswer: 'put',
    explanation: 'Từ "put" (/pʊt/) có nghĩa tiếng Việt là "để, đặt". Ví dụ: Tôi để túi dưới gầm giường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "để, đặt" (v).',
      'Gợi ý 2: Phiên âm: /pʊt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-51',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 1]\nThere\'s a ________.',
    options: [
      'wardrobe',
      'living room',
      'grandmother',
      'fridge'
    ],
    correctAnswer: 'wardrobe',
    explanation: 'Từ "wardrobe" (/ˈwɔːdrəʊb/) có nghĩa tiếng Việt là "tủ quần áo". Ví dụ: Có một tủ quần áo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tủ quần áo" (n).',
      'Gợi ý 2: Phiên âm: /ˈwɔːdrəʊb/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-52',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 1]\nThere\'s a big ________ at the door.',
    options: [
      'clock',
      'television',
      'shark',
      'decorate'
    ],
    correctAnswer: 'shark',
    explanation: 'Từ "shark" (/ʃɑːk/) có nghĩa tiếng Việt là "cá mập". Ví dụ: Có một con cá mập lớn ở cửa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cá mập" (n).',
      'Gợi ý 2: Phiên âm: /ʃɑːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-53',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - SKILLS 2]\nThere are four ________ in my family.',
    options: [
      'people',
      'decorate',
      'grandmother',
      'pillow'
    ],
    correctAnswer: 'people',
    explanation: 'Từ "people" (/ˈpiːpl/) có nghĩa tiếng Việt là "người". Ví dụ: Có bốn người trong gia đình tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "người" (n).',
      'Gợi ý 2: Phiên âm: /ˈpiːpl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-54',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - LOOKING BACK]\nMy ________ has a TV.',
    options: [
      'window',
      'brother',
      'television',
      'computer'
    ],
    correctAnswer: 'brother',
    explanation: 'Từ "brother" (/ˈbrʌðə(r)/) có nghĩa tiếng Việt là "anh trai, em trai". Ví dụ: Anh trai tôi có một cái TV.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "anh trai, em trai" (n).',
      'Gợi ý 2: Phiên âm: /ˈbrʌðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-55',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - LOOKING BACK]\nShe has a big ________.',
    options: [
      'bookshelf',
      'desk',
      'sink',
      'townhouse'
    ],
    correctAnswer: 'bookshelf',
    explanation: 'Từ "bookshelf" (/ˈbʊkʃelf/) có nghĩa tiếng Việt là "giá sách". Ví dụ: Cô ấy có một cái giá sách lớn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giá sách" (n).',
      'Gợi ý 2: Phiên âm: /ˈbʊkʃelf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-56',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - LOOKING BACK]\nMy ________ likes the kitchen the best.',
    options: [
      'shark',
      'desk',
      'fridge',
      'grandfather'
    ],
    correctAnswer: 'grandfather',
    explanation: 'Từ "grandfather" (/ˈɡrænfɑːðə(r)/) có nghĩa tiếng Việt là "ông". Ví dụ: Ông tôi thích nhất là nhà bếp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ông" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡrænfɑːðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-57',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - LOOKING BACK]\nMy aunt has a ________ Vy.',
    options: [
      'grandfather',
      'window',
      'chopsticks',
      'daughter'
    ],
    correctAnswer: 'daughter',
    explanation: 'Từ "daughter" (/ˈdɔːtə(r)/) có nghĩa tiếng Việt là "con gái". Ví dụ: Dì tôi có một cô con gái tên Vy.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con gái" (n).',
      'Gợi ý 2: Phiên âm: /ˈdɔːtə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-58',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - PROJECT]\n________ your own strange house.',
    options: [
      'draw',
      'wall',
      'where',
      'put'
    ],
    correctAnswer: 'draw',
    explanation: 'Từ "draw" (/drɔː/) có nghĩa tiếng Việt là "vẽ". Ví dụ: Hãy vẽ ngôi nhà kỳ lạ của riêng bạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vẽ" (v).',
      'Gợi ý 2: Phiên âm: /drɔː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-59',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - PROJECT]\nHe has some very ________ ideas about women!',
    options: [
      'strange',
      'uncle',
      'school bag',
      'television'
    ],
    correctAnswer: 'strange',
    explanation: 'Từ "strange" (/streɪndʒ/) có nghĩa tiếng Việt là "kỳ lạ". Ví dụ: Anh ấy có một số ý tưởng rất lạ về phụ nữ!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kỳ lạ" (adj).',
      'Gợi ý 2: Phiên âm: /streɪndʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-60',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - PROJECT]\nThey ________ the wedding car with ribbons and flowers.',
    options: [
      'decorate',
      'wardrobe',
      'department store',
      'lamp'
    ],
    correctAnswer: 'decorate',
    explanation: 'Từ "decorate" (/ˈdekəreɪt/) có nghĩa tiếng Việt là "trang trí". Ví dụ: Họ trang trí xe cưới bằng ruy băng và hoa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trang trí" (v).',
      'Gợi ý 2: Phiên âm: /ˈdekəreɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u2-v-61',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 2: MY HOME - PROJECT]\nThey have a lot of antique ________.',
    options: [
      'room',
      'furniture',
      'family',
      'clock'
    ],
    correctAnswer: 'furniture',
    explanation: 'Từ "furniture" (/ˈfɜːnɪtʃə(r)/) có nghĩa tiếng Việt là "đồ nội thất". Ví dụ: Họ có rất nhiều đồ nội thất cổ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đồ nội thất" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɜːnɪtʃə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-1',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nThat was a great ________.',
    options: [
      'idea',
      'food',
      'foot',
      'laugh'
    ],
    correctAnswer: 'idea',
    explanation: 'Từ "idea" (/aɪˈdɪə/) có nghĩa tiếng Việt là "ý tưởng". Ví dụ: Đó là một ý tưởng tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ý tưởng" (n).',
      'Gợi ý 2: Phiên âm: /aɪˈdɪə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-2',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nI love ________s.',
    options: [
      'eye',
      'drawing',
      'clever',
      'picnic'
    ],
    correctAnswer: 'picnic',
    explanation: 'Từ "picnic" (/ˈpɪknɪk/) có nghĩa tiếng Việt là "dã ngoại". Ví dụ: Tôi thích dã ngoại.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dã ngoại" (n).',
      'Gợi ý 2: Phiên âm: /ˈpɪknɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-3',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nPlease, pass me the ________s.',
    options: [
      'biscuit',
      'letter',
      'drawing',
      'laugh'
    ],
    correctAnswer: 'biscuit',
    explanation: 'Từ "biscuit" (/ˈbɪskɪt/) có nghĩa tiếng Việt là "bánh quy". Ví dụ: Làm ơn đưa giúp tôi những cái bánh quy kia.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bánh quy" (n).',
      'Gợi ý 2: Phiên âm: /ˈbɪskɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-4',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nIt is my favorite ________.',
    options: [
      'violin',
      'swimming',
      'magazine',
      'badminton'
    ],
    correctAnswer: 'magazine',
    explanation: 'Từ "magazine" (/ˌmæɡəˈziːn/) có nghĩa tiếng Việt là "tạp chí". Ví dụ: Đó là tạp chí yêu thích của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tạp chí" (n).',
      'Gợi ý 2: Phiên âm: /ˌmæɡəˈziːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-5',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nShe is with ________.',
    options: [
      'English',
      'food',
      'can',
      'someone'
    ],
    correctAnswer: 'someone',
    explanation: 'Từ "someone" (/ˈsʌmwʌn/) có nghĩa tiếng Việt là "ai đó / người nào đó". Ví dụ: Cô ấy đang ở với ai đó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ai đó / người nào đó" (n).',
      'Gợi ý 2: Phiên âm: /ˈsʌmwʌn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-6',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nShe has ________ and long black hair.',
    options: [
      'present',
      'summer',
      'glasses',
      'meet'
    ],
    correctAnswer: 'glasses',
    explanation: 'Từ "glasses" (/ˈɡlɑːsɪz/) có nghĩa tiếng Việt là "mắt kính". Ví dụ: Cô ấy có kính và mái tóc đen dài.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mắt kính" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡlɑːsɪz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-7',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nThis is my ________ Chau.',
    options: [
      'eye',
      'read',
      'letter',
      'friend'
    ],
    correctAnswer: 'friend',
    explanation: 'Từ "friend" (/frend/) có nghĩa tiếng Việt là "bạn". Ví dụ: Đây là bạn của tôi Châu.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bạn" (n).',
      'Gợi ý 2: Phiên âm: /frend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-8',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nNice to ________ you.',
    options: [
      'classmate',
      'meet',
      'can',
      'laugh'
    ],
    correctAnswer: 'meet',
    explanation: 'Từ "meet" (/miːt/) có nghĩa tiếng Việt là "gặp". Ví dụ: Rất vui được gặp bạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gặp" (v).',
      'Gợi ý 2: Phiên âm: /miːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-9',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nWould you like to ________?',
    options: [
      'sit down',
      'take photos',
      'food',
      'glasses'
    ],
    correctAnswer: 'sit down',
    explanation: 'Từ "sit down" (/sɪt daʊn/) có nghĩa tiếng Việt là "ngồi xuống". Ví dụ: Bạn muốn ngồi xuống không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngồi xuống" (phr.v).',
      'Gợi ý 2: Phiên âm: /sɪt daʊn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-10',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nWe have lots of ________.',
    options: [
      'food',
      'tall',
      'class',
      'someone'
    ],
    correctAnswer: 'food',
    explanation: 'Từ "food" (/fuːd/) có nghĩa tiếng Việt là "thức ăn". Ví dụ: Chúng tôi có rất nhiều thức ăn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thức ăn" (n).',
      'Gợi ý 2: Phiên âm: /fuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-11',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nWe are going to the ________.',
    options: [
      'garden',
      'weekend',
      'hand',
      'bookshop'
    ],
    correctAnswer: 'bookshop',
    explanation: 'Từ "bookshop" (/ˈbʊkʃɒp/) có nghĩa tiếng Việt là "hiệu sách". Ví dụ: Chúng tôi sẽ đến hiệu sách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hiệu sách" (n).',
      'Gợi ý 2: Phiên âm: /ˈbʊkʃɒp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-12',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nShe has long hair and big ________s.',
    options: [
      'eye',
      'nose',
      'funny',
      'summer'
    ],
    correctAnswer: 'eye',
    explanation: 'Từ "eye" (/aɪ/) có nghĩa tiếng Việt là "mắt". Ví dụ: Cô ấy có mái tóc dài và đôi mắt to.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mắt" (n).',
      'Gợi ý 2: Phiên âm: /aɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-13',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nHe has two ________s.',
    options: [
      'classmate',
      'arm',
      'present',
      'foot'
    ],
    correctAnswer: 'arm',
    explanation: 'Từ "arm" (/ɑːm/) có nghĩa tiếng Việt là "cánh tay". Ví dụ: Anh ta có hai cánh tay.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cánh tay" (n).',
      'Gợi ý 2: Phiên âm: /ɑːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-14',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nI have a ________.',
    options: [
      'weekend',
      'creative',
      'foot',
      'blonde'
    ],
    correctAnswer: 'foot',
    explanation: 'Từ "foot" (/fʊt/) có nghĩa tiếng Việt là "bàn chân". Ví dụ: Tôi có một bàn chân.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bàn chân" (n).',
      'Gợi ý 2: Phiên âm: /fʊt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-15',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nI have short ________.',
    options: [
      'now',
      'short',
      'hair',
      'friendly'
    ],
    correctAnswer: 'hair',
    explanation: 'Từ "hair" (/heə(r)/) có nghĩa tiếng Việt là "tóc". Ví dụ: Tôi có mái tóc ngắn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tóc" (n).',
      'Gợi ý 2: Phiên âm: /heə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-16',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nI have a big ________.',
    options: [
      'nose',
      'magazine',
      'present',
      'blonde'
    ],
    correctAnswer: 'nose',
    explanation: 'Từ "nose" (/nəʊz/) có nghĩa tiếng Việt là "mũi". Ví dụ: Tôi có một cái mũi to.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mũi" (n).',
      'Gợi ý 2: Phiên âm: /nəʊz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-17',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - GETTING STARTED]\nShe has a small ________.',
    options: [
      'hand',
      'supermarket',
      'short',
      'active'
    ],
    correctAnswer: 'hand',
    explanation: 'Từ "hand" (/hænd/) có nghĩa tiếng Việt là "bàn tay". Ví dụ: Cô ấy có một bàn tay nhỏ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bàn tay" (n).',
      'Gợi ý 2: Phiên âm: /hænd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-18',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nMina is very ________.',
    options: [
      'shy',
      'magazine',
      'creative',
      'someone'
    ],
    correctAnswer: 'shy',
    explanation: 'Từ "shy" (/ʃaɪ/) có nghĩa tiếng Việt là "e ngại, xấu hổ". Ví dụ: Mina rất ngại.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "e ngại, xấu hổ" (adj).',
      'Gợi ý 2: Phiên âm: /ʃaɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-19',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nShe likes ________ pictures.',
    options: [
      'drawing',
      'read',
      'foot',
      'like'
    ],
    correctAnswer: 'drawing',
    explanation: 'Từ "drawing" (/ˈdrɔːɪŋ/) có nghĩa tiếng Việt là "bức vẽ, việc vẽ". Ví dụ: Cô ấy thích vẽ tranh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bức vẽ, việc vẽ" (n).',
      'Gợi ý 2: Phiên âm: /ˈdrɔːɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-20',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nShe is ________.',
    options: [
      'arm',
      'creative',
      'nose',
      'friendly'
    ],
    correctAnswer: 'friendly',
    explanation: 'Từ "friendly" (/ˈfrendli/) có nghĩa tiếng Việt là "thân thiện". Ví dụ: Cô ấy thân thiện.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thân thiện" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfrendli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-21',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nNam is a ________ person.',
    options: [
      'clever',
      'violin',
      'active',
      'letter'
    ],
    correctAnswer: 'clever',
    explanation: 'Từ "clever" (/ˈklevə(r)/) có nghĩa tiếng Việt là "khéo léo, thông minh". Ví dụ: Nam là một người khéo léo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khéo léo, thông minh" (adj).',
      'Gợi ý 2: Phiên âm: /ˈklevə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-22',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nHe is a ________ boy.',
    options: [
      'kind',
      'English',
      'badminton',
      'must'
    ],
    correctAnswer: 'kind',
    explanation: 'Từ "kind" (/kaɪnd/) có nghĩa tiếng Việt là "tốt bụng". Ví dụ: Anh ấy là một cậu bé tốt bụng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tốt bụng" (adj).',
      'Gợi ý 2: Phiên âm: /kaɪnd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-23',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nI\'m ________.',
    options: [
      'weekend',
      'letter',
      'creative',
      'careful'
    ],
    correctAnswer: 'creative',
    explanation: 'Từ "creative" (/kriˈeɪtɪv/) có nghĩa tiếng Việt là "sáng tạo". Ví dụ: Tôi là người sáng tạo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sáng tạo" (adj).',
      'Gợi ý 2: Phiên âm: /kriˈeɪtɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-24',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nPlease, be ________.',
    options: [
      'careful',
      'club',
      'food',
      'eye'
    ],
    correctAnswer: 'careful',
    explanation: 'Từ "careful" (/ˈkeəfl/) có nghĩa tiếng Việt là "cẩn thận". Ví dụ: Xin hãy cẩn thận.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cẩn thận" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkeəfl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-25',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nMai is ________.',
    options: [
      'drawing',
      'confident',
      'magazine',
      'homework'
    ],
    correctAnswer: 'confident',
    explanation: 'Từ "confident" (/ˈkɒnfɪdənt/) có nghĩa tiếng Việt là "tự tin". Ví dụ: Mai tự tin.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tự tin" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkɒnfɪdənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-26',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 1]\nNam is ________.',
    options: [
      'everything',
      'hard working',
      'hair',
      'confident'
    ],
    correctAnswer: 'hard working',
    explanation: 'Từ "hard working" (/ˌhɑːd ˈwɜːkɪŋ/) có nghĩa tiếng Việt là "chăm chỉ". Ví dụ: Nam rất chăm chỉ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chăm chỉ" (adj).',
      'Gợi ý 2: Phiên âm: /ˌhɑːd ˈwɜːkɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-27',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nMy sister does not make a sandwich at ________.',
    options: [
      'must',
      'magazine',
      'care',
      'present'
    ],
    correctAnswer: 'present',
    explanation: 'Từ "present" (/ˈpreznt/) có nghĩa tiếng Việt là "hiện tại". Ví dụ: Em gái tôi hiện tại không làm bánh mì sandwich.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hiện tại" (n).',
      'Gợi ý 2: Phiên âm: /ˈpreznt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-28',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nI go to the ________ at the moment.',
    options: [
      'violin',
      'glasses',
      'food',
      'supermarket'
    ],
    correctAnswer: 'supermarket',
    explanation: 'Từ "supermarket" (/ˈsuːpəmɑːkɪt/) có nghĩa tiếng Việt là "siêu thị". Ví dụ: Tôi đi siêu thị vào lúc này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "siêu thị" (n).',
      'Gợi ý 2: Phiên âm: /ˈsuːpəmɑːkɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-29',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nNam and Ba eat ________.',
    options: [
      'biscuit',
      'summer',
      'ice cream',
      'free time'
    ],
    correctAnswer: 'ice cream',
    explanation: 'Từ "ice cream" (/ˈaɪs kriːm/) có nghĩa tiếng Việt là "kem". Ví dụ: Nam và Ba ăn kem.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kem" (n).',
      'Gợi ý 2: Phiên âm: /ˈaɪs kriːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-30',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nLan and Trang ________.',
    options: [
      'can',
      'read',
      'everything',
      'take photos'
    ],
    correctAnswer: 'take photos',
    explanation: 'Từ "take photos" (/teɪk ˈfəʊtəʊz/) có nghĩa tiếng Việt là "chụp ảnh". Ví dụ: Lan và Trang chụp ảnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chụp ảnh" (phr).',
      'Gợi ý 2: Phiên âm: /teɪk ˈfəʊtəʊz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-31',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nLan writes a ________.',
    options: [
      'supermarket',
      'letter',
      'read',
      'confident'
    ],
    correctAnswer: 'letter',
    explanation: 'Từ "letter" (/ˈletə(r)/) có nghĩa tiếng Việt là "bức thư". Ví dụ: Lan viết thư.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bức thư" (n).',
      'Gợi ý 2: Phiên âm: /ˈletə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-32',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nDuong plays ________.',
    options: [
      'meet',
      'friendly',
      'badminton',
      'classmate'
    ],
    correctAnswer: 'badminton',
    explanation: 'Từ "badminton" (/ˈbædmɪntən/) có nghĩa tiếng Việt là "cầu lông". Ví dụ: Dương chơi cầu lông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cầu lông" (n).',
      'Gợi ý 2: Phiên âm: /ˈbædmɪntən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-33',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nAre you reading ________?',
    options: [
      'someone',
      'must',
      'now',
      'garden'
    ],
    correctAnswer: 'now',
    explanation: 'Từ "now" (/naʊ/) có nghĩa tiếng Việt là "bây giờ". Ví dụ: Bạn có đang đọc bây giờ không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bây giờ" (adv).',
      'Gợi ý 2: Phiên âm: /naʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-34',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nNam ________s a book.',
    options: [
      'comic book',
      'classmate',
      'must',
      'read'
    ],
    correctAnswer: 'read',
    explanation: 'Từ "read" (/riːd/) có nghĩa tiếng Việt là "đọc". Ví dụ: Nam đọc sách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đọc" (v).',
      'Gợi ý 2: Phiên âm: /riːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-35',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nThey play ________ at the moment.',
    options: [
      'football',
      'club',
      'friend',
      'clever'
    ],
    correctAnswer: 'football',
    explanation: 'Từ "football" (/ˈfʊtbɔːl/) có nghĩa tiếng Việt là "bóng đá". Ví dụ: Họ chơi bóng vào lúc này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bóng đá" (n).',
      'Gợi ý 2: Phiên âm: /ˈfʊtbɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-36',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nIs your friend ________?',
    options: [
      'swimming',
      'bookshop',
      'meet',
      'hair'
    ],
    correctAnswer: 'swimming',
    explanation: 'Từ "swimming" (/ˈswɪmɪŋ/) có nghĩa tiếng Việt là "việc bơi lội". Ví dụ: Bạn của bạn có đang bơi không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "việc bơi lội" (n).',
      'Gợi ý 2: Phiên âm: /ˈswɪmɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-37',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - A CLOSER LOOK 2]\nAre they learning ________?',
    options: [
      'like',
      'bookshop',
      'parents',
      'English'
    ],
    correctAnswer: 'English',
    explanation: 'Từ "English" (/ˈɪŋɡlɪʃ/) có nghĩa tiếng Việt là "tiếng Anh". Ví dụ: Họ đang học tiếng Anh?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiếng Anh" (n).',
      'Gợi ý 2: Phiên âm: /ˈɪŋɡlɪʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-38',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - COMMUNICATION]\nIn my ________.',
    options: [
      'must',
      'care',
      'free time',
      'kind'
    ],
    correctAnswer: 'free time',
    explanation: 'Từ "free time" (/ˌfriː ˈtaɪm/) có nghĩa tiếng Việt là "thời gian rảnh rỗi". Ví dụ: Trong thời gian rảnh rỗi của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời gian rảnh rỗi" (n).',
      'Gợi ý 2: Phiên âm: /ˌfriː ˈtaɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-39',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - COMMUNICATION]\nI usually read to them at the ________.',
    options: [
      'careful',
      'nose',
      'present',
      'weekend'
    ],
    correctAnswer: 'weekend',
    explanation: 'Từ "weekend" (/ˌwiːkˈend/) có nghĩa tiếng Việt là "cuối tuần". Ví dụ: Tôi thường đọc cho họ nghe vào cuối tuần.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuối tuần" (n).',
      'Gợi ý 2: Phiên âm: /ˌwiːkˈend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-40',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - COMMUNICATION]\nI\'m drawing in my ________.',
    options: [
      'weekend',
      'garden',
      'friendly',
      'sit down'
    ],
    correctAnswer: 'garden',
    explanation: 'Từ "garden" (/ˈɡɑːdn/) có nghĩa tiếng Việt là "khu vườn". Ví dụ: Tôi đang vẽ trong khu vườn của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu vườn" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡɑːdn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-41',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - COMMUNICATION]\nShe\'s ________ with long black hair.',
    options: [
      'comic book',
      'curly',
      'basketball',
      'short'
    ],
    correctAnswer: 'short',
    explanation: 'Từ "short" (/ʃɔːt/) có nghĩa tiếng Việt là "thấp, ngắn". Ví dụ: Cô ấy thấp với mái tóc đen dài.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thấp, ngắn" (adj).',
      'Gợi ý 2: Phiên âm: /ʃɔːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-42',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - COMMUNICATION]\nI can do my homework without my ________.',
    options: [
      'parents',
      'camp',
      'club',
      'summer'
    ],
    correctAnswer: 'parents',
    explanation: 'Từ "parents" (/ˈpeərənts/) có nghĩa tiếng Việt là "bố mẹ". Ví dụ: Tôi có thể làm bài tập về nhà mà không cần bố mẹ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bố mẹ" (n).',
      'Gợi ý 2: Phiên âm: /ˈpeərənts/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-43',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - COMMUNICATION]\nI\'m going to an English ________ now.',
    options: [
      'comic book',
      'club',
      'football',
      'bookshop'
    ],
    correctAnswer: 'club',
    explanation: 'Từ "club" (/klʌb/) có nghĩa tiếng Việt là "câu lạc bộ". Ví dụ: Bây giờ tôi sẽ đến một câu lạc bộ tiếng Anh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "câu lạc bộ" (n).',
      'Gợi ý 2: Phiên âm: /klʌb/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-44',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nPhong\'s reading a ________.',
    options: [
      'comic book',
      'drawing',
      'someone',
      'yearbook'
    ],
    correctAnswer: 'comic book',
    explanation: 'Từ "comic book" (/ˈkɒmɪk bʊk/) có nghĩa tiếng Việt là "truyện tranh". Ví dụ: Phong đang đọc truyện tranh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "truyện tranh" (n).',
      'Gợi ý 2: Phiên âm: /ˈkɒmɪk bʊk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-45',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nNhung\'s playing the ________.',
    options: [
      'hand',
      'English',
      'careful',
      'violin'
    ],
    correctAnswer: 'violin',
    explanation: 'Từ "violin" (/ˌvaɪəˈlɪn/) có nghĩa tiếng Việt là "đàn vĩ cầm". Ví dụ: Nhung đang chơi vĩ cầm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đàn vĩ cầm" (n).',
      'Gợi ý 2: Phiên âm: /ˌvaɪəˈlɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-46',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nI ________ go now.',
    options: [
      'laugh',
      'blonde',
      'must',
      'drawing'
    ],
    correctAnswer: 'must',
    explanation: 'Từ "must" (/mʌst/) có nghĩa tiếng Việt là "phải". Ví dụ: Tôi phải đi bây giờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phải" (aux).',
      'Gợi ý 2: Phiên âm: /mʌst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-47',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nThe children can speak Vietnamese at the ________.',
    options: [
      'supermarket',
      'camp',
      'food',
      'careful'
    ],
    correctAnswer: 'camp',
    explanation: 'Từ "camp" (/kæmp/) có nghĩa tiếng Việt là "trại, hội trại". Ví dụ: Các em nhỏ có thể nói tiếng Việt tại trại.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trại, hội trại" (n).',
      'Gợi ý 2: Phiên âm: /kæmp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-48',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nHe\'s ________ and sporty.',
    options: [
      'like',
      'classmate',
      'careful',
      'tall'
    ],
    correctAnswer: 'tall',
    explanation: 'Từ "tall" (/tɔːl/) có nghĩa tiếng Việt là "cao". Ví dụ: Anh ấy cao và thể thao.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cao" (adj).',
      'Gợi ý 2: Phiên âm: /tɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-49',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nWho is the superb ________ camp for?',
    options: [
      'can',
      'summer',
      'confident',
      'violin'
    ],
    correctAnswer: 'summer',
    explanation: 'Từ "summer" (/ˈsʌmə(r)/) có nghĩa tiếng Việt là "mùa hè". Ví dụ: Trại hè tuyệt vời dành cho ai?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mùa hè" (n).',
      'Gợi ý 2: Phiên âm: /ˈsʌmə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-50',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nWhat ________ people do at summer camp?',
    options: [
      'can',
      'badminton',
      'sit down',
      'supermarket'
    ],
    correctAnswer: 'can',
    explanation: 'Từ "can" (/kæn/) có nghĩa tiếng Việt là "có thể". Ví dụ: Mọi người có thể làm gì ở trại hè?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có thể" (v).',
      'Gợi ý 2: Phiên âm: /kæn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-51',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nWow, ________ here is in English!',
    options: [
      'free time',
      'food',
      'everything',
      'eye'
    ],
    correctAnswer: 'everything',
    explanation: 'Từ "everything" (/ˈevriθɪŋ/) có nghĩa tiếng Việt là "mọi thứ". Ví dụ: Chà, mọi thứ ở đây đều bằng tiếng Anh!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mọi thứ" (pronoun).',
      'Gợi ý 2: Phiên âm: /ˈevriθɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-52',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nHe has ________ hair.',
    options: [
      'laugh',
      'yearbook',
      'blonde',
      'drawing'
    ],
    correctAnswer: 'blonde',
    explanation: 'Từ "blonde" (/blɒnd/) có nghĩa tiếng Việt là "vàng (tóc)". Ví dụ: Anh ấy có mái tóc vàng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vàng (tóc)" (adj).',
      'Gợi ý 2: Phiên âm: /blɒnd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-53',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nHe plays ________ very well.',
    options: [
      'bookshop',
      'basketball',
      'short',
      'class'
    ],
    correctAnswer: 'basketball',
    explanation: 'Từ "basketball" (/ˈbɑːskɪtbɔːl/) có nghĩa tiếng Việt là "bóng rổ". Ví dụ: Anh ấy chơi bóng rổ rất giỏi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bóng rổ" (n).',
      'Gợi ý 2: Phiên âm: /ˈbɑːskɪtbɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-54',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nShe has ________ black hair.',
    options: [
      'curly',
      'food',
      'funny',
      'supermarket'
    ],
    correctAnswer: 'curly',
    explanation: 'Từ "curly" (/ˈkɜːli/) có nghĩa tiếng Việt là "xoăn". Ví dụ: Cô ấy có mái tóc đen xoăn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "xoăn" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkɜːli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-55',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nHe\'s ________ and kind.',
    options: [
      'living room',
      'bookshop',
      'picnic',
      'funny'
    ],
    correctAnswer: 'funny',
    explanation: 'Từ "funny" (/ˈfʌni/) có nghĩa tiếng Việt là "vui tính". Ví dụ: Anh ấy vui tính và tốt bụng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vui tính" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfʌni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-56',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 1]\nShe isn\'t ________.',
    options: [
      'active',
      'friend',
      'arm',
      'ice cream'
    ],
    correctAnswer: 'active',
    explanation: 'Từ "active" (/ˈæktɪv/) có nghĩa tiếng Việt là "năng động". Ví dụ: Cô ấy không năng động.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "năng động" (adj).',
      'Gợi ý 2: Phiên âm: /ˈæktɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-57',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - SKILLS 2]\nWhy do you ________ him?',
    options: [
      'violin',
      'homework',
      'careful',
      'like'
    ],
    correctAnswer: 'like',
    explanation: 'Từ "like" (/laɪk/) có nghĩa tiếng Việt là "thích". Ví dụ: Tại sao bạn thích anh ấy?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thích" (v).',
      'Gợi ý 2: Phiên âm: /laɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-58',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nHe makes everyone ________.',
    options: [
      'parents',
      'supermarket',
      'laugh',
      'hard working'
    ],
    correctAnswer: 'laugh',
    explanation: 'Từ "laugh" (/lɑːf/) có nghĩa tiếng Việt là "cười". Ví dụ: Anh ấy làm cho mọi người cười.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cười" (v).',
      'Gợi ý 2: Phiên âm: /lɑːf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-59',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nMy sister always does her homework before ________.',
    options: [
      'ice cream',
      'someone',
      'laugh',
      'class'
    ],
    correctAnswer: 'class',
    explanation: 'Từ "class" (/klɑːs/) có nghĩa tiếng Việt là "lớp học, giờ học". Ví dụ: Em gái tôi luôn làm bài tập về nhà trước khi đến lớp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lớp học, giờ học" (n).',
      'Gợi ý 2: Phiên âm: /klɑːs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-60',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nShe helps me with my ________.',
    options: [
      'homework',
      'idea',
      'comic book',
      'curly'
    ],
    correctAnswer: 'homework',
    explanation: 'Từ "homework" (/ˈhəʊmwɜːk/) có nghĩa tiếng Việt là "bài tập về nhà". Ví dụ: Cô ấy giúp tôi làm bài tập về nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bài tập về nhà" (n).',
      'Gợi ý 2: Phiên âm: /ˈhəʊmwɜːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-61',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nHe ________s about everybody.',
    options: [
      'take photos',
      'picnic',
      'food',
      'care'
    ],
    correctAnswer: 'care',
    explanation: 'Từ "care" (/keə(r)/) có nghĩa tiếng Việt là "quan tâm". Ví dụ: Anh ấy quan tâm đến tất cả mọi người.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quan tâm" (v).',
      'Gợi ý 2: Phiên âm: /keə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-62',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nWho has a round ________?',
    options: [
      'take photos',
      'face',
      'supermarket',
      'kind'
    ],
    correctAnswer: 'face',
    explanation: 'Từ "face" (/feɪs/) có nghĩa tiếng Việt là "khuôn mặt". Ví dụ: Ai có khuôn mặt tròn?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khuôn mặt" (n).',
      'Gợi ý 2: Phiên âm: /feɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-63',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nDoes the ________ next to you have long hair?',
    options: [
      'violin',
      'classmate',
      'English',
      'like'
    ],
    correctAnswer: 'classmate',
    explanation: 'Từ "classmate" (/ˈklɑːsmeɪt/) có nghĩa tiếng Việt là "bạn cùng lớp". Ví dụ: Bạn học bên cạnh bạn có tóc dài không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bạn cùng lớp" (n).',
      'Gợi ý 2: Phiên âm: /ˈklɑːsmeɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-64',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - LOOKING BACK]\nHe reads a book in the ________.',
    options: [
      'living room',
      'kind',
      'classmate',
      'face'
    ],
    correctAnswer: 'living room',
    explanation: 'Từ "living room" (/ˈlɪvɪŋ ruːm/) có nghĩa tiếng Việt là "phòng khách". Ví dụ: Anh ấy đọc sách trong phòng khách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng khách" (n).',
      'Gợi ý 2: Phiên âm: /ˈlɪvɪŋ ruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u3-v-65',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 3: MY FRIENDS - PROJECT]\nHow to make a class ________?',
    options: [
      'someone',
      'friend',
      'active',
      'yearbook'
    ],
    correctAnswer: 'yearbook',
    explanation: 'Từ "yearbook" (/ˈjɪəbʊk/) có nghĩa tiếng Việt là "kỷ yếu". Ví dụ: Làm kỷ yếu lớp như thế nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kỷ yếu" (n).',
      'Gợi ý 2: Phiên âm: /ˈjɪəbʊk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-1',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nPhong ________s in Hoi An.',
    options: [
      'countryside',
      'friendly',
      'again',
      'arrive'
    ],
    correctAnswer: 'arrive',
    explanation: 'Từ "arrive" (/əˈraɪv/) có nghĩa tiếng Việt là "đến". Ví dụ: Phong đến Hội An.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đến" (v).',
      'Gợi ý 2: Phiên âm: /əˈraɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-2',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nI\'m so ________.',
    options: [
      'traffic',
      'peaceful',
      'lively',
      'excited'
    ],
    correctAnswer: 'excited',
    explanation: 'Từ "excited" (/ɪkˈsaɪtɪd/) có nghĩa tiếng Việt là "phấn khích". Ví dụ: Tôi rất phấn khích.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phấn khích" (adj).',
      'Gợi ý 2: Phiên âm: /ɪkˈsaɪtɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-3',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nIt is so ________.',
    options: [
      'beautiful',
      'presents',
      'left',
      'map'
    ],
    correctAnswer: 'beautiful',
    explanation: 'Từ "beautiful" (/ˈbjuːtɪfl/) có nghĩa tiếng Việt là "đẹp". Ví dụ: Nó thật là đẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đẹp" (adj).',
      'Gợi ý 2: Phiên âm: /ˈbjuːtɪfl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-4',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nWhere shall we go ________?',
    options: [
      'first',
      'cathedral',
      'exciting',
      'modern'
    ],
    correctAnswer: 'first',
    explanation: 'Từ "first" (/fɜːst/) có nghĩa tiếng Việt là "đầu tiên, trước hết". Ví dụ: Chúng ta sẽ đi đâu trước?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đầu tiên, trước hết" (adv).',
      'Gợi ý 2: Phiên âm: /fɜːst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-5',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nTake the second turning on the ________.',
    options: [
      'heavy',
      'pagoda',
      'convenient',
      'left'
    ],
    correctAnswer: 'left',
    explanation: 'Từ "left" (/left/) có nghĩa tiếng Việt là "bên trái". Ví dụ: Đi ở ngã rẽ thứ hai bên trái.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bên trái" (adv).',
      'Gợi ý 2: Phiên âm: /left/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-6',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nI think we\'re ________.',
    options: [
      'beautiful',
      'noisy',
      'cathedral',
      'lost'
    ],
    correctAnswer: 'lost',
    explanation: 'Từ "lost" (/lɒst/) có nghĩa tiếng Việt là "bị lạc". Ví dụ: Tôi nghĩ chúng ta đã bị lạc.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bị lạc" (adj).',
      'Gợi ý 2: Phiên âm: /lɒst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-7',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nThe girl shows them the ________ to Tan Ky house.',
    options: [
      'way',
      'post office',
      'beautiful',
      'arrive'
    ],
    correctAnswer: 'way',
    explanation: 'Từ "way" (/weɪ/) có nghĩa tiếng Việt là "đường đi". Ví dụ: Cô gái chỉ cho họ đường đến nhà Tấn Kỳ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đường đi" (n).',
      'Gợi ý 2: Phiên âm: /weɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-8',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nPhong ________s to go to Tan Ky house.',
    options: [
      'arrive',
      'tour',
      'fantastic',
      'decide'
    ],
    correctAnswer: 'decide',
    explanation: 'Từ "decide" (/dɪˈsaɪd/) có nghĩa tiếng Việt là "quyết định". Ví dụ: Phong quyết định đến nhà Tấn Kỳ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quyết định" (v).',
      'Gợi ý 2: Phiên âm: /dɪˈsaɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-9',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nIs that the ________?',
    options: [
      'railway station',
      'gym',
      'start',
      'cinema'
    ],
    correctAnswer: 'gym',
    explanation: 'Từ "gym" (/dʒɪm/) có nghĩa tiếng Việt là "phòng tập thể dục". Ví dụ: Đó có phải phòng tập gym không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng tập thể dục" (n).',
      'Gợi ý 2: Phiên âm: /dʒɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-10',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - GETTING STARTED]\nNo, try ________.',
    options: [
      'again',
      'far',
      'busy',
      'cathedral'
    ],
    correctAnswer: 'again',
    explanation: 'Từ "again" (/əˈɡen/) có nghĩa tiếng Việt là "lại, thử lại". Ví dụ: Không, thử lại đi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lại, thử lại" (adv).',
      'Gợi ý 2: Phiên âm: /əˈɡen/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-11',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nIs your ________ quiet?',
    options: [
      'lively',
      'peaceful',
      'busy',
      'neighbourhood'
    ],
    correctAnswer: 'neighbourhood',
    explanation: 'Từ "neighbourhood" (/ˈneɪbəhʊd/) có nghĩa tiếng Việt là "khu hàng xóm, khu vực sống". Ví dụ: Khu phố của bạn có yên tĩnh không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu hàng xóm, khu vực sống" (n).',
      'Gợi ý 2: Phiên âm: /ˈneɪbəhʊd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-12',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nIt\'s ________.',
    options: [
      'tour',
      'post office',
      'weather',
      'noisy'
    ],
    correctAnswer: 'noisy',
    explanation: 'Từ "noisy" (/ˈnɔɪzi/) có nghĩa tiếng Việt là "ồn ào". Ví dụ: Thật là ồn ào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ồn ào" (adj).',
      'Gợi ý 2: Phiên âm: /ˈnɔɪzi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-13',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nMy city is very ________.',
    options: [
      'quiet',
      'seafood',
      'pagoda',
      'food'
    ],
    correctAnswer: 'quiet',
    explanation: 'Từ "quiet" (/ˈkwaɪət/) có nghĩa tiếng Việt là "yên tĩnh". Ví dụ: Thành phố của tôi rất yên tĩnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "yên tĩnh" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkwaɪət/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-14',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nThe people here are ________.',
    options: [
      'peaceful',
      'outdoor',
      'central',
      'busy'
    ],
    correctAnswer: 'busy',
    explanation: 'Từ "busy" (/ˈbɪzi/) có nghĩa tiếng Việt là "bận rộn, nhộn nhịp". Ví dụ: Những người ở đây bận rộn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bận rộn, nhộn nhịp" (adj).',
      'Gợi ý 2: Phiên âm: /ˈbɪzi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-15',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nIt is a ________ place to live in.',
    options: [
      'lively',
      'street',
      'dislike',
      'cathedral'
    ],
    correctAnswer: 'lively',
    explanation: 'Từ "lively" (/ˈlaɪvli/) có nghĩa tiếng Việt là "sống động, nhộn nhịp". Ví dụ: Đó là một nơi sống động để ở.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sống động, nhộn nhịp" (adj).',
      'Gợi ý 2: Phiên âm: /ˈlaɪvli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-16',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nMy ________ is very pretty.',
    options: [
      'city',
      'village',
      'dislike',
      'way'
    ],
    correctAnswer: 'village',
    explanation: 'Từ "village" (/ˈvɪlɪdʒ/) có nghĩa tiếng Việt là "ngôi làng". Ví dụ: Làng tôi rất đẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngôi làng" (n).',
      'Gợi ý 2: Phiên âm: /ˈvɪlɪdʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-17',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nThe people here are ________.',
    options: [
      'post office',
      'big',
      'wide',
      'friendly'
    ],
    correctAnswer: 'friendly',
    explanation: 'Từ "friendly" (/ˈfrendli/) có nghĩa tiếng Việt là "thân thiện". Ví dụ: Con người ở đây rất thân thiện.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thân thiện" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfrendli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-18',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nIt is a ________ place to be.',
    options: [
      'village',
      'far',
      'central',
      'fantastic'
    ],
    correctAnswer: 'fantastic',
    explanation: 'Từ "fantastic" (/fænˈtæstɪk/) có nghĩa tiếng Việt là "tuyệt vời". Ví dụ: Đó là một nơi tuyệt vời để đến.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tuyệt vời" (adj).',
      'Gợi ý 2: Phiên âm: /fænˈtæstɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-19',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nThe onerous task of finding a ________ solution.',
    options: [
      'busy',
      'peaceful',
      'narrow',
      'start'
    ],
    correctAnswer: 'peaceful',
    explanation: 'Từ "peaceful" (/ˈpiːsfl/) có nghĩa tiếng Việt là "thanh bình, bình yên". Ví dụ: Nhiệm vụ khó khăn là tìm ra một giải pháp hòa bình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thanh bình, bình yên" (adj).',
      'Gợi ý 2: Phiên âm: /ˈpiːsfl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-20',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nOur local shop has very ________ opening hours.',
    options: [
      'noisy',
      'delicious',
      'traffic',
      'convenient'
    ],
    correctAnswer: 'convenient',
    explanation: 'Từ "convenient" (/kənˈviːniənt/) có nghĩa tiếng Việt là "tiện lợi, thuận tiện". Ví dụ: Cửa hàng địa phương của chúng tôi có giờ mở cửa rất thuận tiện.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiện lợi, thuận tiện" (adj).',
      'Gợi ý 2: Phiên âm: /kənˈviːniənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-21',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nI got a ________ flight at the last minute.',
    options: [
      'cheap',
      'seafood',
      'pagoda',
      'friendly'
    ],
    correctAnswer: 'cheap',
    explanation: 'Từ "cheap" (/tʃiːp/) có nghĩa tiếng Việt là "rẻ". Ví dụ: Tôi đã mua được một chuyến bay giá rẻ vào phút cuối.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rẻ" (adj).',
      'Gợi ý 2: Phiên âm: /tʃiːp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-22',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nMake sure your hands are ________ before you have your dinner.',
    options: [
      'clean',
      'dislike',
      'busy',
      'street'
    ],
    correctAnswer: 'clean',
    explanation: 'Từ "clean" (/kliːn/) có nghĩa tiếng Việt là "sạch sẽ". Ví dụ: Đảm bảo tay bạn sạch sẽ trước khi ăn tối.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sạch sẽ" (adj).',
      'Gợi ý 2: Phiên âm: /kliːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-23',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nThe roof of the ________ was held up by a row of thick stone columns.',
    options: [
      'temple',
      'delicious',
      'museum',
      'street'
    ],
    correctAnswer: 'temple',
    explanation: 'Từ "temple" (/ˈtempl/) có nghĩa tiếng Việt là "ngôi đền". Ví dụ: Phần mái của ngôi đền được nâng đỡ bởi một hàng cột đá dày.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngôi đền" (n).',
      'Gợi ý 2: Phiên âm: /ˈtempl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-24',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nI was woken up by the chimes of the ________ bells.',
    options: [
      'railway station',
      'neighbourhood',
      'outdoor',
      'cathedral'
    ],
    correctAnswer: 'cathedral',
    explanation: 'Từ "cathedral" (/kəˈθiːdrəl/) có nghĩa tiếng Việt là "nhà thờ lớn, thánh đường". Ví dụ: Tôi bị đánh thức bởi tiếng chuông nhà thờ lớn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà thờ lớn, thánh đường" (n).',
      'Gợi ý 2: Phiên âm: /kəˈθiːdrəl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-25',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nA taxi had dropped him and his luggage at the main ________.',
    options: [
      'way',
      'suburbs',
      'pagoda',
      'railway station'
    ],
    correctAnswer: 'railway station',
    explanation: 'Từ "railway station" (/ˈreɪlweɪ ˌsteɪʃn/) có nghĩa tiếng Việt là "nhà ga xe lửa". Ví dụ: Một chiếc taxi đã thả anh ta và hành lý tại nhà ga chính.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà ga xe lửa" (n).',
      'Gợi ý 2: Phiên âm: /ˈreɪlweɪ ˌsteɪʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-26',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 1]\nIs there a ________ in your neighbourhood?',
    options: [
      'food',
      'busy',
      'first',
      'square'
    ],
    correctAnswer: 'square',
    explanation: 'Từ "square" (/skweə(r)/) có nghĩa tiếng Việt là "quảng trường". Ví dụ: Có quảng trường nào trong khu phố của bạn không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quảng trường" (n).',
      'Gợi ý 2: Phiên âm: /skweə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-27',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nA house in a city is normally more expensive than a house in the ________.',
    options: [
      'big',
      'gym',
      'way',
      'countryside'
    ],
    correctAnswer: 'countryside',
    explanation: 'Từ "countryside" (/ˈkʌntrisaɪd/) có nghĩa tiếng Việt là "vùng nông thôn". Ví dụ: Một ngôi nhà ở thành phố thường đắt hơn một ngôi nhà ở nông thôn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vùng nông thôn" (n).',
      'Gợi ý 2: Phiên âm: /ˈkʌntrisaɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-28',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nLiving in the countryside is more peaceful than living in a ________.',
    options: [
      'peaceful',
      'city',
      'food',
      'temple'
    ],
    correctAnswer: 'city',
    explanation: 'Từ "city" (/ˈsɪti/) có nghĩa tiếng Việt là "thành phố". Ví dụ: Sống ở nông thôn yên bình hơn sống ở thành phố.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thành phố" (n).',
      'Gợi ý 2: Phiên âm: /ˈsɪti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-29',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nIs living in a city more ________ than living in the countryside?',
    options: [
      'big',
      'outdoor',
      'suburbs',
      'exciting'
    ],
    correctAnswer: 'exciting',
    explanation: 'Từ "exciting" (/ɪkˈsaɪtɪŋ/) có nghĩa tiếng Việt là "thú vị, sôi động". Ví dụ: Sống ở thành phố có thú vị hơn sống ở nông thôn không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thú vị, sôi động" (adj).',
      'Gợi ý 2: Phiên âm: /ɪkˈsaɪtɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-30',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nThe square in Hanoi is ________ger than the square in Hoi An.',
    options: [
      'big',
      'modern',
      'cathedral',
      'gym'
    ],
    correctAnswer: 'big',
    explanation: 'Từ "big" (/bɪɡ/) có nghĩa tiếng Việt là "lớn, to". Ví dụ: Quảng trường ở Hà Nội lớn hơn quảng trường ở Hội An.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lớn, to" (adj).',
      'Gợi ý 2: Phiên âm: /bɪɡ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-31',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nThe ________ is hotter.',
    options: [
      'weather',
      'market',
      'seafood',
      'presents'
    ],
    correctAnswer: 'weather',
    explanation: 'Từ "weather" (/ˈweðə(r)/) có nghĩa tiếng Việt là "thời tiết". Ví dụ: Thời tiết nóng hơn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời tiết" (n).',
      'Gợi ý 2: Phiên âm: /ˈweðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-32',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nThe streets are wide with less ________.',
    options: [
      'post office',
      'narrow',
      'left',
      'traffic'
    ],
    correctAnswer: 'traffic',
    explanation: 'Từ "traffic" (/ˈtræfɪk/) có nghĩa tiếng Việt là "giao thông, xe cộ". Ví dụ: Đường phố rộng rãi, ít xe cộ qua lại.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giao thông, xe cộ" (n).',
      'Gợi ý 2: Phiên âm: /ˈtræfɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-33',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nThe ________ here is delicious.',
    options: [
      'neighbourhood',
      'central',
      'excited',
      'seafood'
    ],
    correctAnswer: 'seafood',
    explanation: 'Từ "seafood" (/ˈsiːfuːd/) có nghĩa tiếng Việt là "hải sản". Ví dụ: Hải sản ở đây rất ngon.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hải sản" (n).',
      'Gợi ý 2: Phiên âm: /ˈsiːfuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-34',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nThis wine is ________.',
    options: [
      'delicious',
      'wide',
      'museum',
      'lively'
    ],
    correctAnswer: 'delicious',
    explanation: 'Từ "delicious" (/dɪˈlɪʃəs/) có nghĩa tiếng Việt là "rất ngon". Ví dụ: Rượu này rất ngon.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rất ngon" (adj).',
      'Gợi ý 2: Phiên âm: /dɪˈlɪʃəs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-35',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nThe river was deep and ________.',
    options: [
      'modern',
      'street',
      'wide',
      'gym'
    ],
    correctAnswer: 'wide',
    explanation: 'Từ "wide" (/waɪd/) có nghĩa tiếng Việt là "rộng". Ví dụ: Dòng sông sâu và rộng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rộng" (adj).',
      'Gợi ý 2: Phiên âm: /waɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-36',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nBy ten o\'clock the bar was ________.',
    options: [
      'crowded',
      'excited',
      'neighbourhood',
      'central'
    ],
    correctAnswer: 'crowded',
    explanation: 'Từ "crowded" (/ˈkraʊdɪd/) có nghĩa tiếng Việt là "đông đúc". Ví dụ: Đến mười giờ quán đã đông khách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đông đúc" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkraʊdɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-37',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - A CLOSER LOOK 2]\nIs Long Son more ________ than Binh Minh?',
    options: [
      'modern',
      'market',
      'food',
      'heavy'
    ],
    correctAnswer: 'modern',
    explanation: 'Từ "modern" (/ˈmɒdn/) có nghĩa tiếng Việt là "hiện đại". Ví dụ: Long Sơn có hiện đại hơn Bình Minh không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hiện đại" (adj).',
      'Gợi ý 2: Phiên âm: /ˈmɒdn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-38',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nCould you tell me the way to the ________?',
    options: [
      'cinema',
      'first',
      'cheap',
      'busy'
    ],
    correctAnswer: 'cinema',
    explanation: 'Từ "cinema" (/ˈsɪnəmə/) có nghĩa tiếng Việt là "rạp chiếu phim". Ví dụ: Bạn có thể cho tôi biết đường đến rạp chiếu phim không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rạp chiếu phim" (n).',
      'Gợi ý 2: Phiên âm: /ˈsɪnəmə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-39',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nGo along this ________.',
    options: [
      'street',
      'lively',
      'modern',
      'fantastic'
    ],
    correctAnswer: 'street',
    explanation: 'Từ "street" (/striːt/) có nghĩa tiếng Việt là "đường phố". Ví dụ: Đi dọc đoạn đường này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đường phố" (n).',
      'Gợi ý 2: Phiên âm: /striːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-40',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nWhere\'s the ________?',
    options: [
      'village',
      'busy',
      'post office',
      'suburbs'
    ],
    correctAnswer: 'post office',
    explanation: 'Từ "post office" (/ˈpəʊst ˌɒfɪs/) có nghĩa tiếng Việt là "bưu điện". Ví dụ: Bưu điện ở đâu?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bưu điện" (n).',
      'Gợi ý 2: Phiên âm: /ˈpəʊst ˌɒfɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-41',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nTake the first turning on the ________.',
    options: [
      'right',
      'suburbs',
      'big',
      'central'
    ],
    correctAnswer: 'right',
    explanation: 'Từ "right" (/raɪt/) có nghĩa tiếng Việt là "bên phải". Ví dụ: Đi ở ngã rẽ đầu tiên bên phải.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bên phải" (adj).',
      'Gợi ý 2: Phiên âm: /raɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-42',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nLet\'s ________ our tour in Hoi An.',
    options: [
      'start',
      'map',
      'pagoda',
      'cinema'
    ],
    correctAnswer: 'start',
    explanation: 'Từ "start" (/stɑːt/) có nghĩa tiếng Việt là "bắt đầu". Ví dụ: Hãy bắt đầu chuyến tham quan của chúng tôi tại Hội An.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bắt đầu" (v).',
      'Gợi ý 2: Phiên âm: /stɑːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-43',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nA bus took us on a sightseeing ________ of the city.',
    options: [
      'noisy',
      'peaceful',
      'fantastic',
      'tour'
    ],
    correctAnswer: 'tour',
    explanation: 'Từ "tour" (/tʊə(r)/) có nghĩa tiếng Việt là "chuyến tham quan". Ví dụ: Xe buýt đưa chúng tôi đi một chuyến tham quan thành phố.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chuyến tham quan" (n).',
      'Gợi ý 2: Phiên âm: /tʊə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-44',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nFirst, go to the ________.',
    options: [
      'decide',
      'tour',
      'suburbs',
      'pagoda'
    ],
    correctAnswer: 'pagoda',
    explanation: 'Từ "pagoda" (/pəˈɡəʊdə/) có nghĩa tiếng Việt là "ngôi chùa". Ví dụ: Đầu tiên, hãy đến chùa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngôi chùa" (n).',
      'Gợi ý 2: Phiên âm: /pəˈɡəʊdə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-45',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nNext, go to the ________ of Sa Huynh culture.',
    options: [
      'decide',
      'museum',
      'city',
      'beautiful'
    ],
    correctAnswer: 'museum',
    explanation: 'Từ "museum" (/mjuˈziːəm/) có nghĩa tiếng Việt là "bảo tàng". Ví dụ: Tiếp theo, đến bảo tàng văn hóa Sa Huỳnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bảo tàng" (n).',
      'Gợi ý 2: Phiên âm: /mjuˈziːəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-46',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - COMMUNICATION]\nFinally, go to Hoa Nhap Workshop to buy some ________.',
    options: [
      'presents',
      'traffic',
      'excited',
      'far'
    ],
    correctAnswer: 'presents',
    explanation: 'Từ "presents" (/ˈpreznts/) có nghĩa tiếng Việt là "quà tặng". Ví dụ: Cuối cùng, đến Xưởng Hoa Nhập để mua quà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quà tặng" (n).',
      'Gợi ý 2: Phiên âm: /ˈpreznts/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-47',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 1]\nWhy is his neighbourhood great for ________ activities?',
    options: [
      'outdoor',
      'post office',
      'dislike',
      'right'
    ],
    correctAnswer: 'outdoor',
    explanation: 'Từ "outdoor" (/ˈaʊtdɔː(r)/) có nghĩa tiếng Việt là "ngoài trời". Ví dụ: Tại sao khu phố của anh ấy là nơi tuyệt vời cho các hoạt động ngoài trời?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngoài trời" (adj).',
      'Gợi ý 2: Phiên âm: /ˈaʊtdɔː(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-48',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 1]\nWhat are the ________ in his neighbourhood like?',
    options: [
      'dislike',
      'village',
      'people',
      'heavy'
    ],
    correctAnswer: 'people',
    explanation: 'Từ "people" (/ˈpiːpl/) có nghĩa tiếng Việt là "con người". Ví dụ: Những người trong khu phố của anh ấy như thế nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con người" (n).',
      'Gợi ý 2: Phiên âm: /ˈpiːpl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-49',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 1]\nDo you ________ it?',
    options: [
      'big',
      'dislike',
      'temple',
      'map'
    ],
    correctAnswer: 'dislike',
    explanation: 'Từ "dislike" (/dɪsˈlaɪk/) có nghĩa tiếng Việt là "không thích". Ví dụ: Bạn không thích nó sao?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "không thích" (v).',
      'Gợi ý 2: Phiên âm: /dɪsˈlaɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-50',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 1]\nI live in the ________ of Da Nang.',
    options: [
      'suburbs',
      'neighbourhood',
      'museum',
      'village'
    ],
    correctAnswer: 'suburbs',
    explanation: 'Từ "suburbs" (/ˈsʌbɜːbz/) có nghĩa tiếng Việt là "vùng ngoại thành". Ví dụ: Tôi sống ở ngoại thành Đà Nẵng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vùng ngoại thành" (n).',
      'Gợi ý 2: Phiên âm: /ˈsʌbɜːbz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-51',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 1]\nThe people are friendly and the ________ is good.',
    options: [
      'weather',
      'food',
      'right',
      'again'
    ],
    correctAnswer: 'food',
    explanation: 'Từ "food" (/fuːd/) có nghĩa tiếng Việt là "thức ăn, đồ ăn". Ví dụ: Con người thân thiện và thức ăn rất ngon.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thức ăn, đồ ăn" (n).',
      'Gợi ý 2: Phiên âm: /fuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-52',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 2]\nVy lives in the centre of Ho Chi Minh City.',
    options: [
      'left',
      'central',
      'pagoda',
      'food'
    ],
    correctAnswer: 'central',
    explanation: 'Từ "central" (/ˈsentrəl/) có nghĩa tiếng Việt là "trung tâm". Ví dụ: Vy sống ở trung tâm Thành phố Hồ Chí Minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trung tâm" (adj).',
      'Gợi ý 2: Phiên âm: /ˈsentrəl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-53',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 2]\nThere is a big ________ near her house.',
    options: [
      'start',
      'excited',
      'market',
      'exciting'
    ],
    correctAnswer: 'market',
    explanation: 'Từ "market" (/ˈmɑːkɪt/) có nghĩa tiếng Việt là "khu chợ". Ví dụ: Có một cái chợ lớn gần nhà cô ấy.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu chợ" (n).',
      'Gợi ý 2: Phiên âm: /ˈmɑːkɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-54',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 2]\nThe streets are ________.',
    options: [
      'beautiful',
      'gym',
      'square',
      'narrow'
    ],
    correctAnswer: 'narrow',
    explanation: 'Từ "narrow" (/ˈnærəʊ/) có nghĩa tiếng Việt là "chật hẹp". Ví dụ: Đường phố chật hẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chật hẹp" (adj).',
      'Gợi ý 2: Phiên âm: /ˈnærəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-55',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - SKILLS 2]\nThe schools are ________ away.',
    options: [
      'cheap',
      'city',
      'delicious',
      'far'
    ],
    correctAnswer: 'far',
    explanation: 'Từ "far" (/fɑː(r)/) có nghĩa tiếng Việt là "xa". Ví dụ: Các trường học ở rất xa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "xa" (adv).',
      'Gợi ý 2: Phiên âm: /fɑː(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-56',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - LOOKING BACK]\nHe labored up the hill with his ________ load.',
    options: [
      'heavy',
      'post office',
      'weather',
      'tour'
    ],
    correctAnswer: 'heavy',
    explanation: 'Từ "heavy" (/ˈhevi/) có nghĩa tiếng Việt là "nặng, nặng nề". Ví dụ: Anh ấy vất vả đi lên đồi với gánh nặng của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nặng, nặng nề" (adj).',
      'Gợi ý 2: Phiên âm: /ˈhevi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-57',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - LOOKING BACK]\nWe didn\'t expect such a ________ number of people to attend the concert.',
    options: [
      'narrow',
      'market',
      'beautiful',
      'large'
    ],
    correctAnswer: 'large',
    explanation: 'Từ "large" (/lɑːdʒ/) có nghĩa tiếng Việt là "lớn, rộng lớn". Ví dụ: Chúng tôi không ngờ có số lượng lớn người tham dự buổi hòa nhạc đến vậy.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lớn, rộng lớn" (adj).',
      'Gợi ý 2: Phiên âm: /lɑːdʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u4-v-58',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 4: MY NEIGHBOURHOOD - PROJECT]\nWe need a large-scale ________ showing all the footpaths that we can walk along.',
    options: [
      'traffic',
      'map',
      'delicious',
      'large'
    ],
    correctAnswer: 'map',
    explanation: 'Từ "map" (/mæp/) có nghĩa tiếng Việt là "bản đồ". Ví dụ: Chúng ta cần một bản đồ tỷ lệ lớn hiển thị tất cả đường đi bộ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bản đồ" (n).',
      'Gợi ý 2: Phiên âm: /mæp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-1',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nHello, welcome to our ________ club.',
    options: [
      'backpack',
      'famous',
      'plaster',
      'geography'
    ],
    correctAnswer: 'geography',
    explanation: 'Từ "geography" (/dʒiˈɒɡrəfi/) có nghĩa tiếng Việt là "địa lý". Ví dụ: Xin chào, chào mừng đến với câu lạc bộ địa lý của chúng tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "địa lý" (n).',
      'Gợi ý 2: Phiên âm: /dʒiˈɒɡrəfi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-2',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nWe are just starting ________.',
    options: [
      'explore',
      'know',
      'forest',
      'now'
    ],
    correctAnswer: 'now',
    explanation: 'Từ "now" (/naʊ/) có nghĩa tiếng Việt là "bây giờ". Ví dụ: Chúng tôi chỉ mới bắt đầu bây giờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bây giờ" (adv).',
      'Gợi ý 2: Phiên âm: /naʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-3',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\n________ you must always be on time.',
    options: [
      'remember',
      'hotel',
      'now',
      'picnic'
    ],
    correctAnswer: 'remember',
    explanation: 'Từ "remember" (/rɪˈmembə(r)/) có nghĩa tiếng Việt là "nhớ". Ví dụ: Hãy nhớ rằng bạn phải luôn luôn đúng giờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhớ" (v).',
      'Gợi ý 2: Phiên âm: /rɪˈmembə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-4',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nToday I\'m going to talk about some natural ________s of Vietnam.',
    options: [
      'geography',
      'sunscreen',
      'wonder',
      'cold'
    ],
    correctAnswer: 'wonder',
    explanation: 'Từ "wonder" (/ˈwʌndə(r)/) có nghĩa tiếng Việt là "kỳ quan". Ví dụ: Hôm nay tôi sẽ nói về một số kỳ quan thiên nhiên của Việt Nam.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kỳ quan" (n).',
      'Gợi ý 2: Phiên âm: /ˈwʌndə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-5',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nWhat\'s that in the first ________?',
    options: [
      'holiday',
      'furniture',
      'picture',
      'boat'
    ],
    correctAnswer: 'picture',
    explanation: 'Từ "picture" (/ˈpɪktʃə(r)/) có nghĩa tiếng Việt là "bức ảnh". Ví dụ: Đó là gì trong hình ảnh đầu tiên?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bức ảnh" (n).',
      'Gợi ý 2: Phiên âm: /ˈpɪktʃə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-6',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nIt looks ________.',
    options: [
      'hat',
      'amazing',
      'question',
      'clothes'
    ],
    correctAnswer: 'amazing',
    explanation: 'Từ "amazing" (/əˈmeɪzɪŋ/) có nghĩa tiếng Việt là "tuyệt vời, kinh ngạc". Ví dụ: Nó trông thật tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tuyệt vời, kinh ngạc" (adj).',
      'Gợi ý 2: Phiên âm: /əˈmeɪzɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-7',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nIt has many ________s.',
    options: [
      'island',
      'compass',
      'furniture',
      'summer'
    ],
    correctAnswer: 'island',
    explanation: 'Từ "island" (/ˈaɪlənd/) có nghĩa tiếng Việt là "hòn đảo". Ví dụ: Nó có nhiều hòn đảo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hòn đảo" (n).',
      'Gợi ý 2: Phiên âm: /ˈaɪlənd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-8',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nThe ________ is wonderful.',
    options: [
      'scenery',
      'understand',
      'now',
      'Australia'
    ],
    correctAnswer: 'scenery',
    explanation: 'Từ "scenery" (/ˈsiːnəri/) có nghĩa tiếng Việt là "phong cảnh". Ví dụ: Phong cảnh thật tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phong cảnh" (n).',
      'Gợi ý 2: Phiên âm: /ˈsiːnəri/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-9',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nThis picture shows a ________ island.',
    options: [
      'large',
      'waterfall',
      'head',
      'hotel'
    ],
    correctAnswer: 'large',
    explanation: 'Từ "large" (/lɑːdʒ/) có nghĩa tiếng Việt là "lớn". Ví dụ: Bức ảnh này cho thấy một hòn đảo lớn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lớn" (adj).',
      'Gợi ý 2: Phiên âm: /lɑːdʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-10',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nThey are ________s.',
    options: [
      'sugar',
      'rock',
      'question',
      'cold'
    ],
    correctAnswer: 'rock',
    explanation: 'Từ "rock" (/rɒk/) có nghĩa tiếng Việt là "tảng đá". Ví dụ: Chúng là những tảng đá.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tảng đá" (n).',
      'Gợi ý 2: Phiên âm: /rɒk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-11',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nHa Long Bay is ________ and the nature is wonderful.',
    options: [
      'charming',
      'question',
      'truth',
      'special'
    ],
    correctAnswer: 'charming',
    explanation: 'Từ "charming" (/ˈtʃɑːmɪŋ/) có nghĩa tiếng Việt là "hữu tình, quyến rũ". Ví dụ: Vịnh Hạ Long thật hữu tình và thiên nhiên kỳ thú.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hữu tình, quyến rũ" (adj).',
      'Gợi ý 2: Phiên âm: /ˈtʃɑːmɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-12',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nWhich of the following wonders is a ________?',
    options: [
      'Australia',
      'fridge',
      'know',
      'cave'
    ],
    correctAnswer: 'cave',
    explanation: 'Từ "cave" (/keɪv/) có nghĩa tiếng Việt là "hang động". Ví dụ: Kỳ quan nào sau đây là hang động?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hang động" (n).',
      'Gợi ý 2: Phiên âm: /keɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-13',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nWhich ________ is in Cao Bang?',
    options: [
      'Australia',
      'deep',
      'sunscreen',
      'waterfall'
    ],
    correctAnswer: 'waterfall',
    explanation: 'Từ "waterfall" (/ˈwɔːtəfɔːl/) có nghĩa tiếng Việt là "thác nước". Ví dụ: Thác nước nào ở Cao Bằng?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thác nước" (n).',
      'Gợi ý 2: Phiên âm: /ˈwɔːtəfɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-14',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nWe sailed slowly down the ________.',
    options: [
      'river',
      'island',
      'empty',
      'deep'
    ],
    correctAnswer: 'river',
    explanation: 'Từ "river" (/ˈrɪvə(r)/) có nghĩa tiếng Việt là "dòng sông". Ví dụ: Chúng tôi đi thuyền từ từ xuống sông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dòng sông" (n).',
      'Gợi ý 2: Phiên âm: /ˈrɪvə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-15',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nThe children got lost in the ________.',
    options: [
      'desert',
      'overnight',
      'natural',
      'forest'
    ],
    correctAnswer: 'forest',
    explanation: 'Từ "forest" (/ˈfɒrɪst/) có nghĩa tiếng Việt là "khu rừng". Ví dụ: Những đứa trẻ bị lạc trong rừng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu rừng" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɒrɪst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-16',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nThey were lost in the ________ for nine days.',
    options: [
      'waterfall',
      'forest',
      'kite',
      'desert'
    ],
    correctAnswer: 'desert',
    explanation: 'Từ "desert" (/ˈdezət/) có nghĩa tiếng Việt là "sa mạc". Ví dụ: Họ đã bị lạc trong sa mạc chín ngày.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sa mạc" (n).',
      'Gợi ý 2: Phiên âm: /ˈdezət/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-17',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nThe Matterhorn is one of the biggest ________s in Europe.',
    options: [
      'forest',
      'hurt',
      'mountain',
      'island'
    ],
    correctAnswer: 'mountain',
    explanation: 'Từ "mountain" (/ˈmaʊntən/) có nghĩa tiếng Việt là "ngọn núi". Ví dụ: Matterhorn là một trong những ngọn núi lớn nhất ở Châu Âu.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngọn núi" (n).',
      'Gợi ý 2: Phiên âm: /ˈmaʊntən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-18',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - GETTING STARTED]\nWe spent the day on the ________.',
    options: [
      'famous',
      'beach',
      'amazing',
      'sure'
    ],
    correctAnswer: 'beach',
    explanation: 'Từ "beach" (/biːtʃ/) có nghĩa tiếng Việt là "bãi biển". Ví dụ: Chúng tôi đã dành cả ngày trên bãi biển.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bãi biển" (n).',
      'Gợi ý 2: Phiên âm: /biːtʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-19',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nWe\'re ________.',
    options: [
      'museum',
      'item',
      'lesson',
      'lost'
    ],
    correctAnswer: 'lost',
    explanation: 'Từ "lost" (/lɒst/) có nghĩa tiếng Việt là "bị lạc". Ví dụ: Chúng tôi bị lạc rồi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bị lạc" (adj).',
      'Gợi ý 2: Phiên âm: /lɒst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-20',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nIt is a ________ day.',
    options: [
      'time',
      'picture',
      'overnight',
      'sunny'
    ],
    correctAnswer: 'sunny',
    explanation: 'Từ "sunny" (/ˈsʌni/) có nghĩa tiếng Việt là "có nắng, nắng". Ví dụ: Đó là một ngày nắng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có nắng, nắng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈsʌni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-21',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nI need to put on some ________.',
    options: [
      'sunscreen',
      'lost',
      'geography',
      'understand'
    ],
    correctAnswer: 'sunscreen',
    explanation: 'Từ "sunscreen" (/ˈsʌnskriːn/) có nghĩa tiếng Việt là "kem chống nắng". Ví dụ: Tôi cần bôi một ít kem chống nắng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kem chống nắng" (n).',
      'Gợi ý 2: Phiên âm: /ˈsʌnskriːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-22',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nWhen you go camping ________.',
    options: [
      'cave',
      'overnight',
      'camping site',
      'amazing'
    ],
    correctAnswer: 'overnight',
    explanation: 'Từ "overnight" (/ˌəʊvəˈnaɪt/) có nghĩa tiếng Việt là "qua đêm". Ví dụ: Khi bạn đi cắm trại qua đêm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "qua đêm" (adj).',
      'Gợi ý 2: Phiên âm: /ˌəʊvəˈnaɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-23',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nMy foot ________s.',
    options: [
      'T-shirt',
      'Australia',
      'picnic',
      'hurt'
    ],
    correctAnswer: 'hurt',
    explanation: 'Từ "hurt" (/hɜːt/) có nghĩa tiếng Việt là "làm đau, bị đau". Ví dụ: Bàn chân của tôi bị đau.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "làm đau, bị đau" (v).',
      'Gợi ý 2: Phiên âm: /hɜːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-24',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nI need to put on a ________.',
    options: [
      'deep',
      'island',
      'plaster',
      'charming'
    ],
    correctAnswer: 'plaster',
    explanation: 'Từ "plaster" (/ˈplɑːstə(r)/) có nghĩa tiếng Việt là "băng cá nhân". Ví dụ: Tôi cần phải dán băng cá nhân.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "băng cá nhân" (n).',
      'Gợi ý 2: Phiên âm: /ˈplɑːstə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-25',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nCould you pass me the ________ please?',
    options: [
      'charming',
      'arrive',
      'summer',
      'scissors'
    ],
    correctAnswer: 'scissors',
    explanation: 'Từ "scissors" (/ˈsɪzəz/) có nghĩa tiếng Việt là "cái kéo". Ví dụ: Bạn có thể đưa cho tôi cái kéo được không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái kéo" (n).',
      'Gợi ý 2: Phiên âm: /ˈsɪzəz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-26',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nIt\'s a frame ________ with a belt and padded shoulder straps.',
    options: [
      'furniture',
      'time',
      'shoe',
      'backpack'
    ],
    correctAnswer: 'backpack',
    explanation: 'Từ "backpack" (/ˈbækpæk/) có nghĩa tiếng Việt là "ba lô". Ví dụ: Đó là một chiếc ba lô khung có dây đai và dây đeo vai đệm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ba lô" (n).',
      'Gợi ý 2: Phiên âm: /ˈbækpæk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-27',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nThe discussion went beyond the ________ of my brain.',
    options: [
      'beach',
      'luggage',
      'wonder',
      'compass'
    ],
    correctAnswer: 'compass',
    explanation: 'Từ "compass" (/ˈkʌmpəs/) có nghĩa tiếng Việt là "la bàn". Ví dụ: Cuộc thảo luận đã vượt ra ngoài phạm vi bộ não của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "la bàn" (n).',
      'Gợi ý 2: Phiên âm: /ˈkʌmpəs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-28',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nHe can get his ________.',
    options: [
      'special',
      'waterfall',
      'sleeping bag',
      'boat'
    ],
    correctAnswer: 'sleeping bag',
    explanation: 'Từ "sleeping bag" (/ˈsliːpɪŋ bæɡ/) có nghĩa tiếng Việt là "túi ngủ". Ví dụ: Anh ấy có thể lấy túi ngủ của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "túi ngủ" (n).',
      'Gợi ý 2: Phiên âm: /ˈsliːpɪŋ bæɡ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-29',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nWhere is my ________?',
    options: [
      'T-shirt',
      'desert',
      'hat',
      'snow'
    ],
    correctAnswer: 'hat',
    explanation: 'Từ "hat" (/hæt/) có nghĩa tiếng Việt là "cái mũ". Ví dụ: Cái mũ của tôi ở đâu?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái mũ" (n).',
      'Gợi ý 2: Phiên âm: /hæt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-30',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nIt is on your ________.',
    options: [
      'famous',
      'head',
      'guide',
      'now'
    ],
    correctAnswer: 'head',
    explanation: 'Từ "head" (/hed/) có nghĩa tiếng Việt là "cái đầu". Ví dụ: Nó ở trên đầu bạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái đầu" (n).',
      'Gợi ý 2: Phiên âm: /hed/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-31',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nWhere do they stay on their ________?',
    options: [
      'holiday',
      'natural',
      'compass',
      'fridge'
    ],
    correctAnswer: 'holiday',
    explanation: 'Từ "holiday" (/ˈhɒlədeɪ/) có nghĩa tiếng Việt là "kỳ nghỉ". Ví dụ: Họ ở đâu vào kỳ nghỉ của họ?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kỳ nghỉ" (n).',
      'Gợi ý 2: Phiên âm: /ˈhɒlədeɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-32',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nI need some ________ for my cat.',
    options: [
      'meat',
      'understand',
      'now',
      'amazing'
    ],
    correctAnswer: 'meat',
    explanation: 'Từ "meat" (/miːt/) có nghĩa tiếng Việt là "thịt". Ví dụ: Tôi cần một ít thịt cho con mèo của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thịt" (n).',
      'Gợi ý 2: Phiên âm: /miːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-33',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nThe Sahara is a very ________ desert.',
    options: [
      'seafood',
      'overnight',
      'guide',
      'hot'
    ],
    correctAnswer: 'hot',
    explanation: 'Từ "hot" (/hɒt/) có nghĩa tiếng Việt là "nóng". Ví dụ: Sahara là một sa mạc rất nóng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nóng" (adj).',
      'Gợi ý 2: Phiên âm: /hɒt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-34',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nI want to ________ the island by boat.',
    options: [
      'explore',
      'special',
      'alone',
      'arrive'
    ],
    correctAnswer: 'explore',
    explanation: 'Từ "explore" (/ɪkˈsplɔː(r)/) có nghĩa tiếng Việt là "khám phá". Ví dụ: Tôi muốn khám phá hòn đảo bằng thuyền.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khám phá" (v).',
      'Gợi ý 2: Phiên âm: /ɪkˈsplɔː(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-35',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nWe took turns to row the ________ up the river.',
    options: [
      'plaster',
      'special',
      'amazing',
      'boat'
    ],
    correctAnswer: 'boat',
    explanation: 'Từ "boat" (/bəʊt/) có nghĩa tiếng Việt là "con thuyền". Ví dụ: Chúng tôi thay nhau chèo thuyền ngược dòng sông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con thuyền" (n).',
      'Gợi ý 2: Phiên âm: /bəʊt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-36',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 1]\nHe has written a fully comprehensive ________ to Rome.',
    options: [
      'Australia',
      'arrive',
      'hat',
      'guide'
    ],
    correctAnswer: 'guide',
    explanation: 'Từ "guide" (/ɡaɪd/) có nghĩa tiếng Việt là "hướng dẫn, cẩm nang". Ví dụ: Anh ấy đã viết một cuốn cẩm nang hướng dẫn đầy đủ về Rome.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hướng dẫn, cẩm nang" (n).',
      'Gợi ý 2: Phiên âm: /ɡaɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-37',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nThe children are very tired after a ________ of fun.',
    options: [
      'day',
      'question',
      'plaster',
      'hurry up'
    ],
    correctAnswer: 'day',
    explanation: 'Từ "day" (/deɪ/) có nghĩa tiếng Việt là "ngày". Ví dụ: Các con rất mệt sau một ngày vui chơi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngày" (n).',
      'Gợi ý 2: Phiên âm: /deɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-38',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nThe ________ is deep.',
    options: [
      'charming',
      'water',
      'deep',
      'head'
    ],
    correctAnswer: 'water',
    explanation: 'Từ "water" (/ˈwɔːtə(r)/) có nghĩa tiếng Việt là "nước". Ví dụ: Nước rất sâu.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nước" (n).',
      'Gợi ý 2: Phiên âm: /ˈwɔːtə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-39',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nThe hole is so ________ you can\'t see the bottom.',
    options: [
      'natural',
      'landscape',
      'holiday',
      'deep'
    ],
    correctAnswer: 'deep',
    explanation: 'Từ "deep" (/diːp/) có nghĩa tiếng Việt là "sâu". Ví dụ: Cái hố sâu đến mức bạn không thể nhìn thấy đáy.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sâu" (adj).',
      'Gợi ý 2: Phiên âm: /diːp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-40',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nMy mother uses real ________ in the cake she bakes.',
    options: [
      'time',
      'understand',
      'butter',
      'clothes'
    ],
    correctAnswer: 'butter',
    explanation: 'Từ "butter" (/ˈbʌtə(r)/) có nghĩa tiếng Việt là "bơ". Ví dụ: Mẹ tôi dùng bơ thật trong chiếc bánh bà nướng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bơ" (n).',
      'Gợi ý 2: Phiên âm: /ˈbʌtə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-41',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nRemember to bring the necessary ________s.',
    options: [
      'item',
      'picnic',
      'remember',
      'area'
    ],
    correctAnswer: 'item',
    explanation: 'Từ "item" (/ˈaɪtəm/) có nghĩa tiếng Việt là "vật dụng, món đồ". Ví dụ: Nhớ mang theo những vật dụng cần thiết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vật dụng, món đồ" (n).',
      'Gợi ý 2: Phiên âm: /ˈaɪtəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-42',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nHow about meeting in the canteen for some ________?',
    options: [
      'tea',
      'seafood',
      'famous',
      'sunny'
    ],
    correctAnswer: 'tea',
    explanation: 'Từ "tea" (/tiː/) có nghĩa tiếng Việt là "trà". Ví dụ: Gặp nhau ở căng tin uống trà thì sao?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trà" (n).',
      'Gợi ý 2: Phiên âm: /tiː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-43',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nI have a few ________s to ask you.',
    options: [
      'question',
      'beach',
      'deep',
      'clothes'
    ],
    correctAnswer: 'question',
    explanation: 'Từ "question" (/ˈkwestʃən/) có nghĩa tiếng Việt là "câu hỏi". Ví dụ: Tôi có một vài câu hỏi muốn hỏi bạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "câu hỏi" (n).',
      'Gợi ý 2: Phiên âm: /ˈkwestʃən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-44',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\n________ is very nice.',
    options: [
      'Australia',
      'meat',
      'sure',
      'special'
    ],
    correctAnswer: 'Australia',
    explanation: 'Từ "Australia" (/ɒsˈtreɪliə/) có nghĩa tiếng Việt là "nước Úc". Ví dụ: Nước Úc thật đẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nước Úc" (n).',
      'Gợi ý 2: Phiên âm: /ɒsˈtreɪliə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-45',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nIt has many ________ wonders.',
    options: [
      'know',
      'shoe',
      'natural',
      'truth'
    ],
    correctAnswer: 'natural',
    explanation: 'Từ "natural" (/ˈnætʃrəl/) có nghĩa tiếng Việt là "thuộc về thiên nhiên". Ví dụ: Nó có nhiều kỳ quan thiên nhiên.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thuộc về thiên nhiên" (adj).',
      'Gợi ý 2: Phiên âm: /ˈnætʃrəl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-46',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nThis is a difficult ________.',
    options: [
      'practice',
      'lesson',
      'overnight',
      'forest'
    ],
    correctAnswer: 'lesson',
    explanation: 'Từ "lesson" (/ˈlesn/) có nghĩa tiếng Việt là "bài học". Ví dụ: Đây là một bài học khó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bài học" (n).',
      'Gợi ý 2: Phiên âm: /ˈlesn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-47',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nYou can ________ it.',
    options: [
      'understand',
      'truth',
      'wonder',
      'guide'
    ],
    correctAnswer: 'understand',
    explanation: 'Từ "understand" (/ˌʌndəˈstænd/) có nghĩa tiếng Việt là "hiểu". Ví dụ: Bạn có thể hiểu nó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hiểu" (v).',
      'Gợi ý 2: Phiên âm: /ˌʌndəˈstænd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-48',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nIt is a very dry ________.',
    options: [
      'now',
      'area',
      'waterproof',
      'tea'
    ],
    correctAnswer: 'area',
    explanation: 'Từ "area" (/ˈeəriə/) có nghĩa tiếng Việt là "khu vực, vùng". Ví dụ: Đó là một khu vực rất khô hạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu vực, vùng" (n).',
      'Gợi ý 2: Phiên âm: /ˈeəriə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-49',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nThere isn\'t rain in ________.',
    options: [
      'truth',
      'now',
      'summer',
      'day'
    ],
    correctAnswer: 'summer',
    explanation: 'Từ "summer" (/ˈsʌmə(r)/) có nghĩa tiếng Việt là "mùa hè". Ví dụ: Không có mưa vào mùa hè.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mùa hè" (n).',
      'Gợi ý 2: Phiên âm: /ˈsʌmə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-50',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nWe must ________.',
    options: [
      'sunny',
      'famous',
      'hurry up',
      'summer'
    ],
    correctAnswer: 'hurry up',
    explanation: 'Từ "hurry up" (/ˈhʌri ʌp/) có nghĩa tiếng Việt là "nhanh lên". Ví dụ: Chúng ta phải nhanh lên.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhanh lên" (phr.v).',
      'Gợi ý 2: Phiên âm: /ˈhʌri ʌp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-51',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nIt\'s ________.',
    options: [
      'empty',
      'hurt',
      'mountain',
      'clothes'
    ],
    correctAnswer: 'empty',
    explanation: 'Từ "empty" (/ˈempti/) có nghĩa tiếng Việt là "trống rỗng". Ví dụ: Nó trống rỗng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trống rỗng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈempti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-52',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nThere isn\'t milk in the ________.',
    options: [
      'cold',
      'waterproof',
      'fridge',
      'wonder'
    ],
    correctAnswer: 'fridge',
    explanation: 'Từ "fridge" (/frɪdʒ/) có nghĩa tiếng Việt là "tủ lạnh". Ví dụ: Không có sữa trong tủ lạnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tủ lạnh" (n).',
      'Gợi ý 2: Phiên âm: /frɪdʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-53',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nHow much ________ do you need for your tea, Mum?',
    options: [
      'sugar',
      'river',
      'day',
      'tea'
    ],
    correctAnswer: 'sugar',
    explanation: 'Từ "sugar" (/ˈʃʊɡə(r)/) có nghĩa tiếng Việt là "đường". Ví dụ: Mẹ cần bao nhiêu đường cho trà?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đường" (n).',
      'Gợi ý 2: Phiên âm: /ˈʃʊɡə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-54',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nWe need to buy some new ________ for the house.',
    options: [
      'sugar',
      'furniture',
      'amazing',
      'tea'
    ],
    correctAnswer: 'furniture',
    explanation: 'Từ "furniture" (/ˈfɜːnɪtʃə(r)/) có nghĩa tiếng Việt là "đồ nội thất". Ví dụ: Chúng tôi cần mua một số đồ nội thất mới cho ngôi nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đồ nội thất" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɜːnɪtʃə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-55',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nYou must leave the ________ room before 12 o\'clock.',
    options: [
      'hot',
      'necessary',
      'sure',
      'hotel'
    ],
    correctAnswer: 'hotel',
    explanation: 'Từ "hotel" (/həʊˈtel/) có nghĩa tiếng Việt là "khách sạn". Ví dụ: Bạn phải rời phòng khách sạn trước 12 giờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khách sạn" (n).',
      'Gợi ý 2: Phiên âm: /həʊˈtel/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-56',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nYou make a lot of noise in the ________.',
    options: [
      'museum',
      'holiday',
      'river',
      'forest'
    ],
    correctAnswer: 'museum',
    explanation: 'Từ "museum" (/mjuˈziːəm/) có nghĩa tiếng Việt là "bảo tàng". Ví dụ: Bạn gây ra nhiều tiếng ồn trong bảo tàng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bảo tàng" (n).',
      'Gợi ý 2: Phiên âm: /mjuˈziːəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-57',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nMy mom says you always tell the ________.',
    options: [
      'truth',
      'Australia',
      'head',
      'seafood'
    ],
    correctAnswer: 'truth',
    explanation: 'Từ "truth" (/truːθ/) có nghĩa tiếng Việt là "sự thật". Ví dụ: Mẹ tôi nói bạn luôn nói sự thật.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sự thật" (n).',
      'Gợi ý 2: Phiên âm: /truːθ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-58',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nYou know you shouldn\'t go to bed with your ________s on.',
    options: [
      'waterproof',
      'shoe',
      'necessary',
      'amazing'
    ],
    correctAnswer: 'shoe',
    explanation: 'Từ "shoe" (/ʃuː/) có nghĩa tiếng Việt là "chiếc giày". Ví dụ: Bạn biết bạn không nên đi ngủ khi vẫn mang giày.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chiếc giày" (n).',
      'Gợi ý 2: Phiên âm: /ʃuː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-59',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nI need to ________ more.',
    options: [
      'river',
      'remember',
      'area',
      'practice'
    ],
    correctAnswer: 'practice',
    explanation: 'Từ "practice" (/ˈpræktɪs/) có nghĩa tiếng Việt là "rèn luyện, thực hành". Ví dụ: Tôi cần thực hành nhiều hơn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rèn luyện, thực hành" (v).',
      'Gợi ý 2: Phiên âm: /ˈpræktɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-60',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - A CLOSER LOOK 2]\nWe must ________ on time.',
    options: [
      'cave',
      'shoe',
      'arrive',
      'famous'
    ],
    correctAnswer: 'arrive',
    explanation: 'Từ "arrive" (/əˈraɪv/) có nghĩa tiếng Việt là "đến nơi". Ví dụ: Chúng ta phải đến đúng giờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đến nơi" (v).',
      'Gợi ý 2: Phiên âm: /əˈraɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-61',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nLet\'s go for a ________ this Sunday.',
    options: [
      'alone',
      'mountain',
      'wonder',
      'picnic'
    ],
    correctAnswer: 'picnic',
    explanation: 'Từ "picnic" (/ˈpɪknɪk/) có nghĩa tiếng Việt là "chuyến dã ngoại". Ví dụ: Chủ nhật tuần này hãy đi dã ngoại nhé.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chuyến dã ngoại" (n).',
      'Gợi ý 2: Phiên âm: /ˈpɪknɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-62',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nWhat ________ can we meet?',
    options: [
      'know',
      'mountain',
      'time',
      'landscape'
    ],
    correctAnswer: 'time',
    explanation: 'Từ "time" (/taɪm/) có nghĩa tiếng Việt là "thời gian, giờ". Ví dụ: Mấy giờ chúng ta có thể gặp nhau?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời gian, giờ" (n).',
      'Gợi ý 2: Phiên âm: /taɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-63',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\n________. I can meet you at that time.',
    options: [
      'sure',
      'famous',
      'river',
      'cave'
    ],
    correctAnswer: 'sure',
    explanation: 'Từ "sure" (/ʃʊə(r)/) có nghĩa tiếng Việt là "chắc chắn". Ví dụ: Chắc chắn rồi. Tôi có thể gặp bạn vào giờ đó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chắc chắn" (adj).',
      'Gợi ý 2: Phiên âm: /ʃʊə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-64',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nI think you must bring a ________ coat.',
    options: [
      'waterproof',
      'overnight',
      'hotel',
      'camping site'
    ],
    correctAnswer: 'waterproof',
    explanation: 'Từ "waterproof" (/ˈwɔːtəpruːf/) có nghĩa tiếng Việt là "không thấm nước". Ví dụ: Tôi nghĩ bạn phải mang theo một chiếc áo khoác chống thấm nước.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "không thấm nước" (adj).',
      'Gợi ý 2: Phiên âm: /ˈwɔːtəpruːf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-65',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nIt is ________ and rainy there.',
    options: [
      'cold',
      'famous',
      'world',
      'tea'
    ],
    correctAnswer: 'cold',
    explanation: 'Từ "cold" (/kəʊld/) có nghĩa tiếng Việt là "lạnh". Ví dụ: Ở đó lạnh và có mưa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lạnh" (adj).',
      'Gợi ý 2: Phiên âm: /kəʊld/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-66',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nIt is very ________.',
    options: [
      'special',
      'desert',
      'now',
      'wonder'
    ],
    correctAnswer: 'special',
    explanation: 'Từ "special" (/ˈspeʃl/) có nghĩa tiếng Việt là "đặc biệt". Ví dụ: Nó rất đặc biệt.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đặc biệt" (adj).',
      'Gợi ý 2: Phiên âm: /ˈspeʃl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-67',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nIt has the ________\'s highest mountain.',
    options: [
      'charming',
      'area',
      'beach',
      'world'
    ],
    correctAnswer: 'world',
    explanation: 'Từ "world" (/wɜːld/) có nghĩa tiếng Việt là "thế giới". Ví dụ: Nó có ngọn núi cao nhất thế giới.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thế giới" (n).',
      'Gợi ý 2: Phiên âm: /wɜːld/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-68',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nYou mustn\'t travel ________.',
    options: [
      'lost',
      'know',
      'hotel',
      'alone'
    ],
    correctAnswer: 'alone',
    explanation: 'Từ "alone" (/əˈləʊn/) có nghĩa tiếng Việt là "một mình". Ví dụ: Bạn không được đi du lịch một mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "một mình" (adj).',
      'Gợi ý 2: Phiên âm: /əˈləʊn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-69',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nYou must bring only the ________ things.',
    options: [
      'river',
      'necessary',
      'mountain',
      'hot'
    ],
    correctAnswer: 'necessary',
    explanation: 'Từ "necessary" (/ˈnesəsəri/) có nghĩa tiếng Việt là "cần thiết". Ví dụ: Bạn chỉ nên mang theo những thứ cần thiết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cần thiết" (adj).',
      'Gợi ý 2: Phiên âm: /ˈnesəsəri/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-70',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nYou must bring the right ________ too.',
    options: [
      'clothes',
      'compass',
      'butter',
      'landscape'
    ],
    correctAnswer: 'clothes',
    explanation: 'Từ "clothes" (/kləʊðz/) có nghĩa tiếng Việt là "quần áo". Ví dụ: Bạn cũng phải mang theo quần áo phù hợp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quần áo" (n).',
      'Gợi ý 2: Phiên âm: /kləʊðz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-71',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nDon\'t bring shorts and ________s.',
    options: [
      'shoe',
      'T-shirt',
      'summer',
      'forest'
    ],
    correctAnswer: 'T-shirt',
    explanation: 'Từ "T-shirt" (/ˈtiː ʃɜːt/) có nghĩa tiếng Việt là "áo phông". Ví dụ: Đừng mang theo quần đùi và áo phông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "áo phông" (n).',
      'Gợi ý 2: Phiên âm: /ˈtiː ʃɜːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-72',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - COMMUNICATION]\nAlways go in a ________.',
    options: [
      'area',
      'charming',
      'question',
      'group'
    ],
    correctAnswer: 'group',
    explanation: 'Từ "group" (/ɡruːp/) có nghĩa tiếng Việt là "nhóm". Ví dụ: Luôn đi theo nhóm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhóm" (n).',
      'Gợi ý 2: Phiên âm: /ɡruːp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-73',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - SKILLS 1]\nThere you can enjoy great ________.',
    options: [
      'lesson',
      'seafood',
      'holiday',
      'time'
    ],
    correctAnswer: 'seafood',
    explanation: 'Từ "seafood" (/ˈsiːfuːd/) có nghĩa tiếng Việt là "hải sản". Ví dụ: Ở đó bạn có thể thưởng thức hải sản tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hải sản" (n).',
      'Gợi ý 2: Phiên âm: /ˈsiːfuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-74',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - SKILLS 1]\nMui Ne is popular for its amazing ________s.',
    options: [
      'rock',
      'lesson',
      'landscape',
      'waterfall'
    ],
    correctAnswer: 'landscape',
    explanation: 'Từ "landscape" (/ˈlænskeɪp/) có nghĩa tiếng Việt là "cảnh quan, phong cảnh". Ví dụ: Mũi Né nổi tiếng với những cảnh quan tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cảnh quan, phong cảnh" (n).',
      'Gợi ý 2: Phiên âm: /ˈlænskeɪp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-75',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - SKILLS 1]\nYou can also fly ________s.',
    options: [
      'seafood',
      'kite',
      'waterfall',
      'clothes'
    ],
    correctAnswer: 'kite',
    explanation: 'Từ "kite" (/kaɪt/) có nghĩa tiếng Việt là "con diều". Ví dụ: Bạn cũng có thể thả diều.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con diều" (n).',
      'Gợi ý 2: Phiên âm: /kaɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-76',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - SKILLS 1]\nHa Long Bay is ________ for its beauty.',
    options: [
      'famous',
      'Australia',
      'butter',
      'head'
    ],
    correctAnswer: 'famous',
    explanation: 'Từ "famous" (/ˈfeɪməs/) có nghĩa tiếng Việt là "nổi tiếng". Ví dụ: Vịnh Hạ Long nổi tiếng vì vẻ đẹp của nó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nổi tiếng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfeɪməs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-77',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - SKILLS 2]\nWhat do you ________ about Phu Quoc Island?',
    options: [
      'know',
      'desert',
      'hotel',
      'guide'
    ],
    correctAnswer: 'know',
    explanation: 'Từ "know" (/nəʊ/) có nghĩa tiếng Việt là "biết". Ví dụ: Bạn biết gì về đảo Phú Quốc?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "biết" (v).',
      'Gợi ý 2: Phiên âm: /nəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-78',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - LOOKING BACK]\nThere are some wonderful ________s in our area.',
    options: [
      'camping site',
      'holiday',
      'group',
      'know'
    ],
    correctAnswer: 'camping site',
    explanation: 'Từ "camping site" (/ˈkæmpɪŋ saɪt/) có nghĩa tiếng Việt là "khu cắm trại". Ví dụ: Có một số địa điểm cắm trại tuyệt vời trong khu vực của chúng tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu cắm trại" (n).',
      'Gợi ý 2: Phiên âm: /ˈkæmpɪŋ saɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-79',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - LOOKING BACK]\nThere is so much ________ on the road.',
    options: [
      'picture',
      'snow',
      'day',
      'backpack'
    ],
    correctAnswer: 'snow',
    explanation: 'Từ "snow" (/snəʊ/) có nghĩa tiếng Việt là "tuyết". Ví dụ: Có rất nhiều tuyết trên đường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tuyết" (n).',
      'Gợi ý 2: Phiên âm: /snəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u5-v-80',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 5: NATURAL WONDERS OF VIET NAM - PROJECT]\nDon\'t take too much ________ on your trip.',
    options: [
      'butter',
      'waterproof',
      'luggage',
      'mountain'
    ],
    correctAnswer: 'luggage',
    explanation: 'Từ "luggage" (/ˈlʌɡɪdʒ/) có nghĩa tiếng Việt là "hành lý". Ví dụ: Đừng mang theo quá nhiều hành lý trong chuyến đi của bạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hành lý" (n).',
      'Gợi ý 2: Phiên âm: /ˈlʌɡɪdʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-1',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nDo you come ________?',
    options: [
      'sugar',
      'home',
      'envelope',
      'brother'
    ],
    correctAnswer: 'home',
    explanation: 'Từ "home" (/həʊm/) có nghĩa tiếng Việt là "nhà". Ví dụ: Bạn có về nhà không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà" (n).',
      'Gợi ý 2: Phiên âm: /həʊm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-2',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nWe ________ Tet.',
    options: [
      'Switzerland',
      'have',
      'wear',
      'celebrate'
    ],
    correctAnswer: 'have',
    explanation: 'Từ "have" (/hæv/) có nghĩa tiếng Việt là "có". Ví dụ: Chúng tôi có Tết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có" (v).',
      'Gợi ý 2: Phiên âm: /hæv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-3',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nIt\'s in ________.',
    options: [
      'spring',
      'sweets',
      'sugar',
      'January'
    ],
    correctAnswer: 'January',
    explanation: 'Từ "January" (/ˈdʒænjuəri/) có nghĩa tiếng Việt là "tháng Giêng, tháng Một". Ví dụ: Đó là vào tháng Giêng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tháng Giêng, tháng Một" (n).',
      'Gợi ý 2: Phiên âm: /ˈdʒænjuəri/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-4',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nWe ________ our homes.',
    options: [
      'sugar',
      'housework',
      'clean',
      'spring'
    ],
    correctAnswer: 'clean',
    explanation: 'Từ "clean" (/kliːn/) có nghĩa tiếng Việt là "dọn dẹp". Ví dụ: Chúng tôi dọn dẹp nhà cửa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dọn dẹp" (v).',
      'Gợi ý 2: Phiên âm: /kliːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-5',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nIs Tet a time for family ________s?',
    options: [
      'anything',
      'brother',
      'lucky',
      'gathering'
    ],
    correctAnswer: 'gathering',
    explanation: 'Từ "gathering" (/ˈɡæðərɪŋ/) có nghĩa tiếng Việt là "cuộc sum họp, tụ họp". Ví dụ: Tết có phải là thời gian để sum họp gia đình không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc sum họp, tụ họp" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡæðərɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-6',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nIt\'s a happy time for ________.',
    options: [
      'cheek',
      'everybody',
      'guess',
      'life'
    ],
    correctAnswer: 'everybody',
    explanation: 'Từ "everybody" (/ˈevribɒdi/) có nghĩa tiếng Việt là "mọi người". Ví dụ: Đó là thời gian hạnh phúc cho tất cả mọi người.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mọi người" (pronoun).',
      'Gợi ý 2: Phiên âm: /ˈevribɒdi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-7',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nDo those children get lucky ________?',
    options: [
      'money',
      'behave',
      'coin',
      'brother'
    ],
    correctAnswer: 'money',
    explanation: 'Từ "money" (/ˈmʌni/) có nghĩa tiếng Việt là "tiền". Ví dụ: Những đứa trẻ đó có nhận được tiền lì xì không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiền" (n).',
      'Gợi ý 2: Phiên âm: /ˈmʌni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-8',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nThat sounds ________.',
    options: [
      'interesting',
      'succeed',
      'wear',
      'sugar'
    ],
    correctAnswer: 'interesting',
    explanation: 'Từ "interesting" (/ˈɪntrəstɪŋ/) có nghĩa tiếng Việt là "thú vị". Ví dụ: Điều đó nghe có vẻ thú vị.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thú vị" (adj).',
      'Gợi ý 2: Phiên âm: /ˈɪntrəstɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-9',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nIs there ________ special people should do?',
    options: [
      'quiet',
      'anything',
      'lucky',
      'permission'
    ],
    correctAnswer: 'anything',
    explanation: 'Từ "anything" (/ˈeniθɪŋ/) có nghĩa tiếng Việt là "bất cứ điều gì". Ví dụ: Có điều gì đặc biệt mà mọi người nên làm không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bất cứ điều gì" (pronoun).',
      'Gợi ý 2: Phiên âm: /ˈeniθɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-10',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nWe shouldn\'t ________ anything.',
    options: [
      'come',
      'sing',
      'fruit',
      'break'
    ],
    correctAnswer: 'break',
    explanation: 'Từ "break" (/breɪk/) có nghĩa tiếng Việt là "làm vỡ, phá vỡ". Ví dụ: Chúng ta không nên làm vỡ bất cứ thứ gì.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "làm vỡ, phá vỡ" (v).',
      'Gợi ý 2: Phiên âm: /breɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-11',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - GETTING STARTED]\nWhat to eat and ________ during Tet?',
    options: [
      'custom',
      'any',
      'clean',
      'wear'
    ],
    correctAnswer: 'wear',
    explanation: 'Từ "wear" (/weə(r)/) có nghĩa tiếng Việt là "mặc". Ví dụ: Ăn gì và mặc gì trong ngày Tết?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mặc" (v).',
      'Gợi ý 2: Phiên âm: /weə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-12',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nMy mother usually cooks special ________ during Tet.',
    options: [
      'food',
      'sugar',
      'permission',
      'January'
    ],
    correctAnswer: 'food',
    explanation: 'Từ "food" (/fuːd/) có nghĩa tiếng Việt là "thức ăn, món ăn". Ví dụ: Mẹ tôi thường nấu những món ăn đặc biệt trong ngày Tết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thức ăn, món ăn" (n).',
      'Gợi ý 2: Phiên âm: /fuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-13',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nWe ________ in January or February.',
    options: [
      'celebrate',
      'break',
      'succeed',
      'noise'
    ],
    correctAnswer: 'celebrate',
    explanation: 'Từ "celebrate" (/ˈselɪbreɪt/) có nghĩa tiếng Việt là "tổ chức, kỷ niệm". Ví dụ: Chúng tôi tổ chức lễ vào tháng Giêng hoặc tháng Hai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tổ chức, kỷ niệm" (v).',
      'Gợi ý 2: Phiên âm: /ˈselɪbreɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-14',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nWhat time do the ________s start?',
    options: [
      'firework',
      'relative',
      'shopping',
      'envelope'
    ],
    correctAnswer: 'firework',
    explanation: 'Từ "firework" (/ˈfaɪəwɜːk/) có nghĩa tiếng Việt là "pháo hoa". Ví dụ: Mấy giờ pháo hoa bắt đầu?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "pháo hoa" (n).',
      'Gợi ý 2: Phiên âm: /ˈfaɪəwɜːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-15',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nThey have a lot of antique ________.',
    options: [
      'cucumber',
      'interesting',
      'sing',
      'furniture'
    ],
    correctAnswer: 'furniture',
    explanation: 'Từ "furniture" (/ˈfɜːnɪtʃə(r)/) có nghĩa tiếng Việt là "đồ nội thất". Ví dụ: Họ có rất nhiều đồ nội thất cổ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đồ nội thất" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɜːnɪtʃə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-16',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nWe had great ________ at the beach.',
    options: [
      'Switzerland',
      'shy',
      'lucky',
      'fun'
    ],
    correctAnswer: 'fun',
    explanation: 'Từ "fun" (/fʌn/) có nghĩa tiếng Việt là "niềm vui". Ví dụ: Chúng tôi đã có niềm vui lớn ở bãi biển.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "niềm vui" (n).',
      'Gợi ý 2: Phiên âm: /fʌn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-17',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nI ________ that I was a bit taller.',
    options: [
      'fight',
      'wish',
      'December',
      'cucumber'
    ],
    correctAnswer: 'wish',
    explanation: 'Từ "wish" (/wɪʃ/) có nghĩa tiếng Việt là "lời ước, ước". Ví dụ: Tôi ước rằng mình cao hơn một chút.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lời ước, ước" (n).',
      'Gợi ý 2: Phiên âm: /wɪʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-18',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nI\'m going ________ this afternoon.',
    options: [
      'December',
      'shopping',
      'thirsty',
      'lucky'
    ],
    correctAnswer: 'shopping',
    explanation: 'Từ "shopping" (/ˈʃɒpɪŋ/) có nghĩa tiếng Việt là "việc mua sắm". Ví dụ: Chiều nay tôi đi mua sắm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "việc mua sắm" (n).',
      'Gợi ý 2: Phiên âm: /ˈʃɒpɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-19',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nWe decorate our houses with ________s.',
    options: [
      'anything',
      'fight',
      'thirsty',
      'peach flower'
    ],
    correctAnswer: 'peach flower',
    explanation: 'Từ "peach flower" (/piːtʃ ˈflaʊə(r)/) có nghĩa tiếng Việt là "hoa đào". Ví dụ: Chúng tôi trang trí nhà bằng hoa đào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hoa đào" (n).',
      'Gợi ý 2: Phiên âm: /piːtʃ ˈflaʊə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-20',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nDo you prefer brown ________ or white ________?',
    options: [
      'rice',
      'year',
      'sing',
      'noise'
    ],
    correctAnswer: 'rice',
    explanation: 'Từ "rice" (/raɪs/) có nghĩa tiếng Việt là "gạo, cơm". Ví dụ: Bạn thích gạo lứt hay gạo trắng?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gạo, cơm" (n).',
      'Gợi ý 2: Phiên âm: /raɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-21',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\n________ is coming.',
    options: [
      'spring',
      'activity',
      'housework',
      'shelf'
    ],
    correctAnswer: 'spring',
    explanation: 'Từ "spring" (/sprɪŋ/) có nghĩa tiếng Việt là "mùa xuân". Ví dụ: Mùa xuân đang đến.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mùa xuân" (n).',
      'Gợi ý 2: Phiên âm: /sprɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-22',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nTet is coming.',
    options: [
      'sing',
      'shopping',
      'fun',
      'come'
    ],
    correctAnswer: 'come',
    explanation: 'Từ "come" (/kʌm/) có nghĩa tiếng Việt là "đến". Ví dụ: Tết đến rồi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đến" (v).',
      'Gợi ý 2: Phiên âm: /kʌm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-23',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nWe ________ peach flowers.',
    options: [
      'shopping',
      'brother',
      'furniture',
      'sell'
    ],
    correctAnswer: 'sell',
    explanation: 'Từ "sell" (/sel/) có nghĩa tiếng Việt là "bán". Ví dụ: Chúng tôi bán hoa đào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bán" (v).',
      'Gợi ý 2: Phiên âm: /sel/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-24',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nHer cheeks ________.',
    options: [
      'shine',
      'gathering',
      'December',
      'firework'
    ],
    correctAnswer: 'shine',
    explanation: 'Từ "shine" (/ʃaɪn/) có nghĩa tiếng Việt là "tỏa sáng". Ví dụ: Đôi má cô ấy ửng hồng tỏa sáng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tỏa sáng" (v).',
      'Gợi ý 2: Phiên âm: /ʃaɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-25',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nHer eyes ________.',
    options: [
      'smile',
      'midnight',
      'decorate',
      'envelope'
    ],
    correctAnswer: 'smile',
    explanation: 'Từ "smile" (/smaɪl/) có nghĩa tiếng Việt là "nụ cười, mỉm cười". Ví dụ: Đôi mắt cô ấy biết cười.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nụ cười, mỉm cười" (n).',
      'Gợi ý 2: Phiên âm: /smaɪl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-26',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nHer smile is ________.',
    options: [
      'fruit',
      'behave',
      'December',
      'shy'
    ],
    correctAnswer: 'shy',
    explanation: 'Từ "shy" (/ʃaɪ/) có nghĩa tiếng Việt là "bẽn lẽn, ngại ngùng". Ví dụ: Nụ cười của cô ấy thật ngại ngùng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bẽn lẽn, ngại ngùng" (adj).',
      'Gợi ý 2: Phiên âm: /ʃaɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-27',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nThe tears ran down her ________s.',
    options: [
      'cheek',
      'cheese',
      'traditional',
      'sweets'
    ],
    correctAnswer: 'cheek',
    explanation: 'Từ "cheek" (/tʃiːk/) có nghĩa tiếng Việt là "má". Ví dụ: Những giọt nước mắt chảy dài trên má.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "má" (n).',
      'Gợi ý 2: Phiên âm: /tʃiːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-28',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nAll her close ________s came to the wedding.',
    options: [
      'relative',
      'firework',
      'have',
      'noise'
    ],
    correctAnswer: 'relative',
    explanation: 'Từ "relative" (/ˈrelətɪv/) có nghĩa tiếng Việt là "họ hàng, người thân". Ví dụ: Tất cả họ hàng thân thiết của cô ấy đều đến dự đám cưới.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "họ hàng, người thân" (n).',
      'Gợi ý 2: Phiên âm: /ˈrelətɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-29',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 1]\nWill you ________ me when I\'m in the hospital?',
    options: [
      'succeed',
      'anything',
      'any',
      'visit'
    ],
    correctAnswer: 'visit',
    explanation: 'Từ "visit" (/ˈvɪzɪt/) có nghĩa tiếng Việt là "thăm, ghé thăm". Ví dụ: Bạn sẽ đến thăm tôi khi tôi ở trong bệnh viện chứ?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thăm, ghé thăm" (v).',
      'Gợi ý 2: Phiên âm: /ˈvɪzɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-30',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nYou shouldn\'t come in with your ________ on.',
    options: [
      'shelf',
      'raincoat',
      'bedroom',
      'behave'
    ],
    correctAnswer: 'raincoat',
    explanation: 'Từ "raincoat" (/ˈreɪnkəʊt/) có nghĩa tiếng Việt là "áo mưa". Ví dụ: Bạn không nên vào nhà khi vẫn đang mặc áo mưa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "áo mưa" (n).',
      'Gợi ý 2: Phiên âm: /ˈreɪnkəʊt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-31',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nIt would be best if you kept ________.',
    options: [
      'wish',
      'bread',
      'bedroom',
      'quiet'
    ],
    correctAnswer: 'quiet',
    explanation: 'Từ "quiet" (/ˈkwaɪət/) có nghĩa tiếng Việt là "giữ yên lặng". Ví dụ: Tốt nhất là bạn nên giữ yên lặng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giữ yên lặng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkwaɪət/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-32',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nDo you want to ________ or drink?',
    options: [
      'rice',
      'fun',
      'run',
      'eat'
    ],
    correctAnswer: 'eat',
    explanation: 'Từ "eat" (/iːt/) có nghĩa tiếng Việt là "ăn". Ví dụ: Bạn muốn ăn hay uống?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ăn" (v).',
      'Gợi ý 2: Phiên âm: /iːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-33',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nYou need to ________ before you enter.',
    options: [
      'thirsty',
      'have',
      'eat',
      'knock'
    ],
    correctAnswer: 'knock',
    explanation: 'Từ "knock" (/nɒk/) có nghĩa tiếng Việt là "gõ cửa". Ví dụ: Bạn cần gõ cửa trước khi bước vào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gõ cửa" (v).',
      'Gợi ý 2: Phiên âm: /nɒk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-34',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nYou need to help with ________.',
    options: [
      'fruit',
      'any',
      'housework',
      'wear'
    ],
    correctAnswer: 'housework',
    explanation: 'Từ "housework" (/ˈhaʊswɜːk/) có nghĩa tiếng Việt là "việc nhà". Ví dụ: Bạn cần giúp đỡ việc nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "việc nhà" (n).',
      'Gợi ý 2: Phiên âm: /ˈhaʊswɜːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-35',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nThere were children ________ing in the playground.',
    options: [
      'any',
      'fight',
      'shy',
      'decorate'
    ],
    correctAnswer: 'fight',
    explanation: 'Từ "fight" (/faɪt/) có nghĩa tiếng Việt là "đánh nhau, cãi nhau". Ví dụ: Có trẻ em đang đánh nhau ở sân chơi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đánh nhau, cãi nhau" (v).',
      'Gợi ý 2: Phiên âm: /faɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-36',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nWe go out with ________s.',
    options: [
      'peach flower',
      'friend',
      'anything',
      'bread'
    ],
    correctAnswer: 'friend',
    explanation: 'Từ "friend" (/frend/) có nghĩa tiếng Việt là "bạn bè". Ví dụ: Chúng tôi đi chơi với bạn bè.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bạn bè" (n).',
      'Gợi ý 2: Phiên âm: /frend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-37',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nChildren should ________ well.',
    options: [
      'life',
      'everybody',
      'throw away',
      'behave'
    ],
    correctAnswer: 'behave',
    explanation: 'Từ "behave" (/bɪˈheɪv/) có nghĩa tiếng Việt là "cư xử". Ví dụ: Trẻ em nên cư xử tốt.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cư xử" (v).',
      'Gợi ý 2: Phiên âm: /bɪˈheɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-38',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nChildren shouldn\'t eat lots of ________.',
    options: [
      'sweets',
      'have',
      'home',
      'year'
    ],
    correctAnswer: 'sweets',
    explanation: 'Từ "sweets" (/swiːts/) có nghĩa tiếng Việt là "bánh kẹo, đồ ngọt". Ví dụ: Trẻ em không nên ăn quá nhiều đồ ngọt.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bánh kẹo, đồ ngọt" (n).',
      'Gợi ý 2: Phiên âm: /swiːts/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-39',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nMy mother bought some ________.',
    options: [
      'fruit',
      'throw away',
      'grandparents',
      'give'
    ],
    correctAnswer: 'fruit',
    explanation: 'Từ "fruit" (/fruːt/) có nghĩa tiếng Việt là "trái cây, hoa quả". Ví dụ: Mẹ tôi đã mua một số trái cây.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trái cây, hoa quả" (n).',
      'Gợi ý 2: Phiên âm: /fruːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-40',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nI need ________ milk for the cake.',
    options: [
      'fruit',
      'eat',
      'December',
      'some'
    ],
    correctAnswer: 'some',
    explanation: 'Từ "some" (/sʌm/) có nghĩa tiếng Việt là "một vài, một ít". Ví dụ: Tôi cần một ít sữa cho cái bánh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "một vài, một ít" (det).',
      'Gợi ý 2: Phiên âm: /sʌm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-41',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nI can\'t answer ________ questions.',
    options: [
      'have',
      'any',
      'relative',
      'ice cream'
    ],
    correctAnswer: 'any',
    explanation: 'Từ "any" (/ˈeni/) có nghĩa tiếng Việt là "bất kỳ". Ví dụ: Tôi không thể trả lời bất kỳ câu hỏi nào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bất kỳ" (det).',
      'Gợi ý 2: Phiên âm: /ˈeni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-42',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nDo you have any ________?',
    options: [
      'home',
      'sugar',
      'Spain',
      'break'
    ],
    correctAnswer: 'sugar',
    explanation: 'Từ "sugar" (/ˈʃʊɡə(r)/) có nghĩa tiếng Việt là "đường". Ví dụ: Bạn có tí đường nào không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đường" (n).',
      'Gợi ý 2: Phiên âm: /ˈʃʊɡə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-43',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nWhat do you need to ________ your room?',
    options: [
      'fruit',
      'gathering',
      'decorate',
      'housework'
    ],
    correctAnswer: 'decorate',
    explanation: 'Từ "decorate" (/ˈdekəreɪt/) có nghĩa tiếng Việt là "trang trí". Ví dụ: Bạn cần những gì để trang trí phòng của mình?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trang trí" (v).',
      'Gợi ý 2: Phiên âm: /ˈdekəreɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-44',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nDo you have ________ for sports?',
    options: [
      'bread',
      'anything',
      'raincoat',
      'free time'
    ],
    correctAnswer: 'free time',
    explanation: 'Từ "free time" (/ˌfriː ˈtaɪm/) có nghĩa tiếng Việt là "thời gian rảnh". Ví dụ: Bạn có thời gian rảnh dành cho thể thao không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời gian rảnh" (n).',
      'Gợi ý 2: Phiên âm: /ˌfriː ˈtaɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-45',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nAre there any interesting activities here during Tet?',
    options: [
      'permission',
      'traditional',
      'give',
      'activity'
    ],
    correctAnswer: 'activity',
    explanation: 'Từ "activity" (/ækˈtɪvəti/) có nghĩa tiếng Việt là "hoạt động". Ví dụ: Ở đây có hoạt động nào thú vị trong dịp Tết không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hoạt động" (n).',
      'Gợi ý 2: Phiên âm: /ækˈtɪvəti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-46',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nWe have some ________ games like running and cooking.',
    options: [
      'decorate',
      'traditional',
      'sugar',
      'cucumber'
    ],
    correctAnswer: 'traditional',
    explanation: 'Từ "traditional" (/trəˈdɪʃənl/) có nghĩa tiếng Việt là "truyền thống". Ví dụ: Chúng tôi có một số trò chơi truyền thống như chạy và nấu ăn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "truyền thống" (adj).',
      'Gợi ý 2: Phiên âm: /trəˈdɪʃənl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-47',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nThere isn\'t any ________.',
    options: [
      'visit',
      'ice cream',
      'life',
      'activity'
    ],
    correctAnswer: 'ice cream',
    explanation: 'Từ "ice cream" (/ˈaɪs kriːm/) có nghĩa tiếng Việt là "kem". Ví dụ: Không còn tí kem nào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kem" (n).',
      'Gợi ý 2: Phiên âm: /ˈaɪs kriːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-48',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nThere are some ________s.',
    options: [
      'envelope',
      'cucumber',
      'lucky',
      'sweets'
    ],
    correctAnswer: 'cucumber',
    explanation: 'Từ "cucumber" (/ˈkjuːkʌmbə(r)/) có nghĩa tiếng Việt là "dưa chuột". Ví dụ: Có một vài quả dưa chuột.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dưa chuột" (n).',
      'Gợi ý 2: Phiên âm: /ˈkjuːkʌmbə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-49',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nThere is some ________.',
    options: [
      'lucky',
      'fight',
      'furniture',
      'cheese'
    ],
    correctAnswer: 'cheese',
    explanation: 'Từ "cheese" (/tʃiːz/) có nghĩa tiếng Việt là "phô mai". Ví dụ: Có một ít phô mai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phô mai" (n).',
      'Gợi ý 2: Phiên âm: /tʃiːz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-50',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - A CLOSER LOOK 2]\nThere is some ________.',
    options: [
      'bread',
      'run',
      'money',
      'hang'
    ],
    correctAnswer: 'bread',
    explanation: 'Từ "bread" (/bred/) có nghĩa tiếng Việt là "bánh mì". Ví dụ: Có một ít bánh mì.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bánh mì" (n).',
      'Gợi ý 2: Phiên âm: /bred/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-51',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nI have happy days from January to ________.',
    options: [
      'December',
      'home',
      'anything',
      'traditional'
    ],
    correctAnswer: 'December',
    explanation: 'Từ "December" (/dɪˈsembə(r)/) có nghĩa tiếng Việt là "tháng Mười hai". Ví dụ: Tôi có những ngày hạnh phúc từ tháng Giêng đến tháng Mười hai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tháng Mười hai" (n).',
      'Gợi ý 2: Phiên âm: /dɪˈsembə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-52',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nThis is a ________ full of fun.',
    options: [
      'anything',
      'year',
      'shopping',
      'grandparents'
    ],
    correctAnswer: 'year',
    explanation: 'Từ "year" (/jɪə(r)/) có nghĩa tiếng Việt là "năm". Ví dụ: Đây là một năm tràn ngập niềm vui.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "năm" (n).',
      'Gợi ý 2: Phiên âm: /jɪə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-53',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nMy ________ is full of happy moments.',
    options: [
      'life',
      'lucky',
      'year',
      'succeed'
    ],
    correctAnswer: 'life',
    explanation: 'Từ "life" (/laɪf/) có nghĩa tiếng Việt là "cuộc sống". Ví dụ: Cuộc sống của tôi tràn ngập những khoảnh khắc hạnh phúc.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc sống" (n).',
      'Gợi ý 2: Phiên âm: /laɪf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-54',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nI will ________ in my studies.',
    options: [
      'tree house',
      'shine',
      'succeed',
      'gathering'
    ],
    correctAnswer: 'succeed',
    explanation: 'Từ "succeed" (/səkˈsiːd/) có nghĩa tiếng Việt là "thành công". Ví dụ: Tôi sẽ thành công trong việc học của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thành công" (v).',
      'Gợi ý 2: Phiên âm: /səkˈsiːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-55',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nI want to live in a ________.',
    options: [
      'gathering',
      'hang',
      'decorate',
      'tree house'
    ],
    correctAnswer: 'tree house',
    explanation: 'Từ "tree house" (/ˈtriː haʊs/) có nghĩa tiếng Việt là "ngôi nhà trên cây". Ví dụ: Tôi muốn sống trong một ngôi nhà trên cây.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngôi nhà trên cây" (n).',
      'Gợi ý 2: Phiên âm: /ˈtriː haʊs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-56',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nIn Romania, people throw ________s into a river.',
    options: [
      'January',
      'bedroom',
      'bread',
      'coin'
    ],
    correctAnswer: 'coin',
    explanation: 'Từ "coin" (/kɔɪn/) có nghĩa tiếng Việt là "đồng xu". Ví dụ: Ở Romania, người ta ném đồng xu xuống sông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đồng xu" (n).',
      'Gợi ý 2: Phiên âm: /kɔɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-57',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nThey visited ________ last month.',
    options: [
      'raincoat',
      'run',
      'spring',
      'Spain'
    ],
    correctAnswer: 'Spain',
    explanation: 'Từ "Spain" (/speɪn/) có nghĩa tiếng Việt là "Tây Ban Nha". Ví dụ: Họ đã đến thăm Tây Ban Nha vào tháng trước.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "Tây Ban Nha" (n).',
      'Gợi ý 2: Phiên âm: /speɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-58',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - COMMUNICATION]\nShe\'s from ________.',
    options: [
      'rice',
      'midnight',
      'Switzerland',
      'shelf'
    ],
    correctAnswer: 'Switzerland',
    explanation: 'Từ "Switzerland" (/ˈswɪtsələnd/) có nghĩa tiếng Việt là "Thụy Sĩ". Ví dụ: Cô ấy đến từ Thụy Sĩ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "Thụy Sĩ" (n).',
      'Gợi ý 2: Phiên âm: /ˈswɪtsələnd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-59',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 1]\nWhen the clock strikes ________.',
    options: [
      'midnight',
      'break',
      'smile',
      'home'
    ],
    correctAnswer: 'midnight',
    explanation: 'Từ "midnight" (/ˈmɪdnaɪt/) có nghĩa tiếng Việt là "nửa đêm". Ví dụ: Khi đồng hồ điểm nửa đêm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nửa đêm" (n).',
      'Gợi ý 2: Phiên âm: /ˈmɪdnaɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-60',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 1]\nEverybody cheers and ________s.',
    options: [
      'sing',
      'coin',
      'any',
      'sweets'
    ],
    correctAnswer: 'sing',
    explanation: 'Từ "sing" (/sɪŋ/) có nghĩa tiếng Việt là "hát". Ví dụ: Mọi người reo hò và hát hò.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hát" (v).',
      'Gợi ý 2: Phiên âm: /sɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-61',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 1]\nWe dress beautifully and go to our ________\' houses.',
    options: [
      'year',
      'cheek',
      'grandparents',
      'shine'
    ],
    correctAnswer: 'grandparents',
    explanation: 'Từ "grandparents" (/ˈɡrænpeərənts/) có nghĩa tiếng Việt là "ông bà". Ví dụ: Chúng tôi ăn mặc đẹp và đến nhà ông bà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ông bà" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡrænpeərənts/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-62',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 1]\nThey ________ us lucky money.',
    options: [
      'guess',
      'give',
      'shelf',
      'bread'
    ],
    correctAnswer: 'give',
    explanation: 'Từ "give" (/ɡɪv/) có nghĩa tiếng Việt là "cho, tặng". Ví dụ: Ông bà lì xì cho chúng tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cho, tặng" (v).',
      'Gợi ý 2: Phiên âm: /ɡɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-63',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 1]\nI learned some ________s about Tet from my parents.',
    options: [
      'lucky',
      'custom',
      'succeed',
      'have'
    ],
    correctAnswer: 'custom',
    explanation: 'Từ "custom" (/ˈkʌstəm/) có nghĩa tiếng Việt là "phong tục". Ví dụ: Tôi học được một số phong tục Tết từ cha mẹ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phong tục" (n).',
      'Gợi ý 2: Phiên âm: /ˈkʌstəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-64',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 1]\nDogs are ________ animals.',
    options: [
      'cheese',
      'behave',
      'lucky',
      'brother'
    ],
    correctAnswer: 'lucky',
    explanation: 'Từ "lucky" (/ˈlʌki/) có nghĩa tiếng Việt là "may mắn". Ví dụ: Chó là loài động vật mang lại may mắn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "may mắn" (adj).',
      'Gợi ý 2: Phiên âm: /ˈlʌki/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-65',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 2]\nWhat color are the ________s?',
    options: [
      'envelope',
      'spring',
      'wear',
      'visit'
    ],
    correctAnswer: 'envelope',
    explanation: 'Từ "envelope" (/ˈenvələʊp/) có nghĩa tiếng Việt là "phong bì". Ví dụ: Những chiếc phong bì có màu gì?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phong bì" (n).',
      'Gợi ý 2: Phiên âm: /ˈenvələʊp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-66',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 2]\nWho ________s Banh Chung?',
    options: [
      'cucumber',
      'shy',
      'cook',
      'lucky'
    ],
    correctAnswer: 'cook',
    explanation: 'Từ "cook" (/kʊk/) có nghĩa tiếng Việt là "nấu". Ví dụ: Ai nấu Bánh Chưng?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nấu" (v).',
      'Gợi ý 2: Phiên âm: /kʊk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-67',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - SKILLS 2]\nWhat do they ________ before Tet?',
    options: [
      'throw away',
      'lucky',
      'permission',
      'furniture'
    ],
    correctAnswer: 'throw away',
    explanation: 'Từ "throw away" (/θrəʊ əˈweɪ/) có nghĩa tiếng Việt là "vứt bỏ". Ví dụ: Họ vứt bỏ những gì trước Tết?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vứt bỏ" (phr.v).',
      'Gợi ý 2: Phiên âm: /θrəʊ əˈweɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-68',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nI ask for ________ before entering a room.',
    options: [
      'firework',
      'shopping',
      'year',
      'permission'
    ],
    correctAnswer: 'permission',
    explanation: 'Từ "permission" (/pəˈmɪʃn/) có nghĩa tiếng Việt là "sự xin phép, sự cho phép". Ví dụ: Tôi xin phép trước khi vào phòng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sự xin phép, sự cho phép" (n).',
      'Gợi ý 2: Phiên âm: /pəˈmɪʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-69',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nHe ________s about the house.',
    options: [
      'peach flower',
      'furniture',
      'envelope',
      'run'
    ],
    correctAnswer: 'run',
    explanation: 'Từ "run" (/rʌn/) có nghĩa tiếng Việt là "chạy". Ví dụ: Anh ta chạy quanh nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chạy" (v).',
      'Gợi ý 2: Phiên âm: /rʌn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-70',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nShe makes a lot of ________.',
    options: [
      'give',
      'envelope',
      'activity',
      'noise'
    ],
    correctAnswer: 'noise',
    explanation: 'Từ "noise" (/nɔɪz/) có nghĩa tiếng Việt là "tiếng ồn". Ví dụ: Cô ấy gây ra rất nhiều tiếng ồn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiếng ồn" (n).',
      'Gợi ý 2: Phiên âm: /nɔɪz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-71',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nShe takes things from a ________.',
    options: [
      'shelf',
      'thirsty',
      'friend',
      'give'
    ],
    correctAnswer: 'shelf',
    explanation: 'Từ "shelf" (/ʃelf/) có nghĩa tiếng Việt là "cái kệ, giá sách". Ví dụ: Cô ấy lấy đồ từ trên kệ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái kệ, giá sách" (n).',
      'Gợi ý 2: Phiên âm: /ʃelf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-72',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nShe feels ________.',
    options: [
      'custom',
      'eat',
      'wish',
      'thirsty'
    ],
    correctAnswer: 'thirsty',
    explanation: 'Từ "thirsty" (/ˈθɜːsti/) có nghĩa tiếng Việt là "khát nước". Ví dụ: Cô ấy cảm thấy khát nước.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khát nước" (adj).',
      'Gợi ý 2: Phiên âm: /ˈθɜːsti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-73',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nI\'m cleaning my ________.',
    options: [
      'guess',
      'succeed',
      'traditional',
      'bedroom'
    ],
    correctAnswer: 'bedroom',
    explanation: 'Từ "bedroom" (/ˈbedruːm/) có nghĩa tiếng Việt là "phòng ngủ". Ví dụ: Tôi đang dọn dẹp phòng ngủ của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng ngủ" (n).',
      'Gợi ý 2: Phiên âm: /ˈbedruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-74',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - LOOKING BACK]\nBy the window are some ________s.',
    options: [
      'food',
      'balloon',
      'cucumber',
      'Spain'
    ],
    correctAnswer: 'balloon',
    explanation: 'Từ "balloon" (/bəˈluːn/) có nghĩa tiếng Việt là "quả bóng bay". Ví dụ: Cạnh cửa sổ có vài quả bóng bay.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quả bóng bay" (n).',
      'Gợi ý 2: Phiên âm: /bəˈluːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-75',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - PROJECT]\nShe ________s it on a tree.',
    options: [
      'hang',
      'lucky',
      'clean',
      'come'
    ],
    correctAnswer: 'hang',
    explanation: 'Từ "hang" (/hæŋ/) có nghĩa tiếng Việt là "treo". Ví dụ: Cô ấy treo nó lên cây.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "treo" (v).',
      'Gợi ý 2: Phiên âm: /hæŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-76',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - PROJECT]\nThe class ________es whose wish it is.',
    options: [
      'anything',
      'guess',
      'thirsty',
      'shopping'
    ],
    correctAnswer: 'guess',
    explanation: 'Từ "guess" (/ɡes/) có nghĩa tiếng Việt là "đoán". Ví dụ: Cả lớp đoán xem điều ước đó là của ai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đoán" (v).',
      'Gợi ý 2: Phiên âm: /ɡes/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u6-v-77',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 6: OUR TET HOLIDAY - PROJECT]\nI want to have a ________.',
    options: [
      'brother',
      'custom',
      'coin',
      'knock'
    ],
    correctAnswer: 'brother',
    explanation: 'Từ "brother" (/ˈbrʌðə(r)/) có nghĩa tiếng Việt là "anh/em trai". Ví dụ: Tôi muốn có một người em trai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "anh/em trai" (n).',
      'Gợi ý 2: Phiên âm: /ˈbrʌðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-1',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nWhat\'s on ________?',
    options: [
      'today',
      'weather',
      'wonderful',
      'follow'
    ],
    correctAnswer: 'today',
    explanation: 'Từ "today" (/təˈdeɪ/) có nghĩa tiếng Việt là "hôm nay". Ví dụ: Hôm nay có gì?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hôm nay" (adv).',
      'Gợi ý 2: Phiên âm: /təˈdeɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-2',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nWhat are you ________ing?',
    options: [
      'watch',
      'love',
      'childhood',
      'because'
    ],
    correctAnswer: 'watch',
    explanation: 'Từ "watch" (/wɒtʃ/) có nghĩa tiếng Việt là "xem". Ví dụ: Bạn đang xem gì thế?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "xem" (v).',
      'Gợi ý 2: Phiên âm: /wɒtʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-3',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nThat music ________ show is very interesting.',
    options: [
      'English',
      'talent',
      'sugar',
      'enjoy'
    ],
    correctAnswer: 'talent',
    explanation: 'Từ "talent" (/ˈtælənt/) có nghĩa tiếng Việt là "tài năng". Ví dụ: Buổi biểu diễn tài năng âm nhạc đó rất thú vị.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tài năng" (n).',
      'Gợi ý 2: Phiên âm: /ˈtælənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-4',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nWhat ________ do you often watch?',
    options: [
      'love',
      'attract',
      'programme',
      'weekend'
    ],
    correctAnswer: 'programme',
    explanation: 'Từ "programme" (/ˈprəʊɡræm/) có nghĩa tiếng Việt là "chương trình". Ví dụ: Bạn thường xem chương trình gì?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chương trình" (n).',
      'Gợi ý 2: Phiên âm: /ˈprəʊɡræm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-5',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nI ________ them.',
    options: [
      'will',
      'information',
      'love',
      'Saturday'
    ],
    correctAnswer: 'love',
    explanation: 'Từ "love" (/lʌv/) có nghĩa tiếng Việt là "yêu, thích". Ví dụ: Tôi yêu thích chúng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "yêu, thích" (v).',
      'Gợi ý 2: Phiên âm: /lʌv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-6',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nThey are ________.',
    options: [
      'wonderful',
      'learn',
      'often',
      'room'
    ],
    correctAnswer: 'wonderful',
    explanation: 'Từ "wonderful" (/ˈwʌndəfl/) có nghĩa tiếng Việt là "tuyệt vời". Ví dụ: Chúng thật tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tuyệt vời" (adj).',
      'Gợi ý 2: Phiên âm: /ˈwʌndəfl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-7',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nI ________ watch them with my little brother.',
    options: [
      'decorate',
      'because',
      'often',
      'childhood'
    ],
    correctAnswer: 'often',
    explanation: 'Từ "often" (/ˈɒfn/) có nghĩa tiếng Việt là "thường". Ví dụ: Tôi thường xem chúng với em trai tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thường" (adv).',
      'Gợi ý 2: Phiên âm: /ˈɒfn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-8',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nHe prefers ________s.',
    options: [
      'live',
      'cartoon',
      'pet',
      'depend'
    ],
    correctAnswer: 'cartoon',
    explanation: 'Từ "cartoon" (/kɑːˈtuːn/) có nghĩa tiếng Việt là "phim hoạt hình". Ví dụ: Anh ấy thích phim hoạt hình hơn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phim hoạt hình" (n).',
      'Gợi ý 2: Phiên âm: /kɑːˈtuːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-9',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nHe loves Jerry the ________.',
    options: [
      'mouse',
      'funny',
      'information',
      'street'
    ],
    correctAnswer: 'mouse',
    explanation: 'Từ "mouse" (/maʊs/) có nghĩa tiếng Việt là "con chuột". Ví dụ: Anh ấy yêu thích chú chuột Jerry.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con chuột" (n).',
      'Gợi ý 2: Phiên âm: /maʊs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-10',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nJerry\'s a ________ character.',
    options: [
      'clever',
      'television',
      'boring',
      'football'
    ],
    correctAnswer: 'clever',
    explanation: 'Từ "clever" (/ˈklevə(r)/) có nghĩa tiếng Việt là "thông minh, khéo léo". Ví dụ: Jerry là một nhân vật thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thông minh, khéo léo" (adj).',
      'Gợi ý 2: Phiên âm: /ˈklevə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-11',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - GETTING STARTED]\nI ________ watch it.',
    options: [
      'will',
      'giraffe',
      'mouse',
      'sister'
    ],
    correctAnswer: 'will',
    explanation: 'Từ "will" (/wɪl/) có nghĩa tiếng Việt là "sẽ". Ví dụ: Tôi sẽ xem nó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sẽ" (aux).',
      'Gợi ý 2: Phiên âm: /wɪl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-12',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nThe most ________ channel for children is Cartoon Network.',
    options: [
      'popular',
      'depend',
      'weekend',
      'tonight'
    ],
    correctAnswer: 'popular',
    explanation: 'Từ "popular" (/ˈpɒpjələ(r)/) có nghĩa tiếng Việt là "phổ biến, được yêu thích". Ví dụ: Kênh phổ biến nhất dành cho trẻ em là Cartoon Network.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phổ biến, được yêu thích" (adj).',
      'Gợi ý 2: Phiên âm: /ˈpɒpjələ(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-13',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nThe film is very ________.',
    options: [
      'boring',
      'tonight',
      'sport',
      'viewer'
    ],
    correctAnswer: 'boring',
    explanation: 'Từ "boring" (/ˈbɔːrɪŋ/) có nghĩa tiếng Việt là "nhàm chán". Ví dụ: Bộ phim rất nhàm chán.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhàm chán" (adj).',
      'Gợi ý 2: Phiên âm: /ˈbɔːrɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-14',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nKitty the cat is very ________.',
    options: [
      'clever',
      'attract',
      'cute',
      'boring'
    ],
    correctAnswer: 'cute',
    explanation: 'Từ "cute" (/kjuːt/) có nghĩa tiếng Việt là "dễ thương". Ví dụ: Mèo Kitty rất dễ thương.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dễ thương" (adj).',
      'Gợi ý 2: Phiên âm: /kjuːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-15',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nComedies are ________.',
    options: [
      'tomorrow',
      'funny',
      'weather',
      'reason'
    ],
    correctAnswer: 'funny',
    explanation: 'Từ "funny" (/ˈfʌni/) có nghĩa tiếng Việt là "vui nhộn, hài hước". Ví dụ: Phim hài rất vui nhộn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "vui nhộn, hài hước" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfʌni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-16',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nPeople ________ a lot.',
    options: [
      'laugh',
      'repetition',
      'pet',
      'street'
    ],
    correctAnswer: 'laugh',
    explanation: 'Từ "laugh" (/lɑːf/) có nghĩa tiếng Việt là "cười". Ví dụ: Mọi người cười rất nhiều.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cười" (v).',
      'Gợi ý 2: Phiên âm: /lɑːf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-17',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nWe ________ a lot from Discovery Channel.',
    options: [
      'cartoon',
      'learn',
      'weekend',
      'weather'
    ],
    correctAnswer: 'learn',
    explanation: 'Từ "learn" (/lɜːn/) có nghĩa tiếng Việt là "học". Ví dụ: Chúng tôi học hỏi được rất nhiều điều từ kênh Discovery Channel.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "học" (v).',
      'Gợi ý 2: Phiên âm: /lɜːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-18',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nI prefer Shakespeare\'s comedies to his tragedies.',
    options: [
      'comedy',
      'activity',
      'Saturday',
      'street'
    ],
    correctAnswer: 'comedy',
    explanation: 'Từ "comedy" (/ˈkɒmədi/) có nghĩa tiếng Việt là "hài kịch, phim hài". Ví dụ: Tôi thích những vở hài kịch của Shakespeare hơn là bi kịch của ông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hài kịch, phim hài" (n).',
      'Gợi ý 2: Phiên âm: /ˈkɒmədi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-19',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nMillions of ________s will watch this match.',
    options: [
      'wildlife',
      'viewer',
      'book',
      'sugar'
    ],
    correctAnswer: 'viewer',
    explanation: 'Từ "viewer" (/ˈvjuːə(r)/) có nghĩa tiếng Việt là "khán giả xem truyền hình". Ví dụ: Hàng triệu khán giả sẽ theo dõi trận đấu này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khán giả xem truyền hình" (n).',
      'Gợi ý 2: Phiên âm: /ˈvjuːə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-20',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nPlease exit the ________ by the side doors.',
    options: [
      'theatre',
      'attract',
      'hour',
      'reason'
    ],
    correctAnswer: 'theatre',
    explanation: 'Từ "theatre" (/ˈθɪətə(r)/) có nghĩa tiếng Việt là "rạp hát, nhà hát". Ví dụ: Vui lòng rời nhà hát bằng cửa bên.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rạp hát, nhà hát" (n).',
      'Gợi ý 2: Phiên âm: /ˈθɪətə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-21',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nMy ________ often watches comedies.',
    options: [
      'father',
      'laugh',
      'English',
      'stadium'
    ],
    correctAnswer: 'father',
    explanation: 'Từ "father" (/ˈfɑːðə(r)/) có nghĩa tiếng Việt là "bố, cha". Ví dụ: Bố tôi thường xem phim hài.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bố, cha" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɑːðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-22',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 1]\nThey are talking about the ________.',
    options: [
      'theatre',
      'intelligent',
      'weather',
      'wonderful'
    ],
    correctAnswer: 'weather',
    explanation: 'Từ "weather" (/ˈweðə(r)/) có nghĩa tiếng Việt là "thời tiết". Ví dụ: Họ đang nói về thời tiết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời tiết" (n).',
      'Gợi ý 2: Phiên âm: /ˈweðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-23',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nWhat are you doing ________?',
    options: [
      'tomorrow',
      'hour',
      'early',
      'activity'
    ],
    correctAnswer: 'tomorrow',
    explanation: 'Từ "tomorrow" (/təˈmɒrəʊ/) có nghĩa tiếng Việt là "ngày mai". Ví dụ: Ngày mai bạn sẽ làm gì?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngày mai" (adv).',
      'Gợi ý 2: Phiên âm: /təˈmɒrəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-24',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI\'m going to a book ________.',
    options: [
      'talent',
      'exhibition',
      'viewer',
      'tomorrow'
    ],
    correctAnswer: 'exhibition',
    explanation: 'Từ "exhibition" (/ˌeksɪˈbɪʃn/) có nghĩa tiếng Việt là "cuộc triển lãm". Ví dụ: Tôi sẽ đến một cuộc triển lãm sách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc triển lãm" (n).',
      'Gợi ý 2: Phiên âm: /ˌeksɪˈbɪʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-25',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nIt\'s on Van Ho ________.',
    options: [
      'street',
      'wildlife',
      'sometimes',
      'theatre'
    ],
    correctAnswer: 'street',
    explanation: 'Từ "street" (/striːt/) có nghĩa tiếng Việt là "đường phố". Ví dụ: Nó ở trên đường Vân Hồ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đường phố" (n).',
      'Gợi ý 2: Phiên âm: /striːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-26',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nIt ________s.',
    options: [
      'depend',
      'dolphin',
      'football',
      'boring'
    ],
    correctAnswer: 'depend',
    explanation: 'Từ "depend" (/dɪˈpend/) có nghĩa tiếng Việt là "tùy thuộc". Ví dụ: Nó còn tùy.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tùy thuộc" (v).',
      'Gợi ý 2: Phiên âm: /dɪˈpend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-27',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nHow often do you play ________?',
    options: [
      'football',
      'stadium',
      'watch',
      'intelligent'
    ],
    correctAnswer: 'football',
    explanation: 'Từ "football" (/ˈfʊtbɔːl/) có nghĩa tiếng Việt là "bóng đá". Ví dụ: Bạn có thường chơi bóng đá không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bóng đá" (n).',
      'Gợi ý 2: Phiên âm: /ˈfʊtbɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-28',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nUsually on ________ or Sunday.',
    options: [
      'book',
      'exhibition',
      'Saturday',
      'activity'
    ],
    correctAnswer: 'Saturday',
    explanation: 'Từ "Saturday" (/ˈsætədeɪ/) có nghĩa tiếng Việt là "thứ Bảy". Ví dụ: Thường vào thứ Bảy hoặc Chủ Nhật.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thứ Bảy" (n).',
      'Gợi ý 2: Phiên âm: /ˈsætədeɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-29',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI play in the ________.',
    options: [
      'viewer',
      'yard',
      'fox',
      'mouse'
    ],
    correctAnswer: 'yard',
    explanation: 'Từ "yard" (/jɑːd/) có nghĩa tiếng Việt là "cái sân". Ví dụ: Tôi chơi ở trong sân.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái sân" (n).',
      'Gợi ý 2: Phiên âm: /jɑːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-30',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nThe ________ for the accident was engine failure.',
    options: [
      'book',
      'cartoon',
      'English',
      'reason'
    ],
    correctAnswer: 'reason',
    explanation: 'Từ "reason" (/ˈriːzn/) có nghĩa tiếng Việt là "lý do, nguyên nhân". Ví dụ: Lý do của tai nạn là do hỏng động cơ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lý do, nguyên nhân" (n).',
      'Gợi ý 2: Phiên âm: /ˈriːzn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-31',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nWe hope to avoid a ________ of last year\'s mistake.',
    options: [
      'reason',
      'television',
      'repetition',
      'book'
    ],
    correctAnswer: 'repetition',
    explanation: 'Từ "repetition" (/ˌrepəˈtɪʃn/) có nghĩa tiếng Việt là "sự lặp lại". Ví dụ: Chúng tôi hy vọng tránh lặp lại sai lầm của năm ngoái.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sự lặp lại" (n).',
      'Gợi ý 2: Phiên âm: /ˌrepəˈtɪʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-32',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI enjoy ________s.',
    options: [
      'real',
      'room',
      'will',
      'sport'
    ],
    correctAnswer: 'sport',
    explanation: 'Từ "sport" (/spɔːt/) có nghĩa tiếng Việt là "thể thao". Ví dụ: Tôi rất thích thể thao.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thể thao" (n).',
      'Gợi ý 2: Phiên âm: /spɔːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-33',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI spent a lot of time ________.',
    options: [
      'depend',
      'because',
      'football',
      'outdoors'
    ],
    correctAnswer: 'outdoors',
    explanation: 'Từ "outdoors" (/ˌaʊtˈdɔːz/) có nghĩa tiếng Việt là "ở ngoài trời". Ví dụ: Tôi đã dành nhiều thời gian ở ngoài trời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ở ngoài trời" (adv).',
      'Gợi ý 2: Phiên âm: /ˌaʊtˈdɔːz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-34',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI\'m helping ________ the house.',
    options: [
      'football',
      'will',
      'wildlife',
      'decorate'
    ],
    correctAnswer: 'decorate',
    explanation: 'Từ "decorate" (/ˈdekəreɪt/) có nghĩa tiếng Việt là "trang trí". Ví dụ: Tôi đang giúp trang trí ngôi nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trang trí" (v).',
      'Gợi ý 2: Phiên âm: /ˈdekəreɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-35',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nDo you have any ________?',
    options: [
      'sugar',
      'childhood',
      'book',
      'today'
    ],
    correctAnswer: 'sugar',
    explanation: 'Từ "sugar" (/ˈʃʊɡə(r)/) có nghĩa tiếng Việt là "đường". Ví dụ: Bạn có tí đường nào không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đường" (n).',
      'Gợi ý 2: Phiên âm: /ˈʃʊɡə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-36',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nWhat do you need to decorate your ________?',
    options: [
      'viewer',
      'cartoon',
      'room',
      'sister'
    ],
    correctAnswer: 'room',
    explanation: 'Từ "room" (/ruːm/) có nghĩa tiếng Việt là "căn phòng". Ví dụ: Bạn cần gì để trang trí phòng mình?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "căn phòng" (n).',
      'Gợi ý 2: Phiên âm: /ruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-37',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nMy brother is ________ cooking.',
    options: [
      'wonderful',
      'pet',
      'clever',
      'busy'
    ],
    correctAnswer: 'busy',
    explanation: 'Từ "busy" (/ˈbɪzi/) có nghĩa tiếng Việt là "bận rộn". Ví dụ: Anh trai tôi đang bận nấu ăn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bận rộn" (adj).',
      'Gợi ý 2: Phiên âm: /ˈbɪzi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-38',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI like ________s.',
    options: [
      'exhibition',
      'instruction',
      'sugar',
      'animal'
    ],
    correctAnswer: 'animal',
    explanation: 'Từ "animal" (/ˈænɪml/) có nghĩa tiếng Việt là "động vật". Ví dụ: Tôi thích động vật.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "động vật" (n).',
      'Gợi ý 2: Phiên âm: /ˈænɪml/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-39',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI will get up ________ tomorrow.',
    options: [
      'early',
      'will',
      'book',
      'cartoon'
    ],
    correctAnswer: 'early',
    explanation: 'Từ "early" (/ˈɜːli/) có nghĩa tiếng Việt là "sớm". Ví dụ: Tôi sẽ dậy sớm vào ngày mai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sớm" (adv).',
      'Gợi ý 2: Phiên âm: /ˈɜːli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-40',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\n________ we read books.',
    options: [
      'sometimes',
      'tomorrow',
      'exhibition',
      'father'
    ],
    correctAnswer: 'sometimes',
    explanation: 'Từ "sometimes" (/ˈsʌmtaɪmz/) có nghĩa tiếng Việt là "thỉnh thoảng, đôi khi". Ví dụ: Đôi khi chúng tôi đọc sách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thỉnh thoảng, đôi khi" (adv).',
      'Gợi ý 2: Phiên âm: /ˈsʌmtaɪmz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-41',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nWe love outdoor activities.',
    options: [
      'learn',
      'street',
      'activity',
      'book'
    ],
    correctAnswer: 'activity',
    explanation: 'Từ "activity" (/ækˈtɪvəti/) có nghĩa tiếng Việt là "hoạt động". Ví dụ: Chúng tôi yêu thích các hoạt động ngoài trời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hoạt động" (n).',
      'Gợi ý 2: Phiên âm: /ækˈtɪvəti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-42',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI can be at the ________ on time.',
    options: [
      'stadium',
      'tomorrow',
      'early',
      'yard'
    ],
    correctAnswer: 'stadium',
    explanation: 'Từ "stadium" (/ˈsteɪdiəm/) có nghĩa tiếng Việt là "sân vận động". Ví dụ: Tôi có thể đến sân vận động đúng giờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sân vận động" (n).',
      'Gợi ý 2: Phiên âm: /ˈsteɪdiəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-43',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI\'m ________.',
    options: [
      'sometimes',
      'wildlife',
      'weekend',
      'tired'
    ],
    correctAnswer: 'tired',
    explanation: 'Từ "tired" (/ˈtaɪəd/) có nghĩa tiếng Việt là "mệt mỏi". Ví dụ: Tôi mệt.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mệt mỏi" (adj).',
      'Gợi ý 2: Phiên âm: /ˈtaɪəd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-44',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nMy ________ is good at school.',
    options: [
      'fox',
      'sister',
      'television',
      'tomorrow'
    ],
    correctAnswer: 'sister',
    explanation: 'Từ "sister" (/ˈsɪstə(r)/) có nghĩa tiếng Việt là "chị/em gái". Ví dụ: Em gái tôi học giỏi ở trường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chị/em gái" (n).',
      'Gợi ý 2: Phiên âm: /ˈsɪstə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-45',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nWe trained ________.',
    options: [
      'hard',
      'laugh',
      'programme',
      'talent'
    ],
    correctAnswer: 'hard',
    explanation: 'Từ "hard" (/hɑːd/) có nghĩa tiếng Việt là "chăm chỉ". Ví dụ: Chúng tôi đã tập luyện chăm chỉ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chăm chỉ" (adv).',
      'Gợi ý 2: Phiên âm: /hɑːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-46',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI will write him some ________s.',
    options: [
      'pet',
      'street',
      'decorate',
      'instruction'
    ],
    correctAnswer: 'instruction',
    explanation: 'Từ "instruction" (/ɪnˈstrʌkʃn/) có nghĩa tiếng Việt là "lời hướng dẫn". Ví dụ: Tôi sẽ viết cho anh ấy một vài hướng dẫn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lời hướng dẫn" (n).',
      'Gợi ý 2: Phiên âm: /ɪnˈstrʌkʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-47',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - A CLOSER LOOK 2]\nI hope he will ________ them.',
    options: [
      'follow',
      'talent',
      'exhibition',
      'yard'
    ],
    correctAnswer: 'follow',
    explanation: 'Từ "follow" (/ˈfɒləʊ/) có nghĩa tiếng Việt là "làm theo, theo dõi". Ví dụ: Tôi hy vọng anh ấy sẽ làm theo chúng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "làm theo, theo dõi" (v).',
      'Gợi ý 2: Phiên âm: /ˈfɒləʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-48',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - COMMUNICATION]\n________ I can see animals in their real life.',
    options: [
      'talent',
      'depend',
      'because',
      'sugar'
    ],
    correctAnswer: 'because',
    explanation: 'Từ "because" (/bɪˈkəz/) có nghĩa tiếng Việt là "bởi vì". Ví dụ: Bởi vì tôi có thể nhìn thấy động vật trong cuộc sống thực của chúng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bởi vì" (conj).',
      'Gợi ý 2: Phiên âm: /bɪˈkəz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-49',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - COMMUNICATION]\nIt\'s ________.',
    options: [
      'watch',
      'educational',
      'wonderful',
      'sport'
    ],
    correctAnswer: 'educational',
    explanation: 'Từ "educational" (/ˌedʒuˈkeɪʃənl/) có nghĩa tiếng Việt là "mang tính giáo dục". Ví dụ: Nó mang tính giáo dục.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mang tính giáo dục" (adj).',
      'Gợi ý 2: Phiên âm: /ˌedʒuˈkeɪʃənl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-50',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - COMMUNICATION]\nIts main character is a clever ________.',
    options: [
      'fox',
      'early',
      'wonderful',
      'theatre'
    ],
    correctAnswer: 'fox',
    explanation: 'Từ "fox" (/fɒks/) có nghĩa tiếng Việt là "con cáo". Ví dụ: Nhân vật chính của nó là một con cáo thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con cáo" (n).',
      'Gợi ý 2: Phiên âm: /fɒks/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-51',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - COMMUNICATION]\nBoth parents and children ________ it.',
    options: [
      'watch',
      'will',
      'love',
      'enjoy'
    ],
    correctAnswer: 'enjoy',
    explanation: 'Từ "enjoy" (/ɪnˈdʒɔɪ/) có nghĩa tiếng Việt là "thưởng thức, thích thú". Ví dụ: Cả bố mẹ và con cái đều thích nó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thưởng thức, thích thú" (v).',
      'Gợi ý 2: Phiên âm: /ɪnˈdʒɔɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-52',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\nAt the museum, there was a display of local ________.',
    options: [
      'laugh',
      'childhood',
      'wildlife',
      'room'
    ],
    correctAnswer: 'wildlife',
    explanation: 'Từ "wildlife" (/ˈwaɪldlaɪf/) có nghĩa tiếng Việt là "cuộc sống hoang dã". Ví dụ: Tại bảo tàng, có triển lãm về động vật hoang dã địa phương.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc sống hoang dã" (n).',
      'Gợi ý 2: Phiên âm: /ˈwaɪldlaɪf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-53',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\nAnimals in their ________ life.',
    options: [
      'real',
      'tired',
      'hour',
      'outdoors'
    ],
    correctAnswer: 'real',
    explanation: 'Từ "real" (/ˈriːəl/) có nghĩa tiếng Việt là "thực tế, thực sự". Ví dụ: Động vật trong cuộc sống thực của chúng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thực tế, thực sự" (adj).',
      'Gợi ý 2: Phiên âm: /ˈriːəl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-54',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\nThey have several ________s: a dog, two rabbits, and a cat.',
    options: [
      'pet',
      'theatre',
      'programme',
      'Saturday'
    ],
    correctAnswer: 'pet',
    explanation: 'Từ "pet" (/pet/) có nghĩa tiếng Việt là "thú cưng, vật nuôi". Ví dụ: Họ có vài con thú cưng: một con chó, hai con thỏ và một con mèo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thú cưng, vật nuôi" (n).',
      'Gợi ý 2: Phiên âm: /pet/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-55',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\n________s are very intelligent animals.',
    options: [
      'sugar',
      'talent',
      'educational',
      'dolphin'
    ],
    correctAnswer: 'dolphin',
    explanation: 'Từ "dolphin" (/ˈdɒlfɪn/) có nghĩa tiếng Việt là "cá heo". Ví dụ: Cá heo là loài động vật rất thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cá heo" (n).',
      'Gợi ý 2: Phiên âm: /ˈdɒlfɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-56',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\nHe is a highly ________ person.',
    options: [
      'intelligent',
      'exhibition',
      'sister',
      'sport'
    ],
    correctAnswer: 'intelligent',
    explanation: 'Từ "intelligent" (/ɪnˈtelɪdʒənt/) có nghĩa tiếng Việt là "thông minh". Ví dụ: Anh ấy là một người rất thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thông minh" (adj).',
      'Gợi ý 2: Phiên âm: /ɪnˈtelɪdʒənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-57',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\nMy ________ is full of happy memories.',
    options: [
      'childhood',
      'wildlife',
      'will',
      'pet'
    ],
    correctAnswer: 'childhood',
    explanation: 'Từ "childhood" (/ˈtʃaɪldhʊd/) có nghĩa tiếng Việt là "thời thơ ấu". Ví dụ: Tuổi thơ của tôi đầy ắp kỷ niệm hạnh phúc.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời thơ ấu" (n).',
      'Gợi ý 2: Phiên âm: /ˈtʃaɪldhʊd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-58',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 1]\nHow many ________s a day do you watch TV?',
    options: [
      'today',
      'weekend',
      'sport',
      'hour'
    ],
    correctAnswer: 'hour',
    explanation: 'Từ "hour" (/ˈaʊə(r)/) có nghĩa tiếng Việt là "giờ, tiếng đồng hồ". Ví dụ: Bạn xem TV bao nhiêu tiếng một ngày?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giờ, tiếng đồng hồ" (n).',
      'Gợi ý 2: Phiên âm: /ˈaʊə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-59',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - SKILLS 2]\nDo you speak ________?',
    options: [
      'weekend',
      'boring',
      'English',
      'programme'
    ],
    correctAnswer: 'English',
    explanation: 'Từ "English" (/ˈɪŋɡlɪʃ/) có nghĩa tiếng Việt là "tiếng Anh". Ví dụ: Bạn có nói tiếng Anh không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiếng Anh" (n).',
      'Gợi ý 2: Phiên âm: /ˈɪŋɡlɪʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-60',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - LOOKING BACK]\nI watch TV more at the ________.',
    options: [
      'depend',
      'weekend',
      'wildlife',
      'fox'
    ],
    correctAnswer: 'weekend',
    explanation: 'Từ "weekend" (/ˌwiːkˈend/) có nghĩa tiếng Việt là "cuối tuần". Ví dụ: Tôi xem TV nhiều hơn vào cuối tuần.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuối tuần" (n).',
      'Gợi ý 2: Phiên âm: /ˌwiːkˈend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-61',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - LOOKING BACK]\nIt ________s many viewers.',
    options: [
      'viewer',
      'comedy',
      'pet',
      'attract'
    ],
    correctAnswer: 'attract',
    explanation: 'Từ "attract" (/əˈtrækt/) có nghĩa tiếng Việt là "thu hút". Ví dụ: Nó thu hút nhiều người xem.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thu hút" (v).',
      'Gợi ý 2: Phiên âm: /əˈtrækt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-62',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - LOOKING BACK]\nThe programme shows tigers and ________s in nature.',
    options: [
      'will',
      'giraffe',
      'boring',
      'today'
    ],
    correctAnswer: 'giraffe',
    explanation: 'Từ "giraffe" (/dʒəˈrɑːf/) có nghĩa tiếng Việt là "hươu cao cổ". Ví dụ: Chương trình chiếu về hổ và hươu cao cổ trong tự nhiên.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hươu cao cổ" (n).',
      'Gợi ý 2: Phiên âm: /dʒəˈrɑːf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-63',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - LOOKING BACK]\nI have a lot of homework ________.',
    options: [
      'tonight',
      'stadium',
      'attract',
      'fox'
    ],
    correctAnswer: 'tonight',
    explanation: 'Từ "tonight" (/təˈnaɪt/) có nghĩa tiếng Việt là "tối nay". Ví dụ: Tôi có nhiều bài tập về nhà tối nay.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tối nay" (adv).',
      'Gợi ý 2: Phiên âm: /təˈnaɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-64',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - LOOKING BACK]\nBBC One is a British ________.',
    options: [
      'channel',
      'educational',
      'stadium',
      'outdoors'
    ],
    correctAnswer: 'channel',
    explanation: 'Từ "channel" (/ˈtʃænl/) có nghĩa tiếng Việt là "kênh truyền hình". Ví dụ: BBC One là một kênh truyền hình của Anh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kênh truyền hình" (n).',
      'Gợi ý 2: Phiên âm: /ˈtʃænl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-65',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - PROJECT]\nWhere do you prefer to get ________ from?',
    options: [
      'today',
      'sister',
      'follow',
      'information'
    ],
    correctAnswer: 'information',
    explanation: 'Từ "information" (/ˌɪnfəˈmeɪʃn/) có nghĩa tiếng Việt là "thông tin". Ví dụ: Bạn thích lấy thông tin từ đâu hơn?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thông tin" (n).',
      'Gợi ý 2: Phiên âm: /ˌɪnfəˈmeɪʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-66',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - PROJECT]\nDo you think you can ________ without TV?',
    options: [
      'live',
      'tomorrow',
      'television',
      'early'
    ],
    correctAnswer: 'live',
    explanation: 'Từ "live" (/lɪv/) có nghĩa tiếng Việt là "sống". Ví dụ: Bạn có nghĩ mình có thể sống mà không có TV không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sống" (v).',
      'Gợi ý 2: Phiên âm: /lɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-67',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - PROJECT]\nCould you turn the ________ down?',
    options: [
      'depend',
      'tomorrow',
      'television',
      'father'
    ],
    correctAnswer: 'television',
    explanation: 'Từ "television" (/ˈtelɪvɪʒn/) có nghĩa tiếng Việt là "tivi, truyền hình". Ví dụ: Bạn có thể vặn nhỏ tivi xuống được không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tivi, truyền hình" (n).',
      'Gợi ý 2: Phiên âm: /ˈtelɪvɪʒn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u7-v-68',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 7: TELEVISION - PROJECT]\nI want to read ________s.',
    options: [
      'book',
      'sugar',
      'football',
      'tonight'
    ],
    correctAnswer: 'book',
    explanation: 'Từ "book" (/bʊk/) có nghĩa tiếng Việt là "sách". Ví dụ: Tôi muốn đọc sách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sách" (n).',
      'Gợi ý 2: Phiên âm: /bʊk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-1',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nThis ________ is big.',
    options: [
      'restaurant',
      'gym',
      'congratulations',
      'idea'
    ],
    correctAnswer: 'gym',
    explanation: 'Từ "gym" (/dʒɪm/) có nghĩa tiếng Việt là "phòng tập thể dục". Ví dụ: Phòng tập thể dục này lớn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phòng tập thể dục" (n).',
      'Gợi ý 2: Phiên âm: /dʒɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-2',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nThe ________ is great.',
    options: [
      'equipment',
      'congratulations',
      'footballer',
      'free time'
    ],
    correctAnswer: 'equipment',
    explanation: 'Từ "equipment" (/ɪˈkwɪpmənt/) có nghĩa tiếng Việt là "thiết bị, dụng cụ". Ví dụ: Các thiết bị thật tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thiết bị, dụng cụ" (n).',
      'Gợi ý 2: Phiên âm: /ɪˈkwɪpmənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-3',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nWhat ________ do you do?',
    options: [
      'sports',
      'racket',
      'win',
      'often'
    ],
    correctAnswer: 'sports',
    explanation: 'Từ "sports" (/spɔːts/) có nghĩa tiếng Việt là "các môn thể thao". Ví dụ: Bạn chơi môn thể thao nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "các môn thể thao" (n).',
      'Gợi ý 2: Phiên âm: /spɔːts/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-4',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI do ________.',
    options: [
      'karate',
      'badminton',
      'touch',
      'museum'
    ],
    correctAnswer: 'karate',
    explanation: 'Từ "karate" (/kəˈrɑːti/) có nghĩa tiếng Việt là "võ karate". Ví dụ: Tôi tập võ karate.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "võ karate" (n).',
      'Gợi ý 2: Phiên âm: /kəˈrɑːti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-5',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI play ________.',
    options: [
      'racket',
      'boat',
      'skipping rope',
      'table tennis'
    ],
    correctAnswer: 'table tennis',
    explanation: 'Từ "table tennis" (/ˈteɪbl ˈtenɪs/) có nghĩa tiếng Việt là "bóng bàn". Ví dụ: Tôi chơi bóng bàn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bóng bàn" (n).',
      'Gợi ý 2: Phiên âm: /ˈteɪbl ˈtenɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-6',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI won.',
    options: [
      'win',
      'can',
      'marathon',
      'call'
    ],
    correctAnswer: 'win',
    explanation: 'Từ "win" (/wɪn/) có nghĩa tiếng Việt là "chiến thắng". Ví dụ: Tôi đã thắng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chiến thắng" (v).',
      'Gợi ý 2: Phiên âm: /wɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-7',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI\'m not ________ at sports.',
    options: [
      'museum',
      'amazing',
      'win',
      'good'
    ],
    correctAnswer: 'good',
    explanation: 'Từ "good" (/ɡʊd/) có nghĩa tiếng Việt là "giỏi, tốt". Ví dụ: Tôi không giỏi thể thao.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giỏi, tốt" (adj).',
      'Gợi ý 2: Phiên âm: /ɡʊd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-8',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI have an ________.',
    options: [
      'idea',
      'wrestling',
      'meet',
      'boat'
    ],
    correctAnswer: 'idea',
    explanation: 'Từ "idea" (/aɪˈdɪə/) có nghĩa tiếng Việt là "ý tưởng, ý kiến". Ví dụ: Tôi có ý này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ý tưởng, ý kiến" (n).',
      'Gợi ý 2: Phiên âm: /aɪˈdɪə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-9',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nYou can go to the karate ________.',
    options: [
      'champion',
      'passenger',
      'game',
      'club'
    ],
    correctAnswer: 'club',
    explanation: 'Từ "club" (/klʌb/) có nghĩa tiếng Việt là "câu lạc bộ". Ví dụ: Bạn có thể đến câu lạc bộ karate.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "câu lạc bộ" (n).',
      'Gợi ý 2: Phiên âm: /klʌb/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-10',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nBut you ________ learn.',
    options: [
      'museum',
      'can',
      'sleep',
      'often'
    ],
    correctAnswer: 'can',
    explanation: 'Từ "can" (/kæn/) có nghĩa tiếng Việt là "có thể". Ví dụ: Nhưng bạn có thể học hỏi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có thể" (v).',
      'Gợi ý 2: Phiên âm: /kæn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-11',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI will ________ you there at 10 a.m. on Sunday.',
    options: [
      'equipment',
      'newspaper',
      'contest',
      'meet'
    ],
    correctAnswer: 'meet',
    explanation: 'Từ "meet" (/miːt/) có nghĩa tiếng Việt là "gặp". Ví dụ: Tôi sẽ gặp bạn ở đó lúc 10 giờ sáng Chủ nhật.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gặp" (v).',
      'Gợi ý 2: Phiên âm: /miːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-12',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nIt\'s a ________ club.',
    options: [
      'break time',
      'gym',
      'newspaper',
      'super fit'
    ],
    correctAnswer: 'super fit',
    explanation: 'Từ "super fit" (/ˈsuːpə fɪt/) có nghĩa tiếng Việt là "siêu khỏe khoắn, vừa vặn". Ví dụ: Đó là một câu lạc bộ siêu khỏe khoắn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "siêu khỏe khoắn, vừa vặn" (phr).',
      'Gợi ý 2: Phiên âm: /ˈsuːpə fɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-13',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nCan you ________?',
    options: [
      'swim',
      'goal',
      'important',
      'amazing'
    ],
    correctAnswer: 'swim',
    explanation: 'Từ "swim" (/swɪm/) có nghĩa tiếng Việt là "bơi". Ví dụ: Bạn có biết bơi không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bơi" (v).',
      'Gợi ý 2: Phiên âm: /swɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-14',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nDo you play ________ every day?',
    options: [
      'outdoors',
      'racket',
      'winner',
      'noise'
    ],
    correctAnswer: 'outdoors',
    explanation: 'Từ "outdoors" (/ˌaʊtˈdɔːz/) có nghĩa tiếng Việt là "ngoài trời". Ví dụ: Bạn có chơi ngoài trời mỗi ngày không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngoài trời" (adv).',
      'Gợi ý 2: Phiên âm: /ˌaʊtˈdɔːz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-15',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nDo you usually do morning ________?',
    options: [
      'career',
      'exercise',
      'grandpa',
      'competition'
    ],
    correctAnswer: 'exercise',
    explanation: 'Từ "exercise" (/ˈeksəsaɪz/) có nghĩa tiếng Việt là "tập thể dục". Ví dụ: Bạn có thường tập thể dục buổi sáng không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tập thể dục" (n).',
      'Gợi ý 2: Phiên âm: /ˈeksəsaɪz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-16',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nWhat do you usually do at ________ at school?',
    options: [
      'career',
      'amazing',
      'break time',
      'super fit'
    ],
    correctAnswer: 'break time',
    explanation: 'Từ "break time" (/ˈbreɪk taɪm/) có nghĩa tiếng Việt là "giờ giải lao". Ví dụ: Bạn thường làm gì vào giờ giải lao ở trường?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giờ giải lao" (n).',
      'Gợi ý 2: Phiên âm: /ˈbreɪk taɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-17',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI play in the ________.',
    options: [
      'goal',
      'football',
      'sleep',
      'schoolyard'
    ],
    correctAnswer: 'schoolyard',
    explanation: 'Từ "schoolyard" (/ˈskuːljɑːd/) có nghĩa tiếng Việt là "sân trường". Ví dụ: Tôi chơi trong sân trường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sân trường" (n).',
      'Gợi ý 2: Phiên âm: /ˈskuːljɑːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-18',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nWhat do you think of sports and ________s?',
    options: [
      'game',
      'competition',
      'windy',
      'good'
    ],
    correctAnswer: 'game',
    explanation: 'Từ "game" (/ɡeɪm/) có nghĩa tiếng Việt là "trò chơi". Ví dụ: Bạn nghĩ gì về thể thao và trò chơi?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trò chơi" (n).',
      'Gợi ý 2: Phiên âm: /ɡeɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-19',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI play ________.',
    options: [
      'football',
      'swim',
      'bicycle',
      'volleyball'
    ],
    correctAnswer: 'volleyball',
    explanation: 'Từ "volleyball" (/ˈvɒlibɔːl/) có nghĩa tiếng Việt là "bóng chuyền". Ví dụ: Tôi chơi bóng chuyền.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bóng chuyền" (n).',
      'Gợi ý 2: Phiên âm: /ˈvɒlibɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-20',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI don\'t like to play ________.',
    options: [
      'chess',
      'win',
      'volleyball',
      'competition'
    ],
    correctAnswer: 'chess',
    explanation: 'Từ "chess" (/tʃes/) có nghĩa tiếng Việt là "cờ". Ví dụ: Tôi không thích chơi cờ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cờ" (n).',
      'Gợi ý 2: Phiên âm: /tʃes/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-21',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - GETTING STARTED]\nI like ________.',
    options: [
      'aerobics',
      'score',
      'free time',
      'schoolyard'
    ],
    correctAnswer: 'aerobics',
    explanation: 'Từ "aerobics" (/eəˈrəʊbɪks/) có nghĩa tiếng Việt là "thể dục nhịp điệu". Ví dụ: Tôi thích thể dục nhịp điệu.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thể dục nhịp điệu" (n).',
      'Gợi ý 2: Phiên âm: /eəˈrəʊbɪks/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-22',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nShe won ________ sports competitions.',
    options: [
      'table tennis',
      'marathon',
      'international',
      'amazing'
    ],
    correctAnswer: 'international',
    explanation: 'Từ "international" (/ˌɪntəˈnæʃnəl/) có nghĩa tiếng Việt là "quốc tế". Ví dụ: Cô ấy đã vô địch các giải thể thao quốc tế.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quốc tế" (adj).',
      'Gợi ý 2: Phiên âm: /ˌɪntəˈnæʃnəl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-23',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nHe became a ________ tennis player.',
    options: [
      'world',
      'bicycle',
      'break time',
      'football'
    ],
    correctAnswer: 'world',
    explanation: 'Từ "world" (/wɜːld/) có nghĩa tiếng Việt là "thế giới". Ví dụ: Anh ấy đã trở thành vận động viên quần vợt thế giới.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thế giới" (n).',
      'Gợi ý 2: Phiên âm: /wɜːld/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-24',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\n________ for jobs is intense.',
    options: [
      'competition',
      'important',
      'grandpa',
      'world'
    ],
    correctAnswer: 'competition',
    explanation: 'Từ "competition" (/ˌkɒmpəˈtɪʃn/) có nghĩa tiếng Việt là "cuộc tranh tài, cuộc thi". Ví dụ: Cạnh tranh về việc làm rất khốc liệt.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc tranh tài, cuộc thi" (n).',
      'Gợi ý 2: Phiên âm: /ˌkɒmpəˈtɪʃn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-25',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nShe is the world ________ for the third year in succession.',
    options: [
      'champion',
      'famous',
      'gym',
      'weekend'
    ],
    correctAnswer: 'champion',
    explanation: 'Từ "champion" (/ˈtʃæmpiən/) có nghĩa tiếng Việt là "nhà vô địch". Ví dụ: Cô là nhà vô địch thế giới năm thứ ba liên tiếp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà vô địch" (n).',
      'Gợi ý 2: Phiên âm: /ˈtʃæmpiən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-26',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nShe\'s won a lot of beauty ________s.',
    options: [
      'boat',
      'swim',
      'outdoors',
      'contest'
    ],
    correctAnswer: 'contest',
    explanation: 'Từ "contest" (/ˈkɒntest/) có nghĩa tiếng Việt là "cuộc thi". Ví dụ: Cô ấy đã chiến thắng rất nhiều cuộc thi sắc đẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc thi" (n).',
      'Gợi ý 2: Phiên âm: /ˈkɒntest/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-27',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nThere\'ll be a prize for the ________.',
    options: [
      'contest',
      'wrestling',
      'famous',
      'winner'
    ],
    correctAnswer: 'winner',
    explanation: 'Từ "winner" (/ˈwɪnə(r)/) có nghĩa tiếng Việt là "người chiến thắng". Ví dụ: Sẽ có một giải thưởng cho người chiến thắng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "người chiến thắng" (n).',
      'Gợi ý 2: Phiên âm: /ˈwɪnə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-28',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nHe holds his tennis ________ firmly.',
    options: [
      'racket',
      'loudly',
      'chess',
      'restaurant'
    ],
    correctAnswer: 'racket',
    explanation: 'Từ "racket" (/ˈrækɪt/) có nghĩa tiếng Việt là "cây vợt". Ví dụ: Anh ta cầm chặt chiếc vợt tennis của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cây vợt" (n).',
      'Gợi ý 2: Phiên âm: /ˈrækɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-29',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nWe won the ________.',
    options: [
      'club',
      'match',
      'player',
      'tidy up'
    ],
    correctAnswer: 'match',
    explanation: 'Từ "match" (/mætʃ/) có nghĩa tiếng Việt là "trận đấu". Ví dụ: Chúng tôi đã thắng trận đấu.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trận đấu" (n).',
      'Gợi ý 2: Phiên âm: /mætʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-30',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nI have two pairs of ________.',
    options: [
      'international',
      'exercise',
      'goggles',
      'passenger'
    ],
    correctAnswer: 'goggles',
    explanation: 'Từ "goggles" (/ˈɡɒɡlz/) có nghĩa tiếng Việt là "kính bơi, kính bảo hộ". Ví dụ: Tôi có hai chiếc kính bơi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kính bơi, kính bảo hộ" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡɒɡlz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-31',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nWe took turns rowing the ________ up the river.',
    options: [
      'call',
      'touch',
      'boat',
      'marathon'
    ],
    correctAnswer: 'boat',
    explanation: 'Từ "boat" (/bəʊt/) có nghĩa tiếng Việt là "con thuyền". Ví dụ: Chúng tôi thay nhau chèo thuyền ngược dòng sông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con thuyền" (n).',
      'Gợi ý 2: Phiên âm: /bəʊt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-32',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nMy ________ is old.',
    options: [
      'loudly',
      'grandpa',
      'gum',
      'newspaper'
    ],
    correctAnswer: 'grandpa',
    explanation: 'Từ "grandpa" (/ˈɡrænpɑː/) có nghĩa tiếng Việt là "ông (nội/ngoại)". Ví dụ: Ông tôi đã già.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ông (nội/ngoại)" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡrænpɑː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-33',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nI play ________.',
    options: [
      'player',
      'sports',
      'gym',
      'badminton'
    ],
    correctAnswer: 'badminton',
    explanation: 'Từ "badminton" (/ˈbædmɪntən/) có nghĩa tiếng Việt là "cầu lông". Ví dụ: Tôi chơi cầu lông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cầu lông" (n).',
      'Gợi ý 2: Phiên âm: /ˈbædmɪntən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-34',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 1]\nI ride my ________.',
    options: [
      'contest',
      'amazing',
      'noise',
      'bicycle'
    ],
    correctAnswer: 'bicycle',
    explanation: 'Từ "bicycle" (/ˈbaɪsɪkl/) có nghĩa tiếng Việt là "xe đạp". Ví dụ: Tôi đi xe đạp của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "xe đạp" (n).',
      'Gợi ý 2: Phiên âm: /ˈbaɪsɪkl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-35',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nDid you have a nice ________?',
    options: [
      'weekend',
      'grandpa',
      'super fit',
      'career'
    ],
    correctAnswer: 'weekend',
    explanation: 'Từ "weekend" (/ˌwiːkˈend/) có nghĩa tiếng Việt là "cuối tuần". Ví dụ: Bạn đã có một cuối tuần vui vẻ chứ?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuối tuần" (n).',
      'Gợi ý 2: Phiên âm: /ˌwiːkˈend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-36',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nI go ________ with my dad.',
    options: [
      'fishing',
      'goggles',
      'aerobics',
      'club'
    ],
    correctAnswer: 'fishing',
    explanation: 'Từ "fishing" (/ˈfɪʃɪŋ/) có nghĩa tiếng Việt là "việc câu cá". Ví dụ: Tôi đi câu cá với bố tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "việc câu cá" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɪʃɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-37',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nI visit the ________ with my family.',
    options: [
      'free time',
      'boat',
      'museum',
      'special'
    ],
    correctAnswer: 'museum',
    explanation: 'Từ "museum" (/mjuˈziːəm/) có nghĩa tiếng Việt là "bảo tàng". Ví dụ: Tôi đến thăm bảo tàng với gia đình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bảo tàng" (n).',
      'Gợi ý 2: Phiên âm: /mjuˈziːəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-38',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nThen we eat at my favorite ________.',
    options: [
      'grandpa',
      'restaurant',
      'equipment',
      'international'
    ],
    correctAnswer: 'restaurant',
    explanation: 'Từ "restaurant" (/ˈrestrɒnt/) có nghĩa tiếng Việt là "nhà hàng". Ví dụ: Sau đó, chúng tôi ăn ở nhà hàng yêu thích của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà hàng" (n).',
      'Gợi ý 2: Phiên âm: /ˈrestrɒnt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-39',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nDid you watch ________ last Sunday?',
    options: [
      'football',
      'super fit',
      'passenger',
      'schoolyard'
    ],
    correctAnswer: 'football',
    explanation: 'Từ "football" (/ˈfʊtbɔːl/) có nghĩa tiếng Việt là "bóng đá". Ví dụ: Chủ nhật tuần trước bạn có xem bóng đá không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bóng đá" (n).',
      'Gợi ý 2: Phiên âm: /ˈfʊtbɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-40',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nMy favorite team ________d a fantastic goal.',
    options: [
      'career',
      'amazing',
      'score',
      'player'
    ],
    correctAnswer: 'score',
    explanation: 'Từ "score" (/skɔː(r)/) có nghĩa tiếng Việt là "ghi bàn, điểm số". Ví dụ: Đội bóng yêu thích của tôi đã ghi một bàn thắng tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ghi bàn, điểm số" (v).',
      'Gợi ý 2: Phiên âm: /skɔː(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-41',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nI was ________.',
    options: [
      'exhausted',
      'football',
      'player',
      'gym'
    ],
    correctAnswer: 'exhausted',
    explanation: 'Từ "exhausted" (/ɪɡˈzɔːstɪd/) có nghĩa tiếng Việt là "kiệt sức". Ví dụ: Tôi đã kiệt sức.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kiệt sức" (adj).',
      'Gợi ý 2: Phiên âm: /ɪɡˈzɔːstɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-42',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nDid you ________ well last night?',
    options: [
      'passenger',
      'football',
      'meet',
      'sleep'
    ],
    correctAnswer: 'sleep',
    explanation: 'Từ "sleep" (/sliːp/) có nghĩa tiếng Việt là "ngủ, giấc ngủ". Ví dụ: Tối qua bạn ngủ ngon không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngủ, giấc ngủ" (v).',
      'Gợi ý 2: Phiên âm: /sliːp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-43',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nIt\'s chewing ________.',
    options: [
      'windy',
      'match',
      'gum',
      'stadium'
    ],
    correctAnswer: 'gum',
    explanation: 'Từ "gum" (/ɡʌm/) có nghĩa tiếng Việt là "kẹo cao su". Ví dụ: Đó là kẹo cao su.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kẹo cao su" (n).',
      'Gợi ý 2: Phiên âm: /ɡʌm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-44',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nIt\'s ________ outside.',
    options: [
      'international',
      'goggles',
      'exhausted',
      'windy'
    ],
    correctAnswer: 'windy',
    explanation: 'Từ "windy" (/ˈwɪndi/) có nghĩa tiếng Việt là "có gió". Ví dụ: Ngoài trời có gió.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có gió" (adj).',
      'Gợi ý 2: Phiên âm: /ˈwɪndi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-45',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\n________ your room.',
    options: [
      'tidy up',
      'restaurant',
      'international',
      'gym'
    ],
    correctAnswer: 'tidy up',
    explanation: 'Từ "tidy up" (/ˈtaɪdi ʌp/) có nghĩa tiếng Việt là "dọn dẹp". Ví dụ: Dọn dẹp phòng của bạn đi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "dọn dẹp" (phr.v).',
      'Gợi ý 2: Phiên âm: /ˈtaɪdi ʌp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-46',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nDon\'t speak ________.',
    options: [
      'club',
      'exhausted',
      'game',
      'loudly'
    ],
    correctAnswer: 'loudly',
    explanation: 'Từ "loudly" (/ˈlaʊdli/) có nghĩa tiếng Việt là "lớn tiếng, ầm ĩ". Ví dụ: Đừng nói lớn tiếng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lớn tiếng, ầm ĩ" (adv).',
      'Gợi ý 2: Phiên âm: /ˈlaʊdli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-47',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - A CLOSER LOOK 2]\nThere is a ________.',
    options: [
      'can',
      'contest',
      'intelligent',
      'fire'
    ],
    correctAnswer: 'fire',
    explanation: 'Từ "fire" (/ˈfaɪə(r)/) có nghĩa tiếng Việt là "ngọn lửa, đám cháy". Ví dụ: Có lửa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngọn lửa, đám cháy" (n).',
      'Gợi ý 2: Phiên âm: /ˈfaɪə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-48',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - COMMUNICATION]\nDo you play sports in your ________?',
    options: [
      'fishing',
      'contest',
      'free time',
      'skipping rope'
    ],
    correctAnswer: 'free time',
    explanation: 'Từ "free time" (/ˌfriː ˈtaɪm/) có nghĩa tiếng Việt là "thời gian rảnh". Ví dụ: Bạn có chơi thể thao trong thời gian rảnh không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời gian rảnh" (n).',
      'Gợi ý 2: Phiên âm: /ˌfriː ˈtaɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-49',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - COMMUNICATION]\nHow ________ do you play them?',
    options: [
      'competition',
      'famous',
      'club',
      'often'
    ],
    correctAnswer: 'often',
    explanation: 'Từ "often" (/ˈɒfn/) có nghĩa tiếng Việt là "thường xuyên". Ví dụ: Bạn chơi chúng thường xuyên như thế nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thường xuyên" (adv).',
      'Gợi ý 2: Phiên âm: /ˈɒfn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-50',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - COMMUNICATION]\nDid you ________ any clubs?',
    options: [
      'amazing',
      'noise',
      'bear',
      'join'
    ],
    correctAnswer: 'join',
    explanation: 'Từ "join" (/dʒɔɪn/) có nghĩa tiếng Việt là "tham gia". Ví dụ: Bạn đã tham gia câu lạc bộ nào chưa?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tham gia" (v).',
      'Gợi ý 2: Phiên âm: /dʒɔɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-51',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - COMMUNICATION]\n________! You won.',
    options: [
      'congratulations',
      'goggles',
      'grandpa',
      'score'
    ],
    correctAnswer: 'congratulations',
    explanation: 'Từ "congratulations" (/kənˌɡrætʃuˈleɪʃnz/) có nghĩa tiếng Việt là "lời chúc mừng". Ví dụ: Xin chúc mừng! Bạn đã thắng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lời chúc mừng" (n).',
      'Gợi ý 2: Phiên âm: /kənˌɡrætʃuˈleɪʃnz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-52',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - COMMUNICATION]\nHow many ________s are there in a football match?',
    options: [
      'player',
      'fire',
      'gym',
      'grandpa'
    ],
    correctAnswer: 'player',
    explanation: 'Từ "player" (/ˈpleɪə(r)/) có nghĩa tiếng Việt là "người chơi, vận động viên". Ví dụ: Có bao nhiêu người chơi trong một trận đấu bóng đá?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "người chơi, vận động viên" (n).',
      'Gợi ý 2: Phiên âm: /ˈpleɪə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-53',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - COMMUNICATION]\nHow long is a ________?',
    options: [
      'table tennis',
      'important',
      'marathon',
      'noise'
    ],
    correctAnswer: 'marathon',
    explanation: 'Từ "marathon" (/ˈmærəθən/) có nghĩa tiếng Việt là "cuộc chạy ma-ra-tông". Ví dụ: Cuộc chạy ma-ra-tông dài bao nhiêu?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc chạy ma-ra-tông" (n).',
      'Gợi ý 2: Phiên âm: /ˈmærəθən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-54',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nWhen were you born?',
    options: [
      'champion',
      'grandpa',
      'famous',
      'bear'
    ],
    correctAnswer: 'bear',
    explanation: 'Từ "bear" (/beə(r)/) có nghĩa tiếng Việt là "sinh ra". Ví dụ: Bạn sinh ra khi nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sinh ra" (v).',
      'Gợi ý 2: Phiên âm: /beə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-55',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nHow many ________s did he score in total?',
    options: [
      'goal',
      'bicycle',
      'amazing',
      'score'
    ],
    correctAnswer: 'goal',
    explanation: 'Từ "goal" (/ɡəʊl/) có nghĩa tiếng Việt là "bàn thắng, khung thành". Ví dụ: Anh ấy đã ghi tổng cộng bao nhiêu bàn thắng?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bàn thắng, khung thành" (n).',
      'Gợi ý 2: Phiên âm: /ɡəʊl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-56',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nWhat do people ________ him?',
    options: [
      'amazing',
      'equipment',
      'call',
      'international'
    ],
    correctAnswer: 'call',
    explanation: 'Từ "call" (/kɔːl/) có nghĩa tiếng Việt là "gọi, đặt tên". Ví dụ: Mọi người gọi anh ấy là gì?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "gọi, đặt tên" (v).',
      'Gợi ý 2: Phiên âm: /kɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-57',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nWhat is ________ about him?',
    options: [
      'special',
      'break time',
      'grandpa',
      'volleyball'
    ],
    correctAnswer: 'special',
    explanation: 'Từ "special" (/ˈspeʃl/) có nghĩa tiếng Việt là "đặc biệt". Ví dụ: Điều gì đặc biệt ở anh ấy?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đặc biệt" (adj).',
      'Gợi ý 2: Phiên âm: /ˈspeʃl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-58',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nHe\'s the best ________ of all time.',
    options: [
      'footballer',
      'famous',
      'contest',
      'competition'
    ],
    correctAnswer: 'footballer',
    explanation: 'Từ "footballer" (/ˈfʊtbɔːlə(r)/) có nghĩa tiếng Việt là "cầu thủ bóng đá". Ví dụ: Anh ấy là cầu thủ bóng đá xuất sắc nhất mọi thời đại.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cầu thủ bóng đá" (n).',
      'Gợi ý 2: Phiên âm: /ˈfʊtbɔːlə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-59',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nWhen did he begin his ________?',
    options: [
      'player',
      'club',
      'museum',
      'career'
    ],
    correctAnswer: 'career',
    explanation: 'Từ "career" (/kəˈrɪə(r)/) có nghĩa tiếng Việt là "sự nghiệp". Ví dụ: Anh ấy bắt đầu sự nghiệp khi nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sự nghiệp" (n).',
      'Gợi ý 2: Phiên âm: /kəˈrɪə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-60',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 1]\nWow, that\'s ________.',
    options: [
      'boat',
      'marathon',
      'winner',
      'amazing'
    ],
    correctAnswer: 'amazing',
    explanation: 'Từ "amazing" (/əˈmeɪzɪŋ/) có nghĩa tiếng Việt là "kinh ngạc, tuyệt vời". Ví dụ: Ồ, thật kinh ngạc.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kinh ngạc, tuyệt vời" (adj).',
      'Gợi ý 2: Phiên âm: /əˈmeɪzɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-61',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 2]\nHe is ________.',
    options: [
      'can',
      'famous',
      'match',
      'table tennis'
    ],
    correctAnswer: 'famous',
    explanation: 'Từ "famous" (/ˈfeɪməs/) có nghĩa tiếng Việt là "nổi tiếng". Ví dụ: Anh ấy nổi tiếng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nổi tiếng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfeɪməs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-62',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - SKILLS 2]\nTwo ________ trains were involved in the accident.',
    options: [
      'fire',
      'volleyball',
      'amazing',
      'passenger'
    ],
    correctAnswer: 'passenger',
    explanation: 'Từ "passenger" (/ˈpæsɪndʒə(r)/) có nghĩa tiếng Việt là "hành khách". Ví dụ: Hai đoàn tàu chở khách liên quan đến vụ tai nạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hành khách" (n).',
      'Gợi ý 2: Phiên âm: /ˈpæsɪndʒə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-63',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - LOOKING BACK]\nYour friends are making a lot of ________.',
    options: [
      'football',
      'sleep',
      'weekend',
      'noise'
    ],
    correctAnswer: 'noise',
    explanation: 'Từ "noise" (/nɔɪz/) có nghĩa tiếng Việt là "tiếng ồn". Ví dụ: Bạn bè của bạn đang gây ồn ào.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiếng ồn" (n).',
      'Gợi ý 2: Phiên âm: /nɔɪz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-64',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - LOOKING BACK]\nMy teacher says that he is an ________ student.',
    options: [
      'intelligent',
      'game',
      'fire',
      'newspaper'
    ],
    correctAnswer: 'intelligent',
    explanation: 'Từ "intelligent" (/ɪnˈtelɪdʒənt/) có nghĩa tiếng Việt là "thông minh". Ví dụ: Giáo viên của tôi nói rằng cậu ấy là một học sinh thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thông minh" (adj).',
      'Gợi ý 2: Phiên âm: /ɪnˈtelɪdʒənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-65',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - LOOKING BACK]\nYour mother tells you not to ________ the dog.',
    options: [
      'touch',
      'aerobics',
      'game',
      'meet'
    ],
    correctAnswer: 'touch',
    explanation: 'Từ "touch" (/tʌtʃ/) có nghĩa tiếng Việt là "chạm, sờ". Ví dụ: Mẹ bạn bảo bạn không được chạm vào con chó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chạm, sờ" (v).',
      'Gợi ý 2: Phiên âm: /tʌtʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-66',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - LOOKING BACK]\nSports are very ________ in our lives.',
    options: [
      'table tennis',
      'match',
      'important',
      'game'
    ],
    correctAnswer: 'important',
    explanation: 'Từ "important" (/ɪmˈpɔːtnt/) có nghĩa tiếng Việt là "quan trọng". Ví dụ: Thể thao rất quan trọng trong cuộc sống của chúng ta.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quan trọng" (adj).',
      'Gợi ý 2: Phiên âm: /ɪmˈpɔːtnt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-67',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - LOOKING BACK]\nThousands of fans packed into the ________ to watch the match.',
    options: [
      'can',
      'football',
      'winner',
      'stadium'
    ],
    correctAnswer: 'stadium',
    explanation: 'Từ "stadium" (/ˈsteɪdiəm/) có nghĩa tiếng Việt là "sân vận động". Ví dụ: Hàng nghìn cổ động viên đã chật kín sân vận động để theo dõi trận đấu.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sân vận động" (n).',
      'Gợi ý 2: Phiên âm: /ˈsteɪdiəm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-68',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - LOOKING BACK]\nWhen you open a ________...',
    options: [
      'newspaper',
      'competition',
      'idea',
      'noise'
    ],
    correctAnswer: 'newspaper',
    explanation: 'Từ "newspaper" (/ˈnjuːzpeɪpə(r)/) có nghĩa tiếng Việt là "tờ báo". Ví dụ: Khi bạn mở một tờ báo...',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tờ báo" (n).',
      'Gợi ý 2: Phiên âm: /ˈnjuːzpeɪpə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-69',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - PROJECT]\nI play ________.',
    options: [
      'fishing',
      'skipping rope',
      'meet',
      'super fit'
    ],
    correctAnswer: 'skipping rope',
    explanation: 'Từ "skipping rope" (/ˈskɪpɪŋ rəʊp/) có nghĩa tiếng Việt là "trò nhảy dây, dây nhảy". Ví dụ: Tôi chơi trò nhảy dây.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trò nhảy dây, dây nhảy" (n).',
      'Gợi ý 2: Phiên âm: /ˈskɪpɪŋ rəʊp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u8-v-70',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 8: SPORTS AND GAMES - PROJECT]\nI didn\'t like ________.',
    options: [
      'fishing',
      'schoolyard',
      'can',
      'wrestling'
    ],
    correctAnswer: 'wrestling',
    explanation: 'Từ "wrestling" (/ˈreslɪŋ/) có nghĩa tiếng Việt là "môn đấu vật". Ví dụ: Tôi không thích môn đấu vật.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "môn đấu vật" (n).',
      'Gợi ý 2: Phiên âm: /ˈreslɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-1',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nAre these photos from your ________s?',
    options: [
      'boat',
      'cub',
      'shoes',
      'holiday'
    ],
    correctAnswer: 'holiday',
    explanation: 'Từ "holiday" (/ˈhɒlədeɪ/) có nghĩa tiếng Việt là "kỳ nghỉ, ngày nghỉ". Ví dụ: Đây có phải là những bức ảnh từ những ngày nghỉ của bạn không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "kỳ nghỉ, ngày nghỉ" (n).',
      'Gợi ý 2: Phiên âm: /ˈhɒlədeɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-2',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nThis is Sydney, a city in ________.',
    options: [
      'Australia',
      'snow',
      'city',
      'building'
    ],
    correctAnswer: 'Australia',
    explanation: 'Từ "Australia" (/ɒsˈtreɪliə/) có nghĩa tiếng Việt là "nước Úc". Ví dụ: Đây là Sydney, một thành phố ở Úc.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nước Úc" (n).',
      'Gợi ý 2: Phiên âm: /ɒsˈtreɪliə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-3',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIt is ________.',
    options: [
      'photo',
      'feel',
      'exciting',
      'around'
    ],
    correctAnswer: 'exciting',
    explanation: 'Từ "exciting" (/ɪkˈsaɪtɪŋ/) có nghĩa tiếng Việt là "thú vị, sôi động". Ví dụ: Thật là thú vị.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thú vị, sôi động" (adj).',
      'Gợi ý 2: Phiên âm: /ɪkˈsaɪtɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-4',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIt\'s so exciting with a lot of ________es.',
    options: [
      'beach',
      'time',
      'delicious',
      'bark'
    ],
    correctAnswer: 'beach',
    explanation: 'Từ "beach" (/biːtʃ/) có nghĩa tiếng Việt là "bãi biển". Ví dụ: Thật thú vị với rất nhiều bãi biển.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bãi biển" (n).',
      'Gợi ý 2: Phiên âm: /biːtʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-5',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nWhat a beautiful ________!',
    options: [
      'place',
      'sea',
      'map',
      'Australia'
    ],
    correctAnswer: 'place',
    explanation: 'Từ "place" (/pleɪs/) có nghĩa tiếng Việt là "địa điểm, nơi". Ví dụ: Thật là một nơi tuyệt đẹp!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "địa điểm, nơi" (n).',
      'Gợi ý 2: Phiên âm: /pleɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-6',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIts beaches are very ________.',
    options: [
      'Swedish',
      'city',
      'dress',
      'clean'
    ],
    correctAnswer: 'clean',
    explanation: 'Từ "clean" (/kliːn/) có nghĩa tiếng Việt là "sạch sẽ". Ví dụ: Các bãi biển của nó rất sạch sẽ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sạch sẽ" (adj).',
      'Gợi ý 2: Phiên âm: /kliːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-7',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nThis is ________.',
    options: [
      'roof',
      'bicycle',
      'food',
      'London'
    ],
    correctAnswer: 'London',
    explanation: 'Từ "London" (/ˈlʌndən/) có nghĩa tiếng Việt là "Luân Đôn". Ví dụ: Đây là Luân Đôn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "Luân Đôn" (n).',
      'Gợi ý 2: Phiên âm: /ˈlʌndən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-8',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIs it ________ing?',
    options: [
      'dress',
      'city',
      'market',
      'rain'
    ],
    correctAnswer: 'rain',
    explanation: 'Từ "rain" (/reɪn/) có nghĩa tiếng Việt là "mưa, cơn mưa". Ví dụ: Trời đang mưa phải không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mưa, cơn mưa" (n).',
      'Gợi ý 2: Phiên âm: /reɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-9',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nWhat ________ weather!',
    options: [
      'square',
      'postcard',
      'bad',
      'lion'
    ],
    correctAnswer: 'bad',
    explanation: 'Từ "bad" (/bæd/) có nghĩa tiếng Việt là "tồi tệ, xấu". Ví dụ: Thời tiết thật tệ!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tồi tệ, xấu" (adj).',
      'Gợi ý 2: Phiên âm: /bæd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-10',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIt rains all the ________.',
    options: [
      'time',
      'city',
      'fantastic',
      'pagoda'
    ],
    correctAnswer: 'time',
    explanation: 'Từ "time" (/taɪm/) có nghĩa tiếng Việt là "thời gian". Ví dụ: Lúc nào trời cũng mưa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời gian" (n).',
      'Gợi ý 2: Phiên âm: /taɪm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-11',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nCan you ________ Big Ben?',
    options: [
      'food',
      'country',
      'see',
      'bell'
    ],
    correctAnswer: 'see',
    explanation: 'Từ "see" (/siː/) có nghĩa tiếng Việt là "nhìn thấy". Ví dụ: Bạn có thấy tháp Big Ben không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhìn thấy" (v).',
      'Gợi ý 2: Phiên âm: /siː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-12',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIt is a ________ of London.',
    options: [
      'expensive',
      'landmark',
      'theatre',
      'rain'
    ],
    correctAnswer: 'landmark',
    explanation: 'Từ "landmark" (/ˈlændmɑːk/) có nghĩa tiếng Việt là "thắng cảnh, công trình biểu tượng". Ví dụ: Nó là một biểu tượng của London.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thắng cảnh, công trình biểu tượng" (n).',
      'Gợi ý 2: Phiên âm: /ˈlændmɑːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-13',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nThis is Times ________ in New York.',
    options: [
      'dress',
      'snow',
      'perfect',
      'square'
    ],
    correctAnswer: 'square',
    explanation: 'Từ "square" (/skweə(r)/) có nghĩa tiếng Việt là "quảng trường". Ví dụ: Đây là Quảng trường Thời đại ở New York.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quảng trường" (n).',
      'Gợi ý 2: Phiên âm: /skweə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-14',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nIt is ________ but interesting.',
    options: [
      'dress',
      'time',
      'crowded',
      'old'
    ],
    correctAnswer: 'crowded',
    explanation: 'Từ "crowded" (/ˈkraʊdɪd/) có nghĩa tiếng Việt là "đông đúc". Ví dụ: Nó đông đúc nhưng thú vị.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đông đúc" (adj).',
      'Gợi ý 2: Phiên âm: /ˈkraʊdɪd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-15',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nYou are ________ to visit many places.',
    options: [
      'friendly',
      'tower',
      'lucky',
      'present'
    ],
    correctAnswer: 'lucky',
    explanation: 'Từ "lucky" (/ˈlʌki/) có nghĩa tiếng Việt là "may mắn". Ví dụ: Bạn thật may mắn khi được thăm nhiều nơi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "may mắn" (adj).',
      'Gợi ý 2: Phiên âm: /ˈlʌki/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-16',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - GETTING STARTED]\nHere are some ________s of mine.',
    options: [
      'Swedish',
      'photo',
      'feel',
      'old'
    ],
    correctAnswer: 'photo',
    explanation: 'Từ "photo" (/ˈfəʊtəʊ/) có nghĩa tiếng Việt là "bức ảnh". Ví dụ: Đây là một số bức ảnh của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bức ảnh" (n).',
      'Gợi ý 2: Phiên âm: /ˈfəʊtəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-17',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nWhat\'s the weather like in Sydney in ________?',
    options: [
      'shoes',
      'crowded',
      'summer',
      'cub'
    ],
    correctAnswer: 'summer',
    explanation: 'Từ "summer" (/ˈsʌmə(r)/) có nghĩa tiếng Việt là "mùa hè". Ví dụ: Thời tiết ở Sydney vào mùa hè như thế nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mùa hè" (n).',
      'Gợi ý 2: Phiên âm: /ˈsʌmə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-18',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nWe took turns rowing the ________ up the river.',
    options: [
      'boat',
      'friendly',
      'shoes',
      'bark'
    ],
    correctAnswer: 'boat',
    explanation: 'Từ "boat" (/bəʊt/) có nghĩa tiếng Việt là "con thuyền". Ví dụ: Chúng tôi thay nhau chèo thuyền ngược sông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con thuyền" (n).',
      'Gợi ý 2: Phiên âm: /bəʊt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-19',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nIt is ________.',
    options: [
      'dry',
      'time',
      'stall',
      'coast'
    ],
    correctAnswer: 'dry',
    explanation: 'Từ "dry" (/draɪ/) có nghĩa tiếng Việt là "khô ráo". Ví dụ: Trời khô ráo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khô ráo" (adj).',
      'Gợi ý 2: Phiên âm: /draɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-20',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nI love ________.',
    options: [
      'food',
      'paint',
      'dress',
      'cub'
    ],
    correctAnswer: 'food',
    explanation: 'Từ "food" (/fuːd/) có nghĩa tiếng Việt là "thức ăn, đồ ăn". Ví dụ: Tôi yêu đồ ăn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thức ăn, đồ ăn" (n).',
      'Gợi ý 2: Phiên âm: /fuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-21',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nI ________ that they can tell stories.',
    options: [
      'food',
      'feel',
      'old',
      'friend'
    ],
    correctAnswer: 'feel',
    explanation: 'Từ "feel" (/fiːl/) có nghĩa tiếng Việt là "cảm thấy". Ví dụ: Tôi cảm thấy rằng họ có thể kể những câu chuyện.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cảm thấy" (v).',
      'Gợi ý 2: Phiên âm: /fiːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-22',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nIt\'s very ________.',
    options: [
      'old',
      'cub',
      'holiday',
      'country'
    ],
    correctAnswer: 'old',
    explanation: 'Từ "old" (/əʊld/) có nghĩa tiếng Việt là "cũ, cổ kính". Ví dụ: Nó rất cổ kính.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cũ, cổ kính" (adj).',
      'Gợi ý 2: Phiên âm: /əʊld/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-23',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nThe people in the city are nice and ________.',
    options: [
      'stall',
      'bark',
      'helpful',
      'country'
    ],
    correctAnswer: 'helpful',
    explanation: 'Từ "helpful" (/ˈhelpfl/) có nghĩa tiếng Việt là "hay giúp đỡ, hữu ích". Ví dụ: Người dân trong thành phố rất tốt bụng và hay giúp đỡ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hay giúp đỡ, hữu ích" (adj).',
      'Gợi ý 2: Phiên âm: /ˈhelpfl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-24',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nHanoi is ________ for its street food.',
    options: [
      'famous',
      'dress',
      'exciting',
      'snow'
    ],
    correctAnswer: 'famous',
    explanation: 'Từ "famous" (/ˈfeɪməs/) có nghĩa tiếng Việt là "nổi tiếng". Ví dụ: Hà Nội nổi tiếng với đồ ăn đường phố.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nổi tiếng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfeɪməs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-25',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nThe ________ is crowded at the weekend.',
    options: [
      'friend',
      'town',
      'weather',
      'lucky'
    ],
    correctAnswer: 'town',
    explanation: 'Từ "town" (/taʊn/) có nghĩa tiếng Việt là "thị trấn". Ví dụ: Thị trấn đông đúc vào cuối tuần.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thị trấn" (n).',
      'Gợi ý 2: Phiên âm: /taʊn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-26',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nThere is lots of ________.',
    options: [
      'journey',
      'snow',
      'bell',
      'map'
    ],
    correctAnswer: 'snow',
    explanation: 'Từ "snow" (/snəʊ/) có nghĩa tiếng Việt là "tuyết". Ví dụ: Có rất nhiều tuyết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tuyết" (n).',
      'Gợi ý 2: Phiên âm: /snəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-27',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nIt is very ________.',
    options: [
      'clean',
      'shoes',
      'cold',
      'square'
    ],
    correctAnswer: 'cold',
    explanation: 'Từ "cold" (/kəʊld/) có nghĩa tiếng Việt là "lạnh". Ví dụ: Trời rất lạnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lạnh" (adj).',
      'Gợi ý 2: Phiên âm: /kəʊld/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-28',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nIt is very cold at the ________.',
    options: [
      'expensive',
      'feel',
      'pagoda',
      'cartoon'
    ],
    correctAnswer: 'pagoda',
    explanation: 'Từ "pagoda" (/pəˈɡəʊdə/) có nghĩa tiếng Việt là "ngôi chùa". Ví dụ: Ở chùa rất lạnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngôi chùa" (n).',
      'Gợi ý 2: Phiên âm: /pəˈɡəʊdə/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-29',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 1]\nHe\'s running ________ the house.',
    options: [
      'around',
      'clean',
      'city',
      'sky'
    ],
    correctAnswer: 'around',
    explanation: 'Từ "around" (/əˈraʊnd/) có nghĩa tiếng Việt là "xung quanh". Ví dụ: Anh ấy đang chạy quanh nhà.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "xung quanh" (prep).',
      'Gợi ý 2: Phiên âm: /əˈraʊnd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-30',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nThey cannot find their city ________ anyway.',
    options: [
      'map',
      'pagoda',
      'bark',
      'bell'
    ],
    correctAnswer: 'map',
    explanation: 'Từ "map" (/mæp/) có nghĩa tiếng Việt là "bản đồ". Ví dụ: Họ không thể tìm thấy bản đồ thành phố của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bản đồ" (n).',
      'Gợi ý 2: Phiên âm: /mæp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-31',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nI love ________s.',
    options: [
      'dry',
      'photo',
      'cartoon',
      'visitor'
    ],
    correctAnswer: 'cartoon',
    explanation: 'Từ "cartoon" (/kɑːˈtuːn/) có nghĩa tiếng Việt là "phim hoạt hình". Ví dụ: Tôi yêu phim hoạt hình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "phim hoạt hình" (n).',
      'Gợi ý 2: Phiên âm: /kɑːˈtuːn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-32',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nMy ________ cartoon is Dragon Ball.',
    options: [
      'favourite',
      'map',
      'rain',
      'holiday'
    ],
    correctAnswer: 'favourite',
    explanation: 'Từ "favourite" (/ˈfeɪvərɪt/) có nghĩa tiếng Việt là "yêu thích". Ví dụ: Phim hoạt hình yêu thích của tôi là Bảy viên ngọc rồng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "yêu thích" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfeɪvərɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-33',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nThe ________ has three cubs.',
    options: [
      'lion',
      'roof',
      'present',
      'park'
    ],
    correctAnswer: 'lion',
    explanation: 'Từ "lion" (/ˈlaɪən/) có nghĩa tiếng Việt là "con sư tử". Ví dụ: Sư tử mẹ có ba con sư tử con.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con sư tử" (n).',
      'Gợi ý 2: Phiên âm: /ˈlaɪən/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-34',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nThe ________s are playing under the big tree.',
    options: [
      'park',
      'capital',
      'narrow',
      'cub'
    ],
    correctAnswer: 'cub',
    explanation: 'Từ "cub" (/kʌb/) có nghĩa tiếng Việt là "thú con (sư tử, hổ...)". Ví dụ: Những chú sư tử con đang chơi đùa dưới gốc cây lớn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thú con (sư tử, hổ...)" (n).',
      'Gợi ý 2: Phiên âm: /kʌb/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-35',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nDo you know my ________ Anna?',
    options: [
      'friend',
      'old',
      'summer',
      'famous'
    ],
    correctAnswer: 'friend',
    explanation: 'Từ "friend" (/frend/) có nghĩa tiếng Việt là "người bạn". Ví dụ: Bạn có biết bạn tôi Anna không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "người bạn" (n).',
      'Gợi ý 2: Phiên âm: /frend/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-36',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nMy house is close to the ________.',
    options: [
      'park',
      'sea',
      'roof',
      'snow'
    ],
    correctAnswer: 'park',
    explanation: 'Từ "park" (/pɑːk/) có nghĩa tiếng Việt là "công viên". Ví dụ: Nhà tôi ở gần công viên.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "công viên" (n).',
      'Gợi ý 2: Phiên âm: /pɑːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-37',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nMy country is famous for ________.',
    options: [
      'chocolate',
      'bicycle',
      'paint',
      'time'
    ],
    correctAnswer: 'chocolate',
    explanation: 'Từ "chocolate" (/ˈtʃɒklət/) có nghĩa tiếng Việt là "sô-cô-la". Ví dụ: Đất nước tôi nổi tiếng về sô-cô-la.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sô-cô-la" (n).',
      'Gợi ý 2: Phiên âm: /ˈtʃɒklət/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-38',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nShe doesn\'t like her new ________.',
    options: [
      'sunny',
      'chocolate',
      'dress',
      'helpful'
    ],
    correctAnswer: 'dress',
    explanation: 'Từ "dress" (/dres/) có nghĩa tiếng Việt là "cái váy". Ví dụ: Cô ấy không thích chiếc váy mới của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái váy" (n).',
      'Gợi ý 2: Phiên âm: /dres/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-39',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nHe is riding his ________.',
    options: [
      'roof',
      'fantastic',
      'bicycle',
      'pagoda'
    ],
    correctAnswer: 'bicycle',
    explanation: 'Từ "bicycle" (/ˈbaɪsɪkl/) có nghĩa tiếng Việt là "xe đạp". Ví dụ: Anh ấy đang đi xe đạp của mình.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "xe đạp" (n).',
      'Gợi ý 2: Phiên âm: /ˈbaɪsɪkl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-40',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nThe cat is playing with its ________.',
    options: [
      'around',
      'ball',
      'crowded',
      'fantastic'
    ],
    correctAnswer: 'ball',
    explanation: 'Từ "ball" (/bɔːl/) có nghĩa tiếng Việt là "quả bóng". Ví dụ: Con mèo đang chơi với quả bóng của nó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quả bóng" (n).',
      'Gợi ý 2: Phiên âm: /bɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-41',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nThey are ________ing their room pink.',
    options: [
      'paint',
      'stall',
      'helmet',
      'theatre'
    ],
    correctAnswer: 'paint',
    explanation: 'Từ "paint" (/peɪnt/) có nghĩa tiếng Việt là "sơn, vẽ". Ví dụ: Họ đang sơn phòng của mình màu hồng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sơn, vẽ" (v).',
      'Gợi ý 2: Phiên âm: /peɪnt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-42',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nThis is a ________ for you.',
    options: [
      'present',
      'coast',
      'lucky',
      'map'
    ],
    correctAnswer: 'present',
    explanation: 'Từ "present" (/ˈpreznt/) có nghĩa tiếng Việt là "món quà". Ví dụ: Đây là một món quà dành cho bạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "món quà" (n).',
      'Gợi ý 2: Phiên âm: /ˈpreznt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-43',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nMy father has new ________.',
    options: [
      'shoes',
      'tower',
      'pagoda',
      'exciting'
    ],
    correctAnswer: 'shoes',
    explanation: 'Từ "shoes" (/ʃuːz/) có nghĩa tiếng Việt là "đôi giày". Ví dụ: Bố tôi có đôi giày mới.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đôi giày" (n).',
      'Gợi ý 2: Phiên âm: /ʃuːz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-44',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nAll of its big cities are along the ________.',
    options: [
      'tower',
      'coast',
      'feel',
      'landmark'
    ],
    correctAnswer: 'coast',
    explanation: 'Từ "coast" (/kəʊst/) có nghĩa tiếng Việt là "bờ biển". Ví dụ: Tất cả các thành phố lớn của nó đều nằm dọc bờ biển.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bờ biển" (n).',
      'Gợi ý 2: Phiên âm: /kəʊst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-45',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nAustralia is a strange ________.',
    options: [
      'lion',
      'dry',
      'summer',
      'country'
    ],
    correctAnswer: 'country',
    explanation: 'Từ "country" (/ˈkʌntri/) có nghĩa tiếng Việt là "đất nước, quốc gia". Ví dụ: Úc là một đất nước kỳ lạ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đất nước, quốc gia" (n).',
      'Gợi ý 2: Phiên âm: /ˈkʌntri/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-46',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - A CLOSER LOOK 2]\nOur street is short and ________.',
    options: [
      'narrow',
      'photo',
      'friendly',
      'roof'
    ],
    correctAnswer: 'narrow',
    explanation: 'Từ "narrow" (/ˈnærəʊ/) có nghĩa tiếng Việt là "hẹp, chật hẹp". Ví dụ: Con đường của chúng tôi ngắn và hẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hẹp, chật hẹp" (adj).',
      'Gợi ý 2: Phiên âm: /ˈnærəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-47',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nEvery year, millions of ________s climb to its top.',
    options: [
      'lion',
      'favourite',
      'perfect',
      'visitor'
    ],
    correctAnswer: 'visitor',
    explanation: 'Từ "visitor" (/ˈvɪzɪtə(r)/) có nghĩa tiếng Việt là "du khách, khách tham quan". Ví dụ: Mỗi năm, hàng triệu du khách leo lên đỉnh của nó.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "du khách, khách tham quan" (n).',
      'Gợi ý 2: Phiên âm: /ˈvɪzɪtə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-48',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nWhat a nice ________!',
    options: [
      'bell',
      'pagoda',
      'around',
      'city'
    ],
    correctAnswer: 'city',
    explanation: 'Từ "city" (/ˈsɪti/) có nghĩa tiếng Việt là "thành phố". Ví dụ: Thật là một thành phố đẹp!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thành phố" (n).',
      'Gợi ý 2: Phiên âm: /ˈsɪti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-49',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nWhat a clear ________!',
    options: [
      'boat',
      'summer',
      'Australia',
      'sky'
    ],
    correctAnswer: 'sky',
    explanation: 'Từ "sky" (/skaɪ/) có nghĩa tiếng Việt là "bầu trời". Ví dụ: Bầu trời quang đãng làm sao!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bầu trời" (n).',
      'Gợi ý 2: Phiên âm: /skaɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-50',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nWhat tall ________s!',
    options: [
      'visitor',
      'shoes',
      'building',
      'friend'
    ],
    correctAnswer: 'building',
    explanation: 'Từ "building" (/ˈbɪldɪŋ/) có nghĩa tiếng Việt là "tòa nhà". Ví dụ: Những tòa nhà cao tầng làm sao!',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tòa nhà" (n).',
      'Gợi ý 2: Phiên âm: /ˈbɪldɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-51',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nThe dog is so ________.',
    options: [
      'expensive',
      'building',
      'summer',
      'friendly'
    ],
    correctAnswer: 'friendly',
    explanation: 'Từ "friendly" (/ˈfrendli/) có nghĩa tiếng Việt là "thân thiện". Ví dụ: Con chó rất thân thiện.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thân thiện" (adj).',
      'Gợi ý 2: Phiên âm: /ˈfrendli/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-52',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nIt never ________s.',
    options: [
      'bark',
      'Swedish',
      'helpful',
      'summer'
    ],
    correctAnswer: 'bark',
    explanation: 'Từ "bark" (/bɑːk/) có nghĩa tiếng Việt là "sủa". Ví dụ: Nó không bao giờ sủa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sủa" (v).',
      'Gợi ý 2: Phiên âm: /bɑːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-53',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nThe people of Quang Nam are proud of their ________ town.',
    options: [
      'beach',
      'place',
      'Swedish',
      'ancient'
    ],
    correctAnswer: 'ancient',
    explanation: 'Từ "ancient" (/ˈeɪnʃənt/) có nghĩa tiếng Việt là "cổ kính, cổ xưa". Ví dụ: Người dân Quảng Nam tự hào về phố cổ của họ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cổ kính, cổ xưa" (adj).',
      'Gợi ý 2: Phiên âm: /ˈeɪnʃənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-54',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nThis is my ________.',
    options: [
      'sky',
      'capital',
      'postcard',
      'pagoda'
    ],
    correctAnswer: 'capital',
    explanation: 'Từ "capital" (/ˈkæpɪtl/) có nghĩa tiếng Việt là "thủ đô". Ví dụ: Đây là thủ đô của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thủ đô" (n).',
      'Gợi ý 2: Phiên âm: /ˈkæpɪtl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-55',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nThis ________ is on the bank.',
    options: [
      'tower',
      'roof',
      'holiday',
      'chocolate'
    ],
    correctAnswer: 'tower',
    explanation: 'Từ "tower" (/ˈtaʊə(r)/) có nghĩa tiếng Việt là "ngọn tháp". Ví dụ: Ngọn tháp này nằm trên bờ sông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngọn tháp" (n).',
      'Gợi ý 2: Phiên âm: /ˈtaʊə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-56',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nThere is a big clock and a ________.',
    options: [
      'expensive',
      'narrow',
      'coast',
      'bell'
    ],
    correctAnswer: 'bell',
    explanation: 'Từ "bell" (/bel/) có nghĩa tiếng Việt là "cái chuông". Ví dụ: Có một chiếc đồng hồ lớn và một cái chuông.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái chuông" (n).',
      'Gợi ý 2: Phiên âm: /bel/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-57',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nIt is a ________.',
    options: [
      'friendly',
      'cartoon',
      'sunny',
      'theatre'
    ],
    correctAnswer: 'theatre',
    explanation: 'Từ "theatre" (/ˈθɪətə(r)/) có nghĩa tiếng Việt là "nhà hát". Ví dụ: Đó là một nhà hát.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhà hát" (n).',
      'Gợi ý 2: Phiên âm: /ˈθɪətə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-58',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - COMMUNICATION]\nIts ________s are white and look like shells.',
    options: [
      'Swedish',
      'stall',
      'cub',
      'roof'
    ],
    correctAnswer: 'roof',
    explanation: 'Từ "roof" (/ruːf/) có nghĩa tiếng Việt là "mái nhà". Ví dụ: Mái nhà của nó màu trắng và trông giống như những chiếc vỏ sò.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mái nhà" (n).',
      'Gợi ý 2: Phiên âm: /ruːf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-59',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nWhen do people write a ________?',
    options: [
      'postcard',
      'around',
      'helmet',
      'tower'
    ],
    correctAnswer: 'postcard',
    explanation: 'Từ "postcard" (/ˈpəʊstkɑːd/) có nghĩa tiếng Việt là "bưu thiếp". Ví dụ: Khi nào mọi người viết bưu thiếp?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bưu thiếp" (n).',
      'Gợi ý 2: Phiên âm: /ˈpəʊstkɑːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-60',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nGuests can see ________ art in the hotel.',
    options: [
      'Swedish',
      'roof',
      'summer',
      'helpful'
    ],
    correctAnswer: 'Swedish',
    explanation: 'Từ "Swedish" (/ˈswiːdɪʃ/) có nghĩa tiếng Việt là "thuộc Thụy Điển". Ví dụ: Du khách có thể ngắm nghệ thuật Thụy Điển trong khách sạn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thuộc Thụy Điển" (adj).',
      'Gợi ý 2: Phiên âm: /ˈswiːdɪʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-61',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nStockholm is ________.',
    options: [
      'capital',
      'fantastic',
      'helpful',
      'see'
    ],
    correctAnswer: 'fantastic',
    explanation: 'Từ "fantastic" (/fænˈtæstɪk/) có nghĩa tiếng Việt là "tuyệt vời". Ví dụ: Stockholm thật tuyệt vời.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tuyệt vời" (adj).',
      'Gợi ý 2: Phiên âm: /fænˈtæstɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-62',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nIts weather is ________.',
    options: [
      'snow',
      'clean',
      'London',
      'perfect'
    ],
    correctAnswer: 'perfect',
    explanation: 'Từ "perfect" (/ˈpɜːfɪkt/) có nghĩa tiếng Việt là "hoàn hảo". Ví dụ: Thời tiết ở đó thật hoàn hảo.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hoàn hảo" (adj).',
      'Gợi ý 2: Phiên âm: /ˈpɜːfɪkt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-63',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nIt has a ________ and a gym.',
    options: [
      'country',
      'tower',
      'landmark',
      'swimming pool'
    ],
    correctAnswer: 'swimming pool',
    explanation: 'Từ "swimming pool" (/ˈswɪmɪŋ puːl/) có nghĩa tiếng Việt là "hồ bơi". Ví dụ: Nó có một hồ bơi và một phòng tập thể dục.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hồ bơi" (n).',
      'Gợi ý 2: Phiên âm: /ˈswɪmɪŋ puːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-64',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nIt offers a ________ breakfast.',
    options: [
      'summer',
      'old',
      'delicious',
      'bicycle'
    ],
    correctAnswer: 'delicious',
    explanation: 'Từ "delicious" (/dɪˈlɪʃəs/) có nghĩa tiếng Việt là "ngon miệng". Ví dụ: Nó phục vụ một bữa sáng rất ngon.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngon miệng" (adj).',
      'Gợi ý 2: Phiên âm: /dɪˈlɪʃəs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-65',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 1]\nMy parents wore their ________s.',
    options: [
      'photo',
      'bicycle',
      'helmet',
      'lucky'
    ],
    correctAnswer: 'helmet',
    explanation: 'Từ "helmet" (/ˈhelmɪt/) có nghĩa tiếng Việt là "mũ bảo hiểm". Ví dụ: Bố mẹ tôi đã đội mũ bảo hiểm của họ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mũ bảo hiểm" (n).',
      'Gợi ý 2: Phiên âm: /ˈhelmɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-66',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 2]\nThai people are at a ________.',
    options: [
      'beach',
      'market',
      'cold',
      'stall'
    ],
    correctAnswer: 'market',
    explanation: 'Từ "market" (/ˈmɑːkɪt/) có nghĩa tiếng Việt là "khu chợ". Ví dụ: Người Thái đang ở một khu chợ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu chợ" (n).',
      'Gợi ý 2: Phiên âm: /ˈmɑːkɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-67',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 2]\nThings at Chatuchak market are not ________.',
    options: [
      'expensive',
      'friend',
      'shoes',
      'food'
    ],
    correctAnswer: 'expensive',
    explanation: 'Từ "expensive" (/ɪkˈspensɪv/) có nghĩa tiếng Việt là "đắt đỏ". Ví dụ: Hàng hóa ở chợ Chatuchak không đắt.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đắt đỏ" (adj).',
      'Gợi ý 2: Phiên âm: /ɪkˈspensɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-68',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 2]\nThe floating market is on the river, not the ________.',
    options: [
      'feel',
      'ancient',
      'bicycle',
      'sea'
    ],
    correctAnswer: 'sea',
    explanation: 'Từ "sea" (/siː/) có nghĩa tiếng Việt là "biển". Ví dụ: Chợ nổi ở trên sông, không phải trên biển.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "biển" (n).',
      'Gợi ý 2: Phiên âm: /siː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-69',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - SKILLS 2]\nYou can find food ________s all around Bangkok.',
    options: [
      'stall',
      'sea',
      'summer',
      'favourite'
    ],
    correctAnswer: 'stall',
    explanation: 'Từ "stall" (/stɔːl/) có nghĩa tiếng Việt là "quầy hàng, gian hàng". Ví dụ: Bạn có thể tìm thấy các quầy thức ăn khắp Bangkok.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quầy hàng, gian hàng" (n).',
      'Gợi ý 2: Phiên âm: /stɔːl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-70',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - LOOKING BACK]\nThe weather is ________.',
    options: [
      'shoes',
      'sunny',
      'exciting',
      'tower'
    ],
    correctAnswer: 'sunny',
    explanation: 'Từ "sunny" (/ˈsʌni/) có nghĩa tiếng Việt là "có nắng, nắng". Ví dụ: Trời nắng đẹp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có nắng, nắng" (adj).',
      'Gợi ý 2: Phiên âm: /ˈsʌni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-71',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - PROJECT]\nMy ________ around the world.',
    options: [
      'journey',
      'famous',
      'cub',
      'delicious'
    ],
    correctAnswer: 'journey',
    explanation: 'Từ "journey" (/ˈdʒɜːni/) có nghĩa tiếng Việt là "hành trình, chuyến đi". Ví dụ: Hành trình vòng quanh thế giới của tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "hành trình, chuyến đi" (n).',
      'Gợi ý 2: Phiên âm: /ˈdʒɜːni/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u9-v-72',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 9: CITIES OF THE WORLD - PROJECT]\nWhat is the ________ like there?',
    options: [
      'old',
      'weather',
      'around',
      'bark'
    ],
    correctAnswer: 'weather',
    explanation: 'Từ "weather" (/ˈweðə(r)/) có nghĩa tiếng Việt là "thời tiết". Ví dụ: Thời tiết ở đó thế nào?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thời tiết" (n).',
      'Gợi ý 2: Phiên âm: /ˈweðə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-1',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nWe are going on a ________ tomorrow.',
    options: [
      'temple',
      'instead of',
      'picnic',
      'waste'
    ],
    correctAnswer: 'picnic',
    explanation: 'Từ "picnic" (/ˈpɪknɪk/) có nghĩa tiếng Việt là "chuyến dã ngoại". Ví dụ: Chúng ta sẽ đi dã ngoại vào ngày mai.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chuyến dã ngoại" (n).',
      'Gợi ý 2: Phiên âm: /ˈpɪknɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-2',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nWhat are you doing at the ________?',
    options: [
      'bag',
      'president',
      'plastic',
      'supermarket'
    ],
    correctAnswer: 'supermarket',
    explanation: 'Từ "supermarket" (/ˈsuːpəmɑːkɪt/) có nghĩa tiếng Việt là "siêu thị". Ví dụ: Bạn đang làm gì ở siêu thị?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "siêu thị" (n).',
      'Gợi ý 2: Phiên âm: /ˈsuːpəmɑːkɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-3',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nI\'m buying some ________s.',
    options: [
      'classmate',
      'egg',
      'waste',
      'save'
    ],
    correctAnswer: 'egg',
    explanation: 'Từ "egg" (/eɡ/) có nghĩa tiếng Việt là "quả trứng". Ví dụ: Tôi đang mua một ít trứng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "quả trứng" (n).',
      'Gợi ý 2: Phiên âm: /eɡ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-4',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nIt is a ________ shopping bag.',
    options: [
      'reusable',
      'plastic',
      'idea',
      'food'
    ],
    correctAnswer: 'reusable',
    explanation: 'Từ "reusable" (/ˌriːˈjuːzəbl/) có nghĩa tiếng Việt là "có thể tái sử dụng". Ví dụ: Nó là một chiếc túi mua sắm có thể tái sử dụng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "có thể tái sử dụng" (adj).',
      'Gợi ý 2: Phiên âm: /ˌriːˈjuːzəbl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-5',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nIt\'s better than a ________ one.',
    options: [
      'environment',
      'material',
      'plastic',
      'instead of'
    ],
    correctAnswer: 'plastic',
    explanation: 'Từ "plastic" (/ˈplæstɪk/) có nghĩa tiếng Việt là "nhựa, bằng nhựa". Ví dụ: Nó tốt hơn một chiếc túi nhựa.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nhựa, bằng nhựa" (n).',
      'Gợi ý 2: Phiên âm: /ˈplæstɪk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-6',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nWe all use this kind of ________.',
    options: [
      'die',
      'fresh',
      'classroom',
      'bag'
    ],
    correctAnswer: 'bag',
    explanation: 'Từ "bag" (/bæɡ/) có nghĩa tiếng Việt là "cái túi". Ví dụ: Tất cả chúng tôi đều dùng loại túi này.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cái túi" (n).',
      'Gợi ý 2: Phiên âm: /bæɡ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-7',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nI will ________ one for my mom.',
    options: [
      'cycling',
      'will',
      'less',
      'buy'
    ],
    correctAnswer: 'buy',
    explanation: 'Từ "buy" (/baɪ/) có nghĩa tiếng Việt là "mua". Ví dụ: Tôi sẽ mua một cái cho mẹ tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mua" (v).',
      'Gợi ý 2: Phiên âm: /baɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-8',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\n________ is good for health.',
    options: [
      'cycling',
      'dirty',
      'environment',
      'plant'
    ],
    correctAnswer: 'cycling',
    explanation: 'Từ "cycling" (/ˈsaɪklɪŋ/) có nghĩa tiếng Việt là "việc đi xe đạp". Ví dụ: Đi xe đạp rất tốt cho sức khỏe.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "việc đi xe đạp" (n).',
      'Gợi ý 2: Phiên âm: /ˈsaɪklɪŋ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-9',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nThe ________ will be cleaner.',
    options: [
      'classroom',
      'air',
      'cycling',
      'bin'
    ],
    correctAnswer: 'air',
    explanation: 'Từ "air" (/eə(r)/) có nghĩa tiếng Việt là "không khí". Ví dụ: Không khí sẽ sạch hơn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "không khí" (n).',
      'Gợi ý 2: Phiên âm: /eə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-10',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nThey will help the ________.',
    options: [
      'flood',
      'environment',
      'waste',
      'fresh'
    ],
    correctAnswer: 'environment',
    explanation: 'Từ "environment" (/ɪnˈvaɪrənmənt/) có nghĩa tiếng Việt là "môi trường". Ví dụ: Chúng sẽ giúp ích cho môi trường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "môi trường" (n).',
      'Gợi ý 2: Phiên âm: /ɪnˈvaɪrənmənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-11',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nDo you ________ trees?',
    options: [
      'plant',
      'picnic',
      'waste',
      'classroom'
    ],
    correctAnswer: 'plant',
    explanation: 'Từ "plant" (/plɑːnt/) có nghĩa tiếng Việt là "trồng (cây), cây cối". Ví dụ: Bạn có trồng cây không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trồng (cây), cây cối" (v).',
      'Gợi ý 2: Phiên âm: /plɑːnt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-12',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - GETTING STARTED]\nDo you pick up ________?',
    options: [
      'temple',
      'rubbish',
      'idea',
      'throw'
    ],
    correctAnswer: 'rubbish',
    explanation: 'Từ "rubbish" (/ˈrʌbɪʃ/) có nghĩa tiếng Việt là "rác rưởi". Ví dụ: Bạn có nhặt rác không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "rác rưởi" (n).',
      'Gợi ý 2: Phiên âm: /ˈrʌbɪʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-13',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 1]\nWe create new products from used ________s.',
    options: [
      'hungry',
      'cough',
      'cycling',
      'material'
    ],
    correctAnswer: 'material',
    explanation: 'Từ "material" (/məˈtɪəriəl/) có nghĩa tiếng Việt là "chất liệu, vật liệu". Ví dụ: Chúng tôi tạo ra những sản phẩm mới từ vật liệu đã qua sử dụng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chất liệu, vật liệu" (n).',
      'Gợi ý 2: Phiên âm: /məˈtɪəriəl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-14',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 1]\nWe need to use ________ of something.',
    options: [
      'idea',
      'less',
      'town',
      'food'
    ],
    correctAnswer: 'less',
    explanation: 'Từ "less" (/les/) có nghĩa tiếng Việt là "ít hơn". Ví dụ: Chúng ta cần sử dụng ít thứ gì đó lại.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ít hơn" (adv).',
      'Gợi ý 2: Phiên âm: /les/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-15',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 1]\nIt\'ll help the ________.',
    options: [
      'Earth',
      'fresh',
      'paper',
      'garden'
    ],
    correctAnswer: 'Earth',
    explanation: 'Từ "Earth" (/ɜːθ/) có nghĩa tiếng Việt là "Trái Đất". Ví dụ: Nó sẽ giúp ích cho Trái Đất.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "Trái Đất" (n).',
      'Gợi ý 2: Phiên âm: /ɜːθ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-16',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 1]\nThe students are planting trees in the ________.',
    options: [
      'plastic',
      'garden',
      'fish',
      'cough'
    ],
    correctAnswer: 'garden',
    explanation: 'Từ "garden" (/ˈɡɑːdn/) có nghĩa tiếng Việt là "khu vườn". Ví dụ: Các học sinh đang trồng cây trong vườn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu vườn" (n).',
      'Gợi ý 2: Phiên âm: /ˈɡɑːdn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-17',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 1]\nIs it better to use a ________ bag?',
    options: [
      'cycling',
      'paper',
      'warm',
      'instead of'
    ],
    correctAnswer: 'paper',
    explanation: 'Từ "paper" (/ˈpeɪpə(r)/) có nghĩa tiếng Việt là "giấy". Ví dụ: Sử dụng túi giấy có tốt hơn không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "giấy" (n).',
      'Gợi ý 2: Phiên âm: /ˈpeɪpə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-18',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 1]\nWe are happy to ________ to school.',
    options: [
      'walk',
      'rubbish',
      'classroom',
      'healthy'
    ],
    correctAnswer: 'walk',
    explanation: 'Từ "walk" (/wɔːk/) có nghĩa tiếng Việt là "đi bộ". Ví dụ: Chúng tôi rất vui khi được đi bộ đến trường.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đi bộ" (v).',
      'Gợi ý 2: Phiên âm: /wɔːk/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-19',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nThe air is ________.',
    options: [
      'paper',
      'fresh',
      'picnic',
      'dirty'
    ],
    correctAnswer: 'dirty',
    explanation: 'Từ "dirty" (/ˈdɜːti/) có nghĩa tiếng Việt là "bẩn thỉu, ô nhiễm". Ví dụ: Không khí bị ô nhiễm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bẩn thỉu, ô nhiễm" (adj).',
      'Gợi ý 2: Phiên âm: /ˈdɜːti/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-20',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nMy father is a ________.',
    options: [
      'water',
      'doctor',
      'tip',
      'tired'
    ],
    correctAnswer: 'doctor',
    explanation: 'Từ "doctor" (/ˈdɒktə(r)/) có nghĩa tiếng Việt là "bác sĩ". Ví dụ: Bố tôi là bác sĩ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bác sĩ" (n).',
      'Gợi ý 2: Phiên âm: /ˈdɒktə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-21',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nThe Sun keeps the Earth ________.',
    options: [
      'food',
      'picnic',
      'voice',
      'warm'
    ],
    correctAnswer: 'warm',
    explanation: 'Từ "warm" (/wɔːm/) có nghĩa tiếng Việt là "ấm áp". Ví dụ: Mặt Trời giữ cho Trái Đất ấm áp.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ấm áp" (adj).',
      'Gợi ý 2: Phiên âm: /wɔːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-22',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nA ________ is an intelligent animal.',
    options: [
      'dolphin',
      'water',
      'cough',
      'save'
    ],
    correctAnswer: 'dolphin',
    explanation: 'Từ "dolphin" (/ˈdɒlfɪn/) có nghĩa tiếng Việt là "cá heo". Ví dụ: Cá heo là một loài động vật thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cá heo" (n).',
      'Gợi ý 2: Phiên âm: /ˈdɒlfɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-23',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nThe air is not ________.',
    options: [
      'president',
      'water',
      'bag',
      'fresh'
    ],
    correctAnswer: 'fresh',
    explanation: 'Từ "fresh" (/freʃ/) có nghĩa tiếng Việt là "trong lành, tươi mới". Ví dụ: Không khí không trong lành.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trong lành, tươi mới" (adj).',
      'Gợi ý 2: Phiên âm: /freʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-24',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nPeople ________ because of pollution.',
    options: [
      'plastic',
      'cough',
      'idea',
      'fresh'
    ],
    correctAnswer: 'cough',
    explanation: 'Từ "cough" (/kɒf/) có nghĩa tiếng Việt là "ho". Ví dụ: Mọi người ho vì ô nhiễm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ho" (v).',
      'Gợi ý 2: Phiên âm: /kɒf/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-25',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nThe ________ is dirty.',
    options: [
      'fish',
      'water',
      'food',
      'less'
    ],
    correctAnswer: 'water',
    explanation: 'Từ "water" (/ˈwɔːtə(r)/) có nghĩa tiếng Việt là "nước". Ví dụ: Nước bị ô nhiễm.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nước" (n).',
      'Gợi ý 2: Phiên âm: /ˈwɔːtə(r)/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-26',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nI see a lot of ________ die.',
    options: [
      'fish',
      'reusable',
      'forest',
      'waste'
    ],
    correctAnswer: 'fish',
    explanation: 'Từ "fish" (/fɪʃ/) có nghĩa tiếng Việt là "con cá". Ví dụ: Tôi thấy rất nhiều cá chết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "con cá" (n).',
      'Gợi ý 2: Phiên âm: /fɪʃ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-27',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nWe cut down trees in the ________.',
    options: [
      'flood',
      'forest',
      'die',
      'bin'
    ],
    correctAnswer: 'forest',
    explanation: 'Từ "forest" (/ˈfɒrɪst/) có nghĩa tiếng Việt là "khu rừng". Ví dụ: Chúng ta chặt cây trong rừng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khu rừng" (n).',
      'Gợi ý 2: Phiên âm: /ˈfɒrɪst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-28',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nThere are more ________s.',
    options: [
      'flood',
      'paper',
      'save',
      'organise'
    ],
    correctAnswer: 'flood',
    explanation: 'Từ "flood" (/flʌd/) có nghĩa tiếng Việt là "lũ lụt". Ví dụ: Có nhiều trận lũ lụt hơn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lũ lụt" (n).',
      'Gợi ý 2: Phiên âm: /flʌd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-29',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nThere is too much ________.',
    options: [
      'president',
      'healthy',
      'water',
      'noise'
    ],
    correctAnswer: 'noise',
    explanation: 'Từ "noise" (/nɔɪz/) có nghĩa tiếng Việt là "tiếng ồn". Ví dụ: Có quá nhiều tiếng ồn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiếng ồn" (n).',
      'Gợi ý 2: Phiên âm: /nɔɪz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-30',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nIf ________ recycle more...',
    options: [
      'paper',
      'warm',
      'organise',
      'we'
    ],
    correctAnswer: 'we',
    explanation: 'Từ "we" (/wiː/) có nghĩa tiếng Việt là "chúng ta, chúng tôi". Ví dụ: Nếu chúng ta tái chế nhiều hơn...',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chúng ta, chúng tôi" (pronoun).',
      'Gợi ý 2: Phiên âm: /wiː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-31',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nWe ________ a lot of trees.',
    options: [
      'warm',
      'healthy',
      'air',
      'save'
    ],
    correctAnswer: 'save',
    explanation: 'Từ "save" (/seɪv/) có nghĩa tiếng Việt là "tiết kiệm, cứu". Ví dụ: Chúng ta cứu/tiết kiệm được rất nhiều cây cối.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiết kiệm, cứu" (v).',
      'Gợi ý 2: Phiên âm: /seɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-32',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - A CLOSER LOOK 2]\nIf we do not ________ so much paper...',
    options: [
      'creative',
      'classmate',
      'tip',
      'waste'
    ],
    correctAnswer: 'waste',
    explanation: 'Từ "waste" (/weɪst/) có nghĩa tiếng Việt là "lãng phí, rác thải". Ví dụ: Nếu chúng ta không lãng phí quá nhiều giấy...',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lãng phí, rác thải" (v).',
      'Gợi ý 2: Phiên âm: /weɪst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-33',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - COMMUNICATION]\nYou are giving the goldfish too much ________.',
    options: [
      'president',
      'bag',
      'food',
      'plastic'
    ],
    correctAnswer: 'food',
    explanation: 'Từ "food" (/fuːd/) có nghĩa tiếng Việt là "thức ăn". Ví dụ: Bạn đang cho cá vàng ăn quá nhiều thức ăn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thức ăn" (n).',
      'Gợi ý 2: Phiên âm: /fuːd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-34',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - COMMUNICATION]\nThey will ________.',
    options: [
      'die',
      'interview',
      'we',
      'egg'
    ],
    correctAnswer: 'die',
    explanation: 'Từ "die" (/daɪ/) có nghĩa tiếng Việt là "chết". Ví dụ: Chúng sẽ chết.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chết" (v).',
      'Gợi ý 2: Phiên âm: /daɪ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-35',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWhat is the ________ about?',
    options: [
      'interview',
      'air',
      'doctor',
      'will'
    ],
    correctAnswer: 'interview',
    explanation: 'Từ "interview" (/ˈɪntəvjuː/) có nghĩa tiếng Việt là "cuộc phỏng vấn". Ví dụ: Cuộc phỏng vấn nói về cái gì?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "cuộc phỏng vấn" (n).',
      'Gợi ý 2: Phiên âm: /ˈɪntəvjuː/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-36',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWhat will they put in every ________?',
    options: [
      'material',
      'waste',
      'president',
      'classroom'
    ],
    correctAnswer: 'classroom',
    explanation: 'Từ "classroom" (/ˈklɑːsruːm/) có nghĩa tiếng Việt là "lớp học". Ví dụ: Họ sẽ đặt những gì trong mỗi lớp học?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lớp học" (n).',
      'Gợi ý 2: Phiên âm: /ˈklɑːsruːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-37',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWhat can they do with their old ________s?',
    options: [
      'cycling',
      'uniform',
      'plastic',
      'reusable'
    ],
    correctAnswer: 'uniform',
    explanation: 'Từ "uniform" (/ˈjuːnɪfɔːm/) có nghĩa tiếng Việt là "đồng phục". Ví dụ: Họ có thể làm gì với đồng phục cũ của mình?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đồng phục" (n).',
      'Gợi ý 2: Phiên âm: /ˈjuːnɪfɔːm/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-38',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWhat do they do ________ buying new books?',
    options: [
      'artist',
      'paper',
      'warm',
      'instead of'
    ],
    correctAnswer: 'instead of',
    explanation: 'Từ "instead of" (/ɪnˈsted əv/) có nghĩa tiếng Việt là "thay vì". Ví dụ: Họ làm gì thay vì mua sách mới?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thay vì" (prep).',
      'Gợi ý 2: Phiên âm: /ɪnˈsted əv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-39',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nCan you share with us some ________s to make your school greener?',
    options: [
      'tip',
      'air',
      'voice',
      'noise'
    ],
    correctAnswer: 'tip',
    explanation: 'Từ "tip" (/tɪp/) có nghĩa tiếng Việt là "lời khuyên, mẹo". Ví dụ: Bạn có thể chia sẻ một số mẹo để làm trường học xanh hơn không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "lời khuyên, mẹo" (n).',
      'Gợi ý 2: Phiên âm: /tɪp/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-40',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWe put recycling ________s in every classroom.',
    options: [
      'bin',
      'hungry',
      'creative',
      'egg'
    ],
    correctAnswer: 'bin',
    explanation: 'Từ "bin" (/bɪn/) có nghĩa tiếng Việt là "thùng rác". Ví dụ: Chúng tôi đặt các thùng rác tái chế ở mỗi lớp học.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thùng rác" (n).',
      'Gợi ý 2: Phiên âm: /bɪn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-41',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWe ________ them with our friends or give them to charity.',
    options: [
      'exchange',
      'dirty',
      'airport',
      'bag'
    ],
    correctAnswer: 'exchange',
    explanation: 'Từ "exchange" (/ɪksˈtʃeɪndʒ/) có nghĩa tiếng Việt là "trao đổi". Ví dụ: Chúng tôi trao đổi chúng với bạn bè hoặc tặng cho tổ chức từ thiện.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "trao đổi" (v).',
      'Gợi ý 2: Phiên âm: /ɪksˈtʃeɪndʒ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-42',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 1]\nWe don\'t ________ them away.',
    options: [
      'paper',
      'waste',
      'town',
      'throw'
    ],
    correctAnswer: 'throw',
    explanation: 'Từ "throw" (/θrəʊ/) có nghĩa tiếng Việt là "ném, vứt". Ví dụ: Chúng tôi không vứt bỏ chúng đi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ném, vứt" (v).',
      'Gợi ý 2: Phiên âm: /θrəʊ/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-43',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 2]\nAre you ________?',
    options: [
      'uniform',
      'creative',
      'idea',
      'environment'
    ],
    correctAnswer: 'creative',
    explanation: 'Từ "creative" (/kriˈeɪtɪv/) có nghĩa tiếng Việt là "sáng tạo". Ví dụ: Bạn có sáng tạo không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sáng tạo" (adj).',
      'Gợi ý 2: Phiên âm: /kriˈeɪtɪv/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-44',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 2]\nWhat will you do if you become our ________?',
    options: [
      'less',
      'president',
      'fish',
      'town'
    ],
    correctAnswer: 'president',
    explanation: 'Từ "president" (/ˈprezɪdənt/) có nghĩa tiếng Việt là "chủ tịch, tổng thống". Ví dụ: Bạn sẽ làm gì nếu trở thành chủ tịch của chúng tôi?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "chủ tịch, tổng thống" (n).',
      'Gợi ý 2: Phiên âm: /ˈprezɪdənt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-45',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 2]\nRaise your ________ and become our president.',
    options: [
      'voice',
      'bag',
      'will',
      'we'
    ],
    correctAnswer: 'voice',
    explanation: 'Từ "voice" (/vɔɪs/) có nghĩa tiếng Việt là "tiếng nói, giọng nói". Ví dụ: Hãy cất cao tiếng nói và trở thành chủ tịch của chúng tôi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tiếng nói, giọng nói" (n).',
      'Gợi ý 2: Phiên âm: /vɔɪs/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-46',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 2]\nI will ________ some book fairs.',
    options: [
      'organise',
      'die',
      'supermarket',
      'waste'
    ],
    correctAnswer: 'organise',
    explanation: 'Từ "organise" (/ˈɔːɡənaɪz/) có nghĩa tiếng Việt là "tổ chức". Ví dụ: Tôi sẽ tổ chức một số hội chợ sách.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "tổ chức" (v).',
      'Gợi ý 2: Phiên âm: /ˈɔːɡənaɪz/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-47',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - SKILLS 2]\nMy ________ is clever.',
    options: [
      'president',
      'tip',
      'classmate',
      'waste'
    ],
    correctAnswer: 'classmate',
    explanation: 'Từ "classmate" (/ˈklɑːsmeɪt/) có nghĩa tiếng Việt là "bạn cùng lớp". Ví dụ: Bạn cùng lớp của tôi rất thông minh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "bạn cùng lớp" (n).',
      'Gợi ý 2: Phiên âm: /ˈklɑːsmeɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-48',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nI ________ run away.',
    options: [
      'will',
      'bag',
      'Earth',
      'dirty'
    ],
    correctAnswer: 'will',
    explanation: 'Từ "will" (/wɪl/) có nghĩa tiếng Việt là "sẽ". Ví dụ: Tôi sẽ chạy đi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sẽ" (aux).',
      'Gợi ý 2: Phiên âm: /wɪl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-49',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nDoes your ________ have a gallery?',
    options: [
      'picnic',
      'classroom',
      'dolphin',
      'town'
    ],
    correctAnswer: 'town',
    explanation: 'Từ "town" (/taʊn/) có nghĩa tiếng Việt là "thị trấn". Ví dụ: Thị trấn của bạn có phòng trưng bày không?',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "thị trấn" (n).',
      'Gợi ý 2: Phiên âm: /taʊn/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-50',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nThe Moon is ________ tonight.',
    options: [
      'healthy',
      'bright',
      'rubbish',
      'cycling'
    ],
    correctAnswer: 'bright',
    explanation: 'Từ "bright" (/braɪt/) có nghĩa tiếng Việt là "sáng, sáng chói". Ví dụ: Đêm nay Mặt Trăng thật sáng.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sáng, sáng chói" (adj).',
      'Gợi ý 2: Phiên âm: /braɪt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-51',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nThere is a big ________ in the town.',
    options: [
      'temple',
      'bag',
      'classmate',
      'picnic'
    ],
    correctAnswer: 'temple',
    explanation: 'Từ "temple" (/ˈtempl/) có nghĩa tiếng Việt là "ngôi đền". Ví dụ: Có một ngôi đền lớn trong thị trấn.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ngôi đền" (n).',
      'Gợi ý 2: Phiên âm: /ˈtempl/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-52',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nShe\'s an ________.',
    options: [
      'paper',
      'creative',
      'artist',
      'walk'
    ],
    correctAnswer: 'artist',
    explanation: 'Từ "artist" (/ˈɑːtɪst/) có nghĩa tiếng Việt là "nghệ sĩ, họa sĩ". Ví dụ: Cô ấy là một nghệ sĩ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "nghệ sĩ, họa sĩ" (n).',
      'Gợi ý 2: Phiên âm: /ˈɑːtɪst/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-53',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nThey built an ________ here.',
    options: [
      'airport',
      'bin',
      'organise',
      'noise'
    ],
    correctAnswer: 'airport',
    explanation: 'Từ "airport" (/ˈeəpɔːt/) có nghĩa tiếng Việt là "sân bay". Ví dụ: Họ xây dựng một sân bay ở đây.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "sân bay" (n).',
      'Gợi ý 2: Phiên âm: /ˈeəpɔːt/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-54',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nWe are ________.',
    options: [
      'hungry',
      'interview',
      'warm',
      'bright'
    ],
    correctAnswer: 'hungry',
    explanation: 'Từ "hungry" (/ˈhʌŋɡri/) có nghĩa tiếng Việt là "đói". Ví dụ: Chúng tôi đang đói.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "đói" (adj).',
      'Gợi ý 2: Phiên âm: /ˈhʌŋɡri/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-55',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nWe are ________.',
    options: [
      'instead of',
      'tired',
      'environment',
      'food'
    ],
    correctAnswer: 'tired',
    explanation: 'Từ "tired" (/ˈtaɪəd/) có nghĩa tiếng Việt là "mệt mỏi". Ví dụ: Chúng tôi mệt mỏi.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "mệt mỏi" (adj).',
      'Gợi ý 2: Phiên âm: /ˈtaɪəd/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-56',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - LOOKING BACK]\nWe are ________.',
    options: [
      'bright',
      'save',
      'hungry',
      'healthy'
    ],
    correctAnswer: 'healthy',
    explanation: 'Từ "healthy" (/ˈhelθi/) có nghĩa tiếng Việt là "khỏe mạnh". Ví dụ: Chúng tôi khỏe mạnh.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "khỏe mạnh" (adj).',
      'Gợi ý 2: Phiên âm: /ˈhelθi/.'
    ],
    difficulty: 'Dễ'
  },
  {
    id: 'q-u11-v-57',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: '📌 [UNIT 11: OUR GREENER WORLD - PROJECT]\nYou have creative ________s about reusing old things.',
    options: [
      'bright',
      'we',
      'idea',
      'buy'
    ],
    correctAnswer: 'idea',
    explanation: 'Từ "idea" (/aɪˈdɪə/) có nghĩa tiếng Việt là "ý tưởng". Ví dụ: Bạn có những ý tưởng sáng tạo về việc tái sử dụng đồ cũ.',
    hints: [
      'Gợi ý 1: Nghĩa của từ là "ý tưởng" (n).',
      'Gợi ý 2: Phiên âm: /aɪˈdɪə/.'
    ],
    difficulty: 'Dễ'
  }
];

export const INITIAL_PROGRESS = {
  studentName: 'Học Sinh Lớp 6',
  grade: 6,
  totalXP: 320,
  level: 3,
  streakDays: 4,
  lastStudyDate: new Date().toISOString().split('T')[0],
  badges: [
    {
      id: 'b1',
      title: 'Tân Binh Lớp 6',
      description: 'Hoàn thành bài học đầu tiên bám sát SGK Global Success.',
      icon: 'GraduationCap',
      unlockedAt: new Date().toISOString()
    },
    {
      id: 'b2',
      title: 'Chiến Binh Phát Âm',
      description: 'Thực hành luyện nói chuẩn IPA với AI Tutor.',
      icon: 'Mic',
      unlockedAt: new Date().toISOString()
    },
    {
      id: 'b3',
      title: 'Nhà Thông Thái Socratic',
      description: 'Trả lời đúng câu hỏi gợi mở 5 bước của Gia sư AI.',
      icon: 'Brain',
      unlockedAt: new Date().toISOString()
    }
  ],
  weakTopics: [
    {
      unitId: 'unit-3',
      topicName: 'Thì Hiện Tại Tiếp Diễn (Present Continuous)',
      skill: 'Grammar' as const,
      errorRate: 45,
      recommendation: 'Ôn tập lại quy tắc chia động từ to be (am/is/are) + V-ing và các từ nhận biết như Look!, Listen!, now.'
    },
    {
      unitId: 'unit-2',
      topicName: 'Phát Âm Đuôi /s/ và /z/',
      skill: 'Pronunciation' as const,
      errorRate: 40,
      recommendation: 'Luyện tập phân biệt các âm vô thanh (/p/, /t/, /k/) với âm hữu thanh khi đọc đuôi -s/es.'
    },
    {
      unitId: 'unit-4',
      topicName: 'So Sánh Hơn Của Tính Từ (Comparatives)',
      skill: 'Grammar' as const,
      errorRate: 35,
      recommendation: 'Chú ý phân biệt tính từ ngắn (thêm -er) và tính từ dài (dùng more + adj).'
    }
  ],
  skillMastery: {
    Grammar: 72,
    Vocabulary: 80,
    Pronunciation: 65,
    Listening: 75,
    Speaking: 68,
    Reading: 82,
    Writing: 64
  },
  unitProgress: {
    'unit-1': 100,
    'unit-2': 85,
    'unit-3': 70,
    'unit-4': 60,
    'unit-5': 40,
    'unit-6': 30,
    'unit-7': 10,
    'unit-8': 0,
    'unit-9': 0,
    'unit-10': 0,
    'unit-11': 0,
    'unit-12': 0
  }
};
