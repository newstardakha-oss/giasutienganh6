import React, { useState, useEffect } from 'react';
import {
  AppDataSchema,
  StudySession,
  Question,
  AppSettings,
  StudentAccount,
  SkillType,
  MasteryThresholdsOverride,
} from './types';
import {
  loadAppData, saveAppData, addStudySession, recordTimeSpent,
  updateStudentByTeacher, deleteStudentByTeacher, resetStudentPinByTeacher,
  authenticateTeacher, registerTeacher, getCurrentTeacher, isCurrentTeacherAdmin,
  createActivationCode, deleteActivationCode, deactivateTeacher, reactivateTeacher,
  deleteTeacherAccount, updateTeacherClasses, getTeacherStudents, updateTeacherProfile, addCustomClass,
} from './services/storage';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DataBackupModal } from './components/DataBackupModal';
import { StudentAuthModal } from './components/StudentAuthModal';
import { LandingCoverScreen } from './components/LandingCoverScreen';
import { HomeScreen } from './components/HomeScreen';
import { SocraticTutor } from './components/SocraticTutor';
import { GrammarG6App } from './grammar-g6/components/GrammarG6App';
import { SpeechStudio } from './components/SpeechStudio';
import { WritingGrader } from './components/WritingGrader';
import { ReadingMasteryGame } from './components/ReadingMasteryGame';
import { PracticeHub } from './components/PracticeHub';
import { DocParser } from './components/DocParser';
import { ParentDashboard } from './components/ParentDashboard';
import { GameArena } from './components/GameArena';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { StudentTestExamModal } from './components/StudentTestExamModal';
import {
  buildSessionAttemptInput,
  mapAppSkillToAttemptSkill,
  recordAttemptAndUpdateDailyStats,
} from './services/firebaseAnalytics';
import {
  FirestoreTestRoundDoc,
  TEST_ROUND_KIND_LABELS,
  getActiveStudentAttemptForRound,
  getAvailableRoundsForStudent,
  isStudentPracticeLocked,
  loadAllTestRounds,
} from './services/researchTests';

export default function App() {
  const [appData, setAppData] = useState<AppDataSchema>(() => loadAppData());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [grammarSubMode, setGrammarSubMode] = useState<'grammar-g6' | 'socratic'>('grammar-g6');
  const [selectedGrammarUnitId, setSelectedGrammarUnitId] = useState<string | null>(null);
  const [selectedSkillUnitId, setSelectedSkillUnitId] = useState<string | null>(null);
  const [isCoverActive, setIsCoverActive] = useState<boolean>(true);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isStudentAuthModalOpen, setIsStudentAuthModalOpen] = useState<boolean>(false);
  const [isTeacherProfileModalOpen, setIsTeacherProfileModalOpen] = useState<boolean>(false);
  const [isGrammarExerciseActive, setIsGrammarExerciseActive] = useState<boolean>(false);
  const [activeExamRound, setActiveExamRound] = useState<FirestoreTestRoundDoc | null>(null);
  const [researchTick, setResearchTick] = useState<number>(0);

  useEffect(() => {
    const onResearchUpdate = () => setResearchTick((t) => t + 1);
    window.addEventListener('storage', onResearchUpdate);
    window.addEventListener('research-tests-updated', onResearchUpdate);
    return () => {
      window.removeEventListener('storage', onResearchUpdate);
      window.removeEventListener('research-tests-updated', onResearchUpdate);
    };
  }, []);

  // Tự động mở bài kiểm tra nếu học sinh truy cập từ đường link QR (?testRound=...)
  useEffect(() => {
    if (!appData.currentStudentId || appData.isTeacherLoggedIn) return;
    const params = new URLSearchParams(window.location.search);
    const roundIdFromUrl = params.get('testRound');
    if (!roundIdFromUrl) return;
    const found = loadAllTestRounds().find((r) => r.id === roundIdFromUrl && r.status === 'open');
    if (found) {
      setActiveExamRound(found);
      setIsCoverActive(false);
    }
  }, [appData.currentStudentId, appData.isTeacherLoggedIn]);

  // Scroll to top whenever activeTab or cover screen state changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (activeTab !== 'socratic') {
      setIsGrammarExerciseActive(false);
    }
  }, [activeTab, isCoverActive]);

  // Server handles API key pooling transparently. Students enter directly without popups.
  useEffect(() => {
    // Check server health silently without blocking students
    fetch('/api/health').catch(() => {});
  }, []);

  // Sync appData changes to localStorage
  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  // Periodic active study time tracking (every 30 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      if (appData.currentStudentId) {
        setAppData((prev) => recordTimeSpent(prev, 30));
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [appData.currentStudentId]);

  // Listen for localStorage quota warnings
  useEffect(() => {
    const handleQuotaWarning = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      alert(`⚠️ Bộ nhớ trình duyệt sắp đầy (${detail?.sizeMB?.toFixed(1)}MB / 5MB).\nHãy xuất backup dữ liệu và xoá dữ liệu cũ để tránh mất dữ liệu!`);
    };
    const handleQuotaExceeded = () => {
      alert('❌ Bộ nhớ trình duyệt đã đầy! Dữ liệu mới không thể lưu.\nHãy xuất backup và xoá bớt dữ liệu ngay!');
    };
    window.addEventListener('storage-quota-warning', handleQuotaWarning);
    window.addEventListener('storage-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('storage-quota-warning', handleQuotaWarning);
      window.removeEventListener('storage-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  // ===== STUDENT AUTH HANDLERS =====
  const handleLoginStudent = (studentId: string) => {
    const targetStudent = appData.students.find((s) => s.id === studentId);
    if (!targetStudent) return;

    setAppData((prev) => ({
      ...prev,
      isTeacherLoggedIn: false,
      currentTeacherId: null,
      currentStudentId: studentId,
      progress: targetStudent.progress,
      sessions: targetStudent.sessions,
      students: prev.students.map((st) =>
        st.id === studentId
          ? { ...st, lastLoginAt: new Date().toISOString() }
          : st
      ),
    }));
    setActiveTab('home');
    setIsCoverActive(false);
  };

  const handleRegisterStudent = (newStudent: StudentAccount) => {
    setAppData((prev) => ({
      ...prev,
      isTeacherLoggedIn: false,
      currentTeacherId: null,
      students: [newStudent, ...prev.students],
      currentStudentId: newStudent.id,
      progress: newStudent.progress,
      sessions: newStudent.sessions,
    }));
    setActiveTab('home');
    setIsCoverActive(false);
  };

  const handleLogoutStudent = () => {
    setAppData((prev) => ({
      ...prev,
      currentStudentId: null,
    }));
    setIsCoverActive(true);
  };

  // ===== TEACHER AUTH HANDLERS (Multi-Teacher) =====
  const handleTeacherLogin = (email: string, password: string): boolean => {
    const teacher = authenticateTeacher(appData, email, password);
    if (teacher) {
      setAppData((prev) => ({
        ...prev,
        isTeacherLoggedIn: true,
        currentTeacherId: teacher.id,
        teachers: prev.teachers.map((t) =>
          t.id === teacher.id
            ? { ...t, lastLoginAt: new Date().toISOString() }
            : t
        ),
      }));
      setIsCoverActive(false);
      setActiveTab('report');
      return true;
    }
    return false;
  };

  const handleTeacherRegister = (
    email: string,
    fullName: string,
    schoolName: string,
    password: string,
    activationCode?: string,
    provinceName?: string,
    communeName?: string
  ): { success: boolean; error?: string } => {
    const result = registerTeacher(
      appData,
      email,
      fullName,
      schoolName,
      password,
      activationCode,
      provinceName,
      communeName
    );
    if (result.success) {
      // Find the newly registered teacher
      const newTeacher = result.data.teachers.find((t) => t.email.toLowerCase() === email.toLowerCase());
      setAppData({
        ...result.data,
        isTeacherLoggedIn: true,
        currentTeacherId: newTeacher?.id || null,
      });
      setIsCoverActive(false);
      setActiveTab('report');
    }
    return { success: result.success, error: result.error };
  };

  const handleTeacherLogout = () => {
    setAppData((prev) => ({
      ...prev,
      isTeacherLoggedIn: false,
      currentTeacherId: null,
    }));
    setIsCoverActive(true);
  };

  // ===== ADMIN: ACTIVATION CODE HANDLERS =====
  const handleCreateActivationCode = (assignedClasses?: string[]) => {
    if (!isCurrentTeacherAdmin(appData)) return;
    setAppData((prev) => createActivationCode(prev, prev.currentTeacherId || '', assignedClasses));
  };

  const handleDeleteActivationCode = (code: string) => {
    if (!isCurrentTeacherAdmin(appData)) return;
    setAppData((prev) => deleteActivationCode(prev, code));
  };

  // ===== ADMIN: TEACHER MANAGEMENT HANDLERS =====
  const handleDeactivateTeacher = (teacherId: string) => {
    if (!isCurrentTeacherAdmin(appData)) return;
    setAppData((prev) => deactivateTeacher(prev, teacherId));
  };

  const handleReactivateTeacher = (teacherId: string) => {
    if (!isCurrentTeacherAdmin(appData)) return;
    setAppData((prev) => reactivateTeacher(prev, teacherId));
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (!isCurrentTeacherAdmin(appData)) return;
    setAppData((prev) => deleteTeacherAccount(prev, teacherId));
  };

  const handleUpdateTeacherClasses = (teacherId: string, classes: string[]) => {
    if (!isCurrentTeacherAdmin(appData)) return;
    setAppData((prev) => updateTeacherClasses(prev, teacherId, classes));
  };

  const handleUpdateTeacherProfile = (updates: { fullName?: string; schoolName?: string; newPassword?: string; oldPassword?: string }): { success: boolean; error?: string } => {
    if (!appData.currentTeacherId) return { success: false, error: 'Chưa đăng nhập!' };
    const result = updateTeacherProfile(appData, appData.currentTeacherId, updates);
    if (result.success) {
      setAppData(result.data);
    }
    return { success: result.success, error: result.error };
  };

  const handleAddCustomClass = (className: string) => {
    setAppData((prev) => addCustomClass(prev, className));
  };

  // ===== STUDENT MANAGEMENT HANDLERS (By Teacher) =====
  const handleAddStudentByTeacher = (newStudent: StudentAccount) => {
    setAppData((prev) => ({
      ...prev,
      students: [newStudent, ...prev.students],
    }));
  };

  const handleUpdateStudentByTeacher = (studentId: string, updatedFields: Partial<StudentAccount>) => {
    setAppData((prev) => updateStudentByTeacher(prev, studentId, updatedFields));
  };

  const handleDeleteStudentByTeacher = (studentId: string) => {
    setAppData((prev) => deleteStudentByTeacher(prev, studentId));
  };

  const handleResetPinByTeacher = (studentId: string, newPin: string) => {
    setAppData((prev) => resetStudentPinByTeacher(prev, studentId, newPin));
  };

  // ===== SETTINGS & MISC =====
  const handleSaveSettings = (newSettings: Partial<AppSettings>) => {
    setAppData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  };

  const handleSessionCompleted = (session: StudySession) => {
    const updated = addStudySession(appData, session);
    setAppData(updated);

    // Ghi collection "attempts" + "dailyStats" cho các kỹ năng không phải Ngữ pháp
    // (Ngữ pháp được ghi chi tiết từng câu qua handleGrammarItemAttempt).
    const student = appData.students.find((s) => s.id === appData.currentStudentId);
    if (student && mapAppSkillToAttemptSkill(session.skill) !== 'grammar') {
      recordAttemptAndUpdateDailyStats(buildSessionAttemptInput(student, session), student.id);
    }
  };

  const handleGrammarItemAttempt = (params: {
    itemId: string;
    setId: string;
    unitId: string;
    grammarPointId?: string;
    correct: boolean;
    score: number;
    answer: string;
    startedAt?: string;
    submittedAt?: string;
    durationSec?: number;
  }) => {
    const student = appData.students.find((s) => s.id === appData.currentStudentId);
    if (!student) return; // Chế độ khách: không ghi báo cáo
    recordAttemptAndUpdateDailyStats(
      {
        studentId: student.id,
        schoolName: student.schoolName,
        communeName: student.communeName,
        provinceName: student.provinceName,
        className: student.className,
        grade: student.grade || 6,
        unitId: params.unitId,
        skill: 'grammar',
        setId: params.setId,
        itemId: params.itemId,
        grammarPointId: params.grammarPointId,
        correct: params.correct,
        score: params.score,
        answer: params.answer,
        startedAt: params.startedAt,
        submittedAt: params.submittedAt,
        durationSec: params.durationSec,
      },
      student.id
    );
  };

  const handleCustomQuestionsGenerated = (docTitle: string, newQuestions: Question[]) => {
    setAppData((prev) => ({
      ...prev,
      questions: [...newQuestions, ...prev.questions],
      customDocuments: [
        {
          id: `doc-${Date.now()}`,
          title: docTitle,
          uploadDate: new Date().toISOString(),
          contentSummary: `Dữ liệu đã trích xuất gồm ${newQuestions.length} câu hỏi.`,
          extractedVocab: [],
          extractedGrammar: [],
        },
        ...prev.customDocuments,
      ],
    }));
  };

  const handleReviewTopicClick = (unitId: string) => {
    setSelectedGrammarUnitId(unitId);
    setSelectedSkillUnitId(unitId);
    setGrammarSubMode('grammar-g6');
    setActiveTab('socratic');
    window.scrollTo(0, 0);
  };

  const handleSelectSkillFromHome = (tabId: string, unitId?: string | null) => {
    const resolvedUnitId = unitId ?? null;
    if (tabId === 'socratic') {
      setGrammarSubMode('grammar-g6');
      setSelectedGrammarUnitId(resolvedUnitId);
    }
    setSelectedSkillUnitId(resolvedUnitId);
    setActiveTab(tabId);
    window.scrollTo(0, 0);

    // Record lastActiveLesson for "Tiếp tục học" block when student enters a skill
    const tabSkillMap: Record<string, { skill: SkillType; label: string }> = {
      socratic: { skill: 'Grammar', label: 'Ngữ pháp' },
      practice: { skill: 'Vocabulary', label: 'Từ vựng' },
      speech: { skill: 'Pronunciation', label: 'Phát âm' },
      'reading-game': { skill: 'Reading', label: 'Đọc hiểu' },
      writing: { skill: 'Writing', label: 'Viết' },
    };
    const mapped = tabSkillMap[tabId];
    if (mapped && appData.currentStudentId) {
      const targetUnit =
        appData.units.find((u) => u.id === resolvedUnitId) ||
        appData.units[0];
      const pct = appData.progress.unitProgress?.[targetUnit.id] || 0;
      setAppData((prev) => ({
        ...prev,
        students: prev.students.map((st) =>
          st.id === prev.currentStudentId
            ? {
                ...st,
                lastActiveLesson: {
                  unitId: targetUnit.id,
                  unitNumber: targetUnit.unitNumber,
                  unitTitle: targetUnit.title,
                  skill: mapped.skill,
                  skillLabel: mapped.label,
                  tabId,
                  progressPercent: pct,
                  updatedAt: new Date().toISOString(),
                },
              }
            : st
        ),
      }));
    }
  };

  const handleChangeClassUnit = (className: string, unitId: string) => {
    setAppData((prev) => ({
      ...prev,
      classCurrentUnits: {
        ...(prev.classCurrentUnits || {}),
        [className]: unitId,
      },
    }));
  };

  const handleUpdateMasteryThresholds = (nextThresholds: MasteryThresholdsOverride) => {
    setAppData((prev) => ({
      ...prev,
      masteryThresholds: nextThresholds,
    }));
  };

  // Get current teacher & student info
  const currentTeacher = getCurrentTeacher(appData);
  const isAdmin = isCurrentTeacherAdmin(appData);
  const currentStudent = appData.students.find((s) => s.id === appData.currentStudentId) || null;
  const openStudentTestRounds = getAvailableRoundsForStudent(currentStudent);
  const isPracticeLockedForControlGroup =
    !appData.isTeacherLoggedIn && isStudentPracticeLocked(currentStudent);
  void researchTick;

  // Render Landing Cover Screen if active
  if (isCoverActive) {
    return (
      <LandingCoverScreen
        appData={appData}
        onLoginStudent={handleLoginStudent}
        onRegisterStudent={handleRegisterStudent}
        onUpdateAppData={setAppData}
        onTeacherLogin={handleTeacherLogin}
        onTeacherRegister={handleTeacherRegister}
        onOpenTeacherManagement={() => {
          setIsCoverActive(false);
          setActiveTab('report');
        }}
        onParentOpenReport={(studentId) => {
          handleLoginStudent(studentId);
          setActiveTab('report');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'socratic') {
            setGrammarSubMode('grammar-g6');
            setSelectedGrammarUnitId(null);
          }
          setActiveTab(tab);
          window.scrollTo(0, 0);
        }}
        appData={appData}
        currentTeacher={currentTeacher}
        isAdmin={isAdmin}
        onOpenSettings={() => setIsApiKeyModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        onOpenStudentAuth={() => setIsStudentAuthModalOpen(true)}
        onOpenCoverScreen={() => setIsCoverActive(true)}
        onLogout={() =>
          appData.isTeacherLoggedIn ? handleTeacherLogout() : handleLogoutStudent()
        }
      />

      {/* Main Container */}
      <main className="flex-1 pb-24 md:pb-12 bg-[var(--bg-page)]">
        {/* Student Greeting Banner (chỉ hiện với Học sinh, ẩn hoàn toàn XP/Level khi Giáo viên đăng nhập, và ẩn khi đang làm bài tập ngữ pháp) */}
        {!appData.isTeacherLoggedIn && !(activeTab === 'socratic' && grammarSubMode === 'grammar-g6' && isGrammarExerciseActive) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="neu-card-purple p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 w-full md:w-auto min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-indigo-700 flex items-center justify-center text-2xl sm:text-3xl text-white shrink-0 shadow-md border-2 border-white">
                  {appData.students.find((s) => s.id === appData.currentStudentId)?.avatar || '👨‍🎓'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-[11px] sm:text-xs font-extrabold badge-pastel-purple px-2.5 sm:px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap max-w-[220px] sm:max-w-xs truncate">
                      <span className="truncate">Học Sinh Lớp 6</span>
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold badge-pastel-yellow px-2.5 sm:px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                      <span>🔥</span>
                      <span>Streak: {appData.progress.streakDays} ngày</span>
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span className="whitespace-nowrap">Chào mừng,</span>{' '}
                    <span className="text-indigo-800 truncate max-w-full">
                      {appData.students.find((s) => s.id === appData.currentStudentId)?.fullName || 'Học Sinh Lớp 6'}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 font-bold mt-0.5">
                    Hôm nay em sẵn sàng chinh phục bài học Tiếng Anh 6 nào?
                  </p>
                </div>
              </div>

              {/* Quick Stats Pills */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full md:w-auto shrink-0 relative z-10">
                <div className="neu-card-blue px-3 sm:px-4 py-2.5 text-center min-w-0 sm:min-w-[92px] whitespace-nowrap">
                  <span className="text-[10px] font-extrabold text-sky-900 uppercase block truncate whitespace-nowrap">Cấp Độ</span>
                  <span className="text-base sm:text-lg font-extrabold text-sky-950 block truncate whitespace-nowrap">Lv.{appData.progress.level}</span>
                </div>
                <div className="neu-card-yellow px-3 sm:px-4 py-2.5 text-center min-w-0 sm:min-w-[92px] whitespace-nowrap">
                  <span className="text-[10px] font-extrabold text-amber-900 uppercase block truncate whitespace-nowrap">Điểm XP</span>
                  <span className="text-base sm:text-lg font-extrabold text-amber-950 block truncate whitespace-nowrap">{appData.progress.totalXP} XP</span>
                </div>
                <div className="neu-card-mint px-3 sm:px-4 py-2.5 text-center min-w-0 sm:min-w-[92px] whitespace-nowrap">
                  <span className="text-[10px] font-extrabold text-emerald-900 uppercase block truncate whitespace-nowrap">Đã Xong</span>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-950 block truncate whitespace-nowrap">{appData.sessions.length}</span>
                </div>
              </div>
            </div>

            {/* Banner Bài Kiểm Tra Đầu Vào / Đầu Ra đang mở cho lớp của Học sinh */}
            {currentStudent && openStudentTestRounds.length > 0 && (
              <div className="mt-4 space-y-3">
                {openStudentTestRounds.map((round) => {
                  const att = getActiveStudentAttemptForRound(round.id, currentStudent.id);
                  const isSubmitted =
                    att?.status === 'submitted' || att?.status === 'auto_submitted';
                  const isInProgress = att?.status === 'in_progress';

                  return (
                    <div
                      key={round.id}
                      className="neu-card bg-indigo-950 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-indigo-400 shadow-md"
                    >
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase">
                          <span>🔔 {TEST_ROUND_KIND_LABELS[round.kind]}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold text-white">
                          {round.name} (Đề {round.formId} · 40 câu · {round.durationMin} phút)
                        </h3>
                        <p className="text-xs text-indigo-200 font-medium">
                          {isSubmitted
                            ? `✓ Em đã hoàn thành và nộp bài kiểm tra này${
                                round.showScoreAfterSubmit && att
                                  ? ` (Điểm: ${att.score10.toFixed(2)}/10)`
                                  : ''
                              }.`
                            : isInProgress
                            ? '⏳ Em đang có bài kiểm tra làm dở. Hãy nhấn Tiếp tục để hoàn thành trước khi hết giờ!'
                            : 'Giáo viên đã mở phòng kiểm tra cho lớp của em. Nhấn Bắt đầu làm bài ngay nhé!'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveExamRound(round)}
                        className={`min-h-[44px] px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm shrink-0 cursor-pointer transition-all ${
                          isSubmitted
                            ? 'bg-white/15 hover:bg-white/25 text-white border border-white/30'
                            : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                        }`}
                      >
                        {isSubmitted
                          ? 'Xem xác nhận đã nộp'
                          : isInProgress
                          ? 'Tiếp tục làm bài →'
                          : 'Vào làm bài kiểm tra →'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Màn hình Khoá Luyện Tập cho Nhóm Đối Chứng (ĐC) trong thời gian nghiên cứu */}
        {isPracticeLockedForControlGroup &&
          ['socratic', 'practice', 'speech', 'reading-game', 'writing', 'arena', 'upload'].includes(
            activeTab
          ) && (
            <div className="max-w-3xl mx-auto px-4 py-10">
              <div className="neu-card bg-white p-6 sm:p-8 text-center space-y-4 border-2 border-indigo-200">
                <div className="w-14 h-14 rounded-3xl bg-indigo-100 text-indigo-700 grid place-items-center mx-auto text-2xl font-black">
                  🔒
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-extrabold">
                  Chế độ Lớp Nghiên cứu Đối chứng ({currentStudent?.className})
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Phần luyện tập đang tạm khoá trong thời gian nghiên cứu
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
                  Hiện tại lớp <strong>{currentStudent?.className}</strong> đang tham gia đợt khảo sát Đầu vào – Đầu ra của trường nên các mục tự luyện tập trên app tạm khoá. Em vẫn đăng nhập bình thường để làm <strong>Bài kiểm tra Đầu vào / Đầu ra</strong> khi giáo viên mở đề nhé! Ngay sau khi kết thúc đợt khảo sát, giáo viên sẽ mở khoá toàn bộ tính năng cho lớp mình.
                </p>

                <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                  {openStudentTestRounds.map((round) => (
                    <button
                      key={round.id}
                      type="button"
                      onClick={() => setActiveExamRound(round)}
                      className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm cursor-pointer shadow-sm"
                    >
                      Làm bài: {round.name} →
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setActiveTab('home')}
                    className="min-h-[46px] px-5 py-2.5 rounded-2xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 cursor-pointer"
                  >
                    Về Trang chủ
                  </button>
                </div>
              </div>
            </div>
          )}

        {activeTab === 'home' && !appData.isTeacherLoggedIn && (
          <HomeScreen
            appData={appData}
            onSelectSkill={handleSelectSkillFromHome}
            onChangeClassUnit={handleChangeClassUnit}
          />
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'socratic' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Grammar Mode Switcher Banner (Unified Grammar Color & GraduationCap Icon) - ẩn trong lúc làm bài ngữ pháp */}
            {!(grammarSubMode === 'grammar-g6' && isGrammarExerciseActive) && (
              <div className="skill-banner-grammar p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold mb-2">
                    <span>Ngữ Pháp Tiếng Anh 6 (Global Success)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Ngữ Pháp Trọng Tâm 12 Unit & Gia Sư AI Socratic
                  </h2>
                  <p className="text-xs sm:text-sm text-white/95 font-medium mt-1">
                    29 chủ điểm lý thuyết, 104 bộ bài tập tương tác 7 dạng & sổ lỗi sai thông minh
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setGrammarSubMode('grammar-g6');
                      setSelectedGrammarUnitId(null);
                    }}
                    className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      grammarSubMode === 'grammar-g6'
                        ? 'bg-white text-[var(--skill-grammar)] shadow-md'
                        : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                    }`}
                  >
                    <span>Bài Học & Bài Tập (12 Unit)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGrammarSubMode('socratic')}
                    className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      grammarSubMode === 'socratic'
                        ? 'bg-white text-[var(--skill-grammar)] shadow-md'
                        : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                    }`}
                  >
                    <span>Gia Sư AI Socratic (Hỏi Đáp)</span>
                  </button>
                </div>
              </div>
            )}

            {grammarSubMode === 'grammar-g6' ? (
              <GrammarG6App
                currentStudentId={appData.currentStudentId}
                initialUnitId={selectedGrammarUnitId}
                onSessionCompleted={handleSessionCompleted}
                onItemAttempt={handleGrammarItemAttempt}
                onPlayerActiveChange={setIsGrammarExerciseActive}
              />
            ) : (
              <SocraticTutor units={appData.units} />
            )}
          </div>
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'speech' && (
          <SpeechStudio units={appData.units} initialUnitId={selectedSkillUnitId} />
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'writing' && (
          <WritingGrader
            units={appData.units}
            initialUnitId={selectedSkillUnitId}
            onSessionCompleted={handleSessionCompleted}
            currentStudentName={
              appData.students.find((s) => s.id === appData.currentStudentId)?.fullName
            }
          />
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'reading-game' && (
          <ReadingMasteryGame
            units={appData.units}
            initialUnitId={selectedSkillUnitId}
            onSessionCompleted={handleSessionCompleted}
            onBackToPractice={() => setActiveTab('practice')}
          />
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'practice' && (
          <PracticeHub
            questions={appData.questions}
            units={appData.units}
            initialUnitId={selectedSkillUnitId}
            streakDays={appData.progress.streakDays}
            onSessionCompleted={handleSessionCompleted}
            onOpenReadingGame={() => setActiveTab('reading-game')}
          />
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'arena' && (
          <GameArena
            questions={appData.questions}
            units={appData.units}
            onSessionCompleted={(score, correct, total) => {
              handleSessionCompleted({
                id: `arena-${Date.now()}`,
                unitId: 'arena',
                unitTitle: 'Đấu Tri Thức Game Arena',
                skill: 'Vocabulary',
                score,
                totalQuestions: total,
                correctAnswers: correct,
                timeSpentSeconds: 300,
                date: new Date().toISOString(),
                xpEarned: score,
              });
            }}
          />
        )}
        {!isPracticeLockedForControlGroup && activeTab === 'upload' && (
          <DocParser onCustomQuestionsGenerated={handleCustomQuestionsGenerated} />
        )}
        {(activeTab === 'report' || (appData.isTeacherLoggedIn && activeTab === 'home')) && (
          <ParentDashboard
            appData={appData}
            currentTeacher={currentTeacher}
            isAdmin={isAdmin}
            onReviewTopicClick={handleReviewTopicClick}
            onAddStudent={handleAddStudentByTeacher}
            onUpdateStudent={handleUpdateStudentByTeacher}
            onDeleteStudent={handleDeleteStudentByTeacher}
            onResetPin={handleResetPinByTeacher}
            onOpenAuthModal={() => setIsStudentAuthModalOpen(true)}
            onCreateActivationCode={handleCreateActivationCode}
            onDeleteActivationCode={handleDeleteActivationCode}
            onDeactivateTeacher={handleDeactivateTeacher}
            onReactivateTeacher={handleReactivateTeacher}
            onDeleteTeacher={handleDeleteTeacher}
            onUpdateTeacherClasses={handleUpdateTeacherClasses}
            onUpdateTeacherProfile={handleUpdateTeacherProfile}
            onOpenTeacherProfile={() => setIsTeacherProfileModalOpen(true)}
            onAddCustomClass={handleAddCustomClass}
            onChangeClassUnit={handleChangeClassUnit}
            onUpdateMasteryThresholds={handleUpdateMasteryThresholds}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-slate-700">
            🎓 Gia Sư AI Tiếng Anh Lớp 6 - Trợ Lý Học Tập Cá Nhân Hóa
          </p>
          <p className="mt-1">
            Chương trình chuẩn GDPT mới (Sách Tiếng Anh 6 Global Success - Tập 1 & Tập 2) • Created by Mrs.Nhan - THCS Chu Van An Dak Ha
          </p>
        </div>
      </footer>

      {/* Modals */}
      {activeExamRound && currentStudent && (
        <StudentTestExamModal
          round={activeExamRound}
          student={currentStudent}
          onClose={() => setActiveExamRound(null)}
          onSubmitted={() => setResearchTick((t) => t + 1)}
        />
      )}

      <StudentAuthModal
        isOpen={isStudentAuthModalOpen}
        onClose={() => setIsStudentAuthModalOpen(false)}
        appData={appData}
        currentTeacher={currentTeacher}
        onLoginSuccess={handleLoginStudent}
        onRegisterStudent={handleRegisterStudent}
        onLogout={handleLogoutStudent}
        onTeacherLogin={handleTeacherLogin}
        onTeacherLogout={handleTeacherLogout}
        onOpenTeacherManagement={() => setActiveTab('report')}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        settings={appData.settings}
        onSaveSettings={handleSaveSettings}
      />

      <DataBackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        appData={appData}
        onDataRestored={(newData) => setAppData(newData)}
      />

      {currentTeacher && (
        <TeacherProfileModal
          isOpen={isTeacherProfileModalOpen}
          onClose={() => setIsTeacherProfileModalOpen(false)}
          teacher={currentTeacher}
          onUpdateProfile={handleUpdateTeacherProfile}
        />
      )}
    </div>
  );
}
