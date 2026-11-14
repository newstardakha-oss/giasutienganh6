import { WritingFeedback, PronunciationEvaluation, Question } from '../types';
import { getUnitWritingData } from '../data/gs6Writing';

export const SAMPLE_ESSAYS: Record<string, { prompt: string; sample: string }> = Object.fromEntries(
  Array.from({ length: 12 }, (_, idx) => {
    const unitNum = idx + 1;
    const unitData = getUnitWritingData(unitNum);
    return [
      `unit-${unitNum}`,
      {
        prompt: unitData.practice.prompt,
        sample: unitData.sample_paragraphs[0].paragraphs.join(' '),
      },
    ];
  })
);

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

  let band: WritingFeedback['band'] = 'Khá';
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
    isOfflineFallback: true,
    gradingModeLabel: 'Chấm tự động cơ bản (chưa có AI)',
  };
}

/**
 * Offline Socratic Tutor Fallback Response
 */
export function getOfflineTutorResponse(prompt: string, unitTitle: string): string {
  return `⚙️ **[Chấm tự động cơ bản (chưa có AI)] — Gia Sư Tiếng Anh Lớp 6 (${unitTitle || 'SGK Global Success'}):**\n\nChào em! Thầy/cô rất vui vì em đã tự giác đặt câu hỏi: "${prompt}".\n\n💡 **Gợi ý tư duy Socratic (Bước 1 & 2):**\n- Trong bài **${unitTitle || 'Tiếng Anh 6'}**, chúng ta thường chú ý đến cấu trúc ngữ pháp chính và từ vựng chỉ hoạt động/miêu tả.\n- Em hãy thử đọc lại ví dụ mẫu trong sách giáo khoa, sau đó xác định chủ ngữ và động từ chính nhé!\n\n👉 **Bài tập luyện nhanh cho em:** Em thử hoàn thành câu sau xem nhé:\n*"They ________ (play) sports in the school yard every afternoon."*\n\nEm nghĩ từ trong ngoặc chia như thế nào? Thử trả lời cho thầy/cô biết nhé!`;
}

/**
 * Offline Homework Hint Fallback Response
 */
export function getOfflineHomeworkHint(questionContent: string, hintLevel: number = 1): string {
  const modeTag = `*(Chấm tự động cơ bản (chưa có AI))*\n\n`;
  if (hintLevel === 1) {
    return `${modeTag}💡 **Gợi Ý Cấp Độ 1 (Từ Khóa Trọng Tâm):**\n- Hãy chú ý đến từ chìa khóa trong đề bài: "${questionContent.slice(0, 40)}...".\n- Xác định xem đây là câu hỏi về **Từ vựng (Vocabulary)** hay **Ngữ pháp (Grammar)** SGK Lớp 6.`;
  } else if (hintLevel === 2) {
    return `${modeTag}💡 **Gợi Ý Cấp Độ 2 (Cấu Trúc Ngữ Pháp):**\n- Kiểm tra thì của câu (Thì Hiện tại đơn, Hiện tại tiếp diễn, Quá khứ đơn, hay Tương lai đơn với *will*).\n- Quan sát chủ ngữ số ít hay số nhiều để chọn đáp án hòa hợp nhất.`;
  } else {
    return `${modeTag}💡 **Gợi Ý Cấp Độ 3 (Phương Pháp Loại Trừ):**\n- Loại bỏ 2 phương án sai rõ rệt không đúng loại từ hoặc thì.\n- Phân tích nghĩa câu dịch sang tiếng Việt để chọn ra đáp án chính xác nhất!`;
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

  let accuracyGrade: PronunciationEvaluation['accuracyGrade'] = 'Tốt';
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
    teacherFeedback: `Em đọc rất tự tin! Âm lượng và nhịp điệu phát âm khá chuẩn SGK Tiếng Anh 6.`,
    tipsToImprove: [
      'Luyện tập phát âm rõ các âm gió s/z ở cuối từ.',
      'Nghe thêm file audio mẫu trong SGK và nhấn đúng trọng âm câu.',
    ],
    isOfflineFallback: true,
    gradingModeLabel: 'Chấm tự động cơ bản (chưa có AI)',
  };
}
