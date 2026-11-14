import React, { useState, useRef, useEffect } from 'react';
import {
  FileEdit,
  PenTool,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Copy,
  Check,
  Camera,
  Mic,
  MicOff,
  Download,
  Volume2,
  ArrowRight,
  ListChecks,
  Lightbulb,
  Layers,
  CheckSquare,
  FileText,
  PlusCircle,
} from 'lucide-react';
import { WritingFeedback, SgkUnit, StudySession } from '../types';
import { gradeWritingEssay, scanHandwrittenEssay } from '../services/api';
import { exportWritingFeedbackToDocx } from '../services/docxExport';
import { gs6Writing, getUnitWritingData, Gs6WritingUnit } from '../data/gs6Writing';

interface WritingGraderProps {
  units: SgkUnit[];
  initialUnitId?: string | null;
  onSessionCompleted?: (session: StudySession) => void;
  currentStudentName?: string;
}

const TEXT_TYPE_LABELS: Record<string, string> = {
  paragraph: 'Đoạn văn (Paragraph)',
  email: 'Thư điện tử (Email)',
  'diary entry': 'Nhật ký (Diary Entry)',
  postcard: 'Bưu thiếp (Postcard)',
};

export function formatWordCountRange(wordCount: readonly [number, number] | null): string {
  if (!wordCount) return '40–60 từ (gợi ý)';
  if (wordCount[0] === wordCount[1]) return `khoảng ${wordCount[0]} từ`;
  return `${wordCount[0]}–${wordCount[1]} từ`;
}

export const WritingGrader: React.FC<WritingGraderProps> = ({
  units,
  initialUnitId,
  onSessionCompleted,
  currentStudentName = 'Học Sinh Lớp 6',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'learn' | 'practice'>('learn');
  const [promptMode, setPromptMode] = useState<'preset' | 'custom'>('preset');

  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(() => {
    if (initialUnitId) {
      const num = parseInt(initialUnitId.replace(/\D+/g, ''), 10);
      if (num >= 1 && num <= 12) return num;
    }
    return 1;
  });

  useEffect(() => {
    if (initialUnitId) {
      const num = parseInt(initialUnitId.replace(/\D+/g, ''), 10);
      if (num >= 1 && num <= 12) {
        setPromptMode('preset');
        setSelectedUnitNumber(num);
      }
    }
  }, [initialUnitId]);

  const currentUnitData: Gs6WritingUnit = getUnitWritingData(selectedUnitNumber);
  const currentUnitId = `unit-${currentUnitData.unit}`;

  const [customTitle, setCustomTitle] = useState('');
  const [customPromptText, setCustomPromptText] = useState('');

  const [essayText, setEssayText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [checkedStep4Items, setCheckedStep4Items] = useState<Record<string, boolean>>({});
  const [showPracticeHelper, setShowPracticeHelper] = useState<'outline' | 'vocab' | 'starters' | null>('outline');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  const minTargetWords = currentUnitData.word_count ? currentUnitData.word_count[0] : 40;
  const maxTargetWords = currentUnitData.word_count ? currentUnitData.word_count[1] : 60;
  const isWordCountOnTarget =
    wordCount >= Math.max(25, minTargetWords - 10) && wordCount <= maxTargetWords + 25;

  const currentActivePromptText =
    promptMode === 'preset'
      ? currentUnitData.practice.prompt
      : customPromptText || 'Hãy viết một đoạn văn ngắn khoảng 40-50 từ bằng Tiếng Anh.';

  const currentActiveTitle =
    promptMode === 'preset'
      ? `Unit ${currentUnitData.unit}: ${currentUnitData.title} (${TEXT_TYPE_LABELS[currentUnitData.text_type] || currentUnitData.text_type})`
      : customTitle || 'Đề bài tùy chỉnh của em';

  const handleListenText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt không hỗ trợ phát âm.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleInsertIntoDraft = (snippet: string) => {
    const clean = snippet.replace(/\.\.\.$/, ' ');
    setEssayText((prev) => {
      if (!prev.trim()) return clean;
      const needsSpace = !prev.endsWith(' ') && !prev.endsWith('\n');
      return `${prev}${needsSpace ? ' ' : ''}${clean}`;
    });
    if (activeSubTab !== 'practice') {
      setActiveSubTab('practice');
    }
  };

  const handleUseSampleInPractice = (paragraphs: readonly string[]) => {
    setPromptMode('preset');
    setEssayText(paragraphs.join('\n\n'));
    setFeedback(null);
    setActiveSubTab('practice');
  };

  const handleGrade = async () => {
    if (!essayText.trim() || isGrading) return;
    setIsGrading(true);

    try {
      const res = await gradeWritingEssay(
        essayText,
        currentActivePromptText,
        promptMode === 'preset' ? currentUnitId : 'custom-writing'
      );
      setFeedback(res);

      if (onSessionCompleted) {
        const xp = Math.round(res.overallScore * 10);
        const session: StudySession = {
          id: `writing-${Date.now()}`,
          unitId: promptMode === 'preset' ? currentUnitId : 'custom-writing',
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
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
      {/* Title Header (Unified Writing Color & Pen Icon) */}
      <div className="skill-banner-writing p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold mb-2">
            <PenTool className="w-4 h-4 text-white" />
            <span>Học Viết & Chấm Bài AI Đa Cấp Độ (Global Success 6 • Unit 1–12)</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Luyện Viết Tiếng Anh Lớp 6 (I. LEARN & II. PRACTICE)
          </h2>
          <p className="text-xs sm:text-sm text-white/95 font-medium mt-1">
            Quy trình 4 bước viết chuẩn SGK • Dàn ý & Từ vựng theo chủ đề • 24 bài văn mẫu • AI chấm bài & Quét chữ viết tay.
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

      {/* Top Navigation Bar: Unit Selector (Unit 1-12) & I. LEARN / II. PRACTICE Toggle */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <div className="min-w-[260px] sm:min-w-[320px]">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Chọn Chủ Đề Bài Viết (Global Success 6 • Unit 1–12)
            </span>
            <select
              value={selectedUnitNumber}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10);
                setSelectedUnitNumber(num);
                setPromptMode('preset');
                setFeedback(null);
              }}
              className="w-full text-xs sm:text-sm bg-slate-50 border-2 border-blue-200 font-extrabold px-3.5 py-2 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#4A90E2] outline-none cursor-pointer"
            >
              {gs6Writing.units.map((u) => (
                <option key={u.unit} value={u.unit}>
                  Unit {u.unit}: {u.title} ({u.book} • {TEXT_TYPE_LABELS[u.text_type] || u.text_type})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
              <span className="font-bold text-blue-600 block text-[10px] uppercase">Dạng bài viết</span>
              <span className="font-extrabold text-blue-950">
                {TEXT_TYPE_LABELS[currentUnitData.text_type] || currentUnitData.text_type}
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
              <span className="font-bold text-amber-700 block text-[10px] uppercase">Số từ yêu cầu</span>
              <span className="font-extrabold text-amber-950">
                {formatWordCountRange(currentUnitData.word_count)}
              </span>
            </div>
          </div>
        </div>

        {/* I. LEARN vs II. PRACTICE Switch */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('learn')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'learn'
                ? 'bg-[#4A90E2] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>I. LEARN (4 Bước Viết, Từ Vựng & Bài Mẫu)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('practice')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/80'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>II. PRACTICE (Viết Bài & AI Chấm Điểm)</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'learn' ? (
        /* =====================================================================
           TAB I: LEARN (Quy trình 4 bước, Từ vựng, Mẫu câu & 2 Bài viết mẫu)
           ===================================================================== */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Topic Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-extrabold">
                  Unit {currentUnitData.unit} • {currentUnitData.book}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold">
                  {TEXT_TYPE_LABELS[currentUnitData.text_type] || currentUnitData.text_type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-extrabold">
                  Độ dài: {formatWordCountRange(currentUnitData.word_count)}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Đề bài (Topic): {currentUnitData.topic}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {gs6Writing.writing_steps.intro}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveSubTab('practice')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs inline-flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-xs shrink-0"
            >
              <span>Bắt đầu viết bài (II. PRACTICE)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: How to Write (Step 1 -> Step 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Step 1: Brainstorm ideas */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-[11px] mb-1">
                  1. How to Write • Bước 1
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>{gs6Writing.writing_steps.step1.title}</span>
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {gs6Writing.writing_steps.step1.text}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentUnitData.brainstorm.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-black text-[11px]">
                          {b.wh}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {b.question}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic pl-1">🇻🇳 {b.vi}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleListenText(b.question)}
                      className="p-2 rounded-lg bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 cursor-pointer shrink-0"
                      title="Nghe câu hỏi gợi ý"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Outline (3 parts) */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 font-extrabold text-[11px] mb-1">
                  1. How to Write • Bước 2
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>{gs6Writing.writing_steps.step2.title}</span>
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {gs6Writing.writing_steps.step2.text}
                </p>
              </div>

              <div className="space-y-3">
                {currentUnitData.outline.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-extrabold text-indigo-950">
                        {idx + 1}. {part.part}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleListenText(part.example)}
                          className="p-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-100 cursor-pointer"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertIntoDraft(part.example)}
                          className="px-2 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                          title="Chèn câu ví dụ này vào bài nháp"
                        >
                          <PlusCircle className="w-3 h-3" />
                          <span>Dùng câu mẫu</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{part.description}</p>
                    <div className="p-2.5 rounded-lg bg-white border border-indigo-100 text-xs text-indigo-900 italic">
                      <strong className="not-italic text-indigo-700">Ví dụ: </strong>"{part.example}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 & Step 4 Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-900 font-extrabold text-[11px]">
                Bước 3 • Viết bản nháp
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                {gs6Writing.writing_steps.step3.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {gs6Writing.writing_steps.step3.text}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[11px]">
                  Bước 4 • Kiểm tra & Chỉnh sửa
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                  {gs6Writing.writing_steps.step4.title}
                </h4>
                <p className="text-xs text-slate-600">{gs6Writing.writing_steps.step4.text}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {gs6Writing.writing_steps.step4.checklist.map(([term, desc], idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-emerald-950">{term}: </span>
                      <span className="text-slate-700">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Useful Vocabulary & Sentence Starters */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900 font-extrabold text-[11px] mb-1">
                  2. Useful Vocabulary and Phrases
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Từ Vựng Hữu Ích & Mẫu Câu Mở Đầu (Unit {currentUnitData.unit})
                </h3>
                <p className="text-xs text-slate-500">
                  Bấm vào từ vựng để nghe phát âm 🔊 hoặc bấm <strong>"+ Chèn"</strong> để đưa thẳng vào bài viết của em.
                </p>
              </div>
            </div>

            {/* Vocabulary Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUnitData.vocabulary.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                >
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                    📌 {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.words.map((word, wIdx) => (
                      <div
                        key={wIdx}
                        className="inline-flex items-center rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden text-xs"
                      >
                        <button
                          type="button"
                          onClick={() => handleListenText(word)}
                          className="px-2.5 py-1.5 font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#4A90E2]" />
                          <span>{word}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertIntoDraft(word)}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 font-extrabold text-[10px] border-l border-slate-200 cursor-pointer"
                          title="Chèn từ này vào bài nháp"
                        >
                          + Chèn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sentence Starters */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3">
              <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wider block">
                ✍️ Mẫu Câu Mở Đầu Gợi Ý (Sentence Starters):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {currentUnitData.sentence_starters.map((starter, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-white border border-blue-200 flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <span className="text-xs font-bold text-slate-800">{starter}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleListenText(starter.replace(/\.\.\./g, ''))}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                        title="Nghe mẫu câu"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertIntoDraft(starter)}
                        className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-[11px] cursor-pointer"
                        title="Đưa mẫu câu này vào khung viết bài"
                      >
                        + Dùng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Sample Paragraphs (2 Bài viết mẫu chuẩn SGK) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[11px] mb-1">
                  3. Sample Paragraphs
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Bài Viết Mẫu Tham Khảo (Unit {currentUnitData.unit}: {currentUnitData.title})
                </h3>
                <p className="text-xs text-slate-500">
                  Đọc kỹ bố cục 3 phần (Mở bài – Thân bài – Kết bài) của 2 bài mẫu dưới đây trước khi tự viết bài của em.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {currentUnitData.sample_paragraphs.map((sample, sIdx) => {
                const fullSampleText = sample.paragraphs.join('\n\n');
                const copyKey = `sample-${currentUnitData.unit}-${sIdx}`;
                return (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#4A90E2]" />
                          <h4 className="font-extrabold text-slate-900 text-sm">
                            {sample.title}
                          </h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[11px]">
                          {sample.word_count} từ
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {sample.paragraphs.map((pText, pIdx) => (
                          <p
                            key={pIdx}
                            className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                          >
                            {pText}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleListenText(sample.paragraphs.join(' '))}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#4A90E2]" />
                          <span>Nghe bài mẫu</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyText(fullSampleText, copyKey)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedKey === copyKey ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedKey === copyKey ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleUseSampleInPractice(sample.paragraphs)}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Đưa vào khung Chấm thử</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           TAB II: PRACTICE (Viết bài hoàn chỉnh, Gợi ý nhanh & AI Chấm Điểm)
           ===================================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          {/* Left Column: Prompt Selection, Quick Scaffolding & Writing Area */}
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
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    promptMode === 'preset'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  📚 Đề Bài SGK (Unit {currentUnitData.unit}: {currentUnitData.title})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPromptMode('custom');
                    setFeedback(null);
                  }}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    promptMode === 'custom'
                      ? 'bg-white text-[#4A90E2] shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ✏️ Đề Tự Chọn / Cô Giáo Giao
                </button>
              </div>

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
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-extrabold flex items-center gap-1.5 text-[#FF9500]">
                    <BookOpen className="w-4 h-4" /> II. PRACTICE • {currentUnitData.practice.task}:
                  </span>
                  {promptMode === 'preset' && (
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('learn')}
                      className="text-[11px] font-extrabold text-blue-700 hover:underline cursor-pointer"
                    >
                      ← Xem lại hướng dẫn I. LEARN
                    </button>
                  )}
                </div>
                <p className="leading-relaxed font-bold text-slate-900 text-xs sm:text-sm">
                  {currentActivePromptText}
                </p>
              </div>

              {/* Quick Scaffolding Bar for Preset Mode (Outline / Starters / Vocab) */}
              {promptMode === 'preset' && (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 mr-1">Gợi ý nhanh:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setShowPracticeHelper(showPracticeHelper === 'outline' ? null : 'outline')
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        showPracticeHelper === 'outline'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      📋 Dàn ý 3 phần & Câu hỏi Wh-
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setShowPracticeHelper(showPracticeHelper === 'starters' ? null : 'starters')
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        showPracticeHelper === 'starters'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ✍️ Chèn mẫu câu mở đầu
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setShowPracticeHelper(showPracticeHelper === 'vocab' ? null : 'vocab')
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        showPracticeHelper === 'vocab'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      📚 Chèn từ vựng chủ đề
                    </button>
                  </div>

                  {showPracticeHelper === 'outline' && (
                    <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs space-y-2">
                      <div className="font-extrabold text-indigo-950">
                        Dàn ý 3 phần & Câu hỏi gợi ý (Unit {currentUnitData.unit}):
                      </div>
                      <div className="space-y-1.5">
                        {currentUnitData.outline.map((o, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-white border border-indigo-100">
                            <span className="font-bold text-indigo-900">{o.part}: </span>
                            <span className="text-slate-700">{o.description} </span>
                            <button
                              type="button"
                              onClick={() => handleInsertIntoDraft(o.example)}
                              className="text-[11px] font-extrabold text-indigo-600 hover:underline ml-1 cursor-pointer"
                            >
                              [+ Chèn câu mẫu]
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showPracticeHelper === 'starters' && (
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-2">
                      <div className="font-extrabold text-blue-950">
                        Bấm vào mẫu câu để chèn vào bài viết:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentUnitData.sentence_starters.map((st, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleInsertIntoDraft(st)}
                            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold text-[11px] cursor-pointer transition-all"
                          >
                            + {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {showPracticeHelper === 'vocab' && (
                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-2 max-h-48 overflow-y-auto">
                      {currentUnitData.vocabulary.map((cat, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="font-extrabold text-purple-950 block text-[11px]">
                            {cat.category}:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {cat.words.map((w, wIdx) => (
                              <button
                                key={wIdx}
                                type="button"
                                onClick={() => handleInsertIntoDraft(w)}
                                className="px-2 py-0.5 rounded-md bg-white hover:bg-purple-100 border border-purple-200 text-purple-900 font-semibold text-[11px] cursor-pointer"
                              >
                                + {w}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Editor Input Toolbar & Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                  <span className="font-bold text-slate-700">Bài Làm Của Học Sinh:</span>

                  <div className="flex items-center gap-2 flex-wrap">
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
                      {isRecording ? (
                        <MicOff className="w-3.5 h-3.5" />
                      ) : (
                        <Mic className="w-3.5 h-3.5" />
                      )}
                      <span>{isRecording ? 'Đang Thu Giọng...' : 'Đọc Cho AI Chép'}</span>
                    </button>

                    <span
                      className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                        isWordCountOnTarget
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {wordCount} từ (Mục tiêu: {formatWordCountRange(currentUnitData.word_count)})
                    </span>
                  </div>
                </div>

                <textarea
                  id="student-essay-textarea"
                  rows={8}
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder="Nhập bài viết tiếng Anh của em vào đây (hoặc bấm vào mẫu câu gợi ý ở trên / Quét Ảnh Viết Tay trong vở)..."
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none transition-all leading-relaxed"
                />

                {/* Step 4 Self-Check Checklist before submitting */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5">
                    <ListChecks className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bước 4: Tự kiểm tra bài viết trước khi nộp (Review & Edit):</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {gs6Writing.writing_steps.step4.checklist.map(([term, desc]) => {
                      const checked = Boolean(checkedStep4Items[term]);
                      return (
                        <button
                          key={term}
                          type="button"
                          onClick={() =>
                            setCheckedStep4Items((prev) => ({ ...prev, [term]: !prev[term] }))
                          }
                          className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                            checked
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                          title={desc}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            readOnly
                            className="rounded text-emerald-600 pointer-events-none"
                          />
                          <span className="truncate">{term}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                  {promptMode === 'preset' ? (
                    <div className="flex items-center gap-3 flex-wrap">
                      {currentUnitData.sample_paragraphs.map((sp, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setEssayText(sp.paragraphs.join('\n\n'))}
                          className="text-xs text-[#4A90E2] font-semibold hover:underline cursor-pointer"
                        >
                          Điền bài mẫu {idx + 1}
                        </button>
                      ))}
                    </div>
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
                {feedback.isOfflineFallback && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-extrabold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Chấm tự động cơ bản (chưa có AI)</span>
                  </div>
                )}

                {/* Score Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Kết Quả Đánh Giá Tổng Thể
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                          feedback.isOfflineFallback
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {feedback.isOfflineFallback
                          ? 'Chấm tự động cơ bản (chưa có AI)'
                          : feedback.gradingModeLabel || 'Chấm bởi AI Gemini'}
                      </span>
                    </div>
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
                      <span className="font-bold text-slate-800">{feedback.grammarScore}/10</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 block">Từ Vựng</span>
                      <span className="font-bold text-slate-800">{feedback.vocabScore}/10</span>
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
                            <span className="line-through text-rose-500 font-semibold">
                              {cor.original}
                            </span>
                            <span className="text-slate-400">➔</span>
                            <span className="text-emerald-600 font-bold">{cor.correction}</span>
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
                      <Sparkles className="w-4 h-4 text-[#4A90E2]" />{' '}
                      {feedback.isOfflineFallback
                        ? 'Đoạn Văn Mẫu Tham Khảo (SGK):'
                        : 'Đoạn Văn Mẫu Gợi Ý Từ AI:'}
                    </span>
                    <button
                      onClick={() => handleCopyText(feedback.suggestedRevision, 'revision')}
                      className="text-[11px] text-[#4A90E2] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      {copiedKey === 'revision' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedKey === 'revision' ? 'Đã chép' : 'Sao chép'}</span>
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
                    <p className="mt-0.5 text-slate-700 leading-relaxed">
                      {feedback.pedagogicalAdvice}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-2xs border border-slate-200 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#4A90E2] flex items-center justify-center">
                  <FileEdit className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-lg font-bold text-slate-800">
                    Sẵn Sàng Chấm Bài Viết Unit {currentUnitData.unit}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Hãy dựa vào dàn ý 3 phần ở mục <strong>I. LEARN</strong>, tự viết bài vào khung bên trái hoặc bấm <strong>"Quét Ảnh Viết Tay"</strong> để nhận nhận xét chi tiết từ AI.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('learn')}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Xem dàn ý, từ vựng & 2 bài văn mẫu Unit {currentUnitData.unit}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
