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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onOpenCoverScreen ? onOpenCoverScreen() : setActiveTab('socratic')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90E2] to-[#FF9500] flex items-center justify-center text-white shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg leading-tight bg-gradient-to-r from-[#4A90E2] to-[#FF9500] bg-clip-text text-transparent">
                Gia Sư AI Lớp 6
              </h1>
              <p className="text-[11px] text-slate-400 font-semibold tracking-tight">
                Global Success • GDPT Mới
              </p>
            </div>
          </div>

          {/* User Profile & Gamification Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Button Trang Bìa Đăng Nhập */}
            {onOpenCoverScreen && (
              <button
                onClick={onOpenCoverScreen}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200"
                title="Quay lại Màn hình Trang Bìa Đăng Nhập"
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Trang Bìa</span>
              </button>
            )}
            {/* User Profile & Role Button */}
            <button
              id="header-student-auth-btn"
              onClick={onOpenStudentAuth}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
                appData.isTeacherLoggedIn
                  ? 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200'
              }`}
            >
              <span className="text-base leading-none">
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
                  className={`block text-[10px] font-semibold ${
                    appData.isTeacherLoggedIn ? 'text-purple-600 font-bold' : 'text-[#4A90E2]'
                  }`}
                >
                  {appData.isTeacherLoggedIn
                    ? 'Giáo Viên Quản Lý'
                    : currentStudent
                    ? currentStudent.className
                    : 'Học Sinh'}
                </span>
              </div>
              {appData.isTeacherLoggedIn ? (
                <ShieldCheck className="w-4 h-4 text-purple-600 ml-0.5 shrink-0" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-[#4A90E2] ml-0.5 shrink-0" />
              )}
            </button>

            {/* Export Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Xuất File</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 border-b border-slate-100">
                    BỘ CÔNG CỤ XUẤT TÀI LIỆU
                  </div>
                  <button
                    onClick={handleExportDocx}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Xuất Đề Thi Word (.docx)</span>
                  </button>
                  <button
                    onClick={handleExportPptx}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <Presentation className="w-4 h-4 text-amber-500" />
                    <span>Xuất Slide PowerPoint (.pptx)</span>
                  </button>
                  <button
                    onClick={handleExportMoodle}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2.5 transition-colors"
                  >
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span>Xuất Moodle GIFT Format</span>
                  </button>
                </div>
              )}
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
              <Flame className="w-4 h-4 text-[#FF9500] fill-[#FF9500]" />
              <span className="font-bold text-[#FF9500]">{appData.progress.streakDays}</span>
              <span className="hidden sm:inline text-slate-500">ngày</span>
            </div>

            {/* Level & XP */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
              <Award className="w-4 h-4 text-[#4A90E2]" />
              <span className="font-bold text-[#4A90E2]">Lv.{appData.progress.level}</span>
              <span className="text-slate-300">|</span>
              <Zap className="w-3.5 h-3.5 text-[#FF9500] fill-[#FF9500]" />
              <span className="text-slate-600">{appData.progress.totalXP} XP</span>
            </div>

            {/* Settings (API Key) Button - Always visible for all users according to LỆNH.md */}
            <button
              id="header-api-settings-btn"
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all border border-amber-300 shadow-2xs cursor-pointer"
              title="Cấu hình AI & API Key"
            >
              <Key className="w-3.5 h-3.5 text-[#FF9500]" />
              <span className="hidden sm:inline">API Key</span>
              <span className="text-[10px] text-rose-600 font-bold underline hidden md:inline ml-1">
                Lấy API key để sử dụng app
              </span>
            </button>

            {/* Backup / Restore Button */}
            <button
              id="header-backup-btn"
              onClick={onOpenBackupModal}
              title="Sao lưu / Khôi phục dữ liệu"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <HardDriveUpload className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tab Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#4A90E2] text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-[#4A90E2] hover:bg-slate-100/80'
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
