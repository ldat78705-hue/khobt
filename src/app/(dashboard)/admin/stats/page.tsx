"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { BarChart3, BookOpen, FileText, ThumbsUp, Flag, Users, TrendingUp, Award } from "lucide-react";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { getDifficultyLabel, getTopicLabel } from "@/lib/utils";
import type { Question } from "@/types";

export default function StatsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState({
    total: 0, approved: 0, pending: 0, rejected: 0, draft: 0,
    byGrade: {} as Record<number, number>,
    byTopic: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
    totalLikes: 0, totalReports: 0, totalExams: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      if (isDemoMode) {
        const qs = demoDb.getQuestions({});
        setQuestions(qs);
        const exams = demoDb.getExams();
        const reports = demoDb.getReports();

        const byGrade: Record<number, number> = {};
        const byTopic: Record<string, number> = {};
        const byDifficulty: Record<string, number> = {};

        qs.forEach(q => {
          byGrade[q.grade] = (byGrade[q.grade] || 0) + 1;
          byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
          byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
        });

        setStats({
          total: qs.length,
          approved: qs.filter(q => q.status === 'approved').length,
          pending: qs.filter(q => q.status === 'pending').length,
          rejected: qs.filter(q => q.status === 'rejected').length,
          draft: qs.filter(q => q.status === 'draft').length,
          byGrade, byTopic, byDifficulty,
          totalLikes: 0,
          totalReports: reports.length,
          totalExams: exams.length,
        });
      } else {
        try {
          const [qRes, eRes] = await Promise.all([
            fetch('/api/questions?limit=1000'),
            fetch('/api/exams?limit=200'),
          ]);
          let qs: Question[] = [];
          let examCount = 0;
          if (qRes.ok) {
            const data = await qRes.json();
            qs = data.data || data || [];
            setQuestions(qs);
          }
          if (eRes.ok) {
            const data = await eRes.json();
            examCount = Array.isArray(data) ? data.length : 0;
          }

          const byGrade: Record<number, number> = {};
          const byTopic: Record<string, number> = {};
          const byDifficulty: Record<string, number> = {};

          qs.forEach(q => {
            byGrade[q.grade] = (byGrade[q.grade] || 0) + 1;
            byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
            byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
          });

          setStats({
            total: qs.length,
            approved: qs.filter(q => q.status === 'approved').length,
            pending: qs.filter(q => q.status === 'pending').length,
            rejected: qs.filter(q => q.status === 'rejected').length,
            draft: qs.filter(q => q.status === 'draft').length,
            byGrade, byTopic, byDifficulty,
            totalLikes: 0,
            totalReports: 0,
            totalExams: examCount,
          });
        } catch { /* ignore */ }
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { label: "Tổng bài tập", value: stats.total, icon: BookOpen, color: "bg-blue-50 text-blue-600" },
    { label: "Đã duyệt", value: stats.approved, icon: Award, color: "bg-green-50 text-green-600" },
    { label: "Chờ duyệt", value: stats.pending, icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
    { label: "Đề thi", value: stats.totalExams, icon: FileText, color: "bg-purple-50 text-purple-600" },
    { label: "Báo cáo", value: stats.totalReports, icon: Flag, color: "bg-red-50 text-red-600" },
    { label: "Bản nháp", value: stats.draft, icon: Users, color: "bg-slate-50 text-slate-600" },
  ];

  const maxTopic = Math.max(...Object.values(stats.byTopic), 1);
  const maxDifficulty = Math.max(...Object.values(stats.byDifficulty), 1);

  return (
    <>
      <Header title="Thống kê" subtitle="Tổng quan chất lượng kho bài tập" />
      <div className="p-6 max-w-5xl space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statCards.map(card => (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm text-center">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-2`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* By Topic */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Phân bố theo chuyên đề</h3>
            <div className="space-y-3">
              {Object.entries(stats.byTopic).map(([topic, count]) => (
                <div key={topic} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-28 truncate">{getTopicLabel(topic)}</span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${Math.max((count / maxTopic) * 100, 10)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
              {Object.keys(stats.byTopic).length === 0 && <p className="text-sm text-slate-400">Chưa có dữ liệu</p>}
            </div>
          </div>

          {/* By Difficulty */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Phân bố theo mức độ</h3>
            <div className="space-y-3">
              {Object.entries(stats.byDifficulty).map(([diff, count]) => (
                <div key={diff} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-28 truncate">{getDifficultyLabel(diff)}</span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${Math.max((count / maxDifficulty) * 100, 10)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
              {Object.keys(stats.byDifficulty).length === 0 && <p className="text-sm text-slate-400">Chưa có dữ liệu</p>}
            </div>
          </div>

          {/* By Grade */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Phân bố theo lớp</h3>
            <div className="grid grid-cols-4 gap-3">
              {[6, 7, 8, 9].map(g => (
                <div key={g} className="text-center p-3 bg-slate-50 rounded-xl">
                  <div className="text-xl font-bold text-slate-800">{stats.byGrade[g] || 0}</div>
                  <div className="text-xs text-slate-500">Toán {g}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Trạng thái duyệt</h3>
            <div className="space-y-3">
              {[
                { label: "Đã duyệt", value: stats.approved, color: "bg-green-500", pct: stats.total ? (stats.approved / stats.total * 100) : 0 },
                { label: "Chờ duyệt", value: stats.pending, color: "bg-amber-500", pct: stats.total ? (stats.pending / stats.total * 100) : 0 },
                { label: "Từ chối", value: stats.rejected, color: "bg-red-500", pct: stats.total ? (stats.rejected / stats.total * 100) : 0 },
                { label: "Bản nháp", value: stats.draft, color: "bg-slate-400", pct: stats.total ? (stats.draft / stats.total * 100) : 0 },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-20">{s.label}</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${Math.max(s.pct, 2)}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-12 text-right">{s.value} ({Math.round(s.pct)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
