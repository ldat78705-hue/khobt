"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { BarChart3, BookOpen, FileText, Users, Award, TrendingUp, Flag, Layers, GraduationCap, Target, ArrowRight, FolderTree } from "lucide-react";
import Link from "next/link";
import { getDifficultyLabel, getTopicLabel } from "@/lib/utils";

interface StatsData {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  draft: number;
  byGrade: { grade: number; count: number }[];
  byDifficulty: { difficulty: string; count: number }[];
  byTopic: { topic: string; count: number }[];
  byCategory: { name: string; grade: number; count: number }[];
  totalExams: number;
  totalUsers: number;
  totalCategories: number;
}

const GRADE_COLORS: Record<number, string> = {
  4: 'from-pink-400 to-pink-600',
  5: 'from-rose-400 to-rose-600',
  6: 'from-blue-400 to-blue-600',
  7: 'from-indigo-400 to-indigo-600',
  8: 'from-emerald-400 to-emerald-600',
  9: 'from-amber-400 to-amber-600',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  nhan_biet: '#22c55e',
  thong_hieu: '#3b82f6',
  van_dung: '#f59e0b',
  van_dung_cao: '#ef4444',
};

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState<number | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch { /* ignore */ }
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <>
        <Header title="Thống kê" subtitle="Đang tải dữ liệu..." />
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      </>
    );
  }

  if (!stats) {
    return (
      <>
        <Header title="Thống kê" subtitle="Không tải được dữ liệu" />
        <div className="p-6 text-center text-slate-500">Không thể kết nối đến cơ sở dữ liệu.</div>
      </>
    );
  }

  const maxGrade = Math.max(...stats.byGrade.map(g => g.count), 1);
  const maxDiff = Math.max(...stats.byDifficulty.map(d => d.count), 1);
  const maxTopic = Math.max(...stats.byTopic.map(t => t.count), 1);

  const filteredCategories = gradeFilter
    ? stats.byCategory.filter(c => c.grade === gradeFilter)
    : stats.byCategory;
  const maxCat = Math.max(...filteredCategories.map(c => c.count), 1);

  const overviewCards = [
    { label: "Tổng bài tập", value: stats.total, icon: BookOpen, color: "bg-blue-50 text-blue-600", ring: "ring-blue-100" },
    { label: "Đã duyệt", value: stats.approved, icon: Award, color: "bg-green-50 text-green-600", ring: "ring-green-100" },
    { label: "Chờ duyệt", value: stats.pending, icon: TrendingUp, color: "bg-amber-50 text-amber-600", ring: "ring-amber-100" },
    { label: "Đề thi", value: stats.totalExams, icon: FileText, color: "bg-purple-50 text-purple-600", ring: "ring-purple-100" },
    { label: "Danh mục", value: stats.totalCategories, icon: Layers, color: "bg-indigo-50 text-indigo-600", ring: "ring-indigo-100" },
    { label: "Người dùng", value: stats.totalUsers, icon: Users, color: "bg-cyan-50 text-cyan-600", ring: "ring-cyan-100" },
  ];

  return (
    <>
      <Header title="Thống kê" subtitle="Tổng quan chất lượng kho bài tập" />
      <div className="p-6 max-w-6xl space-y-6">
        {/* Quick link to category audit */}
        <Link
          href="/admin/stats/categories"
          className="flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <FolderTree className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-indigo-800">Rà soát kho bài tập theo danh mục</div>
            <div className="text-sm text-indigo-600/70 mt-0.5">Xem chi tiết số lượng bài tập theo Lớp → Chương → Bài → Dạng bài</div>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </Link>
        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {overviewCards.map(card => (
            <div key={card.label} className={`bg-white rounded-2xl border border-slate-100 p-4 shadow-sm text-center ring-1 ${card.ring} hover:shadow-md transition-shadow`}>
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-2`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{card.value.toLocaleString()}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Status breakdown bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Flag className="w-4 h-4 text-slate-400" /> Trạng thái duyệt bài
          </h3>
          <div className="h-6 rounded-full overflow-hidden flex bg-slate-100">
            {stats.approved > 0 && (
              <div className="bg-green-500 h-full flex items-center justify-center transition-all" style={{ width: `${(stats.approved / stats.total) * 100}%` }}>
                <span className="text-[10px] font-bold text-white px-1">{stats.approved}</span>
              </div>
            )}
            {stats.pending > 0 && (
              <div className="bg-amber-400 h-full flex items-center justify-center transition-all" style={{ width: `${(stats.pending / stats.total) * 100}%` }}>
                <span className="text-[10px] font-bold text-white px-1">{stats.pending}</span>
              </div>
            )}
            {stats.rejected > 0 && (
              <div className="bg-red-400 h-full flex items-center justify-center transition-all" style={{ width: `${(stats.rejected / stats.total) * 100}%` }}>
                <span className="text-[10px] font-bold text-white px-1">{stats.rejected}</span>
              </div>
            )}
            {stats.draft > 0 && (
              <div className="bg-slate-300 h-full flex items-center justify-center transition-all" style={{ width: `${(stats.draft / stats.total) * 100}%` }}>
                <span className="text-[10px] font-bold text-slate-600 px-1">{stats.draft}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Đã duyệt ({Math.round((stats.approved / stats.total) * 100)}%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Chờ duyệt ({Math.round((stats.pending / stats.total) * 100)}%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> Từ chối</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Bản nháp</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* By Grade */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-500" /> Phân bố theo lớp
            </h3>
            <div className="space-y-3">
              {stats.byGrade.map(({ grade, count }) => {
                const pct = (count / maxGrade) * 100;
                const colorClass = GRADE_COLORS[grade] || 'from-gray-400 to-gray-600';
                return (
                  <div key={grade} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600 w-14">Lớp {grade}</span>
                    <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-end pr-2 transition-all duration-500`}
                        style={{ width: `${Math.max(pct, 8)}%` }}
                      >
                        <span className="text-xs font-bold text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Difficulty */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-500" /> Phân bố theo mức độ
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.byDifficulty.map(({ difficulty, count }) => {
                const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={difficulty} className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-2xl font-bold" style={{ color: DIFFICULTY_COLORS[difficulty] || '#64748b' }}>{count}</div>
                    <div className="text-xs text-slate-600 mt-1 font-medium">{getDifficultyLabel(difficulty)}</div>
                    <div className="text-xs text-slate-400">{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Topic */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" /> Phân bố theo chuyên đề
            </h3>
            <div className="space-y-3">
              {stats.byTopic.map(({ topic, count }) => {
                const pct = (count / maxTopic) * 100;
                return (
                  <div key={topic} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-28 truncate" title={getTopicLabel(topic)}>{getTopicLabel(topic)}</span>
                    <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${Math.max(pct, 10)}%` }}
                      >
                        <span className="text-[10px] font-bold text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {stats.byTopic.length === 0 && <p className="text-sm text-slate-400">Chưa có dữ liệu</p>}
            </div>
          </div>

          {/* By Category - with grade filter */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" /> Chi tiết theo danh mục
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => setGradeFilter(null)}
                  className={`px-2 py-1 text-xs rounded-lg transition-all ${!gradeFilter ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  Tất cả
                </button>
                {stats.byGrade.map(({ grade }) => (
                  <button
                    key={grade}
                    onClick={() => setGradeFilter(grade)}
                    className={`px-2 py-1 text-xs rounded-lg transition-all ${gradeFilter === grade ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredCategories.slice(0, 20).map(({ name, grade, count }, i) => {
                const pct = (count / maxCat) * 100;
                return (
                  <div key={`${name}-${grade}-${i}`} className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-slate-400 w-6">L{grade}</span>
                    <span className="text-xs text-slate-600 w-32 truncate" title={name}>{name}</span>
                    <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full flex items-center justify-end pr-1.5 transition-all"
                        style={{ width: `${Math.max(pct, 8)}%` }}
                      >
                        <span className="text-[9px] font-bold text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredCategories.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Chưa có dữ liệu</p>}
              {filteredCategories.length > 20 && (
                <p className="text-xs text-slate-400 text-center pt-2">Và {filteredCategories.length - 20} danh mục khác...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
