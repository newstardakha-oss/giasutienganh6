import React, { useMemo } from 'react';
import { ArrowLeft, BarChart3, AlertTriangle } from 'lucide-react';
import type {
  GrammarPoint,
  GrammarStudentStore,
  IndexedExerciseItem,
  Unit,
} from '../types';
import { formatItemPreview } from '../dataLoader';

interface TeacherGrammarStatsProps {
  store: GrammarStudentStore;
  itemIndex: Record<string, IndexedExerciseItem>;
  grammarPointIndex: Record<string, { unit: Unit; point: GrammarPoint }>;
  onBackHome: () => void;
}

export const TeacherGrammarStats: React.FC<TeacherGrammarStatsProps> = ({
  store,
  itemIndex,
  grammarPointIndex,
  onBackHome,
}) => {
  const { gpStats, weakItems } = useMemo(() => {
    const gpMap = new Map<
      string,
      { gpId: string; titleVi: string; unitNumber: number; total: number; correct: number }
    >();
    const itemMap = new Map<
      string,
      { baseItemId: string; total: number; wrong: number }
    >();

    for (const att of store.attempts) {
      const baseItemId = att.itemId.split('#')[0];
      const entry = itemIndex[baseItemId];
      if (!entry) continue;

      const gpId = entry.set.grammarPointId;
      const gpInfo = grammarPointIndex[gpId];
      const curGp = gpMap.get(gpId) ?? {
        gpId,
        titleVi: gpInfo?.point.titleVi ?? gpId,
        unitNumber: entry.unit.number,
        total: 0,
        correct: 0,
      };
      curGp.total += 1;
      if (att.correct) curGp.correct += 1;
      gpMap.set(gpId, curGp);

      const curItem = itemMap.get(baseItemId) ?? {
        baseItemId,
        total: 0,
        wrong: 0,
      };
      curItem.total += 1;
      if (!att.correct) curItem.wrong += 1;
      itemMap.set(baseItemId, curItem);
    }

    const gpStatsList = Array.from(gpMap.values())
      .map((g) => ({
        ...g,
        accuracy: g.total > 0 ? g.correct / g.total : 0,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);

    const weakItemsList = Array.from(itemMap.values())
      .filter((it) => it.wrong > 0)
      .map((it) => ({
        ...it,
        errorRate: it.total > 0 ? it.wrong / it.total : 0,
      }))
      .sort((a, b) => b.wrong - a.wrong || b.errorRate - a.errorRate)
      .slice(0, 15);

    return { gpStats: gpStatsList, weakItems: weakItemsList };
  }, [store.attempts, itemIndex, grammarPointIndex]);

  return (
    <div className="space-y-5">
      <div>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-extrabold text-indigo-700 hover:bg-indigo-100/70 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Tất cả Unit</span>
        </button>
      </div>

      <div className="neu-card bg-white/95 p-5 sm:p-6 border border-purple-100 space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-extrabold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Phân tích chuyên sâu cho Giáo viên</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-purple-950">
          Thống kê tỉ lệ đúng theo Chủ điểm Ngữ pháp & Câu hỏi
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Tổng số lượt trả lời đã ghi nhận:{' '}
          <strong className="text-indigo-700">{store.attempts.length}</strong> lượt.
        </p>
      </div>

      {store.attempts.length === 0 ? (
        <div className="neu-card bg-white/95 p-8 text-center text-slate-500 text-sm font-medium">
          Chưa có dữ liệu làm bài. Thống kê sẽ tự động hiển thị sau khi học sinh làm bài tập.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Theo GrammarPointId */}
          <div className="neu-card bg-white/95 p-5 space-y-3 border border-purple-100">
            <h3 className="text-base font-extrabold text-slate-900">
              Tỉ lệ đúng theo Chủ điểm Ngữ pháp (Ưu tiên điểm yếu)
            </h3>
            <div className="space-y-2.5">
              {gpStats.map((g) => {
                const pct = Math.round(g.accuracy * 100);
                return (
                  <div
                    key={g.gpId}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                      <span className="font-bold text-slate-800">
                        Unit {g.unitNumber} · {g.titleVi}
                      </span>
                      <span
                        className={`font-mono font-extrabold ${
                          pct >= 80
                            ? 'text-emerald-600'
                            : pct >= 50
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {pct}% ({g.correct}/{g.total})
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          pct >= 80
                            ? 'bg-emerald-500'
                            : pct >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theo ItemId hay sai nhất */}
          <div className="neu-card bg-white/95 p-5 space-y-3 border border-purple-100">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Các câu hỏi học sinh hay sai nhất</span>
            </h3>
            {weakItems.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-500">
                Học sinh chưa làm sai câu nào.
              </p>
            ) : (
              <div className="space-y-2">
                {weakItems.map((w) => {
                  const entry = itemIndex[w.baseItemId];
                  if (!entry) return null;
                  return (
                    <div
                      key={w.baseItemId}
                      className="p-3 rounded-xl border border-rose-100 bg-rose-50/40 text-xs sm:text-sm space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-extrabold uppercase text-indigo-600">
                          Unit {entry.unit.number} · #{w.baseItemId}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-rose-600">
                          Sai {w.wrong}/{w.total} lần
                        </span>
                      </div>
                      <div className="font-medium text-slate-800 break-words">
                        {formatItemPreview(entry)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
