import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  GraduationCap,
  UserCheck,
  ShieldCheck,
  Sparkles,
  User,
  KeyRound,
  Users,
  CheckCircle2,
  Lock,
  School,
  MapPin,
  ArrowRight,
  Eye,
  EyeOff,
  Search,
  Plus,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  AlertTriangle,
  Link2
} from 'lucide-react';
import { AppDataSchema, StudentAccount, SchoolEntry } from '../types';
import { INITIAL_PROGRESS } from '../data/sgkData';
import {
  getTodayDateString,
  getCurrentFormattedTime,
  normalizeFullName,
  normalizeSchoolName,
  normalizeClassName,
  removeVietnameseTones,
  generateBaseUsername,
  suggestAvailableUsernames,
  hashPasswordSync,
  validatePasswordStrength,
  generateRecoveryCode,
  verifyStudentPassword,
  verifyStudentRecoveryCode,
  getLoginLockStatus,
  recordLoginFailure,
  clearLoginFailures,
  getProvincesList,
  getCommunesForProvince,
  getSchoolsForCommune,
  addSchoolToSystem,
  resetStudentPasswordWithRecoveryCode,
  resetStudentPasswordByParentOrTeacher,
  getLinkedStudentIdsForParent,
  addLinkedStudentForParent,
  removeLinkedStudentForParent,
} from '../services/storage';

interface LandingCoverScreenProps {
  appData: AppDataSchema;
  onLoginStudent: (studentId: string) => void;
  onRegisterStudent: (newStudent: StudentAccount, updatedSchools?: SchoolEntry[], updatedCustomCommunes?: Record<string, string[]>) => void;
  onUpdateAppData?: (updater: (prev: AppDataSchema) => AppDataSchema) => void;
  onTeacherLogin: (email: string, password: string) => boolean;
  onTeacherRegister: (
    email: string,
    fullName: string,
    schoolName: string,
    password: string,
    activationCode?: string,
    provinceName?: string,
    communeName?: string
  ) => { success: boolean; error?: string };
  onOpenTeacherManagement: () => void;
  onParentOpenReport?: (studentId: string) => void;
}

// ===== SEARCHABLE DROPDOWN COMPONENT =====
interface SearchableSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  allowCustomAdd?: boolean;
  customAddLabel?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  icon,
  allowCustomAdd = false,
  customAddLabel = 'Sử dụng giá trị này',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    const normQuery = removeVietnameseTones(query.trim().toLowerCase());
    return options.filter((opt) =>
      removeVietnameseTones(opt.toLowerCase()).includes(normQuery)
    );
  }, [options, query]);

  return (
    <div ref={containerRef} className="relative">
      <label className="text-xs font-extrabold text-slate-800 block mb-1">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            setQuery('');
          }
        }}
        className={`w-full pl-10 pr-9 py-2.5 rounded-2xl neu-inset text-left text-xs font-extrabold flex items-center justify-between transition-all ${
          disabled
            ? 'opacity-60 cursor-not-allowed text-slate-500'
            : 'cursor-pointer text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        }`}
      >
        <span className="absolute left-3.5 top-3 text-indigo-600">{icon}</span>
        <span className={`truncate ${value ? 'text-slate-900 font-extrabold' : 'text-slate-600 font-semibold'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-600 shrink-0" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-40 left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border-2 border-indigo-200 overflow-hidden animate-in fade-in duration-150">
          <div className="p-2 border-b border-slate-200 bg-slate-50 relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-4 top-4.5" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Gõ để tìm nhanh..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="max-h-52 overflow-y-auto divide-y divide-slate-100">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                    value === opt
                      ? 'bg-indigo-50 text-indigo-800 font-extrabold'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt}</span>
                  {value === opt && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-slate-600 font-semibold space-y-2">
                <p>Không tìm thấy kết quả khớp "{query}".</p>
                {allowCustomAdd && query.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      const formatted = normalizeFullName(query.trim());
                      onChange(formatted);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-xs hover:bg-indigo-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{customAddLabel}: "{normalizeFullName(query.trim())}"</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== SCHOOL SELECTOR WITH SUGGESTIONS & "+ THÊM TRƯỜNG MỚI" =====
interface SchoolSelectorProps {
  provinceName: string;
  communeName: string;
  value: string;
  onChange: (schoolName: string) => void;
  existingSchools: string[];
  onAddNewSchool: (normalizedSchool: string) => void;
}

const SchoolSelector: React.FC<SchoolSelectorProps> = ({
  provinceName,
  communeName,
  value,
  onChange,
  existingSchools,
  onAddNewSchool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSchoolInput, setNewSchoolInput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const disabled = !provinceName || !communeName;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return existingSchools;
    const q = removeVietnameseTones(searchQuery.trim().toLowerCase());
    return existingSchools.filter((sc) =>
      removeVietnameseTones(sc.toLowerCase()).includes(q)
    );
  }, [existingSchools, searchQuery]);

  const previewNormalizedNewSchool = useMemo(
    () => normalizeSchoolName(newSchoolInput),
    [newSchoolInput]
  );

  const handleConfirmAddNewSchool = () => {
    const normalized = normalizeSchoolName(newSchoolInput);
    if (!normalized) return;
    onAddNewSchool(normalized);
    onChange(normalized);
    setNewSchoolInput('');
    setIsAddingNew(false);
    setIsDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className="space-y-2 relative">
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold text-slate-800">
          Trường THCS (tại {communeName || 'xã/phường đã chọn'}): *
        </label>
        {!disabled && !isAddingNew && (
          <button
            type="button"
            onClick={() => {
              setIsAddingNew(true);
              setIsDropdownOpen(false);
            }}
            className="text-[11px] font-extrabold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 cursor-pointer underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm trường mới</span>
          </button>
        )}
      </div>

      {!isAddingNew ? (
        <div className="relative">
          <School className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
          <input
            type="text"
            disabled={disabled}
            value={isDropdownOpen ? searchQuery : value}
            onFocus={() => {
              if (!disabled) {
                setSearchQuery('');
                setIsDropdownOpen(true);
              }
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            placeholder={
              disabled
                ? 'Vui lòng chọn Tỉnh/Thành phố và Xã/Phường trước'
                : existingSchools.length > 0
                ? `Tìm hoặc chọn trường (${existingSchools.length} trường đã có)...`
                : 'Chưa có trường ở xã này — bấm "Thêm trường mới"'
            }
            className={`w-full pl-10 pr-9 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              disabled ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          />
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                setIsDropdownOpen((prev) => !prev);
                setSearchQuery('');
              }
            }}
            className="absolute right-3 top-3 text-slate-600 cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && !disabled && (
            <div className="absolute z-40 left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border-2 border-indigo-200 overflow-hidden animate-in fade-in duration-150">
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => {
                        onChange(sc);
                        setIsDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        value === sc
                          ? 'bg-indigo-50 text-indigo-800 font-extrabold'
                          : 'text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span>{sc}</span>
                      {value === sc && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-xs text-slate-600 font-semibold text-center">
                    Chưa tìm thấy trường khớp trong danh sách tại {communeName}.
                  </div>
                )}
              </div>

              <div className="p-2 bg-indigo-50/80 border-t border-indigo-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700">
                  Chưa có trường của bạn?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setNewSchoolInput(searchQuery);
                    setIsAddingNew(true);
                    setIsDropdownOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold inline-flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm trường mới</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-indigo-50/90 border-2 border-indigo-200 space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-indigo-950">
              Thêm trường mới tại {communeName}
            </span>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              Huỷ
            </button>
          </div>
          <input
            type="text"
            autoFocus
            value={newSchoolInput}
            onChange={(e) => setNewSchoolInput(e.target.value)}
            placeholder="Nhập tên trường (ví dụ: Chu Văn An, Nguyễn Tất Thành)..."
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-300 text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {previewNormalizedNewSchool && (
            <div className="text-[11px] text-indigo-900 font-bold flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-indigo-200">
              <span>Tên chuẩn hoá sẽ lưu: <strong>{previewNormalizedNewSchool}</strong></span>
              <button
                type="button"
                onClick={handleConfirmAddNewSchool}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs cursor-pointer"
              >
                Chọn trường này
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ===== MAIN LANDING COVER SCREEN =====
export const LandingCoverScreen: React.FC<LandingCoverScreenProps> = ({
  appData,
  onLoginStudent,
  onRegisterStudent,
  onUpdateAppData,
  onTeacherLogin,
  onTeacherRegister,
  onOpenTeacherManagement,
  onParentOpenReport,
}) => {
  // 1. Top 3 role tabs: Học sinh, Giáo viên, Phụ huynh (equal height, unnumbered)
  const [activeRole, setActiveRole] = useState<'student' | 'teacher' | 'parent'>('student');

  // Sub-modes inside Student Role: 'login' | 'register' | 'forgot'
  const [studentView, setStudentView] = useState<'login' | 'register' | 'forgot'>('login');

  // Sub-modes inside Teacher Role: 'login' | 'register'
  const [teacherMode, setTeacherMode] = useState<'login' | 'register'>('login');

  // Lockout countdown tick every 1 second
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // ===== STUDENT LOGIN STATE =====
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [studentErr, setStudentErr] = useState('');

  // ===== STUDENT REGISTER STATE (Ordered top-to-bottom per spec) =====
  const [regFullName, setRegFullName] = useState('');
  const [regProvince, setRegProvince] = useState('Tỉnh Quảng Ngãi');
  const [regCommune, setRegCommune] = useState('Xã Đăk Hà');
  const [regSchoolName, setRegSchoolName] = useState('THCS Chu Văn An');
  const [regGrade, setRegGrade] = useState<number>(6);
  const [regClassInput, setRegClassInput] = useState('6A1');
  const [regUsername, setRegUsername] = useState('');
  const [isUsernameManuallyEdited, setIsUsernameManuallyEdited] = useState(false);
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);
  const [regParentConsent, setRegParentConsent] = useState(false);
  const [regErr, setRegErr] = useState('');

  // Recovery code modal after registration
  const [createdRecoveryInfo, setCreatedRecoveryInfo] = useState<{
    student: StudentAccount;
    recoveryCode: string;
  } | null>(null);
  const [copiedRecovery, setCopiedRecovery] = useState(false);

  // ===== STUDENT FORGOT PASSWORD STATE =====
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotRecoveryCode, setForgotRecoveryCode] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotErr, setForgotErr] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // ===== TEACHER LOGIN & REGISTER STATE =====
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPass, setTeacherPass] = useState('');
  const [teacherConfirmPass, setTeacherConfirmPass] = useState('');
  const [showTeacherPass, setShowTeacherPass] = useState(false);
  const [teacherFullName, setTeacherFullName] = useState('');
  const [teacherProvince, setTeacherProvince] = useState('Tỉnh Quảng Ngãi');
  const [teacherCommune, setTeacherCommune] = useState('Xã Đăk Hà');
  const [teacherSchoolName, setTeacherSchoolName] = useState('THCS Chu Văn An');
  const [teacherErr, setTeacherErr] = useState('');
  const [teacherSuccess, setTeacherSuccess] = useState('');

  // ===== PARENT LINK & RESET STATE =====
  const [linkedStudentIds, setLinkedStudentIds] = useState<string[]>(() =>
    getLinkedStudentIdsForParent()
  );
  const [parentLinkUsername, setParentLinkUsername] = useState('');
  const [parentLinkSecret, setParentLinkSecret] = useState('');
  const [showParentSecret, setShowParentSecret] = useState(false);
  const [parentErr, setParentErr] = useState('');
  const [parentSuccess, setParentSuccess] = useState('');
  const [parentResetStudentId, setParentResetStudentId] = useState<string | null>(null);
  const [parentNewPass, setParentNewPass] = useState('');
  const [parentConfirmPass, setParentConfirmPass] = useState('');
  const [showParentNewPass, setShowParentNewPass] = useState(false);

  const todayStr = getTodayDateString();
  const provinces = useMemo(() => getProvincesList().map((p) => p.name), []);

  // Communes & Schools for Student Registration
  const studentCommunes = useMemo(
    () => getCommunesForProvince(appData, regProvince),
    [appData, regProvince]
  );
  const studentSchools = useMemo(
    () => getSchoolsForCommune(appData, regProvince, regCommune),
    [appData, regProvince, regCommune]
  );

  // Communes & Schools for Teacher Registration
  const teacherCommunes = useMemo(
    () => getCommunesForProvince(appData, teacherProvince),
    [appData, teacherProvince]
  );
  const teacherSchools = useMemo(
    () => getSchoolsForCommune(appData, teacherProvince, teacherCommune),
    [appData, teacherProvince, teacherCommune]
  );

  const normalizedRegClass = useMemo(
    () => normalizeClassName(regClassInput, regGrade),
    [regClassInput, regGrade]
  );

  // Check if regUsername is already taken
  const isUsernameTaken = useMemo(() => {
    const clean = regUsername.trim().toLowerCase();
    if (!clean) return false;
    return appData.students.some((s) => s.username.toLowerCase() === clean);
  }, [regUsername, appData.students]);

  const usernameSuggestions = useMemo(() => {
    if (!regFullName.trim() && !regUsername.trim()) return [];
    return suggestAvailableUsernames(
      regFullName,
      normalizedRegClass || '6A1',
      regUsername,
      appData.students
    );
  }, [regFullName, normalizedRegClass, regUsername, appData.students]);

  // Auto-suggest username when fullName or class changes if user hasn't manually customized it
  const handleStudentFullNameChange = (val: string) => {
    setRegFullName(val);
    if (!isUsernameManuallyEdited) {
      const base = generateBaseUsername(val, normalizedRegClass || '6A1');
      const suggestions = suggestAvailableUsernames(val, normalizedRegClass || '6A1', base, appData.students);
      setRegUsername(suggestions[0] || base);
    }
  };

  const handleStudentClassChange = (val: string) => {
    setRegClassInput(val);
    const normCls = normalizeClassName(val, regGrade);
    if (!isUsernameManuallyEdited && regFullName.trim()) {
      const base = generateBaseUsername(regFullName, normCls || '6A1');
      const suggestions = suggestAvailableUsernames(regFullName, normCls || '6A1', base, appData.students);
      setRegUsername(suggestions[0] || base);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Student Login Lock Status
  const studentLockKey = `student:${loginUsername.trim().toLowerCase() || 'global'}`;
  const studentLock = getLoginLockStatus(studentLockKey);

  // Teacher Login Lock Status
  const teacherLockKey = `teacher:${teacherEmail.trim().toLowerCase() || 'global'}`;
  const teacherLock = getLoginLockStatus(teacherLockKey);

  // ===== HANDLER: STUDENT LOGIN =====
  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentErr('');

    const cleanInputUser = loginUsername.trim().toLowerCase();
    if (!cleanInputUser) {
      setStudentErr('Vui lòng nhập Tên đăng nhập!');
      return;
    }

    const lockStatus = getLoginLockStatus(`student:${cleanInputUser}`);
    if (lockStatus.isLocked) {
      setStudentErr(
        `Tài khoản tạm khoá 5 phút do nhập sai mật khẩu 5 lần. Vui lòng thử lại sau ${formatCountdown(
          lockStatus.remainingSeconds
        )}.`
      );
      return;
    }

    if (!loginPassword.trim()) {
      setStudentErr('Vui lòng nhập Mật khẩu!');
      return;
    }

    const targetStudent = appData.students.find(
      (s) => s.username.toLowerCase() === cleanInputUser
    );

    if (!targetStudent) {
      setStudentErr(
        `Không tìm thấy tài khoản "${loginUsername.trim()}". Nếu chưa có tài khoản, em hãy bấm "Đăng ký" bên dưới!`
      );
      return;
    }

    if (!verifyStudentPassword(targetStudent, loginPassword)) {
      const failStatus = recordLoginFailure(`student:${cleanInputUser}`);
      if (failStatus.isLocked) {
        setStudentErr(
          `Em đã nhập sai mật khẩu 5 lần liên tiếp! Tài khoản bị tạm khoá 5 phút (còn ${formatCountdown(
            failStatus.remainingSeconds
          )}).`
        );
      } else {
        setStudentErr(
          `Mật khẩu chưa đúng! (Sai ${failStatus.attempts}/5 lần — sai 5 lần sẽ tạm khoá 5 phút).`
        );
      }
      return;
    }

    clearLoginFailures(`student:${cleanInputUser}`);
    onLoginStudent(targetStudent.id);
  };

  // ===== HANDLER: STUDENT REGISTER =====
  const handleStudentRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegErr('');

    const finalFullName = normalizeFullName(regFullName);
    const finalSchoolName = normalizeSchoolName(regSchoolName);
    const finalClassName = normalizeClassName(regClassInput, regGrade);
    const finalUsername = removeVietnameseTones(regUsername.trim().toLowerCase()).replace(
      /[^a-z0-9_]/g,
      ''
    );

    if (!finalFullName) {
      setRegErr('Vui lòng nhập Họ và tên của em!');
      return;
    }
    if (!regProvince) {
      setRegErr('Vui lòng chọn Tỉnh/Thành phố!');
      return;
    }
    if (!regCommune) {
      setRegErr('Vui lòng chọn Xã/Phường!');
      return;
    }
    if (!finalSchoolName) {
      setRegErr('Vui lòng chọn hoặc thêm Trường THCS của em!');
      return;
    }
    if (!finalClassName) {
      setRegErr('Vui lòng nhập tên Lớp (ví dụ: 6A1)!');
      return;
    }
    if (!finalUsername || finalUsername.length < 3) {
      setRegErr('Tên đăng nhập phải có ít nhất 3 ký tự (chữ cái, số hoặc dấu gạch dưới)!');
      return;
    }
    if (appData.students.some((s) => s.username.toLowerCase() === finalUsername)) {
      setRegErr('Tên đăng nhập này đã có bạn sử dụng. Em hãy chọn một trong các tên gợi ý bên dưới nhé!');
      return;
    }

    const passCheck = validatePasswordStrength(regPassword, finalUsername);
    if (!passCheck.valid) {
      setRegErr(passCheck.error || 'Mật khẩu chưa hợp lệ!');
      return;
    }
    if (regPassword.trim() !== regConfirmPassword.trim()) {
      setRegErr('Mật khẩu nhập lại không khớp! Em hãy kiểm tra lại.');
      return;
    }
    if (!regParentConsent) {
      setRegErr('Em cần đánh dấu xác nhận đã hỏi ý kiến bố mẹ/người giám hộ khi đăng ký tài khoản!');
      return;
    }

    // Generate 8-character recovery code & hash both password and recovery code
    const rawRecoveryCode = generateRecoveryCode();
    const hashedPassword = hashPasswordSync(regPassword.trim());
    const hashedRecovery = hashPasswordSync(rawRecoveryCode);

    // Ensure school is saved in system for future students
    const schoolUpdate = addSchoolToSystem(appData, regProvince, regCommune, finalSchoolName);

    const newStudent: StudentAccount = {
      id: `student-${Date.now()}`,
      username: finalUsername,
      fullName: finalFullName,
      grade: regGrade,
      className: finalClassName,
      provinceName: regProvince,
      communeName: regCommune,
      schoolName: finalSchoolName,
      passwordHash: hashedPassword,
      recoveryCodeHash: hashedRecovery,
      parentConsent: true,
      pinCode: hashedPassword,
      avatar: '👨‍🎓',
      dailyGoalMinutes: 20,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      progress: {
        ...INITIAL_PROGRESS,
        studentName: finalFullName,
        grade: regGrade,
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

    // Show 8-character recovery code modal first before entering the app
    setCreatedRecoveryInfo({
      student: newStudent,
      recoveryCode: rawRecoveryCode,
    });
    if (onUpdateAppData) {
      onUpdateAppData((prev) => ({
        ...prev,
        schools: schoolUpdate.data.schools,
        customCommunes: schoolUpdate.data.customCommunes,
      }));
    }
  };

  // ===== HANDLER: STUDENT FORGOT PASSWORD RESET =====
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotErr('');
    setForgotSuccess('');

    if (!forgotUsername.trim() || !forgotRecoveryCode.trim()) {
      setForgotErr('Vui lòng nhập đầy đủ Tên đăng nhập và Mã khôi phục 8 ký tự!');
      return;
    }
    if (forgotNewPassword.trim() !== forgotConfirmPassword.trim()) {
      setForgotErr('Mật khẩu mới và nhập lại mật khẩu không khớp!');
      return;
    }

    const res = resetStudentPasswordWithRecoveryCode(
      appData,
      forgotUsername,
      forgotRecoveryCode,
      forgotNewPassword
    );
    if (!res.success) {
      setForgotErr(res.error || 'Không thể đặt lại mật khẩu!');
      return;
    }

    onUpdateAppData?.(() => res.data);
    setForgotSuccess('Đặt lại mật khẩu thành công! Đang chuyển về màn hình Đăng nhập...');
    setTimeout(() => {
      setLoginUsername(forgotUsername.trim());
      setLoginPassword('');
      setForgotSuccess('');
      setStudentView('login');
    }, 1500);
  };

  // ===== HANDLER: TEACHER LOGIN & REGISTER =====
  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherErr('');
    setTeacherSuccess('');

    if (teacherMode === 'login') {
      const cleanId = teacherEmail.trim().toLowerCase();
      if (!cleanId || !teacherPass.trim()) {
        setTeacherErr('Vui lòng nhập Email/Tên đăng nhập và Mật khẩu!');
        return;
      }

      const lockStatus = getLoginLockStatus(`teacher:${cleanId}`);
      if (lockStatus.isLocked) {
        setTeacherErr(
          `Tài khoản tạm khoá 5 phút do nhập sai mật khẩu 5 lần. Vui lòng thử lại sau ${formatCountdown(
            lockStatus.remainingSeconds
          )}.`
        );
        return;
      }

      const success = onTeacherLogin(cleanId, teacherPass.trim());
      if (!success) {
        const failStatus = recordLoginFailure(`teacher:${cleanId}`);
        if (failStatus.isLocked) {
          setTeacherErr(
            `Đã nhập sai mật khẩu 5 lần! Tài khoản tạm khoá 5 phút (còn ${formatCountdown(
              failStatus.remainingSeconds
            )}).`
          );
        } else {
          setTeacherErr(
            `Email hoặc mật khẩu Giáo viên chưa đúng! (Sai ${failStatus.attempts}/5 lần).`
          );
        }
        return;
      }

      clearLoginFailures(`teacher:${cleanId}`);
      onOpenTeacherManagement();
    } else {
      const normName = normalizeFullName(teacherFullName);
      const normSchool = normalizeSchoolName(teacherSchoolName);
      if (!normName || !teacherProvince || !teacherCommune || !normSchool || !teacherEmail.trim() || !teacherPass.trim()) {
        setTeacherErr('Vui lòng điền đầy đủ Họ tên, Tỉnh/Thành, Xã/Phường, Trường, Email và Mật khẩu!');
        return;
      }
      if (teacherPass.trim() !== teacherConfirmPass.trim()) {
        setTeacherErr('Mật khẩu nhập lại không khớp!');
        return;
      }

      const { success, error } = onTeacherRegister(
        teacherEmail.trim(),
        normName,
        normSchool,
        teacherPass.trim(),
        undefined,
        teacherProvince,
        teacherCommune
      );
      if (!success) {
        setTeacherErr(error || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
        return;
      }
      setTeacherSuccess('Đăng ký thành công! Đang mở Bảng Theo Dõi Học Sinh Cùng Trường...');
      setTimeout(() => onOpenTeacherManagement(), 1000);
    }
  };

  // ===== HANDLER: PARENT LINK & PASSWORD RESET FOR CHILD =====
  const linkedStudents = useMemo(
    () => appData.students.filter((s) => linkedStudentIds.includes(s.id)),
    [appData.students, linkedStudentIds]
  );

  const handleParentLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParentErr('');
    setParentSuccess('');

    const cleanUser = parentLinkUsername.trim().toLowerCase();
    const secret = parentLinkSecret.trim();
    if (!cleanUser || !secret) {
      setParentErr('Vui lòng nhập Tên đăng nhập của con và Mật khẩu (hoặc Mã khôi phục 8 ký tự)!');
      return;
    }

    const student = appData.students.find((s) => s.username.toLowerCase() === cleanUser);
    if (!student) {
      setParentErr(`Không tìm thấy tài khoản học sinh "${parentLinkUsername.trim()}".`);
      return;
    }

    const isPassValid = verifyStudentPassword(student, secret);
    const isRecoveryValid = verifyStudentRecoveryCode(student, secret);

    if (!isPassValid && !isRecoveryValid) {
      setParentErr('Mật khẩu hoặc Mã khôi phục của con chưa đúng!');
      return;
    }

    const nextIds = addLinkedStudentForParent(student.id);
    setLinkedStudentIds(nextIds);
    setParentLinkUsername('');
    setParentLinkSecret('');
    setParentSuccess(`Đã liên kết thành công với tài khoản của em ${student.fullName} (${student.className})!`);
  };

  const handleParentResetChildPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setParentErr('');
    setParentSuccess('');
    if (!parentResetStudentId) return;

    if (parentNewPass.trim() !== parentConfirmPass.trim()) {
      setParentErr('Mật khẩu mới và mật khẩu nhập lại không khớp!');
      return;
    }

    const res = resetStudentPasswordByParentOrTeacher(appData, parentResetStudentId, parentNewPass);
    if (!res.success) {
      setParentErr(res.error || 'Không thể đặt lại mật khẩu cho con!');
      return;
    }

    onUpdateAppData?.(() => res.data);
    const child = appData.students.find((s) => s.id === parentResetStudentId);
    setParentSuccess(`Đã đặt lại mật khẩu mới cho em ${child?.fullName || ''} thành công!`);
    setParentResetStudentId(null);
    setParentNewPass('');
    setParentConfirmPass('');
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff] text-slate-900 flex flex-col justify-between font-['Be_Vietnam_Pro',sans-serif] relative overflow-x-hidden selection:bg-purple-200">
      {/* Top Brand Header */}
      <header className="relative z-10 border-b border-purple-100 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sm:py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#4338ca] to-[#6d28d9] flex items-center justify-center text-white shadow-sm shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 whitespace-nowrap truncate">
                Gia Sư AI Lớp 6
              </h1>
              <p className="text-[11px] sm:text-xs text-indigo-800 font-bold whitespace-nowrap">
                Global Success
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveRole('student');
              setStudentView('login');
            }}
            className="px-3.5 sm:px-4 py-2 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <UserCheck className="w-4 h-4 text-white shrink-0" />
            <span>Đăng nhập</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 flex-1 flex flex-col justify-start items-center w-full">
        {/* Center Hero Heading */}
        <div className="text-center max-w-3xl space-y-2.5 mb-6 pt-1 w-full">
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full badge-pastel-yellow text-amber-900 text-xs font-extrabold shadow-xs whitespace-nowrap max-w-full">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="whitespace-nowrap truncate">Sách Tiếng Anh 6 Global Success</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Học Tiếng Anh 6 theo từng Unit sách Global Success – có AI hướng dẫn.
          </h2>
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-xl neu-card-purple p-5 sm:p-7 shadow-xl border-2 border-white relative">
          {/* 1. 3 Role Choices: Học sinh, Giáo viên, Phụ huynh (Equal height, unnumbered) */}
          <div className="grid grid-cols-3 gap-2.5 mb-6 items-stretch">
            <button
              type="button"
              onClick={() => {
                setActiveRole('student');
                setStudentView('login');
                setStudentErr('');
              }}
              className={`h-11 px-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeRole === 'student'
                  ? 'neu-btn-primary text-white shadow-md'
                  : 'neu-btn text-slate-800 hover:text-indigo-700'
              }`}
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Học sinh</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRole('teacher');
                setTeacherErr('');
              }}
              className={`h-11 px-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeRole === 'teacher'
                  ? 'neu-btn-primary text-white shadow-md'
                  : 'neu-btn text-slate-800 hover:text-indigo-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Giáo viên</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRole('parent');
                setParentErr('');
              }}
              className={`h-11 px-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeRole === 'parent'
                  ? 'neu-btn-success text-white shadow-md'
                  : 'neu-btn text-slate-800 hover:text-emerald-700'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Phụ huynh</span>
            </button>
          </div>

          {/* ================= ROLE 1: HỌC SINH ================= */}
          {activeRole === 'student' && (
            <>
              {/* --- 1A. STUDENT LOGIN --- */}
              {studentView === 'login' && (
                <form onSubmit={handleStudentLoginSubmit} className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-indigo-200/80 pb-2.5 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        Đăng nhập Học sinh
                      </h3>
                      <p className="text-xs text-slate-700 font-semibold">
                        Nhập tên đăng nhập và mật khẩu của em để vào học
                      </p>
                    </div>
                  </div>

                  {/* Quick Demo Account Switcher if demo students exist */}
                  {appData.students.length > 0 && (
                    <div className="bg-white/80 rounded-2xl p-3 border border-indigo-200/80 space-y-1.5">
                      <span className="text-[11px] font-extrabold text-slate-700 block">
                        Tài khoản học sinh trên thiết bị này (bấm để điền nhanh tên đăng nhập):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {appData.students.slice(0, 5).map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => {
                              setLoginUsername(st.username);
                              setStudentErr('');
                            }}
                            className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                              loginUsername === st.username
                                ? 'bg-indigo-700 text-white border-indigo-700'
                                : 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100'
                            }`}
                          >
                            {st.fullName} ({st.className} • @{st.username})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3.5">
                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Tên đăng nhập:
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          placeholder="Nhập tên đăng nhập (ví dụ: an_6a1)"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-extrabold text-slate-800">
                          Mật khẩu:
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotUsername(loginUsername);
                            setForgotErr('');
                            setForgotSuccess('');
                            setStudentView('forgot');
                          }}
                          className="text-xs font-extrabold text-indigo-700 hover:text-indigo-950 underline cursor-pointer"
                        >
                          Quên mật khẩu?
                        </button>
                      </div>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                        <input
                          type={showLoginPass ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Nhập mật khẩu của em"
                          className="w-full pl-10 pr-10 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPass((v) => !v)}
                          title={showLoginPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          className="absolute right-3 top-2.5 p-0.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {studentLock.isLocked && (
                    <div className="p-3 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 text-xs font-extrabold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>
                        Tài khoản đang tạm khoá 5 phút do nhập sai 5 lần. Thời gian chờ còn lại:{' '}
                        <strong className="underline">{formatCountdown(studentLock.remainingSeconds)}</strong>
                      </span>
                    </div>
                  )}

                  {studentErr && !studentLock.isLocked && (
                    <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                      <span>{studentErr}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={studentLock.isLocked}
                    className={`w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
                      studentLock.isLocked
                        ? 'opacity-60 cursor-not-allowed'
                        : 'cursor-pointer hover:scale-[1.01]'
                    }`}
                  >
                    <span>Đăng nhập</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRegErr('');
                        setStudentView('register');
                      }}
                      className="text-xs sm:text-sm text-indigo-800 hover:text-indigo-950 font-extrabold underline cursor-pointer"
                    >
                      Chưa có tài khoản? Đăng ký
                    </button>
                  </div>
                </form>
              )}

              {/* --- 1B. STUDENT REGISTER (Ordered top-to-bottom per spec) --- */}
              {studentView === 'register' && (
                <form onSubmit={handleStudentRegisterSubmit} className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-indigo-200/80 pb-2.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Đăng ký tài khoản Học sinh
                    </h3>
                    <p className="text-xs text-slate-700 font-semibold">
                      Học sinh tự đăng ký tài khoản miễn phí, không cần mã lớp
                    </p>
                  </div>

                  {/* 1. Họ và tên */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1">
                      Họ và tên: *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={regFullName}
                        onChange={(e) => handleStudentFullNameChange(e.target.value)}
                        onBlur={() => setRegFullName((prev) => normalizeFullName(prev))}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* 2. Tỉnh/Thành phố (34 tỉnh/thành từ 1/7/2025) */}
                  <SearchableSelect
                    label="Tỉnh/Thành phố (34 tỉnh/thành mới): *"
                    value={regProvince}
                    onChange={(newProv) => {
                      setRegProvince(newProv);
                      const comms = getCommunesForProvince(appData, newProv);
                      const firstComm = comms[0] || '';
                      setRegCommune(firstComm);
                      const schs = getSchoolsForCommune(appData, newProv, firstComm);
                      setRegSchoolName(schs[0] || '');
                    }}
                    options={provinces}
                    placeholder="Chọn Tỉnh/Thành phố..."
                    icon={<MapPin className="w-4 h-4" />}
                  />

                  {/* 3. Xã/Phường (thuộc tỉnh đã chọn) */}
                  <SearchableSelect
                    label="Xã/Phường: *"
                    value={regCommune}
                    onChange={(newComm) => {
                      setRegCommune(newComm);
                      const schs = getSchoolsForCommune(appData, regProvince, newComm);
                      setRegSchoolName(schs[0] || '');
                    }}
                    options={studentCommunes}
                    placeholder={regProvince ? 'Chọn hoặc tìm Xã/Phường...' : 'Chọn Tỉnh/Thành phố trước'}
                    disabled={!regProvince}
                    icon={<MapPin className="w-4 h-4" />}
                    allowCustomAdd={true}
                    customAddLabel="Chọn xã/phường"
                  />

                  {/* 4. Trường (Gợi ý trường đã có ở xã/phường đó hoặc "+ Thêm trường mới" chuẩn hoá THCS + Tên) */}
                  <SchoolSelector
                    provinceName={regProvince}
                    communeName={regCommune}
                    value={regSchoolName}
                    onChange={setRegSchoolName}
                    existingSchools={studentSchools}
                    onAddNewSchool={(normSchool) => {
                      const updated = addSchoolToSystem(appData, regProvince, regCommune, normSchool);
                      onUpdateAppData?.(() => updated.data);
                    }}
                  />

                  {/* 5. Lớp: Chọn khối (mặc định 6) và nhập tên lớp (VD: 6A1) */}
                  <div className="grid grid-cols-12 gap-2.5">
                    <div className="col-span-4">
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Khối: *
                      </label>
                      <select
                        value={regGrade}
                        onChange={(e) => setRegGrade(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={6}>Khối 6</option>
                        <option value={7}>Khối 7</option>
                        <option value={8}>Khối 8</option>
                        <option value={9}>Khối 9</option>
                      </select>
                    </div>
                    <div className="col-span-8">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-extrabold text-slate-800">
                          Tên lớp: *
                        </label>
                        {normalizedRegClass && (
                          <span className="text-[11px] font-extrabold text-indigo-800">
                            Lưu thành: <strong>{normalizedRegClass}</strong>
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={regClassInput}
                        onChange={(e) => handleStudentClassChange(e.target.value)}
                        onBlur={() => setRegClassInput(normalizeClassName(regClassInput, regGrade))}
                        placeholder="Ví dụ: 6A1"
                        className="w-full px-3.5 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* 6. Tên đăng nhập (không trùng; nếu trùng gợi ý tên khác) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-extrabold text-slate-800">
                        Tên đăng nhập: *
                      </label>
                      {regUsername.trim() && (
                        <span
                          className={`text-[11px] font-extrabold ${
                            isUsernameTaken ? 'text-rose-700' : 'text-emerald-800'
                          }`}
                        >
                          {isUsernameTaken ? 'Tên này đã có người dùng' : 'Có thể sử dụng'}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <User className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={regUsername}
                        onChange={(e) => {
                          setIsUsernameManuallyEdited(true);
                          setRegUsername(e.target.value.replace(/\s+/g, '').toLowerCase());
                        }}
                        placeholder="Ví dụ: an_6a1"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 ${
                          isUsernameTaken ? 'ring-2 ring-rose-500' : 'focus:ring-indigo-500'
                        }`}
                      />
                    </div>

                    {/* Gợi ý tên đăng nhập khác khi bị trùng hoặc gợi ý nhanh */}
                    {(isUsernameTaken || usernameSuggestions.length > 0) && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-700">
                          {isUsernameTaken ? 'Gợi ý tên chưa trùng:' : 'Gợi ý nhanh:'}
                        </span>
                        {usernameSuggestions.map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => {
                              setRegUsername(sug);
                              setIsUsernameManuallyEdited(true);
                            }}
                            className="px-2.5 py-0.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-extrabold text-[11px] border border-indigo-300 cursor-pointer"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 7. Mật khẩu + Nhập lại mật khẩu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Mật khẩu (tối thiểu 6 ký tự): *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                        <input
                          type={showRegPass ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Tối thiểu 6 ký tự"
                          className="w-full pl-10 pr-9 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPass((v) => !v)}
                          title={showRegPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          className="absolute right-3 top-2.5 p-0.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Nhập lại mật khẩu: *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                        <input
                          type={showRegConfirmPass ? 'text' : 'password'}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Nhập lại mật khẩu"
                          className="w-full pl-10 pr-9 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegConfirmPass((v) => !v)}
                          title={showRegConfirmPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          className="absolute right-3 top-2.5 p-0.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          {showRegConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 8. Ô đánh dấu bắt buộc */}
                  <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-indigo-200 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={regParentConsent}
                      onChange={(e) => setRegParentConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-400 text-indigo-700 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs font-extrabold text-slate-800 leading-snug">
                      Em đã hỏi ý kiến bố mẹ/người giám hộ khi đăng ký tài khoản
                    </span>
                  </label>

                  {regErr && (
                    <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                      <span>{regErr}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Hoàn tất đăng ký</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setStudentView('login')}
                      className="text-xs sm:text-sm text-indigo-800 hover:text-indigo-950 font-extrabold underline cursor-pointer"
                    >
                      Đã có tài khoản? Đăng nhập
                    </button>
                  </div>
                </form>
              )}

              {/* --- 1C. STUDENT FORGOT PASSWORD (RECOVERY CODE) --- */}
              {studentView === 'forgot' && (
                <form onSubmit={handleForgotSubmit} className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-indigo-200/80 pb-2.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Đặt lại mật khẩu Học sinh
                    </h3>
                    <p className="text-xs text-slate-700 font-semibold">
                      Nhập tên đăng nhập và Mã khôi phục 8 ký tự đã lưu khi đăng ký (hoặc nhờ phụ huynh đã liên kết tài khoản đặt lại giúp)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Tên đăng nhập: *
                      </label>
                      <input
                        type="text"
                        required
                        value={forgotUsername}
                        onChange={(e) => setForgotUsername(e.target.value)}
                        placeholder="Ví dụ: an_6a1"
                        className="w-full px-3.5 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-slate-800 block mb-1">
                        Mã khôi phục (8 ký tự): *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={forgotRecoveryCode}
                        onChange={(e) => setForgotRecoveryCode(e.target.value.toUpperCase())}
                        placeholder="Nhập mã 8 ký tự (ví dụ: AN6A1CVA)"
                        className="w-full px-3.5 py-2.5 rounded-2xl neu-inset text-xs font-mono font-extrabold text-slate-900 uppercase tracking-wider placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-xs font-extrabold text-slate-800 block mb-1">
                          Mật khẩu mới: *
                        </label>
                        <div className="relative">
                          <input
                            type={showForgotPass ? 'text' : 'password'}
                            required
                            value={forgotNewPassword}
                            onChange={(e) => setForgotNewPassword(e.target.value)}
                            placeholder="Tối thiểu 6 ký tự"
                            className="w-full px-3.5 pr-9 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowForgotPass((v) => !v)}
                            className="absolute right-3 top-2.5 text-slate-600 cursor-pointer"
                          >
                            {showForgotPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-extrabold text-slate-800 block mb-1">
                          Nhập lại mật khẩu mới: *
                        </label>
                        <input
                          type={showForgotPass ? 'text' : 'password'}
                          required
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          placeholder="Nhập lại mật khẩu mới"
                          className="w-full px-3.5 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {forgotErr && (
                    <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                      <span>{forgotErr}</span>
                    </div>
                  )}

                  {forgotSuccess && (
                    <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{forgotSuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Đặt lại mật khẩu</span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setStudentView('login')}
                      className="text-xs text-indigo-800 hover:text-indigo-950 font-extrabold underline cursor-pointer"
                    >
                      Quay lại Đăng nhập
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* ================= ROLE 2: GIÁO VIÊN ================= */}
          {activeRole === 'teacher' && (
            <form onSubmit={handleTeacherSubmit} className="space-y-3.5 animate-in fade-in duration-150">
              <div className="border-b border-indigo-200/80 pb-2.5">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  {teacherMode === 'login'
                    ? 'Đăng nhập Giáo viên'
                    : 'Đăng ký tài khoản Giáo viên'}
                </h3>
                <p className="text-xs text-slate-700 font-semibold">
                  {teacherMode === 'login'
                    ? 'Xem tự động tiến độ học sinh cùng trường và lọc theo từng lớp'
                    : 'Chọn Tỉnh/Thành → Xã/Phường → Trường để tự động kết nối danh sách học sinh cùng trường'}
                </p>
              </div>

              {teacherMode === 'register' && (
                <>
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1">
                      Họ và tên Giáo viên: *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={teacherFullName}
                        onChange={(e) => setTeacherFullName(e.target.value)}
                        onBlur={() => setTeacherFullName((prev) => normalizeFullName(prev))}
                        placeholder="Ví dụ: Nguyễn Thị Nhân"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <SearchableSelect
                    label="Tỉnh/Thành phố (34 tỉnh/thành mới): *"
                    value={teacherProvince}
                    onChange={(newProv) => {
                      setTeacherProvince(newProv);
                      const comms = getCommunesForProvince(appData, newProv);
                      const firstComm = comms[0] || '';
                      setTeacherCommune(firstComm);
                      const schs = getSchoolsForCommune(appData, newProv, firstComm);
                      setTeacherSchoolName(schs[0] || '');
                    }}
                    options={provinces}
                    placeholder="Chọn Tỉnh/Thành phố..."
                    icon={<MapPin className="w-4 h-4" />}
                  />

                  <SearchableSelect
                    label="Xã/Phường: *"
                    value={teacherCommune}
                    onChange={(newComm) => {
                      setTeacherCommune(newComm);
                      const schs = getSchoolsForCommune(appData, teacherProvince, newComm);
                      setTeacherSchoolName(schs[0] || '');
                    }}
                    options={teacherCommunes}
                    placeholder={teacherProvince ? 'Chọn hoặc tìm Xã/Phường...' : 'Chọn Tỉnh/Thành phố trước'}
                    disabled={!teacherProvince}
                    icon={<MapPin className="w-4 h-4" />}
                    allowCustomAdd={true}
                    customAddLabel="Chọn xã/phường"
                  />

                  <SchoolSelector
                    provinceName={teacherProvince}
                    communeName={teacherCommune}
                    value={teacherSchoolName}
                    onChange={setTeacherSchoolName}
                    existingSchools={teacherSchools}
                    onAddNewSchool={(normSchool) => {
                      const updated = addSchoolToSystem(appData, teacherProvince, teacherCommune, normSchool);
                      onUpdateAppData?.(() => updated.data);
                    }}
                  />
                </>
              )}

              <div>
                <label className="text-xs font-extrabold text-slate-800 block mb-1">
                  Email hoặc Tên đăng nhập Giáo viên: *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="Ví dụ: giaovien@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className={teacherMode === 'register' ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : ''}>
                <div>
                  <label className="text-xs font-extrabold text-slate-800 block mb-1">
                    Mật khẩu: *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3" />
                    <input
                      type={showTeacherPass ? 'text' : 'password'}
                      required
                      value={teacherPass}
                      onChange={(e) => setTeacherPass(e.target.value)}
                      placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                      className="w-full pl-10 pr-9 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeacherPass((v) => !v)}
                      className="absolute right-3 top-2.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      {showTeacherPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {teacherMode === 'register' && (
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1">
                      Nhập lại mật khẩu: *
                    </label>
                    <input
                      type={showTeacherPass ? 'text' : 'password'}
                      required
                      value={teacherConfirmPass}
                      onChange={(e) => setTeacherConfirmPass(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-3.5 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>

              {teacherLock.isLocked && (
                <div className="p-3 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 text-xs font-extrabold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>
                    Tài khoản tạm khoá 5 phút do nhập sai 5 lần. Thời gian chờ còn lại:{' '}
                    <strong>{formatCountdown(teacherLock.remainingSeconds)}</strong>
                  </span>
                </div>
              )}

              {teacherErr && !teacherLock.isLocked && (
                <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                  <span>{teacherErr}</span>
                </div>
              )}

              {teacherSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{teacherSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={teacherLock.isLocked}
                className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>{teacherMode === 'login' ? 'Đăng nhập' : 'Hoàn tất đăng ký Giáo viên'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setTeacherMode(teacherMode === 'login' ? 'register' : 'login');
                    setTeacherErr('');
                  }}
                  className="text-xs sm:text-sm text-indigo-800 hover:text-indigo-950 font-extrabold underline cursor-pointer"
                >
                  {teacherMode === 'login' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
                </button>
              </div>
            </form>
          )}

          {/* ================= ROLE 3: PHỤ HUYNH ================= */}
          {activeRole === 'parent' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-emerald-200 pb-2.5">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  Dành cho Phụ huynh
                </h3>
                <p className="text-xs text-slate-700 font-semibold">
                  Liên kết tài khoản của con để theo dõi tiến độ học tập và hỗ trợ đặt lại mật khẩu khi con quên
                </p>
              </div>

              {/* Danh sách tài khoản con đã liên kết */}
              {linkedStudents.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-extrabold text-emerald-950 block">
                    Tài khoản của con đã liên kết ({linkedStudents.length}):
                  </span>
                  {linkedStudents.map((child) => (
                    <div
                      key={child.id}
                      className="p-3.5 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-extrabold text-sm text-slate-900">
                            {child.fullName} <span className="text-emerald-800">({child.className})</span>
                          </p>
                          <p className="text-[11px] font-semibold text-slate-600">
                            @{child.username} • {child.schoolName} ({child.communeName})
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = removeLinkedStudentForParent(child.id);
                            setLinkedStudentIds(next);
                          }}
                          className="text-[11px] font-bold text-slate-500 hover:text-rose-700 underline cursor-pointer"
                        >
                          Huỷ liên kết
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (onParentOpenReport) {
                              onParentOpenReport(child.id);
                            } else {
                              onLoginStudent(child.id);
                            }
                          }}
                          className="flex-1 py-2 px-3 rounded-xl neu-btn-success text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Xem tiến độ của con</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setParentResetStudentId(
                              parentResetStudentId === child.id ? null : child.id
                            );
                            setParentErr('');
                            setParentSuccess('');
                          }}
                          className="py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Đặt lại mật khẩu cho con</span>
                        </button>
                      </div>

                      {parentResetStudentId === child.id && (
                        <form
                          onSubmit={handleParentResetChildPassword}
                          className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-2.5 animate-in fade-in duration-150"
                        >
                          <p className="text-xs font-extrabold text-amber-950">
                            Đặt mật khẩu mới cho {child.fullName} (@{child.username}):
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="relative">
                              <input
                                type={showParentNewPass ? 'text' : 'password'}
                                required
                                value={parentNewPass}
                                onChange={(e) => setParentNewPass(e.target.value)}
                                placeholder="Mật khẩu mới (>= 6 ký tự)"
                                className="w-full px-3 pr-8 py-2 rounded-xl bg-white border border-amber-300 text-xs font-extrabold text-slate-900 placeholder-slate-600"
                              />
                              <button
                                type="button"
                                onClick={() => setShowParentNewPass((v) => !v)}
                                className="absolute right-2.5 top-2 text-slate-600 cursor-pointer"
                              >
                                {showParentNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            <input
                              type={showParentNewPass ? 'text' : 'password'}
                              required
                              value={parentConfirmPass}
                              onChange={(e) => setParentConfirmPass(e.target.value)}
                              placeholder="Nhập lại mật khẩu mới"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs font-extrabold text-slate-900 placeholder-slate-600"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setParentResetStudentId(null)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                            >
                              Huỷ
                            </button>
                            <button
                              type="submit"
                              className="px-3.5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs cursor-pointer"
                            >
                              Lưu mật khẩu mới
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Form liên kết tài khoản con */}
              <form onSubmit={handleParentLinkSubmit} className="space-y-3 pt-1">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-emerald-700" />
                  <span>Liên kết tài khoản của con:</span>
                </h4>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 block mb-1">
                    Tên đăng nhập của con: *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentLinkUsername}
                    onChange={(e) => setParentLinkUsername(e.target.value)}
                    placeholder="Ví dụ: an_6a1"
                    className="w-full px-3.5 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 block mb-1">
                    Mật khẩu hoặc Mã khôi phục 8 ký tự của con: *
                  </label>
                  <div className="relative">
                    <input
                      type={showParentSecret ? 'text' : 'password'}
                      required
                      value={parentLinkSecret}
                      onChange={(e) => setParentLinkSecret(e.target.value)}
                      placeholder="Nhập mật khẩu hoặc mã khôi phục 8 ký tự"
                      className="w-full px-3.5 pr-9 py-2.5 rounded-2xl neu-inset text-xs font-extrabold text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowParentSecret((v) => !v)}
                      className="absolute right-3 top-2.5 text-slate-600 cursor-pointer"
                    >
                      {showParentSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {parentErr && (
                  <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                    <span>{parentErr}</span>
                  </div>
                )}

                {parentSuccess && (
                  <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{parentSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl neu-btn-success text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <span>Liên kết tài khoản của con</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* MODAL HIỂN THỊ MÃ KHÔI PHỤC 8 KÝ TỰ SAU KHI ĐĂNG KÝ XONG */}
      {createdRecoveryInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-indigo-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">
                Đăng ký tài khoản thành công!
              </h3>
              <p className="text-xs font-semibold text-slate-700">
                Chào mừng em <strong>{createdRecoveryInfo.student.fullName}</strong> (Lớp{' '}
                <strong>{createdRecoveryInfo.student.className}</strong> •{' '}
                <strong>{createdRecoveryInfo.student.schoolName}</strong>)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Tên đăng nhập của em:</span>
                <span className="font-extrabold text-slate-950 text-sm">
                  {createdRecoveryInfo.student.username}
                </span>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <span className="text-xs font-extrabold text-amber-950 block mb-1">
                  Mã khôi phục mật khẩu (8 ký tự):
                </span>
                <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border-2 border-amber-400">
                  <span className="font-mono font-extrabold text-lg tracking-widest text-indigo-900">
                    {createdRecoveryInfo.recoveryCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(createdRecoveryInfo.recoveryCode);
                      setCopiedRecovery(true);
                      setTimeout(() => setCopiedRecovery(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-extrabold text-xs inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedRecovery ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRecovery ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs font-extrabold text-rose-800 pt-1 leading-relaxed">
                ⚠️ Em hãy chép mã này vào vở hoặc nhờ bố mẹ lưu lại. Khi quên mật khẩu, em dùng Tên đăng nhập + Mã khôi phục này để đặt lại mật khẩu.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const st = createdRecoveryInfo.student;
                setCreatedRecoveryInfo(null);
                onRegisterStudent(st);
              }}
              className="w-full py-3.5 rounded-2xl neu-btn-primary text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Em đã chép mã vào vở — Vào học ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-100 bg-white/80 backdrop-blur-md py-4 text-center text-xs text-slate-700 font-extrabold">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Gia Sư AI Lớp 6 • Sách Tiếng Anh 6 Global Success</span>
          <span>Phương pháp Socratic & Gamification</span>
        </div>
      </footer>
    </div>
  );
};
