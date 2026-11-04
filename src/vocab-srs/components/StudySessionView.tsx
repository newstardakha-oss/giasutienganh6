import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  Lightbulb,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Keyboard,
} from 'lucide-react';
import {
  Word,
  CardState,
  VocabSrsSettings,
  GradeResult,
  SessionTurnResult,
} from '../types';
import {
  QueueItem,
  normalizeAnswer,
  gradeAnswer,
  generateHint,
  processTurnAndAdvanceQueue,
} from '../srs';
import { speakWord } from '../speech';
import { VocabIllustration } from '../../components/VocabIllustration';

interface StudySessionViewProps {
  words: Word[];
  initialQueue: QueueItem[];
  cardStates: Record<string, CardState>;
  settings: VocabSrsSettings;
  unitLabel?: string;
  onTurnCompleted: (
    updatedStates: Record<string, CardState>,
    turnResult: SessionTurnResult,
    isNewWordIntroCompleted: boolean
  ) => void;
  onSessionFinished: (results: SessionTurnResult[]) => void;
  onExit: () => void;
}

export const StudySessionView: React.FC<StudySessionViewProps> = ({
  words,
  initialQueue,
  cardStates,
  settings,
  unitLabel,
  onTurnCompleted,
  onSessionFinished,
  onExit,
}) => {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [localStates, setLocalStates] = useState<Record<string, CardState>>(cardStates);
  const [turnResults, setTurnResults] = useState<SessionTurnResult[]>([]);

  // Trạng thái trên 1 thẻ
  const [inputValue, setInputValue] = useState<string>('');
  const [retypeInput, setRetypeInput] = useState<string>('');
  const [retypeError, setRetypeError] = useState<boolean>(false);
  const [introSoftError, setIntroSoftError] = useState<string | null>(null);
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);
  const [phase, setPhase] = useState<'answering' | 'feedback_correct' | 'feedback_wrong'>('answering');
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const retypeRef = useRef<HTMLInputElement>(null);

  const currentItem = queue[currentIndex];
  const currentWord = words.find((w) => w.id === currentItem?.wordId);

  // Tự động phát âm khi sang thẻ mới (chỉ phát cho thẻ 'intro' và 'definition', KHÔNG phát trước cho 'recall')
  useEffect(() => {
    if (!currentItem || !currentWord) return;
    setInputValue('');
    setRetypeInput('');
    setRetypeError(false);
    setIntroSoftError(null);
    setHintLevel(0);
    setPhase('answering');
    setGradeResult(null);

    if (
      settings.autoPlayAudio &&
      (currentItem.cardType === 'intro' || currentItem.cardType === 'definition')
    ) {
      const timer = setTimeout(() => {
        speakWord(currentWord, settings);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, queue.length, currentItem?.wordId, currentItem?.cardType]);

  // Tự động focus vào ô nhập
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'answering') {
        inputRef.current?.focus();
      } else if (phase === 'feedback_wrong') {
        retypeRef.current?.focus();
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [phase, currentIndex]);

  const handlePlayAudio = useCallback(() => {
    if (!currentWord) return;
    // Thẻ 3 (recall) trước khi trả lời thì không có audio
    if (currentItem?.cardType === 'recall' && phase === 'answering') return;
    speakWord(currentWord, settings);
  }, [currentWord, currentItem?.cardType, phase, settings]);

  // Chuyển sang thẻ tiếp theo trong hàng đợi
  const advanceToNextCard = useCallback(
    (quality: 'correct' | 'hard' | 'wrong', userAns: string) => {
      if (!currentItem || !currentWord) return;

      const now = Date.now();
      const { nextQueue, nextIndex, updatedCardStates } = processTurnAndAdvanceQueue(
        queue,
        currentIndex,
        localStates,
        quality,
        now
      );

      const turnRecord: SessionTurnResult = {
        wordId: currentWord.id,
        cardType: currentItem.cardType,
        quality,
        userAnswer: userAns,
        hintsUsed: hintLevel,
        timestamp: now,
      };

      const nextResults = [...turnResults, turnRecord];
      setLocalStates(updatedCardStates);
      setTurnResults(nextResults);
      setQueue(nextQueue);

      onTurnCompleted(
        updatedCardStates,
        turnRecord,
        currentItem.cardType === 'intro'
      );

      if (nextIndex >= nextQueue.length) {
        onSessionFinished(nextResults);
      } else {
        setCurrentIndex(nextIndex);
      }
    },
    [
      currentItem,
      currentWord,
      queue,
      currentIndex,
      localStates,
      hintLevel,
      turnResults,
      onTurnCompleted,
      onSessionFinished,
    ]
  );

  // Kiểm tra đáp án khi học sinh nhấn Enter hoặc nút Kiểm tra
  const handleCheckAnswer = useCallback(() => {
    if (!currentItem || !currentWord) return;

    if (currentItem.cardType === 'intro') {
      // Thẻ 1 - Làm quen: Gõ đúng -> hoàn thành thẻ. Gõ sai -> báo lỗi nhẹ nhàng, cho gõ lại (không tính là sai)
      const normUser = normalizeAnswer(inputValue);
      const normTarget = normalizeAnswer(currentWord.word);
      if (!normUser) return;

      if (normUser === normTarget) {
        setIntroSoftError(null);
        speakWord(currentWord, settings);
        advanceToNextCard('correct', inputValue.trim());
      } else {
        setIntroSoftError(
          `Gần giống rồi! Em nhìn kỹ từ "${currentWord.word}" ở trên và gõ lại thật chuẩn nhé 😊`
        );
        speakWord(currentWord, settings);
      }
      return;
    }

    // Thẻ 2 (definition) & Thẻ 3 (recall)
    if (!inputValue.trim()) return;

    const result = gradeAnswer(inputValue, currentWord.word, hintLevel);
    setGradeResult(result);
    speakWord(currentWord, settings);

    if (result.quality === 'correct' || result.quality === 'hard') {
      setPhase('feedback_correct');
    } else {
      setPhase('feedback_wrong');
    }
  }, [currentItem, currentWord, inputValue, hintLevel, settings, advanceToNextCard]);

  // Xử lý khi học sinh gõ lại đáp án đúng ở trạng thái trả lời sai
  const handleConfirmRetype = useCallback(() => {
    if (!currentWord || !gradeResult) return;
    const normRetype = normalizeAnswer(retypeInput);
    const normTarget = normalizeAnswer(currentWord.word);

    if (normRetype === normTarget) {
      setRetypeError(false);
      advanceToNextCard('wrong', inputValue.trim());
    } else {
      setRetypeError(true);
      speakWord(currentWord, settings);
    }
  }, [currentWord, gradeResult, retypeInput, inputValue, settings, advanceToNextCard]);

  // Phím tắt toàn cục: Ctrl+Space để nghe lại, Enter để sang thẻ tiếp khi đang ở feedback_correct
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        handlePlayAudio();
        return;
      }
      if (e.key === 'Enter' && phase === 'feedback_correct' && gradeResult) {
        e.preventDefault();
        advanceToNextCard(gradeResult.quality, inputValue.trim());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePlayAudio, phase, gradeResult, advanceToNextCard, inputValue]);

  const handleRequestHint = () => {
    if (hintLevel === 0) setHintLevel(1);
    else if (hintLevel === 1) setHintLevel(2);
    inputRef.current?.focus();
  };

  if (!currentItem || !currentWord) {
    return null;
  }

  // Tính tiến độ buổi học: lưu ý tổng số lượt tối thiểu cho mỗi từ mới là 3 thẻ
  // Để thanh tiến độ hiển thị chính xác vd "12/30 lượt", ta tính cả các thẻ 2 & 3 sẽ mở khóa của các từ mới trong buổi
  const remainingFutureUnlocks = queue.slice(currentIndex).reduce((acc, item) => {
    if (item.cardType === 'intro') return acc + 2; // sẽ mở khóa thêm definition + recall
    if (item.cardType === 'definition') {
      const recallState = localStates[`${item.wordId}__recall`];
      if (!recallState || recallState.status === 'locked') {
        // Kiểm tra xem recall đã nằm trong queue chưa
        const alreadyInQueue = queue
          .slice(currentIndex + 1)
          .some((q) => q.wordId === item.wordId && q.cardType === 'recall');
        return alreadyInQueue ? acc : acc + 1;
      }
    }
    return acc;
  }, 0);

  const estimatedTotalTurns = queue.length + remainingFutureUnlocks;
  const currentTurnNumber = currentIndex + 1;
  const progressPercent = Math.min(
    100,
    Math.round(((currentTurnNumber - 1) / Math.max(1, estimatedTotalTurns)) * 100)
  );

  // Cấu hình màu sắc nhận diện riêng cho từng loại thẻ
  const cardTheme = {
    intro: {
      badge: '🌱 Thẻ 1 • Làm quen',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
      cardBg: 'bg-gradient-to-b from-sky-50/90 to-white border-sky-200',
      accentText: 'text-sky-700',
      btnBg: 'bg-sky-500 hover:bg-sky-600',
    },
    definition: {
      badge: '🎧 Thẻ 2 • Nghe & đoán',
      badgeBg: 'bg-violet-100 text-violet-800 border-violet-300',
      cardBg: 'bg-gradient-to-b from-violet-50/90 to-white border-violet-200',
      accentText: 'text-violet-700',
      btnBg: 'bg-violet-600 hover:bg-violet-700',
    },
    recall: {
      badge: '💡 Thẻ 3 • Nhớ lại',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      cardBg: 'bg-gradient-to-b from-amber-50/90 to-white border-amber-200',
      accentText: 'text-amber-800',
      btnBg: 'bg-amber-500 hover:bg-amber-600',
    },
  }[currentItem.cardType];

  // Làm nổi bật từ vựng trong câu ví dụ
  const highlightWordInSentence = (sentence: string, word: string) => {
    if (!sentence) return null;
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = sentence.split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <span key={i} className="font-extrabold text-indigo-600 underline decoration-2 underline-offset-4">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Thanh tiêu đề & Tiến độ buổi học */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border-2 border-purple-100 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onExit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-extrabold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thoát buổi học</span>
          </button>

          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 block">
              {unitLabel || currentWord.unit}
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-800 font-extrabold text-xs sm:text-sm">
            {currentTurnNumber}/{estimatedTotalTurns} lượt
          </div>
        </div>

        {/* Thanh progress bar */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Thẻ học chính ở giữa */}
      <div
        key={`${currentIndex}-${currentItem.wordId}-${currentItem.cardType}`}
        className={`rounded-3xl p-6 sm:p-8 shadow-md border-2 transition-all duration-300 ${
          phase === 'feedback_correct'
            ? gradeResult?.isAlmost
              ? 'bg-amber-50/90 border-amber-400'
              : 'bg-emerald-50/90 border-emerald-400'
            : phase === 'feedback_wrong'
            ? 'bg-rose-50/90 border-rose-300'
            : cardTheme.cardBg
        }`}
      >
        {/* Nhãn loại thẻ + Nút phát âm 🔊 */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border ${cardTheme.badgeBg}`}
          >
            {cardTheme.badge}
          </span>

          {/* Nút 🔊: hiện ở Thẻ 1, Thẻ 2, hoặc sau khi đã trả lời ở Thẻ 3 */}
          {(currentItem.cardType !== 'recall' || phase !== 'answering') && (
            <button
              type="button"
              onClick={handlePlayAudio}
              title="Nghe phát âm (Ctrl + Space)"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 border-2 border-sky-200 shadow-xs font-extrabold text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-sky-600 animate-pulse" />
              <span>🔊 Nghe phát âm</span>
            </button>
          )}
        </div>

        {/* NỘI DUNG THẺ 1: LÀM QUEN (intro) */}
        {currentItem.cardType === 'intro' && (
          <div className="space-y-5 text-center">
            <div className="flex flex-col items-center gap-3">
              <VocabIllustration
                word={currentWord.word}
                meaningVi={currentWord.meaningVi}
                imageUrl={currentWord.imageUrl}
                size="lg"
              />

              <div className="space-y-2">
                {/* Từ tiếng Anh tối thiểu 32px (text-4xl = 36px, sm:text-5xl = 48px) */}
                <h2
                  className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight"
                  style={{ fontSize: 'clamp(34px, 6vw, 48px)' }}
                >
                  {currentWord.word}
                </h2>

                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {currentWord.ipa && (
                    <span className="px-3 py-1 rounded-xl bg-white/90 border border-slate-200 text-slate-600 font-mono text-base sm:text-lg font-semibold">
                      {currentWord.ipa}
                    </span>
                  )}
                  {currentWord.partOfSpeech && (
                    <span className="px-3 py-1 rounded-xl bg-sky-100 text-sky-800 font-extrabold text-sm">
                      ({currentWord.partOfSpeech})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Nghĩa tiếng Việt & Định nghĩa tiếng Anh */}
            <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-sky-100 space-y-2 shadow-2xs">
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-900">
                {currentWord.meaningVi}
              </p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                🇬🇧 {currentWord.definitionEn}
              </p>
            </div>

            {/* Câu ví dụ */}
            <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200/70 text-left space-y-1">
              <p className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
                📌 Ví dụ trong bài học:
              </p>
              <p className="text-base sm:text-lg font-bold text-slate-800">
                “{highlightWordInSentence(currentWord.example, currentWord.word)}”
              </p>
              {currentWord.exampleVi && (
                <p className="text-sm text-slate-600 italic">
                  ➔ {currentWord.exampleVi}
                </p>
              )}
            </div>

            {/* Ô nhập gõ lại từ để làm quen */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckAnswer();
              }}
              className="space-y-3 pt-2"
            >
              <label className="block text-sm font-extrabold text-sky-800">
                ✍️ Em hãy gõ lại từ <span className="underline">{currentWord.word}</span> vào ô dưới đây để làm quen nhé:
              </label>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (introSoftError) setIntroSoftError(null);
                }}
                placeholder={`Gõ "${currentWord.word}"...`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className="w-full px-5 py-4 rounded-2xl border-2 border-sky-300 bg-white text-center text-2xl font-extrabold text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 focus:outline-none transition-all"
              />

              {introSoftError && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm font-bold flex items-center justify-center gap-2 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{introSoftError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-extrabold text-lg shadow-md transition-all cursor-pointer active:scale-98"
              >
                Hoàn thành làm quen ➔
              </button>
            </form>
          </div>
        )}

        {/* NỘI DUNG THẺ 2 (definition) & THẺ 3 (recall) KHI ĐANG TRẢ LỜI */}
        {currentItem.cardType !== 'intro' && phase === 'answering' && (
          <div className="space-y-5 text-center">
            <div className="flex justify-center">
              <VocabIllustration
                word={currentWord.word}
                meaningVi={currentWord.meaningVi}
                imageUrl={currentWord.imageUrl}
                size="md"
              />
            </div>

            {currentItem.cardType === 'definition' ? (
              <div className="space-y-4 py-2">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-violet-600">
                  Nghe phát âm & đọc định nghĩa tiếng Anh để đoán từ:
                </p>
                <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-violet-100 shadow-2xs">
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-relaxed">
                    “{currentWord.definitionEn}”
                  </p>
                  {currentWord.partOfSpeech && (
                    <span className="mt-3 inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-extrabold">
                      Từ loại: ({currentWord.partOfSpeech})
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-700">
                  Nhớ lại và gõ từ tiếng Anh có nghĩa là:
                </p>
                <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 shadow-2xs space-y-2">
                  <p className="text-3xl sm:text-4xl font-black text-slate-900">
                    {currentWord.meaningVi}
                  </p>
                  {currentWord.partOfSpeech && (
                    <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-sm font-extrabold">
                      Từ loại: ({currentWord.partOfSpeech})
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Khung hiển thị gợi ý nếu học sinh bấm nút Gợi ý */}
            {hintLevel > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-950 space-y-1 animate-fade-in">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 block">
                  💡 Gợi ý lần {hintLevel} (Lượt này sẽ tính là "Khó"):
                </span>
                <p className="text-2xl sm:text-3xl font-mono font-black tracking-widest text-amber-900">
                  {generateHint(currentWord.word, hintLevel as 1 | 2)}
                </p>
              </div>
            )}

            {/* Form nhập đáp án */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckAnswer();
              }}
              className="space-y-4"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Gõ từ tiếng Anh vào đây..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-300 bg-white text-center text-2xl font-extrabold text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleRequestHint}
                  disabled={hintLevel >= 2}
                  className="sm:w-44 py-3.5 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 disabled:opacity-50 text-amber-900 font-extrabold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span>
                    {hintLevel === 0
                      ? 'Gợi ý (Lần 1)'
                      : hintLevel === 1
                      ? 'Gợi ý thêm (Lần 2)'
                      : 'Đã hết gợi ý'}
                  </span>
                </button>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`flex-1 py-4 px-6 rounded-2xl text-white font-extrabold text-lg shadow-md disabled:opacity-50 transition-all cursor-pointer ${cardTheme.btnBg}`}
                >
                  Kiểm tra đáp án (Enter ↵)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PHẢN HỒI SAU KHI TRẢ LỜI ĐÚNG / GẦN ĐÚNG (Thẻ 2 & Thẻ 3) */}
        {currentItem.cardType !== 'intro' && phase === 'feedback_correct' && gradeResult && (
          <div className="space-y-5 text-center animate-fade-in">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-extrabold text-base ${
                gradeResult.isAlmost
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              <CheckCircle2
                className={`w-6 h-6 ${
                  gradeResult.isAlmost ? 'text-amber-600' : 'text-emerald-600'
                }`}
              />
              <span>{gradeResult.message}</span>
            </div>

            {gradeResult.isAlmost && (
              <p className="text-sm font-bold text-amber-800">
                Em đã gõ: <span className="line-through px-1">{inputValue}</span> ➔ Đáp án chuẩn là:
              </p>
            )}

            {/* Hiện từ chuẩn ≥ 32px + phiên âm + nghĩa + câu ví dụ */}
            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 space-y-3 shadow-2xs">
              <div className="flex justify-center">
                <VocabIllustration
                  word={currentWord.word}
                  meaningVi={currentWord.meaningVi}
                  imageUrl={currentWord.imageUrl}
                  size="sm"
                  allowQuickEdit={false}
                />
              </div>
              <h3
                className="text-4xl sm:text-5xl font-black text-emerald-700 tracking-tight"
                style={{ fontSize: 'clamp(34px, 6vw, 48px)' }}
              >
                {currentWord.word}
              </h3>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                {currentWord.ipa && (
                  <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono text-base font-bold">
                    {currentWord.ipa}
                  </span>
                )}
                {currentWord.partOfSpeech && (
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                    ({currentWord.partOfSpeech})
                  </span>
                )}
                <span className="text-lg font-extrabold text-slate-800">
                  • {currentWord.meaningVi}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 text-left">
                <p className="text-base font-bold text-slate-800">
                  “{highlightWordInSentence(currentWord.example, currentWord.word)}”
                </p>
                {currentWord.exampleVi && (
                  <p className="text-sm text-slate-500 italic mt-0.5">
                    ➔ {currentWord.exampleVi}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => advanceToNextCard(gradeResult.quality, inputValue.trim())}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg shadow-md inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Thẻ tiếp theo (Enter ↵)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PHẢN HỒI SAU KHI TRẢ LỜI SAI (Thẻ 2 & Thẻ 3): Tô sáng ký tự sai & bắt buộc gõ lại 1 lần */}
        {currentItem.cardType !== 'intro' && phase === 'feedback_wrong' && gradeResult && (
          <div className="space-y-5 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-100 text-rose-900 border border-rose-300 font-extrabold text-sm sm:text-base">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{gradeResult.message}</span>
            </div>

            {/* Tô sáng các ký tự học sinh gõ sai */}
            <div className="bg-white rounded-2xl p-4 border border-rose-200 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                So sánh câu trả lời của em (chữ màu đỏ là ký tự sai/thiếu):
              </span>
              <div className="flex items-center justify-center gap-1 flex-wrap font-mono text-2xl font-black">
                {gradeResult.charDiffs.map((diff, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-lg border ${
                      diff.status === 'match'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-rose-100 border-rose-400 text-rose-700 underline decoration-wavy'
                    }`}
                  >
                    {diff.char}
                  </span>
                ))}
              </div>
            </div>

            {/* Đáp án đúng chuẩn (từ >= 32px, phiên âm, nghĩa, câu ví dụ) */}
            <div className="bg-white rounded-2xl p-5 border-2 border-rose-300 space-y-2 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 block">
                Đáp án đúng là:
              </span>
              <div className="flex justify-center py-1">
                <VocabIllustration
                  word={currentWord.word}
                  meaningVi={currentWord.meaningVi}
                  imageUrl={currentWord.imageUrl}
                  size="sm"
                  allowQuickEdit={false}
                />
              </div>
              <h3
                className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight"
                style={{ fontSize: 'clamp(34px, 6vw, 48px)' }}
              >
                {currentWord.word}
              </h3>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {currentWord.ipa && (
                  <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono text-base font-bold">
                    {currentWord.ipa}
                  </span>
                )}
                {currentWord.partOfSpeech && (
                  <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-800 font-extrabold text-sm">
                    ({currentWord.partOfSpeech})
                  </span>
                )}
                <span className="text-lg font-extrabold text-slate-800">
                  • {currentWord.meaningVi}
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-700 pt-2 border-t border-slate-100">
                “{highlightWordInSentence(currentWord.example, currentWord.word)}”
              </p>
            </div>

            {/* Bắt buộc gõ lại đáp án đúng 1 lần trước khi sang thẻ tiếp */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmRetype();
              }}
              className="space-y-3 pt-1"
            >
              <label className="block text-sm font-extrabold text-rose-800">
                ✍️ Em hãy gõ lại đúng từ <span className="underline">{currentWord.word}</span> 1 lần để ghi nhớ và sang thẻ tiếp:
              </label>
              <input
                ref={retypeRef}
                type="text"
                value={retypeInput}
                onChange={(e) => {
                  setRetypeInput(e.target.value);
                  if (retypeError) setRetypeError(false);
                }}
                placeholder={`Gõ lại "${currentWord.word}"...`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className={`w-full px-5 py-4 rounded-2xl border-2 bg-white text-center text-2xl font-extrabold text-slate-900 focus:outline-none transition-all ${
                  retypeError
                    ? 'border-rose-500 ring-4 ring-rose-100'
                    : 'border-rose-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                }`}
              />
              {retypeError && (
                <p className="text-xs font-extrabold text-rose-600">
                  Chưa khớp hoàn toàn, em nhìn kỹ từng chữ cái của "{currentWord.word}" rồi gõ lại nhé!
                </p>
              )}
              <button
                type="submit"
                disabled={!retypeInput.trim()}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-lg shadow-md transition-all cursor-pointer"
              >
                Đã gõ lại đúng • Sang thẻ tiếp ➔
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Ghi chú phím tắt tiện lợi */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 flex-wrap">
        <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Keyboard className="w-3.5 h-3.5 text-indigo-500" />
          <span>Enter: Kiểm tra / Thẻ tiếp</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Volume2 className="w-3.5 h-3.5 text-sky-500" />
          <span>Ctrl + Space: Nghe lại phát âm</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Từ ≥ 6 chữ sai 1 ký tự = Gần đúng</span>
        </span>
      </div>
    </div>
  );
};
