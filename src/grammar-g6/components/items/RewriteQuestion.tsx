import React, { useEffect, useRef, useState } from 'react';
import type { RewriteItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';

interface RewriteQuestionProps {
  item: RewriteItem;
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

export const RewriteQuestion: React.FC<RewriteQuestionProps> = ({
  item,
  submittedResult,
  onSubmit,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isLocked = submittedResult !== null;

  useEffect(() => {
    setText('');
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 20);
    return () => clearTimeout(timer);
  }, [item.id]);

  const isReady = text.trim().length > 0;

  const handleCheck = () => {
    if (isLocked || !isReady) return;
    onSubmit({ type: 'rewrite', text }, text.trim());
  };

  let borderClass = 'border-slate-300 bg-white focus:border-indigo-600';
  if (isLocked) {
    borderClass = submittedResult.correct
      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950'
      : 'border-rose-600 bg-rose-50/70 text-rose-950';
  }

  return (
    <div className="space-y-4">
      <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
        {item.prompt}
      </div>

      <textarea
        ref={textareaRef}
        id={`${item.id}-t`}
        rows={2}
        value={text}
        readOnly={isLocked}
        placeholder="Viết câu trả lời của em…"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => {
          if (!isLocked) setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (isReady && !isLocked) handleCheck();
          }
        }}
        className={`w-full rounded-xl border-2 p-3.5 text-sm sm:text-base font-medium outline-none transition-colors ${borderClass}`}
      />

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
