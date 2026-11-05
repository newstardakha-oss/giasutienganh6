// Chạy: npx tsx src/answerChecker.test.ts
import { readFileSync } from "node:fs";
import { check, normalize } from "./answerChecker";
import type { GrammarDataset, ExerciseItem } from "./types";

const data: GrammarDataset = JSON.parse(readFileSync(new URL("../data/grammar_g6.json", import.meta.url), "utf8"));
let pass = 0, fail = 0;
const ok = (cond: boolean, msg: string) => { cond ? pass++ : (fail++, console.error("✗", msg)); };

// 1) Mọi đáp án trong dữ liệu đều được chấm ĐÚNG
for (const u of data.units) for (const s of u.exerciseSets) for (const raw of s.items) {
  const it = raw as any as ExerciseItem & Record<string, any>;
  switch (s.type) {
    case "mcq": ok(check(it, { type: "mcq", choice: it.answerIndex }).correct, it.id); break;
    case "gap": ok(check(it, { type: "gap", values: it.blanks.map((b: any) => b.accept[0]) }).correct, it.id); break;
    case "reorder": for (const a of it.accept) ok(check(it, { type: "reorder", order: [a] }).correct, it.id); break;
    case "rewrite": for (const a of it.accept) ok(check(it, { type: "rewrite", text: a }).correct, it.id); break;
    case "error":
      ok(check(it, { type: "error", tappedIndex: it.errorStart, fix: it.fix[0] }).correct, it.id);
      ok(!check(it, { type: "error", tappedIndex: it.errorStart, fix: it.wrong }).correct, it.id + " (gõ lại từ sai phải bị chấm sai)");
      break;
    case "classify": ok(check(it, { type: "classify", category: it.category }).correct, it.id); break;
    case "cloze": {
      const values: Record<number, string> = {};
      for (const seg of it.segments) if (seg.type === "blank") values[seg.n] = seg.accept[0];
      ok(check(it, { type: "cloze", values }).correct, it.id);
    }
  }
}

// 2) Quy tắc chuẩn hoá
const eq = (a: string, b: string) => ok(normalize(a) === normalize(b), `"${a}" phải = "${b}"`);
const ne = (a: string, b: string) => ok(normalize(a) !== normalize(b), `"${a}" phải ≠ "${b}"`);
eq("She doesn't like Art.", "she does not like art");
eq("It’s mine", "It is mine.");
eq("can't", "cannot"); eq("can not", "cannot"); eq("won't", "will not");
eq("Does she go to school by bus? Yes, she does.", "does she go to school by bus yes she does");
ne("its", "it's");
ne("teachers'", "teachers");
ne("Lan's", "Lans");
ne("Lan's", "Lan is");

console.log(`\n${fail ? "✗" : "✓"} ${pass} kiểm tra đạt, ${fail} lỗi`);
process.exit(fail ? 1 : 0);
