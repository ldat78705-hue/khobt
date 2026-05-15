"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Save, ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { GRADES, TOPICS, DIFFICULTIES, QUESTION_TYPES } from "@/types";
import type { Grade, Topic, Difficulty, QuestionType, QuestionOption } from "@/types";

import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import RichEditor from "@/components/shared/RichEditor";

export default function NewQuestionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const [grade, setGrade] = useState<Grade>(9);
  const [topic, setTopic] = useState<Topic>("so_hoc");
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
        topic,
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
                  {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Chuyên đề *</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value as Topic)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  {TOPICS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
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
              <h2 className="text-base font-semibold text-slate-800 mb-4">Đáp án trắc nghiệm</h2>
              <div className="space-y-3">
                {options.map((opt, i) => (
                  <div key={opt.key} className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="correct"
                        value={opt.key}
                        checked={correctAnswer === opt.key}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">{opt.key}</span>
                    </label>
                    <input
                      type="text"
                      value={opt.value}
                      onChange={(e) => updateOption(i, e.target.value)}
                      placeholder={`Đáp án ${opt.key}`}
                      className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
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
