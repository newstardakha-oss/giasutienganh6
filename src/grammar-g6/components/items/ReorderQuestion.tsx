import React, { useMemo, useState } from 'react';
import type { ReorderItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';
import { shuffleArray } from '../../dataLoader';

interface ReorderQuestionProps {
  item: ReorderItem;
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

interface TokenInstance {
  instanceId: number;
  text: string;
}

export const ReorderQuestion: React.FC<ReorderQuestionProps> = ({
  item,
  submittedResult,
  onSubmit,
}) => {
  const shuffledBank = useMemo<TokenInstance[]>(() => {
    const base = item.tokens.map((t, k) => ({ instanceId: k, text: t }));
    const sh = shuffleArray(base);
    if (sh.length > 1 && sh.every((x, k) => x.instanceId === k)) {
      sh.reverse();
    }
    return sh;
  }, [item.id, item.tokens]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const isLocked = submittedResult !== null;

  const selectedSet = new Set(selectedIds);
  const selectedTokens = selectedIds
    .map((id) => shuffledBank.find((b) => b.instanceId === id))
    .filter((b): b is TokenInstance => Boolean(b));

  const isAllUsed = selectedTokens.length === shuffledBank.length;

  const handlePickFromBank = (instanceId: number) => {
    if (isLocked || selectedSet.has(instanceId)) return;
    setSelectedIds((prev) => [...prev, instanceId]);
  };

  const handleRemoveFromTray = (instanceId: number) => {
    if (isLocked) return;
    setSelectedIds((prev) => prev.filter((id) => id !== instanceId));
  };

  const handleCheck = () => {
    if (isLocked || !isAllUsed) return;
    const order = selectedTokens.map((t) => t.text);
    onSubmit(
      { type: 'reorder', order },
      `${order.join(' ')}${item.endPunct || '.'}`
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm font-medium text-slate-600">
        Chạm vào thẻ từ theo đúng thứ tự. Chạm lại thẻ ở khay trên để bỏ ra.
      </p>

      {/* Answer Tray */}
      <div
        aria-label="Câu của em"
        className={`min-h-[60px] p-3.5 rounded-2xl border-2 flex flex-wrap items-center gap-2 transition-colors ${
          isLocked
            ? submittedResult.correct
              ? 'border-emerald-600 bg-emerald-50/60'
              : 'border-rose-600 bg-rose-50/60'
            : 'border-indigo-500 bg-white'
        }`}
      >
        {selectedTokens.length === 0 ? (
          <span className="text-xs sm:text-sm text-slate-400 italic select-none">
            Chạm thẻ từ bên dưới để xếp thành câu…
          </span>
        ) : (
          selectedTokens.map((tok) => (
            <button
              key={`ans-${tok.instanceId}`}
              type="button"
              disabled={isLocked}
              onClick={() => handleRemoveFromTray(tok.instanceId)}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-slate-800 bg-white hover:bg-rose-50 hover:border-rose-500 font-bold text-sm sm:text-base text-slate-900 transition-all cursor-pointer disabled:cursor-default"
            >
              {tok.text}
            </button>
          ))
        )}
        {item.endPunct && (
          <span className="font-mono text-lg font-extrabold text-indigo-700 px-1 select-none">
            {item.endPunct}
          </span>
        )}
      </div>

      {/* Token Bank */}
      <div
        aria-label="Thẻ từ"
        className="min-h-[60px] p-3.5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 flex flex-wrap items-center gap-2"
      >
        {shuffledBank.map((tok) => {
          const isUsed = selectedSet.has(tok.instanceId);
          return (
            <button
              key={`bank-${tok.instanceId}`}
              type="button"
              disabled={isLocked || isUsed}
              onClick={() => handlePickFromBank(tok.instanceId)}
              aria-hidden={isUsed}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-slate-800 bg-white hover:border-indigo-600 hover:bg-indigo-50 font-bold text-sm sm:text-base text-slate-900 transition-all cursor-pointer ${
                isUsed ? 'invisible pointer-events-none' : ''
              }`}
            >
              {tok.text}
            </button>
          );
        })}
      </div>

      {!isLocked && (
        <div>
          <button
            type="button"
            disabled={!isAllUsed}
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
