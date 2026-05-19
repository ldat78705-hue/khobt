"use client";

import React, { useState, useRef, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  Upload, FileText, Trash2, Edit, Check, X, ChevronDown, ChevronUp,
  Loader2, Plus, Sparkles, BookOpen, AlertTriangle, CheckCircle, Eye, Download
} from "lucide-react";
import { cn, getDifficultyLabel, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES, QUESTION_TYPES } from "@/types";
import type { Grade, Topic, Difficulty, QuestionType } from "@/types";
import { toast } from "sonner";
import { MathRenderer } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { useRouter } from "next/navigation";

interface ParsedQuestion {
  number: number;
  content: string;
  answer: string;
  solution: string;
  points: number;
  difficulty: string;
  topic: string;
  question_type: string;
  // UI state
  selected: boolean;
  editing: boolean;
  expanded: boolean;
}

export default function ImportWordPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [step, setStep] = useState<'upload' | 'review'>('upload');

  // Global settings for all imported questions
  const [globalGrade, setGlobalGrade] = useState<Grade>(9);
  const [globalCategoryId, setGlobalCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [globalDifficulty, setGlobalDifficulty] = useState<Difficulty>("van_dung");

  React.useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data)).catch(() => {});
  }, []);

  // Preview mode
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
      toast.error("Chỉ hỗ trợ file .docx. Nếu file .doc, hãy lưu lại thành .docx trước.");
      return;
    }

    setIsUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      
      let fileToUpload = file;
      
      // Auto MathType Conversion via Local Bridge
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        const pingRes = await fetch('http://localhost:8989/ping', { signal: controller.signal }).catch(() => null);
        clearTimeout(timeoutId);
        
        if (pingRes && pingRes.ok) {
          toast.loading("Tool cục bộ đang tự động xử lý MathType... (Vui lòng không thao tác chuột)", { id: "local-convert" });
          const localFormData = new FormData();
          localFormData.append('file', file);
          
          const convertRes = await fetch('http://localhost:8989/convert', {
            method: 'POST',
            body: localFormData
          });
          
          if (convertRes.ok) {
            const blob = await convertRes.blob();
            fileToUpload = new File([blob], `converted_${file.name}`, { type: file.type });
            toast.success("Đã xử lý xong MathType qua Tool cục bộ!", { id: "local-convert" });
          } else {
            toast.error("Tool cục bộ gặp lỗi khi chuyển đổi. Sẽ import file gốc.", { id: "local-convert" });
          }
        } else {
          // Tool not running
          toast.info("Mẹo: Mở phần mềm 'Tiện Ích Chuyển Đổi' trên máy tính để tự động xử lý MathType (nếu có).", { duration: 5000 });
        }
      } catch (err) {
        console.log("Local tool not detected", err);
      }

      formData.append('file', fileToUpload);

      const res = await fetch('/api/import-word', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Lỗi parse file');
      }

      const data = await res.json();

      if (!data.questions || data.questions.length === 0) {
        toast.error("Không tìm thấy câu hỏi nào trong file. Kiểm tra lại format (Câu 1., Bài 1., ...)");
        setIsUploading(false);
        return;
      }

      // Add UI state to each question
      const withState: ParsedQuestion[] = data.questions.map((q: any) => ({
        ...q,
        selected: true,
        editing: false,
        expanded: false,
      }));

      setQuestions(withState);
      setStep('review');
      toast.success(`Đã tìm thấy ${withState.length} câu hỏi từ file "${file.name}"`);
    } catch (err: any) {
      toast.error(err.message || "Lỗi upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.docx')) {
      // Create a synthetic input change event
      const dt = new DataTransfer();
      dt.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dt.files;
        fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      toast.error("Chỉ hỗ trợ file .docx");
    }
  }, []);

  const updateQuestion = (idx: number, updates: Partial<ParsedQuestion>) => {
    setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, ...updates } : q));
  };

  const toggleSelect = (idx: number) => {
    updateQuestion(idx, { selected: !questions[idx].selected });
  };

  const toggleSelectAll = () => {
    const allSelected = questions.every(q => q.selected);
    setQuestions(prev => prev.map(q => ({ ...q, selected: !allSelected })));
  };

  const removeQuestion = (idx: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const applyGlobalSettings = () => {
    setQuestions(prev => prev.map(q => ({
      ...q,
      topic: globalCategoryId, // Actually stores category_id
      difficulty: globalDifficulty,
    })));
    toast.success("Đã áp dụng cài đặt chung cho tất cả câu hỏi");
  };

  const handleImport = async () => {
    const selected = questions.filter(q => q.selected);
    if (selected.length === 0) {
      toast.error("Chọn ít nhất 1 câu hỏi để import");
      return;
    }

    setIsImporting(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (const q of selected) {
        try {
          if (isDemoMode) {
            demoDb.createQuestion({
              content: q.content,
              answer: q.answer || undefined,
              solution: q.solution || undefined,
              grade: globalGrade,
              topic: q.topic as any,
              difficulty: q.difficulty as any,
              question_type: q.question_type as any,
              is_public: true,
              status: 'approved' as any,
            });
            successCount++;
          } else {
            const res = await fetch('/api/questions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                content: q.content,
                answer: q.answer || '',
                solution: q.solution || '',
                grade: globalGrade,
                topic: "so_hoc",
                category_id: q.topic || undefined, // Stored in q.topic field temporarily
                difficulty: q.difficulty,
                question_type: q.question_type,
                is_public: true,
                status: 'approved',
              }),
            });
            if (res.ok) successCount++;
            else failCount++;
          }
        } catch {
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Đã import ${successCount} câu hỏi thành công!${failCount > 0 ? ` (${failCount} thất bại)` : ''}`);
        router.push('/questions');
      } else {
        toast.error("Không import được câu nào");
      }
    } catch {
      toast.error("Lỗi khi import");
    } finally {
      setIsImporting(false);
    }
  };

  const selectedCount = questions.filter(q => q.selected).length;

  return (
    <>
      <Header title="Import từ Word" subtitle="Upload file Word đã convert LaTeX → import hàng loạt vào kho" />
      <div className="p-6 max-w-5xl space-y-6">

        {step === 'upload' ? (
          <>
            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <Upload className="w-6 h-6" />
                <h2 className="text-lg font-bold">Import bài tập từ file Word</h2>
              </div>
              <div className="text-blue-100 text-sm space-y-2">
                <p>📝 <strong>Bước 1:</strong> (Chỉ làm 1 lần) Cài đặt Tool kết nối MathType chạy ngầm siêu nhẹ.</p>
                <div className="pt-1 pb-2">
                  <a href="/ToolMathTypeTuDong.exe" download className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-sm text-sm">
                    <Download className="w-4 h-4" />
                    Tải Tool Cầu Nối MathType Tự Động (.exe)
                  </a>
                </div>
                <p>⚙️ <strong>Bước 2:</strong> Nhấn đúp để mở Tool vừa tải (Phần mềm sẽ tự chạy ngầm và tự động khởi động cùng Windows).</p>
                <p>📤 <strong>Bước 3:</strong> Kéo thả file .docx vào khung bên dưới, hệ thống sẽ tự động bắt tay với máy tính để chuyển đổi MathType siêu tốc!</p>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Sparkles className="w-40 h-40" />
              </div>
            </div>

            {/* Format guide */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-800 mb-3">📋 Định dạng file Word cần có</h3>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 font-mono space-y-1">
                <p className="text-slate-400">// Hệ thống sẽ tách theo &quot;Câu X.&quot; hoặc &quot;Bài X.&quot;</p>
                <p><strong>Câu 1.</strong> (2 điểm) Cho $\triangle ABC$ vuông tại $A$...</p>
                <p className="text-slate-500 ml-4">a) Chứng minh $AB^2 = BH \cdot BC$.</p>
                <p className="text-slate-500 ml-4">b) Tính $\sin\widehat{'{'}B{'}'}$.</p>
                <p className="mt-2"><strong>Câu 2.</strong> Giải phương trình: $x^2 - 5x + 6 = 0$</p>
                <p className="text-slate-400 ml-4">Đáp án: $x = 2$ hoặc $x = 3$</p>
                <p className="mt-2"><strong>Câu 3.</strong> (1 điểm) Rút gọn: $\frac{'{'}1{'}'}{'{'}\\sqrt{'{'}2{'}'}{'}'}$</p>
              </div>
              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <p>💡 LaTeX <code className="bg-slate-100 px-1 rounded">$...$</code> sẽ được giữ nguyên.</p>
                <p>💡 Điểm số sẽ được trích tự động từ <code className="bg-slate-100 px-1 rounded">(2 điểm)</code> hoặc <code className="bg-slate-100 px-1 rounded">(2đ)</code>.</p>
                <p>💡 Đáp án/Lời giải sẽ được nhận diện nếu bắt đầu bằng &quot;Đáp án:&quot; hoặc &quot;Lời giải:&quot;.</p>
              </div>
            </div>

            {/* Upload area */}
            <div
              className="bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 p-12 text-center shadow-sm transition-colors cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              {isUploading ? (
                <div className="space-y-3">
                  <Loader2 className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
                  <p className="text-slate-600 font-medium">Đang xử lý file &quot;{fileName}&quot;...</p>
                  <p className="text-xs text-slate-400">Parse nội dung và tách câu hỏi</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto group-hover:bg-blue-100 transition-colors">
                    <Upload className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-slate-700 font-semibold">Kéo thả file .docx vào đây hoặc click để chọn</p>
                  <p className="text-slate-400 font-medium mt-1">(Tự động nhận diện và xử lý MathType / Word Equation)</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Review step */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  📄 {fileName} — {questions.length} câu hỏi
                </h2>
                <p className="text-sm text-slate-500">Review, chỉnh sửa rồi import vào kho bài tập</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setStep('upload'); setQuestions([]); }}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  ← Upload file khác
                </button>
              </div>
            </div>

            {/* Global settings */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">⚙️ Cài đặt chung cho tất cả câu hỏi</h3>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Lớp</label>
                  <select
                    value={globalGrade}
                    onChange={e => setGlobalGrade(Number(e.target.value) as Grade)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Chuyên đề (Danh mục)</label>
                  <select
                    value={globalCategoryId}
                    onChange={e => setGlobalCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 truncate"
                  >
                    <option value="">Chọn danh mục</option>
                    {(() => {
                      const raw = categories.filter(c => globalGrade ? c.grade === Number(globalGrade) : true);
                      const display: any[] = [];
                      const parents = raw.filter(c => !c.parent_id).sort((a,b) => a.sort_order - b.sort_order);
                      for (const p of parents) {
                        display.push({ ...p, displayName: p.name });
                        const children = raw.filter(c => c.parent_id === p.id).sort((a,b) => a.sort_order - b.sort_order);
                        for (const child of children) display.push({ ...child, displayName: `\u00A0\u00A0\u00A0\u00A0${child.name}` });
                      }
                      return display.map(c => <option key={c.id} value={c.id}>{c.displayName}</option>);
                    })()}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Mức độ</label>
                  <select
                    value={globalDifficulty}
                    onChange={e => setGlobalDifficulty(e.target.value as Difficulty)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={applyGlobalSettings}
                    className="w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    Áp dụng tất cả
                  </button>
                </div>
              </div>
            </div>

            {/* Selection bar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSelectAll}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                    questions.every(q => q.selected)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={questions.every(q => q.selected) && questions.length > 0}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600"
                  />
                  {questions.every(q => q.selected) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
                <span className="text-sm text-slate-500">
                  Đã chọn <strong className="text-blue-600">{selectedCount}</strong> / {questions.length} câu
                </span>
              </div>
              <button
                onClick={handleImport}
                disabled={isImporting || selectedCount === 0}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md disabled:opacity-50 transition-all"
              >
                {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Import {selectedCount} câu vào kho
              </button>
            </div>

            {/* Question list */}
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "bg-white rounded-2xl border p-4 shadow-sm transition-all",
                    q.selected ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-100 opacity-60"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox + number */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        checked={q.selected}
                        onChange={() => toggleSelect(idx)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600"
                      />
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">
                        {q.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {q.editing ? (
                        /* Edit mode */
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Nội dung câu hỏi</label>
                            <textarea
                              value={q.content}
                              onChange={e => updateQuestion(idx, { content: e.target.value })}
                              rows={4}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Đáp án</label>
                              <textarea
                                value={q.answer}
                                onChange={e => updateQuestion(idx, { answer: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Lời giải</label>
                              <textarea
                                value={q.solution}
                                onChange={e => updateQuestion(idx, { solution: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <select
                              value={q.topic}
                              onChange={e => updateQuestion(idx, { topic: e.target.value })}
                              className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs max-w-[150px] truncate"
                            >
                              <option value="">Chọn danh mục</option>
                              {categories.filter(c => c.grade === globalGrade && c.parent_id !== null).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <select
                              value={q.difficulty}
                              onChange={e => updateQuestion(idx, { difficulty: e.target.value })}
                              className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs"
                            >
                              {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                            <select
                              value={q.question_type}
                              onChange={e => updateQuestion(idx, { question_type: e.target.value })}
                              className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs"
                            >
                              {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateQuestion(idx, { editing: false })}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
                            >
                              <Check className="w-3.5 h-3.5" /> Xong
                            </button>
                            <button
                              onClick={() => setPreviewIdx(previewIdx === idx ? null : idx)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                            >
                              <Eye className="w-3.5 h-3.5" /> Xem trước
                            </button>
                          </div>
                          {/* Preview */}
                          {previewIdx === idx && (
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                              <p className="text-xs font-medium text-slate-500 mb-2">Preview LaTeX:</p>
                              <div className="text-sm text-slate-800">
                                <MathRenderer content={q.content} />
                              </div>
                              {q.answer && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-lg text-sm">
                                  <strong className="text-blue-600">Đáp án:</strong>{' '}
                                  <MathRenderer content={q.answer} className="inline" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* View mode */
                        <>
                          <div className="text-sm text-slate-800 line-clamp-3">
                            <MathRenderer content={q.content} />
                          </div>
                          {q.answer && (
                            <div className="mt-1.5 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                              Đáp án: <MathRenderer content={q.answer.substring(0, 80)} className="inline" />
                              {q.answer.length > 80 && '...'}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-full">
                              {getQuestionTypeLabel(q.question_type as any)}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                              {getTopicLabel(q.topic as any)}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                              {getDifficultyLabel(q.difficulty as any)}
                            </span>
                            {q.points !== 1 && (
                              <span className="text-xs text-slate-400">{q.points}đ</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuestion(idx, { editing: !q.editing })}
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          q.editing ? "bg-green-50 text-green-600" : "hover:bg-slate-100 text-slate-400 hover:text-blue-600"
                        )}
                        title="Sửa"
                      >
                        {q.editing ? <Check className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => removeQuestion(idx)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                        title="Xóa câu này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom import bar */}
            {questions.length > 0 && (
              <div className="sticky bottom-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-700">
                      <strong>{selectedCount}</strong> câu hỏi sẵn sàng import vào <strong>Toán {globalGrade}</strong>
                    </span>
                  </div>
                  <button
                    onClick={handleImport}
                    disabled={isImporting || selectedCount === 0}
                    className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white rounded-xl bg-green-600 hover:bg-green-700 shadow-md disabled:opacity-50 transition-all"
                  >
                    {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Import {selectedCount} câu hỏi
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
