-- ==========================================
-- KhoDeToán - Schema V3: Production-ready improvements
-- Chạy SAU migration 002
-- ==========================================

-- ==========================================
-- Full-text search cho questions
-- ==========================================

-- Thêm cột tsvector cho tìm kiếm nhanh
ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Function cập nhật search_vector
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

-- Trigger tự cập nhật khi insert/update
CREATE TRIGGER update_questions_search_vector
  BEFORE INSERT OR UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_question_search_vector();

-- Index GIN cho tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_questions_search ON public.questions USING GIN(search_vector);

-- Cập nhật search_vector cho dữ liệu hiện có
UPDATE public.questions SET search_vector = 
  setweight(to_tsvector('simple', COALESCE(content, '')), 'A') ||
  setweight(to_tsvector('simple', COALESCE(answer, '')), 'B') ||
  setweight(to_tsvector('simple', COALESCE(solution, '')), 'C') ||
  setweight(to_tsvector('simple', COALESCE(array_to_string(tags, ' '), '')), 'B');

-- ==========================================
-- Admin policies bổ sung
-- ==========================================

-- Admin có thể xem tất cả exams
CREATE POLICY "Admins can view all exams"
  ON public.exams FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin có thể xem tất cả exam_questions
CREATE POLICY "Admins can view all exam questions"
  ON public.exam_questions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin có thể xem tất cả folders
CREATE POLICY "Admins can view all folders"
  ON public.folders FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ==========================================
-- Compound indexes cho query performance
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_questions_grade_topic ON public.questions(grade, topic);
CREATE INDEX IF NOT EXISTS idx_questions_grade_difficulty ON public.questions(grade, difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_status_created ON public.questions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_exam_questions_exam_sort ON public.exam_questions(exam_id, sort_order);

-- ==========================================
-- View: Question stats per grade
-- ==========================================
CREATE OR REPLACE VIEW public.question_stats AS
SELECT 
  grade,
  topic,
  difficulty,
  status,
  COUNT(*) as count
FROM public.questions
GROUP BY grade, topic, difficulty, status;
