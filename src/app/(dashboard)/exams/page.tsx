"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, Search, FileText, MoreHorizontal, Trash2, Copy, Edit, Eye, Download, Clock, BookOpen, FolderOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { GRADES } from "@/types";
import type { Exam, Grade } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<Grade | "">("");

  const fetchExams = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        let data = demoDb.getExams();
        if (selectedGrade) data = data.filter(e => e.grade === Number(selectedGrade));
        if (searchQuery) data = data.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setExams(data);
      } else {
        const supabase = createClient();
        let query = supabase.from("exams").select("*, exam_questions(count)").order("created_at", { ascending: false });
        if (selectedGrade) query = query.eq("grade", selectedGrade);
        if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);
        const { data, error } = await query.limit(50);
        if (error) throw error;
        setExams(data || []);
      }
    } catch {
      toast.error("Không thể tải danh sách đề thi");
    } finally {
      setIsLoading(false);
    }
  }, [selectedGrade, searchQuery]);

  useEffect(() => { fetchExams(); }, [fetchExams]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa đề thi này?")) return;
    try {
      if (isDemoMode) {
        demoDb.deleteExam(id);
      } else {
        const supabase = createClient();
        const { error } = await supabase.from("exams").delete().eq("id", id);
        if (error) throw error;
      }
      setExams((prev) => prev.filter((e) => e.id !== id));
      toast.success("Đã xóa đề thi");
    } catch {
      toast.error("Không thể xóa đề thi");
    }
  };

  const handleClone = async (exam: Exam) => {
    try {
      if (isDemoMode) {
        demoDb.createExam({ ...exam, title: `${exam.title} (bản sao)` });
      } else {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { id, created_at, updated_at, ...rest } = exam;
        const { error } = await supabase.from("exams").insert({ ...rest, title: `${exam.title} (bản sao)`, user_id: user.id });
        if (error) throw error;
      }
      toast.success("Đã clone đề thi");
      fetchExams();
    } catch {
      toast.error("Không thể clone đề thi");
    }
  };

  return (
    <>
      <Header
        title="Kho đề thi"
        subtitle={`${exams.length} đề thi`}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/exams/auto" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Sparkles className="w-4 h-4" /> Tạo tự động
            </Link>
            <Link href="/exams/new" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-all shadow-sm">
              <Plus className="w-4 h-4" /> Tạo đề mới
            </Link>
          </div>
        }
      />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm đề thi..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value as Grade | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">Tất cả lớp</option>
            {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </div>

        {/* Exam list */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="skeleton h-5 w-3/4 mb-3" />
                <div className="skeleton h-4 w-1/2 mb-4" />
                <div className="flex gap-2">
                  <div className="skeleton h-6 w-16 rounded-full" />
                  <div className="skeleton h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : exams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Chưa có đề thi nào</h3>
            <p className="text-slate-500 mb-6">Bắt đầu tạo đề thi đầu tiên.</p>
            <Link href="/exams/new" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md shadow-blue-500/25">
              <Plus className="w-4 h-4" /> Tạo đề thi đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {exam.is_template && <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full mr-2">Đề mẫu</span>}
                      {exam.title}
                    </h3>
                    {exam.description && <p className="text-sm text-slate-500 mt-1 line-clamp-1">{exam.description}</p>}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <Link href={`/exams/${exam.id}`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Eye className="w-4 h-4" /></Link>
                    <Link href={`/exams/${exam.id}/edit`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></Link>
                    <button onClick={() => handleClone(exam)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Copy className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(exam.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {exam.grade}</span>
                  {exam.duration && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                      <Clock className="w-3 h-3" /> {exam.duration} phút
                    </span>
                  )}
                  <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">
                    <BookOpen className="w-3 h-3" /> {exam.question_count || 0} câu
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">{formatDate(exam.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
