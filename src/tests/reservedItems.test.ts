/**
 * Automated Test cho Mục 4.4 (KE_HOACH_KIEM_TRA_DAU_VAO_DAU_RA.md):
 * Khẳng định không có `id` nào thuộc `reservedItemIds` xuất hiện trong:
 *  1. Luyện tập Ngữ pháp (`loadGrammarDataset().dataset` & `itemIndex`)
 *  2. Kiểm tra nhanh (`getQuickTestItemPool(unit)`)
 *  3. Sổ lỗi sai (`getMistakePracticePool(store, itemIndex)`)
 *  4. Ngân hàng câu hỏi Luyện tập / Đấu tri thức (`INITIAL_QUESTIONS`)
 *  5. Gia sư AI (`containsReservedTestItemContent`)
 *  6. Bản đề gửi cho học sinh (`sanitizeTestFormForStudent`) không lộ đáp án (`answerIndex`, `blanks.accept`, `accept`, `explanation`).
 *
 * Chạy: npx tsx src/tests/reservedItems.test.ts
 */
import assert from 'node:assert/strict';
import { loadGrammarDataset } from '../grammar-g6/dataLoader';
import {
  containsReservedTestItemContent,
  getMistakePracticePool,
  getQuickTestItemPool,
  getReservedItemIdSet,
  getTestFormsDataset,
  isReservedTestItemId,
  sanitizeTestFormForStudent,
} from '../grammar-g6/testFormsLoader';
import { DEMO_QUESTIONS } from '../data/sgkData';
import type { GrammarStudentStore } from '../grammar-g6/types';

async function runReservedItemsTests() {
  const testForms = getTestFormsDataset();
  const reservedSet = getReservedItemIdSet();

  assert.equal(testForms.tests.length, 4, 'Phải có đúng 4 đề kiểm tra (hk1-A, hk1-B, hk2-A, hk2-B)');
  assert.equal(
    testForms.reservedItemIds.length,
    128,
    'Phải có 128 câu ngữ pháp trong reservedItemIds'
  );
  assert.ok(reservedSet.size >= 160, 'Tập hợp reserved IDs (ngữ pháp + từ vựng) phải >= 160 câu');

  // 1. Duyệt toàn bộ bộ bài luyện tập ngữ pháp
  const bundle = await loadGrammarDataset();
  let totalPracticeItems = 0;

  for (const unit of bundle.dataset.units) {
    for (const set of unit.exerciseSets) {
      for (const item of set.items) {
        totalPracticeItems++;
        assert.equal(
          reservedSet.has(item.id),
          false,
          `Lỗi: Câu hỏi ${item.id} trong bộ luyện tập ${set.id} (Unit ${unit.number}) thuộc reservedItemIds!`
        );
        assert.equal(
          isReservedTestItemId(item.id),
          false,
          `Lỗi: isReservedTestItemId(${item.id}) phải là false trong bộ bài luyện tập!`
        );
      }
    }

    // 2. Kiểm tra nhanh của từng Unit
    const quickPool = getQuickTestItemPool(unit, reservedSet);
    for (const id of quickPool) {
      assert.equal(
        reservedSet.has(id),
        false,
        `Lỗi: Kiểm tra nhanh Unit ${unit.number} chứa câu reserved ${id}!`
      );
    }
  }

  // Kiểm tra itemIndex của luyện tập
  for (const id of Object.keys(bundle.itemIndex)) {
    assert.equal(
      reservedSet.has(id),
      false,
      `Lỗi: itemIndex luyện tập chứa câu reserved ${id}!`
    );
  }

  // 3. Kiểm tra Sổ lỗi sai (giả lập học sinh có cả câu reserved lẫn câu thường trong mistakes)
  const sampleNormalId = Object.keys(bundle.itemIndex)[0];
  const sampleReservedId = testForms.reservedItemIds[0];
  const fakeStore: GrammarStudentStore = {
    best: {},
    mistakes: {
      [sampleNormalId]: 2,
      [sampleReservedId]: 3,
    },
    attempts: [],
    setProgress: {},
  };
  const mistakePool = getMistakePracticePool(fakeStore, bundle.itemIndex, reservedSet);
  assert.ok(mistakePool.includes(sampleNormalId), 'Sổ lỗi sai phải giữ lại câu luyện tập bình thường');
  assert.equal(
    mistakePool.includes(sampleReservedId),
    false,
    'Sổ lỗi sai tuyệt đối không được chứa câu trong reservedItemIds'
  );

  // 4. Kiểm tra ngân hàng câu hỏi chung (PracticeHub & Đấu tri thức GameArena)
  const practiceQuestions = DEMO_QUESTIONS.filter((q) => !isReservedTestItemId(q.id));
  for (const q of practiceQuestions) {
    assert.equal(
      reservedSet.has(q.id),
      false,
      `Lỗi: Câu hỏi ${q.id} trong PracticeHub / GameArena thuộc reservedItemIds!`
    );
  }

  // 5. Kiểm tra chặn gửi câu hỏi thuộc đề kiểm tra cho Gia sư AI
  const firstTestItem = testForms.tests[0].items[0];
  assert.equal(
    containsReservedTestItemContent(`Giải giúp em câu ${firstTestItem.id}`),
    true,
    'Gia sư AI phải phát hiện mã câu hỏi thuộc đề kiểm tra'
  );
  if (firstTestItem.prompt && firstTestItem.prompt.length >= 20) {
    assert.equal(
      containsReservedTestItemContent(firstTestItem.prompt),
      true,
      'Gia sư AI phải phát hiện nội dung câu hỏi thuộc đề kiểm tra'
    );
  }

  // 6. Kiểm tra sanitizeTestFormForStudent không lộ đáp án
  for (const form of testForms.tests) {
    const sanitized = sanitizeTestFormForStudent(form);
    assert.equal(sanitized.items.length, 40, `Đề ${form.id} phải có đủ 40 câu`);
    for (const item of sanitized.items as unknown as Array<Record<string, unknown>>) {
      assert.equal('answerIndex' in item, false, `Đề học sinh ${form.id} bị lộ answerIndex ở câu ${item.id}`);
      assert.equal('accept' in item, false, `Đề học sinh ${form.id} bị lộ accept ở câu ${item.id}`);
      assert.equal('blanks' in item, false, `Đề học sinh ${form.id} bị lộ blanks.accept ở câu ${item.id}`);
      assert.equal('explanation' in item, false, `Đề học sinh ${form.id} bị lộ explanation ở câu ${item.id}`);
    }
  }

  console.log(
    `✓ PASS: Đã kiểm duyệt ${totalPracticeItems} câu luyện tập Ngữ pháp, 12 Unit Kiểm tra nhanh, Sổ lỗi sai, ${practiceQuestions.length} câu Đấu tri thức & Gia sư AI — 0 câu nào trùng với ${reservedSet.size} reservedItemIds!`
  );
}

runReservedItemsTests().catch((err) => {
  console.error('✗ FAIL:', err);
  process.exit(1);
});
