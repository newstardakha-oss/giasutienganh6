import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Clock,
  Download,
  EyeOff,
  Filter,
  Loader2,
  Target,
  Users,
  X,
  AlertTriangle,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AppDataSchema, StudentAccount, TeacherAccount } from '../types';
import { LoadedGrammarBundle } from '../grammar-g6/dataLoader';
import { GrammarStudentStore } from '../grammar-g6/types';
import {
  ATTEMPT_SKILL_LABELS,
  AnalyticsReportFilter,
  AttemptSkill,
  StudentAnalyticsRow,
  buildTeacherAnalyticsReport,
  toSchoolId,
} from '../services/firebaseAnalytics';
import { exportTeacherReportToXlsx } from '../services/excelExport';

interface TeacherAnalyticsReportSectionProps {
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  scopeStudents: StudentAccount[];
  grammarBundle: LoadedGrammarBundle | null;
  classGrammarStores: Record<string, GrammarStudentStore>;
}

const SKILL_OPTIONS: AttemptSkill[] = [
  'grammar',
  'vocab',
  'pronunciation',
  'reading',
  'writing',
  'game',
];

function formatMinutes(mins: number): string {
  if (mins < 60) return `${Math.round(mins)} phút`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m > 0 ? `${h} giờ ${m} phút` : `${h} giờ`;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return 'Chưa học';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Trang "Báo cáo" cho giáo viên – đọc từ collection "attempts" & "dailyStats".
 */
export const TeacherAnalyticsReportSection: React.FC<TeacherAnalyticsReportSectionProps> = ({
  appData,
  currentTeacher,
  isAdmin,
  scopeStudents,
  grammarBundle,
  classGrammarStores,
}) => {
  // Giáo viên thường bị khoá theo trường của mình (đúng Security Rules)
  const lockedSchoolId =
    !isAdmin && currentTeacher
      ? toSchoolId(currentTeacher.schoolName, currentTeacher.communeName, currentTeacher.provinceName)
      : null;

  const [filter, setFilter] = useState<AnalyticsReportFilter>({
    schoolId: 'all',
    className: 'all',
    unitId: 'all',
    skill: 'all',
    dateRange: '30d',
  });
  const [anonymize, setAnonymize] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const [detailStudentId, setDetailStudentId] = useState<string | null>(null);
  // Tăng khi có attempt mới ở tab khác để tính lại báo cáo
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('firestore_collection_')) {
        setRefreshTick((t) => t + 1);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!detailStudentId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailStudentId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detailStudentId]);

  const report = useMemo(
    () =>
      buildTeacherAnalyticsReport({
        appData,
        currentTeacher,
        isAdmin,
        filter,
        grammarBundle,
        classGrammarStores,
        scopeStudents,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appData, currentTeacher, isAdmin, filter, grammarBundle, classGrammarStores, scopeStudents, refreshTick]
  );

  const displayName = (row: StudentAnalyticsRow) =>
    anonymize ? row.anonymousCode : row.fullName;

  const schoolLabel =
    filter.schoolId === 'all'
      ? lockedSchoolId
        ? currentTeacher?.schoolName || 'Trường của tôi'
        : 'Tất cả các trường'
      : report.availableSchools.find((s) => s.schoolId === filter.schoolId)?.schoolName ||
        filter.schoolId;

  const handleExport = async () => {
    setExportError('');
    setIsExporting(true);
    try {
      await exportTeacherReportToXlsx({
        report,
        filter,
        anonymize,
        schoolLabel,
        teacherName: currentTeacher?.fullName,
      });
    } catch (err) {
      console.error('[Báo cáo] Lỗi xuất Excel:', err);
      setExportError('Không thể tạo file Excel. Vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  const updateFilter = (patch: Partial<AnalyticsReportFilter>) =>
    setFilter((prev) => ({ ...prev, ...patch }));

  const detailRow = detailStudentId
    ? report.studentRows.find((r) => r.studentId === detailStudentId) || null
    : null;

  const unitChartData = report.unitAccuracyChart.map((u) => ({
    ...u,
    accuracy: u.attemptCount > 0 ? u.accuracyPct : 0,
  }));

  const selectClass =
    'px-2.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer';

  return (
    <section
      aria-label="Báo cáo học tập"
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5"
    >
      {/* Tiêu đề + thao tác */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-700 shrink-0" />
            <span>Báo cáo</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Tổng hợp từ từng lần nộp bài của học sinh (collection <code>attempts</code>) và số liệu theo ngày
            (<code>dailyStats</code>).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={anonymize}
              onChange={(e) => setAnonymize(e.target.checked)}
              className="w-4 h-4 accent-indigo-700"
            />
            <EyeOff className="w-3.5 h-3.5" />
            <span>Ẩn danh (HS01, HS02...)</span>
          </label>
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>
      {exportError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {exportError}
        </div>
      )}

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-end gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
        <Filter className="w-4 h-4 text-indigo-700 mb-2" />
        <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
          Trường
          <select
            value={filter.schoolId}
            onChange={(e) => updateFilter({ schoolId: e.target.value, className: 'all' })}
            className={selectClass}
            disabled={Boolean(lockedSchoolId) && report.availableSchools.length <= 1}
          >
            <option value="all">{lockedSchoolId ? currentTeacher?.schoolName || 'Trường của tôi' : 'Tất cả'}</option>
            {report.availableSchools.length > 1 &&
              report.availableSchools.map((s) => (
                <option key={s.schoolId} value={s.schoolId}>
                  {s.schoolName}
                </option>
              ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
          Lớp
          <select
            value={filter.className}
            onChange={(e) => updateFilter({ className: e.target.value })}
            className={selectClass}
          >
            <option value="all">Tất cả</option>
            {report.availableClasses.map((c) => (
              <option key={c} value={c}>
                Lớp {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
          Unit
          <select
            value={filter.unitId}
            onChange={(e) => updateFilter({ unitId: e.target.value })}
            className={selectClass}
          >
            <option value="all">Tất cả</option>
            {appData.units.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
          Kỹ năng
          <select
            value={filter.skill}
            onChange={(e) => updateFilter({ skill: e.target.value as AnalyticsReportFilter['skill'] })}
            className={selectClass}
          >
            <option value="all">Tất cả</option>
            {SKILL_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {ATTEMPT_SKILL_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
          Khoảng thời gian
          <select
            value={filter.dateRange}
            onChange={(e) =>
              updateFilter({ dateRange: e.target.value as AnalyticsReportFilter['dateRange'] })
            }
            className={selectClass}
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
            <option value="all">Tất cả</option>
            <option value="custom">Tuỳ chọn...</option>
          </select>
        </label>
        {filter.dateRange === 'custom' && (
          <>
            <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
              Từ ngày
              <input
                type="date"
                value={filter.customFromDate || ''}
                onChange={(e) => updateFilter({ customFromDate: e.target.value })}
                className={selectClass}
              />
            </label>
            <label className="flex flex-col gap-1 text-[11px] font-extrabold text-slate-600">
              Đến ngày
              <input
                type="date"
                value={filter.customToDate || ''}
                onChange={(e) => updateFilter({ customToDate: e.target.value })}
                className={selectClass}
              />
            </label>
          </>
        )}
      </div>

      {/* Thẻ tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
          <span className="text-xs font-extrabold text-indigo-900 flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Số học sinh hoạt động
          </span>
          <div className="text-2xl font-extrabold text-slate-900">
            {report.overview.activeStudentsCount}
            <span className="text-sm font-bold text-slate-500">
              {' '}
              / {report.overview.totalStudentsInScope}
            </span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
          <span className="text-xs font-extrabold text-sky-900 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Tổng giờ học
          </span>
          <div className="text-2xl font-extrabold text-slate-900">
            {report.overview.totalStudyHours.toLocaleString('vi-VN')} giờ
          </div>
          <span className="text-[11px] font-bold text-sky-800">
            {Math.round(report.overview.totalStudyMinutes)} phút · {report.overview.totalAttempts} lượt nộp
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
          <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
            <Target className="w-4 h-4" /> Tỉ lệ đúng trung bình
          </span>
          <div className="text-2xl font-extrabold text-slate-900">
            {report.overview.totalAttempts > 0 ? `${report.overview.avgAccuracyPct}%` : '—'}
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">Số phút học theo tuần</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.weeklyStudyChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="weekLabel" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 11, fill: '#334155' }} />
                <Tooltip
                  formatter={(value) => [`${value} phút`, 'Thời gian học']}
                  labelFormatter={(label) => `Tuần ${label}`}
                />
                <Bar dataKey="studyMinutes" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">Tỉ lệ đúng theo Unit (%)</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="unitLabel" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#334155' }} />
                <Tooltip
                  formatter={(value, _name, item) => {
                    const payload = (item as { payload?: { attemptCount?: number } })?.payload;
                    return payload?.attemptCount
                      ? [`${value}% (${payload.attemptCount} lượt)`, 'Tỉ lệ đúng']
                      : ['Chưa có dữ liệu', 'Tỉ lệ đúng'];
                  }}
                  labelFormatter={(_label, payload) =>
                    (payload?.[0]?.payload as { unitTitle?: string } | undefined)?.unitTitle || ''
                  }
                />
                <Bar dataKey="accuracy" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top 10 câu / điểm ngữ pháp sai nhiều nhất */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          10 điểm ngữ pháp / câu hỏi lớp sai nhiều nhất
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Điểm ngữ pháp / Câu hỏi</th>
                <th className="py-2.5 px-3">Unit</th>
                <th className="py-2.5 px-3">Kỹ năng</th>
                <th className="py-2.5 px-3 text-center">Sai / Lượt làm</th>
                <th className="py-2.5 px-3">Câu trả lời sai phổ biến</th>
                <th className="py-2.5 px-3 text-center">Số HS sai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {report.topMissedItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500 font-semibold">
                    Chưa có câu trả lời sai nào trong phạm vi lọc.
                  </td>
                </tr>
              ) : (
                report.topMissedItems.map((it) => (
                  <tr key={it.key} className="hover:bg-slate-50/80 align-top">
                    <td className="py-2.5 px-3 font-extrabold text-rose-700">{it.rank}</td>
                    <td className="py-2.5 px-3">
                      <span className="block font-extrabold text-slate-900">{it.grammarPointTitle}</span>
                      <span className="block text-[11px] text-slate-600 mt-0.5">{it.questionPrompt}</span>
                    </td>
                    <td className="py-2.5 px-3 font-bold whitespace-nowrap">Unit {it.unitNumber}</td>
                    <td className="py-2.5 px-3 font-bold whitespace-nowrap">{it.skillLabel}</td>
                    <td className="py-2.5 px-3 text-center font-extrabold whitespace-nowrap">
                      {it.wrongCount}/{it.totalAttempts}
                      <span className="block text-[10px] font-bold text-rose-700">{it.errorRatePct}% sai</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <code className="px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-900 font-bold">
                        {it.mostCommonWrongAnswer}
                      </code>
                      <span className="text-[10px] text-slate-500 font-bold"> ×{it.mostCommonWrongCount}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-extrabold">{it.affectedStudentCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bảng học sinh */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
          Bảng học sinh <span className="font-semibold text-slate-500">(bấm vào một dòng để xem chi tiết)</span>
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase">
                <th className="py-2.5 px-3">Học sinh</th>
                <th className="py-2.5 px-3">Lớp</th>
                <th className="py-2.5 px-3 text-right">Thời gian học</th>
                <th className="py-2.5 px-3 text-right">Số bài</th>
                <th className="py-2.5 px-3 text-right">Tỉ lệ đúng</th>
                <th className="py-2.5 px-3">Lần học gần nhất</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {report.studentRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500 font-semibold">
                    Không có học sinh nào trong phạm vi lọc.
                  </td>
                </tr>
              ) : (
                report.studentRows.map((row) => (
                  <tr
                    key={row.studentId}
                    onClick={() => setDetailStudentId(row.studentId)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setDetailStudentId(row.studentId);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Xem chi tiết ${displayName(row)}`}
                    className="hover:bg-indigo-50/60 cursor-pointer focus:outline-none focus:bg-indigo-50"
                  >
                    <td className="py-2.5 px-3 font-extrabold text-slate-900">
                      {!anonymize && <span className="mr-1.5">{row.avatar}</span>}
                      {displayName(row)}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-indigo-800">{row.className}</td>
                    <td className="py-2.5 px-3 text-right font-bold whitespace-nowrap">
                      {formatMinutes(row.studyMinutes)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold">{row.attemptCount}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold">
                      {row.attemptCount > 0 ? `${row.accuracyPct}%` : '—'}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                      {formatDateTime(row.lastStudiedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chi tiết học sinh */}
      {detailRow && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDetailStudentId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Chi tiết học sinh ${displayName(detailRow)}`}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDetailStudentId(null)}
              aria-label="Đóng"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {displayName(detailRow)} · Lớp {detailRow.className}
              </h3>
              <p className="text-xs text-slate-600 font-semibold">
                {formatMinutes(detailRow.studyMinutes)} · {detailRow.attemptCount} bài ·{' '}
                {detailRow.attemptCount > 0 ? `Đúng ${detailRow.accuracyPct}%` : 'Chưa có bài'} · Gần nhất:{' '}
                {formatDateTime(detailRow.lastStudiedAt)}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SKILL_OPTIONS.map((sk) => {
                const s = detailRow.bySkill[sk];
                return (
                  <div key={sk} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[11px] font-extrabold text-slate-600">
                      {ATTEMPT_SKILL_LABELS[sk]}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {s.attempts > 0 ? `${s.accuracyPct}%` : '—'}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500">
                      {s.attempts} lượt · {formatMinutes(s.studyMinutes)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-extrabold text-slate-900">Nhật ký học theo ngày</h4>
              {detailRow.dailyBreakdown.length === 0 ? (
                <p className="text-xs text-slate-500">Chưa có dữ liệu trong khoảng thời gian đã chọn.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-600">
                      <tr>
                        <th className="py-2 px-3">Ngày</th>
                        <th className="py-2 px-3 text-right">Số phút</th>
                        <th className="py-2 px-3 text-right">Số câu</th>
                        <th className="py-2 px-3 text-right">Tỉ lệ đúng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {detailRow.dailyBreakdown.slice(0, 30).map((d) => (
                        <tr key={d.date}>
                          <td className="py-1.5 px-3 font-bold">{d.date.split('-').reverse().join('/')}</td>
                          <td className="py-1.5 px-3 text-right">{d.studyMinutes}</td>
                          <td className="py-1.5 px-3 text-right">{d.totalAttempts}</td>
                          <td className="py-1.5 px-3 text-right font-bold">{d.accuracyPct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-extrabold text-slate-900">Các lần nộp gần đây</h4>
              {detailRow.recentAttempts.length === 0 ? (
                <p className="text-xs text-slate-500">Chưa có lần nộp nào trong phạm vi lọc.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-600">
                      <tr>
                        <th className="py-2 px-3">Thời điểm</th>
                        <th className="py-2 px-3">Kỹ năng</th>
                        <th className="py-2 px-3">Câu / Bài</th>
                        <th className="py-2 px-3">Trả lời</th>
                        <th className="py-2 px-3 text-center">Kết quả</th>
                        <th className="py-2 px-3 text-right">Thời gian</th>
                        <th className="py-2 px-3">Thiết bị</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {detailRow.recentAttempts.slice(0, 30).map((a) => (
                        <tr key={a.id}>
                          <td className="py-1.5 px-3 whitespace-nowrap">{formatDateTime(a.submittedAt)}</td>
                          <td className="py-1.5 px-3 whitespace-nowrap">{ATTEMPT_SKILL_LABELS[a.skill]}</td>
                          <td className="py-1.5 px-3 font-mono text-[11px]">{a.itemId}</td>
                          <td className="py-1.5 px-3 max-w-[220px] truncate" title={a.answer}>
                            {a.answer || '(Bỏ trống)'}
                          </td>
                          <td className="py-1.5 px-3 text-center font-extrabold">
                            {a.correct ? (
                              <span className="text-emerald-700">Đúng</span>
                            ) : (
                              <span className="text-rose-700">Sai</span>
                            )}
                          </td>
                          <td className="py-1.5 px-3 text-right">{a.durationSec}s</td>
                          <td className="py-1.5 px-3">{a.device === 'mobile' ? 'Điện thoại' : 'Máy tính'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
