"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sparkles, Shuffle, Settings2, FileText, ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { GRADES, TOPICS, DIFFICULTIES } from "@/types";
import type { Grade, Topic, Difficulty, Question } from "@/types";
import { cn, getDifficultyLabel, getDifficultyColor, getTopicLabel, getQuestionTypeLabel } from "@/lib/utils";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { QuestionContent } from "@/components/shared/MathRenderer";

export default function AutoExamPage() {
  const router = useRouter();
  const [step, setStep] = useState<'config' | 'preview'>('config');
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState<Grade>(9);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [duration, setDuration] = useState(90);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [useMatrix, setUseMatrix] = useState(false);
  const [matrix, setMatrix] = useState({ nhan_biet: 20, thong_hieu: 30, van_dung: 30, van_dung_cao: 20 });

  const toggleTopic = (t: Topic) => {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const toggleDifficulty = (d: Difficulty) => {
    setDifficulties(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const updateMatrix = (key: string, value: number) => {
    setMatrix(prev => ({ ...prev, [key]: value }));
  };

  const matrixTotal = matrix.nhan_biet + matrix.thong_hieu + matrix.van_dung + matrix.van_dung_cao;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      if (isDemoMode) {
        let pool = demoDb.getQuestions({ grade }).filter(q => q.status === 'approved');
        if (topics.length > 0) pool = pool.filter(q => topics.includes(q.topic));

        let result: Question[] = [];

        if (useMatrix && matrixTotal > 0) {
          const levels: Difficulty[] = ['nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'];
          levels.forEach(level => {
            const ratio = matrix[level] / matrixTotal;
            const count = Math.round(questionCount * ratio);
            const levelPool = pool.filter(q => q.difficulty === level);
            const shuffled = [...levelPool].sort(() => Math.random() - 0.5);
            result.push(...shuffled.slice(0, count));
          });
          result = result.slice(0, questionCount);
        } else {
          if (difficulties.length > 0) pool = pool.filter(q => difficulties.includes(q.difficulty));
          const shuffled = [...pool].sort(() => Math.random() - 0.5);
          result = shuffled.slice(0, Math.min(questionCount, shuffled.length));
        }

        setGeneratedQuestions(result);
      } else {
        // Production: fetch from API
        const params = new URLSearchParams();
        params.set('grade', String(grade));
        params.set('status', 'approved');
        params.set('limit', '200');
        if (topics.length > 0) params.set('topic', topics[0]);

        const res = await fetch(`/api/questions?${params}`);
        if (res.ok) {
          const data = await res.json();
          let pool: Question[] = data.data || data || [];
          if (topics.length > 1) pool = pool.filter(q => topics.includes(q.topic));

          let result: Question[] = [];
          if (useMatrix && matrixTotal > 0) {
            const levels: Difficulty[] = ['nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'];
            levels.forEach(level => {
              const ratio = matrix[level] / matrixTotal;
              const count = Math.round(questionCount * ratio);
              const levelPool = pool.filter(q => q.difficulty === level);
              const shuffled = [...levelPool].sort(() => Math.random() - 0.5);
              result.push(...shuffled.slice(0, count));
            });
            result = result.slice(0, questionCount);
          } else {
            if (difficulties.length > 0) pool = pool.filter(q => difficulties.includes(q.difficulty));
            const shuffled = [...pool].sort(() => Math.random() - 0.5);
            result = shuffled.slice(0, Math.min(questionCount, shuffled.length));
          }
          setGeneratedQuestions(result);
        }
      }
      setStep('preview');
      toast.success("Đã tạo đề thi tự động!");
    } catch {
      toast.error("Không thể tạo đề thi");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveExam = async () => {
    if (!title.trim()) { toast.error("Vui lòng nhập tên đề thi"); return; }
    if (isDemoMode) {
      const exam = demoDb.createExam({
        title, grade, duration, question_count: generatedQuestions.length,
        description: "Đề thi tạo tự động",
      });
      generatedQuestions.forEach((q, i) => {
        demoDb.addExamQuestion(exam.id, q.id);
      });
      toast.success("Đã lưu đề thi!");
      router.push(`/exams/${exam.id}`);
    } else {
      try {
        // Create exam
        const res = await fetch('/api/exams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title, grade, duration, question_count: generatedQuestions.length,
            description: "Đề thi tạo tự động",
          }),
        });
        if (!res.ok) throw new Error('Lỗi tạo đề');
        const exam = await res.json();

        // Add questions to exam
        for (const q of generatedQuestions) {
          await fetch('/api/exam-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exam_id: exam.id, question_id: q.id }),
          });
        }

        toast.success("Đã lưu đề thi!");
        router.push(`/exams/${exam.id}`);
      } catch {
        toast.error("Không thể lưu đề thi");
      }
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
    toast.success("Đã tạo lại đề mới!");
  };

  const removeQuestion = (id: string) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <>
      <Header title="Tạo đề thi tự động" />
      <div className="p-6 max-w-4xl space-y-6">
        {step === 'config' ? (
          <>
            {/* Config header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-lg font-bold">Tạo đề thi thông minh</h2>
              </div>
              <p className="text-blue-100 text-sm">Hệ thống sẽ chọn bài tập ngẫu nhiên từ kho theo tiêu chí của bạn.</p>
            </div>

            {/* Config form */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tên đề thi</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="VD: Đề kiểm tra giữa kỳ 1 Toán 9"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Lớp</label>
                  <select value={grade} onChange={e => setGrade(Number(e.target.value) as Grade)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500">
                    {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Số câu</label>
                  <input type="number" value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} min={1} max={50} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Thời gian (phút)</label>
                  <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min={15} max={180} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Chuyên đề (bỏ trống = tất cả)</label>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(t => (
                    <button
                      key={t.value}
                      onClick={() => toggleTopic(t.value)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
                        topics.includes(t.value) ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mức độ (bỏ trống = tất cả)</label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d.value}
                      onClick={() => toggleDifficulty(d.value)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
                        difficulties.includes(d.value) ? "border-green-400 bg-green-50 text-green-700" : "border-slate-200 text-slate-500 hover:border-green-300"
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matrix mode */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700">📊 Đề theo ma trận mức độ</label>
                  <button
                    type="button"
                    onClick={() => setUseMatrix(!useMatrix)}
                    className={cn(
                      "w-11 h-6 rounded-full transition-colors relative",
                      useMatrix ? "bg-blue-500" : "bg-slate-300"
                    )}
                  >
                    <span className={cn(
                      "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                      useMatrix ? "translate-x-5" : "translate-x-0.5"
                    )} />
                  </button>
                </div>
                {useMatrix && (
                  <div className="space-y-3 mt-3">
                    <p className="text-xs text-slate-500">Thiết lập tỉ lệ phần trăm cho mỗi mức độ. Tổng không cần bằng 100%.</p>
                    {[
                      { key: 'nhan_biet', label: 'Nhận biết', color: 'bg-green-500', value: matrix.nhan_biet },
                      { key: 'thong_hieu', label: 'Thông hiểu', color: 'bg-blue-500', value: matrix.thong_hieu },
                      { key: 'van_dung', label: 'Vận dụng', color: 'bg-amber-500', value: matrix.van_dung },
                      { key: 'van_dung_cao', label: 'Vận dụng cao', color: 'bg-red-500', value: matrix.van_dung_cao },
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-600 w-24">{item.label}</span>
                        <input
                          type="range"
                          min={0} max={100} step={5}
                          value={item.value}
                          onChange={e => updateMatrix(item.key, Number(e.target.value))}
                          className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-700 w-10 text-right">{item.value}%</span>
                        <span className="text-xs text-slate-400 w-14 text-right">
                          ~{Math.round(questionCount * item.value / (matrixTotal || 1))} câu
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-xs text-slate-500">Tổng tỉ lệ: {matrixTotal}%</span>
                      <span className="text-xs font-medium text-blue-600">≈ {questionCount} câu</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-md disabled:opacity-50 transition-all"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {useMatrix ? "Tạo đề theo ma trận" : "Tạo đề thi"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Preview */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">{title || "Đề thi tự động"}</h2>
                <p className="text-sm text-slate-500">{generatedQuestions.length} câu • {duration} phút • Toán {grade}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setStep('config')} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">
                  <Settings2 className="w-4 h-4 inline mr-1" /> Sửa cấu hình
                </button>
                <button onClick={handleRegenerate} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100">
                  <Shuffle className="w-4 h-4 inline mr-1" /> Tạo lại
                </button>
              </div>
            </div>

            {generatedQuestions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Không tìm thấy bài tập phù hợp. Thử thay đổi tiêu chí.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {generatedQuestions.map((q, i) => (
                  <div key={q.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm group">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <QuestionContent content={q.content} images={q.images} className="text-sm text-slate-800 line-clamp-3" />
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{getTopicLabel(q.topic)}</span>
                          <span className="px-2 py-0.5 text-xs font-medium bg-purple-50 text-purple-600 rounded-full">{getQuestionTypeLabel(q.question_type)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeQuestion(q.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" title="Bỏ câu này">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {generatedQuestions.length > 0 && (
              <button
                onClick={handleSaveExam}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-green-600 hover:bg-green-700 shadow-md transition-all"
              >
                <FileText className="w-4 h-4" /> Lưu thành đề thi <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
