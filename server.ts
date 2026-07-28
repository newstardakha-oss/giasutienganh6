import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const DEFAULT_MODELS = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-3.1-pro-preview', 'gemini-2.5-flash'];

/**
 * Get available API keys from env (single key or comma-separated pool)
 */
function getApiKeyPool(): string[] {
  const poolEnv = process.env.GEMINI_API_KEY_POOL || '';
  const singleKey = process.env.GEMINI_API_KEY || '';
  
  const poolKeys = poolEnv
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
    
  if (singleKey && !poolKeys.includes(singleKey)) {
    poolKeys.unshift(singleKey);
  }
  
  return poolKeys;
}

/**
 * Helper to get a GoogleGenAI instance with specific key
 */
function getGenAIClient(apiKey: string) {
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Executes a Gemini request with automatic key pool rotation & model fallback
 */
async function generateWithFallback(
  req: express.Request,
  fn: (ai: GoogleGenAI, modelName: string) => Promise<any>
) {
  const customKey = req.headers['x-custom-gemini-key'] as string | undefined;
  const keyPool = customKey ? [customKey] : getApiKeyPool();

  if (keyPool.length === 0) {
    throw new Error('Chưa cấu hình API Key trên Server. Vui lòng liên hệ Giáo viên hoặc Admin.');
  }

  const requestedModel = (req.body.model as string) || 'gemini-3.6-flash';
  const modelQueue = [
    requestedModel,
    ...DEFAULT_MODELS.filter((m) => m !== requestedModel),
  ];

  let lastError: any = null;

  // Try each API key in the pool
  for (let keyIdx = 0; keyIdx < keyPool.length; keyIdx++) {
    const currentKey = keyPool[keyIdx];
    const ai = getGenAIClient(currentKey);

    // Try model fallback for this key
    for (const modelName of modelQueue) {
      try {
        const result = await fn(ai, modelName);
        return result;
      } catch (err: any) {
        console.warn(`[Key ${keyIdx + 1}/${keyPool.length}] Attempt with model ${modelName} failed:`, err.message || err);
        lastError = err;

        // If 401/403 (Invalid key), stop this key and try next key in pool if available
        if (err.status === 401 || err.status === 403 || (err.message && (err.message.includes('API_KEY') || err.message.includes('UNAUTHENTICATED')))) {
          console.warn(`Key ${keyIdx + 1} invalid, trying next key...`);
          break;
        }

        // If 429 (Resource Exhausted), try next key in pool immediately
        if (err.status === 429 || (err.message && (err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('429')))) {
          console.warn(`Key ${keyIdx + 1} hit quota 429, rotating to next key in pool...`);
          break;
        }
      }
    }
  }

  throw lastError || new Error('Tất cả API Key và Model hiện tại đều bận. Vui lòng thử lại sau.');
}

// ==========================================
// 1. Health Check API
// ==========================================
app.get('/api/health', (req, res) => {
  const pool = getApiKeyPool();
  res.json({
    status: 'ok',
    hasEnvApiKey: pool.length > 0,
    hasServerKey: pool.length > 0,
    keyPoolCount: pool.length,
    availableModels: DEFAULT_MODELS,
  });
});

// ==========================================
// 2. AI Tutor Endpoint (5-Step Socratic Method)
// ==========================================
app.post('/api/gemini/tutor', async (req, res) => {
  try {
    const { prompt, history, unitTitle, targetGrammar, step } = req.body;

    const systemInstruction = `
Bạn là Gia Sư AI Tiếng Anh Lớp 6 thân thiện, tâm lý và kiên nhẫn. 
Đối tượng học sinh: Học sinh lớp 6 tại Việt Nam đang học chương trình GDPT mới (Sách Tiếng Anh 6 Global Success).
Chủ đề / Unit hiện tại: "${unitTitle || 'Tiếng Anh Lớp 6'}".
Điểm ngữ pháp chính: "${targetGrammar || 'Kiến thức SGK lớp 6'}".

QUY TẮC SƯ PHẠM VÀNG (BẮT BUỘC):
1. KHÔNG BAO GIỜ giải bài trực tiếp hay đưa ra đáp án ngay!
2. Áp dụng phương pháp Socratic 5 Bước:
   - Bước 1: Ví dụ (Example) - Đưa ra ví dụ trực quan ngắn gọn.
   - Bước 2: Nhận xét (Observation) - Đặt câu hỏi gợi mở để học sinh tự phát hiện quy luật.
   - Bước 3: Giải thích (Guided Explanation) - Giải thích ngắn gọn bản chất bằng từ ngữ dễ hiểu với lứa tuổi 11-12.
   - Bước 4: Luyện tập (Guided Practice) - Cho câu hỏi nhỏ để em làm thử.
   - Bước 5: Vận dụng (Application) - Khuyến khích áp dụng vào cuộc sống thực tế.
3. Ngôn ngữ: Dùng tiếng Việt làm cầu nối giảng giải, kết hợp các câu tiếng Anh lớp 6 đơn giản.
4. Giọng điệu: Động viên, hào hứng ("Em làm tốt lắm!", "Thử suy nghĩ thêm một chút nhé!", "Thầy/Cô tin em làm được!").
5. Nếu học sinh hỏi đáp án hoặc nhờ giải hộ, hãy trả lời bằng một câu hỏi gợi mở hoặc 1 gợi ý nhỏ (Hint) để học sinh tự tư duy.
`;

    const resultText = await generateWithFallback(req, async (ai, modelName) => {
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          }))
        : [];

      const contents = [
        ...formattedHistory,
        {
          role: 'user',
          parts: [
            {
              text: `[Bước Socratic hiện tại: ${step || 'Tự do'}] Học sinh hỏi: ${prompt}`,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return response.text;
    });

    res.json({ text: resultText });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Lỗi xử lý Tutor API' });
  }
});

// ==========================================
// 3. Homework Hint Assistant
// ==========================================
app.post('/api/gemini/homework-hint', async (req, res) => {
  try {
    const { questionContent, studentAnswer, hintLevel } = req.body;

    const prompt = `
Bạn là Trợ lý Giải Bài Tập Tiếng Anh Lớp 6.
Đề bài: "${questionContent}"
Đáp án học sinh thử trả lời (nếu có): "${studentAnswer || 'Chưa trả lời'}"
Cấp độ gợi ý requested: ${hintLevel || 1} (Level 1: Gợi ý nhỏ từ khóa; Level 2: Gợi ý cấu trúc ngữ pháp; Level 3: Gợi ý cách loại trừ/tìm câu đúng).

Yêu cầu:
- Nếu học sinh đã đưa ra câu trả lời: Nhận xét xem câu đó ĐÚNG hay SAI, chỉ ra chỗ tốt và đưa ra giải thích thân thiện.
- Nếu học sinh xin gợi ý (Hint Level 1, 2, 3): Đưa ra gợi ý tương ứng mà KHÔNG tiết lộ đáp án trực tiếp. Hướng dẫn các bước tư duy logic cho học sinh lớp 6.
Format trả về bằng Markdown sạch đẹp với icon động viên.
`;

    const resultText = await generateWithFallback(req, async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      return response.text;
    });

    res.json({ text: resultText });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Lỗi xử lý Homework Hint API' });
  }
});

// ==========================================
// 4. Writing Grader Endpoint
// ==========================================
app.post('/api/gemini/grade-writing', async (req, res) => {
  try {
    const { essayText, topicPrompt, targetUnit } = req.body;

    const systemInstruction = `
Bạn là Chuyên Gia Chấm Bài Viết Tiếng Anh Lớp 6 (SGK Global Success).
Đề bài: "${topicPrompt}"
Bài làm của học sinh: "${essayText}"

Hãy đánh giá và chấm điểm theo ma trận 4 tiêu chí (Thang điểm 10):
1. Từ vựng & Ngữ pháp (Grammar & Vocab)
2. Cấu trúc & Độ dài (Structure & Word Count ~40-50 từ)
3. Đúng chủ đề (Task Achievement)
4. Sáng tạo & Trình bày (Coherence & Presentation)

BẮT BUỘC TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON SCHEMA NÀY (Không thêm markdown wrapper hay text thừa bên ngoài):
{
  "overallScore": number (từ 0.0 đến 10.0),
  "band": string ("Xuất sắc" | "Giỏi" | "Khá" | "Trung bình" | "Cần cố gắng"),
  "grammarScore": number (0-10),
  "vocabScore": number (0-10),
  "structureScore": number (0-10),
  "wordCount": number,
  "strengths": [string array gồm các điểm khen ngợi],
  "areasForImprovement": [string array gồm các điểm cần cải thiện],
  "detailedCorrections": [
    {
      "original": string (cụm từ/câu lỗi gốc),
      "correction": string (cụm từ/câu sửa đúng),
      "reason": string (giải thích ngắn gọn lý do bằng tiếng Việt dễ hiểu)
    }
  ],
  "suggestedRevision": string (đoạn văn bài mẫu chuẩn mực tiếng Anh lớp 6 nâng cao hơn một chút),
  "pedagogicalAdvice": string (lời khuyên động viên của thầy cô dành cho học sinh)
}
`;

    const jsonResult = await generateWithFallback(req, async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Hãy chấm bài viết sau: ${essayText}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.NUMBER },
              band: { type: Type.STRING },
              grammarScore: { type: Type.NUMBER },
              vocabScore: { type: Type.NUMBER },
              structureScore: { type: Type.NUMBER },
              wordCount: { type: Type.INTEGER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
              detailedCorrections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    correction: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                  required: ['original', 'correction', 'reason'],
                },
              },
              suggestedRevision: { type: Type.STRING },
              pedagogicalAdvice: { type: Type.STRING },
            },
            required: [
              'overallScore',
              'band',
              'grammarScore',
              'vocabScore',
              'structureScore',
              'wordCount',
              'strengths',
              'areasForImprovement',
              'detailedCorrections',
              'suggestedRevision',
              'pedagogicalAdvice',
            ],
          },
        },
      });

      return JSON.parse(response.text || '{}');
    });

    res.json(jsonResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Lỗi chấm bài viết' });
  }
});

// ==========================================
// 5. Speech & Pronunciation Evaluator
// ==========================================
app.post('/api/gemini/evaluate-speech', async (req, res) => {
  try {
    const { recognizedText, targetText, focusPhoneme } = req.body;

    const systemInstruction = `
Bạn là Giảng Viên Ngữ Âm Tiếng Anh Lớp 6 chuyên đánh giá phát âm IPA.
Câu mẫu học sinh cần đọc: "${targetText}"
Văn bản thu âm ghi nhận được từ giọng đọc học sinh: "${recognizedText}"
Âm IPA trọng tâm cần kiểm tra (nếu có): "${focusPhoneme || 'Chuẩn âm Tiếng Anh 6'}"

Hãy so sánh văn bản thu âm với câu mẫu, đánh giá độ chính xác của các âm trọng tâm (như /s/ vs /z/, /b/ vs /p/, /θ/ vs /ð/, /e/ vs /æ/...).

BẮT BUỘC TRẢ VỀ ĐÚNG JSON SCHEMA NÀY:
{
  "score": number (0-100),
  "accuracyGrade": string ("Hoàn hảo" | "Tốt" | "Khá" | "Cần luyện thêm"),
  "phonemesAccuracy": [
    {
      "phoneme": string (ví dụ "/s/"),
      "status": string ("correct" | "needs-work" | "missed"),
      "note": string (nhận xét ngắn)
    }
  ],
  "recognizedText": string,
  "targetText": string,
  "teacherFeedback": string (nhận xét khuyến khích bằng tiếng Việt),
  "tipsToImprove": [string array lời khuyên khẩu hình miệng, bật hơi, lưỡi...]
}
`;

    const jsonResult = await generateWithFallback(req, async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Đánh giá phát âm: Học sinh đọc "${recognizedText}" so với mẫu "${targetText}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              accuracyGrade: { type: Type.STRING },
              phonemesAccuracy: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phoneme: { type: Type.STRING },
                    status: { type: Type.STRING },
                    note: { type: Type.STRING },
                  },
                  required: ['phoneme', 'status', 'note'],
                },
              },
              recognizedText: { type: Type.STRING },
              targetText: { type: Type.STRING },
              teacherFeedback: { type: Type.STRING },
              tipsToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'score',
              'accuracyGrade',
              'phonemesAccuracy',
              'recognizedText',
              'targetText',
              'teacherFeedback',
              'tipsToImprove',
            ],
          },
        },
      });

      return JSON.parse(response.text || '{}');
    });

    res.json(jsonResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Lỗi đánh giá phát âm' });
  }
});

// ==========================================
// 6. Document Upload & Practice Generator
// ==========================================
app.post('/api/gemini/parse-doc', async (req, res) => {
  try {
    const { docText, docTitle } = req.body;

    const systemInstruction = `
Bạn là Chuyên Gia Biên Soạn Giáo Trình Tiếng Anh Lớp 6.
Phân tích nội dung tài liệu do người dùng / giáo viên tải lên: "${docTitle}"
Nội dung tài liệu:
"""
${docText}
"""

Nhiệm vụ:
1. Trích xuất tóm tắt nội dung chính.
2. Rút ra các Từ vựng (Vocabulary) và Cấu trúc ngữ pháp (Grammar) cốt lõi thích hợp cho trình độ lớp 6.
3. Tạo ra 3-5 câu hỏi trắc nghiệm tương tác (Multiple-Choice Questions) bám sát nội dung tài liệu, có giải thích và gợi ý 3 cấp độ.

TRẢ VỀ JSON SCHEMA SAU:
{
  "contentSummary": string,
  "extractedVocab": [string array],
  "extractedGrammar": [string array],
  "generatedQuestions": [
    {
      "id": string,
      "unitId": "custom-doc",
      "skill": "Grammar" | "Vocabulary" | "Reading",
      "type": "multiple-choice",
      "content": string,
      "options": [string array 4 lựa chọn],
      "correctAnswer": string,
      "explanation": string,
      "hints": [string array 3 gợi ý],
      "difficulty": "Dễ" | "Trung bình" | "Nâng cao"
    }
  ]
}
`;

    const jsonResult = await generateWithFallback(req, async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Phân tích tài liệu và tạo bài tập lớp 6 từ văn bản này.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              contentSummary: { type: Type.STRING },
              extractedVocab: { type: Type.ARRAY, items: { type: Type.STRING } },
              extractedGrammar: { type: Type.ARRAY, items: { type: Type.STRING } },
              generatedQuestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    unitId: { type: Type.STRING },
                    skill: { type: Type.STRING },
                    type: { type: Type.STRING },
                    content: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    hints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    difficulty: { type: Type.STRING },
                  },
                  required: [
                    'id',
                    'unitId',
                    'skill',
                    'type',
                    'content',
                    'options',
                    'correctAnswer',
                    'explanation',
                    'hints',
                    'difficulty',
                  ],
                },
              },
            },
            required: [
              'contentSummary',
              'extractedVocab',
              'extractedGrammar',
              'generatedQuestions',
            ],
          },
        },
      });

      return JSON.parse(response.text || '{}');
    });

    res.json(jsonResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Lỗi trích xuất tài liệu' });
  }
});

// Vite Middleware for development vs dist static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gia Su AI Tieng Anh 6 server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
