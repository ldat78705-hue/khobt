-- ==========================================
-- Dạng bài tập con — Lớp 6 & Lớp 7
-- Dùng parent_id liên kết với chủ đề cha
-- ==========================================

-- ========== LỚP 6 ==========

-- Tập hợp
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Liệt kê phần tử tập hợp', 'l6-tap-hop-liet-ke', 'Liệt kê và xác định phần tử', 1),
  ('Tập con và tập hợp bằng nhau', 'l6-tap-hop-tap-con', 'Xác định tập con, giao, hợp', 2),
  ('Biểu diễn tập hợp trên trục số', 'l6-tap-hop-truc-so', 'Biểu diễn bằng sơ đồ Ven', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-tap-hop'
ON CONFLICT (slug) DO NOTHING;

-- Phép tính số tự nhiên
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Cộng trừ nhân chia số tự nhiên', 'l6-phep-tinh-co-ban', 'Thực hiện phép tính cơ bản', 1),
  ('Lũy thừa với số mũ tự nhiên', 'l6-luy-thua', 'Tính lũy thừa, so sánh', 2),
  ('Thứ tự thực hiện phép tính', 'l6-thu-tu-phep-tinh', 'Biểu thức có ngoặc, lũy thừa', 3),
  ('Bài toán thực tế về số tự nhiên', 'l6-thuc-te-so-tu-nhien', 'Ứng dụng phép tính vào thực tế', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-phep-tinh-so-tu-nhien'
ON CONFLICT (slug) DO NOTHING;

-- Chia hết
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Dấu hiệu chia hết cho 2, 5, 10', 'l6-dau-hieu-2-5-10', 'Nhận biết số chia hết', 1),
  ('Dấu hiệu chia hết cho 3, 9', 'l6-dau-hieu-3-9', 'Tổng các chữ số', 2),
  ('Số nguyên tố và hợp số', 'l6-so-nguyen-to', 'Nhận biết, phân tích thừa số nguyên tố', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-chia-het-chia-du'
ON CONFLICT (slug) DO NOTHING;

-- Ước bội
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Tìm ƯCLN', 'l6-tim-ucln', 'Phân tích và tìm ước chung lớn nhất', 1),
  ('Tìm BCNN', 'l6-tim-bcnn', 'Phân tích và tìm bội chung nhỏ nhất', 2),
  ('Bài toán thực tế ƯCLN, BCNN', 'l6-thuc-te-ucln-bcnn', 'Chia đều, xếp hàng, chu kỳ', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-uoc-boi'
ON CONFLICT (slug) DO NOTHING;

-- Số nguyên
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('So sánh số nguyên', 'l6-so-sanh-so-nguyen', 'Sắp xếp, biểu diễn trên trục số', 1),
  ('Cộng trừ số nguyên', 'l6-cong-tru-so-nguyen', 'Quy tắc dấu, tính giá trị', 2),
  ('Nhân chia số nguyên', 'l6-nhan-chia-so-nguyen', 'Quy tắc dấu nhân chia', 3),
  ('Bài toán tổng hợp số nguyên', 'l6-tong-hop-so-nguyen', 'Bài toán nhiều phép tính', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-so-nguyen'
ON CONFLICT (slug) DO NOTHING;

-- Phân số
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Rút gọn phân số', 'l6-rut-gon-ps', 'Rút gọn về phân số tối giản', 1),
  ('Quy đồng mẫu số', 'l6-quy-dong', 'Quy đồng và so sánh phân số', 2),
  ('Cộng trừ phân số', 'l6-cong-tru-ps', 'Phép cộng trừ phân số cùng/khác mẫu', 3),
  ('Nhân chia phân số', 'l6-nhan-chia-ps', 'Phép nhân chia, phân số nghịch đảo', 4),
  ('Bài toán thực tế phân số', 'l6-thuc-te-ps', 'Tìm phân số của một số, bài toán chia phần', 5)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-phan-so'
ON CONFLICT (slug) DO NOTHING;

-- Số thập phân
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Phép tính với số thập phân', 'l6-phep-tinh-thap-phan', 'Cộng trừ nhân chia số thập phân', 1),
  ('Làm tròn và ước lượng', 'l6-lam-tron', 'Làm tròn số, ước lượng kết quả', 2),
  ('Tỉ số phần trăm', 'l6-ti-so-phan-tram', 'Tính phần trăm, bài toán lãi suất', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-so-thap-phan'
ON CONFLICT (slug) DO NOTHING;

-- Hình phẳng
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Tính chu vi hình phẳng', 'l6-chu-vi', 'Chu vi tam giác, hình chữ nhật, hình tròn', 1),
  ('Tính diện tích hình phẳng', 'l6-dien-tich-hinh-phang', 'Diện tích các hình cơ bản', 2),
  ('Nhận dạng hình trong thực tiễn', 'l6-nhan-dang-hinh', 'Tìm hình học trong đời sống', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-hinh-phang-thuc-tien'
ON CONFLICT (slug) DO NOTHING;

-- Đoạn thẳng
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Tính độ dài đoạn thẳng', 'l6-do-dai-doan-thang', 'Tính độ dài, cộng đoạn thẳng', 1),
  ('Trung điểm đoạn thẳng', 'l6-trung-diem', 'Xác định và chứng minh trung điểm', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-doan-thang'
ON CONFLICT (slug) DO NOTHING;

-- Góc
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Đo và vẽ góc', 'l6-do-ve-goc', 'Sử dụng thước đo góc', 1),
  ('Góc kề bù, bù nhau', 'l6-goc-ke-bu', 'Tính số đo góc kề bù', 2),
  ('Tia phân giác', 'l6-tia-phan-giac', 'Xác định tia phân giác, tính góc', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-goc'
ON CONFLICT (slug) DO NOTHING;

-- Thống kê L6
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Đọc và lập bảng thống kê', 'l6-doc-bang-tk', 'Thu thập dữ liệu, lập bảng', 1),
  ('Vẽ biểu đồ cột', 'l6-bieu-do-cot', 'Biểu diễn dữ liệu bằng biểu đồ', 2),
  ('Tính trung bình cộng', 'l6-trung-binh-cong', 'Trung bình, mốt', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-thu-thap-du-lieu'
ON CONFLICT (slug) DO NOTHING;

-- Xác suất L6
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Mô tả kết quả phép thử', 'l6-mo-ta-ket-qua', 'Liệt kê kết quả có thể xảy ra', 1),
  ('Tính xác suất thực nghiệm', 'l6-tinh-xs-thuc-nghiem', 'Tần số, xác suất thực nghiệm', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-xac-suat-thuc-nghiem'
ON CONFLICT (slug) DO NOTHING;

-- ========== LỚP 7 ==========

-- Số hữu tỉ
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Phép tính với số hữu tỉ', 'l7-phep-tinh-huu-ti', 'Cộng trừ nhân chia số hữu tỉ', 1),
  ('Giá trị tuyệt đối', 'l7-gia-tri-tuyet-doi', 'Tính GTTĐ, phương trình chứa GTTĐ', 2),
  ('Lũy thừa của số hữu tỉ', 'l7-luy-thua-huu-ti', 'Lũy thừa với số mũ tự nhiên', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-so-huu-ti'
ON CONFLICT (slug) DO NOTHING;

-- Số thực
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#EF4444', p.id FROM
(VALUES
  ('Căn bậc hai và số vô tỉ', 'l7-can-bac-hai', 'Tính căn bậc hai, nhận biết số vô tỉ', 1),
  ('So sánh số thực', 'l7-so-sanh-so-thuc', 'So sánh, biểu diễn trên trục số', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-so-thuc'
ON CONFLICT (slug) DO NOTHING;

-- Tỉ lệ thức
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Tìm x trong tỉ lệ thức', 'l7-tim-x-ti-le', 'Tìm số hạng chưa biết', 1),
  ('Dãy tỉ số bằng nhau', 'l7-day-ti-so', 'Tính chất dãy tỉ số bằng nhau', 2),
  ('Đại lượng tỉ lệ thuận/nghịch', 'l7-ti-le-thuan-nghich', 'Bài toán chia tỉ lệ', 3),
  ('Bài toán thực tế tỉ lệ', 'l7-thuc-te-ti-le', 'Bản đồ, tỉ xích, pha trộn', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-ti-le-thuc'
ON CONFLICT (slug) DO NOTHING;

-- Biểu thức đại số
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#F97316', p.id FROM
(VALUES
  ('Thu gọn đơn thức', 'l7-thu-gon-don-thuc', 'Nhân đơn thức, thu gọn', 1),
  ('Cộng trừ đa thức', 'l7-cong-tru-da-thuc', 'Cộng trừ đa thức một biến', 2),
  ('Nghiệm của đa thức', 'l7-nghiem-da-thuc', 'Tìm nghiệm đa thức một biến', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-bieu-thuc-dai-so'
ON CONFLICT (slug) DO NOTHING;

-- Góc và đường thẳng song song
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Góc tạo bởi hai đường thẳng cắt nhau', 'l7-goc-cat-nhau', 'Góc đối đỉnh, kề bù', 1),
  ('Hai đường thẳng song song', 'l7-hai-dt-song-song', 'Dấu hiệu nhận biết, chứng minh', 2),
  ('Góc so le trong, đồng vị', 'l7-goc-so-le-dong-vi', 'Tính góc khi có đường song song', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-goc-duong-thang-song-song'
ON CONFLICT (slug) DO NOTHING;

-- Tam giác L7
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Tổng ba góc trong tam giác', 'l7-tong-3-goc', 'Tính góc, góc ngoài', 1),
  ('Tam giác cân, đều', 'l7-tam-giac-can-deu', 'Tính chất tam giác cân, đều', 2),
  ('Tam giác vuông', 'l7-tam-giac-vuong-l7', 'Tính chất, định lí Pytago', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-tam-giac'
ON CONFLICT (slug) DO NOTHING;

-- Bằng nhau tam giác
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Chứng minh bằng nhau c-c-c', 'l7-cm-ccc', 'Trường hợp cạnh-cạnh-cạnh', 1),
  ('Chứng minh bằng nhau c-g-c', 'l7-cm-cgc', 'Trường hợp cạnh-góc-cạnh', 2),
  ('Chứng minh bằng nhau g-c-g', 'l7-cm-gcg', 'Trường hợp góc-cạnh-góc', 3),
  ('Bài toán tổng hợp tam giác bằng nhau', 'l7-tong-hop-bang-nhau', 'Chứng minh đoạn/góc bằng nhau', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-bang-nhau-tam-giac'
ON CONFLICT (slug) DO NOTHING;

-- Quan hệ tam giác
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Quan hệ góc và cạnh đối diện', 'l7-goc-canh-doi-dien', 'So sánh cạnh/góc trong tam giác', 1),
  ('Bất đẳng thức tam giác', 'l7-bdt-tam-giac', 'Kiểm tra 3 cạnh tạo thành tam giác', 2),
  ('Đường trung tuyến, trung trực, phân giác', 'l7-duong-dac-biet', 'Các đường đặc biệt trong tam giác', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-quan-he-tam-giac'
ON CONFLICT (slug) DO NOTHING;

-- Thống kê L7
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Bảng tần số', 'l7-bang-tan-so', 'Lập bảng tần số, tần số tương đối', 1),
  ('Biểu đồ cột và quạt tròn', 'l7-bieu-do', 'Đọc và vẽ biểu đồ', 2),
  ('Số trung bình, trung vị, mốt', 'l7-trung-binh-trung-vi', 'Tính đại lượng thống kê', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-thong-ke'
ON CONFLICT (slug) DO NOTHING;

-- Xác suất L7
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#10B981', p.id FROM
(VALUES
  ('Phép thử và không gian mẫu', 'l7-khong-gian-mau', 'Liệt kê kết quả, biến cố', 1),
  ('Tính xác suất biến cố', 'l7-tinh-xac-suat', 'Xác suất cổ điển', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-xac-suat'
ON CONFLICT (slug) DO NOTHING;
