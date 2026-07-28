import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  Music,
  ArrowRight
} from 'lucide-react';
import { PronunciationEvaluation, SgkUnit } from '../types';
import { evaluateSpeechPronunciation } from '../services/api';

interface SpeechStudioProps {
  units: SgkUnit[];
}

export const SpeechStudio: React.FC<SpeechStudioProps> = ({ units }) => {
  const [selectedUnit, setSelectedUnit] = useState<SgkUnit>(units[0]);
  const [activeTab, setActiveTab] = useState<'phoneme' | 'roleplay'>('phoneme');

  // Phoneme trainer targets for current unit
  const targetSentences = [
    {
      text: `Students always look smart in their uniforms on Monday.`,
      ipa: `/a:/ & /ʌ/`,
      focusPhoneme: `/a:/ & /ʌ/`,
    },
    {
      text: `My brother has a new compass and calculator.`,
      ipa: `/ˈkʌmpəs/`,
      focusPhoneme: `/ʌ/`,
    },
    {
      text: `There are two lamps and four sofas in the living room.`,
      ipa: `/læmps/ vs /ˈsəʊfəz/`,
      focusPhoneme: `/s/ & /z/`,
    },
    {
      text: `We should eat banh chung and wish happy New Year at Tet.`,
      ipa: `/s/ & /ʃ/`,
      focusPhoneme: `/ʃ/`,
    },
  ];

  const [selectedTarget, setSelectedTarget] = useState(targetSentences[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);
  const [isEvaluating, setIsLoading] = useState(false);

  // Web Speech Synthesis
  const handleListenTarget = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt không hỗ trợ phát âm.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition setup
  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói Web Speech API (như Chrome, Edge).');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    setRecognizedText('');
    setEvaluation(null);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      setIsRecording(false);
      // Auto evaluate with AI
      handleEvaluate(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleEvaluate = async (transcript: string) => {
    if (!transcript) return;
    setIsLoading(true);
    try {
      const result = await evaluateSpeechPronunciation(
        transcript,
        selectedTarget.text,
        selectedTarget.focusPhoneme
      );
      setEvaluation(result);
    } catch (err: any) {
      alert(`Lỗi đánh giá phát âm: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <Mic className="w-4 h-4 text-[#FF9500]" />
            Luyện Phát Âm & Giao Tiếp Phản Xạ 2 Chiều
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Phòng Luyện Phát Âm Chuẩn IPA Lớp 6</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Nhận diện giọng nói AI, chấm điểm phát âm theo âm tiết IPA SGK Global Success.
          </p>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('phoneme')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'phoneme'
              ? 'bg-[#4A90E2] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Music className="w-4 h-4" />
          1. Luyện Âm Trọng Tâm (Phonemes / IPA)
        </button>
        <button
          onClick={() => setActiveTab('roleplay')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'roleplay'
              ? 'bg-[#4A90E2] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          2. Khung Hội Thoại Giao Tiếp 2 Chiều
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'phoneme' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Target List */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Mẫu Câu Luyện Tập Trọng Tâm
              </span>
              <select
                value={selectedUnit.id}
                onChange={(e) => {
                  const u = units.find((x) => x.id === e.target.value);
                  if (u) setSelectedUnit(u);
                }}
                className="text-xs bg-slate-50 border border-slate-200 font-semibold px-2.5 py-1.5 rounded-xl text-slate-800"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              {targetSentences.map((tgt, i) => {
                const isSelected = selectedTarget.text === tgt.text;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedTarget(tgt);
                      setEvaluation(null);
                      setRecognizedText('');
                    }}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-[#4A90E2] font-semibold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:border-[#4A90E2]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#4A90E2] font-bold text-[10px]">
                        IPA Focus: {tgt.focusPhoneme}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListenTarget(tgt.text);
                        }}
                        className="p-1 rounded-full text-slate-400 hover:text-[#4A90E2]"
                        title="Nghe phát âm mẫu"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-800 font-medium">{tgt.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recording & AI Feedback */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-6">
            {/* Target Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Câu Mẫu Cần Đọc:
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                "{selectedTarget.text}"
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                <span>IPA Trọng tâm: {selectedTarget.ipa}</span>
              </div>
              <div>
                <button
                  onClick={() => handleListenTarget(selectedTarget.text)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-[#4A90E2] inline-flex items-center gap-2 shadow-2xs"
                >
                  <Volume2 className="w-4 h-4 text-[#4A90E2]" />
                  Nghe Giọng Đọc Mẫu Native
                </button>
              </div>
            </div>

            {/* Microphone Button */}
            <div className="text-center space-y-3">
              <button
                id="mic-record-btn"
                onClick={startRecording}
                disabled={isRecording || isEvaluating}
                className={`w-20 h-20 rounded-full inline-flex items-center justify-center transition-all shadow-md ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200'
                    : 'bg-[#4A90E2] text-white hover:scale-105 shadow-blue-500/20'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <p className="text-xs font-semibold text-slate-500">
                {isRecording
                  ? 'Đang lắng nghe... Hãy đọc to câu mẫu ở trên nhé!'
                  : 'Bấm biểu tượng micro để bắt đầu thu âm phát âm'}
              </p>
            </div>

            {/* Recognized text */}
            {recognizedText && (
              <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700">
                <span className="font-bold text-slate-500">Văn bản ghi nhận: </span>
                <span className="font-semibold text-[#4A90E2]">
                  "{recognizedText}"
                </span>
              </div>
            )}

            {isEvaluating && (
              <div className="p-4 rounded-xl bg-blue-50 text-[#4A90E2] text-xs font-semibold flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích khẩu hình và ngữ âm IPA...</span>
              </div>
            )}

            {/* Evaluation Results */}
            {evaluation && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#FF9500]" />
                    <span className="font-bold text-sm text-slate-900">
                      Kết Quả Đánh Giá Phát Âm AI
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                    {evaluation.score}/100 - {evaluation.accuracyGrade}
                  </div>
                </div>

                {/* Phoneme accuracy breakdown */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500">Chi Tiết Âm IPA:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {evaluation.phonemesAccuracy?.map((ph, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <span className="font-bold text-[#4A90E2]">
                          {ph.phoneme}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ph.status === 'correct'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {ph.status === 'correct' ? 'Chuẩn' : 'Cần chú ý'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-[#4A90E2]">
                    💬 Lời khuyên thầy cô: {evaluation.teacherFeedback}
                  </p>
                  {evaluation.tipsToImprove?.map((tip, i) => (
                    <p key={i} className="text-slate-500 flex items-center gap-1">
                      <span>•</span> {tip}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Roleplay Dialogue Mode */
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
            <h4 className="font-bold text-sm">Giao Tiếp Tương Tác 2 Chiều Cùng AI</h4>
            <p>
              Luyện tập các bài hội thoại trong SGK Tiếng Anh 6: Giới thiệu bạn mới, Hỏi chỉ đường, Nói về Tết, Ngôi nhà mơ ước...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#FF9500]">AI (Nick):</span>
              <p className="text-sm font-semibold text-slate-900">
                "Hi there! Nice to meet you. What is your favorite subject at school?"
              </p>
              <button
                onClick={() => handleListenTarget('Hi there! Nice to meet you. What is your favorite subject at school?')}
                className="text-xs text-[#4A90E2] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe AI đọc
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#4A90E2]">Em (Gợi ý trả lời):</span>
              <p className="text-sm font-semibold text-slate-900">
                "Hi Nick! I like English and History best because they are very interesting."
              </p>
              <button
                onClick={startRecording}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-[#4A90E2] text-white font-semibold hover:bg-blue-600 inline-flex items-center gap-1 shadow-2xs"
              >
                <Mic className="w-3.5 h-3.5" /> Bắt đầu thu âm trả lời
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
