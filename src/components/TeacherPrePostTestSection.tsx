import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileSpreadsheet,
  FlaskConical,
  Lock,
  Play,
  Plus,
  QrCode,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Unlock,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import jStat from 'jstat';
import type { LoadedGrammarBundle } from '../grammar-g6/dataLoader';
import {
  TestFormDef,
  TestFormItem,
  getTestFormsDataset,
} from '../grammar-g6/testFormsLoader';
import {
  ExportResearchStudyParams,
  ResearchGrammarPointProgressRow,
  ResearchRawResponseRow,
  ResearchStudentScoreRow,
  exportResearchStudyToXlsx,
} from '../services/excelExport';
import { loadAllAttemptsRaw, loadAllDailyStatsRaw, toSchoolId } from '../services/firebaseAnalytics';
import {
  buildResearchComparisonSummary,
  computeItemPsychometrics,
  computeSplitHalfReliability,
  formatViNumber,
} from '../services/researchStats';
import {
  FirestoreClassSettingDoc,
  FirestoreTestAttemptDoc,
  FirestoreTestRoundDoc,
  ResearchGroupType,
  TEST_ROUND_KIND_LABELS,
  TestRoundClassEntry,
  TestRoundKind,
  createTestRound,
  deleteTestRound,
  getClassSetting,
  getReplacementCandidatesForTestItem,
  loadAllClassSettings,
  loadAllTestAttempts,
  loadAllTestRounds,
  loadTestVoidLogs,
  replaceItemInTestForm,
  resetTestFormToDefault,
  unlockAllControlClasses,
  updateTestRoundStatus,
  upsertClassSetting,
  voidStudentTestAttempt,
} from '../services/researchTests';
import { getAvailableClasses, normalizeClassName } from '../services/storage';
import type { AppDataSchema, StudentAccount, TeacherAccount } from '../types';

interface TeacherPrePostTestSectionProps {
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  scopeStudents: StudentAccount[];
  grammarBundle: LoadedGrammarBundle | null;
  onUpdateStudent?: (studentId: string, updatedFields: Partial<StudentAccount>) => void;
}

type SubTabId = 'rounds' | 'preview' | 'classes_consent' | 'analysis';

export const TeacherPrePostTestSection: React.FC<TeacherPrePostTestSectionProps> = ({
  appData,
  currentTeacher,
  isAdmin,
  scopeStudents,
  grammarBundle,
  onUpdateStudent,
}) => {
  const [subTab, setSubTab] = useState<SubTabId>('rounds');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const schoolId = useMemo(() => {
    if (currentTeacher) {
      return toSchoolId(
        currentTeacher.schoolName,
        currentTeacher.communeName,
        currentTeacher.provinceName
      );
    }
    return 'default';
  }, [currentTeacher]);

  const availableClasses = useMemo(() => {
    const base = getAvailableClasses(appData);
    const fromStudents = Array.from(
      new Set(scopeStudents.map((s) => normalizeClassName(s.className)).filter(Boolean))
    );
    return Array.from(new Set([...base, ...fromStudents])).sort();
  }, [appData.customClasses, scopeStudents]);

  // Lắng nghe cập nhật từ tab học sinh hoặc localStorage
  useEffect(() => {
    const onUpdate = () => setRefreshKey((k) => k + 1);
    window.addEventListener('storage', onUpdate);
    window.addEventListener('research-tests-updated', onUpdate);
    const timer = setInterval(onUpdate, 5000);
    return () => {
      window.removeEventListener('storage', onUpdate);
      window.removeEventListener('research-tests-updated', onUpdate);
      clearInterval(timer);
    };
  }, []);

  const testFormsDataset = useMemo(() => getTestFormsDataset(), [refreshKey]);
  const allRounds = useMemo(() => loadAllTestRounds(), [refreshKey]);
  const allAttempts = useMemo(() => loadAllTestAttempts(), [refreshKey]);
  const allClassSettings = useMemo(() => loadAllClassSettings(), [refreshKey]);
  const voidLogs = useMemo(() => loadTestVoidLogs(), [refreshKey]);

  // ============================================================================
  // STATE TAB 1: XEM TRƯỚC ĐỀ & ĐỔI CÂU HỎI
  // ============================================================================
  const [selectedPreviewFormId, setSelectedPreviewFormId] = useState<string>('hk2-A');
  const [swapTargetItem, setSwapTargetItem] = useState<TestFormItem | null>(null);
  const [previewNotice, setPreviewNotice] = useState<string>('');

  const currentPreviewForm: TestFormDef | undefined = useMemo(
    () =>
      testFormsDataset.tests.find((t) => t.id === selectedPreviewFormId) ||
      testFormsDataset.tests[0],
    [testFormsDataset, selectedPreviewFormId]
  );

  const replacementCandidates = useMemo(() => {
    if (!swapTargetItem || !currentPreviewForm) return [];
    return getReplacementCandidatesForTestItem(
      currentPreviewForm.id,
      swapTargetItem,
      grammarBundle?.rawDataset || null
    );
  }, [swapTargetItem, currentPreviewForm, grammarBundle]);

  // ============================================================================
  // STATE TAB 2: TẠO ĐỢT KIỂM TRA & THEO DÕI TRỰC TIẾP
  // ============================================================================
  const [showCreateRoundModal, setShowCreateRoundModal] = useState<boolean>(false);
  const [newRoundName, setNewRoundName] = useState<string>(
    'Kiểm tra Đầu vào Học kì 2 (Unit 7–12)'
  );
  const [newRoundFormId, setNewRoundFormId] = useState<string>('hk2-A');
  const [newRoundKind, setNewRoundKind] = useState<TestRoundKind>('pre');
  const [newRoundDuration, setNewRoundDuration] = useState<number>(40);
  const [newRoundShowScore, setNewRoundShowScore] = useState<boolean>(true);
  const [newRoundOpenAt, setNewRoundOpenAt] = useState<string>(() => {
    const d = new Date(Date.now() - 5 * 60 * 1000);
    return d.toISOString().slice(0, 16);
  });
  const [newRoundCloseAt, setNewRoundCloseAt] = useState<string>(() => {
    const d = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    return d.toISOString().slice(0, 16);
  });
  const [newRoundClasses, setNewRoundClasses] = useState<Record<string, ResearchGroupType | 'NONE'>>(
    () => {
      const init: Record<string, ResearchGroupType | 'NONE'> = {};
      availableClasses.forEach((cls, idx) => {
        const setting = getClassSetting(schoolId, cls);
        if (setting.researchGroup) {
          init[cls] = setting.researchGroup;
        } else if (idx === 0) {
          init[cls] = 'TN';
        } else if (idx === 1) {
          init[cls] = 'DC';
        } else {
          init[cls] = 'NONE';
        }
      });
      return init;
    }
  );

  const [selectedMonitorRoundId, setSelectedMonitorRoundId] = useState<string>('');
  const [qrModalRound, setQrModalRound] = useState<FirestoreTestRoundDoc | null>(null);
  const [voidModalAttempt, setVoidModalAttempt] = useState<{
    attempt: FirestoreTestAttemptDoc;
    studentName: string;
  } | null>(null);
  const [voidReasonInput, setVoidReasonInput] = useState<string>('');
  const [voidErrorMsg, setVoidErrorMsg] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const activeMonitorRound = useMemo(() => {
    if (selectedMonitorRoundId) {
      const found = allRounds.find((r) => r.id === selectedMonitorRoundId);
      if (found) return found;
    }
    return allRounds[0] || null;
  }, [allRounds, selectedMonitorRoundId]);

  // ============================================================================
  // STATE TAB 4: PHÂN TÍCH KẾT QUẢ NGHIÊN CỨU & XUẤT EXCEL
  // ============================================================================
  const preRounds = useMemo(
    () => allRounds.filter((r) => r.kind === 'pre' || r.kind === 'pilot'),
    [allRounds]
  );
  const postRounds = useMemo(
    () => allRounds.filter((r) => r.kind === 'post' || r.kind === 'retention'),
    [allRounds]
  );

  const [selectedPreRoundId, setSelectedPreRoundId] = useState<string>('');
  const [selectedPostRoundId, setSelectedPostRoundId] = useState<string>('');
  const [analysisClassFilter, setAnalysisClassFilter] = useState<string>('all');
  const [onlyConsentedStudents, setOnlyConsentedStudents] = useState<boolean>(true);
  const [showFullNameInReport, setShowFullNameInReport] = useState<boolean>(false);
  const [useBenchmarkDemoData, setUseBenchmarkDemoData] = useState<boolean>(false);
  const [copiedConclusion, setCopiedConclusion] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedPreRoundId && preRounds.length > 0) {
      setSelectedPreRoundId(preRounds[0].id);
    }
    if (!selectedPostRoundId && postRounds.length > 0) {
      setSelectedPostRoundId(postRounds[0].id);
    }
  }, [preRounds, postRounds, selectedPreRoundId, selectedPostRoundId]);

  const handleCreateRoundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenClasses: TestRoundClassEntry[] = (
      Object.entries(newRoundClasses) as Array<[string, ResearchGroupType | 'NONE']>
    )
      .filter(([, grp]) => grp === 'TN' || grp === 'DC')
      .map(([className, grp]) => ({
        className,
        group: grp as ResearchGroupType,
      }));

    if (chosenClasses.length === 0) {
      alert('Vui lòng chọn ít nhất 1 lớp tham gia (gán nhóm TN hoặc ĐC).');
      return;
    }

    const created = createTestRound({
      name: newRoundName || 'Đợt kiểm tra nghiên cứu',
      formId: newRoundFormId,
      kind: newRoundKind,
      schoolId,
      classes: chosenClasses,
      openAt: new Date(newRoundOpenAt).toISOString(),
      closeAt: new Date(newRoundCloseAt).toISOString(),
      durationMin: Math.max(5, Math.min(120, Number(newRoundDuration) || 40)),
      showScoreAfterSubmit: newRoundShowScore,
      status: 'open',
      createdBy: currentTeacher?.id || 'teacher',
    });

    setSelectedMonitorRoundId(created.id);
    setShowCreateRoundModal(false);
    setRefreshKey((k) => k + 1);
  };

  // ============================================================================
  // TÍNH TOÁN DỮ LIỆU PHÂN TÍCH NGHIÊN CỨU (MỤC 4.5, 4.6, 4.7, 5)
  // ============================================================================
  const researchAnalysis = useMemo(() => {
    // Chế độ 1: Bộ số liệu kiểm thử chuẩn SciPy ở Mục 4.7 (hoặc khi chưa có bài nộp thật)
    if (useBenchmarkDemoData) {
      const tn_pre = [5.5, 6.0, 4.5, 7.0, 5.0, 6.5, 5.5, 4.0, 6.0, 5.0];
      const dc_pre = [5.0, 6.5, 4.5, 6.0, 5.5, 6.0, 5.0, 4.5, 6.5, 5.0];
      const tn_post = [7.5, 8.0, 6.0, 8.5, 7.0, 8.0, 7.0, 5.5, 8.0, 6.5];
      const dc_post = [6.0, 7.0, 5.0, 6.5, 6.0, 7.0, 5.5, 5.0, 7.0, 5.5];
      const tn_mins = [185, 210, 130, 240, 175, 195, 165, 120, 220, 160];

      const studentRows: ResearchStudentScoreRow[] = [];
      for (let i = 0; i < 10; i++) {
        const post = tn_post[i];
        const odd = Math.round((post / 2) * 4) / 4;
        const even = Math.round((post - odd) * 100) / 100;
        studentRows.push({
          studentId: `demo-tn-${i + 1}`,
          anonymousCode: `HS${String(i + 1).padStart(2, '0')}`,
          fullName: `Học sinh Thực nghiệm ${i + 1}`,
          className: '6A1',
          group: 'TN',
          preScore10: tn_pre[i],
          postScore10: tn_post[i],
          diffScore10: Math.round((tn_post[i] - tn_pre[i]) * 100) / 100,
          studyMinutes: tn_mins[i],
          studySessions: Math.round(tn_mins[i] / 15),
          oddScorePost: odd,
          evenScorePost: even,
        });
      }
      for (let i = 0; i < 10; i++) {
        const post = dc_post[i];
        const odd = Math.round((post / 2) * 4) / 4;
        const even = Math.round((post - odd) * 100) / 100;
        studentRows.push({
          studentId: `demo-dc-${i + 1}`,
          anonymousCode: `HS${String(i + 11).padStart(2, '0')}`,
          fullName: `Học sinh Đối chứng ${i + 1}`,
          className: '6A2',
          group: 'DC',
          preScore10: dc_pre[i],
          postScore10: dc_post[i],
          diffScore10: Math.round((dc_post[i] - dc_pre[i]) * 100) / 100,
          studyMinutes: 0,
          studySessions: 0,
          oddScorePost: odd,
          evenScorePost: even,
        });
      }

      const summary = buildResearchComparisonSummary({
        tnPre: tn_pre,
        dcPre: dc_pre,
        tnPost: tn_post,
        dcPost: dc_post,
      });

      const oddArr = studentRows.map((r) => r.oddScorePost);
      const evenArr = studentRows.map((r) => r.evenScorePost);
      const rHalf = jStat.corrcoeff(oddArr, evenArr);
      const sb = (2 * rHalf) / (1 + rHalf);

      const demoForm =
        testFormsDataset.tests.find((t) => t.id === 'hk2-A') || testFormsDataset.tests[0];
      const grammarProgressRows: ResearchGrammarPointProgressRow[] = Object.keys(
        demoForm.coverage.byGrammarPoint
      ).map((gpId, idx) => {
        const gpInfo = grammarBundle?.grammarPointIndex[gpId];
        const tnPrePct = 52 + (idx % 4) * 4;
        const tnPostPct = 76 + (idx % 4) * 4;
        const dcPrePct = 51 + (idx % 4) * 4;
        const dcPostPct = 61 + (idx % 4) * 3;
        return {
          grammarPointId: gpId,
          grammarPointTitle: gpInfo?.point.title || gpId,
          unitNumber: gpInfo?.unit.number || 7 + (idx % 6),
          tnPrePct,
          tnPostPct,
          tnGainPct: tnPostPct - tnPrePct,
          dcPrePct,
          dcPostPct,
          dcGainPct: dcPostPct - dcPrePct,
        };
      });

      const itemAnalysisRows = demoForm.items.map((it, idx) => {
        const diffRatio = Math.min(0.92, Math.max(0.18, 0.55 + ((idx % 7) - 3) * 0.08));
        const disc = Math.round((0.28 + (idx % 5) * 0.09) * 100) / 100;
        const flags: Array<'too_easy' | 'too_hard' | 'poor_discrimination'> = [];
        const flagLabels: string[] = [];
        if (diffRatio > 0.9) {
          flags.push('too_easy');
          flagLabels.push('Quá dễ (> 90%)');
        }
        if (diffRatio < 0.2) {
          flags.push('too_hard');
          flagLabels.push('Quá khó (< 20%)');
        }
        return {
          itemId: it.id,
          itemNumber: idx + 1,
          unit: it.unit,
          skill: it.skill,
          grammarPointId: it.grammarPointId,
          promptPreview: it.prompt || (it.tokens ? it.tokens.join(' / ') : it.id),
          totalResponses: 20,
          correctCount: Math.round(diffRatio * 20),
          difficultyRatio: diffRatio,
          difficultyPct: Math.round(diffRatio * 1000) / 10,
          discriminationIndex: disc,
          topDistractor: it.options ? it.options[( (it.answerIndex || 0) + 1) % it.options.length] : null,
          topDistractorCount: 4,
          flags,
          flagLabels,
        };
      });

      return {
        preRoundName: 'Đợt Đầu vào chuẩn kiểm thử (Mục 4.7)',
        postRoundName: 'Đợt Đầu ra chuẩn kiểm thử (Mục 4.7)',
        formId: demoForm.id,
        studentRows,
        excludedCounts: {
          missingPre: 0,
          missingPost: 0,
          noParentConsent: 0,
          totalExcluded: 0,
        },
        summary,
        reliability: {
          nStudents: 20,
          rHalf,
          spearmanBrown: sb,
          isReliable: sb >= 0.7,
          oddScores: oddArr,
          evenScores: evenArr,
        },
        itemAnalysisRows,
        grammarProgressRows,
        rawResponseRows: [] as ResearchRawResponseRow[],
      };
    }

    // Chế độ 2: Tính toán trên dữ liệu thật từ testRounds & testAttempts
    const preRound = allRounds.find((r) => r.id === selectedPreRoundId) || preRounds[0] || null;
    const postRound = allRounds.find((r) => r.id === selectedPostRoundId) || postRounds[0] || null;
    const targetFormId = postRound?.formId || preRound?.formId || 'hk2-A';
    const targetForm =
      testFormsDataset.tests.find((t) => t.id === targetFormId) || testFormsDataset.tests[0];

    const preAttemptsByStudent = new Map<string, FirestoreTestAttemptDoc>();
    const postAttemptsByStudent = new Map<string, FirestoreTestAttemptDoc>();

    if (preRound) {
      for (const a of allAttempts) {
        if (
          a.roundId === preRound.id &&
          (a.status === 'submitted' || a.status === 'auto_submitted')
        ) {
          preAttemptsByStudent.set(a.studentId, a);
        }
      }
    }
    if (postRound) {
      for (const a of allAttempts) {
        if (
          a.roundId === postRound.id &&
          (a.status === 'submitted' || a.status === 'auto_submitted')
        ) {
          postAttemptsByStudent.set(a.studentId, a);
        }
      }
    }

    // Lấy dữ liệu số phút luyện tập trên app trong giai đoạn nghiên cứu
    const dailyStats = Object.values(loadAllDailyStatsRaw());
    const practiceAttempts = loadAllAttemptsRaw();

    let missingPre = 0;
    let missingPost = 0;
    let noParentConsent = 0;

    // Tập hợp tất cả học sinh thuộc lớp tham gia
    const candidateStudentIds = new Set<string>([
      ...preAttemptsByStudent.keys(),
      ...postAttemptsByStudent.keys(),
      ...scopeStudents.map((s) => s.id),
    ]);

    const studentMap = new Map<string, StudentAccount>();
    for (const s of scopeStudents) {
      studentMap.set(s.id, s);
    }
    for (const s of appData.students) {
      if (!studentMap.has(s.id)) studentMap.set(s.id, s);
    }

    const validPairs: Array<{
      student: StudentAccount | undefined;
      studentId: string;
      className: string;
      group: ResearchGroupType;
      preAttempt: FirestoreTestAttemptDoc;
      postAttempt: FirestoreTestAttemptDoc;
    }> = [];

    for (const studentId of candidateStudentIds) {
      const student = studentMap.get(studentId);
      const preAtt = preAttemptsByStudent.get(studentId);
      const postAtt = postAttemptsByStudent.get(studentId);

      const className = normalizeClassName(
        postAtt?.className || preAtt?.className || student?.className || ''
      );
      if (analysisClassFilter !== 'all' && className !== analysisClassFilter) {
        continue;
      }

      if (!preAtt && !postAtt) continue;
      if (!preAtt) {
        missingPre++;
        continue;
      }
      if (!postAtt) {
        missingPost++;
        continue;
      }

      if (onlyConsentedStudents && student && student.parentConsent === false) {
        noParentConsent++;
        continue;
      }

      const group: ResearchGroupType = postAtt.group || preAtt.group || 'TN';
      validPairs.push({
        student,
        studentId,
        className,
        group,
        preAttempt: preAtt,
        postAttempt: postAtt,
      });
    }

    // Sắp xếp TN trước, ĐC sau để đánh mã ẩn danh HS01, HS02...
    validPairs.sort((a, b) => {
      if (a.group !== b.group) return a.group === 'TN' ? -1 : 1;
      return a.className.localeCompare(b.className);
    });

    const orderedItemIds = targetForm.items.map((it) => it.id);
    const rawResponseRows: ResearchRawResponseRow[] = [];

    const studentRows: ResearchStudentScoreRow[] = validPairs.map((pair, idx) => {
      const anonymousCode = `HS${String(idx + 1).padStart(2, '0')}`;
      const fullName = pair.student?.fullName || `Học sinh ${idx + 1}`;

      // Tính điểm câu lẻ & câu chẵn ở bài kiểm tra đầu ra
      let oddScorePost = 0;
      let evenScorePost = 0;
      orderedItemIds.forEach((itemId, itemIdx) => {
        const isCorrect = Boolean(pair.postAttempt.responses[itemId]?.correct);
        if ((itemIdx + 1) % 2 === 1) {
          if (isCorrect) oddScorePost += 0.25;
        } else {
          if (isCorrect) evenScorePost += 0.25;
        }
      });

      // Tính tổng số phút luyện tập trên app của học sinh
      const studentDaily = dailyStats.filter((d) => d.studentId === pair.studentId);
      const minutesFromDaily = studentDaily.reduce((s, d) => s + (d.studyMinutes || 0), 0);
      const minutesFromSessions = (pair.student?.sessions || []).reduce(
        (s, sess) => s + (sess.timeSpentSeconds || 0) / 60,
        0
      );
      const studyMinutes = Math.max(minutesFromDaily, minutesFromSessions);
      const studySessions = Math.max(
        practiceAttempts.filter((a) => a.studentId === pair.studentId).length,
        (pair.student?.sessions || []).length
      );

      // Ghi nhận dữ liệu thô từng câu trả lời
      for (const [roundKind, att] of [
        ['pre', pair.preAttempt],
        ['post', pair.postAttempt],
      ] as const) {
        for (const item of targetForm.items) {
          const r = att.responses[item.id];
          rawResponseRows.push({
            anonymousCode,
            fullName,
            className: pair.className,
            group: pair.group,
            roundKind,
            formId: att.formId,
            itemId: item.id,
            skill: item.skill,
            grammarPointId: item.grammarPointId || 'vocab',
            answer: r?.answer || '',
            correct: Boolean(r?.correct),
            timeSec: r?.timeSec || 0,
          });
        }
      }

      return {
        studentId: pair.studentId,
        anonymousCode,
        fullName,
        className: pair.className,
        group: pair.group,
        preScore10: pair.preAttempt.score10,
        postScore10: pair.postAttempt.score10,
        diffScore10: Math.round((pair.postAttempt.score10 - pair.preAttempt.score10) * 100) / 100,
        studyMinutes: Math.round(studyMinutes * 10) / 10,
        studySessions,
        oddScorePost,
        evenScorePost,
      };
    });

    const tnRows = studentRows.filter((r) => r.group === 'TN');
    const dcRows = studentRows.filter((r) => r.group === 'DC');

    const summary = buildResearchComparisonSummary({
      tnPre: tnRows.map((r) => r.preScore10),
      dcPre: dcRows.map((r) => r.preScore10),
      tnPost: tnRows.map((r) => r.postScore10),
      dcPost: dcRows.map((r) => r.postScore10),
    });

    const postAttemptsForRel = validPairs.map((p) => p.postAttempt.responses);
    const reliability = computeSplitHalfReliability(orderedItemIds, postAttemptsForRel);

    const itemAnalysisRows = computeItemPsychometrics(
      targetForm.items,
      validPairs.map((p) => p.postAttempt)
    );

    // Tiến bộ theo từng điểm ngữ pháp (% đúng trước -> sau tách theo nhóm TN và ĐC)
    const gpIds = Object.keys(targetForm.coverage.byGrammarPoint);
    const grammarProgressRows: ResearchGrammarPointProgressRow[] = gpIds.map((gpId) => {
      const gpInfo = grammarBundle?.grammarPointIndex[gpId];
      const calcGroupPct = (
        pairs: typeof validPairs,
        which: 'preAttempt' | 'postAttempt'
      ): number => {
        let corr = 0;
        let tot = 0;
        for (const p of pairs) {
          const entry = p[which].byGrammarPoint?.[gpId];
          if (entry) {
            corr += entry.correct;
            tot += entry.total;
          }
        }
        return tot > 0 ? Math.round((corr / tot) * 1000) / 10 : 0;
      };

      const tnPairs = validPairs.filter((p) => p.group === 'TN');
      const dcPairs = validPairs.filter((p) => p.group === 'DC');
      const tnPrePct = calcGroupPct(tnPairs, 'preAttempt');
      const tnPostPct = calcGroupPct(tnPairs, 'postAttempt');
      const dcPrePct = calcGroupPct(dcPairs, 'preAttempt');
      const dcPostPct = calcGroupPct(dcPairs, 'postAttempt');

      return {
        grammarPointId: gpId,
        grammarPointTitle: gpInfo?.point.title || gpId,
        unitNumber: gpInfo?.unit.number || 6,
        tnPrePct,
        tnPostPct,
        tnGainPct: Math.round((tnPostPct - tnPrePct) * 10) / 10,
        dcPrePct,
        dcPostPct,
        dcGainPct: Math.round((dcPostPct - dcPrePct) * 10) / 10,
      };
    });

    return {
      preRoundName: preRound?.name || 'Đợt kiểm tra Đầu vào',
      postRoundName: postRound?.name || 'Đợt kiểm tra Đầu ra',
      formId: targetForm.id,
      studentRows,
      excludedCounts: {
        missingPre,
        missingPost,
        noParentConsent,
        totalExcluded: missingPre + missingPost + noParentConsent,
      },
      summary,
      reliability,
      itemAnalysisRows,
      grammarProgressRows,
      rawResponseRows,
    };
  }, [
    useBenchmarkDemoData,
    allRounds,
    allAttempts,
    selectedPreRoundId,
    selectedPostRoundId,
    preRounds,
    postRounds,
    testFormsDataset,
    scopeStudents,
    appData.students,
    analysisClassFilter,
    onlyConsentedStudents,
    grammarBundle,
  ]);

  // Phân bố điểm (Histogram) cho biểu đồ
  const scoreHistogramData = useMemo(() => {
    const bins = [
      { label: '0–2', min: 0, max: 2.0 },
      { label: '2–4', min: 2.01, max: 4.0 },
      { label: '4–6', min: 4.01, max: 6.0 },
      { label: '6–8', min: 6.01, max: 8.0 },
      { label: '8–10', min: 8.01, max: 10.0 },
    ];
    return bins.map((b) => ({
      range: b.label,
      TN: researchAnalysis.studentRows.filter(
        (r) => r.group === 'TN' && r.postScore10 >= b.min && r.postScore10 <= b.max
      ).length,
      ĐC: researchAnalysis.studentRows.filter(
        (r) => r.group === 'DC' && r.postScore10 >= b.min && r.postScore10 <= b.max
      ).length,
    }));
  }, [researchAnalysis.studentRows]);

  const handleExportResearchExcel = async () => {
    const params: ExportResearchStudyParams = {
      preRoundName: researchAnalysis.preRoundName,
      postRoundName: researchAnalysis.postRoundName,
      formId: researchAnalysis.formId,
      studentRows: researchAnalysis.studentRows,
      summary: researchAnalysis.summary,
      reliability: researchAnalysis.reliability,
      itemAnalysisRows: researchAnalysis.itemAnalysisRows,
      grammarProgressRows: researchAnalysis.grammarProgressRows,
      rawResponseRows: researchAnalysis.rawResponseRows,
      showFullName: showFullNameInReport,
      fileName: 'Số liệu nghiên cứu.xlsx',
    };
    await exportResearchStudyToXlsx(params);
  };

  return (
    <div className="space-y-6">
      {/* Banner & 4 Sub-tabs */}
      <div className="neu-card bg-white p-5 sm:p-6 border border-indigo-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Nghiên cứu Khoa học Sư phạm Ứng dụng (NCKHSPƯD) & SKKN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              Kiểm Tra Đầu Vào – Đầu Ra & Phân Tích Hiệu Quả App
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Bộ 4 đề chuẩn hoá (40 câu/đề), tự động ẩn câu khỏi phần luyện tập, chấm điểm khách quan & xuất Excel có công thức thật.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateRoundModal(true)}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo đợt kiểm tra mới</span>
          </button>
        </div>

        {/* Sub-navigation */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
          {[
            { id: 'rounds', label: '1. Đợt kiểm tra & Theo dõi trực tiếp', icon: Clock },
            { id: 'preview', label: '2. Xem trước 4 đề & Đổi câu', icon: BookOpen },
            {
              id: 'classes_consent',
              label: '3. Lớp nghiên cứu (TN/ĐC) & Phiếu đồng ý PH',
              icon: ShieldCheck,
            },
            {
              id: 'analysis',
              label: '4. Phân tích kết quả & Xuất Excel SKKN',
              icon: BarChart3,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubTab(tab.id as SubTabId)}
                className={`min-h-[42px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          TAB 1: QUẢN LÝ ĐỢT KIỂM TRA & THEO DÕI TRỰC TIẾP (MỤC 4.2.2, 4.2.3, 4.2.4)
         ===================================================================== */}
      {subTab === 'rounds' && (
        <div className="space-y-6">
          {allRounds.length === 0 ? (
            <div className="neu-card bg-white p-8 text-center space-y-4 border border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 grid place-items-center mx-auto">
                <ClipboardCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-lg mx-auto">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Chưa có đợt kiểm tra nào được tạo
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Hãy bấm <strong>"Tạo đợt kiểm tra mới"</strong> để mở bài Kiểm tra Đầu vào (Đề A), Đầu ra (Đề A) hoặc Duy trì (Đề B) cho các lớp Thực nghiệm (TN) và Đối chứng (ĐC).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateRoundModal(true)}
                className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo đợt kiểm tra đầu tiên</span>
              </button>
            </div>
          ) : (
            <>
              {/* Danh sách đợt kiểm tra */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allRounds.map((round) => {
                  const isSelected = activeMonitorRound?.id === round.id;
                  const roundAttempts = allAttempts.filter(
                    (a) => a.roundId === round.id && a.status !== 'voided'
                  );
                  const submittedCount = roundAttempts.filter(
                    (a) => a.status === 'submitted' || a.status === 'auto_submitted'
                  ).length;
                  const inProgressCount = roundAttempts.filter(
                    (a) => a.status === 'in_progress'
                  ).length;

                  return (
                    <div
                      key={round.id}
                      onClick={() => setSelectedMonitorRoundId(round.id)}
                      className={`neu-card bg-white p-5 border-2 transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'border-indigo-600 ring-2 ring-indigo-100'
                          : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {TEST_ROUND_KIND_LABELS[round.kind]} · Đề {round.formId}
                        </span>
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            round.status === 'open'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {round.status === 'open' ? '● Đang mở' : 'Đã đóng'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">{round.name}</h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          Lớp:{' '}
                          {round.classes
                            .map((c) => `${c.className} (${c.group === 'TN' ? 'TN' : 'ĐC'})`)
                            .join(', ')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
                        <span className="text-amber-700">Đang làm: {inProgressCount}</span>
                        <span className="text-emerald-700">Đã nộp: {submittedCount}</span>
                        <span className="text-slate-500">{round.durationMin} phút</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bảng Theo dõi trực tiếp (Live Monitor) của đợt đang chọn */}
              {activeMonitorRound && (() => {
                const roundClassMap = new Map<string, ResearchGroupType>();
                for (const c of activeMonitorRound.classes) {
                  roundClassMap.set(normalizeClassName(c.className), c.group);
                }
                const studentsInRound = scopeStudents.filter((s) =>
                  roundClassMap.has(normalizeClassName(s.className))
                );
                const attemptsByStudent = new Map<string, FirestoreTestAttemptDoc>();
                for (const a of allAttempts) {
                  if (a.roundId === activeMonitorRound.id && a.status !== 'voided') {
                    attemptsByStudent.set(a.studentId, a);
                  }
                }

                let notStartedCount = 0;
                let inProgCount = 0;
                let doneCount = 0;
                for (const st of studentsInRound) {
                  const att = attemptsByStudent.get(st.id);
                  if (!att) notStartedCount++;
                  else if (att.status === 'in_progress') inProgCount++;
                  else doneCount++;
                }

                return (
                  <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                          Theo dõi phòng thi trực tiếp (Cập nhật tức thì)
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                          {activeMonitorRound.name} (Đề {activeMonitorRound.formId})
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          Mở: {new Date(activeMonitorRound.openAt).toLocaleString('vi-VN')} → Đóng:{' '}
                          {new Date(activeMonitorRound.closeAt).toLocaleString('vi-VN')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setQrModalRound(activeMonitorRound)}
                          className="min-h-[42px] px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>Chiếu mã vào thi (QR & Link)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextStatus =
                              activeMonitorRound.status === 'open' ? 'closed' : 'open';
                            updateTestRoundStatus(activeMonitorRound.id, nextStatus);
                            setRefreshKey((k) => k + 1);
                          }}
                          className={`min-h-[42px] px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm border cursor-pointer ${
                            activeMonitorRound.status === 'open'
                              ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {activeMonitorRound.status === 'open' ? 'Đóng đợt thi' : 'Mở lại đợt thi'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            deleteTestRound(activeMonitorRound.id);
                            setRefreshKey((k) => k + 1);
                          }}
                          className="min-h-[42px] px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                          title="Xoá đợt kiểm tra"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 4 thẻ trạng thái phòng thi */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">
                          Tổng học sinh
                        </span>
                        <span className="text-xl font-black text-slate-900">
                          {studentsInRound.length}
                        </span>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-3.5 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-600 uppercase block">
                          Chưa vào thi
                        </span>
                        <span className="text-xl font-black text-slate-800">
                          {notStartedCount}
                        </span>
                      </div>
                      <div className="rounded-2xl bg-amber-50 p-3.5 border border-amber-200">
                        <span className="text-[11px] font-bold text-amber-800 uppercase block">
                          Đang làm bài
                        </span>
                        <span className="text-xl font-black text-amber-950">{inProgCount}</span>
                      </div>
                      <div className="rounded-2xl bg-emerald-50 p-3.5 border border-emerald-200">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase block">
                          Đã nộp bài
                        </span>
                        <span className="text-xl font-black text-emerald-950">{doneCount}</span>
                      </div>
                    </div>

                    {/* Bảng danh sách học sinh trong đợt thi */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-extrabold bg-slate-50">
                            <th className="py-3 px-3">Học sinh</th>
                            <th className="py-3 px-3">Lớp / Nhóm</th>
                            <th className="py-3 px-3">Trạng thái</th>
                            <th className="py-3 px-3">Tiến độ / Thời gian</th>
                            <th className="py-3 px-3">Điểm số</th>
                            <th className="py-3 px-3">Rời tab</th>
                            <th className="py-3 px-3 text-right">Xử lý sự cố</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {studentsInRound.map((st) => {
                            const normCls = normalizeClassName(st.className);
                            const grp = roundClassMap.get(normCls) || 'TN';
                            const att = attemptsByStudent.get(st.id);

                            let statusBadge = (
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                                Chưa vào
                              </span>
                            );
                            let timeInfo = '—';
                            let scoreInfo = '—';

                            if (att) {
                              const answeredCnt = Object.values(att.responses).filter(
                                (r) => r && r.answer && r.answer.trim()
                              ).length;
                              if (att.status === 'in_progress') {
                                const startedMs = Date.parse(att.startedAt);
                                const elapsedMin = Number.isFinite(startedMs)
                                  ? Math.floor((Date.now() - startedMs) / 60000)
                                  : 0;
                                const remMin = Math.max(
                                  0,
                                  (activeMonitorRound.durationMin || 40) - elapsedMin
                                );
                                statusBadge = (
                                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
                                    Đang làm (còn {remMin} phút)
                                  </span>
                                );
                                timeInfo = `Đã làm ${answeredCnt}/40 câu`;
                              } else {
                                statusBadge = (
                                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                                    {att.status === 'auto_submitted' ? 'Đã nộp (Hết giờ)' : 'Đã nộp'}
                                  </span>
                                );
                                timeInfo = `${Math.max(1, Math.round(att.durationSec / 60))} phút (${answeredCnt}/40 câu)`;
                                scoreInfo = `${att.score10.toFixed(2)} / 10 (${att.rawCorrect}/40)`;
                              }
                            }

                            return (
                              <tr key={st.id} className="hover:bg-slate-50/80">
                                <td className="py-3 px-3 font-bold text-slate-900">
                                  <div>{st.fullName}</div>
                                  <div className="text-[11px] text-slate-500 font-normal">
                                    @{st.username}
                                  </div>
                                </td>
                                <td className="py-3 px-3 font-bold">
                                  <span className="mr-1.5">{normCls}</span>
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                                      grp === 'TN'
                                        ? 'bg-indigo-100 text-indigo-800'
                                        : 'bg-purple-100 text-purple-800'
                                    }`}
                                  >
                                    {grp === 'TN' ? 'TN' : 'ĐC'}
                                  </span>
                                </td>
                                <td className="py-3 px-3">{statusBadge}</td>
                                <td className="py-3 px-3 font-semibold text-slate-600">
                                  {timeInfo}
                                </td>
                                <td className="py-3 px-3 font-extrabold text-indigo-900">
                                  {scoreInfo}
                                </td>
                                <td className="py-3 px-3 font-semibold text-slate-600">
                                  {att ? `${att.tabSwitchCount || 0} lần` : '—'}
                                </td>
                                <td className="py-3 px-3 text-right">
                                  {att && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setVoidModalAttempt({
                                          attempt: att,
                                          studentName: st.fullName,
                                        });
                                        setVoidReasonInput('');
                                        setVoidErrorMsg('');
                                      }}
                                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs cursor-pointer"
                                    >
                                      Huỷ bài & cho làm lại
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Nhật ký huỷ bài (Audit Log) */}
                    {voidLogs.length > 0 && (
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          Nhật ký huỷ bài do sự cố kỹ thuật ({voidLogs.length})
                        </h4>
                        <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs">
                          {voidLogs.map((vlog) => {
                            const st = scopeStudents.find((s) => s.id === vlog.studentId);
                            return (
                              <div
                                key={vlog.id}
                                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                              >
                                <div>
                                  <strong>{st?.fullName || vlog.studentId}</strong> ({vlog.className}) — Lý do:{' '}
                                  <span className="text-rose-700 font-semibold">{vlog.reason}</span>
                                </div>
                                <span className="text-slate-400 shrink-0">
                                  {new Date(vlog.voidedAt).toLocaleString('vi-VN')}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: XEM TRƯỚC 4 ĐỀ & ĐỔI CÂU HỎI (MỤC 4.2.1)
         ===================================================================== */}
      {subTab === 'preview' && currentPreviewForm && (
        <div className="space-y-5">
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {testFormsDataset.tests.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedPreviewFormId(t.id);
                      setPreviewNotice('');
                    }}
                    className={`min-h-[42px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all ${
                      currentPreviewForm.id === t.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-indigo-50'
                    }`}
                  >
                    Đề {t.id} ({t.items.length} câu)
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  resetTestFormToDefault(currentPreviewForm.id);
                  setRefreshKey((k) => k + 1);
                  setPreviewNotice(`Đã khôi phục đề ${currentPreviewForm.id} về mặc định.`);
                }}
                className="min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục đề gốc</span>
              </button>
            </div>

            {previewNotice && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold">
                ✓ {previewNotice}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <div className="font-extrabold text-sm text-indigo-950">
                {currentPreviewForm.title} · 40 câu (32 Ngữ pháp + 8 Từ vựng) · 40 phút · 10 điểm
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-700">
                <span>Phân bổ theo Unit:</span>
                {Object.entries(currentPreviewForm.coverage.byUnit).map(([u, cnt]) => (
                  <span
                    key={u}
                    className="px-2.5 py-0.5 rounded-full bg-white border border-indigo-200 text-indigo-800 font-bold"
                  >
                    Unit {u}: {cnt} câu
                  </span>
                ))}
              </div>
            </div>

            {/* Danh sách 40 câu kèm đáp án & nút Đổi câu */}
            <div className="space-y-3">
              {currentPreviewForm.items.map((item, idx) => {
                const gpTitle = item.grammarPointId
                  ? grammarBundle?.grammarPointIndex[item.grammarPointId]?.point.title ||
                    item.grammarPointId
                  : 'Từ vựng trọng tâm';

                let answerText = '';
                if (item.type === 'mcq' && item.options && typeof item.answerIndex === 'number') {
                  const letter = String.fromCharCode(65 + item.answerIndex);
                  answerText = `${letter}. ${item.options[item.answerIndex]}`;
                } else if (item.type === 'gap' && item.blanks?.[0]) {
                  answerText = item.blanks[0].accept.join(' / ');
                } else if (item.type === 'reorder' && item.accept) {
                  answerText = item.accept[0];
                }

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-black">
                          Câu {idx + 1}
                        </span>
                        <span className="font-bold text-slate-500">Mã: {item.id}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-slate-700">
                          Unit {item.unit} · {gpTitle}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-bold">
                          {item.type.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-sm sm:text-base font-extrabold text-slate-900">
                        {item.prompt || (item.tokens ? item.tokens.join(' / ') : '')}
                      </div>

                      {item.options && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {item.options.map((opt, oIdx) => {
                            const isCorrect = oIdx === item.answerIndex;
                            return (
                              <div
                                key={oIdx}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                                  isCorrect
                                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                                    : 'bg-white border-slate-200 text-slate-600'
                                }`}
                              >
                                {String.fromCharCode(65 + oIdx)}. {opt}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="text-xs font-semibold text-emerald-800 pt-1">
                        ✓ Đáp án đúng: <strong>{answerText}</strong>
                        {item.explanation ? ` — Giải thích (chỉ GV thấy): ${item.explanation}` : ''}
                      </div>
                    </div>

                    {item.skill === 'grammar' && (
                      <button
                        type="button"
                        onClick={() => setSwapTargetItem(item)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-xs inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Đổi câu khác</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: CÀI ĐẶT LỚP NGHIÊN CỨU & PHIẾU ĐỒNG Ý PHỤ HUYNH (MỤC 4.2.5 & MỤC 5)
         ===================================================================== */}
      {subTab === 'classes_consent' && (
        <div className="space-y-6">
          {/* Khối 1: Cài đặt lớp Thực nghiệm (TN) / Đối chứng (ĐC) & Khoá luyện tập */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Cài đặt Lớp Nghiên cứu (TN / ĐC) & Khoá luyện tập
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Khi bật <strong>"Khoá luyện tập"</strong> cho lớp Đối chứng (ĐC), học sinh lớp ĐC vẫn đăng nhập để làm bài Kiểm tra Đầu vào/Đầu ra nhưng không dùng phần luyện tập trong giai đoạn nghiên cứu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const unlocked = unlockAllControlClasses(schoolId, currentTeacher?.id);
                  setRefreshKey((k) => k + 1);
                  alert(
                    unlocked > 0
                      ? `Đã mở khoá luyện tập cho ${unlocked} lớp Đối chứng (ĐC)!`
                      : 'Hiện không có lớp nào đang bị khoá luyện tập.'
                  );
                }}
                className="min-h-[42px] px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Kết thúc nghiên cứu: Mở khoá tất cả lớp ĐC</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableClasses.map((cls) => {
                const setting =
                  allClassSettings.find(
                    (c) => normalizeClassName(c.className) === normalizeClassName(cls)
                  ) || getClassSetting(schoolId, cls);
                const studentCnt = scopeStudents.filter(
                  (s) => normalizeClassName(s.className) === normalizeClassName(cls)
                ).length;

                return (
                  <div
                    key={cls}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-black text-slate-900">Lớp {cls}</span>
                        <span className="text-xs font-semibold text-slate-500 ml-2">
                          ({studentCnt} học sinh)
                        </span>
                      </div>
                      {setting.practiceLocked ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold inline-flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Đang khoá luyện tập
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold inline-flex items-center gap-1">
                          <Unlock className="w-3 h-3" /> Mở luyện tập
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {(['TN', 'DC', null] as const).map((grp) => {
                        const active = setting.researchGroup === grp;
                        return (
                          <button
                            key={String(grp)}
                            type="button"
                            onClick={() => {
                              upsertClassSetting({
                                schoolId,
                                className: cls,
                                researchGroup: grp,
                                practiceLocked: grp === 'DC' ? setting.practiceLocked : false,
                                updatedBy: currentTeacher?.id,
                              });
                              setRefreshKey((k) => k + 1);
                            }}
                            className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                              active
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {grp === 'TN'
                              ? 'Nhóm TN'
                              : grp === 'DC'
                              ? 'Nhóm ĐC'
                              : 'Không gán'}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        Khoá phần luyện tập (dành cho lớp ĐC):
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          upsertClassSetting({
                            schoolId,
                            className: cls,
                            researchGroup: setting.researchGroup || 'DC',
                            practiceLocked: !setting.practiceLocked,
                            updatedBy: currentTeacher?.id,
                          });
                          setRefreshKey((k) => k + 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer ${
                          setting.practiceLocked
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {setting.practiceLocked ? 'Đang khoá (Bấm để mở)' : 'Bật khoá luyện tập'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Khối 2: Quản lý Phiếu đồng ý của Phụ huynh (Mục 5) */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Đạo đức nghiên cứu: Trạng thái Phiếu đồng ý của Phụ huynh (Mục 5)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Báo cáo nghiên cứu chỉ tính các học sinh đã có phiếu đồng ý của phụ huynh. Mọi báo cáo xuất ra mặc định ẩn danh (HS01, HS02…).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    for (const st of scopeStudents) {
                      if (st.parentConsent === false) {
                        onUpdateStudent?.(st.id, { parentConsent: true });
                      }
                    }
                  }}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-extrabold text-xs cursor-pointer"
                >
                  ✓ Đánh dấu tất cả HS đã nộp phiếu đồng ý
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                    <th className="py-2.5 px-3">Họ và tên</th>
                    <th className="py-2.5 px-3">Lớp</th>
                    <th className="py-2.5 px-3">Trạng thái Phiếu đồng ý Phụ huynh</th>
                    <th className="py-2.5 px-3 text-right">Cập nhật</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scopeStudents.map((st) => {
                    const hasConsent = st.parentConsent !== false;
                    return (
                      <tr key={st.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{st.fullName}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-600">
                          {normalizeClassName(st.className)}
                        </td>
                        <td className="py-2.5 px-3">
                          {hasConsent ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                              ✓ Đã có phiếu đồng ý
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
                              Chưa nộp phiếu (Bị loại khỏi báo cáo)
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateStudent?.(st.id, { parentConsent: !hasConsent })
                            }
                            className="px-3 py-1 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
                          >
                            {hasConsent ? 'Đánh dấu chưa có' : 'Đánh dấu đã có phiếu'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: PHÂN TÍCH KẾT QUẢ & XUẤT EXCEL "SỐ LIỆU NGHIÊN CỨU.XLSX" (MỤC 4.5, 4.6, 4.7)
         ===================================================================== */}
      {subTab === 'analysis' && (
        <div className="space-y-6">
          {/* Bộ lọc & Thanh công cụ xuất Excel */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 mb-1">
                    Đợt kiểm tra Đầu vào (Pre-test):
                  </label>
                  <select
                    value={selectedPreRoundId}
                    disabled={useBenchmarkDemoData}
                    onChange={(e) => setSelectedPreRoundId(e.target.value)}
                    className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white"
                  >
                    {preRounds.length === 0 && (
                      <option value="">-- Chưa có đợt Đầu vào --</option>
                    )}
                    {preRounds.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.formId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-600 mb-1">
                    Đợt kiểm tra Đầu ra (Post-test):
                  </label>
                  <select
                    value={selectedPostRoundId}
                    disabled={useBenchmarkDemoData}
                    onChange={(e) => setSelectedPostRoundId(e.target.value)}
                    className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white"
                  >
                    {postRounds.length === 0 && (
                      <option value="">-- Chưa có đợt Đầu ra --</option>
                    )}
                    {postRounds.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.formId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-600 mb-1">
                    Lọc theo lớp:
                  </label>
                  <select
                    value={analysisClassFilter}
                    disabled={useBenchmarkDemoData}
                    onChange={(e) => setAnalysisClassFilter(e.target.value)}
                    className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white"
                  >
                    <option value="all">Tất cả lớp tham gia</option>
                    {availableClasses.map((c) => (
                      <option key={c} value={c}>
                        Lớp {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                <button
                  type="button"
                  onClick={() => setUseBenchmarkDemoData((v) => !v)}
                  className={`min-h-[42px] px-3.5 py-2 rounded-2xl text-xs font-extrabold border inline-flex items-center gap-1.5 cursor-pointer ${
                    useBenchmarkDemoData
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>
                    {useBenchmarkDemoData
                      ? 'Đang xem: Bộ số liệu kiểm thử Mục 4.7'
                      : 'Xem bộ số liệu kiểm thử Mục 4.7'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => void handleExportResearchExcel()}
                  className="min-h-[42px] px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Xuất Excel: Số liệu nghiên cứu.xlsx</span>
                </button>
              </div>
            </div>

            {/* Tuỳ chọn đạo đức nghiên cứu & ẩn danh */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-4 flex-wrap">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyConsentedStudents}
                    onChange={(e) => setOnlyConsentedStudents(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Chỉ tính học sinh đã có Phiếu đồng ý phụ huynh</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFullNameInReport}
                    onChange={(e) => setShowFullNameInReport(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Hiện họ tên học sinh (Mặc định tắt để ẩn danh HS01, HS02…)</span>
                </label>
              </div>

              <div className="text-xs font-bold text-slate-600">
                Đủ cả 2 bài:{' '}
                <strong className="text-indigo-700">
                  {researchAnalysis.studentRows.length} học sinh
                </strong>{' '}
                · Bị loại:{' '}
                <strong className="text-rose-700">
                  {researchAnalysis.excludedCounts.totalExcluded} HS
                </strong>{' '}
                (Thiếu đầu vào: {researchAnalysis.excludedCounts.missingPre}, Thiếu đầu ra:{' '}
                {researchAnalysis.excludedCounts.missingPost}, Chưa có phiếu PH:{' '}
                {researchAnalysis.excludedCounts.noParentConsent})
              </div>
            </div>
          </div>

          {/* 1. Hộp Câu kết luận tự sinh chuẩn SKKN / NCKHSPƯD */}
          <div className="neu-card bg-indigo-950 text-white p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                Nhận xét & Kết luận tự động (Dùng trực tiếp cho báo cáo SKKN / NCKHSPƯD)
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(researchAnalysis.summary.conclusionText);
                  setCopiedConclusion(true);
                  setTimeout(() => setCopiedConclusion(false), 2000);
                }}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedConclusion ? 'Đã sao chép!' : 'Sao chép câu kết luận'}</span>
              </button>
            </div>
            <p className="text-sm sm:text-base font-bold leading-relaxed text-white">
              “{researchAnalysis.summary.conclusionText}”
            </p>
          </div>

          {/* 2. Bảng tổng hợp kết quả (Giống bảng trong SKKN - Mục 4.5.1) */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                1. Bảng tổng hợp so sánh Trước và Sau tác động (Welch T-test & Paired T-test)
              </h3>
              <span className="text-xs font-bold text-slate-500">
                Thư viện: jStat · Kiểm định T-test độc lập phương sai không bằng nhau (Welch)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-950 font-extrabold border-b border-indigo-200">
                    <th className="py-3 px-4">Chỉ số thống kê</th>
                    <th className="py-3 px-4 text-center">TN – Trước</th>
                    <th className="py-3 px-4 text-center">ĐC – Trước</th>
                    <th className="py-3 px-4 text-center">TN – Sau</th>
                    <th className="py-3 px-4 text-center">ĐC – Sau</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-semibold">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-800">Số HS (N)</td>
                    <td className="py-3 px-4 text-center">{researchAnalysis.summary.tnPre.n}</td>
                    <td className="py-3 px-4 text-center">{researchAnalysis.summary.dcPre.n}</td>
                    <td className="py-3 px-4 text-center">{researchAnalysis.summary.tnPost.n}</td>
                    <td className="py-3 px-4 text-center">{researchAnalysis.summary.dcPost.n}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-800">Mốt / Trung vị</td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.tnPre.mode, 2)} /{' '}
                      {formatViNumber(researchAnalysis.summary.tnPre.median, 2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.dcPre.mode, 2)} /{' '}
                      {formatViNumber(researchAnalysis.summary.dcPre.median, 2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.tnPost.mode, 2)} /{' '}
                      {formatViNumber(researchAnalysis.summary.tnPost.median, 2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.dcPost.mode, 2)} /{' '}
                      {formatViNumber(researchAnalysis.summary.dcPost.median, 2)}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/80">
                    <td className="py-3 px-4 font-extrabold text-indigo-950">
                      Giá trị trung bình (Mean)
                    </td>
                    <td className="py-3 px-4 text-center font-extrabold text-indigo-900">
                      {formatViNumber(researchAnalysis.summary.tnPre.mean, 2)}
                    </td>
                    <td className="py-3 px-4 text-center font-extrabold text-slate-800">
                      {formatViNumber(researchAnalysis.summary.dcPre.mean, 2)}
                    </td>
                    <td className="py-3 px-4 text-center font-extrabold text-emerald-700">
                      {formatViNumber(researchAnalysis.summary.tnPost.mean, 2)}
                    </td>
                    <td className="py-3 px-4 text-center font-extrabold text-slate-800">
                      {formatViNumber(researchAnalysis.summary.dcPost.mean, 2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-800">Độ lệch chuẩn (SD)</td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.tnPre.sd, 4)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.dcPre.sd, 4)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.tnPost.sd, 4)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatViNumber(researchAnalysis.summary.dcPost.sd, 4)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      p (T-test độc lập Welch: TN vs ĐC)
                    </td>
                    <td colSpan={2} className="py-3 px-4 text-center font-extrabold">
                      p = {formatViNumber(researchAnalysis.summary.preWelch.p, 4)}{' '}
                      <span className="text-xs font-bold text-slate-500">
                        ({researchAnalysis.summary.preWelch.p > 0.05 ? '> 0,05: Tương đương' : '≤ 0,05'})
                      </span>
                    </td>
                    <td colSpan={2} className="py-3 px-4 text-center font-extrabold text-emerald-700">
                      p = {formatViNumber(researchAnalysis.summary.postWelch.p, 4)}{' '}
                      <span className="text-xs font-bold">
                        ({researchAnalysis.summary.postWelch.p <= 0.05 ? '≤ 0,05: Có ý nghĩa' : '> 0,05'})
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      p (T-test phụ thuộc/cặp: Trước vs Sau)
                    </td>
                    <td colSpan={2} className="py-3 px-4 text-center text-slate-400">
                      —
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-indigo-700">
                      {researchAnalysis.summary.tnPaired.p < 0.0001
                        ? researchAnalysis.summary.tnPaired.p.toExponential(2)
                        : formatViNumber(researchAnalysis.summary.tnPaired.p, 4)}{' '}
                      (Δ = +{formatViNumber(researchAnalysis.summary.tnPaired.meanDiff, 2)})
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-700">
                      {researchAnalysis.summary.dcPaired.p < 0.0001
                        ? researchAnalysis.summary.dcPaired.p.toExponential(2)
                        : formatViNumber(researchAnalysis.summary.dcPaired.p, 4)}{' '}
                      (Δ = +{formatViNumber(researchAnalysis.summary.dcPaired.meanDiff, 2)})
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/70">
                    <td className="py-3 px-4 font-extrabold text-emerald-950">
                      Mức độ ảnh hưởng SMD (Effect Size)
                    </td>
                    <td colSpan={2} className="py-3 px-4 text-center text-slate-400">
                      —
                    </td>
                    <td colSpan={2} className="py-3 px-4 text-center font-black text-emerald-900">
                      SMD = {formatViNumber(researchAnalysis.summary.smd.smd, 3)} — Mức độ ảnh hưởng:{' '}
                      {researchAnalysis.summary.smd.label}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Độ tin cậy của đề (Spearman-Brown Split-Half - Mục 4.5.3) */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                2. Độ tin cậy của đề kiểm tra (Chia đôi câu chẵn/lẻ – Công thức Spearman-Brown)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Hệ số tương quan nửa đề r_half ={' '}
                <strong>{formatViNumber(researchAnalysis.reliability.rHalf, 3)}</strong> → Độ tin cậy
                Spearman-Brown r_SB ={' '}
                <strong>{formatViNumber(researchAnalysis.reliability.spearmanBrown, 3)}</strong> (Ngưỡng đạt chuẩn: ≥ 0,70).
              </p>
            </div>
            <div
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm shrink-0 ${
                researchAnalysis.reliability.isReliable
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {researchAnalysis.reliability.isReliable
                ? `✓ ĐẠT CHUẨN ĐỘ TIN CẬY (${formatViNumber(
                    researchAnalysis.reliability.spearmanBrown,
                    2
                  )} ≥ 0,70)`
                : `⚠️ Chưa đạt ngưỡng 0,70 (${formatViNumber(
                    researchAnalysis.reliability.spearmanBrown,
                    2
                  )})`}
            </div>
          </div>

          {/* 4. Hệ thống biểu đồ trực quan (Mục 4.5.4 & 4.5.6) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biểu đồ 1: Điểm TB Trước & Sau của 2 nhóm */}
            <div className="neu-card bg-white p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Biểu đồ 1: So sánh Điểm trung bình Trước & Sau tác động
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        stage: 'Kiểm tra Trước (Đầu vào)',
                        'Nhóm TN': Number(researchAnalysis.summary.tnPre.mean.toFixed(2)),
                        'Nhóm ĐC': Number(researchAnalysis.summary.dcPre.mean.toFixed(2)),
                      },
                      {
                        stage: 'Kiểm tra Sau (Đầu ra)',
                        'Nhóm TN': Number(researchAnalysis.summary.tnPost.mean.toFixed(2)),
                        'Nhóm ĐC': Number(researchAnalysis.summary.dcPost.mean.toFixed(2)),
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Nhóm TN" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Nhóm ĐC" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ 2: Phân bố điểm (Histogram) sau tác động */}
            <div className="neu-card bg-white p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Biểu đồ 2: Phân bố điểm (Histogram) ở bài Kiểm tra Đầu ra
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreHistogramData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="TN" name="Nhóm TN (Số HS)" fill="#10b981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="ĐC" name="Nhóm ĐC (Số HS)" fill="#64748b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ 3: Tiến bộ theo từng điểm ngữ pháp */}
            <div className="neu-card bg-white p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Biểu đồ 3: Mức tiến bộ (% đúng tăng thêm) theo Điểm ngữ pháp
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={researchAnalysis.grammarProgressRows.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grammarPointId" tick={{ fontSize: 10 }} />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tnGainPct" name="Tiến bộ TN (%)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="dcGainPct" name="Tiến bộ ĐC (%)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ 4: Mối liên hệ giữa thời lượng học trên app và mức tiến bộ của nhóm TN */}
            <div className="neu-card bg-white p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Biểu đồ 4: Tương quan Thời lượng luyện tập (phút) & Mức tiến bộ điểm (Nhóm TN)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="studyMinutes"
                      name="Số phút luyện"
                      unit="p"
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="diffScore10"
                      name="Mức tiến bộ"
                      unit="đ"
                      tick={{ fontSize: 11 }}
                    />
                    <ZAxis range={[60, 60]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter
                      name="Học sinh nhóm TN"
                      data={researchAnalysis.studentRows.filter((r) => r.group === 'TN')}
                      fill="#4f46e5"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 5. Bảng điểm chi tiết từng học sinh (Mặc định ẩn danh HS01, HS02...) */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">
              3. Bảng điểm Trước – Sau của Học sinh ({researchAnalysis.studentRows.length} HS)
            </h3>
            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                    <th className="py-2.5 px-3">Mã HS</th>
                    {showFullNameInReport && <th className="py-2.5 px-3">Họ và tên</th>}
                    <th className="py-2.5 px-3">Lớp</th>
                    <th className="py-2.5 px-3">Nhóm</th>
                    <th className="py-2.5 px-3">Điểm Trước</th>
                    <th className="py-2.5 px-3">Điểm Sau</th>
                    <th className="py-2.5 px-3">Chênh lệch</th>
                    <th className="py-2.5 px-3">Số phút luyện trên app</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {researchAnalysis.studentRows.map((row) => (
                    <tr key={row.studentId} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">
                        {row.anonymousCode}
                      </td>
                      {showFullNameInReport && (
                        <td className="py-2.5 px-3 font-bold text-slate-900">{row.fullName}</td>
                      )}
                      <td className="py-2.5 px-3">{row.className}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-xs font-extrabold ${
                            row.group === 'TN'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {row.group === 'TN' ? 'TN' : 'ĐC'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">{row.preScore10.toFixed(2)}</td>
                      <td className="py-2.5 px-3 font-extrabold text-slate-900">
                        {row.postScore10.toFixed(2)}
                      </td>
                      <td
                        className={`py-2.5 px-3 font-extrabold ${
                          row.diffScore10 >= 0 ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {row.diffScore10 >= 0 ? `+${row.diffScore10.toFixed(2)}` : row.diffScore10.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3">{row.studyMinutes} phút</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Bảng Phân tích từng câu hỏi (Item Analysis - Mục 4.5.5) */}
          <div className="neu-card bg-white p-5 sm:p-6 border border-slate-200 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">
              4. Phân tích chất lượng từng câu hỏi (Độ khó & Độ phân biệt 27%)
            </h3>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                    <th className="py-2.5 px-3">Câu</th>
                    <th className="py-2.5 px-3">Mã câu</th>
                    <th className="py-2.5 px-3">Unit / Chủ điểm</th>
                    <th className="py-2.5 px-3">% Đúng (Độ khó)</th>
                    <th className="py-2.5 px-3">Độ phân biệt (D)</th>
                    <th className="py-2.5 px-3">Phương án nhiễu chọn nhiều</th>
                    <th className="py-2.5 px-3">Đánh giá câu hỏi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {researchAnalysis.itemAnalysisRows.map((it) => (
                    <tr key={it.itemId} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold">#{it.itemNumber}</td>
                      <td className="py-2.5 px-3 font-mono text-xs">{it.itemId}</td>
                      <td className="py-2.5 px-3">
                        Unit {it.unit} · {it.grammarPointId || 'Từ vựng'}
                      </td>
                      <td className="py-2.5 px-3 font-bold">{it.difficultyPct}%</td>
                      <td className="py-2.5 px-3 font-bold">{it.discriminationIndex.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {it.topDistractor ? `${it.topDistractor} (${it.topDistractorCount})` : '—'}
                      </td>
                      <td className="py-2.5 px-3">
                        {it.flagLabels.length === 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            Tốt
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {it.flagLabels.map((lbl, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold"
                              >
                                ⚠️ {lbl}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 1: ĐỔI CÂU HỎI TRONG TRANG "XEM TRƯỚC ĐỀ"
         ===================================================================== */}
      {swapTargetItem && currentPreviewForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Đổi câu hỏi tương đương trong đề {currentPreviewForm.id}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Cùng điểm ngữ pháp ({swapTargetItem.grammarPointId}) và cùng dạng ({swapTargetItem.type.toUpperCase()})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSwapTargetItem(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
              {replacementCandidates.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500 font-semibold">
                  Không còn câu hỏi dự phòng nào khác cùng điểm ngữ pháp và cùng dạng bài.
                </div>
              ) : (
                replacementCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-slate-50 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="font-mono text-xs font-bold text-indigo-600">{cand.id}</div>
                      <div className="font-extrabold text-slate-900">
                        {cand.prompt || (cand.tokens ? cand.tokens.join(' / ') : '')}
                      </div>
                      {cand.explanation && (
                        <div className="text-xs text-slate-500">{cand.explanation}</div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        replaceItemInTestForm(
                          currentPreviewForm.id,
                          swapTargetItem.id,
                          cand,
                          currentTeacher?.id
                        );
                        setSwapTargetItem(null);
                        setRefreshKey((k) => k + 1);
                        setPreviewNotice(
                          `Đã thay câu ${swapTargetItem.id} bằng câu ${cand.id} trong đề ${currentPreviewForm.id}.`
                        );
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shrink-0 cursor-pointer"
                    >
                      Chọn câu này
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: TẠO ĐỢT KIỂM TRA MỚI
         ===================================================================== */}
      {showCreateRoundModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleCreateRoundSubmit}
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Tạo đợt kiểm tra mới</h3>
              <button
                type="button"
                onClick={() => setShowCreateRoundModal(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">
                  Tên đợt kiểm tra:
                </label>
                <input
                  type="text"
                  required
                  value={newRoundName}
                  onChange={(e) => setNewRoundName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Loại đợt:</label>
                  <select
                    value={newRoundKind}
                    onChange={(e) => setNewRoundKind(e.target.value as TestRoundKind)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white"
                  >
                    <option value="pre">Kiểm tra đầu vào (Pre-test)</option>
                    <option value="post">Kiểm tra đầu ra (Post-test)</option>
                    <option value="retention">Kiểm tra duy trì (Retention)</option>
                    <option value="pilot">Thử nghiệm hệ thống (Pilot)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Chọn đề:</label>
                  <select
                    value={newRoundFormId}
                    onChange={(e) => setNewRoundFormId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white"
                  >
                    {testFormsDataset.tests.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id} – {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Giờ mở đề:</label>
                  <input
                    type="datetime-local"
                    value={newRoundOpenAt}
                    onChange={(e) => setNewRoundOpenAt(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Giờ đóng đề:</label>
                  <input
                    type="datetime-local"
                    value={newRoundCloseAt}
                    onChange={(e) => setNewRoundCloseAt(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">
                    Thời gian (phút):
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={newRoundDuration}
                    onChange={(e) => setNewRoundDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1.5">
                  Chọn lớp tham gia & Gán nhóm nghiên cứu (TN / ĐC):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto p-2 rounded-xl bg-slate-50 border border-slate-200">
                  {availableClasses.map((cls) => {
                    const val = newRoundClasses[cls] || 'NONE';
                    return (
                      <div
                        key={cls}
                        className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-1"
                      >
                        <span className="font-extrabold text-slate-800 text-xs">{cls}</span>
                        <select
                          value={val}
                          onChange={(e) =>
                            setNewRoundClasses((prev) => ({
                              ...prev,
                              [cls]: e.target.value as ResearchGroupType | 'NONE',
                            }))
                          }
                          className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold bg-slate-50"
                        >
                          <option value="NONE">Không chọn</option>
                          <option value="TN">Nhóm TN</option>
                          <option value="DC">Nhóm ĐC</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>

              <label className="inline-flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newRoundShowScore}
                  onChange={(e) => setNewRoundShowScore(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Cho phép học sinh xem tổng điểm (thang 10) sau khi nộp bài (không hiện đáp án)</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateRoundModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm text-slate-700 cursor-pointer"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm cursor-pointer"
              >
                Tạo & Mở đợt kiểm tra
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: CHIẾU MÃ VÀO THI (QR CODE & ĐƯỜNG LINK LỚN)
         ===================================================================== */}
      {qrModalRound && (() => {
        const examUrl =
          typeof window !== 'undefined'
            ? `${window.location.origin}${window.location.pathname}?testRound=${qrModalRound.id}`
            : `https://englishtutor6.app/?testRound=${qrModalRound.id}`;
        const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
          examUrl
        )}`;

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-indigo-200 text-center space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold">
                  Chiếu lên bảng lớp học
                </span>
                <button
                  type="button"
                  onClick={() => setQrModalRound(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">{qrModalRound.name}</h3>
                <p className="text-sm font-bold text-indigo-700 mt-1">
                  Đề: {qrModalRound.formId} · Thời gian: {qrModalRound.durationMin} phút (40 câu)
                </p>
              </div>

              <div className="w-56 h-56 mx-auto rounded-3xl border-4 border-indigo-600 p-3 bg-white grid place-items-center shadow-md">
                <img
                  src={qrImgUrl}
                  alt="QR vào phòng kiểm tra"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-300 space-y-1.5">
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Đường dẫn vào bài kiểm tra:
                </div>
                <div className="font-mono text-xs sm:text-sm font-black text-indigo-900 break-all">
                  {examUrl}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(examUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedLink ? 'Đã sao chép đường link!' : 'Sao chép đường link'}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =====================================================================
          MODAL 4: HUỶ BÀI & CHO HỌC SINH LÀM LẠI (BẮT BUỘC GHI LÝ DO)
         ===================================================================== */}
      {voidModalAttempt && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">
              Huỷ bài & cho làm lại: {voidModalAttempt.studentName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Chỉ sử dụng chức năng này khi học sinh gặp sự cố kỹ thuật thực sự (mất điện, đứng máy, trình duyệt lỗi). Lý do huỷ bài sẽ được lưu vào nhật ký nghiên cứu.
            </p>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Lý do huỷ bài (bắt buộc):
              </label>
              <textarea
                rows={3}
                value={voidReasonInput}
                onChange={(e) => setVoidReasonInput(e.target.value)}
                placeholder="VD: Máy tính phòng tin học bị tắt nguồn đột ngột ở phút thứ 10…"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
              />
              {voidErrorMsg && (
                <p className="text-xs font-bold text-rose-600 mt-1">{voidErrorMsg}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setVoidModalAttempt(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  const res = voidStudentTestAttempt({
                    attemptId: voidModalAttempt.attempt.id,
                    reason: voidReasonInput,
                    teacherId: currentTeacher?.id || 'teacher',
                  });
                  if (!res.success) {
                    setVoidErrorMsg(res.error || 'Vui lòng nhập lý do.');
                    return;
                  }
                  setVoidModalAttempt(null);
                  setRefreshKey((k) => k + 1);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold cursor-pointer"
              >
                Xác nhận huỷ bài & cho thi lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
