"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import {
  Plus, Search, ArrowLeft, Save, Trash2, GripVertical,
  BookOpen, Check, Loader2, X, ChevronUp, ChevronDown
} from "lucide-react";
import Link from "next/link";
import { cn, getDifficultyLabel, getTopicLabel, getDifficultyColor, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES } from "@/types";
import type { Exam, ExamQuestion, Question, Grade, Topic, Difficulty } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { QuestionContent } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb } from "@/lib/demo-data";

export default function EditExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  const [exam, setExam] = useState<Exam | null>(null);
  const [examQuestions, setExamQuestions] = useState<(ExamQuestion & { question: Question })[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState<Grade | "">("");
  const [filterTopic, setFilterTopic] = useState<Topic | "">("");
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "">("");
  const [isSaving, setIsSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addedQuestionIds = new Set(examQuestions.map((eq) => eq.question_id));

  const fetchExam = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setExam(demoDb.getExam(examId));
        setExamQuestions(demoDb.getExamQuestions(examId));
      } else {
        const supabase = createClient();
        const { data: examData } = await supabase.from("exams").select("*").eq("id", examId).single();
        setExam(examData);
        const { data: eqData } = await supabase.from("exam_questions").select("*, question:questions(*)").eq("exam_id", examId).order("sort_order");
        setExamQuestions(eqData || []);
      }
    } catch {
      toast.error("Không thể tải đề thi");
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  const fetchAvailableQuestions = useCallback(async () => {
    try {
      if (isDemoMode) {
        setAvailableQuestions(demoDb.getQuestions({
          grade: filterGrade || undefined,
          topic: filterTopic || undefined,
          difficulty: filterDifficulty || undefined,
          search: searchQuery || undefined,
        }));
      } else {
        const supabase = createClient();
        let query = supabase.from("questions").select("*").order("created_at", { ascending: false });
        if (filterGrade) query = query.eq("grade", filterGrade);
        if (filterTopic) query = query.eq("topic", filterTopic);
        if (filterDifficulty) query = query.eq("difficulty", filterDifficulty);
        if (searchQuery) query = query.ilike("content", `%${searchQuery}%`);
        const { data } = await query.limit(30);
        setAvailableQuestions(data || []);
      }
    } catch {
      toast.error("Không thể tải bài tập");
    }
  }, [filterGrade, filterTopic, filterDifficulty, searchQuery]);

  useEffect(() => { fetchExam(); }, [fetchExam]);
  useEffect(() => { if (showQuestionPicker) fetchAvailableQuestions(); }, [showQuestionPicker, fetchAvailableQuestions]);

  const addQuestion = async (questionId: string) => {
    try {
      if (isDemoMode) {
        demoDb.addExamQuestion(examId, questionId);
      } else {
        const supabase = createClient();
        const { error } = await supabase.from("exam_questions").insert({
          exam_id: examId, question_id: questionId, sort_order: examQuestions.length, points: 1.0,
        });
        if (error) throw error;
      }
      toast.success("Đã thêm bài tập");
      fetchExam();
    } catch {
      toast.error("Không thể thêm bài tập");
    }
  };

  const removeQuestion = async (eqId: string) => {
    try {
      if (isDemoMode) {
        demoDb.removeExamQuestion(eqId);
      } else {
        const supabase = createClient();
        const { error } = await supabase.from("exam_questions").delete().eq("id", eqId);
        if (error) throw error;
      }
      setExamQuestions((prev) => prev.filter((eq) => eq.id !== eqId));
      toast.success("Đã xóa bài tập khỏi đề");
    } catch {
      toast.error("Không thể xóa");
    }
  };

  const updatePoints = async (eqId: string, points: number) => {
    try {
      if (isDemoMode) {
        demoDb.updateExamQuestionPoints(eqId, points);
      } else {
        const supabase = createClient();
        await supabase.from("exam_questions").update({ points }).eq("id", eqId);
      }
      setExamQuestions((prev) => prev.map((eq) => eq.id === eqId ? { ...eq, points } : eq));
    } catch {
      toast.error("Không thể cập nhật điểm");
    }
  };

  // --- Drag & Drop ---
  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const reorderQuestions = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const items = [...examQuestions];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    const updated = items.map((eq, i) => ({ ...eq, sort_order: i }));
    setExamQuestions(updated);
    if (isDemoMode) {
      try {
        const raw = localStorage.getItem('khodetoan_demo');
        if (raw) {
          const store = JSON.parse(raw);
          if (store.examQuestions) {
            updated.forEach(eq => {
              const item = store.examQuestions.find((e: ExamQuestion) => e.id === eq.id);
              if (item) item.sort_order = eq.sort_order;
            });
            localStorage.setItem('khodetoan_demo', JSON.stringify(store));
          }
        }
      } catch { /* ignore */ }
    }
  };

  const handleDrop = (index: number) => {
    if (dragIndex !== null && dragIndex !== index) {
      reorderQuestions(dragIndex, index);
      toast.success("Đã sắp xếp lại");
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const moveQuestion = (from: number, to: number) => {
    if (to < 0 || to >= examQuestions.length) return;
    reorderQuestions(from, to);
  };

  if (isLoading) {
    return (
      <>
        <Header title="Đang tải..." />
        <div className="p-6"><div className="skeleton h-96 rounded-2xl" /></div>
      </>
    );
  }

  if (!exam) return null;

  const totalPoints = examQuestions.reduce((sum, eq) => sum + eq.points, 0);

  return (
    <>
      <Header
        title={`Chỉnh sửa: ${exam.title}`}
        actions={
          <div className="flex items-center gap-3">
            <Link href={`/exams/${examId}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
              <ArrowLeft className="w-4 h-4" /> Xem đề
            </Link>
          </div>
        }
      />
      <div className="p-6 space-y-4">
        {/* Info bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-600"><strong>{examQuestions.length}</strong> bài tập</span>
            <span className="text-slate-600">Tổng: <strong>{totalPoints}</strong> điểm</span>
          </div>
          <button onClick={() => setShowQuestionPicker(true)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm">
            <Plus className="w-4 h-4" /> Thêm bài tập từ kho
          </button>
        </div>

        {/* Current questions */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-base font-semibold text-slate-800">Bài tập trong đề</h3>
          </div>
          {examQuestions.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">Chưa có bài tập. Thêm bài tập từ kho.</p>
              <button onClick={() => setShowQuestionPicker(true)} className="text-blue-600 hover:text-blue-700 font-medium">
                + Thêm bài tập
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {examQuestions.map((eq, index) => {
                const q = eq.question;
                return (
                  <div
                    key={eq.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                    className={cn(
                      "p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-all",
                      dragIndex === index && "opacity-40",
                      dragOverIndex === index && dragIndex !== index && "border-t-2 border-blue-500 bg-blue-50/30"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <GripVertical className="w-4 h-4 text-slate-300 cursor-grab active:cursor-grabbing" />
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">{index + 1}</span>
                      <div className="flex flex-col">
                        <button onClick={() => moveQuestion(index, index - 1)} disabled={index === 0} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30" title="Lên">
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button onClick={() => moveQuestion(index, index + 1)} disabled={index === examQuestions.length - 1} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30" title="Xuống">
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 line-clamp-2"><QuestionContent content={q.content} images={q.images} /></div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <input type="number" value={eq.points} onChange={(e) => updatePoints(eq.id, Number(e.target.value))} step={0.25} min={0} className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                        <span className="text-xs text-slate-400">đ</span>
                      </div>
                      <button onClick={() => removeQuestion(eq.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Question picker modal */}
        {showQuestionPicker && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-20">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[70vh] overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-800">Chọn bài tập từ kho</h3>
                <button onClick={() => setShowQuestionPicker(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 border-b border-slate-100 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm bài tập..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="flex gap-2">
                  <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value as Grade | "")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500">
                    <option value="">Tất cả lớp</option>
                    {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select>
                  <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value as Topic | "")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500">
                    <option value="">Tất cả chuyên đề</option>
                    {TOPICS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value as Difficulty | "")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500">
                    <option value="">Tất cả mức độ</option>
                    {DIFFICULTIES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[45vh] divide-y divide-slate-100">
                {availableQuestions.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">Không tìm thấy bài tập</div>
                ) : (
                  availableQuestions.map((q) => {
                    const isAdded = addedQuestionIds.has(q.id);
                    return (
                      <div key={q.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/50">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-800 line-clamp-2"><QuestionContent content={q.content} images={q.images} /></div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {q.grade}</span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{getTopicLabel(q.topic)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => !isAdded && addQuestion(q.id)}
                          disabled={isAdded}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex-shrink-0",
                            isAdded ? "bg-green-50 text-green-600 cursor-default" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          )}
                        >
                          {isAdded ? <><Check className="w-3.5 h-3.5" /> Đã thêm</> : <><Plus className="w-3.5 h-3.5" /> Thêm</>}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
