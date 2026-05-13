# 📐 KhoDeToán

> Ứng dụng quản lý kho đề thi & bài tập Toán THCS dành cho giáo viên.

## ✨ Tính năng chính

- **📚 Kho bài tập** — CRUD bài tập với LaTeX, ảnh, trắc nghiệm/tự luận
- **📝 Kho đề thi** — Soạn đề từ kho bài tập, xem trước bản in
- **📤 Xuất Word** — Export `.docx` với công thức OMML (chỉnh sửa được trong Word)
- **🔍 Tìm kiếm** — Global search (Ctrl+K), filter theo lớp/chuyên đề/mức độ
- **👥 Phân quyền** — Admin / Giáo viên / Reviewer
- **✅ Duyệt bài** — Workflow duyệt/từ chối bài tập
- **📁 Thư mục** — Phân loại đề thi
- **📥 Import** — Nhập hàng loạt từ file text/markdown
- **🖼️ Cloudinary** — Upload & optimize ảnh minh họa

## 🚀 Cài đặt

```bash
# Clone project
git clone <repo-url>
cd khode

# Cài dependencies
npm install

# Chạy development
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) — ứng dụng sẽ tự chạy ở **chế độ Demo** nếu chưa cấu hình Supabase.

## ⚙️ Cấu hình

Copy `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

### Chế độ Demo (mặc định)
- Không cần cấu hình gì
- Dữ liệu lưu trong localStorage
- Đầy đủ tính năng để trải nghiệm

### Production (Supabase)
1. Tạo project tại [supabase.com](https://supabase.com)
2. Chạy migrations trong `supabase/migrations/` theo thứ tự
3. Điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào `.env.local`

### Cloudinary (upload ảnh)
1. Đăng ký tại [cloudinary.com](https://cloudinary.com)
2. Điền `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## 🗂️ Cấu trúc dự án

```
src/
├── app/
│   ├── (auth)/          # Login, Register, Forgot Password
│   ├── (dashboard)/     # Dashboard, Questions, Exams, Folders, Admin
│   └── api/upload/      # Cloudinary upload API
├── components/
│   ├── dashboard/       # Header, Sidebar
│   └── shared/          # MathRenderer, ImageUpload
├── lib/
│   ├── supabase/        # Supabase client/server
│   ├── export/          # Word export, Clipboard
│   ├── demo-data.ts     # Demo mode data provider
│   ├── cloudinary.ts    # Cloudinary helpers
│   └── utils.ts         # Utility functions
├── stores/              # Zustand stores
└── types/               # TypeScript types
```

## 🏗️ Tech Stack

| | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Math | KaTeX |
| Export | docx.js (OMML) |
| Images | Cloudinary |

## 📊 Routes (20)

| Route | Mô tả |
|---|---|
| `/` | Landing page |
| `/login` | Đăng nhập |
| `/register` | Đăng ký |
| `/forgot-password` | Quên mật khẩu |
| `/dashboard` | Tổng quan |
| `/questions` | Kho bài tập |
| `/questions/new` | Thêm bài tập |
| `/questions/[id]` | Chi tiết bài tập |
| `/questions/[id]/edit` | Sửa bài tập |
| `/exams` | Kho đề thi |
| `/exams/new` | Tạo đề thi |
| `/exams/[id]` | Chi tiết đề + print preview |
| `/exams/[id]/edit` | Soạn đề |
| `/folders` | Thư mục |
| `/admin/review` | Duyệt bài tập |
| `/admin/categories` | Quản lý danh mục |
| `/admin/users` | Quản lý người dùng |
| `/admin/settings` | Cài đặt hệ thống |

## 🚢 Deploy Production

### 1. Supabase
```bash
# Tạo project tại supabase.com → Free Plan → Region: Singapore
# Chạy migrations trong SQL Editor theo thứ tự:
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_permissions_categories.sql
supabase/migrations/003_production_ready.sql
```

### 2. Vercel
```bash
git add . && git commit -m "Production ready"
git push origin main
# Vercel → Import repo → Set environment variables
```

### 3. Environment Variables (Vercel Dashboard)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=khodetoan_unsigned
```

### 4. UptimeRobot (giữ Supabase sống)
- Monitor: `GET https://your-app.vercel.app/api/health` — 5 phút

### 📊 Dung lượng miễn phí

| Tài nguyên | Giới hạn | Đủ cho |
|-----------|:--------:|:------:|
| Database | 500 MB | ~5000 GV (shared pool) |
| Auth | 50K MAU | ~50,000 GV |
| Cloudinary (×3) | 75 credits | ~60,000 ảnh |
| Bandwidth | 100 GB/tháng | ~500 GV active/ngày |

## 📄 License

MIT

