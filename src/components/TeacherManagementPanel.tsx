import React, { useState } from 'react';
import { AppDataSchema } from '../types';
import {
  Shield, Users, Key, Copy, Trash2, CheckCircle2, XCircle, Crown, Edit3, Plus, Check,
  BarChart3, GraduationCap, PlusCircle
} from 'lucide-react';

interface TeacherManagementPanelProps {
  appData: AppDataSchema;
  onCreateActivationCode: (assignedClasses?: string[]) => void;
  onDeleteActivationCode: (code: string) => void;
  onDeactivateTeacher: (teacherId: string) => void;
  onReactivateTeacher: (teacherId: string) => void;
  onDeleteTeacher: (teacherId: string) => void;
  onUpdateTeacherClasses: (teacherId: string, classes: string[]) => void;
  onAddCustomClass?: (className: string) => void;
}

export const TeacherManagementPanel: React.FC<TeacherManagementPanelProps> = ({
  appData,
  onCreateActivationCode,
  onDeleteActivationCode,
  onDeactivateTeacher,
  onReactivateTeacher,
  onDeleteTeacher,
  onUpdateTeacherClasses,
  onAddCustomClass
}) => {
  const [activeTab, setActiveTab] = useState<'teachers' | 'codes' | 'stats'>('teachers');
  
  // Dynamic class list from appData
  const allClasses = (() => {
    const classSet = new Set<string>(['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6']);
    (appData.customClasses || []).forEach((c) => classSet.add(c));
    appData.teachers.forEach((t) => t.managedClasses.forEach((c) => classSet.add(c)));
    appData.students.forEach((s) => { if (s.className) classSet.add(s.className); });
    return Array.from(classSet).sort();
  })();
  const [editingClassesFor, setEditingClassesFor] = useState<string | null>(null);
  const [tempClasses, setTempClasses] = useState<string[]>([]);
  const [showClassSelectorForCode, setShowClassSelectorForCode] = useState(false);
  const [newCodeClasses, setNewCodeClasses] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newCustomClass, setNewCustomClass] = useState<string>('');

  const totalTeachers = appData.teachers.length;
  const activeTeachers = appData.teachers.filter(t => t.isActive).length;
  const inactiveTeachers = totalTeachers - activeTeachers;

  // Statistics
  const totalStudents = appData.students.length;
  const usedCodes = appData.activationCodes.filter(c => c.isUsed).length;
  const unusedCodes = appData.activationCodes.filter(c => !c.isUsed).length;
  
  // Students per class
  const studentsPerClass: Record<string, number> = {};
  appData.students.forEach((s) => {
    studentsPerClass[s.className] = (studentsPerClass[s.className] || 0) + 1;
  });
  
  // Students per teacher
  const getTeacherStudentCount = (teacher: typeof appData.teachers[0]): number => {
    if (teacher.role === 'admin') return totalStudents;
    if (teacher.managedClasses.length === 0) return 0;
    return appData.students.filter(s => teacher.managedClasses.includes(s.className)).length;
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleClass = (cls: string, currentSelected: string[], setFn: (val: string[]) => void) => {
    if (currentSelected.includes(cls)) {
      setFn(currentSelected.filter(c => c !== cls));
    } else {
      setFn([...currentSelected, cls]);
    }
  };

  const handleSaveClasses = (teacherId: string) => {
    onUpdateTeacherClasses(teacherId, tempClasses);
    setEditingClassesFor(null);
  };

  const startEditingClasses = (teacherId: string, classes: string[]) => {
    setTempClasses([...classes]);
    setEditingClassesFor(teacherId);
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa giáo viên ${name}?`)) {
      onDeleteTeacher(id);
    }
  };

  const handleDeleteCode = (code: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa mã kích hoạt ${code}?`)) {
      onDeleteActivationCode(code);
    }
  };

  const handleCreateCode = () => {
    onCreateActivationCode(showClassSelectorForCode ? newCodeClasses : []);
    setShowClassSelectorForCode(false);
    setNewCodeClasses([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in font-['Be_Vietnam_Pro']">
      {/* Title & Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 neu-card-purple">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Quản Trị Hệ Thống Giáo Viên
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Phân quyền và quản lý danh sách giáo viên, mã kích hoạt đăng ký
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'teachers' 
                  ? 'bg-white text-purple-700 shadow-sm neu-btn-primary' 
                  : 'text-slate-600 hover:bg-slate-200/50 neu-btn'
              }`}
            >
              👩‍🏫 Quản Lý Giáo Viên
            </button>
            <button
              onClick={() => setActiveTab('codes')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'codes' 
                  ? 'bg-white text-purple-700 shadow-sm neu-btn-primary' 
                  : 'text-slate-600 hover:bg-slate-200/50 neu-btn'
              }`}
            >
              🔑 Mã Kích Hoạt
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'stats' 
                  ? 'bg-white text-purple-700 shadow-sm neu-btn-primary' 
                  : 'text-slate-600 hover:bg-slate-200/50 neu-btn'
              }`}
            >
              📊 Thống Kê
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'teachers' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100 flex items-center justify-between shadow-sm neu-card-purple">
              <div>
                <span className="text-xs font-bold text-purple-600 block mb-1">Tổng Số Giáo Viên</span>
                <span className="text-2xl font-extrabold text-purple-900">{totalTeachers}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-200/50 flex items-center justify-center text-purple-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex items-center justify-between shadow-sm neu-card-mint">
              <div>
                <span className="text-xs font-bold text-emerald-600 block mb-1">Đang Hoạt Động</span>
                <span className="text-2xl font-extrabold text-emerald-900">{activeTeachers}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-200/50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100 flex items-center justify-between shadow-sm neu-card-yellow">
              <div>
                <span className="text-xs font-bold text-rose-600 block mb-1">Ngừng Hoạt Động</span>
                <span className="text-2xl font-extrabold text-rose-900">{inactiveTeachers}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-200/50 flex items-center justify-center text-rose-600">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Teacher Table */}
          <div className="bg-white rounded-2xl shadow-2xs border border-slate-200 overflow-hidden neu-card-blue">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">STT</th>
                    <th className="py-3 px-4">Họ Tên / Email</th>
                    <th className="py-3 px-4">Trường</th>
                    <th className="py-3 px-4">Lớp Phụ Trách</th>
                    <th className="py-3 px-4 text-center">Số HS</th>
                    <th className="py-3 px-4">Vai Trò</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {appData.teachers.map((teacher, index) => {
                    const isAdmin = teacher.role === 'admin';
                    const isEditingClasses = editingClassesFor === teacher.id;
                    return (
                      <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-500">{index + 1}</td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            {teacher.fullName}
                            {isAdmin && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{teacher.email}</div>
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-700">{teacher.schoolName}</td>
                        <td className="py-4 px-4">
                          {isEditingClasses ? (
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-1.5">
                                {allClasses.map(cls => (
                                  <label key={cls} className="flex items-center gap-1.5 text-[10px] font-medium bg-slate-100 px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                                    <input
                                      type="checkbox"
                                      checked={tempClasses.includes(cls)}
                                      onChange={() => handleToggleClass(cls, tempClasses, setTempClasses)}
                                      className="rounded text-purple-600 focus:ring-purple-500 w-3 h-3 border-slate-300"
                                    />
                                    {cls}
                                  </label>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveClasses(teacher.id)}
                                  className="text-[10px] font-bold px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors neu-btn-primary"
                                >
                                  Lưu
                                </button>
                                <button
                                  onClick={() => setEditingClassesFor(null)}
                                  className="text-[10px] font-bold px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors neu-btn"
                                >
                                  Hủy
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <div className="flex flex-wrap gap-1">
                                {teacher.managedClasses.length > 0 ? (
                                  teacher.managedClasses.map(cls => (
                                    <span key={cls} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 badge-pastel-purple">
                                      {cls}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">Chưa phân công</span>
                                )}
                              </div>
                              {!isAdmin && (
                                <button
                                  onClick={() => startEditingClasses(teacher.id, teacher.managedClasses)}
                                  className="p-1 rounded bg-slate-100 text-slate-400 hover:text-purple-600 hover:bg-purple-50 opacity-0 group-hover:opacity-100 transition-all"
                                  title="Chỉnh sửa lớp"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-sm border border-indigo-200">
                            {getTeacherStudentCount(teacher)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {isAdmin ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold badge-pastel-yellow">
                              <Shield className="w-3 h-3" /> Quản trị viên
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                              <Users className="w-3 h-3" /> Giáo viên
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {teacher.isActive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                              Đang hoạt động
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                              Đã khóa
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {!isAdmin && (
                            <div className="flex items-center justify-end gap-1.5">
                              {teacher.isActive ? (
                                <button
                                  onClick={() => onDeactivateTeacher(teacher.id)}
                                  title="Khóa tài khoản"
                                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => onReactivateTeacher(teacher.id)}
                                  title="Mở khóa tài khoản"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteTeacher(teacher.id, teacher.fullName)}
                                title="Xóa giáo viên"
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'codes' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Create Code Area */}
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-4 neu-card-blue">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">Tạo Mã Kích Hoạt Mới</h3>
                <p className="text-xs text-slate-500">
                  Cấp mã để giáo viên mới có thể tự tạo tài khoản
                </p>
              </div>
              <button
                onClick={() => setShowClassSelectorForCode(!showClassSelectorForCode)}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 underline"
              >
                {showClassSelectorForCode ? 'Ẩn gán lớp' : 'Gán lớp trước (tùy chọn)'}
              </button>
            </div>
            
            {showClassSelectorForCode && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 block">Chọn lớp để tự động gán khi giáo viên đăng ký bằng mã này:</span>
                <div className="flex flex-wrap gap-2">
                  {allClasses.map(cls => (
                    <label key={cls} className="flex items-center gap-1.5 text-xs font-medium bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-purple-300">
                      <input
                        type="checkbox"
                        checked={newCodeClasses.includes(cls)}
                        onChange={() => handleToggleClass(cls, newCodeClasses, setNewCodeClasses)}
                        className="rounded text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 border-slate-300"
                      />
                      {cls}
                    </label>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    value={newCustomClass}
                    onChange={(e) => setNewCustomClass(e.target.value)}
                    placeholder="Nhập tên lớp mới (VD: Lớp 7A1)..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCustomClass.trim() && onAddCustomClass) {
                        onAddCustomClass(newCustomClass.trim());
                        setNewCustomClass('');
                      }
                    }}
                    disabled={!newCustomClass.trim()}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs transition-all flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Thêm Lớp
                  </button>
                </div>
              </div>
            )}
            
            <button
              onClick={handleCreateCode}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-2xs transition-all flex items-center gap-2 neu-btn-primary w-fit"
            >
              <Plus className="w-4 h-4" />
              Tạo Mã Kích Hoạt
            </button>
          </div>

          {/* Codes Table */}
          <div className="bg-white rounded-2xl shadow-2xs border border-slate-200 overflow-hidden">
            {appData.activationCodes.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                Chưa có mã kích hoạt nào được tạo.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Mã</th>
                      <th className="py-3 px-4">Ngày Tạo</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4">Lớp Sẽ Gán</th>
                      <th className="py-3 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {appData.activationCodes.map((code) => {
                      const dateStr = new Date(code.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      });
                      let usedByName = '';
                      if (code.isUsed && code.usedBy) {
                        const t = appData.teachers.find(t => t.id === code.usedBy);
                        usedByName = t ? t.fullName : code.usedBy;
                      }

                      return (
                        <tr key={code.code} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
                              <span className="font-mono font-bold text-slate-800 tracking-wider text-sm">{code.code}</span>
                              <button
                                onClick={() => handleCopyCode(code.code)}
                                className="text-slate-400 hover:text-purple-600 transition-colors p-0.5"
                                title="Sao chép"
                              >
                                {copiedCode === code.code ? (
                                  <Check className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-medium">{dateStr}</td>
                          <td className="py-3.5 px-4">
                            {code.isUsed ? (
                              <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold">
                                  Đã sử dụng
                                </span>
                                <div className="text-[10px] text-slate-400">bởi {usedByName}</div>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                Chưa sử dụng
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {code.assignedClasses && code.assignedClasses.length > 0 ? (
                                code.assignedClasses.map(cls => (
                                  <span key={cls} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-200">
                                    {cls}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">-</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {!code.isUsed && (
                              <button
                                onClick={() => handleDeleteCode(code.code)}
                                title="Xóa mã"
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors inline-block"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-xs font-bold text-purple-600">Giáo Viên</span>
              </div>
              <span className="text-3xl font-extrabold text-purple-900">{totalTeachers}</span>
              <div className="mt-1 text-[10px] text-purple-500">
                {activeTeachers} hoạt động • {inactiveTeachers} ngừng
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-blue-600">Học Sinh</span>
              </div>
              <span className="text-3xl font-extrabold text-blue-900">{totalStudents}</span>
              <div className="mt-1 text-[10px] text-blue-500">
                Trên {Object.keys(studentsPerClass).length} lớp học
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-600">Mã Đã Dùng</span>
              </div>
              <span className="text-3xl font-extrabold text-emerald-900">{usedCodes}</span>
              <div className="mt-1 text-[10px] text-emerald-500">
                / {usedCodes + unusedCodes} mã tổng cộng
              </div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-amber-600">Mã Còn Trống</span>
              </div>
              <span className="text-3xl font-extrabold text-amber-900">{unusedCodes}</span>
              <div className="mt-1 text-[10px] text-amber-500">
                Sẵn sàng cấp cho GV mới
              </div>
            </div>
          </div>

          {/* Students per Class */}
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Phân Bố Học Sinh Theo Lớp
            </h3>
            {Object.keys(studentsPerClass).length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">Chưa có học sinh nào trong hệ thống.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Object.entries(studentsPerClass).sort(([a], [b]) => a.localeCompare(b)).map(([cls, count]) => (
                  <div key={cls} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 text-center">
                    <div className="text-2xl font-extrabold text-indigo-700">{count}</div>
                    <div className="text-[11px] font-bold text-indigo-500 mt-1">{cls}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Teachers Detail */}
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Chi Tiết Giáo Viên & Số Học Sinh
            </h3>
            <div className="space-y-3">
              {appData.teachers.map((teacher) => {
                const studentCount = getTeacherStudentCount(teacher);
                const isAdminRole = teacher.role === 'admin';
                return (
                  <div key={teacher.id} className={`flex items-center justify-between p-3 rounded-xl border ${
                    isAdminRole ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                        isAdminRole ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {isAdminRole ? '👑' : '👩🏫'}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          {teacher.fullName}
                          {!teacher.isActive && <span className="text-[10px] text-rose-500 font-bold">• Đã khóa</span>}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {teacher.email} • {teacher.managedClasses.length ? teacher.managedClasses.join(', ') : 'Tất cả lớp'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-xl font-extrabold text-indigo-700">{studentCount}</div>
                        <div className="text-[10px] text-indigo-500 font-bold">học sinh</div>
                      </div>
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${totalStudents > 0 ? Math.min((studentCount / totalStudents) * 100, 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Classes Management */}
          <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-teal-600" />
              Quản Lý Danh Sách Lớp Học
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {allClasses.map((cls) => {
                const count = studentsPerClass[cls] || 0;
                const isCustom = !((['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'] as string[]).includes(cls));
                return (
                  <span key={cls} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                    isCustom
                      ? 'bg-teal-50 text-teal-700 border-teal-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {cls}
                    <span className="text-[10px] opacity-60">({count} HS)</span>
                    {isCustom && <span className="text-[9px] text-teal-500">★ custom</span>}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCustomClass}
                onChange={(e) => setNewCustomClass(e.target.value)}
                placeholder="Nhập tên lớp mới (VD: Lớp 7A1, Lớp 6B1)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCustomClass.trim() && onAddCustomClass) {
                    onAddCustomClass(newCustomClass.trim());
                    setNewCustomClass('');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (newCustomClass.trim() && onAddCustomClass) {
                    onAddCustomClass(newCustomClass.trim());
                    setNewCustomClass('');
                  }
                }}
                disabled={!newCustomClass.trim()}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Thêm Lớp Mới
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">💡 Lớp tùy chỉnh sẽ xuất hiện khi phân lớp cho GV và khi tạo mã kích hoạt.</p>
          </div>
        </div>
      )}
    </div>
  );
};
