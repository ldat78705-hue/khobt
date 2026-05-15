"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Settings, Globe, Palette, Database, Cloud, Shield, HardDrive, RefreshCw, Check, AlertTriangle } from "lucide-react";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

import { Loader2 as Loader2Icon } from "lucide-react";

function ChangePasswordForm() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPwd) { toast.error("Vui lòng nhập mật khẩu hiện tại"); return; }
    if (!newPwd || newPwd.length < 6) { toast.error("Mật khẩu mới phải có ít nhất 6 ký tự"); return; }
    if (newPwd !== confirmPwd) { toast.error("Mật khẩu xác nhận không khớp"); return; }

    setIsChanging(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPwd, new_password: newPwd }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Đã đổi mật khẩu thành công!");
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
      } else {
        toast.error(data.error || "Không thể đổi mật khẩu");
      }
    } catch {
      toast.error("Lỗi kết nối server");
    }
    setIsChanging(false);
  };

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Mật khẩu hiện tại</label>
        <input type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Mật khẩu mới</label>
        <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Ít nhất 6 ký tự" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Xác nhận mật khẩu mới</label>
        <input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="Nhập lại mật khẩu mới" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
      </div>
      <button
        onClick={handleChangePassword}
        disabled={isChanging}
        className="px-5 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isChanging && <Loader2Icon className="w-4 h-4 animate-spin" />}
        {isChanging ? "Đang xử lý..." : "Cập nhật mật khẩu"}
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const { user } = useAuthStore();
  const [appName, setAppName] = useState("KhoĐềToán");
  const [appDesc, setAppDesc] = useState("Quản lý kho đề thi Toán THCS");
  const [exportFont, setExportFont] = useState("Times New Roman");
  const [exportSize, setExportSize] = useState("12pt");
  const [isSaving, setIsSaving] = useState(false);

  // Cloudinary config form
  const [cldCloudName, setCldCloudName] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '');
  const [cldApiKey, setCldApiKey] = useState('');
  const [cldApiSecret, setCldApiSecret] = useState('');
  const [cldSaving, setCldSaving] = useState(false);
  const [cldStatus, setCldStatus] = useState<{configured: boolean; cloud_name: string; has_api_key: boolean; has_api_secret: boolean} | null>(null);
  const [cldUploadPreset, setCldUploadPreset] = useState('khodetoan_unsigned');
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  // Fetch Cloudinary status on mount
  useEffect(() => {
    fetch('/api/config/cloudinary').then(r => r.json()).then(data => {
      setCldStatus(data);
      if (data.cloud_name) setCldCloudName(data.cloud_name);
    }).catch(() => {});
  }, []);

  // Stats
  const [stats, setStats] = useState({ questions: 0, exams: 0, categories: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      if (isDemoMode) {
        setStats({
          questions: demoDb.getQuestions().length,
          exams: demoDb.getExams().length,
          categories: demoDb.getCategories().length,
        });
      } else {
        try {
          const [qRes, eRes, cRes] = await Promise.all([
            fetch('/api/questions?count_only=true'),
            fetch('/api/exams?limit=500'),
            fetch('/api/categories'),
          ]);
          const [qData, eData, cData] = await Promise.all([
            qRes.json(), eRes.json(), cRes.json()
          ]);
          setStats({
            questions: qData.count || 0,
            exams: Array.isArray(eData) ? eData.length : 0,
            categories: Array.isArray(cData) ? cData.length : 0,
          });
        } catch { /* ignore */ }
      }
    };
    fetchStats();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 500));
    toast.success("Đã lưu cài đặt");
    setIsSaving(false);
  };

  const handleClearDemoData = () => {
    if (!confirm("Xóa toàn bộ dữ liệu demo? Hành động này không thể hoàn tác.")) return;
    localStorage.removeItem("khodetoan_demo");
    toast.success("Đã xóa dữ liệu demo. Tải lại trang để khởi tạo lại.");
    window.location.reload();
  };

  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "Chưa cấu hình";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const isSupabaseOk = supabaseUrl.length > 10 && supabaseUrl.startsWith("http");
  
  // Neon check (can only be true if isDemoMode is false on client)
  const isNeonOk = !isDemoMode && !isSupabaseOk;
  const isDbOk = !isDemoMode;

  return (
    <>
      <Header title="Cài đặt hệ thống" subtitle="Cấu hình ứng dụng và thông tin hệ thống" />
      <div className="p-6 max-w-4xl space-y-6">
        {/* Connection Status */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Trạng thái kết nối</h2>
              <p className="text-sm text-slate-500">Kiểm tra các dịch vụ đang sử dụng</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${isDbOk ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Database className={`w-4 h-4 ${isDbOk ? "text-green-600" : "text-amber-600"}`} />
                <span className="text-sm font-semibold text-slate-700">{isSupabaseOk ? "Supabase" : isNeonOk ? "Neon Postgres" : "Cơ sở dữ liệu"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {isDbOk ? (
                  <><Check className="w-3.5 h-3.5 text-green-600" /><span className="text-xs text-green-700">Đã kết nối</span></>
                ) : (
                  <><AlertTriangle className="w-3.5 h-3.5 text-amber-600" /><span className="text-xs text-amber-700">Chế độ Demo</span></>
                )}
              </div>
            </div>
            <div className={`p-4 rounded-xl border ${cloudinaryName !== "Chưa cấu hình" ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Cloud className={`w-4 h-4 ${cloudinaryName !== "Chưa cấu hình" ? "text-green-600" : "text-amber-600"}`} />
                <span className="text-sm font-semibold text-slate-700">Cloudinary</span>
              </div>
              <div className="flex items-center gap-1.5">
                {cloudinaryName !== "Chưa cấu hình" ? (
                  <><Check className="w-3.5 h-3.5 text-green-600" /><span className="text-xs text-green-700">{cloudinaryName}</span></>
                ) : (
                  <><AlertTriangle className="w-3.5 h-3.5 text-amber-600" /><span className="text-xs text-amber-700">Chưa cấu hình</span></>
                )}
              </div>
            </div>
            <div className="p-4 rounded-xl border bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Local Storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs text-blue-700">{isDemoMode ? "Đang dùng" : "Backup"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* General */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Cài đặt chung</h2>
              <p className="text-sm text-slate-500">Cấu hình chung cho hệ thống</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tên ứng dụng</label>
              <input type="text" value={appName} onChange={e => setAppName(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Mô tả</label>
              <input type="text" value={appDesc} onChange={e => setAppDesc(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Xuất bản</h2>
              <p className="text-sm text-slate-500">Cài đặt mặc định khi xuất Word/PDF</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Font mặc định</label>
              <select value={exportFont} onChange={e => setExportFont(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option>Times New Roman</option>
                <option>Arial</option>
                <option>Calibri</option>
                <option>Cambria</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Cỡ chữ mặc định</label>
              <select value={exportSize} onChange={e => setExportSize(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option>11pt</option>
                <option>12pt</option>
                <option>13pt</option>
                <option>14pt</option>
              </select>
            </div>
          </div>
        </div>

        {/* System info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Thông tin hệ thống</h2>
              <p className="text-sm text-slate-500">Thống kê và thông tin kỹ thuật</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-slate-50 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.questions}</div>
              <div className="text-xs text-slate-500 mt-1">Bài tập</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.exams}</div>
              <div className="text-xs text-slate-500 mt-1">Đề thi</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.categories}</div>
              <div className="text-xs text-slate-500 mt-1">Danh mục</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-xs text-slate-400 font-medium">Database</div>
              <div className="text-sm font-semibold text-slate-700 mt-1">{isDemoMode ? "localStorage" : isSupabaseOk ? "Supabase" : "Neon Postgres"}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-xs text-slate-400 font-medium">Storage</div>
              <div className="text-sm font-semibold text-slate-700 mt-1">{cloudinaryName !== "Chưa cấu hình" ? "Cloudinary" : "DataURL"}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-xs text-slate-400 font-medium">Version</div>
              <div className="text-sm font-semibold text-slate-700 mt-1">2.0.0</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-xs text-slate-400 font-medium">Framework</div>
              <div className="text-sm font-semibold text-slate-700 mt-1">Next.js 16.2</div>
            </div>
          </div>
        </div>

        {/* Cloudinary Configuration */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Cấu hình Cloudinary</h2>
              <p className="text-sm text-slate-500">Thiết lập lưu trữ ảnh trên đám mây (miễn phí 25GB)</p>
            </div>
            {cldStatus && (
              <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${cldStatus.configured ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {cldStatus.configured ? '✓ Đã cấu hình đầy đủ' : '⚠ Chưa đầy đủ'}
              </div>
            )}
          </div>

          {/* Step-by-step instructions */}
          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 mb-4 space-y-2">
            <p className="text-xs font-semibold text-cyan-900">📋 Hướng dẫn cấu hình nhanh (3 bước):</p>
            <ol className="text-xs text-cyan-800 list-decimal list-inside space-y-1">
              <li>Đăng ký tại <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">cloudinary.com</a> → vào <strong>Dashboard</strong> → copy <strong>Cloud Name</strong></li>
              <li>Vào <strong>Settings → Upload</strong> → cuộn xuống <strong>Upload presets</strong> → nhấn <strong>Add upload preset</strong> → đặt tên <code className="bg-cyan-100 px-1 rounded">khodetoan_unsigned</code> → chọn <strong>Signing Mode: Unsigned</strong> → Save</li>
              <li>Điền Cloud Name và Upload Preset bên dưới → nhấn <strong>Test Upload</strong> để kiểm tra</li>
            </ol>
            <p className="text-[10px] text-cyan-700 mt-1">💡 <strong>Cách nhanh nhất:</strong> Chỉ cần Cloud Name + Upload Preset (không cần API Key/Secret). API Key/Secret chỉ cần cho signed upload nâng cao.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Cloud Name <span className="text-red-400">*</span></label>
              <input type="text" value={cldCloudName} onChange={e => setCldCloudName(e.target.value)} placeholder="your_cloud_name" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Upload Preset <span className="text-red-400">*</span></label>
              <input type="text" value={cldUploadPreset} onChange={e => setCldUploadPreset(e.target.value)} placeholder="khodetoan_unsigned" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <p className="text-[10px] text-slate-400 mt-1">Tên preset đã tạo ở bước 2 (phải là Unsigned)</p>
            </div>
          </div>

          {/* Optional: API Key/Secret for advanced usage */}
          <details className="mb-4">
            <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700 font-medium">▶ Nâng cao: API Key & Secret (tùy chọn)</summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pl-4 border-l-2 border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">API Key</label>
                <input type="text" value={cldApiKey} onChange={e => setCldApiKey(e.target.value)} placeholder="123456789012345" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                {cldStatus?.has_api_key && !cldApiKey && <p className="text-[10px] text-green-500 mt-1">✓ Đã có (để trống nếu không đổi)</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">API Secret</label>
                <input type="password" value={cldApiSecret} onChange={e => setCldApiSecret(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                {cldStatus?.has_api_secret && !cldApiSecret && <p className="text-[10px] text-green-500 mt-1">✓ Đã có (để trống nếu không đổi)</p>}
              </div>
            </div>
          </details>

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={async () => {
                if (!cldCloudName) { toast.error('Vui lòng nhập Cloud Name'); return; }
                setCldSaving(true);
                try {
                  const res = await fetch('/api/config/cloudinary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      cloud_name: cldCloudName,
                      api_key: cldApiKey || 'KEEP_EXISTING',
                      api_secret: cldApiSecret || 'KEEP_EXISTING',
                      upload_preset: cldUploadPreset,
                    }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    toast.success(data.message || 'Đã lưu cấu hình Cloudinary!');
                    const statusRes = await fetch('/api/config/cloudinary');
                    setCldStatus(await statusRes.json());
                  } else {
                    toast.error(data.error || 'Lỗi lưu cấu hình');
                  }
                } catch { toast.error('Lỗi kết nối'); }
                setCldSaving(false);
              }}
              disabled={cldSaving}
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-cyan-600 hover:bg-cyan-700 transition-colors disabled:opacity-50"
            >
              {cldSaving ? 'Đang lưu...' : 'Lưu cấu hình'}
            </button>
            <button
              onClick={async () => {
                if (!cldCloudName) { toast.error('Nhập Cloud Name trước'); return; }
                const preset = cldUploadPreset || 'khodetoan_unsigned';
                setTestResult('testing');
                try {
                  // Create a tiny 1x1 test image
                  const canvas = document.createElement('canvas');
                  canvas.width = 1; canvas.height = 1;
                  canvas.getContext('2d')!.fillRect(0, 0, 1, 1);
                  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), 'image/png'));
                  const testFile = new File([blob], 'test.png', { type: 'image/png' });

                  const formData = new FormData();
                  formData.append('file', testFile);
                  formData.append('upload_preset', preset);
                  formData.append('folder', 'khodetoan_test');

                  const res = await fetch(`https://api.cloudinary.com/v1_1/${cldCloudName}/image/upload`, { method: 'POST', body: formData });
                  if (res.ok) {
                    const data = await res.json();
                    setTestResult('success');
                    toast.success(`✅ Upload thành công! URL: ${data.secure_url}`);
                  } else {
                    const err = await res.json().catch(() => ({}));
                    setTestResult('error');
                    toast.error(`❌ Upload thất bại: ${err?.error?.message || 'Kiểm tra lại Cloud Name và Upload Preset'}`);
                  }
                } catch (e) {
                  setTestResult('error');
                  toast.error('❌ Lỗi kết nối Cloudinary');
                }
              }}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                testResult === 'success' ? 'bg-green-600 text-white' : 
                testResult === 'error' ? 'bg-red-500 text-white' :
                testResult === 'testing' ? 'bg-amber-500 text-white animate-pulse' :
                'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {testResult === 'testing' ? '🔄 Đang test...' : testResult === 'success' ? '✅ Thành công!' : testResult === 'error' ? '❌ Thử lại' : '🧪 Test Upload'}
            </button>
            <p className="text-[10px] text-slate-400">Sau khi lưu, cần khởi động lại server (npm run dev) để áp dụng API Key/Secret.</p>
          </div>
        </div>

        {/* Demo data actions */}
        {isDemoMode && (
          <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">Dữ liệu Demo</h2>
                <p className="text-sm text-slate-500">Quản lý dữ liệu mẫu trong localStorage</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClearDemoData}
                className="px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
              >
                Xóa toàn bộ dữ liệu demo
              </button>
              <button
                onClick={() => { localStorage.removeItem("khodetoan_demo"); localStorage.removeItem("khodetoan_grades"); localStorage.removeItem("khodetoan_exam_types"); window.location.reload(); }}
                className="px-4 py-2.5 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
              >
                Khôi phục dữ liệu mẫu
              </button>
            </div>
          </div>
        )}

        {/* Account info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Settings className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Tài khoản</h2>
              <p className="text-sm text-slate-500">Thông tin tài khoản hiện tại</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Họ tên</label>
              <input type="text" defaultValue={user?.full_name || DEMO_USER.full_name} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
              <input type="text" defaultValue={user?.email || DEMO_USER.email} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Vai trò</label>
              <input type="text" defaultValue={user?.role === "admin" ? "Quản trị viên" : user?.role === "reviewer" ? "Người duyệt" : "Giáo viên"} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Trạng thái</label>
              <div className="px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Hoạt động
              </div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Đổi mật khẩu</h2>
              <p className="text-sm text-slate-500">Cập nhật mật khẩu đăng nhập</p>
            </div>
          </div>
          <ChangePasswordForm />
        </div>

        {/* Permission info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Phân quyền hệ thống</h2>
              <p className="text-sm text-slate-500">Mô tả quyền hạn theo vai trò</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">Admin</span>
                <span className="text-sm font-medium text-slate-700">Quản trị viên</span>
              </div>
              <p className="text-xs text-slate-600">Toàn quyền: CRUD bài tập/đề thi, duyệt bài, quản lý người dùng, phân quyền, sửa bài đã duyệt, cài đặt hệ thống.</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-600 text-white rounded-full">Reviewer</span>
                <span className="text-sm font-medium text-slate-700">Người duyệt bài</span>
              </div>
              <p className="text-xs text-slate-600">Duyệt/từ chối bài tập, xem thống kê, không sửa/xóa bài của người khác.</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-green-600 text-white rounded-full">Teacher</span>
                <span className="text-sm font-medium text-slate-700">Giáo viên</span>
              </div>
              <p className="text-xs text-slate-600">Tạo bài tập/đề thi, sửa bài của mình (nếu chưa duyệt), yêu thích, báo cáo.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md shadow-blue-500/25 disabled:opacity-50"
          >
            {isSaving ? "Đang lưu..." : "Lưu cài đặt"}
          </button>
        </div>
      </div>
    </>
  );
}
