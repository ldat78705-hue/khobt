"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  Plus, Search, Filter, Grid3X3, List, MoreHorizontal,
  Trash2, Copy, Edit, Eye, ChevronDown, X, BookOpen, Upload, Heart, FileDown, Loader2
} from "lucide-react";
import Link from "next/link";
import { cn, getDifficultyColor, getDifficultyLabel, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { GRADES, TOPICS, DIFFICULTIES, QUESTION_TYPES, QUESTION_STATUSES } from "@/types";
import type { Question, Grade, Topic, Difficulty, QuestionType, QuestionStatus } from "@/types";

import { toast } from "sonner";
import { QuestionContent } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { ImportDialog } from "@/components/shared/ImportDialog";
import { DEMO_USER } from "@/lib/demo-data";
import { parseContentToDocxParagraphs, downloadDocx } from "@/lib/export/word";
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from "docx";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<Grade | "">("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | "">("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "">("");
  const [selectedType, setSelectedType] = useState<QuestionType | "">("");
  const [selectedStatus, setSelectedStatus] = useState<QuestionStatus | "">("");
  const [filterHasSolution, setFilterHasSolution] = useState(false);
  const [filterHasImages, setFilterHasImages] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        let data = demoDb.getQuestions({
          grade: selectedGrade || undefined,
          topic: selectedTopic || undefined,
          difficulty: selectedDifficulty || undefined,
          question_type: selectedType || undefined,
          search: searchQuery || undefined,
          status: selectedStatus || undefined,
        });
        if (filterHasSolution) data = data.filter(q => q.solution);
        if (filterHasImages) data = data.filter(q => q.images && q.images.length > 0);
        setQuestions(data);
      } else {
        // Try Neon API first
        const params = new URLSearchParams();
        if (selectedGrade) params.append("grade", selectedGrade.toString());
        if (selectedTopic) params.append("topic", selectedTopic);
        if (selectedDifficulty) params.append("difficulty", selectedDifficulty);
        if (selectedType) params.append("question_type", selectedType);
        if (searchQuery) params.append("search", searchQuery);
        
        const res = await fetch(`/api/questions?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setQuestions(data || []);
        } else {
          throw new Error('API error');
        }
      }
    } catch {
      toast.error("Không thể tải bài tập");
    } finally {
      setIsLoading(false);
    }
  }, [selectedGrade, selectedTopic, selectedDifficulty, selectedType, selectedStatus, searchQuery, filterHasSolution, filterHasImages]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Load favorites
  useEffect(() => {
    if (isDemoMode) {
      const favs = demoDb.getFavoriteQuestions(DEMO_USER.id);
      setFavoriteIds(favs.map(q => q.id));
    }
  }, []);

  const handleToggleFavorite = (questionId: string) => {
    if (isDemoMode) {
      const result = demoDb.toggleFavorite(DEMO_USER.id, questionId);
      setFavoriteIds(prev => result ? [...prev, questionId] : prev.filter(id => id !== questionId));
      toast.success(result ? "Đã thêm vào yêu thích" : "Đã bỏ yêu thích");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài tập này?")) return;
    try {
      if (isDemoMode) {
        demoDb.deleteQuestion(id);
      } else {
        const res = await fetch(`/api/questions?id=${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Không thể xóa");
      }
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      toast.success("Đã xóa bài tập");
    } catch {
      toast.error("Không thể xóa bài tập");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClone = async (q: Question) => {
    try {
      if (isDemoMode) {
        const { id, question_code, created_at, updated_at, ...rest } = q;
        demoDb.createQuestion({ ...rest, content: q.content, status: 'draft' as const });
      } else {
        const { id, question_code, created_at, updated_at, user_id, ...rest } = q;
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...rest, status: 'draft' }),
        });
        if (!res.ok) throw new Error("Không thể nhân bản");
      }
      toast.success("Đã nhân bản bài tập");
      fetchQuestions();
    } catch {
      toast.error("Không thể nhân bản bài tập");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Xóa ${selectedIds.length} bài tập đã chọn? Không thể hoàn tác.`)) return;
    try {
      let deleted = 0;
      for (const id of selectedIds) {
        if (isDemoMode) {
          demoDb.deleteQuestion(id);
          deleted++;
        } else {
          const res = await fetch(`/api/questions?id=${id}`, { method: 'DELETE' });
          if (res.ok) deleted++;
        }
      }
      toast.success(`Đã xóa ${deleted} bài tập`);
      setSelectedIds([]);
      fetchQuestions();
    } catch {
      toast.error("Lỗi khi xóa hàng loạt");
    }
  };

  const handleBulkClone = async () => {
    try {
      let cloned = 0;
      for (const id of selectedIds) {
        const q = questions.find(q => q.id === id);
        if (!q) continue;
        if (isDemoMode) {
          const { id: _, question_code, created_at, updated_at, ...rest } = q;
          demoDb.createQuestion({ ...rest, status: 'draft' as const });
          cloned++;
        } else {
          const { id: _, question_code, created_at, updated_at, user_id, reviewed_by, reviewed_at, review_note, ...rest } = q;
          const res = await fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...rest, status: 'draft' }),
          });
          if (res.ok) cloned++;
        }
      }
      toast.success(`Đã nhân bản ${cloned} bài tập`);
      setSelectedIds([]);
      fetchQuestions();
    } catch {
      toast.error("Lỗi khi nhân bản hàng loạt");
    }
  };

  const handleBulkExportWord = async () => {
    const selected = questions.filter(q => selectedIds.includes(q.id));
    if (!selected.length) { toast.error("Chọn ít nhất 1 bài tập"); return; }
    setIsExporting(true);
    try {
      const children: (Paragraph | any)[] = [];
      for (const [index, q] of selected.entries()) {
        const contentParas = parseContentToDocxParagraphs(`Bài ${index + 1}. ` + q.content);
        if (contentParas.length > 0) {
          children.push(...contentParas);
        } else {
          children.push(new Paragraph({
            spacing: { before: 200, after: 80 },
            children: [new TextRun({ text: `Bài ${index + 1}. ` + q.content, size: 26, font: "Times New Roman" })],
          }));
        }
        if (q.question_type === "trac_nghiem" && q.options) {
          for (const opt of q.options) {
            const optParas = parseContentToDocxParagraphs(`${opt.key}. ${opt.value}`);
            children.push(...(optParas.length > 0 ? optParas : [
              new Paragraph({ indent: { left: 720 }, spacing: { before: 40 }, children: [new TextRun({ text: `${opt.key}. ${opt.value}`, size: 26, font: "Times New Roman" })] })
            ]));
          }
        }
        if (q.answer) {
          children.push(new Paragraph({
            spacing: { before: 60 }, indent: { left: 360 },
            children: [
              new TextRun({ text: "Đáp án: ", bold: true, size: 22, font: "Times New Roman", color: "0000FF" }),
              new TextRun({ text: q.answer, size: 22, font: "Times New Roman" }),
            ],
          }));
        }
      }
      const doc = new Document({
        sections: [{
          properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
          children,
        }],
      });
      const blob = await Packer.toBlob(doc);
      await downloadDocx(blob, `Bai_tap_${selected.length}_cau`);
      toast.success(`Đã xuất ${selected.length} bài tập!`);
    } catch {
      toast.error("Lỗi khi xuất file Word");
    } finally {
      setIsExporting(false);
    }
  };

  const clearFilters = () => {
    setSelectedGrade("");
    setSelectedTopic("");
    setSelectedDifficulty("");
    setSelectedType("");
    setSelectedStatus("");
    setFilterHasSolution(false);
    setFilterHasImages(false);
    setSearchQuery("");
  };

  const handleSelectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map(q => q.id));
    }
  };

  const handleDeleteAllFiltered = async () => {
    const count = questions.length;
    if (!confirm(`Xóa TẤT CẢ ${count} bài tập đang hiển thị? Hành động này KHÔNG THỂ hoàn tác!`)) return;
    if (!confirm(`Xác nhận lần cuối: Xóa ${count} bài tập?`)) return;
    try {
      let deleted = 0;
      for (const q of questions) {
        if (isDemoMode) {
          demoDb.deleteQuestion(q.id);
          deleted++;
        } else {
          const res = await fetch(`/api/questions?id=${q.id}`, { method: 'DELETE' });
          if (res.ok) deleted++;
        }
      }
      toast.success(`Đã xóa ${deleted} bài tập`);
      setSelectedIds([]);
      fetchQuestions();
    } catch {
      toast.error("Lỗi khi xóa");
    }
  };

  const hasFilters = selectedGrade || selectedTopic || selectedDifficulty || selectedType || selectedStatus || filterHasSolution || filterHasImages;

  return (
    <>
      <Header
        title="Kho bài tập"
        subtitle={`${questions.length} bài tập`}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowImport(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Nhập từ file
            </button>
            <Link
              href="/questions/new"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Thêm bài tập
            </Link>
          </div>
        }
      />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài tập..."
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                showFilters ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
              {hasFilters && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
            </button>

            {/* View mode */}
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2.5 transition-colors", viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600")}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2.5 transition-colors", viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600")}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-in-up">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Lớp</label>
                <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value as Grade | "")} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="">Tất cả</option>
                  {GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Chuyên đề</label>
                <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value as Topic | "")} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="">Tất cả</option>
                  {TOPICS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Mức độ</label>
                <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | "")} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="">Tất cả</option>
                  {DIFFICULTIES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Dạng bài</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as QuestionType | "")} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="">Tất cả</option>
                  {QUESTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Trạng thái</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value as QuestionStatus | "")} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option value="">Tất cả</option>
                  {QUESTION_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div className="col-span-full flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={filterHasSolution} onChange={(e) => setFilterHasSolution(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-medium text-slate-600">Có lời giải</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={filterHasImages} onChange={(e) => setFilterHasImages(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-medium text-slate-600">Có hình ảnh</span>
                </label>
              </div>
              {hasFilters && (
                <div className="col-span-full">
                  <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium">
                    <X className="w-4 h-4" /> Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bulk actions bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSelectAll}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors",
                selectedIds.length === questions.length && questions.length > 0
                  ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
                  : "text-slate-600 bg-slate-100 hover:bg-slate-200"
              )}
            >
              <input
                type="checkbox"
                checked={selectedIds.length === questions.length && questions.length > 0}
                onChange={handleSelectAll}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600"
              />
              {selectedIds.length === questions.length && questions.length > 0 ? 'Bỏ chọn tất cả' : `Chọn tất cả (${questions.length})`}
            </button>

            {selectedIds.length > 0 && (
              <>
                <span className="text-sm text-slate-500">|</span>
                <span className="text-sm text-slate-600">Đã chọn <strong className="text-blue-600">{selectedIds.length}</strong></span>
                <button onClick={handleBulkDelete} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Xóa ({selectedIds.length})
                </button>
                <button onClick={handleBulkClone} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center gap-1">
                  <Copy className="w-3.5 h-3.5" /> Nhân bản
                </button>
                <button onClick={handleBulkExportWord} disabled={isExporting} className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 flex items-center gap-1 disabled:opacity-50">
                  {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />} Xuất Word
                </button>
                <button onClick={() => setSelectedIds([])} className="ml-auto text-sm text-slate-500 hover:text-slate-700">
                  Bỏ chọn
                </button>
              </>
            )}

            {hasFilters && questions.length > 0 && (
              <button
                onClick={handleDeleteAllFiltered}
                className="ml-auto px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-1 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả kết quả lọc ({questions.length})
              </button>
            )}
          </div>
        </div>

        {/* Question list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="skeleton h-4 w-3/4 mb-3" />
                <div className="skeleton h-3 w-1/2 mb-2" />
                <div className="flex gap-2">
                  <div className="skeleton h-6 w-16 rounded-full" />
                  <div className="skeleton h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Chưa có bài tập nào</h3>
            <p className="text-slate-500 mb-6">Bắt đầu bằng cách thêm bài tập đầu tiên vào kho.</p>
            <Link href="/questions/new" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25">
              <Plus className="w-4 h-4" /> Thêm bài tập đầu tiên
            </Link>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
            {questions.map((q) => (
              <div
                key={q.id}
                className={cn(
                  "bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group",
                  selectedIds.includes(q.id) && "ring-2 ring-blue-500 border-blue-200"
                )}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(q.id)}
                    onChange={() => toggleSelect(q.id)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-800 leading-relaxed line-clamp-3">
                      {q.question_code && <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded mr-2 align-middle font-mono">{q.question_code}</span>}
                      <QuestionContent content={q.content} images={q.images} />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                        Toán {q.grade}
                      </span>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                        {getTopicLabel(q.topic)}
                      </span>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>
                        {getDifficultyLabel(q.difficulty)}
                      </span>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">
                        {getQuestionTypeLabel(q.question_type)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleToggleFavorite(q.id)} className={cn("p-2 rounded-lg transition-colors", favoriteIds.includes(q.id) ? "text-red-500 bg-red-50" : "text-slate-400 hover:text-red-500 hover:bg-red-50")} title="Yêu thích">
                      <Heart className={cn("w-4 h-4", favoriteIds.includes(q.id) && "fill-current")} />
                    </button>
                    <Link href={`/questions/${q.id}`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/questions/${q.id}/edit`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleClone(q)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors" title="Nhân bản">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(q.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Xóa">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ImportDialog isOpen={showImport} onClose={() => setShowImport(false)} onImported={fetchQuestions} />
    </>
  );
}
