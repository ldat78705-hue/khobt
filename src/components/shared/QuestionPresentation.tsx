"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  X, Maximize2, Minimize2, ZoomIn, ZoomOut,
  RotateCcw, BookOpen, CheckCircle, ChevronLeft, ChevronRight, HelpCircle
} from "lucide-react";
import { MathRenderer } from "@/components/shared/MathRenderer";
import type { Question } from "@/types";
import { getDifficultyLabel, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface QuestionPresentationProps {
  question: Question;
  onClose: () => void;
}

export default function QuestionPresentation({ question, onClose }: QuestionPresentationProps) {
  const [fontSize, setFontSize] = useState(32); // px
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = question;
  const parts = ['question'];
  if (q.answer || (q.question_type === 'trac_nghiem' && q.options)) parts.push('answer');
  if (q.solution) parts.push('solution');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          if (isFullscreen) {
            document.exitFullscreen?.();
          } else {
            onClose();
          }
          break;
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          setSlideIndex((s) => Math.min(parts.length - 1, s + 1));
          break;
        case "ArrowLeft":
        case "Backspace":
          e.preventDefault();
          setSlideIndex((s) => Math.max(0, s - 1));
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "+":
        case "=":
          e.preventDefault();
          setFontSize((s) => Math.min(56, s + 2));
          break;
        case "-":
          e.preventDefault();
          setFontSize((s) => Math.max(18, s - 2));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, onClose, parts.length]);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const activePart = parts[slideIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col select-none"
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-sm text-white/80 text-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white truncate max-w-[500px]">
            {q.question_code && <span className="text-blue-300 font-mono mr-2">{q.question_code}</span>}
            Bài tập — {getTopicLabel(q.topic)}
          </span>
          <span className="text-white/40">|</span>
          <span className="text-white/60">Toán {q.grade}</span>
          <span className="text-white/40">|</span>
          <span className="px-2 py-0.5 bg-white/10 rounded-full text-white/60 text-xs">{getDifficultyLabel(q.difficulty)}</span>
          <span className="px-2 py-0.5 bg-white/10 rounded-full text-white/60 text-xs">{getQuestionTypeLabel(q.question_type)}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Font size */}
          <button onClick={() => setFontSize((s) => Math.max(18, s - 2))} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Thu nhỏ chữ (-)">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono w-8 text-center">{fontSize}</span>
          <button onClick={() => setFontSize((s) => Math.min(56, s + 2))} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Phóng to chữ (+)">
            <ZoomIn className="w-4 h-4" />
          </button>
          {/* Navigation */}
          <button
            onClick={() => setSlideIndex(s => Math.max(0, s - 1))}
            disabled={slideIndex === 0}
            className={cn("p-1.5 rounded-lg transition-colors", slideIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 text-white/80 hover:text-white")}
            title="Trang trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-white/60">
            {slideIndex + 1} / {parts.length}
          </span>
          <button
            onClick={() => setSlideIndex(s => Math.min(parts.length - 1, s + 1))}
            disabled={slideIndex === parts.length - 1}
            className={cn("p-1.5 rounded-lg transition-colors", slideIndex === parts.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 text-white/80 hover:text-white")}
            title="Trang sau (Mũi tên phải, Space)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="w-px h-5 bg-white/20 mx-1" />
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Toàn màn hình (F)">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {/* Reset */}
          <button onClick={() => { setFontSize(32); setSlideIndex(0); }} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Đặt lại">
            <RotateCcw className="w-4 h-4" />
          </button>
          {/* Close */}
          <button onClick={onClose} className="p-1.5 hover:bg-red-500/30 rounded-lg transition-colors text-white/60 hover:text-red-300" title="Đóng (Esc)">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-8 py-6 overflow-auto">
        <div className="w-full max-w-[1400px] mx-auto text-white">
          {/* Question Slide */}
          {activePart === 'question' && (
            <div className="bg-white/[0.07] backdrop-blur-sm rounded-3xl p-10 border border-white/10 shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 text-blue-300 text-[0.6em] font-semibold uppercase tracking-wider">
                <HelpCircle className="w-5 h-5" /> Nội dung bài tập
              </div>
              <div className="text-white/95 leading-relaxed presentation-math">
                <MathRenderer content={q.content} className="leading-relaxed" />
              </div>
              
              {q.question_type === "trac_nghiem" && q.options && q.options.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      className="flex items-start gap-4 px-6 py-4 rounded-2xl border bg-white/5 border-white/10 text-white/80 text-[0.85em]"
                    >
                      <span className="flex-shrink-0 w-[1.5em] h-[1.5em] rounded-xl flex items-center justify-center font-bold text-[0.8em] bg-white/15 text-white/70">
                        {opt.key}
                      </span>
                      <div className="flex-1 presentation-math">
                        <MathRenderer content={opt.value} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {q.images && q.images.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                  {q.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="max-h-[400px] rounded-2xl border border-white/20 shadow-xl" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Answer Slide */}
          {activePart === 'answer' && (
            <div className="bg-green-500/10 backdrop-blur-sm rounded-3xl p-10 border border-green-400/20 shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 text-green-300 text-[0.6em] font-semibold uppercase tracking-wider">
                <CheckCircle className="w-5 h-5" /> Đáp án
              </div>
              
              {q.question_type === "trac_nghiem" && q.options && q.options.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt) => {
                    const isCorrect = opt.key === q.correct_answer;
                    return (
                      <div
                        key={opt.key}
                        className={cn(
                          "flex items-start gap-4 px-6 py-4 rounded-2xl border transition-all text-[0.85em]",
                          isCorrect
                            ? "bg-green-500/20 border-green-400/50 text-green-200 ring-2 ring-green-400/30"
                            : "bg-white/5 border-white/10 text-white/40 opacity-50"
                        )}
                      >
                        <span className={cn(
                          "flex-shrink-0 w-[1.5em] h-[1.5em] rounded-xl flex items-center justify-center font-bold text-[0.8em]",
                          isCorrect ? "bg-green-500 text-white" : "bg-white/15 text-white/50"
                        )}>
                          {opt.key}
                        </span>
                        <div className="flex-1 presentation-math">
                          <MathRenderer content={opt.value} />
                        </div>
                        {isCorrect && <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-green-100 leading-relaxed presentation-math text-[0.9em]">
                  {q.answer ? <MathRenderer content={q.answer} /> : <span className="opacity-50 italic">Không có nội dung đáp án.</span>}
                </div>
              )}

              {q.answer_images && q.answer_images.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                  {q.answer_images.map((img, i) => (
                    <img key={i} src={img} alt="" className="max-h-[400px] rounded-2xl border border-green-400/30 shadow-xl" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Solution Slide */}
          {activePart === 'solution' && (
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-3xl p-10 border border-blue-400/20 shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 text-blue-300 text-[0.6em] font-semibold uppercase tracking-wider">
                <BookOpen className="w-5 h-5" /> Lời giải chi tiết
              </div>
              <div className="text-blue-100 leading-relaxed presentation-math text-[0.9em]">
                {q.solution ? <MathRenderer content={q.solution} /> : <span className="opacity-50 italic">Không có lời giải chi tiết.</span>}
              </div>
              
              {q.solution_images && q.solution_images.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                  {q.solution_images.map((img, i) => (
                    <img key={i} src={img} alt="" className="max-h-[400px] rounded-2xl border border-blue-400/30 shadow-xl" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom hint bar */}
      <div className="flex items-center justify-center px-6 py-2 bg-black/20 text-white/30 text-xs flex-shrink-0 gap-6">
        <span>Mũi tên trái/phải hoặc Space — Chuyển trang</span>
        <span>F — Toàn màn hình</span>
        <span>+/- — Cỡ chữ</span>
        <span>Esc — Đóng</span>
      </div>

      {/* CSS for presentation mode */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        /* Make KaTeX math white in presentation */
        .presentation-math .katex {
          color: inherit !important;
        }
        .presentation-math .katex .mord,
        .presentation-math .katex .mbin,
        .presentation-math .katex .mrel,
        .presentation-math .katex .mopen,
        .presentation-math .katex .mclose,
        .presentation-math .katex .mpunct,
        .presentation-math .katex .minner {
          color: inherit !important;
        }
      `}</style>
    </div>
  );
}
