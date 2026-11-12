# NihonStep (Tiếng Nhật 1)

Ứng dụng local phục vụ riêng cho việc học và ôn thi môn **Tiếng Nhật 1** (FPT).

---

## 1. Nguồn Dữ Liệu
Toàn bộ dữ liệu được trích xuất chính xác từ note iPad và các file từ vựng trong thư mục `knowledge/`:
- **Bài 1.1 → Bài 3.3**: 356 từ vựng độc nhất kèm âm Kanji đã học và cách đọc phiên âm chuẩn.
- **Exam Priority**: 192 từ trọng tâm cho kỳ thi.
- Không tự ý thêm bớt Kanji hay từ vựng ngoài phạm vi giáo trình.

---

## 2. Hai Chức Năng Cốt Lõi

### Chức năng 1: Học từ vựng (Flashcard)
- Cho phép chọn deck: `Bài 1.1`, `1.2`, `1.3`, `2.1`, `2.2`, `2.3`, `3.1`, `3.2`, `3.3`, `Exam Priority`, hoặc `All`.
- Format thẻ:
  - **Mặt trước**: `私（わたし） — Tôi` hoặc `カメラ — Máy ảnh` (Kanji/Kana to rõ, nghĩa tiếng Việt phân tách mạch lạc).
  - **Mặt sau**: `Wà ta shi` (phiên âm phát âm theo note).
- Hỗ trợ:
  - Lật thẻ (`Space`).
  - Chuyển thẻ trước/sau (`←` / `→`).
  - Xáo trộn thẻ (`Shuffle`).
  - Đánh dấu **Đã thuộc** (`2`) / **Chưa thuộc** (`1`).
  - Chế độ **Chỉ ôn chưa thuộc**.
  - Hiển thị tiến độ `12 / 50` kèm thanh tiến trình.
  - Lưu tiến độ tự động trên máy (`localStorage`).

### Chức năng 2: Thi thử (Mock Speaking Test)
Mô phỏng chính xác cấu trúc bài thi nói trên lớp:
- **Part 1 — Reading**: Đọc đoạn văn tiếng Nhật 100–150 từ (Kanji, Hiragana, Katakana, ngày tháng, giờ, số). Timer 2 phút tự động đếm ngược. Không hiện hint lúc thi.
- **Part 2 — Question / Picture**: Giáo viên hỏi 3 câu ngẫu nhiên (2 câu có tranh minh họa: gọi món, giá tiền, vị trí, giờ giấc + 1 câu phỏng vấn trực tiếp). Người học tự nói thành tiếng, sau đó bấm *Xem đáp án* để đối chiếu câu trả lời chuẩn.

---

## 3. Khởi Chạy Local

```bash
# 1. Cài đặt dependencies (đã cài sẵn)
npm install

# 2. Khởi chạy dev server
npm run dev

# 3. Build kiểm tra bản production
npm run build
```
Truy cập ứng dụng tại `http://localhost:5173`.
# jpd-web
