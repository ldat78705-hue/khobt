"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { ArrowLeft, Edit, Copy, Trash2, Heart, Shield, AlertTriangle, Clock, ThumbsUp, Flag, X, Send, BookOpen, Share2 } from "lucide-react";
import Link from "next/link";
import { formatDate, getDifficultyLabel, getDifficultyColor, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import type { Question } from "@/types";
import { QUESTION_STATUSES } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { QuestionContent, MathRenderer, CloudinaryImage } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id as string;
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>([]);
  const { user } = useAuthStore();

  const currentUser = user || DEMO_USER;
  const canEdit = question ? demoDb.canEditQuestion(currentUser.id, currentUser.role, question) : false;
  const canDelete = question ? demoDb.canDeleteQuestion(currentUser.id, currentUser.role, question) : false;
  const isApproved = question?.status === 'approved';
  const isOwner = question?.user_id === currentUser.id;

  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setQuestion(demoDb.getQuestion(questionId));
        setIsFavorite(demoDb.isFavorite(DEMO_USER.id, questionId));
        setIsLiked(demoDb.isLiked(DEMO_USER.id, questionId));
        setLikeCount(demoDb.getLikeCount(questionId));
      } else {
        const supabase = createClient();
        const { data, error } = await supabase.from("questions").select("*").eq("id", questionId).single();
        if (error) throw error;
        setQuestion(data);
      }
    } catch {
      toast.error("Không thể tải bài tập");
    } finally {
      setIsLoading(false);
    }
  }, [questionId]);

  // Fetch related questions
  useEffect(() => {
    if (!question || !isDemoMode) return;
    const related = demoDb.getQuestions({ topic: question.topic, difficulty: question.difficulty })
      .filter(q => q.id !== question.id)
      .slice(0, 4);
    setRelatedQuestions(related);
  }, [question]);

  useEffect(() => { fetchQuestion(); }, [fetchQuestion]);

  const handleToggleFavorite = () => {
    if (isDemoMode) {
      const result = demoDb.toggleFavorite(DEMO_USER.id, questionId);
      setIsFavorite(result);
      toast.success(result ? "Đã thêm vào yêu thích" : "Đã bỏ yêu thích");
    }
  };

  const handleDelete = async () => {
    if (!question) return;
    if (!canDelete) {
      toast.error("Bài tập đã duyệt không thể xóa. Liên hệ Admin.");
      return;
    }
    if (!confirm("Xóa bài tập này? Hành động không thể hoàn tác.")) return;
    setIsDeleting(true);
    try {
      if (isDemoMode) {
        demoDb.deleteQuestion(questionId);
      } else {
        const supabase = createClient();
        const { error } = await supabase.from("questions").delete().eq("id", questionId);
        if (error) throw error;
      }
      toast.success("Đã xóa bài tập");
      router.push("/questions");
    } catch {
      toast.error("Không thể xóa bài tập");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyContent = () => {
    if (!question) return;
    navigator.clipboard.writeText(question.content);
    toast.success("Đã copy nội dung");
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link bài tập đã được copy!");
  };

  const handleClone = async () => {
    if (!question) return;
    try {
      if (isDemoMode) {
        const { id, question_code, created_at, updated_at, ...rest } = question;
        const cloned = demoDb.createQuestion({ ...rest, content: question.content, status: 'draft' as const });
        toast.success("Đã nhân bản bài tập!");
        router.push(`/questions/${cloned.id}/edit`);
      } else {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { id, question_code, created_at, updated_at, user_id, ...rest } = question;
        const { data, error } = await supabase.from("questions").insert({ ...rest, user_id: user.id, status: 'draft' }).select().single();
        if (error) throw error;
        toast.success("Đã nhân bản bài tập!");
        router.push(`/questions/${data.id}/edit`);
      }
    } catch {
      toast.error("Không thể nhân bản bài tập");
    }
  };

  const handleToggleLike = () => {
    if (isDemoMode) {
      const result = demoDb.toggleLike(DEMO_USER.id, questionId);
      setIsLiked(result.liked);
      setLikeCount(result.count);
      toast.success(result.liked ? "Bài tập hay! 👍" : "Đã bỏ thích");
    }
  };

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast.error("Vui lòng nhập lý do báo cáo");
      return;
    }
    if (isDemoMode) {
      demoDb.reportQuestion(DEMO_USER.id, questionId, reportReason);
      toast.success("Đã gửi báo cáo. Người ra đề đã được thông báo.");
      setShowReportModal(false);
      setReportReason("");
    }
  };

  const statusInfo = question ? QUESTION_STATUSES.find(s => s.value === question.status) : null;

  if (isLoading) {
    return (
      <>
        <Header title="Đang tải..." />
        <div className="p-6"><div className="skeleton h-64 rounded-2xl" /></div>
      </>
    );
  }

  if (!question) {
    return (
      <>
        <Header title="Không tìm thấy" />
        <div className="p-6 text-center py-20">
          <p className="text-slate-500 mb-4">Bài tập không tồn tại.</p>
          <Link href="/questions" className="text-blue-600 hover:text-blue-700 font-medium">← Quay lại kho bài tập</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="Chi tiết bài tập"
        actions={
          <div className="flex items-center gap-2">
            <Link href="/questions" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </Link>
          </div>
        }
      />
      <div className="p-6 max-w-4xl space-y-4">
        {/* Permission warning */}
        {isApproved && isOwner && currentUser.role !== 'admin' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Bài tập đã được duyệt</p>
              <p className="text-xs text-amber-600">Không thể sửa hoặc xóa bài tập đã duyệt. Liên hệ Admin nếu cần thay đổi.</p>
            </div>
          </div>
        )}

        {/* Meta info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {statusInfo && (
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusInfo.color}`}>{statusInfo.label}</span>
              )}
              <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {question.grade}</span>
              <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{getTopicLabel(question.topic)}</span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(question.difficulty)}`}>{getDifficultyLabel(question.difficulty)}</span>
              <span className="px-3 py-1 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">{getQuestionTypeLabel(question.question_type)}</span>
            </div>
            <div className="flex items-center gap-1">
              {/* Favorite button */}
              <button
                onClick={handleToggleFavorite}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  isFavorite ? "bg-red-50 text-red-500 hover:bg-red-100" : "hover:bg-slate-100 text-slate-400 hover:text-red-400"
                )}
                title={isFavorite ? "Bỏ yêu thích" : "Thêm yêu thích"}
              >
                <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
              </button>
              {/* Edit - only if allowed */}
              {canEdit ? (
                <Link href={`/questions/${question.id}/edit`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Sửa">
                  <Edit className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-lg text-slate-200 cursor-not-allowed" title="Không thể sửa bài tập đã duyệt">
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <button onClick={handleCopyContent} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Copy nội dung">
                <Copy className="w-4 h-4" />
              </button>
              <button onClick={handleClone} className="p-2 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600" title="Nhân bản bài tập">
                <BookOpen className="w-4 h-4" />
              </button>
              <button onClick={handleShare} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-green-600" title="Chia sẻ">
                <Share2 className="w-4 h-4" />
              </button>
              {/* Like button */}
              <button
                onClick={handleToggleLike}
                className={cn(
                  "flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all text-sm",
                  isLiked ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100 text-slate-400 hover:text-blue-500"
                )}
                title="Bài tập hay"
              >
                <ThumbsUp className={cn("w-4 h-4", isLiked && "fill-current")} />
                {likeCount > 0 && <span className="text-xs font-medium">{likeCount}</span>}
              </button>
              {/* Report button */}
              <button
                onClick={() => setShowReportModal(true)}
                className="p-2 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-500 transition-all"
                title="Báo cáo"
              >
                <Flag className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-slate-200" />
              {/* Delete - only if allowed */}
              {canDelete ? (
                <button onClick={handleDelete} disabled={isDeleting} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Xóa">
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <button disabled className="p-2 rounded-lg text-slate-200 cursor-not-allowed" title="Không thể xóa bài tập đã duyệt">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Tạo ngày {formatDate(question.created_at)}</span>
            {question.reviewed_at && (
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Duyệt ngày {formatDate(question.reviewed_at)}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            {question.question_code && <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded font-mono">{question.question_code}</span>}
            Nội dung bài tập
          </h3>
          <QuestionContent content={question.content} images={question.images} className="text-sm text-slate-800" />
          {question.question_type === "trac_nghiem" && question.options && (
            <div className="mt-4 space-y-2 ml-4">
              {question.options.map((opt) => (
                <div key={opt.key} className={`flex items-start gap-2 text-sm p-2 rounded-lg ${opt.key === question.correct_answer ? 'bg-green-50 text-green-700 font-medium' : 'text-slate-600'}`}>
                  <span className="font-semibold">{opt.key}.</span>
                  <MathRenderer content={opt.value} />
                  {opt.key === question.correct_answer && <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Đáp án đúng</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer & Solution */}
        {(question.answer || question.solution) && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            {question.answer && (
              <div className="mb-4">
                <h3 className="text-base font-semibold text-slate-800 mb-2">Đáp án</h3>
                <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-800"><MathRenderer content={question.answer} /></div>
                {question.answer_images && question.answer_images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {question.answer_images.map((img, i) => (
                      <CloudinaryImage key={i} src={img} alt={`Hình đáp án ${i + 1}`} className="max-w-xs border border-blue-200 shadow-sm" />
                    ))}
                  </div>
                )}
              </div>
            )}
            {question.solution && (
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">Lời giải chi tiết</h3>
                <div className="p-4 bg-green-50 rounded-xl text-sm text-green-800"><MathRenderer content={question.solution} /></div>
                {question.solution_images && question.solution_images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {question.solution_images.map((img, i) => (
                      <CloudinaryImage key={i} src={img} alt={`Hình lời giải ${i + 1}`} className="max-w-xs border border-green-200 shadow-sm" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Review note */}
        {question.review_note && (
          <div className={cn("rounded-2xl border p-4 shadow-sm", question.status === 'approved' ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200")}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-semibold">{question.status === 'approved' ? 'Ghi chú duyệt' : 'Lý do từ chối'}</span>
            </div>
            <p className="text-sm">{question.review_note}</p>
          </div>
        )}

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Related questions */}
        {relatedQuestions.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-3">Bài tập liên quan</h3>
            <div className="space-y-2">
              {relatedQuestions.map(rq => (
                <Link key={rq.id} href={`/questions/${rq.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 truncate flex-1">
                    <MathRenderer content={(() => {
                      const c = rq.content;
                      if (c.length <= 100) return c;
                      // Don't cut inside $...$ — find safe cut point
                      let cutAt = 100;
                      const beforeCut = c.slice(0, cutAt);
                      const dollarCount = (beforeCut.match(/\$/g) || []).length;
                      if (dollarCount % 2 !== 0) {
                        // Odd $ count = we're inside a formula. Find the closing $
                        const nextDollar = c.indexOf('$', cutAt);
                        cutAt = nextDollar !== -1 ? nextDollar + 1 : cutAt;
                      }
                      return c.slice(0, cutAt) + '...';
                    })()} />
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border whitespace-nowrap ${getDifficultyColor(rq.difficulty)}`}>{getDifficultyLabel(rq.difficulty)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Flag className="w-4 h-4 text-orange-500" /> Báo cáo bài tập
              </h3>
              <button onClick={() => setShowReportModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-slate-500">Chọn lý do hoặc mô tả lỗi:</p>
              <div className="flex flex-wrap gap-2">
                {['Đề bài sai', 'Đáp án sai', 'Lời giải sai', 'Thiếu dữ kiện', 'Công thức sai', 'Hình ảnh lỗi'].map(r => (
                  <button
                    key={r}
                    onClick={() => setReportReason(r)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
                      reportReason === r ? "border-orange-400 bg-orange-50 text-orange-700" : "border-slate-200 text-slate-500 hover:border-orange-300"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <textarea
                value={reportReason}
                onChange={e => setReportReason(e.target.value)}
                placeholder="Mô tả chi tiết lỗi..."
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-y"
              />
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-2">
              <button onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">
                Hủy
              </button>
              <button
                onClick={handleReport}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors"
              >
                <Send className="w-4 h-4" /> Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
