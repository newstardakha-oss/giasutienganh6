const fs = require('fs');

const vocabQuestions = [
  // ================= UNIT 1: MY NEW SCHOOL =================
  {
    id: 'q1-v1',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We use a ________ to draw accurate circles in geometry class.',
    options: ['compass', 'calculator', 'rubber', 'ruler'],
    correctAnswer: 'compass',
    explanation: 'Từ "compass" trong Tiếng Anh 6 Unit 1 có nghĩa là cái com-pa (dùng để vẽ hình tròn).',
    hints: ['Gợi ý 1: Dụng cụ học tập dùng để vẽ hình tròn.', 'Gợi ý 2: compass.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v2',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Students in our school wear a white shirt and blue trousers as their ________.',
    options: ['uniform', 'textbook', 'pencil case', 'calculator'],
    correctAnswer: 'uniform',
    explanation: '"uniform" nghĩa là bộ đồng phục học sinh.',
    hints: ['Gợi ý 1: Trang phục mặc đi học.', 'Gợi ý 2: uniform.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v3',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'I need a ________ to do complex mathematical calculations for Math homework.',
    options: ['calculator', 'compass', 'rubber', 'sharpener'],
    correctAnswer: 'calculator',
    explanation: '"calculator" là máy tính cầm tay giúp tính toán nhanh các phép toán.',
    hints: ['Gợi ý 1: Thiết bị dùng để tính toán con số.', 'Gợi ý 2: calculator.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v4',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Put your pens, pencils and rulers into your ________ before going to class.',
    options: ['pencil case', 'schoolbag', 'notebook', 'textbook'],
    correctAnswer: 'pencil case',
    explanation: '"pencil case" là hộp bút / bóp đựng bút.',
    hints: ['Gợi ý 1: Vật dụng đựng bút, thước.', 'Gợi ý 2: pencil case.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v5',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Lan uses a ________ to erase pencil mistakes in her drawing workbook.',
    options: ['rubber', 'compass', 'calculator', 'ruler'],
    correctAnswer: 'rubber',
    explanation: '"rubber" (hoặc eraser) là cục tẩy / gôm học sinh.',
    hints: ['Gợi ý 1: Dụng cụ dùng để xóa vết bút chì.', 'Gợi ý 2: rubber.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q1-v6',
    unitId: 'unit-1',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'My father bought me a sturdy ________ to carry all my heavy books to school.',
    options: ['schoolbag', 'pencil case', 'uniform', 'calculator'],
    correctAnswer: 'schoolbag',
    explanation: '"schoolbag" là chiếc cặp sách / ba lô đi học.',
    hints: ['Gợi ý 1: Túi/ba lô dùng để đựng sách vở đi học.', 'Gợi ý 2: schoolbag.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 2: MY HOUSE =================
  {
    id: 'q2-v1',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We keep fresh milk, butter and cold drinks in the ________ in our kitchen.',
    options: ['fridge', 'microwave', 'wardrobe', 'cupboard'],
    correctAnswer: 'fridge',
    explanation: '"fridge" (tủ lạnh) dùng để bảo quản thực phẩm tươi sống và đồ uống lạnh.',
    hints: ['Gợi ý 1: Thiết bị làm lạnh thức ăn trong bếp.', 'Gợi ý 2: fridge.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v2',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'My grandfather likes sitting on the comfortable ________ in the living room to read newspapers.',
    options: ['sofa', 'dishwasher', 'chest of drawers', 'sink'],
    correctAnswer: 'sofa',
    explanation: '"sofa" là ghế sofa dài êm ái ở phòng khách.',
    hints: ['Gợi ý 1: Ghế dài êm ái đặt ở phòng khách.', 'Gợi ý 2: sofa.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v3',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Hang your shirts and winter coats inside the wooden ________ in your bedroom.',
    options: ['wardrobe', 'fridge', 'microwave', 'sofa'],
    correctAnswer: 'wardrobe',
    explanation: '"wardrobe" là tủ quần áo.',
    hints: ['Gợi ý 1: Tủ dùng để treo quần áo.', 'Gợi ý 2: wardrobe.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q2-v4',
    unitId: 'unit-2',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'We heat up cold soup quickly using the ________ on the kitchen counter.',
    options: ['microwave', 'fridge', 'wardrobe', 'shelf'],
    correctAnswer: 'microwave',
    explanation: '"microwave" là lò vi sóng dùng để hâm nóng thức ăn.',
    hints: ['Gợi ý 1: Thiết bị dùng để hâm nóng thức ăn.', 'Gợi ý 2: microwave.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 3: MY FRIENDS =================
  {
    id: 'q3-v1',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Mai is very ________; she always draws lovely pictures and writes exciting stories.',
    options: ['creative', 'shy', 'lazy', 'talkative'],
    correctAnswer: 'creative',
    explanation: '"creative" nghĩa là sáng tạo.',
    hints: ['Gợi ý 1: Tính cách hay vẽ tranh, sáng tác.', 'Gợi ý 2: creative.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-v2',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Nam is a ________ boy; he always shares his lunch and helps weak classmates.',
    options: ['kind', 'shy', 'selfish', 'strict'],
    correctAnswer: 'kind',
    explanation: '"kind" nghĩa là tốt bụng, nhân ái.',
    hints: ['Gợi ý 1: Hay chia sẻ và giúp đỡ bạn bè.', 'Gợi ý 2: kind.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q3-v3',
    unitId: 'unit-3',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'He feels ________ when he has to speak in front of a big audience.',
    options: ['shy', 'friendly', 'creative', 'talkative'],
    correctAnswer: 'shy',
    explanation: '"shy" nghĩa là nhút nhát, hay e ngại.',
    hints: ['Gợi ý 1: Ngại ngùng trước đám đông.', 'Gợi ý 2: shy.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 4: MY NEIGHBOURHOOD =================
  {
    id: 'q4-v1',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'The local art ________ displays famous paintings by Vietnamese artists.',
    options: ['gallery', 'square', 'suburb', 'cathedral'],
    correctAnswer: 'gallery',
    explanation: '"art gallery" là phòng trưng bày nghệ thuật / bảo tàng mỹ thuật.',
    hints: ['Gợi ý 1: Nơi trưng bày tranh vẽ nghệ thuật.', 'Gợi ý 2: gallery.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q4-v2',
    unitId: 'unit-4',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Many tourists visit the central ________ to see the ancient town fountain.',
    options: ['square', 'suburb', 'gallery', 'station'],
    correctAnswer: 'square',
    explanation: '"square" là quảng trường ở trung tâm thành phố.',
    hints: ['Gợi ý 1: Quảng trường trung tâm.', 'Gợi ý 2: square.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 5: NATURAL WONDERS =================
  {
    id: 'q5-v1',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Ha Long Bay is a famous natural ________ recognized by UNESCO.',
    options: ['wonder', 'cave', 'valley', 'island'],
    correctAnswer: 'wonder',
    explanation: '"natural wonder" là kỳ quan thiên nhiên.',
    hints: ['Gợi ý 1: Kỳ quan thiên nhiên.', 'Gợi ý 2: wonder.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q5-v2',
    unitId: 'unit-5',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'Remember to pack a sleeping ________ for overnight camping on the mountain.',
    options: ['bag', 'coat', 'tent', 'box'],
    correctAnswer: 'bag',
    explanation: '"sleeping bag" là túi ngủ dã ngoại.',
    hints: ['Gợi ý 1: Túi ngủ cắm trại.', 'Gợi ý 2: sleeping bag.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 6: OUR TET HOLIDAY =================
  {
    id: 'q6-v1',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Children are excited to receive lucky ________ in red envelopes during Tet.',
    options: ['money', 'blossoms', 'cakes', 'wishes'],
    correctAnswer: 'money',
    explanation: '"lucky money" là tiền mừng tuổi / lì xì.',
    hints: ['Gợi ý 1: Tiền lì xì đầu năm.', 'Gợi ý 2: lucky money.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q6-v2',
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'In Southern Vietnam, people decorate their houses with yellow apricot ________.',
    options: ['blossoms', 'trees', 'fruits', 'leaves'],
    correctAnswer: 'blossoms',
    explanation: '"apricot blossoms" là hoa mai vàng ngày Tết.',
    hints: ['Gợi ý 1: Hoa mai vàng ngày Tết.', 'Gợi ý 2: blossoms.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 7: TELEVISION =================
  {
    id: 'q7-v1',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Tom and Jerry is a famous animated ________ loved by children worldwide.',
    options: ['cartoon', 'documentary', 'game show', 'news'],
    correctAnswer: 'cartoon',
    explanation: '"cartoon" là phim hoạt hình.',
    hints: ['Gợi ý 1: Phim hoạt hình.', 'Gợi ý 2: cartoon.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q7-v2',
    unitId: 'unit-7',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'We watch the weather ________ to know if it will rain tomorrow.',
    options: ['forecast', 'channel', 'programme', 'show'],
    correctAnswer: 'forecast',
    explanation: '"weather forecast" là bản tin dự báo thời tiết.',
    hints: ['Gợi ý 1: Bản tin dự báo thời tiết.', 'Gợi ý 2: weather forecast.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 8: SPORTS AND GAMES =================
  {
    id: 'q8-v1',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'You need a pair of swimming ________ to protect your eyes underwater.',
    options: ['goggles', 'shoes', 'rackets', 'bats'],
    correctAnswer: 'goggles',
    explanation: '"goggles" là kính bơi.',
    hints: ['Gợi ý 1: Kính đeo khi bơi.', 'Gợi ý 2: goggles.'],
    difficulty: 'Dễ'
  },
  {
    id: 'q8-v2',
    unitId: 'unit-8',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    content: 'To play badminton, players use a shuttlecock and a light ________.',
    options: ['racket', 'bat', 'ball', 'goggles'],
    correctAnswer: 'racket',
    explanation: '"racket" là vợt cầu lông / vợt tennis.',
    hints: ['Gợi ý 1: Vợt cầu lông.', 'Gợi ý 2: racket.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 9: CITIES OF THE WORLD =================
  {
    id: 'q9-v1',
    unitId: 'unit-9',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'The Eiffel Tower is a iconic ________ of Paris.',
    options: ['landmark', 'postcard', 'palace', 'suburb'],
    correctAnswer: 'landmark',
    explanation: '"landmark" là địa danh / công trình biểu tượng nổi tiếng.',
    hints: ['Gợi ý 1: Biểu tượng nổi tiếng của thành phố.', 'Gợi ý 2: landmark.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 10: OUR HOUSES IN THE FUTURE =================
  {
    id: 'q10-v1',
    unitId: 'unit-10',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Future eco-friendly houses will generate electricity from solar ________ on the roof.',
    options: ['panels', 'doors', 'windows', 'fridges'],
    correctAnswer: 'panels',
    explanation: '"solar panels" là các tấm pin năng lượng mặt trời.',
    hints: ['Gợi ý 1: Tấm pin mặt trời.', 'Gợi ý 2: solar panels.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 11: OUR GREENER WORLD =================
  {
    id: 'q11-v1',
    unitId: 'unit-11',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'We should ________ plastic bottles and cans to protect our green environment.',
    options: ['recycle', 'pollute', 'destroy', 'burn'],
    correctAnswer: 'recycle',
    explanation: '"recycle" nghĩa là tái chế rác thải.',
    hints: ['Gợi ý 1: Tái chế.', 'Gợi ý 2: recycle.'],
    difficulty: 'Dễ'
  },

  // ================= UNIT 12: ROBOTS =================
  {
    id: 'q12-v1',
    unitId: 'unit-12',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: 'Smart doctor robots will help nurses ________ heavy medical equipment.',
    options: ['lift', 'cook', 'iron', 'speak'],
    correctAnswer: 'lift',
    explanation: '"lift heavy equipment" nghĩa là nâng / nhấc đồ đạc nặng.',
    hints: ['Gợi ý 1: Nâng/nhấc đồ nặng.', 'Gợi ý 2: lift.'],
    difficulty: 'Dễ'
  }
];

const filePath = 'd:\\đảng viên\\2025\\Viet apps\\Englishtutor 6\\src\\data\\sgkData.ts';
let content = fs.readFileSync(filePath, 'utf8');

const tsItems = vocabQuestions.map((q) => {
  const optsStr = q.options.map((opt) => `'${opt.replace(/'/g, "\\'")}'`).join(',\n      ');
  const hintsStr = q.hints.map((h) => `'${h.replace(/'/g, "\\'")}'`).join(',\n      ');
  return `  {
    id: '${q.id}',
    unitId: '${q.unitId}',
    skill: '${q.skill}',
    type: '${q.type}',
    content: '${q.content.replace(/'/g, "\\'")}',
    options: [
      ${optsStr}
    ],
    correctAnswer: '${q.correctAnswer.replace(/'/g, "\\'")}',
    explanation: '${q.explanation.replace(/'/g, "\\'")}',
    hints: [
      ${hintsStr}
    ],
    difficulty: '${q.difficulty}'
  }`;
});

const insertedTs = ',\n' + tsItems.join(',\n');
const targetRegex = /\r?\n\];\r?\n\r?\nexport const INITIAL_PROGRESS = {/;

if (targetRegex.test(content)) {
  const newContent = content.replace(targetRegex, `${insertedTs}\n];\n\nexport const INITIAL_PROGRESS = {`);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Successfully added ${vocabQuestions.length} Vocabulary questions to sgkData.ts!`);
} else {
  console.error('Target anchor not found in sgkData.ts');
}
