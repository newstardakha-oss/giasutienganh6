// Bộ chấm điểm dùng chung cho mọi dạng bài.
// Quy tắc chuẩn hoá PHẢI giữ giống tools/build.py để dữ liệu đã kiểm tra luôn chấm đúng.
import type {
  ExerciseItem, McqItem, GapItem, ReorderItem, RewriteItem, ErrorItem, ClassifyItem, ClozeItem,
} from "./types";

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, "will not"],
  [/\bcan't\b/g, "cannot"],
  [/\bshan't\b/g, "shall not"],
  [/\b(\w+)n't\b/g, "$1 not"],
  [/\bi'm\b/g, "i am"],
  [/\b(\w+)'re\b/g, "$1 are"],
  [/\b(\w+)'ll\b/g, "$1 will"],
  [/\b(i|you|we|they)'ve\b/g, "$1 have"],
  [/\b(he|she|it|that|there|what|where|who|here)'s\b/g, "$1 is"],
  [/\bcan not\b/g, "cannot"],
];

/**
 * Chuẩn hoá câu trả lời trước khi so sánh:
 * - không phân biệt hoa/thường, dấu nháy cong/thẳng
 * - coi dạng rút gọn = dạng đầy đủ (don't = do not, it's = it is, can't = cannot…)
 * - bỏ dấu câu . , ! ? ; : " và khoảng trắng thừa
 * - GIỮ dấu ' sở hữu (Lan's, students') và its ≠ it's
 */
export function normalize(input: string): string {
  let s = input.toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"');
  for (const [re, rep] of CONTRACTIONS) s = s.replace(re, rep);
  s = s.replace(/\s[–—-]\s/g, " ");
  s = s.replace(/[.,!?;:"()–—]/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

export const matches = (answer: string, accept: string[]) =>
  accept.some((a) => normalize(a) === normalize(answer));

export interface CheckResult {
  correct: boolean;
  /** cloze/gap nhiều chỗ: đúng/sai từng chỗ; error: [đúng vị trí, đúng cách sửa] */
  parts?: boolean[];
  /** đáp án mẫu để hiển thị khi sai */
  expected: string;
}

/** Câu trả lời của học sinh cho từng dạng bài */
export type Answer =
  | { type: "mcq"; choice: number }
  | { type: "gap"; values: string[] }
  | { type: "reorder"; order: string[] }               // thứ tự thẻ học sinh xếp
  | { type: "rewrite"; text: string }
  | { type: "error"; tappedIndex: number; fix: string }
  | { type: "classify"; category: string }
  | { type: "cloze"; values: Record<number, string> }; // n -> giá trị

export function check(item: ExerciseItem, answer: Answer): CheckResult {
  switch (answer.type) {
    case "mcq": {
      const it = item as McqItem;
      return { correct: answer.choice === it.answerIndex, expected: it.options[it.answerIndex] };
    }
    case "gap": {
      const it = item as GapItem;
      const parts = it.blanks.map((b, i) => matches(answer.values[i] ?? "", b.accept));
      return { correct: parts.every(Boolean), parts, expected: it.blanks.map((b) => b.accept[0]).join(" / ") };
    }
    case "reorder": {
      const it = item as ReorderItem;
      return { correct: matches(answer.order.join(" "), it.accept), expected: it.accept[0] };
    }
    case "rewrite": {
      const it = item as RewriteItem;
      return { correct: matches(answer.text, it.accept), expected: it.accept[0] };
    }
    case "error": {
      const it = item as ErrorItem;
      const located = answer.tappedIndex >= it.errorStart && answer.tappedIndex <= it.errorEnd;
      const fixed = matches(answer.fix, it.fix) || matches(answer.fix, it.corrected); // cho phép gõ cả câu
      return { correct: located && fixed, parts: [located, fixed], expected: it.corrected[0] };
    }
    case "classify": {
      const it = item as ClassifyItem;
      return { correct: answer.category === it.category, expected: it.category };
    }
    case "cloze": {
      const it = item as ClozeItem;
      const blanks = it.segments.filter((s) => s.type === "blank") as Extract<ClozeItem["segments"][number], { type: "blank" }>[];
      const parts = blanks.map((b) => matches(answer.values[b.n] ?? "", b.accept));
      return { correct: parts.every(Boolean), parts, expected: blanks.map((b) => `(${b.n}) ${b.accept[0]}`).join("  ") };
    }
  }
}

/** Điểm của một câu (0..1). Cloze/gap chấm theo tỉ lệ chỗ trống đúng. */
export function score(result: CheckResult): number {
  if (!result.parts || result.parts.length < 2) return result.correct ? 1 : 0;
  return result.parts.filter(Boolean).length / result.parts.length;
}
