import React, { useState } from 'react';
import type { McqItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';

interface McqQuestionProps {
  item: McqItem;
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

export function renderPromptWithBlanks(prompt: string): React.ReactNode {
  const parts = prompt.split('___');
  return parts.map((part, idx) => (
    <React.Fragment key={idx}>
      {part}
      {idx < parts.length - 1 && (
        <span
          aria-hidden="true"
          className="inline-block min-w-[64px] border-b-2 border-indigo-600 mx-1 align-baseline"
        >
          &nbsp;
        </span>
      )}
    </React.Fragment>
  ));
}

export const McqQuestion: React.FC<McqQuestionProps> = ({
  item,
  submittedResult,
  onSubmit,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const isLocked = submittedResult !== null;

  const handleChoose = (idx: number) => {
    if (isLocked) return;
    setSelectedIdx(idx);
    onSubmit({ type: 'mcq', choice: idx }, item.options[idx] ?? String(idx));
  };

  return (
    <div className="space-y-4">
      <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
        {renderPromptWithBlanks(item.prompt)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.options.map((opt, idx) => {
          const isCorrectOption = idx === item.answerIndex;
          const isSelected = idx === selectedIdx;

          let stateClass =
            'border-slate-200 bg-white hover:border-indigo-500 text-slate-800';
          if (isLocked) {
            if (isCorrectOption) {
              stateClass =
                'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
            } else if (isSelected) {
              stateClass = 'border-rose-600 bg-rose-50 text-rose-950 font-bold';
            } else {
              stateClass = 'border-slate-200 bg-slate-50/70 text-slate-500 opacity-75';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isLocked}
              onClick={() => handleChoose(idx)}
              className={`min-h-[48px] px-4 py-3 rounded-xl border-2 text-left text-sm sm:text-base font-medium transition-all flex items-center gap-2.5 cursor-pointer disabled:cursor-default ${stateClass}`}
            >
              <span className="font-mono text-xs sm:text-sm font-extrabold text-indigo-600 shrink-0 w-5">
                {'ABCD'[idx] || '•'}
              </span>
              <span className="break-words">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
