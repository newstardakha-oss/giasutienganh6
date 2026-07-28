import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Question } from '../types';
import { parseUploadedDocument } from '../services/api';

interface DocParserProps {
  onCustomQuestionsGenerated: (docTitle: string, newQuestions: Question[]) => void;
}

export const DocParser: React.FC<DocParserProps> = ({ onCustomQuestionsGenerated }) => {
  const [docTitle, setDocTitle] = useState('');
  const [docText, setDocText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState<{
    contentSummary: string;
    extractedVocab: string[];
    extractedGrammar: string[];
    generatedQuestions: Question[];
  } | null>(null);

  const sampleTexts = [
    {
      title: 'Đề Thi Học Kỳ 1 Tiếng Anh 6 - Trường THCS Chu Văn An',
      text: `PHẦN I. TRẮC NGHIỆM (2.0 điểm)
1. Choose the word whose underlined part is pronounced differently from the others.
A. smart B. art C. subject D. class
2. My close friend, Nam, is very ________. He likes making new things and drawing pictures.
A. creative B. shy C. quiet D. lazy
3. At Tet holiday, children in Viet Nam usually receive ________ in red envelopes from their parents.
A. lucky money B. peach flowers C. banh chung D. fireworks`,
    },
    {
      title: 'Bài Tập Ngữ Pháp Phân Biệt Present Simple & Present Continuous',
      text: `Ghi nhớ cấu trúc:
- Thì Hiện tại đơn: S + V(s/es) (Chỉ thói quen, sự thật hiển nhiên).
- Thì Hiện tại tiếp diễn: S + am/is/are + V-ing (Chỉ hành động đang diễn ra ngay lúc nói).
Dấu hiệu nhận biết: Look!, Listen!, now, at present.`,
    },
  ];

  const handleParse = async () => {
    if (!docText.trim() || isParsing) return;
    setIsParsing(true);

    try {
      const title = docTitle.trim() || 'Tài Liệu Tải Lên';
      const result = await parseUploadedDocument(docText, title);
      setParseResult(result);
      if (result.generatedQuestions?.length) {
        onCustomQuestionsGenerated(title, result.generatedQuestions);
      }
    } catch (err: any) {
      alert(`Lỗi phân tích tài liệu: ${err.message || 'Thử lại sau'}`);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocTitle(file.name.replace(/\.[^/.]+$/, ''));

    const reader = new FileReader();
    reader.onload = (evt) => {
      setDocText(evt.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <Upload className="w-4 h-4 text-[#FF9500]" />
            Trợ Lý Trích Xuất Dữ Liệu & Tạo Đề Cá Nhân Hóa
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Tải Lên Tài Liệu & Đề Bài Của Em</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Gemini AI sẽ tự động rút ra Từ vựng, Ngữ pháp và thiết kế kho bài tập trắc nghiệm riêng cho em.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Tên Tài Liệu / Đề Bài:
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="Ví dụ: Đề cương ôn tập Unit 1-3..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Nội Dung Văn Bản / Đề Bài:
                </label>
                <label className="text-xs text-[#4A90E2] font-semibold hover:underline cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5 text-[#4A90E2]" /> Tải file .txt/.doc
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".txt,.md,.json"
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                id="doc-text-input"
                rows={8}
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Dán nội dung bài học, ngữ pháp hoặc bài tập thầy cô giao ở đây..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Presets */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Hoặc Mẫu Dữ Liệu Demo:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((st, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDocTitle(st.title);
                      setDocText(st.text);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 text-xs font-medium transition-all"
                  >
                    {st.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="parse-doc-btn"
              onClick={handleParse}
              disabled={isParsing || !docText.trim()}
              className="w-full py-3.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-2xs disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-all"
            >
              {isParsing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isParsing ? 'AI Đang Trích Xuất & Biên Soạn...' : 'Phân Tích & Tạo Đề Tương Tác'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Parsed Results */}
        <div className="lg:col-span-6 space-y-4">
          {parseResult ? (
            <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kết Quả Phân Tích Tài Liệu
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#4A90E2] font-bold">
                  {parseResult.generatedQuestions?.length || 0} Câu Hỏi Mới
                </span>
              </div>

              {/* Tóm tắt */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900">Tóm Tắt Nội Dung:</span>
                <p>{parseResult.contentSummary}</p>
              </div>

              {/* Từ vựng & Ngữ pháp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800">
                    Từ Vựng Trọng Tâm (Vocabulary):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {parseResult.extractedVocab?.map((v, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-900 font-semibold text-[11px]"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="font-bold text-blue-900">
                    Cấu Trúc Ngữ Pháp (Grammar):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {parseResult.extractedGrammar?.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-900 font-semibold text-[11px]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Questions List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Các Câu Hỏi Được AI Biên Soạn:
                </span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  {parseResult.generatedQuestions?.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                    >
                      <p className="font-bold text-slate-900">
                        {idx + 1}. {q.content}
                      </p>
                      <p className="text-emerald-600 font-semibold text-[11px]">
                        ✓ Đáp án: {q.correctAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 shadow-2xs border border-slate-200 text-center space-y-3 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#FF9500] border border-amber-200 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Sẵn Sàng Trích Xuất Dữ Liệu
              </h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Hãy dán đề thi hoặc tài liệu SGK bên trái để AI tự động chuyển thành bài tập trắc nghiệm thông minh.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
