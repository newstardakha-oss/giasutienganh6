import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { playSound, startBgMusic, stopBgMusic } from '../utils/soundEffects';
import { Shield, Swords, Heart, Zap, Trophy, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface CastleConquestProps {
  questions: Question[];
  onGameEnd?: (winner: string, score: number) => void;
  onBackToMenu: () => void;
}

interface TeamState {
  id: string;
  name: string;
  color: string;
  hp: number;
  maxHp: number;
  streak: number;
  shield: boolean;
  score: number;
}

export const CastleConquest: React.FC<CastleConquestProps> = ({
  questions,
  onGameEnd,
  onBackToMenu,
}) => {
  const [teams, setTeams] = useState<TeamState[]>([
    { id: '1', name: 'Rồng Xanh 🐉', color: 'from-blue-600 to-cyan-500', hp: 100, maxHp: 100, streak: 0, shield: false, score: 0 },
    { id: '2', name: 'Phượng Hoàng 🦅', color: 'from-rose-600 to-amber-500', hp: 100, maxHp: 100, streak: 0, shield: false, score: 0 },
  ]);
  const [currentTeamIdx, setCurrentTeamIdx] = useState<number>(0);
  const [qIndex, setQIndex] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [winner, setWinner] = useState<TeamState | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  const currentQ = questions[qIndex % questions.length];
  const activeTeam = teams[currentTeamIdx];

  useEffect(() => {
    startBgMusic('dramatic');
    return () => stopBgMusic();
  }, []);

  const handleAnswer = (option: string) => {
    if (showResult || winner) return;
    setSelectedOpt(option);
    setShowResult(true);

    const correct = option === currentQ.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (soundOn) playSound('correct');
      // Damage opponent
      setTeams((prevTeams) => {
        return prevTeams.map((t, idx) => {
          if (idx === currentTeamIdx) {
            const newStreak = t.streak + 1;
            const hasShield = newStreak >= 3 ? true : t.shield;
            return {
              ...t,
              streak: newStreak,
              shield: hasShield,
              score: t.score + 150,
            };
          } else {
            // Opponent takes damage
            if (t.shield) {
              return { ...t, shield: false }; // Shield breaks
            }
            const damage = 20;
            const newHp = Math.max(0, t.hp - damage);
            return { ...t, hp: newHp };
          }
        });
      });
    } else {
      if (soundOn) playSound('wrong');
      // Own team takes self damage due to miss
      setTeams((prevTeams) =>
        prevTeams.map((t, idx) =>
          idx === currentTeamIdx
            ? { ...t, hp: Math.max(0, t.hp - 10), streak: 0 }
            : t
        )
      );
    }

    setTimeout(() => {
      // Check winner
      setTeams((latestTeams) => {
        const alive = latestTeams.filter((t) => t.hp > 0);
        if (alive.length === 1) {
          setWinner(alive[0]);
          if (soundOn) playSound('victory');
          onGameEnd?.(alive[0].name, alive[0].score);
        }
        return latestTeams;
      });

      setShowResult(false);
      setSelectedOpt(null);
      setQIndex((prev) => prev + 1);
      setCurrentTeamIdx((prev) => (prev + 1) % teams.length);
    }, 1800);
  };

  const handleRestart = () => {
    setTeams([
      { id: '1', name: 'Rồng Xanh 🐉', color: 'from-blue-600 to-cyan-500', hp: 100, maxHp: 100, streak: 0, shield: false, score: 0 },
      { id: '2', name: 'Phượng Hoàng 🦅', color: 'from-rose-600 to-amber-500', hp: 100, maxHp: 100, streak: 0, shield: false, score: 0 },
    ]);
    setCurrentTeamIdx(0);
    setQIndex(0);
    setWinner(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
              🏰 Castle Conquest (Chiếm Lâu Đài)
            </h2>
            <p className="text-xs text-slate-400">Trả lời đúng để bắn đại bác phá Lâu đài đối thủ!</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={onBackToMenu}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
          >
            Thoát
          </button>
        </div>
      </div>

      {/* Castles Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {teams.map((t, idx) => (
          <div
            key={t.id}
            className={`p-5 rounded-2xl border transition-all ${
              idx === currentTeamIdx && !winner
                ? 'bg-slate-800 border-amber-500 shadow-xl shadow-amber-500/10 scale-102'
                : 'bg-slate-950/60 border-slate-800 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-extrabold px-3 py-1 rounded-xl bg-gradient-to-r ${t.color} text-white shadow-md`}>
                {t.name}
              </span>
              <div className="flex items-center gap-2">
                {t.shield && (
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/40 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Khiên Khiên
                  </span>
                )}
                {t.streak >= 2 && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/40 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Streak x{t.streak}
                  </span>
                )}
              </div>
            </div>

            {/* HP Bar */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" /> HP Lâu Đài
                </span>
                <span className="font-mono">{t.hp} / {t.maxHp} HP</span>
              </div>
              <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    t.hp > 50 ? 'bg-emerald-500' : t.hp > 20 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${(t.hp / t.maxHp) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-right text-[11px] text-slate-400">Điểm: {t.score}</p>
          </div>
        ))}
      </div>

      {/* Winner Overlay */}
      {winner ? (
        <div className="p-8 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-3xl border border-amber-500/40 text-center animate-in zoom-in-95">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-3xl font-extrabold text-amber-300">{winner.name} CHIẾN THẮNG!</h3>
          <p className="text-sm text-slate-300 mt-2">Đã hạ gục Lâu đài đối thủ với tổng {winner.score} điểm!</p>
          <button
            onClick={handleRestart}
            className="mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-xl transition-all"
          >
            Chơi Trận Mới
          </button>
        </div>
      ) : (
        /* Question Card */
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30">
              Lượt bắn của {activeTeam.name}
            </span>
            <span className="text-xs text-slate-400">{currentQ.skill} • {currentQ.difficulty}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
            {currentQ.content}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {currentQ.options?.map((opt, i) => {
              let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
              if (showResult) {
                if (opt === currentQ.correctAnswer) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                } else if (opt === selectedOpt) {
                  btnStyle = 'bg-rose-600 text-white border-rose-500';
                }
              }
              return (
                <button
                  key={i}
                  disabled={showResult}
                  onClick={() => handleAnswer(opt)}
                  className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  <span className="text-xs opacity-60 font-mono">[{String.fromCharCode(65 + i)}]</span>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div
              className={`p-4 rounded-2xl text-xs flex items-center gap-3 animate-in fade-in ${
                isCorrect ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300' : 'bg-rose-950/80 border border-rose-700 text-rose-300'
              }`}
            >
              <Sparkles className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold">{isCorrect ? 'BẮN TRÚNG! Lâu đài đối thủ bị nổ -20 HP!' : 'BẮN TRÚỢT! Pháo bị giật lùi -10 HP!'}</p>
                <p className="mt-0.5 opacity-90">{currentQ.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
