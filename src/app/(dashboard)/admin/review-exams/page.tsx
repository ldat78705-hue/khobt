"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  CheckCircle, XCircle, Eye, Clock, FileText, BookOpen, MessageSquare, Send, Shield
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Exam } from "@/types";
import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export default function ReviewExamsPage() {
  const [pendingExams, setPendingExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewNote, setReviewNote] = useState("");
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (isDemoMode) {
      setPendingExams(demoDb.getPendingExams());
    }
    setIsLoading(false);
  }, []);

  const handleApprove = (examId: string) => {
    if (isDemoMode) {
      demoDb.reviewExam(examId, 'approve', reviewNote || undefined);
      setPendingExams(prev => prev.filter(e => e.id !== examId));
      toast.success("Đã duyệt đề thi và xuất bản lên kho chung!");
      setReviewingId(null);
      setReviewNote("");
    }
  };

  const handleReject = (examId: string) => {
    if (!reviewNote.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }
    if (isDemoMode) {
      demoDb.reviewExam(examId, 'reject', reviewNote);
      setPendingExams(prev => prev.filter(e => e.id !== examId));
      toast.success("Đã từ chối đề thi");
      setReviewingId(null);
      setReviewNote("");
    }
  };

  return (
    <>
      <Header title="Duyệt đề thi" />
      <div className="p-6 max-w-4xl space-y-4">
        {/* Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <p className="font-semibold mb-1">Duyệt đề thi từ giáo viên</p>
            <p className="text-amber-600">Giáo viên gửi đề lên kho chung cần được duyệt trước khi xuất bản. Đề duyệt xong sẽ hiển thị cho tất cả giáo viên sử dụng.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>{pendingExams.length} đề thi đang chờ duyệt</span>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-32 rounded-2xl" />)}
          </div>
        ) : pendingExams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Không có đề cần duyệt</h3>
            <p className="text-slate-500">Tất cả đề thi đã được xử lý xong. 🎉</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingExams.map(exam => (
              <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-full">
                        ⏳ Chờ duyệt
                      </span>
                      {exam.submitted_at && (
                        <span className="text-xs text-slate-400">
                          Gửi lúc: {formatDate(exam.submitted_at)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{exam.title}</h3>
                    {exam.description && <p className="text-sm text-slate-500 mt-1">{exam.description}</p>}
                    <div className="flex items-center gap-3 mt-3">
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {exam.grade}</span>
                      {exam.duration && (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                          <Clock className="w-3 h-3" /> {exam.duration} phút
                        </span>
                      )}
                      <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">
                        <BookOpen className="w-3 h-3" /> {exam.question_count || 0} câu
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/exams/${exam.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> Xem đề
                  </Link>
                </div>

                {/* Review actions */}
                {reviewingId === exam.id ? (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">
                        <MessageSquare className="w-4 h-4 inline mr-1" /> Ghi chú duyệt (bắt buộc khi từ chối)
                      </label>
                      <textarea
                        value={reviewNote}
                        onChange={e => setReviewNote(e.target.value)}
                        placeholder="VD: Đề tốt, nội dung phù hợp / Cần bổ sung thêm bài tập vận dụng..."
                        rows={2}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApprove(exam.id)}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-sm transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Duyệt & Xuất bản
                      </button>
                      <button
                        onClick={() => handleReject(exam.id)}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-sm transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Từ chối
                      </button>
                      <button
                        onClick={() => { setReviewingId(null); setReviewNote(""); }}
                        className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setReviewingId(exam.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Duyệt đề này
                    </button>
                    <button
                      onClick={() => setReviewingId(exam.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Từ chối
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
