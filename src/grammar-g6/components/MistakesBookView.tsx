import React from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import type { GrammarStudentStore, IndexedExerciseItem } from '../types';
import { EXERCISE_TYPE_LABELS, formatItemPreview, shuffleArray } from '../dataLoader';

interface MistakesBookViewProps {
  store: GrammarStudentStore;
  itemIndex: Record<string, IndexedExerciseItem>;
  onBackHome: () => void;
  onPracticeMistakes: (itemIds: string[]) => void;
}

export const MistakesBookView: React.FC<MistakesBookViewProps> = ({
  store,
  itemIndex,
  onBackHome,
  onPracticeMistakes,
}) => {
  const mistakeIds = Object.keys(store.mistakes).filter((id) => Boolean(itemIndex[id]));
  const practiceCount = Math.min(mistakeIds.length, 15);

  const handleStartReview = () => {
    const picked = shuffleArray(mistakeIds).slice(0, 15);
    if (picked.length > 0) {
      onPracticeMistakes(picked);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-extrabold text-indigo-700 hover:bg-indigo-100/70 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Tất cả Unit</span>
        </button>
      </div>

      {/* Header */}
      <div className="neu-card bg-white/95 p-5 sm:p-6 border border-purple-100 space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 block">
          Ôn tập cá nhân hoá
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-950">
          Sổ lỗi sai ({mistakeIds.length})
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Những câu em làm sai được ghi lại tại đây. Khi em làm đúng trong lúc luyện lại, câu đó sẽ{' '}
          <strong className="text-emerald-700">tự động xoá khỏi sổ</strong>!
        </p>
      </div>

      {mistakeIds.length > 0 ? (
        <div className="space-y-4">
          <div>
            <button
              type="button"
              onClick={handleStartReview}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl neu-btn-primary font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện lại {practiceCount} câu</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {mistakeIds.map((id) => {
              const entry = itemIndex[id];
              if (!entry) return null;
              const { unit, set } = entry;
              return (
                <div
                  key={id}
                  className="neu-card bg-white/95 p-4 border border-rose-100 space-y-1"
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600">
                    Unit {unit.number} ({unit.title}) · {EXERCISE_TYPE_LABELS[set.type]}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-slate-800 break-words">
                    {formatItemPreview(entry)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="neu-card bg-white/95 p-10 text-center space-y-3 border border-emerald-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 grid place-items-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
            Chưa có câu sai nào trong sổ!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Hãy vào một Unit bất kỳ và luyện tập nhé. Các câu cần ôn lại sẽ xuất hiện ở đây.
          </p>
        </div>
      )}
    </div>
  );
};
