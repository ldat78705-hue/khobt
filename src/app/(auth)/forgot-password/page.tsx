"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Vui lòng nhập email"); return; }
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) { toast.error(error.message); return; }
      setIsSent(true);
      toast.success("Đã gửi email khôi phục mật khẩu!");
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">KhoDeToán</span>
          </Link>
          {isSent ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Kiểm tra email</h2>
              <p className="text-slate-500 mb-6">Chúng tôi đã gửi link khôi phục mật khẩu tới <strong>{email}</strong></p>
              <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
                <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Quên mật khẩu</h1>
              <p className="text-slate-500 mb-6">Nhập email để nhận link khôi phục mật khẩu.</p>
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="teacher@school.edu.vn" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Đang gửi...</>) : "Gửi link khôi phục"}
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
