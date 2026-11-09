import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Printer,
  Sparkles,
  ArrowUpRight,
  UserPlus,
  Key,
  Edit3,
  Trash2,
  ShieldCheck,
  Filter,
  X,
  Save,
  Users,
  Layers,
  GraduationCap,
  Mic,
  PenTool,
  Eye,
  EyeOff,
  Plus,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  AppDataSchema,
  StudentAccount,
  TeacherAccount,
  MasteryThresholdsOverride,
  SkillType,
} from '../types';
import {
  getTeacherStudents,
  exportTeacherBackupJSON,
  getAvailableClasses,
  normalizeClassName,
  normalizeFullName,
  hashPasswordSync,
  generateRecoveryCode,
  suggestAvailableUsernames,
} from '../services/storage';
import {
  getMasteryThresholds,
  getMasteryLabel,
  getMasteryBadgeStyle,
  DEFAULT_MASTERY_THRESHOLDS,
} from '../config/masteryThresholds';
import {
  loadGrammarDataset,
  LoadedGrammarBundle,
  formatItemPreview,
  EXERCISE_TYPE_LABELS,
} from '../grammar-g6/dataLoader';
import { loadClassGrammarStores } from '../grammar-g6/storage';
import { TeacherManagementPanel } from './TeacherManagementPanel';
import { TeacherAnalyticsReportSection } from './TeacherAnalyticsReportSection';
import { TeacherPrePostTestSection } from './TeacherPrePostTestSection';

interface ParentDashboardProps {
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  onReviewTopicClick: (unitId: string) => void;
  onAddStudent?: (newStudent: StudentAccount) => void;
  onUpdateStudent?: (studentId: string, updatedFields: Partial<StudentAccount>) => void;
  onDeleteStudent?: (studentId: string) => void;
  onResetPin?: (studentId: string, newPin: string) => void;
  onOpenAuthModal?: () => void;
  // Admin-only teacher management
  onCreateActivationCode?: (assignedClasses?: string[]) => void;
  onDeleteActivationCode?: (code: string) => void;
  onDeactivateTeacher?: (teacherId: string) => void;
  onReactivateTeacher?: (teacherId: string) => void;
  onDeleteTeacher?: (teacherId: string) => void;
  onUpdateTeacherClasses?: (teacherId: string, classes: string[]) => void;
  onUpdateTeacherProfile?: (updates: {
    fullName?: string;
    schoolName?: string;
    newPassword?: string;
    oldPassword?: string;
  }) => { success: boolean; error?: string };
  onOpenTeacherProfile?: () => void;
  onAddCustomClass?: (className: string) => void;
  onChangeClassUnit?: (className: string, unitId: string) => void;
  onUpdateMasteryThresholds?: (nextThresholds: MasteryThresholdsOverride) => void;
}

const CORE_SKILLS: {
  key: SkillType;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
}[] = [
  {
    key: 'Grammar',
    label: 'Ngữ pháp',
    icon: <GraduationCap className="w-4 h-4" />,
    colorClass: 'text-indigo-800 bg-indigo-50 border-indigo-200',
  },
  {
    key: 'Vocabulary',
    label: 'Từ vựng',
    icon: <Layers className="w-4 h-4" />,
    colorClass: 'text-teal-900 bg-teal-50 border-teal-200',
  },
  {
    key: 'Pronunciation',
    label: 'Phát âm',
    icon: <Mic className="w-4 h-4" />,
    colorClass: 'text-rose-900 bg-rose-50 border-rose-200',
  },
  {
    key: 'Reading',
    label: 'Đọc hiểu',
    icon: <BookOpen className="w-4 h-4" />,
    colorClass: 'text-amber-900 bg-amber-50 border-amber-200',
  },
  {
    key: 'Writing',
    label: 'Viết',
    icon: <PenTool className="w-4 h-4" />,
    colorClass: 'text-sky-900 bg-sky-50 border-sky-200',
  },
];

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  appData,
  currentTeacher,
  isAdmin,
  onReviewTopicClick,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onResetPin,
  onOpenAuthModal,
  onCreateActivationCode,
  onDeleteActivationCode,
  onDeactivateTeacher,
  onReactivateTeacher,
  onDeleteTeacher,
  onUpdateTeacherClasses,
  onOpenTeacherProfile,
  onAddCustomClass,
  onChangeClassUnit,
  onUpdateMasteryThresholds,
}) => {
  const { units, students, isTeacherLoggedIn } = appData;

  // Dashboard sub-tab: 'students' (default) or 'teachers' (admin only)
  const [dashboardTab, setDashboardTab] = useState<'students' | 'teachers'>('students');

  // Class & Student Filter state
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [selectedStudentIdFilter, setSelectedStudentIdFilter] = useState<string>('all');
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>('');
  const [newClassInput, setNewClassInput] = useState<string>('');
  const [showAddClassInput, setShowAddClassInput] = useState<boolean>(false);

  // Teacher Student Management Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<StudentAccount | null>(null);
  const [pinResetStudent, setPinResetStudent] = useState<StudentAccount | null>(null);
  const [newPinValue, setNewPinValue] = useState<string>('');
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [resetSuccessBanner, setResetSuccessBanner] = useState<string>('');
  const [createdAccountBanner, setCreatedAccountBanner] = useState<{
    fullName: string;
    username: string;
    className: string;
    passwordPlain: string;
    recoveryCode: string;
  } | null>(null);

  // Form State for Add/Edit Student
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    className: '',
    password: '',
    avatar: '👨‍🎓',
    dailyGoalMinutes: 20,
  });
  const [showCreatePassword, setShowCreatePassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Load grammar-g6 dataset for Sổ lỗi sai analysis
  const [grammarBundle, setGrammarBundle] = useState<LoadedGrammarBundle | null>(null);
  useEffect(() => {
    let mounted = true;
    loadGrammarDataset()
      .then((b) => {
        if (mounted) setGrammarBundle(b);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  // Filter students by same school (automatic for teacher) and by selected class
  const teacherStudents = useMemo(
    () => getTeacherStudents(appData, appData.currentTeacherId),
    [appData]
  );

  const availableClasses = useMemo(() => {
    const raw = getAvailableClasses(appData, appData.currentTeacherId);
    const normalized = Array.from(new Set(raw.map((c) => normalizeClassName(c))));
    return normalized.length > 0 ? normalized : ['6A1', '6A2'];
  }, [appData]);

  const classFilteredStudents = useMemo(() => {
    if (selectedClassFilter === 'all') return teacherStudents;
    return teacherStudents.filter(
      (s) => normalizeClassName(s.className) === normalizeClassName(selectedClassFilter)
    );
  }, [teacherStudents, selectedClassFilter]);

  const searchedStudents = useMemo(() => {
    const q = studentSearchQuery.trim().toLowerCase();
    if (!q) return classFilteredStudents;
    return classFilteredStudents.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.username.toLowerCase().includes(q) ||
        normalizeClassName(s.className).toLowerCase().includes(q)
    );
  }, [classFilteredStudents, studentSearchQuery]);

  // Students targeted in the Progress Report & Mistake Book section (either entire class or 1 student)
  const reportTargetStudents = useMemo(() => {
    if (selectedStudentIdFilter !== 'all') {
      const found = classFilteredStudents.find((s) => s.id === selectedStudentIdFilter);
      if (found) return [found];
    }
    return classFilteredStudents;
  }, [classFilteredStudents, selectedStudentIdFilter]);

  // Load grammar-g6 stores for all teacherStudents
  const grammarStoreByStudent = useMemo(
    () => loadClassGrammarStores(teacherStudents.map((s) => s.id)),
    [teacherStudents, appData.sessions.length]
  );

  // Teacher settings for Classroom Unit & Mastery Thresholds
  const activeThresholds = getMasteryThresholds(appData.masteryThresholds);
  const [bulkUnitId, setBulkUnitId] = useState<string>(
    appData.classCurrentUnits?.['DEFAULT'] || 'unit-1'
  );
  const [goodMinInput, setGoodMinInput] = useState<number>(activeThresholds.goodMin);
  const [fairMinInput, setFairMinInput] = useState<number>(activeThresholds.fairMin);
  const [passMinInput, setPassMinInput] = useState<number>(activeThresholds.passMin);
  const [thresholdSavedMsg, setThresholdSavedMsg] = useState<string>('');

  // Compute per-student metrics (learned units X/12, accuracy Y% per skill & overall)
  const studentAnalyticsMap = useMemo(() => {
    const map: Record<
      string,
      {
        learnedUnitsCount: number;
        overallAccuracy: number;
        totalSessions: number;
        bySkill: Record<SkillType, { learnedUnits: number; accuracy: number; count: number }>;
      }
    > = {};

    teacherStudents.forEach((st) => {
      const gStore = grammarStoreByStudent[st.id];
      const allUnitsSet = new Set<string>();
      Object.entries(st.progress.unitProgress || {}).forEach(([uId, pct]) => {
        if (pct > 0) allUnitsSet.add(uId);
      });
      st.sessions.forEach((sess) => {
        if (sess.unitId && sess.unitId.startsWith('unit-')) allUnitsSet.add(sess.unitId);
      });
      if (gStore) {
        (gStore.attempts || []).forEach((att) => {
          const m = /^u(\d+)/i.exec(att.unitId || att.itemId);
          if (m) allUnitsSet.add(`unit-${Number(m[1])}`);
        });
        Object.keys(gStore.setProgress || {}).forEach((setId) => {
          const m = /^u(\d+)/i.exec(setId);
          if (m) allUnitsSet.add(`unit-${Number(m[1])}`);
        });
      }

      const bySkill: Record<
        SkillType,
        { learnedUnits: number; accuracy: number; count: number }
      > = {} as any;

      CORE_SKILLS.forEach(({ key: skillKey }) => {
        const skillSessions = st.sessions.filter((s) => s.skill === skillKey);
        const uSet = new Set<string>();
        skillSessions.forEach((s) => {
          if (s.unitId && s.unitId.startsWith('unit-')) uSet.add(s.unitId);
        });

        let gCorrect = 0;
        let gTotal = 0;
        if (skillKey === 'Grammar' && gStore) {
          (gStore.attempts || []).forEach((att) => {
            gTotal++;
            if (att.correct) gCorrect++;
            const m = /^u(\d+)/i.exec(att.unitId || att.itemId);
            if (m) uSet.add(`unit-${Number(m[1])}`);
          });
          Object.keys(gStore.setProgress || {}).forEach((setId) => {
            const m = /^u(\d+)/i.exec(setId);
            if (m) uSet.add(`unit-${Number(m[1])}`);
          });
        }

        if (uSet.size === 0 && allUnitsSet.size > 0 && skillSessions.length === 0) {
          allUnitsSet.forEach((u) => uSet.add(u));
        }

        let accuracy = st.progress.skillMastery?.[skillKey] ?? 0;
        if (skillKey === 'Grammar' && gTotal > 0) {
          const gPct = Math.round((gCorrect / gTotal) * 100);
          if (skillSessions.length > 0) {
            const sAvg = Math.round(
              skillSessions.reduce((a, b) => a + b.score, 0) / skillSessions.length
            );
            accuracy = Math.round((gPct + sAvg) / 2);
          } else {
            accuracy = gPct;
          }
        } else if (skillSessions.length > 0) {
          const qTotal = skillSessions.reduce((a, b) => a + (b.totalQuestions || 0), 0);
          const qCorr = skillSessions.reduce((a, b) => a + (b.correctAnswers || 0), 0);
          accuracy =
            qTotal > 0
              ? Math.round((qCorr / qTotal) * 100)
              : Math.round(
                  skillSessions.reduce((a, b) => a + b.score, 0) / skillSessions.length
                );
        }

        bySkill[skillKey] = {
          learnedUnits: Math.min(12, uSet.size),
          accuracy,
          count:
            skillSessions.length +
            (skillKey === 'Grammar' ? Object.keys(gStore?.setProgress || {}).length : 0),
        };
      });

      const overallAccuracy = Math.round(
        CORE_SKILLS.reduce((acc, c) => acc + (bySkill[c.key]?.accuracy || 0), 0) /
          CORE_SKILLS.length
      );

      map[st.id] = {
        learnedUnitsCount: Math.min(12, allUnitsSet.size),
        overallAccuracy,
        totalSessions:
          st.sessions.length + Object.keys(gStore?.setProgress || {}).length,
        bySkill,
      };
    });

    return map;
  }, [teacherStudents, grammarStoreByStudent]);

  // Class Overview Stats (without XP/Level)
  const classOverviewStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const activeTodayCount = classFilteredStudents.filter(
      (st) => (st.dailyLogs?.[todayStr]?.timeSpentSeconds || 0) > 0
    ).length;

    const totalCompletedExercises = classFilteredStudents.reduce(
      (sum, st) => sum + (studentAnalyticsMap[st.id]?.totalSessions || 0),
      0
    );

    const avgAccuracy =
      classFilteredStudents.length > 0
        ? Math.round(
            classFilteredStudents.reduce(
              (sum, st) => sum + (studentAnalyticsMap[st.id]?.overallAccuracy || 0),
              0
            ) / classFilteredStudents.length
          )
        : 0;

    return {
      studentCount: classFilteredStudents.length,
      activeTodayCount,
      totalCompletedExercises,
      avgAccuracy,
      masteryBadge: getMasteryBadgeStyle(avgAccuracy, appData.masteryThresholds),
    };
  }, [classFilteredStudents, studentAnalyticsMap, appData.masteryThresholds]);

  // Aggregated Skill Report for `reportTargetStudents`
  const aggregatedSkillReport = useMemo(() => {
    return CORE_SKILLS.map((skillMeta) => {
      if (reportTargetStudents.length === 0) {
        return {
          ...skillMeta,
          learnedUnits: 0,
          accuracy: 0,
          totalCount: 0,
          badge: getMasteryBadgeStyle(0, appData.masteryThresholds),
        };
      }
      const avgUnits = Math.round(
        reportTargetStudents.reduce(
          (sum, st) =>
            sum + (studentAnalyticsMap[st.id]?.bySkill[skillMeta.key]?.learnedUnits || 0),
          0
        ) / reportTargetStudents.length
      );
      const avgAcc = Math.round(
        reportTargetStudents.reduce(
          (sum, st) =>
            sum + (studentAnalyticsMap[st.id]?.bySkill[skillMeta.key]?.accuracy || 0),
          0
        ) / reportTargetStudents.length
      );
      const totalCount = reportTargetStudents.reduce(
        (sum, st) =>
          sum + (studentAnalyticsMap[st.id]?.bySkill[skillMeta.key]?.count || 0),
        0
      );
      return {
        ...skillMeta,
        learnedUnits: avgUnits,
        accuracy: avgAcc,
        totalCount,
        badge: getMasteryBadgeStyle(avgAcc, appData.masteryThresholds),
      };
    });
  }, [reportTargetStudents, studentAnalyticsMap, appData.masteryThresholds]);

  // Aggregated Unit Progress (1..12) for `reportTargetStudents`
  const aggregatedUnitProgress = useMemo(() => {
    return units.map((u) => {
      if (reportTargetStudents.length === 0) return { unit: u, pct: 0 };
      const sumPct = reportTargetStudents.reduce((acc, st) => {
        const directPct = st.progress.unitProgress?.[u.id] || 0;
        const gStore = grammarStoreByStudent[st.id];
        const gUnitPrefix = `u${u.unitNumber}-`;
        const gSets = Object.entries(gStore?.best || {}).filter(([k]) =>
          k.startsWith(gUnitPrefix)
        );
        const gPct =
          gSets.length > 0
            ? Math.round(
                (gSets.reduce((a, [, v]) => a + v, 0) / gSets.length) * 100
              )
            : 0;
        return acc + Math.max(directPct, gPct);
      }, 0);
      return {
        unit: u,
        pct: Math.round(sumPct / reportTargetStudents.length),
      };
    });
  }, [units, reportTargetStudents, grammarStoreByStudent]);

  // Aggregated Grammar Mistakes from Sổ lỗi sai (`store.mistakes` & wrong `store.attempts`)
  const topClassGrammarMistakes = useMemo(() => {
    if (!grammarBundle) return [];
    const { itemIndex, grammarPointIndex } = grammarBundle;

    const pointMap = new Map<
      string,
      {
        gpId: string;
        titleVi: string;
        titleEn: string;
        unitNumber: number;
        unitTitle: string;
        mistakeOccurrences: number;
        studentNames: Set<string>;
        itemsMap: Map<
          string,
          {
            itemId: string;
            preview: string;
            typeLabel: string;
            explanation: string;
            wrongCount: number;
          }
        >;
      }
    >();

    reportTargetStudents.forEach((st) => {
      const gStore = grammarStoreByStudent[st.id];
      if (!gStore) return;

      // 1. Read active items in Sổ lỗi sai (store.mistakes)
      Object.entries(gStore.mistakes || {}).forEach(([rawItemId, count]) => {
        if (!count || count <= 0) return;
        const baseItemId = rawItemId.split('#')[0];
        const entry = itemIndex[baseItemId];
        if (!entry) return;

        const gpId = entry.set.grammarPointId;
        const gpInfo = grammarPointIndex[gpId];
        const existing = pointMap.get(gpId) ?? {
          gpId,
          titleVi: gpInfo?.point.titleVi || entry.set.title,
          titleEn: gpInfo?.point.title || gpId,
          unitNumber: entry.unit.number,
          unitTitle: entry.unit.title,
          mistakeOccurrences: 0,
          studentNames: new Set<string>(),
          itemsMap: new Map(),
        };

        existing.mistakeOccurrences += count;
        existing.studentNames.add(`${st.fullName} (${normalizeClassName(st.className)})`);

        const itemStat = existing.itemsMap.get(baseItemId) ?? {
          itemId: baseItemId,
          preview: formatItemPreview(entry),
          typeLabel: EXERCISE_TYPE_LABELS[entry.set.type] || entry.set.type,
          explanation: entry.item.explanation || '',
          wrongCount: 0,
        };
        itemStat.wrongCount += count;
        existing.itemsMap.set(baseItemId, itemStat);

        pointMap.set(gpId, existing);
      });

      // 2. Also include wrong attempts from history if not already counted
      (gStore.attempts || []).forEach((att) => {
        if (att.correct) return;
        const baseItemId = att.itemId.split('#')[0];
        if (gStore.mistakes?.[baseItemId]) return; // already counted above
        const entry = itemIndex[baseItemId];
        if (!entry) return;

        const gpId = entry.set.grammarPointId;
        const gpInfo = grammarPointIndex[gpId];
        const existing = pointMap.get(gpId) ?? {
          gpId,
          titleVi: gpInfo?.point.titleVi || entry.set.title,
          titleEn: gpInfo?.point.title || gpId,
          unitNumber: entry.unit.number,
          unitTitle: entry.unit.title,
          mistakeOccurrences: 0,
          studentNames: new Set<string>(),
          itemsMap: new Map(),
        };

        existing.mistakeOccurrences += 1;
        existing.studentNames.add(`${st.fullName} (${normalizeClassName(st.className)})`);

        const itemStat = existing.itemsMap.get(baseItemId) ?? {
          itemId: baseItemId,
          preview: formatItemPreview(entry),
          typeLabel: EXERCISE_TYPE_LABELS[entry.set.type] || entry.set.type,
          explanation: entry.item.explanation || '',
          wrongCount: 0,
        };
        itemStat.wrongCount += 1;
        existing.itemsMap.set(baseItemId, itemStat);

        pointMap.set(gpId, existing);
      });
    });

    return Array.from(pointMap.values())
      .map((p) => ({
        ...p,
        studentsList: Array.from(p.studentNames),
        topItems: Array.from(p.itemsMap.values())
          .sort((a, b) => b.wrongCount - a.wrongCount)
          .slice(0, 3),
      }))
      .sort(
        (a, b) =>
          b.mistakeOccurrences - a.mistakeOccurrences ||
          b.studentsList.length - a.studentsList.length
      );
  }, [grammarBundle, reportTargetStudents, grammarStoreByStudent]);

  // Radar chart data from aggregatedSkillReport
  const radarSkillData = useMemo(
    () =>
      aggregatedSkillReport.map((item) => ({
        skill: item.label,
        mastery: item.accuracy,
      })),
    [aggregatedSkillReport]
  );

  // Recent sessions across `reportTargetStudents`
  const recentSessionsData = useMemo(() => {
    const allSess = reportTargetStudents
      .flatMap((st) =>
        st.sessions.map((s) => ({
          ...s,
          studentName: st.fullName,
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8)
      .reverse();

    return allSess.map((s, idx) => ({
      name: `${s.studentName.split(' ').pop() || 'HS'} #${idx + 1}`,
      score: s.score,
      skill: s.skill,
    }));
  }, [reportTargetStudents]);

  const handlePrintReport = () => {
    window.print();
  };

  const handleOpenAddModal = () => {
    setFormError('');
    const defaultClass =
      selectedClassFilter !== 'all'
        ? normalizeClassName(selectedClassFilter)
        : '';
    setFormData({
      username: '',
      fullName: '',
      className: defaultClass,
      password: '',
      avatar: '👨‍🎓',
      dailyGoalMinutes: 20,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (st: StudentAccount) => {
    setFormError('');
    setEditingStudent(st);
    setFormData({
      username: st.username,
      fullName: st.fullName,
      className: normalizeClassName(st.className),
      password: '',
      avatar: st.avatar,
      dailyGoalMinutes: st.dailyGoalMinutes || 20,
    });
  };

  const handleSaveStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const cleanFullName = normalizeFullName(formData.fullName);
    const cleanClass = normalizeClassName(formData.className || '6A1');
    if (!cleanFullName) {
      setFormError('Vui lòng nhập họ và tên học sinh.');
      return;
    }

    if (editingStudent) {
      const updates: Partial<StudentAccount> = {
        fullName: cleanFullName,
        className: cleanClass,
        avatar: formData.avatar,
        dailyGoalMinutes: Number(formData.dailyGoalMinutes) || 20,
      };
      if (formData.password.trim().length >= 6) {
        const hashed = hashPasswordSync(formData.password.trim());
        updates.pinCode = hashed;
        updates.passwordHash = hashed;
      }
      onUpdateStudent?.(editingStudent.id, updates);
      setEditingStudent(null);
      return;
    }

    // Creating a new student account
    let desiredUsername = formData.username.trim().toLowerCase().replace(/\s+/g, '');
    if (!desiredUsername) {
      const suggestions = suggestAvailableUsernames(
        cleanFullName,
        cleanClass,
        '',
        students
      );
      desiredUsername = suggestions[0] || `hs_${Date.now().toString().slice(-5)}`;
    } else {
      const exists = students.some(
        (s) => s.username.toLowerCase() === desiredUsername.toLowerCase()
      );
      if (exists) {
        const suggestions = suggestAvailableUsernames(
          cleanFullName,
          cleanClass,
          desiredUsername,
          students
        );
        setFormError(
          `Tên đăng nhập "${desiredUsername}" đã tồn tại. Gợi ý: ${suggestions.join(', ')}`
        );
        return;
      }
    }

    const rawPassword = formData.password.trim();
    if (rawPassword.length < 6) {
      setFormError('Mật khẩu khởi tạo phải có tối thiểu 6 ký tự.');
      return;
    }

    const hashedPassword = hashPasswordSync(rawPassword);
    const recoveryCode = generateRecoveryCode();
    const todayStr = new Date().toISOString().split('T')[0];

    const newStudent: StudentAccount = {
      id: `student-${Date.now()}`,
      username: desiredUsername,
      fullName: cleanFullName,
      grade: 6,
      className: cleanClass,
      provinceName: currentTeacher?.provinceName || '',
      communeName: currentTeacher?.communeName || '',
      schoolName: currentTeacher?.schoolName || '',
      passwordHash: hashedPassword,
      recoveryCodeHash: hashPasswordSync(recoveryCode),
      parentConsent: true,
      pinCode: hashedPassword,
      avatar: formData.avatar,
      dailyGoalMinutes: Number(formData.dailyGoalMinutes) || 20,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      progress: {
        studentName: cleanFullName,
        grade: 6,
        totalXP: 0,
        level: 1,
        streakDays: 0,
        lastStudyDate: '',
        badges: [],
        weakTopics: [],
        skillMastery: {
          Listening: 0,
          Speaking: 0,
          Reading: 0,
          Writing: 0,
          Grammar: 0,
          Vocabulary: 0,
          Pronunciation: 0,
        },
        unitProgress: {},
      },
      sessions: [],
      dailyLogs: {},
    };

    onAddStudent?.(newStudent);
    setIsAddModalOpen(false);
    setCreatedAccountBanner({
      fullName: cleanFullName,
      username: desiredUsername,
      className: cleanClass,
      passwordPlain: rawPassword,
      recoveryCode,
    });
  };

  const handleConfirmResetPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinResetStudent || newPinValue.trim().length < 6) return;
    onResetPin?.(pinResetStudent.id, newPinValue.trim());
    setResetSuccessBanner(
      `Đã đặt lại mật khẩu mới cho học sinh ${pinResetStudent.fullName} (@${pinResetStudent.username}).`
    );
    setPinResetStudent(null);
    setNewPinValue('');
    setTimeout(() => setResetSuccessBanner(''), 5000);
  };

  const handleDeleteConfirm = (st: StudentAccount) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa tài khoản học sinh ${st.fullName} (Lớp ${normalizeClassName(
          st.className
        )}) khỏi hệ thống?`
      )
    ) {
      onDeleteStudent?.(st.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner Giáo Viên / Admin */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-purple-700/40">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-extrabold">
            <BarChart3 className="w-4 h-4 text-amber-300" />
            <span>
              {isTeacherLoggedIn
                ? isAdmin
                  ? 'Trang Quản Trị Hệ Thống & Quản Lý Lớp Học'
                  : 'Trang Quản Lý Lớp Học Dành Riêng Cho Giáo Viên'
                : 'Báo Cáo Tiến Độ Học Tập Dành Cho Phụ Huynh & Giáo Viên'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {isTeacherLoggedIn
              ? `${currentTeacher?.fullName || 'Giáo Viên'} • ${
                  currentTeacher?.schoolName || 'THCS Chu Văn An'
                }`
              : 'Báo Cáo Tiến Độ & Phân Tích Lỗ Hổng Kiến Thức Lớp 6'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 font-medium">
            {isTeacherLoggedIn
              ? `Quản lý danh sách học sinh, chọn Unit đang dạy trên lớp, theo dõi tiến độ theo lớp/học sinh/kỹ năng và Sổ lỗi sai ngữ pháp.`
              : 'Theo dõi kết quả học tập 5 kỹ năng, tiến độ 12 Unit SGK Global Success và các chủ điểm ngữ pháp cần ôn tập.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {isTeacherLoggedIn && onOpenTeacherProfile && (
            <button
              type="button"
              onClick={onOpenTeacherProfile}
              className="px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs transition-all inline-flex items-center gap-1.5 border border-white/25 cursor-pointer whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Hồ sơ Giáo viên</span>
            </button>
          )}

          {isTeacherLoggedIn && (
            <button
              type="button"
              onClick={() => {
                if (appData.currentTeacherId) {
                  exportTeacherBackupJSON(appData, appData.currentTeacherId);
                }
              }}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>Xuất dữ liệu lớp (.json)</span>
            </button>
          )}

          {!isTeacherLoggedIn && (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition-all inline-flex items-center gap-2 border border-purple-500 cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Đăng Nhập Giáo Viên</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrintReport}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-2xs hover:bg-slate-100 transition-all inline-flex items-center gap-2 border border-slate-200 cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-4 h-4 text-indigo-700" />
            <span>In Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Toggle: Quản lý Lớp & Học Sinh vs Quản lý Giáo Viên */}
      {isAdmin && isTeacherLoggedIn && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setDashboardTab('students')}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              dashboardTab === 'students'
                ? 'neu-btn-primary text-white shadow-md'
                : 'neu-btn text-slate-800 hover:text-indigo-700'
            }`}
          >
            Quản Lý Lớp, Unit Giảng Dạy & Báo Cáo Học Sinh
          </button>
          <button
            type="button"
            onClick={() => setDashboardTab('teachers')}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              dashboardTab === 'teachers'
                ? 'neu-btn-primary text-white shadow-md'
                : 'neu-btn text-slate-800 hover:text-purple-700'
            }`}
          >
            Quản Lý Tài Khoản Giáo Viên Toàn Hệ Thống ({appData.teachers.length})
          </button>
        </div>
      )}

      {/* Teacher Management Panel (Admin only) */}
      {isAdmin && isTeacherLoggedIn && dashboardTab === 'teachers' && (
        <TeacherManagementPanel
          appData={appData}
          onCreateActivationCode={onCreateActivationCode || (() => {})}
          onDeleteActivationCode={onDeleteActivationCode || (() => {})}
          onDeactivateTeacher={onDeactivateTeacher || (() => {})}
          onReactivateTeacher={onReactivateTeacher || (() => {})}
          onDeleteTeacher={onDeleteTeacher || (() => {})}
          onUpdateTeacherClasses={onUpdateTeacherClasses || (() => {})}
          onAddCustomClass={onAddCustomClass}
        />
      )}

      {(!isAdmin || dashboardTab === 'students') && (
        <>
          {/* Thông báo tạo tài khoản mới hoặc đặt lại mật khẩu thành công */}
          {createdAccountBanner && (
            <div className="neu-card bg-emerald-50 border-2 border-emerald-400 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-extrabold uppercase text-emerald-800">
                  Đã tạo tài khoản học sinh thành công
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Học sinh: <strong>{createdAccountBanner.fullName}</strong> (Lớp{' '}
                  <strong>{createdAccountBanner.className}</strong>) · Tên đăng nhập:{' '}
                  <code className="px-2 py-0.5 rounded bg-white border border-emerald-300 font-extrabold text-emerald-950">
                    {createdAccountBanner.username}
                  </code>{' '}
                  · Mật khẩu:{' '}
                  <code className="px-2 py-0.5 rounded bg-white border border-emerald-300 font-extrabold text-emerald-950">
                    {createdAccountBanner.passwordPlain}
                  </code>{' '}
                  · Mã khôi phục 8 ký tự:{' '}
                  <code className="px-2 py-0.5 rounded bg-amber-100 border border-amber-400 font-extrabold text-amber-950">
                    {createdAccountBanner.recoveryCode}
                  </code>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCreatedAccountBanner(null)}
                className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-extrabold cursor-pointer whitespace-nowrap"
              >
                Đã ghi nhận
              </button>
            </div>
          )}

          {resetSuccessBanner && (
            <div className="neu-card bg-amber-50 border-2 border-amber-300 p-3.5 text-xs sm:text-sm font-extrabold text-amber-950 flex items-center justify-between gap-2">
              <span>{resetSuccessBanner}</span>
              <button
                type="button"
                onClick={() => setResetSuccessBanner('')}
                className="text-amber-900 hover:underline text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          )}

          {/* 4 Thẻ chỉ số tổng quan của Lớp (Hoàn toàn bỏ XP/Level) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
              <span className="text-xs font-extrabold text-slate-600 block">
                Sĩ Số Học Sinh & Lớp
              </span>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-700 shrink-0" />
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 whitespace-nowrap">
                  {classOverviewStats.studentCount} Học sinh
                </span>
              </div>
              <span className="text-[11px] text-indigo-800 font-bold block">
                {selectedClassFilter === 'all'
                  ? `Trên tổng số ${availableClasses.length} lớp (${availableClasses.join(', ')})`
                  : `Đang lọc riêng Lớp ${normalizeClassName(selectedClassFilter)}`}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
              <span className="text-xs font-extrabold text-slate-600 block">
                Học Sinh Học Hôm Nay
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 whitespace-nowrap">
                  {classOverviewStats.activeTodayCount} / {classOverviewStats.studentCount} HS
                </span>
              </div>
              <span className="text-[11px] text-emerald-800 font-bold block">
                Có hoạt động luyện tập trong ngày
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
              <span className="text-xs font-extrabold text-slate-600 block">
                Tổng Lượt Bài Tập Đã Làm
              </span>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-sky-700 shrink-0" />
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 whitespace-nowrap">
                  {classOverviewStats.totalCompletedExercises} Lượt
                </span>
              </div>
              <span className="text-[11px] text-sky-800 font-bold block">
                Tổng hợp cả 5 kỹ năng & Ngữ pháp 6
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
              <span className="text-xs font-extrabold text-slate-600 block">
                Tỉ Lệ Đúng Trung Bình Lớp
              </span>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600 shrink-0" />
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 whitespace-nowrap">
                  Đúng {classOverviewStats.avgAccuracy}%
                </span>
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 block">
                Mức độ chung: {classOverviewStats.masteryBadge.label}
              </span>
            </div>
          </div>

          {/* =====================================================================
              PHẦN 1: CHỌN UNIT ĐANG DẠY CHO TỪNG LỚP & CẤU HÌNH NGƯỠNG ĐÁNH GIÁ
             ===================================================================== */}
          <section
            aria-label="Chọn Unit đang dạy cho từng lớp"
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-700 shrink-0" />
                  <span>1. Chọn Unit Đang Dạy Trên Lớp Cho Từng Lớp</span>
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Khi giáo viên chọn Unit cho lớp nào, học sinh lớp đó sẽ thấy ngay khối{' '}
                  <strong>"Unit đang học trên lớp"</strong> gồm đủ 5 phần (Ngữ pháp, Từ vựng, Phát âm, Đọc, Viết) ở đầu trang chủ.
                </p>
              </div>

              {/* Áp dụng đồng loạt cho tất cả các lớp */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-xs font-extrabold text-slate-700 whitespace-nowrap">
                  Đặt nhanh cho mọi lớp:
                </span>
                <select
                  value={bulkUnitId}
                  onChange={(e) => {
                    const nextU = e.target.value;
                    setBulkUnitId(nextU);
                    onChangeClassUnit?.('DEFAULT', nextU);
                    availableClasses.forEach((cls) =>
                      onChangeClassUnit?.(normalizeClassName(cls), nextU)
                    );
                  }}
                  className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-300 text-xs font-extrabold text-indigo-950 cursor-pointer"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      Unit {u.unitNumber}: {u.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lưới từng lớp với dropdown chọn Unit riêng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableClasses.map((cls) => {
                const normCls = normalizeClassName(cls);
                const assignedUnitId =
                  appData.classCurrentUnits?.[normCls] ||
                  appData.classCurrentUnits?.[cls] ||
                  appData.classCurrentUnits?.['DEFAULT'] ||
                  'unit-1';
                const countInClass = teacherStudents.filter(
                  (s) => normalizeClassName(s.className) === normCls
                ).length;

                return (
                  <div
                    key={normCls}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-700 text-white text-xs font-extrabold whitespace-nowrap">
                        Lớp {normCls}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">
                        {countInClass} học sinh
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Unit đang dạy trên lớp:
                      </label>
                      <select
                        value={assignedUnitId}
                        onChange={(e) => onChangeClassUnit?.(normCls, e.target.value)}
                        aria-label={`Chọn Unit đang dạy cho lớp ${normCls}`}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        {units.map((u) => (
                          <option key={u.id} value={u.id}>
                            Unit {u.unitNumber}: {u.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cấu hình ngưỡng mức độ (Tốt / Khá / Đạt / Cần cố gắng) */}
            <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-700">
                <span className="font-extrabold text-slate-900">
                  Ngưỡng xếp loại mức độ kỹ năng:
                </span>{' '}
                Mặc định tại <code className="text-indigo-800">src/config/masteryThresholds.json</code> (≥85% Tốt, 70–84% Khá, 50–69% Đạt, &lt;50% Cần cố gắng).
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                <label className="inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
                  <span>Tốt ≥</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={goodMinInput}
                    onChange={(e) => setGoodMinInput(Number(e.target.value))}
                    className="w-12 px-1.5 py-0.5 rounded bg-white border border-emerald-300 text-center font-extrabold"
                  />
                  <span>%</span>
                </label>

                <label className="inline-flex items-center gap-1 bg-sky-50 px-2.5 py-1.5 rounded-xl border border-sky-200">
                  <span>Khá ≥</span>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={fairMinInput}
                    onChange={(e) => setFairMinInput(Number(e.target.value))}
                    className="w-12 px-1.5 py-0.5 rounded bg-white border border-sky-300 text-center font-extrabold"
                  />
                  <span>%</span>
                </label>

                <label className="inline-flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                  <span>Đạt ≥</span>
                  <input
                    type="number"
                    min={1}
                    max={98}
                    value={passMinInput}
                    onChange={(e) => setPassMinInput(Number(e.target.value))}
                    className="w-12 px-1.5 py-0.5 rounded bg-white border border-amber-300 text-center font-extrabold"
                  />
                  <span>%</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    onUpdateMasteryThresholds?.({
                      goodMin: goodMinInput,
                      fairMin: fairMinInput,
                      passMin: passMinInput,
                      labels: DEFAULT_MASTERY_THRESHOLDS.labels,
                    });
                    setThresholdSavedMsg('Đã lưu!');
                    setTimeout(() => setThresholdSavedMsg(''), 2500);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs cursor-pointer whitespace-nowrap"
                >
                  Lưu ngưỡng
                </button>
                {thresholdSavedMsg && (
                  <span className="text-xs font-extrabold text-emerald-700">
                    {thresholdSavedMsg}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* =====================================================================
              PHẦN 2: QUẢN LÝ LỚP (DANH SÁCH HỌC SINH, TẠO TÀI KHOẢN, ĐẶT LẠI MẬT KHẨU)
             ===================================================================== */}
          <section
            aria-label="Quản lý lớp và danh sách học sinh"
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    2. Quản Lý Lớp Học ({searchedStudents.length} học sinh)
                  </span>
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Xem danh sách học sinh theo lớp, tạo tài khoản học sinh mới và đặt lại mật khẩu khi học sinh quên.
                </p>
              </div>

              {/* Bộ lọc lớp, tìm kiếm, thêm lớp & nút Tạo tài khoản học sinh */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Tìm kiếm học sinh */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    placeholder="Tìm tên hoặc @username..."
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Lọc theo lớp */}
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                  <Filter className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Lớp:</span>
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => {
                      setSelectedClassFilter(e.target.value);
                      setSelectedStudentIdFilter('all');
                    }}
                    className="bg-transparent font-extrabold text-indigo-800 outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả ({teacherStudents.length})</option>
                    {availableClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        Lớp {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Thêm lớp mới */}
                {isTeacherLoggedIn && (
                  <>
                    {showAddClassInput ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={newClassInput}
                          onChange={(e) => setNewClassInput(e.target.value)}
                          placeholder="VD: 6A7"
                          className="w-20 px-2.5 py-1.5 rounded-xl border border-indigo-300 text-xs font-extrabold text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const norm = normalizeClassName(newClassInput);
                            if (norm) {
                              onAddCustomClass?.(norm);
                              setSelectedClassFilter(norm);
                            }
                            setNewClassInput('');
                            setShowAddClassInput(false);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-indigo-700 text-white text-xs font-extrabold cursor-pointer"
                        >
                          Lưu
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddClassInput(true)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm lớp</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleOpenAddModal}
                      className="px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-extrabold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>+ Tạo Tài Khoản Học Sinh</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Bảng danh sách học sinh (Không có cột XP/Level) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-4">Học Sinh</th>
                    <th className="py-3 px-3">Lớp</th>
                    <th className="py-3 px-3">Trường / Xã</th>
                    <th className="py-3 px-3">Tiến Độ Unit</th>
                    <th className="py-3 px-3">Tỉ Lệ Đúng & Mức Độ</th>
                    <th className="py-3 px-3">Hoạt Động Hôm Nay</th>
                    {isTeacherLoggedIn && (
                      <th className="py-3 px-4 text-right">Thao Tác Quản Lý</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {searchedStudents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isTeacherLoggedIn ? 7 : 6}
                        className="py-8 text-center text-slate-500 font-semibold"
                      >
                        Chưa có học sinh nào trong danh sách lọc hiện tại. Bấm{' '}
                        <strong>"+ Tạo Tài Khoản Học Sinh"</strong> để thêm mới.
                      </td>
                    </tr>
                  ) : (
                    searchedStudents.map((st) => {
                      const todayStr = new Date().toISOString().split('T')[0];
                      const todayLog = st.dailyLogs?.[todayStr];
                      const todayMins = Math.round((todayLog?.timeSpentSeconds || 0) / 60);
                      const goalMins = st.dailyGoalMinutes || 20;
                      const isMetGoal = todayMins >= goalMins;
                      const isStudied = todayMins > 0;
                      const stAnalytics = studentAnalyticsMap[st.id] || {
                        learnedUnitsCount: 0,
                        overallAccuracy: 0,
                        totalSessions: 0,
                      };
                      const badge = getMasteryBadgeStyle(
                        stAnalytics.overallAccuracy,
                        appData.masteryThresholds
                      );

                      return (
                        <tr
                          key={st.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl leading-none">{st.avatar}</span>
                              <div>
                                <span className="block font-extrabold text-slate-900">
                                  {st.fullName}
                                </span>
                                <span className="block text-[11px] text-slate-500 font-semibold">
                                  @{st.username}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 font-extrabold text-xs whitespace-nowrap">
                              {normalizeClassName(st.className)}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-[11px] font-semibold text-slate-600">
                            <span className="block font-bold text-slate-800">
                              {st.schoolName || 'THCS Chu Văn An'}
                            </span>
                            <span className="block text-[10px] text-slate-500">
                              {st.communeName || 'Xã Đăk Hà'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="font-extrabold text-slate-900 block whitespace-nowrap">
                              Đã học {stAnalytics.learnedUnitsCount}/12 Unit
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold block">
                              {stAnalytics.totalSessions} lượt làm bài
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-slate-900 whitespace-nowrap">
                                Đúng {stAnalytics.overallAccuracy}%
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap border ${badge.badgeClass}`}
                              >
                                {badge.label}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-800 whitespace-nowrap">
                                  {todayMins}/{goalMins} phút
                                </span>
                                {isMetGoal ? (
                                  <span className="text-[10px] font-extrabold text-emerald-700">
                                    (Đạt mục tiêu)
                                  </span>
                                ) : isStudied ? (
                                  <span className="text-[10px] font-extrabold text-amber-700">
                                    (Đang học)
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold text-slate-500">
                                    (Chưa học)
                                  </span>
                                )}
                              </div>
                              <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    isMetGoal ? 'bg-emerald-600' : 'bg-indigo-600'
                                  }`}
                                  style={{
                                    width: `${Math.min(100, (todayMins / goalMins) * 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Cột thao tác quản lý của Giáo viên */}
                          {isTeacherLoggedIn && (
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPinResetStudent(st);
                                    setNewPinValue('');
                                  }}
                                  title="Đặt lại mật khẩu cho học sinh"
                                  className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <Key className="w-3.5 h-3.5" />
                                  <span>Đặt lại mật khẩu</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleOpenEditModal(st)}
                                  title="Chỉnh sửa thông tin học sinh"
                                  className="px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-extrabold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Sửa</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteConfirm(st)}
                                  title="Xóa tài khoản học sinh"
                                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* =====================================================================
              PHẦN 3: BÁO CÁO TIẾN ĐỘ THEO LỚP / HỌC SINH / KỸ NĂNG
             ===================================================================== */}
          <section
            aria-label="Báo cáo tiến độ theo lớp, học sinh và kỹ năng"
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-700 shrink-0" />
                  <span>3. Báo Cáo Tiến Độ Theo Lớp / Học Sinh / Kỹ Năng</span>
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Chọn Lớp hoặc từng Học sinh cụ thể để xem kết quả <strong>Đã học X/12 Unit</strong> và <strong>Đúng Y%</strong> trên cả 5 kỹ năng.
                </p>
              </div>

              {/* Bộ lọc Lớp & Học sinh cho Báo cáo */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                  <span>Lớp:</span>
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => {
                      setSelectedClassFilter(e.target.value);
                      setSelectedStudentIdFilter('all');
                    }}
                    className="bg-transparent font-extrabold text-indigo-800 outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả các lớp</option>
                    {availableClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        Lớp {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                  <span>Học sinh:</span>
                  <select
                    value={selectedStudentIdFilter}
                    onChange={(e) => setSelectedStudentIdFilter(e.target.value)}
                    className="bg-transparent font-extrabold text-indigo-800 outline-none cursor-pointer max-w-[220px]"
                  >
                    <option value="all">
                      Cả lớp ({classFilteredStudents.length} học sinh)
                    </option>
                    {classFilteredStudents.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.fullName} ({normalizeClassName(st.className)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 5 Thẻ kỹ năng của Lớp / Học sinh đang chọn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {aggregatedSkillReport.map((sk) => (
                <div
                  key={sk.key}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-extrabold ${sk.colorClass}`}
                    >
                      {sk.icon}
                      <span>{sk.label}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap border ${sk.badge.badgeClass}`}
                    >
                      {sk.badge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80">
                      <span className="block text-[10px] font-bold text-slate-500">
                        Tiến độ
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 whitespace-nowrap">
                        Đã học {sk.learnedUnits}/12 Unit
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80">
                      <span className="block text-[10px] font-bold text-slate-500">
                        Tỉ lệ đúng
                      </span>
                      <span className="text-xs font-extrabold text-indigo-900 whitespace-nowrap">
                        Đúng {sk.accuracy}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{ width: `${sk.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bảng ma trận tiến độ từng Học sinh x 5 Kỹ năng */}
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Bảng Chi Tiết Điểm Đúng (%) Theo Từng Kỹ Năng Của Học Sinh
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase">
                      <th className="py-2.5 px-3">Học Sinh</th>
                      <th className="py-2.5 px-3">Lớp</th>
                      <th className="py-2.5 px-3 text-center">Đã Học</th>
                      <th className="py-2.5 px-3 text-center">Ngữ Pháp</th>
                      <th className="py-2.5 px-3 text-center">Từ Vựng</th>
                      <th className="py-2.5 px-3 text-center">Phát Âm</th>
                      <th className="py-2.5 px-3 text-center">Đọc Hiểu</th>
                      <th className="py-2.5 px-3 text-center">Viết</th>
                      <th className="py-2.5 px-3 text-center">TB Chung</th>
                      <th className="py-2.5 px-3 text-center">Mức Độ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {reportTargetStudents.map((st) => {
                      const stData = studentAnalyticsMap[st.id];
                      const overall = stData?.overallAccuracy || 0;
                      const badge = getMasteryBadgeStyle(overall, appData.masteryThresholds);
                      return (
                        <tr key={st.id} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-extrabold text-slate-900">
                            {st.fullName}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-indigo-800">
                            {normalizeClassName(st.className)}
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-800 whitespace-nowrap">
                            {stData?.learnedUnitsCount || 0}/12 Unit
                          </td>
                          {CORE_SKILLS.map((sk) => {
                            const acc = stData?.bySkill[sk.key]?.accuracy || 0;
                            return (
                              <td
                                key={sk.key}
                                className="py-2.5 px-3 text-center font-bold text-slate-800 whitespace-nowrap"
                              >
                                Đúng {acc}%
                              </td>
                            );
                          })}
                          <td className="py-2.5 px-3 text-center font-extrabold text-indigo-900 whitespace-nowrap">
                            Đúng {overall}%
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap border ${badge.badgeClass}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Biểu đồ trực quan & Tiến độ 12 Unit SGK */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-700" />
                  <span>Biểu Đồ Năng Lực 5 Kỹ Năng (%)</span>
                </h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarSkillData}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 700 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Đúng (%)"
                        dataKey="mastery"
                        stroke="#4338ca"
                        fill="#4f46e5"
                        fillOpacity={0.35}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-700" />
                  <span>Tiến Độ Hoàn Thành 12 Unit SGK Global Success</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {aggregatedUnitProgress.map(({ unit: u, pct }) => (
                    <div
                      key={u.id}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 truncate">
                          Unit {u.unitNumber}: {u.title}
                        </span>
                        <span className="font-extrabold text-indigo-800 whitespace-nowrap">
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================================
              KIỂM TRA ĐẦU VÀO – ĐẦU RA & NGHIÊN CỨU SƯ PHẠM ỨNG DỤNG (NCKHSPƯD / SKKN)
             ===================================================================== */}
          <TeacherPrePostTestSection
            appData={appData}
            currentTeacher={currentTeacher}
            isAdmin={isAdmin}
            scopeStudents={teacherStudents}
            grammarBundle={grammarBundle}
            onUpdateStudent={onUpdateStudent}
          />

          {/* =====================================================================
              BÁO CÁO (attempts + dailyStats): lọc Trường / Lớp / Unit / Kỹ năng / Thời gian, Xuất Excel
             ===================================================================== */}
          <TeacherAnalyticsReportSection
            appData={appData}
            currentTeacher={currentTeacher}
            isAdmin={isAdmin}
            scopeStudents={teacherStudents}
            grammarBundle={grammarBundle}
            classGrammarStores={grammarStoreByStudent}
          />

          {/* =====================================================================
              PHẦN 4: DANH SÁCH ĐIỂM NGỮ PHÁP LỚP SAI NHIỀU NHẤT (LẤY TỪ SỔ LỖI SAI)
             ===================================================================== */}
          <section
            aria-label="Danh sách điểm ngữ pháp lớp sai nhiều nhất lấy từ Sổ lỗi sai"
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>
                    4. Danh Sách Điểm Ngữ Pháp Lớp Sai Nhiều Nhất (Từ Sổ Lỗi Sai)
                  </span>
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Tổng hợp tự động từ <strong>Sổ lỗi sai</strong> trong module Ngữ pháp Tiếng Anh 6 (<code>grammar-g6</code>) của học sinh trong lớp đang chọn.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-extrabold whitespace-nowrap self-start sm:self-center">
                {topClassGrammarMistakes.length} chủ điểm có lỗi sai
              </span>
            </div>

            {topClassGrammarMistakes.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-extrabold text-slate-800">
                  Hiện chưa có lỗi ngữ pháp nào trong Sổ lỗi sai của nhóm học sinh này!
                </p>
                <p className="text-xs text-slate-500">
                  Khi học sinh làm sai các câu hỏi trong module Ngữ pháp Tiếng Anh 6, điểm ngữ pháp và câu sai sẽ tự động tổng hợp tại đây.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topClassGrammarMistakes.map((gp, index) => (
                  <div
                    key={gp.gpId}
                    className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-rose-800">
                            <span className="px-2 py-0.5 rounded-md bg-rose-200 text-rose-950">
                              #{index + 1}
                            </span>
                            <span>
                              Unit {gp.unitNumber}: {gp.unitTitle}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                            {gp.titleVi}{' '}
                            <span className="text-xs font-bold text-slate-600">
                              ({gp.titleEn})
                            </span>
                          </h3>
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs whitespace-nowrap shrink-0">
                          {gp.mistakeOccurrences} lượt sai
                        </span>
                      </div>

                      <div className="text-xs text-slate-700">
                        <span className="font-extrabold text-slate-900">
                          Học sinh gặp lỗi ({gp.studentsList.length}):
                        </span>{' '}
                        {gp.studentsList.join(', ')}
                      </div>

                      {/* Các câu sai tiêu biểu trong Sổ lỗi sai */}
                      <div className="space-y-1.5 pt-1">
                        <span className="block text-[11px] font-extrabold text-slate-600 uppercase">
                          Câu hỏi sai nhiều trong Sổ lỗi sai:
                        </span>
                        {gp.topItems.map((it) => (
                          <div
                            key={it.itemId}
                            className="p-2.5 rounded-xl bg-white border border-rose-200/80 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-indigo-800 text-[11px]">
                                [{it.typeLabel}]
                              </span>
                              <span className="text-[11px] font-extrabold text-rose-700">
                                Sai {it.wrongCount} lần
                              </span>
                            </div>
                            <p className="font-bold text-slate-900">{it.preview}</p>
                            {it.explanation && (
                              <p className="text-[11px] text-slate-600">
                                💡 <strong>Giải thích:</strong> {it.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onReviewTopicClick(`unit-${gp.unitNumber}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Mở Bài Học Ngữ Pháp Unit {gp.unitNumber}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* MODAL TẠO / SỬA TÀI KHOẢN HỌC SINH DÀNH CHO GIÁO VIÊN */}
          {(isAddModalOpen || editingStudent) && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingStudent
                        ? 'Chỉnh Sửa Tài Khoản Học Sinh'
                        : 'Tạo Tài Khoản Học Sinh Mới'}
                    </h3>
                    <p className="text-xs text-slate-600">
                      Trường: {currentTeacher?.schoolName || 'THCS Chu Văn An'}
                    </p>
                  </div>
                </div>

                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSaveStudentSubmit} className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1">
                      Họ và tên học sinh (bắt buộc):
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      onBlur={() =>
                        setFormData((prev) => ({
                          ...prev,
                          fullName: normalizeFullName(prev.fullName),
                        }))
                      }
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Lớp (tự chuẩn hoá 6A1):
                      </label>
                      <input
                        type="text"
                        list="teacher-class-options"
                        value={formData.className}
                        onChange={(e) =>
                          setFormData({ ...formData, className: e.target.value })
                        }
                        onBlur={() =>
                          setFormData((prev) => ({
                            ...prev,
                            className: normalizeClassName(prev.className || '6A1'),
                          }))
                        }
                        placeholder="Ví dụ: 6A1"
                        className="w-full px-3 py-2.5 text-xs font-extrabold rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                        required
                      />
                      <datalist id="teacher-class-options">
                        {availableClasses.map((cls) => (
                          <option key={cls} value={cls} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Tên đăng nhập:
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        placeholder="Để trống tự gợi ý"
                        disabled={Boolean(editingStudent)}
                        className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 text-slate-900 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1">
                      {editingStudent
                        ? 'Mật khẩu mới (để trống nếu giữ nguyên):'
                        : 'Mật khẩu khởi tạo (tối thiểu 6 ký tự):'}
                    </label>
                    <div className="relative">
                      <input
                        type={showCreatePassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Nhập mật khẩu >= 6 ký tự"
                        required={!editingStudent}
                        className="w-full pl-3.5 pr-10 py-2.5 text-xs font-mono font-bold rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCreatePassword((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        {showCreatePassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingStudent(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>
                        {editingStudent ? 'Lưu Thay Đổi' : 'Tạo Tài Khoản Học Sinh'}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL ĐẶT LẠI MẬT KHẨU HỌC SINH */}
          {pinResetStudent && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in">
                <button
                  type="button"
                  onClick={() => setPinResetStudent(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      Đặt Lại Mật Khẩu Học Sinh
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold">
                      {pinResetStudent.fullName} (@{pinResetStudent.username} · Lớp{' '}
                      {normalizeClassName(pinResetStudent.className)})
                    </p>
                  </div>
                </div>

                <form onSubmit={handleConfirmResetPin} className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1">
                      Mật khẩu mới (tối thiểu 6 ký tự):
                    </label>
                    <div className="relative">
                      <input
                        type={showResetPassword ? 'text' : 'password'}
                        minLength={6}
                        value={newPinValue}
                        onChange={(e) => setNewPinValue(e.target.value)}
                        placeholder="Nhập mật khẩu mới (>= 6 ký tự)"
                        className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-mono font-bold"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowResetPassword((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        {showResetPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setPinResetStudent(null)}
                      className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Xác Nhận Đặt Lại Mật Khẩu</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
