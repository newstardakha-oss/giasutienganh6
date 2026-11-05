import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Layers,
  Mic,
  PenTool,
  BookOpen,
  BarChart3,
  Flame,
  Zap,
  HardDriveUpload,
  Trophy,
  Download,
  FileText,
  Presentation,
  FileCode,
  Settings,
  Home,
  User,
  LogOut,
  LayoutTemplate,
  ChevronRight
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
  onLogout?: () => void;
}

const DESKTOP_NAV_ITEMS = [
  {
    id: 'home',
    label: 'Trang chủ',
    icon: Home,
    activeClass: 'nav-active-home',
    iconClass: 'nav-icon-home',
  },
  {
    id: 'socratic',
    label: 'Ngữ pháp',
    icon: GraduationCap,
    activeClass: 'nav-active-grammar',
    iconClass: 'nav-icon-grammar',
  },
  {
    id: 'practice',
    label: 'Từ vựng',
    icon: Layers,
    activeClass: 'nav-active-vocab',
    iconClass: 'nav-icon-vocab',
  },
  {
    id: 'speech',
    label: 'Phát âm',
    icon: Mic,
    activeClass: 'nav-active-pronunciation',
    iconClass: 'nav-icon-pronunciation',
  },
  {
    id: 'reading-game',
    label: 'Đọc hiểu',
    icon: BookOpen,
    activeClass: 'nav-active-reading',
    iconClass: 'nav-icon-reading',
  },
  {
    id: 'writing',
    label: 'Viết',
    icon: PenTool,
    activeClass: 'nav-active-writing',
    iconClass: 'nav-icon-writing',
  },
  {
    id: 'arena',
    label: 'Đấu tri thức',
    icon: Trophy,
    activeClass: 'nav-active-arena',
    iconClass: 'nav-icon-arena',
  },
];

const LEARNING_TABS = ['socratic', 'practice', 'speech', 'reading-game', 'writing', 'upload'];

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
  onLogout,
}) => {
  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [showExportSubmenu, setShowExportSubmenu] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const avatarMenuRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(124);

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

  useEffect(() => {
    if (!isAvatarMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target as Node)) {
        setIsAvatarMenuOpen(false);
        setShowExportSubmenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAvatarMenuOpen]);

  const handleExportDocx = () => {
    exportQuestionsToDocx('De_Kiem_Tra_Tieng_Anh_6', appData.questions.slice(0, 10), appData.units[0]);
    setIsAvatarMenuOpen(false);
    setShowExportSubmenu(false);
  };

  const handleExportPptx = () => {
    exportUnitToPptx(appData.units[0]);
    setIsAvatarMenuOpen(false);
    setShowExportSubmenu(false);
  };

  const handleExportMoodle = () => {
    exportToMoodleGift('Ngan_Hang_Cau_Hoi_Tieng_Anh_6', appData.questions);
    setIsAvatarMenuOpen(false);
    setShowExportSubmenu(false);
  };

  const isLearningActive = LEARNING_TABS.includes(activeTab);
  const displayName = appData.isTeacherLoggedIn
    ? currentTeacher?.fullName || 'Giáo Viên'
    : currentStudent?.fullName || 'Học Sinh Lớp 6';
  const displayRole = appData.isTeacherLoggedIn
    ? isAdmin
      ? 'Quản Lý Admin'
      : 'Giáo Viên'
    : currentStudent?.className || 'Lớp 6';

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-[#f5f3ff]/95 backdrop-blur-md border-b border-purple-200 shadow-sm transition-colors"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            {/* Trái: Logo + Tên "Gia Sư AI Lớp 6" (chỉ 1 dòng) */}
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group min-w-0 shrink-0 text-left"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-all border-2 border-white shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-base sm:text-lg leading-none text-slate-900 whitespace-nowrap">
                Gia Sư AI Lớp 6
              </span>
            </button>

            {/* Phải: Chuỗi ngày học (🔥 6), XP/Level gộp chung 1 chip, Avatar người dùng */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* 1. Chuỗi ngày học (🔥 6) */}
              <div
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full neu-card-orange text-xs font-extrabold whitespace-nowrap shrink-0"
                title="Chuỗi ngày học liên tiếp"
              >
                <Flame className="w-3.5 h-3.5 text-amber-700 fill-amber-600 shrink-0" />
                <span className="whitespace-nowrap">{appData.progress.streakDays}</span>
              </div>

              {/* 2. XP / Level gộp chung 1 chip */}
              <div
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full neu-card-blue text-xs font-extrabold whitespace-nowrap shrink-0"
                title="Cấp độ & Điểm kinh nghiệm XP"
              >
                <Zap className="w-3.5 h-3.5 text-amber-700 fill-amber-500 shrink-0" />
                <span className="whitespace-nowrap">
                  Lv.{appData.progress.level}
                </span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">
                  {appData.progress.totalXP} XP
                </span>
              </div>

              {/* 3. Avatar người dùng + Menu Dropdown */}
              <div ref={avatarMenuRef} className="relative shrink-0">
                <button
                  type="button"
                  id="header-student-auth-btn"
                  onClick={() => {
                    setIsAvatarMenuOpen((prev) => !prev);
                    setShowExportSubmenu(false);
                  }}
                  aria-expanded={isAvatarMenuOpen}
                  aria-haspopup="menu"
                  title={`${displayName} (${displayRole})`}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-lg sm:text-xl leading-none transition-all cursor-pointer shadow-xs hover:scale-105 ${
                    appData.isTeacherLoggedIn
                      ? 'bg-purple-100 border-purple-500 text-purple-950'
                      : 'bg-sky-100 border-sky-500 text-sky-950'
                  }`}
                >
                  <span>
                    {appData.isTeacherLoggedIn
                      ? '👩‍🏫'
                      : currentStudent
                      ? currentStudent.avatar
                      : '👨‍🎓'}
                  </span>
                </button>

                {isAvatarMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 neu-card bg-white p-2 z-50 border-2 border-slate-200 shadow-xl space-y-1"
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-extrabold text-slate-900 truncate whitespace-nowrap">
                        {displayName}
                      </p>
                      <p className="text-[11px] font-bold text-indigo-800 truncate whitespace-nowrap">
                        {displayRole}
                      </p>
                    </div>

                    {/* 1. Hồ sơ */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        onOpenStudentAuth();
                      }}
                      className="w-full px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-indigo-50 hover:text-indigo-800 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <User className="w-4 h-4 text-indigo-700 shrink-0" />
                      <span className="whitespace-nowrap">Hồ sơ</span>
                    </button>

                    {/* 2. Cài đặt */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        onOpenSettings();
                      }}
                      className="w-full px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-indigo-50 hover:text-indigo-800 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="whitespace-nowrap">Cài đặt</span>
                    </button>

                    {/* 3. Xuất file */}
                    <div>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => setShowExportSubmenu((prev) => !prev)}
                        className="w-full px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl flex items-center justify-between gap-2 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5 whitespace-nowrap">
                          <Download className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="whitespace-nowrap">Xuất file</span>
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-slate-600 transition-transform ${
                            showExportSubmenu ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {showExportSubmenu && (
                        <div className="pl-4 pr-1 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                          <button
                            type="button"
                            onClick={handleExportDocx}
                            className="w-full px-2.5 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-sky-100 hover:text-sky-900 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                            <span className="whitespace-nowrap">Word (.docx)</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleExportPptx}
                            className="w-full px-2.5 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-amber-100 hover:text-amber-900 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <Presentation className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span className="whitespace-nowrap">PowerPoint (.pptx)</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleExportMoodle}
                            className="w-full px-2.5 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-emerald-100 hover:text-emerald-900 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <FileCode className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="whitespace-nowrap">Moodle GIFT</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAvatarMenuOpen(false);
                              setShowExportSubmenu(false);
                              onOpenBackupModal();
                            }}
                            className="w-full px-2.5 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-purple-100 hover:text-purple-900 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <HardDriveUpload className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                            <span className="whitespace-nowrap">Sao lưu / Khôi phục</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 4. Trang bìa */}
                    {onOpenCoverScreen && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setIsAvatarMenuOpen(false);
                          onOpenCoverScreen();
                        }}
                        className="w-full px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-purple-50 hover:text-purple-800 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <LayoutTemplate className="w-4 h-4 text-purple-700 shrink-0" />
                        <span className="whitespace-nowrap">Trang bìa</span>
                      </button>
                    )}

                    {/* 5. Đăng xuất */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        if (onLogout) {
                          onLogout();
                        } else if (onOpenCoverScreen) {
                          onOpenCoverScreen();
                        }
                      }}
                      className="w-full px-3 py-2 text-xs font-extrabold text-rose-700 hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-700 shrink-0" />
                      <span className="whitespace-nowrap">Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thanh menu ngang: Trang chủ, Ngữ pháp, Từ vựng, Phát âm, Đọc hiểu, Viết, Đấu tri thức */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden md:flex items-center justify-between gap-1.5 lg:gap-2.5 py-2 border-t border-purple-200/70"
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
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 lg:px-3.5 py-2 rounded-xl text-xs lg:text-sm font-extrabold whitespace-nowrap transition-all min-w-0 cursor-pointer ${
                    isActive
                      ? `${item.activeClass} shadow-md`
                      : 'neu-btn text-slate-800 hover:text-indigo-800'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : item.iconClass
                    }`}
                  />
                  <span className="whitespace-nowrap truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Khoảng đệm phía trên nội dung bằng đúng chiều cao header */}
      <div
        aria-hidden="true"
        className="w-full shrink-0"
        style={{ height: `${headerHeight}px` }}
      />

      {/* Thanh điều hướng dưới đáy màn hình trên điện thoại (5 mục: Trang chủ, Học, Đấu trí, Báo cáo, Tôi) */}
      <nav
        aria-label="Điều hướng di động"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(15,23,42,0.1)] px-2 py-1.5"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          <button
            type="button"
            id="mobile-nav-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'home'
                ? 'nav-active-home shadow-sm'
                : 'text-slate-700 hover:text-indigo-800'
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
                ? 'nav-active-grammar shadow-sm'
                : 'text-slate-700 hover:text-indigo-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Học</span>
          </button>

          <button
            type="button"
            id="mobile-nav-arena"
            onClick={() => setActiveTab('arena')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'arena'
                ? 'nav-active-arena shadow-sm'
                : 'text-slate-700 hover:text-indigo-800'
            }`}
          >
            <Trophy className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Đấu trí</span>
          </button>

          <button
            type="button"
            id="mobile-nav-report"
            onClick={() => setActiveTab('report')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'report'
                ? 'nav-active-home shadow-sm'
                : 'text-slate-700 hover:text-indigo-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Báo cáo</span>
          </button>

          <button
            type="button"
            id="mobile-nav-profile"
            onClick={onOpenStudentAuth}
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-extrabold text-slate-700 hover:text-indigo-800 whitespace-nowrap transition-all"
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Tôi</span>
          </button>
        </div>
      </nav>
    </>
  );
};
