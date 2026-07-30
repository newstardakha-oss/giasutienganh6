import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Mic,
  FileEdit,
  BookOpen,
  Upload,
  BarChart3,
  Key,
  Flame,
  Zap,
  HardDriveUpload,
  Award,
  UserCheck,
  Swords,
  Download,
  FileText,
  Presentation,
  FileCode,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { AppDataSchema } from '../types';
import { exportQuestionsToDocx } from '../services/docxExport';
import { exportUnitToPptx } from '../services/pptxExport';
import { exportToMoodleGift } from '../services/moodleExport';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appData: AppDataSchema;
  onOpenSettings: () => void;
  onOpenBackupModal: () => void;
  onOpenStudentAuth: () => void;
  onOpenCoverScreen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  appData,
  onOpenSettings,
  onOpenBackupModal,
  onOpenStudentAuth,
  onOpenCoverScreen,
}) => {
  const hasCustomKey = Boolean(appData.settings.geminiApiKey);
  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const navItems = [
    { id: 'socratic', label: 'Gia Sư Socratic', icon: GraduationCap },
    { id: 'homework', label: 'Giải Bài Tập', icon: Sparkles },
    { id: 'speech', label: 'Phát Âm & Giao Tiếp', icon: Mic },
    { id: 'writing', label: 'Chấm Bài Viết', icon: FileEdit },
    { id: 'reading-game', label: 'Game Đọc Hiểu', icon: BookOpen },
    { id: 'practice', label: 'Kho Bài Tập', icon: BookOpen },
    { id: 'arena', label: 'Đấu Tri Thức', icon: Swords },
    { id: 'upload', label: 'Tải Tài Liệu SGK', icon: Upload },
    { id: 'report', label: 'Báo Cáo Phụ Huynh', icon: BarChart3 },
  ];

  const handleExportDocx = () => {
    exportQuestionsToDocx('De_Kiem_Tra_Tieng_Anh_6', appData.questions.slice(0, 10), appData.units[0]);
    setShowExportMenu(false);
  };

  const handleExportPptx = () => {
    exportUnitToPptx(appData.units[0]);
    setShowExportMenu(false);
  };

  const handleExportMoodle = () => {
    exportToMoodleGift('Ngan_Hang_Cau_Hoi_Tieng_Anh_6', appData.questions);
    setShowExportMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#eef4fb] border-b border-slate-200/60 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Neumorphic */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onOpenCoverScreen ? onOpenCoverScreen() : setActiveTab('socratic')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all border border-white/40">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                Gia Sư AI Lớp 6
              </h1>
              <p className="text-[11px] text-slate-500 font-bold tracking-tight">
                Global Success • Soft Neumorphism 3D
              </p>
            </div>
          </div>

          {/* User Profile & Gamification Badges (Neumorphic Style) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Button Trang Bìa Đăng Nhập */}
            {onOpenCoverScreen && (
              <button
                onClick={onOpenCoverScreen}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl neu-btn text-indigo-700 text-xs font-extrabold transition-all"
                title="Quay lại Màn hình Trang Bìa Đăng Nhập"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Trang Bìa</span>
              </button>
            )}

            {/* User Profile & Role Button */}
            <button
              id="header-student-auth-btn"
              onClick={onOpenStudentAuth}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border text-xs font-extrabold transition-all neu-btn ${
                appData.isTeacherLoggedIn
                  ? 'bg-purple-50 text-purple-900 border-purple-200'
                  : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}
            >
              <span className="text-xl leading-none">
                {appData.isTeacherLoggedIn
                  ? '👩‍🏫'
                  : currentStudent
                  ? currentStudent.avatar
                  : '👨‍🎓'}
              </span>
              <div className="text-left hidden sm:block leading-tight">
                <span className="block text-slate-900 truncate font-extrabold text-[12px]">
                  {appData.isTeacherLoggedIn
                    ? appData.teacherAccount.fullName
                    : currentStudent
                    ? currentStudent.fullName
                    : 'Đăng Nhập'}
                </span>
                <span
                  className={`block text-[10px] font-bold ${
                    appData.isTeacherLoggedIn ? 'text-purple-600' : 'text-blue-600'
                  }`}
                >
                  {appData.isTeacherLoggedIn
                    ? 'Giáo Viên Quản Lý'
                    : currentStudent
                    ? currentStudent.className
                    : 'Học Sinh Lớp 6'}
                </span>
              </div>
              {appData.isTeacherLoggedIn ? (
                <ShieldCheck className="w-4 h-4 text-purple-600 ml-0.5 shrink-0" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-blue-600 ml-0.5 shrink-0" />
              )}
            </button>

            {/* Export Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl neu-btn text-slate-700 text-xs font-extrabold transition-all"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Xuất File</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 neu-card p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 text-[11px] font-extrabold text-slate-400 border-b border-slate-200/60">
                    BỘ CÔNG CỤ XUẤT TÀI LIỆU
                  </div>
                  <button
                    onClick={handleExportDocx}
                    className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Xuất Đề Thi Word (.docx)</span>
                  </button>
                  <button
                    onClick={handleExportPptx}
                    className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <Presentation className="w-4 h-4 text-amber-500" />
                    <span>Xuất Slide PowerPoint (.pptx)</span>
                  </button>
                  <button
                    onClick={handleExportMoodle}
                    className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span>Xuất Moodle GIFT Format</span>
                  </button>
                </div>
              )}
            </div>

            {/* Streak Neumorphic */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl neu-inset text-slate-700 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-extrabold text-amber-600">{appData.progress.streakDays}</span>
              <span className="hidden sm:inline text-slate-500">ngày</span>
            </div>

            {/* Level & XP Neumorphic */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl neu-inset text-slate-700 text-xs font-bold">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="font-extrabold text-blue-600">Lv.{appData.progress.level}</span>
              <span className="text-slate-300">|</span>
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-extrabold text-slate-700">{appData.progress.totalXP} XP</span>
            </div>

            {/* Settings Button */}
            <button
              id="header-api-settings-btn"
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl neu-btn text-slate-600 transition-colors"
              title="Cấu hình hệ thống AI"
            >
              <Settings className="w-4 h-4 text-slate-600" />
            </button>

            {/* Backup / Restore Button */}
            <button
              id="header-backup-btn"
              onClick={onOpenBackupModal}
              title="Sao lưu / Khôi phục dữ liệu"
              className="p-2.5 rounded-xl neu-btn text-slate-600 transition-colors"
            >
              <HardDriveUpload className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tab Bar Neumorphic */}
        <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-200/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? 'neu-btn-primary font-extrabold shadow-md'
                    : 'neu-btn text-slate-600 hover:text-blue-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
