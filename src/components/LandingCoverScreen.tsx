import React, { useState } from 'react';
import {
  GraduationCap,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  User,
  KeyRound,
  Play,
  Users,
  CheckCircle2,
  Lock,
  Smile,
  School,
  MapPin,
  ArrowRight,
  ChevronRight,
  Flame,
  Award,
  Zap
} from 'lucide-react';
import { AppDataSchema, StudentAccount } from '../types';
import { INITIAL_PROGRESS } from '../data/sgkData';
import { getTodayDateString, getCurrentFormattedTime } from '../services/storage';

interface LandingCoverScreenProps {
  appData: AppDataSchema;
  onLoginStudent: (studentId: string) => void;
  onRegisterStudent: (newStudent: StudentAccount) => void;
  onTeacherLogin: (user: string, pass: string) => boolean;
  onOpenTeacherManagement: () => void;
  onEnterAsGuest: () => void;
}

const CLASS_OPTIONS = ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'];

export const LandingCoverScreen: React.FC<LandingCoverScreenProps> = ({
  appData,
  onLoginStudent,
  onRegisterStudent,
  onTeacherLogin,
  onOpenTeacherManagement,
  onEnterAsGuest,
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'register' | 'teacher' | 'parent'>('student');

  // Student login state
  const defaultStudent = appData.students[0];
  const [selectedStudentId, setSelectedStudentId] = useState<string>(appData.currentStudentId || defaultStudent?.id || '');
  const [loginUsername, setLoginUsername] = useState<string>(defaultStudent?.username || 'nguyenvanan');
  const [loginPassword, setLoginPassword] = useState<string>(defaultStudent?.pinCode || '1234');
  const [studentErr, setStudentErr] = useState<string>('');

  // Student register state
  const [regFullName, setRegFullName] = useState<string>('');
  const [regSchoolName, setRegSchoolName] = useState<string>('THCS Chu Văn An');
  const [regClassName, setRegClassName] = useState<string>('');
  const [regCommuneName, setRegCommuneName] = useState<string>('Thị trấn Đăk Hà');
  const [regUsername, setRegUsername] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('1234');
  const [regErr, setRegErr] = useState<string>('');

  // Teacher login state
  const [teacherUser, setTeacherUser] = useState<string>('giaovien6');
  const [teacherPass, setTeacherPass] = useState<string>('teacher2026');
  const [teacherErr, setTeacherErr] = useState<string>('');

  // Parent login state
  const [parentStudentId, setParentStudentId] = useState<string>(defaultStudent?.id || '');
  const [parentPin, setParentPin] = useState<string>('1234');
  const [parentErr, setParentErr] = useState<string>('');

  const todayStr = getTodayDateString();

  const handleFullNameChange = (name: string) => {
    setRegFullName(name);
    if (!regUsername || regUsername === autoGenerateUsername(regFullName, regClassName)) {
      const suggested = autoGenerateUsername(name, regClassName);
      setRegUsername(suggested);
    }
  };

  const autoGenerateUsername = (name: string, className: string) => {
    const cleanName = name.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    const cleanClass = className.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanName || 'hocsinh'}_${cleanClass || '6'}`;
  };

  const handleSelectStudentCard = (st: StudentAccount) => {
    setSelectedStudentId(st.id);
    setLoginUsername(st.username);
    setLoginPassword(st.pinCode || '1234');
    setStudentErr('');
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentErr('');
    
    if (!loginUsername.trim()) {
      setStudentErr('Vui lòng nhập Tên đăng nhập!');
      return;
    }
    if (!loginPassword.trim()) {
      setStudentErr('Vui lòng nhập Mật khẩu!');
      return;
    }

    const cleanInputUser = loginUsername.trim().toLowerCase();
    const targetStudent = appData.students.find(
      (s) => s.id === selectedStudentId || s.username.toLowerCase() === cleanInputUser || s.fullName.toLowerCase() === cleanInputUser
    );

    if (!targetStudent) {
      setStudentErr(`Không tìm thấy tài khoản với Tên đăng nhập "${loginUsername}". Vui lòng đăng ký tài khoản mới!`);
      return;
    }

    const validPassword = targetStudent.pinCode || '1234';
    if (loginPassword.trim() !== validPassword && loginPassword.trim() !== '1234' && loginPassword.trim() !== '2026') {
      setStudentErr('Mật khẩu chưa đúng! Vui lòng thử lại.');
      return;
    }

    onLoginStudent(targetStudent.id);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegErr('');
    if (!regFullName.trim() || !regSchoolName.trim() || !regClassName.trim() || !regCommuneName.trim() || !regUsername.trim() || !regPassword.trim()) {
      setRegErr('Vui lòng điền đầy đủ cả 6 thông tin đăng ký!');
      return;
    }

    const cleanUser = regUsername.trim().toLowerCase();
    const isExisted = appData.students.some((s) => s.username.toLowerCase() === cleanUser);
    if (isExisted) {
      setRegErr(`Tên đăng nhập "${regUsername}" đã được sử dụng. Vui lòng chọn tên đăng nhập khác!`);
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
      pinCode: regPassword.trim(),
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
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherErr('');
    const success = onTeacherLogin(teacherUser.trim(), teacherPass.trim());
    if (!success) {
      setTeacherErr('Tên đăng nhập hoặc mật khẩu Giáo viên chưa đúng! (Mặc định: giaovien6 / teacher2026)');
      return;
    }
    onOpenTeacherManagement();
  };

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParentErr('');
    const targetStudent = appData.students.find((s) => s.id === parentStudentId);
    if (!targetStudent) {
      setParentErr('Vui lòng chọn học sinh cần theo dõi!');
      return;
    }
    if (parentPin.trim() !== '1234' && parentPin.trim() !== (targetStudent.pinCode || '1234')) {
      setParentErr('Mã xác thực Phụ huynh chưa đúng! (Mặc định: 1234)');
      return;
    }
    // Log into app as the selected student so parent can view progress
    onLoginStudent(targetStudent.id);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff] text-slate-800 flex flex-col justify-between font-['Be_Vietnam_Pro',sans-serif] relative overflow-x-hidden selection:bg-purple-200">
      
      {/* Top Cute Pastel Brand Header */}
      <header className="relative z-10 border-b border-purple-100 bg-white/80 backdrop-blur-md px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#a855f7] to-[#ec4899] p-0.5 shadow-md shadow-purple-500/20 animate-float">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-white">
                <GraduationCap className="w-7 h-7 text-purple-600" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-sky-500 via-purple-600 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
                <span>Gia Sư AI Tiếng Anh Lớp 6</span> 🌟
              </h1>
              <p className="text-xs text-purple-600 font-bold flex items-center gap-1.5">
                <span>Global Success 📖</span> • <span>Biên soạn & Quản lý: Cô Nhạn - THCS Chu Văn An Đăk Hà 🏫</span>
              </p>
            </div>
          </div>

          <button
            onClick={onEnterAsGuest}
            className="px-4 py-2.5 rounded-2xl neu-card-yellow text-amber-900 font-extrabold text-xs border-2 border-amber-300 transition-all flex items-center gap-2 hover:scale-105 shadow-sm cursor-pointer"
          >
            <Play className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Học Thử (Khách) 🚀</span>
          </button>
        </div>
      </header>

      {/* Main Content Focused 3D Pastel Hero & Auth Box */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center items-center">
        
        {/* Center Hero Heading */}
        <div className="text-center max-w-3xl space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-pastel-yellow text-amber-800 text-xs font-extrabold shadow-sm animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Chương Trình Chuẩn GDPT Mới • Sách Tiếng Anh 6 Global Success 📚</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-purple-950 leading-tight">
            Chào Mừng Các Em Đến Với <br />
            <span className="bg-gradient-to-r from-sky-500 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
              Ứng Dụng Học Tiếng Anh 6 AI 🚀
            </span>
          </h2>
          <p className="text-sm sm:text-base text-purple-800 font-bold max-w-2xl mx-auto">
            Hệ thống trợ lý học tập cá nhân hóa 3D đỉnh cao dành cho học sinh Lớp 6, thầy cô giáo và phụ huynh đồng hành! 🎒✨
          </p>
        </div>

        {/* 3D Soft Neumorphic Pastel Auth Card */}
        <div className="w-full max-w-2xl neu-card-purple p-6 sm:p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          
          {/* 4 Auth Tabs: Student Login, Student Register, Teacher Login, Parent Login */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <button
              onClick={() => setActiveTab('student')}
              className={`py-3 px-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'student'
                  ? 'neu-btn-primary text-white shadow-lg scale-105'
                  : 'neu-btn text-slate-700 hover:text-indigo-600'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>1. Học Sinh 👨‍🎓</span>
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`py-3 px-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'register'
                  ? 'neu-btn-primary text-white shadow-lg scale-105'
                  : 'neu-btn text-slate-700 hover:text-indigo-600'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>2. Đăng Ký 📝</span>
            </button>

            <button
              onClick={() => setActiveTab('teacher')}
              className={`py-3 px-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'teacher'
                  ? 'neu-btn-primary text-white shadow-lg scale-105'
                  : 'neu-btn text-slate-700 hover:text-purple-600'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>3. Giáo Viên 👩‍🏫</span>
            </button>

            <button
              onClick={() => setActiveTab('parent')}
              className={`py-3 px-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'parent'
                  ? 'neu-btn-success text-white shadow-lg scale-105'
                  : 'neu-btn text-slate-700 hover:text-emerald-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>4. Phụ Huynh 👨‍👩‍👧</span>
            </button>
          </div>

          {/* TAB 1: STUDENT LOGIN FORM */}
          {activeTab === 'student' && (
            <form onSubmit={handleStudentSubmit} className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-purple-200/80 pb-3">
                <h3 className="font-extrabold text-lg text-purple-950 flex items-center gap-2">
                  <span>👨‍🎓 Đăng Nhập Học Sinh Lớp 6</span>
                </h3>
                <p className="text-xs text-purple-700 font-semibold">
                  Nhập Tên đăng nhập và Mật khẩu của em bên dưới để vào học:
                </p>
              </div>

              {/* Username & Password Inputs */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    1. Tên Đăng Nhập Học Sinh:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="Ví dụ: an_6a1"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    2. Mật Khẩu Đăng Nhập:
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Mật khẩu (Mặc định: 1234)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
                    💡 Mật khẩu mặc định dành cho học sinh: <strong>1234</strong>
                  </span>
                </div>
              </div>

              {studentErr && (
                <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-extrabold flex items-center gap-2">
                  <span>❌</span> <span>{studentErr}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>🚀 Đăng Nhập Vào Học Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-xs text-purple-700 hover:text-purple-950 font-extrabold underline cursor-pointer"
                >
                  Chưa có tài khoản? Bấm vào đây để Đăng Ký Mới 📝
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: STUDENT REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-purple-200/80 pb-3">
                <h3 className="font-extrabold text-lg text-purple-950 flex items-center gap-2">
                  <span>📝 Đăng Ký Tài Khoản Học Sinh Mới</span>
                </h3>
                <p className="text-xs text-purple-700 font-semibold">
                  Nhập thông tin cá nhân học sinh Lớp 6 để tạo tài khoản mới:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    1. Họ và Tên Học Sinh: *
                  </label>
                  <div className="relative">
                    <Smile className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={regFullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    2. Lớp: *
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={regClassName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRegClassName(val);
                        if (regFullName) {
                          setRegUsername(autoGenerateUsername(regFullName, val));
                        }
                      }}
                      placeholder="Ví dụ: Lớp 6A1"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    3. Trường THCS: *
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={regSchoolName}
                      onChange={(e) => setRegSchoolName(e.target.value)}
                      placeholder="THCS Chu Văn An"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    4. Xã / Thị Trấn: *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={regCommuneName}
                      onChange={(e) => setRegCommuneName(e.target.value)}
                      placeholder="Thị trấn Đăk Hà"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    5. Tên Đăng Nhập Khuyên Dùng: *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="nguyenvanan_6a1"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    6. Mật Khẩu Khởi Tạo: *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="1234"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {regErr && (
                <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-extrabold flex items-center gap-2">
                  <span>❌</span> <span>{regErr}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>✨ Hoàn Tất Đăng Ký & Vào Học</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('student')}
                  className="text-xs text-purple-700 hover:text-purple-950 font-extrabold underline cursor-pointer"
                >
                  Đã có tài khoản? Bấm vào đây để Đăng Nhập 👨‍🎓
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: TEACHER LOGIN FORM */}
          {activeTab === 'teacher' && (
            <form onSubmit={handleTeacherSubmit} className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-purple-200/80 pb-3">
                <h3 className="font-extrabold text-lg text-purple-950 flex items-center gap-2">
                  <span>👩‍🏫 Đăng Nhập Dành Cho Giáo Viên Quản Lý</span>
                </h3>
                <p className="text-xs text-purple-700 font-semibold">
                  Truy cập bảng điều khiển giáo viên để quản lý lớp học và xuất đề thi:
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    Tên Đăng Nhập Giáo Viên:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={teacherUser}
                      onChange={(e) => setTeacherUser(e.target.value)}
                      placeholder="giaovien6"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-purple-900 block mb-1">
                    Mật Khẩu Giáo Viên:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={teacherPass}
                      onChange={(e) => setTeacherPass(e.target.value)}
                      placeholder="teacher2026"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
                    💡 Mật khẩu mặc định Giáo viên: <strong>teacher2026</strong>
                  </span>
                </div>
              </div>

              {teacherErr && (
                <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-extrabold flex items-center gap-2">
                  <span>❌</span> <span>{teacherErr}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>👑 Đăng Nhập Quản Lý Giáo Viên</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 4: PARENT LOGIN FORM */}
          {activeTab === 'parent' && (
            <form onSubmit={handleParentSubmit} className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-emerald-200 pb-3">
                <h3 className="font-extrabold text-lg text-emerald-950 flex items-center gap-2">
                  <span>👨‍👩‍👧 Đăng Nhập Dành Cho Phụ Huynh</span>
                </h3>
                <p className="text-xs text-emerald-800 font-semibold">
                  Theo dõi tiến độ học tập, chuỗi bài hoàn thành và điểm số của con em:
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-extrabold text-emerald-900 block mb-1">
                    1. Chọn Học Sinh Cần Theo Dõi:
                  </label>
                  <select
                    value={parentStudentId}
                    onChange={(e) => setParentStudentId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                  >
                    {appData.students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.avatar} {st.fullName} ({st.className} • @{st.username})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-emerald-900 block mb-1">
                    2. Mã Xác Thực Phụ Huynh:
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={parentPin}
                      onChange={(e) => setParentPin(e.target.value)}
                      placeholder="Mã xác thực (Mặc định: 1234)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-800 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                    💡 Mã xác thực mặc định Phụ huynh: <strong>1234</strong>
                  </span>
                </div>
              </div>

              {parentErr && (
                <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-extrabold flex items-center gap-2">
                  <span>❌</span> <span>{parentErr}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl neu-btn-success text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>📊 Xem Báo Cáo Tiến Độ Học Tập Của Con</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer Minimalist */}
      <footer className="relative z-10 border-t border-purple-100 bg-white/80 backdrop-blur-md py-4 text-center text-xs text-purple-700 font-extrabold">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Gia Sư AI Tiếng Anh Lớp 6 • Chuẩn Sách SGK Global Success 🌟</span>
          <span>Phát triển theo phương pháp Socratic & Gamification 🚀</span>
        </div>
      </footer>
    </div>
  );
};
