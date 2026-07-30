import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Timer,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Zap,
  Volume2,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, SgkUnit, SkillType, StudySession } from '../types';

interface PracticeHubProps {
  questions: Question[];
  units: SgkUnit[];
  onSessionCompleted: (session: StudySession) => void;
  onOpenReadingGame?: () => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  questions,
  units,
  onSessionCompleted,
  onOpenReadingGame,
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | 'All'>('All');

  const filteredQuestions = questions.filter((q) => {
    const matchUnit = selectedUnitId === 'All' || q.unitId === selectedUnitId;
    const matchSkill = selectedSkill === 'All' || q.skill === selectedSkill;
    return matchUnit && matchSkill;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillInput, setFillInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Timer Widget
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isFinished) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, isFinished]);

  const currentQ = filteredQuestions[currentIndex];

  const checkAnswerCorrect = (userAns: string, correctAns: string) => {
    const normUser = userAns.trim().toLowerCase();
    const normCorrect = correctAns.trim().toLowerCase();
    if (normUser === normCorrect) return true;
    const variants = normCorrect.split(/[/,;]/).map((v) => v.trim());
    return variants.includes(normUser);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = checkAnswerCorrect(opt, currentQ.correctAnswer);
    if (isCorrect) {
      setScore((s) => s + 1);
      // Play web audio success beep
      playTone(523.25, 0.15); // C5
    } else {
      playTone(220, 0.2); // A3
    }
  };

  const playTone = (freq: number, duration: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignore audio errors
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Finished Quiz Session
      setIsFinished(true);
      setTimerActive(false);

      const totalQ = filteredQuestions.length;
      const scorePct = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;
      const xpEarned = Math.round(score * 10 + 20);

      if (scorePct >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      const session: StudySession = {
        id: `sess-${Date.now()}`,
        unitId: selectedUnitId,
        unitTitle: units.find((u) => u.id === selectedUnitId)?.title || 'Tổng Hợp',
        skill: selectedSkill === 'All' ? 'Grammar' : selectedSkill,
        score: scorePct,
        totalQuestions: totalQ,
        correctAnswers: score,
        timeSpentSeconds: seconds,
        date: new Date().toISOString(),
        xpEarned,
      };

      onSessionCompleted(session);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsFinished(false);
    setSeconds(0);
    setTimerActive(true);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Filters */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <BookOpen className="w-4 h-4 text-[#FF9500]" />
            Kho Bài Tập Gamified Tương Tác
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Luyện Tập 4 Kỹ Năng & Ngữ Pháp SGK Lớp 6</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Trắc nghiệm phản xạ, giải thích chi tiết và tích lũy điểm thưởng XP.
          </p>
        </div>

        {/* Timer Widget */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#FF9500]" />
          <div>
            <span className="text-[10px] text-slate-300 block uppercase font-bold">Thời Gian Bài Làm</span>
            <span className="text-base font-mono font-extrabold tracking-wider text-white">
              {formatTimer(seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold text-slate-700">Bài Học:</span>
          <select
            value={selectedUnitId}
            onChange={(e) => {
              setSelectedUnitId(e.target.value);
              handleRestart();
            }}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
          >
            <option value="All">Tất cả bài học (All Units)</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Reading', 'Writing'].map((sk) => (
            <button
              key={sk}
              onClick={() => {
                setSelectedSkill(sk as any);
                handleRestart();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSkill === sk
                  ? 'bg-[#4A90E2] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sk === 'All' ? 'Tất Cả Kỹ Năng' : sk}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Interactive Reading Game Banner */}
      {onOpenReadingGame && (selectedSkill === 'Reading' || selectedSkill === 'All') && (
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 rounded-2xl p-5 text-white shadow-md border border-indigo-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#4A90E2] flex items-center justify-center text-white text-2xl shrink-0 shadow-md">
              📖
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-800">
                Tương Tác Cao • Skills 1 Reading
              </span>
              <h3 className="text-base font-extrabold mt-1 text-white">
                READING MASTERY GAME: SLEEP - Vệ Sinh Giấc Ngủ & Sức Khỏe
              </h3>
              <p className="text-xs text-slate-300">
                Nghe giọng đọc AI từng câu, học 10 từ vựng IPA, ghép cụm từ & giải 10 câu đọc hiểu có trích dẫn.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenReadingGame}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#4A90E2] hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Chơi Game Đọc Hiểu Ngay ➔
          </button>
        </div>
      )}

      {/* Main Practice Area */}
      {!isFinished && currentQ ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-slate-200 space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#4A90E2] font-bold text-xs border border-blue-200">
                Câu {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
                {currentQ.skill}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF9500]">
              <Zap className="w-4 h-4 text-[#FF9500] fill-[#FF9500]" />
              <span>Điểm Hiện Tại: {score}</span>
            </div>
          </div>

          {/* Question Body */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQ.content}
            </h3>

            {/* Options or Fill-in-Blank Input */}
            {currentQ.options && currentQ.options.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isOptSelected = selectedOption === opt;
                  const isCorrectOpt =
                    checkAnswerCorrect(opt, currentQ.correctAnswer);

                  let optStyle =
                    'bg-slate-50 border-slate-200 text-slate-800 hover:border-[#4A90E2]/60';

                  if (isAnswered) {
                    if (isCorrectOpt) {
                      optStyle =
                        'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isOptSelected && !isCorrectOpt) {
                      optStyle =
                        'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswered}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold shrink-0 text-slate-500">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswered && isCorrectOpt && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isOptSelected && !isCorrectOpt && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={fillInput}
                    onChange={(e) => setFillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && fillInput.trim() && !isAnswered) {
                        handleSelectOption(fillInput.trim());
                      }
                    }}
                    placeholder="Gõ từ hoặc cụm từ điền vào đây..."
                    disabled={isAnswered}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={isAnswered || !fillInput.trim()}
                    onClick={() => handleSelectOption(fillInput.trim())}
                    className="px-6 py-3 bg-[#4A90E2] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-2xs transition-all text-xs sm:text-sm"
                  >
                    Xác Nhận
                  </button>
                </div>
                {isAnswered && (
                  <div className={`p-3 rounded-xl text-xs font-bold ${
                    checkAnswerCorrect(fillInput, currentQ.correctAnswer)
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {checkAnswerCorrect(fillInput, currentQ.correctAnswer) ? (
                      <span>✅ Đáp án chính xác: <strong>{currentQ.correctAnswer}</strong></span>
                    ) : (
                      <span>❌ Chưa đúng. Đáp án chuẩn là: <strong className="text-emerald-700 font-extrabold">{currentQ.correctAnswer}</strong></span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Explanation / Hint Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-[#FF9500] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Ẩn Gợi Ý' : 'Xem Gợi Ý Bài Tập'}</span>
            </button>

            <button
              id="next-question-btn"
              onClick={handleNext}
              disabled={!isAnswered}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIndex === filteredQuestions.length - 1 ? 'Hoàn Thành' : 'Câu Tiếp Theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hint or Explanation display */}
          {showHint && currentQ.hints?.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 text-amber-900 text-xs space-y-1 border border-amber-200">
              <span className="font-bold block text-[#FF9500]">💡 Gợi Ý Tư Duy:</span>
              <p>{currentQ.hints[0]}</p>
            </div>
          )}

          {isAnswered && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
              <span className="font-bold block text-sm text-[#4A90E2]">📘 Giải Thích Sư Phạm Chi Tiết:</span>
              <p>{currentQ.explanation}</p>
            </div>
          )}
        </div>
      ) : isFinished ? (
        /* Quiz Summary Screen */
        <div className="bg-white rounded-2xl p-8 shadow-2xs border border-slate-200 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-[#FF9500] border border-amber-200 mx-auto flex items-center justify-center shadow-xs">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900">
              Chúc Mừng Em Hoàn Thành Bài Luyện Tập! 🎉
            </h3>
            <p className="text-xs text-slate-500">
              Thời gian hoàn thành: <span className="font-bold text-slate-700">{formatTimer(seconds)}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs text-slate-400 block">Số Câu Đúng</span>
              <span className="text-2xl font-extrabold text-emerald-600">
                {score} / {filteredQuestions.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Điểm Cộng Thưởng</span>
              <span className="text-2xl font-extrabold text-[#FF9500]">
                +{score * 10 + 20} XP
              </span>
            </div>
          </div>

          <button
            id="restart-quiz-btn"
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-sm shadow-2xs transition-all inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Luyện Tập Lại Bài Này
          </button>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-xs font-semibold">
          Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </div>
  );
};
