#!/usr/bin/env python3
"""Biên dịch nội dung soạn thảo (content/*.txt) thành data/grammar_g6.json và kiểm tra hợp lệ.

Cú pháp nội dung (DSL):
  === <số unit> | <Tên tiếng Anh> | <Tên tiếng Việt>
  ## <id> | <Tên EN> | <Tên VI>          -> một điểm ngữ pháp
  ### <tiêu đề mục>
  - <quy tắc>   = <công thức>   > EN :: VI (ví dụ)   x SAI => ĐÚNG   ! <mẹo>
  @set <type> | <tiêu đề> | level=N | gp=<id> [| cats=a,b,c]
  ? <hướng dẫn thêm cho bộ bài>
  <câu hỏi> => <đáp án> || <giải thích>
Types: mcq, gap, reorder, rewrite, error, classify, cloze.
"""
import json, re, sys, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = sorted((ROOT / "content").glob("*.txt"))
OUT = ROOT / "data" / "grammar_g6.json"

errors = []
def err(msg):
    errors.append(msg)

# ---------- chuẩn hoá đáp án (phải giống hệt answerChecker.ts) ----------
CONTRACTIONS = [
    (r"\bwon't\b", "will not"), (r"\bcan't\b", "cannot"), (r"\bshan't\b", "shall not"),
    (r"\b(\w+)n't\b", r"\1 not"), (r"\bi'm\b", "i am"), (r"\b(\w+)'re\b", r"\1 are"),
    (r"\b(\w+)'ll\b", r"\1 will"), (r"\b(i|you|we|they)'ve\b", r"\1 have"),
    (r"\b(he|she|it|that|there|what|where|who|here)'s\b", r"\1 is"),
    (r"\bcan not\b", "cannot"),
]
def normalize(s: str) -> str:
    s = s.lower().replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    for pat, rep in CONTRACTIONS:
        s = re.sub(pat, rep, s)
    s = re.sub(r"\s[–—-]\s", " ", s)       # gạch nối đứng riêng (Q – A)
    s = re.sub(r"[.,!?;:\"()–—]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

PUNCT_END = ".,!?;:"
def strip_p(tok):
    return tok.rstrip(PUNCT_END)

def split_line(line):
    """'prompt => answer || expl' -> (prompt, answer, expl)"""
    expl = ""
    if " || " in line:
        line, expl = line.split(" || ", 1)
    if " => " not in line:
        return None
    prompt, ans = line.split(" => ", 1)
    return prompt.strip(), ans.strip(), expl.strip()

def alts(s, sep="##"):
    return [a.strip() for a in s.split(sep) if a.strip()]

def parse_item(stype, line, set_id, idx, cats):
    iid = f"{set_id}-q{idx}"
    parts = split_line(line)
    if not parts:
        err(f"{iid}: thiếu ' => ' trong dòng: {line}"); return None
    prompt, ans, expl = parts
    item = {"id": iid}
    if stype == "mcq":
        opts = [o.strip() for o in ans.split(" | ")]
        correct = [i for i, o in enumerate(opts) if o.startswith("*")]
        if len(correct) != 1:
            err(f"{iid}: MCQ phải có đúng 1 đáp án đánh dấu *: {line}")
        opts = [o.lstrip("*") for o in opts]
        if len(set(opts)) != len(opts):
            err(f"{iid}: MCQ có phương án trùng nhau")
        item.update(prompt=prompt, options=opts, answerIndex=correct[0] if correct else 0)
    elif stype == "gap":
        blanks = [b.strip() for b in ans.split(";;")]
        n = prompt.count("___")
        if n != len(blanks):
            err(f"{iid}: số chỗ trống ({n}) khác số đáp án ({len(blanks)}): {line}")
        item.update(prompt=prompt, blanks=[{"accept": [a.strip() for a in b.split("|")]} for b in blanks])
    elif stype == "reorder":
        raw = [t.strip() for t in prompt.split(" / ") if t.strip()]
        end = "."
        tokens = []
        for t in raw:
            if t in (".", "?", "!"):
                end = t; continue
            if t[-1] in ".?!" and not t.endswith("p.m.") and not t.endswith("a.m."):
                end = t[-1]; t = t[:-1].strip()
            tokens.append(t)
        accept = alts(ans)
        want = sorted(normalize(" ".join(tokens)).split())
        for a in accept:
            got = sorted(normalize(a).split())
            if got != want:
                err(f"{iid}: đáp án sắp xếp không dùng đúng bộ từ.\n   từ: {want}\n   đáp án: {got}")
        if accept and accept[0].rstrip()[-1:] in ".?!":
            end = accept[0].rstrip()[-1]
        item.update(tokens=tokens, endPunct=end, accept=accept)
    elif stype == "rewrite":
        item.update(prompt=prompt, accept=alts(ans))
    elif stype == "error":
        m = re.match(r"(.+?)\s+->\s+(.+)$", ans)
        if not m:
            err(f"{iid}: lỗi sai phải có dạng 'SAI -> ĐÚNG': {line}"); return None
        wrong, fix = m.group(1).strip(), m.group(2).strip()
        toks = prompt.split()
        bare = [strip_p(t) for t in toks]
        w = wrong.split()
        start = -1
        for i in range(len(bare) - len(w) + 1):
            if bare[i:i + len(w)] == w:
                start = i; break
        if start < 0:
            err(f"{iid}: không tìm thấy cụm sai '{wrong}' trong câu: {prompt}"); return None
        end_i = start + len(w) - 1
        tail = toks[end_i][len(bare[end_i]):]
        fixes = [f.strip() for f in fix.split("|")]
        corrected = [" ".join(toks[:start] + [f + tail] + toks[end_i + 1:]) for f in fixes]
        item.update(sentence=prompt, tokens=toks, errorStart=start, errorEnd=end_i,
                    wrong=wrong, fix=fixes, corrected=corrected)
    elif stype == "classify":
        text, ctx = (prompt.split(" — ", 1) + [None])[:2]
        if ans not in cats:
            err(f"{iid}: nhóm '{ans}' không có trong cats={cats}")
        item.update(text=text.strip(), context=ctx.strip() if ctx else None, category=ans)
        if item["context"] is None:
            del item["context"]
    item["explanation"] = expl
    return item

def parse_cloze(lines, set_id):
    text = "\n".join(lines)
    segs, n, pos = [], 0, 0
    for m in re.finditer(r"\{\{(.+?)\}\}", text):
        if m.start() > pos:
            segs.append({"type": "text", "text": text[pos:m.start()]})
        body = m.group(1)
        n += 1
        if "/" in body:
            opts = [o.strip() for o in body.split("/")]
            correct = [o.lstrip("*") for o in opts if o.startswith("*")]
            if len(correct) != 1:
                err(f"{set_id}: chỗ trống ({n}) dạng chọn phải có đúng 1 dấu *: {body}")
            segs.append({"type": "blank", "n": n, "mode": "select",
                         "options": [o.lstrip("*") for o in opts], "accept": correct})
        else:
            segs.append({"type": "blank", "n": n, "mode": "input",
                         "accept": [a.strip() for a in body.split("|")]})
        pos = m.end()
    if pos < len(text):
        segs.append({"type": "text", "text": text[pos:]})
    return {"id": f"{set_id}-q1", "segments": segs, "blankCount": n}

def parse_file(path, units):
    unit = gp = section = cur_set = None
    cloze_buf = []
    def flush_cloze():
        nonlocal cloze_buf
        if cur_set and cur_set["type"] == "cloze":
            cur_set["items"] = [parse_cloze(cloze_buf, cur_set["id"])]
        cloze_buf = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        if line.startswith("=== "):
            flush_cloze(); cur_set = None
            num, en, vi = [p.strip() for p in line[4:].split("|")]
            unit = {"id": f"u{num}", "number": int(num), "title": en, "titleVi": vi,
                    "grammarPoints": [], "exerciseSets": []}
            units.append(unit); gp = section = None
        elif line.startswith("## "):
            gid, en, vi = [p.strip() for p in line[3:].split("|")]
            gp = {"id": gid, "title": en, "titleVi": vi, "sections": []}
            unit["grammarPoints"].append(gp); section = None
        elif line.startswith("### "):
            section = {"heading": line[4:].strip(), "blocks": []}
            gp["sections"].append(section)
        elif line.startswith("@set "):
            flush_cloze()
            parts = [p.strip() for p in line[5:].split("|")]
            stype, title = parts[0], parts[1]
            opts = dict(p.split("=", 1) for p in parts[2:])
            sid = f"{unit['id']}-s{len(unit['exerciseSets']) + 1}"
            cur_set = {"id": sid, "type": stype, "title": title,
                       "level": int(opts.get("level", 1)), "grammarPointId": opts.get("gp"),
                       "items": []}
            if "cats" in opts:
                cur_set["categories"] = [c.strip() for c in opts["cats"].split(",")]
            unit["exerciseSets"].append(cur_set); gp = section = None
        elif cur_set is not None:
            if line.startswith("? "):
                cur_set["instruction"] = line[2:].strip()
            elif cur_set["type"] == "cloze":
                cloze_buf.append(line)
            else:
                it = parse_item(cur_set["type"], line, cur_set["id"], len(cur_set["items"]) + 1,
                                cur_set.get("categories", []))
                if it: cur_set["items"].append(it)
        elif section is not None:
            tag, body = line[:2], line[2:].strip()
            b = section["blocks"]
            if tag == "- ": b.append({"type": "rule", "text": body})
            elif tag == "= ": b.append({"type": "formula", "text": body})
            elif tag == "! ": b.append({"type": "tip", "text": body})
            elif tag == "> ":
                en, vi = (body.split(" :: ", 1) + [""])[:2]
                b.append({"type": "example", "en": en.strip(), "vi": vi.strip()})
            elif tag == "x ":
                wrong, right = body.split(" => ", 1)
                b.append({"type": "mistake", "wrong": wrong.strip(), "right": right.strip()})
            else:
                err(f"Dòng lý thuyết không rõ loại: {line}")
        else:
            err(f"Dòng nằm ngoài khối nào: {line}")
    flush_cloze()

def validate(units):
    gp_ids = set()
    for u in units:
        ids = {g["id"] for g in u["grammarPoints"]}
        gp_ids |= ids
        for s in u["exerciseSets"]:
            if s["grammarPointId"] not in ids:
                err(f"{s['id']}: gp '{s['grammarPointId']}' không thuộc {u['id']}")
            if not s["items"]:
                err(f"{s['id']}: bộ bài trống")
            for it in s["items"]:
                if s["type"] != "cloze" and not it.get("explanation"):
                    err(f"{it['id']}: thiếu giải thích")

def main():
    units = []
    for p in CONTENT:
        parse_file(p, units)
    units.sort(key=lambda u: u["number"])
    validate(units)
    if errors:
        print("\n".join("✗ " + e for e in errors)); sys.exit(1)
    data = {
        "meta": {
            "title": "Ngữ pháp Tiếng Anh 6 – Global Success",
            "grade": 6, "textbook": "Tiếng Anh 6 Global Success",
            "version": "1.0.0", "generatedAt": datetime.date.today().isoformat(),
            "source": "Công phá ngữ pháp và bài tập Tiếng Anh 6 (Tập 1 & 2)",
            "exerciseTypes": ["mcq", "gap", "reorder", "rewrite", "error", "classify", "cloze"],
        },
        "units": units,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    n_sets = sum(len(u["exerciseSets"]) for u in units)
    n_items = sum(len(s["items"]) if s["type"] != "cloze" else s["items"][0]["blankCount"]
                  for u in units for s in u["exerciseSets"])
    print(f"✓ {len(units)} unit · {sum(len(u['grammarPoints']) for u in units)} điểm ngữ pháp · "
          f"{n_sets} bộ bài · {n_items} câu/chỗ trống → {OUT.relative_to(ROOT)}")
    for u in units:
        c = {}
        for s in u["exerciseSets"]:
            c[s["type"]] = c.get(s["type"], 0) + (len(s["items"]) if s["type"] != "cloze" else s["items"][0]["blankCount"])
        print(f"  Unit {u['number']:>2}: {sum(c.values()):>3} câu  {c}")

if __name__ == "__main__":
    main()
