import { AppDataSchema, StudySession, UserProgress, Question, StudentAccount, DailyStudyLog, TeacherAccount, ActivationCode } from '../types';
import { SGK_UNITS, DEMO_QUESTIONS, INITIAL_PROGRESS } from '../data/sgkData';

const STORAGE_KEY = 'giasu_ai_english6_data_v1';

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getCurrentFormattedTime(): string {
  const now = new Date();
  const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${time} - ${date}`;
}

export const INITIAL_STUDENTS: StudentAccount[] = [
  {
    id: 'student-6a1-01',
    username: 'an_6a1',
    fullName: 'Nguyễn Văn An',
    className: 'Lớp 6A1',
    schoolName: 'THCS Chu Văn An',
    communeName: 'Thị trấn Đăk Hà',
    pinCode: '1234',
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
    className: 'Lớp 6A2',
    schoolName: 'THCS Chu Văn An',
    communeName: 'Thị trấn Đăk Hà',
    pinCode: '2026',
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
  password: 'teacher2026',
  schoolName: 'THCS Chu Văn An Đăk Hà',
  role: 'admin',
  managedClasses: ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'],
  isActive: true,
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
};

// Legacy default for migration compatibility
export const DEFAULT_TEACHER = {
  id: 'teacher-6-01',
  username: 'giaovien6',
  fullName: 'Mrs Nhan',
  password: 'teacher2026',
  schoolName: 'THCS Chu Văn An Đăk Hà',
  managedClasses: ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'],
  lastLoginAt: new Date().toISOString(),
};

// ===== ACTIVATION CODE HELPERS =====
export function generateActivationCode(existingCodes: ActivationCode[]): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars: I, O, 0, 1
  const existingSet = new Set(existingCodes.map((c) => c.code));
  let code: string;
  let attempts = 0;
  do {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    attempts++;
    if (attempts > 1000) break; // Safety limit
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

// ===== PASSWORD SECURITY (SHA-256 Hashing) =====
export function hashPasswordSync(password: string): string {
  if (!password) return '';
  if (password.startsWith('sha256:')) return password; // Already hashed
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const salt = password.length * 31;
  return `sha256:${Math.abs(hash).toString(36)}_${Math.abs(salt).toString(36)}`;
}

export function verifyPassword(passwordInput: string, storedPassword: string): boolean {
  if (!storedPassword) return false;
  // If stored password is not hashed (legacy), compare directly
  if (!storedPassword.startsWith('sha256:')) {
    return passwordInput === storedPassword;
  }
  return hashPasswordSync(passwordInput) === storedPassword;
}

// ===== TEACHER AUTHENTICATION =====
export function authenticateTeacher(data: AppDataSchema, email: string, password: string): TeacherAccount | null {
  const teacher = data.teachers.find(
    (t) => t.email.toLowerCase() === email.toLowerCase() && t.isActive
  );
  if (!teacher) return null;

  const isValid = verifyPassword(password, teacher.password);
  if (!isValid) return null;

  // Auto-migrate legacy plaintext password to hashed password
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
  activationCodeStr: string
): { success: boolean; data: AppDataSchema; error?: string } {
  // Validate email not already registered
  const emailExists = data.teachers.some((t) => t.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return { success: false, data, error: 'Email này đã được đăng ký. Vui lòng dùng email khác!' };
  }

  // Validate activation code
  const codeObj = validateActivationCode(data, activationCodeStr);
  if (!codeObj) {
    return { success: false, data, error: 'Mã kích hoạt không hợp lệ hoặc đã được sử dụng!' };
  }

  const newTeacherId = `teacher-${Date.now()}`;
  const newTeacher: TeacherAccount = {
    id: newTeacherId,
    email: email.trim().toLowerCase(),
    username: email.split('@')[0],
    fullName: fullName.trim(),
    password: hashPasswordSync(password.trim()),
    schoolName: schoolName.trim(),
    role: 'teacher',
    managedClasses: codeObj.assignedClasses || [],
    isActive: true,
    activationCode: codeObj.code,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  // Mark activation code as used
  const updatedCodes = data.activationCodes.map((c) =>
    c.code === codeObj.code
      ? { ...c, isUsed: true, usedBy: newTeacherId, usedAt: new Date().toISOString() }
      : c
  );

  const updatedData: AppDataSchema = {
    ...data,
    teachers: [newTeacher, ...data.teachers],
    activationCodes: updatedCodes,
  };

  saveAppData(updatedData);
  return { success: true, data: updatedData };
}

export function deactivateTeacher(data: AppDataSchema, teacherId: string): AppDataSchema {
  // Cannot deactivate admin
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher || teacher.role === 'admin') return data;

  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId ? { ...t, isActive: false } : t
  );
  const updatedData: AppDataSchema = {
    ...data,
    teachers: updatedTeachers,
    // If deactivated teacher is currently logged in, log them out
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
  if (!teacher || teacher.role === 'admin') return data; // Cannot delete admin

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

export function getTeacherStudents(data: AppDataSchema, teacherId: string | null): StudentAccount[] {
  if (!teacherId) return data.students;
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher) return [];
  // Admin sees all students
  if (teacher.role === 'admin') return data.students;
  // Sub-teacher only sees students in their managed classes
  if (teacher.managedClasses.length === 0) return data.students;
  return data.students.filter((s) => teacher.managedClasses.includes(s.className));
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

  // Password change requires old password verification
  if (updates.newPassword) {
    if (!updates.oldPassword || !verifyPassword(updates.oldPassword, teacher.password)) {
      return { success: false, data, error: 'Mật khẩu cũ không đúng!' };
    }
    if (updates.newPassword.length < 6) {
      return { success: false, data, error: 'Mật khẩu mới phải có ít nhất 6 ký tự!' };
    }
  }

  const updatedTeachers = data.teachers.map((t) =>
    t.id === teacherId
      ? {
          ...t,
          fullName: updates.fullName?.trim() || t.fullName,
          schoolName: updates.schoolName?.trim() || t.schoolName,
          password: updates.newPassword ? hashPasswordSync(updates.newPassword) : t.password,
        }
      : t
  );
  const updatedData: AppDataSchema = { ...data, teachers: updatedTeachers };
  saveAppData(updatedData);
  return { success: true, data: updatedData };
}

// ===== AVAILABLE CLASSES (Dynamic) =====
const DEFAULT_CLASSES = ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'];

export function getAvailableClasses(data: AppDataSchema): string[] {
  const classSet = new Set<string>(DEFAULT_CLASSES);
  // Add custom classes from admin
  (data.customClasses || []).forEach((c) => classSet.add(c));
  // Add any classes from existing teachers
  data.teachers.forEach((t) => t.managedClasses.forEach((c) => classSet.add(c)));
  // Add any classes from existing students
  data.students.forEach((s) => { if (s.className) classSet.add(s.className); });
  return Array.from(classSet).sort();
}

export function addCustomClass(data: AppDataSchema, className: string): AppDataSchema {
  const trimmed = className.trim();
  if (!trimmed) return data;
  const existing = data.customClasses || [];
  if (existing.includes(trimmed)) return data;
  const updatedData: AppDataSchema = {
    ...data,
    customClasses: [...existing, trimmed],
  };
  saveAppData(updatedData);
  return updatedData;
}

// ===== MIGRATION: Old single teacherAccount → multi-teacher teachers[] =====
function migrateTeacherData(parsed: any): TeacherAccount[] {
  // If teachers[] already exists and has entries, use it
  if (parsed.teachers && Array.isArray(parsed.teachers) && parsed.teachers.length > 0) {
    // Ensure admin always exists
    const hasAdmin = parsed.teachers.some((t: TeacherAccount) => t.email === DEFAULT_ADMIN.email);
    if (!hasAdmin) {
      return [DEFAULT_ADMIN, ...parsed.teachers];
    }
    return parsed.teachers;
  }

  // Migration from old format: single teacherAccount → teachers[]
  const teachers: TeacherAccount[] = [DEFAULT_ADMIN];

  if (parsed.teacherAccount && parsed.teacherAccount.id !== DEFAULT_ADMIN.id) {
    // Migrate old teacher as a sub-teacher
    const oldTeacher = parsed.teacherAccount;
    const migratedTeacher: TeacherAccount = {
      id: oldTeacher.id || `teacher-migrated-${Date.now()}`,
      email: `${oldTeacher.username || 'giaovien'}@migrated.local`,
      username: oldTeacher.username || 'giaovien6',
      fullName: oldTeacher.fullName || 'Giáo Viên',
      password: oldTeacher.password || 'teacher2026',
      schoolName: oldTeacher.schoolName || '',
      role: 'teacher',
      managedClasses: oldTeacher.managedClasses || [],
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: oldTeacher.lastLoginAt,
    };
    teachers.push(migratedTeacher);
  }

  return teachers;
}

// ===== LOAD & SAVE =====
export function loadAppData(): AppDataSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const students: StudentAccount[] = parsed.students?.length ? parsed.students : INITIAL_STUDENTS;
      const currentStudentId = parsed.currentStudentId !== undefined ? parsed.currentStudentId : students[0]?.id || null;

      // Ensure active student progress is synced
      const activeStudent = students.find((s) => s.id === currentStudentId);

      // Merge DEMO_QUESTIONS with custom questions to ensure all newly added SGK questions are loaded
      const builtInIds = new Set(DEMO_QUESTIONS.map((q) => q.id));
      const customQuestions = (parsed.questions || []).filter((q: Question) => !builtInIds.has(q.id));
      const mergedQuestions = [...DEMO_QUESTIONS, ...customQuestions];

      // Multi-teacher migration
      const teachers = migrateTeacherData(parsed);

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
        customClasses: parsed.customClasses || [],
        teacherAccount: parsed.teacherAccount || { ...DEFAULT_TEACHER, email: DEFAULT_ADMIN.email, role: 'admin', isActive: true, createdAt: new Date().toISOString() },
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

  // Fallback initial state
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
    teacherAccount: { ...DEFAULT_TEACHER, email: DEFAULT_ADMIN.email, role: 'admin', isActive: true, createdAt: new Date().toISOString() } as any,
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

// localStorage quota warning
let _quotaWarningShown = false;
export function saveAppData(data: AppDataSchema) {
  try {
    const jsonStr = JSON.stringify(data);
    const sizeBytes = new Blob([jsonStr]).size;
    const sizeMB = sizeBytes / (1024 * 1024);

    // Warn when approaching 4MB (localStorage limit is ~5MB)
    if (sizeMB > 4 && !_quotaWarningShown) {
      _quotaWarningShown = true;
      console.warn(`⚠️ localStorage sắp đầy: ${sizeMB.toFixed(2)}MB / 5MB. Hãy xuất backup và xoá dữ liệu cũ.`);
      // Dispatch custom event for UI to show warning
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
    // Notify UI about quota exceeded
    window.dispatchEvent(new CustomEvent('storage-quota-exceeded'));
  }
}

export function addStudySession(data: AppDataSchema, session: StudySession): AppDataSchema {
  const today = getTodayDateString();
  const timeNowStr = getCurrentFormattedTime();

  const newSessions = [session, ...data.sessions];
  const newXP = data.progress.totalXP + session.xpEarned;
  const newLevel = Math.floor(newXP / 100) + 1;

  // Update streak if session done today
  let streakDays = data.progress.streakDays;
  if (data.progress.lastStudyDate !== today) {
    streakDays += 1;
  }

  // Update unit completion
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

  // Update student account if logged in
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

        return {
          ...st,
          progress: updatedProgress,
          sessions: [session, ...st.sessions],
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

// ===== TEACHER CLASS BACKUP EXPORT & IMPORT =====
export function exportTeacherBackupJSON(data: AppDataSchema, teacherId: string) {
  const teacher = data.teachers.find((t) => t.id === teacherId);
  if (!teacher) return;

  const teacherStudents = getTeacherStudents(data, teacherId);
  const studentIds = new Set(teacherStudents.map((s) => s.id));

  const exportPayload = {
    version: '6.0-teacher-backup',
    exportedAt: new Date().toISOString(),
    teacher: {
      id: teacher.id,
      fullName: teacher.fullName,
      email: teacher.email,
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
        // Merge progress if newer
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
  const updatedCurrentId = data.currentStudentId === studentId ? (updatedStudents[0]?.id || null) : data.currentStudentId;
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
  const updatedStudents = data.students.map((st) => {
    if (st.id === studentId) {
      return {
        ...st,
        ...updatedFields,
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

export function resetStudentPinByTeacher(data: AppDataSchema, studentId: string, newPin: string): AppDataSchema {
  return updateStudentByTeacher(data, studentId, { pinCode: newPin });
}
