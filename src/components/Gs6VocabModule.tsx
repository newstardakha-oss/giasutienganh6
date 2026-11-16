import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  BookOpen,
  Volume2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Headphones,
  Brain,
  Search,
  Filter,
  Sparkles,
  Check,
  X,
  AlertTriangle,
  Layers,
  ListChecks,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudySession } from '../types';
import {
  Gs6VocabEntry,
  Gs6StudentVocabProgress,
  POS_LABELS,
  POS_SHORT_BADGE,
  getAllGs6VocabEntries,
  getGs6VocabDataset,
  speakGs6Word,
  buildSamePosDistractors,
  loadStudentGs6VocabProgress,
  recordGs6WordPracticeResult,
  toggleGs6WordManualStatus,
} from '../services/gs6VocabService';
import { recordAttemptAndUpdateDailyStats } from '../services/firebaseAnalytics';
import { StudentAccount } from '../types';

interface Gs6VocabModuleProps {
  currentStudent: StudentAccount | null;
  initialUnitId?: string | null;
  onSessionCompleted?: (session: StudySession) => void;
}

type ViewMode = 'topics' | 'flashcard' | 'practice';
type PracticeType = 'meaning_mcq' | 'word_mcq' | 'spelling_audio';

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const Gs6VocabModule: React.FC<Gs6VocabModuleProps> = ({
  currentStudent,
  initialUnitId,
  onSessionCompleted,
}) => {
  const dataset = useMemo(() => getGs6VocabDataset(), []);
  const allEntries = useMemo(() => getAllGs6VocabEntries(), []);

  // Filters: Unit -> Topic -> POS -> Search -> Status
  const [selectedUnitNum, setSelectedUnitNum] = useState<number | 'all'>(() => {
    if (initialUnitId) {
      const m = initialUnitId.match(/\d+/);
      if (m) return Number(m[0]);
    }
    return 1;
  });
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'known' | 'review' | 'unlearned'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [voiceLang, setVoiceLang] = useState<'en-GB' | 'en-US'>('en-GB');

  useEffect(() => {
    if (initialUnitId) {
      const m = initialUnitId.match(/\d+/);
      if (m) {
        setSelectedUnitNum(Number(m[0]));
        setSelectedTopic('all');
      }
    }
  }, [initialUnitId]);

  const [viewMode, setViewMode] = useState<ViewMode>('topics');
  const [practiceType, setPracticeType] = useState<PracticeType>('meaning_mcq');

  // Student Progress State
  const [progress, setProgress] = useState<Gs6StudentVocabProgress>(() =>
    loadStudentGs6VocabProgress(currentStudent?.id)
  );

  useEffect(() => {
    setProgress(loadStudentGs6VocabProgress(currentStudent?.id));
  }, [currentStudent?.id]);

  useEffect(() => {
    const onUpdated = () => {
      setProgress(loadStudentGs6VocabProgress(currentStudent?.id));
    };
    window.addEventListener('gs6-vocab-progress-updated', onUpdated);
    return () => window.removeEventListener('gs6-vocab-progress-updated', onUpdated);
  }, [currentStudent?.id]);

  // Available Topics for selected Unit
  const availableTopics = useMemo(() => {
    if (selectedUnitNum === 'all') {
      const set = new Set<string>();
      dataset.units.forEach((u) => u.topics.forEach((t) => set.add(t.topic)));
      return Array.from(set);
    }
    const unitObj = dataset.units.find((u) => u.unit === selectedUnitNum);
    return unitObj ? unitObj.topics.map((t) => t.topic) : [];
  }, [dataset, selectedUnitNum]);

  // Available POS tags
  const availablePosList = useMemo(() => {
    return ['n', 'v', 'adj', 'adv', 'phr', 'phr.v'];
  }, []);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allEntries.filter((entry) => {
      if (selectedUnitNum !== 'all' && entry.unitNumber !== selectedUnitNum) return false;
      if (selectedTopic !== 'all' && entry.topic !== selectedTopic) return false;
      if (selectedPos !== 'all' && entry.pos !== selectedPos) return false;
      if (statusFilter !== 'all') {
        const st = progress.items[entry.id]?.status;
        if (statusFilter === 'known' && st !== 'known') return false;
        if (statusFilter === 'review' && st !== 'review') return false;
        if (statusFilter === 'unlearned' && st) return false;
      }
      if (q) {
        const matchWord = entry.word.toLowerCase().includes(q);
        const matchVi = entry.vi.toLowerCase().includes(q);
        const matchTopic = entry.topic.toLowerCase().includes(q);
        if (!matchWord && !matchVi && !matchTopic) return false;
      }
      return true;
    });
  }, [allEntries, selectedUnitNum, selectedTopic, selectedPos, statusFilter, searchQuery, progress.items]);

  // Words that need review (Cần ôn / hay sai) in current Unit or Global
  const reviewWordsInScope = useMemo(() => {
    return allEntries.filter((e) => {
      if (selectedUnitNum !== 'all' && e.unitNumber !== selectedUnitNum) return false;
      return progress.items[e.id]?.status === 'review';
    });
  }, [allEntries, selectedUnitNum, progress.items]);

  // Progress counts for current scope
  const scopeStats = useMemo(() => {
    const scopePool =
      selectedUnitNum === 'all'
        ? allEntries
        : allEntries.filter((e) => e.unitNumber === selectedUnitNum);
    let known = 0;
    let review = 0;
    for (const e of scopePool) {
      const st = progress.items[e.id]?.status;
      if (st === 'known') known++;
      else if (st === 'review') review++;
    }
    return {
      total: scopePool.length,
      known,
      review,
      unlearned: Math.max(0, scopePool.length - known - review),
    };
  }, [allEntries, selectedUnitNum, progress.items]);

  // ============================================================================
  // FLASHCARD STATE
  // ============================================================================
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [selectedUnitNum, selectedTopic, selectedPos, statusFilter, searchQuery]);

  const currentCard = filteredEntries[cardIndex] || null;

  const handleToggleManualStatus = (
    e: React.MouseEvent,
    entryId: string,
    status: 'known' | 'review'
  ) => {
    e.stopPropagation();
    const updated = toggleGs6WordManualStatus(currentStudent?.id, entryId, status);
    setProgress(updated);
  };

  // ============================================================================
  // PRACTICE STATE (Tự sinh bằng code 100%, không dùng AI)
  // ============================================================================
  const [practiceQueue, setPracticeQueue] = useState<Gs6VocabEntry[]>([]);
  const [practiceIdx, setPracticeIdx] = useState<number>(0);
  const [mcqOptions, setMcqOptions] = useState<Gs6VocabEntry[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [spellingInput, setSpellingInput] = useState<string>('');
  const [spellingState, setSpellingState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [practiceScore, setPracticeScore] = useState<number>(0);
  const [wrongEntriesInSession, setWrongEntriesInSession] = useState<Gs6VocabEntry[]>([]);
  const [isPracticeFinished, setIsPracticeFinished] = useState<boolean>(false);
  const [practiceStartTime, setPracticeStartTime] = useState<number>(Date.now());
  const [itemStartTime, setItemStartTime] = useState<number>(Date.now());
  const spellingInputRef = useRef<HTMLInputElement>(null);

  const startPracticeSession = useCallback(
    (customPool?: Gs6VocabEntry[], modeOverride?: PracticeType) => {
      const pool = customPool && customPool.length > 0 ? customPool : filteredEntries;
      if (pool.length === 0) return;
      const targetType = modeOverride || practiceType;
      if (modeOverride) setPracticeType(modeOverride);

      const shuffled = shuffleArray(pool).slice(0, 20); // Mỗi lượt luyện 20 câu tối ưu trên điện thoại
      setPracticeQueue(shuffled);
      setPracticeIdx(0);
      setPracticeScore(0);
      setWrongEntriesInSession([]);
      setSelectedOptionId(null);
      setSpellingInput('');
      setSpellingState('idle');
      setIsPracticeFinished(false);
      setPracticeStartTime(Date.now());
      setItemStartTime(Date.now());
      setViewMode('practice');

      if (shuffled[0]) {
        setMcqOptions(buildSamePosDistractors(shuffled[0], pool));
        if (targetType === 'spelling_audio') {
          setTimeout(() => {
            speakGs6Word(shuffled[0].word, voiceLang);
            spellingInputRef.current?.focus();
          }, 200);
        }
      }
    },
    [filteredEntries, practiceType, voiceLang]
  );

  const currentPracticeItem = practiceQueue[practiceIdx] || null;

  const recordPracticeTelemetry = (
    item: Gs6VocabEntry,
    isCorrect: boolean,
    userAnswer: string
  ) => {
    const updatedProg = recordGs6WordPracticeResult(currentStudent?.id, item.id, isCorrect);
    setProgress(updatedProg);

    if (currentStudent) {
      const durationSec = Math.max(1, Math.round((Date.now() - itemStartTime) / 1000));
      recordAttemptAndUpdateDailyStats(
        {
          studentId: currentStudent.id,
          schoolName: currentStudent.schoolName,
          communeName: currentStudent.communeName,
          provinceName: currentStudent.provinceName,
          className: currentStudent.className,
          grade: currentStudent.grade || 6,
          unitId: item.unitId,
          skill: 'vocab',
          setId: `gs6-${practiceType}`,
          itemId: item.id,
          correct: isCorrect,
          score: isCorrect ? 1 : 0,
          answer: userAnswer,
          durationSec,
        },
        currentStudent.id
      );
    }
  };

  const advancePracticeQuestion = (nextScore: number, totalCount: number) => {
    if (practiceIdx < practiceQueue.length - 1) {
      const nextIdx = practiceIdx + 1;
      const nextItem = practiceQueue[nextIdx];
      setPracticeIdx(nextIdx);
      setSelectedOptionId(null);
      setSpellingInput('');
      setSpellingState('idle');
      setItemStartTime(Date.now());
      setMcqOptions(buildSamePosDistractors(nextItem, filteredEntries));

      if (practiceType === 'spelling_audio' && nextItem) {
        setTimeout(() => {
          speakGs6Word(nextItem.word, voiceLang);
          spellingInputRef.current?.focus();
        }, 200);
      }
    } else {
      setIsPracticeFinished(true);
      const scorePct = totalCount > 0 ? Math.round((nextScore / totalCount) * 100) : 0;
      if (scorePct >= 80) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      }
      if (onSessionCompleted) {
        const elapsedSec = Math.max(5, Math.round((Date.now() - practiceStartTime) / 1000));
        const unitIdStr =
          selectedUnitNum === 'all' ? 'unit-1' : `unit-${selectedUnitNum}`;
        const unitObj =
          dataset.units.find((u) => u.unit === selectedUnitNum) || dataset.units[0];
        onSessionCompleted({
          id: `gs6-vocab-${Date.now()}`,
          unitId: unitIdStr,
          unitTitle: `Unit ${unitObj.unit}: ${unitObj.title}`,
          skill: 'Vocabulary',
          score: scorePct,
          totalQuestions: totalCount,
          correctAnswers: nextScore,
          timeSpentSeconds: elapsedSec,
          date: new Date().toISOString(),
          xpEarned: nextScore * 5 + 10,
        });
      }
    }
  };

  const handleSelectMcqOption = (opt: Gs6VocabEntry) => {
    if (selectedOptionId || !currentPracticeItem) return;
    setSelectedOptionId(opt.id);
    const isCorrect = opt.id === currentPracticeItem.id;
    const nextScore = isCorrect ? practiceScore + 1 : practiceScore;
    if (isCorrect) {
      setPracticeScore(nextScore);
      speakGs6Word(currentPracticeItem.word, voiceLang);
    } else {
      setWrongEntriesInSession((prev) =>
        prev.some((x) => x.id === currentPracticeItem.id)
          ? prev
          : [...prev, currentPracticeItem]
      );
    }

    recordPracticeTelemetry(
      currentPracticeItem,
      isCorrect,
      practiceType === 'meaning_mcq' ? opt.vi : opt.word
    );

    setTimeout(() => {
      advancePracticeQuestion(nextScore, practiceQueue.length);
    }, 1200);
  };

  const handleSpellingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPracticeItem || spellingState !== 'idle' || !spellingInput.trim()) return;

    const cleanUser = spellingInput.trim().replace(/\s+/g, ' ').toLowerCase();
    const cleanTarget = currentPracticeItem.word.trim().replace(/\s+/g, ' ').toLowerCase();
    const isCorrect = cleanUser === cleanTarget;
    const nextScore = isCorrect ? practiceScore + 1 : practiceScore;

    if (isCorrect) {
      setSpellingState('correct');
      setPracticeScore(nextScore);
    } else {
      setSpellingState('wrong');
      setWrongEntriesInSession((prev) =>
        prev.some((x) => x.id === currentPracticeItem.id)
          ? prev
          : [...prev, currentPracticeItem]
      );
      speakGs6Word(currentPracticeItem.word, voiceLang);
    }

    recordPracticeTelemetry(currentPracticeItem, isCorrect, spellingInput.trim());

    setTimeout(() => {
      advancePracticeQuestion(nextScore, practiceQueue.length);
    }, 1500);
  };

  // Group filtered entries by Unit -> Topic for the 'topics' view
  const groupedByUnitAndTopic = useMemo(() => {
    const unitMap = new Map<
      number,
      {
        unitNumber: number;
        unitTitle: string;
        topics: Map<string, Gs6VocabEntry[]>;
      }
    >();

    for (const entry of filteredEntries) {
      let uGroup = unitMap.get(entry.unitNumber);
      if (!uGroup) {
        uGroup = {
          unitNumber: entry.unitNumber,
          unitTitle: entry.unitTitle,
          topics: new Map(),
        };
        unitMap.set(entry.unitNumber, uGroup);
      }
      const tList = uGroup.topics.get(entry.topic) || [];
      tList.push(entry);
      uGroup.topics.set(entry.topic, tList);
    }

    return Array.from(unitMap.values()).map((u) => ({
      unitNumber: u.unitNumber,
      unitTitle: u.unitTitle,
      topics: Array.from(u.topics.entries()).map(([topicName, words]) => ({
        topicName,
        words,
      })),
    }));
  }, [filteredEntries]);

  return (
    <div className="space-y-5">
      {/* Thanh thống kê nhanh & Gợi ý ôn lại từ sai */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase block">
            Tổng số mục từ
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {scopeStats.total} từ
          </span>
          <span className="text-[11px] font-semibold text-slate-500 block">
            {selectedUnitNum === 'all' ? 'Toàn bộ 12 Unit (761 từ)' : `Trong Unit ${selectedUnitNum}`}
          </span>
        </div>

        <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200 shadow-2xs">
          <span className="text-[11px] font-extrabold text-emerald-800 uppercase block">
            Từ đã thuộc
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-700">
            {scopeStats.known} / {scopeStats.total}
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 block">
            Đạt {scopeStats.total > 0 ? Math.round((scopeStats.known / scopeStats.total) * 100) : 0}%
          </span>
        </div>

        <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200 shadow-2xs">
          <span className="text-[11px] font-extrabold text-amber-900 uppercase block">
            Từ cần ôn lại
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-700">
            {scopeStats.review} từ
          </span>
          <span className="text-[11px] font-semibold text-amber-800 block">
            Từ làm sai hoặc đánh dấu ôn
          </span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-slate-600 uppercase block">
            Giọng đọc trình duyệt
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <button
              type="button"
              onClick={() => setVoiceLang('en-GB')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                voiceLang === 'en-GB'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              🇬🇧 Anh-Anh
            </button>
            <button
              type="button"
              onClick={() => setVoiceLang('en-US')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                voiceLang === 'en-US'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              🇺🇸 Anh-Mỹ
            </button>
          </div>
        </div>
      </div>

      {/* Gợi ý ôn tập từ sai nếu có */}
      {reviewWordsInScope.length > 0 && (
        <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-amber-950">
                Gợi ý ôn tập: Em có {reviewWordsInScope.length} từ cần ôn lại (từ từng trả lời sai hoặc đánh dấu Cần ôn)
              </h3>
              <p className="text-xs text-amber-800 font-medium">
                {reviewWordsInScope
                  .slice(0, 6)
                  .map((w) => w.word)
                  .join(', ')}
                {reviewWordsInScope.length > 6 ? '...' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => startPracticeSession(reviewWordsInScope, 'meaning_mcq')}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold cursor-pointer whitespace-nowrap shadow-2xs"
            >
              Ôn ngay {reviewWordsInScope.length} từ này →
            </button>
          </div>
        </div>
      )}

      {/* Bộ lọc Tìm kiếm + Unit + Chủ đề + Loại từ (pos) + Chuyển chế độ */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Tìm kiếm */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <label className="text-[11px] font-extrabold text-slate-600 block mb-1">
              Tìm từ / nghĩa tiếng Việt
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="VD: school bag, cặp sách..."
                className="w-full pl-9 pr-7 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Chọn Unit */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-600 block mb-1">
              Unit (Bài học)
            </label>
            <select
              value={selectedUnitNum}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                setSelectedUnitNum(val);
                setSelectedTopic('all');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">Tất cả 12 Unit (761 từ)</option>
              {dataset.units.map((u) => (
                <option key={u.unit} value={u.unit}>
                  Unit {u.unit}: {u.title}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn Chủ đề (Topic) */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-600 block mb-1">
              Chủ đề (Topic)
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">Tất cả chủ đề ({availableTopics.length})</option>
              {availableTopics.map((tp) => (
                <option key={tp} value={tp}>
                  {tp}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn Loại từ (pos) */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-600 block mb-1">
              Loại từ (POS)
            </label>
            <select
              value={selectedPos}
              onChange={(e) => setSelectedPos(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">Tất cả loại từ</option>
              {availablePosList.map((pos) => (
                <option key={pos} value={pos}>
                  {POS_LABELS[pos] || pos}
                </option>
              ))}
            </select>
          </div>

          {/* Trạng thái thuộc */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-600 block mb-1">
              Trạng thái học
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">Tất cả ({filteredEntries.length} từ)</option>
              <option value="unlearned">Chưa học</option>
              <option value="known">Đã thuộc</option>
              <option value="review">Cần ôn lại</option>
            </select>
          </div>
        </div>

        {/* Chuyển đổi 3 chế độ hiển thị: Danh sách theo Chủ đề | Flashcard | Luyện tập tự sinh */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('topics')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'topics'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ListChecks className="w-4 h-4" />
              <span>Danh mục theo Unit → Chủ đề ({filteredEntries.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('flashcard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Thẻ Flashcard (Lật thẻ & Nghe IPA)</span>
            </button>

            <button
              type="button"
              onClick={() => startPracticeSession(filteredEntries, practiceType)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'practice'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Luyện tập (3 chế độ tự sinh)</span>
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-500">
            Nguồn: {dataset.meta.source}
          </span>
        </div>
      </div>

      {/* KHU VỰC HIỂN THỊ CHÍNH */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-2">
          <Filter className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800">
            Không tìm thấy mục từ nào phù hợp bộ lọc
          </h3>
          <p className="text-xs text-slate-500">
            Em hãy thử đổi Unit, Chủ đề, Loại từ hoặc xóa từ khóa tìm kiếm nhé!
          </p>
        </div>
      ) : (
        <>
          {/* =================================================================
              CHẾ ĐỘ 1: RENDER THEO UNIT -> CHỦ ĐỀ (BẢNG TỪ VỰNG THÂN THIỆN MOBILE)
              ================================================================= */}
          {viewMode === 'topics' && (
            <div className="space-y-6">
              {groupedByUnitAndTopic.map((unitGroup) => (
                <div
                  key={unitGroup.unitNumber}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-teal-800 to-emerald-700 px-4 sm:px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-100 block">
                        Global Success 6 • Vocabulary Learn
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold">
                        Unit {unitGroup.unitNumber}: {unitGroup.unitTitle}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUnitNum(unitGroup.unitNumber);
                          setViewMode('flashcard');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-extrabold cursor-pointer"
                      >
                        Lật Flashcard Unit {unitGroup.unitNumber}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const unitPool = allEntries.filter(
                            (e) => e.unitNumber === unitGroup.unitNumber
                          );
                          startPracticeSession(unitPool, 'meaning_mcq');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold cursor-pointer"
                      >
                        Luyện tập Unit {unitGroup.unitNumber}
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-200">
                    {unitGroup.topics.map((topicGroup) => (
                      <div key={topicGroup.topicName} className="p-4 sm:p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm sm:text-base font-extrabold text-teal-900 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
                            <span>Chủ đề: {topicGroup.topicName}</span>
                            <span className="text-xs font-bold text-slate-500">
                              ({topicGroup.words.length} từ)
                            </span>
                          </h4>
                          <button
                            type="button"
                            onClick={() =>
                              startPracticeSession(topicGroup.words, 'meaning_mcq')
                            }
                            className="text-xs font-extrabold text-teal-700 hover:text-teal-900 underline cursor-pointer"
                          >
                            Luyện chủ đề này →
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {topicGroup.words.map((item) => {
                            const itemStatus = progress.items[item.id]?.status;
                            const posBadge = POS_SHORT_BADGE[item.pos] || {
                              label: item.pos,
                              className: 'bg-slate-100 text-slate-700 border-slate-300',
                            };

                            return (
                              <div
                                key={item.id}
                                className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                                  itemStatus === 'known'
                                    ? 'bg-emerald-50/50 border-emerald-200'
                                    : itemStatus === 'review'
                                    ? 'bg-amber-50/60 border-amber-300'
                                    : 'bg-slate-50/70 border-slate-200 hover:border-teal-300'
                                }`}
                              >
                                <div className="min-w-0 flex-1 space-y-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <button
                                      type="button"
                                      onClick={() => speakGs6Word(item.word, voiceLang)}
                                      className="w-7 h-7 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center justify-center shrink-0 cursor-pointer"
                                      title="Nghe phát âm"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                    <span className="font-extrabold text-sm text-slate-900 break-words">
                                      {item.word}
                                    </span>
                                    <span
                                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${posBadge.className}`}
                                    >
                                      {item.pos}
                                    </span>
                                  </div>
                                  <div className="text-xs font-mono text-slate-500 pl-8">
                                    {item.ipa}
                                  </div>
                                  <div className="text-xs font-bold text-slate-800 pl-8">
                                    {item.vi}
                                  </div>
                                </div>

                                {/* Nút đánh dấu Đã thuộc / Cần ôn */}
                                <div className="flex flex-col gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleToggleManualStatus(e, item.id, 'known')
                                    }
                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold border cursor-pointer transition-all ${
                                      itemStatus === 'known'
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-emerald-50'
                                    }`}
                                    title="Đánh dấu Đã thuộc"
                                  >
                                    ✓ Thuộc
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleToggleManualStatus(e, item.id, 'review')
                                    }
                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold border cursor-pointer transition-all ${
                                      itemStatus === 'review'
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                                    }`}
                                    title="Đánh dấu Cần ôn lại"
                                  >
                                    ↻ Cần ôn
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================================================
              CHẾ ĐỘ 2: FLASHCARD (MẶT TRƯỚC: TỪ + IPA; MẶT SAU: LOẠI TỪ + NGHĨA VIỆT)
              ================================================================= */}
          {viewMode === 'flashcard' && currentCard && (
            <div className="max-w-lg mx-auto space-y-5 py-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 px-1">
                <span>
                  Thẻ {cardIndex + 1} / {filteredEntries.length} • Unit {currentCard.unitNumber} ({currentCard.topic})
                </span>
                <span className="text-teal-700">
                  Chạm vào thẻ để lật mặt trước / mặt sau
                </span>
              </div>

              <div
                onClick={() => setIsFlipped((f) => !f)}
                className="relative w-full min-h-[320px] sm:min-h-[360px] rounded-3xl bg-white border-2 border-teal-200 shadow-md p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all hover:shadow-lg"
              >
                {/* Góc trên trái: Nút nghe phát âm speechSynthesis */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakGs6Word(currentCard.word, voiceLang);
                  }}
                  className="absolute top-4 left-4 px-3.5 py-2 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 inline-flex items-center gap-1.5 text-xs font-extrabold cursor-pointer shadow-2xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe ({voiceLang})</span>
                </button>

                {/* Góc trên phải: Nhãn Chủ đề */}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold">
                  {currentCard.topic}
                </span>

                {!isFlipped ? (
                  /* MẶT TRƯỚC: Từ tiếng Anh + IPA */
                  <div className="space-y-4 my-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600 block">
                      Mặt trước • Từ tiếng Anh & Phiên âm IPA
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {currentCard.word}
                    </h3>
                    <p className="text-lg sm:text-xl font-mono font-bold text-teal-700 bg-teal-50 px-4 py-1.5 rounded-2xl inline-block border border-teal-100">
                      {currentCard.ipa}
                    </p>
                    <p className="text-xs font-bold text-slate-400 pt-2">
                      👆 Chạm vào thẻ để xem Loại từ & Nghĩa tiếng Việt
                    </p>
                  </div>
                ) : (
                  /* MẶT SAU: Loại từ (pos) + Nghĩa tiếng Việt (vi) */
                  <div className="space-y-4 my-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                      Mặt sau • Loại từ & Nghĩa tiếng Việt
                    </span>
                    <div>
                      <span
                        className={`inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold border ${
                          POS_SHORT_BADGE[currentCard.pos]?.className ||
                          'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        {POS_LABELS[currentCard.pos] || currentCard.pos}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {currentCard.vi}
                    </h3>
                    <div className="pt-2 text-xs font-bold text-slate-500">
                      {currentCard.word} <span className="font-mono">{currentCard.ipa}</span>
                    </div>
                  </div>
                )}

                {/* Nút đánh dấu Đã thuộc / Cần ôn ngay dưới chân thẻ */}
                <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => handleToggleManualStatus(e, currentCard.id, 'known')}
                    className={`flex-1 max-w-[160px] py-2.5 px-4 rounded-2xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                      progress.items[currentCard.id]?.status === 'known'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã thuộc</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleToggleManualStatus(e, currentCard.id, 'review')}
                    className={`flex-1 max-w-[160px] py-2.5 px-4 rounded-2xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                      progress.items[currentCard.id]?.status === 'review'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Cần ôn lại</span>
                  </button>
                </div>
              </div>

              {/* Điều hướng Trước / Sau */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={cardIndex === 0}
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((i) => Math.max(0, i - 1));
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white border border-slate-300 font-extrabold text-xs sm:text-sm text-slate-800 disabled:opacity-40 inline-flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Từ trước</span>
                </button>
                <button
                  type="button"
                  disabled={cardIndex >= filteredEntries.length - 1}
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((i) => Math.min(filteredEntries.length - 1, i + 1));
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm disabled:opacity-40 inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Từ tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =================================================================
              CHẾ ĐỘ 3: LUYỆN TẬP TỰ SINH BẰNG CODE (KHÔNG DÙNG AI)
              1. Chọn nghĩa đúng (4 đáp án cùng loại từ pos)
              2. Chọn từ theo nghĩa (4 đáp án cùng loại từ pos)
              3. Gõ chính tả theo phát âm
              ================================================================= */}
          {viewMode === 'practice' && (
            <div className="max-w-2xl mx-auto space-y-5">
              {/* Chọn dạng luyện tập */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => startPracticeSession(filteredEntries, 'meaning_mcq')}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    practiceType === 'meaning_mcq'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  1. Chọn nghĩa đúng (4 đáp án cùng POS)
                </button>
                <button
                  type="button"
                  onClick={() => startPracticeSession(filteredEntries, 'word_mcq')}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    practiceType === 'word_mcq'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  2. Chọn từ theo nghĩa
                </button>
                <button
                  type="button"
                  onClick={() => startPracticeSession(filteredEntries, 'spelling_audio')}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    practiceType === 'spelling_audio'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  3. Nghe phát âm & Gõ chính tả
                </button>
              </div>

              {isPracticeFinished ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 text-center space-y-5 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Hoàn thành lượt luyện tập từ vựng! 🎉
                    </h3>
                    <p className="text-sm font-bold text-slate-600">
                      Kết quả:{' '}
                      <strong className="text-emerald-700 text-lg">
                        {practiceScore} / {practiceQueue.length}
                      </strong>{' '}
                      câu đúng (
                      {practiceQueue.length > 0
                        ? Math.round((practiceScore / practiceQueue.length) * 100)
                        : 0}
                      %)
                    </p>
                  </div>

                  {wrongEntriesInSession.length > 0 && (
                    <div className="text-left bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                      <p className="text-xs font-extrabold text-amber-950">
                        📌 Các từ làm sai đã được tự động lưu vào danh sách "Cần ôn lại" ({wrongEntriesInSession.length} từ):
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {wrongEntriesInSession.map((w) => (
                          <div
                            key={w.id}
                            className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs"
                          >
                            <div>
                              <strong className="text-slate-900">{w.word}</strong>{' '}
                              <span className="text-slate-500">({w.pos})</span>:{' '}
                              <span className="text-amber-900 font-bold">{w.vi}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => speakGs6Word(w.word, voiceLang)}
                              className="p-1.5 rounded-lg bg-amber-100 text-amber-900 cursor-pointer"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {wrongEntriesInSession.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          startPracticeSession(wrongEntriesInSession, practiceType)
                        }
                        className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm cursor-pointer shadow-xs"
                      >
                        Ôn lại ngay {wrongEntriesInSession.length} từ vừa sai
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => startPracticeSession(filteredEntries, practiceType)}
                      className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm cursor-pointer shadow-xs"
                    >
                      Luyện tập lượt mới
                    </button>
                  </div>
                </div>
              ) : (
                currentPracticeItem && (
                  <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                    {/* Tiến độ câu */}
                    <div className="flex items-center justify-between text-xs font-extrabold text-slate-600">
                      <span>
                        Câu {practiceIdx + 1} / {practiceQueue.length} • Unit{' '}
                        {currentPracticeItem.unitNumber} ({currentPracticeItem.topic})
                      </span>
                      <span className="text-emerald-700">
                        Đúng: {practiceScore}/{practiceIdx + (selectedOptionId || spellingState !== 'idle' ? 1 : 0)}
                      </span>
                    </div>

                    {/* Đề bài theo từng dạng */}
                    {practiceType === 'meaning_mcq' && (
                      <>
                        <div className="bg-teal-50/70 rounded-2xl p-6 text-center border border-teal-100 space-y-2">
                          <span className="text-[11px] font-extrabold uppercase text-teal-700 block">
                            Chọn nghĩa tiếng Việt đúng (Nhiễu cùng loại từ:{' '}
                            {POS_LABELS[currentPracticeItem.pos] || currentPracticeItem.pos})
                          </span>
                          <div className="flex items-center justify-center gap-2">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                              {currentPracticeItem.word}
                            </h3>
                            <button
                              type="button"
                              onClick={() =>
                                speakGs6Word(currentPracticeItem.word, voiceLang)
                              }
                              className="p-2 rounded-xl bg-teal-600 text-white cursor-pointer"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm font-mono font-bold text-teal-800">
                            {currentPracticeItem.ipa}{' '}
                            <span className="font-sans text-xs px-2 py-0.5 rounded bg-white border border-teal-200">
                              {currentPracticeItem.pos}
                            </span>
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {mcqOptions.map((opt) => {
                            const isSelected = selectedOptionId === opt.id;
                            const isCorrect = opt.id === currentPracticeItem.id;
                            const showResult = selectedOptionId !== null;

                            let cls =
                              'p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between ';
                            if (!showResult) {
                              cls +=
                                'bg-slate-50 hover:bg-teal-50 border-slate-200 hover:border-teal-300 text-slate-900';
                            } else if (isCorrect) {
                              cls += 'bg-emerald-50 border-emerald-500 text-emerald-950';
                            } else if (isSelected) {
                              cls += 'bg-rose-50 border-rose-500 text-rose-950';
                            } else {
                              cls += 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                            }

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled={showResult}
                                onClick={() => handleSelectMcqOption(opt)}
                                className={cls}
                              >
                                <div>
                                  <span className="block font-extrabold">{opt.vi}</span>
                                  <span className="text-[11px] text-slate-500">
                                    Loại từ: ({opt.pos})
                                  </span>
                                </div>
                                {showResult && isCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                )}
                                {showResult && isSelected && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {practiceType === 'word_mcq' && (
                      <>
                        <div className="bg-indigo-50/70 rounded-2xl p-6 text-center border border-indigo-100 space-y-2">
                          <span className="text-[11px] font-extrabold uppercase text-indigo-700 block">
                            Chọn từ tiếng Anh khớp với nghĩa (Cùng loại từ:{' '}
                            {POS_LABELS[currentPracticeItem.pos] || currentPracticeItem.pos})
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                            {currentPracticeItem.vi}
                          </h3>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-indigo-200 text-xs font-extrabold text-indigo-800">
                            Loại từ: ({currentPracticeItem.pos})
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {mcqOptions.map((opt) => {
                            const isSelected = selectedOptionId === opt.id;
                            const isCorrect = opt.id === currentPracticeItem.id;
                            const showResult = selectedOptionId !== null;

                            let cls =
                              'p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between ';
                            if (!showResult) {
                              cls +=
                                'bg-slate-50 hover:bg-indigo-50 border-slate-200 hover:border-indigo-300 text-slate-900';
                            } else if (isCorrect) {
                              cls += 'bg-emerald-50 border-emerald-500 text-emerald-950';
                            } else if (isSelected) {
                              cls += 'bg-rose-50 border-rose-500 text-rose-950';
                            } else {
                              cls += 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                            }

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled={showResult}
                                onClick={() => handleSelectMcqOption(opt)}
                                className={cls}
                              >
                                <div>
                                  <span className="block font-extrabold text-base">
                                    {opt.word}
                                  </span>
                                  <span className="text-xs font-mono text-slate-500">
                                    {opt.ipa} ({opt.pos})
                                  </span>
                                </div>
                                {showResult && isCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                )}
                                {showResult && isSelected && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {practiceType === 'spelling_audio' && (
                      <form onSubmit={handleSpellingSubmit} className="space-y-4">
                        <div className="bg-sky-50/80 rounded-2xl p-6 text-center border border-sky-200 space-y-3">
                          <span className="text-[11px] font-extrabold uppercase text-sky-800 block">
                            Nghe phát âm & Gõ chính tả từ tiếng Anh
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              speakGs6Word(currentPracticeItem.word, voiceLang)
                            }
                            className="w-16 h-16 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center mx-auto shadow-md cursor-pointer"
                            title="Bấm để nghe phát âm"
                          >
                            <Headphones className="w-8 h-8" />
                          </button>
                          <div className="space-y-1">
                            <p className="text-base sm:text-lg font-extrabold text-slate-900">
                              Nghĩa: {currentPracticeItem.vi}
                            </p>
                            <p className="text-xs font-mono font-bold text-sky-800">
                              Phiên âm: {currentPracticeItem.ipa} • Loại từ: ({currentPracticeItem.pos})
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <input
                            ref={spellingInputRef}
                            type="text"
                            value={spellingInput}
                            onChange={(e) => setSpellingInput(e.target.value)}
                            disabled={spellingState !== 'idle'}
                            placeholder="Gõ từ tiếng Anh em nghe được..."
                            className={`w-full px-4 py-3.5 rounded-2xl border-2 text-center text-lg font-extrabold focus:outline-none ${
                              spellingState === 'correct'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                : spellingState === 'wrong'
                                ? 'bg-rose-50 border-rose-500 text-rose-900'
                                : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                            }`}
                          />

                          {spellingState === 'wrong' && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center text-xs font-extrabold text-rose-900">
                              Đáp án đúng là:{' '}
                              <span className="text-base underline">
                                {currentPracticeItem.word}
                              </span>{' '}
                              ({currentPracticeItem.ipa})
                            </div>
                          )}

                          {spellingState === 'correct' && (
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs font-extrabold text-emerald-900 flex items-center justify-center gap-1.5">
                              <Check className="w-4 h-4" />
                              <span>Chính xác! {currentPracticeItem.word}</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={!spellingInput.trim() || spellingState !== 'idle'}
                            className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-extrabold text-sm cursor-pointer shadow-xs"
                          >
                            Kiểm tra chính tả
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
