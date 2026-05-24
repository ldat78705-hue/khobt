"use client";

import { useState, useEffect } from "react";
import { 
  BookOpen, Play, CheckCircle2, Circle, ChevronRight, ChevronLeft, 
  Settings, Loader2, Maximize, X
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MathRenderer } from "@/components/shared/MathRenderer";

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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState<number>(9);

  // Presentation State
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [gradeFilter]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      // Lấy cả câu Trắc nghiệm và Đúng/Sai
      const res = await fetch(`/api/questions?grade=${gradeFilter}&question_type=trac_nghiem,dung_sai`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setQuestions(data.data || data || []);
      // Auto select all initially
      setSelectedIds(new Set((data.data || data || []).map((q: any) => q.id)));
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

  const startPresentation = () => {
    if (selectedIds.size === 0) {
      toast.error("Vui lòng chọn ít nhất 1 câu hỏi để trình chiếu.");
      return;
    }
    setIsPresenting(true);
    setCurrentIndex(0);
    setShowAnswer(false);
    
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

  const nextSlide = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      if (currentIndex < presentationQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowAnswer(false);
      } else {
        toast.success("Đã hoàn thành bài ôn tập!");
        exitPresentation();
      }
    }
  };

  const prevSlide = () => {
    if (showAnswer) {
      setShowAnswer(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(true);
    }
  };

  const presentationQuestions = questions.filter(q => selectedIds.has(q.id));
  const currentQ = presentationQuestions[currentIndex];

  if (isPresenting && currentQ) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Ôn tập Lý Thuyết Lớp {gradeFilter}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Câu {currentIndex + 1} / {presentationQuestions.length}
            </span>
            <button 
              onClick={exitPresentation}
              className="p-2 bg-slate-700 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 flex flex-col justify-center items-center">
          <div className="max-w-4xl w-full">
            <div className="text-3xl leading-relaxed mb-12 font-medium flex items-start gap-4">
              <span className="font-bold whitespace-nowrap">Câu {currentIndex + 1}:</span>
              <MathRenderer content={currentQ.content} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {currentQ.options?.map((opt) => {
                const isCorrect = opt.key === currentQ.correct_answer;
                const showHighlight = showAnswer && isCorrect;
                const showDim = showAnswer && !isCorrect;

                return (
                  <div 
                    key={opt.key}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-2xl transition-all duration-500",
                      showHighlight ? "bg-green-500/20 border-green-500 text-green-300 scale-105 shadow-[0_0_30px_rgba(34,197,94,0.3)]" : 
                      showDim ? "bg-slate-800 border-slate-700 text-slate-500 opacity-50" : 
                      "bg-slate-800 border-slate-700 hover:border-slate-500"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span className={cn(
                        "font-bold",
                        showHighlight ? "text-green-400" : "text-blue-400"
                      )}>{opt.key}.</span>
                      <MathRenderer content={opt.value} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Giải thích */}
            {showAnswer && currentQ.solution && (
              <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-200 text-xl animate-in fade-in slide-in-from-bottom-4">
                <span className="font-bold text-blue-400 mr-2 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6" /> Giải thích:
                </span>
                <MathRenderer content={currentQ.solution} />
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="h-24 bg-slate-800 border-t border-slate-700 flex items-center justify-center gap-8">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0 && !showAnswer}
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-2 font-medium transition-colors"
          >
            <ChevronLeft className="w-6 h-6" /> Lùi lại
          </button>
          <button 
            onClick={nextSlide}
            className={cn(
              "px-8 py-4 rounded-xl flex items-center gap-2 font-bold text-lg transition-all shadow-lg",
              showAnswer ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-green-600 hover:bg-green-500 text-white animate-pulse"
            )}
          >
            {showAnswer ? "Câu tiếp theo" : "Hiển thị đáp án"}
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
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
            Chọn các câu hỏi trắc nghiệm để trình chiếu trên lớp học.
          </p>
        </div>
        
        <button
          onClick={startPresentation}
          disabled={selectedIds.size === 0 || isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
        >
          <Play className="w-5 h-5 fill-current" />
          Bắt đầu trình chiếu ({selectedIds.size})
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
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
                    <div className="mt-1">
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 mb-3 text-lg flex gap-2">
                        <span className="whitespace-nowrap">Câu {idx + 1}:</span>
                        <MathRenderer content={q.content} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {q.options?.map(opt => (
                          <div 
                            key={opt.key}
                            className={cn(
                              "px-4 py-2 rounded-lg text-sm border flex items-start gap-2",
                              opt.key === q.correct_answer ? "bg-green-50 border-green-200 text-green-700 font-medium" : "bg-slate-50 border-slate-100 text-slate-600"
                            )}
                          >
                            <span className="font-bold">{opt.key}.</span>
                            <MathRenderer content={opt.value} />
                          </div>
                        ))}
                      </div>
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
