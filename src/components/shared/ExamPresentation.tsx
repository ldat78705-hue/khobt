"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, Play, Pause,
  BookOpen, Clock, CheckCircle
} from "lucide-react";
import { MathRenderer } from "@/components/shared/MathRenderer";
import type { Exam, ExamQuestion, Question } from "@/types";
import { getDifficultyLabel, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ExamPresentationProps {
  exam: Exam;
  questions: (ExamQuestion & { question: Question })[];
  onClose: () => void;
}

type SlideType = "cover" | "question" | "end";

export default function ExamPresentation({ exam, questions, onClose }: ExamPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fontSize, setFontSize] = useState(28); // px
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(30); // seconds
  const containerRef = useRef<HTMLDivElement>(null);

  type SlideData = 
    | { type: 'cover' }
    | { type: 'question', qIndex: number, part: 'question' | 'answer' | 'solution' }
    | { type: 'end' };

  const slides: SlideData[] = [{ type: 'cover' }];
  questions.forEach((eq, index) => {
    const q = eq.question;
    slides.push({ type: 'question', qIndex: index, part: 'question' });
    if (q.answer || (q.question_type === 'trac_nghiem' && q.options && q.options.length > 0)) {
      slides.push({ type: 'question', qIndex: index, part: 'answer' });
    }
    if (q.solution) {
      slides.push({ type: 'question', qIndex: index, part: 'solution' });
    }
  });
  slides.push({ type: 'end' });

  const totalSlides = slides.length;
  const currentSlideData = slides[currentSlide];

  // Navigation
  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "Escape":
          e.preventDefault();
          if (isFullscreen) {
            document.exitFullscreen?.();
          } else {
            onClose();
          }
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goToSlide, totalSlides, isFullscreen, onClose]);

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

  // Auto play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= totalSlides - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
    }, autoPlayInterval * 1000);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, totalSlides]);

  const slideType = currentSlideData.type;
  const currentQuestion = currentSlideData.type === 'question' ? questions[currentSlideData.qIndex] : null;
  const activePart = currentSlideData.type === 'question' ? currentSlideData.part : null;

  const settings = exam.settings || {};
  const schoolName = settings.schoolName || settings.school_name || "";
  const examType = settings.examType || settings.exam_type || "";
  const schoolYear = settings.schoolYear || settings.school_year || "";

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
          <span className="font-semibold text-white truncate max-w-[400px]">{exam.title}</span>
          <span className="text-white/40">|</span>
          <span className="text-white/60">Toán {exam.grade}</span>
          {exam.duration && (
            <>
              <span className="text-white/40">|</span>
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-white/60">{exam.duration} phút</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Font size */}
          <button onClick={() => setFontSize((s) => Math.max(18, s - 2))} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Thu nhỏ chữ">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono w-8 text-center">{fontSize}</span>
          <button onClick={() => setFontSize((s) => Math.min(48, s + 2))} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Phóng to chữ">
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/20 mx-1" />
          {/* Auto play */}
          <button
            onClick={() => setAutoPlay((prev) => !prev)}
            className={cn("p-1.5 rounded-lg transition-colors", autoPlay ? "bg-blue-500/30 text-blue-300" : "hover:bg-white/10")}
            title={autoPlay ? "Dừng tự động" : "Tự động chuyển slide"}
          >
            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          {autoPlay && (
            <select
              value={autoPlayInterval}
              onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
              className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs text-white"
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={45}>45s</option>
              <option value={60}>60s</option>
              <option value={90}>90s</option>
              <option value={120}>2 phút</option>
            </select>
          )}
          <div className="w-px h-5 bg-white/20 mx-1" />
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Toàn màn hình (F)">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {/* Reset */}
          <button onClick={() => { goToSlide(0); setFontSize(28); }} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="Về đầu">
            <RotateCcw className="w-4 h-4" />
          </button>
          {/* Close */}
          <button onClick={onClose} className="p-1.5 hover:bg-red-500/30 rounded-lg transition-colors text-white/60 hover:text-red-300" title="Đóng (Esc)">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main slide area */}
      <div className="flex-1 flex items-center justify-center px-8 py-6 overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* ============ COVER SLIDE ============ */}
          {slideType === "cover" && (
            <div className="text-center text-white space-y-8 animate-fadeIn">
              {schoolName && (
                <p className="text-lg tracking-widest uppercase text-white/50 font-medium">{schoolName}</p>
              )}
              <h1 className="text-[2em] font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight">
                {exam.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-white/60 text-[0.65em]">
                <span className="px-4 py-2 bg-white/10 rounded-full">Toán {exam.grade}</span>
                {exam.duration && <span className="px-4 py-2 bg-white/10 rounded-full flex items-center gap-2"><Clock className="w-4 h-4" /> {exam.duration} phút</span>}
                <span className="px-4 py-2 bg-white/10 rounded-full flex items-center gap-2"><BookOpen className="w-4 h-4" /> {questions.length} câu</span>
              </div>
              {examType && <p className="text-white/40 text-[0.6em]">{getQuestionTypeLabel(examType)}{schoolYear ? ` — Năm học ${schoolYear}` : ""}</p>}
              <p className="text-white/30 text-[0.45em] pt-4 animate-pulse">
                Nhấn → hoặc Space để bắt đầu
              </p>
            </div>
          )}

          {/* ============ QUESTION SLIDE ============ */}
          {slideType === "question" && currentQuestion && (() => {
            const q = currentQuestion.question;
            const qIndex = currentSlideData.type === 'question' ? currentSlideData.qIndex : 0;
            return (
              <div className="text-white animate-fadeIn">
                {/* Question header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-[1.8em] h-[1.8em] rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center text-[0.8em] shadow-lg shadow-blue-500/30">
                    {qIndex + 1}
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs font-medium text-white/70">
                    <span className="px-3 py-1 bg-white/10 rounded-full">{(q as any).category_name || getTopicLabel(q.topic)}</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">{getDifficultyLabel(q.difficulty)}</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">{currentQuestion.points} đ</span>
                  </div>
                  <div className="ml-auto text-[0.45em] text-white/30">
                    {qIndex + 1} / {questions.length}
                  </div>
                </div>

                {activePart === 'question' && (
                  <div className="bg-white/[0.07] backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6 text-blue-300 text-[0.6em] font-semibold uppercase tracking-wider">
                      <BookOpen className="w-5 h-5" /> Nội dung bài tập
                    </div>
                    <div className="text-white/95 leading-relaxed presentation-math">
                      <MathRenderer content={q.content} className="leading-relaxed" />
                    </div>

                    {/* MCQ options */}
                    {q.question_type === "trac_nghiem" && q.options && q.options.length > 0 && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt) => (
                          <div
                            key={opt.key}
                            className="flex items-start gap-3 px-5 py-3 rounded-xl border bg-white/5 border-white/10 text-white/80 transition-all text-[0.85em]"
                          >
                            <span className="flex-shrink-0 w-[1.3em] h-[1.3em] rounded-lg flex items-center justify-center font-bold text-[0.7em] bg-white/15 text-white/70">
                              {opt.key}
                            </span>
                            <div className="flex-1 presentation-math">
                              <MathRenderer content={opt.value} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Images */}
                    {q.images && q.images.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {q.images.map((img, i) => (
                          <img key={i} src={img} alt="" className="max-h-[300px] rounded-xl border border-white/20 shadow-lg" />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activePart === 'answer' && (
                  <div className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-400/20 shadow-2xl animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6 text-green-300 text-[0.6em] font-semibold uppercase tracking-wider">
                      <CheckCircle className="w-5 h-5" /> Đáp án
                    </div>
                    
                    {q.question_type === "trac_nghiem" && q.options && q.options.length > 0 ? (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt) => {
                          const isCorrect = opt.key === q.correct_answer;
                          return (
                            <div
                              key={opt.key}
                              className={cn(
                                "flex items-start gap-3 px-5 py-3 rounded-xl border transition-all text-[0.85em]",
                                isCorrect
                                  ? "bg-green-500/20 border-green-400/50 text-green-200 ring-2 ring-green-400/30"
                                  : "bg-white/5 border-white/10 text-white/40 opacity-50"
                              )}
                            >
                              <span className={cn(
                                "flex-shrink-0 w-[1.3em] h-[1.3em] rounded-lg flex items-center justify-center font-bold text-[0.7em]",
                                isCorrect ? "bg-green-500 text-white" : "bg-white/15 text-white/50"
                              )}>
                                {opt.key}
                              </span>
                              <div className="flex-1 presentation-math">
                                <MathRenderer content={opt.value} />
                              </div>
                              {isCorrect && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-green-200/90 presentation-math text-[0.85em]">
                        {q.answer ? <MathRenderer content={q.answer} /> : <span className="opacity-50 italic">Không có nội dung đáp án.</span>}
                      </div>
                    )}
                  </div>
                )}

                {activePart === 'solution' && (
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6 text-blue-300 text-[0.6em] font-semibold uppercase tracking-wider">
                      <BookOpen className="w-5 h-5" /> Lời giải chi tiết
                    </div>
                    <div className="text-blue-200/90 presentation-math text-[0.85em]">
                      {q.solution ? <MathRenderer content={q.solution} /> : <span className="opacity-50 italic">Không có lời giải chi tiết.</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ============ END SLIDE ============ */}
          {slideType === "end" && (
            <div className="text-center text-white space-y-6 animate-fadeIn">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-[1.6em] font-bold text-white">Hết đề!</h2>
              <p className="text-white/50 text-[0.6em]">
                {exam.title} — {questions.length} câu hỏi
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => goToSlide(0)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium text-[0.55em] transition-colors"
                >
                  ← Về trang đầu
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-red-500/80 hover:bg-red-500 rounded-xl text-white font-medium text-[0.55em] transition-colors"
                >
                  Đóng trình chiếu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-sm text-white/60 flex-shrink-0">
        {/* Nav buttons */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          <ChevronLeft className="w-5 h-5" /> Trước
        </button>

        {/* Slide indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[600px] px-2">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                "flex-shrink-0 rounded-full transition-all",
                i === currentSlide
                  ? "w-8 h-3 bg-blue-400"
                  : i === 0 || i === totalSlides - 1
                    ? "w-3 h-3 bg-white/20 hover:bg-white/40"
                    : "w-3 h-3 bg-white/15 hover:bg-white/30"
              )}
              title={slides[i].type === 'cover' ? "Trang bìa" : slides[i].type === 'end' ? "Kết thúc" : `Câu ${slides[i].qIndex + 1} (${slides[i].part})`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Tiếp <ChevronRight className="w-5 h-5" />
        </button>
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
