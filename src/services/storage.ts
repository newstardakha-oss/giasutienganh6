import { AppDataSchema, StudySession, UserProgress, Question, StudentAccount, DailyStudyLog } from '../types';
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

export const DEFAULT_TEACHER = {
  id: 'teacher-6-01',
  username: 'giaovien6',
  fullName: 'Mrs Nhan',
  password: 'teacher2026',
  schoolName: 'THCS Chu Văn An Đăk Hà',
  managedClasses: ['Lớp 6A1', 'Lớp 6A2', 'Lớp 6A3', 'Lớp 6A4', 'Lớp 6A5', 'Lớp 6A6'],
  lastLoginAt: new Date().toISOString(),
};

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

      return {
        units: SGK_UNITS,
        questions: mergedQuestions,
        sessions: activeStudent ? activeStudent.sessions : parsed.sessions || [],
        progress: activeStudent ? activeStudent.progress : parsed.progress || INITIAL_PROGRESS,
        students,
        currentStudentId,
        isTeacherLoggedIn: parsed.isTeacherLoggedIn || false,
        teacherAccount: parsed.teacherAccount || DEFAULT_TEACHER,
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
    teacherAccount: DEFAULT_TEACHER,
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

export function saveAppData(data: AppDataSchema) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (data.settings.geminiApiKey !== undefined) {
      localStorage.setItem('gemini_api_key', data.settings.geminiApiKey);
    }
    if (data.settings.selectedModel) {
      localStorage.setItem('gemini_selected_model', data.settings.selectedModel);
    }
  } catch (err) {
    console.error('Lỗi ghi LocalStorage:', err);
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
