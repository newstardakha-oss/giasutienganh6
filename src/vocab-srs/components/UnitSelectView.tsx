import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Play,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Word, CardState, VocabSrsSettings } from '../types';
import {
  isWordMastered,
  getDueReviewCards,
  getNewWordsToLearn,
  getCardKey,
} from '../srs';
import { speakWord } from '../speech';

interface UnitSelectViewProps {
  words: Word[];
  cardStates: Record<string, CardState>;
  settings: VocabSrsSettings;
  selectedUnit: string | undefined;
  onSelectUnitAndStart: (unitName: string | undefined) => void;
  onBack: () => void;
}

export const UnitSelectView: React.FC<UnitSelectViewProps> = ({
  words,
  cardStates,
  settings,
  selectedUnit,
  onSelectUnitAndStart,
  onBack,
}) => {
  const [previewUnit, setPreviewUnit] = useState<string | null>(null);

  // Lấy danh sách các Unit duy nhất
  const units = Array.from(new Set(words.map((w) => w.unit)));

  const now = Date.now();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              📚 Chọn Unit Học Từ Vựng
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Tiếng Anh 6 Global Success • Một từ được tính là "Đã thuộc" khi cả Thẻ 2 và Thẻ 3 đạt bậc ≥ 3
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectUnitAndStart(undefined)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Học Tất Cả Các Unit</span>
        </button>
      </div>

      {/* Danh sách các Unit kèm thanh tiến độ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unitName) => {
          const unitWords = words.filter((w) => w.unit === unitName);
          const totalWords = unitWords.length;
          const masteredWords = unitWords.filter((w) =>
            isWordMastered(w.id, cardStates)
          ).length;
          const learningWords = unitWords.filter((w) => {
            const c1 = cardStates[getCardKey(w.id, 'intro')];
            return c1 && c1.status !== 'new' && !isWordMastered(w.id, cardStates);
          }).length;
          const dueInUnit = getDueReviewCards(words, cardStates, now, unitName).length;
          const newInUnit = getNewWordsToLearn(
            words,
            cardStates,
            999,
            unitName
          ).length;
          const pct = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;
          const isPreviewOpen = previewUnit === unitName;

          return (
            <div
              key={unitName}
              className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between gap-4 ${
                selectedUnit === unitName
                  ? 'border-indigo-500 ring-4 ring-indigo-50'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
                      <span>{unitName}</span>
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs font-bold text-slate-500 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã thuộc: {masteredWords}/{totalWords} từ
                      </span>
                      {learningWords > 0 && (
                        <span className="text-sky-700">
                          • Đang học: {learningWords} từ
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                    {pct}%
                  </span>
                </div>

                {/* Thanh tiến độ của Unit */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Badges số thẻ đến hạn & từ mới */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-violet-50 text-violet-800 border border-violet-200 text-xs font-extrabold">
                    <Clock className="w-3.5 h-3.5" />
                    Cần ôn: {dueInUnit} thẻ
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 text-xs font-extrabold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Từ mới: {newInUnit} từ
                  </span>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewUnit(isPreviewOpen ? null : unitName)
                  }
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isPreviewOpen ? 'Ẩn từ vựng' : `Xem ${totalWords} từ`}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectUnitAndStart(unitName)}
                  disabled={dueInUnit === 0 && newInUnit === 0}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {dueInUnit === 0 && newInUnit === 0
                      ? 'Đã hoàn thành hôm nay'
                      : 'Học Unit này'}
                  </span>
                </button>
              </div>

              {/* Danh sách từ xem nhanh */}
              {isPreviewOpen && (
                <div className="mt-2 pt-3 border-t border-slate-100 max-h-64 overflow-y-auto space-y-2 pr-1">
                  {unitWords.map((w) => {
                    const mastered = isWordMastered(w.id, cardStates);
                    const c2 = cardStates[getCardKey(w.id, 'definition')];
                    const c3 = cardStates[getCardKey(w.id, 'recall')];
                    return (
                      <div
                        key={w.id}
                        className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-slate-900 text-sm">
                              {w.word}
                            </span>
                            {w.ipa && (
                              <span className="font-mono text-slate-500">
                                {w.ipa}
                              </span>
                            )}
                            {w.partOfSpeech && (
                              <span className="text-indigo-600 font-bold">
                                ({w.partOfSpeech})
                              </span>
                            )}
                            <span className="font-bold text-slate-700">
                              — {w.meaningVi}
                            </span>
                          </div>
                          <p className="text-slate-500 truncate mt-0.5">
                            🇬🇧 {w.definitionEn}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-lg font-extrabold ${
                              mastered
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {mastered
                              ? 'Đã thuộc'
                              : `Bậc ${c2?.step || 0}/${c3?.step || 0}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => speakWord(w, settings)}
                            className="p-1.5 rounded-xl bg-white hover:bg-sky-50 text-sky-600 border border-slate-200 cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
