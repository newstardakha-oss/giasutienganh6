import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Mic,
  FileEdit,
  BookOpen,
  Upload,
  BarChart3,
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
  Settings,
  Home,
  User
} from 'lucide-react';
import { AppDataSchema, TeacherAccount } from '../types';
import { exportQuestionsToDocx } from '../services/docxExport';
import { exportUnitToPptx } from '../services/pptxExport';
import { exportToMoodleGift } from '../services/moodleExport';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  onOpenSettings: () => void;
  onOpenBackupModal: () => void;
  onOpenStudentAuth: () => void;
  onOpenCoverScreen?: () => void;
}

const DESKTOP_NAV_ITEMS = [
  { id: 'home', label: 'Trang Chủ', emoji: '🏠', icon: Home, activeClass: 'neu-btn-primary' },
  { id: 'socratic', label: 'Ngữ Pháp', emoji: '💡', icon: GraduationCap, activeClass: 'neu-btn-primary' },
  { id: 'speech', label: 'Phát Âm', emoji: '🎧', icon: Mic, activeClass: 'neu-btn-primary' },
  { id: 'writing', label: 'Viết', emoji: '✏️', icon: FileEdit, activeClass: 'neu-btn-primary' },
  { id: 'reading-game', label: 'Đọc Hiểu', emoji: '🎮', icon: BookOpen, activeClass: 'neu-btn-success' },
  { id: 'practice', label: 'Từ Vựng', emoji: '🧩', icon: BookOpen, activeClass: 'neu-btn-primary' },
  { id: 'arena', label: 'Đấu Tri Thức', emoji: '🏆', icon: Swords, activeClass: 'neu-btn-primary' },
  { id: 'upload', label: 'Tải SGK', emoji: '📁', icon: Upload, activeClass: 'neu-btn-primary' },
  { id: 'report', label: 'Báo Cáo', emoji: '📊', icon: BarChart3, activeClass: 'neu-btn-primary' },
];

const LEARNING_TABS = ['socratic', 'speech', 'writing', 'reading-game', 'practice', 'upload'];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  appData,
  currentTeacher,
  isAdmin,
  onOpenSettings,
  onOpenBackupModal,
  onOpenStudentAuth,
  onOpenCoverScreen,
}) => {
  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(136);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const updateHeight = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        setHeaderHeight(Math.ceil(h));
        document.documentElement.style.setProperty('--app-header-height', `${Math.ceil(h)}px`);
      }
    };
    updateHeight();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateHeight) : null;
    observer?.observe(el);
    window.addEventListener('resize', updateHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

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

  const isLearningActive = LEARNING_TABS.includes(activeTab);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-[#f5f3ff]/95 backdrop-blur-md border-b border-purple-100 shadow-sm transition-colors"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0 shrink-0"
              onClick={() => (onOpenCoverScreen ? onOpenCoverScreen() : setActiveTab('socratic'))}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#818cf8] to-[#f472b6] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-all border-2 border-white shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-base sm:text-xl leading-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-1 whitespace-nowrap">
                  <span>Gia Sư AI Lớp 6</span>
                  <span className="hidden sm:inline">🌟</span>
                </h1>
                <p className="text-[11px] text-purple-600 font-bold tracking-tight whitespace-nowrap">
                  Global Success
                </p>
              </div>
            </div>

            {/* User Profile & Gamification Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Button Trang Bìa */}
              {onOpenCoverScreen && (
                <button
                  type="button"
                  onClick={onOpenCoverScreen}
                  className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-2xl neu-card-purple text-purple-800 text-xs font-extrabold transition-all hover:scale-105 whitespace-nowrap shrink-0"
                  title="Quay lại Màn hình Trang Bìa Đăng Nhập"
                >
                  <GraduationCap className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="whitespace-nowrap">Trang Bìa 🚀</span>
                </button>
              )}

              {/* User Profile & Role Button */}
              <button
                type="button"
                id="header-student-auth-btn"
                onClick={onOpenStudentAuth}
                className={`flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl border text-xs font-extrabold transition-all neu-btn hover:scale-105 whitespace-nowrap shrink-0 ${
                  appData.isTeacherLoggedIn
                    ? 'bg-purple-100 text-purple-900 border-purple-300'
                    : 'bg-sky-100 text-sky-900 border-sky-300'
                }`}
              >
                <span className="text-lg sm:text-xl leading-none shrink-0">
                  {appData.isTeacherLoggedIn
                    ? '👩‍🏫'
                    : currentStudent
                    ? currentStudent.avatar
                    : '👨‍🎓'}
                </span>
                <div className="text-left hidden sm:block leading-tight max-w-[120px] lg:max-w-[150px]">
                  <span className="block text-slate-900 truncate font-extrabold text-[12px] whitespace-nowrap">
                    {appData.isTeacherLoggedIn
                      ? currentTeacher?.fullName || 'Giáo Viên'
                      : currentStudent
                      ? currentStudent.fullName
                      : 'Đăng Nhập'}
                  </span>
                  <span
                    className={`block text-[10px] font-bold truncate whitespace-nowrap ${
                      appData.isTeacherLoggedIn ? 'text-purple-600' : 'text-sky-600'
                    }`}
                  >
                    {appData.isTeacherLoggedIn
                      ? isAdmin
                        ? 'Quản Lý Admin 👑'
                        : 'Giáo Viên 👩‍🏫'
                      : currentStudent
                      ? `${currentStudent.className} 🎒`
                      : 'Học Sinh Lớp 6 🎒'}
                  </span>
                </div>
                {appData.isTeacherLoggedIn ? (
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 hidden sm:block" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-sky-600 shrink-0 hidden sm:block" />
                )}
              </button>

              {/* Export Menu Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl neu-card-mint text-emerald-800 text-xs font-extrabold transition-all hover:scale-105 whitespace-nowrap shrink-0"
                  title="Xuất tài liệu"
                >
                  <Download className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">Xuất File 📥</span>
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-56 neu-card p-2 z-50 animate-in fade-in zoom-in-95 border-2 border-emerald-200">
                    <div className="px-3 py-2 text-[11px] font-extrabold text-emerald-700 border-b border-emerald-100 whitespace-nowrap">
                      BỘ CÔNG CỤ XUẤT TÀI LIỆU 📄
                    </div>
                    <button
                      type="button"
                      onClick={handleExportDocx}
                      className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-sky-100 hover:text-sky-700 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="whitespace-nowrap">Xuất Word (.docx) 📝</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportPptx}
                      className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-amber-100 hover:text-amber-700 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap"
                    >
                      <Presentation className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="whitespace-nowrap">Xuất PowerPoint (.pptx) 📊</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportMoodle}
                      className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap"
                    >
                      <FileCode className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="whitespace-nowrap">Xuất Moodle GIFT 🎯</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Streak Pill */}
              <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl neu-card-orange text-amber-900 text-xs font-bold whitespace-nowrap shrink-0">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span className="font-extrabold text-amber-700 whitespace-nowrap">
                  {appData.progress.streakDays}
                </span>
                <span className="hidden md:inline text-amber-800 whitespace-nowrap">ngày 🔥</span>
              </div>

              {/* Level & XP Pill */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-2xl neu-card-blue text-sky-900 text-xs font-bold whitespace-nowrap shrink-0">
                <Award className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-extrabold text-sky-700 whitespace-nowrap">
                  Lv.{appData.progress.level} 🦄
                </span>
                <span className="text-sky-300">|</span>
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span className="font-extrabold text-amber-700 whitespace-nowrap">
                  {appData.progress.totalXP} XP ⚡
                </span>
              </div>

              {/* Settings Button */}
              <button
                type="button"
                id="header-api-settings-btn"
                onClick={onOpenSettings}
                className="p-2 sm:p-2.5 rounded-2xl neu-btn text-slate-600 hover:scale-105 transition-all shrink-0"
                title="Cấu hình hệ thống AI"
              >
                <Settings className="w-4 h-4 text-slate-600" />
              </button>

              {/* Backup / Restore Button */}
              <button
                type="button"
                id="header-backup-btn"
                onClick={onOpenBackupModal}
                title="Sao lưu / Khôi phục dữ liệu"
                className="p-2 sm:p-2.5 rounded-2xl neu-btn text-slate-600 hover:scale-105 transition-all shrink-0"
              >
                <HardDriveUpload className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Horizontal Navigation Bar (hidden on mobile < 768px) */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden md:flex items-center justify-between gap-1 lg:gap-2 py-2 border-t border-purple-100"
          >
            {DESKTOP_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-1 flex items-center justify-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-2 rounded-xl text-[11px] lg:text-xs xl:text-sm font-extrabold whitespace-nowrap transition-all min-w-0 ${
                    isActive
                      ? `${item.activeClass} text-white shadow-md`
                      : 'neu-btn text-slate-700 hover:text-indigo-600'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-purple-500'
                    }`}
                  />
                  <span className="whitespace-nowrap truncate">{item.label}</span>
                  <span className="hidden xl:inline text-xs leading-none shrink-0">
                    {item.emoji}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Spacer matching exact sticky/fixed header height so content below is never covered */}
      <div
        aria-hidden="true"
        className="w-full shrink-0"
        style={{ height: `${headerHeight}px` }}
      />

      {/* Mobile Bottom Navigation Bar (5 items: Trang chủ, Học, Đấu trí, Báo cáo, Tôi) */}
      <nav
        aria-label="Điều hướng di động"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-200 shadow-[0_-4px_20px_rgba(99,102,241,0.12)] px-2 py-1.5"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          <button
            type="button"
            id="mobile-nav-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'home'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Trang chủ</span>
          </button>

          <button
            type="button"
            id="mobile-nav-learn"
            onClick={() => setActiveTab(isLearningActive ? activeTab : 'socratic')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              isLearningActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Học</span>
          </button>

          <button
            type="button"
            id="mobile-nav-arena"
            onClick={() => setActiveTab('arena')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'arena'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <Swords className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Đấu trí</span>
          </button>

          <button
            type="button"
            id="mobile-nav-report"
            onClick={() => setActiveTab('report')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'report'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Báo cáo</span>
          </button>

          <button
            type="button"
            id="mobile-nav-profile"
            onClick={onOpenStudentAuth}
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold text-slate-600 hover:text-indigo-600 whitespace-nowrap transition-all"
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Tôi</span>
          </button>
        </div>
      </nav>
    </>
  );
};
