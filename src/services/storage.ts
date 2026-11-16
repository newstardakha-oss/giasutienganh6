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
  UnmappedMigrationItem,
  AuditLogEntry,
  AuditLogSnapshotItem,
  MigrationReport,
} from '../types';
import { SGK_UNITS, DEMO_QUESTIONS, INITIAL_PROGRESS } from '../data/sgkData';
import vnAdminData from '../data/vn_admin_2025.json';

const STORAGE_KEY = 'giasu_ai_english6_data_v1';
const MIGRATION_BACKUP_KEY = 'giasu_ai_migration_backup_v1';
const LOCKOUT_STORAGE_KEY = 'giasu_ai_login_lockout_v1';
const PARENT_LINKS_STORAGE_KEY = 'giasu_ai_parent_links_v1';

export const AUDIT_LOG_TTL_DAYS = 90;
export const MAX_EXPORT_STUDENTS_LIMIT = 500;

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
  const cleanClass = normalizeClassName(className, 6).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (parts.length === 0) return cleanClass ? `hocsinh_${cleanClass}` : 'hocsinh';
  const givenName = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map((p) => p[0]).join('');
  const baseName = `${givenName}${initials}`;
  return cleanClass ? `${baseName}_${cleanClass}` : baseName;
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
  const cleanClass = normalizeClassName(className, 6).toLowerCase().replace(/[^a-z0-9]/g, '');

  const candidates = [
    baseFromName,
    fullClean && cleanClass ? `${fullClean}_${cleanClass}` : fullClean,
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

// ===== ADMINISTRATIVE & SCHOOL HELPERS (WITH CANONICAL CODES) =====
export function getProvincesList(): Array<{ code: string; name: string; communes: string[] }> {
  return vnAdminData.provinces;
}

export function slugifyAscii(raw: string): string {
  return removeVietnameseTones(raw.trim().toUpperCase())
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Tìm mã Tỉnh chuẩn (VD: "P19") theo khớp chính xác tên tỉnh trong danh mục vn_admin_2025.json
 * Không tự đoán nếu tên không khớp chính xác.
 */
export function getProvinceCodeByName(provinceName?: string): string | null {
  if (!provinceName || !provinceName.trim()) return null;
  const clean = provinceName.trim().toLowerCase();
  const found = vnAdminData.provinces.find(
    (p) => p.name.trim().toLowerCase() === clean || p.code.toLowerCase() === clean
  );
  return found ? found.code : null;
}

export function getProvinceByCode(provinceCode?: string): { code: string; name: string; communes: string[] } | null {
  if (!provinceCode || !provinceCode.trim()) return null;
  const clean = provinceCode.trim().toUpperCase();
  return vnAdminData.provinces.find((p) => p.code.toUpperCase() === clean) || null;
}

/**
 * Trả về danh sách Xã/Phường kèm mã định danh chuẩn cho 1 Tỉnh
 */
export function getCommunesWithCodesForProvince(
  data: Pick<AppDataSchema, 'customCommunes' | 'schools'>,
  provinceCodeOrName: string
): Array<{ code: string; name: string; provinceCode: string }> {
  const prov =
    getProvinceByCode(provinceCodeOrName) ||
    vnAdminData.provinces.find((p) => p.name.trim().toLowerCase() === provinceCodeOrName.trim().toLowerCase());
  if (!prov) return [];

  const result: Array<{ code: string; name: string; provinceCode: string }> = [];
  const seenNames = new Set<string>();

  prov.communes.forEach((cName, idx) => {
    const norm = cName.trim().toLowerCase();
    if (!seenNames.has(norm)) {
      seenNames.add(norm);
      result.push({
        code: `${prov.code}_C${String(idx + 1).padStart(3, '0')}`,
        name: cName.trim(),
        provinceCode: prov.code,
      });
    }
  });

  const customList = data.customCommunes?.[prov.name] || [];
  customList.forEach((cName) => {
    const norm = cName.trim().toLowerCase();
    if (norm && !seenNames.has(norm)) {
      seenNames.add(norm);
      result.push({
        code: `${prov.code}_CX_${slugifyAscii(cName)}`,
        name: cName.trim(),
        provinceCode: prov.code,
      });
    }
  });

  return result;
}

export function getCommuneCodeByName(
  data: Pick<AppDataSchema, 'customCommunes' | 'schools'>,
  provinceCode: string,
  communeName?: string
): string | null {
  if (!provinceCode || !communeName || !communeName.trim()) return null;
  const clean = communeName.trim().toLowerCase();
  const list = getCommunesWithCodesForProvince(data, provinceCode);
  const found = list.find(
    (c) => c.name.toLowerCase() === clean || c.code.toLowerCase() === clean
  );
  return found ? found.code : null;
}

export function buildCanonicalSchoolId(
  provinceCode: string,
  communeCode: string,
  schoolName: string
): string {
  const normSchool = normalizeSchoolName(schoolName);
  const slug = slugifyAscii(normSchool || schoolName);
  return `SCH_${provinceCode.toUpperCase()}_${communeCode.toUpperCase()}_${slug}`;
}

export function buildCanonicalClassId(schoolId: string, className: string): string {
  const normClass = normalizeClassName(className);
  return `${schoolId}__${normClass}`;
}

/**
 * Tra cứu danh mục Trường có mã chuẩn cho 1 Tỉnh + Xã
 */
export function getCanonicalSchoolsDirectory(
  data?: Partial<Pick<AppDataSchema, 'schools' | 'customCommunes'>>
): SchoolEntry[] {
  const context = {
    customCommunes: data?.customCommunes || {},
    schools: data?.schools || [],
  };
  const rawEntries: SchoolEntry[] = [
    ...(vnAdminData.defaultSchools || []).map((sc) => ({
      provinceName: sc.provinceName,
      communeName: sc.communeName,
      schoolName: normalizeSchoolName(sc.schoolName),
    })),
    ...(data?.schools || []),
  ];

  const map = new Map<string, SchoolEntry>();
  rawEntries.forEach((sc) => {
    const pCode = sc.provinceCode || getProvinceCodeByName(sc.provinceName);
    if (!pCode) return;
    const cCode = sc.communeCode || getCommuneCodeByName(context, pCode, sc.communeName);
    if (!cCode) return;
    const normSchool = normalizeSchoolName(sc.schoolName);
    if (!normSchool) return;
    const sId = sc.schoolId || buildCanonicalSchoolId(pCode, cCode, normSchool);
    if (!map.has(sId)) {
      map.set(sId, {
        schoolId: sId,
        provinceCode: pCode,
        communeCode: cCode,
        provinceName: getProvinceByCode(pCode)?.name || sc.provinceName.trim(),
        communeName: sc.communeName.trim(),
        schoolName: normSchool,
        createdAt: sc.createdAt,
      });
    }
  });

  return Array.from(map.values());
}

/**
 * Ánh xạ nghiêm ngặt (Strict Mapping) từ thông tin thô sang Mã định danh chuẩn.
 * Tuyệt đối KHÔNG tự đoán nếu thiếu hoặc không khớp chính xác danh mục.
 */
export function resolveCanonicalLocationStrict(
  data: Pick<AppDataSchema, 'schools' | 'customCommunes'>,
  input: {
    provinceCode?: string;
    communeCode?: string;
    schoolId?: string;
    provinceName?: string;
    communeName?: string;
    schoolName?: string;
    className?: string;
    requireClass?: boolean;
  }
):
  | {
      mapped: true;
      provinceCode: string;
      provinceName: string;
      communeCode: string;
      communeName: string;
      schoolId: string;
      schoolName: string;
      classId?: string;
      className?: string;
      reason?: string;
    }
  | {
      mapped: false;
      reason: string;
    } {
  const directory = getCanonicalSchoolsDirectory(data);

  // 1. Resolve Province
  const pCode = input.provinceCode
    ? getProvinceByCode(input.provinceCode)?.code || null
    : getProvinceCodeByName(input.provinceName);
  if (!pCode) {
    return {
      mapped: false,
      reason: `Tỉnh/Thành phố "${input.provinceName || input.provinceCode || ''}" trống hoặc không khớp danh mục chuẩn.`,
    };
  }
  const provObj = getProvinceByCode(pCode)!;

  // 2. Resolve Commune
  const communesInProv = getCommunesWithCodesForProvince(data, pCode);
  const cObj = input.communeCode
    ? communesInProv.find((c) => c.code.toUpperCase() === input.communeCode!.trim().toUpperCase())
    : communesInProv.find(
        (c) => c.name.toLowerCase() === (input.communeName || '').trim().toLowerCase()
      );
  if (!cObj) {
    return {
      mapped: false,
      reason: `Xã/Phường "${input.communeName || input.communeCode || ''}" không thuộc danh mục chuẩn của ${provObj.name}.`,
    };
  }

  // 3. Resolve School strictly against canonical directory for (pCode, cCode)
  const normSchool = input.schoolName ? normalizeSchoolName(input.schoolName) : '';
  const schoolEntry = input.schoolId
    ? directory.find(
        (s) =>
          s.schoolId === input.schoolId &&
          s.provinceCode === pCode &&
          s.communeCode === cObj.code
      )
    : directory.find(
        (s) =>
          s.provinceCode === pCode &&
          s.communeCode === cObj.code &&
          normalizeSchoolName(s.schoolName).toLowerCase() === normSchool.toLowerCase()
      );

  if (!schoolEntry || !schoolEntry.schoolId) {
    return {
      mapped: false,
      reason: `Trường "${input.schoolName || input.schoolId || ''}" chưa có trong danh mục chuẩn tại ${cObj.name} (${provObj.name}).`,
    };
  }

  if (input.requireClass) {
    const normClass = normalizeClassName(input.className || '');
    if (!normClass || !/^6[A-Z0-9]+$/.test(normClass)) {
      return {
        mapped: false,
        reason: `Lớp "${input.className || ''}" không hợp lệ (cần định dạng khối 6, VD: 6A1).`,
      };
    }
    return {
      mapped: true,
      provinceCode: pCode,
      provinceName: provObj.name,
      communeCode: cObj.code,
      communeName: cObj.name,
      schoolId: schoolEntry.schoolId,
      schoolName: schoolEntry.schoolName,
      className: normClass,
      classId: buildCanonicalClassId(schoolEntry.schoolId, normClass),
    };
  }

  return {
    mapped: true,
    provinceCode: pCode,
    provinceName: provObj.name,
    communeCode: cObj.code,
    communeName: cObj.name,
    schoolId: schoolEntry.schoolId,
    schoolName: schoolEntry.schoolName,
  };
}

export function getCommunesForProvince(data: AppDataSchema, provinceName: string): string[] {
  if (!provinceName) return [];
  const list = getCommunesWithCodesForProvince(data, provinceName);
  return list.map((c) => c.name);
}

export function getSchoolsForCommune(
  data: AppDataSchema,
  provinceName: string,
  communeName: string
): string[] {
  if (!provinceName || !communeName) return [];
  const pCode = getProvinceCodeByName(provinceName);
  if (!pCode) return [];
  const cCode = getCommuneCodeByName(data, pCode, communeName);
  if (!cCode) return [];
  return getCanonicalSchoolsDirectory(data)
    .filter((s) => s.provinceCode === pCode && s.communeCode === cCode)
    .map((s) => s.schoolName);
}

export function addSchoolToSystem(
  data: AppDataSchema,
  provinceName: string,
  communeName: string,
  rawSchoolName: string
): { data: AppDataSchema; normalizedSchool: string; schoolEntry?: SchoolEntry } {
  const normalizedSchool = normalizeSchoolName(rawSchoolName);
  if (!provinceName || !communeName || !normalizedSchool) {
    return { data, normalizedSchool };
  }

  const pCode = getProvinceCodeByName(provinceName);
  if (!pCode) {
    return { data, normalizedSchool };
  }
  const provObj = getProvinceByCode(pCode)!;

  // Ensure commune is registered if custom
  const existingCommunes = getCommunesForProvince(data, provObj.name);
  const nextCustomCommunes = { ...(data.customCommunes || {}) };
  if (!existingCommunes.some((c) => c.toLowerCase() === communeName.trim().toLowerCase())) {
    nextCustomCommunes[provObj.name] = [
      ...(nextCustomCommunes[provObj.name] || []),
      communeName.trim(),
    ];
  }

  const tempContext = { schools: data.schools || [], customCommunes: nextCustomCommunes };
  const cCode = getCommuneCodeByName(tempContext, pCode, communeName);
  if (!cCode) {
    return { data, normalizedSchool };
  }

  const sId = buildCanonicalSchoolId(pCode, cCode, normalizedSchool);
  const currentSchools = getCanonicalSchoolsDirectory(tempContext);
  const existingEntry = currentSchools.find((sc) => sc.schoolId === sId);

  if (existingEntry) {
    const updatedData: AppDataSchema = {
      ...data,
      schools: currentSchools,
      customCommunes: nextCustomCommunes,
    };
    return {
      data: updatedData,
      normalizedSchool,
      schoolEntry: existingEntry,
    };
  }

  const newEntry: SchoolEntry = {
    schoolId: sId,
    provinceCode: pCode,
    communeCode: cCode,
    provinceName: provObj.name,
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
  return { data: updatedData, normalizedSchool, schoolEntry: newEntry };
}

// ===== AUDIT LOG & MIGRATION ENGINE (IDEMPOTENT, DRY-RUN, BACKUP, UNMAPPED QUEUE) =====
export function pruneExpiredAuditLogs(logs: AuditLogEntry[] = []): AuditLogEntry[] {
  const nowMs = Date.now();
  return logs.filter((l) => {
    const exp = Date.parse(l.expiresAt);
    return Number.isNaN(exp) || exp > nowMs;
  });
}

export function createAuditLogEntry(params: {
  actorId: string;
  actorRole: 'admin' | 'teacher';
  action: AuditLogEntry['action'];
  targetIds: string[];
  beforeSnapshot: AuditLogSnapshotItem[];
  afterSnapshot: AuditLogSnapshotItem[];
}): AuditLogEntry {
  const now = new Date();
  const expires = new Date(now.getTime() + AUDIT_LOG_TTL_DAYS * 24 * 60 * 60 * 1000);
  return {
    id: `audit_${now.getTime()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: now.toISOString(),
    expiresAt: expires.toISOString(),
    actorId: params.actorId,
    actorRole: params.actorRole,
    action: params.action,
    targetIds: params.targetIds,
    beforeSnapshot: params.beforeSnapshot,
    afterSnapshot: params.afterSnapshot,
  };
}

export function appendAuditLog(data: AppDataSchema, entry: AuditLogEntry): AppDataSchema {
  const validLogs = pruneExpiredAuditLogs(data.auditLogs || []);
  return {
    ...data,
    auditLogs: [entry, ...validLogs].slice(0, 1000),
    revision: (data.revision || 0) + 1,
  };
}

/**
 * Chạy Migration ánh xạ dữ liệu cũ sang Mã định danh chuẩn (`provinceCode`, `communeCode`, `schoolId`, `classId`).
 * - Hỗ trợ `dryRun: true` (chỉ kiểm tra, không ghi).
 * - Khi `dryRun: false`, tự động sao lưu bản gốc vào `giasu_ai_migration_backup_v1` trước khi chạy.
 * - Idempotent (chạy lặp lại nhiều lần không nhân bản log hay làm sai lệch bản ghi đã mapped).
 * - Không tự đoán: Bản ghi thiếu hoặc lệch danh mục chuẩn được đưa vào `unmappedMigrationQueue`.
 */
export function runDirectoryCodeMigration(
  data: AppDataSchema,
  options: { dryRun?: boolean; actorId?: string } = {}
): { data: AppDataSchema; report: MigrationReport } {
  const dryRun = Boolean(options.dryRun);
  const nowIso = new Date().toISOString();
  let backupKey: string | null = null;

  if (!dryRun && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(MIGRATION_BACKUP_KEY, JSON.stringify(data));
      backupKey = MIGRATION_BACKUP_KEY;
    } catch {
      backupKey = null;
    }
  } else if (!dryRun) {
    backupKey = MIGRATION_BACKUP_KEY;
  }

  const canonicalSchools = getCanonicalSchoolsDirectory(data);
  const context = { schools: canonicalSchools, customCommunes: data.customCommunes || {} };

  let mappedStudents = 0;
  let alreadyMappedStudents = 0;
  let unmappedStudents = 0;
  let mappedTeachers = 0;
  let alreadyMappedTeachers = 0;
  let unmappedTeachers = 0;

  const queueMap = new Map<string, UnmappedMigrationItem>();
  (data.unmappedMigrationQueue || []).forEach((item) => {
    if (!item.resolvedAt) {
      queueMap.set(`${item.entityType}:${item.entityId}`, item);
    }
  });

  const beforeSnapshot: AuditLogSnapshotItem[] = [];
  const afterSnapshot: AuditLogSnapshotItem[] = [];
  const changedTargetIds: string[] = [];

  const nextStudents: StudentAccount[] = data.students.map((st) => {
    const queueKey = `student:${st.id}`;
    // Check if already deterministically mapped and valid
    if (st.migrationStatus === 'mapped' && st.provinceCode && st.communeCode && st.schoolId && st.classId) {
      const verify = resolveCanonicalLocationStrict(context, {
        provinceCode: st.provinceCode,
        communeCode: st.communeCode,
        schoolId: st.schoolId,
        className: st.className,
        requireClass: true,
      });
      if (verify.mapped && verify.classId === st.classId) {
        alreadyMappedStudents++;
        queueMap.delete(queueKey);
        return st;
      }
    }

    const res = resolveCanonicalLocationStrict(context, {
      provinceCode: st.provinceCode,
      communeCode: st.communeCode,
      schoolId: st.schoolId,
      provinceName: st.provinceName,
      communeName: st.communeName,
      schoolName: st.schoolName,
      className: st.className,
      requireClass: true,
    });

    if (res.mapped) {
      mappedStudents++;
      queueMap.delete(queueKey);
      beforeSnapshot.push({
        id: st.id,
        provinceCode: st.provinceCode,
        communeCode: st.communeCode,
        schoolId: st.schoolId,
        classId: st.classId,
        className: st.className,
      });
      afterSnapshot.push({
        id: st.id,
        provinceCode: res.provinceCode,
        communeCode: res.communeCode,
        schoolId: res.schoolId,
        classId: res.classId,
        className: res.className,
      });
      changedTargetIds.push(st.id);
      return {
        ...st,
        provinceCode: res.provinceCode,
        provinceName: res.provinceName,
        communeCode: res.communeCode,
        communeName: res.communeName,
        schoolId: res.schoolId,
        schoolName: res.schoolName,
        className: res.className!,
        classId: res.classId,
        migrationStatus: 'mapped',
      };
    } else {
      unmappedStudents++;
      const existingQueueItem = queueMap.get(queueKey);
      queueMap.set(queueKey, {
        id: existingQueueItem?.id || `unmapped_student_${st.id}`,
        entityType: 'student',
        entityId: st.id,
        rawProvinceName: st.provinceName || '',
        rawCommuneName: st.communeName || '',
        rawSchoolName: st.schoolName || '',
        rawClassName: st.className || '',
        reason: res.reason,
        detectedAt: existingQueueItem?.detectedAt || nowIso,
      });
      return {
        ...st,
        migrationStatus: 'pending_review',
      };
    }
  });

  const nextTeachers: TeacherAccount[] = data.teachers.map((tc) => {
    const queueKey = `teacher:${tc.id}`;
    if (tc.migrationStatus === 'mapped' && tc.provinceCode && tc.communeCode && tc.schoolId) {
      const verify = resolveCanonicalLocationStrict(context, {
        provinceCode: tc.provinceCode,
        communeCode: tc.communeCode,
        schoolId: tc.schoolId,
        requireClass: false,
      });
      if (verify.mapped) {
        alreadyMappedTeachers++;
        queueMap.delete(queueKey);
        return tc;
      }
    }

    const res = resolveCanonicalLocationStrict(context, {
      provinceCode: tc.provinceCode,
      communeCode: tc.communeCode,
      schoolId: tc.schoolId,
      provinceName: tc.provinceName,
      communeName: tc.communeName,
      schoolName: tc.schoolName,
      requireClass: false,
    });

    if (res.mapped) {
      mappedTeachers++;
      queueMap.delete(queueKey);
      return {
        ...tc,
        provinceCode: res.provinceCode,
        provinceName: res.provinceName,
        communeCode: res.communeCode,
        communeName: res.communeName,
        schoolId: res.schoolId,
        schoolName: res.schoolName,
        migrationStatus: 'mapped',
      };
    } else {
      unmappedTeachers++;
      const existingQueueItem = queueMap.get(queueKey);
      queueMap.set(queueKey, {
        id: existingQueueItem?.id || `unmapped_teacher_${tc.id}`,
        entityType: 'teacher',
        entityId: tc.id,
        rawProvinceName: tc.provinceName || '',
        rawCommuneName: tc.communeName || '',
        rawSchoolName: tc.schoolName || '',
        reason: res.reason,
        detectedAt: existingQueueItem?.detectedAt || nowIso,
      });
      return {
        ...tc,
        migrationStatus: 'pending_review',
      };
    }
  });

  const unmappedQueue = Array.from(queueMap.values());
  const report: MigrationReport = {
    dryRun,
    backupKey,
    timestamp: nowIso,
    mappedStudents,
    alreadyMappedStudents,
    unmappedStudents,
    mappedTeachers,
    alreadyMappedTeachers,
    unmappedTeachers,
    unmappedQueue,
  };

  if (dryRun) {
    return { data, report };
  }

  let nextData: AppDataSchema = {
    ...data,
    schools: canonicalSchools,
    students: nextStudents,
    teachers: nextTeachers,
    unmappedMigrationQueue: unmappedQueue,
  };

  if (changedTargetIds.length > 0) {
    const log = createAuditLogEntry({
      actorId: options.actorId || data.currentTeacherId || 'system-migration',
      actorRole: 'admin',
      action: 'MIGRATE_DIRECTORY_CODES',
      targetIds: changedTargetIds,
      beforeSnapshot,
      afterSnapshot,
    });
    nextData = appendAuditLog(nextData, log);
  }

  saveAppData(nextData);
  return { data: nextData, report };
}

/**
 * Hoàn tác (Undo) một thao tác hàng loạt dựa trên AuditLogEntry
 */
export function undoBulkActionByAuditLog(
  data: AppDataSchema,
  auditLogId: string,
  actorId: string,
  actorRole: 'admin' | 'teacher'
): { success: boolean; data: AppDataSchema; error?: string } {
  const logs = data.auditLogs || [];
  const targetLog = logs.find((l) => l.id === auditLogId);
  if (!targetLog) {
    return { success: false, data, error: 'Không tìm thấy bản ghi nhật ký thay đổi!' };
  }
  if (targetLog.undoneAt) {
    return { success: false, data, error: 'Thao tác này đã được hoàn tác trước đó!' };
  }

  const beforeMap = new Map<string, AuditLogSnapshotItem>();
  targetLog.beforeSnapshot.forEach((snap) => beforeMap.set(snap.id, snap));

  const directory = getCanonicalSchoolsDirectory(data);
  let nextStudents = [...data.students];

  if (targetLog.action === 'BULK_IMPORT_STUDENTS') {
    // Undo bulk import: remove newly created students that did not exist before
    const importedIds = new Set(
      targetLog.beforeSnapshot.filter((b) => b.existed === false).map((b) => b.id)
    );
    nextStudents = nextStudents.filter((s) => !importedIds.has(s.id));
  } else {
    nextStudents = nextStudents.map((st) => {
      const prev = beforeMap.get(st.id);
      if (!prev) return st;
      const schoolObj = prev.schoolId
        ? directory.find((sc) => sc.schoolId === prev.schoolId)
        : undefined;
      const provObj = prev.provinceCode ? getProvinceByCode(prev.provinceCode) : undefined;
      const commObj =
        prev.provinceCode && prev.communeCode
          ? getCommunesWithCodesForProvince(data, prev.provinceCode).find(
              (c) => c.code === prev.communeCode
            )
          : undefined;
      return {
        ...st,
        provinceCode: prev.provinceCode ?? st.provinceCode,
        communeCode: prev.communeCode ?? st.communeCode,
        schoolId: prev.schoolId ?? st.schoolId,
        classId: prev.classId ?? st.classId,
        className: prev.className ?? st.className,
        provinceName: provObj?.name ?? st.provinceName,
        communeName: commObj?.name ?? st.communeName,
        schoolName: schoolObj?.schoolName ?? st.schoolName,
      };
    });
  }

  const nowIso = new Date().toISOString();
  const updatedLogs = logs.map((l) =>
    l.id === auditLogId ? { ...l, undoneAt: nowIso, undoneBy: actorId } : l
  );

  const undoLog = createAuditLogEntry({
    actorId,
    actorRole,
    action: 'UNDO_BULK_ACTION',
    targetIds: targetLog.targetIds,
    beforeSnapshot: targetLog.afterSnapshot,
    afterSnapshot: targetLog.beforeSnapshot,
  });

  const nextData: AppDataSchema = {
    ...data,
    students: nextStudents,
    auditLogs: [undoLog, ...pruneExpiredAuditLogs(updatedLogs)],
    revision: (data.revision || 0) + 1,
  };
  saveAppData(nextData);
  return { success: true, data: nextData };
}

// ===== INITIAL DEMO DATA (Empty: Students & Admin are created via registration / first-time setup) =====
export const INITIAL_STUDENTS: StudentAccount[] = [];

export function hasAdminAccount(data: AppDataSchema): boolean {
  return data.teachers.some((t) => t.role === 'admin' && t.isActive);
}

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

  const resolvedLoc = resolveCanonicalLocationStrict(workingData, {
    provinceName,
    communeName,
    schoolName: normalizedSchool,
    requireClass: false,
  });

  // Check if activationCode has pre-assigned classes (created by Admin)
  const matchedCode = activationCodeStr
    ? workingData.activationCodes.find(
        (c) => c.code.toUpperCase() === activationCodeStr.trim().toUpperCase() && !c.isUsed
      )
    : undefined;
  const initialManagedClasses = (matchedCode?.assignedClasses || []).map((c) =>
    normalizeClassName(c)
  );

  const isHoangnhanAccount = cleanEmail === 'hoangnhan';
  const isFirstAdmin = isHoangnhanAccount || !hasAdminAccount(workingData);
  const newTeacherId = isHoangnhanAccount
    ? 'admin-hoangnhan'
    : isFirstAdmin
    ? `admin-setup-${Date.now()}`
    : `teacher-${Date.now()}`;

  // Chỉ tài khoản Hoangnhan mới tự động nhận toàn bộ lớp & học sinh cũ
  const existingStudentClasses = isHoangnhanAccount
    ? Array.from(
        new Set([
          ...initialManagedClasses,
          '6A1',
          '6A2',
          '6A3',
          '6A4',
          '6A5',
          '6A6',
          ...workingData.students.map((s) => normalizeClassName(s.className || '6A1')).filter(Boolean),
        ])
      ).sort()
    : initialManagedClasses;

  const newTeacher: TeacherAccount = {
    id: newTeacherId,
    email: cleanEmail,
    username: cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail,
    fullName: normalizedFullName,
    password: hashPasswordSync(password.trim()),
    provinceCode: resolvedLoc.mapped ? resolvedLoc.provinceCode : undefined,
    communeCode: resolvedLoc.mapped ? resolvedLoc.communeCode : undefined,
    schoolId: resolvedLoc.mapped ? resolvedLoc.schoolId : undefined,
    migrationStatus: resolvedLoc.mapped ? 'mapped' : 'pending_review',
    provinceName: resolvedLoc.mapped ? resolvedLoc.provinceName : provinceName?.trim() || '',
    communeName: resolvedLoc.mapped ? resolvedLoc.communeName : communeName?.trim() || '',
    schoolName: resolvedLoc.mapped ? resolvedLoc.schoolName : normalizedSchool,
    role: isFirstAdmin ? 'admin' : 'teacher',
    managedClasses: existingStudentClasses, // Chỉ Admin mới được gán managedClasses
    isActive: true,
    activationCode: activationCodeStr?.trim() || undefined,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  let updatedData: AppDataSchema = {
    ...workingData,
    teachers: [newTeacher, ...workingData.teachers],
  };

  if (isHoangnhanAccount) {
    updatedData = claimAllPriorStudentsForAdmin(updatedData, newTeacherId);
  }

  if (existingStudentClasses.length > 0) {
    const log = createAuditLogEntry({
      actorId: matchedCode?.createdBy || newTeacherId,
      actorRole: 'admin',
      action: 'ASSIGN_MANAGED_CLASSES',
      targetIds: [newTeacherId],
      beforeSnapshot: [{ id: newTeacherId, managedClasses: [] }],
      afterSnapshot: [{ id: newTeacherId, managedClasses: existingStudentClasses }],
    });
    updatedData = appendAuditLog(updatedData, log);
  }

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

/**
 * CHỈ ADMIN mới được phép gán managedClasses cho giáo viên.
 * Mọi lần gán đều ghi AuditLog (ASSIGN_MANAGED_CLASSES) kèm trạng thái trước/sau.
 */
export function updateTeacherClasses(
  data: AppDataSchema,
  teacherId: string,
  classes: string[],
  actorId?: string
): AppDataSchema {
  const effectiveActorId = actorId || data.currentTeacherId || '';
  const actor = data.teachers.find((t) => t.id === effectiveActorId && t.isActive);
  if (!actor || actor.role !== 'admin') {
    console.warn('Forbidden: Chỉ Admin mới có quyền gán lớp phụ trách (managedClasses).');
    return data;
  }

  const targetTeacher = data.teachers.find((t) => t.id === teacherId);
  if (!targetTeacher) return data;

  const normalizedClasses = Array.from(
    new Set(classes.map((c) => normalizeClassName(c)).filter(Boolean))
  ).sort();
  const prevClasses = (targetTeacher.managedClasses || []).map((c) => normalizeClassName(c));

  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId ? { ...t, managedClasses: normalizedClasses } : t
  );

  const log = createAuditLogEntry({
    actorId: actor.id,
    actorRole: 'admin',
    action: 'ASSIGN_MANAGED_CLASSES',
    targetIds: [teacherId],
    beforeSnapshot: [
      {
        id: teacherId,
        schoolId: targetTeacher.schoolId,
        managedClasses: prevClasses,
      },
    ],
    afterSnapshot: [
      {
        id: teacherId,
        schoolId: targetTeacher.schoolId,
        managedClasses: normalizedClasses,
      },
    ],
  });

  const updatedData = appendAuditLog({ ...data, teachers: updatedTeachers }, log);
  saveAppData(updatedData);
  return updatedData;
}

/**
 * Phân quyền RLS đọc danh sách học sinh:
 * - Admin: đọc toàn bộ học sinh.
 * - Giáo viên: CHỈ đọc được học sinh thuộc cùng mã trường (`schoolId`) VÀ nằm trong danh sách lớp phụ trách (`managedClasses`).
 */
export function getTeacherStudents(data: AppDataSchema, teacherId: string | null): StudentAccount[] {
  if (!teacherId) return [];
  const teacher = data.teachers.find((t) => t.id === teacherId && t.isActive);
  if (!teacher) return [];
  if (teacher.role === 'admin') return data.students;

  const allowedClasses = new Set(
    (teacher.managedClasses || []).map((c) => normalizeClassName(c)).filter(Boolean)
  );
  if (allowedClasses.size === 0) {
    return [];
  }

  const context = { schools: data.schools || [], customCommunes: data.customCommunes || {} };
  const teacherSchoolId =
    teacher.schoolId ||
    (() => {
      const res = resolveCanonicalLocationStrict(context, {
        provinceName: teacher.provinceName,
        communeName: teacher.communeName,
        schoolName: teacher.schoolName,
      });
      return res.mapped ? res.schoolId : null;
    })();

  return data.students.filter((s) => {
    const studentClassNorm = normalizeClassName(s.className);
    if (!allowedClasses.has(studentClassNorm) && !(s.classId && allowedClasses.has(s.classId))) {
      return false;
    }

    if (teacherSchoolId && s.schoolId) {
      return s.schoolId === teacherSchoolId;
    }

    // Fallback strict check when schoolId not yet migrated
    if (teacherSchoolId && !s.schoolId) {
      const sRes = resolveCanonicalLocationStrict(context, {
        provinceName: s.provinceName,
        communeName: s.communeName,
        schoolName: s.schoolName,
      });
      return sRes.mapped && sRes.schoolId === teacherSchoolId;
    }

    return false;
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
  updates: {
    fullName?: string;
    provinceName?: string;
    communeName?: string;
    schoolName?: string;
    newPassword?: string;
    oldPassword?: string;
  }
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

  const nextProvinceName =
    updates.provinceName !== undefined ? updates.provinceName.trim() : teacher.provinceName || '';
  const nextCommuneName =
    updates.communeName !== undefined ? updates.communeName.trim() : teacher.communeName || '';
  const nextSchoolName =
    updates.schoolName !== undefined
      ? normalizeSchoolName(updates.schoolName)
      : teacher.schoolName;

  let workingData = data;
  if (nextProvinceName && nextCommuneName && nextSchoolName) {
    const added = addSchoolToSystem(data, nextProvinceName, nextCommuneName, nextSchoolName);
    workingData = added.data;
  }

  const resolvedLoc = resolveCanonicalLocationStrict(workingData, {
    provinceName: nextProvinceName,
    communeName: nextCommuneName,
    schoolName: nextSchoolName,
    requireClass: false,
  });

  const updatedTeachers = workingData.teachers.map((t) =>
    t.id === teacherId
      ? {
          ...t,
          fullName: updates.fullName ? normalizeFullName(updates.fullName) : t.fullName,
          provinceName: resolvedLoc.mapped ? resolvedLoc.provinceName : nextProvinceName,
          communeName: resolvedLoc.mapped ? resolvedLoc.communeName : nextCommuneName,
          schoolName: resolvedLoc.mapped ? resolvedLoc.schoolName : nextSchoolName,
          provinceCode: resolvedLoc.mapped ? resolvedLoc.provinceCode : t.provinceCode,
          communeCode: resolvedLoc.mapped ? resolvedLoc.communeCode : t.communeCode,
          schoolId: resolvedLoc.mapped ? resolvedLoc.schoolId : t.schoolId,
          migrationStatus: (resolvedLoc.mapped ? 'mapped' : 'pending_review') as
            | 'mapped'
            | 'pending_review',
          password: updates.newPassword ? hashPasswordSync(updates.newPassword) : t.password,
        }
      : t
  );
  const updatedData: AppDataSchema = {
    ...workingData,
    teachers: updatedTeachers,
    revision: (workingData.revision || 0) + 1,
  };
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

// ===== DEFAULT ADMIN ACCOUNT (Hoangnhan) & MIGRATION =====
export function getDefaultAdminTeacher(): TeacherAccount {
  return {
    id: 'admin-hoangnhan',
    email: 'Hoangnhan',
    username: 'Hoangnhan',
    fullName: 'Cô Hoàng Nhàn',
    password: hashPasswordSync('Van210923@'),
    provinceCode: 'P19',
    communeCode: 'P19_C016',
    schoolId: 'SCH_P19_P19_C016_THCS_CHU_VAN_AN',
    migrationStatus: 'mapped',
    provinceName: 'Tỉnh Quảng Ngãi',
    communeName: 'Xã Đăk Hà',
    schoolName: 'THCS Chu Văn An',
    role: 'admin',
    managedClasses: ['6A1', '6A2', '6A3', '6A4', '6A5', '6A6'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
  };
}

export function ensureDefaultAdminTeacher(list: TeacherAccount[]): TeacherAccount[] {
  const defaultAdmin = getDefaultAdminTeacher();
  const hasHoangnhan = list.some(
    (t) =>
      t.username.toLowerCase() === 'hoangnhan' ||
      t.email.toLowerCase() === 'hoangnhan' ||
      t.id === 'admin-hoangnhan'
  );
  if (!hasHoangnhan) {
    return [defaultAdmin, ...list];
  }
  return list.map((t) => {
    if (
      t.username.toLowerCase() === 'hoangnhan' ||
      t.email.toLowerCase() === 'hoangnhan' ||
      t.id === 'admin-hoangnhan'
    ) {
      return {
        ...t,
        email: 'Hoangnhan',
        username: 'Hoangnhan',
        password: hashPasswordSync('Van210923@'),
        role: 'admin',
        isActive: true,
      };
    }
    return t;
  });
}

function migrateTeacherData(parsed: any): TeacherAccount[] {
  if (parsed.teachers && Array.isArray(parsed.teachers) && parsed.teachers.length > 0) {
    const migrated = parsed.teachers
      .filter((t: TeacherAccount) => t.id !== 'admin-001' && Boolean(t.password))
      .map((t: TeacherAccount) => ({
        ...t,
        provinceName: t.provinceName || '',
        communeName: t.communeName || '',
        schoolName: t.schoolName ? normalizeSchoolName(t.schoolName) : '',
        password: hashPasswordSync(t.password),
        managedClasses: (t.managedClasses || []).map((c: string) => normalizeClassName(c)),
      }));
    return ensureDefaultAdminTeacher(migrated);
  }

  return [getDefaultAdminTeacher()];
}

function migrateStudentsData(rawStudents: any[]): StudentAccount[] {
  if (!Array.isArray(rawStudents) || rawStudents.length === 0) {
    return INITIAL_STUDENTS;
  }
  return rawStudents
    .filter((s) => s.id !== 'student-6a1-01' && s.id !== 'student-6a2-02')
    .map((s) => {
      const rawPass = s.passwordHash || s.pinCode || '';
      const hashed = rawPass ? hashPasswordSync(rawPass) : '';
      const cleanName = normalizeFullName(s.fullName || 'Học Sinh');
      const cleanGrade = s.grade || 6;
      const sessions: StudySession[] = Array.isArray(s.sessions) ? s.sessions : [];

      // Phát hiện dữ liệu mẫu ảo cũ (320 XP, Lv.3, Streak 4 ngày, Unit 1: 100%) hoặc học sinh chưa có buổi học nào (sessions.length === 0)
      const hasLegacyFakeDemoProgress =
        sessions.length === 0 ||
        (s.progress?.totalXP === 320 &&
          s.progress?.level === 3 &&
          s.progress?.unitProgress?.['unit-1'] === 100 &&
          s.progress?.unitProgress?.['unit-2'] === 85);

      const cleanProgress: UserProgress = hasLegacyFakeDemoProgress
        ? {
            ...INITIAL_PROGRESS,
            studentName: cleanName,
            grade: cleanGrade,
            skillMastery: { ...INITIAL_PROGRESS.skillMastery },
            unitProgress: {},
          }
        : {
            ...INITIAL_PROGRESS,
            ...(s.progress || {}),
            studentName: cleanName,
            grade: cleanGrade,
          };

      return {
        ...s,
        fullName: cleanName,
        grade: cleanGrade,
        className: s.className ? normalizeClassName(s.className) : '',
        provinceName: s.provinceName || '',
        communeName: s.communeName || '',
        schoolName: s.schoolName ? normalizeSchoolName(s.schoolName) : '',
        passwordHash: hashed,
        pinCode: hashed,
        recoveryCodeHash: s.recoveryCodeHash || '',
        sessions,
        progress: cleanProgress,
        lastActiveLesson: hasLegacyFakeDemoProgress ? undefined : s.lastActiveLesson,
      };
    });
}

/**
 * Gán toàn bộ học sinh đã đăng ký trước đó (cùng toàn bộ số liệu buổi học, attempts, dailyStats)
 * vào tài khoản Giáo viên Quản trị (Admin / Giáo viên đăng ký lần đầu).
 */
export function claimAllPriorStudentsForAdmin(
  data: AppDataSchema,
  targetTeacherId?: string | null
): AppDataSchema {
  // 1. Khôi phục thêm học sinh từ bản backup nếu có học sinh bị thiếu
  let mergedStudents = [...data.students];
  if (typeof localStorage !== 'undefined') {
    try {
      const backupRaw = localStorage.getItem(MIGRATION_BACKUP_KEY);
      if (backupRaw) {
        const backupParsed = JSON.parse(backupRaw);
        if (Array.isArray(backupParsed.students)) {
          const existingIds = new Set(mergedStudents.map((s) => s.id));
          backupParsed.students.forEach((bs: StudentAccount) => {
            if (bs && bs.id && !existingIds.has(bs.id)) {
              existingIds.add(bs.id);
              mergedStudents.push(bs);
            }
          });
        }
      }
    } catch {
      // ignore
    }
  }

  // 2. Chỉ gán cho duy nhất tài khoản đăng nhập Hoangnhan
  const hoangnhanTeacher =
    data.teachers.find(
      (t) =>
        t.username.toLowerCase() === 'hoangnhan' ||
        t.email.toLowerCase() === 'hoangnhan' ||
        t.id === 'admin-hoangnhan'
    ) || getDefaultAdminTeacher();

  if (
    targetTeacherId &&
    targetTeacherId !== hoangnhanTeacher.id &&
    targetTeacherId !== 'admin-hoangnhan'
  ) {
    return data;
  }

  const primaryTeacher = hoangnhanTeacher;

  const targetProvName = primaryTeacher.provinceName?.trim() || 'Tỉnh Quảng Ngãi';
  const targetCommName = primaryTeacher.communeName?.trim() || 'Xã Đăk Hà';
  const targetSchName = normalizeSchoolName(primaryTeacher.schoolName || 'THCS Chu Văn An');

  let workingData = data;
  const addedSchool = addSchoolToSystem(workingData, targetProvName, targetCommName, targetSchName);
  workingData = addedSchool.data;

  const resolvedLoc = resolveCanonicalLocationStrict(workingData, {
    provinceName: targetProvName,
    communeName: targetCommName,
    schoolName: targetSchName,
    requireClass: false,
  });

  const canonicalProvCode = resolvedLoc.mapped ? resolvedLoc.provinceCode : 'P19';
  const canonicalCommCode = resolvedLoc.mapped ? resolvedLoc.communeCode : 'P19_C016';
  const canonicalSchoolId = resolvedLoc.mapped
    ? resolvedLoc.schoolId
    : 'SCH_P19_P19_C016_THCS_CHU_VAN_AN';

  // 3. Gán toàn bộ học sinh hiện có về trường & mã định danh của Giáo viên Quản trị
  const allClassSet = new Set<string>(['6A1', '6A2', '6A3', '6A4', '6A5', '6A6']);
  const alignedStudents: StudentAccount[] = mergedStudents.map((st) => {
    const normClass = normalizeClassName(st.className || '6A1');
    allClassSet.add(normClass);

    const stLoc = resolveCanonicalLocationStrict(workingData, {
      provinceCode: st.provinceCode,
      communeCode: st.communeCode,
      schoolId: st.schoolId,
      provinceName: st.provinceName || targetProvName,
      communeName: st.communeName || targetCommName,
      schoolName: st.schoolName || targetSchName,
      className: normClass,
      requireClass: true,
    });

    const useTeacherSchool = Boolean(targetTeacherId) || !stLoc.mapped;
    const finalSchoolId = useTeacherSchool ? canonicalSchoolId : stLoc.schoolId;
    const finalProvCode = useTeacherSchool ? canonicalProvCode : stLoc.provinceCode;
    const finalCommCode = useTeacherSchool ? canonicalCommCode : stLoc.communeCode;
    const finalProvName = useTeacherSchool ? targetProvName : stLoc.provinceName;
    const finalCommName = useTeacherSchool ? targetCommName : stLoc.communeName;
    const finalSchName = useTeacherSchool ? targetSchName : stLoc.schoolName;

    return {
      ...st,
      className: normClass,
      provinceCode: finalProvCode,
      communeCode: finalCommCode,
      schoolId: finalSchoolId,
      classId: buildCanonicalClassId(finalSchoolId, normClass),
      provinceName: finalProvName,
      communeName: finalCommName,
      schoolName: finalSchName,
      migrationStatus: 'mapped',
    };
  });

  const allClassesList = Array.from(allClassSet).filter(Boolean).sort();

  // 4. Nâng cấp tài khoản Giáo viên đăng ký lần đầu thành Admin + gán toàn bộ lớp hiện có
  const updatedTeachers: TeacherAccount[] = workingData.teachers.map((t) => {
    if (t.id === primaryTeacher.id) {
      const mergedManaged = Array.from(
        new Set([...(t.managedClasses || []).map((c) => normalizeClassName(c)), ...allClassesList])
      ).sort();
      return {
        ...t,
        provinceCode: t.provinceCode || canonicalProvCode,
        communeCode: t.communeCode || canonicalCommCode,
        schoolId: t.schoolId || canonicalSchoolId,
        provinceName: t.provinceName || targetProvName,
        communeName: t.communeName || targetCommName,
        schoolName: normalizeSchoolName(t.schoolName || targetSchName),
        migrationStatus: 'mapped',
        managedClasses: mergedManaged,
      };
    }
    return t;
  });

  // 5. Đồng bộ lại schoolId trong firestore_collection_attempts_v1 & dailyStats để Báo cáo khớp 100%
  if (typeof localStorage !== 'undefined' && targetTeacherId) {
    try {
      const slug = ( raw: string ) =>
        raw
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      const analyticsSchoolId = `${slug(targetSchName)}__${slug(targetCommName)}`;

      const rawAtt = localStorage.getItem('firestore_collection_attempts_v1');
      if (rawAtt) {
        const parsedAtt = JSON.parse(rawAtt);
        if (Array.isArray(parsedAtt)) {
          const updatedAtt = parsedAtt.map((a) => ({ ...a, schoolId: analyticsSchoolId }));
          localStorage.setItem('firestore_collection_attempts_v1', JSON.stringify(updatedAtt));
        }
      }
      const rawStats = localStorage.getItem('firestore_collection_dailyStats_v1');
      if (rawStats) {
        const parsedStats = JSON.parse(rawStats);
        if (parsedStats && typeof parsedStats === 'object') {
          Object.keys(parsedStats).forEach((k) => {
            if (parsedStats[k]) parsedStats[k].schoolId = analyticsSchoolId;
          });
          localStorage.setItem('firestore_collection_dailyStats_v1', JSON.stringify(parsedStats));
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    ...workingData,
    students: alignedStudents,
    teachers: updatedTeachers,
    unmappedMigrationQueue: [],
  };
}

// ===== LOAD & SAVE =====
export function loadAppData(): AppDataSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const students: StudentAccount[] = migrateStudentsData(parsed.students);
      const currentStudentId =
        parsed.currentStudentId && students.some((s) => s.id === parsed.currentStudentId)
          ? parsed.currentStudentId
          : students[0]?.id || null;

      const activeStudent = students.find((s) => s.id === currentStudentId);

      const builtInIds = new Set(DEMO_QUESTIONS.map((q) => q.id));
      const customQuestions = (parsed.questions || []).filter((q: Question) => !builtInIds.has(q.id));
      const mergedQuestions = [...DEMO_QUESTIONS, ...customQuestions];

      const teachers = migrateTeacherData(parsed);
      const validTeacherLoggedIn =
        Boolean(parsed.isTeacherLoggedIn) &&
        Boolean(parsed.currentTeacherId) &&
        teachers.some((t) => t.id === parsed.currentTeacherId && t.isActive);

      const savedSchools: SchoolEntry[] = getCanonicalSchoolsDirectory({
        schools: Array.isArray(parsed.schools) ? parsed.schools : undefined,
        customCommunes: parsed.customCommunes || {},
      });

      const baseLoaded: AppDataSchema = {
        units: SGK_UNITS,
        questions: mergedQuestions,
        sessions: activeStudent ? activeStudent.sessions : [],
        progress: activeStudent ? activeStudent.progress : { ...INITIAL_PROGRESS },
        students,
        currentStudentId,
        isTeacherLoggedIn: validTeacherLoggedIn,
        currentTeacherId: validTeacherLoggedIn ? parsed.currentTeacherId : null,
        teachers,
        activationCodes: parsed.activationCodes || [],
        customClasses: (parsed.customClasses || []).map((c: string) => normalizeClassName(c)),
        schools: savedSchools,
        customCommunes: parsed.customCommunes || {},
        classCurrentUnits: parsed.classCurrentUnits || { DEFAULT: 'unit-1' },
        masteryThresholds: parsed.masteryThresholds || undefined,
        auditLogs: pruneExpiredAuditLogs(parsed.auditLogs || []),
        unmappedMigrationQueue: parsed.unmappedMigrationQueue || [],
        revision: parsed.revision || 1,
        teacherAccount: teachers[0] || null,
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

      return claimAllPriorStudentsForAdmin(baseLoaded, 'admin-hoangnhan');
    }
  } catch (err) {
    console.error('Lỗi đọc LocalStorage:', err);
  }

  return {
    units: SGK_UNITS,
    questions: DEMO_QUESTIONS,
    sessions: [],
    progress: { ...INITIAL_PROGRESS },
    students: INITIAL_STUDENTS,
    currentStudentId: null,
    isTeacherLoggedIn: false,
    currentTeacherId: null,
    teachers: [getDefaultAdminTeacher()],
    activationCodes: [],
    customClasses: [],
    schools: getCanonicalSchoolsDirectory({}),
    customCommunes: {},
    classCurrentUnits: { DEFAULT: 'unit-1' },
    auditLogs: [],
    unmappedMigrationQueue: [],
    revision: 1,
    teacherAccount: getDefaultAdminTeacher(),
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
  if (typeof localStorage === 'undefined') return;
  try {
    const jsonStr = JSON.stringify(data);
    const sizeBytes = new Blob([jsonStr]).size;
    const sizeMB = sizeBytes / (1024 * 1024);

    if (sizeMB > 4 && !_quotaWarningShown) {
      _quotaWarningShown = true;
      console.warn(`⚠️ localStorage sắp đầy: ${sizeMB.toFixed(2)}MB / 5MB.`);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('storage-quota-warning', { detail: { sizeMB } }));
      }
    }

    localStorage.setItem(STORAGE_KEY, jsonStr);
    if (data.settings?.geminiApiKey !== undefined) {
      localStorage.setItem('gemini_api_key', data.settings.geminiApiKey);
    }
    if (data.settings?.selectedModel) {
      localStorage.setItem('gemini_selected_model', data.settings.selectedModel);
    }
  } catch (err) {
    console.error('Lỗi ghi LocalStorage:', err);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('storage-quota-exceeded'));
    }
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
            progressPercent: updatedUnitProgress[matchedUnit.id] || session.score || 0,
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

  let resolvedStudentId: string | null = null;
  const updatedStudents: StudentAccount[] = data.students.map((st): StudentAccount => {
    if (st.id === studentId) {
      const merged: StudentAccount = {
        ...st,
        ...normalizedFields,
      };
      const loc = resolveCanonicalLocationStrict(data, {
        provinceCode: normalizedFields.provinceCode ?? merged.provinceCode,
        communeCode: normalizedFields.communeCode ?? merged.communeCode,
        schoolId: normalizedFields.schoolId ?? merged.schoolId,
        provinceName: merged.provinceName,
        communeName: merged.communeName,
        schoolName: merged.schoolName,
        className: merged.className,
        requireClass: true,
      });
      if (loc.mapped) {
        resolvedStudentId = st.id;
        return {
          ...merged,
          provinceCode: loc.provinceCode,
          provinceName: loc.provinceName,
          communeCode: loc.communeCode,
          communeName: loc.communeName,
          schoolId: loc.schoolId,
          schoolName: loc.schoolName,
          className: loc.className!,
          classId: loc.classId,
          migrationStatus: 'mapped',
        };
      }
      return {
        ...merged,
        migrationStatus: 'pending_review',
      };
    }
    return st;
  });

  const nextQueue = resolvedStudentId
    ? (data.unmappedMigrationQueue || []).filter(
        (q) => !(q.entityType === 'student' && q.entityId === resolvedStudentId)
      )
    : data.unmappedMigrationQueue || [];

  const updatedData: AppDataSchema = {
    ...data,
    students: updatedStudents,
    unmappedMigrationQueue: nextQueue,
    revision: (data.revision || 0) + 1,
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
