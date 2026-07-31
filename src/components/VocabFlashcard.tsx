import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  BookOpen, Volume2, RotateCcw, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Headphones, Brain, Pen, Sparkles, ArrowLeft,
  Check, X
} from 'lucide-react';
import { getAllVocabByUnit, VocabItem } from '../services/vocabService';
import { SgkUnit } from '../types';
import confetti from 'canvas-confetti';

interface VocabFlashcardProps {
  units: SgkUnit[];
  onBack: () => void;
}

type Mode = 'browse' | 'quiz' | 'dictation';
type KnownState = Record<string | number, 'known' | 'review'>;

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
};

export const VocabFlashcard: React.FC<VocabFlashcardProps> = ({ units, onBack }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units[0]?.id || '');
  const [vocabData, setVocabData] = useState<VocabItem[]>([]);
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [mode, setMode] = useState<Mode>('browse');
  const [knownStatus, setKnownStatus] = useState<KnownState>({});

  // Browse Mode State
  const [browseIndex, setBrowseIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz Mode State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState<VocabItem[]>([]);
  const [quizSelectedId, setQuizSelectedId] = useState<string | number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledQuizVocab, setShuffledQuizVocab] = useState<VocabItem[]>([]);

  // Dictation Mode State
  const [dictIndex, setDictIndex] = useState(0);
  const [dictInput, setDictInput] = useState('');
  const [dictAttempts, setDictAttempts] = useState(0);
  const [dictStatus, setDictStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [dictScore, setDictScore] = useState(0);
  const [isDictFinished, setIsDictFinished] = useState(false);
  const dictInputRef = useRef<HTMLInputElement>(null);

  // Load Vocab Data
  useEffect(() => {
    if (selectedUnitId) {
      try {
        const data = getAllVocabByUnit(selectedUnitId);
        setVocabData(data || []);
        setSelectedPart('all');
        setKnownStatus({});
      } catch (error) {
        console.error('Failed to load vocab:', error);
        setVocabData([]);
      }
    }
  }, [selectedUnitId]);

  const parts = useMemo(() => {
    const uniqueParts = Array.from(new Set(vocabData.map(v => v.part).filter(Boolean)));
    return ['all', ...uniqueParts];
  }, [vocabData]);

  const filteredVocab = useMemo(() => {
    if (selectedPart === 'all') return vocabData;
    return vocabData.filter(v => v.part === selectedPart);
  }, [vocabData, selectedPart]);

  // Handle Mode Change
  useEffect(() => {
    if (mode === 'browse') {
      setBrowseIndex(0);
      setIsFlipped(false);
    } else if (mode === 'quiz') {
      startQuiz();
    } else if (mode === 'dictation') {
      startDictation();
    }
  }, [mode, filteredVocab]);

  const startQuiz = useCallback(() => {
    if (filteredVocab.length === 0) return;
    const shuffled = shuffleArray(filteredVocab);
    setShuffledQuizVocab(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizSelectedId(null);
    setIsQuizFinished(false);
    generateQuizOptions(shuffled[0], filteredVocab);
  }, [filteredVocab]);

  const startDictation = useCallback(() => {
    if (filteredVocab.length === 0) return;
    setDictIndex(0);
    setDictInput('');
    setDictAttempts(0);
    setDictStatus('idle');
    setDictScore(0);
    setIsDictFinished(false);
  }, [filteredVocab]);

  const generateQuizOptions = (correctItem: VocabItem, allItems: VocabItem[]) => {
    if (!correctItem) return;
    const others = allItems.filter(item => item.id !== correctItem.id);
    const shuffledOthers = shuffleArray(others);
    const wrongOptions = shuffledOthers.slice(0, 3);
    setQuizOptions(shuffleArray([correctItem, ...wrongOptions]));
  };

  // Browse Mode Handlers
  const handleNextBrowse = () => {
    if (browseIndex < filteredVocab.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setBrowseIndex(prev => prev + 1), 150);
    }
  };
  const handlePrevBrowse = () => {
    if (browseIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setBrowseIndex(prev => prev - 1), 150);
    }
  };
  const toggleKnown = (e: React.MouseEvent, id: string | number, status: 'known' | 'review') => {
    e.stopPropagation();
    setKnownStatus(prev => ({
      ...prev,
      [id]: prev[id] === status ? undefined : status // Toggle off if already set
    } as KnownState));
  };

  // Quiz Mode Handlers
  const handleQuizAnswer = (id: string | number) => {
    if (quizSelectedId) return; // Prevent double click
    setQuizSelectedId(id);
    const currentItem = shuffledQuizVocab[quizIndex];
    if (id === currentItem.id) {
      setQuizScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#34D399']
      });
    }

    setTimeout(() => {
      if (quizIndex < shuffledQuizVocab.length - 1) {
        setQuizIndex(prev => prev + 1);
        setQuizSelectedId(null);
        generateQuizOptions(shuffledQuizVocab[quizIndex + 1], filteredVocab);
      } else {
        setIsQuizFinished(true);
      }
    }, 1500);
  };

  // Dictation Mode Handlers
  const handleDictSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dictStatus === 'correct' || !dictInput.trim()) return;

    const currentItem = filteredVocab[dictIndex];
    if (dictInput.trim().toLowerCase() === currentItem.word.toLowerCase()) {
      setDictStatus('correct');
      setDictScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3B82F6', '#60A5FA']
      });
      setTimeout(() => {
        if (dictIndex < filteredVocab.length - 1) {
          setDictIndex(prev => prev + 1);
          setDictInput('');
          setDictAttempts(0);
          setDictStatus('idle');
          setTimeout(() => dictInputRef.current?.focus(), 100);
        } else {
          setIsDictFinished(true);
        }
      }, 1500);
    } else {
      setDictStatus('wrong');
      setDictAttempts(prev => prev + 1);
      setTimeout(() => setDictStatus('idle'), 1000);
    }
  };

  const handleSkipDictation = () => {
    if (dictIndex < filteredVocab.length - 1) {
      setDictIndex(prev => prev + 1);
      setDictInput('');
      setDictAttempts(0);
      setDictStatus('idle');
      setTimeout(() => dictInputRef.current?.focus(), 100);
    } else {
      setIsDictFinished(true);
    }
  };

  const knownCount = Object.values(knownStatus).filter(s => s === 'known').length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-center justify-between neu-card bg-white/70 p-4 sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="neu-btn p-2 flex items-center text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline font-medium">Quay lại</span>
        </button>
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Thẻ Từ Vựng
        </h2>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Controls */}
      <div className="neu-card bg-white p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">Chọn Unit</label>
            <div className="relative">
              <select 
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 font-medium text-gray-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.title}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">Phần (Part)</label>
            <div className="relative">
              <select 
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
                className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 font-medium text-gray-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
              >
                {parts.map(part => (
                  <option key={part} value={part}>
                    {part === 'all' ? 'Tất cả các phần' : part}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => setMode('browse')}
            className={`flex-1 min-w-[100px] neu-btn py-3 px-2 flex flex-col items-center justify-center gap-1 transition-all ${
              mode === 'browse' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner' : 'text-gray-600'
            }`}
          >
            <BookOpen className={`w-6 h-6 ${mode === 'browse' ? 'text-indigo-600' : ''}`} />
            <span className="text-sm font-medium">Xem Thẻ</span>
          </button>
          
          <button
            onClick={() => setMode('quiz')}
            className={`flex-1 min-w-[100px] neu-btn py-3 px-2 flex flex-col items-center justify-center gap-1 transition-all ${
              mode === 'quiz' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-inner' : 'text-gray-600'
            }`}
          >
            <Brain className={`w-6 h-6 ${mode === 'quiz' ? 'text-emerald-600' : ''}`} />
            <span className="text-sm font-medium">Kiểm Tra</span>
          </button>
          
          <button
            onClick={() => setMode('dictation')}
            className={`flex-1 min-w-[100px] neu-btn py-3 px-2 flex flex-col items-center justify-center gap-1 transition-all ${
              mode === 'dictation' ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-inner' : 'text-gray-600'
            }`}
          >
            <Pen className={`w-6 h-6 ${mode === 'dictation' ? 'text-blue-600' : ''}`} />
            <span className="text-sm font-medium">Nghe & Viết</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredVocab.length === 0 ? (
        <div className="neu-card bg-white p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700">Chưa có từ vựng nào</h3>
          <p className="text-gray-500 max-w-sm">
            Không tìm thấy từ vựng nào trong phần này. Vui lòng chọn Unit hoặc Phần khác nhé!
          </p>
        </div>
      ) : (
        <div className="min-h-[400px]">
          {/* MODE: BROWSE */}
          {mode === 'browse' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <span className="font-semibold text-gray-600 bg-white/50 px-4 py-1.5 rounded-full shadow-sm">
                  Thẻ {browseIndex + 1} / {filteredVocab.length}
                </span>
                <span className="font-semibold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full shadow-sm">
                  Đã nhớ: {knownCount}/{filteredVocab.length}
                </span>
              </div>
              
              <div className="relative w-full max-w-md mx-auto h-[380px] [perspective:1000px] cursor-pointer group"
                   onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`w-full h-full duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                  
                  {/* Front: English */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] neu-card-blue flex flex-col items-center justify-center p-8 text-center border-b-4 border-blue-200">
                    <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
                      {filteredVocab[browseIndex].part}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); speak(filteredVocab[browseIndex].word); }}
                      className="absolute top-4 left-4 p-3 bg-white/50 hover:bg-white rounded-full text-blue-600 transition-colors shadow-sm"
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>
                    
                    <h3 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight drop-shadow-sm">
                      {filteredVocab[browseIndex].word}
                    </h3>
                    <p className="text-xl text-blue-600 font-medium font-mono bg-white/60 px-4 py-1 rounded-xl">
                      {filteredVocab[browseIndex].phonetic}
                    </p>
                    <span className="mt-4 inline-block bg-white/80 text-gray-600 font-semibold px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                      ({filteredVocab[browseIndex].type})
                    </span>
                    
                    <div className="absolute bottom-6 flex gap-3">
                      <button 
                        onClick={(e) => toggleKnown(e, filteredVocab[browseIndex].id, 'known')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
                          knownStatus[filteredVocab[browseIndex].id] === 'known' 
                          ? 'bg-emerald-500 text-white shadow-md' 
                          : 'bg-white text-gray-500 hover:bg-emerald-50'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Đã nhớ
                      </button>
                      <button 
                        onClick={(e) => toggleKnown(e, filteredVocab[browseIndex].id, 'review')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
                          knownStatus[filteredVocab[browseIndex].id] === 'review' 
                          ? 'bg-amber-500 text-white shadow-md' 
                          : 'bg-white text-gray-500 hover:bg-amber-50'
                        }`}
                      >
                        <RotateCcw className="w-5 h-5" />
                        Cần ôn lại
                      </button>
                    </div>
                  </div>
                  
                  {/* Back: Vietnamese */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] neu-card-purple flex flex-col items-center justify-center p-6 md:p-8 text-center overflow-y-auto border-b-4 border-purple-200">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-purple-200 pb-4 w-full">
                      {filteredVocab[browseIndex].meaning}
                    </h3>
                    
                    {filteredVocab[browseIndex].example_en && (
                      <div className="w-full text-left bg-white/60 p-4 rounded-2xl mb-4 shadow-sm">
                        <p className="text-lg font-medium text-gray-800 mb-2 italic flex items-start gap-2">
                           <span className="text-purple-400 mt-1">"</span>
                           {filteredVocab[browseIndex].example_en}
                           <span className="text-purple-400 mt-1">"</span>
                        </p>
                        {filteredVocab[browseIndex].example_vi && (
                          <p className="text-gray-600 border-t border-purple-100 pt-2 text-sm">
                            {filteredVocab[browseIndex].example_vi}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <p className="text-sm text-purple-600/80 font-medium absolute bottom-4">
                      Chạm để quay lại
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-6 mt-8">
                <button 
                  onClick={handlePrevBrowse}
                  disabled={browseIndex === 0}
                  className="neu-btn p-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white"
                >
                  <ChevronLeft className="w-8 h-8 text-gray-700" />
                </button>
                <div className="flex gap-2">
                   {/* Indicator dots (max 5) */}
                   {Array.from({ length: Math.min(5, filteredVocab.length) }).map((_, i) => {
                     let dotIndex = browseIndex;
                     if (filteredVocab.length > 5) {
                       if (browseIndex < 2) dotIndex = i;
                       else if (browseIndex > filteredVocab.length - 3) dotIndex = filteredVocab.length - 5 + i;
                       else dotIndex = browseIndex - 2 + i;
                     } else {
                       dotIndex = i;
                     }
                     return (
                       <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${
                         dotIndex === browseIndex ? 'w-8 bg-indigo-500' : 'w-2.5 bg-gray-300'
                       }`} />
                     );
                   })}
                </div>
                <button 
                  onClick={handleNextBrowse}
                  disabled={browseIndex === filteredVocab.length - 1}
                  className="neu-btn p-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white"
                >
                  <ChevronRight className="w-8 h-8 text-gray-700" />
                </button>
              </div>
            </div>
          )}

          {/* MODE: QUIZ */}
          {mode === 'quiz' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {isQuizFinished ? (
                <div className="neu-card bg-white p-8 text-center space-y-6">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Hoàn thành bài kiểm tra!</h3>
                  <p className="text-xl text-gray-600">
                    Điểm của bạn: <span className="font-bold text-emerald-600">{quizScore}</span> / {shuffledQuizVocab.length}
                  </p>
                  <button 
                    onClick={startQuiz}
                    className="neu-btn-primary px-8 py-4 font-bold text-lg w-full max-w-xs mx-auto flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Làm lại
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3 max-w-[200px]">
                      <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500" 
                           style={{ width: `${(quizIndex / shuffledQuizVocab.length) * 100}%` }}></div>
                    </div>
                    <span className="font-bold text-gray-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                      Câu {quizIndex + 1}/{shuffledQuizVocab.length}
                    </span>
                  </div>
                  
                  <div className="neu-card bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center border-2 border-emerald-100">
                    <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2 block">
                      Chọn từ tiếng Anh đúng
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 py-4">
                      {shuffledQuizVocab[quizIndex]?.meaning}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quizOptions.map((option) => {
                      const isSelected = quizSelectedId === option.id;
                      const isCorrect = option.id === shuffledQuizVocab[quizIndex]?.id;
                      const showResult = quizSelectedId !== null;
                      
                      let btnClass = "neu-btn bg-white hover:bg-gray-50 text-left p-4 min-h-[80px] flex items-center justify-between border-2 border-transparent";
                      if (showResult) {
                        if (isCorrect) btnClass = "neu-btn bg-emerald-50 border-emerald-500 text-emerald-800 p-4 min-h-[80px] flex items-center justify-between";
                        else if (isSelected) btnClass = "neu-btn bg-red-50 border-red-500 text-red-800 p-4 min-h-[80px] flex items-center justify-between";
                        else btnClass = "neu-btn bg-white opacity-50 p-4 min-h-[80px] flex items-center justify-between border-2 border-transparent";
                      }
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleQuizAnswer(option.id)}
                          disabled={showResult}
                          className={btnClass}
                        >
                          <div>
                            <span className="text-xl font-bold block">{option.word}</span>
                            <span className="text-sm text-gray-500 font-medium">({option.type})</span>
                          </div>
                          {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>
                  
                  {quizSelectedId !== null && (
                    <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 animate-fade-in">
                      <p className="font-bold text-blue-800 mb-1">Giải thích:</p>
                      <p className="text-blue-900">
                        <span className="font-bold">{shuffledQuizVocab[quizIndex].word}</span> = {shuffledQuizVocab[quizIndex].meaning}
                      </p>
                      {shuffledQuizVocab[quizIndex].example_en && (
                        <p className="text-sm text-blue-700 mt-2 italic">
                          "{shuffledQuizVocab[quizIndex].example_en}"
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* MODE: DICTATION */}
          {mode === 'dictation' && (
            <div className="max-w-xl mx-auto space-y-6">
              {isDictFinished ? (
                <div className="neu-card bg-white p-8 text-center space-y-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Headphones className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Hoàn thành bài nghe!</h3>
                  <p className="text-xl text-gray-600">
                    Điểm của bạn: <span className="font-bold text-blue-600">{dictScore}</span> / {filteredVocab.length}
                  </p>
                  <button 
                    onClick={startDictation}
                    className="neu-btn-primary px-8 py-4 font-bold text-lg w-full max-w-xs mx-auto flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Nghe lại
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3 max-w-[200px]">
                      <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                           style={{ width: `${(dictIndex / filteredVocab.length) * 100}%` }}></div>
                    </div>
                    <span className="font-bold text-gray-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                      Từ {dictIndex + 1}/{filteredVocab.length}
                    </span>
                  </div>

                  <div className="neu-card bg-white p-8 text-center flex flex-col items-center">
                    <button 
                      onClick={() => speak(filteredVocab[dictIndex].word)}
                      className="w-20 h-20 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center mb-6 transition-colors shadow-inner"
                    >
                      <Volume2 className="w-10 h-10" />
                    </button>
                    
                    <p className="text-gray-500 font-medium mb-4">
                      Nhấn loa để nghe và gõ lại từ vựng
                    </p>
                    
                    {dictAttempts >= 2 && (
                      <div className="mb-6 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl animate-fade-in">
                        <p className="text-sm font-bold text-amber-800 mb-1">Gợi ý:</p>
                        <p className="text-lg font-mono text-amber-700">{filteredVocab[dictIndex].phonetic}</p>
                        <p className="text-sm text-amber-700 mt-1">{filteredVocab[dictIndex].meaning}</p>
                      </div>
                    )}

                    <form onSubmit={handleDictSubmit} className="w-full relative">
                      <input
                        ref={dictInputRef}
                        type="text"
                        value={dictInput}
                        onChange={(e) => setDictInput(e.target.value)}
                        placeholder="Nhập từ tiếng Anh..."
                        className={`w-full px-6 py-4 text-xl md:text-2xl font-bold text-center bg-gray-50 border-2 rounded-2xl outline-none transition-all shadow-inner ${
                          dictStatus === 'correct' ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 
                          dictStatus === 'wrong' ? 'border-red-500 text-red-700 bg-red-50 animate-shake' : 
                          'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100'
                        }`}
                        autoFocus
                        disabled={dictStatus === 'correct'}
                      />
                      
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {dictStatus === 'correct' && <Check className="w-8 h-8 text-emerald-500" />}
                        {dictStatus === 'wrong' && <X className="w-8 h-8 text-red-500" />}
                      </div>
                    </form>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={handleSkipDictation}
                      className="flex-1 neu-btn bg-gray-100 text-gray-700 py-3 font-bold"
                    >
                      Bỏ qua
                    </button>
                    <button 
                      onClick={handleDictSubmit}
                      disabled={!dictInput.trim() || dictStatus === 'correct'}
                      className="flex-[2] neu-btn-primary py-3 font-bold disabled:opacity-50"
                    >
                      Kiểm tra
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
