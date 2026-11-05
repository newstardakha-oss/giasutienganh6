import React, { useMemo, useState } from 'react';
import type { ClozeItem } from '../../types';
import type { Answer, CheckResult } from '../../answerChecker';

interface ClozeQuestionProps {
  item: ClozeItem;
  submittedResult: CheckResult | null;
  onSubmit: (answer: Answer, displayAnswer: string) => void;
}

type BlankSegment = Extract<ClozeItem['segments'][number], { type: 'blank' }>;

export const ClozeQuestion: React.FC<ClozeQuestionProps> = ({
  item,
  submittedResult,
  onSubmit,
}) => {
  const blanks = useMemo<BlankSegment[]>(
    () =>
      item.segments.filter(
        (s): s is BlankSegment => s.type === 'blank'
      ),
    [item.segments]
  );

  const [values, setValues] = useState<Record<number, string>>({});
  const isLocked = submittedResult !== null;

  const allFilled = blanks.every((b) => (values[b.n] ?? '').trim().length > 0);

  const handleFieldChange = (n: number, val: string) => {
    if (isLocked) return;
    setValues((prev) => ({
      ...prev,
      [n]: val,
    }));
  };

  const handleCheck = () => {
    if (isLocked || !allFilled) return;
    const summaryText = blanks
      .map((b) => `(${b.n}) ${(values[b.n] ?? '').trim()}`)
      .join('  ');
    onSubmit({ type: 'cloze', values }, summaryText);
  };

  // Nhóm các segments thành các đoạn văn (paragraphs) tách theo ký tự '\n'
  const paragraphs = useMemo(() => {
    const paras: Array<
      Array<
        | { kind: 'text'; text: string }
        | { kind: 'blank'; seg: BlankSegment; blankIndex: number }
      >
    > = [[]];

    let blankIdx = 0;
    for (const seg of item.segments) {
      if (seg.type === 'text') {
        const lines = seg.text.split('\n');
        lines.forEach((line, lIdx) => {
          if (lIdx > 0) {
            paras.push([]);
          }
          if (line) {
            paras[paras.length - 1].push({ kind: 'text', text: line });
          }
        });
      } else {
        paras[paras.length - 1].push({
          kind: 'blank',
          seg,
          blankIndex: blankIdx++,
        });
      }
    }
    return paras;
  }, [item.segments]);

  return (
    <div className="space-y-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 text-sm sm:text-base text-slate-900 leading-[2.4] space-y-2.5">
        {paragraphs.map((para, pIdx) => (
          <p key={pIdx} className="m-0">
            {para.map((node, nIdx) => {
              if (node.kind === 'text') {
                return <span key={nIdx}>{node.text}</span>;
              }

              const { seg, blankIndex } = node;
              const partOk = submittedResult?.parts?.[blankIndex];
              let fieldColor =
                'border-indigo-600 bg-indigo-50/80 text-indigo-950 focus:bg-white';
              if (isLocked) {
                fieldColor = partOk
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-rose-600 bg-rose-50 text-rose-900';
              }

              return (
                <span key={nIdx} className="inline-flex items-baseline mx-1">
                  <sup className="font-mono text-xs font-bold text-slate-500 mr-0.5">
                    ({seg.n})
                  </sup>
                  {seg.mode === 'select' ? (
                    <select
                      id={`${item.id}-${seg.n}`}
                      value={values[seg.n] ?? ''}
                      disabled={isLocked}
                      aria-label={`Chỗ trống ${seg.n}`}
                      onChange={(e) => handleFieldChange(seg.n, e.target.value)}
                      className={`min-h-[44px] px-2.5 py-1 rounded-t-lg border-b-2 font-bold text-sm sm:text-base outline-none cursor-pointer ${fieldColor}`}
                    >
                      <option value="">…</option>
                      {seg.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`${item.id}-${seg.n}`}
                      type="text"
                      value={values[seg.n] ?? ''}
                      readOnly={isLocked}
                      aria-label={`Chỗ trống ${seg.n}`}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      onChange={(e) => handleFieldChange(seg.n, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && allFilled && !isLocked) {
                          e.preventDefault();
                          handleCheck();
                        }
                      }}
                      className={`min-h-[44px] w-32 sm:w-40 max-w-full px-2.5 py-1 rounded-t-lg border-b-2 font-bold text-sm sm:text-base outline-none ${fieldColor}`}
                    />
                  )}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        Ô chọn: chọn từ đúng. Ô trống: viết dạng đúng của từ trong ngoặc.
      </p>

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
