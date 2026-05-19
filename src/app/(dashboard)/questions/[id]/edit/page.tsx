"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Save, ArrowLeft, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { GRADES, TOPICS, DIFFICULTIES, QUESTION_TYPES } from "@/types";
import type { Grade, Topic, Difficulty, QuestionType, QuestionOption, Question } from "@/types";

import { toast } from "sonner";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import RichEditor from "@/components/shared/RichEditor";
import { useAuthStore } from "@/stores/auth-store";
import { Shield } from "lucide-react";

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { user } = useAuthStore();
  const currentUser = user || DEMO_USER;
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const [grade, setGrade] = useState<Grade>(9);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("nhan_biet");
  const [questionType, setQuestionType] = useState<QuestionType>("tu_luan");
  const [options, setOptions] = useState<QuestionOption[]>([
    { key: "A", value: "" }, { key: "B", value: "" },
    { key: "C", value: "" }, { key: "D", value: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [answerImages, setAnswerImages] = useState<string[]>([]);
  const [solutionImages, setSolutionImages] = useState<string[]>([]);
  const [questionCode, setQuestionCode] = useState("");

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data)).catch(() => {});
  }, []);


  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    try {
      let q: Question | null = null;
      if (isDemoMode) {
        q = demoDb.getQuestion(questionId);
      } else {
        const res = await fetch(`/api/questions?id=${questionId}`);
        if (!res.ok) throw new Error('Lỗi');
        q = await res.json();
      }
      if (q) {
        // Permission check
        if (!demoDb.canEditQuestion(currentUser.id, currentUser.role, q)) {
          setIsLocked(true);
        }
        setContent(q.content);
        setAnswer(q.answer || "");
        setSolution(q.solution || "");
        setGrade(q.grade);
        setCategoryId(q.category_id || "");
        setDifficulty(q.difficulty);
        setQuestionType(q.question_type);
        if (q.options) setOptions(q.options);
        if (q.correct_answer) setCorrectAnswer(q.correct_answer);
        if (q.tags) setTags(q.tags);
        if (q.images) setImages(q.images);
        if (q.answer_images) setAnswerImages(q.answer_images);
        if (q.solution_images) setSolutionImages(q.solution_images);
        if (q.question_code) setQuestionCode(q.question_code);
      }
    } catch {
      toast.error("Không thể tải bài tập");
    } finally {
      setIsLoading(false);
    }
  }, [questionId]);

  useEffect(() => { fetchQuestion(); }, [fetchQuestion]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) { toast.error("Vui lòng nhập nội dung bài tập"); return; }
    setIsSaving(true);
    try {
      const updates: any = {
        content, answer: answer || undefined, solution: solution || undefined,
        grade, topic: "so_hoc", category_id: categoryId || undefined, difficulty, question_type: questionType,
        options: questionType === "trac_nghiem" ? options : undefined,
        correct_answer: questionType === "trac_nghiem" ? correctAnswer : undefined,
        tags: tags.length > 0 ? tags : undefined,
        images: images.length > 0 ? images : undefined,
        question_code: questionCode || undefined,
      };

      if (isDemoMode) {
        demoDb.updateQuestion(questionId, updates, currentUser.role);
      } else {
        const res = await fetch('/api/questions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: questionId, ...updates }),
        });
        if (!res.ok) throw new Error('Lỗi');
      }

      if (currentUser.role !== 'admin') {
        toast.success("Đã cập nhật! Bài tập sẽ được duyệt lại.");
      } else {
        toast.success("Đã cập nhật bài tập!");
      }
      router.push(`/questions/${questionId}`);
    } catch {
      toast.error("Không thể cập nhật bài tập");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header title="Sửa bài tập" />
        <div className="p-6 max-w-4xl space-y-4">
          <div className="skeleton h-32 rounded-2xl" />
          <div className="skeleton h-48 rounded-2xl" />
          <div className="skeleton h-32 rounded-2xl" />
        </div>
      </>
    );
  }

  if (isLocked) {
    return (
      <>
        <Header title="Không thể sửa" />
        <div className="p-6 max-w-2xl">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <Shield className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-amber-800 mb-2">Bài tập đã được duyệt</h2>
            <p className="text-sm text-amber-600 mb-6">Bài tập đã duyệt không thể sửa để đảm bảo chất lượng kho đề. Liên hệ Admin nếu cần thay đổi.</p>
            <Link href={`/questions/${questionId}`} className="px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm">
              Quay lại chi tiết
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="Sửa bài tập"
        actions={
          <Link href={`/questions/${questionId}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>
        }
      />
      <div className="p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Classification */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Phân loại</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Lớp *</label>
                <select value={grade} onChange={(e) => setGrade(Number(e.target.value) as Grade)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Chuyên đề (Danh mục) *</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 max-w-[200px] truncate">
                  <option value="">Chọn danh mục</option>
                  {(() => {
                    const raw = categories.filter(c => grade ? c.grade === Number(grade) : true);
                    const display: any[] = [];
                    const parents = raw.filter(c => !c.parent_id).sort((a,b) => a.sort_order - b.sort_order);
                    for (const p of parents) {
                      display.push({ ...p, displayName: p.name });
                      const children = raw.filter(c => c.parent_id === p.id).sort((a,b) => a.sort_order - b.sort_order);
                      for (const child of children) display.push({ ...child, displayName: `\u00A0\u00A0\u00A0\u00A0${child.name}` });
                    }
                    const handled = new Set(display.map(c => c.id));
                    for (const orphan of raw.filter(c => !handled.has(c.id))) display.push({ ...orphan, displayName: orphan.name });
                    return display.map(c => <option key={c.id} value={c.id}>{c.displayName}</option>);
                  })()}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Mức độ *</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  {DIFFICULTIES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Dạng bài *</label>
                <select value={questionType} onChange={(e) => setQuestionType(e.target.value as QuestionType)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  {QUESTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Question Code */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-3">Mã bài tập</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={questionCode}
                onChange={(e) => setQuestionCode(e.target.value.toUpperCase())}
                placeholder="VD: TK-001, HP-245..."
                className="flex-1 max-w-xs px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <span className="text-xs text-slate-400">Tự động tạo nếu để trống. Mã không được trùng.</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <RichEditor
              label="Nội dung bài tập *"
              value={content}
              onChange={setContent}
              images={images}
              onImagesChange={setImages}
              placeholder="Nhập nội dung bài tập..."
              rows={8}
              previewLabel="Xem trước bài tập"
            />
          </div>

          {/* Options for multiple choice */}
          {questionType === "trac_nghiem" && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-800 mb-4">Đáp án trắc nghiệm</h2>
              <div className="space-y-3">
                {options.map((opt, i) => (
                  <div key={opt.key} className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="correct" value={opt.key} checked={correctAnswer === opt.key} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">{opt.key}</span>
                    </label>
                    <input type="text" value={opt.value} onChange={(e) => updateOption(i, e.target.value)} placeholder={`Đáp án ${opt.key}`} className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Answer & Solution */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Đáp án & Lời giải</h2>
            <div className="space-y-6">
              <RichEditor
                label="Đáp án"
                value={answer}
                onChange={setAnswer}
                images={answerImages}
                onImagesChange={setAnswerImages}
                placeholder="Nhập đáp án..."
                rows={3}
                maxImages={3}
                previewLabel="Xem trước đáp án"
                previewBgClass="bg-blue-50/30"
              />
              <RichEditor
                label="Lời giải chi tiết"
                value={solution}
                onChange={setSolution}
                images={solutionImages}
                onImagesChange={setSolutionImages}
                placeholder="Nhập lời giải chi tiết..."
                rows={5}
                maxImages={5}
                previewLabel="Xem trước lời giải"
                previewBgClass="bg-green-50/30"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Tags</h2>
            <div className="flex items-center gap-2 mb-3">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Nhập tag..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <button type="button" onClick={addTag} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Đang lưu..." : "Cập nhật bài tập"}
            </button>
            <Link href={`/questions/${questionId}`} className="px-6 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
