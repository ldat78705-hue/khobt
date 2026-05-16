-- Migration: Thêm cột exam_status cho exams
-- Hỗ trợ flow: personal → pending → approved/rejected (kho chung)

ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS exam_status TEXT DEFAULT 'personal'
  CHECK (exam_status IN ('personal', 'pending', 'approved', 'rejected'));

ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.users(id);
ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS review_note TEXT;
ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS question_count INT DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_exams_exam_status ON public.exams(exam_status);
