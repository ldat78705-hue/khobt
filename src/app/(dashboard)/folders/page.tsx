"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, FolderOpen, Trash2, Edit, MoreHorizontal, ChevronRight, Palette } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Folder } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#EF4444", "#F59E0B", "#22C55E", "#06B6D4", "#6366F1"];

export default function FoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderColor, setNewFolderColor] = useState("#3B82F6");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchFolders = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setFolders(demoDb.getFolders());
      } else {
        const supabase = createClient();
        const { data, error } = await supabase.from("folders").select("*").order("sort_order").order("created_at");
        if (error) throw error;
        setFolders(data || []);
      }
    } catch {
      toast.error("Không thể tải thư mục");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchFolders(); }, [fetchFolders]);

  const createFolder = async () => {
    if (!newFolderName.trim()) { toast.error("Vui lòng nhập tên thư mục"); return; }
    try {
      if (isDemoMode) {
        demoDb.createFolder({ name: newFolderName.trim(), color: newFolderColor });
      } else {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { error } = await supabase.from("folders").insert({ name: newFolderName.trim(), color: newFolderColor, user_id: user.id });
        if (error) throw error;
      }
      toast.success("Đã tạo thư mục");
      setNewFolderName(""); setShowCreateModal(false);
      fetchFolders();
    } catch {
      toast.error("Không thể tạo thư mục");
    }
  };

  const updateFolder = async (id: string) => {
    if (!editName.trim()) return;
    try {
      if (isDemoMode) {
        // Not in demoDb yet, skip for now
      } else {
        const supabase = createClient();
        const { error } = await supabase.from("folders").update({ name: editName.trim() }).eq("id", id);
        if (error) throw error;
      }
      toast.success("Đã cập nhật");
      setEditingId(null);
      fetchFolders();
    } catch {
      toast.error("Không thể cập nhật");
    }
  };

  const deleteFolder = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa thư mục này?")) return;
    try {
      if (isDemoMode) {
        demoDb.deleteFolder(id);
      } else {
        const supabase = createClient();
        const { error } = await supabase.from("folders").delete().eq("id", id);
        if (error) throw error;
      }
      toast.success("Đã xóa thư mục");
      fetchFolders();
    } catch {
      toast.error("Không thể xóa thư mục");
    }
  };

  const rootFolders = folders.filter((f) => !f.parent_id);

  return (
    <>
      <Header
        title="Thư mục"
        subtitle={`${folders.length} thư mục`}
        actions={
          <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 shadow-sm">
            <Plus className="w-4 h-4" /> Tạo thư mục
          </button>
        }
      />
      <div className="p-6 space-y-4">
        {/* Create modal */}
        {showCreateModal && (
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm animate-scale-in">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Tạo thư mục mới</h3>
            <div className="space-y-4">
              <input type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && createFolder()} placeholder="Tên thư mục..." autoFocus className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Màu sắc</label>
                <div className="flex gap-2">
                  {COLORS.map((color) => (
                    <button key={color} onClick={() => setNewFolderColor(color)} className={cn("w-8 h-8 rounded-lg transition-all", newFolderColor === color && "ring-2 ring-offset-2 ring-blue-500")} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={createFolder} className="px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90">Tạo</button>
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Hủy</button>
              </div>
            </div>
          </div>
        )}

        {/* Folders grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="skeleton h-12 w-12 rounded-xl mb-3" />
                <div className="skeleton h-4 w-3/4 mb-2" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : rootFolders.length === 0 && !showCreateModal ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Chưa có thư mục nào</h3>
            <p className="text-slate-500 mb-6">Tạo thư mục để sắp xếp đề thi.</p>
            <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md shadow-blue-500/25">
              <Plus className="w-4 h-4" /> Tạo thư mục đầu tiên
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rootFolders.map((folder) => (
              <div key={folder.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${folder.color}15` }}>
                    <FolderOpen className="w-6 h-6" style={{ color: folder.color }} />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingId(folder.id); setEditName(folder.name); }} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => deleteFolder(folder.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {editingId === folder.id ? (
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && updateFolder(folder.id)} onBlur={() => updateFolder(folder.id)} autoFocus className="w-full px-2 py-1 border border-blue-300 rounded-lg text-sm focus:outline-none" />
                ) : (
                  <h3 className="font-semibold text-slate-800 truncate">{folder.name}</h3>
                )}
                <p className="text-xs text-slate-400 mt-1">{formatDate(folder.created_at)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
