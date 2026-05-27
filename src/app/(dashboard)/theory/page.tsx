"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  BookOpen, Play, CheckCircle2, Circle, ChevronRight, ChevronLeft, 
  Settings, Loader2, Maximize, X, Edit, Trash2, Plus
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MathRenderer } from "@/components/shared/MathRenderer";
import Link from "next/link";

interface Question {
  id: string;
  content: string;
  options: { key: string; value: string }[];
  correct_answer: string;
  solution: string;
  grade: number;
}

export default function TheoryReviewPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState<number>(9);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Presentation State
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Procedural Audio
  const playTone = (type: 'correct' | 'wrong') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.log('Audio not supported', e);
    }
  };

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data)).catch(() => {});
  }, []);

  // Reset category when grade changes (NOT when category itself changes)
  useEffect(() => {
    setCategoryFilter("");
  }, [gradeFilter]);

  // Fetch questions when grade or category changes
  useEffect(() => {
    fetchQuestions();
  }, [gradeFilter, categoryFilter]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const url = `/api/questions?grade=${gradeFilter}&question_type=trac_nghiem,dung_sai&status=approved&limit=500` + (categoryFilter ? `&category_id=${categoryFilter}` : '');
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      let fetchedQuestions: Question[] = data.data || data || [];

      // 1. Lọc trùng câu hỏi (dựa theo nội dung để tránh trùng lặp quá nhiều)
      const uniqueQuestionsMap = new Map<string, Question>();
      for (const q of fetchedQuestions) {
        // Loại bỏ khoảng trắng và chuẩn hóa để so sánh
        const normalizedContent = q.content.trim().replace(/\s+/g, ' ').toLowerCase();
        if (!uniqueQuestionsMap.has(normalizedContent)) {
          uniqueQuestionsMap.set(normalizedContent, q);
        }
      }
      fetchedQuestions = Array.from(uniqueQuestionsMap.values());

      // 2. Lọc trùng đáp án trong cùng 1 câu & Hoán đổi ngẫu nhiên
      fetchedQuestions = fetchedQuestions.map(q => {
        if (!q.options || q.options.length === 0) return q;

        const correctOpt = q.options.find(o => o.key === q.correct_answer);
        const correctValue = correctOpt ? correctOpt.value.trim() : null;

        const uniqueValues = new Set<string>();
        const uniqueOptions = [];
        
        for (const opt of q.options) {
          if (!opt || typeof opt.value !== 'string') continue;
          const val = opt.value.trim();
          if (!uniqueValues.has(val)) {
            uniqueValues.add(val);
            uniqueOptions.push({ ...opt });
          }
        }

        // Đảm bảo đáp án đúng luôn có mặt nếu nó lỡ bị mất
        if (correctValue && !uniqueValues.has(correctValue)) {
           uniqueOptions.push({ key: q.correct_answer, value: correctValue });
        }

        // Hoán đổi ngẫu nhiên các đáp án (Thuật toán Fisher-Yates)
        for (let i = uniqueOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [uniqueOptions[i], uniqueOptions[j]] = [uniqueOptions[j], uniqueOptions[i]];
        }

        // Gán lại các nhãn A, B, C, D tuần tự
        const labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
        let newCorrectAnswer = q.correct_answer;
        
        const finalOptions = uniqueOptions.map((opt, idx) => {
          const newKey = labels[idx] || String.fromCharCode(65 + idx);
          if (opt.value.trim() === correctValue) {
            newCorrectAnswer = newKey;
          }
          return { key: newKey, value: opt.value };
        });

        return {
          ...q,
          options: finalOptions,
          correct_answer: newCorrectAnswer
        };
      });

      setQuestions(fetchedQuestions);
      // Auto select all initially
      setSelectedIds(new Set(fetchedQuestions.map(q => q.id)));
    } catch (err) {
      toast.error("Không thể tải danh sách câu hỏi lý thuyết.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const deleteQuestion = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) return;
    try {
      const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Lỗi khi xóa");
      toast.success("Đã xóa câu hỏi");
      setQuestions(q => q.filter(x => x.id !== id));
    } catch (err) {
      toast.error("Không thể xóa câu hỏi");
    }
  };

  const startPresentation = () => {
    if (selectedIds.size === 0) {
      toast.error("Vui lòng chọn ít nhất 1 câu hỏi để trình chiếu.");
      return;
    }
    setIsPresenting(true);
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    
    // Yêu cầu Fullscreen nếu trình duyệt hỗ trợ
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const exitPresentation = () => {
    setIsPresenting(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      if (currentIndex < presentationQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      } else {
        toast.success("Đã hoàn thành bài ôn tập!");
        exitPresentation();
      }
    }
  };

  const prevSlide = () => {
    if (showAnswer && selectedAnswer === null) {
      setShowAnswer(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(true);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerClick = (key: string, isCorrect: boolean) => {
    if (showAnswer) return; // Already answered
    setSelectedAnswer(key);
    setShowAnswer(true);
    playTone(isCorrect ? 'correct' : 'wrong');
  };

  const presentationQuestions = questions.filter(q => selectedIds.has(q.id));
  const currentQ = presentationQuestions[currentIndex];

  if (isPresenting && currentQ && mounted) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] bg-slate-900 text-slate-100 flex flex-col font-sans h-screen w-screen overflow-hidden">
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-8 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 shadow-lg shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-500/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-xl font-bold tracking-wide">Ôn tập Lý Thuyết Lớp {gradeFilter}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="px-4 py-1.5 bg-slate-700/50 rounded-full border border-slate-600">
              <span className="text-base font-medium text-slate-300">
                Câu <span className="text-white font-bold">{currentIndex + 1}</span> / {presentationQuestions.length}
              </span>
            </div>
            <button 
              onClick={exitPresentation}
              className="p-2.5 bg-slate-700/50 hover:bg-red-500 hover:text-white border border-slate-600 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-16 flex flex-col justify-center items-center">
          <div className="max-w-6xl w-full">
            <div className="text-3xl md:text-5xl leading-tight md:leading-snug mb-16 font-medium flex items-start gap-6">
              <span className="font-extrabold text-blue-400 whitespace-nowrap drop-shadow-md shrink-0 pt-2">Câu {currentIndex + 1}:</span>
              <div className="flex-1 text-slate-100 drop-shadow-sm min-w-0">
                <MathRenderer content={currentQ.content} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {currentQ.options?.map((opt) => {
                const isCorrect = opt.key === currentQ.correct_answer;
                const isSelected = selectedAnswer === opt.key;
                const showHighlight = showAnswer && isCorrect;
                const showWrong = showAnswer && isSelected && !isCorrect;
                const showDim = showAnswer && !isCorrect && !showWrong;

                return (
                  <button 
                    key={opt.key}
                    onClick={() => handleAnswerClick(opt.key, isCorrect)}
                    disabled={showAnswer}
                    className={cn(
                      "text-left p-6 md:p-8 rounded-3xl border-2 text-2xl md:text-4xl transition-all duration-300 relative overflow-hidden group",
                      showHighlight ? "bg-green-500/20 border-green-400 text-green-100 scale-[1.02] shadow-[0_0_40px_rgba(74,222,128,0.2)]" : 
                      showWrong ? "bg-red-500/20 border-red-500 text-red-200 scale-95 shadow-inner" :
                      showDim ? "bg-slate-800/50 border-slate-800 text-slate-500 opacity-40" : 
                      "bg-slate-800 border-slate-700 hover:border-blue-400/50 hover:bg-slate-800/80 hover:scale-[1.01] cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className={cn(
                        "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-2xl md:text-3xl shrink-0 transition-colors",
                        showHighlight ? "bg-green-500 text-white" : 
                        showWrong ? "bg-red-500 text-white" :
                        "bg-slate-700 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"
                      )}>
                        {opt.key}
                      </div>
                      <div className="overflow-x-auto no-scrollbar py-2 w-full">
                        <MathRenderer content={opt.value} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Giải thích */}
            {showAnswer && currentQ.solution && (
              <div className="mt-16 p-8 bg-blue-500/10 border border-blue-500/30 rounded-3xl text-blue-100 text-2xl md:text-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span className="font-bold text-blue-400 mr-3 inline-flex items-center gap-3 mb-4 shrink-0">
                  <CheckCircle2 className="w-8 h-8" /> Lời giải chi tiết:
                </span>
                <div className="mt-2 text-slate-200 min-w-0 break-words">
                  <MathRenderer content={currentQ.solution} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="h-32 bg-slate-800/80 backdrop-blur-xl border-t border-slate-700 flex items-center justify-center gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-20 shrink-0">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0 && !showAnswer}
            className="px-10 py-5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 rounded-2xl flex items-center gap-3 font-semibold text-xl transition-all border border-slate-600"
          >
            <ChevronLeft className="w-8 h-8" /> Quay lại
          </button>
          <button 
            onClick={nextSlide}
            className={cn(
              "px-12 py-5 rounded-2xl flex items-center gap-3 font-bold text-2xl transition-all duration-300 shadow-xl",
              showAnswer 
                ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/25 hover:scale-105" 
                : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/25 hover:scale-105"
            )}
          >
            {showAnswer ? (currentIndex < presentationQuestions.length - 1 ? "Câu tiếp theo" : "Hoàn thành") : "Hiện đáp án"}
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>,
      document.body
    );
  }

  // Build category tree for dropdown
  const rawFilteredCategories = categories.filter(c => c.grade === gradeFilter || c.grade === null);
  const displayCategories: any[] = [];
  const parents = rawFilteredCategories.filter(c => !c.parent_id).sort((a, b) => a.sort_order - b.sort_order);
  
  for (const p of parents) {
    displayCategories.push({ ...p, displayName: p.name });
    const children = rawFilteredCategories
      .filter(c => c.parent_id === p.id)
      .sort((a, b) => a.sort_order - b.sort_order);
    for (const child of children) {
      displayCategories.push({ ...child, displayName: `\u00A0\u00A0\u00A0\u00A0${child.name}` });
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Phòng Ôn Tập Lý Thuyết
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Chọn các câu hỏi trắc nghiệm, đúng/sai theo từng bài học để trình chiếu.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/questions/new" className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all">
            <Plus className="w-5 h-5" />
            Thêm bài tập
          </Link>
          <button
            onClick={startPresentation}
            disabled={selectedIds.size === 0 || isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
          >
            <Play className="w-5 h-5 fill-current" />
            Bắt đầu trình chiếu ({selectedIds.size})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-700">Chọn khối lớp:</span>
            <div className="flex gap-2">
              {[6, 7, 8, 9].map(g => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-colors",
                    gradeFilter === g ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  )}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <span className="font-semibold text-slate-700 whitespace-nowrap">Chọn Bài học:</span>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="">Tất cả bài học</option>
              {displayCategories.map(c => (
                <option key={c.id} value={c.id}>{c.displayName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
              <p>Đang tải câu hỏi lý thuyết...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p>Chưa có câu hỏi trắc nghiệm lý thuyết nào cho khối lớp này.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const isSelected = selectedIds.has(q.id);
                return (
                  <div 
                    key={q.id}
                    onClick={() => toggleSelect(q.id)}
                    className={cn(
                      "flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
                      isSelected ? "border-blue-500 bg-blue-50/50" : "border-slate-100 hover:border-blue-300 bg-white"
                    )}
                  >
                    <div className="mt-1 shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800 mb-4 text-lg flex items-start gap-3">
                        <span className="whitespace-nowrap pt-0.5 text-blue-600">Câu {idx + 1}:</span>
                        <div className="flex-1 min-w-0">
                          <MathRenderer content={q.content} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.options?.map(opt => (
                          <div 
                            key={opt.key}
                            className={cn(
                              "px-4 py-3 rounded-xl text-[15px] border flex items-start gap-3 shadow-sm transition-all",
                              opt.key === q.correct_answer ? "bg-green-50 border-green-300 text-green-800" : "bg-slate-50 border-slate-200 text-slate-700"
                            )}
                          >
                            <span className={cn(
                              "font-bold shrink-0 w-6 h-6 rounded flex items-center justify-center pt-0.5",
                              opt.key === q.correct_answer ? "bg-green-200 text-green-800" : "bg-slate-200 text-slate-600"
                            )}>{opt.key}</span>
                            <div className="flex-1 min-w-0 mt-0.5 break-words">
                              <MathRenderer content={opt.value} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link 
                        href={`/questions/${q.id}/edit`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa bài tập"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={(e) => deleteQuestion(e, q.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa bài tập"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
