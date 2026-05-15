"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Đăng ký thất bại");
        return;
      }
      
      if (data.needsApproval) {
        setRegistrationDone(true);
        toast.success("Đăng ký thành công! Vui lòng chờ admin duyệt.");
      } else {
        toast.success("Đăng ký thành công! Đang chuyển hướng...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">KhoĐềToán</span>
          </Link>
          {registrationDone ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Đăng ký thành công!</h2>
              <p className="text-slate-500 mb-2">
                Tài khoản của bạn đang chờ admin duyệt.
              </p>
              <p className="text-sm text-slate-400 mb-6">
                Bạn sẽ nhận thông báo qua email khi tài khoản được duyệt.
                <br />Liên hệ: <strong>lienhe@thaydat.edu.vn</strong>
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25">
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
          <>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Đăng ký</h1>
          <p className="text-slate-500 mb-8">Tạo tài khoản miễn phí để bắt đầu quản lý kho đề.</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input id="register-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="lienhe@thaydat.edu.vn" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input id="register-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ít nhất 6 ký tự" className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input id="register-confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>
            <button id="register-submit" type="submit" disabled={isLoading} className="w-full py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Đang đăng ký...</>) : "Đăng ký"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-500">
            Đã có tài khoản? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Đăng nhập</Link>
          </p>
          </>
          )}
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Bắt đầu miễn phí</h2>
          <p className="text-blue-100 text-lg">Không giới hạn bài tập, không giới hạn đề thi.</p>
        </div>
      </div>
    </div>
  );
}
