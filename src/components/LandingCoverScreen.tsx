import React, { useState } from 'react';
import {
  GraduationCap,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Swords,
  Mic,
  FileEdit,
  BarChart3,
  Lock,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  Award,
  ArrowRight,
  Smile,
  School,
  MapPin,
  Play,
  HeartHandshake,
  User,
  KeyRound
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
  const [activeTab, setActiveTab] = useState<'student' | 'register' | 'teacher'>('student');

  // Student login state: Tên đăng nhập & Mật khẩu
  const defaultStudent = appData.students[0];
  const [selectedStudentId, setSelectedStudentId] = useState<string>(appData.currentStudentId || defaultStudent?.id || '');
  const [loginUsername, setLoginUsername] = useState<string>(defaultStudent?.username || 'nguyenvanan');
  const [loginPassword, setLoginPassword] = useState<string>(defaultStudent?.pinCode || '1234');
  const [studentErr, setStudentErr] = useState<string>('');

  // Student register state: 6 trường (Họ tên, Trường, Lớp, Xã, Tên đăng nhập, Mật khẩu)
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

  const todayStr = getTodayDateString();

  // Auto-generate suggested username when name changes
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

  const features = [
    {
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      title: 'Gia Sư AI Socratic 5 Bước',
      desc: 'Hướng dẫn gợi mở bằng câu hỏi Socratic giúp em tự tư duy giải đáp.',
    },
    {
      icon: Sparkles,
      color: 'from-[#FF9500] to-amber-600',
      title: 'Trợ Lý Giải Bài Tập SGK',
      desc: 'Gợi ý 3 cấp độ thông minh không đưa đáp án sẵn cho câu hỏi SGK Tiếng Anh 6.',
    },
    {
      icon: Mic,
      color: 'from-emerald-500 to-teal-600',
      title: 'Phòng Luyện Phát Âm IPA',
      desc: 'Chấm điểm khẩu hình chuẩn âm IPA và nhận phản hồi chi tiết tức thì.',
    },
    {
      icon: FileEdit,
      color: 'from-purple-500 to-pink-600',
      title: 'Chuyên Gia Chấm Bài Viết',
      desc: 'Chấm điểm 4 tiêu chí chuẩn SGK Global Success kèm sửa lỗi câu văn.',
    },
    {
      icon: Swords,
      color: 'from-rose-500 to-red-600',
      title: 'Game Arena Đấu Tri Thức',
      desc: 'Đấu trắc nghiệm tính giờ tích lũy XP & vượt qua các thử thách leo rank.',
    },
    {
      icon: BarChart3,
      color: 'from-cyan-500 to-[#4A90E2]',
      title: 'Báo Cáo Tiến Độ Phụ Huynh',
      desc: 'Theo dõi điểm danh 7 ngày, chuỗi ngày học liên tục và biểu đồ kỹ năng.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-['Be_Vietnam_Pro',sans-serif] relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4A90E2] via-blue-600 to-[#FF9500] p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6 text-[#FF9500]" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                Gia Sư AI Tiếng Anh Lớp 6
              </h1>
              <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <span className="text-[#FF9500]">Global Success</span> • <span className="text-slate-300">Mrs Nhan • THCS Chu Văn An Đăk Hà</span>
              </p>
            </div>
          </div>

          <button
            onClick={onEnterAsGuest}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-[#FF9500] fill-[#FF9500]" />
            <span>Học Thử (Khách)</span>
          </button>
        </div>
      </header>

      {/* Main Content Hero & Auth Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Introduction */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Chương Trình Chuẩn GDPT Mới • Sách Tiếng Anh 6</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Chào Mừng Các Em Đến Với <br />
              <span className="bg-gradient-to-r from-[#4A90E2] via-blue-400 to-[#FF9500] bg-clip-text text-transparent">
                Lớp Học Tiếng Anh 6 AI
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
              Hệ thống trợ lý học tập cá nhân hóa được biên soạn dành riêng cho học sinh lớp 6. Giúp các em phát triển đều 4 kỹ năng: Nghe, Nói phát âm IPA, Đọc hiểu & Viết đoạn văn chuẩn mực.
            </p>

            {/* Badges Info */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-2">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-center">
                <span className="block text-xl font-extrabold text-[#FF9500]">12 Units</span>
                <span className="text-[11px] text-slate-400 font-medium">Toàn bộ SGK T1&T2</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-center">
                <span className="block text-xl font-extrabold text-blue-400">5 Bước</span>
                <span className="text-[11px] text-slate-400 font-medium">Phương Pháp Socratic</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-center">
                <span className="block text-xl font-extrabold text-emerald-400">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Tích Luỹ XP & Rank</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 font-medium flex items-center justify-center lg:justify-start gap-2">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>Biên soạn & Quản lý chuyên môn: <strong>Cô Nhạn — Trường THCS Chu Văn An Đăk Hà</strong></span>
            </div>
          </div>

          {/* Right Column: Interactive Login Box */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 backdrop-blur-xl relative overflow-hidden">
              
              {/* Tab Selector Header */}
              <div className="flex border-b border-slate-800 pb-4 gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('student')}
                  className={`flex-1 py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border ${
                    activeTab === 'student'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Học Sinh Đăng Nhập</span>
                </button>

                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border ${
                    activeTab === 'register'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Đăng Ký Mới</span>
                </button>

                <button
                  onClick={() => setActiveTab('teacher')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border ${
                    activeTab === 'teacher'
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                      : 'bg-purple-950/50 text-purple-300 hover:bg-purple-900/50 border-purple-800/80'
                  }`}
                  title="Dành Cho Giáo Viên"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-300" />
                  <span className="hidden sm:inline">Giáo Viên</span>
                </button>
              </div>

              {/* TAB 1: STUDENT LOGIN (Tên đăng nhập & Mật khẩu) */}
              {activeTab === 'student' && (
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  {/* Gợi ý chọn nhanh tài khoản đã có */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      1. Chọn Hoặc Nhập Tên Đăng Nhập Học Sinh:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-40 overflow-y-auto pr-1">
                      {appData.students.map((st) => {
                        const isSelected = selectedStudentId === st.id;
                        return (
                          <div
                            key={st.id}
                            onClick={() => handleSelectStudentCard(st)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-950/70 shadow-sm'
                                : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xl shrink-0">
                              {st.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-xs truncate">
                                {st.fullName}
                              </h4>
                              <p className="text-[10px] text-slate-400 truncate">
                                @{st.username} • {st.className}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input 1: Tên đăng nhập */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-400" />
                      Tên Đăng Nhập Học Sinh:
                    </label>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => {
                        setLoginUsername(e.target.value);
                        setStudentErr('');
                      }}
                      placeholder="Ví dụ: nguyenvanan hoặc hocsinh6a1..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                      required
                    />
                  </div>

                  {/* Input 2: Mật khẩu đăng nhập */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      Mật Khẩu Đăng Nhập:
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setStudentErr('');
                      }}
                      placeholder="Nhập mật khẩu (Mặc định: 1234)..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono font-bold"
                      required
                    />
                  </div>

                  {studentErr && (
                    <p className="text-xs font-bold text-rose-400 bg-rose-950/60 p-3 rounded-xl border border-rose-800">
                      ⚠️ {studentErr}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-[#4A90E2] hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Đăng Nhập Vào Học</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[11px] text-slate-400 pt-1">
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-blue-400 font-bold hover:underline"
                    >
                      Bấm vào đây để Đăng Ký Mới ➔
                    </button>
                  </p>
                </form>
              )}

              {/* TAB 2: REGISTER NEW STUDENT (6 trường: Họ tên, Trường, Lớp, Xã, Username, Password) */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-3 text-xs text-blue-200 space-y-0.5">
                    <p className="font-bold text-blue-300 flex items-center gap-1.5">
                      <UserPlus className="w-4 h-4 text-blue-400" />
                      <span>Đăng Ký Tài Khoản Học Sinh Mới</span>
                    </p>
                    <p className="text-[11px] text-blue-200">
                      Học sinh điền đủ 6 thông tin dưới đây. Sau khi đăng ký thành công, lần sau chỉ cần đăng nhập bằng Tên đăng nhập và Mật khẩu!
                    </p>
                  </div>

                  {/* 1. Họ và Tên */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      1. Họ Và Tên Học Sinh: <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                      required
                    />
                  </div>

                  {/* 2. Trường THCS & 3. Lớp Học */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                        2. Trường THCS: <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={regSchoolName}
                        onChange={(e) => setRegSchoolName(e.target.value)}
                        placeholder="THCS Chu Văn An"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                        3. Lớp Học: <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={regClassName}
                        onChange={(e) => {
                          setRegClassName(e.target.value);
                          setRegUsername(autoGenerateUsername(regFullName, e.target.value));
                        }}
                        placeholder="Ví dụ: 6A1, 6A2, 6B..."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                        required
                      />
                    </div>
                  </div>

                  {/* 4. Xã / Thị Trấn */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      4. Xã / Thị Trấn: <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={regCommuneName}
                      onChange={(e) => setRegCommuneName(e.target.value)}
                      placeholder="Thị trấn Đăk Hà"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                      required
                    />
                  </div>

                  {/* 5. Tên đăng nhập & 6. Mật khẩu đăng nhập */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                        5. Tên Đăng Nhập: <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        placeholder="nguyenvanan_6a1"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                        6. Mật Khẩu Đăng Nhập: <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Nhập mật khẩu (ví dụ: 1234)"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono font-bold"
                        required
                      />
                    </div>
                  </div>

                  {regErr && (
                    <p className="text-xs font-bold text-rose-400 bg-rose-950/60 p-3 rounded-xl border border-rose-800">
                      ⚠️ {regErr}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Hoàn Tất Đăng Ký & Vào Học</span>
                  </button>
                </form>
              )}

              {/* TAB 3: TEACHER LOGIN */}
              {activeTab === 'teacher' && (
                <form onSubmit={handleTeacherSubmit} className="space-y-4">
                  <div className="bg-purple-950/50 border border-purple-800/80 rounded-2xl p-4 text-xs text-purple-200 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-purple-300 text-sm">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>Xác Thực Giáo Viên Quản Lý Lớp</span>
                    </p>
                    <p className="text-purple-300">
                      Đăng nhập tài khoản Giáo viên để xem báo cáo học sinh, đặt mã PIN và quản lý lớp học.
                    </p>
                    <p className="text-[11px] font-mono text-purple-400 pt-1">
                      🔑 Mặc định: <strong>giaovien6</strong> | Mật khẩu: <strong>teacher2026</strong>
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Tên Đăng Nhập Giáo Viên:
                    </label>
                    <input
                      type="text"
                      value={teacherUser}
                      onChange={(e) => setTeacherUser(e.target.value)}
                      placeholder="giaovien6"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Mật Khẩu Giáo Viên:
                    </label>
                    <input
                      type="password"
                      value={teacherPass}
                      onChange={(e) => setTeacherPass(e.target.value)}
                      placeholder="teacher2026"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
                      required
                    />
                  </div>

                  {teacherErr && (
                    <p className="text-xs font-bold text-rose-400 bg-rose-950/60 p-3 rounded-xl border border-rose-800">
                      ⚠️ {teacherErr}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Xác Nhận Đăng Nhập Giáo Viên</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Feature Cards Showcase */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              6 Bộ Công Cụ Học Tập Thông Minh Đạt Chuẩn GDPT Mới
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Phát triển toàn diện kiến thức Ngữ pháp, Từ vựng, Phát âm IPA và Kỹ năng viết Lớp 6
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">
                    {f.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold">
            🎓 Gia Sư AI Tiếng Anh Lớp 6 — Smart Tutor Global Success
          </p>
          <p className="text-slate-400 font-medium">
            Biên soạn & Quản lý: <span className="text-amber-400 font-bold">Mrs Nhan</span> • <span className="text-blue-400 font-bold">THCS Chu Văn An</span> • <span className="text-indigo-400 font-bold">Đăk Hà</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
