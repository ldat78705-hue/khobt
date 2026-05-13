"use client";

import Link from "next/link";
import {
  BookOpen,
  FileText,
  Download,
  Search,
  Layers,
  Copy,
  ChevronRight,
  GraduationCap,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Kho bài tập phong phú",
    desc: "Quản lý bài tập theo lớp, chuyên đề, mức độ. Hỗ trợ trắc nghiệm, tự luận, đúng/sai.",
  },
  {
    icon: FileText,
    title: "Tạo đề thi nhanh",
    desc: "Chọn bài tập từ kho, trộn đề, sinh nhiều mã đề chỉ trong vài phút.",
  },
  {
    icon: Download,
    title: "Xuất Word/PDF đẹp",
    desc: "Export đề thi với công thức toán, hình ảnh giữ nguyên. Format chuẩn in đề.",
  },
  {
    icon: Copy,
    title: "Copy sang Word",
    desc: "Một click copy nội dung, paste vào Word giữ nguyên format, hình ảnh, công thức.",
  },
  {
    icon: Search,
    title: "Tìm kiếm thông minh",
    desc: "Tìm kiếm realtime theo nội dung, chuyên đề, mức độ. Lọc nhanh, chính xác.",
  },
  {
    icon: Layers,
    title: "Hệ thống thư mục",
    desc: "Sắp xếp đề thi theo thư mục: Giữa kỳ, Cuối kỳ, Ôn thi, HSG...",
  },
];

const stats = [
  { value: "4", label: "Khối lớp", sub: "Toán 6-9" },
  { value: "15+", label: "Chuyên đề", sub: "Đầy đủ" },
  { value: "4", label: "Mức độ", sub: "NB→VDC" },
  { value: "∞", label: "Bài tập", sub: "Không giới hạn" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              KhoDeToán
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-blue-500/25"
            >
              Đăng ký miễn phí
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-40 right-1/3 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            Miễn phí hoàn toàn cho giáo viên
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 text-balance animate-slide-in-up">
            Quản lý kho đề thi
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Toán THCS
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 animate-slide-in-up" style={{ animationDelay: "100ms" }}>
            Soạn đề nhanh, quản lý bài tập thông minh, xuất Word/PDF đẹp.
            Công cụ không thể thiếu cho giáo viên Toán.
          </p>

          <div className="flex items-center justify-center gap-4 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Bắt đầu ngay
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-slate-700 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
            >
              Đã có tài khoản
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto mt-20 grid grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm animate-scale-in"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm font-medium text-slate-700 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Mọi thứ giáo viên cần
            </h2>
            <p className="text-lg text-slate-500">
              Từ soạn bài tập đến xuất đề thi hoàn chỉnh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Math support section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Hỗ trợ công thức toán
                <span className="text-blue-600"> chuyên nghiệp</span>
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Soạn thảo công thức toán trực quan với MathLive editor. Hiển thị đẹp với KaTeX. 
                Hỗ trợ đầy đủ: phân số, căn thức, hệ phương trình, bảng biến thiên...
              </p>
              <div className="space-y-3">
                {[
                  "LaTeX / KaTeX rendering",
                  "Visual math editor (MathLive)",
                  "Copy giữ nguyên công thức",
                  "Export Word/PDF với công thức",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3 h-3 text-green-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs text-slate-500 ml-2">math-editor.tsx</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div>
                  <span className="text-purple-400">{"\\frac"}</span>
                  <span className="text-yellow-300">{"{x^2 + 1}"}</span>
                  <span className="text-yellow-300">{"{x - 1}"}</span>
                </div>
                <div className="mt-3">
                  <span className="text-purple-400">{"\\sqrt"}</span>
                  <span className="text-yellow-300">{"{a^2 + b^2}"}</span>
                </div>
                <div className="mt-3">
                  <span className="text-purple-400">{"\\begin{cases}"}</span>
                </div>
                <div>
                  <span className="text-cyan-300">{"  2x + y = 5 \\\\"}</span>
                </div>
                <div>
                  <span className="text-cyan-300">{"  x - 3y = 1"}</span>
                </div>
                <div>
                  <span className="text-purple-400">{"\\end{cases}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Bắt đầu soạn đề ngay hôm nay
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Miễn phí, không cần thẻ tín dụng, sử dụng ngay lập tức.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Đăng ký miễn phí
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-slate-500">KhoDeToán</span>
          </div>
          <p>© 2024 KhoDeToán. Công cụ miễn phí cho giáo viên.</p>
        </div>
      </footer>
    </div>
  );
}
