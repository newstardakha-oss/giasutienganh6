import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flag,
  RotateCcw,
  Send,
  ShieldCheck,
  Wifi,
  WifiOff,
} from 'lucide-react';
import type {
  SanitizedTestFormDef,
  SanitizedTestFormItem,
} from '../grammar-g6/testFormsLoader';
import {
  FirestoreTestAttemptDoc,
  FirestoreTestRoundDoc,
  TEST_ROUND_KIND_LABELS,
  recordTestTabSwitch,
  saveStudentItemResponse,
  startOrResumeTestAttempt,
  submitTestAttempt,
  toggleFlaggedTestItem,
} from '../services/researchTests';
import type { StudentAccount } from '../types';

interface StudentTestExamModalProps {
  round: FirestoreTestRoundDoc;
  student: StudentAccount;
  onClose: () => void;
  onSubmitted?: (attempt: FirestoreTestAttemptDoc) => void;
}

function formatCountdown(totalSec: number): string {
  const clamped = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const StudentTestExamModal: React.FC<StudentTestExamModalProps> = ({
  round,
  student,
  onClose,
  onSubmitted,
}) => {
  const [{ attempt: initialAttempt, sanitizedForm }] = useState(() =>
    startOrResumeTestAttempt({ round, student })
  );

  const [attempt, setAttempt] = useState<FirestoreTestAttemptDoc>(initialAttempt);
  const [stage, setStage] = useState<'intro' | 'exam' | 'submitted'>(() => {
    if (
      initialAttempt.status === 'submitted' ||
      initialAttempt.status === 'auto_submitted'
    ) {
      return 'submitted';
    }
    return 'intro';
  });

  const [currentIdx, setCurrentIdx] = useState<number>(
    initialAttempt.currentItemIndex ?? 0
  );
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // Thời gian vào câu hiện tại để cộng dồn timeSec cho từng câu
  const itemEnteredAtRef = useRef<number>(Date.now());
  const autoSubmitTriggeredRef = useRef<boolean>(false);

  // Tính số giây còn lại dựa trên startedAt và durationMin (đồng hồ vẫn chạy kể cả khi đóng trình duyệt mở lại)
  const computeRemainingSec = (att: FirestoreTestAttemptDoc): number => {
    const totalAllowedSec = (round.durationMin || 40) * 60;
    const startedMs = Date.parse(att.startedAt);
    if (!Number.isFinite(startedMs)) return totalAllowedSec;
    const elapsedSec = Math.floor((Date.now() - startedMs) / 1000);
    return Math.max(0, totalAllowedSec - elapsedSec);
  };

  const [remainingSec, setRemainingSec] = useState<number>(() =>
    computeRemainingSec(initialAttempt)
  );

  // Theo dõi trạng thái mạng (offline / online)
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Ghi nhận số lần rời khỏi tab trong lúc đang làm bài (chỉ ghi lại, không chặn)
  useEffect(() => {
    if (stage !== 'exam') return;
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const updated = recordTestTabSwitch(attempt.id);
        if (updated) setAttempt(updated);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [stage, attempt.id]);

  // Đồng hồ đếm ngược & tự nộp khi hết giờ
  useEffect(() => {
    if (stage !== 'exam') return;
    const timer = setInterval(() => {
      const rem = computeRemainingSec(attempt);
      setRemainingSec(rem);
      if (rem <= 0 && !autoSubmitTriggeredRef.current) {
        autoSubmitTriggeredRef.current = true;
        void handleFinalSubmit(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, attempt.startedAt, round.durationMin]);

  // Bản đồ câu hỏi đã lọc đáp án
  const itemById = useMemo(() => {
    const map: Record<string, SanitizedTestFormItem> = {};
    for (const it of sanitizedForm.items) {
      map[it.id] = it;
    }
    return map;
  }, [sanitizedForm]);

  const orderedItems = useMemo(() => {
    return attempt.itemOrder
      .map((id) => itemById[id])
      .filter((it): it is SanitizedTestFormItem => Boolean(it));
  }, [attempt.itemOrder, itemById]);

  const currentItem = orderedItems[currentIdx] || orderedItems[0];
  const currentResponse = currentItem ? attempt.responses[currentItem.id] : undefined;

  // Khi chuyển câu, đặt lại mốc thời gian tính cho câu đó
  useEffect(() => {
    itemEnteredAtRef.current = Date.now();
  }, [currentIdx]);

  const recordAnswer = (
    item: SanitizedTestFormItem,
    answerText: string,
    selectedShuffledIndex?: number
  ) => {
    const now = Date.now();
    const deltaSec = Math.max(0, (now - itemEnteredAtRef.current) / 1000);
    itemEnteredAtRef.current = now;

    const updated = saveStudentItemResponse({
      attemptId: attempt.id,
      itemId: item.id,
      answer: answerText,
      selectedShuffledIndex,
      timeSec: deltaSec,
      currentItemIndex: currentIdx,
    });
    if (updated) {
      setAttempt(updated);
      setLastSavedAt(
        new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }
  };

  const handleToggleFlag = (itemId: string) => {
    const updated = toggleFlaggedTestItem(attempt.id, itemId);
    if (updated) setAttempt(updated);
  };

  const handleFinalSubmit = async (auto = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowSubmitConfirm(false);
    try {
      const graded = await submitTestAttempt(attempt.id, auto);
      if (graded) {
        setAttempt(graded);
        setStage('submitted');
        onSubmitted?.(graded);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thống kê câu đã làm / chưa làm / đánh dấu xem lại
  const { answeredCount, unansweredNumbers, flaggedCount } = useMemo(() => {
    let answered = 0;
    const unanswered: number[] = [];
    orderedItems.forEach((it, idx) => {
      const r = attempt.responses[it.id];
      const hasAns = Boolean(r && r.answer && r.answer.trim().length > 0);
      if (hasAns) {
        answered++;
      } else {
        unanswered.push(idx + 1);
      }
    });
    return {
      answeredCount: answered,
      unansweredNumbers: unanswered,
      flaggedCount: (attempt.flaggedItems || []).length,
    };
  }, [orderedItems, attempt.responses, attempt.flaggedItems]);

  // ===== MÀN 1: MÀN BẮT ĐẦU (INTRO) =====
  if (stage === 'intro') {
    const hasProgress = Object.keys(attempt.responses).length > 0;
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-indigo-100 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{TEST_ROUND_KIND_LABELS[round.kind]}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {round.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Học sinh: <strong className="text-indigo-800">{student.fullName}</strong> · Lớp{' '}
                <strong>{student.className}</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-indigo-50 p-3.5 text-center border border-indigo-100">
              <span className="text-[11px] font-bold text-indigo-700 uppercase block">Số câu hỏi</span>
              <span className="text-lg sm:text-xl font-black text-indigo-950">
                {orderedItems.length} câu
              </span>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3.5 text-center border border-amber-100">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">Thời gian</span>
              <span className="text-lg sm:text-xl font-black text-amber-950">
                {round.durationMin || 40} phút
              </span>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3.5 text-center border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block">Thang điểm</span>
              <span className="text-lg sm:text-xl font-black text-emerald-950">10 điểm</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="font-extrabold text-slate-900">📋 Nội quy phòng kiểm tra:</div>
            <ul className="list-disc pl-5 space-y-1.5 font-medium">
              <li>
                Bài kiểm tra mở ở chế độ toàn màn hình. Menu, thanh điều hướng và Gia sư AI được ẩn hoàn toàn trong suốt giờ làm bài.
              </li>
              <li>
                Mỗi câu trả lời đều được <strong>tự động lưu ngay lập tức</strong>. Nếu mất mạng hoặc lỡ đóng trình duyệt, em có thể vào lại làm tiếp (đồng hồ vẫn tính giờ).
              </li>
              <li>
                Trong lúc làm bài, hệ thống <strong>không hiện đúng/sai</strong>, không có gợi ý và không mở lý thuyết.
              </li>
              <li>
                Mỗi đợt kiểm tra mỗi học sinh chỉ làm <strong>1 lần duy nhất</strong>. Khi hết giờ hệ thống sẽ tự động thu bài.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-2xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                setRemainingSec(computeRemainingSec(attempt));
                setStage('exam');
              }}
              className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all cursor-pointer"
            >
              {hasProgress
                ? `Tiếp tục làm bài (${answeredCount}/${orderedItems.length} câu)`
                : 'Bắt đầu làm bài'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== MÀN 3: SAU KHI NỘP BÀI (SUBMITTED - KHÔNG HIỆN ĐÁP ÁN) =====
  if (stage === 'submitted') {
    const minsTaken = Math.max(1, Math.round((attempt.durationSec || 60) / 60));
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-200 text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 grid place-items-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              {attempt.status === 'auto_submitted' ? 'Hết giờ • Tự động thu bài' : 'Hoàn thành bài kiểm tra'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Em đã nộp bài!</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {round.name} · Học sinh: <strong>{student.fullName}</strong> ({student.className})
            </p>
          </div>

          {round.showScoreAfterSubmit ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-700 uppercase block">Điểm số</span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-950">
                  {attempt.score10.toFixed(2)} <span className="text-sm font-bold">/ 10</span>
                </span>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-700 uppercase block">Số câu đúng</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-950">
                  {attempt.rawCorrect} <span className="text-sm font-bold">/ {orderedItems.length}</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100 text-xs sm:text-sm font-semibold text-indigo-900">
              Bài làm của em đã được ghi nhận an toàn. Điểm số sẽ được giáo viên thông báo sau khi đợt kiểm tra kết thúc.
            </div>
          )}

          <p className="text-xs text-slate-500 font-medium">
            Thời gian hoàn thành: khoảng {minsTaken} phút. Để bảo mật đề kiểm tra nghiên cứu, hệ thống không hiển thị đáp án chi tiết sau khi nộp.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[48px] px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all cursor-pointer"
          >
            Quay về màn hình chính
          </button>
        </div>
      </div>
    );
  }

  // ===== MÀN 2: TOÀN MÀN HÌNH LÀM BÀI (EXAM VIEW) =====
  const isFlagged = Boolean(
    currentItem && (attempt.flaggedItems || []).includes(currentItem.id)
  );
  const isUrgent = remainingSec <= 300;
  const isCritical = remainingSec <= 60;

  // Chuẩn bị dữ liệu hiển thị cho câu hỏi hiện tại (theo optionOrder đã xáo trộn riêng cho học sinh)
  const optionPerm = currentItem
    ? attempt.optionOrder[currentItem.id] ||
      Array.from({ length: currentItem.options?.length || currentItem.tokens?.length || 0 }, (_, i) => i)
    : [];

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-100 text-slate-900 flex flex-col overflow-hidden"
      role="dialog"
      aria-label={`Làm bài kiểm tra: ${round.name}`}
    >
      {/* Top Sticky Exam Bar (Ẩn toàn bộ menu, header và chatbot AI của app) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              {round.name}
            </span>
            <span className="text-xs font-bold text-slate-600 truncate">
              {student.fullName} ({student.className})
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold">
            {isOnline ? (
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <Wifi className="w-3.5 h-3.5" />
                <span>
                  Đã tự lưu{lastSavedAt ? ` lúc ${lastSavedAt}` : ''}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                <WifiOff className="w-3.5 h-3.5" />
                <span>Mất mạng • Đang lưu tạm trên máy, sẽ tự đồng bộ khi có mạng</span>
              </span>
            )}
          </div>
        </div>

        {/* Đồng hồ đếm ngược + Nút nộp bài */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-mono text-base sm:text-lg font-black border ${
              isCritical
                ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                : isUrgent
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-slate-100 text-slate-900 border-slate-300'
            }`}
            aria-live="polite"
            title="Thời gian làm bài còn lại"
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span>{formatCountdown(remainingSec)}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowSubmitConfirm(true)}
            className="min-h-[42px] px-4 sm:px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Nộp bài ({answeredCount}/{orderedItems.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Cột trái: Khung làm câu hỏi hiện tại (8/12) */}
          <div className="lg:col-span-8 space-y-4">
            {currentItem && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                {/* Tiêu đề câu & Nút đánh dấu xem lại */}
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs sm:text-sm">
                      Câu {currentIdx + 1} / {orderedItems.length}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Unit {currentItem.unit} ·{' '}
                      {currentItem.type === 'mcq'
                        ? 'Trắc nghiệm'
                        : currentItem.type === 'gap'
                        ? 'Điền một chỗ trống'
                        : 'Sắp xếp câu'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleFlag(currentItem.id)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                      isFlagged
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-800'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{isFlagged ? 'Đã đánh dấu xem lại' : 'Đánh dấu xem lại'}</span>
                  </button>
                </div>

                {/* Hướng dẫn / Ngân hàng từ (nếu có) */}
                {currentItem.wordBank && (
                  <div className="rounded-2xl bg-indigo-50/70 border border-indigo-100 p-3.5 text-xs sm:text-sm font-semibold text-indigo-950">
                    {currentItem.wordBank.split(' | ').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}

                {/* Dạng 1: Trắc nghiệm (MCQ - xáo trộn phương án theo optionPerm) */}
                {currentItem.type === 'mcq' && currentItem.options && (
                  <div className="space-y-4">
                    <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                      {currentItem.prompt}
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {optionPerm.map((origOptIdx, displayIdx) => {
                        const optText = currentItem.options![origOptIdx];
                        const letter = String.fromCharCode(65 + displayIdx);
                        const isSelected =
                          currentResponse?.selectedShuffledIndex === displayIdx ||
                          currentResponse?.answer === optText;

                        return (
                          <button
                            key={`${currentItem.id}-opt-${displayIdx}`}
                            type="button"
                            onClick={() => recordAnswer(currentItem, optText, displayIdx)}
                            className={`min-h-[52px] p-3.5 sm:p-4 rounded-2xl text-left flex items-center gap-3.5 border-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-extrabold shadow-xs'
                                : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800 font-semibold'
                            }`}
                          >
                            <span
                              className={`w-8 h-8 rounded-xl grid place-items-center text-xs sm:text-sm font-black shrink-0 ${
                                isSelected
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {letter}
                            </span>
                            <span className="text-sm sm:text-base break-words">{optText}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dạng 2: Điền 1 chỗ trống (GAP) */}
                {currentItem.type === 'gap' && (
                  <div className="space-y-4">
                    <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                      {currentItem.prompt}
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Nhập câu trả lời vào chỗ trống:
                      </label>
                      <input
                        type="text"
                        value={currentResponse?.answer ?? ''}
                        onChange={(e) => recordAnswer(currentItem, e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        placeholder="Gõ từ hoặc cụm từ cần điền…"
                        className="w-full min-h-[48px] px-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-none text-base font-bold text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Dạng 3: Sắp xếp câu (REORDER) */}
                {currentItem.type === 'reorder' && currentItem.tokens && (
                  <ExamReorderQuestion
                    key={currentItem.id}
                    item={currentItem}
                    optionPerm={optionPerm}
                    currentAnswer={currentResponse?.answer ?? ''}
                    onChangeAnswer={(ans) => recordAnswer(currentItem, ans)}
                  />
                )}

                {/* Điều hướng Câu trước / Câu tiếp theo */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                    className="min-h-[44px] px-4 py-2 rounded-2xl border border-slate-300 text-slate-700 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  <span className="text-xs font-bold text-slate-500">
                    {currentResponse?.answer?.trim()
                      ? '✓ Đã trả lời (tự động lưu)'
                      : 'Chưa trả lời'}
                  </span>

                  <button
                    type="button"
                    disabled={currentIdx >= orderedItems.length - 1}
                    onClick={() =>
                      setCurrentIdx((i) => Math.min(orderedItems.length - 1, i + 1))
                    }
                    className="min-h-[44px] px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cột phải: Lưới 40 câu hỏi (4/12) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Danh sách câu hỏi</h3>
              <span className="text-xs font-bold text-indigo-700">
                Đã làm {answeredCount}/{orderedItems.length}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2">
              {orderedItems.map((it, idx) => {
                const resp = attempt.responses[it.id];
                const isAnswered = Boolean(resp && resp.answer && resp.answer.trim().length > 0);
                const isItemFlagged = (attempt.flaggedItems || []).includes(it.id);
                const isCurrent = idx === currentIdx;

                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-10 rounded-xl font-extrabold text-xs relative transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'ring-2 ring-indigo-600 ring-offset-2 '
                        : ''
                    }${
                      isAnswered
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    aria-label={`Câu ${idx + 1}${isAnswered ? ' (đã làm)' : ' (chưa làm)'}${
                      isItemFlagged ? ' - đánh dấu xem lại' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isItemFlagged && (
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-white absolute -top-1 -right-1"
                        title="Đánh dấu xem lại"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chú thích màu sắc */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-indigo-600 inline-block" />
                <span>Đã làm ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" />
                <span>Chưa làm ({unansweredNumbers.length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span>Xem lại ({flaggedCount})</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full min-h-[46px] py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xs transition-all cursor-pointer"
            >
              Nộp bài kiểm tra
            </button>
          </div>
        </div>
      </div>

      {/* Hộp xác nhận nộp bài nội bộ (không dùng window.confirm của trình duyệt) */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-[110] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 grid place-items-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Xác nhận nộp bài kiểm tra?
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Thời gian còn lại: {formatCountdown(remainingSec)}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-600">Số câu đã trả lời:</span>
                <span className="text-indigo-700">
                  {answeredCount} / {orderedItems.length} câu
                </span>
              </div>

              {unansweredNumbers.length > 0 ? (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold">
                  ⚠️ Em còn <strong>{unansweredNumbers.length} câu chưa làm</strong> (Câu:{' '}
                  {unansweredNumbers.slice(0, 12).join(', ')}
                  {unansweredNumbers.length > 12 ? '…' : ''}).
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  ✓ Em đã trả lời đầy đủ tất cả {orderedItems.length} câu hỏi!
                </div>
              )}

              {flaggedCount > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
                  🚩 Em đang đánh dấu <strong>{flaggedCount} câu</strong> cần xem lại.
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Sau khi nhấn <strong>Xác nhận nộp bài</strong>, em sẽ không thể sửa lại câu trả lời nữa.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowSubmitConfirm(false)}
                className="min-h-[44px] px-4 py-2 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 cursor-pointer"
              >
                Quay lại làm tiếp
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => void handleFinalSubmit(false)}
                className="min-h-[44px] px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                {isSubmitting ? 'Đang nộp bài…' : 'Xác nhận nộp bài'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ExamReorderQuestionProps {
  item: SanitizedTestFormItem;
  optionPerm: number[];
  currentAnswer: string;
  onChangeAnswer: (answer: string) => void;
}

const ExamReorderQuestion: React.FC<ExamReorderQuestionProps> = ({
  item,
  optionPerm,
  currentAnswer,
  onChangeAnswer,
}) => {
  const tokens = item.tokens || [];
  const endPunct = item.endPunct || '.';

  // Khôi phục danh sách chỉ số token đã chọn từ câu trả lời đã lưu (nếu có)
  const [pickedPermIndices, setPickedPermIndices] = useState<number[]>(() => {
    if (!currentAnswer.trim()) return [];
    const cleanAns = currentAnswer
      .trim()
      .replace(new RegExp(`\\${endPunct}$`), '')
      .trim();
    if (!cleanAns) return [];
    const words = cleanAns.split(/\s+/);
    const used = new Set<number>();
    const indices: number[] = [];
    for (const w of words) {
      const foundIdx = optionPerm.findIndex(
        (origIdx, pIdx) => !used.has(pIdx) && tokens[origIdx] === w
      );
      if (foundIdx !== -1) {
        used.add(foundIdx);
        indices.push(foundIdx);
      }
    }
    return indices;
  });

  const emitAnswer = (nextIndices: number[]) => {
    setPickedPermIndices(nextIndices);
    if (nextIndices.length === 0) {
      onChangeAnswer('');
      return;
    }
    const sentence = nextIndices.map((pIdx) => tokens[optionPerm[pIdx]]).join(' ') + endPunct;
    onChangeAnswer(sentence);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-slate-600">
        Chạm vào các thẻ từ bên dưới để sắp xếp thành câu hoàn chỉnh:
      </p>

      {/* Khay câu trả lời của học sinh */}
      <div className="min-h-[64px] p-3.5 rounded-2xl bg-indigo-50/60 border-2 border-dashed border-indigo-300 flex items-center flex-wrap gap-2">
        {pickedPermIndices.length === 0 ? (
          <span className="text-xs font-semibold text-slate-400">
            Chạm vào các từ bên dưới để xếp vào đây…
          </span>
        ) : (
          <>
            {pickedPermIndices.map((pIdx, pos) => (
              <button
                key={`picked-${pIdx}-${pos}`}
                type="button"
                onClick={() => {
                  const next = pickedPermIndices.filter((_, i) => i !== pos);
                  emitAnswer(next);
                }}
                className="min-h-[38px] px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-xs hover:bg-rose-600 transition-colors cursor-pointer"
                title="Chạm để bỏ từ này xuống"
              >
                {tokens[optionPerm[pIdx]]}
              </button>
            ))}
            <span className="font-black text-lg text-indigo-900 px-1">{endPunct}</span>
          </>
        )}
      </div>

      {/* Các thẻ từ còn lại */}
      <div className="flex items-center flex-wrap gap-2">
        {optionPerm.map((origIdx, pIdx) => {
          const isUsed = pickedPermIndices.includes(pIdx);
          return (
            <button
              key={`pool-${pIdx}`}
              type="button"
              disabled={isUsed}
              onClick={() => emitAnswer([...pickedPermIndices, pIdx])}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl font-bold text-sm border transition-all ${
                isUsed
                  ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer shadow-2xs'
              }`}
            >
              {tokens[origIdx]}
            </button>
          );
        })}

        {pickedPermIndices.length > 0 && (
          <button
            type="button"
            onClick={() => emitAnswer([])}
            className="min-h-[40px] px-3 py-2 rounded-xl text-xs font-extrabold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 inline-flex items-center gap-1 cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xếp lại</span>
          </button>
        )}
      </div>
    </div>
  );
};
