"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, Loader2, ArrowLeft, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Vui lòng nhập email"); return; }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Đã có lỗi xảy ra");
        return;
      }

      setIsSent(true);
      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
      toast.success("Đã tạo link khôi phục mật khẩu!");
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const copyResetUrl = () => {
    navigator.clipboard.writeText(resetUrl);
    toast.success("Đã sao chép link!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">KhoĐềToán</span>
          </Link>
          {isSent ? (
            <div className="py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Tạo link thành công!</h2>
              <p className="text-slate-500 mb-4 text-center text-sm">
                Link khôi phục mật khẩu cho <strong>{email}</strong> đã được tạo.
                <br />Link có hiệu lực trong 30 phút.
              </p>

              {resetUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-xs text-blue-600 font-semibold mb-2">🔗 Link khôi phục:</p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={resetUrl}
                      className="flex-1 text-xs bg-white border border-blue-200 rounded-lg px-3 py-2 text-slate-700 font-mono"
                    />
                    <button
                      onClick={copyResetUrl}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Link
                    href={resetUrl.replace(window.location.origin, '')}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Mở link khôi phục
                  </Link>
                </div>
              )}

              <div className="text-center">
                <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Quên mật khẩu</h1>
              <p className="text-slate-500 mb-6 text-sm">Nhập email để nhận link khôi phục mật khẩu.</p>
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="lienhe@thaydat.edu.vn" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Đang xử lý...</>) : "Gửi link khôi phục"}
                </button>
              </form>
              <p className="mt-6 text-center">
                <Link href="/login" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
