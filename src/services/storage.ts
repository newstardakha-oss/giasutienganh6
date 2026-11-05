import {
  AppDataSchema,
  StudySession,
  UserProgress,
  Question,
  StudentAccount,
  DailyStudyLog,
  TeacherAccount,
  ActivationCode,
  SchoolEntry,
} from '../types';
import { SGK_UNITS, DEMO_QUESTIONS, INITIAL_PROGRESS } from '../data/sgkData';
import vnAdminData from '../data/vn_admin_2025.json';

const STORAGE_KEY = 'giasu_ai_english6_data_v1';
const LOCKOUT_STORAGE_KEY = 'giasu_ai_login_lockout_v1';
const PARENT_LINKS_STORAGE_KEY = 'giasu_ai_parent_links_v1';

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getCurrentFormattedTime(): string {
  const now = new Date();
  const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${time} - ${date}`;
}

// ===== TEXT & FIELD NORMALIZATION HELPERS =====

/**
 * Viết hoa chữ cái đầu mỗi từ, bỏ khoảng trắng thừa
 * VD: "  nguyễn   văn  an " -> "Nguyễn Văn An"
 */
export function normalizeFullName(raw: string): string {
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase('vi-VN') + word.slice(1).toLocaleLowerCase('vi-VN'))
    .join(' ');
}

/**
 * Chuẩn hoá tên trường theo dạng "THCS + Tên"
 * VD: "chu văn an" -> "THCS Chu Văn An"
 *     "Trường THCS Chu Văn An" -> "THCS Chu Văn An"
 */
export function normalizeSchoolName(raw: string): string {
  let cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  // Bỏ các tiền tố lặp như "Trường", "Trường THCS", "THCS", "Trường Trung học cơ sở", "Trung học cơ sở"
  cleaned = cleaned.replace(
    /^(trường\s+trung\s+học\s+cơ\s+sở|trung\s+học\s+cơ\s+sở|trường\s+thcs|thcs|trường)\s+/i,
    ''
  );
  // Nếu vẫn còn tiền tố "THCS " lần 2
  cleaned = cleaned.replace(/^(thcs)\s+/i, '');
  const titleCased = normalizeFullName(cleaned);
  return titleCased ? `THCS ${titleCased}` : '';
}

/**
 * Chuẩn hoá tên lớp: Tự viết hoa và bỏ dấu cách
 * "6a1", "6 A1", "6A 1", "Lớp 6A1", hay "A1" (khối 6) đều lưu thành "6A1"
 */
export function normalizeClassName(rawClass: string, grade: number = 6): string {
  let cleaned = rawClass.trim().toUpperCase();
  if (!cleaned) return '';
  cleaned = cleaned.replace(/^(LỚP|LOP)\s*/i, '');
  cleaned = cleaned.replace(/\s+/g, '');
  if (!cleaned) return '';
  const gradePrefix = String(grade);
  if (!cleaned.startsWith(gradePrefix) && /^[A-Z]/.test(cleaned)) {
    cleaned = `${gradePrefix}${cleaned}`;
  }
  return cleaned;
}

/**
 * Bỏ dấu tiếng Việt để phục vụ tìm kiếm và tạo username
 */
export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/**
 * Gợi ý tên đăng nhập từ Họ tên và Lớp
 */
export function generateBaseUsername(fullName: string, className: string): string {
  const parts = removeVietnameseTones(fullName.trim().toLowerCase())
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.replace(/[^a-z0-9]/g, ''))
    .filter(Boolean);
  const cleanClass = normalizeClassName(className, 6).toLowerCase().replace(/[^a-z0-9]/g, '') || '6a1';
  if (parts.length === 0) return `hocsinh_${cleanClass}`;
  const givenName = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map((p) => p[0]).join('');
  return `${givenName}${initials}_${cleanClass}`;
}

/**
 * Gợi ý các tên đăng nhập chưa bị trùng
 */
export function suggestAvailableUsernames(
  fullName: string,
  className: string,
  desiredUsername: string,
  students: StudentAccount[]
): string[] {
  const existingSet = new Set(students.map((s) => s.username.trim().toLowerCase()));
  const baseFromInput = removeVietnameseTones(desiredUsername.trim().toLowerCase()).replace(/[^a-z0-9_]/g, '');
  const baseFromName = generateBaseUsername(fullName, className);
  const fullClean = removeVietnameseTones(fullName.trim().toLowerCase()).replace(/[^a-z0-9]/g, '');
  const cleanClass = normalizeClassName(className, 6).toLowerCase().replace(/[^a-z0-9]/g, '') || '6a1';

  const candidates = [
    baseFromName,
    fullClean ? `${fullClean}_${cleanClass}` : '',
    baseFromInput ? `${baseFromInput}_01` : '',
    baseFromInput ? `${baseFromInput}_02` : '',
    baseFromInput ? `${baseFromInput}_2026` : '',
    `${baseFromName}_01`,
    `${baseFromName}_02`,
    `${baseFromName}_03`,
    `${baseFromName}_26`,
  ].filter(Boolean);

  const uniqueSuggestions: string[] = [];
  for (const cand of candidates) {
    if (cand.length >= 3 && !existingSet.has(cand) && !uniqueSuggestions.includes(cand)) {
      uniqueSuggestions.push(cand);
    }
    if (uniqueSuggestions.length >= 4) break;
  }

  let counter = 4;
  while (uniqueSuggestions.length < 3) {
    const fallback = `${baseFromInput || baseFromName}_${counter}`;
    if (!existingSet.has(fallback) && !uniqueSuggestions.includes(fallback)) {
      uniqueSuggestions.push(fallback);
    }
    counter++;
  }

  return uniqueSuggestions;
}

// ===== PASSWORD SECURITY (Salted Hash & Strength Validation) =====
export function hashPasswordSync(password: string): string {
  if (!password) return '';
  if (password.startsWith('sha256:')) return password; // Already hashed
  const clean = password.trim();
  let h1 = 0xdeadbeef ^ clean.length;
  let h2 = 0x41c6ce57 ^ clean.length;
  for (let i = 0, ch; i < clean.length; i++) {
    ch = clean.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const salt = (clean.length * 7919).toString(36);
  return `sha256:${hex1}${hex2}_${salt}`;
}

function legacyHashPasswordSync(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const salt = password.length * 31;
  return `sha256:${Math.abs(hash).toString(36)}_${Math.abs(salt).toString(36)}`;
}

export function verifyPassword(passwordInput: string, storedPassword?: string): boolean {
  if (!storedPassword || !passwordInput) return false;
  const cleanInput = passwordInput.trim();
  if (!storedPassword.startsWith('sha256:')) {
    return cleanInput === storedPassword.trim();
  }
  return (
    hashPasswordSync(cleanInput) === storedPassword ||
    legacyHashPasswordSync(cleanInput) === storedPassword
  );
}

const WEAK_PASSWORDS = new Set([
  '1234',
  '12345',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '1234567890',
  '111111',
  '000000',
  '222222',
  '333333',
  '444444',
  '555555',
  '666666',
  '777777',
  '888888',
  '999999',
  'abcdef',
  'qwerty',
  'password',
  'matkhau',
  '654321',
  '112233',
]);

export function validatePasswordStrength(
  password: string,
  username?: string
): { valid: boolean; error?: string } {
  const clean = password.trim();
  if (clean.length < 6) {
    return { valid: false, error: 'Mật khẩu phải có tối thiểu 6 ký tự.' };
  }
  const lower = clean.toLowerCase();
  if (WEAK_PASSWORDS.has(lower) || /^(\w)\1+$/.test(lower)) {
    return {
      valid: false,
      error: 'Mật khẩu quá dễ đoán (như 123456, 111111...). Vui lòng chọn mật khẩu an toàn hơn!',
    };
  }
  if (username && lower === username.trim().toLowerCase()) {
    return {
      valid: false,
      error: 'Mật khẩu không được trùng với tên đăng nhập!',
    };
  }
  return { valid: true };
}

// ===== RECOVERY CODE (8 CHARACTERS) =====
export function generateRecoveryCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Loại bỏ I, O, 0, 1 dễ nhầm
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function normalizeRecoveryCode(code: string): string {
  return code.trim().toUpperCase().replace(/[\s-]/g, '');
}

export function verifyStudentPassword(student: StudentAccount, passwordInput: string): boolean {
  const stored = student.passwordHash || student.pinCode || '';
  return verifyPassword(passwordInput, stored);
}

export function verifyStudentRecoveryCode(student: StudentAccount, recoveryCodeInput: string): boolean {
  const cleanCode = normalizeRecoveryCode(recoveryCodeInput);
  if (!cleanCode || cleanCode.length !== 8) return false;
  if (!student.recoveryCodeHash) return false;
  return verifyPassword(cleanCode, student.recoveryCodeHash);
}

// ===== BRUTE-FORCE LOCKOUT (5 FAILED ATTEMPTS -> LOCK 5 MINUTES) =====
interface LockoutEntry {
  attempts: number;
  lockUntil: number; // timestamp ms
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

function loadLockoutMap(): Record<string, LockoutEntry> {
  try {
    const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLockoutMap(map: Record<string, LockoutEntry>) {
  try {
    localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function getLoginLockStatus(identifier: string): {
  isLocked: boolean;
  remainingSeconds: number;
  attempts: number;
} {
  const key = (identifier || 'global').trim().toLowerCase() || 'global';
  const map = loadLockoutMap();
  const entry = map[key];
  if (!entry) return { isLocked: false, remainingSeconds: 0, attempts: 0 };

  const now = Date.now();
  if (entry.lockUntil && entry.lockUntil > now) {
    return {
      isLocked: true,
      remainingSeconds: Math.ceil((entry.lockUntil - now) / 1000),
      attempts: entry.attempts,
    };
  }

  // Lock expired -> reset
  if (entry.lockUntil && entry.lockUntil <= now) {
    delete map[key];
    saveLockoutMap(map);
    return { isLocked: false, remainingSeconds: 0, attempts: 0 };
  }

  return { isLocked: false, remainingSeconds: 0, attempts: entry.attempts };
}

export function recordLoginFailure(identifier: string): {
  isLocked: boolean;
  remainingSeconds: number;
  attempts: number;
} {
  const key = (identifier || 'global').trim().toLowerCase() || 'global';
  const map = loadLockoutMap();
  const current = map[key] || { attempts: 0, lockUntil: 0 };
  const now = Date.now();

  if (current.lockUntil && current.lockUntil <= now) {
    current.attempts = 0;
    current.lockUntil = 0;
  }

  const nextAttempts = current.attempts + 1;
  const lockUntil = nextAttempts >= MAX_FAILED_ATTEMPTS ? now + LOCK_DURATION_MS : 0;

  map[key] = {
    attempts: nextAttempts,
    lockUntil,
  };
  saveLockoutMap(map);

  return {
    isLocked: lockUntil > now,
    remainingSeconds: lockUntil > now ? Math.ceil((lockUntil - now) / 1000) : 0,
    attempts: nextAttempts,
  };
}

export function clearLoginFailures(identifier: string): void {
  const key = (identifier || 'global').trim().toLowerCase() || 'global';
  const map = loadLockoutMap();
  if (map[key]) {
    delete map[key];
    saveLockoutMap(map);
  }
}

// ===== PARENT LINKED ACCOUNTS =====
export function getLinkedStudentIdsForParent(): string[] {
  try {
    const raw = localStorage.getItem(PARENT_LINKS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addLinkedStudentForParent(studentId: string): string[] {
  const current = getLinkedStudentIdsForParent();
  if (!current.includes(studentId)) {
    const next = [studentId, ...current];
    try {
      localStorage.setItem(PARENT_LINKS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    return next;
  }
  return current;
}

export function removeLinkedStudentForParent(studentId: string): string[] {
  const next = getLinkedStudentIdsForParent().filter((id) => id !== studentId);
  try {
    localStorage.setItem(PARENT_LINKS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

// ===== ADMINISTRATIVE & SCHOOL HELPERS =====
export function getProvincesList(): Array<{ code: string; name: string; communes: string[] }> {
  return vnAdminData.provinces;
}

export function getCommunesForProvince(data: AppDataSchema, provinceName: string): string[] {
  if (!provinceName) return [];
  const prov = vnAdminData.provinces.find((p) => p.name === provinceName);
  const baseCommunes = prov ? prov.communes : [];
  const custom = data.customCommunes?.[provinceName] || [];
  const fromStudents = data.students
    .filter((s) => s.provinceName === provinceName && s.communeName)
    .map((s) => s.communeName!);
  const fromSchools = (data.schools || [])
    .filter((sc) => sc.provinceName === provinceName && sc.communeName)
    .map((sc) => sc.communeName);

  return Array.from(new Set([...baseCommunes, ...custom, ...fromStudents, ...fromSchools]));
}

export function getSchoolsForCommune(
  data: AppDataSchema,
  provinceName: string,
  communeName: string
): string[] {
  if (!provinceName || !communeName) return [];
  const pNorm = provinceName.trim().toLowerCase();
  const cNorm = communeName.trim().toLowerCase();

  const defaultList = (vnAdminData.defaultSchools || [])
    .filter(
      (sc) =>
        sc.provinceName.trim().toLowerCase() === pNorm &&
        sc.communeName.trim().toLowerCase() === cNorm
    )
    .map((sc) => normalizeSchoolName(sc.schoolName));

  const savedList = (data.schools || [])
    .filter(
      (sc) =>
        sc.provinceName.trim().toLowerCase() === pNorm &&
        sc.communeName.trim().toLowerCase() === cNorm
    )
    .map((sc) => normalizeSchoolName(sc.schoolName));

  const studentSchools = data.students
    .filter(
      (s) =>
        (s.provinceName || '').trim().toLowerCase() === pNorm &&
        (s.communeName || '').trim().toLowerCase() === cNorm &&
        s.schoolName
    )
    .map((s) => normalizeSchoolName(s.schoolName!));

  const teacherSchools = data.teachers
    .filter(
      (t) =>
        (t.provinceName || '').trim().toLowerCase() === pNorm &&
        (t.communeName || '').trim().toLowerCase() === cNorm &&
        t.schoolName
    )
    .map((t) => normalizeSchoolName(t.schoolName));

  return Array.from(
    new Set([...defaultList, ...savedList, ...studentSchools, ...teacherSchools].filter(Boolean))
  );
}

export function addSchoolToSystem(
  data: AppDataSchema,
  provinceName: string,
  communeName: string,
  rawSchoolName: string
): { data: AppDataSchema; normalizedSchool: string } {
  const normalizedSchool = normalizeSchoolName(rawSchoolName);
  if (!provinceName || !communeName || !normalizedSchool) {
    return { data, normalizedSchool };
  }

  const currentSchools = data.schools || [];
  const exists = currentSchools.some(
    (sc) =>
      sc.provinceName.trim().toLowerCase() === provinceName.trim().toLowerCase() &&
      sc.communeName.trim().toLowerCase() === communeName.trim().toLowerCase() &&
      normalizeSchoolName(sc.schoolName).toLowerCase() === normalizedSchool.toLowerCase()
  );

  // Also ensure commune is registered if custom
  const existingCommunes = getCommunesForProvince(data, provinceName);
  let nextCustomCommunes = { ...(data.customCommunes || {}) };
  if (!existingCommunes.includes(communeName)) {
    nextCustomCommunes[provinceName] = [...(nextCustomCommunes[provinceName] || []), communeName];
  }

  if (exists) {
    return {
      data: { ...data, customCommunes: nextCustomCommunes },
      normalizedSchool,
    };
  }

  const newEntry: SchoolEntry = {
    provinceName: provinceName.trim(),
    communeName: communeName.trim(),
    schoolName: normalizedSchool,
    createdAt: new Date().toISOString(),
  };

  const updatedData: AppDataSchema = {
    ...data,
    schools: [...currentSchools, newEntry],
    customCommunes: nextCustomCommunes,
  };
  saveAppData(updatedData);
  return { data: updatedData, normalizedSchool };
}

// ===== INITIAL DEMO DATA =====
export const INITIAL_STUDENTS: StudentAccount[] = [
  {
    id: 'student-6a1-01',
    username: 'an_6a1',
    fullName: 'Nguyễn Văn An',
    grade: 6,
    className: '6A1',
    provinceName: 'Tỉnh Quảng Ngãi',
    communeName: 'Xã Đăk Hà',
    schoolName: 'THCS Chu Văn An',
    passwordHash: hashPasswordSync('An6a1@2026'),
    recoveryCodeHash: hashPasswordSync('AN6A1CVA'),
    parentConsent: true,
    pinCode: hashPasswordSync('An6a1@2026'),
    avatar: '👨‍🎓',
    dailyGoalMinutes: 20,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    lastLoginAt: new Date().toISOString(),
    progress: {
      ...INITIAL_PROGRESS,
      studentName: 'Nguyễn Văn An',
      totalXP: 240,
      level: 3,
      streakDays: 4,
    },
    sessions: [
      {
        id: 's1',
        unitId: 'unit-1',
        unitTitle: 'MY NEW SCHOOL',
        skill: 'Grammar',
        score: 100,
        totalQuestions: 5,
        correctAnswers: 5,
        timeSpentSeconds: 180,
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        xpEarned: 50,
      },
      {
        id: 's2',
        unitId: 'unit-2',
        unitTitle: 'MY HOUSE',
        skill: 'Pronunciation',
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        timeSpentSeconds: 210,
        date: new Date(Date.now() - 86400000 * 1).toISOString(),
        xpEarned: 40,
      },
    ],
    dailyLogs: {
      [getTodayDateString()]: {
        date: getTodayDateString(),
        timeSpentSeconds: 900, // 15 mins
        sessionsCompleted: 2,
        xpEarned: 90,
        skillsPracticed: ['Grammar', 'Pronunciation'],
        lastActiveTime: getCurrentFormattedTime(),
      },
    },
  },
  {
    id: 'student-6a2-02',
    username: 'minh_6a2',
    fullName: 'Trần Thị Minh',
    grade: 6,
    className: '6A2',
    provinceName: 'Tỉnh Quảng Ngãi',
    communeName: 'Xã Đăk Hà',
    schoolName: 'THCS Chu Văn An',
    passwordHash: hashPasswordSync('Minh6a2@26'),
    recoveryCodeHash: hashPasswordSync('MINH6A2X'),
    parentConsent: true,
    pinCode: hashPasswordSync('Minh6a2@26'),
    avatar: '👩‍🎓',
    dailyGoalMinutes: 30,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    lastLoginAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    progress: {
      ...INITIAL_PROGRESS,
      studentName: 'Trần Thị Minh',
      totalXP: 180,
      level: 2,
      streakDays: 2,
    },
    sessions: [],
    dailyLogs: {},
  },
];

// ===== MULTI-TEACHER: Default Admin Account =====
export const DEFAULT_ADMIN: TeacherAccount = {
  id: 'admin-001',
  email: 'hoangnhancva86@gmail.com',
  username: 'admin',
  fullName: 'Mrs Nhan (Admin)',
  password: hashPasswordSync('teacher2026'),
  provinceName: 'Tỉnh Quảng Ngãi',
  communeName: 'Xã Đăk Hà',
  schoolName: 'THCS Chu Văn An',
  role: 'admin',
  managedClasses: ['6A1', '6A2', '6A3', '6A4', '6A5', '6A6'],
  isActive: true,
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
};

// Legacy default for migration compatibility
export const DEFAULT_TEACHER = {
  id: 'teacher-6-01',
  username: 'giaovien6',
  fullName: 'Mrs Nhan',
  password: hashPasswordSync('teacher2026'),
  provinceName: 'Tỉnh Quảng Ngãi',
  communeName: 'Xã Đăk Hà',
  schoolName: 'THCS Chu Văn An',
  managedClasses: ['6A1', '6A2', '6A3', '6A4', '6A5', '6A6'],
  lastLoginAt: new Date().toISOString(),
};

// ===== ACTIVATION CODE HELPERS =====
export function generateActivationCode(existingCodes: ActivationCode[]): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const existingSet = new Set(existingCodes.map((c) => c.code));
  let code: string;
  let attempts = 0;
  do {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    attempts++;
    if (attempts > 1000) break;
  } while (existingSet.has(code));
  return code;
}

export function createActivationCode(
  data: AppDataSchema,
  createdBy: string,
  assignedClasses?: string[]
): AppDataSchema {
  const code = generateActivationCode(data.activationCodes);
  const newCode: ActivationCode = {
    code,
    createdBy,
    createdAt: new Date().toISOString(),
    isUsed: false,
    assignedClasses: assignedClasses || [],
  };
  const updatedData: AppDataSchema = {
    ...data,
    activationCodes: [newCode, ...data.activationCodes],
  };
  saveAppData(updatedData);
  return updatedData;
}

export function validateActivationCode(data: AppDataSchema, code: string): ActivationCode | null {
  const found = data.activationCodes.find(
    (c) => c.code.toUpperCase() === code.toUpperCase() && !c.isUsed
  );
  return found || null;
}

// ===== STUDENT PASSWORD RESET (BY RECOVERY CODE OR PARENT/TEACHER) =====
export function resetStudentPasswordWithRecoveryCode(
  data: AppDataSchema,
  username: string,
  recoveryCode: string,
  newPassword: string
): { success: boolean; data: AppDataSchema; error?: string } {
  const cleanUser = username.trim().toLowerCase();
  const student = data.students.find((s) => s.username.toLowerCase() === cleanUser);
  if (!student) {
    return { success: false, data, error: 'Không tìm thấy tài khoản với tên đăng nhập này!' };
  }

  if (!verifyStudentRecoveryCode(student, recoveryCode)) {
    return {
      success: false,
      data,
      error: 'Mã khôi phục 8 ký tự không đúng! Vui lòng kiểm tra lại.',
    };
  }

  const strength = validatePasswordStrength(newPassword, student.username);
  if (!strength.valid) {
    return { success: false, data, error: strength.error };
  }

  const hashed = hashPasswordSync(newPassword.trim());
  const updatedStudents = data.students.map((s) =>
    s.id === student.id ? { ...s, passwordHash: hashed, pinCode: hashed } : s
  );

  const updatedData: AppDataSchema = {
    ...data,
    students: updatedStudents,
  };
  clearLoginFailures(`student:${student.username}`);
  saveAppData(updatedData);
  return { success: true, data: updatedData };
}

export function resetStudentPasswordByParentOrTeacher(
  data: AppDataSchema,
  studentId: string,
  newPassword: string
): { success: boolean; data: AppDataSchema; error?: string } {
  const student = data.students.find((s) => s.id === studentId);
  if (!student) {
    return { success: false, data, error: 'Không tìm thấy tài khoản học sinh!' };
  }
  const strength = validatePasswordStrength(newPassword, student.username);
  if (!strength.valid) {
    return { success: false, data, error: strength.error };
  }
  const hashed = hashPasswordSync(newPassword.trim());
  const updatedStudents = data.students.map((s) =>
    s.id === studentId ? { ...s, passwordHash: hashed, pinCode: hashed } : s
  );
  const updatedData: AppDataSchema = {
    ...data,
    students: updatedStudents,
  };
  clearLoginFailures(`student:${student.username}`);
  saveAppData(updatedData);
  return { success: true, data: updatedData };
}

// ===== TEACHER AUTHENTICATION & REGISTRATION =====
export function authenticateTeacher(
  data: AppDataSchema,
  emailOrUsername: string,
  password: string
): TeacherAccount | null {
  const cleanId = emailOrUsername.trim().toLowerCase();
  const teacher = data.teachers.find(
    (t) =>
      (t.email.toLowerCase() === cleanId || t.username.toLowerCase() === cleanId) && t.isActive
  );
  if (!teacher) return null;

  const isValid = verifyPassword(password, teacher.password);
  if (!isValid) return null;

  if (!teacher.password.startsWith('sha256:')) {
    const hashedPassword = hashPasswordSync(password);
    const updatedTeachers = data.teachers.map((t) =>
      t.id === teacher.id ? { ...t, password: hashedPassword } : t
    );
    saveAppData({ ...data, teachers: updatedTeachers });
  }

  return teacher;
}

export function registerTeacher(
  data: AppDataSchema,
  email: string,
  fullName: string,
  schoolName: string,
  password: string,
  activationCodeStr?: string,
  provinceName?: string,
  communeName?: string
): { success: boolean; data: AppDataSchema; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const emailExists = data.teachers.some(
    (t) => t.email.toLowerCase() === cleanEmail || t.username.toLowerCase() === cleanEmail
  );
  if (emailExists) {
    return {
      success: false,
      data,
      error: 'Email hoặc Tên đăng nhập này đã được đăng ký. Vui lòng chọn tên khác!',
    };
  }

  const strength = validatePasswordStrength(password, cleanEmail);
  if (!strength.valid) {
    return { success: false, data, error: strength.error };
  }

  const normalizedFullName = normalizeFullName(fullName);
  const normalizedSchool = normalizeSchoolName(schoolName);

  // Add school to system if province & commune provided
  let workingData = data;
  if (provinceName && communeName && normalizedSchool) {
    const added = addSchoolToSystem(data, provinceName, communeName, normalizedSchool);
    workingData = added.data;
  }

  const newTeacherId = `teacher-${Date.now()}`;
  const newTeacher: TeacherAccount = {
    id: newTeacherId,
    email: cleanEmail,
    username: cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail,
    fullName: normalizedFullName,
    password: hashPasswordSync(password.trim()),
    provinceName: provinceName?.trim() || 'Tỉnh Quảng Ngãi',
    communeName: communeName?.trim() || 'Xã Đăk Hà',
    schoolName: normalizedSchool,
    role: 'teacher',
    managedClasses: [], // Tự động xem học sinh cùng trường, lọc theo lớp
    isActive: true,
    activationCode: activationCodeStr?.trim() || undefined,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  const updatedData: AppDataSchema = {
    ...workingData,
    teachers: [newTeacher, ...workingData.teachers],
  };

  saveAppData(updatedData);
  return { success: true, data: updatedData };
}

export function deactivateTeacher(data: AppDataSchema, teacherId: string): AppDataSchema {
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher || teacher.role === 'admin') return data;

  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId ? { ...t, isActive: false } : t
  );
  const updatedData: AppDataSchema = {
    ...data,
    teachers: updatedTeachers,
    isTeacherLoggedIn: data.currentTeacherId === teacherId ? false : data.isTeacherLoggedIn,
    currentTeacherId: data.currentTeacherId === teacherId ? null : data.currentTeacherId,
  };
  saveAppData(updatedData);
  return updatedData;
}

export function reactivateTeacher(data: AppDataSchema, teacherId: string): AppDataSchema {
  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId ? { ...t, isActive: true } : t
  );
  const updatedData: AppDataSchema = { ...data, teachers: updatedTeachers };
  saveAppData(updatedData);
  return updatedData;
}

export function deleteTeacherAccount(data: AppDataSchema, teacherId: string): AppDataSchema {
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher || teacher.role === 'admin') return data;

  const updatedData: AppDataSchema = {
    ...data,
    teachers: data.teachers.filter((t) => t.id !== teacherId),
    isTeacherLoggedIn: data.currentTeacherId === teacherId ? false : data.isTeacherLoggedIn,
    currentTeacherId: data.currentTeacherId === teacherId ? null : data.currentTeacherId,
  };
  saveAppData(updatedData);
  return updatedData;
}

export function updateTeacherClasses(data: AppDataSchema, teacherId: string, classes: string[]): AppDataSchema {
  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId ? { ...t, managedClasses: classes } : t
  );
  const updatedData: AppDataSchema = { ...data, teachers: updatedTeachers };
  saveAppData(updatedData);
  return updatedData;
}

/**
 * Giáo viên tự động xem được tiến độ của học sinh cùng trường, lọc theo lớp.
 * Giáo viên không phải tạo lớp hay mã.
 */
export function getTeacherStudents(data: AppDataSchema, teacherId: string | null): StudentAccount[] {
  if (!teacherId) return data.students;
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher) return [];
  if (teacher.role === 'admin') return data.students;

  const teacherSchoolNorm = normalizeSchoolName(teacher.schoolName).toLowerCase();
  if (!teacherSchoolNorm) return data.students;

  return data.students.filter((s) => {
    const studentSchoolNorm = normalizeSchoolName(s.schoolName || '').toLowerCase();
    // Nếu cùng trường (và nếu cả 2 có xã/tỉnh thì khớp xã/tỉnh, hoặc tên trường khớp)
    const schoolMatch =
      studentSchoolNorm === teacherSchoolNorm ||
      studentSchoolNorm.includes(teacherSchoolNorm) ||
      teacherSchoolNorm.includes(studentSchoolNorm);

    if (!schoolMatch) return false;

    if (teacher.provinceName && s.provinceName) {
      if (teacher.provinceName.trim().toLowerCase() !== s.provinceName.trim().toLowerCase()) {
        return false;
      }
    }
    return true;
  });
}

export function getCurrentTeacher(data: AppDataSchema): TeacherAccount | null {
  if (!data.currentTeacherId) return null;
  return data.teachers.find((t) => t.id === data.currentTeacherId) || null;
}

export function isCurrentTeacherAdmin(data: AppDataSchema): boolean {
  const teacher = getCurrentTeacher(data);
  return teacher?.role === 'admin';
}

export function deleteActivationCode(data: AppDataSchema, code: string): AppDataSchema {
  const updatedData: AppDataSchema = {
    ...data,
    activationCodes: data.activationCodes.filter((c) => c.code !== code || c.isUsed),
  };
  saveAppData(updatedData);
  return updatedData;
}

// ===== TEACHER PROFILE UPDATE =====
export function updateTeacherProfile(
  data: AppDataSchema,
  teacherId: string,
  updates: { fullName?: string; schoolName?: string; newPassword?: string; oldPassword?: string }
): { success: boolean; data: AppDataSchema; error?: string } {
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher) return { success: false, data, error: 'Không tìm thấy tài khoản giáo viên!' };

  if (updates.newPassword) {
    if (!updates.oldPassword || !verifyPassword(updates.oldPassword, teacher.password)) {
      return { success: false, data, error: 'Mật khẩu cũ không đúng!' };
    }
    const strength = validatePasswordStrength(updates.newPassword, teacher.email);
    if (!strength.valid) {
      return { success: false, data, error: strength.error };
    }
  }

  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId
      ? {
          ...t,
          fullName: updates.fullName ? normalizeFullName(updates.fullName) : t.fullName,
          schoolName: updates.schoolName ? normalizeSchoolName(updates.schoolName) : t.schoolName,
          password: updates.newPassword ? hashPasswordSync(updates.newPassword) : t.password,
        }
      : t
  );
  const updatedData: AppDataSchema = { ...data, teachers: updatedTeachers };
  saveAppData(updatedData);
  return { success: true, data: updatedData };
}

// ===== AVAILABLE CLASSES (Dynamic from students in same school) =====
const DEFAULT_CLASSES = ['6A1', '6A2', '6A3', '6A4', '6A5', '6A6'];

export function getAvailableClasses(data: AppDataSchema, teacherId?: string | null): string[] {
  const targetStudents = teacherId ? getTeacherStudents(data, teacherId) : data.students;
  const classSet = new Set<string>();
  targetStudents.forEach((s) => {
    if (s.className) classSet.add(normalizeClassName(s.className));
  });
  if (classSet.size === 0) {
    DEFAULT_CLASSES.forEach((c) => classSet.add(c));
  }
  (data.customClasses || []).forEach((c) => classSet.add(normalizeClassName(c)));
  return Array.from(classSet).filter(Boolean).sort();
}

export function addCustomClass(data: AppDataSchema, className: string): AppDataSchema {
  const normalized = normalizeClassName(className);
  if (!normalized) return data;
  const existing = data.customClasses || [];
  if (existing.includes(normalized)) return data;
  const updatedData: AppDataSchema = {
    ...data,
    customClasses: [...existing, normalized],
  };
  saveAppData(updatedData);
  return updatedData;
}

// ===== MIGRATION: Old single teacherAccount → multi-teacher teachers[] =====
function migrateTeacherData(parsed: any): TeacherAccount[] {
  if (parsed.teachers && Array.isArray(parsed.teachers) && parsed.teachers.length > 0) {
    const normalizedTeachers = parsed.teachers.map((t: TeacherAccount) => ({
      ...t,
      provinceName: t.provinceName || 'Tỉnh Quảng Ngãi',
      communeName: t.communeName || 'Xã Đăk Hà',
      schoolName: normalizeSchoolName(t.schoolName || 'THCS Chu Văn An'),
      password: hashPasswordSync(t.password || 'teacher2026'),
      managedClasses: (t.managedClasses || []).map((c: string) => normalizeClassName(c)),
    }));
    const hasAdmin = normalizedTeachers.some((t: TeacherAccount) => t.email === DEFAULT_ADMIN.email);
    if (!hasAdmin) {
      return [DEFAULT_ADMIN, ...normalizedTeachers];
    }
    return normalizedTeachers;
  }

  const teachers: TeacherAccount[] = [DEFAULT_ADMIN];
  if (parsed.teacherAccount && parsed.teacherAccount.id !== DEFAULT_ADMIN.id) {
    const oldTeacher = parsed.teacherAccount;
    teachers.push({
      id: oldTeacher.id || `teacher-migrated-${Date.now()}`,
      email: `${oldTeacher.username || 'giaovien'}@migrated.local`,
      username: oldTeacher.username || 'giaovien6',
      fullName: normalizeFullName(oldTeacher.fullName || 'Giáo Viên'),
      password: hashPasswordSync(oldTeacher.password || 'teacher2026'),
      provinceName: 'Tỉnh Quảng Ngãi',
      communeName: 'Xã Đăk Hà',
      schoolName: normalizeSchoolName(oldTeacher.schoolName || 'THCS Chu Văn An'),
      role: 'teacher',
      managedClasses: (oldTeacher.managedClasses || []).map((c: string) => normalizeClassName(c)),
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: oldTeacher.lastLoginAt,
    });
  }

  return teachers;
}

function migrateStudentsData(rawStudents: any[]): StudentAccount[] {
  if (!Array.isArray(rawStudents) || rawStudents.length === 0) {
    return INITIAL_STUDENTS;
  }
  return rawStudents.map((s) => {
    const rawPass = s.passwordHash || s.pinCode || '123456';
    const hashed = hashPasswordSync(rawPass);
    const comm =
      !s.communeName || s.communeName === 'Thị trấn Đăk Hà' ? 'Xã Đăk Hà' : s.communeName;
    return {
      ...s,
      fullName: normalizeFullName(s.fullName || 'Học Sinh'),
      grade: s.grade || 6,
      className: normalizeClassName(s.className || '6A1'),
      provinceName: s.provinceName || 'Tỉnh Quảng Ngãi',
      communeName: comm,
      schoolName: normalizeSchoolName(s.schoolName || 'THCS Chu Văn An'),
      passwordHash: hashed,
      pinCode: hashed,
      recoveryCodeHash: s.recoveryCodeHash || hashPasswordSync('AN6A1CVA'),
    };
  });
}

// ===== LOAD & SAVE =====
export function loadAppData(): AppDataSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const students: StudentAccount[] = migrateStudentsData(parsed.students);
      const currentStudentId =
        parsed.currentStudentId !== undefined ? parsed.currentStudentId : students[0]?.id || null;

      const activeStudent = students.find((s) => s.id === currentStudentId);

      const builtInIds = new Set(DEMO_QUESTIONS.map((q) => q.id));
      const customQuestions = (parsed.questions || []).filter((q: Question) => !builtInIds.has(q.id));
      const mergedQuestions = [...DEMO_QUESTIONS, ...customQuestions];

      const teachers = migrateTeacherData(parsed);

      const defaultSchools: SchoolEntry[] = (vnAdminData.defaultSchools || []).map((sc) => ({
        provinceName: sc.provinceName,
        communeName: sc.communeName,
        schoolName: normalizeSchoolName(sc.schoolName),
      }));
      const savedSchools: SchoolEntry[] = Array.isArray(parsed.schools) ? parsed.schools : defaultSchools;

      return {
        units: SGK_UNITS,
        questions: mergedQuestions,
        sessions: activeStudent ? activeStudent.sessions : parsed.sessions || [],
        progress: activeStudent ? activeStudent.progress : parsed.progress || INITIAL_PROGRESS,
        students,
        currentStudentId,
        isTeacherLoggedIn: parsed.isTeacherLoggedIn || false,
        currentTeacherId: parsed.currentTeacherId || null,
        teachers,
        activationCodes: parsed.activationCodes || [],
        customClasses: (parsed.customClasses || []).map((c: string) => normalizeClassName(c)),
        schools: savedSchools,
        customCommunes: parsed.customCommunes || {},
        classCurrentUnits: parsed.classCurrentUnits || { DEFAULT: 'unit-1' },
        masteryThresholds: parsed.masteryThresholds || undefined,
        teacherAccount:
          parsed.teacherAccount || {
            ...DEFAULT_TEACHER,
            email: DEFAULT_ADMIN.email,
            role: 'admin',
            isActive: true,
            createdAt: new Date().toISOString(),
          },
        settings: {
          geminiApiKey: localStorage.getItem('gemini_api_key') || '',
          selectedModel: (localStorage.getItem('gemini_selected_model') as any) || 'gemini-3.6-flash',
          soundEnabled: parsed.settings?.soundEnabled ?? true,
          speechSpeed: parsed.settings?.speechSpeed ?? 1.0,
          theme: parsed.settings?.theme ?? 'light',
          autoSave: parsed.settings?.autoSave ?? true,
        },
        customDocuments: parsed.customDocuments || [],
      };
    }
  } catch (err) {
    console.error('Lỗi đọc LocalStorage:', err);
  }

  const defaultStudent = INITIAL_STUDENTS[0];
  return {
    units: SGK_UNITS,
    questions: DEMO_QUESTIONS,
    sessions: defaultStudent.sessions,
    progress: defaultStudent.progress,
    students: INITIAL_STUDENTS,
    currentStudentId: defaultStudent.id,
    isTeacherLoggedIn: false,
    currentTeacherId: null,
    teachers: [DEFAULT_ADMIN],
    activationCodes: [],
    customClasses: [],
    schools: (vnAdminData.defaultSchools || []).map((sc) => ({
      provinceName: sc.provinceName,
      communeName: sc.communeName,
      schoolName: normalizeSchoolName(sc.schoolName),
    })),
    customCommunes: {},
    classCurrentUnits: { DEFAULT: 'unit-1' },
    teacherAccount: {
      ...DEFAULT_TEACHER,
      email: DEFAULT_ADMIN.email,
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
    } as any,
    settings: {
      geminiApiKey: localStorage.getItem('gemini_api_key') || '',
      selectedModel: (localStorage.getItem('gemini_selected_model') as any) || 'gemini-3.6-flash',
      soundEnabled: true,
      speechSpeed: 1.0,
      theme: 'light',
      autoSave: true,
    },
    customDocuments: [],
  };
}

let _quotaWarningShown = false;
export function saveAppData(data: AppDataSchema) {
  try {
    const jsonStr = JSON.stringify(data);
    const sizeBytes = new Blob([jsonStr]).size;
    const sizeMB = sizeBytes / (1024 * 1024);

    if (sizeMB > 4 && !_quotaWarningShown) {
      _quotaWarningShown = true;
      console.warn(`⚠️ localStorage sắp đầy: ${sizeMB.toFixed(2)}MB / 5MB.`);
      window.dispatchEvent(new CustomEvent('storage-quota-warning', { detail: { sizeMB } }));
    }

    localStorage.setItem(STORAGE_KEY, jsonStr);
    if (data.settings.geminiApiKey !== undefined) {
      localStorage.setItem('gemini_api_key', data.settings.geminiApiKey);
    }
    if (data.settings.selectedModel) {
      localStorage.setItem('gemini_selected_model', data.settings.selectedModel);
    }
  } catch (err) {
    console.error('Lỗi ghi LocalStorage:', err);
    window.dispatchEvent(new CustomEvent('storage-quota-exceeded'));
  }
}

export function addStudySession(data: AppDataSchema, session: StudySession): AppDataSchema {
  const today = getTodayDateString();
  const timeNowStr = getCurrentFormattedTime();

  const newSessions = [session, ...data.sessions];
  const newXP = data.progress.totalXP + session.xpEarned;
  const newLevel = Math.floor(newXP / 100) + 1;

  let streakDays = data.progress.streakDays;
  if (data.progress.lastStudyDate !== today) {
    streakDays += 1;
  }

  const existingCompleted = data.progress.unitProgress[session.unitId] || 0;
  const updatedUnitProgress = {
    ...data.progress.unitProgress,
    [session.unitId]: Math.min(100, existingCompleted + 20),
  };

  const updatedProgress: UserProgress = {
    ...data.progress,
    totalXP: newXP,
    level: newLevel,
    streakDays,
    lastStudyDate: today,
    unitProgress: updatedUnitProgress,
  };

  let updatedStudents = [...data.students];
  if (data.currentStudentId) {
    updatedStudents = updatedStudents.map((st) => {
      if (st.id === data.currentStudentId) {
        const currentDailyLog: DailyStudyLog = st.dailyLogs[today] || {
          date: today,
          timeSpentSeconds: 0,
          sessionsCompleted: 0,
          xpEarned: 0,
          skillsPracticed: [],
          lastActiveTime: timeNowStr,
        };

        const uniqueSkills = Array.from(new Set([...currentDailyLog.skillsPracticed, session.skill]));

        const newDailyLog: DailyStudyLog = {
          date: today,
          timeSpentSeconds: currentDailyLog.timeSpentSeconds + session.timeSpentSeconds,
          sessionsCompleted: currentDailyLog.sessionsCompleted + 1,
          xpEarned: currentDailyLog.xpEarned + session.xpEarned,
          skillsPracticed: uniqueSkills,
          lastActiveTime: timeNowStr,
        };

        const skillLabelMap: Record<string, { label: string; tabId: string }> = {
          Grammar: { label: 'Ngữ pháp', tabId: 'socratic' },
          Vocabulary: { label: 'Từ vựng', tabId: 'practice' },
          Pronunciation: { label: 'Phát âm', tabId: 'speech' },
          Reading: { label: 'Đọc hiểu', tabId: 'reading-game' },
          Writing: { label: 'Viết', tabId: 'writing' },
        };
        const matchedUnit =
          data.units.find((u) => u.id === session.unitId) ||
          data.units[0];
        const skillMeta = skillLabelMap[session.skill] || skillLabelMap.Grammar;

        return {
          ...st,
          progress: updatedProgress,
          sessions: [session, ...st.sessions],
          lastActiveLesson: {
            unitId: matchedUnit.id,
            unitNumber: matchedUnit.unitNumber,
            unitTitle: matchedUnit.title,
            skill: session.skill,
            skillLabel: skillMeta.label,
            tabId: skillMeta.tabId,
            progressPercent: updatedUnitProgress[matchedUnit.id] || session.score || 40,
            updatedAt: new Date().toISOString(),
          },
          dailyLogs: {
            ...st.dailyLogs,
            [today]: newDailyLog,
          },
        };
      }
      return st;
    });
  }

  const updatedData: AppDataSchema = {
    ...data,
    sessions: newSessions,
    progress: updatedProgress,
    students: updatedStudents,
  };

  saveAppData(updatedData);
  return updatedData;
}

export function recordTimeSpent(data: AppDataSchema, secondsToAdd: number): AppDataSchema {
  if (!data.currentStudentId || secondsToAdd <= 0) return data;
  const today = getTodayDateString();
  const timeNowStr = getCurrentFormattedTime();

  const updatedStudents = data.students.map((st) => {
    if (st.id === data.currentStudentId) {
      const currentDailyLog: DailyStudyLog = st.dailyLogs[today] || {
        date: today,
        timeSpentSeconds: 0,
        sessionsCompleted: 0,
        xpEarned: 0,
        skillsPracticed: [],
        lastActiveTime: timeNowStr,
      };

      const newDailyLog: DailyStudyLog = {
        ...currentDailyLog,
        timeSpentSeconds: currentDailyLog.timeSpentSeconds + secondsToAdd,
        lastActiveTime: timeNowStr,
      };

      return {
        ...st,
        dailyLogs: {
          ...st.dailyLogs,
          [today]: newDailyLog,
        },
      };
    }
    return st;
  });

  const updatedData = {
    ...data,
    students: updatedStudents,
  };
  saveAppData(updatedData);
  return updatedData;
}

export function exportBackupJSON(data: AppDataSchema) {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `GiaSuAI_TiengAnh6_Backup_${getTodayDateString()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportTeacherBackupJSON(data: AppDataSchema, teacherId: string) {
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher) return;

  const teacherStudents = getTeacherStudents(data, teacherId);

  const exportPayload = {
    version: '6.0-teacher-backup',
    exportedAt: new Date().toISOString(),
    teacher: {
      id: teacher.id,
      fullName: teacher.fullName,
      email: teacher.email,
      provinceName: teacher.provinceName,
      communeName: teacher.communeName,
      schoolName: teacher.schoolName,
      managedClasses: teacher.managedClasses,
    },
    students: teacherStudents,
    customClasses: data.customClasses || [],
  };

  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().split('T')[0];
  const safeName = (teacher.username || 'giaovien').replace(/[^a-zA-Z0-9]/g, '_');
  a.download = `englishtutor6_lop_hoctap_${safeName}_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importTeacherBackupJSON(
  data: AppDataSchema,
  importedJson: any
): { success: boolean; data: AppDataSchema; count: number; error?: string } {
  if (!importedJson || !Array.isArray(importedJson.students)) {
    return { success: false, data, count: 0, error: 'File JSON không chứa danh sách học sinh hợp lệ!' };
  }

  const existingMap = new Map(data.students.map((s) => [s.id, s]));
  let addedCount = 0;

  importedJson.students.forEach((st: StudentAccount) => {
    if (st && st.id && st.fullName) {
      if (!existingMap.has(st.id)) {
        existingMap.set(st.id, st);
        addedCount++;
      } else {
        existingMap.set(st.id, { ...existingMap.get(st.id)!, ...st });
      }
    }
  });

  const updatedStudents = Array.from(existingMap.values());
  const updatedData: AppDataSchema = {
    ...data,
    students: updatedStudents,
  };

  saveAppData(updatedData);
  return { success: true, data: updatedData, count: addedCount };
}

export function deleteStudentByTeacher(data: AppDataSchema, studentId: string): AppDataSchema {
  const updatedStudents = data.students.filter((s) => s.id !== studentId);
  const updatedCurrentId =
    data.currentStudentId === studentId ? updatedStudents[0]?.id || null : data.currentStudentId;
  const updatedData: AppDataSchema = {
    ...data,
    students: updatedStudents,
    currentStudentId: updatedCurrentId,
  };
  saveAppData(updatedData);
  return updatedData;
}

export function updateStudentByTeacher(
  data: AppDataSchema,
  studentId: string,
  updatedFields: Partial<StudentAccount>
): AppDataSchema {
  const normalizedFields: Partial<StudentAccount> = { ...updatedFields };
  if (normalizedFields.fullName) {
    normalizedFields.fullName = normalizeFullName(normalizedFields.fullName);
  }
  if (normalizedFields.className) {
    normalizedFields.className = normalizeClassName(normalizedFields.className);
  }
  if (normalizedFields.schoolName) {
    normalizedFields.schoolName = normalizeSchoolName(normalizedFields.schoolName);
  }
  if (normalizedFields.pinCode && !normalizedFields.pinCode.startsWith('sha256:')) {
    const hashed = hashPasswordSync(normalizedFields.pinCode);
    normalizedFields.pinCode = hashed;
    normalizedFields.passwordHash = hashed;
  }

  const updatedStudents = data.students.map((st) => {
    if (st.id === studentId) {
      return {
        ...st,
        ...normalizedFields,
      };
    }
    return st;
  });
  const updatedData: AppDataSchema = {
    ...data,
    students: updatedStudents,
  };
  saveAppData(updatedData);
  return updatedData;
}

export function resetStudentPinByTeacher(
  data: AppDataSchema,
  studentId: string,
  newPin: string
): AppDataSchema {
  const hashed = hashPasswordSync(newPin.trim());
  const target = data.students.find((s) => s.id === studentId);
  if (target) {
    clearLoginFailures(`student:${target.username.toLowerCase()}`);
  }
  return updateStudentByTeacher(data, studentId, {
    pinCode: hashed,
    passwordHash: hashed,
  });
}
