import React, { useEffect, useState } from 'react';
import { AlertCircle, BarChart3, BookMarked, Loader2 } from 'lucide-react';
import type { StudySession } from '../../types';
import type { ExerciseSet, GrammarStudentStore, Unit } from '../types';
import {
  loadGrammarDataset,
  toAppUnitId,
  toGrammarUnitId,
  type LoadedGrammarBundle,
} from '../dataLoader';
import {
  loadGrammarProgress,
  recordItemAttempt,
  recordSetCompletion,
} from '../storage';
import { UnitListView } from './UnitListView';
import { UnitDetailView } from './UnitDetailView';
import { ExercisePlayerView } from './ExercisePlayerView';
import { MistakesBookView } from './MistakesBookView';
import { TeacherGrammarStats } from './TeacherGrammarStats';

type ScreenState =
  | { view: 'home' }
  | { view: 'unit'; unitId: string; tab: 'theory' | 'practice' }
  | {
      view: 'player';
      itemIds: string[];
      title: string;
      setId?: string;
      returnScreen:
        | { view: 'unit'; unitId: string; tab: 'theory' | 'practice' }
        | { view: 'mistakes' };
      sessionKey: number;
    }
  | { view: 'mistakes' }
  | { view: 'stats' };

interface GrammarG6AppProps {
  currentStudentId?: string | null;
  initialUnitId?: string | null;
  onSessionCompleted?: (session: StudySession) => void;
}

export const GrammarG6App: React.FC<GrammarG6AppProps> = ({
  currentStudentId,
  initialUnitId,
  onSessionCompleted,
}) => {
  const [bundle, setBundle] = useState<LoadedGrammarBundle | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [store, setStore] = useState<GrammarStudentStore>(() =>
    loadGrammarProgress(currentStudentId)
  );
  const [screen, setScreen] = useState<ScreenState>({ view: 'home' });

  // Tải lại tiến độ khi đổi tài khoản học sinh
  useEffect(() => {
    setStore(loadGrammarProgress(currentStudentId));
  }, [currentStudentId]);

  // Lazy-load grammar_g6.json
  useEffect(() => {
    let active = true;
    loadGrammarDataset()
      .then((loaded) => {
        if (!active) return;
        setBundle(loaded);
        const mappedInitial = toGrammarUnitId(initialUnitId);
        if (mappedInitial && loaded.dataset.units.some((u) => u.id === mappedInitial)) {
          setScreen({ view: 'unit', unitId: mappedInitial, tab: 'theory' });
        }
      })
      .catch((err) => {
        if (!active) return;
        setLoadError(err?.message || 'Không thể tải dữ liệu Ngữ pháp Tiếng Anh 6.');
      });
    return () => {
      active = false;
    };
  }, [initialUnitId]);

  if (loadError) {
    return (
      <div className="neu-card bg-white p-8 text-center space-y-3 border border-rose-200">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
        <p className="text-sm font-bold text-rose-700">{loadError}</p>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="neu-card bg-white/90 p-10 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
        <p className="text-sm font-bold text-slate-600">
          Đang tải bộ học liệu Ngữ pháp Tiếng Anh 6 (12 Unit)…
        </p>
      </div>
    );
  }

  const { dataset, itemIndex, grammarPointIndex } = bundle;
  const mistakeCount = Object.keys(store.mistakes).filter((id) => Boolean(itemIndex[id])).length;

  const handleSelectUnit = (unit: Unit) => {
    setScreen({ view: 'unit', unitId: unit.id, tab: 'theory' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSet = (unit: Unit, set: ExerciseSet) => {
    setScreen({
      view: 'player',
      itemIds: set.items.map((it) => it.id),
      title: set.title,
      setId: set.id,
      returnScreen: { view: 'unit', unitId: unit.id, tab: 'practice' },
      sessionKey: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuickTest = (itemIds: string[], title: string, unit: Unit) => {
    setScreen({
      view: 'player',
      itemIds,
      title,
      returnScreen: { view: 'unit', unitId: unit.id, tab: 'practice' },
      sessionKey: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeMistakes = (itemIds: string[]) => {
    setScreen({
      view: 'player',
      itemIds,
      title: 'Luyện lại câu sai',
      returnScreen: { view: 'mistakes' },
      sessionKey: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-5">
      {/* Top Module Navigation Bar */}
      <div className="neu-card bg-white/95 px-4 sm:px-5 py-3 flex items-center justify-between flex-wrap gap-3 border border-purple-100">
        <button
          type="button"
          onClick={() => setScreen({ view: 'home' })}
          className="inline-flex items-center gap-2.5 min-h-[44px] text-left cursor-pointer group"
          aria-label="Về danh sách 12 Unit Ngữ pháp"
        >
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-base grid place-items-center shadow-xs group-hover:scale-105 transition-transform">
            6
          </span>
          <span className="font-extrabold text-sm sm:text-base text-purple-950 group-hover:text-indigo-600 transition-colors">
            Ngữ pháp Tiếng Anh 6
          </span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setScreen({ view: 'stats' })}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              screen.view === 'stats'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Thống kê</span>
          </button>

          <button
            type="button"
            onClick={() => setScreen({ view: 'mistakes' })}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              screen.view === 'mistakes'
                ? 'bg-rose-600 text-white shadow-xs'
                : mistakeCount > 0
                ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Sổ lỗi sai · {mistakeCount}</span>
          </button>
        </div>
      </div>

      {/* Screen Router */}
      {screen.view === 'home' && (
        <UnitListView
          units={dataset.units}
          store={store}
          onSelectUnit={handleSelectUnit}
        />
      )}

      {screen.view === 'unit' && (() => {
        const selectedUnit =
          dataset.units.find((u) => u.id === screen.unitId) ?? dataset.units[0];
        return (
          <UnitDetailView
            unit={selectedUnit}
            activeTab={screen.tab}
            store={store}
            onChangeTab={(tab) => setScreen({ view: 'unit', unitId: selectedUnit.id, tab })}
            onBackToUnits={() => setScreen({ view: 'home' })}
            onStartSet={(set) => handleStartSet(selectedUnit, set)}
            onStartQuickTest={handleStartQuickTest}
          />
        );
      })()}

      {screen.view === 'player' && (
        <ExercisePlayerView
          key={screen.sessionKey}
          itemIds={screen.itemIds}
          title={screen.title}
          setId={screen.setId}
          itemIndex={itemIndex}
          grammarPointIndex={grammarPointIndex}
          onRecordAttempt={(params) => {
            setStore((prev) => recordItemAttempt(prev, params, currentStudentId));
          }}
          onCompleteSession={({
            setId,
            unitId,
            unitTitle,
            scoreRatio,
            totalCount,
            correctCount,
            timeSpentSeconds,
          }) => {
            if (setId) {
              setStore((prev) =>
                recordSetCompletion(prev, setId, scoreRatio, currentStudentId)
              );
            }
            if (onSessionCompleted) {
              const scorePct = Math.round(scoreRatio * 100);
              onSessionCompleted({
                id: `grammar-g6-${Date.now()}`,
                unitId: toAppUnitId(unitId),
                unitTitle,
                skill: 'Grammar',
                score: scorePct,
                totalQuestions: totalCount,
                correctAnswers: correctCount,
                timeSpentSeconds,
                date: new Date().toISOString(),
                xpEarned: Math.max(10, Math.round(scorePct * 0.5)),
              });
            }
          }}
          onBack={() => setScreen(screen.returnScreen)}
          onReplay={() =>
            setScreen({
              ...screen,
              sessionKey: Date.now(),
            })
          }
        />
      )}

      {screen.view === 'mistakes' && (
        <MistakesBookView
          store={store}
          itemIndex={itemIndex}
          onBackHome={() => setScreen({ view: 'home' })}
          onPracticeMistakes={handlePracticeMistakes}
        />
      )}

      {screen.view === 'stats' && (
        <TeacherGrammarStats
          store={store}
          itemIndex={itemIndex}
          grammarPointIndex={grammarPointIndex}
          onBackHome={() => setScreen({ view: 'home' })}
        />
      )}
    </div>
  );
};
