#!/usr/bin/env python3
"""Nhúng data/grammar_g6.json vào demo/template.html -> demo/index.html"""
import json
from pathlib import Path
R = Path(__file__).resolve().parent.parent
data = json.loads((R / "data/grammar_g6.json").read_text(encoding="utf-8"))
blob = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
html = (R / "demo/template.html").read_text(encoding="utf-8").replace("/*__DATA__*/null", blob)
(R / "demo/index.html").write_text(html, encoding="utf-8")
print("✓ demo/index.html", len(html) // 1024, "KB")
