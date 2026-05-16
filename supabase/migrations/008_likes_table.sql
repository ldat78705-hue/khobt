-- Migration: Tạo bảng likes cho tính năng like bài tập
-- Mỗi user chỉ like 1 lần cho mỗi question

CREATE TABLE IF NOT EXISTS public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_likes_question_id ON public.likes(question_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON public.likes(user_id);
