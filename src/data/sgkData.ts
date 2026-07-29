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
