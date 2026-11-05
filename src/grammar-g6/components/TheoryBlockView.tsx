import React from 'react';
import { Volume2 } from 'lucide-react';
import type { GrammarPoint, TheoryBlock } from '../types';

export function speakExampleEn(text: string): void {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch {
    // Bỏ qua nếu thiết bị không hỗ trợ Web Speech API
  }
}

interface TheoryBlockItemProps {
  block: TheoryBlock;
}

export const TheoryBlockItem: React.FC<TheoryBlockItemProps> = ({ block }) => {
  switch (block.type) {
    case 'rule':
      return (
        <div className="relative pl-5 text-sm sm:text-base text-slate-800 leading-relaxed">
          <span
            aria-hidden="true"
            className="absolute left-1 top-2.5 w-2 h-2 rounded-sm bg-indigo-600"
          />
          <span>{block.text}</span>
        </div>
      );

    case 'formula':
      return (
        <div className="font-mono text-xs sm:text-sm font-semibold bg-indigo-50/90 text-indigo-950 border border-indigo-200 px-3.5 py-2.5 rounded-xl overflow-x-auto whitespace-pre-wrap">
          {block.text}
        </div>
      );

    case 'example':
      return (
        <div className="flex items-start gap-2.5 py-1">
          <button
            type="button"
            onClick={() => speakExampleEn(block.en)}
            aria-label={`Nghe câu ví dụ: ${block.en}`}
            title="Nghe phát âm tiếng Anh (en-GB)"
            className="shrink-0 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-indigo-200 bg-white hover:bg-indigo-50 active:scale-95 text-indigo-600 grid place-items-center transition-all cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <div className="pt-1 min-w-0 flex-1">
            <div className="font-bold text-slate-900 text-sm sm:text-base break-words">
              {block.en}
            </div>
            {block.vi && (
              <div className="text-xs sm:text-sm text-slate-600 mt-0.5 break-words">
                {block.vi}
              </div>
            )}
          </div>
        </div>
      );

    case 'mistake':
      return (
        <div className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1 text-xs sm:text-sm p-3 rounded-xl border border-dashed border-rose-200 bg-rose-50/40">
          <span className="font-extrabold text-rose-600">✗</span>
          <s className="text-slate-500 break-words">{block.wrong}</s>
          <span className="font-extrabold text-emerald-600">✓</span>
          <span className="font-semibold text-emerald-900 break-words">{block.right}</span>
        </div>
      );

    case 'tip':
      return (
        <div className="pt-0.5">
          <span className="inline bg-gradient-to-b from-transparent from-55% to-amber-200/90 to-55% font-bold text-slate-900 px-1 text-sm sm:text-base">
            💡 {block.text}
          </span>
        </div>
      );
  }
};

interface GrammarPointCardProps {
  point: GrammarPoint;
}

export const GrammarPointCard: React.FC<GrammarPointCardProps> = ({ point }) => {
  return (
    <article
      id={point.id}
      className="neu-card bg-white/95 p-5 sm:p-6 flex flex-col gap-4 border border-purple-100"
    >
      <header className="flex flex-col gap-0.5 border-b border-slate-100 pb-3">
        <h3 className="text-lg sm:text-xl font-extrabold text-purple-950">
          {point.titleVi}
        </h3>
        <span className="text-xs sm:text-sm font-bold text-indigo-600">
          {point.title}
        </span>
      </header>

      <div className="flex flex-col gap-4">
        {point.sections.map((sec, idx) => (
          <section key={`${point.id}-sec-${idx}`} className="flex flex-col gap-2">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-800">
              {sec.heading}
            </h4>
            <div className="flex flex-col gap-2">
              {sec.blocks.map((b, bIdx) => (
                <TheoryBlockItem key={`${point.id}-sec-${idx}-b-${bIdx}`} block={b} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};
