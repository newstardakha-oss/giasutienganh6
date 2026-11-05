import React, { useState } from 'react';
import type { ClassifyItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';

interface ClassifyQuestionProps {
  item: ClassifyItem;
  categories: string[];
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

export const ClassifyQuestion: React.FC<ClassifyQuestionProps> = ({
  item,
  categories,
  submittedResult,
  onSubmit,
}) => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const isLocked = submittedResult !== null;

  const handleChoose = (cat: string) => {
    if (isLocked) return;
    setSelectedCat(cat);
    onSubmit({ type: 'classify', category: cat }, cat);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center space-y-1">
        <div className="text-xl sm:text-2xl font-extrabold text-indigo-950 break-words">
          {item.text}
        </div>
        {item.context && (
          <div className="text-xs sm:text-sm text-slate-600 font-medium break-words">
            {item.context}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const isCorrectCat = cat === item.category;
          const isSelected = cat === selectedCat;

          let stateClass =
            'border-slate-800 bg-white hover:border-indigo-600 hover:bg-indigo-50/50 text-slate-900';
          if (isLocked) {
            if (isCorrectCat) {
              stateClass = 'border-emerald-600 bg-emerald-50 text-emerald-900';
            } else if (isSelected) {
              stateClass = 'border-rose-600 bg-rose-50 text-rose-900';
            } else {
              stateClass = 'border-slate-200 bg-slate-50 text-slate-400 opacity-75';
            }
          }

          return (
            <button
              key={cat}
              type="button"
              disabled={isLocked}
              onClick={() => handleChoose(cat)}
              className={`min-h-[48px] px-3 py-3 rounded-xl border-2 font-mono text-sm sm:text-base font-extrabold text-center transition-all cursor-pointer disabled:cursor-default ${stateClass}`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
