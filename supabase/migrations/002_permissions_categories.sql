-- ==========================================
-- KhoDeToán - Schema V2: Phân quyền + Categories
-- Chạy SAU migration 001
-- ==========================================

-- ==========================================
-- Mở rộng roles cho profiles
-- ==========================================
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'teacher', 'reviewer'));

-- Thêm cột permissions cho profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{"can_create_questions": true, "can_review_questions": false, "can_manage_categories": false}';

-- ==========================================
-- Bảng categories (Mục do admin tạo)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  icon TEXT DEFAULT 'folder',
  color TEXT DEFAULT '#3B82F6',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Thêm trạng thái duyệt cho questions
-- ==========================================
ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending'
    CHECK (status IN ('draft', 'pending', 'approved', 'rejected'));

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.profiles(id);

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS review_note TEXT;

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL;

-- ==========================================
-- RLS cho categories
-- ==========================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Ai cũng có thể xem categories
CREATE POLICY "Anyone can view active categories"
  ON public.categories FOR SELECT
  USING (is_active = true);

-- Chỉ admin mới có thể CRUD categories
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ==========================================
-- Cập nhật RLS cho questions (thêm trạng thái duyệt)
-- ==========================================

-- Xóa policies cũ
DROP POLICY IF EXISTS "Users can CRUD own questions" ON public.questions;
DROP POLICY IF EXISTS "Users can view public questions" ON public.questions;

-- Giáo viên CRUD câu hỏi của mình
CREATE POLICY "Teachers can manage own questions"
  ON public.questions FOR ALL
  USING (auth.uid() = user_id);

-- Xem câu hỏi đã duyệt (approved)
CREATE POLICY "Anyone can view approved questions"
  ON public.questions FOR SELECT
  USING (status = 'approved');

-- Reviewer/Admin có thể xem tất cả câu hỏi pending
CREATE POLICY "Reviewers can view pending questions"
  ON public.questions FOR SELECT
  USING (
    status = 'pending' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND (role IN ('admin', 'reviewer') OR (permissions->>'can_review_questions')::boolean = true)
    )
  );

-- Reviewer/Admin có thể update status (duyệt/từ chối)
CREATE POLICY "Reviewers can update question status"
  ON public.questions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND (role IN ('admin', 'reviewer') OR (permissions->>'can_review_questions')::boolean = true)
    )
  );

-- ==========================================
-- Indexes mới
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- ==========================================
-- Trigger cập nhật updated_at cho categories
-- ==========================================
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ==========================================
-- Insert default categories
-- ==========================================
INSERT INTO public.categories (name, slug, description, sort_order) VALUES
  ('Số học', 'so-hoc', 'Các bài toán về số học', 1),
  ('Phân số', 'phan-so', 'Phân số, tỉ số, tỉ lệ', 2),
  ('Hình học', 'hinh-hoc', 'Hình học phẳng', 3),
  ('Biểu thức', 'bieu-thuc', 'Biểu thức đại số', 4),
  ('Phương trình', 'phuong-trinh', 'Phương trình, bất phương trình', 5),
  ('Hàm số', 'ham-so', 'Hàm số và đồ thị', 6),
  ('Tam giác', 'tam-giac', 'Tam giác và tính chất', 7),
  ('Đường tròn', 'duong-tron', 'Đường tròn và góc', 8),
  ('Thống kê', 'thong-ke', 'Thống kê mô tả', 9),
  ('Xác suất', 'xac-suat', 'Xác suất cơ bản', 10),
  ('Hệ phương trình', 'he-phuong-trinh', 'Hệ phương trình bậc nhất', 11),
  ('Căn thức', 'can-thuc', 'Căn bậc hai, căn bậc ba', 12),
  ('Đa thức', 'da-thuc', 'Đa thức và phép chia', 13)
ON CONFLICT (slug) DO NOTHING;
