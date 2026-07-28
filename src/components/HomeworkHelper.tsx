import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Send,
  Upload,
  BookOpen,
  ArrowRight,
  RefreshCw,
  FileText
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Question, SgkUnit } from '../types';
import { fetchHomeworkHint } from '../services/api';

interface HomeworkHelperProps {
  questions: Question[];
  units: SgkUnit[];
}

export const HomeworkHelper: React.FC<HomeworkHelperProps> = ({ questions, units }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(questions[0] || null);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredQuestions = questions.filter((q) => q.unitId === selectedUnitId);

  const handleSelectQuestion = (q: Question) => {
    setActiveQuestion(q);
    setCustomQuestion('');
    setStudentAnswer('');
    setCurrentHintLevel(0);
    setAiResponse('');
  };

  const handleGetHint = async (level: number) => {
    const qContent = customQuestion.trim() || activeQuestion?.content || '';
    if (!qContent) return;

    setIsLoading(true);
    setCurrentHintLevel(level);

    try {
      const hintText = await fetchHomeworkHint(qContent, studentAnswer, level);
      setAiResponse(hintText);
    } catch (err: any) {
      setAiResponse(`⚠️ **Không thể kết nối AI**: ${err.message || 'Thử lại sau'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswerCheck = async () => {
    const qContent = customQuestion.trim() || activeQuestion?.content || '';
    if (!qContent || !studentAnswer.trim()) return;

    setIsLoading(true);

    try {
      const feedbackText = await fetchHomeworkHint(qContent, studentAnswer, 3);
      setAiResponse(feedbackText);
    } catch (err: any) {
      setAiResponse(`⚠️ **Không thể kiểm tra**: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-[#FF9500]" />
            Hệ Thống Gợi Ý Giải Bài Tập Thông Minh
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Hỗ Trợ Tự Giải Bài Tập SGK & Đề Thi Lớp 6</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Tuyệt đối không làm bài hộ! Hệ thống cung cấp 3 cấp độ gợi ý thông minh giúp em tự tư duy giải bài.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Select Question or Input Custom */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#4A90E2]" />
                1. Chọn Bài Tập SGK
              </span>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 font-semibold px-2.5 py-1.5 rounded-xl text-slate-800"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.title}
                  </option>
                ))}
              </select>
            </div>

            {/* List of Questions */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              {filteredQuestions.map((q) => {
                const isSelected = activeQuestion?.id === q.id && !customQuestion;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-[#4A90E2] text-[#4A90E2] font-semibold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#4A90E2]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 text-[10px] text-slate-700 font-bold">
                        {q.skill}
                      </span>
                      <span className="text-[10px] text-[#FF9500] font-bold">
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="line-clamp-2">{q.content}</p>
                  </button>
                );
              })}
            </div>

            {/* Custom Question / Photo Upload */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#4A90E2]" />
                Hoặc Nhập Bài Tập Của Em Khỏi SGK:
              </label>
              <textarea
                id="custom-question-textarea"
                rows={3}
                value={customQuestion}
                onChange={(e) => {
                  setCustomQuestion(e.target.value);
                  setActiveQuestion(null);
                }}
                placeholder="Dán câu hỏi hoặc bài tập tiếng Anh khó em cần thầy cô gợi ý..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Active Question + 3-Tier Hint Buttons + Answer Trial Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-5">
            {/* Display Active Question */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Đề Bài Cần Giải Quyết:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                {customQuestion || activeQuestion?.content || 'Chưa chọn bài tập.'}
              </p>
              {activeQuestion?.options && !customQuestion && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {activeQuestion.options.map((opt, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white text-xs text-slate-700 border border-slate-200 font-medium"
                    >
                      <span className="font-bold text-[#FF9500] mr-1.5">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3-Tier Hint Buttons */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#FF9500]" />
                Mở Gợi Ý Theo Cấp Độ (Không Lộ Đáp Án):
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="hint-level-1-btn"
                  onClick={() => handleGetHint(1)}
                  disabled={isLoading}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    currentHintLevel === 1
                      ? 'bg-[#FF9500] text-white font-bold border-amber-600 shadow-2xs'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <div className="text-xs font-bold">Gợi Ý Cấp 1</div>
                  <div className="text-[10px] opacity-80">Từ khóa chính</div>
                </button>

                <button
                  id="hint-level-2-btn"
                  onClick={() => handleGetHint(2)}
                  disabled={isLoading}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    currentHintLevel === 2
                      ? 'bg-orange-500 text-white font-bold border-orange-600 shadow-2xs'
                      : 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <div className="text-xs font-bold">Gợi Ý Cấp 2</div>
                  <div className="text-[10px] opacity-80">Cấu trúc áp dụng</div>
                </button>

                <button
                  id="hint-level-3-btn"
                  onClick={() => handleGetHint(3)}
                  disabled={isLoading}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    currentHintLevel === 3
                      ? 'bg-[#4A90E2] text-white font-bold border-blue-600 shadow-2xs'
                      : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <div className="text-xs font-bold">Gợi Ý Cấp 3</div>
                  <div className="text-[10px] opacity-80">Hướng suy luận</div>
                </button>
              </div>
            </div>

            {/* Student Answer Trial Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Em Thử Đưa Ra Đáp Án / Câu Trả Lời Của Em:
              </label>
              <div className="flex gap-2">
                <input
                  id="student-trial-answer-input"
                  type="text"
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Nhập đáp án em nghĩ là đúng..."
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                />
                <button
                  id="check-trial-answer-btn"
                  onClick={handleSubmitAnswerCheck}
                  disabled={isLoading || !studentAnswer.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-semibold text-xs transition-all shadow-2xs disabled:opacity-50 flex items-center gap-1"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Chấm Thử</span>
                </button>
              </div>
            </div>

            {/* AI Response Output Box */}
            {aiResponse && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#FF9500] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Phản Hồi & Hướng Dẫn Tư Duy Từ AI:
                </div>
                <div className="prose prose-sm max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed">
                  <ReactMarkdown>{aiResponse}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
