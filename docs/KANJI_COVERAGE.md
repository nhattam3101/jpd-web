# Phạm vi dữ liệu Kanji

Nguồn triển khai: danh sách và ví dụ lớp học được cung cấp trong yêu cầu; đối chiếu thêm `knowledge/quiz/Exam-Priority-quizlet-kanji.txt` và các file bài học trong `knowledge/quiz`. Các PDF note iPad là ảnh, `pdftotext` không trích xuất được nội dung; vì vậy chưa thể kiểm kê độc lập toàn bộ chữ trong note PDF hoặc khẳng định không còn chữ lớp học bị bỏ sót. Các ví dụ đặc biệt được yêu cầu trực tiếp cũng được đưa vào, kể cả khi chưa xác minh được vị trí trong PDF.

35 chữ đơn gồm đúng danh sách yêu cầu; không bổ sung chữ đơn từ note mới. 大 xuất hiện trong các từ 大学 và 大学生 theo yêu cầu, nhưng chưa có thẻ chữ đơn riêng. Các từ trong vocabulary/quiz có thể chứa chữ khác chưa đưa thành thẻ Kanji; chưa đủ căn cứ để coi toàn bộ chữ xuất hiện trong từ vựng là Kanji giáo viên đã dạy riêng. Các ngày thường ngoài danh sách yêu cầu chưa được nhập. 私 hiện chưa có ví dụ trong bộ thẻ; `何才` được bổ sung từ Exam Priority gốc. Cần đọc trực tiếp PDF ảnh để đối chiếu đầy đủ.

Chạy `npm run coverage:kanji` để kiểm tra dữ liệu đã nhập. Coverage 100% trong script chỉ phản ánh các kiểm tra tự động, không phải tỷ lệ bao phủ toàn bộ note lớp.
