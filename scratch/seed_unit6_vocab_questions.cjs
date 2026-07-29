const fs = require('fs');

const unit6VocabList = JSON.parse(
  fs.readFileSync('d:\\đảng viên\\2025\\Viet apps\\Englishtutor 6\\src\\data\\unit6_vocab.json', 'utf8')
);

// Tạo câu hỏi Vocabulary cho 77 từ vựng Unit 6
const vocabQuestions = unit6VocabList.map((item) => {
  const options = [item.word];
  const others = unit6VocabList.filter((v) => v.word !== item.word).map((v) => v.word);
  
  while (options.length < 4 && others.length > 0) {
    const idx = Math.floor(Math.random() * others.length);
    options.push(others.splice(idx, 1)[0]);
  }
  options.sort(() => 0.5 - Math.random());

  const blankContent = item.example_en.replace(new RegExp(item.word, 'gi'), '________');

  return {
    id: `q-u6-v-${item.id}`,
    unitId: 'unit-6',
    skill: 'Vocabulary',
    type: 'fill-in-blank',
    content: `📌 [UNIT 6: OUR TET HOLIDAY - ${item.part}]\n${blankContent}`,
    options: options,
    correctAnswer: item.word,
    explanation: `Từ "${item.word}" (${item.phonetic}) có nghĩa tiếng Việt là "${item.meaning}". Ví dụ: ${item.example_vi}`,
    hints: [
      `Gợi ý 1: Nghĩa của từ là "${item.meaning}" (${item.type}).`,
      `Gợi ý 2: Phiên âm: ${item.phonetic}.`
    ],
    difficulty: 'Dễ'
  };
});

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
    content: '${q.content.replace(/'/g, "\\'").replace(/\n/g, "\\n")}',
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
  console.log(`Successfully added ${vocabQuestions.length} Unit 6 Vocabulary questions to sgkData.ts!`);
} else {
  console.error('Target anchor not found in sgkData.ts');
}
