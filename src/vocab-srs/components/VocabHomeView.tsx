import React from 'react';
import {
  Flame,
  Play,
  BookOpen,
  BarChart3,
  Settings,
  ShieldCheck,
  Sparkles,
  Clock,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Word, CardState, VocabSrsSettings } from '../types';
import { isWordMastered } from '../srs';

interface VocabHomeViewProps {
  words: Word[];
  cardStates: Record<string, CardState>;
  settings: VocabSrsSettings;
  dueCardsCount: number;
  newWordsTodayCount: number;
  streakDays: number;
  selectedUnitFilter: string | undefined;
  onStartStudy: (unitFilter?: string) => void;
  onChangeUnit: (unit: string | undefined) => void;
  onOpenUnitSelect: () => void;
  onOpenStats: () => void;
  onOpenTeacherManager: () => void;
  onOpenSettings: () => void;
}

export const VocabHomeView: React.FC<VocabHomeViewProps> = ({
  words,
  cardStates,
  settings,
  dueCardsCount,
  newWordsTodayCount,
  streakDays,
  selectedUnitFilter,
  onStartStudy,
  onChangeUnit,
  onOpenUnitSelect,
  onOpenStats,
  onOpenTeacherManager,
  onOpenSettings,
}) => {
  const unitNames = Array.from(new Set(words.map((w) => w.unit)));
  const scopedWords = selectedUnitFilter
    ? words.filter((w) => w.unit === selectedUnitFilter)
    : words;
  const masteredCount = scopedWords.filter((w) => isWordMastered(w.id, cardStates)).length;
  const totalEstimatedTurns = dueCardsCount + newWordsTodayCount * 3;
  const hasCardsToStudy = dueCardsCount > 0 || newWordsTodayCount > 0;

  return (
    <div className="space-y-6">
      {/* Banner chính thân thiện cho học sinh lớp 6 */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-xs sm:text-sm font-extrabold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Phương Pháp Lặp Lại Ngắt Quãng (3 Thẻ / Từ)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Học Từ Vựng Tiếng Anh 6 🌟
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 font-semibold max-w-xl">
              Mỗi từ vựng đi qua 3 bước: <strong className="text-white">Làm quen ➔ Nghe & đoán ➔ Nhớ lại</strong>.
              Ôn đúng lúc sắp quên giúp em nhớ từ siêu lâu mà không cần học vẹt!
            </p>
            <div className="inline-flex items-center gap-2 flex-wrap px-3.5 py-2 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-100 text-xs font-extrabold">
              <label htmlFor="vocab-unit-select">📌 Chọn bài học:</label>
              <select
                id="vocab-unit-select"
                value={selectedUnitFilter ?? ''}
                onChange={(e) => onChangeUnit(e.target.value || undefined)}
                className="px-3 py-1.5 rounded-lg bg-white text-slate-800 text-xs font-extrabold focus:outline-none cursor-pointer max-w-[260px]"
              >
                <option value="">Tất cả bài học</option>
                {unitNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Huy hiệu Streak 🔥 */}
          <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-3xl px-6 py-4 text-center shrink-0 min-w-[150px]">
            <div className="text-4xl mb-1 animate-bounce">🔥</div>
            <div className="text-3xl font-black text-amber-300">{streakDays} ngày</div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-100">
              Chuỗi học liên tiếp
            </div>
          </div>
        </div>
      </div>

      {/* 3 Thẻ chỉ số quan trọng hôm nay */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border-2 border-violet-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-violet-600 block">
              Thẻ cần ôn hôm nay
            </span>
            <span className="text-3xl font-black text-slate-900">{dueCardsCount}</span>
            <span className="text-xs font-bold text-slate-500 block">
              Thẻ đã đến hạn ôn lại
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-sky-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 block">
              Từ mới hôm nay
            </span>
            <span className="text-3xl font-black text-slate-900">
              {newWordsTodayCount}{' '}
              <span className="text-sm font-bold text-slate-400">
                / {settings.newWordsPerDay} từ
              </span>
            </span>
            <span className="text-xs font-bold text-slate-500 block">
              Sinh ra {newWordsTodayCount * 3} lượt thẻ mới
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block">
              Từ đã thuộc vững
            </span>
            <span className="text-3xl font-black text-slate-900">
              {masteredCount}{' '}
              <span className="text-sm font-bold text-slate-400">/ {scopedWords.length}</span>
            </span>
            <span className="text-xs font-bold text-slate-500 block">
              Thẻ 2 & Thẻ 3 đạt bậc ≥ 3
            </span>
          </div>
        </div>
      </div>

      {/* Khu vực Nút lớn BẮT ĐẦU HỌC */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-sm text-center space-y-4">
        {hasCardsToStudy ? (
          <>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Sẵn sàng cho buổi học hôm nay chưa em? 🚀
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-semibold">
                Buổi học gồm <strong>{dueCardsCount} thẻ đến hạn</strong> và{' '}
                <strong>{newWordsTodayCount} từ mới</strong> (tối thiểu{' '}
                <strong className="text-indigo-600">{totalEstimatedTurns} lượt thẻ</strong>).
              </p>
            </div>

            <button
              onClick={() => onStartStudy(selectedUnitFilter)}
              className="w-full max-w-md mx-auto py-5 px-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-black text-xl sm:text-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <Play className="w-7 h-7 fill-white" />
              <span>BẮT ĐẦU HỌC NGAY</span>
            </button>
          </>
        ) : (
          <div className="space-y-4 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Tuyệt vời! Em đã hoàn thành hết thẻ cần ôn và hạn mức từ mới hôm nay! 🎉
              </h3>
              <p className="text-sm text-slate-600 font-semibold">
                Em có thể chọn học thêm theo từng Unit hoặc tăng số từ mới/ngày trong mục Cài đặt nhé.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenUnitSelect}
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                📚 Chọn Unit để học thêm
              </button>
              <button
                onClick={onOpenSettings}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition-all cursor-pointer"
              >
                ⚙️ Chỉnh số từ mới / ngày
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Các nút điều hướng tới các màn hình chức năng */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={onOpenUnitSelect}
          className="bg-white hover:bg-sky-50/70 p-4 rounded-3xl border-2 border-slate-200 hover:border-sky-300 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-slate-800 text-sm sm:text-base">
            Chọn Unit
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            Tiến độ từng bài học
          </span>
        </button>

        <button
          onClick={onOpenStats}
          className="bg-white hover:bg-emerald-50/70 p-4 rounded-3xl border-2 border-slate-200 hover:border-emerald-300 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-slate-800 text-sm sm:text-base">
            Thống kê
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            Biểu đồ 7 ngày & từ khó
          </span>
        </button>

        <button
          onClick={onOpenTeacherManager}
          className="bg-white hover:bg-purple-50/70 p-4 rounded-3xl border-2 border-slate-200 hover:border-purple-300 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-slate-800 text-sm sm:text-base">
            Quản lý từ vựng
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            Dành cho Giáo viên (PIN)
          </span>
        </button>

        <button
          onClick={onOpenSettings}
          className="bg-white hover:bg-amber-50/70 p-4 rounded-3xl border-2 border-slate-200 hover:border-amber-300 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Settings className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-slate-800 text-sm sm:text-base">
            Cài đặt
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            Giọng đọc, tốc độ, từ mới
          </span>
        </button>
      </div>
    </div>
  );
};
