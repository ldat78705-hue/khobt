"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  FileText, Search, CheckSquare, Eye, Printer, Clipboard,
  FileDown, Loader2, Settings2, X, ChevronDown
} from "lucide-react";
import { cn, getDifficultyLabel, getDifficultyColor, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES } from "@/types";
import type { Grade, Topic, Difficulty, Question } from "@/types";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { toast } from "sonner";
import { QuestionContent, MathRenderer } from "@/components/shared/MathRenderer";

import { exportToWord } from "@/lib/export/word";

interface WorksheetConfig {
  title: string;
  teacherName: string;
  centerName: string;
  studentNote: string;
  showAnswers: boolean;
  showStudentInfo: boolean;
  fontSize: number;
}

const DEFAULT_CONFIG: WorksheetConfig = {
  title: "",
  teacherName: "",
  centerName: "",
  studentNote: "",
  showAnswers: false,
  showStudentInfo: true,
  fontSize: 13,
};

export default function WorksheetPage() {
  const [step, setStep] = useState<'select' | 'preview'>('select');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterGrade, setFilterGrade] = useState<Grade | "">("");
  const [filterTopic, setFilterTopic] = useState<Topic | "">("");
  const [filterCategoryId, setFilterCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [config, setConfig] = useState<WorksheetConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data)).catch(() => {});
  }, []);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setQuestions(demoDb.getQuestions({
          grade: filterGrade || undefined,
          topic: filterTopic || undefined,
          difficulty: filterDifficulty || undefined,
          search: searchQuery || undefined,
        }).filter(q => q.status === 'approved'));
      } else {
        const params = new URLSearchParams();
        if (filterGrade) params.append("grade", filterGrade.toString());
        if (filterTopic) params.append("topic", filterTopic);
        if (filterCategoryId) params.append("category_id", filterCategoryId);
        if (filterDifficulty) params.append("difficulty", filterDifficulty);
        if (searchQuery) params.append("search", searchQuery);
        params.append("status", "approved");
        params.append("limit", "200");

        const res = await fetch(`/api/questions?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setQuestions(Array.isArray(data) ? data : (data.data || []));
        } else {
          throw new Error('API error');
        }
      }
    } catch {
      toast.error("Không thể tải bài tập");
    } finally {
      setIsLoading(false);
    }
  }, [filterGrade, filterTopic, filterCategoryId, filterDifficulty, searchQuery]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  // Load saved config from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kdt_worksheet_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig(prev => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore */ }
  }, []);

  const saveConfig = (updates: Partial<WorksheetConfig>) => {
    const next = { ...config, ...updates };
    setConfig(next);
    localStorage.setItem('kdt_worksheet_config', JSON.stringify({
      teacherName: next.teacherName,
      centerName: next.centerName,
      fontSize: next.fontSize,
      showStudentInfo: next.showStudentInfo,
    }));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelectedIds(selectedIds.length === questions.length ? [] : questions.map(q => q.id));
  };

  const selectedQuestions = questions.filter(q => selectedIds.includes(q.id));

  const autoTitle = config.title || `PHIẾU BÀI TẬP${filterGrade ? ` TOÁN ${filterGrade}` : ''}`;

  const handlePrint = () => {
    const origTitle = document.title;
    document.title = ' ';
    window.print();
    setTimeout(() => { document.title = origTitle; }, 1000);
  };

  const handleExportWord = async () => {
    if (selectedQuestions.length === 0) return;
    setIsExporting(true);
    try {
      const fakeExam = {
        id: 'worksheet', title: autoTitle, description: config.studentNote,
        grade: (filterGrade || 9) as number, duration: undefined,
        user_id: DEMO_USER.id,
        settings: {
          schoolName: config.centerName,
          teacherName: config.teacherName,
        },
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      };
      const fakeEqs = selectedQuestions.map((q, i) => ({
        id: `weq${i}`, exam_id: 'worksheet', question_id: q.id,
        sort_order: i, points: 0, created_at: new Date().toISOString(),
        question: q,
      }));
      await exportToWord(fakeExam as any, fakeEqs, { showAnswer: config.showAnswers, isWorksheet: true });
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

  // ============ RENDER ============
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
            {/* Config bar */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  <h2 className="text-lg font-bold">Tạo phiếu bài tập</h2>
                </div>
                <button onClick={() => setShowConfig(!showConfig)} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors">
                  <Settings2 className="w-4 h-4" /> Cấu hình
                </button>
              </div>
              <p className="text-indigo-100 text-sm">Chọn bài tập → Xem trước → Xuất Word / In PDF.</p>

              {showConfig && (
                <div className="mt-4 bg-white/10 rounded-xl p-4 space-y-3 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Tên giáo viên</label>
                      <input type="text" value={config.teacherName} onChange={e => saveConfig({ teacherName: e.target.value })} placeholder="VD: Nguyễn Văn A" className="w-full px-3 py-2 bg-white/20 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Tên trung tâm / trường</label>
                      <input type="text" value={config.centerName} onChange={e => saveConfig({ centerName: e.target.value })} placeholder="VD: Trung tâm Toán Thầy A" className="w-full px-3 py-2 bg-white/20 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Cỡ chữ (pt)</label>
                      <select value={config.fontSize} onChange={e => saveConfig({ fontSize: Number(e.target.value) })} className="w-full px-3 py-2 bg-white/20 rounded-lg text-sm text-white focus:outline-none">
                        <option value={11} className="text-slate-800">11pt</option>
                        <option value={12} className="text-slate-800">12pt</option>
                        <option value={13} className="text-slate-800">13pt (mặc định)</option>
                        <option value={14} className="text-slate-800">14pt</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 text-sm text-white/90 cursor-pointer">
                        <input type="checkbox" checked={config.showStudentInfo} onChange={e => saveConfig({ showStudentInfo: e.target.checked })} className="w-4 h-4 rounded" />
                        Hiện ô Họ tên / Lớp
                      </label>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 text-sm text-white/90 cursor-pointer">
                        <input type="checkbox" checked={config.showAnswers} onChange={e => saveConfig({ showAnswers: e.target.checked })} className="w-4 h-4 rounded" />
                        Kèm đáp án
                      </label>
                    </div>
                  </div>
                </div>
              )}
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
                <select value={filterCategoryId} onChange={e => setFilterCategoryId(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 max-w-[200px] truncate">
                  <option value="">Tất cả danh mục</option>
                  {(() => {
                    const raw = categories.filter(c => filterGrade ? c.grade === Number(filterGrade) : true);
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
                  {selectedIds.length === questions.length ? 'Bỏ chọn' : 'Chọn tất cả'}
                </button>
                <span className="text-sm text-slate-500">Đã chọn <strong className="text-blue-600">{selectedIds.length}</strong> / {questions.length}</span>
              </div>
              <button
                onClick={() => { if (selectedIds.length === 0) { toast.error("Chọn ít nhất 1 bài"); return; } setStep('preview'); }}
                disabled={selectedIds.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-sm"
              >
                <Eye className="w-4 h-4" /> Xem trước & Xuất
              </button>
            </div>

            {/* Question list */}
            <div className="space-y-2">
              {questions.map(q => (
                <label key={q.id} className={cn("flex items-start gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all hover:shadow-sm", selectedIds.includes(q.id) ? "border-indigo-300 bg-indigo-50/30 ring-1 ring-indigo-200" : "border-slate-100")}>
                  <input type="checkbox" checked={selectedIds.includes(q.id)} onChange={() => toggleSelect(q.id)} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <QuestionContent content={q.content} images={q.images} className="text-sm text-slate-800 line-clamp-2" />
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {q.grade}</span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full truncate max-w-[200px]" title={(q as any).category_name || getTopicLabel(q.topic)}>{(q as any).category_name || getTopicLabel(q.topic)}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm no-print">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">{selectedQuestions.length} bài tập</span>
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={config.showAnswers} onChange={e => setConfig(p => ({ ...p, showAnswers: e.target.checked }))} className="w-4 h-4 rounded" />
                    Kèm đáp án
                  </label>
                </div>
                <div className="flex items-center gap-2">
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
            </div>

            {/* A4 Preview — this is the print target */}
            <div className="flex justify-center">
              <div
                ref={printRef}
                id="worksheet-print"
                contentEditable
                suppressContentEditableWarning
                className="worksheet-paper print-page bg-white shadow-lg"
                style={{
                  width: '210mm',
                  padding: '15mm 20mm',
                  fontFamily: '"Times New Roman", serif',
                  fontSize: `${config.fontSize}pt`,
                  lineHeight: '1.5',
                  color: '#000',
                  boxSizing: 'border-box',
                }}
              >
                {/* Header: Center name + Teacher */}
                {(config.centerName || config.teacherName) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: `${config.fontSize - 1}pt` }}>
                    {config.centerName ? (
                      <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={e => setConfig(p => ({ ...p, centerName: e.currentTarget?.textContent || '' }))}
                          style={{ outline: 'none', borderBottom: '1px dashed transparent' }}
                          className="hover:border-blue-300 focus:border-blue-400"
                        >
                          {config.centerName}
                        </span>
                      </div>
                    ) : <div />}
                    {config.teacherName && (
                      <div style={{ fontStyle: 'italic' }}>
                        GV:{' '}
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={e => setConfig(p => ({ ...p, teacherName: e.currentTarget?.textContent || '' }))}
                          style={{ outline: 'none', fontWeight: '600', fontStyle: 'normal' }}
                        >
                          {config.teacherName}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => setConfig(p => ({ ...p, title: e.currentTarget?.textContent || '' }))}
                    style={{
                      fontSize: `${config.fontSize + 3}pt`,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      outline: 'none',
                      margin: 0,
                      padding: '2px 4px',
                    }}
                    className="hover:bg-blue-50/50 focus:bg-blue-50/80 rounded"
                  >
                    {autoTitle}
                  </p>
                  {config.studentNote && (
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={e => setConfig(p => ({ ...p, studentNote: e.currentTarget?.textContent || '' }))}
                      style={{ fontSize: `${config.fontSize - 1}pt`, fontStyle: 'italic', color: '#333', marginTop: '2px', outline: 'none' }}
                    >
                      {config.studentNote}
                    </p>
                  )}
                  <hr style={{ border: 'none', borderTop: '1.5px solid #000', margin: '6px auto 0', width: '25%' }} />
                </div>

                {/* Student info */}
                {config.showStudentInfo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: `${config.fontSize - 1}pt`, margin: '8px 0 10px', paddingBottom: '4px', borderBottom: '1px dotted #999' }}>
                    <span>Họ và tên: .............................................</span>
                    <span>Lớp: ............</span>
                  </div>
                )}

                {/* Questions — compact layout */}
                <div>
                  {selectedQuestions.map((q, index) => (
                    <div key={q.id} style={{ marginBottom: '6px', pageBreakInside: 'avoid' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                        <strong style={{ whiteSpace: 'nowrap' }}>Bài {index + 1}.</strong>
                        <div style={{ flex: 1 }}>
                          <QuestionContent content={q.content} images={q.images} />
                        </div>
                      </div>
                      {q.question_type === 'trac_nghiem' && q.options && (
                        <div style={{ marginLeft: '20px', marginTop: '2px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                            {q.options.map(opt => (
                              <div key={opt.key} style={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                                <strong>{opt.key}.</strong> <MathRenderer content={opt.value} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {q.question_type === 'dung_sai' && q.options && (
                        <div style={{ marginLeft: '20px', marginTop: '2px' }}>
                          {q.options.map(opt => (
                            <div key={opt.key} style={{ display: 'flex', gap: '6px', alignItems: 'baseline', marginBottom: '1px' }}>
                              <strong>{opt.key})</strong> <MathRenderer content={opt.value} />
                              <span style={{ marginLeft: 'auto', fontSize: '11pt' }}>☐ Đ  ☐ S</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {q.question_type === 'dien_dap_an' && (
                        <div style={{ marginLeft: '20px', marginTop: '2px', fontSize: `${config.fontSize - 1}pt`, color: '#555' }}>
                          Đáp án: ............................
                        </div>
                      )}
                      {config.showAnswers && q.answer && (
                        <div style={{ marginLeft: '20px', marginTop: '2px', padding: '2px 8px', background: '#f0f7ff', borderLeft: '2px solid #3b82f6', fontSize: `${config.fontSize - 1}pt` }}>
                          <strong>ĐA:</strong> <MathRenderer content={q.answer} className="inline" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px', paddingTop: '6px', borderTop: '1px solid #ccc' }}>
                  <p style={{ fontSize: `${config.fontSize}pt`, fontWeight: 'bold', margin: 0 }}>— Hết —</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
