import React from 'react';
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
} from 'lucide-react';
import { AppDataSchema, SkillType } from '../types';

interface HomeScreenProps {
  appData: AppDataSchema;
  onSelectSkill: (tabId: string) => void;
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
    description: 'Lý thuyết & 104 bộ bài tập ngữ pháp 12 Unit kèm Sổ lỗi sai & Gia sư AI Socratic',
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

export const HomeScreen: React.FC<HomeScreenProps> = ({ appData, onSelectSkill }) => {
  const progress = appData.progress;

  const getSkillMastery = (skillKey: SkillType): number => {
    return progress.skillMastery?.[skillKey] ?? 0;
  };

  const getSkillLevel = (mastery: number): string => {
    if (mastery >= 80) return 'Xuất sắc';
    if (mastery >= 60) return 'Giỏi';
    if (mastery >= 40) return 'Khá';
    if (mastery >= 20) return 'Trung bình';
    return 'Bắt đầu';
  };

  const totalMastery = SKILL_CARDS.reduce((sum, card) => sum + getSkillMastery(card.skillKey), 0);
  const avgMastery = Math.round(totalMastery / SKILL_CARDS.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Section Title */}
      <div className="flex items-center justify-between gap-3 pt-2 mt-4 mb-6">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 whitespace-nowrap">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700 shrink-0" />
            <span className="truncate">Chọn Kỹ Năng Để Học</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
            5 kỹ năng Tiếng Anh cốt lõi — em muốn luyện kỹ năng nào hôm nay?
          </p>
        </div>
        <div className="flex items-center gap-2 neu-card-purple px-3.5 sm:px-4 py-2 shrink-0 whitespace-nowrap">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
          <div className="text-center whitespace-nowrap">
            <span className="text-[10px] font-extrabold text-purple-900 block uppercase whitespace-nowrap">
              Tổng tiến độ
            </span>
            <span className="text-base sm:text-lg font-extrabold text-purple-950 block whitespace-nowrap">
              {avgMastery}%
            </span>
          </div>
        </div>
      </div>

      {/* 5 Skill Cards Grid */}
      <div className="skill-cards-grid">
        {SKILL_CARDS.map((card, index) => {
          const mastery = getSkillMastery(card.skillKey);
          const level = getSkillLevel(mastery);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectSkill(card.tabId)}
              className={`skill-card ${card.gradientClass}`}
              style={{ animationDelay: `${index * 80}ms` }}
              aria-label={`Học ${card.title} (${card.titleEn}) — Tiến độ ${mastery}%`}
            >
              <div className="skill-card-inner">
                {/* Top: Single Stroke Icon (no duplicate emoji) */}
                <div className="skill-card-icon-wrapper">
                  <div className="skill-card-icon">{card.icon}</div>
                </div>

                {/* Middle: Title + Description */}
                <div className="skill-card-text">
                  <h3 className="skill-card-title">
                    {card.title}
                    <span className="skill-card-title-en">{card.titleEn}</span>
                  </h3>
                  <p className="skill-card-desc">{card.description}</p>
                </div>

                {/* Bottom: Progress Bar + Level */}
                <div className="skill-card-progress-section">
                  <div className="skill-card-progress-info">
                    <span className="skill-card-level">{level}</span>
                    <span className="skill-card-percent">{mastery}%</span>
                  </div>
                  <div className="skill-card-progress-track">
                    <div
                      className="skill-card-progress-fill"
                      style={{ width: `${mastery}%` }}
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
