import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { playSound, startBgMusic, stopBgMusic } from '../utils/soundEffects';
import { Trophy, RefreshCw, Volume2, VolumeX, Shield, Swords, Sparkles, AlertCircle } from 'lucide-react';

interface CaroQuizProps {
  questions: Question[];
  onGameEnd?: (winner: string, score: number) => void;
  onBackToMenu: () => void;
}

export const CaroQuiz: React.FC<CaroQuizProps> = ({
  questions,
  onGameEnd,
  onBackToMenu,
}) => {
  const GRID_SIZE = 5;
  const [board, setBoard] = useState<Array<string | null>>(Array(GRID_SIZE * GRID_SIZE).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X'); // X: Đội Xanh, O: Đội Đỏ / AI
  const [isAiMode, setIsAiMode] = useState<boolean>(false);
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  
  // Current active question modal state
  const [currentQ, setCurrentQ] = useState<Question | null>(null);
  const [qIndex, setQIndex] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  useEffect(() => {
    startBgMusic('march');
    return () => stopBgMusic();
  }, []);

  const checkWinner = (currentBoard: Array<string | null>): string | null => {
    const size = GRID_SIZE;
    const WIN_COUNT = 4; // 4 in a row to win 5x5 board

    // Helper to get cell at (r, c)
    const getCell = (r: number, c: number) => {
      if (r < 0 || r >= size || c < 0 || c >= size) return null;
      return currentBoard[r * size + c];
    };

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const symbol = getCell(r, c);
        if (!symbol) continue;

        // Check Horizontal
        let count = 1;
        for (let i = 1; i < WIN_COUNT; i++) {
          if (getCell(r, c + i) === symbol) count++;
        }
        if (count === WIN_COUNT) return symbol;

        // Check Vertical
        count = 1;
        for (let i = 1; i < WIN_COUNT; i++) {
          if (getCell(r + i, c) === symbol) count++;
        }
        if (count === WIN_COUNT) return symbol;

        // Check Diagonal Down-Right
        count = 1;
        for (let i = 1; i < WIN_COUNT; i++) {
          if (getCell(r + i, c + i) === symbol) count++;
        }
        if (count === WIN_COUNT) return symbol;

        // Check Diagonal Down-Left
        count = 1;
        for (let i = 1; i < WIN_COUNT; i++) {
          if (getCell(r + i, c - i) === symbol) count++;
        }
        if (count === WIN_COUNT) return symbol;
      }
    }

    if (currentBoard.every((cell) => cell !== null)) return 'Draw';
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] !== null || winner || currentQ) return;
    setSelectedCell(index);
    // Pick next question
    const q = questions[qIndex % questions.length];
    setCurrentQ(q);
    setSelectedOpt(null);
    setShowResult(false);
  };

  const handleAnswerSubmit = (option: string) => {
    if (!currentQ || selectedCell === null || showResult) return;
    setSelectedOpt(option);
    setShowResult(true);

    const correct = option === currentQ.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (soundOn) playSound('correct');
      const newBoard = [...board];
      newBoard[selectedCell] = turn;
      setBoard(newBoard);

      if (turn === 'X') setScoreX((prev) => prev + 100);
      else setScoreO((prev) => prev + 100);

      const win = checkWinner(newBoard);
      if (win) {
        setWinner(win);
        if (soundOn) playSound('victory');
        onGameEnd?.(win === 'X' ? 'Đội Xanh' : win === 'O' ? 'Đội Đỏ' : 'Hòa', win === 'X' ? scoreX + 100 : scoreO + 100);
      } else {
        setTurn(turn === 'X' ? 'O' : 'X');
      }
    } else {
      if (soundOn) playSound('wrong');
      // Missed turn
      setTurn(turn === 'X' ? 'O' : 'X');
    }

    setTimeout(() => {
      setCurrentQ(null);
      setSelectedCell(null);
      setQIndex((prev) => prev + 1);

      // AI turn if in AI mode and turn changed to O
      if (isAiMode && turn === 'X' && correct) { // wait, if X answered correct, turn became O
        // Trigger AI move
        setTimeout(() => triggerAiMove(), 600);
      }
    }, 1800);
  };

  const triggerAiMove = () => {
    const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter((v) => v !== null) as number[];
    if (emptyIndices.length === 0 || winner) return;

    const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...board];
    newBoard[randomIdx] = 'O';
    setBoard(newBoard);
    setScoreO((prev) => prev + 100);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      if (soundOn) playSound('victory');
    } else {
      setTurn('X');
    }
  };

  const handleRestart = () => {
    setBoard(Array(GRID_SIZE * GRID_SIZE).fill(null));
    setTurn('X');
    setWinner(null);
    setScoreX(0);
    setScoreO(0);
    setCurrentQ(null);
    setSelectedCell(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              🎲 Caro Quiz Đối Kháng
            </h2>
            <p className="text-xs text-slate-400">Trả lời đúng câu hỏi Tiếng Anh để đánh ô Caro!</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAiMode(!isAiMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isAiMode
                ? 'bg-purple-600/30 border-purple-500/50 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {isAiMode ? '🤖 Chế độ BOT AI' : '👥 Chế độ 2 Đội'}
          </button>

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

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
            turn === 'X' && !winner
              ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10'
              : 'bg-slate-800/60 border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
              X
            </div>
            <div>
              <p className="text-xs text-blue-400 font-semibold">ĐỘI XANH</p>
              <p className="text-lg font-bold">{scoreX} Điểm</p>
            </div>
          </div>
          {turn === 'X' && !winner && <span className="text-xs px-2.5 py-1 bg-blue-500/30 text-blue-300 rounded-full animate-pulse">Lượt đi</span>}
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
            turn === 'O' && !winner
              ? 'bg-rose-600/20 border-rose-500 shadow-lg shadow-rose-500/10'
              : 'bg-slate-800/60 border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
              O
            </div>
            <div>
              <p className="text-xs text-rose-400 font-semibold">{isAiMode ? 'BOT AI' : 'ĐỘI ĐỎ'}</p>
              <p className="text-lg font-bold">{scoreO} Điểm</p>
            </div>
          </div>
          {turn === 'O' && !winner && <span className="text-xs px-2.5 py-1 bg-rose-500/30 text-rose-300 rounded-full animate-pulse">Lượt đi</span>}
        </div>
      </div>

      {/* Caro Board 5x5 */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-5 gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-inner">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              disabled={cell !== null || winner !== null}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl font-black text-2xl sm:text-3xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                cell === 'X'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : cell === 'O'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-transparent border border-slate-700'
              }`}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className="p-6 bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-emerald-500/20 rounded-2xl border border-amber-500/40 text-center animate-in zoom-in-95">
          <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-2 animate-bounce" />
          <h3 className="text-2xl font-bold text-amber-300">
            {winner === 'X' ? '🎉 ĐỘI XANH THẮNG CUỘC!' : winner === 'O' ? '🎉 ĐỘI ĐỎ THẮNG CUỘC!' : '🤝 HÒA NHAU!'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">Chúc mừng các chiến binh học tập!</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
          >
            Chơi Ván Mới
          </button>
        </div>
      )}

      {/* Question Modal */}
      {currentQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/30">
                {currentQ.skill} • {currentQ.difficulty}
              </span>
              <span className="text-xs text-slate-400">Lượt: {turn === 'X' ? 'Đội Xanh' : 'Đội Đỏ'}</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {currentQ.content}
            </h4>

            {/* Options */}
            <div className="space-y-2.5 mb-4">
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
                    onClick={() => handleAnswerSubmit(opt)}
                    className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="text-xs opacity-60 font-mono">[{String.fromCharCode(65 + i)}]</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Result Feedback */}
            {showResult && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in ${
                  isCorrect ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                }`}
              >
                {isCorrect ? <Sparkles className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                <div>
                  <p className="font-bold">{isCorrect ? 'Chính xác! Được đánh ô!' : 'Chưa đúng! Mất lượt đi.'}</p>
                  <p className="mt-1 opacity-90">{currentQ.explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
