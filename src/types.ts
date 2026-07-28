/**
 * Types for Gia Sư AI Tiếng Anh 6 (Grade 6 English AI Tutor App)
 */

export type SkillType = 'Listening' | 'Speaking' | 'Reading' | 'Writing' | 'Grammar' | 'Vocabulary' | 'Pronunciation';

export interface SgkUnit {
  id: string; // e.g. "unit-1"
  unitNumber: number; // 1 to 12
  title: string; // e.g. "MY NEW SCHOOL"
  term: 1 | 2; // Tập 1 (Units 1-6) or Tập 2 (Units 7-12)
  theme: string; // "Our Communities", "Our Heritage", "Our World", "Visions of the Future"
  grammar: string[];
  vocabulary: string[];
  pronunciationIPA: string; // e.g. "/a:/ & /ʌ/"
  skillsSummary: string;
  iconName: string;
}

export interface Question {
  id: string;
  unitId: string;
  skill: SkillType;
  type: 'multiple-choice' | 'fill-in-blank' | 'reorder' | 'pronunciation' | 'short-answer';
  content: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hints: string[]; // Multi-level hints: Level 1 (minor clue), Level 2 (structure clue), Level 3 (near solution)
  difficulty: 'Dễ' | 'Trung bình' | 'Nâng cao';
  audioText?: string;
  targetPronunciation?: {
    word: string;
    ipa: string;
    focusPhoneme: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor' | 'system';
  text: string;
  timestamp: string;
  socraticStep?: 'Example' | 'Notice' | 'Explain' | 'Practice' | 'Apply';
  hintsUsed?: number;
  speechAudioUrl?: string;
}

export interface WritingFeedback {
  overallScore: number; // 0 - 10
  band: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Cần cố gắng';
  grammarScore: number; // 0 - 10
  vocabScore: number; // 0 - 10
  structureScore: number; // 0 - 10
  wordCount: number;
  strengths: string[];
  areasForImprovement: string[];
  detailedCorrections: Array<{
    original: string;
    correction: string;
    reason: string;
  }>;
  suggestedRevision: string;
  pedagogicalAdvice: string;
}

export interface PronunciationEvaluation {
  score: number; // 0 - 100
  accuracyGrade: 'Hoàn hảo' | 'Tốt' | 'Khá' | 'Cần luyện thêm';
  phonemesAccuracy: Array<{
    phoneme: string;
    status: 'correct' | 'needs-work' | 'missed';
    note: string;
  }>;
  recognizedText: string;
  targetText: string;
  teacherFeedback: string;
  tipsToImprove: string[];
}

export interface StudySession {
  id: string;
  unitId: string;
  unitTitle: string;
  skill: SkillType;
  score: number; // Percentage 0-100
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  date: string; // ISO date string
  xpEarned: number;
}

export interface UserProgress {
  studentName: string;
  grade: number; // 6
  totalXP: number;
  level: number;
  streakDays: number;
  lastStudyDate: string;
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }>;
  weakTopics: Array<{
    unitId: string;
    topicName: string;
    skill: SkillType;
    errorRate: number; // Percentage error e.g. 65%
    recommendation: string;
  }>;
  skillMastery: Record<SkillType, number>; // Percentage 0-100
  unitProgress: Record<string, number>; // unitId -> completion %
}

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  timeSpentSeconds: number;
  sessionsCompleted: number;
  xpEarned: number;
  skillsPracticed: SkillType[];
  lastActiveTime: string; // e.g. "20:45 27/07/2026"
}

export interface StudentAccount {
  id: string;
  username: string; // e.g., "hocsinh6a1", "nguyenvanan"
  fullName: string; // e.g., "Nguyễn Văn An"
  className: string; // e.g., "Lớp 6A1"
  schoolName?: string; // Trường THCS (e.g., "THCS Chu Văn An")
  communeName?: string; // Xã / Thị trấn (e.g., "Thị trấn Đăk Hà")
  pinCode?: string; // 4-digit PIN e.g. "1234"
  avatar: string; // Emoji avatar or preset
  dailyGoalMinutes: number; // e.g., 20 or 30 minutes
  createdAt: string;
  lastLoginAt: string;
  progress: UserProgress;
  sessions: StudySession[];
  dailyLogs: Record<string, DailyStudyLog>; // key: YYYY-MM-DD
}

export interface TeacherAccount {
  id: string;
  username: string; // e.g. "giaovien6"
  fullName: string; // e.g. "Cô Nguyễn Thị Mai"
  password: string; // e.g. "teacher2026"
  schoolName: string;
  managedClasses: string[]; // e.g. ["Lớp 6A1", "Lớp 6A2", "Lớp 6A3", "Lớp 6A4", "Lớp 6A5", "Lớp 6A6"]
  lastLoginAt?: string;
}

export interface AppSettings {
  geminiApiKey: string;
  selectedModel: 'gemini-3.6-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview' | 'gemini-2.5-flash';
  soundEnabled: boolean;
  speechSpeed: number; // e.g., 0.9 or 1.0
  theme: 'light' | 'dark';
  autoSave: boolean;
}

export interface AppDataSchema {
  units: SgkUnit[];
  questions: Question[];
  sessions: StudySession[];
  progress: UserProgress;
  students: StudentAccount[];
  currentStudentId: string | null;
  isTeacherLoggedIn: boolean;
  teacherAccount: TeacherAccount;
  settings: AppSettings;
  customDocuments: Array<{
    id: string;
    title: string;
    uploadDate: string;
    contentSummary: string;
    extractedVocab: string[];
    extractedGrammar: string[];
  }>;
}
