"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Save, ArrowLeft, Plus, X, Loader2, Eye } from "lucide-react";
import Link from "next/link";
import { GRADES, TOPICS, DIFFICULTIES, QUESTION_TYPES } from "@/types";
import type { Grade, Topic, Difficulty, QuestionType, QuestionOption } from "@/types";

import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import RichEditor from "@/components/shared/RichEditor";
import { MathRenderer } from "@/components/shared/MathRenderer";
import { useGrades } from "@/lib/hooks";

export default function NewQuestionPage() {
  const activeGrades = useGrades();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const [grade, setGrade] = useState<Grade>(9);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("nhan_biet");
  const [questionType, setQuestionType] = useState<QuestionType>("tu_luan");
  const [options, setOptions] = useState<QuestionOption[]>([
    { key: "A", value: "" },
    { key: "B", value: "" },
    { key: "C", value: "" },
    { key: "D", value: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [answerImages, setAnswerImages] = useState<string[]>([]);
  const [solutionImages, setSolutionImages] = useState<string[]>([]);
  const [showOptionsPreview, setShowOptionsPreview] = useState(false);

  React.useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data)).catch(() => {});
  }, []);


  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung bài tập");
      return;
    }
    setIsLoading(true);
    try {
      const questionData = {
        content,
        answer: answer || undefined,
        solution: solution || undefined,
        grade,
        topic: "so_hoc" as Topic, // Legacy fallback
        category_id: categoryId || undefined,
        difficulty,
        question_type: questionType,
        options: questionType === "trac_nghiem" ? options : undefined,
        correct_answer: questionType === "trac_nghiem" ? correctAnswer : undefined,
        tags: tags.length > 0 ? tags : undefined,
        images: images.length > 0 ? images : undefined,
        answer_images: answerImages.length > 0 ? answerImages : undefined,
        solution_images: solutionImages.length > 0 ? solutionImages : undefined,
        is_public: false,
        status: 'pending' as const,
      };

      if (isDemoMode) {
        demoDb.createQuestion(questionData);
      } else {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(questionData),
        });
        if (!res.ok) throw new Error('Lỗi');
      }

      toast.success("Đã thêm bài tập thành công!");
      router.push("/questions");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm bài tập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Thêm bài tập mới"
        actions={
          <Link href="/questions" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
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
                  {activeGrades.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-800">Đáp án trắc nghiệm</h2>
                <button
                  type="button"
                  onClick={() => setShowOptionsPreview(!showOptionsPreview)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    showOptionsPreview 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {showOptionsPreview ? 'Ẩn xem trước' : 'Xem trước'}
                </button>
              </div>
              <div className="space-y-3">
                {options.map((opt, i) => (
                  <div key={opt.key} className="space-y-1">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="correct" value={opt.key} checked={correctAnswer === opt.key} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors ${
                          correctAnswer === opt.key 
                            ? 'bg-green-100 text-green-700 ring-2 ring-green-400' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>{opt.key}</span>
                      </label>
                      <input type="text" value={opt.value} onChange={(e) => updateOption(i, e.target.value)} placeholder={`Đáp án ${opt.key}`} className={`flex-1 px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        correctAnswer === opt.key ? 'border-green-300 bg-green-50/50' : 'border-slate-200'
                      }`} />
                      {correctAnswer === opt.key && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md whitespace-nowrap">✓ Đúng</span>
                      )}
                    </div>
                    {showOptionsPreview && opt.value.trim() && (
                      <div className={`ml-[52px] px-3 py-2 rounded-lg text-sm border ${
                        correctAnswer === opt.key ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <MathRenderer content={opt.value} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {showOptionsPreview && (
                <div className="mt-5 p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Xem trước hiển thị cho học sinh</p>
                  <div className="space-y-2.5">
                    {options.filter(o => o.value.trim()).map(opt => (
                      <div key={opt.key} className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-colors ${
                        correctAnswer === opt.key ? 'bg-green-50 border-green-300' : 'bg-white border-slate-100'
                      }`}>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          correctAnswer === opt.key ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>{opt.key}</span>
                        <div className="flex-1 min-w-0 text-sm pt-0.5">
                          <MathRenderer content={opt.value} />
                        </div>
                        {correctAnswer === opt.key && (
                          <span className="text-xs font-bold text-green-600 shrink-0">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Nhập tag..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button type="button" onClick={addTag} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isLoading ? "Đang lưu..." : "Lưu bài tập"}
            </button>
            <Link href="/questions" className="px-6 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
