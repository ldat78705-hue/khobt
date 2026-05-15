-- Migration: Thêm cột is_approved cho duyệt tài khoản giáo viên
-- Chạy trên Neon Console: https://console.neon.tech

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;

-- Admin hiện tại đã được duyệt
UPDATE public.users SET is_approved = true WHERE role = 'admin';
-- Tất cả user đang hoạt động cũng được duyệt
UPDATE public.users SET is_approved = true WHERE is_active = true;
