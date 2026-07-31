import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Mic,
  FileEdit,
  Swords,
  Upload,
  BarChart3,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  Headphones
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
  emoji: string;
  gradientClass: string;
  skillKey: SkillType;
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'grammar',
    tabId: 'socratic',
    title: 'Ngữ Pháp',
    titleEn: 'Grammar',
    description: 'Học ngữ pháp qua phương pháp Socratic — AI dẫn dắt em tự khám phá',
    icon: <GraduationCap className="w-8 h-8" />,
    emoji: '🧠',
    gradientClass: 'skill-card-grammar',
    skillKey: 'Grammar',
  },
  {
    id: 'vocabulary',
    tabId: 'practice',
    title: 'Từ Vựng',
    titleEn: 'Vocabulary',
    description: 'Luyện từ vựng theo từng Unit SGK với flashcards & bài tập thú vị',
    icon: <BookOpen className="w-8 h-8" />,
    emoji: '📖',
    gradientClass: 'skill-card-vocab',
    skillKey: 'Vocabulary',
  },
  {
    id: 'pronunciation',
    tabId: 'speech',
    title: 'Phát Âm',
    titleEn: 'Pronunciation',
    description: 'Luyện phát âm chuẩn với AI — nói và được chấm điểm ngay',
    icon: <Headphones className="w-8 h-8" />,
    emoji: '🎧',
    gradientClass: 'skill-card-pronunciation',
    skillKey: 'Pronunciation',
  },
  {
    id: 'reading',
    tabId: 'reading-game',
    title: 'Đọc Hiểu',
    titleEn: 'Reading',
    description: 'Game đọc hiểu hấp dẫn — đọc bài, trả lời câu hỏi, ghi điểm cao',
    icon: <BookOpen className="w-8 h-8" />,
    emoji: '📚',
    gradientClass: 'skill-card-reading',
    skillKey: 'Reading',
  },
  {
    id: 'writing',
    tabId: 'writing',
    title: 'Viết',
    titleEn: 'Writing',
    description: 'Viết bài luận và được AI chấm điểm chi tiết, gợi ý sửa lỗi',
    icon: <FileEdit className="w-8 h-8" />,
    emoji: '✏️',
    gradientClass: 'skill-card-writing',
    skillKey: 'Writing',
  },
];

const TOOL_CARDS = [
  {
    id: 'arena',
    tabId: 'arena',
    title: 'Đấu Tri Thức',
    emoji: '⚔️',
    icon: <Swords className="w-5 h-5" />,
    description: 'Thi đấu kiến thức',
  },
  {
    id: 'upload',
    tabId: 'upload',
    title: 'Tải SGK',
    emoji: '📁',
    icon: <Upload className="w-5 h-5" />,
    description: 'Tải tài liệu sách',
  },
  {
    id: 'report',
    tabId: 'report',
    title: 'Báo Cáo',
    emoji: '📊',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Xem tiến độ học tập',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ appData, onSelectSkill }) => {
  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId);
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
      <div className="flex items-center justify-between mt-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-purple-950 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-500" />
            Chọn Kỹ Năng Để Học
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-sm text-purple-600 font-semibold mt-1">
            5 kỹ năng Tiếng Anh cốt lõi — em muốn luyện kỹ năng nào hôm nay? 🎯
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 neu-card-purple px-4 py-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-purple-600 block uppercase">Tổng tiến độ</span>
            <span className="text-lg font-extrabold text-purple-800">{avgMastery}%</span>
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
              onClick={() => onSelectSkill(card.tabId)}
              className={`skill-card ${card.gradientClass}`}
              style={{ animationDelay: `${index * 80}ms` }}
              aria-label={`Học ${card.title} (${card.titleEn}) — Tiến độ ${mastery}%`}
            >
              {/* Card Content */}
              <div className="skill-card-inner">
                {/* Top: Icon + Emoji */}
                <div className="skill-card-icon-wrapper">
                  <span className="skill-card-emoji" aria-hidden="true">{card.emoji}</span>
                  <div className="skill-card-icon">
                    {card.icon}
                  </div>
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

                {/* Arrow indicator */}
                <div className="skill-card-arrow">
                  <ChevronRight className="w-5 h-5" />
                  <span className="text-xs font-bold">Bắt đầu học</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tools Section */}
      <div className="mt-8">
        <h3 className="text-sm font-extrabold text-purple-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <span>🛠️</span> Công Cụ Bổ Sung
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {TOOL_CARDS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onSelectSkill(tool.tabId)}
              className="tool-card group"
              aria-label={tool.title}
            >
              <div className="tool-card-icon">
                <span className="text-xl" aria-hidden="true">{tool.emoji}</span>
              </div>
              <span className="tool-card-title">{tool.title}</span>
              <span className="tool-card-desc">{tool.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
