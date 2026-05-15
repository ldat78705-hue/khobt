import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "KhoĐềToán - Quản lý kho đề thi Toán THCS",
  description:
    "Ứng dụng quản lý kho đề thi và bài tập môn Toán dành cho giáo viên THCS. Hỗ trợ công thức toán, xuất Word/PDF, tạo đề nhanh.",
  keywords: [
    "đề thi toán",
    "THCS",
    "giáo viên",
    "kho đề",
    "bài tập toán",
    "toán 6",
    "toán 7",
    "toán 8",
    "toán 9",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "'Inter', system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
