"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { CheckCircle, XCircle, Eye, Clock, Filter, MessageSquare, ChevronDown, User } from "lucide-react";
import { cn, getDifficultyLabel, getDifficultyColor, getTopicLabel, getQuestionTypeLabel, formatDate } from "@/lib/utils";
import { GRADES, QUESTION_STATUSES } from "@/types";
import type { Question, QuestionStatus, Grade } from "@/types";

import { toast } from "sonner";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { MathRenderer, QuestionContent } from "@/components/shared/MathRenderer";

export default function ReviewQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<QuestionStatus | ''>('pending');
  const [gradeFilter, setGradeFilter] = useState<Grade | "">("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        const data = demoDb.getQuestions({
          status: statusFilter || undefined,
          grade: gradeFilter || undefined,
        });
        setQuestions(data);
      } else {
        const params = new URLSearchParams();
        if (statusFilter) params.append("status", statusFilter);
        if (gradeFilter) params.append("grade", gradeFilter.toString());
        params.append("limit", "50");

        const res = await fetch(`/api/questions?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setQuestions(Array.isArray(data) ? data : (data.data || []));
        } else {
          throw new Error('API error');
        }
      }
    } catch {
      toast.error("Không thể tải bài tập");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, gradeFilter]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const handleReview = async (questionId: string, newStatus: 'approved' | 'rejected') => {
    setIsReviewing(true);
    try {
      if (isDemoMode) {
        demoDb.updateQuestion(questionId, {
          status: newStatus,
          reviewed_by: DEMO_USER.id,
          reviewed_at: new Date().toISOString(),
          review_note: reviewNote || undefined,
        });
      } else {
        const res = await fetch('/api/questions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: questionId, status: newStatus, review_note: reviewNote }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Không thể cập nhật");
        }
      }
      toast.success(newStatus === 'approved' ? "Đã duyệt bài tập" : "Đã từ chối bài tập");
      setSelectedQuestion(null);
      setReviewNote("");
      fetchQuestions();
    } catch (err: any) {
      toast.error(err.message || "Không thể cập nhật");
    } finally {
      setIsReviewing(false);
    }
  };

  const handleBulkReview = async (newStatus: 'approved' | 'rejected') => {
    if (!selectedIds.length) return;
    if (!confirm(`${newStatus === 'approved' ? 'Duyệt' : 'Từ chối'} ${selectedIds.length} bài tập?`)) return;
    setIsReviewing(true);
    try {
      if (isDemoMode) {
        for (const id of selectedIds) {
          demoDb.updateQuestion(id, { status: newStatus, reviewed_by: DEMO_USER.id, reviewed_at: new Date().toISOString() });
        }
      } else {
        for (const id of selectedIds) {
          await fetch('/api/questions', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
          });
        }
      }
      toast.success(`Đã ${newStatus === 'approved' ? 'duyệt' : 'từ chối'} ${selectedIds.length} bài tập`);
      setSelectedIds([]);
      setSelectedQuestion(null);
      fetchQuestions();
    } catch {
      toast.error("Lỗi khi duyệt hàng loạt");
    } finally {
      setIsReviewing(false);
    }
  };

  const getStatusBadge = (status: QuestionStatus) => {
    const s = QUESTION_STATUSES.find(qs => qs.value === status);
    return s ? (
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${s.color}`}>{s.label}</span>
    ) : null;
  };

  const pendingCount = questions.filter(q => q.status === 'pending').length;

  return (
    <>
      <Header
        title="Duyệt bài tập"
        subtitle={`${pendingCount} bài tập chờ duyệt`}
      />
      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600 font-medium">Trạng thái:</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setStatusFilter("")} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors", !statusFilter ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100")}>Tất cả</button>
            {QUESTION_STATUSES.map(s => (
              <button key={s.value} onClick={() => setStatusFilter(s.value)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors", statusFilter === s.value ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100")}>{s.label}</button>
            ))}
          </div>
          <div className="ml-auto">
            <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value as Grade | "")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500">
              <option value="">Tất cả lớp</option>
              {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedIds.length > 0 && (
          <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-sm flex items-center gap-3 animate-slide-in-up">
            <span className="text-sm text-slate-600">Đã chọn <strong>{selectedIds.length}</strong> bài tập</span>
            <button onClick={() => handleBulkReview('approved')} disabled={isReviewing} className="px-4 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50">Duyệt tất cả</button>
            <button onClick={() => handleBulkReview('rejected')} disabled={isReviewing} className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50">Từ chối tất cả</button>
            <button onClick={() => setSelectedIds([])} className="ml-auto text-sm text-slate-500 hover:text-slate-700">Bỏ chọn</button>
          </div>
        )}

        {/* Question list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: List */}
          <div className="space-y-3">
            {isLoading ? (
              [1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)
            ) : questions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
                <p className="text-slate-500">Không có bài tập nào cần duyệt</p>
              </div>
            ) : (
              questions.map(q => (
                <button
                  key={q.id}
                  onClick={() => { setSelectedQuestion(q); setReviewNote(""); }}
                  className={cn(
                    "w-full bg-white rounded-2xl border p-4 shadow-sm text-left transition-all hover:shadow-md",
                    selectedQuestion?.id === q.id ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-100"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(q.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSelectedIds(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id]);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 mt-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-sm text-slate-800 line-clamp-2 flex-1"><MathRenderer content={q.content} /></div>
                        {getStatusBadge(q.status)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">Toán {q.grade}</span>
                        <span className={`px-2 py-0.5 rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                        <span className="ml-auto flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(q.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Right: Detail + Review */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
            {selectedQuestion ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-800">Chi tiết bài tập</h3>
                  {getStatusBadge(selectedQuestion.status)}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {selectedQuestion.grade}</span>
                  <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{(selectedQuestion as any).category_name || getTopicLabel(selectedQuestion.topic)}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(selectedQuestion.difficulty)}`}>{getDifficultyLabel(selectedQuestion.difficulty)}</span>
                  <span className="px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">{getQuestionTypeLabel(selectedQuestion.question_type)}</span>
                </div>

                {/* Content with full LaTeX + images */}
                <div className="p-4 bg-slate-50 rounded-xl mb-4">
                  <QuestionContent content={selectedQuestion.content} images={selectedQuestion.images} className="text-sm text-slate-800 leading-relaxed" />
                </div>

                {/* MCQ options */}
                {selectedQuestion.question_type === "trac_nghiem" && selectedQuestion.options && (
                  <div className="space-y-2 mb-4 ml-4">
                    {selectedQuestion.options.map(opt => (
                      <div key={opt.key} className={cn("flex items-start gap-2 text-sm p-2 rounded-lg", opt.key === selectedQuestion.correct_answer ? "bg-green-50 text-green-700 font-medium" : "text-slate-600")}>
                        <span className="font-semibold">{opt.key}.</span>
                        <MathRenderer content={opt.value} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer/Solution */}
                {selectedQuestion.answer && (
                  <div className="p-3 bg-blue-50 rounded-xl mb-3">
                    <div className="text-xs font-medium text-blue-600 mb-1">Đáp án</div>
                    <div className="text-sm text-blue-800"><MathRenderer content={selectedQuestion.answer} /></div>
                  </div>
                )}
                {selectedQuestion.solution && (
                  <div className="p-3 bg-green-50 rounded-xl mb-4">
                    <div className="text-xs font-medium text-green-600 mb-1">Lời giải</div>
                    <div className="text-sm text-green-800"><MathRenderer content={selectedQuestion.solution} /></div>
                  </div>
                )}

                {/* Review actions */}
                {(selectedQuestion.status === 'pending' || selectedQuestion.status === 'draft') && (
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        Ghi chú duyệt (tùy chọn)
                      </label>
                      <textarea
                        value={reviewNote}
                        onChange={e => setReviewNote(e.target.value)}
                        placeholder="Ghi chú cho giáo viên..."
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReview(selectedQuestion.id, 'approved')}
                        disabled={isReviewing}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Duyệt
                      </button>
                      <button
                        onClick={() => handleReview(selectedQuestion.id, 'rejected')}
                        disabled={isReviewing}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Từ chối
                      </button>
                    </div>
                  </div>
                )}

                {/* Review result */}
                {selectedQuestion.review_note && (selectedQuestion.status === 'approved' || selectedQuestion.status === 'rejected') && (
                  <div className={cn("p-3 rounded-xl mt-4", selectedQuestion.status === 'approved' ? "bg-green-50" : "bg-red-50")}>
                    <div className="text-xs font-medium mb-1">{selectedQuestion.status === 'approved' ? '✅ Đã duyệt' : '❌ Đã từ chối'}</div>
                    <p className="text-sm">{selectedQuestion.review_note}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm h-full flex items-center justify-center">
                <div>
                  <Eye className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Chọn bài tập để xem chi tiết và duyệt</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
