import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BookOpen, CheckCircle2, RotateCcw, X, XCircle } from 'lucide-react';
import type {
  ClassifyItem,
  ClozeItem,
  ErrorItem,
  GapItem,
  GrammarPoint,
  IndexedExerciseItem,
  McqItem,
  ReorderItem,
  RewriteItem,
  Unit,
} from '../types';
import { check, score, type Answer, type CheckResult } from '../answerChecker';
import { EXERCISE_TYPE_LABELS, formatItemPreview } from '../dataLoader';
import { GrammarPointCard } from './TheoryBlockView';
import { McqQuestion } from './items/McqQuestion';
import { ClassifyQuestion } from './items/ClassifyQuestion';
import { GapQuestion } from './items/GapQuestion';
import { RewriteQuestion } from './items/RewriteQuestion';
import { ReorderQuestion } from './items/ReorderQuestion';
import { ErrorQuestion } from './items/ErrorQuestion';
import { ClozeQuestion } from './items/ClozeQuestion';

export interface PlayerItemOutcome {
  id: string;
  ok: boolean;
  partScore: number;
  expected: string;
}

interface ExercisePlayerViewProps {
  itemIds: string[];
  title: string;
  setId?: string;
  itemIndex: Record<string, IndexedExerciseItem>;
  grammarPointIndex: Record<string, { unit: Unit; point: GrammarPoint }>;
  onRecordAttempt: (params: {
    itemId: string;
    setId: string;
    unitId: string;
    correct: boolean;
    answerText: string;
    clozeBlankResults?: { n: number; correct: boolean; value: string }[];
    /** Điểm từng phần 0..1 (cloze/classify có thể đúng một phần) */
    score?: number;
    startedAt?: string;
    submittedAt?: string;
    durationSec?: number;
  }) => void;
  onCompleteSession: (params: {
    setId?: string;
    unitId: string;
    unitTitle: string;
    scoreRatio: number;
    totalCount: number;
    correctCount: number;
    timeSpentSeconds: number;
  }) => void;
  onBack: () => void;
  onReplay: () => void;
}

export const ExercisePlayerView: React.FC<ExercisePlayerViewProps> = ({
  itemIds,
  title,
  setId,
  itemIndex,
  grammarPointIndex,
  onRecordAttempt,
  onCompleteSession,
  onBack,
  onReplay,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submittedResult, setSubmittedResult] = useState<CheckResult | null>(null);
  const [submittedPartScore, setSubmittedPartScore] = useState<number>(0);
  const [displayExpected, setDisplayExpected] = useState<string>('');
  const [outcomes, setOutcomes] = useState<PlayerItemOutcome[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [viewingGrammarPointId, setViewingGrammarPointId] = useState<string | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  // Thời điểm bắt đầu câu hiện tại (phục vụ startedAt/durationSec của collection "attempts")
  const itemStartRef = useRef<number>(Date.now());
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    itemStartRef.current = Date.now();
  }, [currentIndex]);

  const validItemIds = itemIds.filter((id) => Boolean(itemIndex[id]));
  const currentId = validItemIds[currentIndex];
  const currentEntry = currentId ? itemIndex[currentId] : undefined;

  useEffect(() => {
    if (submittedResult && !viewingGrammarPointId) {
      const timer = setTimeout(() => {
        nextBtnRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [submittedResult, viewingGrammarPointId]);

  if (validItemIds.length === 0) {
    return (
      <div className="neu-card bg-white p-8 text-center space-y-4">
        <p className="text-slate-600 font-semibold">Không tìm thấy câu hỏi nào để hiển thị.</p>
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-5 py-2.5 rounded-xl neu-btn font-bold text-indigo-700 cursor-pointer"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const handleAnswerSubmit = (answer: Answer, displayAnswer: string) => {
    if (!currentEntry || submittedResult) return;
    const { unit, set, item } = currentEntry;

    const res = check(item, answer);
    const part = score(res);

    let formattedExpected = res.expected;
    let clozeBlankResults: { n: number; correct: boolean; value: string }[] | undefined;

    if (set.type === 'error') {
      const errItem = item as ErrorItem;
      formattedExpected = `${errItem.wrong} → ${errItem.fix[0]}  (${res.expected})`;
    } else if (set.type === 'cloze' && answer.type === 'cloze') {
      const clozeItem = item as ClozeItem;
      const blanks = clozeItem.segments.filter(
        (s): s is Extract<ClozeItem['segments'][number], { type: 'blank' }> =>
          s.type === 'blank'
      );
      clozeBlankResults = blanks.map((b, idx) => ({
        n: b.n,
        correct: Boolean(res.parts?.[idx]),
        value: answer.values[b.n] ?? '',
      }));
      const wrongBlanks = blanks
        .filter((_, idx) => !res.parts?.[idx])
        .map((b) => `(${b.n}) ${b.accept[0]}`)
        .join('  ');
      formattedExpected = wrongBlanks || res.expected;
    }

    setSubmittedResult(res);
    setSubmittedPartScore(part);
    setDisplayExpected(formattedExpected);

    const nextOutcome: PlayerItemOutcome = {
      id: item.id,
      ok: res.correct,
      partScore: part,
      expected: formattedExpected,
    };
    setOutcomes((prev) => [...prev, nextOutcome]);

    const submittedAtMs = Date.now();
    onRecordAttempt({
      itemId: item.id,
      setId: set.id,
      unitId: unit.id,
      correct: res.correct,
      answerText: displayAnswer,
      clozeBlankResults,
      score: part,
      startedAt: new Date(itemStartRef.current).toISOString(),
      submittedAt: new Date(submittedAtMs).toISOString(),
      durationSec: Math.max(1, Math.round((submittedAtMs - itemStartRef.current) / 1000)),
    });
  };

  const handleNextOrFinish = () => {
    if (currentIndex + 1 < validItemIds.length) {
      setCurrentIndex((prev) => prev + 1);
      setSubmittedResult(null);
      setSubmittedPartScore(0);
      setDisplayExpected('');
      setViewingGrammarPointId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsFinished(true);
      const totalScore = outcomes.reduce((acc, o) => acc + o.partScore, 0);
      const finalRatio = validItemIds.length > 0 ? totalScore / validItemIds.length : 0;
      const elapsedSeconds = Math.max(
        5,
        Math.round((Date.now() - startTimeRef.current) / 1000)
      );

      const firstEntry = itemIndex[validItemIds[0]];
      onCompleteSession({
        setId,
        unitId: firstEntry.unit.id,
        unitTitle: firstEntry.unit.title,
        scoreRatio: finalRatio,
        totalCount: validItemIds.length,
        correctCount: Math.round(totalScore),
        timeSpentSeconds: elapsedSeconds,
      });

      if (finalRatio >= 0.8) {
        try {
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
        } catch {
          // Ignore confetti errors in headless/test environments
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Màn hình "Xem lại lý thuyết" ngay trong trình làm bài (giữ nguyên state câu đang làm)
  if (viewingGrammarPointId) {
    const gpEntry = grammarPointIndex[viewingGrammarPointId];
    const fallbackUnit = currentEntry?.unit;
    const pointsToRender = gpEntry
      ? [gpEntry.point]
      : fallbackUnit?.grammarPoints ?? [];

    return (
      <div className="space-y-4">
        <div>
          <button
            type="button"
            onClick={() => setViewingGrammarPointId(null)}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-extrabold text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Quay lại bài đang làm</span>
          </button>
        </div>

        <div className="space-y-4">
          {pointsToRender.map((pt) => (
            <GrammarPointCard key={pt.id} point={pt} />
          ))}
        </div>
      </div>
    );
  }

  // Màn hình 4: Kết quả (Summary)
  if (isFinished) {
    const totalScore = outcomes.reduce((acc, o) => acc + o.partScore, 0);
    const ratio = validItemIds.length > 0 ? totalScore / validItemIds.length : 0;
    const percent = Math.round(ratio * 100);
    const wrongList = outcomes.filter((o) => !o.ok);

    return (
      <div className="neu-card bg-white/95 p-6 sm:p-8 text-center flex flex-col items-center gap-4 border border-purple-100">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          {title}
        </span>

        <div
          className={`text-5xl sm:text-6xl font-black tabular-nums leading-none ${
            ratio >= 0.8 ? 'text-emerald-600' : 'text-indigo-700'
          }`}
        >
          {percent}%
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-md">
          {ratio >= 0.8
            ? '🎉 Rất tốt! Em đã hoàn thành bộ bài này.'
            : '💪 Cố lên! Xem lại lý thuyết rồi làm lại để đạt từ 80% nhé.'}
        </p>

        {wrongList.length > 0 && (
          <div className="w-full text-left space-y-2.5 mt-2">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
              Câu cần xem lại ({wrongList.length})
            </h3>
            <div className="space-y-2">
              {wrongList.map((w) => {
                const entry = itemIndex[w.id];
                if (!entry) return null;
                return (
                  <div
                    key={w.id}
                    className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 text-xs sm:text-sm space-y-1"
                  >
                    <div className="font-medium text-slate-800 break-words">
                      {formatItemPreview(entry)}
                    </div>
                    <div className="font-bold text-emerald-700 break-words">
                      → {w.expected}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center flex-wrap gap-3 pt-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[48px] px-6 py-2.5 rounded-xl neu-btn bg-white font-extrabold text-sm sm:text-base text-slate-700 cursor-pointer"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={onReplay}
            className="min-h-[48px] px-6 py-2.5 rounded-xl neu-btn-primary font-extrabold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentEntry) return null;
  const { set, item } = currentEntry;
  const progressPct = (currentIndex / validItemIds.length) * 100;

  return (
    <div className="neu-card bg-white/95 p-5 sm:p-6 space-y-5 border border-purple-100">
      {/* Top Bar: Exit + Progress + Counter */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 min-h-[44px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
          <span>Thoát</span>
        </button>

        <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <span className="font-mono text-xs sm:text-sm font-bold text-slate-500 shrink-0">
          {currentIndex + 1}/{validItemIds.length}
        </span>
      </div>

      {/* Type Chip & Set Title */}
      <div className="flex items-center flex-wrap gap-2">
        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          {EXERCISE_TYPE_LABELS[set.type]}
        </span>
        <span className="text-xs sm:text-sm font-bold text-slate-600">{set.title}</span>
      </div>

      {/* Instruction Note Box */}
      {set.instruction && (
        <div className="text-xs sm:text-sm font-semibold text-slate-800 bg-amber-50/80 border-l-4 border-amber-400 px-3.5 py-2.5 rounded-r-xl whitespace-pre-wrap">
          {set.instruction.replace(/ \| /g, '\n')}
        </div>
      )}

      {/* Question Body (keyed by item.id so state resets cleanly between items) */}
      <div key={item.id}>
        {set.type === 'mcq' && (
          <McqQuestion
            item={item as McqItem}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {set.type === 'classify' && (
          <ClassifyQuestion
            item={item as ClassifyItem}
            categories={set.categories ?? []}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {set.type === 'gap' && (
          <GapQuestion
            item={item as GapItem}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {set.type === 'rewrite' && (
          <RewriteQuestion
            item={item as RewriteItem}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {set.type === 'reorder' && (
          <ReorderQuestion
            item={item as ReorderItem}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {set.type === 'error' && (
          <ErrorQuestion
            item={item as ErrorItem}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {set.type === 'cloze' && (
          <ClozeQuestion
            item={item as ClozeItem}
            submittedResult={submittedResult}
            onSubmit={handleAnswerSubmit}
          />
        )}
      </div>

      {/* Feedback Banner */}
      {submittedResult && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border-2 space-y-2 transition-all ${
            submittedResult.correct
              ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950'
              : 'bg-rose-50/90 border-rose-500 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
            {submittedResult.correct ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-emerald-700">Chính xác!</span>
              </>
            ) : submittedPartScore > 0 ? (
              <>
                <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-amber-800">
                  Đúng một phần ({Math.round(submittedPartScore * 100)}%)
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-rose-700">Chưa đúng</span>
              </>
            )}
          </div>

          {!submittedResult.correct && (
            <div className="text-xs sm:text-sm font-bold text-slate-900 break-words">
              Đáp án: <span className="text-emerald-800">{displayExpected}</span>
            </div>
          )}

          {item.explanation && (
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
              💡 {item.explanation}
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
            {!submittedResult.correct ? (
              <button
                type="button"
                onClick={() => setViewingGrammarPointId(set.grammarPointId)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold text-indigo-700 hover:bg-indigo-100/80 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Xem lại lý thuyết</span>
              </button>
            ) : (
              <span />
            )}

            <button
              ref={nextBtnRef}
              type="button"
              onClick={handleNextOrFinish}
              className="min-h-[48px] px-6 py-2.5 rounded-xl neu-btn-primary font-extrabold text-sm sm:text-base cursor-pointer"
            >
              {currentIndex + 1 < validItemIds.length ? 'Câu tiếp theo →' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
