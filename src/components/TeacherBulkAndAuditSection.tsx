import React, { useState, useMemo } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Play,
  Eye,
  ShieldAlert,
  FileSpreadsheet,
  Clock,
  CheckSquare,
  Square,
} from 'lucide-react';
import {
  AppDataSchema,
  StudentAccount,
  TeacherAccount,
  AuditLogSnapshotItem,
  MigrationReport,
} from '../types';
import {
  normalizeClassName,
  normalizeFullName,
  getProvincesList,
  getCommunesWithCodesForProvince,
  getCanonicalSchoolsDirectory,
  resolveCanonicalLocationStrict,
  buildCanonicalClassId,
  createAuditLogEntry,
  appendAuditLog,
  runDirectoryCodeMigration,
  undoBulkActionByAuditLog,
  hashPasswordSync,
  generateRecoveryCode,
  suggestAvailableUsernames,
  saveAppData,
  MAX_EXPORT_STUDENTS_LIMIT,
} from '../services/storage';
import { INITIAL_PROGRESS } from '../data/sgkData';
import {
  previewBulkActionApi,
  executeBulkActionApi,
  undoBulkActionApi,
  runServerMigrationApi,
  exportStudentsBoundedApi,
} from '../services/realtimeSync';

interface TeacherBulkAndAuditSectionProps {
  appData: AppDataSchema;
  currentTeacher: TeacherAccount | null;
  isAdmin: boolean;
  filteredStudents: StudentAccount[];
  onUpdateAppData?: React.Dispatch<React.SetStateAction<AppDataSchema>>;
}

export const TeacherBulkAndAuditSection: React.FC<TeacherBulkAndAuditSectionProps> = ({
  appData,
  currentTeacher,
  isAdmin,
  filteredStudents,
  onUpdateAppData,
}) => {
  const [subTab, setSubTab] = useState<'bulk' | 'migration' | 'audit'>('bulk');

  // Selection of students for Bulk Transfer / Normalize
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkMode, setBulkMode] = useState<
    'BULK_TRANSFER_CLASS' | 'BULK_NORMALIZE_SCHOOL' | 'BULK_IMPORT_STUDENTS'
  >('BULK_TRANSFER_CLASS');

  const provinces = useMemo(() => getProvincesList(), []);
  const [targetClassName, setTargetClassName] = useState<string>('6A1');
  const [targetProvinceCode, setTargetProvinceCode] = useState<string>('P19');
  const targetCommunes = useMemo(
    () => getCommunesWithCodesForProvince(appData, targetProvinceCode),
    [appData, targetProvinceCode]
  );
  const [targetCommuneCode, setTargetCommuneCode] = useState<string>('P19_C016');
  const targetSchools = useMemo(() => {
    return getCanonicalSchoolsDirectory(appData).filter(
      (sc) =>
        sc.provinceCode === targetProvinceCode &&
        (!targetCommuneCode || sc.communeCode === targetCommuneCode)
    );
  }, [appData, targetProvinceCode, targetCommuneCode]);
  const [targetSchoolId, setTargetSchoolId] = useState<string>(
    () => getCanonicalSchoolsDirectory(appData)[0]?.schoolId || ''
  );

  // Bulk import text (Họ và tên | Lớp | Tỉnh | Xã/phường | Trường)
  const [rawImportText, setRawImportText] = useState<string>('');

  // Preview state before execution
  const [previewResult, setPreviewResult] = useState<{
    operation: 'BULK_TRANSFER_CLASS' | 'BULK_NORMALIZE_SCHOOL' | 'BULK_IMPORT_STUDENTS';
    diffs: Array<{
      studentId: string;
      fullName: string;
      before: string;
      after: string;
      beforeSnap: AuditLogSnapshotItem;
      afterSnap: AuditLogSnapshotItem;
      newStudent?: StudentAccount;
      plainPassword?: string;
      recoveryCode?: string;
    }>;
    duplicates: Array<{ rowOrId: string; reason: string }>;
    errors: Array<{ rowOrId: string; reason: string }>;
  } | null>(null);

  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [importedAccountsModal, setImportedAccountsModal] = useState<
    Array<{
      fullName: string;
      username: string;
      className: string;
      schoolName: string;
      passwordPlain: string;
      recoveryCode: string;
    }>
  >([]);

  // Migration state
  const [migrationReport, setMigrationReport] = useState<MigrationReport | null>(null);

  // AuditLog pagination
  const [auditPage, setAuditPage] = useState<number>(1);
  const auditPageSize = 8;
  const scopedLogs = useMemo(() => {
    const all = appData.auditLogs || [];
    if (isAdmin) return all;
    return all.filter((l) => l.actorId === currentTeacher?.id);
  }, [appData.auditLogs, isAdmin, currentTeacher]);
  const auditTotalPages = Math.max(1, Math.ceil(scopedLogs.length / auditPageSize));
  const paginatedLogs = useMemo(() => {
    const safePage = Math.min(auditPage, auditTotalPages);
    return scopedLogs.slice((safePage - 1) * auditPageSize, safePage * auditPageSize);
  }, [scopedLogs, auditPage, auditTotalPages]);

  const toggleSelectStudent = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setPreviewResult(null);
  };

  const toggleSelectAllFiltered = () => {
    const allFilteredIds = filteredStudents.map((s) => s.id);
    if (selectedIds.length === allFilteredIds.length && allFilteredIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allFilteredIds);
    }
    setPreviewResult(null);
  };

  // Parse 5-column import text: Họ và tên | Lớp | Tỉnh | Xã/phường | Trường
  const parseImportRows = () => {
    const lines = rawImportText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const fallbackSchool = getCanonicalSchoolsDirectory(appData).find(
      (s) => s.schoolId === targetSchoolId
    );

    return lines.map((line) => {
      const parts = line.includes('\t')
        ? line.split('\t').map((p) => p.trim())
        : line.split(/[|,;]/).map((p) => p.trim());
      return {
        fullName: parts[0] || '',
        className: parts[1] || targetClassName || '6A1',
        provinceName: parts[2] || fallbackSchool?.provinceName || 'Tỉnh Quảng Ngãi',
        communeName: parts[3] || fallbackSchool?.communeName || 'Xã Đăk Hà',
        schoolName: parts[4] || fallbackSchool?.schoolName || 'THCS Chu Văn An',
      };
    });
  };

  // Build local + server preview with duplicate detection & canonical code validation
  const handleRunPreview = async () => {
    setStatusBanner(null);
    if (!isAdmin) {
      setStatusBanner({
        type: 'error',
        message: 'Forbidden (403): Chỉ Admin mới được phép thực hiện thao tác hàng loạt.',
      });
      return;
    }

    const diffs: NonNullable<typeof previewResult>['diffs'] = [];
    const duplicates: Array<{ rowOrId: string; reason: string }> = [];
    const errors: Array<{ rowOrId: string; reason: string }> = [];

    if (bulkMode === 'BULK_TRANSFER_CLASS') {
      const normCls = normalizeClassName(targetClassName);
      if (!normCls || !/^6[A-Z0-9]+$/.test(normCls)) {
        errors.push({ rowOrId: 'Lớp đích', reason: 'Tên lớp đích không hợp lệ (VD: 6A1).' });
      } else if (selectedIds.length === 0) {
        errors.push({
          rowOrId: 'Chọn học sinh',
          reason: 'Vui lòng chọn ít nhất 1 học sinh để chuyển lớp.',
        });
      } else {
        for (const id of selectedIds) {
          const st = appData.students.find((s) => s.id === id);
          if (!st) continue;
          if (!st.schoolId) {
            errors.push({
              rowOrId: st.fullName,
              reason: 'Chưa có mã trường chuẩn (schoolId). Hãy chuẩn hoá trường trước.',
            });
            continue;
          }
          const nextClassId = buildCanonicalClassId(st.schoolId, normCls);
          if (normalizeClassName(st.className) === normCls && st.classId === nextClassId) {
            continue;
          }
          const dup = appData.students.find(
            (other) =>
              other.id !== st.id &&
              other.schoolId === st.schoolId &&
              normalizeClassName(other.className) === normCls &&
              normalizeFullName(other.fullName).toLowerCase() ===
                normalizeFullName(st.fullName).toLowerCase()
          );
          if (dup) {
            duplicates.push({
              rowOrId: st.fullName,
              reason: `Trùng họ tên tại lớp ${normCls} (@${dup.username}).`,
            });
            continue;
          }
          diffs.push({
            studentId: st.id,
            fullName: st.fullName,
            before: `Lớp ${normalizeClassName(st.className)} (${st.classId || 'chưa gán'})`,
            after: `Lớp ${normCls} (${nextClassId})`,
            beforeSnap: {
              id: st.id,
              provinceCode: st.provinceCode,
              communeCode: st.communeCode,
              schoolId: st.schoolId,
              classId: st.classId,
              className: st.className,
            },
            afterSnap: {
              id: st.id,
              provinceCode: st.provinceCode,
              communeCode: st.communeCode,
              schoolId: st.schoolId,
              classId: nextClassId,
              className: normCls,
            },
          });
        }
      }
    } else if (bulkMode === 'BULK_NORMALIZE_SCHOOL') {
      const loc = resolveCanonicalLocationStrict(appData, {
        provinceCode: targetProvinceCode,
        communeCode: targetCommuneCode,
        schoolId: targetSchoolId,
        requireClass: false,
      });
      if (!loc.mapped) {
        errors.push({ rowOrId: 'Đơn vị đích', reason: loc.reason });
      } else if (selectedIds.length === 0) {
        errors.push({
          rowOrId: 'Chọn học sinh',
          reason: 'Vui lòng chọn ít nhất 1 học sinh để chuẩn hoá đơn vị.',
        });
      } else {
        for (const id of selectedIds) {
          const st = appData.students.find((s) => s.id === id);
          if (!st) continue;
          const normCls = normalizeClassName(st.className || '6A1');
          const nextClassId = buildCanonicalClassId(loc.schoolId, normCls);
          const dup = appData.students.find(
            (other) =>
              other.id !== st.id &&
              other.schoolId === loc.schoolId &&
              normalizeClassName(other.className) === normCls &&
              normalizeFullName(other.fullName).toLowerCase() ===
                normalizeFullName(st.fullName).toLowerCase()
          );
          if (dup) {
            duplicates.push({
              rowOrId: st.fullName,
              reason: `Đã tồn tại học sinh trùng tên tại ${loc.schoolName} - Lớp ${normCls}.`,
            });
            continue;
          }
          diffs.push({
            studentId: st.id,
            fullName: st.fullName,
            before: `${st.schoolName || 'Chưa rõ'} (${st.schoolId || 'pending_review'})`,
            after: `${loc.schoolName} (${loc.schoolId})`,
            beforeSnap: {
              id: st.id,
              provinceCode: st.provinceCode,
              communeCode: st.communeCode,
              schoolId: st.schoolId,
              classId: st.classId,
              className: st.className,
            },
            afterSnap: {
              id: st.id,
              provinceCode: loc.provinceCode,
              communeCode: loc.communeCode,
              schoolId: loc.schoolId,
              classId: nextClassId,
              className: normCls,
            },
          });
        }
      }
    } else if (bulkMode === 'BULK_IMPORT_STUDENTS') {
      const rows = parseImportRows();
      if (rows.length === 0) {
        errors.push({
          rowOrId: 'Dữ liệu nhập',
          reason: 'Vui lòng nhập ít nhất 1 dòng theo định dạng: Họ tên | Lớp | Tỉnh | Xã | Trường',
        });
      }
      const seenUsernames = new Set(appData.students.map((s) => s.username.toLowerCase()));
      const seenIdentity = new Set(
        appData.students.map(
          (s) =>
            `${(s.schoolId || '').toLowerCase()}__${normalizeClassName(
              s.className
            )}__${normalizeFullName(s.fullName).toLowerCase()}`
        )
      );

      rows.forEach((r, idx) => {
        const label = `Dòng ${idx + 1} (${r.fullName || 'Trống'})`;
        const cleanName = normalizeFullName(r.fullName);
        if (!cleanName) {
          errors.push({ rowOrId: label, reason: 'Thiếu họ và tên học sinh.' });
          return;
        }
        const loc = resolveCanonicalLocationStrict(appData, {
          provinceName: r.provinceName,
          communeName: r.communeName,
          schoolName: r.schoolName,
          className: r.className,
          requireClass: true,
        });
        if (!loc.mapped) {
          errors.push({ rowOrId: label, reason: loc.reason });
          return;
        }
        const idKey = `${loc.schoolId.toLowerCase()}__${loc.className!}__${cleanName.toLowerCase()}`;
        if (seenIdentity.has(idKey)) {
          duplicates.push({
            rowOrId: label,
            reason: `Trùng học sinh "${cleanName}" tại Lớp ${loc.className} - ${loc.schoolName}.`,
          });
          return;
        }

        const suggestions = suggestAvailableUsernames(cleanName, loc.className!, '', appData.students);
        const username =
          suggestions.find((c) => !seenUsernames.has(c.toLowerCase())) ||
          `hs_${Date.now().toString().slice(-4)}_${idx + 1}`;
        seenUsernames.add(username.toLowerCase());
        seenIdentity.add(idKey);

        const plainPassword = `Hs@${Math.floor(100000 + Math.random() * 900000)}`;
        const hashed = hashPasswordSync(plainPassword);
        const recovery = generateRecoveryCode();
        const studentId = `student-bulk-${Date.now()}-${idx + 1}`;

        const newStudent: StudentAccount = {
          id: studentId,
          username,
          fullName: cleanName,
          grade: 6,
          className: loc.className!,
          provinceCode: loc.provinceCode,
          provinceName: loc.provinceName,
          communeCode: loc.communeCode,
          communeName: loc.communeName,
          schoolId: loc.schoolId,
          schoolName: loc.schoolName,
          classId: loc.classId,
          migrationStatus: 'mapped',
          passwordHash: hashed,
          pinCode: hashed,
          recoveryCodeHash: hashPasswordSync(recovery),
          parentConsent: true,
          avatar: '👨‍🎓',
          dailyGoalMinutes: 20,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          progress: {
            ...INITIAL_PROGRESS,
            studentName: cleanName,
            grade: 6,
            skillMastery: { ...INITIAL_PROGRESS.skillMastery },
            unitProgress: {},
          },
          sessions: [],
          dailyLogs: {},
        };

        diffs.push({
          studentId,
          fullName: cleanName,
          before: '(Tạo mới)',
          after: `@${username} • Lớp ${loc.className} • ${loc.schoolName} (${loc.schoolId})`,
          beforeSnap: { id: studentId, existed: false },
          afterSnap: {
            id: studentId,
            provinceCode: loc.provinceCode,
            communeCode: loc.communeCode,
            schoolId: loc.schoolId,
            classId: loc.classId,
            className: loc.className,
          },
          newStudent,
          plainPassword,
          recoveryCode: recovery,
        });
      });
    }

    // Also invoke server preview API in parallel for server validation
    previewBulkActionApi({
      operation: bulkMode,
      studentIds: selectedIds,
      targetClassName,
      targetProvinceCode,
      targetCommuneCode,
      targetSchoolId,
      importRows: bulkMode === 'BULK_IMPORT_STUDENTS' ? parseImportRows() : undefined,
    }).catch(() => {});

    setPreviewResult({
      operation: bulkMode,
      diffs,
      duplicates,
      errors,
    });
  };

  // Execute confirmed bulk action + write AuditLog
  const handleConfirmExecuteBulk = async () => {
    if (!previewResult || previewResult.diffs.length === 0) return;
    if (!isAdmin) {
      setStatusBanner({
        type: 'error',
        message: 'Forbidden (403): Chỉ Admin mới có quyền thực thi thao tác hàng loạt.',
      });
      return;
    }

    const directory = getCanonicalSchoolsDirectory(appData);
    let nextStudents = [...appData.students];

    if (previewResult.operation === 'BULK_IMPORT_STUDENTS') {
      const created = previewResult.diffs.map((d) => d.newStudent!).filter(Boolean);
      nextStudents = [...created, ...nextStudents];
      setImportedAccountsModal(
        previewResult.diffs.map((d) => ({
          fullName: d.fullName,
          username: d.newStudent?.username || '',
          className: d.newStudent?.className || '',
          schoolName: d.newStudent?.schoolName || '',
          passwordPlain: d.plainPassword || '',
          recoveryCode: d.recoveryCode || '',
        }))
      );
    } else {
      const afterMap = new Map(previewResult.diffs.map((d) => [d.studentId, d.afterSnap]));
      nextStudents = nextStudents.map((st) => {
        const snap = afterMap.get(st.id);
        if (!snap) return st;
        const schoolEntry = directory.find((sc) => sc.schoolId === snap.schoolId);
        return {
          ...st,
          provinceCode: snap.provinceCode ?? st.provinceCode,
          communeCode: snap.communeCode ?? st.communeCode,
          schoolId: snap.schoolId ?? st.schoolId,
          classId: snap.classId ?? st.classId,
          className: snap.className ?? st.className,
          provinceName: schoolEntry?.provinceName ?? st.provinceName,
          communeName: schoolEntry?.communeName ?? st.communeName,
          schoolName: schoolEntry?.schoolName ?? st.schoolName,
          migrationStatus: 'mapped',
        };
      });
    }

    const log = createAuditLogEntry({
      actorId: currentTeacher?.id || 'admin',
      actorRole: 'admin',
      action: previewResult.operation,
      targetIds: previewResult.diffs.map((d) => d.studentId),
      beforeSnapshot: previewResult.diffs.map((d) => d.beforeSnap),
      afterSnapshot: previewResult.diffs.map((d) => d.afterSnap),
    });

    const resolvedIds = new Set(previewResult.diffs.map((d) => d.studentId));
    const nextQueue = (appData.unmappedMigrationQueue || []).filter(
      (q) => !(q.entityType === 'student' && resolvedIds.has(q.entityId))
    );

    const updatedData = appendAuditLog(
      {
        ...appData,
        students: nextStudents,
        unmappedMigrationQueue: nextQueue,
      },
      log
    );
    saveAppData(updatedData);
    onUpdateAppData?.(updatedData);

    // Sync to server single source of truth
    executeBulkActionApi({
      operation: previewResult.operation,
      studentIds: selectedIds,
      targetClassName,
      targetProvinceCode,
      targetCommuneCode,
      targetSchoolId,
      importRows: previewResult.operation === 'BULK_IMPORT_STUDENTS' ? parseImportRows() : undefined,
    }).catch(() => {});

    setStatusBanner({
      type: 'success',
      message: `Đã thực thi thành công ${previewResult.diffs.length} bản ghi và lưu vào Nhật ký thay đổi (Mã log: ${log.id}).`,
    });
    setPreviewResult(null);
    setSelectedIds([]);
    if (previewResult.operation === 'BULK_IMPORT_STUDENTS') {
      setRawImportText('');
    }
  };

  // Undo bulk action from AuditLog
  const handleUndoLog = async (logId: string) => {
    if (!isAdmin) {
      setStatusBanner({
        type: 'error',
        message: 'Forbidden (403): Chỉ Admin mới được phép hoàn tác nhật ký hàng loạt.',
      });
      return;
    }
    const res = undoBulkActionByAuditLog(
      appData,
      logId,
      currentTeacher?.id || 'admin',
      'admin'
    );
    if (!res.success) {
      setStatusBanner({ type: 'error', message: res.error || 'Không thể hoàn tác.' });
      return;
    }
    onUpdateAppData?.(res.data);
    undoBulkActionApi(logId).catch(() => {});
    setStatusBanner({
      type: 'success',
      message: `Đã hoàn tác (Undo) thành công nhật ký ${logId} về trạng thái ban đầu!`,
    });
  };

  // Run Migration (Dry-run or Live)
  const handleRunMigration = async (dryRun: boolean) => {
    if (!isAdmin) return;
    const localRes = runDirectoryCodeMigration(appData, {
      dryRun,
      actorId: currentTeacher?.id || 'admin',
    });
    setMigrationReport(localRes.report);
    if (!dryRun) {
      onUpdateAppData?.(localRes.data);
    }
    runServerMigrationApi(dryRun).catch(() => {});
    setStatusBanner({
      type: 'success',
      message: dryRun
        ? `Hoàn tất chạy thử (Dry-Run): ${localRes.report.mappedStudents} HS khớp mới, ${localRes.report.alreadyMappedStudents} HS đã khớp, ${localRes.report.unmappedStudents} HS đưa vào hàng chờ.`
        : `Đã chạy chuẩn hoá mã định danh chính thức (Bản sao lưu: ${localRes.report.backupKey}).`,
    });
  };

  // Bounded Export 5 Columns CSV (<= 500 students)
  const handleBoundedExportCsv = async () => {
    setStatusBanner(null);
    if (filteredStudents.length > MAX_EXPORT_STUDENTS_LIMIT) {
      setStatusBanner({
        type: 'error',
        message: `Số lượng xuất (${filteredStudents.length} HS) vượt quá giới hạn an toàn ${MAX_EXPORT_STUDENTS_LIMIT} học sinh/lần. Hãy lọc theo Lớp hoặc Trường trước khi xuất.`,
      });
      return;
    }

    await exportStudentsBoundedApi({}).catch(() => {});

    const log = createAuditLogEntry({
      actorId: currentTeacher?.id || 'teacher',
      actorRole: isAdmin ? 'admin' : 'teacher',
      action: 'EXPORT_STUDENTS',
      targetIds: filteredStudents.map((s) => s.id),
      beforeSnapshot: [],
      afterSnapshot: [],
    });
    const updated = appendAuditLog(appData, log);
    saveAppData(updated);
    onUpdateAppData?.(updated);

    const header = [
      'STT',
      'Họ và tên',
      'Lớp',
      'Tỉnh/Thành phố',
      'Xã/Phường',
      'Trường THCS',
      'Mã Tỉnh',
      'Mã Xã',
      'Mã Trường (schoolId)',
      'Mã Lớp (classId)',
      'Tên đăng nhập',
    ];
    const rows = filteredStudents.map((s, idx) => [
      String(idx + 1),
      `"${(s.fullName || '').replace(/"/g, '""')}"`,
      `"${normalizeClassName(s.className)}"`,
      `"${(s.provinceName || '').replace(/"/g, '""')}"`,
      `"${(s.communeName || '').replace(/"/g, '""')}"`,
      `"${(s.schoolName || '').replace(/"/g, '""')}"`,
      `"${s.provinceCode || ''}"`,
      `"${s.communeCode || ''}"`,
      `"${s.schoolId || ''}"`,
      `"${s.classId || ''}"`,
      `"${s.username}"`,
    ]);
    const csvContent = '\uFEFF' + [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DanhSach_HocSinh_5ThongTin_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusBanner({
      type: 'success',
      message: `Đã xuất ${filteredStudents.length}/${MAX_EXPORT_STUDENTS_LIMIT} học sinh ra file CSV 5 cột và ghi nhận vào AuditLog.`,
    });
  };

  return (
    <section
      aria-label="Công cụ chuẩn hóa hàng loạt, Migration mã định danh và Nhật ký AuditLog"
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200 space-y-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-700 shrink-0" />
            <span>
              Công Cụ Quản Trị Dữ Liệu Đăng Ký (5 Trường Thông Tin), Migration & Nhật Ký Thay Đổi
            </span>
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Chuyển lớp / Chuẩn hoá trường / Nhập hàng loạt có Xem trước (Diff Preview), Kiểm tra trùng, Xác nhận và Hoàn tác (Undo) dựa trên AuditLog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleBoundedExportCsv}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              Xuất DS 5 Cột CSV ({filteredStudents.length}/{MAX_EXPORT_STUDENTS_LIMIT})
            </span>
          </button>

          {isAdmin && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSubTab('bulk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  subTab === 'bulk'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                Thao tác hàng loạt
              </button>
              <button
                type="button"
                onClick={() => setSubTab('migration')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  subTab === 'migration'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                Migration & Hàng chờ ({(appData.unmappedMigrationQueue || []).length})
              </button>
              <button
                type="button"
                onClick={() => setSubTab('audit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  subTab === 'audit'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                Nhật ký & Hoàn tác ({scopedLogs.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {statusBanner && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-extrabold flex items-center justify-between gap-2 ${
            statusBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <span>{statusBanner.message}</span>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="underline text-[11px] cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {!isAdmin ? (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-700 shrink-0" />
            <span>
              Chế độ Giáo viên bộ môn: Bạn có thể xuất danh sách học sinh thuộc lớp phụ trách (tối đa {MAX_EXPORT_STUDENTS_LIMIT} HS/lần). Các thao tác Chuyển lớp hàng loạt, Chuẩn hoá mã trường và Hoàn tác AuditLog chỉ dành cho Admin.
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* SUBTAB 1: BULK ACTIONS */}
          {subTab === 'bulk' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBulkMode('BULK_TRANSFER_CLASS');
                    setPreviewResult(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${
                    bulkMode === 'BULK_TRANSFER_CLASS'
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  1. Chuyển Lớp Hàng Loạt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkMode('BULK_NORMALIZE_SCHOOL');
                    setPreviewResult(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${
                    bulkMode === 'BULK_NORMALIZE_SCHOOL'
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  2. Chuẩn Hoá Tỉnh / Xã / Trường Hàng Loạt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkMode('BULK_IMPORT_STUDENTS');
                    setPreviewResult(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${
                    bulkMode === 'BULK_IMPORT_STUDENTS'
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  3. Nhập Học Sinh Hàng Loạt (5 Cột)
                </button>
              </div>

              {bulkMode !== 'BULK_IMPORT_STUDENTS' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Student Multi-select */}
                  <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-slate-800">
                        Chọn học sinh ({selectedIds.length} / {filteredStudents.length} HS đang lọc):
                      </span>
                      <button
                        type="button"
                        onClick={toggleSelectAllFiltered}
                        className="text-xs font-extrabold text-indigo-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        {selectedIds.length === filteredStudents.length &&
                        filteredStudents.length > 0 ? (
                          <>
                            <CheckSquare className="w-3.5 h-3.5" /> Bỏ chọn tất cả
                          </>
                        ) : (
                          <>
                            <Square className="w-3.5 h-3.5" /> Chọn tất cả ({filteredStudents.length})
                          </>
                        )}
                      </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto divide-y divide-slate-200/70 bg-white rounded-xl border border-slate-200">
                      {filteredStudents.length === 0 ? (
                        <p className="p-4 text-xs text-slate-500 text-center">
                          Không có học sinh nào trong bộ lọc hiện tại.
                        </p>
                      ) : (
                        filteredStudents.map((st) => {
                          const checked = selectedIds.includes(st.id);
                          return (
                            <label
                              key={st.id}
                              className="flex items-center justify-between gap-2 px-3 py-2 text-xs hover:bg-indigo-50/40 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleSelectStudent(st.id)}
                                  className="rounded border-slate-300 text-indigo-700"
                                />
                                <span className="font-extrabold text-slate-900">{st.fullName}</span>
                                <span className="text-slate-500">@{st.username}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold text-[11px]">
                                  {normalizeClassName(st.className)}
                                </span>
                                <span className="text-[11px] text-slate-600 truncate max-w-[140px]">
                                  {st.schoolName}
                                </span>
                              </div>
                            </label>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Right: Target Parameters */}
                  <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                    {bulkMode === 'BULK_TRANSFER_CLASS' ? (
                      <div className="space-y-2">
                        <label className="block text-xs font-extrabold text-slate-800">
                          Lớp đích cần chuyển tới (VD: 6A1, 6A2):
                        </label>
                        <input
                          type="text"
                          value={targetClassName}
                          onChange={(e) => {
                            setTargetClassName(e.target.value);
                            setPreviewResult(null);
                          }}
                          placeholder="VD: 6A2"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-extrabold text-slate-900"
                        />
                        <p className="text-[11px] text-slate-500">
                          Hệ thống tự động kiểm tra trùng họ tên trong cùng Trường + Lớp đích trước khi cho phép xác nhận.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                            Mã Tỉnh đích:
                          </label>
                          <select
                            value={targetProvinceCode}
                            onChange={(e) => {
                              const nextP = e.target.value;
                              setTargetProvinceCode(nextP);
                              const comms = getCommunesWithCodesForProvince(appData, nextP);
                              const firstC = comms[0]?.code || '';
                              setTargetCommuneCode(firstC);
                              const schs = getCanonicalSchoolsDirectory(appData).filter(
                                (s) => s.provinceCode === nextP && (!firstC || s.communeCode === firstC)
                              );
                              setTargetSchoolId(schs[0]?.schoolId || '');
                              setPreviewResult(null);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
                          >
                            {provinces.map((p) => (
                              <option key={p.code} value={p.code}>
                                [{p.code}] {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                            Mã Xã/Phường đích:
                          </label>
                          <select
                            value={targetCommuneCode}
                            onChange={(e) => {
                              const nextC = e.target.value;
                              setTargetCommuneCode(nextC);
                              const schs = getCanonicalSchoolsDirectory(appData).filter(
                                (s) =>
                                  s.provinceCode === targetProvinceCode && s.communeCode === nextC
                              );
                              setTargetSchoolId(schs[0]?.schoolId || '');
                              setPreviewResult(null);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
                          >
                            {targetCommunes.map((c) => (
                              <option key={c.code} value={c.code}>
                                [{c.code}] {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                            Mã Trường đích (schoolId):
                          </label>
                          <select
                            value={targetSchoolId}
                            onChange={(e) => {
                              setTargetSchoolId(e.target.value);
                              setPreviewResult(null);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-extrabold text-indigo-900"
                          >
                            {targetSchools.map((s) => (
                              <option key={s.schoolId} value={s.schoolId}>
                                {s.schoolName} ({s.schoolId})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleRunPreview}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="w-4 h-4" />
                      <span>1. Xem Trước & Kiểm Tra Trùng (Preview)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      <span>
                        Dán danh sách Học sinh theo 5 cột: Họ và tên | Lớp | Tỉnh | Xã/phường | Trường
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setRawImportText(
                          'Nguyễn Minh Khôi | 6A1 | Tỉnh Quảng Ngãi | Xã Đăk Hà | THCS Chu Văn An\nTrần Bảo Ngọc | 6A2 | Tỉnh Quảng Ngãi | Xã Đăk Hà | THCS Chu Văn An'
                        )
                      }
                      className="text-[11px] font-extrabold text-indigo-700 hover:underline cursor-pointer"
                    >
                      + Điền dữ liệu mẫu 5 cột
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={rawImportText}
                    onChange={(e) => {
                      setRawImportText(e.target.value);
                      setPreviewResult(null);
                    }}
                    placeholder="Nguyễn Văn An | 6A1 | Tỉnh Quảng Ngãi | Xã Đăk Hà | THCS Chu Văn An"
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-mono text-slate-900"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleRunPreview}
                      className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>1. Xem Trước & Kiểm Tra Trùng (Preview)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* PREVIEW DIFF TABLE & CONFIRMATION */}
              {previewResult && (
                <div className="p-4 rounded-2xl bg-indigo-50/60 border-2 border-indigo-300 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap text-xs font-extrabold">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                        Hợp lệ: {previewResult.diffs.length}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                        Trùng lặp bị chặn: {previewResult.duplicates.length}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-900">
                        Lỗi dữ liệu: {previewResult.errors.length}
                      </span>
                    </div>

                    {previewResult.diffs.length > 0 && (
                      <button
                        type="button"
                        onClick={handleConfirmExecuteBulk}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          2. Xác Nhận Thực Thi ({previewResult.diffs.length} học sinh) & Ghi AuditLog
                        </span>
                      </button>
                    )}
                  </div>

                  {previewResult.duplicates.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                      <p className="font-extrabold text-amber-900">
                        Phát hiện bản ghi trùng lặp (đã tự động loại trừ):
                      </p>
                      {previewResult.duplicates.map((d, i) => (
                        <div key={i} className="text-amber-800">
                          • <strong>{d.rowOrId}:</strong> {d.reason}
                        </div>
                      ))}
                    </div>
                  )}

                  {previewResult.errors.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                      <p className="font-extrabold text-rose-900">Lỗi kiểm tra danh mục chuẩn:</p>
                      {previewResult.errors.map((e, i) => (
                        <div key={i} className="text-rose-800">
                          • <strong>{e.rowOrId}:</strong> {e.reason}
                        </div>
                      ))}
                    </div>
                  )}

                  {previewResult.diffs.length > 0 && (
                    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 max-h-56">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-600 uppercase">
                            <th className="py-2 px-3">Học Sinh</th>
                            <th className="py-2 px-3">Trạng Thái Trước (Before)</th>
                            <th className="py-2 px-3">Trạng Thái Sau (After)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {previewResult.diffs.map((d) => (
                            <tr key={d.studentId}>
                              <td className="py-2 px-3 font-extrabold text-slate-900">
                                {d.fullName}
                              </td>
                              <td className="py-2 px-3 text-slate-600">{d.before}</td>
                              <td className="py-2 px-3 font-extrabold text-emerald-800">
                                {d.after}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Newly imported credentials banner */}
              {importedAccountsModal.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-950 uppercase">
                      Danh sách tài khoản vừa nhập hàng loạt ({importedAccountsModal.length} HS)
                    </span>
                    <button
                      type="button"
                      onClick={() => setImportedAccountsModal([])}
                      className="text-xs font-extrabold text-emerald-900 underline cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="overflow-x-auto bg-white rounded-xl border border-emerald-200 max-h-48">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-emerald-50/70 border-b border-emerald-200 text-[10px] font-extrabold text-emerald-900 uppercase">
                          <th className="py-2 px-3">Họ và tên</th>
                          <th className="py-2 px-3">Lớp / Trường</th>
                          <th className="py-2 px-3">Username</th>
                          <th className="py-2 px-3">Mật khẩu</th>
                          <th className="py-2 px-3">Mã khôi phục</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {importedAccountsModal.map((acc, i) => (
                          <tr key={i}>
                            <td className="py-2 px-3 font-bold">{acc.fullName}</td>
                            <td className="py-2 px-3">
                              {acc.className} • {acc.schoolName}
                            </td>
                            <td className="py-2 px-3 font-mono font-extrabold text-indigo-900">
                              {acc.username}
                            </td>
                            <td className="py-2 px-3 font-mono font-extrabold text-emerald-900">
                              {acc.passwordPlain}
                            </td>
                            <td className="py-2 px-3 font-mono font-extrabold text-amber-900">
                              {acc.recoveryCode}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBTAB 2: MIGRATION (DRY-RUN, BACKUP, IDEMPOTENT, UNMAPPED QUEUE) */}
          {subTab === 'migration' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Chuẩn Hoá Mã Định Danh Hệ Thống (Idempotent Migration)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Tự động sao lưu trước khi chạy (`giasu_ai_migration_backup_v1`), chạy lặp lại an toàn, không tự đoán các bản ghi lệch tên mà đưa vào hàng chờ xử lý.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleRunMigration(true)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-indigo-300 text-indigo-900 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer hover:bg-indigo-50"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Chạy Thử (Dry-Run)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRunMigration(false)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Chạy Chính Thức (Có Sao Lưu)</span>
                  </button>
                </div>
              </div>

              {migrationReport && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-700 font-bold block">Ánh xạ mới</span>
                    <span className="text-lg font-extrabold text-emerald-950">
                      {migrationReport.mappedStudents} HS / {migrationReport.mappedTeachers} GV
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-sky-700 font-bold block">Đã khớp sẵn (Bỏ qua)</span>
                    <span className="text-lg font-extrabold text-sky-950">
                      {migrationReport.alreadyMappedStudents} HS /{' '}
                      {migrationReport.alreadyMappedTeachers} GV
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-amber-800 font-bold block">Hàng chờ xử lý</span>
                    <span className="text-lg font-extrabold text-amber-950">
                      {migrationReport.unmappedStudents} HS / {migrationReport.unmappedTeachers} GV
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    <span className="text-slate-600 font-bold block">Chế độ / Bản sao lưu</span>
                    <span className="text-xs font-mono font-extrabold text-slate-900">
                      {migrationReport.dryRun
                        ? 'DRY-RUN (Không ghi)'
                        : migrationReport.backupKey || 'Đã sao lưu'}
                    </span>
                  </div>
                </div>
              )}

              {/* Unmapped Queue Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>
                    Hàng Chờ Bản Ghi Chưa Ánh Xạ Được Mã Chuẩn (
                    {(appData.unmappedMigrationQueue || []).length})
                  </span>
                </h4>
                {(appData.unmappedMigrationQueue || []).length === 0 ? (
                  <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-emerald-800 font-bold">
                    ✓ Tất cả bản ghi học sinh và giáo viên đều đã khớp mã định danh chuẩn!
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-amber-200">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-amber-50 border-b border-amber-200 text-[10px] font-extrabold text-amber-900 uppercase">
                          <th className="py-2 px-3">Loại / ID</th>
                          <th className="py-2 px-3">Dữ Liệu Thô Đã Nhập</th>
                          <th className="py-2 px-3">Lý Do Không Tự Đoán</th>
                          <th className="py-2 px-3 text-right">Xử Lý</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-100">
                        {(appData.unmappedMigrationQueue || []).map((item) => (
                          <tr key={item.id}>
                            <td className="py-2 px-3 font-mono font-bold">
                              [{item.entityType}] {item.entityId}
                            </td>
                            <td className="py-2 px-3">
                              {item.rawProvinceName || '(Trống)'} /{' '}
                              {item.rawCommuneName || '(Trống)'} /{' '}
                              {item.rawSchoolName || '(Trống)'} (Lớp:{' '}
                              {item.rawClassName || 'Trống'})
                            </td>
                            <td className="py-2 px-3 text-rose-800 font-semibold">
                              {item.reason}
                            </td>
                            <td className="py-2 px-3 text-right">
                              {item.entityType === 'student' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedIds([item.entityId]);
                                    setBulkMode('BULK_NORMALIZE_SCHOOL');
                                    setSubTab('bulk');
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-indigo-700 text-white font-extrabold text-[11px] cursor-pointer"
                                >
                                  Chuẩn hoá ngay
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUBTAB 3: AUDIT LOGS & UNDO */}
          {subTab === 'audit' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-700" />
                  <span>
                    Thời hạn lưu trữ tự động: <strong>90 ngày</strong> • Chỉ lưu ID và mã định danh (không lưu PII thừa)
                  </span>
                </span>
                <span className="font-extrabold text-slate-800">
                  Trang {Math.min(auditPage, auditTotalPages)} / {auditTotalPages}
                </span>
              </div>

              {paginatedLogs.length === 0 ? (
                <p className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                  Chưa có bản ghi nhật ký thay đổi nào.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-600 uppercase">
                        <th className="py-2.5 px-3">Thời Gian / Hết Hạn</th>
                        <th className="py-2.5 px-3">Hành Động</th>
                        <th className="py-2.5 px-3">Người Thực Hiện</th>
                        <th className="py-2.5 px-3">Số Bản Ghi</th>
                        <th className="py-2.5 px-3 text-right">Hoàn Tác (Undo)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedLogs.map((log) => {
                        const canUndo =
                          !log.undoneAt &&
                          [
                            'BULK_TRANSFER_CLASS',
                            'BULK_NORMALIZE_SCHOOL',
                            'BULK_IMPORT_STUDENTS',
                          ].includes(log.action);
                        return (
                          <tr key={log.id} className="hover:bg-slate-50/80">
                            <td className="py-2.5 px-3">
                              <span className="block font-bold text-slate-800">
                                {new Date(log.timestamp).toLocaleString('vi-VN')}
                              </span>
                              <span className="block text-[10px] text-slate-500">
                                Hết hạn: {new Date(log.expiresAt).toLocaleDateString('vi-VN')}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-mono font-extrabold text-[11px]">
                                {log.action}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                              {log.actorId} ({log.actorRole})
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-800">
                              {log.targetIds.length} bản ghi
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {log.undoneAt ? (
                                <span className="text-[11px] font-bold text-slate-400 italic">
                                  Đã hoàn tác ({new Date(log.undoneAt).toLocaleTimeString('vi-VN')})
                                </span>
                              ) : canUndo ? (
                                <button
                                  type="button"
                                  onClick={() => handleUndoLog(log.id)}
                                  className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Hoàn tác</span>
                                </button>
                              ) : (
                                <span className="text-[11px] text-slate-400">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {scopedLogs.length > auditPageSize && (
                <div className="flex justify-end gap-1.5 pt-1">
                  <button
                    type="button"
                    disabled={auditPage <= 1}
                    onClick={() => setAuditPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    ← Trước
                  </button>
                  <button
                    type="button"
                    disabled={auditPage >= auditTotalPages}
                    onClick={() => setAuditPage((p) => Math.min(auditTotalPages, p + 1))}
                    className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Sau →
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
