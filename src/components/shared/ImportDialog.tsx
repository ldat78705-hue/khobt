"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Loader2, X, Check, AlertCircle } from "lucide-react";
import { MathRenderer } from "@/components/shared/MathRenderer";
import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import type { Grade, Topic, Difficulty } from "@/types";

interface ImportQuestion {
  content: string;
  answer?: string;
  solution?: string;
}

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: () => void;
  defaultGrade?: Grade;
  defaultTopic?: Topic;
  defaultDifficulty?: Difficulty;
}

function parseQuestions(text: string): ImportQuestion[] {
  const questions: ImportQuestion[] = [];
  // Split by "Bài X" or "Câu X" or numbered patterns like "1." "2." etc
  const blocks = text.split(/(?=^(?:Bài|Câu|Bai)\s*\d+[.:)\s]|^\d+[.)]\s)/im).filter(b => b.trim());
  
  for (const block of blocks) {
    const lines = block.trim();
    if (lines.length < 10) continue; // too short to be a question
    
    // Try to extract answer section
    const answerMatch = lines.match(/(?:^|\n)(?:Đáp án|Trả lời|Answer|ĐA)[:\s]*([\s\S]*?)(?:(?:^|\n)(?:Lời giải|Giải|Solution)|$)/im);
    const solutionMatch = lines.match(/(?:^|\n)(?:Lời giải|Giải|Solution)[:\s]*([\s\S]*?)$/im);
    
    let content = lines;
    let answer: string | undefined;
    let solution: string | undefined;
    
    if (answerMatch) {
      content = lines.substring(0, answerMatch.index!).trim();
      answer = answerMatch[1].trim();
    }
    if (solutionMatch) {
      if (!answerMatch) content = lines.substring(0, solutionMatch.index!).trim();
      solution = solutionMatch[1].trim();
    }
    
    // Clean up content: remove leading "Bài X:" or "1." prefix
    content = content.replace(/^(?:Bài|Câu|Bai)\s*\d+[.:)\s]*/i, '').trim();
    content = content.replace(/^\d+[.)]\s*/, '').trim();
    
    if (content.length > 5) {
      questions.push({ content, answer, solution });
    }
  }
  
  return questions;
}

export function ImportDialog({ isOpen, onClose, onImported, defaultGrade = 9, defaultTopic = 'so_hoc', defaultDifficulty = 'thong_hieu' }: ImportDialogProps) {
  const [rawText, setRawText] = useState("");
  const [parsedQuestions, setParsedQuestions] = useState<ImportQuestion[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [isParsed, setIsParsed] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setRawText(text);
    handleParse(text);
  };

  const handleParse = (text?: string) => {
    const input = text || rawText;
    const questions = parseQuestions(input);
    setParsedQuestions(questions);
    setSelectedIndices(new Set(questions.map((_, i) => i)));
    setIsParsed(true);
    if (questions.length === 0) {
      toast.error("Không tìm thấy bài tập nào trong nội dung.");
    } else {
      toast.success(`Tìm thấy ${questions.length} bài tập`);
    }
  };

  const toggleSelect = (index: number) => {
    const next = new Set(selectedIndices);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelectedIndices(next);
  };

  const handleImport = async () => {
    const toImport = parsedQuestions.filter((_, i) => selectedIndices.has(i));
    if (toImport.length === 0) { toast.error("Chọn ít nhất 1 bài tập"); return; }

    setIsImporting(true);
    try {
      if (isDemoMode) {
        for (const q of toImport) {
          demoDb.createQuestion({
            content: q.content,
            answer: q.answer,
            solution: q.solution,
            grade: defaultGrade,
            topic: defaultTopic,
            difficulty: defaultDifficulty,
            question_type: 'tu_luan',
            is_public: false,
            status: 'pending',
          });
        }
      } else {
        // Production mode: use API
        let imported = 0;
        for (const q of toImport) {
          const res = await fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: q.content,
              answer: q.answer || null,
              solution: q.solution || null,
              grade: defaultGrade,
              topic: defaultTopic,
              difficulty: defaultDifficulty,
              question_type: 'tu_luan',
              is_public: false,
              status: 'pending',
            }),
          });
          if (res.ok) imported++;
        }
        if (imported < toImport.length) {
          toast.warning(`Đã nhập ${imported}/${toImport.length} bài (một số bị lỗi)`);
        }
      }

      toast.success(`Đã nhập ${toImport.length} bài tập!`);
      onImported();
      onClose();
      setRawText("");
      setParsedQuestions([]);
      setIsParsed(false);
    } catch (err) {
      console.error(err);
      toast.error("Không thể nhập bài tập");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[800px] max-h-[85vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Nhập bài tập</h2>
            <p className="text-sm text-slate-500">Nhập từ file text/Markdown hoặc dán nội dung</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-5 space-y-4">
          {!isParsed ? (
            <>
              {/* File upload + paste */}
              <div className="flex gap-3">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Chọn file (.txt, .md)
                </button>
                <input ref={fileRef} type="file" accept=".txt,.md,.text" className="hidden" onChange={handleFileLoad} />
              </div>
              
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Định dạng: Mỗi bài bắt đầu bằng "Bài X:" hoặc "1." — Hỗ trợ LaTeX ($...$)
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={`Dán nội dung bài tập vào đây...\n\nBài 1: Rút gọn biểu thức $P = \\frac{\\sqrt{x}+1}{\\sqrt{x}-2}$\nĐáp án: $P = ...$\nLời giải: ...\n\nBài 2: Giải phương trình $x^2 - 5x + 6 = 0$\nĐáp án: $x = 2, x = 3$`}
                rows={12}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
              />
              
              <button
                onClick={() => handleParse()}
                disabled={!rawText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl hover:opacity-90 disabled:opacity-50 shadow-sm"
              >
                <FileText className="w-4 h-4" /> Phân tích nội dung
              </button>
            </>
          ) : (
            <>
              {/* Parsed results */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  Đã chọn <strong>{selectedIndices.size}</strong> / {parsedQuestions.length} bài tập
                </span>
                <button onClick={() => { setIsParsed(false); setParsedQuestions([]); }} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  ← Quay lại
                </button>
              </div>
              
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {parsedQuestions.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => toggleSelect(i)}
                    className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                      selectedIndices.has(i) ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedIndices.has(i) ? 'bg-blue-500 text-white' : 'border-2 border-slate-300'
                      }`}>
                        {selectedIndices.has(i) && <Check className="w-3 h-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-slate-800 line-clamp-3 whitespace-pre-wrap"><MathRenderer content={q.content} /></div>
                        {q.answer && (
                          <div className="mt-2 text-xs text-green-600 font-medium">Đáp án: <MathRenderer content={q.answer.substring(0, 80) + '...'} /></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {isParsed && parsedQuestions.length > 0 && (
          <div className="p-5 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={handleImport}
              disabled={isImporting || selectedIndices.size === 0}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl hover:opacity-90 disabled:opacity-50 shadow-md shadow-blue-500/25"
            >
              {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isImporting ? "Đang nhập..." : `Nhập ${selectedIndices.size} bài tập`}
            </button>
            <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">
              Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
