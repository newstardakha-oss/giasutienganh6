#!/usr/bin/env python3
"""Sinh bộ đề kiểm tra đầu vào / đầu ra (Form A, Form B) cho từng học kì.

Nguồn: data/grammar_g6.json (ngữ pháp) + từ vựng các Unit trong src/data/*.json và src/services/vocabService.ts.
Đầu ra: data/test_forms.json

Cấu trúc mỗi đề (40 câu, 40 phút, 10 điểm):
  - 32 câu ngữ pháp chấm khách quan: trắc nghiệm (≥3 phương án), điền 1 chỗ trống, sắp xếp câu;
    phủ mọi điểm ngữ pháp của học kì trước, rồi chia đều theo Unit
  - 8 câu từ vựng: chọn từ tiếng Anh đúng với nghĩa tiếng Việt
Form A và Form B tương đương: chia xen kẽ theo từng điểm ngữ pháp / từng Unit, cùng dạng, cùng mức độ.
Các câu được chọn vào đề bị loại khỏi phần luyện tập (reservedItemIds) để kết quả không bị "học tủ".

Chạy:  python3 grammar-g6/tools/build_tests.py   (từ thư mục gốc repo)
"""
import json, re, random, sys
from pathlib import Path
from collections import defaultdict

REPO = Path(__file__).resolve().parents[2]
G = json.loads((REPO / "grammar-g6/data/grammar_g6.json").read_text(encoding="utf-8"))
OUT = REPO / "grammar-g6/data/test_forms.json"
SEED = 2026
N_MCQ, N_GAP, N_VOC = 24, 8, 8

SEMESTERS = {
    "hk1": {"title": "Học kì 1 (Unit 1–6)", "units": range(1, 7)},
    "hk2": {"title": "Học kì 2 (Unit 7–12)", "units": range(7, 13)},
}

# ---------- Từ vựng ----------
def load_vocab():
    vocab = {}
    for n in range(1, 13):
        f = REPO / f"src/data/unit{n}_vocab.json"
        if f.exists():
            vocab[n] = [{"word": v["word"], "meaning": v["meaning"], "type": v.get("type", "")}
                        for v in json.loads(f.read_text(encoding="utf-8"))]
    ts = (REPO / "src/services/vocabService.ts").read_text(encoding="utf-8")
    pat = re.compile(r"\{\s*id:\s*'u(\d+)-\d+',\s*word:\s*'([^']+)'.*?type:\s*'([^']*)',\s*meaning:\s*'([^']+)'")
    for m in pat.finditer(ts):
        n = int(m.group(1))
        if n not in vocab or n in (1, 10):
            vocab.setdefault(n, [])
            if n in (1, 10) and not any(v["word"] == m.group(2) for v in vocab[n]):
                vocab[n].append({"word": m.group(2), "meaning": m.group(4), "type": m.group(3)})
    return vocab

def vocab_items(units, vocab, rng):
    """Mỗi Unit lấy vài từ; phương án nhiễu là từ cùng Unit, cùng từ loại, nghĩa khác hẳn."""
    pool = []
    for n in units:
        words = [v for v in vocab.get(n, []) if 1 <= len(v["word"].split()) <= 3]
        seen_m = defaultdict(int)
        for v in words: seen_m[v["meaning"].lower()] += 1
        words = [v for v in words if seen_m[v["meaning"].lower()] == 1]   # bỏ nghĩa trùng
        rng.shuffle(words)
        for v in words[:6]:
            same = [w for w in words if w["word"] != v["word"] and w["type"] == v["type"]
                    and not set(w["meaning"].lower().split(", ")) & set(v["meaning"].lower().split(", "))]
            if len(same) < 3:
                same = [w for w in words if w["word"] != v["word"]]
            if len(same) < 3: continue
            opts = [v["word"]] + [w["word"] for w in rng.sample(same, 3)]
            rng.shuffle(opts)
            pool.append({"unit": n, "id": f"voc-u{n}-{re.sub(r'[^a-z]+', '-', v['word'].lower()).strip('-')}",
                         "type": "mcq", "skill": "vocab", "grammarPointId": None,
                         "prompt": f"Từ nào có nghĩa là “{v['meaning']}”?",
                         "options": opts, "answerIndex": opts.index(v["word"]),
                         "explanation": f"{v['word']} = {v['meaning']}"})
    return pool

# ---------- Ngữ pháp ----------
def grammar_pool(units):
    """Gom câu ngữ pháp chấm khách quan (trắc nghiệm ≥3 phương án, điền 1 chỗ trống, sắp xếp câu) theo điểm ngữ pháp."""
    pool = defaultdict(list)    # grammarPointId -> items
    for u in G["units"]:
        if u["number"] not in units: continue
        for s in u["exerciseSets"]:
            kind, instr = s["type"], s.get("instruction")
            if kind not in ("mcq", "gap", "reorder"): continue
            if instr and "Bảng" in instr: continue          # câu cần bảng dữ liệu → không đưa vào đề
            for it in s["items"]:
                if kind == "mcq" and (len(it["options"]) < 3 or len(it["prompt"]) > 160): continue
                if kind == "gap" and len(it["blanks"]) != 1: continue
                item = dict(it, unit=u["number"], level=s["level"], type=kind,
                            skill="grammar", grammarPointId=s["grammarPointId"], instruction=s["title"])
                if instr: item["wordBank"] = instr
                pool[s["grammarPointId"]].append(item)
    return pool

def split_ab(pool_by_key, n_each, rng):
    """Chia cặp (A, B) cùng nhóm: ưu tiên nhóm chưa có câu, rồi Unit đang ít câu → A và B tương đương, phủ đều."""
    for k in pool_by_key:
        pool_by_key[k].sort(key=lambda x: (x.get("level", 0), x["id"]))
    A, B = [], []
    by_key, by_unit, flip = defaultdict(int), defaultdict(int), False
    while len(A) < n_each:
        ok = [k for k, lst in pool_by_key.items() if len(lst) >= 2]
        if not ok: break
        k = min(ok, key=lambda k: (by_key[k], by_unit[pool_by_key[k][0]["unit"]], rng.random()))
        a, b = pool_by_key[k].pop(0), pool_by_key[k].pop(0)
        if flip: a, b = b, a          # đổi phía để cân bằng độ khó
        flip = not flip
        A.append(a); B.append(b); by_key[k] += 1; by_unit[a["unit"]] += 1
    return A, B

def main():
    rng = random.Random(SEED)
    vocab = load_vocab()
    out = {"version": "1.0.0", "seed": SEED, "blueprint": {
        "grammar": N_MCQ + N_GAP, "vocab": N_VOC,
        "totalItems": N_MCQ + N_GAP + N_VOC, "durationMinutes": 40, "maxScore": 10},
        "tests": [], "reservedItemIds": []}
    for key, sem in SEMESTERS.items():
        mA, mB = split_ab(grammar_pool(sem["units"]), N_MCQ + N_GAP, rng)
        gA, gB = [], []
        vp = defaultdict(list)
        for it in vocab_items(sem["units"], vocab, rng): vp[it["unit"]].append(it)
        vA, vB = split_ab(vp, N_VOC, rng)
        for form, items in (("A", mA + gA + vA), ("B", mB + gB + vB)):
            if len(items) != N_MCQ + N_GAP + N_VOC:
                sys.exit(f"✗ {key}-{form}: chỉ có {len(items)} câu")
            for it in items: it.pop("level", None)
            out["tests"].append({
                "id": f"{key}-{form}", "semester": key, "title": f"Bài kiểm tra {sem['title']} – Đề {form}",
                "form": form, "units": list(sem["units"]), "items": items,
                "coverage": {
                    "byUnit": {str(n): sum(1 for x in items if x["unit"] == n) for n in sem["units"]},
                    "byGrammarPoint": {gp: sum(1 for x in items if x["grammarPointId"] == gp)
                                       for gp in sorted({x["grammarPointId"] for x in items if x["grammarPointId"]})},
                }})
            out["reservedItemIds"] += [x["id"] for x in items if x["skill"] == "grammar"]
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    for t in out["tests"]:
        print(f"✓ {t['id']}: {len(t['items'])} câu · theo Unit {t['coverage']['byUnit']} · "
              f"{len(t['coverage']['byGrammarPoint'])} điểm ngữ pháp")
    print(f"  {len(out['reservedItemIds'])} câu ngữ pháp được giữ riêng cho đề kiểm tra → {OUT.relative_to(REPO)}")

if __name__ == "__main__":
    main()
