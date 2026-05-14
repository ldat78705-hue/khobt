-- ==========================================
-- Bổ sung chủ đề & dạng bài KNTT — Lớp 6, 7, 8, 9
-- Các chủ đề còn thiếu so với SGK thực tế
-- ==========================================

-- ========== BỔ SUNG CHỦ ĐỀ CHA — LỚP 6 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
('Tỉ số và tỉ số phần trăm', 'l6-ti-so', 6, 'Tỉ số, tỉ số phần trăm, bài toán phần trăm', 13, '#8B5CF6'),
('Đối xứng trục', 'l6-doi-xung-truc', 6, 'Hình có trục đối xứng, vẽ hình đối xứng', 14, '#3B82F6'),
('Hình có tâm đối xứng', 'l6-doi-xung-tam', 6, 'Hình có tâm đối xứng', 15, '#3B82F6')
ON CONFLICT (slug) DO NOTHING;

-- ========== BỔ SUNG CHỦ ĐỀ CHA — LỚP 7 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
('Làm quen với biến cố', 'l7-bien-co', 7, 'Biến cố chắc chắn, không thể, ngẫu nhiên', 11, '#10B981'),
('Đường thẳng vuông góc', 'l7-dt-vuong-goc', 7, 'Hai đường thẳng vuông góc, đường trung trực', 12, '#3B82F6')
ON CONFLICT (slug) DO NOTHING;

-- ========== BỔ SUNG CHỦ ĐỀ CHA — LỚP 8 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
('Hàm số bậc nhất y = ax + b', 'l8-ham-so-bac-nhat', 8, 'Hàm số, đồ thị, hệ số góc', 13, '#8B5CF6'),
('Phương trình đường thẳng', 'l8-pt-duong-thang', 8, 'Viết phương trình đường thẳng, vị trí tương đối', 14, '#8B5CF6'),
('Hình lăng trụ đứng', 'l8-lang-tru-dung', 8, 'Diện tích xung quanh, thể tích lăng trụ đứng', 15, '#3B82F6'),
('Hình chóp đều', 'l8-hinh-chop-deu', 8, 'Diện tích xung quanh, thể tích hình chóp đều', 16, '#3B82F6')
ON CONFLICT (slug) DO NOTHING;

-- ========== BỔ SUNG CHỦ ĐỀ CHA — LỚP 9 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
('Hàm số y = ax + b (ôn tập nâng cao)', 'l9-ham-so-bac-nhat', 9, 'Đồ thị, giao điểm, bài toán diện tích', 9, '#8B5CF6'),
('Hệ bất phương trình bậc nhất hai ẩn', 'l9-he-bpt-hai-an', 9, 'Miền nghiệm, bài toán tối ưu', 10, '#8B5CF6')
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- DẠNG BÀI CON — BỔ SUNG
-- ==========================================

-- Tỉ số L6
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#8B5CF6', p.id FROM
(VALUES
  ('Tính tỉ số hai đại lượng', 'l6-tinh-ti-so', 'Tỉ số đơn giản', 1),
  ('Bài toán phần trăm cơ bản', 'l6-phan-tram-co-ban', 'Tìm phần trăm, tìm giá trị', 2),
  ('Bài toán lãi suất và giảm giá', 'l6-lai-suat-giam-gia', 'Tính lãi, giảm giá, tăng dân số', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-ti-so'
ON CONFLICT (slug) DO NOTHING;

-- Đối xứng trục L6
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 6, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Nhận biết hình có trục đối xứng', 'l6-nhan-biet-truc-dx', 'Xác định trục đối xứng', 1),
  ('Vẽ hình đối xứng qua trục', 'l6-ve-doi-xung-truc', 'Vẽ điểm, đoạn thẳng đối xứng', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l6-doi-xung-truc'
ON CONFLICT (slug) DO NOTHING;

-- Đường thẳng vuông góc L7
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 7, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Chứng minh hai đường thẳng vuông góc', 'l7-cm-vuong-goc', 'Dùng tổng góc, tính chất', 1),
  ('Đường trung trực đoạn thẳng', 'l7-trung-truc-doan-thang', 'Tính chất, chứng minh', 2),
  ('Khoảng cách từ điểm đến đường thẳng', 'l7-khoang-cach', 'Đường vuông góc ngắn nhất', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l7-dt-vuong-goc'
ON CONFLICT (slug) DO NOTHING;

-- Hàm số bậc nhất L8
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#8B5CF6', p.id FROM
(VALUES
  ('Vẽ đồ thị hàm số y = ax + b', 'l8-ve-do-thi-bac-nhat', 'Bảng giá trị, vẽ đường thẳng', 1),
  ('Xác định hệ số a, b từ đồ thị', 'l8-xac-dinh-he-so', 'Đọc đồ thị, tìm hệ số', 2),
  ('Tìm giao điểm hai đường thẳng', 'l8-giao-diem-dt', 'Giải hệ phương trình tìm giao điểm', 3),
  ('Bài toán thực tế hàm số bậc nhất', 'l8-thuc-te-ham-so', 'Mô hình hóa bằng hàm bậc nhất', 4)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-ham-so-bac-nhat'
ON CONFLICT (slug) DO NOTHING;

-- Hình lăng trụ đứng L8
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Nhận biết hình lăng trụ đứng', 'l8-nhan-biet-lang-tru', 'Đỉnh, cạnh, mặt', 1),
  ('Diện tích xung quanh lăng trụ đứng', 'l8-sxq-lang-tru', 'Công thức Sxq', 2),
  ('Thể tích lăng trụ đứng', 'l8-the-tich-lang-tru', 'V = Sđáy × h', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-lang-tru-dung'
ON CONFLICT (slug) DO NOTHING;

-- Hình chóp đều L8
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 8, desc_, sort_order, '#3B82F6', p.id FROM
(VALUES
  ('Nhận biết hình chóp đều', 'l8-nhan-biet-chop', 'Đỉnh, cạnh bên, mặt bên', 1),
  ('Diện tích xung quanh hình chóp đều', 'l8-sxq-chop', 'Công thức Sxq', 2),
  ('Thể tích hình chóp đều', 'l8-the-tich-chop', 'V = 1/3 × Sđáy × h', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l8-hinh-chop-deu'
ON CONFLICT (slug) DO NOTHING;

-- Hàm số bậc nhất nâng cao L9
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#8B5CF6', p.id FROM
(VALUES
  ('Đồ thị hàm số y = |ax + b|', 'l9-do-thi-gia-tri-tuyet-doi', 'Vẽ đồ thị chứa GTTĐ', 1),
  ('Bài toán diện tích từ đồ thị', 'l9-dien-tich-do-thi', 'Tính diện tích tam giác từ giao điểm', 2),
  ('Vị trí tương đối hai đường thẳng', 'l9-vi-tri-2-dt', 'Song song, cắt nhau, trùng nhau', 3)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-ham-so-bac-nhat'
ON CONFLICT (slug) DO NOTHING;

-- Hệ BPT hai ẩn L9
INSERT INTO public.categories (name, slug, grade, description, sort_order, color, parent_id)
SELECT name, slug, 9, desc_, sort_order, '#8B5CF6', p.id FROM
(VALUES
  ('Biểu diễn miền nghiệm', 'l9-mien-nghiem', 'Vẽ miền nghiệm trên mặt phẳng', 1),
  ('Bài toán tối ưu tuyến tính', 'l9-toi-uu', 'Tìm GTLN, GTNN trên miền nghiệm', 2)
) AS t(name, slug, desc_, sort_order)
CROSS JOIN public.categories p WHERE p.slug = 'l9-he-bpt-hai-an'
ON CONFLICT (slug) DO NOTHING;
