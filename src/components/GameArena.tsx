import React, { useState } from 'react';
import { Question, SgkUnit } from '../types';
import { CaroQuiz } from '../games/CaroQuiz';
import { CastleConquest } from '../games/CastleConquest';
import { RaceToFinish } from '../games/RaceToFinish';
import { Swords, Gamepad2, Trophy, Flame, Play, Sparkles } from 'lucide-react';

interface GameArenaProps {
  questions: Question[];
  units: SgkUnit[];
  onSessionCompleted?: (score: number, correct: number, total: number) => void;
}

export const GameArena: React.FC<GameArenaProps> = ({
  questions,
  units,
  onSessionCompleted,
}) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');

  const filteredQuestions =
    selectedUnitId === 'all'
      ? questions
      : questions.filter((q) => q.unitId === selectedUnitId);

  const handleGameEnd = (winner: string, score: number) => {
    onSessionCompleted?.(score, Math.round((score / 500) * 10), 10);
  };

  if (selectedGame === 'caro') {
    return (
      <CaroQuiz
        questions={filteredQuestions}
        onGameEnd={handleGameEnd}
        onBackToMenu={() => setSelectedGame(null)}
      />
    );
  }

  if (selectedGame === 'castle') {
    return (
      <CastleConquest
        questions={filteredQuestions}
        onGameEnd={handleGameEnd}
        onBackToMenu={() => setSelectedGame(null)}
      />
    );
  }

  if (selectedGame === 'race') {
    return (
      <RaceToFinish
        questions={filteredQuestions}
        onGameEnd={handleGameEnd}
        onBackToMenu={() => setSelectedGame(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 border border-indigo-500/30 shadow-2xl text-white">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-0" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/40 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Đấu Trường Tri Thức Tiếng Anh 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            🎮 Trung Tâm Game Học Tập Đối Kháng
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Vừa chơi game kịch tính vừa ôn tập kiến thức SGK Tiếng Anh 6 Global Success. Thách đấu bạn bè hoặc BOT AI ngay!
          </p>

          {/* Unit Filter */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <label className="text-xs font-semibold text-slate-300">Chọn Bài Học (Unit):</label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất Cả Bài Học (Units 1 - 12)</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  Unit {u.unitNumber}: {u.title}
                </option>
              ))}
            </select>
            <span className="text-xs text-indigo-300 bg-indigo-950/60 px-3 py-2 rounded-xl border border-indigo-800/60 font-mono">
              {filteredQuestions.length} câu hỏi khả dụng
            </span>
          </div>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Game 1: Caro Quiz */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🎲
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Caro Quiz Đối Kháng
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Bàn Caro 5x5 quen thuộc. Trả lời đúng câu hỏi Tiếng Anh để chọn ô X/O. Đạt 4 ô liên tiếp trước để giành chiến thắng!
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg text-[11px] font-semibold">
                👥 2 Đội / BOT AI
              </span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[11px] font-semibold">
                ⏱️ 5-10 phút
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedGame('caro')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" /> VÀO GAME CARO
          </button>
        </div>

        {/* Game 2: Castle Conquest */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🏰
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Castle Conquest (Chiếm Lâu Đài)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Mỗi đội sở hữu 1 Lâu đài 100 HP. Trả lời đúng để nạp đại bác bắn vỡ Lâu đài đối thủ. Có khiên phòng thủ và chiêu streak!
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg text-[11px] font-semibold">
                ⚔️ Chiếm Lâu Đài
              </span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[11px] font-semibold">
                🛡️ Hồi HP & Khiên
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedGame('castle')}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" /> VÀO GAME LÂU ĐÀI
          </button>
        </div>

        {/* Game 3: Race to Finish */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🏃
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Race to Finish (Đua Tri Thức)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Đường đua 30 ô vượt chướng ngại vật. Dẫm ô 🚀 Boost để tăng tốc +3 ô hoặc vượt 🕳️ Hố bẫy để về đích trước tiên!
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg text-[11px] font-semibold">
                🚀 Tăng Tốc & Ô Thưởng
              </span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[11px] font-semibold">
                🏆 Top 1 Về Đích
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedGame('race')}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" /> VÀO GAME ĐUA ĐƯỜNG TRƯỜNG
          </button>
        </div>
      </div>
    </div>
  );
};
