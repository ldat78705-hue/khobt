"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  FileDown, Search, Filter, Printer, Clipboard, BookOpen,
  CheckSquare, X, Download, Loader2, ChevronDown
} from "lucide-react";
import { cn, getDifficultyColor, getDifficultyLabel, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES, QUESTION_TYPES } from "@/types";
import type { Question, Grade, Topic, Difficulty, QuestionType } from "@/types";
import { toast } from "sonner";
import { QuestionContent, MathRenderer } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle,
} from "docx";
import { downloadDocx, parseContentToDocxParagraphs } from "@/lib/export/word";


export default function QuickExportPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<Grade | "">("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | "">("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "">("");
  const [selectedType, setSelectedType] = useState<QuestionType | "">("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    showAnswer: true,
    showSolution: false,
    showIndex: true,
    title: "",
  });
  const [showExportPanel, setShowExportPanel] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setQuestions(demoDb.getQuestions({
          grade: selectedGrade || undefined,
          topic: selectedTopic || undefined,
          difficulty: selectedDifficulty || undefined,
          question_type: selectedType || undefined,
          search: searchQuery || undefined,
        }));
      } else {
        const supabase = createClient();
        let query = supabase.from("questions").select("*").eq("status", "approved").order("created_at", { ascending: false });
        if (selectedGrade) query = query.eq("grade", selectedGrade);
        if (selectedTopic) query = query.eq("topic", selectedTopic);
        if (selectedDifficulty) query = query.eq("difficulty", selectedDifficulty);
        if (selectedType) query = query.eq("question_type", selectedType);
        if (searchQuery) query = query.ilike("content", `%${searchQuery}%`);
        const { data } = await query.limit(100);
        setQuestions(data || []);
      }
    } catch {
      toast.error("Không thể tải bài tập");
    } finally {
      setIsLoading(false);
    }
  }, [selectedGrade, selectedTopic, selectedDifficulty, selectedType, searchQuery]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map(q => q.id));
    }
  };

  const selectedQuestions = questions.filter(q => selectedIds.includes(q.id));

  // Export to Word — uses parseContentToDocxParagraphs for LaTeX & table support
  const handleExportWord = async () => {
    if (!selectedQuestions.length) { toast.error("Chọn ít nhất 1 bài tập"); return; }
    setIsExporting(true);
    try {
      const children: (Paragraph | any)[] = [];

      // Title
      if (exportOptions.title) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({ text: exportOptions.title, bold: true, size: 28, font: "Times New Roman" })],
          }),
          new Paragraph({ spacing: { after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" } }, children: [] })
        );
      }

      for (const [index, q] of selectedQuestions.entries()) {
        const prefix = exportOptions.showIndex ? `Bài ${index + 1}. ` : "";

        // Question content — full LaTeX + table support
        const contentParas = parseContentToDocxParagraphs(prefix + q.content);
        if (contentParas.length > 0) {
          children.push(...contentParas);
        } else {
          children.push(new Paragraph({
            spacing: { before: 200, after: 80 },
            children: [new TextRun({ text: prefix + q.content, size: 26, font: "Times New Roman" })],
          }));
        }

        // MCQ options — with LaTeX
        if (q.question_type === "trac_nghiem" && q.options) {
          for (const opt of q.options) {
            const optText = `${opt.key}. ${opt.value}`;
            const optParas = parseContentToDocxParagraphs(optText);
            if (optParas.length > 0) {
              children.push(...optParas);
            } else {
              children.push(new Paragraph({
                indent: { left: 720 },
                spacing: { before: 40 },
                children: [new TextRun({ text: optText, size: 26, font: "Times New Roman" })],
              }));
            }
          }
        }

        // Answer — with LaTeX
        if (exportOptions.showAnswer && q.answer) {
          const ansParas = parseContentToDocxParagraphs("Đáp án: " + q.answer);
          if (ansParas.length > 0) {
            children.push(...ansParas);
          } else {
            children.push(new Paragraph({
              spacing: { before: 60 }, indent: { left: 360 },
              children: [
                new TextRun({ text: "Đáp án: ", bold: true, size: 22, font: "Times New Roman", color: "0000FF" }),
                new TextRun({ text: q.answer, size: 22, font: "Times New Roman" }),
              ],
            }));
          }
        }

        // Solution — with LaTeX
        if (exportOptions.showSolution && q.solution) {
          const solParas = parseContentToDocxParagraphs("Lời giải: " + q.solution);
          if (solParas.length > 0) {
            children.push(...solParas);
          } else {
            children.push(new Paragraph({
              spacing: { before: 60 }, indent: { left: 360 },
              children: [
                new TextRun({ text: "Lời giải: ", bold: true, size: 22, font: "Times New Roman", italics: true, color: "008000" }),
                new TextRun({ text: q.solution, size: 22, font: "Times New Roman" }),
              ],
            }));
          }
        }
      }

      const doc = new Document({
        sections: [{
          properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
          children,
        }],
      });

      const blob = await Packer.toBlob(doc);
      const rawName = exportOptions.title || `Bai_tap_${selectedQuestions.length}_cau`;
      const safeName = rawName.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, ' ').trim() || 'Bai_tap';
      await downloadDocx(blob, safeName);
      toast.success(`Đã xuất ${selectedQuestions.length} bài tập!`);
    } catch {
      toast.error("Lỗi khi xuất file");
    } finally {
      setIsExporting(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!selectedQuestions.length) { toast.error("Chọn ít nhất 1 bài tập"); return; }
    let html = `<div style="font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.6;">`;
    if (exportOptions.title) {
      html += `<p style="text-align:center; font-weight:bold; font-size:16pt;">${exportOptions.title}</p><hr/>`;
    }
    selectedQuestions.forEach((q, i) => {
      const prefix = exportOptions.showIndex ? `<strong>Bài ${i + 1}.</strong> ` : "";
      html += `<p>${prefix}${q.content}</p>`;
      if (q.question_type === "trac_nghiem" && q.options) {
        q.options.forEach(opt => {
          html += `<p style="margin-left:40px;"><strong>${opt.key}.</strong> ${opt.value}</p>`;
        });
      }
      if (exportOptions.showAnswer && q.answer) {
        html += `<p style="margin-left:20px; color:blue;"><strong>Đáp án:</strong> ${q.answer}</p>`;
      }
      if (exportOptions.showSolution && q.solution) {
        html += `<p style="margin-left:20px; color:green;"><strong>Lời giải:</strong> ${q.solution}</p>`;
      }
    });
    html += `</div>`;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html.replace(/<[^>]*>/g, "")], { type: "text/plain" }),
        }),
      ]);
      toast.success("Đã copy! Dán vào Word bằng Ctrl+V");
    } catch {
      toast.error("Không thể copy");
    }
  };

  // Print
  const handlePrint = () => {
    if (!selectedQuestions.length) { toast.error("Chọn ít nhất 1 bài tập"); return; }
    setShowExportPanel(true);
    setTimeout(() => {
      const origTitle = document.title;
      document.title = ' ';
      window.print();
      setTimeout(() => { document.title = origTitle; }, 1000);
    }, 500);
  };

  return (
    <>
      <Header
        title="Xuất bài tập nhanh"
        subtitle={`Chọn bài tập → Xuất Word / PDF / Copy`}
      />
      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Tìm kiếm bài tập..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value as Grade | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
              <option value="">Tất cả lớp</option>
              {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
            <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value as Topic | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
              <option value="">Tất cả chuyên đề</option>
              {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value as Difficulty | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
              <option value="">Tất cả mức độ</option>
              {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
        </div>

        {/* Selection bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
          <button onClick={toggleAll} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
            <CheckSquare className="w-4 h-4" />
            {selectedIds.length === questions.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
          </button>
          <div className="text-sm text-slate-500">
            Đã chọn <strong className="text-blue-600">{selectedIds.length}</strong> / {questions.length} bài tập
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              {/* Export options */}
              <div className="flex items-center gap-3 mr-4">
                <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={exportOptions.showAnswer} onChange={e => setExportOptions(p => ({ ...p, showAnswer: e.target.checked }))} className="w-3.5 h-3.5 rounded" />
                  Đáp án
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={exportOptions.showSolution} onChange={e => setExportOptions(p => ({ ...p, showSolution: e.target.checked }))} className="w-3.5 h-3.5 rounded" />
                  Lời giải
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={exportOptions.showIndex} onChange={e => setExportOptions(p => ({ ...p, showIndex: e.target.checked }))} className="w-3.5 h-3.5 rounded" />
                  Đánh số
                </label>
              </div>
              <input
                type="text"
                value={exportOptions.title}
                onChange={e => setExportOptions(p => ({ ...p, title: e.target.value }))}
                placeholder="Tiêu đề (tùy chọn)"
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm w-48 focus:outline-none focus:border-blue-500"
              />
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                <Clipboard className="w-4 h-4" /> Copy
              </button>
              <button onClick={handleExportWord} disabled={isExporting} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />} Word
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                <Printer className="w-4 h-4" /> In / PDF
              </button>
            </div>
          )}
        </div>

        {/* Question list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          {isLoading ? (
            <div className="p-6 space-y-4">{[1,2,3,4,5].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
          ) : questions.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Không tìm thấy bài tập</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {questions.map((q, idx) => {
                const isSelected = selectedIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    onClick={() => toggleSelect(q.id)}
                    className={cn(
                      "p-4 flex items-start gap-3 cursor-pointer transition-all hover:bg-slate-50/50",
                      isSelected && "bg-blue-50/50"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(q.id)}
                      className="w-4 h-4 mt-1 rounded border-slate-300 text-blue-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 line-clamp-2">
                        <QuestionContent content={q.content} images={q.images} />
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {q.grade}</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{getTopicLabel(q.topic)}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Export preview modal (screen only — hidden when printing) */}
        {showExportPanel && selectedQuestions.length > 0 && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 overflow-y-auto no-print">
            <div className="min-h-screen py-8 px-4 flex justify-center">
              <div className="w-full max-w-[210mm] relative">
                <div className="sticky top-0 z-10 flex items-center justify-between mb-4 bg-slate-900/90 backdrop-blur rounded-xl px-4 py-3">
                  <h3 className="text-white font-semibold">Xem trước ({selectedQuestions.length} bài)</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { const t = document.title; document.title = ' '; window.print(); setTimeout(() => { document.title = t; }, 1000); }} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      <Printer className="w-4 h-4" /> In / PDF
                    </button>
                    <button onClick={() => setShowExportPanel(false)} className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="bg-white shadow-2xl rounded-lg print-preview" style={{ padding: '20mm', minHeight: '297mm', fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.8', color: '#000' }}>
                  {exportOptions.title && (
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <p style={{ fontSize: '17px', fontWeight: 'bold', margin: 0 }}>{exportOptions.title}</p>
                      <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px auto', width: '30%' }} />
                    </div>
                  )}
                  <div>
                    {selectedQuestions.map((q, index) => (
                      <div key={q.id} style={{ marginBottom: '14px', pageBreakInside: 'avoid' }}>
                        <div>
                          {exportOptions.showIndex && <strong>Bài {index + 1}. </strong>}
                        </div>
                        <div style={{ marginLeft: '4px' }}>
                          <QuestionContent content={q.content} images={q.images} />
                        </div>
                        {q.question_type === 'trac_nghiem' && q.options && (
                          <div style={{ marginLeft: '16px', marginTop: '4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 24px' }}>
                            {q.options.map(opt => (
                              <div key={opt.key} style={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                                <strong>{opt.key}.</strong> <MathRenderer content={opt.value} />
                              </div>
                            ))}
                          </div>
                        )}
                        {exportOptions.showAnswer && q.answer && (
                          <div style={{ marginLeft: '16px', marginTop: '4px', padding: '4px 10px', background: '#f0f7ff', borderRadius: '4px', fontSize: '13px' }}>
                            <strong>Đáp án:</strong> <MathRenderer content={q.answer} className="inline" />
                          </div>
                        )}
                        {exportOptions.showSolution && q.solution && (
                          <div style={{ marginLeft: '16px', marginTop: '4px', padding: '4px 10px', background: '#f0fdf4', borderRadius: '4px', fontSize: '13px' }}>
                            <strong>Lời giải:</strong> <MathRenderer content={q.solution} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>— Hết —</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
}
