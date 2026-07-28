import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { WritingFeedback, SgkUnit } from '../types';
import { gradeWritingEssay } from '../services/api';

interface WritingGraderProps {
  units: SgkUnit[];
}

export const WritingGrader: React.FC<WritingGraderProps> = ({ units }) => {
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

  const [selectedPrompt, setSelectedPrompt] = useState(writingPrompts[0]);
  const [essayText, setEssayText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  const handleGrade = async () => {
    if (!essayText.trim() || isGrading) return;
    setIsGrading(true);

    try {
      const res = await gradeWritingEssay(
        essayText,
        selectedPrompt.prompt,
        selectedPrompt.unitId
      );
      setFeedback(res);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <FileEdit className="w-4 h-4 text-[#FF9500]" />
            Đánh Giá & Chấm Điểm Bài Viết AI Đa Cấp Độ
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Chấm Bài Văn Tiếng Anh Lớp 6 Nhận Xét Chi Tiết</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Chấm theo ma trận SGK: Từ vựng, Ngữ pháp, Độ dài (~40-50 từ), Chỉ ra lỗi sai và bài mẫu chuẩn nâng cao.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt Picker & Writing Editor */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-4">
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
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
              >
                {writingPrompts.map((p) => (
                  <option key={p.unitId} value={p.unitId}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Card */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[#FF9500]">
                <BookOpen className="w-4 h-4" /> Đề Bài Yêu Cầu:
              </span>
              <p className="leading-relaxed font-medium">{selectedPrompt.prompt}</p>
            </div>

            {/* Editor Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  Bài Làm Của Học Sinh:
                </span>
                <span
                  className={`font-semibold px-2.5 py-0.5 rounded-full ${
                    wordCount >= 35 && wordCount <= 60
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {wordCount} từ (Mục tiêu: 40-50 từ)
                </span>
              </div>

              <textarea
                id="student-essay-textarea"
                rows={7}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Nhập bài viết tiếng Anh của em vào đây..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none transition-all leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setEssayText(selectedPrompt.sampleEssay)}
                  className="text-xs text-[#4A90E2] font-semibold hover:underline"
                >
                  Điền bài viết mẫu
                </button>

                <button
                  id="grade-essay-btn"
                  onClick={handleGrade}
                  disabled={isGrading || !essayText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs disabled:opacity-50 inline-flex items-center gap-2 transition-all"
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
                    className="text-[11px] text-[#4A90E2] hover:underline flex items-center gap-1 font-semibold"
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
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium">
                💬 <span className="font-bold text-[#4A90E2]">Lời khuyên của thầy cô:</span> {feedback.pedagogicalAdvice}
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
              <p className="text-xs text-slate-500 max-w-sm">
                Hãy chọn một đề bài bên trái, nhập bài làm của em và bấm "Chấm Điểm Ngay" để nhận phân tích chi tiết.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
