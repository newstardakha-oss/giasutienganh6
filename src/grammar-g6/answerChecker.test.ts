// Chạy: npx tsx src/grammar-g6/answerChecker.test.ts
import { readFileSync } from "node:fs";
import { check, normalize, score } from "./answerChecker";
import { toAppUnitId, toGrammarUnitId, formatItemPreview } from "./dataLoader";
import {
  getUnitCompletion,
  loadGrammarProgress,
  recordItemAttempt,
  recordSetCompletion,
} from "./storage";
import type {
  ClassifyItem,
  ClozeItem,
  ErrorItem,
  ExerciseItem,
  GapItem,
  GrammarDataset,
  McqItem,
  ReorderItem,
  RewriteItem,
} from "./types";

const data: GrammarDataset = JSON.parse(
  readFileSync(new URL("../data/grammar_g6.json", import.meta.url), "utf8")
);
let pass = 0,
  fail = 0;
const ok = (cond: boolean, msg: string) => {
  cond ? pass++ : (fail++, console.error("✗", msg));
};

// 1) Mọi đáp án trong dữ liệu đều được chấm ĐÚNG
for (const u of data.units)
  for (const s of u.exerciseSets)
    for (const raw of s.items) {
      const it = raw as any as ExerciseItem & Record<string, any>;
      switch (s.type) {
        case "mcq":
          ok(check(it, { type: "mcq", choice: it.answerIndex }).correct, it.id);
          break;
        case "gap":
          ok(
            check(it, {
              type: "gap",
              values: it.blanks.map((b: any) => b.accept[0]),
            }).correct,
            it.id
          );
          break;
        case "reorder":
          for (const a of it.accept)
            ok(check(it, { type: "reorder", order: [a] }).correct, it.id);
          break;
        case "rewrite":
          for (const a of it.accept)
            ok(check(it, { type: "rewrite", text: a }).correct, it.id);
          break;
        case "error":
          ok(
            check(it, {
              type: "error",
              tappedIndex: it.errorStart,
              fix: it.fix[0],
            }).correct,
            it.id
          );
          ok(
            !check(it, {
              type: "error",
              tappedIndex: it.errorStart,
              fix: it.wrong,
            }).correct,
            it.id + " (gõ lại từ sai phải bị chấm sai)"
          );
          break;
        case "classify":
          ok(
            check(it, { type: "classify", category: it.category }).correct,
            it.id
          );
          break;
        case "cloze": {
          const values: Record<number, string> = {};
          for (const seg of it.segments)
            if (seg.type === "blank") values[seg.n] = seg.accept[0];
          ok(check(it, { type: "cloze", values }).correct, it.id);
        }
      }
    }

// 2) Quy tắc chuẩn hoá
const eq = (a: string, b: string) =>
  ok(normalize(a) === normalize(b), `"${a}" phải = "${b}"`);
const ne = (a: string, b: string) =>
  ok(normalize(a) !== normalize(b), `"${a}" phải ≠ "${b}"`);
eq("She doesn't like Art.", "she does not like art");
eq("It’s mine", "It is mine.");
eq("can't", "cannot");
eq("can not", "cannot");
eq("won't", "will not");
eq(
  "Does she go to school by bus? Yes, she does.",
  "does she go to school by bus yes she does"
);
ne("its", "it's");
ne("teachers'", "teachers");
ne("Lan's", "Lans");
ne("Lan's", "Lan is");

// 3) Unit test cho 7 dạng bài (ít nhất 1 câu đúng + 1 câu sai thực tế từ JSON cho mỗi dạng)
const findFirstSetByType = (type: string) => {
  for (const u of data.units) {
    for (const s of u.exerciseSets) {
      if (s.type === type && s.items.length > 0) return { unit: u, set: s, item: s.items[0] };
    }
  }
  throw new Error(`Không tìm thấy dạng bài ${type}`);
};

// 3.1. MCQ
{
  const { item } = findFirstSetByType("mcq");
  const mcq = item as McqItem;
  const rightRes = check(mcq, { type: "mcq", choice: mcq.answerIndex });
  const wrongChoice = (mcq.answerIndex + 1) % mcq.options.length;
  const wrongRes = check(mcq, { type: "mcq", choice: wrongChoice });
  ok(rightRes.correct && score(rightRes) === 1, "MCQ đúng phải đạt 1 điểm");
  ok(!wrongRes.correct && score(wrongRes) === 0, "MCQ sai phải đạt 0 điểm");
}

// 3.2. Classify
{
  const { set, item } = findFirstSetByType("classify");
  const cls = item as ClassifyItem;
  const rightRes = check(cls, { type: "classify", category: cls.category });
  const wrongCat = (set.categories || []).find((c) => c !== cls.category) || "__wrong__";
  const wrongRes = check(cls, { type: "classify", category: wrongCat });
  ok(rightRes.correct && score(rightRes) === 1, "Classify đúng phải đạt 1 điểm");
  ok(!wrongRes.correct && score(wrongRes) === 0, "Classify sai phải đạt 0 điểm");
}

// 3.3. Gap
{
  const { item } = findFirstSetByType("gap");
  const gap = item as GapItem;
  const rightValues = gap.blanks.map((b) => b.accept[0]);
  const wrongValues = gap.blanks.map(() => "wrong_verb_xyz");
  const rightRes = check(gap, { type: "gap", values: rightValues });
  const wrongRes = check(gap, { type: "gap", values: wrongValues });
  ok(rightRes.correct && score(rightRes) === 1, "Gap đúng phải đạt 1 điểm");
  ok(!wrongRes.correct && score(wrongRes) === 0, "Gap sai phải đạt 0 điểm");
}

// 3.4. Rewrite
{
  const { item } = findFirstSetByType("rewrite");
  const rw = item as RewriteItem;
  const rightRes = check(rw, { type: "rewrite", text: rw.accept[0] });
  const wrongRes = check(rw, { type: "rewrite", text: "This sentence is completely wrong." });
  ok(rightRes.correct && score(rightRes) === 1, "Rewrite đúng phải đạt 1 điểm");
  ok(!wrongRes.correct && score(wrongRes) === 0, "Rewrite sai phải đạt 0 điểm");
}

// 3.5. Reorder
{
  const { item } = findFirstSetByType("reorder");
  const ro = item as ReorderItem;
  const rightRes = check(ro, { type: "reorder", order: ro.accept[0].split(" ") });
  const wrongRes = check(ro, { type: "reorder", order: [...ro.tokens].reverse() });
  ok(rightRes.correct && score(rightRes) === 1, "Reorder đúng phải đạt 1 điểm");
  ok(!wrongRes.correct && score(wrongRes) === 0, "Reorder sai phải đạt 0 điểm");
}

// 3.6. Error (chấm 2 phần: vị trí 50% + cách sửa 50%)
{
  const { item } = findFirstSetByType("error");
  const err = item as ErrorItem;
  const rightRes = check(err, {
    type: "error",
    tappedIndex: err.errorStart,
    fix: err.fix[0],
  });
  const halfLocatedOnly = check(err, {
    type: "error",
    tappedIndex: err.errorStart,
    fix: "wrong_fix_xyz",
  });
  const wrongBoth = check(err, {
    type: "error",
    tappedIndex: err.errorStart === 0 ? err.tokens.length - 1 : 0,
    fix: "wrong_fix_xyz",
  });
  ok(rightRes.correct && score(rightRes) === 1, "Error đúng cả 2 phần đạt 1 điểm");
  ok(!halfLocatedOnly.correct && score(halfLocatedOnly) === 0.5, "Error đúng vị trí sai cách sửa đạt 0.5 điểm");
  ok(!wrongBoth.correct && score(wrongBoth) === 0, "Error sai cả 2 phần đạt 0 điểm");
}

// 3.7. Cloze (chấm theo tỉ lệ chỗ trống đúng)
{
  const { item } = findFirstSetByType("cloze");
  const clz = item as ClozeItem;
  const blanks = clz.segments.filter(
    (s): s is Extract<ClozeItem["segments"][number], { type: "blank" }> =>
      s.type === "blank"
  );
  const allRight: Record<number, string> = {};
  const allWrong: Record<number, string> = {};
  const halfRight: Record<number, string> = {};
  blanks.forEach((b, idx) => {
    allRight[b.n] = b.accept[0];
    allWrong[b.n] = "wrong_blank_xyz";
    halfRight[b.n] = idx === 0 ? b.accept[0] : "wrong_blank_xyz";
  });

  const rightRes = check(clz, { type: "cloze", values: allRight });
  const wrongRes = check(clz, { type: "cloze", values: allWrong });
  const partRes = check(clz, { type: "cloze", values: halfRight });

  ok(rightRes.correct && score(rightRes) === 1, "Cloze đúng toàn bộ đạt 1 điểm");
  ok(!wrongRes.correct && score(wrongRes) === 0, "Cloze sai toàn bộ đạt 0 điểm");
  ok(
    !partRes.correct && Math.abs(score(partRes) - 1 / blanks.length) < 1e-6,
    "Cloze đúng 1 chỗ trống tính đúng tỉ lệ"
  );
}

// 4) Kiểm tra ánh xạ Unit ID, Preview & Sổ lỗi sai (Storage)
ok(toAppUnitId("u1") === "unit-1" && toAppUnitId("u12") === "unit-12", "toAppUnitId ánh xạ đúng");
ok(toGrammarUnitId("unit-1") === "u1" && toGrammarUnitId("u10") === "u10", "toGrammarUnitId ánh xạ đúng");

{
  let st = loadGrammarProgress("test-student");
  st = recordItemAttempt(
    st,
    {
      itemId: "u1-s1-1",
      setId: "u1-s1",
      unitId: "u1",
      correct: false,
      answerText: "go",
    },
    "test-student"
  );
  ok(Boolean(st.mistakes["u1-s1-1"]), "Làm sai phải thêm itemId vào Sổ lỗi sai");

  st = recordItemAttempt(
    st,
    {
      itemId: "u1-s1-1",
      setId: "u1-s1",
      unitId: "u1",
      correct: true,
      answerText: "goes",
    },
    "test-student"
  );
  ok(!st.mistakes["u1-s1-1"], "Làm đúng lại phải tự động xoá itemId khỏi Sổ lỗi sai");

  st = recordSetCompletion(st, "u1-s1", 0.85, "test-student");
  st = recordSetCompletion(st, "u1-s1", 0.5, "test-student");
  ok(st.best["u1-s1"] === 0.85, "bestScore phải giữ điểm cao nhất (0.85)");

  const u1Comp = getUnitCompletion(data.units[0], st);
  ok(u1Comp.completedSets === 1 && u1Comp.totalSets === data.units[0].exerciseSets.length, "Tính tiến độ Unit >= 80% chính xác");

  const previewStr = formatItemPreview(findFirstSetByType("mcq"));
  ok(previewStr.length > 0, "formatItemPreview trả về chuỗi hợp lệ");
}

console.log(`\n${fail ? "✗" : "✓"} ${pass} kiểm tra đạt, ${fail} lỗi`);
process.exit(fail ? 1 : 0);
