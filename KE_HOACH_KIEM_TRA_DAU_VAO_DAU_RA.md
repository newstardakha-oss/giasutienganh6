# Kế hoạch: Bài kiểm tra đầu vào – đầu ra để đo hiệu quả app

> Dùng cho Antigravity: dán phần **PROMPT** ở cuối file. Agent cần đọc file này cùng `grammar-g6/data/test_forms.json`.
> Đi kèm: `grammar-g6/tools/build_tests.py` (sinh lại đề khi nội dung thay đổi).

---

## 1. Mục tiêu

Trả lời câu hỏi: **"Học sinh lớp 6 luyện tập trên app Gia Sư AI Lớp 6 có tiến bộ về ngữ pháp – từ vựng Tiếng Anh nhiều hơn học sinh học theo cách thông thường không?"**

Kết quả dùng cho: sáng kiến kinh nghiệm, đề tài nghiên cứu khoa học sư phạm ứng dụng (NCKHSPƯD), báo cáo tổ/trường, hồ sơ KHKT.

## 2. Thiết kế nghiên cứu

**Thiết kế:** kiểm tra trước và sau tác động với hai nhóm tương đương. Đây là thiết kế thường dùng trong NCKHSPƯD.

| | Nhóm thực nghiệm (TN) | Nhóm đối chứng (ĐC) |
|---|---|---|
| Lớp | 1–2 lớp 6 | 1–2 lớp 6 có sĩ số và học lực tương đương |
| Kiểm tra trước (đầu vào) | Đề A trên app | Đề A trên app |
| Tác động | Học trên lớp như bình thường **+ luyện trên app** ≥ 3 buổi/tuần × 15 phút | Học trên lớp như bình thường, **không dùng phần luyện tập** của app |
| Kiểm tra sau (đầu ra) | Đề A (cùng đề) | Đề A (cùng đề) |
| Dự phòng | Đề B dùng cho thi bù hoặc kiểm tra duy trì sau 4–6 tuần | Đề B |

- Nên chọn hai nhóm do **cùng một giáo viên dạy**, để loại ảnh hưởng của người dạy. Nếu không phải lớp mình dạy, cần phối hợp với giáo viên dạy khối 6.
- Kiểm tra trước và sau dùng **cùng một đề**. App không hiện đáp án sau khi làm, đảo thứ tự câu và phương án, và hai lần cách nhau 3–4 tháng. Nhờ vậy học sinh không nhớ được đề, và điểm hai lần so sánh trực tiếp được với nhau.
- Câu hỏi trong đề **bị loại khỏi phần luyện tập** (danh sách `reservedItemIds`), để học sinh không làm trước đúng câu sẽ kiểm tra.

### Lịch đề xuất (năm học 2026–2027)

| Thời gian | Việc |
|---|---|
| Tháng 11–12/2026 | **Thử nghiệm hệ thống:** cho 1–2 lớp làm Đề HK1-A. Kiểm tra trục trặc kỹ thuật, độ tin cậy của đề và câu hỏi lỗi. Thu phiếu đồng ý của phụ huynh |
| Tuần đầu HK2 (01/2027), trước khi dạy Unit 7 | **Kiểm tra đầu vào:** Đề HK2-A cho cả nhóm TN và ĐC |
| 01–04/2027 | Tác động: nhóm TN luyện trên app. App ghi lại thời gian và số bài đã làm |
| Sau khi dạy xong Unit 12 (khoảng đầu 05/2027) | **Kiểm tra đầu ra:** Đề HK2-A |
| 2–3 tuần sau (tuỳ chọn) | Kiểm tra duy trì bằng Đề HK2-B |

### Cách phân tích (app tự tính)

1. **Kiểm tra hai nhóm tương đương ở đầu vào:** phép kiểm chứng T-test độc lập, so điểm kiểm tra trước của TN và ĐC. **p > 0,05** nghĩa là hai nhóm tương đương.
2. **Kết quả sau tác động:** T-test độc lập, so điểm kiểm tra sau. **p ≤ 0,05** nghĩa là chênh lệch có ý nghĩa, không phải do ngẫu nhiên.
3. **Mức độ ảnh hưởng:** SMD = (Điểm TB của TN − Điểm TB của ĐC) / Độ lệch chuẩn của ĐC, tính trên điểm kiểm tra sau.
   Thang đánh giá: < 0,2 rất nhỏ · 0,2–0,49 nhỏ · 0,5–0,79 trung bình · 0,8–1,0 lớn · > 1,0 rất lớn.
4. **Tiến bộ trong từng nhóm:** T-test phụ thuộc (cặp), so điểm trước và sau của cùng học sinh.
5. **Độ tin cậy của đề:** chia đôi theo câu chẵn và câu lẻ, áp dụng công thức Spearman-Brown. Kết quả **≥ 0,7** là đề đáng tin cậy.
6. **Phân tích từng câu hỏi:** độ khó (% học sinh làm đúng) và độ phân biệt (so nhóm 27% điểm cao nhất với 27% điểm thấp nhất). Đánh dấu câu quá dễ (> 90% đúng), quá khó (< 20% đúng) hoặc phân biệt kém (< 0,2).
7. **Tiến bộ theo điểm ngữ pháp:** % đúng trước và sau của từng điểm ngữ pháp, tách theo nhóm. Đây là phần cho thấy app giúp các em tiến bộ ở mảng nào.

## 3. Bộ đề đã dựng sẵn – `data/test_forms.json`

| Đề | Số câu | Thời gian | Phạm vi |
|---|---|---|---|
| hk1-A, hk1-B | 40 | 40 phút | Unit 1–6, phủ 16/17 điểm ngữ pháp + từ vựng |
| hk2-A, hk2-B | 40 | 40 phút | Unit 7–12, phủ 12/12 điểm ngữ pháp + từ vựng |

Mỗi đề gồm **32 câu ngữ pháp** (trắc nghiệm, điền một chỗ trống, sắp xếp câu) và **8 câu từ vựng** (chọn từ đúng nghĩa). Mỗi câu 0,25 điểm, tổng 10 điểm.

- Đề A và Đề B **tương đương**: cùng số câu mỗi dạng, cùng số câu mỗi Unit và mỗi điểm ngữ pháp. Câu được chia theo từng cặp cùng điểm ngữ pháp và cùng mức độ khó.
- Mỗi câu có sẵn `id`, `unit`, `skill`, `grammarPointId`, đáp án và giải thích. Giải thích chỉ dùng cho giáo viên, không hiện cho học sinh.
- Câu từ vựng được sinh tự động từ dữ liệu từ vựng của app. **Giáo viên nên đọc lại cả 4 đề trước khi dùng**, có thể đổi câu trong trang "Xem trước đề".
- Muốn sinh lại đề: `python3 grammar-g6/tools/build_tests.py`. Kết quả cố định theo `seed`, nên chạy lại vẫn ra cùng một đề.

## 4. Chức năng cần xây dựng

### 4.1 Dữ liệu (Firestore – làm cùng đợt chuyển lên Firebase)

```
testForms/{formId}           ← nạp từ test_forms.json (chỉ admin ghi)
testRounds/{roundId}         đợt kiểm tra
  name, formId, kind: "pre" | "post" | "retention" | "pilot",
  schoolId, classes: [{className, group: "TN" | "DC"}],
  openAt, closeAt, durationMin (mặc định 40), showScoreAfterSubmit (mặc định true),
  status: "draft" | "open" | "closed", createdBy, createdAt
testAttempts/{attemptId}
  roundId, formId, studentId, schoolId, className, group,
  itemOrder: [itemId...], optionOrder: {itemId: [..]},      ← xáo trộn riêng cho từng em
  responses: {itemId: {answer, correct, answeredAt, timeSec}},
  status: "in_progress" | "submitted" | "auto_submitted" | "voided",
  startedAt, submittedAt, durationSec, rawCorrect, score10,
  bySkill: {grammar, vocab}, byGrammarPoint: {gpId: {correct, total}},
  tabSwitchCount, device, voidReason?
classSettings/{schoolId_className}
  researchGroup: "TN" | "DC" | null,
  practiceLocked: boolean          ← true cho nhóm đối chứng trong thời gian nghiên cứu
```

Security Rules:
- Học sinh chỉ tạo và sửa attempt của chính mình khi đợt đang mở, và không sửa được sau khi đã nộp.
- Học sinh **không đọc được** đáp án: `answerIndex`, `blanks.accept`, `accept`. Bản đề gửi cho học sinh phải được lọc bỏ đáp án, và việc chấm điểm chạy trên máy chủ (Cloud Function `submitTestAttempt`).
- Giáo viên đọc được attempts của trường mình.

### 4.2 Giáo viên – trang "Kiểm tra đầu vào/đầu ra"

1. **Xem trước đề:** xem 40 câu kèm đáp án, có thể đổi một câu bằng câu khác cùng điểm ngữ pháp và cùng dạng.
2. **Tạo đợt kiểm tra:** chọn đề, loại đợt (đầu vào, đầu ra, duy trì, thử nghiệm), chọn lớp và gán nhóm TN/ĐC, đặt giờ mở và đóng, thời gian làm bài.
3. **Theo dõi trực tiếp:** danh sách học sinh với trạng thái Chưa vào / Đang làm (còn mấy phút) / Đã nộp. Có nút "Chiếu mã vào thi" hiện mã QR và đường link lớn.
4. **Huỷ bài và cho làm lại**, chỉ khi có sự cố kỹ thuật. Bắt buộc ghi lý do, và lý do được lưu vào nhật ký.
5. **Cài đặt lớp nghiên cứu:** đánh dấu lớp là TN hay ĐC. Với lớp ĐC, bật "Khoá luyện tập": học sinh vẫn đăng nhập để làm bài kiểm tra, nhưng phần luyện tập bị khoá trong thời gian nghiên cứu.

### 4.3 Học sinh – màn làm bài

- Màn bắt đầu: tên đợt, số câu, thời gian, nội quy ngắn, nút "Bắt đầu làm bài".
- Toàn màn hình, **ẩn menu, header và chatbot AI**. Đồng hồ đếm ngược luôn hiện.
- Xem một câu mỗi lần. Có lưới số câu để nhảy qua lại, câu đã làm được tô màu, có nút "Đánh dấu xem lại".
- **Tự lưu mỗi câu trả lời.** Mất mạng thì lưu tạm trên máy rồi gửi lại khi có mạng. Lỡ đóng trình duyệt thì vào lại làm tiếp, đồng hồ vẫn chạy.
- **Không hiện đúng/sai** trong lúc làm, không có gợi ý, không có nút xem lý thuyết.
- Nộp bài: hỏi xác nhận trong trang (không dùng hộp thoại confirm của trình duyệt), báo số câu chưa làm. Hết giờ thì tự nộp.
- Sau khi nộp: hiện "Em đã nộp bài" và điểm (nếu giáo viên cho phép). **Không hiện đáp án.**
- Ghi lại số lần rời khỏi tab (chỉ ghi lại, không chặn).
- Mỗi đợt mỗi học sinh chỉ làm 1 lần.

### 4.4 Ẩn câu dùng trong đề khỏi phần luyện tập

- Mọi câu có `id` nằm trong `reservedItemIds` **không xuất hiện** ở luyện tập ngữ pháp, Kiểm tra nhanh, Sổ lỗi sai và Đấu tri thức, và không được gửi cho Gia sư AI.
- Thêm test tự động: duyệt toàn bộ bộ bài luyện tập, khẳng định không có `id` nào thuộc `reservedItemIds`.

### 4.5 Trang "Phân tích kết quả"

Bộ lọc: đợt đầu vào, đợt đầu ra, lớp/nhóm. Chỉ tính những học sinh **có đủ cả hai bài**, và hiện số học sinh bị loại kèm lý do.

1. **Bảng tổng hợp** (giống bảng trong SKKN):

| | TN – Trước | ĐC – Trước | TN – Sau | ĐC – Sau |
|---|---|---|---|---|
| Số HS | | | | |
| Mốt / Trung vị | | | | |
| Giá trị trung bình | | | | |
| Độ lệch chuẩn | | | | |
| p (T-test độc lập) | (trước) | | (sau) | |
| SMD | | | | |

2. Câu kết luận tự sinh, ví dụ:
   "Trước tác động p = 0,896 > 0,05: hai nhóm tương đương. Sau tác động p = 0,010 < 0,05: chênh lệch có ý nghĩa. SMD = 1,44: mức độ ảnh hưởng rất lớn."
3. Độ tin cậy của đề (Spearman-Brown), kèm nhận xét đạt hay chưa đạt ngưỡng 0,7.
4. Biểu đồ: cột điểm trung bình trước/sau của hai nhóm; phân bố điểm (histogram); tiến bộ theo từng điểm ngữ pháp (% đúng trước → sau).
5. Phân tích câu hỏi: độ khó, độ phân biệt, cờ cảnh báo, phương án sai được chọn nhiều nhất.
6. Thời lượng học trên app của nhóm TN trong giai đoạn tác động (số phút, số bài) và mối liên hệ với mức tiến bộ (biểu đồ chấm).

### 4.6 Xuất Excel – "Số liệu nghiên cứu.xlsx"

| Sheet | Nội dung |
|---|---|
| Bảng điểm | Mã HS (HS01… để ẩn danh) · Lớp · Nhóm · Điểm trước · Điểm sau · Chênh lệch · Số phút luyện |
| Thống kê | **Dùng công thức Excel thật** để giáo viên trình bày trong SKKN: `=AVERAGE()`, `=STDEV()`, `=MODE()`, `=MEDIAN()`, `=TTEST(TN;ĐC;2;3)`, `=TTEST(trước;sau;2;1)`, SMD |
| Độ tin cậy | Điểm câu chẵn, câu lẻ, `=CORREL()`, công thức Spearman-Brown |
| Phân tích câu | Mã câu · Unit · Điểm ngữ pháp · % đúng · Độ phân biệt · Cảnh báo |
| Theo điểm ngữ pháp | % đúng trước/sau của từng nhóm |
| Dữ liệu thô | Từng câu trả lời của từng học sinh |

Có tuỳ chọn "Hiện họ tên", mặc định tắt.

### 4.7 Thư viện thống kê và test

- Dùng thư viện `jstat` để tính giá trị p của phân phối t. Không tự viết hàm phân phối.
- T-test độc lập dùng **phương sai không bằng nhau (Welch)**, tương đương `TTEST(...;2;3)` trong Excel. T-test phụ thuộc tương đương `TTEST(...;2;1)`.
- **Bộ số liệu kiểm thử** (đã đối chiếu bằng SciPy):
  ```
  tn_pre  = [5.5,6.0,4.5,7.0,5.0,6.5,5.5,4.0,6.0,5.0]
  dc_pre  = [5.0,6.5,4.5,6.0,5.5,6.0,5.0,4.5,6.5,5.0]
  tn_post = [7.5,8.0,6.0,8.5,7.0,8.0,7.0,5.5,8.0,6.5]
  dc_post = [6.0,7.0,5.0,6.5,6.0,7.0,5.5,5.0,7.0,5.5]
  → p trước (Welch)  = 0.8957
  → p sau (Welch)    = 0.0102
  → p cặp TN trước/sau = 6.37e-9
  → TB sau: TN 7.20, ĐC 6.05; SD ĐC 0.7976; SMD = 1.442
  ```

## 5. Đạo đức nghiên cứu và dữ liệu cá nhân

- Gửi **phiếu đồng ý** cho phụ huynh lớp TN và ĐC, nói rõ mục đích, dữ liệu thu thập và việc kết quả được ẩn danh. App lưu trạng thái "Đã có phiếu đồng ý" cho từng học sinh. Báo cáo chỉ tính các em đã có phiếu.
- Mọi báo cáo xuất ra mặc định ẩn danh.
- Kết thúc nghiên cứu, **mở khoá luyện tập cho nhóm ĐC**, để các em cũng được dùng app.

---

## PROMPT (dán vào Antigravity)

```
Đọc kỹ grammar-g6/KE_HOACH_KIEM_TRA_DAU_VAO_DAU_RA.md và grammar-g6/data/test_forms.json.
Xây dựng tính năng "Kiểm tra đầu vào/đầu ra" đúng theo mục 4 của file kế hoạch.
Không sửa nội dung câu hỏi trong test_forms.json; chỉ đổi câu qua chức năng "Xem trước đề" của giáo viên.

Thứ tự làm, mỗi bước chạy được và có test:
1. Nạp test_forms.json; ẩn các câu thuộc reservedItemIds khỏi mọi phần luyện tập (mục 4.4) + test tự động.
2. Màn làm bài của học sinh (mục 4.3): tự lưu, đồng hồ, xáo trộn câu và phương án, không lộ đáp án.
3. Trang giáo viên: xem trước đề, tạo đợt, gán nhóm TN/ĐC, theo dõi, khoá luyện tập lớp ĐC (mục 4.2).
4. Trang Phân tích kết quả (mục 4.5) dùng jstat; viết unit test với bộ số liệu kiểm thử ở mục 4.7
   và đảm bảo ra đúng p và SMD như trong file.
5. Xuất Excel (mục 4.6) với công thức Excel thật ở sheet Thống kê và Độ tin cậy.
6. Phiếu đồng ý của phụ huynh và chế độ ẩn danh (mục 5).

Phần lưu trữ và chấm điểm dùng Firebase (Firestore + Cloud Function) như kế hoạch chuyển dữ liệu.
Nếu phần Firebase chưa làm xong thì làm Bước 1–2 trước với lớp lưu trữ tách riêng (interface),
để sau chỉ cần thay phần lưu trữ. Trình kế hoạch và danh sách file sẽ sửa trước khi viết code.
```
