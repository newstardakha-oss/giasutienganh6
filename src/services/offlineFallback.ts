import { WritingFeedback, PronunciationEvaluation, Question } from '../types';

export const SAMPLE_ESSAYS: Record<string, { prompt: string; sample: string }> = {
  'unit-1': {
    prompt: 'Write a paragraph of 40-50 words about your school.',
    sample: 'My school is Le Loi Lower Secondary School. It is in a quiet area in my town. The school has 20 classes and about 30 teachers. The teachers are very friendly and helpful. I like my school library best because there are many good books.',
  },
  'unit-2': {
    prompt: 'Write an email to a friend telling him/her about your house.',
    sample: 'Hi Mira, Thanks for your email. Now I will tell you about my house. I live in a town house in Ha Noi. There are six rooms in my house. My favorite room is my bedroom because it is quiet and cozy.',
  },
  'unit-3': {
    prompt: 'Write a diary entry of about 50 words about your best friend.',
    sample: 'Dear Diary, My best friend is Phong. He is tall and has short black hair. He is very clever and hard-working. He always helps me with my homework. I like Phong because he is kind and funny.',
  },
  'unit-4': {
    prompt: 'Write a paragraph of 40-50 words about your neighbourhood.',
    sample: 'I live in a quiet neighbourhood in Da Nang. There are many tall trees and a nice park near my house. In the afternoon, I often play badminton with my friends there. I like my neighbourhood because the people are friendly, but I dislike the dirty streets after the night market.',
  },
  'unit-5': {
    prompt: 'Write a short paragraph introducing a natural wonder in Viet Nam.',
    sample: 'Ha Long Bay is a famous natural wonder in Quang Ninh, Viet Nam. It has thousands of beautiful islands and impressive limestone caves. Visitors can take a boat trip to enjoy the stunning scenery and eat fresh seafood. It is a wonderful place to visit in summer.',
  },
  'unit-6': {
    prompt: 'Write an email to a friend about what children should and shouldn\'t do at Tet.',
    sample: 'Dear Tom, Tet is coming soon! My family cleans and decorates our house with pink peach blossoms. Children should behave well and wish adults good health. They shouldn\'t break things or make a mess. I love getting lucky money in red envelopes!',
  },
  'unit-7': {
    prompt: 'Write a paragraph about your favorite TV programme.',
    sample: 'My favorite TV programme is "Let\'s Learn English" on VTV7. It airs every Saturday at 8 p.m. In this show, viewers learn English through fun games and songs. I like it because it helps me speak English better and makes learning fun.',
  },
  'unit-8': {
    prompt: 'Write a paragraph about a sport or game you like.',
    sample: 'My favorite sport is badminton. I play it with my brother in the yard every afternoon. We need two rackets and a shuttlecock to play. It is easy to play and keeps me fit and healthy. I feel happy whenever I win a match.',
  },
  'unit-9': {
    prompt: 'Write a postcard to a friend about a city you visited.',
    sample: 'Dear Linh, I am having a great time in London! The weather is cool and rainy today. Yesterday, I visited the Big Ben and took photos near the River Thames. The fish and chips here is delicious. See you next week!',
  },
  'unit-10': {
    prompt: 'Write a paragraph about your dream house in the future.',
    sample: 'My dream house will be on an island in the future. It will be a big high-tech villa surrounded by trees. There will be smart TVs and a helper robot to clean the floors and cook meals.',
  },
  'unit-11': {
    prompt: 'Write a paragraph about 3 to 4 tips to make your school or house greener.',
    sample: 'We can do several things to make our school greener. First, we should reuse plastic bottles and old paper. Second, students ought to turn off the lights and fans when leaving the classroom. Finally, we can plant more trees in the school garden.',
  },
  'unit-12': {
    prompt: 'Write a paragraph about a robot you would like to have.',
    sample: 'I would like to have a smart home robot named RoboMax. It will be small and silver with two bright blue eyes. RoboMax can clean the house, wash dishes, and help me with my English homework. It will make my life easier and fun.',
  },
};

/**
 * Offline Rule-Based Essay Evaluator for Grade 6 Writing
 */
export function getOfflineWritingFeedback(
  essayText: string,
  topicPrompt: string,
  targetUnit: string = 'unit-1'
): WritingFeedback {
  const cleanText = essayText.trim();
  const words = cleanText ? cleanText.split(/\s+/) : [];
  const wordCount = words.length;

  // 1. Calculate Structure Score (Target: 40-50 words)
  let structureScore = 8.5;
  if (wordCount >= 40 && wordCount <= 55) {
    structureScore = 9.5;
  } else if (wordCount >= 30 && wordCount < 40) {
    structureScore = 8.0;
  } else if (wordCount >= 20 && wordCount < 30) {
    structureScore = 6.5;
  } else if (wordCount < 20) {
    structureScore = 5.0;
  } else if (wordCount > 65) {
    structureScore = 7.5;
  }

  // 2. Grammar Checks
  const sentences = cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const corrections: { original: string; correction: string; reason: string }[] = [];
  let grammarScore = 8.5;

  // Check capitalization of sentences
  sentences.forEach((sentence) => {
    const trimmed = sentence.trim();
    if (trimmed.length > 0) {
      const firstChar = trimmed.charAt(0);
      if (firstChar !== firstChar.toUpperCase() && /[a-z]/.test(firstChar)) {
        corrections.push({
          original: trimmed.slice(0, 15) + '...',
          correction: firstChar.toUpperCase() + trimmed.slice(1, 15) + '...',
          reason: 'Chữ cái đầu tiên của câu tiếng Anh phải viết hoa.',
        });
        grammarScore -= 0.5;
      }
    }
  });

  // Check for common Grade 6 mistakes
  if (/\bi is\b/i.test(cleanText)) {
    corrections.push({
      original: 'I is',
      correction: 'I am',
      reason: 'Động từ to-be đi với đại từ "I" phải là "am".',
    });
    grammarScore -= 0.5;
  }
  if (/\bhe have\b/i.test(cleanText)) {
    corrections.push({
      original: 'He have',
      correction: 'He has',
      reason: 'Chủ ngữ ngôi thứ 3 số ít "He" đi với "has".',
    });
    grammarScore -= 0.5;
  }
  if (/\bshe have\b/i.test(cleanText)) {
    corrections.push({
      original: 'She have',
      correction: 'She has',
      reason: 'Chủ ngữ ngôi thứ 3 số ít "She" đi với "has".',
    });
    grammarScore -= 0.5;
  }
  if (/\bit have\b/i.test(cleanText)) {
    corrections.push({
      original: 'It have',
      correction: 'It has',
      reason: 'Chủ ngữ ngôi thứ 3 số ít "It" đi với "has".',
    });
    grammarScore -= 0.5;
  }
  if (/\bvery much good\b/i.test(cleanText)) {
    corrections.push({
      original: 'very much good',
      correction: 'very good',
      reason: 'Dùng "very good" thay vì "very much good".',
    });
    grammarScore -= 0.5;
  }

  grammarScore = Math.max(5.0, Math.min(10.0, grammarScore));

  // 3. Vocab Score
  let vocabScore = 8.5;
  if (wordCount >= 35) vocabScore += 0.5;
  if (/\b(because|and|but|so|first|second|finally|very|friendly|beautiful|favorite|famous|smart|clean)\b/i.test(cleanText)) {
    vocabScore += 0.5;
  }
  vocabScore = Math.max(5.0, Math.min(10.0, vocabScore));

  // Overall score formula
  const overallScore = Math.round((grammarScore * 0.4 + vocabScore * 0.3 + structureScore * 0.3) * 10) / 10;

  let band = 'Khá';
  if (overallScore >= 9.0) band = 'Xuất sắc';
  else if (overallScore >= 8.0) band = 'Giỏi';
  else if (overallScore >= 6.5) band = 'Khá';
  else if (overallScore >= 5.0) band = 'Trung bình';
  else band = 'Cần cố gắng';

  // Strengths & Improvements
  const strengths: string[] = [];
  if (wordCount >= 35 && wordCount <= 60) {
    strengths.push(`Đoạn văn đạt độ dài lý tưởng (~${wordCount} từ) theo yêu cầu SGK Tiếng Anh 6.`);
  } else {
    strengths.push(`Bài viết có ý tưởng tốt và bám sát nội dung chủ đề ${targetUnit.toUpperCase()}.`);
  }
  strengths.push('Vốn từ vựng phù hợp với trình độ học sinh lớp 6.');
  strengths.push('Các câu văn diễn đạt rõ ý, có sự liên kết cơ bản.');

  const areasForImprovement: string[] = [];
  if (wordCount < 40) {
    areasForImprovement.push(`Độ dài hiện tại (${wordCount} từ) hơi ngắn. Em nên mở rộng thêm 1-2 câu để đạt 40-50 từ.`);
  } else if (wordCount > 60) {
    areasForImprovement.push(`Độ dài (${wordCount} từ) hơi dài so với yêu cầu 40-50 từ. Em có thể cô đọng lại câu văn.`);
  }
  if (corrections.length > 0) {
    areasForImprovement.push('Chú ý kiểm tra lại hòa hợp chủ ngữ - động từ và quy tắc viết hoa đầu câu.');
  } else {
    areasForImprovement.push('Em có thể sử dụng thêm các từ nối như "First, Second, Finally, Because" để bài viết mượt mà hơn.');
  }

  const promptInfo = SAMPLE_ESSAYS[targetUnit] || SAMPLE_ESSAYS['unit-1'];

  return {
    overallScore,
    band,
    grammarScore: Math.round(grammarScore * 10) / 10,
    vocabScore: Math.round(vocabScore * 10) / 10,
    structureScore: Math.round(structureScore * 10) / 10,
    wordCount,
    strengths,
    areasForImprovement,
    detailedCorrections: corrections,
    suggestedRevision: promptInfo.sample,
    pedagogicalAdvice: `Em đã hoàn thành bài viết rất cố gắng! Hãy tiếp tục rèn luyện vốn từ và cấu trúc ngữ pháp SGK Lớp 6 mỗi ngày để viết hay hơn nhé.`,
  };
}

/**
 * Offline Socratic Tutor Fallback Response
 */
export function getOfflineTutorResponse(prompt: string, unitTitle: string): string {
  return `🤖 **Gia Sư AI Tiếng Anh Lớp 6 (${unitTitle || 'SGK Global Success'}):**\n\nChào em! Thầy/cô rất vui vì em đã tự giác đặt câu hỏi: "${prompt}".\n\n💡 **Gợi ý tư duy Socratic (Bước 1 & 2):**\n- Trong bài **${unitTitle || 'Tiếng Anh 6'}**, chúng ta thường chú ý đến cấu trúc ngữ pháp chính và từ vựng chỉ hoạt động/miêu tả.\n- Em hãy thử đọc lại ví dụ mẫu trong sách giáo khoa, sau đó xác định chủ ngữ và động từ chính nhé!\n\n👉 **Bài tập luyện nhanh cho em:** Em thử hoàn thành câu sau xem nhé:\n*"They ________ (play) sports in the school yard every afternoon."*\n\nEm nghĩ từ trong ngoặc chia như thế nào? Thử trả lời cho thầy/cô biết nhé!`;
}

/**
 * Offline Homework Hint Fallback Response
 */
export function getOfflineHomeworkHint(questionContent: string, hintLevel: number = 1): string {
  if (hintLevel === 1) {
    return `💡 **Gợi Ý Cấp Độ 1 (Từ Khóa Trọng Tâm):**\n- Hãy chú ý đến từ chìa khóa trong đề bài: "${questionContent.slice(0, 40)}...".\n- Xác định xem đây là câu hỏi về **Từ vựng (Vocabulary)** hay **Ngữ pháp (Grammar)** SGK Lớp 6.`;
  } else if (hintLevel === 2) {
    return `💡 **Gợi Ý Cấp Độ 2 (Cấu Trúc Ngữ Pháp):**\n- Kiểm tra thì của câu (Thì Hiện tại đơn, Hiện tại tiếp diễn, Quá khứ đơn, hay Tương lai đơn với *will*).\n- Quan sát chủ ngữ số ít hay số nhiều để chọn đáp án hòa hợp nhất.`;
  } else {
    return `💡 **Gợi Ý Cấp Độ 3 (Phương Pháp Loại Trừ):**\n- Loại bỏ 2 phương án sai rõ rệt không đúng loại từ hoặc thì.\n- Phân tích nghĩa câu dịch sang tiếng Việt để chọn ra đáp án chính xác nhất!`;
  }
}

/**
 * Offline Speech Pronunciation Fallback Evaluation
 */
export function getOfflineSpeechEvaluation(recognizedText: string, targetText: string): PronunciationEvaluation {
  const cleanTarget = targetText.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const cleanRec = recognizedText.toLowerCase().replace(/[^a-z0-9\s]/g, '');

  const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
  const recWords = cleanRec.split(/\s+/).filter(Boolean);

  let matchCount = 0;
  targetWords.forEach((w) => {
    if (recWords.includes(w)) matchCount++;
  });

  const accuracyRatio = targetWords.length > 0 ? matchCount / targetWords.length : 1;
  const score = Math.round(Math.max(60, Math.min(100, accuracyRatio * 100)));

  let accuracyGrade = 'Tốt';
  if (score >= 90) accuracyGrade = 'Hoàn hảo';
  else if (score >= 75) accuracyGrade = 'Tốt';
  else if (score >= 60) accuracyGrade = 'Khá';
  else accuracyGrade = 'Cần luyện thêm';

  return {
    score,
    accuracyGrade,
    phonemesAccuracy: [
      { phoneme: '/s/', status: 'correct', note: 'Phát âm rõ ràng âm đuôi' },
      { phoneme: '/v/', status: 'correct', note: 'Khẩu hình vòm môi chuẩn' },
      { phoneme: '/θ/', status: 'needs-work', note: 'Chú ý đặt đầu lưỡi giữa 2 răng' },
    ],
    recognizedText: recognizedText || targetText,
    targetText,
    teacherFeedback: `Em đọc rất tự tin! Âm lượng và nhịp điệu phát âm khá chuẩn chuẩn SGK Tiếng Anh 6.`,
    tipsToImprove: [
      'Luyện tập phát âm rõ các âm gió s/z ở cuối từ.',
      'Nghe thêm file audio mẫu trong SGK và nhấn đúng trọng âm câu.',
    ],
  };
}
