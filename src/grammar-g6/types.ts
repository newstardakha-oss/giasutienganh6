// Kiểu dữ liệu cho tính năng "Ngữ pháp Tiếng Anh 6" – khớp 1:1 với data/grammar_g6.json

export interface GrammarDataset {
  meta: {
    title: string;
    grade: number;
    textbook: string;
    version: string;
    generatedAt: string;
    source: string;
    exerciseTypes: ExerciseType[];
  };
  units: Unit[];
}

export interface Unit {
  id: string;            // "u1" … "u12"
  number: number;
  title: string;         // "My New School"
  titleVi: string;       // "Trường mới của em"
  grammarPoints: GrammarPoint[];
  exerciseSets: ExerciseSet[];
}

/* ---------------- LÝ THUYẾT ---------------- */
export interface GrammarPoint {
  id: string;            // "u1-present-simple"
  title: string;
  titleVi: string;
  sections: { heading: string; blocks: TheoryBlock[] }[];
}

export type TheoryBlock =
  | { type: "rule"; text: string }                     // gạch đầu dòng quy tắc
  | { type: "formula"; text: string }                  // công thức – hiển thị nổi bật, font mono
  | { type: "example"; en: string; vi: string }        // ví dụ song ngữ (có thể đọc TTS phần en)
  | { type: "mistake"; wrong: string; right: string }  // lỗi thường gặp ✗ → ✓
  | { type: "tip"; text: string };                     // mẹo / ghi nhớ

/* ---------------- BÀI TẬP ---------------- */
export type ExerciseType = "mcq" | "gap" | "reorder" | "rewrite" | "error" | "classify" | "cloze";

export interface ExerciseSet {
  id: string;                // "u1-s3"
  type: ExerciseType;
  title: string;             // yêu cầu đề bài (tiếng Việt)
  level: 1 | 2 | 3 | 4 | 5;  // ★ độ khó, theo tài liệu gốc
  grammarPointId: string;    // liên kết về phần lý thuyết để "Xem lại lý thuyết"
  instruction?: string;      // ngân hàng từ / bảng dữ liệu kèm theo
  categories?: string[];     // chỉ có ở type "classify"
  items: ExerciseItem[];
}

export type ExerciseItem =
  | McqItem | GapItem | ReorderItem | RewriteItem | ErrorItem | ClassifyItem | ClozeItem;

interface BaseItem { id: string; explanation?: string }

/** Trắc nghiệm A/B/C/D (hoặc 2 phương án) */
export interface McqItem extends BaseItem {
  prompt: string;            // có thể chứa "___"
  options: string[];
  answerIndex: number;
}

/** Điền từ: mỗi "___" trong prompt ứng với 1 phần tử blanks (theo thứ tự) */
export interface GapItem extends BaseItem {
  prompt: string;
  blanks: { accept: string[] }[];
}

/** Sắp xếp thẻ từ thành câu */
export interface ReorderItem extends BaseItem {
  tokens: string[];          // thẻ từ (app tự xáo trộn)
  endPunct: "." | "?" | "!";
  accept: string[];          // các câu đúng được chấp nhận
}

/** Viết lại câu / đặt câu hỏi / viết câu từ gợi ý – học sinh gõ cả câu */
export interface RewriteItem extends BaseItem {
  prompt: string;
  accept: string[];
}

/** Tìm và sửa lỗi: B1 chạm vào từ sai (tokens[errorStart..errorEnd]); B2 gõ phần sửa */
export interface ErrorItem extends BaseItem {
  sentence: string;
  tokens: string[];          // sentence.split(" ")
  errorStart: number;
  errorEnd: number;
  wrong: string;
  fix: string[];             // các cách sửa được chấp nhận cho cụm sai
  corrected: string[];       // câu hoàn chỉnh sau khi sửa (để hiển thị đáp án)
}

/** Phân loại: kéo/thả hoặc chạm để xếp vào nhóm */
export interface ClassifyItem extends BaseItem {
  text: string;
  context?: string;          // câu ngữ cảnh
  category: string;          // ∈ ExerciseSet.categories
}

/** Đoạn văn nhiều chỗ trống (dạng 10 – tổng hợp) */
export interface ClozeItem extends BaseItem {
  blankCount: number;
  segments: (
    | { type: "text"; text: string }
    | { type: "blank"; n: number; mode: "input"; accept: string[] }
    | { type: "blank"; n: number; mode: "select"; options: string[]; accept: string[] }
  )[];
}

/* ---------------- TIẾN ĐỘ HỌC SINH (lưu ở backend/local) ---------------- */
export interface AttemptRecord {
  itemId: string;            // id câu (cloze: `${itemId}#${n}`)
  setId: string;
  unitId: string;
  correct: boolean;
  answer: string;            // câu trả lời của học sinh
  at: string;                // ISO time
}

export interface SetProgress {
  setId: string;
  bestScore: number;         // 0..1
  attempts: number;
  lastPlayedAt: string;
}

/* ---------------- KIỂU HỖ TRỢ TRONG APP ---------------- */
export interface IndexedExerciseItem {
  unit: Unit;
  set: ExerciseSet;
  item: ExerciseItem;
}

export interface GrammarStudentStore {
  /** Điểm cao nhất dạng số (tương thích demo) hoặc SetProgress chi tiết */
  best: Record<string, number>;
  /** Chi tiết tiến độ từng bộ bài tập */
  setProgress: Record<string, SetProgress>;
  /** Danh sách itemId làm sai (làm đúng sẽ tự động xoá) */
  mistakes: Record<string, number>;
  /** Lịch sử các lần trả lời câu hỏi */
  attempts: AttemptRecord[];
}
