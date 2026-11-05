import React, { useRef, useState } from 'react';
import type { ErrorItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';

interface ErrorQuestionProps {
  item: ErrorItem;
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

export const ErrorQuestion: React.FC<ErrorQuestionProps> = ({
  item,
  submittedResult,
  onSubmit,
}) => {
  const [tappedIndex, setTappedIndex] = useState<number>(-1);
  const [fixText, setFixText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isLocked = submittedResult !== null;

  const isReady = tappedIndex >= 0 && fixText.trim().length > 0;

  const handleTapWord = (idx: number) => {
    if (isLocked) return;
    setTappedIndex(idx);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleCheck = () => {
    if (isLocked || !isReady) return;
    const tappedWord = item.tokens[tappedIndex] ?? '';
    onSubmit(
      { type: 'error', tappedIndex, fix: fixText },
      `${tappedWord} → ${fixText.trim()}`
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm font-medium text-slate-600">
        Bước 1: Chạm vào từ bị sai trong câu. Bước 2: Gõ cách sửa đúng vào ô bên dưới.
      </p>

      {/* Sentence Tokens */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-4 rounded-2xl bg-white border border-slate-200 text-base sm:text-lg">
        {item.tokens.map((tok, idx) => {
          const isSelected = idx === tappedIndex;
          const isActualError = idx >= item.errorStart && idx <= item.errorEnd;

          let wordStyle =
            'border-b-2 border-dotted border-slate-300 text-slate-900 hover:bg-indigo-50';
          if (isLocked) {
            if (isActualError) {
              wordStyle =
                'bg-rose-100 text-rose-800 line-through font-extrabold border-rose-400';
            } else if (isSelected) {
              wordStyle = 'bg-amber-100 text-amber-900 font-bold';
            }
          } else if (isSelected) {
            wordStyle =
              'bg-amber-200 text-slate-950 font-extrabold border-amber-500 shadow-xs';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isLocked}
              onClick={() => handleTapWord(idx)}
              className={`min-h-[44px] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer disabled:cursor-default ${wordStyle}`}
            >
              {tok}
            </button>
          );
        })}
      </div>

      {/* Fix Input */}
      <div>
        <input
          ref={inputRef}
          id={`${item.id}-f`}
          type="text"
          value={fixText}
          disabled={tappedIndex < 0}
          readOnly={isLocked}
          placeholder={
            tappedIndex < 0
              ? 'Hãy chạm vào 1 từ sai ở trên trước…'
              : `Sửa "${item.tokens[tappedIndex]}" thành…`
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => {
            if (!isLocked) setFixText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isReady && !isLocked) {
              e.preventDefault();
              handleCheck();
            }
          }}
          className={`w-full min-h-[48px] rounded-xl border-2 px-4 py-2.5 text-sm sm:text-base font-semibold outline-none transition-colors disabled:bg-slate-100 disabled:text-slate-400 ${
            isLocked
              ? submittedResult.parts?.[1]
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                : 'border-rose-600 bg-rose-50 text-rose-950'
              : 'border-slate-300 bg-white focus:border-indigo-600'
          }`}
        />
      </div>

      {!isLocked && (
        <div>
          <button
            type="button"
            disabled={!isReady}
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
