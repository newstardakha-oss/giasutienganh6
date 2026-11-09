import JSZip from 'jszip';
import FileSaver from 'file-saver';
const saveAs = FileSaver.saveAs ?? FileSaver;
import {
  ATTEMPT_SKILL_LABELS,
  AnalyticsReportFilter,
  TeacherAnalyticsReportResult,
} from './firebaseAnalytics';

/**
 * Trình tạo file Excel (.xlsx – OpenXML) gọn nhẹ, không cần thư viện xlsx/exceljs.
 * Dùng JSZip để đóng gói các phần XML của workbook.
 */

export interface ExcelFormulaCell {
  formula: string;
  value?: string | number | boolean | null;
}

export type CellValue = string | number | boolean | ExcelFormulaCell | null | undefined;

export interface SheetDef {
  name: string;
  rows: CellValue[][];
  /** Chỉ số các dòng tiêu đề (in đậm, nền xám) */
  headerRows?: number[];
  colWidths?: number[];
}

function isFormulaCell(val: CellValue): val is ExcelFormulaCell {
  return Boolean(val && typeof val === 'object' && 'formula' in val);
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    // Loại bỏ ký tự điều khiển không hợp lệ trong XML
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

function columnLetter(index: number): string {
  let n = index + 1;
  let s = '';
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function sanitizeSheetName(name: string): string {
  return name.replace(/[\\/?*[\]:]/g, ' ').slice(0, 31);
}

function buildSheetXml(sheet: SheetDef): string {
  const headerSet = new Set(sheet.headerRows ?? [0]);
  const rowsXml = sheet.rows
    .map((row, rIdx) => {
      const rowNum = rIdx + 1;
      const styleAttr = headerSet.has(rIdx) ? ' s="1"' : '';
      const cells = row
        .map((value, cIdx) => {
          if (value === null || value === undefined || value === '') return '';
          const ref = `${columnLetter(cIdx)}${rowNum}`;
          if (isFormulaCell(value)) {
            const cleanFormula = value.formula.replace(/^=/, '');
            const cachedVal =
              typeof value.value === 'number' && Number.isFinite(value.value)
                ? `<v>${value.value}</v>`
                : '';
            return `<c r="${ref}"${styleAttr}><f>${escapeXml(cleanFormula)}</f>${cachedVal}</c>`;
          }
          if (typeof value === 'number' && Number.isFinite(value)) {
            return `<c r="${ref}"${styleAttr}><v>${value}</v></c>`;
          }
          if (typeof value === 'boolean') {
            return `<c r="${ref}" t="b"${styleAttr}><v>${value ? 1 : 0}</v></c>`;
          }
          return `<c r="${ref}" t="inlineStr"${styleAttr}><is><t xml:space="preserve">${escapeXml(
            String(value)
          )}</t></is></c>`;
        })
        .join('');
      return `<row r="${rowNum}">${cells}</row>`;
    })
    .join('');

  const maxCols = sheet.rows.reduce((m, r) => Math.max(m, r.length), 0);
  const cols =
    maxCols > 0
      ? `<cols>${Array.from({ length: maxCols })
          .map((_, i) => {
            const w = sheet.colWidths?.[i] ?? 18;
            return `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`;
          })
          .join('')}</cols>`
      : '';

  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    cols +
    `<sheetData>${rowsXml}</sheetData>` +
    '</worksheet>'
  );
}

const STYLES_XML =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
  '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
  '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
  '<fill><patternFill patternType="solid"><fgColor rgb="FFE0E7FF"/><bgColor indexed="64"/></patternFill></fill></fills>' +
  '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
  '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
  '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
  '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs>' +
  '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
  '</styleSheet>';

/**
 * Đóng gói danh sách sheet thành Blob .xlsx hợp lệ.
 */
export async function buildXlsxBlob(sheets: SheetDef[]): Promise<Blob> {
  const zip = new JSZip();
  const names = sheets.map((s) => sanitizeSheetName(s.name));

  zip.file(
    '[Content_Types].xml',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      names
        .map(
          (_, i) =>
            `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
        )
        .join('') +
      '</Types>'
  );

  zip.file(
    '_rels/.rels',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      '</Relationships>'
  );

  zip.file(
    'xl/workbook.xml',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<sheets>' +
      names
        .map((n, i) => `<sheet name="${escapeXml(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`)
        .join('') +
      '</sheets></workbook>'
  );

  zip.file(
    'xl/_rels/workbook.xml.rels',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      names
        .map(
          (_, i) =>
            `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`
        )
        .join('') +
      `<Relationship Id="rId${names.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
      '</Relationships>'
  );

  zip.file('xl/styles.xml', STYLES_XML);

  sheets.forEach((sheet, i) => {
    zip.file(`xl/worksheets/sheet${i + 1}.xml`, buildSheetXml(sheet));
  });

  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

function formatDateTimeVi(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('vi-VN', { hour12: false });
}

const DATE_RANGE_LABELS: Record<AnalyticsReportFilter['dateRange'], string> = {
  '7d': '7 ngày qua',
  '30d': '30 ngày qua',
  '90d': '90 ngày qua (học kỳ)',
  all: 'Tất cả',
  custom: 'Tuỳ chọn',
};

export interface ExportTeacherReportParams {
  report: TeacherAnalyticsReportResult;
  filter: AnalyticsReportFilter;
  anonymize: boolean;
  schoolLabel: string;
  teacherName?: string;
  fileName?: string;
}

/**
 * Tạo các sheet của Báo cáo giáo viên (tách riêng để có thể kiểm thử ngoài trình duyệt).
 * 5 sheet: Tổng quan, Theo lớp, Theo học sinh, Theo điểm ngữ pháp, Dữ liệu thô.
 * Khi `anonymize = true`, họ tên được thay bằng mã HS01, HS02... và mã studentId cũng được ẩn.
 */
export function buildTeacherReportSheets(params: ExportTeacherReportParams): SheetDef[] {
  const { report, filter, anonymize, schoolLabel, teacherName } = params;

  const codeByStudent = new Map<string, string>();
  const nameByStudent = new Map<string, string>();
  for (const row of report.studentRows) {
    codeByStudent.set(row.studentId, row.anonymousCode);
    nameByStudent.set(row.studentId, row.fullName);
  }
  const displayName = (studentId: string) =>
    anonymize
      ? codeByStudent.get(studentId) || 'HS??'
      : nameByStudent.get(studentId) || codeByStudent.get(studentId) || studentId;
  const displayId = (studentId: string) =>
    anonymize ? codeByStudent.get(studentId) || 'HS??' : studentId;

  const timeRangeLabel =
    filter.dateRange === 'custom'
      ? `${filter.customFromDate || '...'} → ${filter.customToDate || '...'}`
      : DATE_RANGE_LABELS[filter.dateRange];

  // ===== Sheet 1: Tổng quan =====
  const overviewRows: CellValue[][] = [
    ['BÁO CÁO HỌC TẬP – GIA SƯ AI TIẾNG ANH 6', ''],
    ['Ngày xuất', formatDateTimeVi(new Date().toISOString())],
    ['Giáo viên', teacherName || ''],
    ['Trường', schoolLabel],
    ['Lớp', filter.className === 'all' ? 'Tất cả' : filter.className],
    ['Unit', filter.unitId === 'all' ? 'Tất cả' : filter.unitId.replace('unit-', 'Unit ')],
    ['Kỹ năng', filter.skill === 'all' ? 'Tất cả' : ATTEMPT_SKILL_LABELS[filter.skill]],
    ['Khoảng thời gian', timeRangeLabel],
    ['Ẩn danh', anonymize ? 'Có (HS01, HS02...)' : 'Không'],
    [],
    ['Chỉ số', 'Giá trị'],
    ['Số học sinh hoạt động', report.overview.activeStudentsCount],
    ['Tổng số học sinh trong phạm vi', report.overview.totalStudentsInScope],
    ['Tổng giờ học', report.overview.totalStudyHours],
    ['Tổng số phút học', report.overview.totalStudyMinutes],
    ['Tổng số câu/bài đã nộp', report.overview.totalAttempts],
    ['Số câu đúng', report.overview.totalCorrect],
    ['Tỉ lệ đúng trung bình (%)', report.overview.avgAccuracyPct],
    [],
    ['Tuần', 'Số phút học', 'Số câu/bài', 'Số HS hoạt động'],
    ...report.weeklyStudyChart.map((w) => [
      w.weekLabel,
      w.studyMinutes,
      w.attemptCount,
      w.activeStudents,
    ]),
    [],
    ['Unit', 'Số câu/bài', 'Số câu đúng', 'Tỉ lệ đúng (%)', 'Số phút học'],
    ...report.unitAccuracyChart.map((u) => [
      u.unitTitle,
      u.attemptCount,
      u.correctCount,
      u.attemptCount > 0 ? u.accuracyPct : '',
      u.studyMinutes,
    ]),
  ];
  const weeklyHeaderIdx = 19;
  const unitHeaderIdx = weeklyHeaderIdx + report.weeklyStudyChart.length + 2;

  // ===== Sheet 2: Theo lớp =====
  const classRows: CellValue[][] = [
    [
      'Lớp',
      'Trường',
      'Sĩ số',
      'Số HS hoạt động',
      'Tổng giờ học',
      'Số phút học',
      'Số câu/bài',
      'Số câu đúng',
      'Tỉ lệ đúng TB (%)',
    ],
    ...report.classRows.map((c) => [
      c.className,
      c.schoolName,
      c.totalStudents,
      c.activeStudents,
      c.studyHours,
      c.studyMinutes,
      c.attemptCount,
      c.correctCount,
      c.accuracyPct,
    ]),
  ];

  // ===== Sheet 3: Theo học sinh =====
  const studentRows: CellValue[][] = [
    [
      'Mã HS',
      'Họ và tên',
      'Lớp',
      'Trường',
      'Thời gian học (phút)',
      'Số câu/bài',
      'Số câu đúng',
      'Tỉ lệ đúng (%)',
      'Ngữ pháp (%)',
      'Từ vựng (%)',
      'Phát âm (%)',
      'Đọc hiểu (%)',
      'Viết (%)',
      'Trò chơi (%)',
      'Lần học gần nhất',
    ],
    ...report.studentRows.map((r) => [
      r.anonymousCode,
      anonymize ? r.anonymousCode : r.fullName,
      r.className,
      r.schoolName,
      r.studyMinutes,
      r.attemptCount,
      r.correctCount,
      r.accuracyPct,
      r.bySkill.grammar.attempts ? r.bySkill.grammar.accuracyPct : '',
      r.bySkill.vocab.attempts ? r.bySkill.vocab.accuracyPct : '',
      r.bySkill.pronunciation.attempts ? r.bySkill.pronunciation.accuracyPct : '',
      r.bySkill.reading.attempts ? r.bySkill.reading.accuracyPct : '',
      r.bySkill.writing.attempts ? r.bySkill.writing.accuracyPct : '',
      r.bySkill.game.attempts ? r.bySkill.game.accuracyPct : '',
      r.lastStudiedAt ? formatDateTimeVi(r.lastStudiedAt) : 'Chưa học',
    ]),
  ];

  // ===== Sheet 4: Theo điểm ngữ pháp =====
  const grammarRows: CellValue[][] = [
    [
      'Hạng',
      'Điểm ngữ pháp',
      'Câu hỏi',
      'Mã câu',
      'Unit',
      'Kỹ năng',
      'Số lượt làm',
      'Số lượt sai',
      'Tỉ lệ sai (%)',
      'Câu trả lời sai phổ biến nhất',
      'Số lần trả lời sai này',
      'Số HS mắc lỗi',
      'Học sinh mắc lỗi',
    ],
    ...report.topMissedItems.map((it) => [
      it.rank,
      it.grammarPointTitle,
      it.questionPrompt,
      it.itemId,
      `Unit ${it.unitNumber}`,
      it.skillLabel,
      it.totalAttempts,
      it.wrongCount,
      it.errorRatePct,
      it.mostCommonWrongAnswer,
      it.mostCommonWrongCount,
      it.affectedStudentCount,
      it.affectedStudentIds.map(displayName).join(', '),
    ]),
  ];

  // ===== Sheet 5: Dữ liệu thô (không bao giờ có họ tên) =====
  const rawRows: CellValue[][] = [
    [
      'attemptId',
      'studentId',
      'schoolId',
      'className',
      'grade',
      'unitId',
      'skill',
      'setId',
      'itemId',
      'grammarPointId',
      'correct',
      'score',
      'answer',
      'attemptNo',
      'startedAt',
      'submittedAt',
      'durationSec',
      'device',
    ],
    ...[...report.filteredAttempts]
      .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt))
      .map((a) => [
        a.id,
        displayId(a.studentId),
        a.schoolId,
        a.className,
        a.grade,
        a.unitId,
        a.skill,
        a.setId,
        a.itemId,
        a.grammarPointId || '',
        a.correct,
        a.score,
        a.answer,
        a.attemptNo,
        a.startedAt,
        a.submittedAt,
        a.durationSec,
        a.device,
      ]),
  ];

  return [
    {
      name: 'Tổng quan',
      rows: overviewRows,
      headerRows: [0, 10, weeklyHeaderIdx, unitHeaderIdx],
      colWidths: [34, 22, 16, 18, 16],
    },
    { name: 'Theo lớp', rows: classRows, colWidths: [10, 28, 8, 16, 14, 14, 12, 12, 16] },
    {
      name: 'Theo học sinh',
      rows: studentRows,
      colWidths: [8, 28, 8, 26, 18, 12, 12, 14, 12, 12, 12, 12, 10, 12, 22],
    },
    {
      name: 'Theo điểm ngữ pháp',
      rows: grammarRows,
      colWidths: [6, 36, 48, 16, 9, 12, 12, 12, 12, 30, 12, 12, 40],
    },
    {
      name: 'Dữ liệu thô',
      rows: rawRows,
      colWidths: [30, 18, 28, 9, 7, 9, 13, 12, 16, 18, 8, 7, 30, 9, 24, 24, 11, 9],
    },
  ];
}

/**
 * Xuất Báo cáo giáo viên ra file .xlsx và tải về máy.
 */
export async function exportTeacherReportToXlsx(params: ExportTeacherReportParams): Promise<void> {
  const sheets = buildTeacherReportSheets(params);
  const blob = await buildXlsxBlob(sheets);
  const stamp = new Date().toISOString().slice(0, 10);
  const classPart = params.filter.className === 'all' ? 'tat-ca-lop' : params.filter.className;
  const fileName =
    params.fileName ||
    `bao-cao-hoc-tap_${classPart}_${stamp}${params.anonymize ? '_an-danh' : ''}.xlsx`;
  saveAs(blob, fileName);
}

import type {
  ItemPsychometricsRow,
  ResearchComparisonSummary,
  SplitHalfReliabilityResult,
} from './researchStats';

export interface ResearchStudentScoreRow {
  studentId: string;
  anonymousCode: string; // HS01, HS02...
  fullName: string;
  className: string;
  group: 'TN' | 'DC';
  preScore10: number;
  postScore10: number;
  diffScore10: number;
  studyMinutes: number;
  studySessions: number;
  oddScorePost: number;
  evenScorePost: number;
}

export interface ResearchGrammarPointProgressRow {
  grammarPointId: string;
  grammarPointTitle: string;
  unitNumber: number;
  tnPrePct: number;
  tnPostPct: number;
  tnGainPct: number;
  dcPrePct: number;
  dcPostPct: number;
  dcGainPct: number;
}

export interface ResearchRawResponseRow {
  anonymousCode: string;
  fullName: string;
  className: string;
  group: 'TN' | 'DC';
  roundKind: 'pre' | 'post';
  formId: string;
  itemId: string;
  skill: 'grammar' | 'vocab';
  grammarPointId: string;
  answer: string;
  correct: boolean;
  timeSec: number;
}

export interface ExportResearchStudyParams {
  studyTitle?: string;
  preRoundName: string;
  postRoundName: string;
  formId: string;
  studentRows: ResearchStudentScoreRow[];
  summary: ResearchComparisonSummary;
  reliability: SplitHalfReliabilityResult;
  itemAnalysisRows: ItemPsychometricsRow[];
  grammarProgressRows: ResearchGrammarPointProgressRow[];
  rawResponseRows: ResearchRawResponseRow[];
  /** Mặc định false (ẩn danh HS01, HS02... theo đúng Mục 4.6 & Mục 5) */
  showFullName?: boolean;
  fileName?: string;
}

/**
 * Xây dựng 6 Sheet chuẩn NCKHSPƯD / SKKN cho file "Số liệu nghiên cứu.xlsx" (Mục 4.6)
 * với công thức Excel thật (`<f>...</f>`) ở Bảng điểm, Thống kê và Độ tin cậy.
 */
export function buildResearchStudySheets(params: ExportResearchStudyParams): SheetDef[] {
  const showName = Boolean(params.showFullName);

  // Sắp xếp nhóm TN lên trước, ĐC xuống dưới để tạo vùng địa chỉ ô liên tục trên sheet 'Bảng điểm'
  const tnStudents = params.studentRows
    .filter((r) => r.group === 'TN')
    .sort((a, b) => a.anonymousCode.localeCompare(b.anonymousCode));
  const dcStudents = params.studentRows
    .filter((r) => r.group === 'DC')
    .sort((a, b) => a.anonymousCode.localeCompare(b.anonymousCode));
  const orderedStudents = [...tnStudents, ...dcStudents];

  const preCol = showName ? 'E' : 'D';
  const postCol = showName ? 'F' : 'E';

  // ===== Sheet 1: Bảng điểm =====
  const scoreHeader: CellValue[] = showName
    ? ['Mã HS', 'Họ và tên', 'Lớp', 'Nhóm', 'Điểm trước', 'Điểm sau', 'Chênh lệch', 'Số phút luyện']
    : ['Mã HS', 'Lớp', 'Nhóm', 'Điểm trước', 'Điểm sau', 'Chênh lệch', 'Số phút luyện'];

  const scoreRows: CellValue[][] = [
    scoreHeader,
    ...orderedStudents.map((st, idx) => {
      const rowNum = idx + 2;
      const diffFormula: ExcelFormulaCell = {
        formula: `${postCol}${rowNum}-${preCol}${rowNum}`,
        value: Math.round((st.postScore10 - st.preScore10) * 100) / 100,
      };
      if (showName) {
        return [
          st.anonymousCode,
          st.fullName,
          st.className,
          st.group === 'TN' ? 'TN' : 'ĐC',
          st.preScore10,
          st.postScore10,
          diffFormula,
          Math.round(st.studyMinutes * 10) / 10,
        ];
      }
      return [
        st.anonymousCode,
        st.className,
        st.group === 'TN' ? 'TN' : 'ĐC',
        st.preScore10,
        st.postScore10,
        diffFormula,
        Math.round(st.studyMinutes * 10) / 10,
      ];
    }),
  ];

  // Tính toạ độ vùng ô trên sheet 'Bảng điểm' cho nhóm TN và nhóm ĐC
  const tnCount = tnStudents.length;
  const dcCount = dcStudents.length;
  const tnStartRow = 2;
  const tnEndRow = Math.max(2, 1 + tnCount);
  const dcStartRow = tnCount > 0 ? 2 + tnCount : 2;
  const dcEndRow = Math.max(dcStartRow, dcStartRow + Math.max(1, dcCount) - 1);

  const tnPreRange = `'Bảng điểm'!${preCol}${tnStartRow}:${preCol}${tnEndRow}`;
  const tnPostRange = `'Bảng điểm'!${postCol}${tnStartRow}:${postCol}${tnEndRow}`;
  const dcPreRange = `'Bảng điểm'!${preCol}${dcStartRow}:${preCol}${dcEndRow}`;
  const dcPostRange = `'Bảng điểm'!${postCol}${dcStartRow}:${postCol}${dcEndRow}`;

  const { summary } = params;

  // ===== Sheet 2: Thống kê (Công thức Excel thật) =====
  // Dòng 1: Tiêu đề bảng
  // Dòng 2: Header cột (A..E)
  // Dòng 3: Số HS (row 3)
  // Dòng 4: Mốt - MODE (row 4)
  // Dòng 5: Trung vị - MEDIAN (row 5)
  // Dòng 6: Giá trị trung bình - AVERAGE (row 6)
  // Dòng 7: Độ lệch chuẩn - STDEV (row 7)
  // Dòng 8: p (T-test độc lập Welch) (row 8)
  // Dòng 9: p (T-test phụ thuộc / cặp Trước-Sau) (row 9)
  // Dòng 10: Mức độ ảnh hưởng SMD (row 10)
  const statsRows: CellValue[][] = [
    [
      'BẢNG TỔNG HỢP KẾT QUẢ KIỂM TRA ĐẦU VÀO – ĐẦU RA (DÙNG CHO SKKN / NCKHSPƯD)',
      `${params.preRoundName} → ${params.postRoundName}`,
    ],
    ['Chỉ số thống kê', 'TN – Trước', 'ĐC – Trước', 'TN – Sau', 'ĐC – Sau'],
    [
      'Số HS (N)',
      tnCount > 0 ? { formula: `COUNT(${tnPreRange})`, value: summary.tnPre.n } : 0,
      dcCount > 0 ? { formula: `COUNT(${dcPreRange})`, value: summary.dcPre.n } : 0,
      tnCount > 0 ? { formula: `COUNT(${tnPostRange})`, value: summary.tnPost.n } : 0,
      dcCount > 0 ? { formula: `COUNT(${dcPostRange})`, value: summary.dcPost.n } : 0,
    ],
    [
      'Mốt (MODE)',
      tnCount > 0 ? { formula: `MODE(${tnPreRange})`, value: summary.tnPre.mode } : 0,
      dcCount > 0 ? { formula: `MODE(${dcPreRange})`, value: summary.dcPre.mode } : 0,
      tnCount > 0 ? { formula: `MODE(${tnPostRange})`, value: summary.tnPost.mode } : 0,
      dcCount > 0 ? { formula: `MODE(${dcPostRange})`, value: summary.dcPost.mode } : 0,
    ],
    [
      'Trung vị (MEDIAN)',
      tnCount > 0 ? { formula: `MEDIAN(${tnPreRange})`, value: summary.tnPre.median } : 0,
      dcCount > 0 ? { formula: `MEDIAN(${dcPreRange})`, value: summary.dcPre.median } : 0,
      tnCount > 0 ? { formula: `MEDIAN(${tnPostRange})`, value: summary.tnPost.median } : 0,
      dcCount > 0 ? { formula: `MEDIAN(${dcPostRange})`, value: summary.dcPost.median } : 0,
    ],
    [
      'Giá trị trung bình (AVERAGE)',
      tnCount > 0 ? { formula: `AVERAGE(${tnPreRange})`, value: summary.tnPre.mean } : 0,
      dcCount > 0 ? { formula: `AVERAGE(${dcPreRange})`, value: summary.dcPre.mean } : 0,
      tnCount > 0 ? { formula: `AVERAGE(${tnPostRange})`, value: summary.tnPost.mean } : 0,
      dcCount > 0 ? { formula: `AVERAGE(${dcPostRange})`, value: summary.dcPost.mean } : 0,
    ],
    [
      'Độ lệch chuẩn (STDEV)',
      tnCount > 1 ? { formula: `STDEV(${tnPreRange})`, value: summary.tnPre.sd } : 0,
      dcCount > 1 ? { formula: `STDEV(${dcPreRange})`, value: summary.dcPre.sd } : 0,
      tnCount > 1 ? { formula: `STDEV(${tnPostRange})`, value: summary.tnPost.sd } : 0,
      dcCount > 1 ? { formula: `STDEV(${dcPostRange})`, value: summary.dcPost.sd } : 0,
    ],
    [
      'p (T-test độc lập Welch: TN vs ĐC)',
      tnCount > 1 && dcCount > 1
        ? {
            formula: `TTEST(${tnPreRange},${dcPreRange},2,3)`,
            value: summary.preWelch.p,
          }
        : summary.preWelch.p,
      '',
      tnCount > 1 && dcCount > 1
        ? {
            formula: `TTEST(${tnPostRange},${dcPostRange},2,3)`,
            value: summary.postWelch.p,
          }
        : summary.postWelch.p,
      '',
    ],
    [
      'p (T-test phụ thuộc/cặp: Trước vs Sau)',
      '',
      '',
      tnCount > 1
        ? {
            formula: `TTEST(${tnPreRange},${tnPostRange},2,1)`,
            value: summary.tnPaired.p,
          }
        : summary.tnPaired.p,
      dcCount > 1
        ? {
            formula: `TTEST(${dcPreRange},${dcPostRange},2,1)`,
            value: summary.dcPaired.p,
          }
        : summary.dcPaired.p,
    ],
    [
      'Mức độ ảnh hưởng SMD = (TB_TN_Sau - TB_ĐC_Sau) / SD_ĐC_Sau',
      '',
      '',
      dcCount > 1
        ? {
            formula: `(D6-E6)/E7`,
            value: summary.smd.smd,
          }
        : summary.smd.smd,
      summary.smd.label,
    ],
    [],
    ['KẾT LUẬN TỰ ĐỘNG', summary.conclusionText],
  ];

  // ===== Sheet 3: Độ tin cậy (Spearman-Brown Split-Half) =====
  const relStartRow = 6;
  const relEndRow = Math.max(relStartRow, relStartRow + orderedStudents.length - 1);
  const oddRange = `C${relStartRow}:C${relEndRow}`;
  const evenRange = `D${relStartRow}:D${relEndRow}`;

  const reliabilityRows: CellValue[][] = [
    ['KIỂM ĐỊNH ĐỘ TIN CẬY CỦA ĐỀ KIỂM TRA (CHIA ĐÔI CÂU LẺ – CÂU CHẴN SPEARMAN-BROWN)', params.formId],
    [
      'Hệ số tương quan nửa đề r_half = CORREL(Lẻ, Chẵn)',
      orderedStudents.length > 1
        ? {
            formula: `CORREL(${oddRange},${evenRange})`,
            value: params.reliability.rHalf,
          }
        : params.reliability.rHalf,
      'Ngưỡng yêu cầu: r_SB >= 0,70',
    ],
    [
      'Độ tin cậy Spearman-Brown r_SB = 2*r_half / (1 + r_half)',
      orderedStudents.length > 1
        ? {
            formula: `2*B2/(1+B2)`,
            value: params.reliability.spearmanBrown,
          }
        : params.reliability.spearmanBrown,
      params.reliability.isReliable ? 'ĐẠT (Đề đáng tin cậy >= 0,7)' : 'CHƯA ĐẠT (< 0,7)',
    ],
    [],
    ['Mã HS', 'Nhóm', 'Điểm câu lẻ (Odd)', 'Điểm câu chẵn (Even)', 'Tổng điểm kiểm tra'],
    ...orderedStudents.map((st, idx) => {
      const rNum = relStartRow + idx;
      return [
        st.anonymousCode,
        st.group === 'TN' ? 'TN' : 'ĐC',
        st.oddScorePost,
        st.evenScorePost,
        {
          formula: `C${rNum}+D${rNum}`,
          value: Math.round((st.oddScorePost + st.evenScorePost) * 100) / 100,
        },
      ];
    }),
  ];

  // ===== Sheet 4: Phân tích câu (Item Analysis) =====
  const itemRows: CellValue[][] = [
    [
      'Mã câu',
      'Thứ tự',
      'Unit',
      'Kỹ năng',
      'Điểm ngữ pháp',
      'Nội dung câu hỏi',
      '% đúng (Độ khó)',
      'Độ phân biệt (27%)',
      'Phương án sai chọn nhiều nhất',
      'Cảnh báo chất lượng câu hỏi',
    ],
    ...params.itemAnalysisRows.map((it) => [
      it.itemId,
      it.itemNumber,
      `Unit ${it.unit}`,
      it.skill === 'grammar' ? 'Ngữ pháp' : 'Từ vựng',
      it.grammarPointId || 'Từ vựng',
      it.promptPreview,
      it.difficultyPct,
      it.discriminationIndex,
      it.topDistractor ? `${it.topDistractor} (${it.topDistractorCount})` : '—',
      it.flagLabels.length > 0 ? it.flagLabels.join('; ') : 'Tốt',
    ]),
  ];

  // ===== Sheet 5: Theo điểm ngữ pháp =====
  const grammarProgRows: CellValue[][] = [
    [
      'Mã chủ điểm',
      'Chủ điểm ngữ pháp',
      'Unit',
      'TN – Trước (%)',
      'TN – Sau (%)',
      'Tiến bộ TN (%)',
      'ĐC – Trước (%)',
      'ĐC – Sau (%)',
      'Tiến bộ ĐC (%)',
    ],
    ...params.grammarProgressRows.map((gp) => [
      gp.grammarPointId,
      gp.grammarPointTitle,
      `Unit ${gp.unitNumber}`,
      gp.tnPrePct,
      gp.tnPostPct,
      gp.tnGainPct,
      gp.dcPrePct,
      gp.dcPostPct,
      gp.dcGainPct,
    ]),
  ];

  // ===== Sheet 6: Dữ liệu thô =====
  const rawHeader: CellValue[] = showName
    ? [
        'Mã HS',
        'Họ và tên',
        'Lớp',
        'Nhóm',
        'Đợt',
        'Mã đề',
        'Mã câu',
        'Kỹ năng',
        'Điểm ngữ pháp',
        'Câu trả lời của HS',
        'Đúng (1) / Sai (0)',
        'Thời gian (giây)',
      ]
    : [
        'Mã HS',
        'Lớp',
        'Nhóm',
        'Đợt',
        'Mã đề',
        'Mã câu',
        'Kỹ năng',
        'Điểm ngữ pháp',
        'Câu trả lời của HS',
        'Đúng (1) / Sai (0)',
        'Thời gian (giây)',
      ];

  const rawDataRows: CellValue[][] = [
    rawHeader,
    ...params.rawResponseRows.map((r) =>
      showName
        ? [
            r.anonymousCode,
            r.fullName,
            r.className,
            r.group === 'TN' ? 'TN' : 'ĐC',
            r.roundKind === 'pre' ? 'Đầu vào' : 'Đầu ra',
            r.formId,
            r.itemId,
            r.skill === 'grammar' ? 'Ngữ pháp' : 'Từ vựng',
            r.grammarPointId || 'vocab',
            r.answer,
            r.correct ? 1 : 0,
            r.timeSec,
          ]
        : [
            r.anonymousCode,
            r.className,
            r.group === 'TN' ? 'TN' : 'ĐC',
            r.roundKind === 'pre' ? 'Đầu vào' : 'Đầu ra',
            r.formId,
            r.itemId,
            r.skill === 'grammar' ? 'Ngữ pháp' : 'Từ vựng',
            r.grammarPointId || 'vocab',
            r.answer,
            r.correct ? 1 : 0,
            r.timeSec,
          ]
    ),
  ];

  return [
    {
      name: 'Bảng điểm',
      rows: scoreRows,
      headerRows: [0],
      colWidths: showName ? [10, 26, 10, 10, 14, 14, 14, 16] : [10, 10, 10, 14, 14, 14, 16],
    },
    {
      name: 'Thống kê',
      rows: statsRows,
      headerRows: [0, 1],
      colWidths: [44, 18, 18, 18, 18],
    },
    {
      name: 'Độ tin cậy',
      rows: reliabilityRows,
      headerRows: [0, 4],
      colWidths: [38, 16, 22, 22, 20],
    },
    {
      name: 'Phân tích câu',
      rows: itemRows,
      headerRows: [0],
      colWidths: [14, 8, 9, 12, 22, 42, 14, 16, 24, 26],
    },
    {
      name: 'Theo điểm ngữ pháp',
      rows: grammarProgRows,
      headerRows: [0],
      colWidths: [22, 34, 9, 15, 15, 15, 15, 15, 15],
    },
    {
      name: 'Dữ liệu thô',
      rows: rawDataRows,
      headerRows: [0],
      colWidths: showName
        ? [10, 24, 9, 9, 11, 10, 14, 12, 20, 28, 16, 14]
        : [10, 9, 9, 11, 10, 14, 12, 20, 28, 16, 14],
    },
  ];
}

/**
 * Xuất file "Số liệu nghiên cứu.xlsx" (Mục 4.6) và tải về máy giáo viên.
 */
export async function exportResearchStudyToXlsx(params: ExportResearchStudyParams): Promise<void> {
  const sheets = buildResearchStudySheets(params);
  const blob = await buildXlsxBlob(sheets);
  const fileName = params.fileName || 'Số liệu nghiên cứu.xlsx';
  saveAs(blob, fileName);
}

