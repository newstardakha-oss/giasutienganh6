import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { playSound, startBgMusic, stopBgMusic } from '../utils/soundEffects';
import { Trophy, Rocket, AlertTriangle, Gift, Volume2, VolumeX, Sparkles, Flag } from 'lucide-react';

interface RaceToFinishProps {
  questions: Question[];
  onGameEnd?: (winner: string, score: number) => void;
  onBackToMenu: () => void;
}

interface Runner {
  id: string;
  name: string;
  avatar: string;
  color: string;
  position: number; // 0 to 30
  score: number;
}

export const RaceToFinish: React.FC<RaceToFinishProps> = ({
  questions,
  onGameEnd,
  onBackToMenu,
}) => {
  const TRACK_LENGTH = 30;
  const [runners, setRunners] = useState<Runner[]>([
    { id: '1', name: 'Đội Thỏ Ngọc 🐰', avatar: '🐰', color: 'bg-pink-500', position: 0, score: 0 },
    { id: '2', name: 'Đội Rùa Thần 🐢', avatar: '🐢', color: 'bg-emerald-500', position: 0, score: 0 },
  ]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [qIndex, setQIndex] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [winner, setWinner] = useState<Runner | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [eventMessage, setEventMessage] = useState<string | null>(null);

  const currentQ = questions[qIndex % questions.length];
  const activeRunner = runners[activeIdx];

  useEffect(() => {
    startBgMusic('chase');
    return () => stopBgMusic();
  }, []);

  // Tile types: Boost on cell 7, 18; Trap on 12, 22; Bonus on 15
  const getTileType = (cell: number) => {
    if (cell === 7 || cell === 18) return 'boost';
    if (cell === 12 || cell === 22) return 'trap';
    if (cell === 15) return 'bonus';
    return 'normal';
  };

  const handleAnswer = (option: string) => {
    if (showResult || winner) return;
    setSelectedOpt(option);
    setShowResult(true);

    const correct = option === currentQ.correctAnswer;
    setIsCorrect(correct);
    let msg = '';

    setRunners((prev) => {
      return prev.map((r, idx) => {
        if (idx === activeIdx) {
          let newPos = r.position;
          let newScore = r.score;

          if (correct) {
            if (soundOn) playSound('correct');
            newPos += 2;
            newScore += 100;

            // Check tile events
            const tile = getTileType(newPos);
            if (tile === 'boost') {
              newPos += 3;
              msg = '🚀 Dẫm vào Tăng Tốc! Tiến thêm +3 ô!';
              if (soundOn) playSound('boost');
            } else if (tile === 'trap') {
              newPos = Math.max(0, newPos - 2);
              msg = '🕳️ Rơi vào Hố Bẫy! Lùi -2 ô!';
            } else if (tile === 'bonus') {
              newPos += 2;
              newScore += 200;
              msg = '🎁 Ô Thưởng Đặc Biệt! +200 điểm!';
              if (soundOn) playSound('bell');
            }
          } else {
            if (soundOn) playSound('wrong');
            newPos = Math.max(0, newPos - 1);
            msg = '❌ Trả lời sai! Lùi -1 ô.';
          }

          newPos = Math.min(TRACK_LENGTH, newPos);
          return { ...r, position: newPos, score: newScore };
        }
        return r;
      });
    });

    setEventMessage(msg);

    setTimeout(() => {
      setRunners((latest) => {
        const win = latest.find((r) => r.position >= TRACK_LENGTH);
        if (win) {
          setWinner(win);
          if (soundOn) playSound('victory');
          onGameEnd?.(win.name, win.score);
        }
        return latest;
      });

      setShowResult(false);
      setSelectedOpt(null);
      setEventMessage(null);
      setQIndex((prev) => prev + 1);
      setActiveIdx((prev) => (prev + 1) % runners.length);
    }, 2000);
  };

  const handleRestart = () => {
    setRunners([
      { id: '1', name: 'Đội Thỏ Ngọc 🐰', avatar: '🐰', color: 'bg-pink-500', position: 0, score: 0 },
      { id: '2', name: 'Đội Rùa Thần 🐢', avatar: '🐢', color: 'bg-emerald-500', position: 0, score: 0 },
    ]);
    setActiveIdx(0);
    setQIndex(0);
    setWinner(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <Flag className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              🏃 Race to Finish (Đua Tri Thức)
            </h2>
            <p className="text-xs text-slate-400">Trả lời đúng để tiến về đích 30 ô thành công!</p>
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

      {/* Runners Track Progress Bars */}
      <div className="space-y-4 mb-8">
        {runners.map((r, idx) => (
          <div
            key={r.id}
            className={`p-4 rounded-2xl border transition-all ${
              idx === activeIdx && !winner
                ? 'bg-slate-800 border-emerald-500 shadow-xl shadow-emerald-500/10'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{r.avatar}</span>
                <span className="text-sm font-bold text-white">{r.name}</span>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">
                Ô {r.position} / {TRACK_LENGTH} • {r.score} Điểm
              </div>
            </div>

            {/* Track Line */}
            <div className="relative w-full h-5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${r.color}`}
                style={{ width: `${(r.position / TRACK_LENGTH) * 100}%` }}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">🏆</div>
            </div>
          </div>
        ))}
      </div>

      {/* Winner Overlay */}
      {winner ? (
        <div className="p-8 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl border border-emerald-500/40 text-center animate-in zoom-in-95">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-3xl font-extrabold text-emerald-300">{winner.name} VỀ ĐÍCH ĐẦU TIÊN!</h3>
          <p className="text-sm text-slate-300 mt-2">Tổng điểm đạt được: {winner.score} XP!</p>
          <button
            onClick={handleRestart}
            className="mt-6 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl shadow-xl transition-all"
          >
            Đua Trận Mới
          </button>
        </div>
      ) : (
        /* Question Card */
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              Lượt chạy của {activeRunner.name}
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
                <p className="font-bold">{isCorrect ? 'ĐÚNG RỒI! Tiến bước +2 ô!' : 'CHƯA ĐÚNG! Lùi -1 ô.'}</p>
                {eventMessage && <p className="text-amber-300 font-semibold mt-1">{eventMessage}</p>}
                <p className="mt-0.5 opacity-90">{currentQ.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
