import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DAY_MS,
  LEITNER_INTERVALS_DAYS,
  getCardKey,
  ensureCardStatesForWords,
  normalizeAnswer,
  gradeAnswer,
  generateHint,
  isWordMastered,
  scheduleCardReview,
  buildSessionQueue,
  processTurnAndAdvanceQueue,
} from './srs';
import { UNIT1_SEED_WORDS } from './seedData';

test('1. Chấm đáp án (gradeAnswer): chuẩn hóa khoảng trắng, hoa thường, dấu nháy', () => {
  const res1 = gradeAnswer('  SuBjEcT  ', 'subject', 0);
  assert.equal(res1.quality, 'correct');
  assert.equal(res1.isExact, true);

  const resQuote = gradeAnswer('student’s bag', "student's bag", 0);
  assert.equal(resQuote.quality, 'correct');
  assert.equal(resQuote.isExact, true);
});

test('2. Chấm đáp án: sai đúng 1 ký tự với từ >= 6 chữ cái -> Gần đúng rồi! (tính là khó)', () => {
  // "subject" có 7 chữ cái (>= 6), gõ nhầm 1 ký tự thành "subjekt"
  const resAlmost = gradeAnswer('subjekt', 'subject', 0);
  assert.equal(resAlmost.isExact, false);
  assert.equal(resAlmost.isAlmost, true);
  assert.equal(resAlmost.quality, 'hard');
  assert.ok(resAlmost.message.includes('Gần đúng rồi!'));

  // Từ ngắn < 6 chữ cái ("smart" = 5 chữ) sai 1 ký tự -> tính là "wrong"
  const resShort = gradeAnswer('smar', 'smart', 0);
  assert.equal(resShort.isAlmost, false);
  assert.equal(resShort.quality, 'wrong');

  // Dùng gợi ý (hintsUsed = 1) dù gõ đúng 100% -> tính là "hard"
  const resHint = gradeAnswer('subject', 'subject', 1);
  assert.equal(resHint.isExact, true);
  assert.equal(resHint.quality, 'hard');
});

test('3. Nút Gợi ý (generateHint): lần 1 hiện chữ đầu, lần 2 hiện nửa từ', () => {
  const h1 = generateHint('subject', 1);
  assert.equal(h1, 's _ _ _ _ _ _');

  const h2 = generateHint('subject', 2);
  assert.equal(h2, 's u b j _ _ _');
});

test('4. Lên lịch Leitner (scheduleCardReview) & Mở khóa tuần tự Thẻ 1 -> Thẻ 2 -> Thẻ 3', () => {
  const words = UNIT1_SEED_WORDS.slice(0, 1);
  const wId = words[0].id;
  let states = ensureCardStatesForWords(words, {});
  const now = 1_700_000_000_000;

  // Ban đầu: intro = new, definition = locked, recall = locked
  assert.equal(states[getCardKey(wId, 'intro')].status, 'new');
  assert.equal(states[getCardKey(wId, 'definition')].status, 'locked');
  assert.equal(states[getCardKey(wId, 'recall')].status, 'locked');

  // Hoàn thành Thẻ 1 (intro) -> chuyển sang review hạn 1 ngày, mở khóa Thẻ 2
  const r1 = scheduleCardReview(states, wId, 'intro', 'correct', now);
  states = r1.updatedCardStates;
  assert.equal(states[getCardKey(wId, 'intro')].status, 'review');
  assert.equal(states[getCardKey(wId, 'intro')].dueAt, now + 1 * DAY_MS);
  assert.equal(states[getCardKey(wId, 'definition')].status, 'learning');
  assert.equal(states[getCardKey(wId, 'recall')].status, 'locked');

  // Trả lời đúng Thẻ 2 (definition) lần 1 -> step = 1 (1 ngày), mở khóa Thẻ 3
  const r2 = scheduleCardReview(states, wId, 'definition', 'correct', now);
  states = r2.updatedCardStates;
  assert.equal(states[getCardKey(wId, 'definition')].step, 1);
  assert.equal(states[getCardKey(wId, 'definition')].dueAt, now + LEITNER_INTERVALS_DAYS[1] * DAY_MS);
  assert.equal(states[getCardKey(wId, 'recall')].status, 'learning');

  // Trả lời "khó" (hard) trên Thẻ 2 -> giữ nguyên step = 1, hẹn lại 1 ngày
  const rHard = scheduleCardReview(states, wId, 'definition', 'hard', now);
  states = rHard.updatedCardStates;
  assert.equal(states[getCardKey(wId, 'definition')].step, 1);
  assert.equal(states[getCardKey(wId, 'definition')].dueAt, now + LEITNER_INTERVALS_DAYS[1] * DAY_MS);

  // Trả lời "sai" (wrong) trên Thẻ 2 -> step về 0
  const rWrong = scheduleCardReview(states, wId, 'definition', 'wrong', now);
  states = rWrong.updatedCardStates;
  assert.equal(states[getCardKey(wId, 'definition')].step, 0);
  assert.equal(states[getCardKey(wId, 'definition')].wrongCount, 1);

  // Tăng cả Thẻ 2 và Thẻ 3 lên step = 3 -> từ được coi là "đã thuộc"
  for (let s = 0; s < 3; s++) {
    states = scheduleCardReview(states, wId, 'definition', 'correct', now).updatedCardStates;
    states = scheduleCardReview(states, wId, 'recall', 'correct', now).updatedCardStates;
  }
  assert.equal(isWordMastered(wId, states), true);
});

test('5. Mô phỏng buổi học 10 từ mới: đi qua đúng 30 lượt, Thẻ 2/3 không bao giờ xuất hiện trước khi mở khóa', () => {
  const words = UNIT1_SEED_WORDS.slice(0, 15);
  let states = ensureCardStatesForWords(words, {});
  const now = 1_700_000_000_000;

  let queue = buildSessionQueue(words, states, 10, now);
  // Đầu buổi: chỉ có 10 thẻ intro của 10 từ mới
  assert.equal(queue.length, 10);
  assert.ok(queue.every((q) => q.cardType === 'intro'));

  let idx = 0;
  const seenIntro = new Set<string>();
  const seenDefinition = new Set<string>();

  while (idx < queue.length) {
    const current = queue[idx];

    // Kiểm tra Thẻ 2 không bao giờ xuất hiện trước Thẻ 1 của từ đó
    if (current.cardType === 'definition') {
      assert.ok(
        seenIntro.has(current.wordId),
        `Thẻ definition của ${current.wordId} xuất hiện trước thẻ intro!`
      );
      seenDefinition.add(current.wordId);
    }

    // Kiểm tra Thẻ 3 không bao giờ xuất hiện trước Thẻ 2 của từ đó
    if (current.cardType === 'recall') {
      assert.ok(
        seenDefinition.has(current.wordId),
        `Thẻ recall của ${current.wordId} xuất hiện trước thẻ definition!`
      );
    }

    if (current.cardType === 'intro') {
      seenIntro.add(current.wordId);
    }

    const res = processTurnAndAdvanceQueue(queue, idx, states, 'correct', now);
    queue = res.nextQueue;
    idx = res.nextIndex;
    states = res.updatedCardStates;
  }

  // Học trọn 10 từ mới với tất cả câu trả lời đúng = đúng 30 lượt (10 * 3 thẻ)
  assert.equal(queue.length, 30);
  assert.equal(idx, 30);
});

test('6. Mô phỏng trả lời SAI trong buổi học: thẻ sai quay lại sau 3–5 thẻ khác và tổng lượt > 30', () => {
  const words = UNIT1_SEED_WORDS.slice(0, 10);
  let states = ensureCardStatesForWords(words, {});
  const now = 1_700_000_000_000;

  let queue = buildSessionQueue(words, states, 10, now);
  let idx = 0;
  let injectedWrongOnce = false;
  let wrongCardWordId = '';
  let wrongTurnIndex = -1;
  let retryTurnIndex = -1;

  while (idx < queue.length) {
    const current = queue[idx];
    let quality: 'correct' | 'wrong' = 'correct';

    // Giả lập học sinh trả lời SAI ở thẻ definition đầu tiên gặp phải
    if (!injectedWrongOnce && current.cardType === 'definition') {
      quality = 'wrong';
      injectedWrongOnce = true;
      wrongCardWordId = current.wordId;
      wrongTurnIndex = idx;
    } else if (
      injectedWrongOnce &&
      retryTurnIndex === -1 &&
      current.wordId === wrongCardWordId &&
      current.cardType === 'definition'
    ) {
      retryTurnIndex = idx;
    }

    const res = processTurnAndAdvanceQueue(queue, idx, states, quality, now);
    queue = res.nextQueue;
    idx = res.nextIndex;
    states = res.updatedCardStates;
  }

  assert.equal(injectedWrongOnce, true);
  assert.ok(retryTurnIndex > wrongTurnIndex, 'Thẻ trả lời sai phải xuất hiện lại trong cùng buổi học!');
  // Khoảng cách giữa lần sai và lần xuất hiện lại phải từ 3–5 thẻ khác (tức chênh lệch index >= 4)
  assert.ok(
    retryTurnIndex - wrongTurnIndex >= 4,
    `Thẻ sai phải quay lại sau ít nhất 3 thẻ khác (chênh lệch thực tế: ${retryTurnIndex - wrongTurnIndex})`
  );
  // Vì có 1 lần sai ở thẻ 2 (chưa mở khóa thẻ 3 ở lần sai, đến lần làm lại đúng mới mở khóa thẻ 3), tổng số lượt là 31 (> 30)
  assert.equal(queue.length, 31);
});
