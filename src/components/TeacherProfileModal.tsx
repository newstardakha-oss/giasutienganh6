import React, { useState } from 'react';
import { TeacherAccount } from '../types';
import { X, Save, User, Mail, School, Lock, Key, Shield, BookOpen } from 'lucide-react';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: TeacherAccount;
  onUpdateProfile: (updates: { fullName?: string; schoolName?: string; newPassword?: string; oldPassword?: string }) => { success: boolean; error?: string };
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onUpdateProfile,
}) => {
  const [fullName, setFullName] = useState(teacher.fullName);
  const [schoolName, setSchoolName] = useState(teacher.schoolName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const updates: any = {};
    if (fullName.trim() !== teacher.fullName) updates.fullName = fullName.trim();
    if (schoolName.trim() !== teacher.schoolName) updates.schoolName = schoolName.trim();

    if (showPasswordSection && newPassword) {
      if (newPassword !== confirmPassword) {
        setError('Mật khẩu mới và xác nhận không khớp!');
        return;
      }
      if (newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự!');
        return;
      }
      updates.oldPassword = oldPassword;
      updates.newPassword = newPassword;
    }

    if (Object.keys(updates).length === 0) {
      setError('Chưa có thay đổi nào!');
      return;
    }

    const result = onUpdateProfile(updates);
    if (result.success) {
      setSuccess('✅ Cập nhật hồ sơ thành công!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);
      setTimeout(() => { setSuccess(''); onClose(); }, 1500);
    } else {
      setError(result.error || 'Có lỗi xảy ra!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-t-3xl p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              {teacher.role === 'admin' ? '👑' : '👩‍🏫'}
            </div>
            <div>
              <h2 className="text-xl font-extrabold">Hồ Sơ Giáo Viên</h2>
              <p className="text-sm text-white/80">
                {teacher.role === 'admin' ? 'Quản trị viên hệ thống' : 'Giáo viên bộ môn'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
          {/* Read-only info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mb-1">
                <Mail className="w-3.5 h-3.5" /> Email (không đổi)
              </div>
              <p className="text-sm font-bold text-slate-800 truncate">{teacher.email}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mb-1">
                <Shield className="w-3.5 h-3.5" /> Vai trò
              </div>
              <p className="text-sm font-bold text-slate-800">
                {teacher.role === 'admin' ? '👑 Admin' : '👩‍🏫 Giáo viên'}
              </p>
            </div>
          </div>

          {/* Managed Classes (read-only) */}
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 text-xs text-blue-600 font-bold mb-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Lớp phụ trách
            </div>
            <div className="flex flex-wrap gap-1.5">
              {teacher.managedClasses.length > 0 ? (
                teacher.managedClasses.map((cls) => (
                  <span key={cls} className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                    {cls}
                  </span>
                ))
              ) : (
                <span className="text-xs text-blue-500 italic">Chưa được phân lớp (liên hệ Admin)</span>
              )}
            </div>
          </div>

          {/* Activation Code (if teacher) */}
          {teacher.activationCode && (
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <div className="flex items-center gap-2 text-xs text-amber-600 font-bold mb-1">
                <Key className="w-3.5 h-3.5" /> Mã kích hoạt đã dùng
              </div>
              <p className="text-sm font-mono font-bold text-amber-800">{teacher.activationCode}</p>
            </div>
          )}

          <hr className="border-slate-200" />

          {/* Editable fields */}
          <div>
            <label className="flex items-center gap-2 text-xs text-slate-600 font-bold mb-1.5">
              <User className="w-3.5 h-3.5" /> Họ tên đầy đủ
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all"
              placeholder="Nhập họ tên..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs text-slate-600 font-bold mb-1.5">
              <School className="w-3.5 h-3.5" /> Trường
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all"
              placeholder="Nhập tên trường..."
            />
          </div>

          {/* Password Change Section */}
          <div>
            <button
              type="button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="flex items-center gap-2 text-xs text-purple-600 font-bold hover:text-purple-800 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              {showPasswordSection ? '▼ Ẩn đổi mật khẩu' : '▶ Đổi mật khẩu'}
            </button>

            {showPasswordSection && (
              <div className="mt-3 space-y-3 p-4 bg-purple-50 rounded-xl border border-purple-200 animate-in slide-in-from-top-2">
                <div>
                  <label className="text-xs text-purple-600 font-bold block mb-1">Mật khẩu cũ:</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-purple-200 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Nhập mật khẩu hiện tại..."
                  />
                </div>
                <div>
                  <label className="text-xs text-purple-600 font-bold block mb-1">Mật khẩu mới:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-purple-200 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Tối thiểu 6 ký tự..."
                  />
                </div>
                <div>
                  <label className="text-xs text-purple-600 font-bold block mb-1">Xác nhận mật khẩu mới:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-purple-200 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Nhập lại mật khẩu mới..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error/Success messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 font-bold">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700 font-bold">
              {success}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Lưu Thay Đổi
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all border border-slate-200"
            >
              Hủy
            </button>
          </div>

          {/* Account info footer */}
          <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
            Tạo tài khoản: {new Date(teacher.createdAt).toLocaleDateString('vi-VN')}
            {teacher.lastLoginAt && ` • Đăng nhập cuối: ${new Date(teacher.lastLoginAt).toLocaleDateString('vi-VN')}`}
          </div>
        </form>
      </div>
    </div>
  );
};
