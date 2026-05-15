"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Save, ArrowLeft, Loader2, Plus, X, Settings, Zap } from "lucide-react";
import Link from "next/link";
import { GRADES } from "@/types";
import type { Grade } from "@/types";

import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

interface ExamTemplate {
  id: string;
  label: string;
  icon: string;
  color: string;
  duration: number;
  examType: string;
  desc: string;
}

const EXAM_TEMPLATES: ExamTemplate[] = [
  { id: 'kt15', label: 'KT 15 phút', icon: '⏱️', color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100', duration: 15, examType: 'Kiểm tra 15 phút', desc: '5-10 câu, nhanh gọn' },
  { id: 'kt45', label: 'KT 1 tiết', icon: '📝', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100', duration: 45, examType: 'Kiểm tra 1 tiết', desc: '15-20 câu, đa dạng' },
  { id: 'gk', label: 'Giữa kỳ', icon: '📋', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100', duration: 90, examType: 'Kiểm tra giữa kỳ', desc: '20-25 câu, TN+TL' },
  { id: 'ck', label: 'Cuối kỳ', icon: '📑', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100', duration: 90, examType: 'Kiểm tra cuối kỳ', desc: '25-30 câu, toàn diện' },
  { id: 'tt', label: 'Thi thử', icon: '🎯', color: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100', duration: 120, examType: 'Thi thử', desc: 'Theo cấu trúc thi chính thức' },
  { id: 'hsg', label: 'HSG', icon: '🏆', color: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100', duration: 150, examType: 'Thi HSG', desc: 'Nâng cao, tư duy' },
  { id: 'v10', label: 'Vào lớp 10', icon: '🎓', color: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100', duration: 120, examType: 'Thi vào 10', desc: '5 câu TL theo cấu trúc Sở' },
];

export default function NewExamPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState<Grade>(9);
  const [duration, setDuration] = useState<number>(90);
  const [schoolName, setSchoolName] = useState("");
  const [examType, setExamType] = useState("Kiểm tra giữa kỳ");
  const [schoolYear, setSchoolYear] = useState("2024-2025");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const applyTemplate = (tpl: ExamTemplate) => {
    setSelectedTemplate(tpl.id);
    setDuration(tpl.duration);
    setExamType(tpl.examType);
    if (!title) setTitle(`${tpl.examType} - Toán ${grade}`);
    toast.success(`Đã áp dụng template: ${tpl.label}`);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Vui lòng nhập tên đề thi"); return; }
    setIsLoading(true);
    try {
      const examData = {
        title, description: description || undefined, grade, duration,
        tags: tags.length > 0 ? tags : undefined,
        settings: { schoolName: schoolName, examType: examType, schoolYear: schoolYear, subject: `Toán ${grade}` },
      };

      let newId: string;
      if (isDemoMode) {
        const exam = demoDb.createExam(examData);
        newId = exam.id;
      } else {
        const res = await fetch('/api/exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(examData),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Lỗi tạo đề');
        }
        const data = await res.json();
        newId = data.id;
      }

      toast.success("Đã tạo đề thi!");
      router.push(`/exams/${newId}/edit`);
    } catch {
      toast.error("Không thể tạo đề thi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="Tạo đề thi mới" actions={
        <Link href="/exams" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </Link>
      } />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Template selection */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-semibold text-slate-800">Chọn nhanh loại đề</h2>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {EXAM_TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all",
                    selectedTemplate === tpl.id ? `${tpl.color} ring-2 ring-offset-1 ring-blue-400 scale-[1.02]` : `${tpl.color} opacity-70`
                  )}
                >
                  <span className="text-xl">{tpl.icon}</span>
                  <span className="text-xs font-semibold leading-tight">{tpl.label}</span>
                  <span className="text-[10px] opacity-70 leading-tight">{tpl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Thông tin đề thi</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Tên đề thi *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Đề kiểm tra giữa kỳ Toán 9 - Năm 2024" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Mô tả</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả ngắn về đề thi..." rows={2} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Lớp *</label>
                  <select value={grade} onChange={(e) => setGrade(Number(e.target.value) as Grade)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Thời gian (phút)</label>
                  <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={0} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-slate-500" />
              <h2 className="text-base font-semibold text-slate-800">Thông tin tiêu đề đề thi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Trường</label>
                <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="VD: THCS Nguyễn Du" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Loại đề</label>
                <select value={examType} onChange={(e) => setExamType(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>Kiểm tra giữa kỳ</option>
                  <option>Kiểm tra cuối kỳ</option>
                  <option>Kiểm tra 15 phút</option>
                  <option>Kiểm tra 1 tiết</option>
                  <option>Thi thử</option>
                  <option>Ôn tập</option>
                  <option>Thi HSG</option>
                  <option>Thi vào 10</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Năm học</label>
                <input type="text" value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} placeholder="2024-2025" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Tags</h2>
            <div className="flex items-center gap-2 mb-3">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Nhập tag..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              <button type="button" onClick={addTag} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"><Plus className="w-4 h-4" /></button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag} <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md shadow-blue-500/25 disabled:opacity-50">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isLoading ? "Đang tạo..." : "Tạo đề thi & Thêm bài tập"}
            </button>
            <Link href="/exams" className="px-6 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">Hủy</Link>
          </div>
        </form>
      </div>
    </>
  );
}
