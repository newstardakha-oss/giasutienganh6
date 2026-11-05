import React from 'react';
import { ArrowLeft, BookOpen, Sparkles, Zap } from 'lucide-react';
import type { ClozeItem, ExerciseSet, GrammarStudentStore, Unit } from '../types';
import { EXERCISE_TYPE_LABELS, shuffleArray } from '../dataLoader';
import { GrammarPointCard } from './TheoryBlockView';

interface UnitDetailViewProps {
  unit: Unit;
  activeTab: 'theory' | 'practice';
  store: GrammarStudentStore;
  onChangeTab: (tab: 'theory' | 'practice') => void;
  onBackToUnits: () => void;
  onStartSet: (set: ExerciseSet) => void;
  onStartQuickTest: (itemIds: string[], title: string, unit: Unit) => void;
}

function renderDifficultyStars(level: number): string {
  const filled = Math.max(1, Math.min(5, level));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

export const UnitDetailView: React.FC<UnitDetailViewProps> = ({
  unit,
  activeTab,
  store,
  onChangeTab,
  onBackToUnits,
  onStartSet,
  onStartQuickTest,
}) => {
  const handleQuickTest = () => {
    const pool = unit.exerciseSets
      .filter((s) => s.type !== 'cloze')
      .flatMap((s) => s.items.map((it) => it.id));
    const picked = shuffleArray(pool).slice(0, 12);
    if (picked.length > 0) {
      onStartQuickTest(picked, `Kiểm tra nhanh Unit ${unit.number}`, unit);
    }
  };

  return (
    <div className="space-y-5">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBackToUnits}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-extrabold text-indigo-700 hover:bg-indigo-100/70 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Tất cả Unit</span>
        </button>
      </div>

      {/* Unit Header */}
      <div className="neu-card bg-white/95 p-5 sm:p-6 border border-purple-100">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 block">
          Unit {unit.number}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-950 mt-0.5">
          {unit.title}
        </h2>
        <p className="text-sm font-semibold text-slate-600 mt-0.5">{unit.titleVi}</p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label={`Chọn chế độ Unit ${unit.number}`}
          className="flex items-center gap-2 mt-5 border-b border-slate-200"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'theory'}
            onClick={() => onChangeTab('theory')}
            className={`min-h-[44px] px-4 py-2.5 text-sm font-extrabold border-b-3 -mb-px transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'theory'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lý thuyết ({unit.grammarPoints.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'practice'}
            onClick={() => onChangeTab('practice')}
            className={`min-h-[44px] px-4 py-2.5 text-sm font-extrabold border-b-3 -mb-px transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Luyện tập ({unit.exerciseSets.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Body */}
      {activeTab === 'theory' ? (
        <div className="space-y-4">
          {unit.grammarPoints.map((gp) => (
            <GrammarPointCard key={gp.id} point={gp} />
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onChangeTab('practice')}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl neu-btn-primary font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Luyện tập ngay ({unit.exerciseSets.length} bộ bài)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            {unit.exerciseSets.map((s) => {
              const best = store.best[s.id] ?? store.setProgress[s.id]?.bestScore;
              const isPassed = typeof best === 'number' && best >= 0.8;
              const count =
                s.type === 'cloze'
                  ? (s.items[0] as ClozeItem)?.blankCount ?? s.items.length
                  : s.items.length;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStartSet(s)}
                  className="neu-card bg-white/95 hover:border-indigo-400 p-4 sm:p-5 text-left flex items-center justify-between gap-3 transition-all cursor-pointer min-h-[68px]"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="font-bold text-slate-900 text-sm sm:text-base break-words">
                      {s.title}
                    </div>
                    <div className="flex items-center flex-wrap gap-2 text-xs">
                      <span className="font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {EXERCISE_TYPE_LABELS[s.type]}
                      </span>
                      <span
                        className="text-indigo-600 tracking-wider font-bold"
                        aria-label={`Độ khó ${s.level} trên 5`}
                      >
                        {renderDifficultyStars(s.level)}
                      </span>
                      <span className="text-slate-500 font-semibold">{count} câu</span>
                    </div>
                  </div>

                  <div
                    className={`font-mono text-sm sm:text-base font-extrabold min-w-[52px] text-right shrink-0 ${
                      isPassed
                        ? 'text-emerald-600'
                        : best != null
                        ? 'text-amber-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {best == null ? '—' : `${Math.round(best * 100)}%`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Test 12 Random Questions */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickTest}
              className="w-full min-h-[48px] px-5 py-3.5 rounded-2xl neu-btn bg-white hover:border-indigo-400 text-indigo-800 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Kiểm tra nhanh: 12 câu ngẫu nhiên</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
