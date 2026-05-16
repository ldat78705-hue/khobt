"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Heart, BookOpen, Trash2, Eye, Search, FileText, Download, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDate, getDifficultyLabel, getDifficultyColor, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES } from "@/types";
import type { Question, Grade } from "@/types";
import { toast } from "sonner";
import { QuestionContent } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | "">("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCreatingExam, setIsCreatingExam] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (isDemoMode) {
      setQuestions(demoDb.getFavoriteQuestions(DEMO_USER.id));
      setIsLoading(false);
    } else {
      fetch('/api/favorites?full=true')
        .then(res => res.json())
        .then(data => { setQuestions(Array.isArray(data) ? data : []); })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleRemoveFavorite = async (questionId: string) => {
    if (isDemoMode) {
      demoDb.toggleFavorite(DEMO_USER.id, questionId);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
      setSelectedIds(prev => prev.filter(id => id !== questionId));
      toast.success("Đã bỏ yêu thích");
    } else {
      try {
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question_id: questionId }),
        });
        if (res.ok) {
          setQuestions(prev => prev.filter(q => q.id !== questionId));
          setSelectedIds(prev => prev.filter(id => id !== questionId));
          toast.success("Đã bỏ yêu thích");
        }
      } catch {
        toast.error("Không thể bỏ yêu thích");
      }
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Create exam from selected favorites
  const handleCreateExam = async () => {
    const ids = selectedIds.length > 0 ? selectedIds : questions.map(q => q.id);
    if (ids.length === 0) { toast.error("Không có bài tập nào"); return; }
    setIsCreatingExam(true);
    try {
      if (isDemoMode) {
        const selectedQs = questions.filter(q => ids.includes(q.id));
        const grade = selectedQs[0]?.grade || 9;
        const exam = demoDb.createExam({
          title: `Đề từ yêu thích (${ids.length} câu)`,
          grade,
          duration: Math.max(45, ids.length * 10),
          settings: { subject: `Toán ${grade}` },
        });
        // Add questions to exam
        for (const qId of ids) {
          demoDb.addExamQuestion(exam.id, qId);
        }
        toast.success(`Đã tạo đề thi từ ${ids.length} bài yêu thích!`);
        router.push(`/exams/${exam.id}/edit`);
      } else {
        const selectedQs = questions.filter(q => ids.includes(q.id));
        const grade = selectedQs[0]?.grade || 9;
        const res = await fetch('/api/exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `Đề từ yêu thích (${ids.length} câu)`,
            grade,
            duration: Math.max(45, ids.length * 10),
            question_count: ids.length,
            settings: { subject: `Toán ${grade}` },
          }),
        });
        if (!res.ok) throw new Error('Lỗi tạo đề');
        const exam = await res.json();
        for (let i = 0; i < ids.length; i++) {
          await fetch('/api/exam-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exam_id: exam.id, question_id: ids[i], sort_order: i }),
          });
        }
        toast.success(`Đã tạo đề thi từ ${ids.length} bài yêu thích!`);
        router.push(`/exams/${exam.id}/edit`);
      }
    } catch {
      toast.error("Không thể tạo đề thi");
    } finally {
      setIsCreatingExam(false);
    }
  };

  const filtered = questions.filter(q => {
    if (search && !q.content.toLowerCase().includes(search.toLowerCase())) return false;
    if (gradeFilter && q.grade !== gradeFilter) return false;
    return true;
  });

  // Group by grade for summary
  const gradeGroups = questions.reduce((acc, q) => {
    acc[q.grade] = (acc[q.grade] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <>
      <Header
        title="Bài tập yêu thích"
        actions={
          <div className="flex items-center gap-2">
            {questions.length > 0 && (
              <>
                <button
                  onClick={handleCreateExam}
                  disabled={isCreatingExam}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm disabled:opacity-50"
                >
                  {isCreatingExam ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  {selectedIds.length > 0 ? `Tạo đề (${selectedIds.length} bài)` : "Tạo đề từ tất cả"}
                </button>
                <Link href="/questions/export" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                  <Download className="w-4 h-4" /> Xuất bài tập
                </Link>
              </>
            )}
          </div>
        }
      />
      <div className="p-6 max-w-5xl space-y-4">
        {/* Search + Filter */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm trong bài yêu thích..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <select
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value ? Number(e.target.value) as Grade : "")}
              className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Tất cả lớp</option>
              {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span><strong>{questions.length}</strong> bài tập yêu thích</span>
          </div>
          {Object.entries(gradeGroups).sort(([a], [b]) => Number(a) - Number(b)).map(([grade, count]) => (
            <button
              key={grade}
              onClick={() => setGradeFilter(gradeFilter === Number(grade) ? "" : Number(grade) as Grade)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full border transition-colors",
                gradeFilter === Number(grade)
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
              )}
            >
              Lớp {grade}: {count}
            </button>
          ))}
          {selectedIds.length > 0 && (
            <span className="text-xs text-blue-600 font-medium ml-auto">
              Đã chọn {selectedIds.length} bài
            </span>
          )}
        </div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 shadow-sm text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-600 mb-1">
              {search || gradeFilter ? "Không tìm thấy" : "Chưa có bài yêu thích"}
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              {search || gradeFilter ? "Thử bộ lọc khác" : "Nhấn ♥ trên bài tập để thêm vào danh sách yêu thích"}
            </p>
            {!search && !gradeFilter && (
              <Link href="/questions" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Khám phá kho bài tập →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => {
              const isSelected = selectedIds.includes(q.id);
              return (
                <div key={q.id} className={cn(
                  "bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow group",
                  isSelected ? "border-blue-300 bg-blue-50/30" : "border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(q.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 mt-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <QuestionContent content={q.content} images={q.images} className="text-sm text-slate-800 line-clamp-2" />
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {q.grade}</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{getTopicLabel(q.topic)}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                        <span className="text-xs text-slate-400 ml-auto">{formatDate(q.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/questions/${q.id}`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Xem">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleRemoveFavorite(q.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600" title="Bỏ yêu thích">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
