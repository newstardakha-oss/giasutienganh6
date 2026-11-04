import {
  Word,
  CardType,
  CardState,
  AnswerQuality,
  GradeResult,
  CharDiff,
} from './types';

export const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Thang khoảng cách theo kiểu hộp Leitner:
 * [ngay trong buổi (0 ngày), 1 ngày, 3 ngày, 7 ngày, 14 ngày, 30 ngày]
 */
export const LEITNER_INTERVALS_DAYS = [0, 1, 3, 7, 14, 30] as const;

export function getCardKey(wordId: string, cardType: CardType): string {
  return `${wordId}__${cardType}`;
}

export function createInitialCardsForWord(wordId: string): Record<string, CardState> {
  return {
    [getCardKey(wordId, 'intro')]: {
      wordId,
      cardType: 'intro',
      status: 'new',
      step: 0,
      dueAt: 0,
      correctCount: 0,
      wrongCount: 0,
    },
    [getCardKey(wordId, 'definition')]: {
      wordId,
      cardType: 'definition',
      status: 'locked',
      step: 0,
      dueAt: 0,
      correctCount: 0,
      wrongCount: 0,
    },
    [getCardKey(wordId, 'recall')]: {
      wordId,
      cardType: 'recall',
      status: 'locked',
      step: 0,
      dueAt: 0,
      correctCount: 0,
      wrongCount: 0,
    },
  };
}

/**
 * Đảm bảo mọi từ trong danh sách đều có đủ 3 CardState
 */
export function ensureCardStatesForWords(
  words: Word[],
  existingStates: Record<string, CardState>
): Record<string, CardState> {
  const nextStates = { ...existingStates };
  for (const w of words) {
    const initial = createInitialCardsForWord(w.id);
    for (const key of Object.keys(initial)) {
      if (!nextStates[key]) {
        nextStates[key] = initial[key];
      }
    }
  }
  return nextStates;
}

/**
 * Chuẩn hóa chuỗi để chấm đáp án:
 * - Bỏ khoảng trắng thừa đầu/cuối và gộp khoảng trắng thừa ở giữa
 * - Không phân biệt hoa thường
 * - Chuẩn hóa dấu nháy (’, ‘, `, ´ -> ')
 */
export function normalizeAnswer(input: string): string {
  return (input || '')
    .replace(/[’‘`´]/g, "'")
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Tính khoảng cách chỉnh sửa Levenshtein giữa 2 chuỗi
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,       // xóa
        dp[i][j - 1] + 1,       // thêm
        dp[i - 1][j - 1] + cost // thay thế
      );
    }
  }
  return dp[m][n];
}

/**
 * Phân tích từng ký tự người dùng gõ so với đáp án đúng để tô sáng lỗi sai
 */
export function computeCharDiffs(userRaw: string, targetRaw: string): CharDiff[] {
  const user = normalizeAnswer(userRaw);
  const target = normalizeAnswer(targetRaw);
  const maxLen = Math.max(user.length, target.length);
  const diffs: CharDiff[] = [];

  for (let i = 0; i < maxLen; i++) {
    const uChar = user[i];
    const tChar = target[i];
    if (uChar !== undefined && tChar !== undefined) {
      if (uChar === tChar) {
        diffs.push({ char: user[i], status: 'match' });
      } else {
        diffs.push({ char: user[i], status: 'wrong' });
      }
    } else if (uChar === undefined && tChar !== undefined) {
      diffs.push({ char: '_', status: 'missing' });
    } else if (uChar !== undefined && tChar === undefined) {
      diffs.push({ char: user[i], status: 'extra' });
    }
  }
  return diffs;
}

/**
 * Chấm đáp án cho Thẻ 2 (definition) và Thẻ 3 (recall):
 * - Bỏ khoảng trắng thừa đầu/cuối, không phân biệt hoa thường, chuẩn hóa dấu nháy.
 * - Sai đúng 1 ký tự với từ dài >= 6 chữ cái: thông báo "Gần đúng rồi!", tính là "khó" ("hard").
 * - Nếu đúng hoàn toàn nhưng có dùng gợi ý (hintsUsed > 0): tính là "khó" ("hard").
 * - Nếu đúng hoàn toàn và không dùng gợi ý: tính là "đúng" ("correct").
 */
export function gradeAnswer(
  userInput: string,
  targetWord: string,
  hintsUsed: number = 0
): GradeResult {
  const normalizedUser = normalizeAnswer(userInput);
  const normalizedTarget = normalizeAnswer(targetWord);
  const distance = levenshteinDistance(normalizedUser, normalizedTarget);
  const charDiffs = computeCharDiffs(userInput, targetWord);

  // Đếm số chữ cái của từ mục tiêu (không tính khoảng trắng)
  const letterCount = normalizedTarget.replace(/\s+/g, '').length;

  if (distance === 0) {
    const quality: AnswerQuality = hintsUsed > 0 ? 'hard' : 'correct';
    return {
      quality,
      isExact: true,
      isAlmost: false,
      distance: 0,
      normalizedUser,
      normalizedTarget,
      message:
        hintsUsed > 0
          ? 'Chính xác! (Có dùng gợi ý nên hệ thống xếp mức "Khó" để em ôn kỹ hơn nhé)'
          : 'Tuyệt vời! Chính xác 100%! 🎉',
      charDiffs,
    };
  }

  if (distance === 1 && letterCount >= 6) {
    return {
      quality: 'hard',
      isExact: false,
      isAlmost: true,
      distance: 1,
      normalizedUser,
      normalizedTarget,
      message: 'Gần đúng rồi! Em chỉ nhầm 1 ký tự nhỏ thôi!',
      charDiffs,
    };
  }

  return {
    quality: 'wrong',
    isExact: false,
    isAlmost: false,
    distance,
    normalizedUser,
    normalizedTarget,
    message: 'Chưa chính xác rồi, em xem kỹ đáp án và gõ lại 1 lần để nhớ nhé!',
    charDiffs,
  };
}

/**
 * Tạo gợi ý 2 cấp độ:
 * - Lần 1 (level = 1): hiện chữ cái đầu và số ký tự (vd "s _ _ _ _ _ _")
 * - Lần 2 (level = 2): hiện thêm nửa từ (vd "s u b j _ _ _")
 */
export function generateHint(word: string, level: 1 | 2): string {
  const trimmed = word.trim();
  if (!trimmed) return '';

  if (level === 1) {
    return trimmed
      .split('')
      .map((ch, idx) => {
        if (ch === ' ') return '  ';
        if (idx === 0) return ch;
        return '_';
      })
      .join(' ');
  }

  // Level 2: hiện nửa số ký tự đầu tiên
  const nonSpaceTotal = trimmed.replace(/\s+/g, '').length;
  const revealCount = Math.max(1, Math.ceil(nonSpaceTotal / 2));
  let revealedSoFar = 0;

  return trimmed
    .split('')
    .map((ch) => {
      if (ch === ' ') return '  ';
      if (revealedSoFar < revealCount) {
        revealedSoFar++;
        return ch;
      }
      return '_';
    })
    .join(' ');
}

/**
 * Kiểm tra một từ đã được coi là "đã thuộc" hay chưa:
 * "Một từ được coi là 'đã thuộc' khi cả thẻ 2 và thẻ 3 đạt step >= 3."
 */
export function isWordMastered(
  wordId: string,
  cardStates: Record<string, CardState>
): boolean {
  const card2 = cardStates[getCardKey(wordId, 'definition')];
  const card3 = cardStates[getCardKey(wordId, 'recall')];
  if (!card2 || !card3) return false;
  return card2.step >= 3 && card3.step >= 3;
}

/**
 * Lên lịch ôn tập cho thẻ sau khi học sinh trả lời:
 * - Thẻ 1 (intro) hoàn thành -> chuyển thẳng sang "review" với hạn 1 ngày, mở khóa thẻ 2 ngay trong buổi.
 * - Thẻ 2 (definition) & Thẻ 3 (recall):
 *   + Đúng (correct): step tăng 1, dueAt = now + khoảng cách tương ứng. Nếu là thẻ 2 thì mở khóa thẻ 3 ngay trong buổi.
 *   + Khó (hard - dùng gợi ý / gần đúng): giữ nguyên step, hẹn lại theo khoảng cách hiện tại. Nếu là thẻ 2 thì mở khóa thẻ 3 ngay trong buổi.
 *   + Sai (wrong): step về 0, dueAt = now (chèn lại vào hàng đợi buổi hiện tại sau 3–5 thẻ khác).
 */
export function scheduleCardReview(
  cardStates: Record<string, CardState>,
  wordId: string,
  cardType: CardType,
  quality: AnswerQuality,
  now: number = Date.now()
): {
  updatedCardStates: Record<string, CardState>;
  updatedCard: CardState;
  unlockedNextCard: CardState | null;
} {
  const nextStates = { ...cardStates };
  const key = getCardKey(wordId, cardType);
  const current = nextStates[key] || createInitialCardsForWord(wordId)[key];

  let unlockedNextCard: CardState | null = null;

  if (cardType === 'intro') {
    const updatedCard: CardState = {
      ...current,
      status: 'review',
      step: 1,
      dueAt: now + LEITNER_INTERVALS_DAYS[1] * DAY_MS,
      correctCount: current.correctCount + 1,
      lastReviewedAt: now,
    };
    nextStates[key] = updatedCard;

    // Mở khóa Thẻ 2 (definition) ngay trong buổi
    const defKey = getCardKey(wordId, 'definition');
    const defCard = nextStates[defKey] || createInitialCardsForWord(wordId)[defKey];
    if (defCard.status === 'locked') {
      const unlockedDef: CardState = {
        ...defCard,
        status: 'learning',
        step: 0,
        dueAt: now,
      };
      nextStates[defKey] = unlockedDef;
      unlockedNextCard = unlockedDef;
    }

    return {
      updatedCardStates: nextStates,
      updatedCard,
      unlockedNextCard,
    };
  }

  let newStep = current.step;
  let newStatus = current.status;
  let newDueAt = now;
  let newCorrectCount = current.correctCount;
  let newWrongCount = current.wrongCount;

  if (quality === 'correct') {
    newStep = Math.min(current.step + 1, LEITNER_INTERVALS_DAYS.length - 1);
    newStatus = 'review';
    newDueAt = now + LEITNER_INTERVALS_DAYS[newStep] * DAY_MS;
    newCorrectCount += 1;
  } else if (quality === 'hard') {
    newStep = current.step;
    newStatus = newStep === 0 ? 'learning' : 'review';
    newDueAt = now + LEITNER_INTERVALS_DAYS[newStep] * DAY_MS;
    newCorrectCount += 1;
  } else {
    newStep = 0;
    newStatus = 'learning';
    newDueAt = now;
    newWrongCount += 1;
  }

  const updatedCard: CardState = {
    ...current,
    status: newStatus,
    step: newStep,
    dueAt: newDueAt,
    correctCount: newCorrectCount,
    wrongCount: newWrongCount,
    lastReviewedAt: now,
  };
  nextStates[key] = updatedCard;

  // Nếu Thẻ 2 trả lời đúng ít nhất 1 lần (correct hoặc hard), mở khóa Thẻ 3 (recall)
  if (cardType === 'definition' && (quality === 'correct' || quality === 'hard')) {
    const recallKey = getCardKey(wordId, 'recall');
    const recallCard = nextStates[recallKey] || createInitialCardsForWord(wordId)[recallKey];
    if (recallCard.status === 'locked') {
      const unlockedRecall: CardState = {
        ...recallCard,
        status: 'learning',
        step: 0,
        dueAt: now,
      };
      nextStates[recallKey] = unlockedRecall;
      unlockedNextCard = unlockedRecall;
    }
  }

  return {
    updatedCardStates: nextStates,
    updatedCard,
    unlockedNextCard,
  };
}

export type QueueItem = {
  wordId: string;
  cardType: CardType;
};

/**
 * Sắp xếp mảng thẻ sao cho không có 2 thẻ của cùng một từ đứng liền nhau (nếu có thể)
 */
export function interleaveCards(items: QueueItem[]): QueueItem[] {
  if (items.length <= 1) return [...items];

  const remaining = [...items];
  const result: QueueItem[] = [];

  while (remaining.length > 0) {
    const lastWordId = result.length > 0 ? result[result.length - 1].wordId : null;
    let pickIdx = remaining.findIndex((item) => item.wordId !== lastWordId);
    if (pickIdx === -1) {
      pickIdx = 0;
    }
    const [picked] = remaining.splice(pickIdx, 1);
    result.push(picked);
  }

  return result;
}

/**
 * Chèn một thẻ vào phần còn lại của hàng đợi (từ vị trí currentIndex + 1 trở đi)
 * với khoảng cách tối thiểu [minOffset, maxOffset] thẻ khác, đồng thời tránh đứng cạnh
 * thẻ khác của cùng một từ (wordId).
 */
export function insertCardIntoQueue(
  queue: QueueItem[],
  currentIndex: number,
  newItem: QueueItem,
  minOffset: number,
  maxOffset: number
): QueueItem[] {
  const nextQueue = [...queue];
  const remainingCount = Math.max(0, nextQueue.length - 1 - currentIndex);

  const desiredOffset = Math.min(
    maxOffset,
    Math.max(minOffset, Math.floor((minOffset + maxOffset) / 2))
  );

  const insertPos = currentIndex + 1 + Math.min(desiredOffset, remainingCount);

  let bestPos = insertPos;
  let foundNonAdjacent = false;
  for (let pos = insertPos; pos <= nextQueue.length; pos++) {
    const prevWordId = pos - 1 >= currentIndex ? nextQueue[pos - 1]?.wordId : null;
    const nextWordId = pos < nextQueue.length ? nextQueue[pos]?.wordId : null;
    if (prevWordId !== newItem.wordId && nextWordId !== newItem.wordId) {
      bestPos = pos;
      foundNonAdjacent = true;
      break;
    }
  }

  if (!foundNonAdjacent) {
    bestPos = nextQueue.length;
  }

  nextQueue.splice(bestPos, 0, newItem);
  return nextQueue;
}

/**
 * Đếm danh sách thẻ đến hạn ôn (dueAt <= now)
 * Chỉ tính các thẻ đã mở khóa (status === 'learning' hoặc 'review') của cardType 'definition' và 'recall'
 */
export function getDueReviewCards(
  words: Word[],
  cardStates: Record<string, CardState>,
  now: number = Date.now(),
  unitFilter?: string
): CardState[] {
  const filteredWords = unitFilter
    ? words.filter((w) => w.unit === unitFilter)
    : words;

  const dueCards: CardState[] = [];

  for (const word of filteredWords) {
    for (const cType of ['definition', 'recall'] as CardType[]) {
      const state = cardStates[getCardKey(word.id, cType)];
      if (!state) continue;
      if (state.status === 'locked' || state.status === 'new') continue;
      if (state.dueAt <= now) {
        dueCards.push(state);
      }
    }
  }

  // Thẻ quá hạn lâu nhất lên trước (dueAt tăng dần)
  dueCards.sort((a, b) => a.dueAt - b.dueAt);
  return dueCards;
}

/**
 * Lấy danh sách từ mới chưa học (có thẻ intro ở trạng thái 'new')
 */
export function getNewWordsToLearn(
  words: Word[],
  cardStates: Record<string, CardState>,
  maxNewWords: number,
  unitFilter?: string
): Word[] {
  if (maxNewWords <= 0) return [];
  const filteredWords = unitFilter
    ? words.filter((w) => w.unit === unitFilter)
    : words;

  const newWords: Word[] = [];
  for (const word of filteredWords) {
    const introState = cardStates[getCardKey(word.id, 'intro')];
    if (!introState || introState.status === 'new') {
      newWords.push(word);
      if (newWords.length >= maxNewWords) break;
    }
  }
  return newWords;
}

/**
 * Xây dựng hàng đợi bắt đầu một buổi học:
 * 1. Ưu tiên các thẻ đã đến hạn ôn (dueAt <= now), thẻ quá hạn lâu nhất lên trước.
 * 2. Sau đó mới đến từ mới, giới hạn số từ mới mỗi ngày (mặc định 10).
 * 3. Không để 2 thẻ của cùng một từ xuất hiện liền nhau.
 * 4. Tuyệt đối KHÔNG đưa thẻ đang 'locked' vào hàng đợi (Thẻ 2 và Thẻ 3 sẽ được mở khóa động trong buổi học).
 */
export function buildSessionQueue(
  words: Word[],
  cardStates: Record<string, CardState>,
  maxNewWords: number = 10,
  now: number = Date.now(),
  unitFilter?: string
): QueueItem[] {
  const dueCards = getDueReviewCards(words, cardStates, now, unitFilter);
  const dueQueueItems: QueueItem[] = dueCards.map((c) => ({
    wordId: c.wordId,
    cardType: c.cardType,
  }));

  const newWords = getNewWordsToLearn(words, cardStates, maxNewWords, unitFilter);
  const newQueueItems: QueueItem[] = newWords.map((w) => ({
    wordId: w.id,
    cardType: 'intro',
  }));

  // Xen kẽ các thẻ đến hạn trước, sau đó nối tiếp các từ mới (hoặc xen kẽ nếu từ cuối phần due trùng từ đầu phần new)
  const interleavedDue = interleaveCards(dueQueueItems);
  const combined = [...interleavedDue, ...newQueueItems];
  return interleaveCards(combined);
}

/**
 * Xử lý kết quả 1 lượt trả lời trong buổi học:
 * - Cập nhật CardState theo thuật toán Leitner SRS
 * - Nếu mở khóa thẻ mới (Thẻ 1 -> Thẻ 2, hoặc Thẻ 2 -> Thẻ 3): chèn thẻ vừa mở khóa vào hàng đợi sau 2–3 thẻ khác
 * - Nếu trả lời Sai (wrong) ở Thẻ 2 hoặc Thẻ 3: chèn lại chính thẻ đó vào hàng đợi sau 3–5 thẻ khác
 */
export function processTurnAndAdvanceQueue(
  queue: QueueItem[],
  currentIndex: number,
  cardStates: Record<string, CardState>,
  quality: AnswerQuality,
  now: number = Date.now()
): {
  nextQueue: QueueItem[];
  nextIndex: number;
  updatedCardStates: Record<string, CardState>;
  unlockedCard: CardState | null;
} {
  const currentItem = queue[currentIndex];
  if (!currentItem) {
    return {
      nextQueue: queue,
      nextIndex: currentIndex,
      updatedCardStates: cardStates,
      unlockedCard: null,
    };
  }

  const { updatedCardStates, unlockedNextCard } = scheduleCardReview(
    cardStates,
    currentItem.wordId,
    currentItem.cardType,
    quality,
    now
  );

  let nextQueue = [...queue];

  // Nếu mở khóa thẻ tiếp theo (Thẻ 2 sau Thẻ 1, hoặc Thẻ 3 sau Thẻ 2) -> chèn sau 2–3 thẻ khác
  if (unlockedNextCard) {
    nextQueue = insertCardIntoQueue(
      nextQueue,
      currentIndex,
      {
        wordId: unlockedNextCard.wordId,
        cardType: unlockedNextCard.cardType,
      },
      2,
      3
    );
  }

  // Nếu trả lời sai ở Thẻ 2 hoặc Thẻ 3 -> chèn lại thẻ đó vào hàng đợi sau 3–5 thẻ khác
  if (currentItem.cardType !== 'intro' && quality === 'wrong') {
    nextQueue = insertCardIntoQueue(
      nextQueue,
      currentIndex,
      {
        wordId: currentItem.wordId,
        cardType: currentItem.cardType,
      },
      3,
      5
    );
  }

  return {
    nextQueue,
    nextIndex: currentIndex + 1,
    updatedCardStates,
    unlockedCard: unlockedNextCard,
  };
}
