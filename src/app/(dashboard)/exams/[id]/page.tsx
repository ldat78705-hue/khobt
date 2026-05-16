"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import {
  Download, Copy, FileText, Clock, BookOpen, ArrowLeft,
  Clipboard, FileDown, Eye, EyeOff, Loader2, Printer, Edit, X, Bookmark, Shuffle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate, getDifficultyLabel, getTopicLabel, getQuestionTypeLabel, getDifficultyColor } from "@/lib/utils";
import type { Exam, ExamQuestion, Question } from "@/types";

import { toast } from "sonner";
import { exportToWord } from "@/lib/export/word";
import { copyToClipboard } from "@/lib/export/clipboard";
import { QuestionContent, MathRenderer, CloudinaryImage } from "@/components/shared/MathRenderer";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export default function ExamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  const [exam, setExam] = useState<Exam | null>(null);
  const [examQuestions, setExamQuestions] = useState<(ExamQuestion & { question: Question })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchExam = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setExam(demoDb.getExam(examId));
        setExamQuestions(demoDb.getExamQuestions(examId));
        setIsSaved(demoDb.isExamSaved(DEMO_USER.id, examId));
      } else {
        const res = await fetch(`/api/exams?id=${examId}`);
        if (res.status === 404) { setExam(null); return; }
        if (!res.ok) throw new Error('Lỗi');
        const data = await res.json();
        setExam(data.exam);
        // API returns flat objects, wrap question data
        const eqs = (data.questions || []).map((eq: any) => ({
          ...eq,
          question: {
            id: eq.question_id,
            content: eq.content,
            answer: eq.answer,
            solution: eq.solution,
            grade: eq.grade,
            topic: eq.topic,
            difficulty: eq.difficulty,
            question_type: eq.question_type,
            options: eq.options,
            correct_answer: eq.correct_answer,
            images: eq.images,
            tags: eq.tags,
          }
        }));
        setExamQuestions(eqs);
        // Check saved status
        fetch('/api/saved-exams')
          .then(r => r.json())
          .then(d => { if (d.ids) setIsSaved(d.ids.includes(examId)); })
          .catch(() => {});
      }
    } catch {
      toast.error("Không thể tải đề thi");
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  useEffect(() => { fetchExam(); }, [fetchExam]);

  const handleExportWord = async () => {
    if (!exam) return;
    setIsExporting(true);
    try {
      await exportToWord(exam, examQuestions, { showAnswer: showAnswers, showSolution: showSolutions });
      toast.success("Đã xuất file Word!");
    } catch {
      toast.error("Không thể xuất Word");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToWord = async () => {
    if (!exam) return;
    try {
      await copyToClipboard(exam, examQuestions, { showAnswer: showAnswers, showSolution: showSolutions });
      toast.success("Đã copy! Paste vào Word (Ctrl+V)");
    } catch {
      toast.error("Không thể copy");
    }
  };

  const handlePrint = () => {
    // Temporarily clear title to suppress browser header/footer (URL, date)
    const origTitle = document.title;
    document.title = ' ';
    window.print();
    setTimeout(() => { document.title = origTitle; }, 1000);
  };

  const handleExportPDF = () => {
    toast.info("Đang mở hộp thoại xuất PDF...");
    setShowPrintPreview(true);
    setTimeout(() => { handlePrint(); }, 500);
  };

  /** Export exam questions only (no answers) as separate Word file */
  const handleExportExamOnly = async () => {
    if (!exam) return;
    setIsExporting(true);
    try {
      await exportToWord(exam, examQuestions, { showAnswer: false, showSolution: false });
      toast.success("Đã xuất file đề bài!");
    } catch {
      toast.error("Không thể xuất");
    } finally {
      setIsExporting(false);
    }
  };

  /** Export answer key only as separate Word file */
  const handleExportAnswerOnly = async () => {
    if (!exam) return;
    setIsExporting(true);
    try {
      await exportToWord(
        { ...exam, title: `${exam.title} - ĐÁP ÁN` },
        examQuestions,
        { showAnswer: true, showSolution: true }
      );
      toast.success("Đã xuất file đáp án!");
    } catch {
      toast.error("Không thể xuất");
    } finally {
      setIsExporting(false);
    }
  };

  const handleToggleSaved = async () => {
    if (isDemoMode) {
      const result = demoDb.toggleSavedExam(DEMO_USER.id, examId);
      setIsSaved(result);
      toast.success(result ? "Đã lưu đề thi" : "Đã bỏ lưu");
    } else {
      try {
        const res = await fetch('/api/saved-exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ exam_id: examId }),
        });
        if (res.ok) {
          const data = await res.json();
          setIsSaved(data.saved);
          toast.success(data.saved ? "Đã lưu đề thi" : "Đã bỏ lưu");
        }
      } catch {
        toast.error("Không thể cập nhật");
      }
    }
  };

  const totalPoints = examQuestions.reduce((s, eq) => s + eq.points, 0);

  /** Shuffle exam: create new exam with randomized question order + shuffled MCQ options */
  const handleShuffleExam = async () => {
    if (!exam || examQuestions.length === 0) return;
    if (isDemoMode) {
      // Shuffle question order
      const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
      // Create new exam
      const newExam = demoDb.createExam({
        title: `${exam.title} (Mã đề ${Math.floor(100 + Math.random() * 900)})`,
        description: `Trộn từ: ${exam.title}`,
        grade: exam.grade, duration: exam.duration,
        settings: exam.settings, tags: [...(exam.tags || []), 'trộn đề'],
      });
      // Add shuffled questions (shuffle MCQ options too)
      shuffled.forEach((eq) => {
        const q = eq.question;
        if (q.question_type === 'trac_nghiem' && q.options && q.options.length > 0) {
          // Shuffle option order + remap correct_answer
          const oldOptions = [...q.options];
          const shuffledOpts = [...oldOptions].sort(() => Math.random() - 0.5);
          const newKeys = ['A', 'B', 'C', 'D'];
          const remapped = shuffledOpts.map((opt, i) => ({ ...opt, key: newKeys[i] }));
          // Find new correct answer key
          const oldCorrectKey = q.correct_answer;
          const oldCorrectOpt = oldOptions.find(o => o.key === oldCorrectKey);
          const newCorrectKey = oldCorrectOpt
            ? remapped.find(r => r.value === oldCorrectOpt.value)?.key || oldCorrectKey
            : oldCorrectKey;
          // Create cloned question with shuffled options
          const cloned = demoDb.createQuestion({
            ...q, options: remapped, correct_answer: newCorrectKey,
            answer: newCorrectKey,
            question_code: undefined as any,
          });
          const eqAdded = demoDb.addExamQuestion(newExam.id, cloned.id);
          demoDb.updateExamQuestionPoints(eqAdded.id, eq.points);
        } else {
          const eqAdded = demoDb.addExamQuestion(newExam.id, q.id);
          demoDb.updateExamQuestionPoints(eqAdded.id, eq.points);
        }
      });
      toast.success('Đã tạo đề trộn!');
      router.push(`/exams/${newExam.id}`);
    } else {
      try {
        // Create shuffled exam via API
        const shuffleCode = Math.floor(100 + Math.random() * 900);
        const res = await fetch('/api/exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${exam.title} (Mã đề ${shuffleCode})`,
            description: `Trộn từ: ${exam.title}`,
            grade: exam.grade, duration: exam.duration,
            settings: exam.settings,
            tags: [...(exam.tags || []), 'trộn đề'],
          }),
        });
        if (!res.ok) throw new Error('Lỗi tạo đề trộn');
        const newExam = await res.json();

        // Add shuffled questions
        const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
        for (let i = 0; i < shuffled.length; i++) {
          const eq = shuffled[i];
          await fetch('/api/exam-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              exam_id: newExam.id,
              question_id: eq.question?.id || eq.question_id,
              sort_order: i,
              points: eq.points,
            }),
          });
        }

        toast.success('Đã tạo đề trộn!');
        router.push(`/exams/${newExam.id}`);
      } catch {
        toast.error('Không thể tạo đề trộn');
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <Header title="Đang tải..." />
        <div className="p-6 space-y-4">
          <div className="skeleton h-32 rounded-2xl" />
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </>
    );
  }

  if (!exam) {
    return (
      <>
        <Header title="Không tìm thấy đề thi" />
        <div className="p-6 text-center py-20">
          <p className="text-slate-500 mb-4">Đề thi không tồn tại hoặc đã bị xóa.</p>
          <Link href="/exams" className="text-blue-600 hover:text-blue-700 font-medium">← Quay lại kho đề</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title={exam.title}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSaved}
              className={cn(
                "p-2 rounded-xl transition-all",
                isSaved ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400 hover:text-blue-500"
              )}
              title={isSaved ? "Bỏ lưu" : "Lưu đề thi"}
            >
              <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
            </button>
            <Link href={`/exams/${examId}/edit`} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors font-medium">
              <Edit className="w-4 h-4" /> Sửa đề
            </Link>
            <button
              onClick={handleShuffleExam}
              className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors font-medium"
              title="Tạo mã đề mới với thứ tự câu hỏi và đáp án trắc nghiệm ngẫu nhiên"
            >
              <Shuffle className="w-4 h-4" /> Trộn đề
            </button>
            <Link href="/exams" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium">
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </Link>
          </div>
        }
      />
      <div className="p-6 space-y-4 max-w-5xl">
        {/* Exam info + Export bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{exam.title}</h2>
              {exam.description && <p className="text-sm text-slate-500 mt-1">{exam.description}</p>}
              <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {exam.grade}</span>
                {exam.duration && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                    <Clock className="w-3 h-3" /> {exam.duration} phút
                  </span>
                )}
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">
                  <BookOpen className="w-3 h-3" /> {examQuestions.length} câu
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                  Tổng: {totalPoints} điểm
                </span>
                <span className="text-xs text-slate-400">{formatDate(exam.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Export options */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 flex-wrap">
            <div className="flex items-center gap-4 mr-auto">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Kèm đáp án
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                <input type="checkbox" checked={showSolutions} onChange={(e) => setShowSolutions(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Kèm lời giải
              </label>
            </div>
            <button onClick={() => setShowPrintPreview(true)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              <Printer className="w-4 h-4" /> Xem trước
            </button>
            <button onClick={handleCopyToWord} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              <Clipboard className="w-4 h-4" /> Copy sang Word
            </button>
            <button onClick={handleExportWord} disabled={isExporting} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm disabled:opacity-50">
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
              Xuất Word
            </button>
            <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-red-500 hover:bg-red-600 shadow-sm transition-colors">
              <Download className="w-4 h-4" /> Xuất PDF
            </button>
          </div>
          {/* Separate export row */}
          <div className="flex items-center gap-2 pt-3 border-t border-dashed border-slate-200 mt-3">
            <span className="text-xs text-slate-400 mr-auto">Xuất riêng:</span>
            <button onClick={handleExportExamOnly} disabled={isExporting} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors">
              <FileText className="w-3.5 h-3.5" /> Chỉ đề bài
            </button>
            <button onClick={handleExportAnswerOnly} disabled={isExporting} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors">
              <FileDown className="w-3.5 h-3.5" /> Chỉ đáp án + lời giải
            </button>
          </div>
        </div>

        {/* Questions preview */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Nội dung đề thi</h3>
          {examQuestions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">Chưa có bài tập nào trong đề.</p>
              <Link href={`/exams/${examId}/edit`} className="text-blue-600 hover:text-blue-700 font-medium">Thêm bài tập →</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {examQuestions.map((eq, index) => {
                const q = eq.question;
                return (
                  <div key={eq.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold flex items-center justify-center">{index + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                          <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                          <span className="text-xs text-slate-400">({eq.points} điểm)</span>
                        </div>
                        <QuestionContent content={q.content} images={q.images} className="text-sm text-slate-800" />
                        {q.question_type === "trac_nghiem" && q.options && (
                          <div className="mt-2 ml-4 space-y-1">
                            {q.options.map((opt) => (
                              <div key={opt.key} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="font-semibold text-slate-500">{opt.key}.</span>
                                <MathRenderer content={opt.value} />
                              </div>
                            ))}
                          </div>
                        )}
                        {showAnswers && q.answer && (
                          <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                            <strong>Đáp án:</strong> <MathRenderer content={q.answer} className="inline" />
                          </div>
                        )}
                        {showSolutions && q.solution && (
                          <div className="mt-2 p-3 bg-green-50 rounded-lg text-sm text-green-700">
                            <strong>Lời giải:</strong> <MathRenderer content={q.solution} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Print Preview Modal */}
        {showPrintPreview && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 overflow-y-auto no-print">
            <div className="min-h-screen py-8 px-4 flex justify-center">
              <div className="w-full max-w-[210mm] relative">
                <div className="sticky top-0 z-10 flex items-center justify-between mb-4 bg-slate-900/90 backdrop-blur rounded-xl px-4 py-3">
                  <h3 className="text-white font-semibold">Xem trước bản in</h3>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                      <input type="checkbox" checked={showAnswers} onChange={e => setShowAnswers(e.target.checked)} className="w-4 h-4 rounded" /> Đáp án
                    </label>
                    <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                      <input type="checkbox" checked={showSolutions} onChange={e => setShowSolutions(e.target.checked)} className="w-4 h-4 rounded" /> Lời giải
                    </label>
                    <div className="w-px h-5 bg-white/20 mx-1" />
                    <button onClick={handleExportWord} disabled={isExporting} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                      <FileDown className="w-4 h-4" /> Word
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      <Printer className="w-4 h-4" /> In / PDF
                    </button>
                    <button onClick={() => setShowPrintPreview(false)} className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Paper - Đề bài */}
                <div className="bg-white shadow-2xl rounded-lg print-preview print-page" contentEditable suppressContentEditableWarning style={{ padding: '20mm', fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.8', color: '#000' }}>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>
                      {exam.settings?.schoolName || exam.settings?.school_name || 'TRƯỜNG THCS ...'}
                    </p>
                    <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: '#333' }}>
                      Năm học: {exam.settings?.schoolYear || exam.settings?.school_year || '2024-2025'}
                    </p>
                    <div style={{ marginTop: '14px' }}>
                      <p style={{ fontSize: '17px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0, letterSpacing: '1px' }}>
                        ĐỀ {(exam.settings?.examType || exam.settings?.exam_type || 'KIỂM TRA').toUpperCase()}
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px' }}>
                        Môn: Toán {exam.grade} — Thời gian: {exam.duration || 90} phút
                      </p>
                    </div>
                    <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '10px auto', width: '35%' }} />
                  </div>

                  {/* Student info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px dotted #999' }}>
                    <span>Họ và tên: ...............................................</span>
                    <span>Lớp: ............</span>
                    <span>SBD: ............</span>
                  </div>

                  {/* Score distribution table (Ma trận đề) */}
                  <div style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr>
                          <th style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'left', fontWeight: 'bold', background: '#f5f5f5' }}>Câu</th>
                          {examQuestions.map((eq, i) => (
                            <th key={eq.id} style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5', minWidth: '32px' }}>{i + 1}</th>
                          ))}
                          <th style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5' }}>Tổng</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: '1px solid #000', padding: '4px 6px', fontWeight: 'bold' }}>Điểm</td>
                          {examQuestions.map(eq => (
                            <td key={eq.id} style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'center' }}>{eq.points}</td>
                          ))}
                          <td style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'center', fontWeight: 'bold' }}>{totalPoints}</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #000', padding: '4px 6px', fontWeight: 'bold' }}>Mức độ</td>
                          {examQuestions.map(eq => {
                            const labels: Record<string, string> = { nhan_biet: 'NB', thong_hieu: 'TH', van_dung: 'VD', van_dung_cao: 'VDC' };
                            return (
                              <td key={eq.id} style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'center', fontSize: '10px' }}>{labels[eq.question.difficulty] || ''}</td>
                            );
                          })}
                          <td style={{ border: '1px solid #000', padding: '4px 6px', textAlign: 'center' }}></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Questions */}
                  <div>
                    {examQuestions.map((eq, index) => {
                      const q = eq.question;
                      return (
                        <div key={eq.id} style={{ marginBottom: '14px', pageBreakInside: 'avoid' }}>
                          <div>
                            <strong>Câu {index + 1}.</strong>{' '}
                            <span style={{ fontStyle: 'italic', fontSize: '12px', color: '#555' }}>({eq.points} điểm)</span>
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
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>— Hết —</p>
                  </div>
                </div>

                {/* Answer Key Page */}
                {showAnswers && (
                  <div className="bg-white shadow-2xl rounded-lg mt-6 print-preview print-page" contentEditable suppressContentEditableWarning style={{ padding: '20mm', fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.8', color: '#000', pageBreakBefore: 'always' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <p style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        ĐÁP ÁN VÀ BIỂU ĐIỂM
                      </p>
                      <p style={{ fontSize: '13px', color: '#555' }}>{exam.title} — Toán {exam.grade}</p>
                      <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px auto', width: '30%' }} />
                    </div>
                    <div>
                      {examQuestions.map((eq, index) => {
                        const q = eq.question;
                        return (
                          <div key={eq.id} style={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
                            <div>
                              <strong>Câu {index + 1}</strong>{' '}
                              <span style={{ fontSize: '12px', color: '#555' }}>({eq.points} điểm)</span>
                            </div>
                            {q.answer && (
                              <div style={{ marginLeft: '16px', padding: '4px 10px', background: '#f0f7ff', borderRadius: '4px', fontSize: '13px', marginTop: '2px' }}>
                                <strong>Đáp án:</strong> <MathRenderer content={q.answer} className="inline" />
                              </div>
                            )}
                            {q.correct_answer && !q.answer && (
                              <div style={{ marginLeft: '16px', fontSize: '13px', marginTop: '2px' }}>
                                <strong>Đáp án:</strong> <span style={{ color: 'blue', fontWeight: 'bold' }}>{q.correct_answer}</span>
                              </div>
                            )}
                            {showSolutions && q.solution && (
                              <div style={{ marginLeft: '16px', padding: '4px 10px', background: '#f0fdf4', borderRadius: '4px', fontSize: '13px', marginTop: '4px' }}>
                                <strong>Lời giải:</strong> <MathRenderer content={q.solution} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '24px', fontSize: '13px', fontStyle: 'italic', color: '#555' }}>
                      Tổng điểm: <strong>{totalPoints}</strong> điểm
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
