-- ==========================================
-- Dạng bài tập con — Lớp 8 & Lớp 9
-- ==========================================

-- ========== LỚP 8 ==========

-- Nhân chia đa thức
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Nhân đơn thức với đa thức', 'l8-nhan-don-da', 'Nhân đơn thức, nhân đa thức', 1),
  ('Nhân đa thức với đa thức', 'l8-nhan-da-da', 'Khai triển tích hai đa thức', 2),
  ('Chia đa thức cho đơn thức', 'l8-chia-da-don', 'Phép chia đa thức', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-nhan-chia-da-thuc'
ON CONFLICT (slug) DO NOTHING;

-- Hằng đẳng thức
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Bình phương tổng/hiệu', 'l8-binh-phuong-tong-hieu', '(a±b)² = a² ± 2ab + b²', 1),
  ('Hiệu hai bình phương', 'l8-hieu-binh-phuong', 'a² - b² = (a-b)(a+b)', 2),
  ('Lập phương tổng/hiệu', 'l8-lap-phuong', '(a±b)³, a³±b³', 3),
  ('Bài tập tổng hợp HĐT', 'l8-tong-hop-hdt', 'Phối hợp nhiều hằng đẳng thức', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-hang-dang-thuc'
ON CONFLICT (slug) DO NOTHING;

-- Phân tích nhân tử
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Đặt nhân tử chung', 'l8-nhan-tu-chung', 'Đặt thừa số chung ra ngoài', 1),
  ('Dùng hằng đẳng thức', 'l8-dung-hdt', 'Nhận dạng và áp dụng HĐT', 2),
  ('Nhóm hạng tử', 'l8-nhom-hang-tu', 'Nhóm và phân tích', 3),
  ('Phối hợp nhiều phương pháp', 'l8-phoi-hop-pp', 'Bài tập phối hợp nâng cao', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-phan-tich-nhan-tu'
ON CONFLICT (slug) DO NOTHING;

-- Phân thức đại số
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Rút gọn phân thức', 'l8-rut-gon-phan-thuc', 'ĐKXĐ và rút gọn', 1),
  ('Cộng trừ phân thức', 'l8-cong-tru-phan-thuc', 'Quy đồng, cộng trừ', 2),
  ('Nhân chia phân thức', 'l8-nhan-chia-phan-thuc', 'Nhân, chia, phân thức nghịch đảo', 3),
  ('Biến đổi biểu thức hữu tỉ', 'l8-bien-doi-huu-ti', 'Rút gọn biểu thức phức tạp', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-phan-thuc'
ON CONFLICT (slug) DO NOTHING;

-- PT bậc nhất
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Giải phương trình bậc nhất', 'l8-giai-pt-bac-nhat', 'PT dạng ax + b = 0', 1),
  ('PT đưa về bậc nhất', 'l8-pt-dua-ve-bac-nhat', 'PT tích, PT chứa ngoặc', 2),
  ('PT chứa ẩn ở mẫu', 'l8-pt-an-o-mau', 'ĐKXĐ, giải và đối chiếu', 3),
  ('Giải bài toán bằng lập PT', 'l8-lap-pt', 'Bài toán chuyển động, công việc, tuổi', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-phuong-trinh-bac-nhat'
ON CONFLICT (slug) DO NOTHING;

-- BPT bậc nhất
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Giải bất phương trình', 'l8-giai-bpt', 'BPT bậc nhất một ẩn', 1),
  ('Biểu diễn tập nghiệm', 'l8-bieu-dien-tap-nghiem', 'Trục số, khoảng, đoạn', 2),
  ('Hệ bất phương trình', 'l8-he-bpt', 'Giao tập nghiệm', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-bat-phuong-trinh'
ON CONFLICT (slug) DO NOTHING;

-- Tứ giác
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Hình thang và hình thang cân', 'l8-hinh-thang', 'Tính chất, chứng minh', 1),
  ('Hình bình hành', 'l8-hinh-binh-hanh', 'Dấu hiệu nhận biết, tính chất', 2),
  ('Hình chữ nhật, hình thoi', 'l8-hcn-hinh-thoi', 'Tính chất đặc biệt', 3),
  ('Hình vuông', 'l8-hinh-vuong', 'Tính chất, chứng minh hình vuông', 4),
  ('Bài tập tổng hợp tứ giác', 'l8-tong-hop-tu-giac', 'Chứng minh tứ giác đặc biệt', 5)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-tu-giac'
ON CONFLICT (slug) DO NOTHING;

-- Diện tích đa giác
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Diện tích tam giác', 'l8-dien-tich-tam-giac', 'Công thức, bài toán diện tích', 1),
  ('Diện tích hình thang', 'l8-dien-tich-hinh-thang', 'Công thức và ứng dụng', 2),
  ('Diện tích đa giác đều', 'l8-dien-tich-da-giac-deu', 'Chia nhỏ, tính diện tích', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-da-giac-dien-tich'
ON CONFLICT (slug) DO NOTHING;

-- Thalès
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Định lí Thalès trong tam giác', 'l8-thales-tam-giac', 'Đường song song cắt 2 cạnh', 1),
  ('Đường trung bình tam giác', 'l8-duong-trung-binh-tg', 'Tính chất, chứng minh', 2),
  ('Đường trung bình hình thang', 'l8-duong-trung-binh-ht', 'Tính chất, tính độ dài', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-dinh-li-thales'
ON CONFLICT (slug) DO NOTHING;

-- Tam giác đồng dạng
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Chứng minh đồng dạng (c-c-c, c-g-c, g-g)', 'l8-cm-dong-dang', '3 trường hợp đồng dạng', 1),
  ('Tính cạnh và góc bằng đồng dạng', 'l8-tinh-canh-dong-dang', 'Tìm cạnh/góc chưa biết', 2),
  ('Ứng dụng đồng dạng', 'l8-ung-dung-dong-dang', 'Đo chiều cao, khoảng cách', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-tam-giac-dong-dang'
ON CONFLICT (slug) DO NOTHING;

-- Thống kê L8
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Bảng tần số tương đối', 'l8-tan-so-tuong-doi', 'Tần số tương đối, tần suất', 1),
  ('Biểu đồ hình quạt', 'l8-bieu-do-quat', 'Đọc và vẽ biểu đồ quạt', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-bang-tan-so'
ON CONFLICT (slug) DO NOTHING;

-- Xác suất L8
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Xác suất lý thuyết', 'l8-xs-ly-thuyet', 'Tính xác suất bằng công thức', 1),
  ('Quy tắc cộng và nhân', 'l8-quy-tac-cong-nhan', 'Đếm số kết quả thuận lợi', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-xac-suat-bien-co'
ON CONFLICT (slug) DO NOTHING;

-- ========== LỚP 9 ==========

-- Căn thức
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Biến đổi đơn giản căn thức', 'l9-bien-doi-can', 'Đưa thừa số ra/vào dấu căn', 1),
  ('Rút gọn biểu thức chứa căn', 'l9-rut-gon-can', 'Rút gọn, tính giá trị', 2),
  ('Trục căn thức ở mẫu', 'l9-truc-can', 'Khử mẫu chứa căn', 3),
  ('Bài toán tổng hợp căn thức', 'l9-tong-hop-can', 'ĐKXĐ, rút gọn, tìm x, min/max', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-can-thuc'
ON CONFLICT (slug) DO NOTHING;

-- Hệ phương trình
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Giải HPT bằng phương pháp thế', 'l9-hpt-the', 'Phương pháp thế', 1),
  ('Giải HPT bằng phương pháp cộng', 'l9-hpt-cong', 'Phương pháp cộng đại số', 2),
  ('Giải bài toán bằng lập HPT', 'l9-lap-hpt', 'Bài toán chuyển động, công việc, nồng độ', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-he-phuong-trinh'
ON CONFLICT (slug) DO NOTHING;

-- Hàm số & PT bậc hai
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Vẽ đồ thị hàm số y = ax²', 'l9-do-thi-ax2', 'Bảng giá trị, vẽ parabol', 1),
  ('Giải phương trình bậc hai', 'l9-giai-pt-bac-2', 'Công thức nghiệm, delta', 2),
  ('Định lí Vi-ét', 'l9-dinh-li-viet', 'Tổng tích nghiệm, lập PT', 3),
  ('Bài toán lập PT bậc hai', 'l9-lap-pt-bac-2', 'Bài toán thực tế → PT bậc hai', 4),
  ('PT quy về bậc hai', 'l9-pt-quy-ve-bac-2', 'PT trùng phương, PT ẩn phụ', 5)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-ham-so-pt-bac-hai'
ON CONFLICT (slug) DO NOTHING;

-- Hệ thức lượng
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Tỉ số lượng giác góc nhọn', 'l9-ti-so-luong-giac', 'sin, cos, tan, cot', 1),
  ('Hệ thức giữa cạnh và góc', 'l9-he-thuc-canh-goc', 'Giải tam giác vuông', 2),
  ('Hệ thức giữa cạnh và đường cao', 'l9-he-thuc-duong-cao', 'Hệ thức lượng trong tam giác vuông', 3),
  ('Ứng dụng đo đạc thực tế', 'l9-do-dac-thuc-te', 'Đo chiều cao, khoảng cách', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-he-thuc-luong'
ON CONFLICT (slug) DO NOTHING;

-- Đường tròn
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Vị trí tương đối đường thẳng và đường tròn', 'l9-vi-tri-dt-dtron', 'Cắt, tiếp xúc, không cắt', 1),
  ('Tiếp tuyến đường tròn', 'l9-tiep-tuyen', 'Tính chất, chứng minh tiếp tuyến', 2),
  ('Góc nội tiếp', 'l9-goc-noi-tiep', 'Góc nội tiếp, góc ở tâm', 3),
  ('Tứ giác nội tiếp', 'l9-tu-giac-noi-tiep', 'Dấu hiệu, chứng minh', 4),
  ('Độ dài đường tròn, diện tích hình tròn', 'l9-do-dai-dien-tich', 'Chu vi, diện tích, cung, quạt', 5),
  ('Bài tập tổng hợp đường tròn', 'l9-tong-hop-duong-tron', 'Bài toán phối hợp nâng cao', 6)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-duong-tron'
ON CONFLICT (slug) DO NOTHING;

-- Hình không gian
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Hình trụ: diện tích và thể tích', 'l9-hinh-tru', 'Sxq, Stp, V hình trụ', 1),
  ('Hình nón: diện tích và thể tích', 'l9-hinh-non', 'Sxq, Stp, V hình nón', 2),
  ('Hình cầu: diện tích và thể tích', 'l9-hinh-cau', 'S mặt cầu, V hình cầu', 3),
  ('Bài toán thực tế hình không gian', 'l9-thuc-te-hkg', 'Tính thể tích bể, bồn, vật thể', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-hinh-khong-gian'
ON CONFLICT (slug) DO NOTHING;

-- Thống kê L9
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Bảng tần số ghép nhóm', 'l9-bang-ghep-nhom', 'Lập bảng, tính tần suất ghép nhóm', 1),
  ('Trung vị và tứ phân vị', 'l9-trung-vi-tu-phan-vi', 'Tính trung vị, Q1, Q3', 2),
  ('Biểu đồ hộp và râu', 'l9-bieu-do-hop', 'Vẽ và đọc boxplot', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-bang-tan-so-ghep-nhom'
ON CONFLICT (slug) DO NOTHING;

-- Xác suất L9
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Biến cố giao và hợp', 'l9-bien-co-giao-hop', 'Biến cố kết hợp', 1),
  ('Biến cố đối và phần bù', 'l9-bien-co-doi', 'P(A'') = 1 - P(A)', 2),
  ('Bài toán xác suất tổng hợp', 'l9-xs-tong-hop', 'Bài toán kết hợp nhiều quy tắc', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-xac-suat-nang-cao'
ON CONFLICT (slug) DO NOTHING;
