import React from 'react';
import {
  ArrowLeft,
  Award,
  BarChart3,
  AlertCircle,
  Volume2,
  Flame,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import {
  Word,
  CardState,
  DailyReviewStat,
  VocabSrsSettings,
} from '../types';
import { isWordMastered, getCardKey } from '../srs';
import { getTodayKey } from '../storage';
import { speakWord } from '../speech';

interface VocabStatsViewProps {
  words: Word[];
  cardStates: Record<string, CardState>;
  dailyStats: Record<string, DailyReviewStat>;
  streakDays: number;
  settings: VocabSrsSettings;
  onBack: () => void;
}

export const VocabStatsView: React.FC<VocabStatsViewProps> = ({
  words,
  cardStates,
  dailyStats,
  streakDays,
  settings,
  onBack,
}) => {
  const masteredWords = words.filter((w) => isWordMastered(w.id, cardStates));
  const learningWords = words.filter((w) => {
    const c1 = cardStates[getCardKey(w.id, 'intro')];
    return c1 && c1.status !== 'new' && !isWordMastered(w.id, cardStates);
  });

  // Dữ liệu biểu đồ 7 ngày gần nhất
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
    const key = getTodayKey(d);
    const label = d.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' });
    const stat = dailyStats[key];
    return {
      key,
      label,
      reviewCount: stat?.reviewCount || 0,
      correctCount: stat?.correctCount || 0,
      wrongCount: stat?.wrongCount || 0,
    };
  });

  const maxReviewsIn7Days = Math.max(10, ...last7Days.map((d) => d.reviewCount));
  const totalReviews7Days = last7Days.reduce((s, d) => s + d.reviewCount, 0);

  // Danh sách "từ khó" (sai nhiều nhất dựa trên tổng wrongCount của thẻ 2 và thẻ 3)
  const hardWords = words
    .map((w) => {
      const c2 = cardStates[getCardKey(w.id, 'definition')];
      const c3 = cardStates[getCardKey(w.id, 'recall')];
      const totalWrong = (c2?.wrongCount || 0) + (c3?.wrongCount || 0);
      const totalCorrect = (c2?.correctCount || 0) + (c3?.correctCount || 0);
      return {
        word: w,
        totalWrong,
        totalCorrect,
      };
    })
    .filter((item) => item.totalWrong > 0)
    .sort((a, b) => b.totalWrong - a.totalWrong)
    .slice(0, 15);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-purple-100 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            📊 Thống Kê Học Từ Vựng
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Theo dõi số từ đã thuộc, biểu đồ 7 ngày gần nhất và các từ khó cần chú ý
          </p>
        </div>
      </div>

      {/* Các thẻ tổng quan */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 text-center space-y-1">
          <Award className="w-7 h-7 text-emerald-600 mx-auto" />
          <span className="text-3xl font-black text-emerald-700 block">
            {masteredWords.length}
          </span>
          <span className="text-xs font-extrabold text-slate-600 block">
            Từ Đã Thuộc Vững
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-sky-200 text-center space-y-1">
          <BookOpen className="w-7 h-7 text-sky-600 mx-auto" />
          <span className="text-3xl font-black text-sky-700 block">
            {learningWords.length}
          </span>
          <span className="text-xs font-extrabold text-slate-600 block">
            Từ Đang Ôn Luyện
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 text-center space-y-1">
          <CheckCircle2 className="w-7 h-7 text-indigo-600 mx-auto" />
          <span className="text-3xl font-black text-indigo-700 block">
            {totalReviews7Days}
          </span>
          <span className="text-xs font-extrabold text-slate-600 block">
            Lượt Ôn 7 Ngày Qua
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 text-center space-y-1">
          <Flame className="w-7 h-7 text-amber-500 mx-auto" />
          <span className="text-3xl font-black text-amber-700 block">
            {streakDays} ngày
          </span>
          <span className="text-xs font-extrabold text-slate-600 block">
            Chuỗi Ngày Liên Tiếp
          </span>
        </div>
      </div>

      {/* Biểu đồ số lượt ôn 7 ngày gần nhất */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span>Biểu Đồ Số Lượt Ôn 7 Ngày Gần Nhất</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Mỗi từ mới hoàn chỉnh = 3 lượt ôn
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-52 pt-6 px-2 border-b border-slate-200">
          {last7Days.map((day) => {
            const heightPct = Math.round((day.reviewCount / maxReviewsIn7Days) * 100);
            return (
              <div
                key={day.key}
                className="flex flex-col items-center justify-end h-full gap-2"
              >
                <span className="text-xs font-black text-indigo-700">
                  {day.reviewCount}
                </span>
                <div className="w-full max-w-[44px] bg-slate-100 rounded-t-2xl h-36 flex items-end overflow-hidden p-0.5">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-xl transition-all duration-500"
                    style={{
                      height: `${day.reviewCount > 0 ? Math.max(10, heightPct) : 0}%`,
                    }}
                    title={`${day.label}: ${day.reviewCount} lượt ôn (${day.correctCount} đúng, ${day.wrongCount} sai)`}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danh sách "Từ khó" (sai nhiều nhất) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>Danh Sách “Từ Khó” (Hay Sai Nhất)</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Sắp xếp theo số lần trả lời sai giảm dần
          </span>
        </div>

        {hardWords.length === 0 ? (
          <div className="p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
            <p className="text-base font-extrabold text-emerald-800">
              🌟 Tuyệt vời! Hiện chưa có từ nào bị sai nhiều lần.
            </p>
            <p className="text-xs font-semibold text-emerald-700">
              Khi em học và có từ nào hay nhầm, hệ thống sẽ tự động tổng hợp tại đây để em tiện ôn lại nhé!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {hardWords.map(({ word, totalWrong, totalCorrect }, idx) => (
              <div
                key={word.id}
                className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-900 font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {word.word}
                    </span>
                    {word.ipa && (
                      <span className="font-mono text-xs text-slate-500">
                        {word.ipa}
                      </span>
                    )}
                    {word.partOfSpeech && (
                      <span className="text-xs font-extrabold text-indigo-600">
                        ({word.partOfSpeech})
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold">
                      Sai {totalWrong} lần
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                      Đúng {totalCorrect} lần
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    🇻🇳 {word.meaningVi} • <span className="text-slate-500 font-medium">{word.unit}</span>
                  </p>
                  <p className="text-xs text-slate-600">
                    🇬🇧 {word.definitionEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => speakWord(word, settings)}
                  className="p-3 rounded-2xl bg-white hover:bg-sky-50 text-sky-600 border border-slate-200 shrink-0 cursor-pointer"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
