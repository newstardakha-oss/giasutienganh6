import React, { useEffect, useRef, useState } from 'react';
import type { GapItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';

interface GapQuestionProps {
  item: GapItem;
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

export const GapQuestion: React.FC<GapQuestionProps> = ({
  item,
  submittedResult,
  onSubmit,
}) => {
  const blankCount = item.blanks.length;
  const [values, setValues] = useState<string[]>(() => Array(blankCount).fill(''));
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const isLocked = submittedResult !== null;

  useEffect(() => {
    setValues(Array(item.blanks.length).fill(''));
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 20);
    return () => clearTimeout(timer);
  }, [item.id, item.blanks.length]);

  const allFilled = values.every((v) => v.trim().length > 0);

  const handleChange = (idx: number, val: string) => {
    if (isLocked) return;
    setValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleCheck = () => {
    if (isLocked || !allFilled) return;
    onSubmit({ type: 'gap', values }, values.join(' / '));
  };

  const parts = item.prompt.split('___');

  return (
    <div className="space-y-4">
      <div className="text-base sm:text-lg font-medium text-slate-900 leading-loose">
        {parts.map((textPart, idx) => {
          const partResult = submittedResult?.parts?.[idx];
          let inputColorClass =
            'border-indigo-600 bg-indigo-50/80 text-indigo-950 focus:bg-white';
          if (isLocked) {
            inputColorClass = partResult
              ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
              : 'border-rose-600 bg-rose-50 text-rose-900';
          }

          return (
            <React.Fragment key={idx}>
              <span>{textPart}</span>
              {idx < parts.length - 1 && (
                <input
                  ref={idx === 0 ? firstInputRef : undefined}
                  id={`${item.id}-b${idx}`}
                  type="text"
                  value={values[idx] ?? ''}
                  readOnly={isLocked}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label={`Chỗ trống ${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && allFilled && !isLocked) {
                      e.preventDefault();
                      handleCheck();
                    }
                  }}
                  className={`inline-block min-h-[44px] w-36 sm:w-44 max-w-full mx-1 px-2.5 py-1 rounded-t-lg border-b-2 font-bold text-sm sm:text-base align-baseline outline-none transition-colors ${inputColorClass}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {!isLocked && (
        <div>
          <button
            type="button"
            disabled={!allFilled}
            onClick={handleCheck}
            className="min-h-[48px] px-6 py-2.5 rounded-xl neu-btn-primary font-extrabold text-sm sm:text-base disabled:opacity-45 disabled:pointer-events-none cursor-pointer"
          >
            Kiểm tra
          </button>
        </div>
      )}
    </div>
  );
};
