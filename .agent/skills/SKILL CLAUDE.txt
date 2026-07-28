# CLAUDE SKILLS — Toàn Bộ Nội Dung Prompt/SKILL.md
## Hướng Dẫn Từng Bước Dành Cho Người Mới

> **Tổng hợp ngày:** 20/03/2026  
> **Nguồn:** Hệ thống Skills trong Claude.ai (Computer Use environment)

---

## 📋 MỤC LỤC

1. [Tổng Quan Hệ Thống Skills](#1-tổng-quan-hệ-thống-skills)
2. [Skill: DOCX (Word Documents)](#2-skill-docx)
3. [Skill: PDF Processing](#3-skill-pdf)
4. [Skill: PPTX (PowerPoint)](#4-skill-pptx)
5. [Skill: XLSX (Excel/Spreadsheets)](#5-skill-xlsx)
6. [Skill: Frontend Design](#6-skill-frontend-design)
7. [Skill: File Reading](#7-skill-file-reading)
8. [Skill: PDF Reading](#8-skill-pdf-reading)
9. [Skill: Product Self-Knowledge](#9-skill-product-self-knowledge)
10. [Skill: Edu App Builder (User Custom)](#10-skill-edu-app-builder)
11. [Skill: Skill Creator (Example)](#11-skill-skill-creator)

---

## 1. TỔNG QUAN HỆ THỐNG SKILLS

### Skills là gì?

Skills là các **thư mục chứa best practices** (SKILL.md + scripts/resources) mà Claude đọc trước khi thực hiện tác vụ. Mỗi skill có:

- **YAML frontmatter**: `name`, `description` — dùng để trigger (kích hoạt) skill
- **SKILL.md body**: Hướng dẫn chi tiết cách thực hiện
- **Bundled resources** (optional): scripts, references, assets

### Cấu trúc thư mục

```
/mnt/skills/
├── public/          # Skills hệ thống (Anthropic cung cấp)
│   ├── docx/
│   ├── pdf/
│   ├── pptx/
│   ├── xlsx/
│   ├── frontend-design/
│   ├── file-reading/
│   ├── pdf-reading/
│   └── product-self-knowledge/
├── user/            # Skills do user tạo
│   └── edu-app-builder/
└── examples/        # Skills mẫu
    └── skill-creator/
```

### Cách Claude sử dụng Skills

1. User gửi yêu cầu
2. Claude kiểm tra `available_skills` → match description với yêu cầu
3. Claude đọc SKILL.md tương ứng bằng `view` tool
4. Claude thực hiện theo hướng dẫn trong SKILL.md

---

## 2. SKILL: DOCX

**File:** `/mnt/skills/public/docx/SKILL.md`

**Trigger khi:** User mention 'Word doc', '.docx', tạo report/memo/letter, chỉnh sửa tracked changes, comments trong Word.

### Quick Reference

| Task | Approach |
|------|----------|
| Read/analyze content | `pandoc` hoặc unpack raw XML |
| Create new document | `docx-js` (npm install -g docx) |
| Edit existing document | Unpack → edit XML → repack |

### Tạo Document Mới (docx-js)

```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat, ExternalHyperlink,
        InternalHyperlink, Bookmark, FootnoteReferenceRun, PositionalTab,
        PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
        TabStopType, TabStopPosition, Column, SectionType,
        TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, PageBreak } = require('docx');

const doc = new Document({ sections: [{ children: [/* content */] }] });
Packer.toBuffer(doc).then(buffer => fs.writeFileSync("doc.docx", buffer));
```

### Page Size (DXA units, 1440 DXA = 1 inch)

| Paper | Width | Height | Content Width (1" margins) |
|-------|-------|--------|---------------------------|
| US Letter | 12,240 | 15,840 | 9,360 |
| A4 (default) | 11,906 | 16,838 | 9,026 |

### Styles

```javascript
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
    ]
  },
  sections: [{ children: [...] }]
});
```

### Lists (NEVER use unicode bullets)

```javascript
// ❌ WRONG
new Paragraph({ children: [new TextRun("• Item")] })

// ✅ CORRECT
const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    children: [
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Bullet item")] }),
    ]
  }]
});
```

### Tables (CRITICAL: cần dual widths)

```javascript
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [4680, 4680],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          borders,
          width: { size: 4680, type: WidthType.DXA },
          shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun("Cell")] })]
        })
      ]
    })
  ]
})
```

### Chỉnh sửa Document có sẵn

**Bước 1: Unpack**
```bash
python scripts/office/unpack.py document.docx unpacked/
```

**Bước 2: Edit XML** (dùng str_replace tool, KHÔNG viết Python scripts)

**Bước 3: Pack**
```bash
python scripts/office/pack.py unpacked/ output.docx --original document.docx
```

### Tracked Changes XML

```xml
<!-- Insertion -->
<w:ins w:id="1" w:author="Claude" w:date="2025-01-01T00:00:00Z">
  <w:r><w:t>inserted text</w:t></w:r>
</w:ins>

<!-- Deletion -->
<w:del w:id="2" w:author="Claude" w:date="2025-01-01T00:00:00Z">
  <w:r><w:delText>deleted text</w:delText></w:r>
</w:del>
```

### Critical Rules

- **Set page size explicitly** — defaults A4
- **Never use `\n`** — dùng Paragraph riêng
- **Never use unicode bullets** — dùng LevelFormat.BULLET
- **Always use WidthType.DXA** cho tables (PERCENTAGE breaks Google Docs)
- **Tables need dual widths** — columnWidths + cell width
- **Use ShadingType.CLEAR** — never SOLID
- **Never use tables as dividers/rules**
- **TOC requires HeadingLevel only**

---

## 3. SKILL: PDF

**File:** `/mnt/skills/public/pdf/SKILL.md`

**Trigger khi:** Bất kỳ thao tác nào với PDF — read, merge, split, rotate, watermark, create, fill forms, encrypt/decrypt, extract images, OCR.

### Quick Start

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("document.pdf")
print(f"Pages: {len(reader.pages)}")
text = ""
for page in reader.pages:
    text += page.extract_text()
```

### Merge PDFs

```python
writer = PdfWriter()
for pdf_file in ["doc1.pdf", "doc2.pdf"]:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)
with open("merged.pdf", "wb") as output:
    writer.write(output)
```

### Extract Tables

```python
import pdfplumber
with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                print(row)
```

### Create PDF (reportlab)

```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate("report.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []
story.append(Paragraph("Report Title", styles['Title']))
doc.build(story)
```

**IMPORTANT:** Never use Unicode subscript/superscript characters trong ReportLab — dùng `<sub>` và `<super>` tags.

### Command-Line Tools

```bash
pdftotext input.pdf output.txt          # Extract text
pdftotext -layout input.pdf output.txt  # Preserve layout
qpdf --empty --pages f1.pdf f2.pdf -- merged.pdf  # Merge
qpdf input.pdf --pages . 1-5 -- pages1-5.pdf      # Split
```

### Quick Reference

| Task | Best Tool |
|------|-----------|
| Merge PDFs | pypdf |
| Split PDFs | pypdf |
| Extract text | pdfplumber |
| Extract tables | pdfplumber |
| Create PDFs | reportlab |
| OCR scanned PDFs | pytesseract |
| Fill PDF forms | pdf-lib hoặc pypdf (xem FORMS.md) |

---

## 4. SKILL: PPTX

**File:** `/mnt/skills/public/pptx/SKILL.md`

**Trigger khi:** Bất kỳ thao tác nào với .pptx — tạo slides, đọc, chỉnh sửa, extract text.

### Quick Reference

| Task | Guide |
|------|-------|
| Read/analyze | `python -m markitdown presentation.pptx` |
| Edit/template | Đọc editing.md |
| Create scratch | Đọc pptxgenjs.md |

### Design Ideas (QUAN TRỌNG)

**Trước khi bắt đầu:**
- Pick bold, content-informed color palette
- Dominance over equality (60-70% visual weight cho 1 màu)
- Dark/light contrast (sandwich structure)
- Commit to a visual motif

**Color Palettes:**

| Theme | Primary | Secondary | Accent |
|-------|---------|-----------|--------|
| Midnight Executive | `1E2761` | `CADCFC` | `FFFFFF` |
| Forest & Moss | `2C5F2D` | `97BC62` | `F5F5F5` |
| Coral Energy | `F96167` | `F9E795` | `2F3C7E` |
| Warm Terracotta | `B85042` | `E7E8D1` | `A7BEAE` |
| Ocean Gradient | `065A82` | `1C7293` | `21295C` |
| Charcoal Minimal | `36454F` | `F2F2F2` | `212121` |

**Typography:**

| Element | Size |
|---------|------|
| Slide title | 36-44pt bold |
| Section header | 20-24pt bold |
| Body text | 14-16pt |
| Captions | 10-12pt muted |

### Avoid (Common Mistakes)

- Don't repeat same layout
- Don't center body text — left-align
- Don't default to blue
- Don't create text-only slides
- **NEVER use accent lines under titles** (hallmark of AI-generated slides)

### QA (Bắt buộc)

1. Content QA: `python -m markitdown output.pptx`
2. Visual QA: Convert to images → Inspect
3. Fix → Re-verify → Repeat

```bash
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

---

## 5. SKILL: XLSX

**File:** `/mnt/skills/public/xlsx/SKILL.md`

**Trigger khi:** Bất kỳ thao tác spreadsheet — tạo/đọc/edit .xlsx/.csv/.tsv, formatting, charting, cleaning data.

### Requirements

- Font: Arial hoặc Times New Roman
- Zero formula errors
- **CRITICAL: Use Excel formulas, NOT hardcoded values**

### Financial Model Color Coding

| Color | Meaning |
|-------|---------|
| Blue text (0,0,255) | Hardcoded inputs |
| Black text (0,0,0) | Formulas/calculations |
| Green text (0,128,0) | Links from other worksheets |
| Red text (255,0,0) | External links |
| Yellow background | Key assumptions |

### Workflow

```python
# Tạo mới
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet = wb.active
sheet['A1'] = 'Hello'
sheet['B2'] = '=SUM(A1:A10)'  # ✅ Dùng formula
sheet['A1'].font = Font(bold=True, color='FF0000')
wb.save('output.xlsx')

# Recalculate (BẮT BUỘC nếu có formulas)
# python scripts/recalc.py output.xlsx
```

### ❌ WRONG vs ✅ CORRECT

```python
# ❌ WRONG
total = df['Sales'].sum()
sheet['B10'] = total  # Hardcodes 5000

# ✅ CORRECT
sheet['B10'] = '=SUM(B2:B9)'
```

---

## 6. SKILL: FRONTEND DESIGN

**File:** `/mnt/skills/public/frontend-design/SKILL.md`

**Trigger khi:** Build web components, pages, dashboards, React components, HTML/CSS layouts.

### Design Thinking

Trước khi code:
- **Purpose**: Interface giải quyết vấn đề gì?
- **Tone**: Brutally minimal, maximalist, retro-futuristic, luxury, playful...
- **Differentiation**: Cái gì làm nó UNFORGETTABLE?

### Aesthetics Guidelines

- **Typography**: Beautiful, unique fonts — AVOID Arial, Inter, Roboto
- **Color**: CSS variables, dominant colors with sharp accents
- **Motion**: CSS animations, scroll-triggering, hover states
- **Spatial Composition**: Asymmetry, overlap, grid-breaking
- **Backgrounds**: Gradient meshes, noise textures, geometric patterns

### NEVER

- Generic AI aesthetics (purple gradients on white)
- Overused fonts (Inter, Roboto, Arial)
- Cookie-cutter layouts
- Same design across generations

---

## 7. SKILL: FILE READING

**File:** `/mnt/skills/public/file-reading/SKILL.md`

**Trigger khi:** File uploaded nhưng content KHÔNG có trong context — chỉ có path tại `/mnt/user-data/uploads/`.

### Dispatch Table

| Extension | First Move | Dedicated Skill |
|-----------|-----------|----------------|
| .pdf | Content inventory | pdf-reading |
| .docx | `pandoc` to markdown | docx |
| .xlsx/.xlsm | openpyxl sheet names + head | xlsx |
| .csv/.tsv | pandas với nrows | — |
| .json/.jsonl | jq for structure | — |
| .jpg/.png | Already in context as vision | — |
| .zip/.tar | List contents, KHÔNG auto-extract | — |
| .txt/.md/code | wc -c then head or cat | — |

### Protocol

1. **Look at extension** — dispatch key
2. **Stat before read** — large files need sampling
3. **Read just enough** — answer the question
4. **If dedicated skill exists, go read it**

---

## 8. SKILL: PDF READING

**File:** `/mnt/skills/public/pdf-reading/SKILL.md`

**Trigger khi:** Cần đọc, inspect, extract content từ PDF — đặc biệt khi file content KHÔNG có trong context.

### Content Inventory (Luôn chạy trước)

```bash
pdfinfo document.pdf                          # Page count, metadata
pdftotext -f 1 -l 1 document.pdf - | head -20 # Text extractable?
pdfimages -list document.pdf                   # Embedded images
pdfdetach -list document.pdf                   # Attachments
pdffonts document.pdf                          # Font status
```

### Reading Strategy

| Document Type | Strategy |
|--------------|----------|
| Text-heavy (reports) | Text extraction primary |
| Scanned | Rasterize 150 DPI + OCR |
| Slide-deck PDFs | Rasterize individual pages |
| Form-heavy | Extract form fields programmatically |
| Data-heavy (tables) | pdfplumber for tables |

### Visual Inspection

```bash
pdftoppm -jpeg -r 150 -f 3 -l 3 document.pdf /tmp/page
ls /tmp/page-*.jpg
```

### Token Cost

| Method | ~Tokens/page |
|--------|-------------|
| Text extraction | 200-400 |
| Rasterized image | ~1,600 |
| Both | ~2,000-2,400 |

---

## 9. SKILL: PRODUCT SELF-KNOWLEDGE

**File:** `/mnt/skills/public/product-self-knowledge/SKILL.md`

**Trigger khi:** Response cần facts cụ thể về Anthropic products — Claude Code, Claude API, Claude.ai.

### Question Routing

| Product | Resource |
|---------|----------|
| Claude API | https://docs.claude.com/en/docs_site_map.md |
| Claude Code | https://docs.anthropic.com/en/docs/claude-code/claude_code_docs_map.md |
| Claude.ai | https://support.claude.com |

### Workflow

1. Identify product (API, Code, or Claude.ai?)
2. Use right resource
3. Verify details
4. Provide answer + source link
5. If uncertain → direct to docs

---

## 10. SKILL: EDU APP BUILDER (User Custom)

**File:** `/mnt/skills/user/edu-app-builder/SKILL.md`

**Trigger khi:** Build, fix, refactor app giáo dục — quiz, flashcard, bài giảng, portal, gamification.

### Vai trò: 4-in-1

1. Frontend Developer
2. Instructional Designer
3. Accessibility Auditor
4. Code Reviewer

### Tư duy trước khi code

1. **Đối tượng**: Trẻ em? Thiếu niên? Người lớn? Giáo viên?
2. **Mục tiêu**: Ghi nhớ? Hiểu sâu? Thực hành? Theo dõi tiến độ?
3. **Platform**: Web? Mobile? Cả hai?

### TypeScript Types chuẩn

```typescript
export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'ordering';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string; // QUAN TRỌNG: luôn có giải thích
  hint?: string;
  difficulty: 1 | 2 | 3;
}

export interface GamificationState {
  totalXP: number;
  level: number;
  badges: Badge[];
  streak: number;
  rank?: number;
}
```

### Spaced Repetition (SM-2)

```typescript
export const calculateNextReview = (
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  easiness: number,
  interval: number,
  repetition: number
) => {
  if (quality < 3) return { nextInterval: 1, repetition: 0, easiness };
  
  const newEasiness = Math.max(1.3, 
    easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );
  
  let nextInterval: number;
  if (repetition === 0) nextInterval = 1;
  else if (repetition === 1) nextInterval = 6;
  else nextInterval = Math.round(interval * newEasiness);
  
  return { nextInterval, repetition: repetition + 1, easiness: newEasiness };
};
```

### Accessibility Checklist (BẮT BUỘC)

- [ ] Tất cả buttons/inputs có `aria-label`
- [ ] Màu đúng/sai KHÔNG chỉ dựa vào màu (thêm icon ✓/✗)
- [ ] `aria-live="polite"` cho kết quả quiz
- [ ] Keyboard navigation đầy đủ
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Font size ≥ 16px (giáo dục cần 18px+)

### Code Review Checklist

- [ ] Quiz có explanation?
- [ ] Progress persist (Firebase/localStorage)?
- [ ] Passing score hợp lý (70-80%)?
- [ ] Mobile buttons ≥ 44x44px?
- [ ] Error handling khi mất kết nối?

---

## 11. SKILL: SKILL CREATOR (Example)

**File:** `/mnt/skills/examples/skill-creator/SKILL.md`

**Trigger khi:** Tạo skill mới, modify/improve skill, run evals, benchmark, optimize description.

### Core Loop

1. **Decide** what skill should do
2. **Draft** the skill (SKILL.md)
3. **Test** — run claude-with-skill on test prompts
4. **Evaluate** — qualitative (human review) + quantitative (evals)
5. **Rewrite** based on feedback
6. **Repeat** until satisfied
7. **Expand** test set, try larger scale

### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/
    ├── references/
    └── assets/
```

### Progressive Disclosure (3 levels)

1. **Metadata** (name + description) — ~100 words, always in context
2. **SKILL.md body** — <500 lines ideal
3. **Bundled resources** — as needed, unlimited

### Key Principles

- **Description** là primary triggering mechanism — cần "pushy" (hơi mạnh) để tránh undertrigger
- **SKILL.md** nên < 500 lines
- **Reference files** có TOC nếu > 300 lines
- **Capture intent** trước → Interview → Write SKILL.md → Test → Iterate

### Description Optimization

Chạy script tối ưu description (chỉ hoạt động với Claude Code CLI):

```bash
python -m scripts.run_loop \
  --eval-set <path-to-trigger-eval.json> \
  --skill-path <path-to-skill> \
  --model <model-id> \
  --max-iterations 5
```

---

## 📝 GHI CHÚ QUAN TRỌNG

### Filesystem

- **User uploads:** `/mnt/user-data/uploads/` (read-only)
- **Working directory:** `/home/claude/` (read/write)
- **Final outputs:** `/mnt/user-data/outputs/` (để user download)
- **Skills:** `/mnt/skills/` (read-only)

### Quy trình tạo file

1. Đọc SKILL.md trước khi bắt đầu
2. Làm việc trong `/home/claude/`
3. Copy kết quả cuối cùng vào `/mnt/user-data/outputs/`
4. Dùng `present_files` tool để share cho user

### Network

- Egress có thể bị disable (tùy config)
- Nếu network disabled → không thể npm install, pip install từ internet

---

*Tài liệu này tổng hợp toàn bộ nội dung SKILL.md từ hệ thống Claude Skills tính đến 20/03/2026.*
