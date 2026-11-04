import React, { useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Volume2,
  Home,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Word, SessionTurnResult, VocabSrsSettings } from '../types';
import { speakWord } from '../speech';

interface SessionSummaryViewProps {
  words: Word[];
  results: SessionTurnResult[];
  settings: VocabSrsSettings;
  onBackHome: () => void;
  onStudyMore: () => void;
}

export const SessionSummaryView: React.FC<SessionSummaryViewProps> = ({
  words,
  results,
  settings,
  onBackHome,
  onStudyMore,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore confetti error in headless mode
    }
  }, []);

  const totalTurns = results.length;
  const correctTurns = results.filter((r) => r.quality === 'correct').length;
  const hardTurns = results.filter((r) => r.quality === 'hard').length;
  const wrongTurns = results.filter((r) => r.quality === 'wrong').length;

  const accuracyPct =
    totalTurns > 0
      ? Math.round(((correctTurns + hardTurns) / totalTurns) * 100)
      : 100;

  // Tìm danh sách các từ còn hay sai hoặc phải dùng gợi ý trong buổi học
  const wordMistakeMap = new Map<string, { wrong: number; hard: number }>();
  for (const r of results) {
    if (r.quality === 'wrong' || r.quality === 'hard') {
      const prev = wordMistakeMap.get(r.wordId) || { wrong: 0, hard: 0 };
      if (r.quality === 'wrong') prev.wrong += 1;
      if (r.quality === 'hard') prev.hard += 1;
      wordMistakeMap.set(r.wordId, prev);
    }
  }

  const trickyWords = Array.from(wordMistakeMap.entries())
    .map(([wordId, counts]) => ({
      word: words.find((w) => w.id === wordId),
      ...counts,
    }))
    .filter((item): item is { word: Word; wrong: number; hard: number } => Boolean(item.word))
    .sort((a, b) => b.wrong - a.wrong || b.hard - a.hard);

  // Lời khen động viên theo kết quả
  const getPraiseMessage = () => {
    if (wrongTurns === 0 && hardTurns === 0) {
      return 'Xuất sắc tuyệt đối! 🌟 Em đã vượt qua toàn bộ các lượt thẻ mà không sai một lỗi nào!';
    }
    if (accuracyPct >= 85) {
      return 'Giỏi lắm em ơi! 🏆 Trí nhớ của em rất tuyệt vời, chỉ cần chú ý thêm một vài từ nhỏ bên dưới là hoàn hảo!';
    }
    if (accuracyPct >= 70) {
      return 'Làm tốt lắm! 💪 Em đã rất kiên trì hoàn thành buổi học. Những từ còn nhầm sẽ được nhắc lại đúng lúc để em nhớ sâu hơn nhé!';
    }
    return 'Hoan hô tinh thần chăm chỉ của em! 🌱 Học từ mới ban đầu hơi thử thách một chút, nhưng lặp lại ngắt quãng sẽ giúp em thuộc hết rất nhanh!';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-md text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg">
          <Trophy className="w-11 h-11" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Hoàn thành buổi học từ vựng!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Tổng Kết Buổi Học 🎉
          </h2>
          <p className="text-sm sm:text-base font-bold text-indigo-700 bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            {getPraiseMessage()}
          </p>
        </div>

        {/* Thống kê số lượt đúng / khó / sai */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 block">
              {correctTurns}
            </span>
            <span className="text-xs font-extrabold text-emerald-800">
              Lượt Đúng Chuẩn
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto mb-1" />
            <span className="text-2xl sm:text-3xl font-black text-amber-700 block">
              {hardTurns}
            </span>
            <span className="text-xs font-extrabold text-amber-800">
              Gần Đúng / Gợi Ý
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200">
            <XCircle className="w-6 h-6 text-rose-600 mx-auto mb-1" />
            <span className="text-2xl sm:text-3xl font-black text-rose-700 block">
              {wrongTurns}
            </span>
            <span className="text-xs font-extrabold text-rose-800">
              Lượt Cần Ôn Lại
            </span>
          </div>
        </div>

        {/* Danh sách từ còn hay sai trong buổi học */}
        {trickyWords.length > 0 && (
          <div className="text-left space-y-3 pt-2">
            <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-2">
              <span>📌 Danh sách từ em cần lưu ý thêm ({trickyWords.length} từ):</span>
            </h3>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {trickyWords.map(({ word, wrong, hard }) => (
                <div
                  key={word.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
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
                      {wrong > 0 && (
                        <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 text-xs font-extrabold">
                          Sai {wrong} lần
                        </span>
                      )}
                      {hard > 0 && (
                        <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-extrabold">
                          Khó {hard} lần
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-700 mt-0.5">
                      🇻🇳 {word.meaningVi}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      🇬🇧 {word.definitionEn}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => speakWord(word, settings)}
                    className="p-2.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-600 border border-slate-200 shrink-0 cursor-pointer"
                    title="Nghe lại phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nút điều hướng cuối buổi */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onBackHome}
            className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-base inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span>Về Trang Chủ Từ Vựng</span>
          </button>

          <button
            type="button"
            onClick={onStudyMore}
            className="flex-1 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-md inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Học Tiếp Từ Mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};
