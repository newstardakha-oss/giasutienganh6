import React, { useState, useMemo, useEffect } from 'react';
import {
  Word,
  CardState,
  VocabSrsSettings,
  SessionTurnResult,
  VocabSrsStoreData,
} from '../types';
import { UNIT_NAMES } from '../seedData';
import {
  loadVocabSrsData,
  saveVocabSrsData,
  recordTurnInStore,
  resetVocabProgress,
  getTodayKey,
} from '../storage';
import {
  ensureCardStatesForWords,
  getDueReviewCards,
  getNewWordsToLearn,
  buildSessionQueue,
  QueueItem,
} from '../srs';
import { VocabHomeView } from './VocabHomeView';
import { UnitSelectView } from './UnitSelectView';
import { StudySessionView } from './StudySessionView';
import { SessionSummaryView } from './SessionSummaryView';
import { VocabStatsView } from './VocabStatsView';
import { TeacherVocabView } from './TeacherVocabView';
import { VocabSettingsView } from './VocabSettingsView';
import { StudySession } from '../../types';

type ActiveScreen =
  | 'home'
  | 'units'
  | 'study'
  | 'summary'
  | 'stats'
  | 'teacher'
  | 'settings';

interface VocabSrsAppProps {
  initialUnitId?: string | null;
  streakDays?: number;
  onSessionCompleted?: (session: StudySession) => void;
}

export const VocabSrsApp: React.FC<VocabSrsAppProps> = ({
  initialUnitId,
  streakDays,
  onSessionCompleted,
}) => {
  const [store, setStore] = useState<VocabSrsStoreData>(() => loadVocabSrsData());
  const [screen, setScreen] = useState<ActiveScreen>('home');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string | undefined>(
    (initialUnitId && UNIT_NAMES[initialUnitId]) || 'Unit 1 - My New School'
  );

  useEffect(() => {
    if (initialUnitId && UNIT_NAMES[initialUnitId]) {
      setSelectedUnitFilter(UNIT_NAMES[initialUnitId]);
    }
  }, [initialUnitId]);
  const [activeQueue, setActiveQueue] = useState<QueueItem[]>([]);
  const [lastSessionResults, setLastSessionResults] = useState<SessionTurnResult[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());

  const todayKey = getTodayKey();
  const learnedTodayCount = store.dailyStats[todayKey]?.newWordsLearned?.length || 0;
  const remainingNewQuotaToday = Math.max(
    0,
    store.settings.newWordsPerDay - learnedTodayCount
  );

  // Tính số thẻ cần ôn hôm nay và số từ mới hôm nay
  const dueCards = useMemo(
    () =>
      getDueReviewCards(
        store.words,
        store.cardStates,
        Date.now(),
        selectedUnitFilter
      ),
    [store.words, store.cardStates, selectedUnitFilter]
  );

  const newWordsAvailable = useMemo(
    () =>
      getNewWordsToLearn(
        store.words,
        store.cardStates,
        remainingNewQuotaToday > 0 ? remainingNewQuotaToday : store.settings.newWordsPerDay,
        selectedUnitFilter
      ),
    [
      store.words,
      store.cardStates,
      remainingNewQuotaToday,
      store.settings.newWordsPerDay,
      selectedUnitFilter,
    ]
  );

  const handleStartStudy = (unitOverride?: string, forceExtraNewWords?: boolean) => {
    const targetUnit =
      unitOverride !== undefined ? unitOverride : selectedUnitFilter;
    const maxNew = forceExtraNewWords
      ? store.settings.newWordsPerDay
      : remainingNewQuotaToday > 0
      ? remainingNewQuotaToday
      : store.settings.newWordsPerDay;

    const queue = buildSessionQueue(
      store.words,
      store.cardStates,
      maxNew,
      Date.now(),
      targetUnit
    );

    if (queue.length === 0) {
      alert(
        'Hiện không còn thẻ cần ôn hay từ mới nào trong phạm vi này! Em hãy chọn Unit khác nhé 🌟'
      );
      return;
    }

    setSelectedUnitFilter(targetUnit);
    setActiveQueue(queue);
    setSessionStartTime(Date.now());
    setScreen('study');
  };

  const handleTurnCompleted = (
    updatedStates: Record<string, CardState>,
    turnResult: SessionTurnResult,
    isNewWordIntroCompleted: boolean
  ) => {
    setStore((prev) =>
      recordTurnInStore(
        prev,
        updatedStates,
        turnResult.wordId,
        isNewWordIntroCompleted,
        turnResult.quality
      )
    );
  };

  const handleSessionFinished = (results: SessionTurnResult[]) => {
    setLastSessionResults(results);
    setScreen('summary');

    if (onSessionCompleted && results.length > 0) {
      const correctCount = results.filter((r) => r.quality !== 'wrong').length;
      const scorePct = Math.round((correctCount / results.length) * 100);
      const elapsedSec = Math.max(
        10,
        Math.round((Date.now() - sessionStartTime) / 1000)
      );

      const matchedUnitId =
        Object.entries(UNIT_NAMES).find(([, name]) => name === selectedUnitFilter)?.[0] ||
        'unit-1';

      onSessionCompleted({
        id: `vocab-srs-${Date.now()}`,
        unitId: matchedUnitId,
        unitTitle: selectedUnitFilter || 'Từ Vựng Spaced Repetition',
        skill: 'Vocabulary',
        score: scorePct,
        totalQuestions: results.length,
        correctAnswers: correctCount,
        timeSpentSeconds: elapsedSec,
        date: new Date().toISOString(),
        xpEarned: correctCount * 5,
      });
    }
  };

  const handleUpdateWords = (newWords: Word[]) => {
    setStore((prev) => {
      const nextStates = ensureCardStatesForWords(newWords, prev.cardStates);
      const nextStore: VocabSrsStoreData = {
        ...prev,
        words: newWords,
        cardStates: nextStates,
      };
      saveVocabSrsData(nextStore);
      return nextStore;
    });
  };

  const handleUpdateSettings = (newSettings: VocabSrsSettings) => {
    setStore((prev) => {
      const nextStore: VocabSrsStoreData = {
        ...prev,
        settings: newSettings,
      };
      saveVocabSrsData(nextStore);
      return nextStore;
    });
  };

  const handleResetProgress = () => {
    setStore((prev) => resetVocabProgress(prev));
  };

  const effectiveStreakDays = streakDays ?? store.streakDays;

  return (
    <div className="w-full">
      {screen === 'home' && (
        <VocabHomeView
          words={store.words}
          cardStates={store.cardStates}
          settings={store.settings}
          dueCardsCount={dueCards.length}
          newWordsTodayCount={newWordsAvailable.length}
          streakDays={effectiveStreakDays}
          selectedUnitFilter={selectedUnitFilter}
          onStartStudy={(unit) => handleStartStudy(unit)}
          onChangeUnit={setSelectedUnitFilter}
          onOpenUnitSelect={() => setScreen('units')}
          onOpenStats={() => setScreen('stats')}
          onOpenTeacherManager={() => setScreen('teacher')}
          onOpenSettings={() => setScreen('settings')}
        />
      )}

      {screen === 'units' && (
        <UnitSelectView
          words={store.words}
          cardStates={store.cardStates}
          settings={store.settings}
          selectedUnit={selectedUnitFilter}
          onSelectUnitAndStart={(unitName) => {
            setSelectedUnitFilter(unitName);
            handleStartStudy(unitName, true);
          }}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'study' && (
        <StudySessionView
          words={store.words}
          initialQueue={activeQueue}
          cardStates={store.cardStates}
          settings={store.settings}
          unitLabel={selectedUnitFilter}
          onTurnCompleted={handleTurnCompleted}
          onSessionFinished={handleSessionFinished}
          onExit={() => setScreen('home')}
        />
      )}

      {screen === 'summary' && (
        <SessionSummaryView
          words={store.words}
          results={lastSessionResults}
          settings={store.settings}
          onBackHome={() => setScreen('home')}
          onStudyMore={() => handleStartStudy(selectedUnitFilter, true)}
        />
      )}

      {screen === 'stats' && (
        <VocabStatsView
          words={store.words}
          cardStates={store.cardStates}
          dailyStats={store.dailyStats}
          streakDays={effectiveStreakDays}
          settings={store.settings}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'teacher' && (
        <TeacherVocabView
          words={store.words}
          settings={store.settings}
          onUpdateWords={handleUpdateWords}
          onUpdateSettings={handleUpdateSettings}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'settings' && (
        <VocabSettingsView
          settings={store.settings}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  );
};
