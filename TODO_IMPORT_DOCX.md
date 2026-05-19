# KẾ HOẠCH IMPORT BÀI TẬP LỚP 7 TỪ DOCX LÊN WEB (TIẾP TỤC VÀO PHIÊN SAU)

## 1. Trạng thái hiện tại
- Đã phân tích và thêm thành công **toàn bộ 315 danh mục con (Bài học)** của Lớp 5, 7, 8, 9 vào cơ sở dữ liệu (Neon PostgreSQL).
- Đã fix xong lỗi Build trên Vercel liên quan đến `handleMove` trong `CategoryRow`.
- Xác định kho tài liệu bài tập Lớp 7 nằm tại: `D:\khode\tailieu\phieubaitap\Sovadaiso\So va dai so` và `D:\khode\tailieu\phieubaitap\Hinhhoc`.
- Các file tài liệu hiện tại chứa công thức dạng **MathType/Equation gốc**, chưa chuyển sang định dạng LaTeX text nên không thể import trực tiếp.

## 2. Nhiệm vụ của Sếp (Đang thực hiện chạy ngầm)
- Sử dụng ứng dụng Desktop (ví dụ: `HoTroGV2.py` / `latex_mathtype.py` tại `D:\python\hotrogvtest`) để **chuyển đổi hàng loạt (batch convert)** thư mục tài liệu lớp 7 sang định dạng LaTeX (kết quả trả ra thường có hậu tố `_MathType.docx` hoặc `_LaTeX.docx`).
- Cắm máy để tool tự động Convert qua đêm.

## 3. Nhiệm vụ phiên làm việc tiếp theo (Dành cho AI)
1. **Quét thư mục đã convert**: Kiểm tra các file `.docx` đã được convert sang LaTeX trong thư mục `D:\khode\tailieu\phieubaitap`.
2. **Viết Script NodeJS Import (Tương tự `import-exams.js`)**:
   - Sử dụng `mammoth` để parse nội dung HTML/Text từ các file DOCX (chứa LaTeX).
   - Tự động bóc tách (regex) Câu 1, Câu 2..., A, B, C, D, và Lời giải.
   - **Đặc biệt:** Tự động lấy tên file (Ví dụ: `B1 Tap hop so huu ti`) để map/khớp thẳng vào thuộc tính `category_id` tương ứng (Ví dụ: `c7-1-1`) trong Database Neon.
3. **Thực thi và Kiểm tra**: Chạy script để đẩy hàng nghìn câu hỏi của Lớp 7 lên kho dữ liệu Web một cách hoàn hảo, chuẩn kiến thức và đúng bài, đúng chương 100%.

> **Lưu ý cho AI phiên sau:** Hãy đọc file này đầu tiên khi bắt đầu phiên làm việc để nắm bắt luồng tiến độ!
