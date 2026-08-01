import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  X,
  Lock,
  Flame,
  BookOpen,
  LogOut,
  Target,
  Sparkles,
  ShieldCheck,
  Smile,
  ChevronRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { AppDataSchema, StudentAccount, DailyStudyLog, TeacherAccount } from '../types';
import { getTodayDateString, getCurrentFormattedTime } from '../services/storage';
import { INITIAL_PROGRESS } from '../data/sgkData';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  onLoginSuccess: (studentId: string) => void;
  onRegisterStudent: (newStudent: StudentAccount) => void;
  onLogout: () => void;
  onTeacherLogin: (email: string, password: string) => boolean;
  onTeacherLogout: () => void;
  onOpenTeacherManagement: () => void;
}

const AVATAR_OPTIONS = ['👨‍🎓', '👩‍🎓', '🚀', '🐱', '🦊', '⭐', '🦁', '🦉', '🎨', '⚽'];
const CLASS_OPTIONS = ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'];

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  appData,
  currentTeacher,
  onLoginSuccess,
  onRegisterStudent,
  onLogout,
  onTeacherLogin,
  onTeacherLogout,
  onOpenTeacherManagement,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'login' | 'register' | 'dailyLog' | 'teacherLogin'>('login');

  // Login form state
  const defaultSt = appData.students[0];
  const [selectedStudentId, setSelectedStudentId] = useState<string>(appData.currentStudentId || defaultSt?.id || '');
  const [loginUsername, setLoginUsername] = useState<string>(defaultSt?.username || '');
  const [loginPassword, setLoginPassword] = useState<string>(defaultSt?.pinCode || '1234');
  const [loginError, setLoginError] = useState<string>('');

  // Teacher login form state — email-based
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [teacherPass, setTeacherPass] = useState<string>('');
  const [teacherErr, setTeacherErr] = useState<string>('');
  const [teacherSuccess, setTeacherSuccess] = useState<string>('');

  // Register form state: 6 trường (Họ tên, Trường, Lớp, Xã, Tên đăng nhập, Mật khẩu)
  const [regFullName, setRegFullName] = useState<string>('');
  const [regSchoolName, setRegSchoolName] = useState<string>('THCS Chu Văn An');
  const [regClassName, setRegClassName] = useState<string>('');
  const [regCommuneName, setRegCommuneName] = useState<string>('Thị trấn Đăk Hà');
  const [regUsername, setRegUsername] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('1234');
  const [regSuccessMsg, setRegSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId);
  const todayStr = getTodayDateString();
  const todayLog: DailyStudyLog | undefined = currentStudent?.dailyLogs[todayStr];
  const todayMins = Math.round((todayLog?.timeSpentSeconds || 0) / 60);
  const goalMins = currentStudent?.dailyGoalMinutes || 20;
  const goalPct = Math.min(100, Math.round((todayMins / goalMins) * 100));

  const handleSelectStudent = (st: StudentAccount) => {
    setSelectedStudentId(st.id);
    setLoginUsername(st.username);
    setLoginPassword(st.pinCode || '1234');
    setLoginError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginUsername.trim()) {
      setLoginError('Vui lòng nhập Tên đăng nhập!');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Vui lòng nhập Mật khẩu!');
      return;
    }

    const cleanInput = loginUsername.trim().toLowerCase();
    const targetStudent = appData.students.find(
      (s) => s.username.toLowerCase() === cleanInput || s.fullName.toLowerCase() === cleanInput
    ) || appData.students.find((s) => s.id === selectedStudentId);

    if (!targetStudent) {
      setLoginError(`Không tìm thấy tài khoản với Tên đăng nhập "${loginUsername}". Vui lòng đăng ký tài khoản mới!`);
      return;
    }

    const validPassword = targetStudent.pinCode || '1234';
    if (loginPassword.trim() !== validPassword) {
      setLoginError('Mật khẩu chưa đúng! Vui lòng thử lại.');
      return;
    }

    onLoginSuccess(targetStudent.id);
    setActiveSubTab('dailyLog');
  };

  const handleTeacherLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherErr('');
    const success = onTeacherLogin(teacherEmail.trim(), teacherPass.trim());
    if (!success) {
      setTeacherErr('Email hoặc Mật khẩu Giáo viên không đúng! Vui lòng kiểm tra lại.');
      return;
    }
    setTeacherSuccess('Đăng nhập Giáo viên thành công! Đang chuyển sang Trung tâm quản lý...');
    setTimeout(() => {
      setTeacherSuccess('');
      onClose();
      onOpenTeacherManagement();
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Auto-generate username from fullName and className
    const autoGenUsername = () => {
      const cleanName = regFullName.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
      const cleanClass = regClassName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      return `${cleanName || 'hocsinh'}_${cleanClass || '6'}`;
    };

    const usernameToUse = autoGenUsername();
    const passwordToUse = '1234'; // Default PIN code

    if (!regFullName.trim() || !regSchoolName.trim() || !regClassName.trim() || !regCommuneName.trim()) {
      setLoginError('Vui lòng điền đầy đủ cả 4 thông tin đăng ký!');
      return;
    }

    const cleanUser = usernameToUse.toLowerCase();
    const isExisted = appData.students.some((s) => s.username.toLowerCase() === cleanUser);
    if (isExisted) {
      setLoginError(`Tên đăng nhập "@${usernameToUse}" tự động đã tồn tại. Vui lòng điều chỉnh lại Họ tên hoặc Lớp học!`);
      return;
    }

    const newStudentId = `student-${Date.now()}`;
    const newStudent: StudentAccount = {
      id: newStudentId,
      username: cleanUser,
      fullName: regFullName.trim(),
      className: regClassName.trim(),
      schoolName: regSchoolName.trim(),
      communeName: regCommuneName.trim(),
      pinCode: passwordToUse,
      avatar: '👨‍🎓',
      dailyGoalMinutes: 20,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      progress: {
        ...INITIAL_PROGRESS,
        studentName: regFullName.trim(),
      },
      sessions: [],
      dailyLogs: {
        [todayStr]: {
          date: todayStr,
          timeSpentSeconds: 0,
          sessionsCompleted: 0,
          xpEarned: 0,
          skillsPracticed: [],
          lastActiveTime: getCurrentFormattedTime(),
        },
      },
    };

    onRegisterStudent(newStudent);
    setRegSuccessMsg(`Đã đăng ký thành công cho học sinh ${regFullName} (@${cleanUser})!`);
    setTimeout(() => {
      setRegSuccessMsg('');
      setActiveSubTab('dailyLog');
    }, 1200);
  };

  // 7-day past calendar generator
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateKey = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('vi-VN', { weekday: 'short' });
    const log = currentStudent?.dailyLogs[dateKey];
    const mins = Math.round((log?.timeSpentSeconds || 0) / 60);
    return {
      dateKey,
      dayLabel,
      mins,
      sessions: log?.sessionsCompleted || 0,
      isToday: dateKey === todayStr,
    };
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4A90E2]/20 border border-[#4A90E2]/40 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
              {currentStudent ? currentStudent.avatar : '👨‍🎓'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-[#FF9500] mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mrs Nhan - THCS Chu Văn An Đăk Hà
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                {currentStudent ? currentStudent.fullName : 'Học Sinh Đăng Nhập'}
              </h3>
              <p className="text-xs text-slate-300">
                {currentStudent
                  ? `${currentStudent.className} • Mã: ${currentStudent.username}`
                  : 'Đăng nhập để theo dõi việc học hàng ngày & tích lũy XP'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveSubTab('dailyLog')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeSubTab === 'dailyLog'
                ? 'bg-white text-[#4A90E2] border-[#4A90E2] shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Nhật Ký Học Hàng Ngày</span>
          </button>
          <button
            onClick={() => setActiveSubTab('login')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeSubTab === 'login'
                ? 'bg-white text-[#4A90E2] border-[#4A90E2] shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 border-transparent'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Chuyển / Đăng Nhập</span>
          </button>
          <button
            onClick={() => setActiveSubTab('register')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeSubTab === 'register'
                ? 'bg-white text-[#4A90E2] border-[#4A90E2] shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 border-transparent'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Đăng Ký Học Sinh Mới</span>
          </button>
          <button
            onClick={() => setActiveSubTab('teacherLogin')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-b-2 ml-auto ${
              activeSubTab === 'teacherLogin'
                ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 font-extrabold'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>👩‍🏫 Dành Cho Giáo Viên</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* TAB 1: DAILY LOG DASHBOARD */}
          {activeSubTab === 'dailyLog' && (
            <div className="space-y-6">
              {currentStudent ? (
                <>
                  {/* Today Goal Banner */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#4A90E2]" />
                        <span className="font-bold text-slate-800 text-sm">
                          Mục Tiêu Học Hôm Nay ({todayStr})
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#4A90E2] bg-white px-3 py-1 rounded-full border border-blue-200">
                        {goalPct}% Hoàn Thành
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600 font-semibold">
                        <span>Thời gian học: {todayMins} phút</span>
                        <span>Chỉ tiêu: {goalMins} phút / ngày</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-blue-200/60 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4A90E2] to-[#FF9500] transition-all duration-500 rounded-full"
                          style={{ width: `${goalPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                        <span className="text-slate-400 block text-[11px]">Bài Tập Đã Làm</span>
                        <span className="font-bold text-slate-800 text-base">
                          {todayLog?.sessionsCompleted || 0} bài
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                        <span className="text-slate-400 block text-[11px]">XP Tích Lũy</span>
                        <span className="font-bold text-[#FF9500] text-base">
                          +{todayLog?.xpEarned || 0} XP
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                        <span className="text-slate-400 block text-[11px]">Chuỗi Học Trực Tuyến</span>
                        <span className="font-bold text-emerald-600 text-base">
                          {currentStudent.progress.streakDays} ngày
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 7-Day Attendance Heatmap */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Theo Dõi Điểm Danh 7 Ngày Gần Nhất:
                    </span>
                    <div className="grid grid-cols-7 gap-2">
                      {last7Days.map((day, idx) => {
                        const isDone = day.mins >= goalMins;
                        const isPartial = day.mins > 0 && day.mins < goalMins;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                              day.isToday
                                ? 'border-[#4A90E2] ring-2 ring-[#4A90E2]/20 bg-blue-50/50'
                                : 'border-slate-200 bg-slate-50'
                            }`}
                          >
                            <span className="text-[11px] font-bold text-slate-500 block uppercase">
                              {day.dayLabel}
                            </span>
                            <div className="flex justify-center my-1">
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : isPartial ? (
                                <Clock className="w-5 h-5 text-[#FF9500]" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                              )}
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 block">
                              {day.mins} ph
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Account Footer & Logout button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                      Tài khoản đang đăng nhập: <strong className="text-slate-800">{currentStudent.fullName}</strong> ({currentStudent.className})
                    </div>
                    <button
                      onClick={onLogout}
                      className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors inline-flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng Xuất</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <Smile className="w-12 h-12 text-slate-400 mx-auto" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">
                      Chưa Có Học Sinh Nào Đăng Nhập
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Em vui lòng chuyển sang tab "Chuyển / Đăng Nhập" để chọn tài khoản của mình.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSubTab('login')}
                    className="px-5 py-2.5 rounded-xl bg-[#4A90E2] text-white font-bold text-xs shadow-2xs hover:bg-blue-600 transition-all inline-flex items-center gap-2"
                  >
                    <span>Đăng Nhập Ngay</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SELECT & LOGIN STUDENT */}
          {activeSubTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Mrs Nhan - THCS Chu Văn An Đăk Hà Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-4 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5 text-blue-100">
                    🎓 Lớp Học Tiếng Anh 6
                  </span>
                  <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-xs">
                    GDPT Mới
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-amber-300">
                  Mrs Nhan • THCS Chu Văn An Đăk Hà
                </h4>
                <p className="text-xs text-blue-100">
                  Em chọn đúng tên tài khoản học sinh của mình và nhập mã PIN 4 chữ số để vào học!
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  1. Chọn Tài Khoản Học Sinh Của Em:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {appData.students.map((st) => {
                    const isSelected = selectedStudentId === st.id;
                    const stTodayMins = Math.round(
                      (st.dailyLogs[todayStr]?.timeSpentSeconds || 0) / 60
                    );
                    return (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#4A90E2] bg-blue-50/50 shadow-2xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                          {st.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {st.fullName}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {st.className} • {st.schoolName || 'THCS Chu Văn An'} • {st.communeName || 'Thị trấn Đăk Hà'}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600 font-medium">
                            <span className="text-[#FF9500] font-bold">
                              {st.progress.totalXP} XP
                            </span>
                            <span>• Hôm nay: {stTodayMins} ph</span>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#4A90E2] shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PIN Code Verification */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#4A90E2]" />
                  2. Nhập Mã PIN Xác Thực (Mặc định: 1234 hoặc 2026):
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Nhập mã PIN 4 chữ số..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none tracking-widest font-mono"
                />
              </div>

              {loginError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  ⚠️ {loginError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Xác Nhận Đăng Nhập</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: REGISTER NEW STUDENT */}
          {activeSubTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-1 mb-2">
                <p className="font-extrabold text-blue-800 text-sm flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-[#4A90E2]" />
                  <span>Đăng Ký Học Sinh Mới</span>
                </p>
                <p className="text-blue-700">
                  Em vui lòng điền đầy đủ 4 thông tin bên dưới để đăng ký tài khoản học tập:
                </p>
              </div>

              {/* 1. Họ và Tên */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  1. Họ Và Tên Học Sinh: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none font-semibold"
                  required
                />
              </div>

              {/* 2. Lớp & 3. Trường */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                    2. Lớp: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={regClassName}
                    onChange={(e) => setRegClassName(e.target.value)}
                    placeholder="Ví dụ: Lớp 6A1"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                    3. Trường: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={regSchoolName}
                    onChange={(e) => setRegSchoolName(e.target.value)}
                    placeholder="Ví dụ: THCS Chu Văn An"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none font-semibold"
                    required
                  />
                </div>
              </div>

              {/* 4. Xã / Thị Trấn */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  4. Xã / Thị Trấn: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={regCommuneName}
                  onChange={(e) => setRegCommuneName(e.target.value)}
                  placeholder="Ví dụ: Thị trấn Đăk Hà"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#4A90E2] focus:outline-none font-semibold"
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  ⚠️ {loginError}
                </p>
              )}

              {regSuccessMsg && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  🎉 {regSuccessMsg}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Xác Nhận Đăng Ký Học Sinh</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: TEACHER AUTHENTICATION */}
          {activeSubTab === 'teacherLogin' && (
            <form onSubmit={handleTeacherLoginSubmit} className="space-y-5">
              {appData.isTeacherLoggedIn ? (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-xl">
                      👩‍🏫
                    </div>
                    <div>
                      <h4 className="font-extrabold text-purple-900 text-base">
                        {appData.teacherAccount.fullName}
                      </h4>
                      <p className="text-xs text-purple-700">
                        {appData.teacherAccount.schoolName} • @{appData.teacherAccount.username}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-purple-800 leading-relaxed bg-white/80 p-3 rounded-xl border border-purple-100 font-medium">
                    🟢 Bạn đang đăng nhập với quyền <strong>Giáo Viên Quản Lý Lớp Học</strong>. Bạn có toàn quyền thêm, sửa, xóa học sinh, đặt lại PIN và xem báo cáo chi tiết.
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenTeacherManagement();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition-all inline-flex items-center gap-2"
                    >
                      <span>Vào Trung Tâm Quản Lý Lớp Học</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onTeacherLogout}
                      className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors inline-flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng Xuất Giáo Viên</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-purple-800 text-sm">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>Xác Thực Tài Khoản Giáo Viên / Quản Lý</span>
                    </div>
                    <p className="text-purple-700">
                      Đăng nhập bằng Email Giáo viên để quản lý danh sách học sinh, đặt lại mã PIN và theo dõi báo cáo từng lớp học.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                        Email Giáo Viên:
                      </label>
                      <input
                        type="email"
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        placeholder="Nhập email đăng nhập..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                        Mật Khẩu Giáo Viên:
                      </label>
                      <input
                        type="password"
                        value={teacherPass}
                        onChange={(e) => setTeacherPass(e.target.value)}
                        placeholder="Nhập mật khẩu giáo viên..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  {teacherErr && (
                    <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                      ⚠️ {teacherErr}
                    </p>
                  )}

                  {teacherSuccess && (
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      🎉 {teacherSuccess}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors"
                    >
                      Hủy Bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Xác Nhận Đăng Nhập Giáo Viên</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Credit Footer */}
        <div className="bg-gradient-to-r from-slate-100 via-blue-50 to-slate-100 border-t border-slate-200 px-6 py-3 text-center">
          <p className="text-[11px] font-semibold text-slate-500 tracking-wide">
            ✨ Create by <span className="text-[#4A90E2] font-bold">Mrs Nhan</span> — <span className="text-indigo-600 font-bold">THCS Chu Văn An</span> — <span className="text-purple-600 font-bold">Đăk Hà</span> ✨
          </p>
        </div>
      </div>
    </div>
  );
};
