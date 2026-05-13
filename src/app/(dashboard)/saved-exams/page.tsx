"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Bookmark, FileText, Eye, Trash2, Clock, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Exam } from "@/types";
import { toast } from "sonner";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";

export default function SavedExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (isDemoMode) {
      setExams(demoDb.getSavedExamList(DEMO_USER.id));
    }
    setIsLoading(false);
  }, []);

  const handleRemoveSaved = (examId: string) => {
    if (isDemoMode) {
      demoDb.toggleSavedExam(DEMO_USER.id, examId);
      setExams(prev => prev.filter(e => e.id !== examId));
      toast.success("Đã bỏ lưu đề thi");
    }
  };

  const filtered = search
    ? exams.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    : exams;

  return (
    <>
      <Header title="Đề thi đã lưu" />
      <div className="p-6 max-w-5xl space-y-4">
        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm trong đề đã lưu..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Bookmark className="w-4 h-4 text-blue-500 fill-current" />
          <span>{exams.length} đề thi đã lưu</span>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 shadow-sm text-center">
            <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-600 mb-1">
              {search ? "Không tìm thấy" : "Chưa lưu đề thi nào"}
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              {search ? "Thử từ khóa khác" : "Nhấn 🔖 trên đề thi để lưu lại sử dụng sau"}
            </p>
            {!search && (
              <Link href="/exams" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Khám phá kho đề thi →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">{exam.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">Toán {exam.grade}</span>
                      {exam.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {exam.duration} phút
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {exam.question_count || 0} câu
                      </span>
                      <span>{formatDate(exam.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/exams/${exam.id}`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Xem đề">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleRemoveSaved(exam.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Bỏ lưu">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
