import {
  Word,
  CardState,
  VocabSrsSettings,
  VocabSrsStoreData,
  DailyReviewStat,
  AnswerQuality,
} from './types';
import { getInitialSeedWords } from './seedData';
import { ensureCardStatesForWords, createInitialCardsForWord } from './srs';

const VOCAB_SRS_STORAGE_KEY = 'global_success_6_vocab_srs_v1';
const APP_DATA_STORAGE_KEY = 'giasu_ai_english6_data_v1';

export const DEFAULT_VOCAB_SETTINGS: VocabSrsSettings = {
  newWordsPerDay: 10,
  autoPlayAudio: true,
  voiceLang: 'en-US',
  speechRate: 0.9,
  teacherPin: '',
};

export function getSharedStreakDays(fallback: number = 0): number {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(APP_DATA_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.currentStudentId && Array.isArray(parsed?.students)) {
          const activeStudent = parsed.students.find((s: any) => s.id === parsed.currentStudentId);
          if (typeof activeStudent?.progress?.streakDays === 'number') {
            return activeStudent.progress.streakDays;
          }
        }
        if (typeof parsed?.progress?.streakDays === 'number') {
          return parsed.progress.streakDays;
        }
      }
    }
  } catch {
    // ignore
  }
  return fallback;
}

export function getTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayKey(date: Date = new Date()): string {
  const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  return getTodayKey(yesterday);
}

/**
 * Tải toàn bộ dữ liệu từ vựng và tiến độ SRS từ localStorage (bọc try/catch an toàn).
 * Được thiết kế tách biệt để dễ dàng chuyển đổi sang Firebase/Supabase sau này.
 */
export function loadVocabSrsData(): VocabSrsStoreData {
  const seedWords = getInitialSeedWords();
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(VOCAB_SRS_STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<VocabSrsStoreData>;
      const existingWords: Word[] = Array.isArray(parsed.words) && parsed.words.length > 0
        ? parsed.words
        : seedWords;

      // Đảm bảo toàn bộ từ chuẩn của Unit 1 (30 từ) và Unit 2 (26 từ) luôn được đồng bộ sạch
      const OBSOLETE_WORD_IDS = new Set([
        'u1-smart',
        'u1-27',
        'u1-28',
        'u1-29',
        'u1-30',
        'u1-31',
        'u1-32',
        'u2-1-room',
        'u2-2-sister',
        'u2-3-behind',
        'u2-4-where',
        'u2-5-live',
        'u2-6-townhouse',
        'u2-7-parents',
        'u2-8-flat',
        'u2-9-aunt',
        'u2-10-cousin',
        'u2-11-living-room',
        'u2-12-bedroom',
        'u2-13-kitchen',
        'u2-14-bathroom',
        'u2-15-buy',
      ]);
      const wordMap = new Map<string, Word>();
      seedWords.forEach((sw) => wordMap.set(sw.id, sw));
      existingWords.forEach((w) => {
        if (OBSOLETE_WORD_IDS.has(w.id)) return;
        const seedMatch = wordMap.get(w.id);
        if (seedMatch) {
          const cleanExistingImage =
            w.imageUrl && !w.imageUrl.includes('pollinations.ai') ? w.imageUrl : undefined;
          wordMap.set(w.id, {
            ...w,
            ...seedMatch,
            imageUrl: seedMatch.imageUrl || cleanExistingImage,
          });
        } else {
          // Chỉ giữ lại các từ do giáo viên tự thêm ngoài danh sách mẫu
          const cleanImage =
            w.imageUrl && !w.imageUrl.includes('pollinations.ai') ? w.imageUrl : undefined;
          wordMap.set(w.id, { ...w, imageUrl: cleanImage });
        }
      });

      const mergedWords = Array.from(wordMap.values());
      const mergedStates = ensureCardStatesForWords(mergedWords, parsed.cardStates || {});

      return {
        words: mergedWords,
        cardStates: mergedStates,
        settings: {
          ...DEFAULT_VOCAB_SETTINGS,
          ...(parsed.settings || {}),
        },
        dailyStats: parsed.dailyStats || {},
        streakDays: getSharedStreakDays(typeof parsed.streakDays === 'number' ? parsed.streakDays : 0),
        lastStudyDate: parsed.lastStudyDate || '',
      };
    }
  } catch (error) {
    console.error('[VocabSRS Storage] Lỗi khi đọc localStorage:', error);
  }

  return {
    words: seedWords,
    cardStates: ensureCardStatesForWords(seedWords, {}),
    settings: { ...DEFAULT_VOCAB_SETTINGS },
    dailyStats: {},
    streakDays: getSharedStreakDays(0),
    lastStudyDate: '',
  };
}

/**
 * Lưu toàn bộ dữ liệu từ vựng và tiến độ SRS xuống localStorage (bọc try/catch an toàn).
 */
export function saveVocabSrsData(data: VocabSrsStoreData): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(VOCAB_SRS_STORAGE_KEY, JSON.stringify(data));
      return true;
    }
  } catch (error) {
    console.error('[VocabSRS Storage] Lỗi khi lưu localStorage:', error);
  }
  return false;
}

/**
 * Ghi nhận một lượt ôn thẻ vào thống kê ngày & cập nhật chuỗi ngày học liên tiếp (streak 🔥)
 */
export function recordTurnInStore(
  store: VocabSrsStoreData,
  updatedCardStates: Record<string, CardState>,
  wordId: string,
  isNewWordIntroCompleted: boolean,
  quality: AnswerQuality,
  nowDate: Date = new Date()
): VocabSrsStoreData {
  const today = getTodayKey(nowDate);
  const yesterday = getYesterdayKey(nowDate);

  const prevDaily: DailyReviewStat = store.dailyStats[today] || {
    date: today,
    reviewCount: 0,
    correctCount: 0,
    wrongCount: 0,
    newWordsLearned: [],
  };

  const nextNewWords = isNewWordIntroCompleted && !prevDaily.newWordsLearned.includes(wordId)
    ? [...prevDaily.newWordsLearned, wordId]
    : prevDaily.newWordsLearned;

  const nextDaily: DailyReviewStat = {
    date: today,
    reviewCount: prevDaily.reviewCount + 1,
    correctCount: quality === 'wrong' ? prevDaily.correctCount : prevDaily.correctCount + 1,
    wrongCount: quality === 'wrong' ? prevDaily.wrongCount + 1 : prevDaily.wrongCount,
    newWordsLearned: nextNewWords,
  };

  let nextStreak = store.streakDays;
  if (store.lastStudyDate !== today) {
    if (store.lastStudyDate === yesterday) {
      nextStreak = store.streakDays + 1;
    } else {
      nextStreak = 1;
    }
  } else if (nextStreak === 0) {
    nextStreak = 1;
  }

  const nextStore: VocabSrsStoreData = {
    ...store,
    cardStates: updatedCardStates,
    dailyStats: {
      ...store.dailyStats,
      [today]: nextDaily,
    },
    streakDays: nextStreak,
    lastStudyDate: today,
  };

  saveVocabSrsData(nextStore);
  return nextStore;
}

/**
 * Xóa toàn bộ tiến độ học tập (giữ lại danh sách từ vựng & cài đặt)
 */
export function resetVocabProgress(store: VocabSrsStoreData): VocabSrsStoreData {
  const freshStates: Record<string, CardState> = {};
  for (const w of store.words) {
    Object.assign(freshStates, createInitialCardsForWord(w.id));
  }

  const nextStore: VocabSrsStoreData = {
    ...store,
    cardStates: freshStates,
    dailyStats: {},
    streakDays: 0,
    lastStudyDate: '',
  };

  saveVocabSrsData(nextStore);
  return nextStore;
}
