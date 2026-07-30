import React, { useState, useRef } from 'react';
import {
  FileEdit,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Send,
  HelpCircle,
  Copy,
  Check,
  Camera,
  Mic,
  MicOff,
  Download,
  PlusCircle,
  FileText,
  Volume2,
  Eye
} from 'lucide-react';
import { WritingFeedback, SgkUnit, StudySession } from '../types';
import { gradeWritingEssay, scanHandwrittenEssay } from '../services/api';
import { exportWritingFeedbackToDocx } from '../services/docxExport';

interface WritingGraderProps {
  units: SgkUnit[];
  onSessionCompleted?: (session: StudySession) => void;
  currentStudentName?: string;
}

export const WritingGrader: React.FC<WritingGraderProps> = ({
  units,
  onSessionCompleted,
  currentStudentName = 'Học Sinh Lớp 6',
}) => {
  const writingPrompts = [
    {
      unitId: 'unit-1',
      title: 'Unit 1: Viết đoạn văn tả trường học của em (40-50 từ)',
      prompt: 'Write a paragraph of 40-50 words about your school. (Name of school, location, number of classes/teachers, what you like best).',
      sampleEssay: 'My school is Le Loi Lower Secondary School. It is in a quiet area in my town. The school has 20 classes and about 30 teachers. The teachers are very friendly and helpful. I like my school library best because there are many good books.',
    },
    {
      unitId: 'unit-2',
      title: 'Unit 2: Viết email tả ngôi nhà cho bạn thân (40-50 từ)',
      prompt: 'Write an email to a friend telling him/her about your house. (Type of house, location, number of rooms, your favorite room).',
      sampleEssay: 'Hi Mira, Thanks for your email. Now I will tell you about my house. I live in a town house in Ha Noi. There are six rooms in my house. My favorite room is my bedroom because it is quiet and cozy.',
    },
    {
      unitId: 'unit-3',
      title: 'Unit 3: Viết nhật ký về người bạn thân nhất (40-50 từ)',
      prompt: 'Write a diary entry of about 50 words about your best friend. (Name, appearance, personality, why you like him/her).',
      sampleEssay: 'Dear Diary, My best friend is Phong. He is tall and has short black hair. He is very clever and hard-working. He always helps me with my homework. I like Phong because he is kind and funny.',
    },
    {
      unitId: 'unit-4',
      title: 'Unit 4: Viết đoạn văn tả khu phố / nơi em sống (40-50 từ)',
      prompt: 'Write a paragraph of 40-50 words about your neighbourhood. (Location, special features, what you like and dislike about it).',
      sampleEssay: 'I live in a quiet neighbourhood in Da Nang. There are many tall trees and a nice park near my house. In the afternoon, I often play badminton with my friends there. I like my neighbourhood because the people are friendly, but I dislike the dirty streets after the night market.',
    },
    {
      unitId: 'unit-5',
      title: 'Unit 5: Viết đoạn văn giới thiệu kỳ quan thiên nhiên (40-50 từ)',
      prompt: 'Write a short paragraph of 40-50 words introducing a natural wonder in Viet Nam (e.g., Ha Long Bay, Phong Nha Cave, Fansipan).',
      sampleEssay: 'Ha Long Bay is a famous natural wonder in Quang Ninh, Viet Nam. It has thousands of beautiful islands and impressive limestone caves. Visitors can take a boat trip to enjoy the stunning scenery and eat fresh seafood. It is a wonderful place to visit in summer.',
    },
    {
      unitId: 'unit-6',
      title: 'Unit 6: Viết email tả chuẩn bị cho ngày Tết của gia đình (40-50 từ)',
      prompt: 'Write an email to a friend about what children should and shouldn\'t do at Tet, or how your family prepares for Tet.',
      sampleEssay: 'Dear Tom, Tet is coming soon! My family cleans and decorates our house with pink peach blossoms. Children should behave well and wish adults good health. They shouldn\'t break things or make a mess. I love getting lucky money in red envelopes!',
    },
    {
      unitId: 'unit-7',
      title: 'Unit 7: Viết đoạn văn tả chương trình TV yêu thích (40-50 từ)',
      prompt: 'Write a paragraph about your favorite TV programme. (Name of show, channel, time, content, why you like it).',
      sampleEssay: 'My favorite TV programme is "Let\'s Learn English" on VTV7. It airs every Saturday at 8 p.m. In this show, viewers learn English through fun games and songs. I like it because it helps me speak English better and makes learning fun.',
    },
    {
      unitId: 'unit-8',
      title: 'Unit 8: Viết đoạn văn về môn thể thao em yêu thích (40-50 từ)',
      prompt: 'Write a paragraph about a sport or game you like. (Name of sport, number of players, equipment needed, rules, why you enjoy it).',
      sampleEssay: 'My favorite sport is badminton. I play it with my brother in the yard every afternoon. We need two rackets and a shuttlecock to play. It is easy to play and keeps me fit and healthy. I feel happy whenever I win a match.',
    },
    {
      unitId: 'unit-9',
      title: 'Unit 9: Viết bưu thiếp gửi bạn về thành phố em đã ghé thăm (40-50 từ)',
      prompt: 'Write a postcard to a friend about a city you visited. (Location, weather, famous sights, local food, your feeling).',
      sampleEssay: 'Dear Linh, I am having a great time in London! The weather is cool and rainy today. Yesterday, I visited the Big Ben and took photos near the River Thames. The fish and chips here is delicious. See you next week!',
    },
    {
      unitId: 'unit-10',
      title: 'Unit 10: Viết đoạn văn tả ngôi nhà tương lai (40-50 từ)',
      prompt: 'Write a paragraph about your dream house in the future. (Location, type, smart appliances, helper robots).',
      sampleEssay: 'My dream house will be on an island in the future. It will be a big high-tech villa surrounded by trees. There will be smart TVs and a helper robot to clean the floors and cook meals.',
    },
    {
      unitId: 'unit-11',
      title: 'Unit 11: Viết đoạn văn đề xuất các cách giúp môi trường xanh hơn (40-50 từ)',
      prompt: 'Write a paragraph about 3 to 4 tips to make your school or house greener (Reduce, Reuse, Recycle).',
      sampleEssay: 'We can do several things to make our school greener. First, we should reuse plastic bottles and old paper. Second, students ought to turn off the lights and fans when leaving the classroom. Finally, we can plant more trees in the school garden.',
    },
    {
      unitId: 'unit-12',
      title: 'Unit 12: Viết đoạn văn tả con rô-bốt mơ ước của em (40-50 từ)',
      prompt: 'Write a paragraph about a robot you would like to have. (Name, appearance, functions, what it can do for you).',
      sampleEssay: 'I would like to have a smart home robot named RoboMax. It will be small and silver with two bright blue eyes. RoboMax can clean the house, wash dishes, and help me with my English homework. It will make my life easier and fun.',
    },
  ];

  const [promptMode, setPromptMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPrompt, setSelectedPrompt] = useState(writingPrompts[0]);
  const [customTitle, setCustomTitle] = useState('');
  const [customPromptText, setCustomPromptText] = useState('');

  const [essayText, setEssayText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  const currentActivePromptText =
    promptMode === 'preset'
      ? selectedPrompt.prompt
      : customPromptText || 'Hãy viết một đoạn văn ngắn khoảng 40-50 từ bằng Tiếng Anh.';

  const currentActiveTitle =
    promptMode === 'preset'
      ? selectedPrompt.title
      : customTitle || 'Đề bài tùy chỉnh của em';

  const handleGrade = async () => {
    if (!essayText.trim() || isGrading) return;
    setIsGrading(true);

    try {
      const res = await gradeWritingEssay(
        essayText,
        currentActivePromptText,
        promptMode === 'preset' ? selectedPrompt.unitId : 'custom-writing'
      );
      setFeedback(res);

      // Record study session & XP if callback provided
      if (onSessionCompleted) {
        const xp = Math.round(res.overallScore * 10);
        const session: StudySession = {
          id: `writing-${Date.now()}`,
          unitId: promptMode === 'preset' ? selectedPrompt.unitId : 'custom-writing',
          unitTitle: `Bài Viết: ${currentActiveTitle}`,
          skill: 'Writing',
          score: Math.round(res.overallScore * 10),
          totalQuestions: 1,
          correctAnswers: res.overallScore >= 7 ? 1 : 0,
          timeSpentSeconds: Math.max(120, wordCount * 3),
          date: new Date().toISOString(),
          xpEarned: xp,
        };
        onSessionCompleted(session);
      }
    } catch (err: any) {
      alert(`Lỗi chấm bài viết: ${err.message || 'Thử lại sau'}`);
    } finally {
      setIsGrading(false);
    }
  };

  const handleCopyModel = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // OCR Scan handwritten essay image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Vui lòng chọn ảnh nhỏ hơn 8MB!');
      return;
    }

    setIsScanningOcr(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const scannedText = await scanHandwrittenEssay(base64, file.type);
          if (scannedText) {
            setEssayText(scannedText.trim());
          } else {
            alert('Không tìm thấy văn bản chữ viết tay trong ảnh. Hãy thử ảnh rõ nét hơn!');
          }
        } catch (err: any) {
          alert(`Lỗi quét ảnh chữ viết tay: ${err.message || 'Vui lòng kiểm tra lại ảnh'}`);
        } finally {
          setIsScanningOcr(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsScanningOcr(false);
    }
  };

  // Speech Recognition dictation
  const handleToggleDictation = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của em không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome!');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setEssayText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.start();
    } catch (err) {
      setIsRecording(false);
    }
  };

  // Export to DOCX
  const handleExportDocx = async () => {
    if (!feedback) return;
    try {
      await exportWritingFeedbackToDocx(
        currentStudentName,
        currentActiveTitle,
        currentActivePromptText,
        essayText,
        feedback
      );
    } catch (err: any) {
      alert(`Lỗi xuất file DOCX: ${err.message || 'Thử lại sau'}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <FileEdit className="w-4 h-4 text-[#FF9500]" />
            Đánh Giá & Chấm Điểm Bài Viết AI Đa Cấp Độ (SGK Tiếng Anh 6)
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Chấm Bài Văn Tiếng Anh Lớp 6 Chi Tiết</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Chấm theo ma trận SGK • Quét ảnh bài viết tay trong vở • Tự chọn đề cô giáo giao • Xuất file Word báo cáo.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {feedback && (
            <button
              onClick={handleExportDocx}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải File Báo Cáo DOCX</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt Selection & Writing Area */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-4">
            {/* Toggle Mode: SGK Units vs Custom Prompt */}
            <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setPromptMode('preset');
                  setFeedback(null);
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  promptMode === 'preset'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                📚 Chọn Đề SGK (Unit 1-12)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPromptMode('custom');
                  setFeedback(null);
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  promptMode === 'custom'
                    ? 'bg-white text-[#4A90E2] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ✏️ Đề Tự Chọn / Cô Giáo Giao
              </button>
            </div>

            {/* Mode 1: SGK Unit Picker */}
            {promptMode === 'preset' && (
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  1. Chọn Đề Bài Viết SGK Tiếng Anh 6:
                </label>
                <select
                  value={selectedPrompt.unitId}
                  onChange={(e) => {
                    const p = writingPrompts.find((x) => x.unitId === e.target.value);
                    if (p) {
                      setSelectedPrompt(p);
                      setFeedback(null);
                    }
                  }}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                >
                  {writingPrompts.map((p) => (
                    <option key={p.unitId} value={p.unitId}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Mode 2: Custom Prompt Inputs */}
            {promptMode === 'custom' && (
              <div className="space-y-3 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tiêu Đề / Chủ Đề Bài Viết:
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Ví dụ: Unit 3 Extra - Viết về người thân trong gia đình..."
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nội dung Đề bài Yêu cầu (Tiếng Anh hoặc Tiếng Việt):
                  </label>
                  <textarea
                    rows={2}
                    value={customPromptText}
                    onChange={(e) => setCustomPromptText(e.target.value)}
                    placeholder="Write a paragraph about your family members (parents, brothers, sisters)..."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Prompt Detail Box */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[#FF9500]">
                <BookOpen className="w-4 h-4" /> Đề Bài Yêu Cầu:
              </span>
              <p className="leading-relaxed font-medium">{currentActivePromptText}</p>
            </div>

            {/* Editor Input Toolbar & Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="font-bold text-slate-700">
                  Bài Làm Của Học Sinh:
                </span>

                <div className="flex items-center gap-2">
                  {/* OCR Upload Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isScanningOcr}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] border border-indigo-200 inline-flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isScanningOcr ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Camera className="w-3.5 h-3.5" />
                    )}
                    <span>{isScanningOcr ? 'Đang quét ảnh...' : 'Quét Ảnh Viết Tay'}</span>
                  </button>

                  {/* Speech Dictation Button */}
                  <button
                    type="button"
                    onClick={handleToggleDictation}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border inline-flex items-center gap-1 transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isRecording ? 'Đang Thu Giọng...' : 'Đọc Cho AI Chép'}</span>
                  </button>

                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full ${
                      wordCount >= 35 && wordCount <= 60
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {wordCount} từ (Mục tiêu: 40-50 từ)
                  </span>
                </div>
              </div>

              <textarea
                id="student-essay-textarea"
                rows={8}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Nhập bài viết tiếng Anh của em vào đây (hoặc chọn Quét Ảnh Viết Tay trong vở)..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none transition-all leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                {promptMode === 'preset' ? (
                  <button
                    type="button"
                    onClick={() => setEssayText(selectedPrompt.sampleEssay)}
                    className="text-xs text-[#4A90E2] font-semibold hover:underline"
                  >
                    Điền bài viết mẫu SGK
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">Tự do sáng tạo đoạn văn</span>
                )}

                <button
                  id="grade-essay-btn"
                  onClick={handleGrade}
                  disabled={isGrading || !essayText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs disabled:opacity-50 inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isGrading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{isGrading ? 'AI Đang Chấm Bài...' : 'Chấm Điểm Ngay'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Feedback Matrix */}
        <div className="lg:col-span-6 space-y-4">
          {feedback ? (
            <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-5 animate-in fade-in duration-200">
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Kết Quả Đánh Giá Tổng Thể
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-[#4A90E2]">
                      {feedback.overallScore}/10
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#4A90E2] font-bold text-xs border border-blue-200">
                      {feedback.band}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">Ngữ Pháp</span>
                    <span className="font-bold text-slate-800">
                      {feedback.grammarScore}/10
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">Từ Vựng</span>
                    <span className="font-bold text-slate-800">
                      {feedback.vocabScore}/10
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">Cấu Trúc</span>
                    <span className="font-bold text-slate-800">
                      {feedback.structureScore}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Strengths & Areas for Improvement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Điểm Sáng Bài Làm:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-emerald-900 text-[11px]">
                    {feedback.strengths?.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-[#FF9500]" /> Cần Cải Thiện:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-900 text-[11px]">
                    {feedback.areasForImprovement?.map((ar, i) => (
                      <li key={i}>{ar}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed Corrections */}
              {feedback.detailedCorrections?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Chi Tiết Lỗi & Cách Sửa Sư Phạm:
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {feedback.detailedCorrections.map((cor, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="line-through text-rose-500 font-semibold">{cor.original}</span>
                          <span className="text-slate-400">➔</span>
                          <span className="text-emerald-600 font-bold">
                            {cor.correction}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{cor.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Model Revision */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#4A90E2]" /> Đoạn Văn Mẫu Gợi Ý Từ AI:
                  </span>
                  <button
                    onClick={() => handleCopyModel(feedback.suggestedRevision)}
                    className="text-[11px] text-[#4A90E2] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
                <p className="text-slate-800 leading-relaxed italic">
                  "{feedback.suggestedRevision}"
                </p>
              </div>

              {/* Pedagogical Advice */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium flex items-start gap-2">
                <span className="text-lg">💬</span>
                <div>
                  <span className="font-bold text-[#4A90E2]">Lời khuyên của thầy cô:</span>
                  <p className="mt-0.5 text-slate-700 leading-relaxed">{feedback.pedagogicalAdvice}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 shadow-2xs border border-slate-200 text-center space-y-3 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#4A90E2] flex items-center justify-center">
                <FileEdit className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Sẵn Sàng Chấm Bài Viết
              </h3>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Hãy chọn hoặc nhập đề bài bên trái, gõ bài làm hoặc bấm <strong>"Quét Ảnh Viết Tay"</strong> để nhận phân tích chi tiết.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
