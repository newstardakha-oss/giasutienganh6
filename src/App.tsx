import React, { useState, useEffect } from 'react';
import { AppDataSchema, StudySession, Question, AppSettings, StudentAccount } from './types';
import { loadAppData, saveAppData, addStudySession, recordTimeSpent, updateStudentByTeacher, deleteStudentByTeacher, resetStudentPinByTeacher } from './services/storage';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DataBackupModal } from './components/DataBackupModal';
import { StudentAuthModal } from './components/StudentAuthModal';
import { LandingCoverScreen } from './components/LandingCoverScreen';
import { HomeScreen } from './components/HomeScreen';
import { SocraticTutor } from './components/SocraticTutor';
import { SpeechStudio } from './components/SpeechStudio';
import { WritingGrader } from './components/WritingGrader';
import { ReadingMasteryGame } from './components/ReadingMasteryGame';
import { PracticeHub } from './components/PracticeHub';
import { DocParser } from './components/DocParser';
import { ParentDashboard } from './components/ParentDashboard';
import { GameArena } from './components/GameArena';

export default function App() {
  const [appData, setAppData] = useState<AppDataSchema>(() => loadAppData());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCoverActive, setIsCoverActive] = useState<boolean>(true);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isStudentAuthModalOpen, setIsStudentAuthModalOpen] = useState<boolean>(false);

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

  const handleTeacherLogin = (user: string, pass: string): boolean => {
    if (user === appData.teacherAccount.username && pass === appData.teacherAccount.password) {
      setAppData((prev) => ({
        ...prev,
        isTeacherLoggedIn: true,
      }));
      setIsCoverActive(false);
      setActiveTab('report');
      return true;
    }
    return false;
  };

  const handleTeacherLogout = () => {
    setAppData((prev) => ({
      ...prev,
      isTeacherLoggedIn: false,
    }));
    setIsCoverActive(true);
  };

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

  const handleReviewTopicClick = (unitId: string) => {
    setActiveTab('socratic');
  };

  // Render Landing Cover Screen if active
  if (isCoverActive) {
    return (
      <LandingCoverScreen
        appData={appData}
        onLoginStudent={handleLoginStudent}
        onRegisterStudent={handleRegisterStudent}
        onTeacherLogin={handleTeacherLogin}
        onOpenTeacherManagement={() => {
          setIsCoverActive(false);
          setActiveTab('report');
        }}
        onEnterAsGuest={() => setIsCoverActive(false)}
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
        onOpenSettings={() => setIsApiKeyModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        onOpenStudentAuth={() => setIsStudentAuthModalOpen(true)}
        onOpenCoverScreen={() => setIsCoverActive(true)}
      />

      {/* Main Container Vibrant Pastel */}
      <main className="flex-1 pb-12 bg-[#f5f3ff]">
        {/* Personalized Vibrant Pastel Student Greeting Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="neu-card-purple p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#38bdf8] via-[#a855f7] to-[#ec4899] flex items-center justify-center text-3xl shrink-0 shadow-lg border-2 border-white animate-float">
                {appData.isTeacherLoggedIn
                  ? '👩‍🏫'
                  : appData.students.find((s) => s.id === appData.currentStudentId)?.avatar || '👨‍🎓'}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold badge-pastel-purple px-3 py-1 rounded-full flex items-center gap-1">
                    <span>👑</span>
                    {appData.isTeacherLoggedIn ? 'Giáo Viên Quản Lý' : 'Học Sinh Lớp 6 Xuất Sắc'}
                  </span>
                  <span className="text-xs font-extrabold badge-pastel-yellow px-3 py-1 rounded-full flex items-center gap-1">
                    <span>🔥</span>
                    Streak: {appData.progress.streakDays} Ngày Chuỗi
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-purple-950 mt-1.5 flex items-center gap-2">
                  <span>Chào mừng,</span>{' '}
                  <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {appData.isTeacherLoggedIn
                      ? appData.teacherAccount.fullName
                      : appData.students.find((s) => s.id === appData.currentStudentId)?.fullName || 'Học Sinh Lớp 6'}
                  </span>
                  <span>🚀</span>
                </h2>
                <p className="text-xs sm:text-sm text-purple-700 font-bold mt-0.5">
                  Hôm nay em sẵn sàng chinh phục bài học Tiếng Anh 6 nào? 🎨
                </p>
              </div>
            </div>

            {/* Quick Stats Pills Vibrant Pastel */}
            <div className="flex items-center gap-3 self-stretch md:self-auto justify-around relative z-10">
              <div className="neu-card-blue px-4 py-2.5 text-center min-w-[90px]">
                <span className="text-[10px] font-extrabold text-sky-600 uppercase block">Cấp Độ 🦄</span>
                <span className="text-lg font-extrabold text-sky-800">Lv.{appData.progress.level}</span>
              </div>
              <div className="neu-card-yellow px-4 py-2.5 text-center min-w-[90px]">
                <span className="text-[10px] font-extrabold text-amber-600 uppercase block">Điểm XP ⚡</span>
                <span className="text-lg font-extrabold text-amber-800">{appData.progress.totalXP} XP</span>
              </div>
              <div className="neu-card-mint px-4 py-2.5 text-center min-w-[90px]">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase block">Đã Xong 🏆</span>
                <span className="text-lg font-extrabold text-emerald-800">{appData.sessions.length}</span>
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
        {activeTab === 'socratic' && <SocraticTutor units={appData.units} />}
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
            onReviewTopicClick={handleReviewTopicClick}
            onAddStudent={handleAddStudentByTeacher}
            onUpdateStudent={handleUpdateStudentByTeacher}
            onDeleteStudent={handleDeleteStudentByTeacher}
            onResetPin={handleResetPinByTeacher}
            onOpenAuthModal={() => setIsStudentAuthModalOpen(true)}
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
    </div>
  );
}
