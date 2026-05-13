"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  FileText, Search, Filter, Printer, Download, CheckSquare,
  X, BookOpen, Loader2, ChevronDown, Eye, Clipboard, FileDown
} from "lucide-react";
import { cn, getDifficultyLabel, getDifficultyColor, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES } from "@/types";
import type { Grade, Topic, Difficulty, Question } from "@/types";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { toast } from "sonner";
import { QuestionContent, MathRenderer } from "@/components/shared/MathRenderer";
import { exportToWord } from "@/lib/export/word";

type WorksheetType = 'bai_tap' | 'on_tap' | 'luyen_tap';

const WORKSHEET_TYPES: { value: WorksheetType; label: string; desc: string }[] = [
  { value: 'bai_tap', label: 'Phiếu bài tập', desc: 'Bài tập về nhà / trên lớp' },
  { value: 'on_tap', label: 'Phiếu ôn tập', desc: 'Ôn tập theo chuyên đề' },
  { value: 'luyen_tap', label: 'Phiếu luyện tập', desc: 'Luyện tập bổ sung' },
];

export default function WorksheetPage() {
  const [step, setStep] = useState<'select' | 'preview'>('select');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterGrade, setFilterGrade] = useState<Grade | "">("");
  const [filterTopic, setFilterTopic] = useState<Topic | "">("");
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [worksheetType, setWorksheetType] = useState<WorksheetType>('bai_tap');
  const [worksheetTitle, setWorksheetTitle] = useState("");
  const [worksheetNote, setWorksheetNote] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const fetchQuestions = useCallback(() => {
    if (isDemoMode) {
      setQuestions(demoDb.getQuestions({
        grade: filterGrade || undefined,
        topic: filterTopic || undefined,
        difficulty: filterDifficulty || undefined,
        search: searchQuery || undefined,
      }).filter(q => q.status === 'approved'));
    }
  }, [filterGrade, filterTopic, filterDifficulty, searchQuery]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map(q => q.id));
    }
  };

  const selectedQuestions = questions.filter(q => selectedIds.includes(q.id));

  const typeConfig = WORKSHEET_TYPES.find(t => t.value === worksheetType)!;
  const autoTitle = worksheetTitle || `${typeConfig.label}${filterGrade ? ` - Toán ${filterGrade}` : ''}${filterTopic ? ` - ${getTopicLabel(filterTopic)}` : ''}`;

  const handleProceed = () => {
    if (selectedIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 bài tập");
      return;
    }
    setStep('preview');
  };

  const handlePrint = () => {
    setShowPrintPreview(true);
    setTimeout(() => window.print(), 500);
  };

  const handleExportWord = async () => {
    if (selectedQuestions.length === 0) return;
    setIsExporting(true);
    try {
      // Create a temporary exam-like object for export
      const fakeExam = {
        id: 'worksheet', title: autoTitle, description: worksheetNote,
        grade: (filterGrade || 9) as number, duration: undefined,
        user_id: DEMO_USER.id, settings: {},
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      };
      const fakeEqs = selectedQuestions.map((q, i) => ({
        id: `weq${i}`, exam_id: 'worksheet', question_id: q.id,
        sort_order: i, points: 0, created_at: new Date().toISOString(),
        question: q,
      }));
      await exportToWord(fakeExam as any, fakeEqs, { showAnswer: showAnswers });
      toast.success("Đã xuất file Word!");
    } catch {
      toast.error("Không thể xuất Word");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    const text = selectedQuestions.map((q, i) => `Bài ${i + 1}. ${q.content}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    toast.success("Đã copy nội dung!");
  };

  return (
    <>
      <Header
        title="Phiếu bài tập"
        actions={step === 'preview' ? (
          <button onClick={() => setStep('select')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
            ← Quay lại chọn bài
          </button>
        ) : undefined}
      />
      <div className="p-6 max-w-6xl space-y-4">
        {step === 'select' ? (
          <>
            {/* Worksheet type selector */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6" />
                <h2 className="text-lg font-bold">Tạo phiếu bài tập</h2>
              </div>
              <p className="text-indigo-100 text-sm mb-4">Chọn loại phiếu, chọn bài tập từ kho và xuất ra Word / PDF.</p>
              <div className="grid grid-cols-3 gap-3">
                {WORKSHEET_TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setWorksheetType(t.value)}
                    className={cn(
                      "p-3 rounded-xl text-left transition-all",
                      worksheetType === t.value
                        ? "bg-white/20 ring-2 ring-white/40"
                        : "bg-white/10 hover:bg-white/15"
                    )}
                  >
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className="text-xs text-white/70 mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Worksheet config */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề phiếu (tùy chọn)</label>
                  <input
                    type="text"
                    value={worksheetTitle}
                    onChange={e => setWorksheetTitle(e.target.value)}
                    placeholder={`VD: ${typeConfig.label} Chương 1 - Toán 9`}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ghi chú cho học sinh (tùy chọn)</label>
                  <input
                    type="text"
                    value={worksheetNote}
                    onChange={e => setWorksheetNote(e.target.value)}
                    placeholder="VD: Nộp vào thứ 2 tuần sau"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Tìm kiếm bài tập..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <select value={filterGrade} onChange={e => setFilterGrade(e.target.value as Grade | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Tất cả lớp</option>
                  {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
                <select value={filterTopic} onChange={e => setFilterTopic(e.target.value as Topic | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Tất cả chuyên đề</option>
                  {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value as Difficulty | "")} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Tất cả mức độ</option>
                  {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
            </div>

            {/* Select bar */}
            <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <button onClick={selectAll} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                  <CheckSquare className="w-4 h-4" />
                  {selectedIds.length === questions.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
                <span className="text-sm text-slate-500">Đã chọn <strong className="text-blue-600">{selectedIds.length}</strong> / {questions.length} bài tập</span>
              </div>
              <button
                onClick={handleProceed}
                disabled={selectedIds.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-sm"
              >
                <Eye className="w-4 h-4" /> Xem trước & Xuất
              </button>
            </div>

            {/* Question list */}
            <div className="space-y-2">
              {questions.map(q => (
                <label
                  key={q.id}
                  className={cn(
                    "flex items-start gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all hover:shadow-sm",
                    selectedIds.includes(q.id) ? "border-indigo-300 bg-indigo-50/30 ring-1 ring-indigo-200" : "border-slate-100"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(q.id)}
                    onChange={() => toggleSelect(q.id)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <QuestionContent content={q.content} images={q.images} className="text-sm text-slate-800 line-clamp-2" />
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {q.grade}</span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{getTopicLabel(q.topic)}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Preview + Export */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{autoTitle}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{selectedQuestions.length} bài tập{worksheetNote && ` • ${worksheetNote}`}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={showAnswers} onChange={e => setShowAnswers(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                    Kèm đáp án
                  </label>
                  <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">
                    <Clipboard className="w-4 h-4" /> Copy
                  </button>
                  <button onClick={handleExportWord} disabled={isExporting} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50">
                    {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />} Xuất Word
                  </button>
                  <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700">
                    <Printer className="w-4 h-4" /> In / PDF
                  </button>
                </div>
              </div>

              {/* Worksheet preview */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-8 bg-white" style={{ fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.8' }}>
                  {/* Worksheet header - simpler than exam */}
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {autoTitle}
                    </p>
                    {worksheetNote && (
                      <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#555', marginTop: '4px' }}>
                        {worksheetNote}
                      </p>
                    )}
                    <hr style={{ border: 'none', borderTop: '1.5px solid #000', margin: '10px auto', width: '30%' }} />
                  </div>

                  {/* Student info - simple */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '16px', paddingBottom: '6px', borderBottom: '1px dotted #999' }}>
                    <span>Họ và tên: .............................................</span>
                    <span>Lớp: ............</span>
                  </div>

                  {/* Questions */}
                  <div>
                    {selectedQuestions.map((q, index) => (
                      <div key={q.id} style={{ marginBottom: '14px', pageBreakInside: 'avoid' }}>
                        <div>
                          <strong>Bài {index + 1}.</strong>
                        </div>
                        <div style={{ marginLeft: '4px', marginTop: '2px' }}>
                          <QuestionContent content={q.content} images={q.images} />
                        </div>
                        {q.question_type === 'trac_nghiem' && q.options && (
                          <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 24px' }}>
                              {q.options.map(opt => (
                                <div key={opt.key} style={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                                  <strong>{opt.key}.</strong> <MathRenderer content={opt.value} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {q.question_type === 'dung_sai' && q.options && (
                          <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                            {q.options.map(opt => (
                              <div key={opt.key} style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '2px' }}>
                                <strong>{opt.key})</strong> <MathRenderer content={opt.value} />
                                <span style={{ marginLeft: 'auto', fontSize: '12px' }}>☐ Đ  ☐ S</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {q.question_type === 'dien_dap_an' && (
                          <div style={{ marginLeft: '16px', marginTop: '4px', fontSize: '13px', color: '#555' }}>
                            Đáp án: ............................
                          </div>
                        )}
                        {showAnswers && q.answer && (
                          <div style={{ marginLeft: '16px', marginTop: '4px', padding: '4px 10px', background: '#f0f7ff', borderRadius: '4px', fontSize: '13px' }}>
                            <strong>Đáp án:</strong> <MathRenderer content={q.answer} className="inline" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #ccc' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>— Hết —</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
