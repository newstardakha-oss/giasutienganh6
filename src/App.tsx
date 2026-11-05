import React, { useState, useEffect } from 'react';
import { AppDataSchema, StudySession, Question, AppSettings, StudentAccount } from './types';
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

export default function App() {
  const [appData, setAppData] = useState<AppDataSchema>(() => loadAppData());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [grammarSubMode, setGrammarSubMode] = useState<'grammar-g6' | 'socratic'>('grammar-g6');
  const [selectedGrammarUnitId, setSelectedGrammarUnitId] = useState<string | null>(null);
  const [isCoverActive, setIsCoverActive] = useState<boolean>(true);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isStudentAuthModalOpen, setIsStudentAuthModalOpen] = useState<boolean>(false);
  const [isTeacherProfileModalOpen, setIsTeacherProfileModalOpen] = useState<boolean>(false);

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
      currentStudentId: studentId,
      progress: targetStudent.progress,
      sessions: targetStudent.sessions,
      students: prev.students.map((st) =>
        st.id === studentId
          ? { ...st, lastLoginAt: new Date().toISOString() }
          : st
      ),
    }));
    setIsCoverActive(false);
  };

  const handleRegisterStudent = (newStudent: StudentAccount) => {
    setAppData((prev) => ({
      ...prev,
      students: [newStudent, ...prev.students],
      currentStudentId: newStudent.id,
      progress: newStudent.progress,
      sessions: newStudent.sessions,
    }));
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
    email: string, fullName: string, schoolName: string,
    password: string, activationCode: string
  ): { success: boolean; error?: string } => {
    const result = registerTeacher(appData, email, fullName, schoolName, password, activationCode);
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
    setGrammarSubMode('grammar-g6');
    setActiveTab('socratic');
  };

  // Get current teacher info
  const currentTeacher = getCurrentTeacher(appData);
  const isAdmin = isCurrentTeacherAdmin(appData);

  // Render Landing Cover Screen if active
  if (isCoverActive) {
    return (
      <LandingCoverScreen
        appData={appData}
        onLoginStudent={handleLoginStudent}
        onRegisterStudent={handleRegisterStudent}
        onTeacherLogin={handleTeacherLogin}
        onTeacherRegister={handleTeacherRegister}
        onOpenTeacherManagement={() => {
          setIsCoverActive(false);
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
        setActiveTab={setActiveTab}
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
        {/* Student Greeting Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="neu-card-purple p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 w-full md:w-auto min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-indigo-700 flex items-center justify-center text-2xl sm:text-3xl text-white shrink-0 shadow-md border-2 border-white">
                {appData.isTeacherLoggedIn
                  ? '👩‍🏫'
                  : appData.students.find((s) => s.id === appData.currentStudentId)?.avatar || '👨‍🎓'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-extrabold badge-pastel-purple px-2.5 sm:px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap max-w-[220px] sm:max-w-xs truncate">
                    <span className="truncate">
                      {appData.isTeacherLoggedIn
                        ? (isAdmin ? 'Quản Lý Admin' : `Giáo Viên — ${currentTeacher?.managedClasses.join(', ') || 'Chưa phân lớp'}`)
                        : 'Học Sinh Lớp 6'}
                    </span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-extrabold badge-pastel-yellow px-2.5 sm:px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                    <span>🔥</span>
                    <span>Streak: {appData.progress.streakDays} ngày</span>
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="whitespace-nowrap">Chào mừng,</span>{' '}
                  <span className="text-indigo-800 truncate max-w-full">
                    {appData.isTeacherLoggedIn
                      ? (currentTeacher?.fullName || 'Giáo Viên')
                      : appData.students.find((s) => s.id === appData.currentStudentId)?.fullName || 'Học Sinh Lớp 6'}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 font-bold mt-0.5">
                  {appData.isTeacherLoggedIn
                    ? (isAdmin ? 'Bạn đang quản lý toàn bộ hệ thống giáo viên và học sinh' : 'Quản lý lớp học và theo dõi tiến độ học sinh')
                    : 'Hôm nay em sẵn sàng chinh phục bài học Tiếng Anh 6 nào?'}
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
        </div>

        {activeTab === 'home' && (
          <HomeScreen
            appData={appData}
            onSelectSkill={(tabId) => setActiveTab(tabId)}
          />
        )}
        {activeTab === 'socratic' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Grammar Mode Switcher Banner (Unified Grammar Color & GraduationCap Icon) */}
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
                  onClick={() => setGrammarSubMode('grammar-g6')}
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

            {grammarSubMode === 'grammar-g6' ? (
              <GrammarG6App
                currentStudentId={appData.currentStudentId}
                initialUnitId={selectedGrammarUnitId}
                onSessionCompleted={handleSessionCompleted}
              />
            ) : (
              <SocraticTutor units={appData.units} />
            )}
          </div>
        )}
        {activeTab === 'speech' && <SpeechStudio units={appData.units} />}
        {activeTab === 'writing' && (
          <WritingGrader
            units={appData.units}
            onSessionCompleted={handleSessionCompleted}
            currentStudentName={
              appData.students.find((s) => s.id === appData.currentStudentId)?.fullName
            }
          />
        )}
        {activeTab === 'reading-game' && (
          <ReadingMasteryGame
            units={appData.units}
            onSessionCompleted={handleSessionCompleted}
            onBackToPractice={() => setActiveTab('practice')}
          />
        )}
        {activeTab === 'practice' && (
          <PracticeHub
            questions={appData.questions}
            units={appData.units}
            onSessionCompleted={handleSessionCompleted}
            onOpenReadingGame={() => setActiveTab('reading-game')}
          />
        )}
        {activeTab === 'arena' && (
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
        {activeTab === 'upload' && (
          <DocParser onCustomQuestionsGenerated={handleCustomQuestionsGenerated} />
        )}
        {activeTab === 'report' && (
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
