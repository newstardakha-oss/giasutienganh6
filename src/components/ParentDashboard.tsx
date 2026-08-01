import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Zap,
  BookOpen,
  Printer,
  Sparkles,
  ArrowUpRight,
  UserPlus,
  Key,
  Edit3,
  Trash2,
  ShieldCheck,
  Filter,
  Lock,
  X,
  Save,
  UserCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { AppDataSchema, StudentAccount, TeacherAccount } from '../types';
import { getTeacherStudents, exportTeacherBackupJSON } from '../services/storage';
import { TeacherManagementPanel } from './TeacherManagementPanel';

interface ParentDashboardProps {
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  onReviewTopicClick: (unitId: string) => void;
  onAddStudent?: (newStudent: StudentAccount) => void;
  onUpdateStudent?: (studentId: string, updatedFields: Partial<StudentAccount>) => void;
  onDeleteStudent?: (studentId: string) => void;
  onResetPin?: (studentId: string, newPin: string) => void;
  onOpenAuthModal?: () => void;
  // Admin-only teacher management
  onCreateActivationCode?: (assignedClasses?: string[]) => void;
  onDeleteActivationCode?: (code: string) => void;
  onDeactivateTeacher?: (teacherId: string) => void;
  onReactivateTeacher?: (teacherId: string) => void;
  onDeleteTeacher?: (teacherId: string) => void;
  onUpdateTeacherClasses?: (teacherId: string, classes: string[]) => void;
  onUpdateTeacherProfile?: (updates: { fullName?: string; schoolName?: string; newPassword?: string; oldPassword?: string }) => { success: boolean; error?: string };
  onOpenTeacherProfile?: () => void;
  onAddCustomClass?: (className: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  appData,
  currentTeacher,
  isAdmin,
  onReviewTopicClick,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onResetPin,
  onOpenAuthModal,
  onCreateActivationCode,
  onDeleteActivationCode,
  onDeactivateTeacher,
  onReactivateTeacher,
  onDeleteTeacher,
  onUpdateTeacherClasses,
  onUpdateTeacherProfile,
  onOpenTeacherProfile,
  onAddCustomClass,
}) => {
  const { progress, sessions, units, students, isTeacherLoggedIn } = appData;

  // Dashboard sub-tab: 'students' (default) or 'teachers' (admin only)
  const [dashboardTab, setDashboardTab] = useState<'students' | 'teachers'>('students');

  // Class Filter state
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  // Teacher Student Management Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<StudentAccount | null>(null);
  const [pinResetStudent, setPinResetStudent] = useState<StudentAccount | null>(null);
  const [newPinValue, setNewPinValue] = useState<string>('1234');

  // Form State for Add/Edit Student
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    className: 'Lớp 6A1',
    pinCode: '1234',
    avatar: '👨‍🎓',
    dailyGoalMinutes: 20,
  });

  // Filter students by class AND by teacher's managed classes
  const teacherStudents = getTeacherStudents(appData, appData.currentTeacherId);
  const filteredStudents = selectedClassFilter === 'all'
    ? teacherStudents
    : teacherStudents.filter((s) => s.className === selectedClassFilter);

  // Get available classes for this teacher
  const availableClasses = isTeacherLoggedIn
    ? (isAdmin
        ? ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6']
        : (currentTeacher?.managedClasses || []))
    : ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'];

  // Transform skill mastery for radar chart
  const skillData = Object.entries(progress.skillMastery).map(([skill, mastery]) => ({
    skill,
    mastery,
  }));

  // Sessions timeline for bar chart
  const recentSessionsData = sessions.slice(0, 7).map((s, idx) => ({
    name: `Lần ${sessions.length - idx}`,
    score: s.score,
    skill: s.skill,
  })).reverse();

  const handlePrintReport = () => {
    window.print();
  };

  const handleOpenAddModal = () => {
    setFormData({
      username: `hocsinh_${Date.now().toString().slice(-4)}`,
      fullName: '',
      className: selectedClassFilter !== 'all' ? selectedClassFilter : (availableClasses[0] || 'Lớp 6A1'),
      pinCode: '1234',
      avatar: '👨‍🎓',
      dailyGoalMinutes: 20,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (st: StudentAccount) => {
    setEditingStudent(st);
    setFormData({
      username: st.username,
      fullName: st.fullName,
      className: st.className,
      pinCode: st.pinCode || '1234',
      avatar: st.avatar,
      dailyGoalMinutes: st.dailyGoalMinutes || 20,
    });
  };

  const handleSaveStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    if (editingStudent) {
      // Update existing
      onUpdateStudent?.(editingStudent.id, {
        fullName: formData.fullName.trim(),
        className: formData.className,
        pinCode: formData.pinCode.trim() || '1234',
        avatar: formData.avatar,
        dailyGoalMinutes: Number(formData.dailyGoalMinutes) || 20,
      });
      setEditingStudent(null);
    } else {
      // Add new student
      const todayStr = new Date().toISOString().split('T')[0];
      const newStudent: StudentAccount = {
        id: `student-${Date.now()}`,
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        className: formData.className,
        pinCode: formData.pinCode.trim() || '1234',
        avatar: formData.avatar,
        dailyGoalMinutes: Number(formData.dailyGoalMinutes) || 20,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        progress: {
          studentName: formData.fullName.trim(),
          grade: 6,
          totalXP: 0,
          level: 1,
          streakDays: 1,
          lastStudyDate: todayStr,
          badges: [],
          weakTopics: [],
          skillMastery: {
            Listening: 80,
            Speaking: 75,
            Reading: 85,
            Writing: 70,
            Grammar: 80,
            Vocabulary: 85,
            Pronunciation: 75,
          },
          unitProgress: {},
        },
        sessions: [],
        dailyLogs: {},
      };
      onAddStudent?.(newStudent);
      setIsAddModalOpen(false);
    }
  };

  const handleConfirmResetPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinResetStudent || !newPinValue.trim()) return;
    onResetPin?.(pinResetStudent.id, newPinValue.trim());
    setPinResetStudent(null);
    setNewPinValue('1234');
  };

  const handleDeleteConfirm = (st: StudentAccount) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa học sinh ${st.fullName} (${st.className}) khỏi hệ thống?`)) {
      onDeleteStudent?.(st.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <BarChart3 className="w-4 h-4 text-[#FF9500]" />
            {isTeacherLoggedIn ? 'Trung Tâm Quản Lý Lớp Học Dành Cho Giáo Viên' : 'Báo Cáo Tiến Độ Dành Cho Phụ Huynh & Giáo Viên'}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isTeacherLoggedIn ? `Quản Lý Lớp Học • ${currentTeacher?.fullName || 'Giáo Viên'}` : 'Phân Tích Năng Lực & Lỗ Hổng Kiến Thức Lớp 6'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isTeacherLoggedIn
              ? `Trường: ${currentTeacher?.schoolName || ''} • ${isAdmin ? 'Admin - Quản lý toàn bộ GV & HS' : `Phụ trách: ${currentTeacher?.managedClasses.join(', ') || 'Chưa phân lớp'}`}`
              : 'Theo dõi chi tiết điểm số 4 kỹ năng, chuỗi học tập và lộ trình ôn tập được AI đề xuất.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {!isTeacherLoggedIn && (
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition-all inline-flex items-center gap-2 border border-purple-500"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Đăng Nhập Quyền Giáo Viên</span>
            </button>
          )}

          <button
            onClick={handlePrintReport}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-2xs hover:bg-slate-100 transition-all inline-flex items-center gap-2 border border-slate-200"
          >
            <Printer className="w-4 h-4 text-[#4A90E2]" />
            <span>In Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Toggle: Quản lý HS vs Quản lý GV */}
      {isAdmin && isTeacherLoggedIn && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDashboardTab('students')}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-sm transition-all ${
              dashboardTab === 'students'
                ? 'neu-btn-primary text-white shadow-md'
                : 'neu-btn text-slate-700 hover:text-indigo-600'
            }`}
          >
            👨‍🎓 Quản Lý Học Sinh
          </button>
          <button
            onClick={() => setDashboardTab('teachers')}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-sm transition-all ${
              dashboardTab === 'teachers'
                ? 'neu-btn-primary text-white shadow-md'
                : 'neu-btn text-slate-700 hover:text-purple-600'
            }`}
          >
            👑 Quản Lý Giáo Viên & Mã Kích Hoạt
          </button>
        </div>
      )}

      {/* Teacher Management Panel (Admin only) */}
      {isAdmin && isTeacherLoggedIn && dashboardTab === 'teachers' && (
        <TeacherManagementPanel
          appData={appData}
          onCreateActivationCode={onCreateActivationCode || (() => {})}
          onDeleteActivationCode={onDeleteActivationCode || (() => {})}
          onDeactivateTeacher={onDeactivateTeacher || (() => {})}
          onReactivateTeacher={onReactivateTeacher || (() => {})}
          onDeleteTeacher={onDeleteTeacher || (() => {})}
          onUpdateTeacherClasses={onUpdateTeacherClasses || (() => {})}
          onAddCustomClass={onAddCustomClass}
        />
      )}

      {/* Student Management Section - shown when dashboardTab is 'students' or for non-admin teachers */}
      {(!isAdmin || dashboardTab === 'students') && (
      <>
      {/* Teacher Status Alert Banner */}
      {isTeacherLoggedIn && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-3 text-xs text-purple-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
                {isAdmin ? '👑' : '👩‍🏫'}
              </div>
              <div>
                <span className="font-extrabold text-sm block text-purple-900">
                  {currentTeacher?.fullName || 'Giáo Viên'}
                </span>
                <span className="text-purple-600 text-[11px] block">
                  {currentTeacher?.email} • {currentTeacher?.schoolName}
                </span>
                <span className="text-purple-500 text-[11px] block">
                  Phụ trách: {currentTeacher?.managedClasses.length ? currentTeacher.managedClasses.join(', ') : 'Chưa phân lớp'}
                  {' • '}Tổng: {teacherStudents.length} học sinh
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
              {onOpenTeacherProfile && (
                <button
                  onClick={onOpenTeacherProfile}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-purple-700 font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 border border-purple-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa Hồ Sơ</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (appData.currentTeacherId) {
                    exportTeacherBackupJSON(appData, appData.currentTeacherId);
                  }
                }}
                className="px-3 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs transition-all flex items-center gap-1.5 border border-purple-300"
                title="Tải về file sao lưu dữ liệu danh sách học sinh & điểm số của lớp"
              >
                <span>📥 Xuất Dữ Liệu Lớp</span>
              </button>
              <button
                onClick={handleOpenAddModal}
                className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Thêm Học Sinh</span>
              </button>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] border border-blue-200">
              📚 {availableClasses.length} lớp
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[11px] border border-indigo-200">
              👨‍🎓 {teacherStudents.length} học sinh
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
              🟢 Server Pool: Đã kích hoạt
            </span>
            {isAdmin && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px] border border-amber-200">
                👑 Admin • {appData.teachers.length} GV trong hệ thống
              </span>
            )}
          </div>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Chuỗi Học Luyện</span>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#FF9500] fill-[#FF9500]" />
            <span className="text-2xl font-extrabold text-slate-900">
              {progress.streakDays} Ngày
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Học đều đặn mỗi ngày</span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Cấp Độ & Kinh Nghiệm</span>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#4A90E2] fill-[#4A90E2]" />
            <span className="text-2xl font-extrabold text-slate-900">
              Lv.{progress.level} ({progress.totalXP} XP)
            </span>
          </div>
          <span className="text-[10px] text-[#4A90E2] font-semibold block">Học Sinh Tích Cực</span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Số Bài Đã Làm</span>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#4A90E2]" />
            <span className="text-2xl font-extrabold text-slate-900">
              {sessions.length} Bài
            </span>
          </div>
          <span className="text-[10px] text-[#4A90E2] font-semibold block">Tương tác cùng AI</span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Điểm Trung Bình</span>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-500" />
            <span className="text-2xl font-extrabold text-slate-900">
              {sessions.length
                ? Math.round(
                    sessions.reduce((acc, s) => acc + s.score, 0) / sessions.length
                  )
                : 85}
              %
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Xếp loại: Học lực Khá Giỏi</span>
        </div>
      </div>

      {/* Student Login & Attendance Monitoring Section with Class Filter & Teacher Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Bảng Quản Lý & Theo Dõi Học Sinh Học Tập Hàng Ngày
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Danh sách học sinh, điểm số tích lũy, thời gian học hôm nay và trạng thái điểm danh.
            </p>
          </div>

          {/* Class Filter Bar & Teacher Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-[#4A90E2]" />
              <span>Lọc Lớp:</span>
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="bg-transparent font-extrabold text-[#4A90E2] outline-none cursor-pointer"
              >
                <option value="all">Tất Cả Các Lớp ({students.length})</option>
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {isTeacherLoggedIn && (
              <button
                onClick={handleOpenAddModal}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Thêm Học Sinh</span>
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Học Sinh</th>
                <th className="py-3 px-4">Lớp</th>
                <th className="py-3 px-4">Mã PIN</th>
                <th className="py-3 px-4">Mức Học Hôm Nay</th>
                <th className="py-3 px-4">XP & Cấp Độ</th>
                <th className="py-3 px-4">Chuỗi Ngày</th>
                <th className="py-3 px-4 text-center">Trạng Thái</th>
                {isTeacherLoggedIn && <th className="py-3 px-4 text-right">Thao Tác Giáo Viên</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.map((st) => {
                const todayStr = new Date().toISOString().split('T')[0];
                const todayLog = st.dailyLogs[todayStr];
                const todayMins = Math.round((todayLog?.timeSpentSeconds || 0) / 60);
                const goalMins = st.dailyGoalMinutes || 20;
                const isMetGoal = todayMins >= goalMins;
                const isStudied = todayMins > 0;

                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl leading-none">{st.avatar}</span>
                        <div>
                          <span className="block font-bold text-slate-900">{st.fullName}</span>
                          <span className="block text-[10px] text-slate-400 font-medium">
                            @{st.username}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{st.className}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                      {st.pinCode || '1234'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800">
                          {todayMins} / {goalMins} phút
                        </span>
                        <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isMetGoal ? 'bg-emerald-500' : 'bg-[#4A90E2]'
                            }`}
                            style={{
                              width: `${Math.min(100, (todayMins / goalMins) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#FF9500]">
                      {st.progress.totalXP} XP (Lv.{st.progress.level})
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-800">
                      🔥 {st.progress.streakDays} ngày
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isMetGoal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          🟢 Đã Đạt Chỉ Tiêu
                        </span>
                      ) : isStudied ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                          🟡 Đang Học
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-semibold">
                          ⚪ Chưa Học Hôm Nay
                        </span>
                      )}
                    </td>

                    {/* Teacher Actions Row */}
                    {isTeacherLoggedIn && (
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setPinResetStudent(st);
                              setNewPinValue(st.pinCode || '1234');
                            }}
                            title="Đặt lại mã PIN"
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(st)}
                            title="Chỉnh sửa thông tin"
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteConfirm(st)}
                            title="Xóa học sinh"
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Knowledge Gap Analysis Section */}
      <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FF9500]" />
            Lỗ Hổng Kiến Thức Cần Cải Thiện Cho Học Sinh (AI Detected)
          </span>
          <span className="text-xs font-semibold text-slate-400">Tự động phân tích</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progress.weakTopics.map((topic, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
                    Tỷ lệ lỗi: {topic.errorRate}%
                  </span>
                  <span className="text-[10px] font-bold text-amber-700">{topic.skill}</span>
                </div>
                <h4 className="text-xs font-bold text-amber-900">
                  {topic.topicName}
                </h4>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {topic.recommendation}
                </p>
              </div>

              <button
                onClick={() => onReviewTopicClick(topic.unitId)}
                className="w-full mt-2 py-2 rounded-xl bg-[#FF9500] hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs"
              >
                <span>Ôn Tập Ngay Vấn Đề Này</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart: Skill Breakdown */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4A90E2]" />
            Biểu Đồ Năng Lực 4 Kỹ Năng & Ngữ Pháp Tiếng Anh
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Mức độ thành thạo (%)"
                  dataKey="mastery"
                  stroke="#4A90E2"
                  fill="#4A90E2"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Recent Scores */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#4A90E2]" />
            Lịch Sử Điểm Số Các Bài Luyện Tập Gần Đây
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentSessionsData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="score" fill="#4A90E2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SGK Unit Progress Bars */}
      <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Tiến Độ Hoàn Thành Các Bài Học SGK Tiếng Anh 6 Global Success (Unit 1 - 12)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {units.map((u) => {
            const pct = progress.unitProgress[u.id] || 0;
            return (
              <div key={u.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    Unit {u.unitNumber}: {u.title}
                  </span>
                  <span className="font-bold text-[#4A90E2]">{pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#4A90E2] to-[#FF9500] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD / EDIT STUDENT MODAL FOR TEACHERS */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingStudent(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
                {editingStudent ? '✏️' : '➕'}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {editingStudent ? 'Chỉnh Sửa Học Sinh' : 'Thêm Học Sinh Mới'}
                </h3>
                <p className="text-xs text-slate-500">
                  Dành cho Giáo viên Quản lý Lớp học
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveStudentSubmit} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mã Học Sinh / Tên Đăng Nhập:
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. hocsinh6a1_01"
                  disabled={Boolean(editingStudent)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Họ Và Tên Học Sinh:
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Nguyễn Văn An"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Lớp Học:
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold"
                  >
                    {availableClasses.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mã PIN 4 số:
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingStudent ? 'Lưu Thay Đổi' : 'Tạo Học Sinh'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PIN MODAL FOR TEACHER */}
      {pinResetStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in">
            <button
              onClick={() => setPinResetStudent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                🔑
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Đặt Lại Mã PIN Học Sinh
                </h3>
                <p className="text-[11px] text-slate-500">
                  {pinResetStudent.fullName} ({pinResetStudent.className})
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmResetPin} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mã PIN Mới (4 chữ số):
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={newPinValue}
                  onChange={(e) => setNewPinValue(e.target.value)}
                  placeholder="e.g. 1234"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono font-bold tracking-widest text-center"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPinResetStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Xác Nhận Đổi PIN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};
