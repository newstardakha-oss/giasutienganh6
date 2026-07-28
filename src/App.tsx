import React, { useState, useEffect } from 'react';
import { AppDataSchema, StudySession, Question, AppSettings, StudentAccount } from './types';
import { loadAppData, saveAppData, addStudySession, recordTimeSpent, updateStudentByTeacher, deleteStudentByTeacher, resetStudentPinByTeacher } from './services/storage';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DataBackupModal } from './components/DataBackupModal';
import { StudentAuthModal } from './components/StudentAuthModal';
import { LandingCoverScreen } from './components/LandingCoverScreen';
import { SocraticTutor } from './components/SocraticTutor';
import { HomeworkHelper } from './components/HomeworkHelper';
import { SpeechStudio } from './components/SpeechStudio';
import { WritingGrader } from './components/WritingGrader';
import { PracticeHub } from './components/PracticeHub';
import { DocParser } from './components/DocParser';
import { ParentDashboard } from './components/ParentDashboard';
import { GameArena } from './components/GameArena';

export default function App() {
  const [appData, setAppData] = useState<AppDataSchema>(() => loadAppData());
  const [activeTab, setActiveTab] = useState<string>('socratic');
  const [isCoverActive, setIsCoverActive] = useState<boolean>(true);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isStudentAuthModalOpen, setIsStudentAuthModalOpen] = useState<boolean>(false);

  // Check server health on startup: Only open ApiKeyModal if NEITHER server key NOR client custom key exists
  useEffect(() => {
    const customKey = localStorage.getItem('gemini_api_key') || appData.settings.geminiApiKey;
    if (!customKey) {
      fetch('/api/health')
        .then((res) => res.json())
        .then((data) => {
          if (!data.hasServerKey && !data.hasEnvApiKey) {
            setIsApiKeyModalOpen(true);
          }
        })
        .catch(() => {
          // If fetch fails, don't block student unless explicitly opened
        });
    }
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

      {/* Main Container */}
      <main className="flex-1 pb-12">
        {activeTab === 'socratic' && <SocraticTutor units={appData.units} />}
        {activeTab === 'homework' && (
          <HomeworkHelper questions={appData.questions} units={appData.units} />
        )}
        {activeTab === 'speech' && <SpeechStudio units={appData.units} />}
        {activeTab === 'writing' && <WritingGrader units={appData.units} />}
        {activeTab === 'practice' && (
          <PracticeHub
            questions={appData.questions}
            units={appData.units}
            onSessionCompleted={handleSessionCompleted}
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
            Chương trình chuẩn GDPT mới (Sách Tiếng Anh 6 Global Success - Tập 1 & Tập 2) • Mrs Nhan - THCS Chu Văn An Đăk Hà
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
