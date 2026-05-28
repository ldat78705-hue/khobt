"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  ChevronDown, ChevronRight, BookOpen, GraduationCap,
  Layers, Target, FileText, CheckCircle, AlertTriangle,
  BarChart3, Search, ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface CategoryNode {
  id: string;
  name: string;
  total: number;
  byDifficulty: Record<string, number>;
  byType: Record<string, number>;
  subLessons?: CategoryNode[];
}

interface ChapterData extends CategoryNode {
  lessons: CategoryNode[];
}

interface GradeData {
  grade: number;
  total: number;
  byDifficulty: Record<string, number>;
  byType: Record<string, number>;
  chapters: ChapterData[];
}

const DIFF_CONFIG: { key: string; label: string; short: string; color: string; bg: string; ring: string }[] = [
  { key: "nhan_biet", label: "Nhận biết", short: "NB", color: "text-emerald-700", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  { key: "thong_hieu", label: "Thông hiểu", short: "TH", color: "text-blue-700", bg: "bg-blue-50", ring: "ring-blue-200" },
  { key: "van_dung", label: "Vận dụng", short: "VD", color: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-200" },
  { key: "van_dung_cao", label: "Vận dụng cao", short: "VDC", color: "text-red-700", bg: "bg-red-50", ring: "ring-red-200" },
];

const TYPE_CONFIG: { key: string; label: string; short: string }[] = [
  { key: "trac_nghiem", label: "Trắc nghiệm", short: "TN" },
  { key: "tu_luan", label: "Tự luận", short: "TL" },
  { key: "dung_sai", label: "Đúng/Sai", short: "ĐS" },
  { key: "dien_dap_an", label: "Điền đáp án", short: "ĐĐA" },
];

const GRADE_COLORS: Record<number, { gradient: string; text: string; bg: string; border: string }> = {
  4: { gradient: "from-pink-500 to-rose-500", text: "text-pink-700", bg: "bg-pink-50", border: "border-pink-200" },
  5: { gradient: "from-rose-500 to-red-500", text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
  6: { gradient: "from-blue-500 to-indigo-500", text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  7: { gradient: "from-indigo-500 to-violet-500", text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
  8: { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  9: { gradient: "from-amber-500 to-orange-500", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
};

function DiffBadges({ byDifficulty, size = "sm" }: { byDifficulty: Record<string, number>; size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <div className={`flex flex-wrap gap-1 ${isSmall ? "" : "gap-1.5"}`}>
      {DIFF_CONFIG.map(d => {
        const count = byDifficulty[d.key] || 0;
        if (count === 0 && isSmall) return null;
        return (
          <span
            key={d.key}
            className={`inline-flex items-center gap-0.5 rounded-md ring-1 font-medium ${d.bg} ${d.color} ${d.ring} ${
              isSmall ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
            } ${count === 0 ? "opacity-40" : ""}`}
            title={d.label}
          >
            <span className="font-semibold">{d.short}</span>
            <span>{count}</span>
          </span>
        );
      })}
    </div>
  );
}

function TypeBadges({ byType }: { byType: Record<string, number> }) {
  const hasAny = TYPE_CONFIG.some(t => (byType[t.key] || 0) > 0);
  if (!hasAny) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {TYPE_CONFIG.map(t => {
        const count = byType[t.key] || 0;
        if (count === 0) return null;
        return (
          <span
            key={t.key}
            className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 ring-1 ring-slate-200"
            title={t.label}
          >
            <span className="font-semibold">{t.short}</span>
            <span>{count}</span>
          </span>
        );
      })}
    </div>
  );
}

function DiffBar({ byDifficulty, total }: { byDifficulty: Record<string, number>; total: number }) {
  if (total === 0) return <div className="h-2 w-full bg-slate-100 rounded-full" />;
  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];
  return (
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
      {DIFF_CONFIG.map((d, i) => {
        const count = byDifficulty[d.key] || 0;
        if (count === 0) return null;
        return (
          <div
            key={d.key}
            className="h-full transition-all duration-500"
            style={{ width: `${(count / total) * 100}%`, backgroundColor: colors[i] }}
            title={`${d.label}: ${count}`}
          />
        );
      })}
    </div>
  );
}

function LessonRow({ lesson, isSubLesson = false }: { lesson: CategoryNode; isSubLesson?: boolean }) {
  const isEmpty = lesson.total === 0;
  return (
    <div
      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
        isSubLesson ? "ml-6 bg-slate-25" : "hover:bg-slate-50"
      } ${isEmpty ? "opacity-50" : ""}`}
    >
      <div className="flex-shrink-0">
        {isEmpty ? (
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm ${isEmpty ? "text-slate-400" : "text-slate-700"}`}>
          {lesson.name}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <DiffBadges byDifficulty={lesson.byDifficulty} />
        <TypeBadges byType={lesson.byType} />
        <span className={`text-sm font-bold min-w-[2.5rem] text-right ${
          isEmpty ? "text-slate-300" : "text-slate-800"
        }`}>
          {lesson.total}
        </span>
      </div>
    </div>
  );
}

function ChapterCard({ chapter, gradeColor }: { chapter: ChapterData; gradeColor: typeof GRADE_COLORS[4] }) {
  const [isOpen, setIsOpen] = useState(true);
  const isEmpty = chapter.total === 0;

  return (
    <div className={`rounded-xl border transition-all ${
      isEmpty ? "border-slate-100 bg-slate-50/50" : "border-slate-200 bg-white shadow-sm"
    }`}>
      {/* Chapter header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50/50 rounded-xl transition-colors"
      >
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </div>
        <Layers className={`w-4 h-4 flex-shrink-0 ${isEmpty ? "text-slate-300" : gradeColor.text}`} />
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-semibold ${isEmpty ? "text-slate-400" : "text-slate-800"}`}>
            {chapter.name}
          </div>
          <div className="mt-1">
            <DiffBar byDifficulty={chapter.byDifficulty} total={chapter.total} />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <DiffBadges byDifficulty={chapter.byDifficulty} size="md" />
          <div className={`text-right ml-2 px-3 py-1 rounded-lg ${isEmpty ? "bg-slate-100" : gradeColor.bg}`}>
            <div className={`text-lg font-bold ${isEmpty ? "text-slate-300" : gradeColor.text}`}>
              {chapter.total}
            </div>
            <div className="text-[10px] text-slate-400">câu</div>
          </div>
        </div>
      </button>

      {/* Lessons */}
      {isOpen && chapter.lessons.length > 0 && (
        <div className="px-3 pb-3 border-t border-slate-100">
          <div className="divide-y divide-slate-50">
            {chapter.lessons.map(lesson => (
              <div key={lesson.id}>
                <LessonRow lesson={lesson} />
                {lesson.subLessons && lesson.subLessons.length > 0 && lesson.subLessons.map(sub => (
                  <LessonRow key={sub.id} lesson={sub} isSubLesson />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GradeSection({ data }: { data: GradeData }) {
  const [isOpen, setIsOpen] = useState(true);
  const colors = GRADE_COLORS[data.grade] || GRADE_COLORS[9];

  return (
    <div className="space-y-3">
      {/* Grade header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 ${colors.border} ${colors.bg} text-left transition-all hover:shadow-md`}
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-lg font-bold ${colors.text}`}>
            Toán lớp {data.grade}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <DiffBadges byDifficulty={data.byDifficulty} size="md" />
          </div>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {TYPE_CONFIG.map(t => {
              const count = data.byType[t.key] || 0;
              if (count === 0) return null;
              return (
                <span key={t.key} className="text-xs text-slate-500">
                  {t.label}: <span className="font-semibold text-slate-700">{count}</span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className={`text-3xl font-black ${colors.text}`}>{data.total}</div>
            <div className="text-xs text-slate-500">câu hỏi</div>
          </div>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Chapters */}
      {isOpen && (
        <div className="space-y-2 pl-2">
          {data.chapters.map(chapter => (
            <ChapterCard key={chapter.id} chapter={chapter} gradeColor={colors} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryAuditPage() {
  const [data, setData] = useState<GradeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/stats/categories");
        if (!res.ok) throw new Error("Lỗi tải dữ liệu");
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    load();
  }, []);

  // Grand totals
  const grandTotal = useMemo(() => data.reduce((s, g) => s + g.total, 0), [data]);
  const grandByDiff = useMemo(() => {
    const result: Record<string, number> = {};
    for (const g of data) {
      for (const [k, v] of Object.entries(g.byDifficulty)) {
        result[k] = (result[k] || 0) + v;
      }
    }
    return result;
  }, [data]);

  // Filter
  const filtered = useMemo(() => {
    let result = data;
    if (selectedGrade) result = result.filter(g => g.grade === selectedGrade);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.map(g => ({
        ...g,
        chapters: g.chapters
          .map(ch => ({
            ...ch,
            lessons: ch.lessons.filter(l =>
              l.name.toLowerCase().includes(q) ||
              (l.subLessons || []).some(s => s.name.toLowerCase().includes(q))
            ),
          }))
          .filter(ch => ch.name.toLowerCase().includes(q) || ch.lessons.length > 0),
      })).filter(g => g.chapters.length > 0);
    }
    return result;
  }, [data, selectedGrade, search]);

  if (loading) {
    return (
      <>
        <Header title="Rà soát kho bài tập" subtitle="Đang tải..." />
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Rà soát kho bài tập" subtitle="Lỗi" />
        <div className="p-6 text-center text-red-500">{error}</div>
      </>
    );
  }

  return (
    <>
      <Header title="Rà soát kho bài tập" subtitle="Thống kê chi tiết theo Lớp → Chương → Bài → Dạng bài" />
      <div className="p-6 max-w-5xl space-y-6">
        {/* Back link */}
        <Link href="/admin/stats" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại Thống kê
        </Link>

        {/* Grand summary */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-slate-300 mb-1">Tổng số câu hỏi đã duyệt</div>
              <div className="text-4xl font-black">{grandTotal.toLocaleString()}</div>
            </div>
            <div className="flex gap-3">
              {DIFF_CONFIG.map(d => (
                <div key={d.key} className="text-center">
                  <div className="text-2xl font-bold">{(grandByDiff[d.key] || 0).toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Mini bar */}
          <div className="mt-4">
            <DiffBar byDifficulty={grandByDiff} total={grandTotal} />
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
            {DIFF_CONFIG.map((d, i) => {
              const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];
              const pct = grandTotal ? Math.round(((grandByDiff[d.key] || 0) / grandTotal) * 100) : 0;
              return (
                <span key={d.key} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: colors[i] }} />
                  {d.label} ({pct}%)
                </span>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm chương, bài..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setSelectedGrade(null)}
              className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                !selectedGrade ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Tất cả
            </button>
            {data.map(g => {
              const colors = GRADE_COLORS[g.grade] || GRADE_COLORS[9];
              return (
                <button
                  key={g.grade}
                  onClick={() => setSelectedGrade(selectedGrade === g.grade ? null : g.grade)}
                  className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                    selectedGrade === g.grade
                      ? `bg-gradient-to-r ${colors.gradient} text-white shadow-md`
                      : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Lớp {g.grade}
                  <span className="ml-1 opacity-70">({g.total})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grade sections */}
        <div className="space-y-8">
          {filtered.map(gradeData => (
            <GradeSection key={gradeData.grade} data={gradeData} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy kết quả</p>
          </div>
        )}
      </div>
    </>
  );
}
