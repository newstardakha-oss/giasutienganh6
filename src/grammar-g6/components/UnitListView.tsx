import React from 'react';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import type { GrammarStudentStore, Unit } from '../types';
import { getUnitCompletion } from '../storage';

interface UnitListViewProps {
  units: Unit[];
  store: GrammarStudentStore;
  onSelectUnit: (unit: Unit) => void;
}

export const UnitListView: React.FC<UnitListViewProps> = ({
  units,
  store,
  onSelectUnit,
}) => {
  const totalSets = units.reduce((sum, u) => sum + u.exerciseSets.length, 0);
  const totalCompleted = units.reduce(
    (sum, u) => sum + getUnitCompletion(u, store).completedSets,
    0
  );

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="neu-card bg-white/90 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-100">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 block">
            Global Success · Học kì 1 & 2
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-purple-950 mt-1">
            Chọn Unit để học ngữ pháp
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Mỗi Unit gồm lý thuyết trọng tâm và các bộ bài luyện tập. Đạt từ{' '}
            <strong className="text-emerald-700">80%</strong> là hoàn thành bộ bài.
          </p>
        </div>

        <div className="neu-card-mint px-4 py-3 text-center shrink-0 min-w-[140px]">
          <span className="text-[11px] font-extrabold text-emerald-700 uppercase block">
            Tiến Độ Toàn Khóa
          </span>
          <span className="text-xl font-extrabold text-emerald-900">
            {totalCompleted}/{totalSets} bộ
          </span>
        </div>
      </div>

      {/* 12 Unit Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((u) => {
          const { completedSets, totalSets: uTotal, ratio } = getUnitCompletion(u, store);
          const percent = Math.round(ratio * 100);
          const isUnitDone = uTotal > 0 && completedSets === uTotal;

          return (
            <button
              key={u.id}
              type="button"
              onClick={() => onSelectUnit(u)}
              className="neu-card bg-white/95 hover:border-indigo-400 p-5 text-left flex flex-col justify-between gap-3 transition-all cursor-pointer group min-h-[168px]"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl font-black text-indigo-600 leading-none tracking-tight">
                    {String(u.number).padStart(2, '0')}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full ${
                      isUnitDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    {isUnitDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    )}
                    <span>
                      {completedSets}/{uTotal} bộ
                    </span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center justify-between gap-1">
                    <span>{u.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </h3>
                  <p className="text-xs font-semibold text-purple-700">{u.titleVi}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {u.grammarPoints.map((g) => g.title).join(' · ')}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Hoàn thành (≥ 80%)</span>
                  <span className={percent >= 80 ? 'text-emerald-700 font-extrabold' : ''}>
                    {percent}%
                  </span>
                </div>
                <div
                  className="h-2 w-full rounded-full bg-slate-200 overflow-hidden"
                  aria-label={`Tiến độ Unit ${u.number}: ${percent}%`}
                >
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
