import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Zap,
  Download,
  HelpCircle,
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SgkUnit, StudySession } from '../types';

interface ReadingMasteryGameProps {
  units: SgkUnit[];
  onSessionCompleted?: (session: StudySession) => void;
  onBackToPractice?: () => void;
}

const PASSAGE_SENTENCES = [
  { id: "s1", text: "Sleep plays a very important role in our health and daily life." },
  { id: "s2", text: "For Grade 6 students, getting enough sleep every night helps the body grow and stay healthy." },
  { id: "s3", text: "Experts say that children between 10 and 12 years old need about 9 to 11 hours of sleep each night." },
  { id: "s4", text: "When you sleep well, your brain has time to rest and process information from school lessons." },
  { id: "s5", text: "This makes it easier to concentrate, remember vocabulary, and solve difficult math problems the next day." },
  { id: "s6", text: "On the other hand, lack of sleep makes you feel tired, moody, and easily distracted during classes." },
  { id: "s7", text: "To have a healthy sleep routine, you should follow simple habits." },
  { id: "s8", text: "First, go to bed and wake up at the same time every day." },
  { id: "s9", text: "Second, keep your bedroom quiet, dark, and cool." },
  { id: "s10", text: "Third, avoid drinking sugary drinks or eating heavy meals before bedtime." },
  { id: "s11", text: "Finally, turn off smartphones, tablets, and TV screens at least 30 minutes before sleeping because screen light can disrupt your natural sleep cycle." },
  { id: "s12", text: "Good sleep hygiene brings energy, happiness, and academic success to every student!" }
];

const VOCAB_LIST = [
  { id: "v1", word: "health", ipa: "/helθ/", meaning: "sức khỏe", example: "Sleep plays an important role in our health.", dist: ["bệnh tật", "thói quen", "trí nhớ"] },
  { id: "v2", word: "concentrate", ipa: "/ˈkɒnsəntreɪt/", meaning: "tập trung", example: "Sleeping well helps students concentrate in class.", dist: ["xao nhãng", "xử lý", "xáo trộn"] },
  { id: "v3", word: "routine", ipa: "/ruːˈtiːn/", meaning: "thói quen hàng ngày", example: "You should have a healthy sleep routine.", dist: ["chuyên gia", "bài học", "môi trường"] },
  { id: "v4", word: "disrupt", ipa: "/dɪsˈrʌpt/", meaning: "làm gián đoạn / xáo trộn", example: "Screen light can disrupt your sleep cycle.", dist: ["phát triển", "tập trung", "giúp đỡ"] },
  { id: "v5", word: "hygiene", ipa: "/ˈhaɪdʒiːn/", meaning: "vệ sinh (giấc ngủ)", example: "Good sleep hygiene brings energy and happiness.", dist: ["học tập", "cá tính", "thức ăn"] },
  { id: "v6", word: "distracted", ipa: "/dɪˈstræktɪd/", meaning: "bị xao nhãng / mất tập trung", example: "Lack of sleep makes students easily distracted.", dist: ["khỏe mạnh", "thông minh", "vui vẻ"] },
  { id: "v7", word: "academic", ipa: "/ˌækəˈdemɪk/", meaning: "thuộc học tập / học thuật", example: "Sleep hygiene brings academic success.", dist: ["thể thao", "giải trí", "thiên nhiên"] },
  { id: "v8", word: "expert", ipa: "/ˈekspɜːt/", meaning: "chuyên gia", example: "Experts say children need 9 to 11 hours of sleep.", dist: ["học sinh", "bác sĩ", "phụ huynh"] },
  { id: "v9", word: "moody", ipa: "/ˈmuːdi/", meaning: "dễ cáu kỉnh / u sầu", example: "Lack of sleep makes you feel tired and moody.", dist: ["vui vẻ", "tự tin", "năng động"] },
  { id: "v10", word: "process", ipa: "/ˈprəʊses/", meaning: "xử lý (thông tin)", example: "Your brain needs time to process information.", dist: ["quên đi", "tạo ra", "học thuộc"] }
];

const READING_QUESTIONS = [
  {
    id: "rq1",
    type: "Ý chính (Main Idea)",
    question: "What is the main topic of the reading passage?",
    options: [
      "The importance of good sleep for health and study",
      "How to solve difficult math problems easily",
      "The history of smartphones and tablets",
      "Different kinds of bedrooms for students"
    ],
    correct: "The importance of good sleep for health and study",
    explanation: "Ý chính của bài đọc là tầm quan trọng của giấc ngủ đối với sức khỏe và việc học tập của học sinh.",
    quote: "Sleep plays a very important role in our health... Good sleep hygiene brings energy, happiness, and academic success..."
  },
  {
    id: "rq2",
    type: "Chi tiết (Detail)",
    question: "According to experts, how many hours of sleep do 10-12 year old children need each night?",
    options: ["9 to 11 hours", "6 to 8 hours", "12 to 14 hours", "5 to 7 hours"],
    correct: "9 to 11 hours",
    explanation: "Chi tiết trong bài ghi rõ học sinh 10-12 tuổi cần khoảng 9 đến 11 tiếng ngủ mỗi đêm.",
    quote: "Sentence 3: 'Experts say that children between 10 and 12 years old need about 9 to 11 hours of sleep each night.'"
  },
  {
    id: "rq3",
    type: "Từ quy chiếu (Reference)",
    question: "In sentence 5, what does the word 'This' refer to?",
    options: [
      "Having time for the brain to rest and process information",
      "Playing video games before going to bed",
      "Waking up late in the morning",
      "Drinking sugary drinks at night"
    ],
    correct: "Having time for the brain to rest and process information",
    explanation: "'This' ở đầu câu 5 thay thế cho việc bộ não có thời gian nghỉ ngơi và xử lý thông tin ở câu 4.",
    quote: "Sentence 4 & 5: '...your brain has time to rest and process information... This makes it easier to concentrate...'"
  },
  {
    id: "rq4",
    type: "Ngữ cảnh từ vựng (Vocab)",
    question: "What does the word 'concentrate' mean in the passage?",
    options: [
      "To pay full attention to something",
      "To sleep very deeply",
      "To feel tired and moody",
      "To turn off electronics"
    ],
    correct: "To pay full attention to something",
    explanation: "'Concentrate' nghĩa là tập trung chú ý vào việc học hoặc giải bài tập.",
    quote: "Sentence 5: 'This makes it easier to concentrate, remember vocabulary...'"
  },
  {
    id: "rq5",
    type: "Suy luận (Inference)",
    question: "What might happen if a student only sleeps 5 hours a night?",
    options: [
      "They will feel tired, moody, and easily distracted in class.",
      "They will solve math problems much faster.",
      "They will remember vocabulary better.",
      "They will get higher test scores automatically."
    ],
    correct: "They will feel tired, moody, and easily distracted in class.",
    explanation: "Suy luận từ bài đọc: Thiếu ngủ (chỉ ngủ 5 tiếng) sẽ khiến học sinh mệt mỏi và xao nhãng.",
    quote: "Sentence 6: 'On the other hand, lack of sleep makes you feel tired, moody, and easily distracted...'"
  },
  {
    id: "rq6",
    type: "Đúng / Sai (True / False)",
    question: "Which of the following is NOT recommended before bedtime?",
    options: [
      "Drinking sugary drinks or eating heavy meals",
      "Keeping the bedroom dark and quiet",
      "Going to bed at a regular time",
      "Turning off phone screens 30 minutes earlier"
    ],
    correct: "Drinking sugary drinks or eating heavy meals",
    explanation: "Bài đọc khuyên NÊN TRÁNH (avoid) uống nước ngọt hay ăn quá no trước khi ngủ.",
    quote: "Sentence 10: 'Third, avoid drinking sugary drinks or eating heavy meals before bedtime.'"
  },
  {
    id: "rq7",
    type: "Thời gian (Time Detail)",
    question: "How long before sleeping should you turn off phone and TV screens?",
    options: ["At least 30 minutes", "5 minutes", "2 hours", "10 minutes"],
    correct: "At least 30 minutes",
    explanation: "Nên tắt màn hình thiết bị điện tử ít nhất 30 phút trước khi đi ngủ.",
    quote: "Sentence 11: 'Finally, turn off smartphones... at least 30 minutes before sleeping...'"
  },
  {
    id: "rq8",
    type: "Thái độ tác giả (Attitude)",
    question: "What is the author's attitude towards sleep hygiene?",
    options: [
      "Encouraging and supportive of good sleep habits",
      "Uninterested and bored",
      "Negative and doubtful",
      "Strict and angry"
    ],
    correct: "Encouraging and supportive of good sleep habits",
    explanation: "Tác giả có thái độ khuyến khích, tích cực đối với việc xây dựng thói quen ngủ tốt.",
    quote: "Sentence 12: 'Good sleep hygiene brings energy, happiness, and academic success to every student!'"
  },
  {
    id: "rq9",
    type: "Chi tiết môi trường (Environment)",
    question: "How should your bedroom environment be to help you sleep well?",
    options: [
      "Quiet, dark, and cool",
      "Bright, noisy, and hot",
      "Full of electronics and TV screens",
      "Loud with music all night"
    ],
    correct: "Quiet, dark, and cool",
    explanation: "Phòng ngủ cần giữ yên tĩnh, tối và mát mẻ.",
    quote: "Sentence 9: 'Second, keep your bedroom quiet, dark, and cool.'"
  },
  {
    id: "rq10",
    type: "Tóm tắt (Summary)",
    question: "Good sleep hygiene helps students achieve which 3 things?",
    options: [
      "Energy, happiness, and academic success",
      "Money, games, and smartphones",
      "More homework, stress, and tiredness",
      "Faster running speed only"
    ],
    correct: "Energy, happiness, and academic success",
    explanation: "Vệ sinh giấc ngủ tốt mang lại năng lượng, niềm vui và thành công trong học tập.",
    quote: "Sentence 12: 'Good sleep hygiene brings energy, happiness, and academic success...'"
  }
];

export const ReadingMasteryGame: React.FC<ReadingMasteryGameProps> = ({
  units,
  onSessionCompleted,
  onBackToPractice,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'passage' | 'vocab' | 'quiz' | 'result'>('passage');
  const [speechRate, setSpeechRate] = useState<number>(0.8);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(-1);
  const [isPlayingPassage, setIsPlayingPassage] = useState<boolean>(false);

  // Quiz States
  const [vocabAnswers, setVocabAnswers] = useState<Record<string, string>>({});
  const [vocabScored, setVocabScored] = useState<Record<string, boolean>>({});

  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [readingScored, setReadingScored] = useState<Record<string, boolean>>({});

  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // SpeechSynthesis helpers
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = speechRate;
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  const handlePlayPassage = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingPassage(true);

    let idx = 0;
    const playNext = () => {
      if (idx >= PASSAGE_SENTENCES.length) {
        setIsPlayingPassage(false);
        setCurrentSentenceIdx(-1);
        return;
      }
      setCurrentSentenceIdx(idx);
      const u = new SpeechSynthesisUtterance(PASSAGE_SENTENCES[idx].text);
      u.rate = speechRate;
      u.lang = 'en-US';
      u.onend = () => {
        idx++;
        playNext();
      };
      window.speechSynthesis.speak(u);
    };

    playNext();
  };

  const handleStopPassage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingPassage(false);
    setCurrentSentenceIdx(-1);
  };

  const handleAnswerVocab = (vocabId: string, option: string, correct: string) => {
    if (vocabAnswers[vocabId]) return;

    setVocabAnswers((prev) => ({ ...prev, [vocabId]: option }));

    if (option === correct) {
      setScore((s) => s + 10);
      setVocabScored((prev) => ({ ...prev, [vocabId]: true }));
      speakText('Correct!');
    } else {
      setVocabScored((prev) => ({ ...prev, [vocabId]: false }));
      speakText('Not quite right.');
    }
  };

  const handleAnswerReading = (qId: string, option: string, correct: string) => {
    if (readingAnswers[qId]) return;

    setReadingAnswers((prev) => ({ ...prev, [qId]: option }));

    if (option === correct) {
      setScore((s) => s + 10);
      setReadingScored((prev) => ({ ...prev, [qId]: true }));
      speakText('Correct answer!');
    } else {
      setReadingScored((prev) => ({ ...prev, [qId]: false }));
      speakText('Try again!');
    }
  };

  const handleFinishGame = () => {
    setIsFinished(true);
    setActiveSubTab('result');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    if (onSessionCompleted) {
      const correctCount =
        Object.values(vocabScored).filter(Boolean).length +
        Object.values(readingScored).filter(Boolean).length;
      const totalQ = VOCAB_LIST.length + READING_QUESTIONS.length;
      const pct = Math.round((correctCount / totalQ) * 100);

      onSessionCompleted({
        id: `reading-game-${Date.now()}`,
        unitId: 'unit-12',
        unitTitle: 'Skills 1 Reading: SLEEP & HEALTH',
        skill: 'Reading',
        score: pct,
        totalQuestions: totalQ,
        correctAnswers: correctCount,
        timeSpentSeconds: 300,
        date: new Date().toISOString(),
        xpEarned: score,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <BookOpen className="w-4 h-4 text-[#38BDF8]" />
            Reading Mastery Game • Tiếng Anh 6 Skills 1
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Chủ Đề: SLEEP - Vệ Sinh Giấc Ngủ & Sức Khỏe
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Đọc bài văn chuẩn SGK, luyện phát âm AI, học 10 từ vựng trọng tâm & thử thách 10 câu đọc hiểu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tổng Điểm</span>
            <span className="text-xl font-extrabold text-[#FF9500]">{score} XP</span>
          </div>

          {onBackToPractice && (
            <button
              onClick={onBackToPractice}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              Quay Lại Kho Bài Tập
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('passage')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'passage'
              ? 'bg-[#4A90E2] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📖 1. Bài Đọc & Audio AI
        </button>

        <button
          onClick={() => setActiveSubTab('vocab')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'vocab'
              ? 'bg-[#4A90E2] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔤 2. Từ Vựng Trọng Tâm (10 Từ)
        </button>

        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'quiz'
              ? 'bg-[#4A90E2] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ❓ 3. Đọc Hiểu 10 Câu
        </button>

        <button
          onClick={() => {
            setActiveSubTab('result');
            handleFinishGame();
          }}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'result'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏆 4. Báo Cáo Kết Quả
        </button>
      </div>

      {/* SUB TAB 1: PASSAGE & AUDIO */}
      {activeSubTab === 'passage' && (
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-5">
          {/* Audio Toolbar */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {!isPlayingPassage ? (
                <button
                  onClick={handlePlayPassage}
                  className="px-4 py-2 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Nghe Bài Đọc AI
                </button>
              ) : (
                <button
                  onClick={handleStopPassage}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Square className="w-4 h-4" /> Dừng Đọc
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Tốc độ đọc:</span>
              {[0.6, 0.8, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    speechRate === rate
                      ? 'bg-blue-100 border-blue-400 text-blue-800'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Passage Text */}
          <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm leading-relaxed space-y-3">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
              The Importance of a Good Night's Sleep
            </h3>
            {PASSAGE_SENTENCES.map((s, idx) => (
              <span
                key={s.id}
                onClick={() => speakText(s.text)}
                className={`inline-block mr-1 p-1 rounded transition-colors cursor-pointer ${
                  currentSentenceIdx === idx
                    ? 'bg-amber-200 font-semibold text-slate-900 shadow-2xs'
                    : 'hover:bg-blue-100/60'
                }`}
                title="Nhấp để nghe đọc câu này"
              >
                {s.text}{' '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: VOCABULARY */}
      {activeSubTab === 'vocab' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VOCAB_LIST.map((v) => {
              const isAnswered = Boolean(vocabAnswers[v.id]);
              const isCorrect = vocabScored[v.id];

              return (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-lg font-bold text-[#4A90E2]">{v.word}</span>
                      <span className="text-xs text-amber-600 italic block">{v.ipa}</span>
                    </div>
                    <button
                      onClick={() => speakText(v.word)}
                      className="p-2 rounded-xl bg-blue-50 text-[#4A90E2] hover:bg-blue-100 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-slate-700">Nghĩa: {v.meaning}</p>
                  <p className="text-[11px] text-slate-500 italic">"{v.example}"</p>

                  {/* Options */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Chọn nghĩa đúng của từ:
                    </span>
                    {[v.meaning, ...v.dist].sort().map((opt, idx) => {
                      const isSelected = vocabAnswers[v.id] === opt;
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerVocab(v.id, opt, v.meaning)}
                          className={`w-full text-left text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                            isAnswered
                              ? opt === v.meaning
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                                : isSelected
                                ? 'bg-rose-100 border-rose-400 text-rose-900'
                                : 'bg-slate-50 border-slate-200 text-slate-500'
                              : 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB TAB 3: READING QUIZ */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-4">
          {READING_QUESTIONS.map((q, qIdx) => {
            const isAnswered = Boolean(readingAnswers[q.id]);
            const isCorrect = readingScored[q.id];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#4A90E2]">
                    Câu {qIdx + 1}/10 • Dạng bài: {q.type}
                  </span>
                  <button
                    onClick={() => speakText(q.question)}
                    className="text-xs text-slate-500 hover:text-[#4A90E2] flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe câu hỏi
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-900">{q.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = readingAnswers[q.id] === opt;
                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerReading(q.id, opt, q.correct)}
                        className={`text-left text-xs font-semibold p-3 rounded-xl border transition-all ${
                          isAnswered
                            ? opt === q.correct
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                              : isSelected
                              ? 'bg-rose-100 border-rose-400 text-rose-900'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                            : 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border border-rose-200 text-rose-900'
                    }`}
                  >
                    <p className="font-bold">
                      {isCorrect ? '✅ Đúng rồi! +10 XP' : `❌ Chưa đúng! Đáp án đúng là: ${q.correct}`}
                    </p>
                    <p className="text-[11px] text-slate-600">💡 {q.explanation}</p>
                    <p className="text-[11px] italic text-slate-500">📌 Trích dẫn: "{q.quote}"</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SUB TAB 4: RESULT REPORT */}
      {activeSubTab === 'result' && (
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-[#FF9500] flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Kết Quả Game Đọc Hiểu SLEEP & HEALTH
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bạn đã tích lũy được <span className="font-extrabold text-[#FF9500]">{score} XP</span> trong bài tập này!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Từ Vựng Đã Đúng</span>
              <span className="text-xl font-extrabold text-[#4A90E2]">
                {Object.values(vocabScored).filter(Boolean).length}/{VOCAB_LIST.length}
              </span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Đọc Hiểu Đã Đúng</span>
              <span className="text-xl font-extrabold text-emerald-600">
                {Object.values(readingScored).filter(Boolean).length}/{READING_QUESTIONS.length}
              </span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Tổng XP Đạt Được</span>
              <span className="text-xl font-extrabold text-[#FF9500]">{score} XP</span>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Xếp Loại</span>
              <span className="text-xl font-extrabold text-purple-700">
                {score >= 150 ? 'Xuất Sắc' : score >= 100 ? 'Giỏi' : 'Khá'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setScore(0);
              setVocabAnswers({});
              setVocabScored({});
              setReadingAnswers({});
              setReadingScored({});
              setActiveSubTab('passage');
            }}
            className="px-6 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs transition-all cursor-pointer"
          >
            Chơi Lại Bài Đọc
          </button>
        </div>
      )}
    </div>
  );
};
