export type Word = {
  id: string;
  word: string;          // từ tiếng Anh, vd "subject"
  ipa?: string;          // phiên âm, vd "/ˈsʌbdʒɪkt/"
  partOfSpeech?: string; // n, v, adj...
  meaningVi: string;     // nghĩa tiếng Việt THEO BỐI CẢNH đã học, vd "môn học"
  definitionEn: string;  // định nghĩa tiếng Anh đơn giản, khớp đúng nghĩa trên
  example: string;       // câu ví dụ chứa từ, lấy từ bối cảnh bài học
  exampleVi?: string;
  audioUrl?: string;
  imageUrl?: string;     // link ảnh minh họa hoặc ảnh Base64 do giáo viên tải lên
  unit: string;          // vd "Unit 1 - My New School"
};

export type CardType = 'intro' | 'definition' | 'recall';
export type CardStatus = 'locked' | 'new' | 'learning' | 'review';

export type CardState = {
  wordId: string;
  cardType: CardType;
  status: CardStatus;
  step: number;        // vị trí trên thang khoảng cách (0..5)
  dueAt: number;       // timestamp đến hạn ôn
  correctCount: number;
  wrongCount: number;
  lastReviewedAt?: number;
};

export type AnswerQuality = 'correct' | 'hard' | 'wrong';

export type CharDiff = {
  char: string;
  status: 'match' | 'wrong' | 'missing' | 'extra';
};

export type GradeResult = {
  quality: AnswerQuality;
  isExact: boolean;
  isAlmost: boolean;   // Sai đúng 1 ký tự với từ >= 6 chữ cái
  distance: number;
  normalizedUser: string;
  normalizedTarget: string;
  message: string;
  charDiffs: CharDiff[];
};

export type VocabSrsSettings = {
  newWordsPerDay: number;       // mặc định 10
  autoPlayAudio: boolean;       // mặc định true
  voiceLang: 'en-US' | 'en-GB'; // giọng Anh-Mỹ hoặc Anh-Anh
  speechRate: number;           // mặc định 0.9
  teacherPin: string;           // mã PIN do giáo viên thiết lập lần đầu
};

export type DailyReviewStat = {
  date: string;        // YYYY-MM-DD
  reviewCount: number; // tổng số lượt ôn trong ngày
  correctCount: number;
  wrongCount: number;
  newWordsLearned: string[]; // danh sách wordId được bắt đầu học trong ngày
};

export type SessionTurnResult = {
  wordId: string;
  cardType: CardType;
  quality: AnswerQuality;
  userAnswer: string;
  hintsUsed: number;
  timestamp: number;
};

export type VocabSrsStoreData = {
  words: Word[];
  cardStates: Record<string, CardState>; // key: `${wordId}__${cardType}`
  settings: VocabSrsSettings;
  dailyStats: Record<string, DailyReviewStat>; // key: YYYY-MM-DD
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
};
