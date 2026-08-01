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
  Settings,
  Home
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
  const hasCustomKey = Boolean(appData.settings.geminiApiKey);
  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Navigation items are defined inline in the nav bar below

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
    <header className="sticky top-0 z-40 bg-[#f5f3ff] border-b border-purple-100 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Vibrant Pastel */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onOpenCoverScreen ? onOpenCoverScreen() : setActiveTab('socratic')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#818cf8] to-[#f472b6] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all border-2 border-white">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl leading-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-1.5">
                Gia Sư AI Lớp 6 🌟
              </h1>
              <p className="text-[11px] text-purple-600 font-bold tracking-tight">
                Global Success • Vibrant Pastel & Playful Icons 🎨
              </p>
            </div>
          </div>

          {/* User Profile & Gamification Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Button Trang Bìa */}
            {onOpenCoverScreen && (
              <button
                onClick={onOpenCoverScreen}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl neu-card-purple text-purple-800 text-xs font-extrabold transition-all hover:scale-105"
                title="Quay lại Màn hình Trang Bìa Đăng Nhập"
              >
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Trang Bìa 🚀</span>
              </button>
            )}

            {/* User Profile & Role Button */}
            <button
              id="header-student-auth-btn"
              onClick={onOpenStudentAuth}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border text-xs font-extrabold transition-all neu-btn hover:scale-105 ${
                appData.isTeacherLoggedIn
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-sky-100 text-sky-900 border-sky-300'
              }`}
            >
              <span className="text-xl leading-none animate-bounce">
                {appData.isTeacherLoggedIn
                  ? '👩‍🏫'
                  : currentStudent
                  ? currentStudent.avatar
                  : '👨‍🎓'}
              </span>
              <div className="text-left hidden sm:block leading-tight">
                <span className="block text-slate-900 truncate font-extrabold text-[12px]">
                  {appData.isTeacherLoggedIn
                    ? (currentTeacher?.fullName || 'Giáo Viên')
                    : currentStudent
                    ? currentStudent.fullName
                    : 'Đăng Nhập'}
                </span>
                <span
                  className={`block text-[10px] font-bold ${
                    appData.isTeacherLoggedIn ? 'text-purple-600' : 'text-sky-600'
                  }`}
                >
                  {appData.isTeacherLoggedIn
                    ? (isAdmin ? 'Quản Lý Admin 👑' : `Giáo Viên 👩‍🏫`)
                    : currentStudent
                    ? `${currentStudent.className} 🎒`
                    : 'Học Sinh Lớp 6 🎒'}
                </span>
              </div>
              {appData.isTeacherLoggedIn ? (
                <ShieldCheck className="w-4 h-4 text-purple-600 ml-0.5 shrink-0" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-sky-600 ml-0.5 shrink-0" />
              )}
            </button>

            {/* Export Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl neu-card-mint text-emerald-800 text-xs font-extrabold transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Xuất File 📥</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 neu-card p-2 z-50 animate-in fade-in zoom-in-95 border-2 border-emerald-200">
                  <div className="px-3 py-2 text-[11px] font-extrabold text-emerald-700 border-b border-emerald-100">
                    BỘ CÔNG CỤ XUẤT TÀI LIỆU 📄
                  </div>
                  <button
                    onClick={handleExportDocx}
                    className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-sky-100 hover:text-sky-700 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-sky-500" />
                    <span>Xuất Word (.docx) 📝</span>
                  </button>
                  <button
                    onClick={handleExportPptx}
                    className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-amber-100 hover:text-amber-700 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <Presentation className="w-4 h-4 text-amber-500" />
                    <span>Xuất PowerPoint (.pptx) 📊</span>
                  </button>
                  <button
                    onClick={handleExportMoodle}
                    className="w-full px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span>Xuất Moodle GIFT 🎯</span>
                  </button>
                </div>
              )}
            </div>

            {/* Streak Vibrant Pastel */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl neu-card-orange text-amber-900 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span className="font-extrabold text-amber-700">{appData.progress.streakDays}</span>
              <span className="hidden sm:inline text-amber-800">ngày 🔥</span>
            </div>

            {/* Level & XP Vibrant Pastel */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl neu-card-blue text-sky-900 text-xs font-bold">
              <Award className="w-4 h-4 text-sky-600" />
              <span className="font-extrabold text-sky-700">Lv.{appData.progress.level} 🦄</span>
              <span className="text-sky-300">|</span>
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-extrabold text-amber-700">{appData.progress.totalXP} XP ⚡</span>
            </div>

            {/* Settings Button */}
            <button
              id="header-api-settings-btn"
              onClick={onOpenSettings}
              className="p-2.5 rounded-2xl neu-btn text-slate-600 hover:scale-105 transition-all"
              title="Cấu hình hệ thống AI"
            >
              <Settings className="w-4 h-4 text-slate-600" />
            </button>

            {/* Backup / Restore Button */}
            <button
              id="header-backup-btn"
              onClick={onOpenBackupModal}
              title="Sao lưu / Khôi phục dữ liệu"
              className="p-2.5 rounded-2xl neu-btn text-slate-600 hover:scale-105 transition-all"
            >
              <HardDriveUpload className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tab Bar Vibrant Pastel Icons */}
        <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-purple-100">
          {[
            { id: 'home', label: '🏠 Trang Chủ', icon: Home, activeClass: 'neu-btn-primary' },
            { id: 'socratic', label: 'Ngữ Pháp 💡', icon: GraduationCap, activeClass: 'neu-btn-primary' },
            { id: 'speech', label: 'Phát Âm 🎧', icon: Mic, activeClass: 'neu-btn-primary' },
            { id: 'writing', label: 'Viết ✏️', icon: FileEdit, activeClass: 'neu-btn-primary' },
            { id: 'reading-game', label: 'Đọc Hiểu 🎮', icon: BookOpen, activeClass: 'neu-btn-success' },
            { id: 'practice', label: 'Từ Vựng 🧩', icon: BookOpen, activeClass: 'neu-btn-primary' },
            { id: 'arena', label: 'Đấu Tri Thức 🏆', icon: Swords, activeClass: 'neu-btn-primary' },
            { id: 'upload', label: 'Tải SGK 📁', icon: Upload, activeClass: 'neu-btn-primary' },
            { id: 'report', label: 'Báo Cáo 📊', icon: BarChart3, activeClass: 'neu-btn-primary' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? `${item.activeClass} text-white shadow-md scale-105`
                    : 'neu-btn text-slate-700 hover:text-indigo-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
