"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Database, Download, AlertTriangle, Shield, HardDrive, Upload, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { isDemoMode } from "@/lib/demo-data";

export default function BackupPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRestoreFile(e.target.files[0]);
    }
  };

  const handleRestore = async () => {
    if (isDemoMode) {
      toast.error("Tính năng phục hồi không khả dụng trong chế độ Demo.");
      return;
    }
    if (!restoreFile) return;

    if (!confirm("CẢNH BÁO: Quá trình này sẽ GHI ĐÈ dữ liệu hiện tại bằng dữ liệu từ file sao lưu. Khuyến cáo thực hiện lúc hệ thống ít người truy cập. Bạn có chắc chắn muốn tiếp tục?")) {
      return;
    }

    setIsRestoring(true);
    toast.info("Đang đọc file và phục hồi dữ liệu...");

    try {
      const text = await restoreFile.text();
      let jsonData;
      try {
        jsonData = JSON.parse(text);
      } catch (err) {
        throw new Error("File không phải định dạng JSON hợp lệ.");
      }

      if (!jsonData.version || !jsonData.data) {
        throw new Error("File sao lưu không đúng cấu trúc của hệ thống.");
      }

      const res = await fetch('/api/admin/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Không thể phục hồi dữ liệu.");
      }

      toast.success("Phục hồi dữ liệu thành công!");
      setRestoreFile(null);
      // Optional: reset file input via ref
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi trong quá trình phục hồi.");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleExport = async () => {
    if (isDemoMode) {
      toast.error("Tính năng sao lưu không khả dụng trong chế độ Demo.");
      return;
    }
    
    setIsExporting(true);
    toast.info("Đang tạo bản sao lưu...");
    try {
      const res = await fetch('/api/admin/backup');
      if (!res.ok) throw new Error("Không thể sao lưu dữ liệu");
      
      // Get filename from Content-Disposition header if available
      const disposition = res.headers.get('Content-Disposition');
      let filename = `khode_backup_${new Date().toISOString().split('T')[0]}.json`;
      if (disposition && disposition.indexOf('filename=') !== -1) {
        const matches = /filename="([^"]*)"/.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1];
        }
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Tải xuống bản sao lưu thành công!");
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi tải bản sao lưu");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Header title="Sao lưu dữ liệu" subtitle="Bảo vệ và lưu trữ dữ liệu hệ thống" />
      <div className="p-6 max-w-4xl space-y-6">
        
        {/* Warning Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-800">Lưu ý bảo mật quan trọng</h3>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Bản sao lưu chứa toàn bộ thông tin hệ thống bao gồm: Danh sách người dùng (ngoại trừ mật khẩu), dữ liệu danh mục, toàn bộ kho bài tập, đáp án, và đề thi. Hãy lưu trữ file sao lưu này ở nơi an toàn, bảo mật tuyệt đối, không chia sẻ công khai.
            </p>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Xuất dữ liệu toàn hệ thống</h2>
              <p className="text-sm text-slate-500">Tạo một file định dạng JSON chứa toàn bộ dữ liệu hiện tại.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Database (PostgreSQL)</span>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">Đang hoạt động</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Quyền truy cập</span>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">Chỉ Admin</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md shadow-blue-500/20"
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Đang sao lưu...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Bắt đầu tải sao lưu (.json)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Restore Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Upload className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Phục hồi dữ liệu (Restore)</h2>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
            <p className="text-xs text-amber-800 font-medium">Cảnh báo: Việc phục hồi từ file JSON sẽ nạp lại dữ liệu cũ. Nếu dữ liệu trùng ID, nó sẽ bị ghi đè hoàn toàn bởi bản sao lưu. Việc này không thể hoàn tác!</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              disabled={isRestoring}
              className="flex-1 block w-full text-sm text-slate-500
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100 transition-all cursor-pointer"
            />
            <button
              onClick={handleRestore}
              disabled={!restoreFile || isRestoring}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md w-full sm:w-auto justify-center"
            >
              {isRestoring ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Đang phục hồi...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Phục hồi
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
