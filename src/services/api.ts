import { ChatMessage, WritingFeedback, PronunciationEvaluation, Question } from '../types';
import {
  getOfflineWritingFeedback,
  getOfflineTutorResponse,
  getOfflineHomeworkHint,
  getOfflineSpeechEvaluation,
} from './offlineFallback';

/**
 * Gets custom API Key from localStorage if user set it in Settings
 */
function getCustomApiKey(): string | null {
  return localStorage.getItem('gemini_api_key') || null;
}

/**
 * Gets custom AI Model choice from localStorage if set
 */
function getSelectedModel(): string {
  return localStorage.getItem('gemini_selected_model') || 'gemini-3.6-flash';
}

/**
 * Common headers with optional custom API Key
 */
function getHeaders() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const customKey = getCustomApiKey();
  if (customKey) {
    headers['x-custom-gemini-key'] = customKey;
  }
  return headers;
}

/**
 * Calls AI Tutor 5-Step Socratic API with graceful offline fallback
 */
export async function callSocraticTutor(
  prompt: string,
  history: ChatMessage[],
  unitTitle: string,
  targetGrammar: string,
  step?: string
): Promise<string> {
  try {
    const model = getSelectedModel();
    const response = await fetch('/api/gemini/tutor', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        prompt,
        history,
        unitTitle,
        targetGrammar,
        step,
        model,
      }),
    });

    if (!response.ok) {
      console.warn(`AI Tutor API returned status ${response.status}. Using smart offline response...`);
      return getOfflineTutorResponse(prompt, unitTitle);
    }

    const data = await response.json();
    return data.text || getOfflineTutorResponse(prompt, unitTitle);
  } catch (err) {
    console.warn('Network or server error during callSocraticTutor. Using offline fallback:', err);
    return getOfflineTutorResponse(prompt, unitTitle);
  }
}

/**
 * Calls Homework Hint Helper API with graceful offline fallback
 */
export async function fetchHomeworkHint(
  questionContent: string,
  studentAnswer?: string,
  hintLevel: number = 1
): Promise<string> {
  try {
    const model = getSelectedModel();
    const response = await fetch('/api/gemini/homework-hint', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        questionContent,
        studentAnswer,
        hintLevel,
        model,
      }),
    });

    if (!response.ok) {
      console.warn(`Homework Hint API returned status ${response.status}. Using offline hint fallback...`);
      return getOfflineHomeworkHint(questionContent, hintLevel);
    }

    const data = await response.json();
    return data.text || getOfflineHomeworkHint(questionContent, hintLevel);
  } catch (err) {
    console.warn('Network or server error during fetchHomeworkHint. Using offline fallback:', err);
    return getOfflineHomeworkHint(questionContent, hintLevel);
  }
}

/**
 * Calls Writing Grader API with graceful offline fallback
 */
export async function gradeWritingEssay(
  essayText: string,
  topicPrompt: string,
  targetUnit?: string
): Promise<WritingFeedback> {
  try {
    const model = getSelectedModel();
    const response = await fetch('/api/gemini/grade-writing', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        essayText,
        topicPrompt,
        targetUnit,
        model,
      }),
    });

    if (!response.ok) {
      console.warn(`Writing Grader API returned status ${response.status}. Using smart offline grading engine...`);
      return getOfflineWritingFeedback(essayText, topicPrompt, targetUnit);
    }

    const data = await response.json();
    if (data && typeof data.overallScore === 'number') {
      return data;
    }
    return getOfflineWritingFeedback(essayText, topicPrompt, targetUnit);
  } catch (err) {
    console.warn('Network or server error during gradeWritingEssay. Using smart offline grading engine:', err);
    return getOfflineWritingFeedback(essayText, topicPrompt, targetUnit);
  }
}

/**
 * Calls Speech & Pronunciation Evaluator API with graceful offline fallback
 */
export async function evaluateSpeechPronunciation(
  recognizedText: string,
  targetText: string,
  focusPhoneme?: string
): Promise<PronunciationEvaluation> {
  try {
    const model = getSelectedModel();
    const response = await fetch('/api/gemini/evaluate-speech', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        recognizedText,
        targetText,
        focusPhoneme,
        model,
      }),
    });

    if (!response.ok) {
      console.warn(`Evaluate Speech API returned status ${response.status}. Using offline evaluation...`);
      return getOfflineSpeechEvaluation(recognizedText, targetText);
    }

    const data = await response.json();
    if (data && typeof data.score === 'number') {
      return data;
    }
    return getOfflineSpeechEvaluation(recognizedText, targetText);
  } catch (err) {
    console.warn('Network or server error during evaluateSpeechPronunciation. Using offline fallback:', err);
    return getOfflineSpeechEvaluation(recognizedText, targetText);
  }
}

/**
 * Calls Custom Document Parser API
 */
export async function parseUploadedDocument(
  docText: string,
  docTitle: string
): Promise<{
  contentSummary: string;
  extractedVocab: string[];
  extractedGrammar: string[];
  generatedQuestions: Question[];
}> {
  try {
    const model = getSelectedModel();
    const response = await fetch('/api/gemini/parse-doc', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        docText,
        docTitle,
        model,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server API status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('Fallback document parser:', err);
    // Simple local document extraction fallback
    const words = docText.split(/\s+/).filter((w) => w.length > 5);
    const vocabList = Array.from(new Set(words)).slice(0, 5);

    return {
      contentSummary: `Tài liệu "${docTitle}" gồm ${docText.length} ký tự với các kiến thức từ vựng và ngữ pháp trọng tâm Tiếng Anh Lớp 6.`,
      extractedVocab: vocabList.length > 0 ? vocabList : ['school', 'student', 'teacher', 'practice'],
      extractedGrammar: ['Present Simple Tense', 'Imperatives & Requests', 'Adjectives of Description'],
      generatedQuestions: [
        {
          id: `q-doc-1`,
          unitId: 'custom-doc',
          skill: 'Reading',
          type: 'multiple-choice',
          content: `Đọc tài liệu "${docTitle}" và chọn khẳng định đúng nhất:`,
          options: [
            'Tài liệu cung cấp kiến thức thực hành Tiếng Anh 6.',
            'Tài liệu không liên quan đến bài học.',
            'Tài liệu chỉ có bài hát.',
            'Tài liệu dành cho học sinh đại học.',
          ],
          correctAnswer: 'Tài liệu cung cấp kiến thức thực hành Tiếng Anh 6.',
          explanation: 'Nội dung tài liệu đã được trích xuất và tối ưu cho học sinh lớp 6.',
          hints: ['Xem lại tóm tắt nội dung tài liệu ở trên.'],
          difficulty: 'Dễ',
        },
      ],
    };
  }
}
