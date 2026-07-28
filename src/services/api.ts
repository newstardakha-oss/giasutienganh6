import { ChatMessage, WritingFeedback, PronunciationEvaluation, Question } from '../types';

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
 * Calls AI Tutor 5-Step Socratic API
 */
export async function callSocraticTutor(
  prompt: string,
  history: ChatMessage[],
  unitTitle: string,
  targetGrammar: string,
  step?: string
): Promise<string> {
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
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Lỗi server AI (${response.status})`);
  }

  const data = await response.json();
  return data.text || 'Gia sư AI chưa đưa ra câu trả lời.';
}

/**
 * Calls Homework Hint Helper API
 */
export async function fetchHomeworkHint(
  questionContent: string,
  studentAnswer?: string,
  hintLevel: number = 1
): Promise<string> {
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
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Lỗi trợ lý bài tập (${response.status})`);
  }

  const data = await response.json();
  return data.text || 'Chưa nhận được gợi ý.';
}

/**
 * Calls Writing Grader API
 */
export async function gradeWritingEssay(
  essayText: string,
  topicPrompt: string,
  targetUnit?: string
): Promise<WritingFeedback> {
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
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Lỗi chấm bài viết (${response.status})`);
  }

  return await response.json();
}

/**
 * Calls Speech & Pronunciation Evaluator API
 */
export async function evaluateSpeechPronunciation(
  recognizedText: string,
  targetText: string,
  focusPhoneme?: string
): Promise<PronunciationEvaluation> {
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
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Lỗi chấm phát âm (${response.status})`);
  }

  return await response.json();
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
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Lỗi phân tích tài liệu (${response.status})`);
  }

  return await response.json();
}
