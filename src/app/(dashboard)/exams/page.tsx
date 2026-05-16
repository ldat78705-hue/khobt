"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  Plus, Search, FileText, Trash2, Copy, Edit, Eye, Download,
  Clock, BookOpen, Sparkles, Upload, Globe, User, Send, Shield
} from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { GRADES } from "@/types";
import type { Exam, Grade, ExamStatus } from "@/types";
import { toast } from "sonner";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { useAuthStore } from "@/stores/auth-store";

const EXAM_STATUS_CONFIG: Record<ExamStatus, { label: string; color: string; icon: string }> = {
  personal: { label: 'Cá nhân', color: 'bg-slate-100 text-slate-600 border-slate-200', icon: '🔒' },
  pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '⏳' },
  approved: { label: 'Kho chung', color: 'bg-green-100 text-green-700 border-green-200', icon: '🌐' },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700 border-red-200', icon: '❌' },
};

type TabType = 'personal' | 'shared';

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<Grade | "">("");
  const [activeTab, setActiveTab] = useState<TabType>("shared");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { user } = useAuthStore();
  const currentUserId = user?.id || DEMO_USER.id;

  const fetchExams = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        const filter = {
          grade: selectedGrade ? Number(selectedGrade) : undefined,
          search: searchQuery || undefined,
        };
        if (activeTab === 'shared') {
          setExams(demoDb.getSharedExams(filter));
        } else {
          setExams(demoDb.getPersonalExams(currentUserId, filter));
        }
      } else {
        const params = new URLSearchParams();
        if (selectedGrade) params.append("grade", selectedGrade.toString());
        if (searchQuery) params.append("search", searchQuery);
        params.append("tab", activeTab);

        const res = await fetch(`/api/exams?${params.toString()}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Lỗi tải đề thi');
        }
        const data = await res.json();
        setExams(data || []);
      }
    } catch {
      toast.error("Không thể tải danh sách đề thi");
    } finally {
      setIsLoading(false);
    }
  }, [selectedGrade, searchQuery, activeTab, currentUserId]);

  useEffect(() => { fetchExams(); }, [fetchExams]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa đề thi này?")) return;
    try {
      if (isDemoMode) {
        demoDb.deleteExam(id);
      } else {
        const res = await fetch(`/api/exams?id=${id}`, { method: 'DELETE' });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Không thể xóa đề thi");
        }
      }
      setExams((prev) => prev.filter((e) => e.id !== id));
      toast.success("Đã xóa đề thi");
    } catch (err: any) {
      toast.error(err.message || "Không thể xóa đề thi");
    }
  };

  const handleClone = async (exam: Exam) => {
    try {
      if (isDemoMode) {
        const cloned = demoDb.createExam({
          ...exam,
          title: `${exam.title} (bản sao)`,
          exam_status: 'personal',
        });
        // Clone exam questions
        const eqs = demoDb.getExamQuestions(exam.id);
        eqs.forEach(eq => {
          const newEq = demoDb.addExamQuestion(cloned.id, eq.question_id);
          demoDb.updateExamQuestionPoints(newEq.id, eq.points);
        });
      } else {
        // Create cloned exam via API
        const res = await fetch('/api/exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${exam.title} (bản sao)`,
            description: exam.description,
            grade: exam.grade,
            duration: exam.duration,
            settings: exam.settings,
            tags: exam.tags,
            exam_status: 'personal',
          }),
        });
        if (!res.ok) throw new Error('Lỗi tạo bản sao');
        const cloned = await res.json();

        // Copy exam questions
        const origRes = await fetch(`/api/exams?id=${exam.id}`);
        if (origRes.ok) {
          const origData = await origRes.json();
          const origQuestions = origData.questions || [];
          for (const eq of origQuestions) {
            await fetch('/api/exam-questions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                exam_id: cloned.id,
                question_id: eq.question_id,
                sort_order: eq.sort_order,
                points: eq.points,
              }),
            });
          }
        }
      }
      toast.success("Đã clone đề thi vào kho cá nhân!");
      if (activeTab === 'personal') fetchExams();
    } catch {
      toast.error("Không thể clone đề thi");
    }
  };

  const handleSubmitToShared = async (examId: string) => {
    if (!confirm("Gửi đề thi này lên kho chung? Đề sẽ cần được duyệt trước khi xuất bản.")) return;
    try {
      if (isDemoMode) {
        demoDb.submitExamToShared(examId);
      } else {
        const res = await fetch('/api/exams', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: examId, exam_status: 'pending' }),
        });
        if (!res.ok) throw new Error('Lỗi gửi đề');
      }
      toast.success("Đã gửi đề lên kho chung! Vui lòng chờ duyệt.");
      fetchExams();
    } catch {
      toast.error("Không thể gửi đề");
    }
  };

  const getStatusBadge = (status: ExamStatus) => {
    const config = EXAM_STATUS_CONFIG[status] || EXAM_STATUS_CONFIG.personal;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full border ${config.color}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const toggleSelectExam = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAllExams = () => {
    if (selectedIds.length === exams.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(exams.map(e => e.id));
    }
  };

  const handleBulkDeleteExams = async () => {
    if (!selectedIds.length) return;
    if (!confirm(`Xóa ${selectedIds.length} đề thi đã chọn? Không thể hoàn tác!`)) return;
    try {
      let deleted = 0;
      for (const id of selectedIds) {
        if (isDemoMode) {
          demoDb.deleteExam(id);
          deleted++;
        } else {
          const res = await fetch(`/api/exams?id=${id}`, { method: 'DELETE' });
          if (res.ok) deleted++;
        }
      }
      toast.success(`Đã xóa ${deleted} đề thi`);
      setSelectedIds([]);
      fetchExams();
    } catch {
      toast.error("Lỗi khi xóa đề thi");
    }
  };

  const handleDeleteAllFilteredExams = async () => {
    const count = exams.length;
    if (!confirm(`Xóa TẤT CẢ ${count} đề thi đang hiển thị? KHÔNG THỂ hoàn tác!`)) return;
    if (!confirm(`Xác nhận lần cuối: Xóa ${count} đề thi?`)) return;
    try {
      let deleted = 0;
      for (const e of exams) {
        if (isDemoMode) {
          demoDb.deleteExam(e.id);
          deleted++;
        } else {
          const res = await fetch(`/api/exams?id=${e.id}`, { method: 'DELETE' });
          if (res.ok) deleted++;
        }
      }
      toast.success(`Đã xóa ${deleted} đề thi`);
      setSelectedIds([]);
      fetchExams();
    } catch {
      toast.error("Lỗi khi xóa");
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
        {/* Tabs: Kho chung / Đề của tôi */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("shared")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
              activeTab === "shared"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Globe className="w-4 h-4" /> Kho chung
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
              activeTab === "personal"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <User className="w-4 h-4" /> Đề của tôi
          </button>
        </div>

        {/* Info banner */}
        {activeTab === "personal" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">Đề cá nhân lưu trên máy của bạn</p>
              <p className="text-blue-600">Đề tạo mới sẽ chỉ hiển thị cho bạn. Bạn có thể gửi lên kho chung để chia sẻ với đồng nghiệp (cần được duyệt).</p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm đề thi..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value as Grade | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option value="">Tất cả lớp</option>
              {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>

          {/* Bulk actions bar */}
          <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-slate-100">
            <button
              onClick={handleSelectAllExams}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors",
                selectedIds.length === exams.length && exams.length > 0
                  ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
                  : "text-slate-600 bg-slate-100 hover:bg-slate-200"
              )}
            >
              <input
                type="checkbox"
                checked={selectedIds.length === exams.length && exams.length > 0}
                onChange={handleSelectAllExams}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600"
              />
              {selectedIds.length === exams.length && exams.length > 0 ? 'Bỏ chọn tất cả' : `Chọn tất cả (${exams.length})`}
            </button>

            {selectedIds.length > 0 && (
              <>
                <span className="text-sm text-slate-500">|</span>
                <span className="text-sm text-slate-600">Đã chọn <strong className="text-blue-600">{selectedIds.length}</strong></span>
                <button onClick={handleBulkDeleteExams} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Xóa ({selectedIds.length})
                </button>
                <button onClick={() => setSelectedIds([])} className="ml-auto text-sm text-slate-500 hover:text-slate-700">
                  Bỏ chọn
                </button>
              </>
            )}

            {(searchQuery || selectedGrade) && exams.length > 0 && (
              <button
                onClick={handleDeleteAllFilteredExams}
                className="ml-auto px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-1 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả kết quả lọc ({exams.length})
              </button>
            )}
          </div>
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
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {activeTab === 'shared' ? 'Chưa có đề thi trong kho chung' : 'Chưa có đề cá nhân'}
            </h3>
            <p className="text-slate-500 mb-6">
              {activeTab === 'shared'
                ? 'Hãy tạo đề thi và gửi lên kho chung để chia sẻ.'
                : 'Bắt đầu tạo đề thi đầu tiên.'}
            </p>
            <Link href="/exams/new" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md shadow-blue-500/25">
              <Plus className="w-4 h-4" /> Tạo đề thi
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam) => (
              <div key={exam.id} className={cn(
                "bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all group",
                selectedIds.includes(exam.id) ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-100"
              )}>
                <div className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(exam.id)}
                    onChange={() => toggleSelectExam(exam.id)}
                    className="w-4 h-4 mt-1 rounded border-slate-300 text-blue-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {exam.is_template && <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full">Đề mẫu</span>}
                      {activeTab === 'personal' && getStatusBadge(exam.exam_status)}
                    </div>
                    <h3 className="font-semibold text-slate-800 truncate">{exam.title}</h3>
                    {exam.description && <p className="text-sm text-slate-500 mt-1 line-clamp-1">{exam.description}</p>}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <Link href={`/exams/${exam.id}`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Xem đề"><Eye className="w-4 h-4" /></Link>
                    {activeTab === 'personal' && (
                      <Link href={`/exams/${exam.id}/edit`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Sửa đề"><Edit className="w-4 h-4" /></Link>
                    )}
                    <button onClick={() => handleClone(exam)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Clone vào đề cá nhân"><Copy className="w-4 h-4" /></button>
                    {activeTab === 'personal' && exam.exam_status === 'personal' && (
                      <button onClick={() => handleSubmitToShared(exam.id)} className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-600" title="Gửi lên kho chung">
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(exam.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Xóa"><Trash2 className="w-4 h-4" /></button>
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
