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
