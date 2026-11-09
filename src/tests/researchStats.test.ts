/**
 * Unit Test cho Mục 4.7 (KE_HOACH_KIEM_TRA_DAU_VAO_DAU_RA.md):
 * Đối chiếu kết quả tính toán bằng thư viện `jstat` với bộ số liệu chuẩn SciPy.
 *
 * Chạy: npx tsx src/tests/researchStats.test.ts
 */
import assert from 'node:assert/strict';
import {
  buildResearchComparisonSummary,
  computeItemPsychometrics,
  computeSplitHalfReliability,
} from '../services/researchStats';
import { buildResearchStudySheets } from '../services/excelExport';
import {
  createTestRound,
  evaluateAndFinalizeAttempt,
  getFormById,
  getReplacementCandidatesForTestItem,
  getStudentSanitizedTestForm,
  loadTestVoidLogs,
  replaceItemInTestForm,
  resetTestFormToDefault,
  saveStudentItemResponse,
  startOrResumeTestAttempt,
  voidStudentTestAttempt,
} from '../services/researchTests';
import { loadGrammarDataset } from '../grammar-g6/dataLoader';
import { StudentAccount } from '../types';

function assertClose(actual: number, expected: number, tol: number, message: string) {
  const diff = Math.abs(actual - expected);
  assert.ok(
    diff <= tol,
    `${message}: kỳ vọng ${expected} (±${tol}), nhận được ${actual} (chênh lệch ${diff})`
  );
}

async function runStatsBenchmarkTests() {
  const tn_pre = [5.5, 6.0, 4.5, 7.0, 5.0, 6.5, 5.5, 4.0, 6.0, 5.0];
  const dc_pre = [5.0, 6.5, 4.5, 6.0, 5.5, 6.0, 5.0, 4.5, 6.5, 5.0];
  const tn_post = [7.5, 8.0, 6.0, 8.5, 7.0, 8.0, 7.0, 5.5, 8.0, 6.5];
  const dc_post = [6.0, 7.0, 5.0, 6.5, 6.0, 7.0, 5.5, 5.0, 7.0, 5.5];

  const summary = buildResearchComparisonSummary({
    tnPre: tn_pre,
    dcPre: dc_pre,
    tnPost: tn_post,
    dcPost: dc_post,
  });

  // 1. p trước (Welch) = 0.8957
  assertClose(summary.preWelch.p, 0.8957, 1e-4, 'p trước (Welch)');
  assert.equal(summary.preWelch.significant, false, 'Trước tác động hai nhóm phải tương đương');

  // 2. p sau (Welch) = 0.0102
  assertClose(summary.postWelch.p, 0.0102, 1e-4, 'p sau (Welch)');
  assert.equal(summary.postWelch.significant, true, 'Sau tác động chênh lệch phải có ý nghĩa');

  // 3. p cặp TN trước/sau = 6.37e-9
  assertClose(summary.tnPaired.p, 6.37e-9, 5e-11, 'p cặp TN trước/sau');
  assert.equal(summary.tnPaired.significant, true, 'Tiến bộ trong nhóm TN phải có ý nghĩa');

  // 4. TB sau: TN 7.20, ĐC 6.05; SD ĐC 0.7976; SMD = 1.442
  assertClose(summary.tnPost.mean, 7.2, 1e-6, 'Điểm TB sau của TN');
  assertClose(summary.dcPost.mean, 6.05, 1e-6, 'Điểm TB sau của ĐC');
  assertClose(summary.dcPost.sd, 0.7976, 1e-4, 'Độ lệch chuẩn sau của ĐC');
  assertClose(summary.smd.smd, 1.442, 1e-3, 'Mức độ ảnh hưởng SMD');
  assert.equal(summary.smd.label, 'Rất lớn', 'Nhãn mức độ ảnh hưởng SMD > 1.0');

  // 5. Kiểm tra câu kết luận tự sinh
  assert.ok(
    summary.conclusionText.includes('Trước tác động p = 0,896 > 0,05: hai nhóm tương đương.'),
    `Câu kết luận thiếu nhận xét đầu vào: ${summary.conclusionText}`
  );
  assert.ok(
    summary.conclusionText.includes('Sau tác động p = 0,010 < 0,05: chênh lệch có ý nghĩa'),
    `Câu kết luận thiếu nhận xét đầu ra: ${summary.conclusionText}`
  );
  assert.ok(
    summary.conclusionText.includes('SMD = 1,44: mức độ ảnh hưởng rất lớn.'),
    `Câu kết luận thiếu nhận xét SMD: ${summary.conclusionText}`
  );

  // 6. Kiểm tra độ tin cậy Spearman-Brown & Item Psychometrics
  const itemIds = ['q1', 'q2', 'q3', 'q4'];
  const rel = computeSplitHalfReliability(itemIds, [
    { q1: { correct: true }, q2: { correct: true }, q3: { correct: true }, q4: { correct: true } },
    { q1: { correct: true }, q2: { correct: true }, q3: { correct: false }, q4: { correct: false } },
    { q1: { correct: false }, q2: { correct: false }, q3: { correct: true }, q4: { correct: true } },
    { q1: { correct: false }, q2: { correct: false }, q3: { correct: false }, q4: { correct: false } },
  ]);
  assertClose(rel.rHalf, 1.0, 1e-6, 'Hệ số tương quan nửa đề hoàn hảo');
  assertClose(rel.spearmanBrown, 1.0, 1e-6, 'Hệ số Spearman-Brown');
  assert.equal(rel.isReliable, true, 'Độ tin cậy >= 0.7');

  const psych = computeItemPsychometrics(
    [
      { id: 'q-easy', unit: 1, skill: 'grammar', grammarPointId: 'u1-present-simple', prompt: 'Easy' },
      { id: 'q-hard', unit: 1, skill: 'grammar', grammarPointId: 'u1-present-simple', prompt: 'Hard' },
    ],
    [
      {
        score10: 9,
        responses: {
          'q-easy': { answer: 'A', correct: true },
          'q-hard': { answer: 'B', correct: false },
        },
      },
      {
        score10: 2,
        responses: {
          'q-easy': { answer: 'A', correct: true },
          'q-hard': { answer: 'B', correct: false },
        },
      },
    ]
  );
  assert.ok(psych[0].flags.includes('too_easy'), 'Câu 100% đúng phải có cờ too_easy');
  assert.ok(psych[1].flags.includes('too_hard'), 'Câu 0% đúng phải có cờ too_hard');
  assert.equal(psych[1].topDistractor, 'B', 'Phương án sai chọn nhiều nhất');

  console.log(
    `✓ PASS Mục 4.7: p_pre=${summary.preWelch.p.toFixed(4)}, p_post=${summary.postWelch.p.toFixed(
      4
    )}, p_paired_tn=${summary.tnPaired.p.toExponential(2)}, TB_TN=${summary.tnPost.mean.toFixed(
      2
    )}, TB_DC=${summary.dcPost.mean.toFixed(2)}, SD_DC=${summary.dcPost.sd.toFixed(
      4
    )}, SMD=${summary.smd.smd.toFixed(3)} (${summary.smd.label})`
  );

  // 7. Kiểm tra luồng làm bài, chấm điểm server, đổi câu cùng chủ điểm, hủy lượt làm bài, và xuất 6 sheet Excel có công thức
  const round = createTestRound({
    name: 'Kiểm tra đầu vào HK1',
    kind: 'pre',
    formId: 'hk1-A',
    schoolId: 'default',
    openAt: new Date(Date.now() - 3600_000).toISOString(),
    closeAt: new Date(Date.now() + 3600_000).toISOString(),
    durationMin: 40,
    classes: [
      { className: '6A1', group: 'TN' },
      { className: '6A2', group: 'DC' },
    ],
    createdBy: 'teacher-test',
  });

  const studentForm = getStudentSanitizedTestForm('hk1-A');
  assert.ok(studentForm && studentForm.items.length === 40, 'Đề học sinh hk1-A phải có 40 câu');
  for (const item of studentForm.items) {
    const raw = item as unknown as Record<string, unknown>;
    assert.equal('answerIndex' in raw, false, 'Không lộ answerIndex cho học sinh');
    assert.equal('accept' in raw, false, 'Không lộ accept cho học sinh');
    assert.equal('explanation' in raw, false, 'Không lộ explanation cho học sinh');
  }

  const mockStudent: StudentAccount = {
    id: 'stu-1',
    username: 'nguyenvanan',
    fullName: 'Nguyễn Văn An',
    className: '6A1',
    pinCode: '1234',
    parentConsent: true,
    avatar: '👦',
    dailyGoalMinutes: 20,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    progress: {
      studentName: 'Nguyễn Văn An',
      grade: 6,
      totalXP: 0,
      level: 1,
      streakDays: 0,
      lastStudyDate: '',
      badges: [],
      weakTopics: [],
      skillMastery: {
        Vocabulary: 0,
        Grammar: 0,
        Reading: 0,
        Listening: 0,
        Speaking: 0,
        Writing: 0,
        Pronunciation: 0,
      },
      unitProgress: {},
    },
    sessions: [],
    dailyLogs: {},
  };

  const { attempt } = startOrResumeTestAttempt({
    round,
    student: mockStudent,
  });
  assert.equal(attempt.itemOrder.length, 40, 'Thứ tự 40 câu phải được tạo cho mỗi học sinh');

  const teacherForm = getFormById('hk1-A')!;
  const firstItem = teacherForm.items[0];
  let correctAnswer = '';
  if (firstItem.type === 'mcq' && typeof firstItem.answerIndex === 'number' && firstItem.options) {
    correctAnswer = firstItem.options[firstItem.answerIndex];
  } else if (firstItem.blanks?.[0]?.accept?.[0]) {
    correctAnswer = firstItem.blanks[0].accept[0];
  } else if (firstItem.accept?.[0]) {
    correctAnswer = firstItem.accept[0];
  }

  const savedAttempt = saveStudentItemResponse({
    attemptId: attempt.id,
    itemId: firstItem.id,
    answer: correctAnswer,
    timeSec: 4,
  })!;

  const graded = evaluateAndFinalizeAttempt(savedAttempt, teacherForm, false);
  assert.equal(graded.status, 'submitted', 'Lượt làm bài phải được đánh dấu đã nộp');
  assert.equal(graded.responses[firstItem.id]?.correct, true, 'Câu trả lời đúng phải được chấm đúng');
  assert.ok(graded.score10 >= 0.25, 'Điểm hệ 10 phải >= 0.25 khi đúng ít nhất 1 câu');

  // Test hủy lượt làm bài với lý do bắt buộc
  const voidRes = voidStudentTestAttempt({
    attemptId: attempt.id,
    reason: 'Mất điện phòng máy',
    teacherId: 'teacher-test',
  });
  assert.equal(voidRes.success, true, 'Hủy lượt làm bài với lý do hợp lệ phải thành công');
  assert.equal(voidRes.attempt?.status, 'voided', 'Lượt làm bài đã hủy phải có status = voided');
  assert.ok(loadTestVoidLogs().some((l) => l.attemptId === attempt.id && l.reason === 'Mất điện phòng máy'));

  // Test đổi câu cùng chủ điểm ngữ pháp và cùng dạng bài
  const { rawDataset: rawGrammar } = await loadGrammarDataset();
  const candidates = getReplacementCandidatesForTestItem('hk1-A', firstItem, rawGrammar);
  if (candidates.length > 0) {
    const swapped = replaceItemInTestForm('hk1-A', firstItem.id, candidates[0], 'teacher-test');
    assert.ok(swapped && swapped.items.some((it) => it.id === candidates[0].id), 'Đổi câu thành công');
    // Khôi phục đề mặc định
    resetTestFormToDefault('hk1-A');
  }

  // Test 6 sheet Excel với công thức thật và ẩn danh mặc định
  const sheets = buildResearchStudySheets({
    preRoundName: 'Đầu vào HK1',
    postRoundName: 'Đầu ra HK1',
    formId: 'hk1-A ↔ hk1-B',
    studentRows: [
      {
        anonymousCode: 'HS01',
        studentId: 'stu-1',
        fullName: 'Nguyễn Văn An',
        className: '6A1',
        group: 'TN',
        preScore10: 5.5,
        postScore10: 7.5,
        diffScore10: 2.0,
        studyMinutes: 120,
        studySessions: 14,
        oddScorePost: 4.0,
        evenScorePost: 3.5,
      },
      {
        anonymousCode: 'HS02',
        studentId: 'stu-2',
        fullName: 'Trần Thị Bình',
        className: '6A1',
        group: 'TN',
        preScore10: 6.0,
        postScore10: 8.0,
        diffScore10: 2.0,
        studyMinutes: 135,
        studySessions: 16,
        oddScorePost: 4.0,
        evenScorePost: 4.0,
      },
      {
        anonymousCode: 'HS03',
        studentId: 'stu-3',
        fullName: 'Lê Văn Cường',
        className: '6A2',
        group: 'DC',
        preScore10: 5.0,
        postScore10: 6.0,
        diffScore10: 1.0,
        studyMinutes: 0,
        studySessions: 0,
        oddScorePost: 3.0,
        evenScorePost: 3.0,
      },
      {
        anonymousCode: 'HS04',
        studentId: 'stu-4',
        fullName: 'Phạm Thị Dung',
        className: '6A2',
        group: 'DC',
        preScore10: 6.5,
        postScore10: 7.0,
        diffScore10: 0.5,
        studyMinutes: 0,
        studySessions: 0,
        oddScorePost: 3.5,
        evenScorePost: 3.5,
      },
    ],
    summary,
    reliability: rel,
    itemAnalysisRows: psych,
    grammarProgressRows: [
      {
        grammarPointId: 'u1-present-simple',
        grammarPointTitle: 'Present Simple',
        unitNumber: 1,
        tnPrePct: 52,
        tnPostPct: 78,
        tnGainPct: 26,
        dcPrePct: 50,
        dcPostPct: 60,
        dcGainPct: 10,
      },
    ],
    rawResponseRows: [
      {
        anonymousCode: 'HS01',
        fullName: 'Nguyễn Văn An',
        className: '6A1',
        group: 'TN',
        roundKind: 'post',
        formId: 'hk1-B',
        itemId: firstItem.id,
        skill: 'grammar',
        grammarPointId: firstItem.grammarPointId || 'u1-present-simple',
        answer: correctAnswer,
        correct: true,
        timeSec: 4,
      },
    ],
    showFullName: false, // Mặc định ẩn danh HS01, HS02
  });

  assert.equal(sheets.length, 6, 'File Số liệu nghiên cứu.xlsx phải có đúng 6 sheet');
  assert.deepEqual(
    sheets.map((s) => s.name),
    ['Bảng điểm', 'Thống kê', 'Độ tin cậy', 'Phân tích câu', 'Theo điểm ngữ pháp', 'Dữ liệu thô']
  );

  // Kiểm tra ẩn danh mặc định trên Bảng điểm
  const bangDiemCells = JSON.stringify(sheets[0].rows);
  assert.equal(bangDiemCells.includes('Nguyễn Văn An'), false, 'Mặc định không xuất họ tên thật');
  assert.equal(bangDiemCells.includes('HS01'), true, 'Mặc định xuất mã ẩn danh HS01');

  // Kiểm tra công thức Excel trên sheet Thống kê và Độ tin cậy
  const thongKeCells = JSON.stringify(sheets[1].rows);
  assert.ok(thongKeCells.includes('AVERAGE('), 'Sheet Thống kê phải chứa công thức AVERAGE');
  assert.ok(thongKeCells.includes('STDEV('), 'Sheet Thống kê phải chứa công thức STDEV');
  assert.ok(thongKeCells.includes('MODE('), 'Sheet Thống kê phải chứa công thức MODE');
  assert.ok(thongKeCells.includes('MEDIAN('), 'Sheet Thống kê phải chứa công thức MEDIAN');
  assert.ok(thongKeCells.includes('TTEST('), 'Sheet Thống kê phải chứa công thức TTEST');

  const doTinCayCells = JSON.stringify(sheets[2].rows);
  assert.ok(doTinCayCells.includes('CORREL('), 'Sheet Độ tin cậy phải chứa công thức CORREL');

  console.log('✓ PASS Mục 4.2, 4.3, 4.6, 5: Luồng làm bài, bảo mật đáp án, đổi câu, hủy bài và xuất 6 sheet Excel có công thức.');
}

runStatsBenchmarkTests();
