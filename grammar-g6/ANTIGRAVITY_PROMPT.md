# Prompt cho Antigravity – Tính năng "Ngữ pháp Tiếng Anh 6"

> Cách dùng: chép toàn bộ thư mục `grammar-g6/` vào repo, rồi dán phần **PROMPT** bên dưới vào Antigravity (Agent Manager / chat). Agent sẽ đọc các file được nhắc tên và tích hợp vào app hiện có.

---

## PROMPT

Bạn là kỹ sư frontend/fullstack. Hãy thêm module **"Ngữ pháp Tiếng Anh 6"** (sách Global Success, 12 Unit) vào app hiện tại của tôi. Dùng đúng stack, router, hệ thống UI component và cách quản lý state mà dự án đang dùng — không thêm framework mới.

### Tài nguyên có sẵn trong `grammar-g6/` (KHÔNG tự sửa nội dung)
- `data/grammar_g6.json` — toàn bộ nội dung: 12 Unit → `grammarPoints` (lý thuyết) + `exerciseSets` (bài tập có đáp án & giải thích tiếng Việt).
- `src/types.ts` — kiểu dữ liệu TypeScript, khớp 1:1 với JSON. Dùng làm nguồn sự thật.
- `src/answerChecker.ts` — hàm `normalize()`, `check()`, `score()`. **Bắt buộc dùng hàm này để chấm**, không viết logic chấm riêng.
- `src/answerChecker.test.ts` — test chạy trên toàn bộ dữ liệu (`npx tsx src/answerChecker.test.ts`). Phải luôn pass.
- `demo/index.html` — prototype chạy được, dùng làm **tham chiếu hành vi & luồng UX** (không copy nguyên CSS).
- `content/*.txt` + `tools/build.py` — nguồn soạn thảo; giáo viên sửa ở đây rồi chạy `python3 tools/build.py` để sinh lại JSON.

### Màn hình cần làm
1. **Danh sách Unit** – lưới 12 thẻ: số Unit, tên EN, các chủ điểm ngữ pháp (`grammarPoints[].title`), thanh tiến độ = số bộ bài đạt ≥ 80% / tổng bộ bài.
2. **Chi tiết Unit** – 2 tab:
   - **Lý thuyết**: hiển thị từng `grammarPoint` → `sections` → `blocks`. Mỗi loại block có kiểu riêng:
     `rule` (gạch đầu dòng) · `formula` (khối nổi bật, font mono) · `example` (EN đậm + VI nhỏ, nút loa đọc phần EN bằng Web Speech API `en-GB`, bỏ qua nếu thiết bị không hỗ trợ) · `mistake` (✗ câu sai gạch ngang → ✓ câu đúng) · `tip` (tô highlight).
   - **Luyện tập**: danh sách `exerciseSets` — tiêu đề, nhãn dạng bài, ★ độ khó (`level` 1–5), số câu, điểm cao nhất. Cuối danh sách có nút **"Kiểm tra nhanh"**: 12 câu ngẫu nhiên từ các bộ không phải `cloze` của Unit.
3. **Trình làm bài** – một câu mỗi màn, thanh tiến trình, nút Thoát. Sau khi nộp: hiện Đúng/Sai/Đúng một phần, đáp án mẫu, `explanation`, link **"Xem lại lý thuyết"** mở đúng `grammarPointId` rồi quay lại câu đang làm.
4. **Kết quả** – % điểm, danh sách câu sai kèm đáp án, nút Làm lại / Quay lại.
5. **Sổ lỗi sai** – tập hợp mọi câu học sinh làm sai (lưu `itemId`), có nút "Luyện lại" (tối đa 15 câu ngẫu nhiên). Làm đúng → tự xoá khỏi sổ. Huy hiệu số câu sai trên thanh tiêu đề.

### Component cho 7 dạng bài (`ExerciseSet.type`)
| type | UI | Dữ liệu dùng | Cách nộp |
|---|---|---|---|
| `mcq` | Nút A/B/C/D (hoặc 2 nút) | `prompt` (`___` hiển thị gạch chân), `options`, `answerIndex` | Chạm là nộp |
| `classify` | Thẻ từ + nút nhóm | `text`, `context?`, `set.categories`, `category` | Chạm là nộp |
| `gap` | Ô nhập inline thay cho mỗi `___` | `blanks[i].accept` | Nút Kiểm tra (bật khi điền đủ), Enter |
| `rewrite` | Textarea | `prompt`, `accept` | Nút Kiểm tra, Enter |
| `reorder` | Thẻ từ xáo trộn → chạm để xếp vào khay; chạm lại để bỏ | `tokens`, `accept`, `endPunct` | Khi dùng hết thẻ |
| `error` | B1: chạm vào 1 từ trong `tokens`; B2: ô "Sửa thành…" | `errorStart..errorEnd`, `fix`, `corrected` | Chấm 2 phần: vị trí + cách sửa (mỗi phần 50%) |
| `cloze` | Đoạn văn, chỗ trống `mode:"input"` = ô nhập, `mode:"select"` = dropdown `options` | `segments` | Chấm từng chỗ, điểm theo tỉ lệ |

Nếu set có `instruction` (ngân hàng từ, bảng dữ liệu) thì hiện ở khung ghi chú phía trên câu hỏi; ký tự ` | ` trong instruction là xuống dòng.

### Quy tắc chấm (đã có trong `answerChecker.ts`)
- Không phân biệt hoa/thường, dấu nháy cong/thẳng, dấu câu cuối, khoảng trắng thừa.
- Dạng rút gọn = dạng đầy đủ: `doesn't = does not`, `it's = it is`, `can't = cannot`, `won't = will not`…
- **Giữ** dấu sở hữu: `Lan's ≠ Lans`, `teachers' ≠ teachers`, `its ≠ it's`.
- Ô nhập: tắt autocorrect/autocapitalize/spellcheck trên mobile để không lộ đáp án và không tự sửa chính tả.

### Lưu tiến độ
- Dùng tầng lưu trữ hiện có của app (backend/user profile). Nếu chưa có: localStorage, key `g6-grammar-progress-v1`, bọc try/catch.
- Lưu: `AttemptRecord` cho mỗi lần trả lời, `SetProgress.bestScore` theo `setId`, danh sách `itemId` trong sổ lỗi sai. ID trong JSON là ổn định — dùng làm khoá.
- (Tuỳ chọn) Màn giáo viên: thống kê tỉ lệ đúng theo `itemId`/`grammarPointId` để biết điểm ngữ pháp lớp yếu.

### Yêu cầu chất lượng
- Mobile-first (≥ 360px), không cuộn ngang; hỗ trợ dark mode của app; thao tác bàn phím được (Tab/Enter); vùng chạm ≥ 44px.
- Không gọi API ngoài để chấm; toàn bộ chạy offline với JSON.
- Lazy-load JSON (≈ 450 KB, ~210 KB minified) khi vào module.
- Viết unit test cho từng component dạng bài với ít nhất 1 câu đúng + 1 câu sai lấy từ JSON; giữ `answerChecker.test.ts` pass.

### Thứ tự thực hiện
1. Đọc `src/types.ts`, `data/grammar_g6.json` (xem 1 Unit), `demo/index.html` để nắm luồng.
2. Copy `types.ts` + `answerChecker.ts` vào thư mục lib của dự án; tạo data loader.
3. Làm route + màn Danh sách Unit → Chi tiết Unit (Lý thuyết).
4. Làm Trình làm bài với 7 component dạng bài, rồi Kết quả, Sổ lỗi sai.
5. Lưu tiến độ, test, kiểm tra trên viewport 375px.

---

## Thống kê nội dung (v1.0.0)

12 Unit · 29 điểm ngữ pháp · 104 bộ bài · 873 câu/chỗ trống

| Unit | Chủ điểm ngữ pháp |
|---|---|
| 1 My New School | Present simple · -s/-es (chính tả + phát âm) · Adverbs of frequency |
| 2 My House | Possessive case · Prepositions of place · There is/are + some/any |
| 3 My Friends | Present continuous · Quy tắc -ing · Hiện tại đơn vs tiếp diễn |
| 4 My Neighbourhood | Comparative (ngắn, dài, bất quy tắc, less/much/a little) · câu hỏi so sánh |
| 5 Natural Wonders of Viet Nam | Countable/uncountable · Plural nouns · How many/much · đơn vị đo · must/mustn't |
| 6 Our Tet Holiday | Should/shouldn't · Some/any |
| 7 Television | Wh-questions · and/but/so |
| 8 Sports and Games | Past simple (was/were, V-ed, bất quy tắc) · Imperatives |
| 9 Cities of the World | Possessive adjectives · Possessive pronouns · Whose |
| 10 Our Houses in the Future | Will/won't · Might/might not |
| 11 Our Greener World | Articles a/an/the/Ø · First conditional |
| 12 Robots | Superlative (in/of) · Can/can't |

## Bổ sung / sửa nội dung

Mở `content/uXX-YY.txt`, thêm dòng theo mẫu trong đầu file `tools/build.py`, ví dụ:

```
@set mcq | Chọn đáp án đúng | level=1 | gp=u1-present-simple
Nam ___ to school by bike. => go | *goes | going | gone || Nam (số ít) → goes.
```

Rồi chạy:
```
python3 tools/build.py          # kiểm tra + sinh data/grammar_g6.json
npx tsx src/answerChecker.test.ts
python3 tools/build_demo.py     # (tuỳ chọn) cập nhật demo
```
`build.py` tự báo lỗi nếu: MCQ không có đúng 1 dấu `*`, số `___` khác số đáp án, câu sắp xếp dùng sai bộ từ, cụm sai không có trong câu, thiếu giải thích…
