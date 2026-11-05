import React, { useMemo } from 'react';
import {
  GraduationCap,
  Layers,
  Mic,
  BookOpen,
  PenTool,
  Upload,
  BarChart3,
  ChevronRight,
  Trophy,
  Target,
  Play,
  School,
  CheckCircle2,
} from 'lucide-react';
import { AppDataSchema, SkillType, SgkUnit } from '../types';
import { loadGrammarProgress } from '../grammar-g6/storage';
import { getMasteryLabel, getMasteryBadgeStyle } from '../config/masteryThresholds';
import { normalizeClassName } from '../services/storage';

interface HomeScreenProps {
  appData: AppDataSchema;
  onSelectSkill: (tabId: string, unitId?: string | null) => void;
  onChangeClassUnit?: (className: string, unitId: string) => void;
}

interface SkillCardData {
  id: string;
  tabId: string;
  title: string;
  titleEn: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
  skillKey: SkillType;
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'grammar',
    tabId: 'socratic',
    title: 'Ngữ Pháp',
    titleEn: 'Grammar',
    description: 'Lý thuyết & 104 bộ bài tập ngữ pháp 12 Unit kèm Sổ lỗi sai (module grammar-g6)',
    icon: <GraduationCap className="w-7 h-7" />,
    gradientClass: 'skill-card-grammar',
    skillKey: 'Grammar',
  },
  {
    id: 'vocabulary',
    tabId: 'practice',
    title: 'Từ Vựng',
    titleEn: 'Vocabulary',
    description: 'Luyện từ vựng theo từng Unit SGK với flashcards & bài tập phản xạ',
    icon: <Layers className="w-7 h-7" />,
    gradientClass: 'skill-card-vocab',
    skillKey: 'Vocabulary',
  },
  {
    id: 'pronunciation',
    tabId: 'speech',
    title: 'Phát Âm',
    titleEn: 'Pronunciation',
    description: 'Luyện phát âm chuẩn IPA với AI — nói và được chấm điểm ngay',
    icon: <Mic className="w-7 h-7" />,
    gradientClass: 'skill-card-pronunciation',
    skillKey: 'Pronunciation',
  },
  {
    id: 'reading',
    tabId: 'reading-game',
    title: 'Đọc Hiểu',
    titleEn: 'Reading',
    description: 'Đọc hiểu văn bản SGK — trả lời câu hỏi trắc nghiệm, ghi điểm cao',
    icon: <BookOpen className="w-7 h-7" />,
    gradientClass: 'skill-card-reading',
    skillKey: 'Reading',
  },
  {
    id: 'writing',
    tabId: 'writing',
    title: 'Viết',
    titleEn: 'Writing',
    description: 'Viết đoạn văn theo chủ đề Unit và được AI chấm điểm, gợi ý sửa lỗi',
    icon: <PenTool className="w-7 h-7" />,
    gradientClass: 'skill-card-writing',
    skillKey: 'Writing',
  },
];

const TOOL_CARDS = [
  {
    id: 'upload',
    tabId: 'upload',
    title: 'Tải tài liệu',
    icon: <Upload className="w-5 h-5" />,
    description: 'Tải tài liệu sách',
  },
  {
    id: 'report',
    tabId: 'report',
    title: 'Báo cáo',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Xem tiến độ học tập',
  },
];

const SKILL_DISPLAY_MAP: Record<
  string,
  { label: string; tabId: string; icon: React.ReactNode; colorVar: string }
> = {
  Grammar: {
    label: 'Ngữ pháp',
    tabId: 'socratic',
    icon: <GraduationCap className="w-4 h-4" />,
    colorVar: 'var(--skill-grammar)',
  },
  Vocabulary: {
    label: 'Từ vựng',
    tabId: 'practice',
    icon: <Layers className="w-4 h-4" />,
    colorVar: 'var(--skill-vocab)',
  },
  Pronunciation: {
    label: 'Phát âm',
    tabId: 'speech',
    icon: <Mic className="w-4 h-4" />,
    colorVar: 'var(--skill-pronunciation)',
  },
  Reading: {
    label: 'Đọc hiểu',
    tabId: 'reading-game',
    icon: <BookOpen className="w-4 h-4" />,
    colorVar: 'var(--skill-reading)',
  },
  Writing: {
    label: 'Viết',
    tabId: 'writing',
    icon: <PenTool className="w-4 h-4" />,
    colorVar: 'var(--skill-writing)',
  },
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  appData,
  onSelectSkill,
  onChangeClassUnit,
}) => {
  const { progress, sessions, units, currentStudentId, students, classCurrentUnits, masteryThresholds } =
    appData;

  const currentStudent = useMemo(
    () => students.find((s) => s.id === currentStudentId) || null,
    [students, currentStudentId]
  );

  const studentClassNorm = useMemo(
    () => normalizeClassName(currentStudent?.className || '6A1'),
    [currentStudent]
  );

  // Load grammar-g6 progress for accurate Grammar stats
  const grammarStore = useMemo(
    () => loadGrammarProgress(currentStudentId),
    [currentStudentId, sessions.length]
  );

  // Compute "Đã học X/12 Unit" & "Đúng Y%" for each skill
  const skillStatsMap = useMemo(() => {
    const result: Record<
      SkillType,
      { learnedUnits: number; accuracyPercent: number; levelLabel: string }
    > = {} as any;

    const unitProgressEntries = Object.entries(progress.unitProgress || {}).filter(
      ([, pct]) => pct > 0
    );

    (['Grammar', 'Vocabulary', 'Pronunciation', 'Reading', 'Writing'] as SkillType[]).forEach(
      (skillKey) => {
        const skillSessions = sessions.filter((s) => s.skill === skillKey);
        const unitSet = new Set<string>();

        skillSessions.forEach((s) => {
          if (s.unitId && s.unitId.startsWith('unit-')) {
            unitSet.add(s.unitId);
          }
        });

        let grammarCorrect = 0;
        let grammarAttempted = 0;

        if (skillKey === 'Grammar') {
          (grammarStore.attempts || []).forEach((att) => {
            grammarAttempted++;
            if (att.correct) grammarCorrect++;
            const m = /^u(\d+)/i.exec(att.unitId || att.itemId);
            if (m) unitSet.add(`unit-${Number(m[1])}`);
          });
          Object.keys(grammarStore.setProgress || {}).forEach((setId) => {
            const m = /^u(\d+)/i.exec(setId);
            if (m) unitSet.add(`unit-${Number(m[1])}`);
          });
          Object.keys(grammarStore.best || {}).forEach((setId) => {
            const m = /^u(\d+)/i.exec(setId);
            if (m) unitSet.add(`unit-${Number(m[1])}`);
          });
        }

        // If no specific sessions recorded yet but unitProgress exists from initial data, reflect learned units
        if (unitSet.size === 0 && unitProgressEntries.length > 0 && skillSessions.length === 0) {
          unitProgressEntries.forEach(([uId]) => unitSet.add(uId));
        }

        const learnedUnits = Math.min(12, unitSet.size);

        // Compute accuracy Y% ("Đúng Y%")
        let accuracyPercent = progress.skillMastery?.[skillKey] ?? 0;
        if (skillKey === 'Grammar' && grammarAttempted > 0) {
          const grammarPct = Math.round((grammarCorrect / grammarAttempted) * 100);
          if (skillSessions.length > 0) {
            const sessAvg = Math.round(
              skillSessions.reduce((acc, s) => acc + s.score, 0) / skillSessions.length
            );
            accuracyPercent = Math.round((grammarPct + sessAvg) / 2);
          } else {
            accuracyPercent = grammarPct;
          }
        } else if (skillSessions.length > 0) {
          const totalQ = skillSessions.reduce((acc, s) => acc + (s.totalQuestions || 0), 0);
          const totalC = skillSessions.reduce((acc, s) => acc + (s.correctAnswers || 0), 0);
          if (totalQ > 0) {
            accuracyPercent = Math.round((totalC / totalQ) * 100);
          } else {
            accuracyPercent = Math.round(
              skillSessions.reduce((acc, s) => acc + s.score, 0) / skillSessions.length
            );
          }
        }

        const levelLabel = getMasteryLabel(accuracyPercent, masteryThresholds);
        result[skillKey] = {
          learnedUnits,
          accuracyPercent,
          levelLabel,
        };
      }
    );

    return result;
  }, [sessions, progress, grammarStore, masteryThresholds]);

  // Overall stats across all 5 skills
  const overallStats = useMemo(() => {
    const allLearnedUnits = new Set<string>();
    Object.entries(progress.unitProgress || {}).forEach(([uId, pct]) => {
      if (pct > 0) allLearnedUnits.add(uId);
    });
    sessions.forEach((s) => {
      if (s.unitId && s.unitId.startsWith('unit-')) allLearnedUnits.add(s.unitId);
    });
    (grammarStore.attempts || []).forEach((att) => {
      const m = /^u(\d+)/i.exec(att.unitId || att.itemId);
      if (m) allLearnedUnits.add(`unit-${Number(m[1])}`);
    });
    Object.keys(grammarStore.setProgress || {}).forEach((setId) => {
      const m = /^u(\d+)/i.exec(setId);
      if (m) allLearnedUnits.add(`unit-${Number(m[1])}`);
    });

    const avgAccuracy = Math.round(
      SKILL_CARDS.reduce((sum, c) => sum + (skillStatsMap[c.skillKey]?.accuracyPercent || 0), 0) /
        SKILL_CARDS.length
    );
    const badge = getMasteryBadgeStyle(avgAccuracy, masteryThresholds);
    return {
      unitsCount: Math.min(12, allLearnedUnits.size),
      avgAccuracy,
      badge,
    };
  }, [progress, sessions, grammarStore, skillStatsMap, masteryThresholds]);

  // 1. Determine "Tiếp tục học" (Continue Learning) lesson
  const continueLesson = useMemo(() => {
    if (currentStudent?.lastActiveLesson) {
      const unitObj =
        units.find((u) => u.id === currentStudent.lastActiveLesson!.unitId) || units[0];
      const pct =
        progress.unitProgress?.[unitObj.id] ||
        currentStudent.lastActiveLesson.progressPercent ||
        35;
      return {
        unitId: unitObj.id,
        unitNumber: unitObj.unitNumber,
        unitTitle: unitObj.title,
        skill: currentStudent.lastActiveLesson.skill,
        skillLabel: currentStudent.lastActiveLesson.skillLabel,
        tabId: currentStudent.lastActiveLesson.tabId,
        progressPercent: Math.min(100, Math.max(10, pct)),
      };
    }

    // Fallback to latest study session
    if (sessions.length > 0) {
      const latest = sessions[0];
      const matchedUnit =
        units.find((u) => u.id === latest.unitId) ||
        units.find((u) => progress.unitProgress?.[u.id] > 0 && progress.unitProgress?.[u.id] < 100) ||
        units[0];
      const skillMeta = SKILL_DISPLAY_MAP[latest.skill] || SKILL_DISPLAY_MAP.Grammar;
      const pct = progress.unitProgress?.[matchedUnit.id] || latest.score || 40;
      return {
        unitId: matchedUnit.id,
        unitNumber: matchedUnit.unitNumber,
        unitTitle: matchedUnit.title,
        skill: latest.skill,
        skillLabel: skillMeta.label,
        tabId: skillMeta.tabId,
        progressPercent: Math.min(100, Math.max(15, pct)),
      };
    }

    // Fallback to first unit in unitProgress or Unit 1 Grammar
    const inProgressUnitId =
      Object.keys(progress.unitProgress || {}).find(
        (uId) => progress.unitProgress[uId] > 0 && progress.unitProgress[uId] < 100
      ) || 'unit-1';
    const unitObj = units.find((u) => u.id === inProgressUnitId) || units[0];
    const pct = progress.unitProgress?.[unitObj.id] || 20;
    return {
      unitId: unitObj.id,
      unitNumber: unitObj.unitNumber,
      unitTitle: unitObj.title,
      skill: 'Grammar' as SkillType,
      skillLabel: 'Ngữ pháp',
      tabId: 'socratic',
      progressPercent: pct,
    };
  }, [currentStudent, sessions, units, progress]);

  // 2. Determine "Unit đang học trên lớp" (selected by teacher for student's class or default)
  const currentClassroomUnit: SgkUnit = useMemo(() => {
    const assignedUnitId =
      classCurrentUnits?.[studentClassNorm] ||
      classCurrentUnits?.['DEFAULT'] ||
      'unit-1';
    return units.find((u) => u.id === assignedUnitId) || units[0];
  }, [classCurrentUnits, studentClassNorm, units]);

  const classroomParts = useMemo(
    () => [
      {
        id: 'grammar',
        label: 'Ngữ pháp',
        tabId: 'socratic',
        icon: <GraduationCap className="w-4 h-4" />,
        summary: currentClassroomUnit.grammar.slice(0, 2).join(' • '),
        colorClass: 'border-indigo-200 bg-indigo-50/80 text-indigo-950 hover:bg-indigo-100',
        iconBg: 'bg-[var(--skill-grammar)] text-white',
      },
      {
        id: 'vocab',
        label: 'Từ vựng',
        tabId: 'practice',
        icon: <Layers className="w-4 h-4" />,
        summary: currentClassroomUnit.vocabulary.slice(0, 4).join(', '),
        colorClass: 'border-teal-200 bg-teal-50/80 text-teal-950 hover:bg-teal-100',
        iconBg: 'bg-[var(--skill-vocab)] text-white',
      },
      {
        id: 'pronunciation',
        label: 'Phát âm',
        tabId: 'speech',
        icon: <Mic className="w-4 h-4" />,
        summary: `Âm chuẩn IPA: ${currentClassroomUnit.pronunciationIPA}`,
        colorClass: 'border-pink-200 bg-pink-50/80 text-pink-950 hover:bg-pink-100',
        iconBg: 'bg-[var(--skill-pronunciation)] text-white',
      },
      {
        id: 'reading',
        label: 'Đọc',
        tabId: 'reading-game',
        icon: <BookOpen className="w-4 h-4" />,
        summary: `Bài đọc SGK Unit ${currentClassroomUnit.unitNumber}`,
        colorClass: 'border-emerald-200 bg-emerald-50/80 text-emerald-950 hover:bg-emerald-100',
        iconBg: 'bg-[var(--skill-reading)] text-white',
      },
      {
        id: 'writing',
        label: 'Viết',
        tabId: 'writing',
        icon: <PenTool className="w-4 h-4" />,
        summary: `Viết đoạn văn chủ đề ${currentClassroomUnit.title}`,
        colorClass: 'border-amber-200 bg-amber-50/80 text-amber-950 hover:bg-amber-100',
        iconBg: 'bg-[var(--skill-writing)] text-white',
      },
    ],
    [currentClassroomUnit]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-6 mt-4">
      {/* TOP ROW: 1. Khối "Tiếp tục học" & 2. Khối "Unit đang học trên lớp" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* 1. KHỐI "TIẾP TỤC HỌC" */}
        <section
          aria-label="Tiếp tục học"
          className="lg:col-span-5 neu-card bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 border-2 border-indigo-200"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-950 text-xs font-extrabold border border-indigo-300">
                <Play className="w-3.5 h-3.5 fill-indigo-800 text-indigo-800" />
                <span>Tiếp tục học</span>
              </span>
              <span className="text-xs font-extrabold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200">
                Đã làm {continueLesson.progressPercent}%
              </span>
            </div>

            <div>
              <p className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">
                Bài đang học dở
              </p>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 leading-snug">
                Unit {continueLesson.unitNumber}: {continueLesson.unitTitle}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-900 text-xs font-extrabold border border-slate-300">
                  {SKILL_DISPLAY_MAP[continueLesson.skill]?.icon}
                  <span>Kỹ năng: {continueLesson.skillLabel}</span>
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
                <span>Tiến độ bài học này</span>
                <span className="text-indigo-900">{continueLesson.progressPercent}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4338ca] to-[#6d28d9] transition-all duration-500"
                  style={{ width: `${continueLesson.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectSkill(continueLesson.tabId, continueLesson.unitId)}
            className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Học tiếp</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </section>

        {/* 2. KHỐI "UNIT ĐANG HỌC TRÊN LỚP" */}
        <section
          aria-label="Unit đang học trên lớp"
          className="lg:col-span-7 neu-card bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 border-2 border-purple-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-950 text-xs font-extrabold border border-purple-300">
                  <School className="w-3.5 h-3.5 text-purple-800" />
                  <span>Unit đang học trên lớp ({studentClassNorm})</span>
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  Chủ đề: {currentClassroomUnit.theme}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1.5">
                Unit {currentClassroomUnit.unitNumber}: {currentClassroomUnit.title}
              </h3>
            </div>

            {/* Giáo viên (hoặc học sinh) có thể đổi nhanh Unit đang học trên lớp */}
            {onChangeClassUnit && (
              <div className="flex items-center gap-1.5 shrink-0">
                <label
                  htmlFor="classroom-unit-select"
                  className="text-[11px] font-extrabold text-slate-700 whitespace-nowrap"
                >
                  Chọn Unit lớp:
                </label>
                <select
                  id="classroom-unit-select"
                  value={currentClassroomUnit.id}
                  onChange={(e) => onChangeClassUnit(studentClassNorm, e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      Unit {u.unitNumber}: {u.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 5 phần của Unit đang học trên lớp: Ngữ pháp, Từ vựng, Phát âm, Đọc, Viết */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2.5">
            {classroomParts.map((part) => (
              <button
                key={part.id}
                type="button"
                onClick={() => onSelectSkill(part.tabId, currentClassroomUnit.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 cursor-pointer group ${part.colorClass}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${part.iconBg}`}
                    >
                      {part.icon}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                  <p className="font-extrabold text-xs sm:text-sm leading-tight">{part.label}</p>
                  <p className="text-[11px] font-semibold opacity-90 line-clamp-2 leading-snug">
                    {part.summary}
                  </p>
                </div>
                <span className="text-[11px] font-extrabold underline inline-flex items-center gap-1 pt-1">
                  Vào học Unit {currentClassroomUnit.unitNumber}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* SECTION TITLE & OVERALL SUMMARY */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 whitespace-nowrap">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700 shrink-0" />
            <span className="truncate">Chọn Kỹ Năng Để Học</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
            Ngưỡng đánh giá: ≥85% Tốt • 70–84% Khá • 50–69% Đạt • &lt;50% Cần cố gắng
          </p>
        </div>

        <div className="flex items-center gap-3 neu-card-purple px-4 py-2.5 shrink-0 self-start sm:self-auto">
          <Trophy className="w-5 h-5 text-amber-700 shrink-0" />
          <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
            <span>Đã học {overallStats.unitsCount}/12 Unit</span>
            <span>•</span>
            <span>Đúng {overallStats.avgAccuracy}%</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${overallStats.badge.badgeClass}`}
            >
              {overallStats.badge.label}
            </span>
          </div>
        </div>
      </div>

      {/* 5 SKILL CARDS GRID */}
      <div className="skill-cards-grid">
        {SKILL_CARDS.map((card, index) => {
          const stats = skillStatsMap[card.skillKey] || {
            learnedUnits: 0,
            accuracyPercent: 0,
            levelLabel: 'Cần cố gắng',
          };
          const unitPct = Math.round((stats.learnedUnits / 12) * 100);

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                // 5. Thẻ Ngữ pháp mở vào module "Ngữ pháp Tiếng Anh 6" (grammar-g6), xem danh sách theo Unit (unitId = null)
                onSelectSkill(card.tabId, null);
              }}
              className={`skill-card ${card.gradientClass}`}
              style={{ animationDelay: `${index * 80}ms` }}
              aria-label={`Học ${card.title} (${card.titleEn}) — Đã học ${stats.learnedUnits}/12 Unit, Đúng ${stats.accuracyPercent}%, Mức độ ${stats.levelLabel}`}
            >
              <div className="skill-card-inner">
                {/* Top: Single Stroke Icon + Fixed Threshold Level Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="skill-card-icon">{card.icon}</div>
                  <span className="skill-card-level inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mức: {stats.levelLabel}</span>
                  </span>
                </div>

                {/* Middle: Title + Description */}
                <div className="skill-card-text">
                  <h3 className="skill-card-title">
                    {card.title}
                    <span className="skill-card-title-en">{card.titleEn}</span>
                  </h3>
                  <p className="skill-card-desc">{card.description}</p>
                </div>

                {/* Bottom: 2 Explicit Metrics ("Đã học X/12 Unit" & "Đúng Y%") */}
                <div className="skill-card-progress-section space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black/20 rounded-xl px-3 py-2 text-left border border-white/20">
                      <span className="text-[10px] font-bold text-white/90 block uppercase">
                        Số bài đã học
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-white block whitespace-nowrap">
                        Đã học {stats.learnedUnits}/12 Unit
                      </span>
                    </div>
                    <div className="bg-black/20 rounded-xl px-3 py-2 text-left border border-white/20">
                      <span className="text-[10px] font-bold text-white/90 block uppercase">
                        Tỷ lệ chính xác
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-white block whitespace-nowrap">
                        Đúng {stats.accuracyPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="skill-card-progress-track">
                    <div
                      className="skill-card-progress-fill"
                      style={{ width: `${Math.max(unitPct, stats.accuracyPercent > 0 ? 8 : 0)}%` }}
                    />
                  </div>
                </div>

                {/* White CTA Button with Colored Text */}
                <div className="skill-card-cta">
                  <span>Bắt đầu học</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tools Section */}
      <div className="mt-8">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
          <span>Công Cụ Bổ Sung</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {TOOL_CARDS.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelectSkill(tool.tabId)}
              className="tool-card group"
              aria-label={tool.title}
            >
              <div className="tool-card-icon">{tool.icon}</div>
              <span className="tool-card-title">{tool.title}</span>
              <span className="tool-card-desc">{tool.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
