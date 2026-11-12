# BÁO CÁO KIỂM TRA VÀ CHUẨN HÓA DỮ LIỆU (DATA ISSUES & FIXES)

Tài liệu ghi lại toàn bộ các lỗi phát hiện trong dữ liệu thô (knowledge/notes) và quá trình chuẩn hóa thành bộ dữ liệu tiếng Nhật 1 (`NihonStep`).

---

## 1. Dính hai cách đọc ngày 17
- **Nguồn chứa lỗi**: `knowledge/Bai-1.2.txt` (dòng 34) & `knowledge/Tong-hop-tu-vung.md` (dòng 100).
- **Hiện tượng lỗi**:
  - Thuật ngữ: `じゅうななにちじゅうしちにち — Ngày 17`
  - Phiên âm: `Jiu nà na nì chiJiu shì chi nì chi`
  - Hai cách đọc hợp lệ của ngày 17 (`じゅうななにち` và `じゅうしちにち`) bị ghép dính liền nhau thành một chuỗi duy nhất, không có khoảng cách hay dấu phân tách.
- **Cách sửa**:
  - Thêm Kanji theo note và phân tách rõ hai cách đọc bằng dấu gạch chéo: `十七日（じゅうななにち／じゅうしちにち） — Ngày 17`.
  - Phiên âm sửa thành: `Jiu nà na nì chi / Jiu shì chi nì chi`.

---

## 2. Dính hai cách đọc ngày 27
- **Nguồn chứa lỗi**: `knowledge/Bai-1.2.txt` (dòng 44) & `knowledge/Tong-hop-tu-vung.md` (dòng 110).
- **Hiện tượng lỗi**:
  - Thuật ngữ: `にじゅうななにちにじゅうしちにち — Ngày 27`
  - Phiên âm: `Ní jiu nà na nì chiNí jiu shì chi nì chi`
  - Hai cách đọc hợp lệ của ngày 27 (`にじゅうななにち` và `にじゅうしちにち`) bị dính liền nhau.
- **Cách sửa**:
  - Chuẩn hóa thành: `二十七日（にじゅうななにち／にじゅうしちにち） — Ngày 27`.
  - Phiên âm sửa thành: `Ní jiu nà na nì chi / Ní jiu shì chi nì chi`.

---

## 3. Dòng bị dính 3 từ vựng tiệm/cửa hàng
- **Nguồn chứa lỗi**: `knowledge/Bai-2.1.txt` (dòng 22) & `knowledge/Tong-hop-tu-vung.md` (dòng 158).
- **Hiện tượng lỗi**:
  - Dòng: `Địa điểm＋やくつやほんや — Tiệm ~Tiệm giàyTiệm sách\t~yaKừ chư yaHon ya`
  - Bị dính liền 3 mục từ khác nhau: hậu tố chỉ tiệm buôn `～や`, tiệm giày `くつや`, tiệm sách `ほんや`.
- **Cách sửa**:
  - Tách thành 3 thẻ từ vựng độc lập:
    1. `～や — Tiệm ~` (phiên âm: `~ya`, lesson: `2.1`)
    2. `くつや — Tiệm giày` (phiên âm: `Kừ chư ya`, lesson: `2.1`)
    3. `本や（ほんや） — Tiệm sách` (phiên âm: `Hon ya`, lesson: `2.1`)

---

## 4. Dòng duplicate (trùng lặp) trong Bài 1.2
- **Nguồn chứa lỗi**: `knowledge/Bai-1.2.txt` (dòng 5 và dòng 49).
- **Hiện tượng lỗi**:
  - Dòng 5: `なんにち — Ngày mấy\tNan nì chi`
  - Dòng 49: `なんにち — Ngày mấy\tNán nì chi`
  - Thẻ bị lặp lại ở cuối danh sách ngày trong tháng.
- **Cách sửa**:
  - Chuẩn hóa thẻ chuẩn ở đầu bài `何日（なんにち） — Ngày mấy`, loại bỏ dòng 49 bị trùng lặp.

---

## 5. Ghép hai danh từ xưng hô và nghề nghiệp trong Bài 1.1
- **Nguồn chứa lỗi**: `knowledge/Bai-1.1.txt` (dòng 21, dòng 22) & `knowledge/Tong-hop-tu-vung.md` (dòng 29, 30).
- **Hiện tượng lỗi**:
  - Dòng 21: `せんせい／きょうし — Thầy, cô / Giáo viên`
  - Dòng 22: `かいしゃいん／しゃいん — Nhân viên công ty/Nhân viên`
  - Việc gộp hai từ có sắc thái và cách dùng khác nhau vào cùng một thẻ khiến người học khó phân biệt ngữ cảnh.
- **Cách sửa**:
  - Tách thành 4 thẻ độc lập chuẩn theo note iPad:
    1. `先生（せんせい） — Thầy, cô` (phiên âm: `Sén sê`)
    2. `きょうし — Giáo viên` (phiên âm: `Kyố shi`)
    3. `かいしゃいん — Nhân viên công ty` (phiên âm: `Kai sha in`)
    4. `しゃいん — Nhân viên` (phiên âm: `Sha in`)

---

## 6. Lỗi chính tả tiếng Việt (typo export) trong Bài 2.2
- **Nguồn chứa lỗi**: `knowledge/Bai-2.2.txt` (dòng 1, 2, 3).
- **Hiện tượng lỗi**:
  - Dòng 1: `これ（このN） — Cài này (Cái N này)` (dấu huyền "Cài")
  - Dòng 2: `それ（そのN） — Cài đó (Cái N đó)` (dấu huyền "Cài")
  - Dòng 3: `あれ（あのN） — Cài kia (Cái N kia)` (dấu huyền "Cài")
- **Cách sửa**:
  - Đổi lại dấu đúng ngữ pháp tiếng Việt: `Cái này (Cái N này)`, `Cái đó (Cái N đó)`, `Cái kia (Cái N kia)`.

---

## 7. Lỗi trích xuất kana và kanji trong converter cũ
- **Nguồn chứa lỗi**: `scripts/generate_vocab.py` cũ và `src/data/vocabulary/bai1_1.ts`.
- **Hiện tượng lỗi**:
  - Converter regex cũ trích xuất furigana bằng `re.search(r'[（\(]([^）\)]+)[）\)]')`.
  - Hậu quả:
    - Với `(お)なまえ`, hệ thống nhận nhầm `kana: "お"`.
    - Với các từ viết thuần Katakana/Hiragana không có ngoặc (ví dụ `カメラ`, `ベトナム`), hệ thống để rỗng `kana: ""`.
    - Trường `kanji` không được trích xuất riêng biệt.
- **Cách sửa**:
  - Xây dựng parser chuẩn mực:
    - Phân tách chính xác chữ Hán đã học trong bài (`kanji?: string`).
    - Các từ không học chữ Hán không tự ý thêm Kanji, trường `kana` chứa toàn bộ từ đó (`カメラ`, `ベトナム`, `(お)なまえ`).
    - Tất cả 356 thẻ đều có `kana` đầy đủ 100%, không thẻ nào bị rỗng.

