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
