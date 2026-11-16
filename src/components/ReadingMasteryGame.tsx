import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Layers,
  ListChecks,
  Sparkles,
  ShieldAlert,
  Check,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SgkUnit, StudySession } from '../types';
import rawReadingData from '../data/gs6_reading_data.json';

// ===== TYPES FOR GS6_READING_DATA.JSON =====
export interface GappedTextPassage {
  id: string;
  type: 'gapped_text';
  title: string;
  instruction: string;
  text: string;
  options: Record<string, string>; // A, B, C, D
  answers: Record<string, string>; // "1": "D", ...
  review_notes?: string[];
}

export interface GuidedClozeBlank {
  no: number;
  options: Record<string, string>; // a, b, c, d
  answer: string;
}

export interface GuidedClozePassage {
  id: string;
  type: 'guided_cloze';
  title: string;
  instruction: string;
  text: string;
  blanks: GuidedClozeBlank[];
  review_notes?: string[];
}

export interface MultipleChoiceExercise {
  no: number;
  type: 'multiple_choice';
  instruction: string;
  items: Array<{
    no: number;
    question: string;
    options: Record<string, string>;
    answer: string;
  }>;
}

export interface TrueFalseNotGivenExercise {
  no: number;
  type: 'true_false_not_given';
  instruction: string;
  items: Array<{
    no: number;
    statement: string;
    answer: 'T' | 'F' | 'NG';
  }>;
}

export interface SentenceCompletionExercise {
  no: number;
  type: 'sentence_completion';
  instruction: string;
  items: Array<{
    no: number;
    stem: string;
    answer: string;
  }>;
}

export interface ComprehensionQuestionsExercise {
  no: number;
  type: 'comprehension_questions';
  instruction: string;
  items: Array<{
    no: number;
    question: string;
    sample_answer: string;
  }>;
}

export interface MatchingExercise {
  no: number;
  type: 'matching';
  instruction: string;
  information: Array<{
    no: number;
    text: string;
  }>;
  descriptions: Record<string, string>; // A..E
  answers: Record<string, string>; // "1": "E", ...
}

export interface WordBoxGapFillExercise {
  no: number;
  type: 'word_box_gap_fill';
  instruction: string;
  word_box: string[];
  text: string;
  answers: Record<string, string>; // "1": "school", ...
}

export type ReadingComprehensionExercise =
  | MultipleChoiceExercise
  | TrueFalseNotGivenExercise
  | SentenceCompletionExercise
  | ComprehensionQuestionsExercise
  | MatchingExercise
  | WordBoxGapFillExercise;

export interface ReadingComprehensionPassage {
  id: string;
  type: 'reading_comprehension';
  title: string;
  text: string;
  exercises: ReadingComprehensionExercise[];
  review_notes?: string[];
}

export type ReadingPassageItem =
  | GappedTextPassage
  | GuidedClozePassage
  | ReadingComprehensionPassage;

export interface ReadingUnitData {
  unit: number;
  book: 1 | 2;
  title: string;
  source_pages_pdf?: string;
  passages: ReadingPassageItem[];
}

export interface ReadingDatasetSchema {
  meta: {
    title: string;
    source: string;
    structure: string;
    answer_policy: string;
    blank_marker: string;
    units_count: number;
    passages_count: number;
    answers_verified_against: string;
  };
  units: ReadingUnitData[];
}

const READING_DATASET = rawReadingData as unknown as ReadingDatasetSchema;

// ===== PERSISTENT PROGRESS & DRAFT STORAGE =====
export interface PassageDraftState {
  // For gapped_text & guided_cloze: blankNo -> selected option key
  blankAnswers?: Record<string, string>;
  // For reading_comprehension:
  mcq?: Record<string, string>; // itemNo -> a|b|c|d
  tfng?: Record<string, string>; // itemNo -> T|F|NG
  sentenceCompletion?: Record<string, string>; // itemNo -> typed string
  comprehensionQuestions?: Record<string, string>; // itemNo -> typed full sentence
  matching?: Record<string, string>; // infoNo -> A..E
  wordBox?: Record<string, string>; // blankNo -> word
}

export interface PassageCompletionRecord {
  passageId: string;
  unitNumber: number;
  bestScore: number;
  lastScore: number;
  maxScore: number;
  attemptsCount: number;
  exerciseBreakdown?: Record<number, { correct: number; total: number }>;
  updatedAt: string;
}

export interface StudentReadingProgressStore {
  completed: Record<string, PassageCompletionRecord>;
  drafts: Record<string, PassageDraftState>;
}

function getStorageKey(studentId?: string | null): string {
  return `gs6_reading_progress_v1_${studentId || 'guest'}`;
}

export function loadStudentReadingStore(studentId?: string | null): StudentReadingProgressStore {
  if (typeof localStorage === 'undefined') {
    return { completed: {}, drafts: {} };
  }
  try {
    const raw = localStorage.getItem(getStorageKey(studentId));
    if (!raw) return { completed: {}, drafts: {} };
    const parsed = JSON.parse(raw);
    return {
      completed: parsed.completed || {},
      drafts: parsed.drafts || {},
    };
  } catch {
    return { completed: {}, drafts: {} };
  }
}

export function saveStudentReadingStore(
  studentId: string | null | undefined,
  store: StudentReadingProgressStore
) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(studentId), JSON.stringify(store));
  } catch {
    // ignore storage quota errors
  }
}

/**
 * Chuẩn hoá câu trả lời điền từ (sentence_completion):
 * Không phân biệt hoa thường, bỏ khoảng trắng thừa và dấu chấm cuối câu.
 */
export function normalizeSentenceCompletionAnswer(raw: string): string {
  return (raw || '')
    .trim()
    .replace(/\.+$/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function getPassageMaxScore(passage: ReadingPassageItem): number {
  if (passage.type === 'gapped_text') return Object.keys(passage.answers).length; // 4
  if (passage.type === 'guided_cloze') return passage.blanks.length; // 6
  // reading_comprehension: Ex1 (5) + Ex2 (5) + Ex3 (5) + Ex5 (5) + Ex6 (5) = 25 (Ex4 không tính điểm)
  return 25;
}

const PASSAGE_TYPE_LABELS: Record<
  ReadingPassageItem['type'],
  { title: string; subtitle: string; badgeClass: string; maxPointsLabel: string }
> = {
  gapped_text: {
    title: 'Phần 1: Gapped Text (Điền câu/cụm từ vào đoạn văn)',
    subtitle: 'Chọn 4 phương án A–D khớp với 4 chỗ trống (mỗi phương án dùng đúng 1 lần)',
    badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    maxPointsLabel: '4 điểm / bài',
  },
  guided_cloze: {
    title: 'Phần 2: Guided Cloze (Đọc điền từ trắc nghiệm)',
    subtitle: 'Chọn đáp án đúng a, b, c hoặc d cho 6 chỗ trống trong đoạn văn',
    badgeClass: 'bg-teal-50 text-teal-900 border-teal-200',
    maxPointsLabel: '6 điểm / bài',
  },
  reading_comprehension: {
    title: 'Phần 3: Reading Comprehension (Đọc hiểu chuyên sâu 6 dạng bài)',
    subtitle: '5 dạng chấm tự động (25 điểm) + 1 dạng tự luận đối chiếu Đáp án mẫu',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
    maxPointsLabel: '25 điểm / bài',
  },
};

const EXERCISE_TITLES_VI: Record<ReadingComprehensionExercise['type'], string> = {
  multiple_choice: 'Dạng 1: Trắc nghiệm (Multiple Choice – 5 điểm)',
  true_false_not_given: 'Dạng 2: Đúng / Sai / Không có thông tin (T / F / NG – 5 điểm)',
  sentence_completion: 'Dạng 3: Hoàn thành câu (Sentence Completion – 5 điểm)',
  comprehension_questions: 'Dạng 4: Câu hỏi tự luận (Đối chiếu Đáp án mẫu – Không tính điểm)',
  matching: 'Dạng 5: Nối thông tin (Matching A–E – 5 điểm)',
  word_box_gap_fill: 'Dạng 6: Điền từ từ hộp từ (Word Box Gap Fill – 5 điểm)',
};

interface ReadingMasteryGameProps {
  units: SgkUnit[];
  initialUnitId?: string | null;
  currentStudentId?: string | null;
  isTeacherLoggedIn?: boolean;
  onSessionCompleted?: (session: StudySession) => void;
  onBackToPractice?: () => void;
}

export const ReadingMasteryGame: React.FC<ReadingMasteryGameProps> = ({
  initialUnitId,
  currentStudentId,
  isTeacherLoggedIn = false,
  onSessionCompleted,
}) => {
  const datasetUnits = READING_DATASET.units;

  // Determine initial unit number (1..12) from initialUnitId (e.g. "unit-4" -> 4)
  const initialUnitNumber = useMemo(() => {
    if (!initialUnitId) return null;
    const m = /^unit-(\d+)$/i.exec(initialUnitId.trim());
    if (m) {
      const n = Number(m[1]);
      if (n >= 1 && n <= 12) return n;
    }
    return null;
  }, [initialUnitId]);

  const [selectedBookFilter, setSelectedBookFilter] = useState<'all' | 1 | 2>('all');
  const [selectedUnitNo, setSelectedUnitNo] = useState<number | null>(initialUnitNumber);
  const [selectedPassageId, setSelectedPassageId] = useState<string | null>(null);
  const [activeBlankFocus, setActiveBlankFocus] = useState<string | null>(null);
  const [activeRcExNo, setActiveRcExNo] = useState<number | 'all'>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAllTeacherNotesModal, setShowAllTeacherNotesModal] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<number>(() => Date.now());

  // Persistent student reading progress store
  const [readingStore, setReadingStore] = useState<StudentReadingProgressStore>(() =>
    loadStudentReadingStore(currentStudentId)
  );

  useEffect(() => {
    setReadingStore(loadStudentReadingStore(currentStudentId));
  }, [currentStudentId]);

  useEffect(() => {
    if (initialUnitNumber) {
      setSelectedUnitNo(initialUnitNumber);
      setSelectedPassageId(null);
      setIsSubmitted(false);
    }
  }, [initialUnitNumber]);

  const currentUnitObj = useMemo(
    () => datasetUnits.find((u) => u.unit === selectedUnitNo) || null,
    [datasetUnits, selectedUnitNo]
  );

  const currentPassage = useMemo(() => {
    if (!currentUnitObj || !selectedPassageId) return null;
    return currentUnitObj.passages.find((p) => p.id === selectedPassageId) || null;
  }, [currentUnitObj, selectedPassageId]);

  // Current draft for the active passage
  const currentDraft: PassageDraftState = useMemo(() => {
    if (!selectedPassageId) return {};
    return readingStore.drafts[selectedPassageId] || {};
  }, [readingStore.drafts, selectedPassageId]);

  const updateDraft = (updater: (prev: PassageDraftState) => PassageDraftState) => {
    if (!selectedPassageId || isSubmitted) return;
    setReadingStore((prev) => {
      const existing = prev.drafts[selectedPassageId] || {};
      const nextDraft = updater(existing);
      const nextStore: StudentReadingProgressStore = {
        ...prev,
        drafts: {
          ...prev.drafts,
          [selectedPassageId]: nextDraft,
        },
      };
      saveStudentReadingStore(currentStudentId, nextStore);
      return nextStore;
    });
  };

  // Helper to check if a draft has any user input
  const hasAnyDraftInput = (passageId: string): boolean => {
    const d = readingStore.drafts[passageId];
    if (!d) return false;
    return (
      Object.keys(d.blankAnswers || {}).length > 0 ||
      Object.keys(d.mcq || {}).length > 0 ||
      Object.keys(d.tfng || {}).length > 0 ||
      Object.values(d.sentenceCompletion || {}).some((v) => v.trim().length > 0) ||
      Object.values(d.comprehensionQuestions || {}).some((v) => v.trim().length > 0) ||
      Object.keys(d.matching || {}).length > 0 ||
      Object.keys(d.wordBox || {}).length > 0
    );
  };

  // Compute score and breakdown for currentPassage + currentDraft
  const evaluation = useMemo(() => {
    if (!currentPassage) return null;

    if (currentPassage.type === 'gapped_text') {
      const answers = currentPassage.answers;
      let correct = 0;
      const total = Object.keys(answers).length;
      const byBlank: Record<string, { user: string; expected: string; isCorrect: boolean }> = {};
      for (const [blankNo, expectedOpt] of Object.entries(answers)) {
        const userOpt = currentDraft.blankAnswers?.[blankNo] || '';
        const isCorrect = userOpt.toUpperCase() === expectedOpt.toUpperCase();
        if (isCorrect) correct++;
        byBlank[blankNo] = { user: userOpt, expected: expectedOpt, isCorrect };
      }
      return {
        score: correct,
        maxScore: total,
        byBlank,
        exerciseScores: {} as Record<number, { correct: number; total: number }>,
      };
    }

    if (currentPassage.type === 'guided_cloze') {
      let correct = 0;
      const total = currentPassage.blanks.length;
      const byBlank: Record<string, { user: string; expected: string; isCorrect: boolean }> = {};
      for (const b of currentPassage.blanks) {
        const key = String(b.no);
        const userOpt = currentDraft.blankAnswers?.[key] || '';
        const isCorrect = userOpt.toLowerCase() === b.answer.toLowerCase();
        if (isCorrect) correct++;
        byBlank[key] = { user: userOpt, expected: b.answer, isCorrect };
      }
      return {
        score: correct,
        maxScore: total,
        byBlank,
        exerciseScores: {} as Record<number, { correct: number; total: number }>,
      };
    }

    // reading_comprehension
    let totalScore = 0;
    const totalMax = 25;
    const exerciseScores: Record<number, { correct: number; total: number }> = {};

    for (const ex of currentPassage.exercises) {
      if (ex.type === 'multiple_choice') {
        let c = 0;
        for (const it of ex.items) {
          const u = currentDraft.mcq?.[String(it.no)] || '';
          if (u.toLowerCase() === it.answer.toLowerCase()) c++;
        }
        exerciseScores[ex.no] = { correct: c, total: ex.items.length };
        totalScore += c;
      } else if (ex.type === 'true_false_not_given') {
        let c = 0;
        for (const it of ex.items) {
          const u = currentDraft.tfng?.[String(it.no)] || '';
          if (u.toUpperCase() === it.answer.toUpperCase()) c++;
        }
        exerciseScores[ex.no] = { correct: c, total: ex.items.length };
        totalScore += c;
      } else if (ex.type === 'sentence_completion') {
        let c = 0;
        for (const it of ex.items) {
          const u = currentDraft.sentenceCompletion?.[String(it.no)] || '';
          if (
            normalizeSentenceCompletionAnswer(u) ===
            normalizeSentenceCompletionAnswer(it.answer)
          ) {
            c++;
          }
        }
        exerciseScores[ex.no] = { correct: c, total: ex.items.length };
        totalScore += c;
      } else if (ex.type === 'comprehension_questions') {
        // Ex4: Không chấm tự động, không tính điểm
        exerciseScores[ex.no] = { correct: 0, total: 0 };
      } else if (ex.type === 'matching') {
        let c = 0;
        for (const inf of ex.information) {
          const k = String(inf.no);
          const u = currentDraft.matching?.[k] || '';
          const exp = ex.answers[k] || '';
          if (u.toUpperCase() === exp.toUpperCase()) c++;
        }
        exerciseScores[ex.no] = { correct: c, total: ex.information.length };
        totalScore += c;
      } else if (ex.type === 'word_box_gap_fill') {
        let c = 0;
        const keys = Object.keys(ex.answers);
        for (const k of keys) {
          const u = (currentDraft.wordBox?.[k] || '').trim().toLowerCase();
          const exp = (ex.answers[k] || '').trim().toLowerCase();
          if (u && u === exp) c++;
        }
        exerciseScores[ex.no] = { correct: c, total: keys.length };
        totalScore += c;
      }
    }

    return {
      score: totalScore,
      maxScore: totalMax,
      byBlank: {},
      exerciseScores,
    };
  }, [currentPassage, currentDraft]);

  // Submit handler
  const handleSubmitPassage = () => {
    if (!currentPassage || !currentUnitObj || !evaluation) return;
    setIsSubmitted(true);

    const score = evaluation.score;
    const maxScore = evaluation.maxScore;
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    if (pct >= 70 && typeof window !== 'undefined') {
      try {
        confetti({ particleCount: 55, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore confetti error in headless env
      }
    }

    setReadingStore((prev) => {
      const existing = prev.completed[currentPassage.id];
      const nextRecord: PassageCompletionRecord = {
        passageId: currentPassage.id,
        unitNumber: currentUnitObj.unit,
        bestScore: existing ? Math.max(existing.bestScore, score) : score,
        lastScore: score,
        maxScore,
        attemptsCount: (existing?.attemptsCount || 0) + 1,
        exerciseBreakdown: evaluation.exerciseScores,
        updatedAt: new Date().toISOString(),
      };
      const nextStore: StudentReadingProgressStore = {
        ...prev,
        completed: {
          ...prev.completed,
          [currentPassage.id]: nextRecord,
        },
      };
      saveStudentReadingStore(currentStudentId, nextStore);
      return nextStore;
    });

    const elapsedSec = Math.max(
      15,
      Math.round((Date.now() - sessionStartTime) / 1000)
    );
    onSessionCompleted?.({
      id: `reading-${currentPassage.id}-${Date.now()}`,
      unitId: `unit-${currentUnitObj.unit}`,
      unitTitle: `Unit ${currentUnitObj.unit}: ${currentUnitObj.title} (${currentPassage.title})`,
      skill: 'Reading',
      score: pct,
      totalQuestions: maxScore,
      correctAnswers: score,
      timeSpentSeconds: elapsedSec,
      date: new Date().toISOString(),
      xpEarned: score * 5,
    });
  };

  // Retry handler: clears current draft answers, keeps bestScore in completed history
  const handleRetryPassage = () => {
    if (!selectedPassageId) return;
    setIsSubmitted(false);
    setSessionStartTime(Date.now());
    setReadingStore((prev) => {
      const nextDrafts = { ...prev.drafts };
      delete nextDrafts[selectedPassageId];
      const nextStore: StudentReadingProgressStore = {
        ...prev,
        drafts: nextDrafts,
      };
      saveStudentReadingStore(currentStudentId, nextStore);
      return nextStore;
    });
  };

  // All passages containing review_notes across 12 units (for teacher modal)
  const allReviewNotesList = useMemo(() => {
    const list: Array<{ unit: number; unitTitle: string; passageId: string; title: string; notes: string[] }> = [];
    for (const u of datasetUnits) {
      for (const p of u.passages) {
        if (p.review_notes && p.review_notes.length > 0) {
          list.push({
            unit: u.unit,
            unitTitle: u.title,
            passageId: p.id,
            title: p.title,
            notes: p.review_notes,
          });
        }
      }
    }
    return list;
  }, [datasetUnits]);

  // Render inline text with {{n}} markers replaced by interactive blanks
  const renderTextWithBlanks = (
    rawText: string,
    renderBlank: (blankNo: string) => React.ReactNode
  ) => {
    const paragraphs = rawText.split('\n');
    return (
      <div className="space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
        {paragraphs.map((para, pIdx) => {
          const parts = para.split(/(\{\{\d+\}\})/g);
          return (
            <p key={pIdx} className="leading-8">
              {parts.map((part, idx) => {
                const m = /^\{\{(\d+)\}\}$/.exec(part);
                if (!m) return <React.Fragment key={idx}>{part}</React.Fragment>;
                return (
                  <React.Fragment key={idx}>{renderBlank(m[1])}</React.Fragment>
                );
              })}
            </p>
          );
        })}
      </div>
    );
  };

  // ============================================================================
  // VIEW 1: CHỌN UNIT 1–12 (BOOK 1: UNIT 1–6, BOOK 2: UNIT 7–12)
  // ============================================================================
  if (!selectedUnitNo || !currentUnitObj) {
    const filteredUnits = datasetUnits.filter(
      (u) => selectedBookFilter === 'all' || u.book === selectedBookFilter
    );

    const totalCompletedPassages = Object.keys(readingStore.completed).length;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Banner */}
        <div className="skill-banner-reading rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold">
              <BookOpen className="w-4 h-4" />
              <span>Kỹ Năng Đọc Hiểu (D. READING • Global Success 6)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Ngân Hàng Luyện Đọc Hiểu 12 Unit (108 Bài Đọc Chuẩn SGK)
            </h1>
            <p className="text-xs sm:text-sm text-white/95 font-medium">
              Mỗi Unit gồm 9 bài: 3 bài Gapped Text • 3 bài Guided Cloze • 3 bài Reading Comprehension (6 dạng bài tập/bài)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/15 border border-white/25 text-center">
              <span className="block text-[10px] font-extrabold uppercase text-white/80">
                Tiến độ toàn khoá
              </span>
              <span className="text-base sm:text-lg font-extrabold text-white">
                {totalCompletedPassages} / 108 bài
              </span>
            </div>

            {isTeacherLoggedIn && (
              <button
                type="button"
                onClick={() => setShowAllTeacherNotesModal(true)}
                className="px-3.5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Ghi chú Giáo viên ({allReviewNotesList.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Bộ lọc Sách Tập 1 (Book 1) / Tập 2 (Book 2) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedBookFilter('all')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                selectedBookFilter === 'all'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              Tất cả 12 Unit (108 bài)
            </button>
            <button
              type="button"
              onClick={() => setSelectedBookFilter(1)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                selectedBookFilter === 1
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              📘 Book 1 – Tập 1 (Unit 1–6)
            </button>
            <button
              type="button"
              onClick={() => setSelectedBookFilter(2)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                selectedBookFilter === 2
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              📙 Book 2 – Tập 2 (Unit 7–12)
            </button>
          </div>
        </div>

        {/* Lưới 12 Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnits.map((u) => {
            const completedInUnit = u.passages.filter(
              (p) => Boolean(readingStore.completed[p.id])
            ).length;
            const totalBestPoints = u.passages.reduce(
              (sum, p) => sum + (readingStore.completed[p.id]?.bestScore || 0),
              0
            );
            const totalMaxPoints = u.passages.reduce(
              (sum, p) => sum + getPassageMaxScore(p),
              0
            ); // 3*4 + 3*6 + 3*25 = 105
            const progressPct = Math.round((completedInUnit / u.passages.length) * 100);

            return (
              <button
                key={u.unit}
                type="button"
                onClick={() => {
                  setSelectedUnitNo(u.unit);
                  setSelectedPassageId(null);
                  setIsSubmitted(false);
                }}
                className="neu-card bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-amber-400 text-left transition-all flex flex-col justify-between gap-4 group cursor-pointer"
              >
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                        u.book === 1
                          ? 'bg-sky-50 text-sky-900 border-sky-200'
                          : 'bg-purple-50 text-purple-900 border-purple-200'
                      }`}
                    >
                      Book {u.book} (Tập {u.book})
                    </span>
                    <span className="text-xs font-extrabold text-amber-800">
                      Đã làm {completedInUnit}/9 bài
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Unit {u.unit} – {u.title}
                  </h2>

                  <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-600">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100">3 Gapped Text</span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100">3 Guided Cloze</span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100">3 Comprehension</span>
                  </div>
                </div>

                <div className="space-y-2 w-full pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">
                      Điểm cao nhất: <strong className="text-slate-900">{totalBestPoints}/{totalMaxPoints}</strong>
                    </span>
                    <span className="text-amber-700 font-extrabold">Vào học →</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal tổng hợp review_notes dành riêng cho Giáo viên */}
        {isTeacherLoggedIn && showAllTeacherNotesModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-5 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0" />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Ghi Chú Thẩm Định Đề & Đáp Án Cho Giáo Viên (review_notes)
                    </h3>
                    <p className="text-xs text-amber-900">
                      Chỉ hiển thị cho tài khoản Giáo viên / Quản trị viên (Ẩn hoàn toàn với học sinh)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllTeacherNotesModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs font-extrabold text-slate-700 cursor-pointer"
                >
                  Đóng
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-3 text-xs">
                {allReviewNotesList.map((item) => (
                  <div
                    key={item.passageId}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-indigo-900">
                        Unit {item.unit} ({item.unitTitle}) • [{item.passageId}] {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAllTeacherNotesModal(false);
                          setSelectedUnitNo(item.unit);
                          setSelectedPassageId(item.passageId);
                          setIsSubmitted(false);
                        }}
                        className="text-indigo-700 font-extrabold hover:underline cursor-pointer"
                      >
                        Mở bài này →
                      </button>
                    </div>
                    {item.notes.map((n, i) => (
                      <p key={i} className="text-slate-700 leading-relaxed">
                        • {n}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: DANH SÁCH 9 BÀI ĐỌC TRONG 1 UNIT (NHÓM THEO 3 LOẠI)
  // ============================================================================
  if (!selectedPassageId || !currentPassage) {
    const groups: Array<{
      type: ReadingPassageItem['type'];
      items: ReadingPassageItem[];
    }> = [
      {
        type: 'gapped_text',
        items: currentUnitObj.passages.filter((p) => p.type === 'gapped_text'),
      },
      {
        type: 'guided_cloze',
        items: currentUnitObj.passages.filter((p) => p.type === 'guided_cloze'),
      },
      {
        type: 'reading_comprehension',
        items: currentUnitObj.passages.filter((p) => p.type === 'reading_comprehension'),
      },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                setSelectedUnitNo(null);
                setSelectedPassageId(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-700 hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại danh sách 12 Unit</span>
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                Book {currentUnitObj.book} (Tập {currentUnitObj.book})
              </span>
              <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900">
                Unit {currentUnitObj.unit} – {currentUnitObj.title}
              </h1>
            </div>
          </div>

          {/* Chuyển nhanh Unit */}
          <div className="flex items-center gap-2">
            <select
              value={currentUnitObj.unit}
              onChange={(e) => {
                setSelectedUnitNo(Number(e.target.value));
                setSelectedPassageId(null);
                setIsSubmitted(false);
              }}
              aria-label="Chọn nhanh Unit"
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-extrabold text-slate-900 cursor-pointer"
            >
              {datasetUnits.map((u) => (
                <option key={u.unit} value={u.unit}>
                  Unit {u.unit} – {u.title} (Book {u.book})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3 Nhóm Bài Tập (Gapped Text 1-3, Guided Cloze 1-3, Reading Comprehension 1-3) */}
        <div className="space-y-6">
          {groups.map((grp) => {
            const meta = PASSAGE_TYPE_LABELS[grp.type];
            return (
              <section
                key={grp.type}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {meta.title}
                    </h2>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      {meta.subtitle}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border self-start sm:self-center whitespace-nowrap ${meta.badgeClass}`}
                  >
                    {meta.maxPointsLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {grp.items.map((passage, idx) => {
                    const comp = readingStore.completed[passage.id];
                    const hasDraft = hasAnyDraftInput(passage.id);
                    const maxPts = getPassageMaxScore(passage);
                    const typePrefix =
                      grp.type === 'gapped_text'
                        ? `Gapped Text ${idx + 1}`
                        : grp.type === 'guided_cloze'
                        ? `Guided Cloze ${idx + 1}`
                        : `Reading Comprehension ${idx + 1}`;

                    return (
                      <button
                        key={passage.id}
                        type="button"
                        onClick={() => {
                          setSelectedPassageId(passage.id);
                          setActiveBlankFocus(null);
                          setActiveRcExNo(1);
                          setIsSubmitted(false);
                          setSessionStartTime(Date.now());
                        }}
                        className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border-2 border-slate-200 hover:border-indigo-400 text-left transition-all flex flex-col justify-between gap-3 cursor-pointer group"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800">
                              {typePrefix}
                            </span>
                            {comp ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>
                                  Đã làm • {comp.bestScore}/{comp.maxScore} điểm
                                </span>
                              </span>
                            ) : hasDraft ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold">
                                <span>Đang làm dở</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                                <span>Chưa làm</span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-indigo-800">
                            {passage.title}
                          </h3>

                          {isTeacherLoggedIn &&
                            passage.review_notes &&
                            passage.review_notes.length > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-extrabold">
                                <ShieldAlert className="w-3 h-3" />
                                <span>Có ghi chú GV (review_notes)</span>
                              </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-xs font-extrabold text-indigo-700">
                          <span>Thang điểm: {maxPts} câu</span>
                          <span>Làm bài →</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 3: MÀN HÌNH LÀM BÀI ĐỌC (GAPPED TEXT / GUIDED CLOZE / READING COMPREHENSION)
  // ============================================================================
  const savedCompletion = readingStore.completed[currentPassage.id];
  const currentUnitPassages = currentUnitObj.passages;
  const currentPassageIndex = currentUnitPassages.findIndex(
    (p) => p.id === currentPassage.id
  );
  const prevPassage =
    currentPassageIndex > 0 ? currentUnitPassages[currentPassageIndex - 1] : null;
  const nextPassage =
    currentPassageIndex >= 0 && currentPassageIndex < currentUnitPassages.length - 1
      ? currentUnitPassages[currentPassageIndex + 1]
      : null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* Thanh điều hướng bài đọc */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setSelectedPassageId(null);
                setIsSubmitted(false);
              }}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-700 hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Unit {currentUnitObj.unit} – {currentUnitObj.title} (9 bài)</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-slate-600">
              Bài {currentPassageIndex + 1}/9
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {currentPassage.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {savedCompletion && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-extrabold">
              🏆 Điểm cao nhất: {savedCompletion.bestScore}/{savedCompletion.maxScore}
            </span>
          )}

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitPassage}
              className="px-5 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetryPassage}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Khung review_notes CHỈ HIỂN THỊ CHO GIÁO VIÊN / ADMIN */}
      {isTeacherLoggedIn &&
        currentPassage.review_notes &&
        currentPassage.review_notes.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950 uppercase">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Ghi chú dành riêng cho Giáo viên (review_notes – Học sinh không nhìn thấy)</span>
            </div>
            {currentPassage.review_notes.map((note, idx) => (
              <p key={idx} className="text-xs font-semibold text-amber-900 leading-relaxed">
                • {note}
              </p>
            ))}
          </div>
        )}

      {/* Khung Kết Quả Chấm Điểm sau khi bấm Nộp Bài */}
      {isSubmitted && evaluation && (
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shrink-0">
                {evaluation.score}/{evaluation.maxScore}
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                  Kết Quả Chấm Bài
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold">
                  Đúng {evaluation.score} / {evaluation.maxScore} câu tính điểm (
                  {Math.round((evaluation.score / evaluation.maxScore) * 100)}%)
                </h2>
                {savedCompletion && (
                  <p className="text-xs text-indigo-200 font-semibold mt-0.5">
                    Lịch sử điểm cao nhất của bài này: {savedCompletion.bestScore}/
                    {savedCompletion.maxScore} điểm ({savedCompletion.attemptsCount} lần làm)
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleRetryPassage}
                className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài này</span>
              </button>
              {nextPassage && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPassageId(nextPassage.id);
                    setActiveBlankFocus(null);
                    setActiveRcExNo(1);
                    setIsSubmitted(false);
                    setSessionStartTime(Date.now());
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-extrabold text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Bài tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Điểm riêng từng dạng bài tập (với Reading Comprehension) */}
          {currentPassage.type === 'reading_comprehension' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-white/15 text-xs">
              {currentPassage.exercises.map((ex) => {
                const st = evaluation.exerciseScores[ex.no];
                const isSelfCheck = ex.type === 'comprehension_questions';
                return (
                  <div
                    key={ex.no}
                    className="p-2.5 rounded-xl bg-white/10 border border-white/15 space-y-0.5"
                  >
                    <span className="text-[10px] font-bold text-indigo-200 block">
                      Bài {ex.no} ({ex.type === 'multiple_choice'
                        ? 'Trắc nghiệm'
                        : ex.type === 'true_false_not_given'
                        ? 'T/F/NG'
                        : ex.type === 'sentence_completion'
                        ? 'Điền câu'
                        : ex.type === 'comprehension_questions'
                        ? 'Tự luận'
                        : ex.type === 'matching'
                        ? 'Nối A–E'
                        : 'Hộp từ'})
                    </span>
                    <span className="font-extrabold text-white block">
                      {isSelfCheck
                        ? 'Đối chiếu mẫu'
                        : `${st?.correct || 0} / ${st?.total || 5} điểm`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================
          LOẠI 1: GAPPED TEXT (4 chỗ trống, 4 phương án A-D dùng đúng 1 lần)
         ======================================================================== */}
      {currentPassage.type === 'gapped_text' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Đoạn văn có {{1}}..{{4}} */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-950">
              📋 <strong>Yêu cầu:</strong> {currentPassage.instruction}
            </div>

            {renderTextWithBlanks(currentPassage.text, (blankNo) => {
              const userChoice = currentDraft.blankAnswers?.[blankNo] || '';
              const expectedChoice = currentPassage.answers[blankNo];
              const isCorrect =
                isSubmitted && userChoice.toUpperCase() === expectedChoice.toUpperCase();
              const isWrong = isSubmitted && !isCorrect;
              const isFocused = activeBlankFocus === blankNo;

              return (
                <span className="inline-flex items-center gap-1 mx-1 align-baseline">
                  <select
                    aria-label={`Chỗ trống (${blankNo})`}
                    value={userChoice}
                    disabled={isSubmitted}
                    onFocus={() => setActiveBlankFocus(blankNo)}
                    onChange={(e) => {
                      const chosenOpt = e.target.value;
                      setActiveBlankFocus(blankNo);
                      updateDraft((prev) => {
                        const nextBlanks = { ...(prev.blankAnswers || {}) };
                        // Đảm bảo mỗi phương án A-D chỉ dùng 1 lần: nếu ô khác đang giữ chosenOpt thì giải phóng ô đó
                        if (chosenOpt) {
                          for (const [k, v] of Object.entries(nextBlanks)) {
                            if (k !== blankNo && v === chosenOpt) {
                              delete nextBlanks[k];
                            }
                          }
                          nextBlanks[blankNo] = chosenOpt;
                        } else {
                          delete nextBlanks[blankNo];
                        }
                        return { ...prev, blankAnswers: nextBlanks };
                      });
                    }}
                    className={`px-2.5 py-1 rounded-xl font-extrabold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isWrong
                        ? 'bg-rose-50 border-rose-500 text-rose-900'
                        : isFocused
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-300'
                        : userChoice
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-900'
                        : 'bg-amber-50 border-amber-400 text-slate-800'
                    }`}
                  >
                    <option value="">({blankNo}) Chọn A–D...</option>
                    {Object.entries(currentPassage.options).map(([optKey, optText]) => {
                      const usedByBlank = Object.entries(
                        currentDraft.blankAnswers || {}
                      ).find(([bNo, val]) => bNo !== blankNo && val === optKey)?.[0];
                      return (
                        <option key={optKey} value={optKey}>
                          ({blankNo}) {optKey}. {optText}
                          {usedByBlank ? ` [Đã dùng ở (${usedByBlank})]` : ''}
                        </option>
                      );
                    })}
                  </select>

                  {isSubmitted && (
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-lg ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {isCorrect ? `✓ Đúng (${expectedChoice})` : `✗ Đáp án: ${expectedChoice}`}
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* Cột phải: Bảng 4 phương án A-D & chọn nhanh trên điện thoại */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Các phương án A – D (Mỗi phương án dùng 1 lần)
              </h3>
              <span className="text-[11px] font-bold text-indigo-700">
                Đang chọn ô: ({activeBlankFocus || '1'})
              </span>
            </div>

            {/* Chọn ô trống 1..4 để gán nhanh bằng 1 chạm */}
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(currentPassage.answers).map((bNo) => {
                const currentVal = currentDraft.blankAnswers?.[bNo] || '';
                const expVal = currentPassage.answers[bNo];
                const isCorr = isSubmitted && currentVal === expVal;
                const isWrg = isSubmitted && !isCorr;
                const active = (activeBlankFocus || '1') === bNo;
                return (
                  <button
                    key={bNo}
                    type="button"
                    onClick={() => setActiveBlankFocus(bNo)}
                    className={`py-2 px-2 rounded-xl text-xs font-extrabold border-2 transition-all cursor-pointer ${
                      isCorr
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isWrg
                        ? 'bg-rose-50 border-rose-500 text-rose-900'
                        : active
                        ? 'bg-indigo-700 border-indigo-700 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    Ô ({bNo}): {currentVal || '?'}
                    {isWrg && ` → ${expVal}`}
                  </button>
                );
              })}
            </div>

            {/* Danh sách 4 thẻ A, B, C, D */}
            <div className="space-y-2.5">
              {Object.entries(currentPassage.options).map(([optKey, optText]) => {
                const usedInBlank = Object.entries(currentDraft.blankAnswers || {}).find(
                  ([, val]) => val === optKey
                )?.[0];
                const targetBlank = activeBlankFocus || '1';

                return (
                  <button
                    key={optKey}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => {
                      updateDraft((prev) => {
                        const nextBlanks = { ...(prev.blankAnswers || {}) };
                        // Nếu phương án này đang dùng ở chính targetBlank -> bỏ chọn
                        if (nextBlanks[targetBlank] === optKey) {
                          delete nextBlanks[targetBlank];
                        } else {
                          // Giải phóng nếu đang dùng ở ô khác
                          for (const [k, v] of Object.entries(nextBlanks)) {
                            if (v === optKey) delete nextBlanks[k];
                          }
                          nextBlanks[targetBlank] = optKey;
                        }
                        return { ...prev, blankAnswers: nextBlanks };
                      });
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      usedInBlank
                        ? 'bg-slate-100/80 border-slate-300 text-slate-500 opacity-75'
                        : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-900 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {optKey}
                      </span>
                      <span className="text-xs sm:text-sm font-bold leading-relaxed">
                        {optText}
                      </span>
                    </div>
                    {usedInBlank && (
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-extrabold text-[11px] shrink-0">
                        Đã dùng ở ({usedInBlank})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          LOẠI 2: GUIDED CLOZE (6 chỗ trống, mỗi chỗ 4 lựa chọn a-d)
         ======================================================================== */}
      {currentPassage.type === 'guided_cloze' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Đoạn văn có {{1}}..{{6}} */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-950">
              📋 <strong>Yêu cầu:</strong> {currentPassage.instruction}
            </div>

            {renderTextWithBlanks(currentPassage.text, (blankNo) => {
              const blankObj = currentPassage.blanks.find(
                (b) => String(b.no) === String(blankNo)
              );
              if (!blankObj) return <span>({blankNo})</span>;

              const userChoice = currentDraft.blankAnswers?.[blankNo] || '';
              const expectedChoice = blankObj.answer;
              const isCorrect =
                isSubmitted && userChoice.toLowerCase() === expectedChoice.toLowerCase();
              const isWrong = isSubmitted && !isCorrect;

              return (
                <span className="inline-flex items-center gap-1 mx-1 align-baseline">
                  <select
                    aria-label={`Chỗ trống (${blankNo})`}
                    value={userChoice}
                    disabled={isSubmitted}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateDraft((prev) => ({
                        ...prev,
                        blankAnswers: {
                          ...(prev.blankAnswers || {}),
                          [blankNo]: val,
                        },
                      }));
                    }}
                    className={`px-2.5 py-1 rounded-xl font-extrabold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isWrong
                        ? 'bg-rose-50 border-rose-500 text-rose-900'
                        : userChoice
                        ? 'bg-teal-50 border-teal-500 text-teal-950'
                        : 'bg-amber-50 border-amber-400 text-slate-800'
                    }`}
                  >
                    <option value="">({blankNo}) Chọn...</option>
                    {Object.entries(blankObj.options).map(([k, text]) => (
                      <option key={k} value={k}>
                        ({blankNo}) {k}. {text}
                      </option>
                    ))}
                  </select>

                  {isSubmitted && (
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-lg ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {isCorrect
                        ? `✓ ${expectedChoice}. ${blankObj.options[expectedChoice]}`
                        : `✗ Đúng: ${expectedChoice}. ${blankObj.options[expectedChoice]}`}
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* Cột phải: Bảng nút chọn nhanh 6 câu (a, b, c, d) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Bảng chọn nhanh đáp án (1 – 6)
            </h3>
            <div className="space-y-3">
              {currentPassage.blanks.map((b) => {
                const key = String(b.no);
                const userChoice = currentDraft.blankAnswers?.[key] || '';
                const isCorr =
                  isSubmitted && userChoice.toLowerCase() === b.answer.toLowerCase();
                const isWrg = isSubmitted && !isCorr;

                return (
                  <div
                    key={b.no}
                    className={`p-3 rounded-2xl border-2 space-y-2 ${
                      isCorr
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : isWrg
                        ? 'bg-rose-50/50 border-rose-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-slate-900">Chỗ trống ({b.no})</span>
                      {isSubmitted && (
                        <span className={isCorr ? 'text-emerald-800' : 'text-rose-800'}>
                          {isCorr
                            ? `✓ Đúng (${b.answer.toUpperCase()})`
                            : `✗ Đáp án đúng: ${b.answer.toUpperCase()}. ${b.options[b.answer]}`}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(b.options).map(([optKey, optLabel]) => {
                        const selected = userChoice.toLowerCase() === optKey.toLowerCase();
                        const isExpected =
                          isSubmitted && b.answer.toLowerCase() === optKey.toLowerCase();
                        return (
                          <button
                            key={optKey}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => {
                              updateDraft((prev) => ({
                                ...prev,
                                blankAnswers: {
                                  ...(prev.blankAnswers || {}),
                                  [key]: optKey,
                                },
                              }));
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSubmitted && isExpected
                                ? 'bg-emerald-600 text-white border-emerald-600 font-extrabold'
                                : isSubmitted && selected && !isExpected
                                ? 'bg-rose-600 text-white border-rose-600'
                                : selected
                                ? 'bg-teal-700 text-white border-teal-700 font-extrabold'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-teal-400'
                            }`}
                          >
                            <span className="uppercase font-extrabold">{optKey}.</span>
                            <span className="truncate">{optLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          LOẠI 3: READING COMPREHENSION (1 Bài đọc cố định + 6 Dạng bài tập)
         ======================================================================== */}
      {currentPassage.type === 'reading_comprehension' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Cột trái (hoặc khung trên cố định trên điện thoại): Đoạn văn */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-2xs space-y-3 max-h-[42vh] lg:max-h-[78vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Văn Bản Bài Đọc (Reading Passage)</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">Cuộn để đọc</span>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {currentPassage.text.split('\n').map((line, i) => (
                <p key={i} className="leading-7">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Cột phải: 6 Dạng bài tập theo từng Tab hoặc xem tất cả */}
          <div className="lg:col-span-7 space-y-4">
            {/* Thanh chọn Tab Bài 1..6 */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200 flex items-center gap-1.5 overflow-x-auto">
              {currentPassage.exercises.map((ex) => {
                const active = activeRcExNo === ex.no;
                const sc = evaluation?.exerciseScores[ex.no];
                return (
                  <button
                    key={ex.no}
                    type="button"
                    onClick={() => setActiveRcExNo(ex.no)}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-indigo-700 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>Bài {ex.no}</span>
                    {isSubmitted && ex.type !== 'comprehension_questions' && sc && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded bg-white/20 text-[10px]">
                        {sc.correct}/{sc.total}
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setActiveRcExNo('all')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  activeRcExNo === 'all'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Hiện tất cả (1–6)
              </button>
            </div>

            {/* Danh sách các bài tập hiển thị */}
            {currentPassage.exercises
              .filter((ex) => activeRcExNo === 'all' || ex.no === activeRcExNo)
              .map((ex) => {
                const exScore = evaluation?.exerciseScores[ex.no];

                return (
                  <div
                    key={ex.no}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-extrabold text-indigo-700 uppercase block">
                          {EXERCISE_TITLES_VI[ex.type]}
                        </span>
                        <p className="text-xs text-slate-600 font-semibold mt-0.5">
                          {ex.instruction}
                        </p>
                      </div>
                      {isSubmitted && (
                        <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs font-extrabold self-start sm:self-center whitespace-nowrap">
                          {ex.type === 'comprehension_questions'
                            ? 'Tự đối chiếu Đáp án mẫu'
                            : `Điểm phần này: ${exScore?.correct || 0} / ${exScore?.total || 5}`}
                        </span>
                      )}
                    </div>

                    {/* 1. MULTIPLE CHOICE */}
                    {ex.type === 'multiple_choice' && (
                      <div className="space-y-4">
                        {ex.items.map((item) => {
                          const key = String(item.no);
                          const userVal = currentDraft.mcq?.[key] || '';
                          const isCorr =
                            isSubmitted &&
                            userVal.toLowerCase() === item.answer.toLowerCase();
                          const isWrg = isSubmitted && !isCorr;

                          return (
                            <div
                              key={item.no}
                              className={`p-4 rounded-2xl border-2 space-y-2.5 ${
                                isCorr
                                  ? 'bg-emerald-50/50 border-emerald-300'
                                  : isWrg
                                  ? 'bg-rose-50/50 border-rose-300'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                                {item.no}. {item.question}
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {Object.entries(item.options).map(([optKey, optText]) => {
                                  const selected =
                                    userVal.toLowerCase() === optKey.toLowerCase();
                                  const isExpected =
                                    isSubmitted &&
                                    item.answer.toLowerCase() === optKey.toLowerCase();

                                  return (
                                    <button
                                      key={optKey}
                                      type="button"
                                      disabled={isSubmitted}
                                      onClick={() =>
                                        updateDraft((prev) => ({
                                          ...prev,
                                          mcq: { ...(prev.mcq || {}), [key]: optKey },
                                        }))
                                      }
                                      className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                        isSubmitted && isExpected
                                          ? 'bg-emerald-600 text-white border-emerald-600 font-extrabold'
                                          : isSubmitted && selected && !isExpected
                                          ? 'bg-rose-600 text-white border-rose-600'
                                          : selected
                                          ? 'bg-indigo-700 text-white border-indigo-700 font-extrabold'
                                          : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400'
                                      }`}
                                    >
                                      <span className="uppercase font-extrabold">
                                        {optKey}.
                                      </span>
                                      <span>{optText}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              {isSubmitted && (
                                <p
                                  className={`text-xs font-extrabold ${
                                    isCorr ? 'text-emerald-800' : 'text-rose-800'
                                  }`}
                                >
                                  {isCorr
                                    ? '✓ Chính xác! (+1 điểm)'
                                    : `✗ Chưa đúng. Đáp án đúng: ${item.answer.toUpperCase()}. ${
                                        item.options[item.answer]
                                      }`}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 2. TRUE / FALSE / NOT GIVEN */}
                    {ex.type === 'true_false_not_given' && (
                      <div className="space-y-3">
                        {ex.items.map((item) => {
                          const key = String(item.no);
                          const userVal = currentDraft.tfng?.[key] || '';
                          const isCorr =
                            isSubmitted &&
                            userVal.toUpperCase() === item.answer.toUpperCase();
                          const isWrg = isSubmitted && !isCorr;

                          return (
                            <div
                              key={item.no}
                              className={`p-3.5 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                isCorr
                                  ? 'bg-emerald-50/50 border-emerald-300'
                                  : isWrg
                                  ? 'bg-rose-50/50 border-rose-300'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-bold text-slate-900">
                                  <strong>{item.no}.</strong> {item.statement}
                                </p>
                                {isSubmitted && (
                                  <p
                                    className={`text-xs font-extrabold ${
                                      isCorr ? 'text-emerald-800' : 'text-rose-800'
                                    }`}
                                  >
                                    {isCorr
                                      ? `✓ Chính xác (${item.answer})`
                                      : `✗ Đáp án đúng: ${item.answer}`}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {(['T', 'F', 'NG'] as const).map((choice) => {
                                  const selected = userVal === choice;
                                  const isExp = isSubmitted && item.answer === choice;
                                  return (
                                    <button
                                      key={choice}
                                      type="button"
                                      disabled={isSubmitted}
                                      onClick={() =>
                                        updateDraft((prev) => ({
                                          ...prev,
                                          tfng: { ...(prev.tfng || {}), [key]: choice },
                                        }))
                                      }
                                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                                        isSubmitted && isExp
                                          ? 'bg-emerald-600 text-white border-emerald-600'
                                          : isSubmitted && selected && !isExp
                                          ? 'bg-rose-600 text-white border-rose-600'
                                          : selected
                                          ? 'bg-indigo-700 text-white border-indigo-700'
                                          : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
                                      }`}
                                    >
                                      {choice}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 3. SENTENCE COMPLETION */}
                    {ex.type === 'sentence_completion' && (
                      <div className="space-y-3">
                        {ex.items.map((item) => {
                          const key = String(item.no);
                          const userVal = currentDraft.sentenceCompletion?.[key] || '';
                          const isCorr =
                            isSubmitted &&
                            normalizeSentenceCompletionAnswer(userVal) ===
                              normalizeSentenceCompletionAnswer(item.answer);
                          const isWrg = isSubmitted && !isCorr;

                          return (
                            <div
                              key={item.no}
                              className={`p-3.5 rounded-2xl border-2 space-y-2 ${
                                isCorr
                                  ? 'bg-emerald-50/50 border-emerald-300'
                                  : isWrg
                                  ? 'bg-rose-50/50 border-rose-300'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <p className="text-xs sm:text-sm font-bold text-slate-900">
                                <strong>{item.no}.</strong> {item.stem}
                              </p>
                              <input
                                type="text"
                                disabled={isSubmitted}
                                value={userVal}
                                onChange={(e) =>
                                  updateDraft((prev) => ({
                                    ...prev,
                                    sentenceCompletion: {
                                      ...(prev.sentenceCompletion || {}),
                                      [key]: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Gõ từ/cụm từ còn thiếu..."
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              {isSubmitted && (
                                <p
                                  className={`text-xs font-extrabold ${
                                    isCorr ? 'text-emerald-800' : 'text-rose-800'
                                  }`}
                                >
                                  {isCorr
                                    ? '✓ Chính xác! (+1 điểm)'
                                    : `✗ Đáp án đúng: "${item.answer}"`}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 4. COMPREHENSION QUESTIONS (Tự luận - Không chấm tự động, hiện Đáp án mẫu sau khi nộp) */}
                    {ex.type === 'comprehension_questions' && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 font-semibold">
                          💡 <strong>Lưu ý:</strong> Phần tự luận không tính điểm tự động. Em hãy viết câu trả lời đầy đủ, sau khi bấm <strong>Nộp bài</strong> hệ thống sẽ hiện <strong>Đáp án mẫu</strong> (từ Sách Giáo Viên) để em tự đối chiếu (em có thể diễn đạt khác miễn đúng ý).
                        </div>
                        {ex.items.map((item) => {
                          const key = String(item.no);
                          const userVal =
                            currentDraft.comprehensionQuestions?.[key] || '';

                          return (
                            <div
                              key={item.no}
                              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                            >
                              <p className="text-xs sm:text-sm font-bold text-slate-900">
                                <strong>{item.no}.</strong> {item.question}
                              </p>
                              <textarea
                                rows={2}
                                disabled={isSubmitted}
                                value={userVal}
                                onChange={(e) =>
                                  updateDraft((prev) => ({
                                    ...prev,
                                    comprehensionQuestions: {
                                      ...(prev.comprehensionQuestions || {}),
                                      [key]: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Viết câu trả lời đầy đủ bằng tiếng Anh..."
                                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              {isSubmitted && (
                                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs space-y-1">
                                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-700 text-white font-extrabold text-[10px] uppercase">
                                    Đáp án mẫu
                                  </span>
                                  <p className="font-extrabold text-emerald-950 text-xs sm:text-sm">
                                    {item.sample_answer}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 5. MATCHING (Nối 1-5 với A-E, không trùng) */}
                    {ex.type === 'matching' && (
                      <div className="space-y-4">
                        {/* Bảng mô tả A-E */}
                        <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                          <span className="text-xs font-extrabold text-indigo-950 block">
                            Các mô tả (Descriptions A – E):
                          </span>
                          {Object.entries(ex.descriptions).map(([dKey, dText]) => {
                            const usedByNo = Object.entries(
                              currentDraft.matching || {}
                            ).find(([, v]) => v === dKey)?.[0];
                            return (
                              <div
                                key={dKey}
                                className={`text-xs flex items-center justify-between gap-2 p-1.5 rounded-lg ${
                                  usedByNo
                                    ? 'text-slate-400 line-through'
                                    : 'text-slate-800 font-semibold'
                                }`}
                              >
                                <span>
                                  <strong className="text-indigo-900">{dKey}.</strong>{' '}
                                  {dText}
                                </span>
                                {usedByNo && (
                                  <span className="text-[10px] font-bold text-indigo-700 no-underline">
                                    (Đã ghép với #{usedByNo})
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* 5 Dòng thông tin 1-5 */}
                        <div className="space-y-2.5">
                          {ex.information.map((inf) => {
                            const key = String(inf.no);
                            const userChoice = currentDraft.matching?.[key] || '';
                            const expectedChoice = ex.answers[key];
                            const isCorr =
                              isSubmitted &&
                              userChoice.toUpperCase() === expectedChoice.toUpperCase();
                            const isWrg = isSubmitted && !isCorr;

                            return (
                              <div
                                key={inf.no}
                                className={`p-3 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                                  isCorr
                                    ? 'bg-emerald-50/50 border-emerald-300'
                                    : isWrg
                                    ? 'bg-rose-50/50 border-rose-300'
                                    : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div className="text-xs sm:text-sm font-bold text-slate-900">
                                  <strong>{inf.no}.</strong> {inf.text}
                                  {isSubmitted && (
                                    <span
                                      className={`ml-2 text-xs font-extrabold ${
                                        isCorr ? 'text-emerald-800' : 'text-rose-800'
                                      }`}
                                    >
                                      {isCorr
                                        ? `✓ Đúng (${expectedChoice})`
                                        : `✗ Đáp án đúng: ${expectedChoice}. ${ex.descriptions[expectedChoice]}`}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {Object.keys(ex.descriptions).map((letter) => {
                                    const selected = userChoice === letter;
                                    const usedElsewhere = Object.entries(
                                      currentDraft.matching || {}
                                    ).some(([k, v]) => k !== key && v === letter);
                                    const isExp =
                                      isSubmitted && expectedChoice === letter;

                                    return (
                                      <button
                                        key={letter}
                                        type="button"
                                        disabled={isSubmitted}
                                        onClick={() => {
                                          updateDraft((prev) => {
                                            const nextMap = { ...(prev.matching || {}) };
                                            if (nextMap[key] === letter) {
                                              delete nextMap[key];
                                            } else {
                                              for (const [k, v] of Object.entries(
                                                nextMap
                                              )) {
                                                if (v === letter) delete nextMap[k];
                                              }
                                              nextMap[key] = letter;
                                            }
                                            return { ...prev, matching: nextMap };
                                          });
                                        }}
                                        className={`w-8 h-8 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                                          isSubmitted && isExp
                                            ? 'bg-emerald-600 text-white border-emerald-600'
                                            : isSubmitted && selected && !isExp
                                            ? 'bg-rose-600 text-white border-rose-600'
                                            : selected
                                            ? 'bg-indigo-700 text-white border-indigo-700'
                                            : usedElsewhere
                                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                                            : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400'
                                        }`}
                                      >
                                        {letter}
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

                    {/* 6. WORD BOX GAP FILL (Chọn từ trong hộp 8 từ cho 5 chỗ trống {{1}}..{{5}}) */}
                    {ex.type === 'word_box_gap_fill' && (
                      <div className="space-y-4">
                        {/* Hộp từ (Word Box) */}
                        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                          <span className="text-xs font-extrabold text-amber-950 block">
                            Hộp từ (Word Box – Có từ gây nhiễu):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {ex.word_box.map((word) => {
                              const usedInNo = Object.entries(
                                currentDraft.wordBox || {}
                              ).find(
                                ([, w]) => w.trim().toLowerCase() === word.trim().toLowerCase()
                              )?.[0];
                              return (
                                <span
                                  key={word}
                                  className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${
                                    usedInNo
                                      ? 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                                      : 'bg-white text-slate-900 border-amber-300 shadow-2xs'
                                  }`}
                                >
                                  {word}
                                  {usedInNo ? ` (#${usedInNo})` : ''}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Đoạn tóm tắt có {{1}}..{{5}} */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          {renderTextWithBlanks(ex.text, (blankNo) => {
                            const userWord = currentDraft.wordBox?.[blankNo] || '';
                            const expectedWord = ex.answers[blankNo] || '';
                            const isCorr =
                              isSubmitted &&
                              userWord.trim().toLowerCase() ===
                                expectedWord.trim().toLowerCase();
                            const isWrg = isSubmitted && !isCorr;

                            return (
                              <span className="inline-flex items-center gap-1 mx-1 align-baseline">
                                <select
                                  aria-label={`Ô trống (${blankNo})`}
                                  value={userWord}
                                  disabled={isSubmitted}
                                  onChange={(e) => {
                                    const chosen = e.target.value;
                                    updateDraft((prev) => {
                                      const nextWb = { ...(prev.wordBox || {}) };
                                      if (chosen) {
                                        for (const [k, v] of Object.entries(nextWb)) {
                                          if (
                                            k !== blankNo &&
                                            v.trim().toLowerCase() ===
                                              chosen.trim().toLowerCase()
                                          ) {
                                            delete nextWb[k];
                                          }
                                        }
                                        nextWb[blankNo] = chosen;
                                      } else {
                                        delete nextWb[blankNo];
                                      }
                                      return { ...prev, wordBox: nextWb };
                                    });
                                  }}
                                  className={`px-2.5 py-1 rounded-xl font-extrabold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                                    isCorr
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                      : isWrg
                                      ? 'bg-rose-50 border-rose-500 text-rose-900'
                                      : userWord
                                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950'
                                      : 'bg-white border-amber-400 text-slate-800'
                                  }`}
                                >
                                  <option value="">({blankNo}) Chọn từ...</option>
                                  {ex.word_box.map((w) => (
                                    <option key={w} value={w}>
                                      ({blankNo}) {w}
                                    </option>
                                  ))}
                                </select>
                                {isSubmitted && (
                                  <span
                                    className={`text-xs font-extrabold px-2 py-0.5 rounded-lg ${
                                      isCorr
                                        ? 'bg-emerald-100 text-emerald-900'
                                        : 'bg-rose-100 text-rose-900'
                                    }`}
                                  >
                                    {isCorr ? '✓' : `✗ Đúng: ${expectedWord}`}
                                  </span>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Footer Điều hướng Bài trước / Nộp bài / Bài tiếp theo */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 flex items-center justify-between gap-3">
        {prevPassage ? (
          <button
            type="button"
            onClick={() => {
              setSelectedPassageId(prevPassage.id);
              setActiveBlankFocus(null);
              setActiveRcExNo(1);
              setIsSubmitted(false);
              setSessionStartTime(Date.now());
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs inline-flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bài trước</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitPassage}
              className="px-6 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Nộp bài & Chấm điểm</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetryPassage}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại</span>
            </button>
          )}

          {nextPassage && (
            <button
              type="button"
              onClick={() => {
                setSelectedPassageId(nextPassage.id);
                setActiveBlankFocus(null);
                setActiveRcExNo(1);
                setIsSubmitted(false);
                setSessionStartTime(Date.now());
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Bài tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
