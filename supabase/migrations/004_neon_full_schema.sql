-- ==========================================
-- KhoDeToán - Neon Migration: Schema + Danh mục KNTT
-- Dùng cho Neon Postgres (thay thế Supabase)
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Users table (thay auth.users của Supabase)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT 'Giáo viên',
  role TEXT DEFAULT 'teacher' CHECK (role IN ('admin', 'teacher', 'reviewer')),
  is_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  permissions JSONB DEFAULT '{"can_create_questions": true, "can_review_questions": false, "can_manage_categories": false}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Sessions table (JWT refresh tokens)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Categories (Danh mục theo SGK Kết nối tri thức)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  grade INT CHECK (grade IN (6, 7, 8, 9)),
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  icon TEXT DEFAULT 'folder',
  color TEXT DEFAULT '#3B82F6',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Folders table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'folder',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Questions table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_code TEXT,
  content TEXT NOT NULL,
  answer TEXT,
  solution TEXT,
  grade INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao')),
  question_type TEXT NOT NULL CHECK (question_type IN ('trac_nghiem', 'tu_luan', 'dung_sai', 'dien_dap_an')),
  options JSONB,
  correct_answer TEXT,
  images TEXT[],
  tags TEXT[],
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'approved' CHECK (status IN ('draft', 'pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMPTZ,
  review_note TEXT,
  search_vector tsvector,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Exams table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  grade INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  duration INT,
  folder_id UUID REFERENCES public.folders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  tags TEXT[],
  settings JSONB DEFAULT '{}',
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Exam Questions (junction table)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.exam_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  sort_order INT DEFAULT 0,
  points DECIMAL(5,2) DEFAULT 1.0,
  section TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Exam Variants (mã đề)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.exam_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
  variant_code TEXT NOT NULL,
  question_order INT[],
  option_orders JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Favorites
-- ==========================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- ==========================================
-- Saved Exams
-- ==========================================
CREATE TABLE IF NOT EXISTS public.saved_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exam_id)
);

-- ==========================================
-- Indexes
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_questions_grade ON public.questions(grade);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON public.questions(topic);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_user_id ON public.questions(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_type ON public.questions(question_type);
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_grade_topic ON public.questions(grade, topic);
CREATE INDEX IF NOT EXISTS idx_questions_grade_difficulty ON public.questions(grade, difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_status_created ON public.questions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_search ON public.questions USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_exams_user_id ON public.exams(user_id);
CREATE INDEX IF NOT EXISTS idx_exams_grade ON public.exams(grade);
CREATE INDEX IF NOT EXISTS idx_exams_folder_id ON public.exams(folder_id);
CREATE INDEX IF NOT EXISTS idx_folders_user_id ON public.folders(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_exam_id ON public.exam_questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_exam_sort ON public.exam_questions(exam_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_grade ON public.categories(grade);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON public.sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- ==========================================
-- Functions
-- ==========================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_folders_updated_at BEFORE UPDATE ON public.folders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON public.exams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Full-text search vector
CREATE OR REPLACE FUNCTION public.update_question_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('simple', COALESCE(NEW.content, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.answer, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.solution, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(NEW.tags, ' '), '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_questions_search_vector
  BEFORE INSERT OR UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_question_search_vector();

-- Stats view
CREATE OR REPLACE VIEW public.question_stats AS
SELECT 
  grade,
  topic,
  difficulty,
  status,
  COUNT(*) as count
FROM public.questions
GROUP BY grade, topic, difficulty, status;

-- ==========================================
-- DANH MỤC SGK KẾT NỐI TRI THỨC
-- ==========================================

-- ========== LỚP 6 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
-- Số học & Đại số
('Tập hợp. Tập hợp số tự nhiên', 'l6-tap-hop', 6, 'Tập hợp, phần tử, tập con, tập hợp số tự nhiên', 1, '#EF4444'),
('Các phép tính với số tự nhiên', 'l6-phep-tinh-so-tu-nhien', 6, 'Cộng, trừ, nhân, chia, lũy thừa, thứ tự thực hiện', 2, '#EF4444'),
('Chia hết và chia có dư', 'l6-chia-het-chia-du', 6, 'Tính chất chia hết, dấu hiệu chia hết', 3, '#EF4444'),
('Ước và bội', 'l6-uoc-boi', 6, 'Ước chung, bội chung, ƯCLN, BCNN', 4, '#EF4444'),
('Số nguyên', 'l6-so-nguyen', 6, 'Tập hợp số nguyên, phép tính với số nguyên', 5, '#F97316'),
('Phân số', 'l6-phan-so', 6, 'Phân số, phân số bằng nhau, rút gọn, quy đồng', 6, '#F97316'),
('Số thập phân', 'l6-so-thap-phan', 6, 'Số thập phân, phép tính với số thập phân', 7, '#F97316'),
-- Hình học
('Các hình phẳng trong thực tiễn', 'l6-hinh-phang-thuc-tien', 6, 'Hình tam giác, hình vuông, hình tròn, hình thang', 8, '#3B82F6'),
('Đoạn thẳng. Độ dài đoạn thẳng', 'l6-doan-thang', 6, 'Đoạn thẳng, trung điểm, độ dài', 9, '#3B82F6'),
('Góc', 'l6-goc', 6, 'Góc, số đo góc, tia phân giác', 10, '#3B82F6'),
-- Thống kê & Xác suất
('Thu thập và tổ chức dữ liệu', 'l6-thu-thap-du-lieu', 6, 'Bảng thống kê, biểu đồ tranh, biểu đồ cột', 11, '#10B981'),
('Xác suất thực nghiệm', 'l6-xac-suat-thuc-nghiem', 6, 'Phép thử, kết quả, xác suất thực nghiệm', 12, '#10B981')
ON CONFLICT (slug) DO NOTHING;

-- ========== LỚP 7 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
-- Số học & Đại số
('Số hữu tỉ', 'l7-so-huu-ti', 7, 'Tập hợp số hữu tỉ, phép tính, giá trị tuyệt đối', 1, '#EF4444'),
('Số thực', 'l7-so-thuc', 7, 'Số vô tỉ, căn bậc hai, tập hợp số thực', 2, '#EF4444'),
('Tỉ lệ thức và đại lượng tỉ lệ', 'l7-ti-le-thuc', 7, 'Tỉ lệ thức, tính chất dãy tỉ số bằng nhau', 3, '#F97316'),
('Biểu thức đại số', 'l7-bieu-thuc-dai-so', 7, 'Biểu thức đại số, đa thức, cộng trừ đa thức', 4, '#F97316'),
-- Hình học
('Góc và đường thẳng song song', 'l7-goc-duong-thang-song-song', 7, 'Hai đường thẳng song song, góc so le, đồng vị', 5, '#3B82F6'),
('Tam giác', 'l7-tam-giac', 7, 'Tổng ba góc, tam giác cân, tam giác đều', 6, '#3B82F6'),
('Các trường hợp bằng nhau của tam giác', 'l7-bang-nhau-tam-giac', 7, 'TH bằng nhau c-c-c, c-g-c, g-c-g', 7, '#3B82F6'),
('Quan hệ giữa các yếu tố trong tam giác', 'l7-quan-he-tam-giac', 7, 'Quan hệ giữa góc và cạnh, bất đẳng thức tam giác', 8, '#3B82F6'),
-- Thống kê & Xác suất
('Thống kê', 'l7-thong-ke', 7, 'Bảng tần số, biểu đồ cột, biểu đồ quạt tròn', 9, '#10B981'),
('Xác suất', 'l7-xac-suat', 7, 'Xác suất của biến cố ngẫu nhiên', 10, '#10B981')
ON CONFLICT (slug) DO NOTHING;

-- ========== LỚP 8 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
-- Đại số
('Nhân và chia đa thức', 'l8-nhan-chia-da-thuc', 8, 'Nhân đơn thức, nhân đa thức, hằng đẳng thức', 1, '#EF4444'),
('Hằng đẳng thức đáng nhớ', 'l8-hang-dang-thuc', 8, '7 hằng đẳng thức đáng nhớ', 2, '#EF4444'),
('Phân tích đa thức thành nhân tử', 'l8-phan-tich-nhan-tu', 8, 'Đặt nhân tử chung, dùng hằng đẳng thức, nhóm', 3, '#EF4444'),
('Phân thức đại số', 'l8-phan-thuc', 8, 'Phân thức, rút gọn, phép tính với phân thức', 4, '#F97316'),
('Phương trình bậc nhất một ẩn', 'l8-phuong-trinh-bac-nhat', 8, 'Phương trình bậc nhất, PT chứa ẩn ở mẫu', 5, '#F97316'),
('Bất phương trình bậc nhất một ẩn', 'l8-bat-phuong-trinh', 8, 'Bất phương trình bậc nhất một ẩn', 6, '#F97316'),
-- Hình học
('Tứ giác', 'l8-tu-giac', 8, 'Hình thang, hình bình hành, hình chữ nhật, hình thoi, hình vuông', 7, '#3B82F6'),
('Đa giác. Diện tích đa giác', 'l8-da-giac-dien-tich', 8, 'Đa giác đều, diện tích tam giác, hình thang', 8, '#3B82F6'),
('Định lí Thalès', 'l8-dinh-li-thales', 8, 'Đường thẳng song song với cạnh tam giác, Thalès', 9, '#3B82F6'),
('Tam giác đồng dạng', 'l8-tam-giac-dong-dang', 8, '3 trường hợp đồng dạng, ứng dụng', 10, '#3B82F6'),
-- Thống kê & Xác suất
('Bảng tần số và biểu đồ', 'l8-bang-tan-so', 8, 'Bảng tần số tương đối, biểu đồ hình quạt', 11, '#10B981'),
('Xác suất của biến cố', 'l8-xac-suat-bien-co', 8, 'Xác suất lý thuyết, quy tắc cộng, nhân', 12, '#10B981')
ON CONFLICT (slug) DO NOTHING;

-- ========== LỚP 9 ==========
INSERT INTO public.categories (name, slug, grade, description, sort_order, color) VALUES
-- Đại số
('Căn bậc hai. Căn bậc ba', 'l9-can-thuc', 9, 'Căn bậc hai, biến đổi đơn giản, rút gọn', 1, '#EF4444'),
('Hệ phương trình bậc nhất hai ẩn', 'l9-he-phuong-trinh', 9, 'Hệ PT bậc nhất 2 ẩn, phương pháp giải', 2, '#EF4444'),
('Hàm số y = ax² và phương trình bậc hai', 'l9-ham-so-pt-bac-hai', 9, 'Hàm số bậc hai, phương trình bậc hai, Vi-ét', 3, '#F97316'),
('Hệ thức lượng trong tam giác vuông', 'l9-he-thuc-luong', 9, 'Tỉ số lượng giác, hệ thức lượng', 4, '#F97316'),
-- Hình học
('Đường tròn', 'l9-duong-tron', 9, 'Đường tròn, tiếp tuyến, góc nội tiếp, cung chứa góc', 5, '#3B82F6'),
('Hình trụ. Hình nón. Hình cầu', 'l9-hinh-khong-gian', 9, 'Diện tích xung quanh, thể tích hình trụ, nón, cầu', 6, '#3B82F6'),
-- Thống kê & Xác suất
('Bảng tần số ghép nhóm', 'l9-bang-tan-so-ghep-nhom', 9, 'Bảng tần số ghép nhóm, trung vị, tứ phân vị', 7, '#10B981'),
('Xác suất nâng cao', 'l9-xac-suat-nang-cao', 9, 'Biến cố giao, hợp, phần bù, quy tắc cộng nhân', 8, '#10B981')
ON CONFLICT (slug) DO NOTHING;
