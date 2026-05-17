"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import {
  Plus, Search, ArrowLeft, Trash2, GripVertical,
  BookOpen, Check, Loader2, X, ChevronUp, ChevronDown, PenLine, FileText, Edit, Save
} from "lucide-react";
import Link from "next/link";
import { cn, getDifficultyLabel, getTopicLabel, getDifficultyColor, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES } from "@/types";
import type { Exam, ExamQuestion, Question, Grade, Topic, Difficulty } from "@/types";
import { toast } from "sonner";
import { QuestionContent } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb } from "@/lib/demo-data";

type TabMode = 'from_bank' | 'manual';

interface InlineQuestion {
  content: string;
  answer: string;
  solution: string;
  grade: number;
  topic: string;
  difficulty: string;
  question_type: string;
  points: number;
}

const EMPTY_INLINE: InlineQuestion = {
  content: '', answer: '', solution: '', grade: 9,
  topic: 'tong_hop', difficulty: 'van_dung', question_type: 'tu_luan', points: 1,
};

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
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Manual input
  const [pickerTab, setPickerTab] = useState<TabMode>('from_bank');
  const [inlineQ, setInlineQ] = useState<InlineQuestion>({ ...EMPTY_INLINE });
  const [isAdding, setIsAdding] = useState(false);

  // Inline edit for existing questions
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState({ content: '', answer: '', solution: '' });
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (eq: ExamQuestion & { question: Question }) => {
    setEditingId(eq.id);
    setEditContent({
      content: eq.question.content || '',
      answer: eq.question.answer || '',
      solution: eq.question.solution || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent({ content: '', answer: '', solution: '' });
  };

  const saveEdit = async (eq: ExamQuestion & { question: Question }) => {
    if (!editContent.content.trim()) { toast.error("Nội dung không được trống"); return; }
    setIsSaving(true);
    try {
      if (isDemoMode) {
        // Update in demo DB
        const questions = demoDb.getQuestions({});
        const found = questions.find(q => q.id === eq.question_id);
        if (found) {
          Object.assign(found, {
            content: editContent.content,
            answer: editContent.answer,
            solution: editContent.solution,
          });
        }
      } else {
        const res = await fetch('/api/questions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: eq.question_id,
            content: editContent.content,
            answer: editContent.answer,
            solution: editContent.solution,
          }),
        });
        if (!res.ok) throw new Error('Lỗi lưu');
      }
      // Update local state
      setExamQuestions(prev => prev.map(e =>
        e.id === eq.id ? { ...e, question: { ...e.question, content: editContent.content, answer: editContent.answer, solution: editContent.solution } } : e
      ));
      toast.success("Đã lưu chỉnh sửa!");
      setEditingId(null);
    } catch {
      toast.error("Không thể lưu");
    } finally {
      setIsSaving(false);
    }
  };

  const addedQuestionIds = new Set(examQuestions.map((eq) => eq.question_id));

  const fetchExam = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setExam(demoDb.getExam(examId));
        setExamQuestions(demoDb.getExamQuestions(examId));
      } else {
        const res = await fetch(`/api/exams?id=${examId}`);
        if (!res.ok) throw new Error('Lỗi');
        const data = await res.json();
        setExam(data.exam);
        const eqs = (data.questions || []).map((eq: any) => ({
          ...eq,
          question: {
            id: eq.question_id, content: eq.content, answer: eq.answer,
            solution: eq.solution, grade: eq.grade, topic: eq.topic,
            difficulty: eq.difficulty, question_type: eq.question_type,
            options: eq.options, correct_answer: eq.correct_answer,
            images: eq.images, tags: eq.tags,
          }
        }));
        setExamQuestions(eqs);
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
          grade: filterGrade || undefined, topic: filterTopic || undefined,
          difficulty: filterDifficulty || undefined, search: searchQuery || undefined,
        }));
      } else {
        const params = new URLSearchParams();
        if (filterGrade) params.append('grade', String(filterGrade));
        if (filterTopic) params.append('topic', filterTopic);
        if (filterDifficulty) params.append('difficulty', filterDifficulty);
        if (searchQuery) params.append('search', searchQuery);
        params.append('limit', '30');
        const res = await fetch(`/api/questions?${params}`);
        if (res.ok) {
          const json = await res.json();
          setAvailableQuestions(Array.isArray(json) ? json : (json.data || []));
        }
      }
    } catch {
      toast.error("Không thể tải bài tập");
    }
  }, [filterGrade, filterTopic, filterDifficulty, searchQuery]);

  useEffect(() => { fetchExam(); }, [fetchExam]);
  useEffect(() => { if (showQuestionPicker && pickerTab === 'from_bank') fetchAvailableQuestions(); }, [showQuestionPicker, fetchAvailableQuestions, pickerTab]);

  const addQuestion = async (questionId: string) => {
    try {
      if (isDemoMode) {
        demoDb.addExamQuestion(examId, questionId);
      } else {
        const res = await fetch('/api/exam-questions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ exam_id: examId, question_id: questionId, sort_order: examQuestions.length }),
        });
        if (!res.ok) throw new Error('Lỗi');
      }
      toast.success("Đã thêm bài tập");
      fetchExam();
    } catch { toast.error("Không thể thêm bài tập"); }
  };

  // Thêm câu hỏi thủ công (inline)
  const addInlineQuestion = async () => {
    if (!inlineQ.content.trim()) { toast.error("Nhập nội dung câu hỏi"); return; }
    setIsAdding(true);
    try {
      if (isDemoMode) {
        const q = demoDb.createQuestion({
          content: inlineQ.content, answer: inlineQ.answer, solution: inlineQ.solution,
          grade: inlineQ.grade as any, topic: inlineQ.topic as any,
          difficulty: inlineQ.difficulty as any, question_type: inlineQ.question_type as any,
          is_public: false, status: 'approved' as any,
        });
        demoDb.addExamQuestion(examId, q.id);
      } else {
        const res = await fetch('/api/exam-questions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            exam_id: examId,
            sort_order: examQuestions.length,
            points: inlineQ.points,
            inline_question: {
              content: inlineQ.content, answer: inlineQ.answer, solution: inlineQ.solution,
              grade: inlineQ.grade, topic: inlineQ.topic,
              difficulty: inlineQ.difficulty, question_type: inlineQ.question_type,
            },
          }),
        });
        if (!res.ok) throw new Error('Lỗi');
      }
      toast.success("Đã thêm câu hỏi thủ công!");
      setInlineQ({ ...EMPTY_INLINE, grade: exam?.grade || 9 });
      fetchExam();
    } catch { toast.error("Không thể thêm câu hỏi"); }
    finally { setIsAdding(false); }
  };

  const removeQuestion = async (eqId: string) => {
    try {
      if (isDemoMode) { demoDb.removeExamQuestion(eqId); }
      else {
        const res = await fetch(`/api/exam-questions?id=${eqId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Lỗi');
      }
      setExamQuestions((prev) => prev.filter((eq) => eq.id !== eqId));
      toast.success("Đã xóa bài tập khỏi đề");
    } catch { toast.error("Không thể xóa"); }
  };

  const updatePoints = async (eqId: string, points: number) => {
    try {
      if (isDemoMode) { demoDb.updateExamQuestionPoints(eqId, points); }
      else {
        await fetch('/api/exam-questions', {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: eqId, points }),
        });
      }
      setExamQuestions((prev) => prev.map((eq) => eq.id === eqId ? { ...eq, points } : eq));
    } catch { toast.error("Không thể cập nhật điểm"); }
  };

  const reorderQuestions = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const items = [...examQuestions];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    setExamQuestions(items.map((eq, i) => ({ ...eq, sort_order: i })));
  };

  const handleDrop = (index: number) => {
    if (dragIndex !== null && dragIndex !== index) { reorderQuestions(dragIndex, index); toast.success("Đã sắp xếp lại"); }
    setDragIndex(null); setDragOverIndex(null);
  };

  const moveQuestion = (from: number, to: number) => {
    if (to < 0 || to >= examQuestions.length) return;
    reorderQuestions(from, to);
  };

  if (isLoading) return (<><Header title="Đang tải..." /><div className="p-6"><div className="skeleton h-96 rounded-2xl" /></div></>);
  if (!exam) return null;

  const totalPoints = examQuestions.reduce((sum, eq) => sum + eq.points, 0);

  return (
    <>
      <Header title={`Chỉnh sửa: ${exam.title}`} actions={
        <div className="flex items-center gap-3">
          <Link href={`/exams/${examId}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
            <ArrowLeft className="w-4 h-4" /> Xem đề
          </Link>
        </div>
      } />
      <div className="p-6 space-y-4">
        {/* Info bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-600"><strong>{examQuestions.length}</strong> bài tập</span>
            <span className="text-slate-600">Tổng: <strong>{totalPoints}</strong> điểm</span>
          </div>
          <button onClick={() => setShowQuestionPicker(true)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm">
            <Plus className="w-4 h-4" /> Thêm câu hỏi
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
              <p className="text-slate-500 mb-4">Chưa có bài tập. Thêm từ kho hoặc nhập thủ công.</p>
              <button onClick={() => setShowQuestionPicker(true)} className="text-blue-600 hover:text-blue-700 font-medium">+ Thêm câu hỏi</button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {examQuestions.map((eq, index) => {
                const q = eq.question;
                return (
                  <div key={eq.id} draggable onDragStart={() => setDragIndex(index)} onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }} onDrop={() => handleDrop(index)} onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                    className={cn("p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-all", dragIndex === index && "opacity-40", dragOverIndex === index && dragIndex !== index && "border-t-2 border-blue-500 bg-blue-50/30")}>
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <GripVertical className="w-4 h-4 text-slate-300 cursor-grab active:cursor-grabbing" />
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">{index + 1}</span>
                      <div className="flex flex-col">
                        <button onClick={() => moveQuestion(index, index - 1)} disabled={index === 0} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30"><ChevronUp className="w-3 h-3" /></button>
                        <button onClick={() => moveQuestion(index, index + 1)} disabled={index === examQuestions.length - 1} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30"><ChevronDown className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      {editingId === eq.id ? (
                        /* Inline edit mode */
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Nội dung câu hỏi</label>
                            <textarea
                              value={editContent.content}
                              onChange={e => setEditContent(prev => ({ ...prev, content: e.target.value }))}
                              rows={4}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
                              placeholder="Nhập nội dung... Hỗ trợ LaTeX: $x^2$"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Đáp án</label>
                              <textarea
                                value={editContent.answer}
                                onChange={e => setEditContent(prev => ({ ...prev, answer: e.target.value }))}
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
                                placeholder="Đáp án..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Lời giải</label>
                              <textarea
                                value={editContent.solution}
                                onChange={e => setEditContent(prev => ({ ...prev, solution: e.target.value }))}
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
                                placeholder="Lời giải chi tiết..."
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => saveEdit(eq)}
                              disabled={isSaving}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                              Lưu
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                            >
                              <X className="w-3.5 h-3.5" /> Hủy
                            </button>
                          </div>
                          {/* Xem trước */}
                          <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                            <p className="text-xs font-medium text-slate-500 mb-2">Xem trước hiển thị:</p>
                            <div className="text-sm text-slate-800">
                              <QuestionContent content={editContent.content} images={q.images} />
                            </div>
                            {editContent.answer && (
                              <div className="mt-2 p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
                                <strong>Đáp án:</strong> <QuestionContent content={editContent.answer} />
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* View mode */
                        <>
                          <div className="text-sm text-slate-800"><QuestionContent content={q.content} images={q.images} /></div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <input type="number" value={eq.points} onChange={(e) => updatePoints(eq.id, Number(e.target.value))} step={0.25} min={0} className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                        <span className="text-xs text-slate-400">đ</span>
                      </div>
                      <button
                        onClick={() => editingId === eq.id ? cancelEdit() : startEdit(eq)}
                        className={cn("p-2 rounded-lg transition-colors", editingId === eq.id ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 text-slate-400 hover:text-blue-600")}
                        title="Sửa nội dung"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeQuestion(eq.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Question picker modal */}
        {showQuestionPicker && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-10 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-800">Thêm câu hỏi vào đề</h3>
                <button onClick={() => setShowQuestionPicker(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              {/* Tabs: Từ kho / Nhập thủ công */}
              <div className="px-4 pt-3 flex items-center gap-1 bg-slate-50 border-b border-slate-100">
                <button onClick={() => setPickerTab('from_bank')} className={cn("flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2", pickerTab === 'from_bank' ? "bg-white text-blue-700 border-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 border-transparent")}>
                  <FileText className="w-4 h-4" /> Từ kho bài tập
                </button>
                <button onClick={() => setPickerTab('manual')} className={cn("flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2", pickerTab === 'manual' ? "bg-white text-blue-700 border-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 border-transparent")}>
                  <PenLine className="w-4 h-4" /> Nhập thủ công
                </button>
              </div>

              {pickerTab === 'from_bank' ? (
                <>
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
                  <div className="overflow-y-auto max-h-[50vh] divide-y divide-slate-100">
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
                            <button onClick={() => !isAdded && addQuestion(q.id)} disabled={isAdded}
                              className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex-shrink-0", isAdded ? "bg-green-50 text-green-600 cursor-default" : "bg-blue-50 text-blue-600 hover:bg-blue-100")}>
                              {isAdded ? <><Check className="w-3.5 h-3.5" /> Đã thêm</> : <><Plus className="w-3.5 h-3.5" /> Thêm</>}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </>
              ) : (
                /* Manual input tab */
                <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700">
                    <strong>💡 Nhập thủ công:</strong> Nhập nội dung câu hỏi, đáp án, lời giải trực tiếp. Hỗ trợ LaTeX: <code className="bg-blue-100 px-1 rounded">$công_thức$</code>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Nội dung câu hỏi *</label>
                    <textarea value={inlineQ.content} onChange={e => setInlineQ({ ...inlineQ, content: e.target.value })} rows={5} placeholder="Nhập nội dung câu hỏi... Hỗ trợ LaTeX: $x^2 + y^2 = r^2$" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">Đáp án</label>
                      <textarea value={inlineQ.answer} onChange={e => setInlineQ({ ...inlineQ, answer: e.target.value })} rows={2} placeholder="Đáp án ngắn..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">Lời giải chi tiết</label>
                      <textarea value={inlineQ.solution} onChange={e => setInlineQ({ ...inlineQ, solution: e.target.value })} rows={2} placeholder="Lời giải..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Lớp</label>
                      <select value={inlineQ.grade} onChange={e => setInlineQ({ ...inlineQ, grade: Number(e.target.value) })} className="w-full px-2 py-2 border border-slate-200 rounded-lg text-xs">
                        {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Chuyên đề</label>
                      <select value={inlineQ.topic} onChange={e => setInlineQ({ ...inlineQ, topic: e.target.value })} className="w-full px-2 py-2 border border-slate-200 rounded-lg text-xs">
                        {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Mức độ</label>
                      <select value={inlineQ.difficulty} onChange={e => setInlineQ({ ...inlineQ, difficulty: e.target.value })} className="w-full px-2 py-2 border border-slate-200 rounded-lg text-xs">
                        {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Điểm</label>
                      <input type="number" value={inlineQ.points} onChange={e => setInlineQ({ ...inlineQ, points: Number(e.target.value) })} step={0.25} min={0} className="w-full px-2 py-2 border border-slate-200 rounded-lg text-xs text-center" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={addInlineQuestion} disabled={isAdding || !inlineQ.content.trim()} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm disabled:opacity-50">
                      {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Thêm câu hỏi vào đề
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
