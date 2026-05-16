-- Migration: Tạo bảng reports cho tính năng báo cáo bài tập
-- GV có thể báo cáo bài tập sai/lỗi

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES public.users(id)
);

CREATE INDEX IF NOT EXISTS idx_reports_question_id ON public.reports(question_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
