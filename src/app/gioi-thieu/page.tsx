import Link from 'next/link';
import { ArrowRight, BookOpen, Presentation, Layers, UploadCloud, Heart, Users } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';

export const metadata = {
  title: 'Thư mời hợp tác | BTToan.Com',
  description: 'Thư mời hợp tác và hướng dẫn sử dụng nền tảng chia sẻ và quản lý bài tập Toán học hiện đại nhất hiện nay.',
};

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar đơn giản */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              BTToan.Com
            </span>
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Đăng nhập
            </Link>
            <Link href="https://zalo.me/g/zjuqjm275" target="_blank" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Tham gia Zalo
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Thư Mời Hợp Tác & Chia Sẻ
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cùng xây dựng một cộng đồng giáo viên Toán vững mạnh, giảm bớt gánh nặng soạn giảng và tạo ra ngân hàng dữ liệu bài tập khổng lồ, chuẩn mực.
          </p>
        </div>

        {/* Cấu trúc bài viết */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 space-y-12">
          
          {/* Lời mở đầu */}
          <section className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600">
            <p>
              <strong>Kính gửi Quý thầy, cô giáo bộ môn Toán thân mến!</strong>
            </p>
            <p>
              Hôm nay tôi xin trân trọng giới thiệu đến quý thầy cô nền tảng <strong>BTToan.Com</strong> – Nền tảng chia sẻ và quản lý bài tập Toán học hiện đại nhất hiện nay.
              Chúng tôi đang tìm kiếm những thầy cô tâm huyết cùng tham gia đóng góp bài tập, xây dựng "kho báu" dữ liệu chung. 
              <br />
              <strong className="text-blue-600">Đóng góp một lần – Sử dụng mãi mãi – Chia sẻ cùng cộng đồng!</strong>
            </p>
          </section>

          {/* 5 Ưu điểm */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">🌟</span>
              5 Ưu Điểm Vượt Trội
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <Layers className="w-6 h-6 text-indigo-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Cấu trúc chuẩn SGK Mới (KNTT)</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Hệ thống danh mục Lớp 4-9 bám sát 100% chương trình Kết nối tri thức. Phân chia khoa học từng Chủ đề, Bài học.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <UploadCloud className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Import Word (MathType) Tự Động</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">AI nhận diện tự động cấu trúc đề từ Word, bóc tách Câu hỏi/Đáp án/Lời giải và chuyển MathType sang chuẩn web 1 nốt nhạc.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <Presentation className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Trình Chiếu Trên Lớp (Slide Mode)</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Đề bài, đáp án và lời giải chi tiết được tách thành từng trang độc lập, điều khiển bằng bàn phím ngay trên lớp học thay thế PowerPoint.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <Heart className="w-6 h-6 text-pink-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Quản Lý Cá Nhân Hóa</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Dễ dàng tạo Đề thi, nhóm các bài tập yêu thích vào thư mục cá nhân, chia sẻ nhanh chóng với đồng nghiệp.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Hướng dẫn sử dụng */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">📖</span>
              Hướng Dẫn Đóng Góp Bài Tập
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Cách 1: Import từ File Word (Khuyên dùng)</h3>
                <p className="text-slate-600 mb-3 text-sm">Nhanh nhất nếu thầy cô đã có sẵn file Word chứa MathType.</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 text-sm bg-slate-50 p-5 rounded-2xl">
                  <li>Tại Menu bên trái, chọn <strong>Import Word</strong>.</li>
                  <li>Tải lên file Word (.docx) của thầy cô.</li>
                  <li>Hệ thống tự động quét và bóc tách cấu trúc câu hỏi.</li>
                  <li>Rà soát, gán bài tập vào đúng <strong>Lớp</strong>, <strong>Chương</strong>, <strong>Bài học</strong> và bấm <strong>Lưu tất cả</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Cách 2: Đăng bài thủ công</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 text-sm bg-slate-50 p-5 rounded-2xl">
                  <li>Nhấn nút <strong>+ Thêm bài tập</strong> màu xanh ở góc trái màn hình.</li>
                  <li>Nhập nội dung (hỗ trợ Toán chuẩn LaTeX).</li>
                  <li>Phân loại Khối lớp, Bài học, Mức độ. Nhập Đáp án & Lời giải.</li>
                  <li>Bấm <strong>Lưu</strong> để đẩy bài tập lên kho dữ liệu chung.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Khai thác dữ liệu */}
          <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              Khai thác kho dữ liệu
            </h2>
            <ul className="space-y-3 text-blue-800 text-sm list-disc list-inside">
              <li>Sử dụng thanh tìm kiếm hoặc bộ lọc theo Lớp/Bài học để lấy ngay bài tập cần thiết.</li>
              <li>Thấy bài hay, nhấn biểu tượng <strong>Trái tim</strong> để lưu vào bộ sưu tập cá nhân.</li>
              <li>Khi lên lớp, mở bài tập và bấm nút <strong>Trình chiếu</strong> (phím tắt F) để giảng bài cực kỳ chuyên nghiệp.</li>
            </ul>
          </section>

          {/* CTA */}
          <section className="text-center py-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              "Một cây làm chẳng nên non..."
            </h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Nếu mỗi thầy cô chỉ cần đóng góp 1 file Word bài tập của một bài học, chúng ta sẽ sớm có một kho dữ liệu Toán học khổng lồ, chuẩn mực và hoàn toàn miễn phí.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Đăng nhập & Bắt đầu <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="https://zalo.me/g/zjuqjm275" 
                target="_blank"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" /> Tham gia Group Zalo
              </Link>
            </div>
          </section>

        </div>
        
        <footer className="text-center mt-12 text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} BTToan.Com - Tất cả vì cộng đồng giáo viên Toán.</p>
        </footer>
      </main>
    </div>
  );
}
