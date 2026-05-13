"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { BookOpen, FileText, FolderOpen, TrendingUp, Plus, ArrowRight, Clock, Sparkles, CheckCircle, Download, BarChart3, Target } from "lucide-react";
import Link from "next/link";
import { isDemoMode, demoDb } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { QuestionContent } from "@/components/shared/MathRenderer";
import { formatDate, getDifficultyLabel, getDifficultyColor, getTopicLabel } from "@/lib/utils";
import { DIFFICULTIES, TOPICS } from "@/types";
import type { Question } from "@/types";

export default function DashboardPage() {
  const [questionCount, setQuestionCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [recentQuestions, setRecentQuestions] = useState<Question[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [gradeDistribution, setGradeDistribution] = useState<Record<number, number>>({});
  const [difficultyDistribution, setDifficultyDistribution] = useState<Record<string, number>>({});
  const [topicDistribution, setTopicDistribution] = useState<{ topic: string; count: number }[]>([]);

  const fetchStats = useCallback(async () => {
    if (isDemoMode) {
      const qs = demoDb.getQuestions();
      setQuestionCount(qs.length);
      setExamCount(demoDb.getExams().length);
      setFolderCount(demoDb.getFolders().length);
      setPendingCount(qs.filter(q => q.status === 'pending').length);
      setRecentQuestions(qs.slice(0, 5));

      // Grade distribution
      const gd: Record<number, number> = {};
      qs.forEach(q => { gd[q.grade] = (gd[q.grade] || 0) + 1; });
      setGradeDistribution(gd);

      // Difficulty distribution
      const dd: Record<string, number> = {};
      qs.forEach(q => { dd[q.difficulty] = (dd[q.difficulty] || 0) + 1; });
      setDifficultyDistribution(dd);

      // Topic distribution (top 6)
      const td: Record<string, number> = {};
      qs.forEach(q => { td[q.topic] = (td[q.topic] || 0) + 1; });
      const sorted = Object.entries(td).sort((a, b) => b[1] - a[1]).slice(0, 6);
      setTopicDistribution(sorted.map(([topic, count]) => ({ topic, count })));
    } else {
      const supabase = createClient();
      const [qRes, eRes, fRes] = await Promise.all([
        supabase.from("questions").select("*", { count: "exact", head: false }).order("created_at", { ascending: false }).limit(5),
        supabase.from("exams").select("*", { count: "exact", head: true }),
        supabase.from("folders").select("*", { count: "exact", head: true }),
      ]);
      setQuestionCount(qRes.count || 0);
      setExamCount(eRes.count || 0);
      setFolderCount(fRes.count || 0);
      setRecentQuestions(qRes.data || []);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const stats = [
    { label: "Bài tập", value: questionCount, icon: BookOpen, color: "bg-blue-500", desc: "Trong kho" },
    { label: "Đề thi", value: examCount, icon: FileText, color: "bg-indigo-500", desc: "Đã tạo" },
    { label: "Chờ duyệt", value: pendingCount, icon: CheckCircle, color: "bg-amber-500", desc: "Bài tập" },
    { label: "Thư mục", value: folderCount, icon: FolderOpen, color: "bg-purple-500", desc: "Phân loại" },
  ];

  const quickActions = [
    { label: "Thêm bài tập", desc: "Tạo bài tập mới", href: "/questions/new", icon: BookOpen, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Tạo đề thi", desc: "Soạn đề thi mới", href: "/exams/new", icon: FileText, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    { label: "Tạo đề tự động", desc: "Tạo đề thông minh", href: "/exams/auto", icon: Sparkles, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { label: "Xuất bài tập", desc: "Chọn & xuất nhanh", href: "/questions/export", icon: Download, color: "bg-green-50 text-green-600 border-green-100" },
  ];

  const maxGrade = Math.max(...Object.values(gradeDistribution), 1);
  const maxTopic = Math.max(...topicDistribution.map(t => t.count), 1);

  const difficultyColors: Record<string, string> = {
    nhan_biet: '#22c55e',
    thong_hieu: '#3b82f6',
    van_dung: '#f59e0b',
    van_dung_cao: '#ef4444',
  };

  return (
    <>
      <Header title="Tổng quan" subtitle="Chào mừng bạn đến với KhoDeToán" />
      <div className="p-6 space-y-6">
        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">Chế độ Demo</p>
              <p className="text-xs text-amber-600">Dữ liệu lưu trên trình duyệt. Cấu hình Supabase trong .env.local để dùng database thực.</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className={`group flex items-center gap-4 p-5 rounded-2xl border ${action.color} hover:shadow-md transition-all hover:-translate-y-0.5`}>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{action.label}</div>
                  <div className="text-sm opacity-70">{action.desc}</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Grade distribution */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-slate-800">Phân bố theo lớp</h3>
            </div>
            <div className="space-y-3">
              {[6, 7, 8, 9].map(grade => {
                const count = gradeDistribution[grade] || 0;
                const pct = maxGrade > 0 ? (count / maxGrade) * 100 : 0;
                return (
                  <div key={grade} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500 w-12">Lớp {grade}</span>
                    <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 flex items-center justify-end pr-2"
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

          {/* Difficulty distribution */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-800">Phân bố mức độ</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {DIFFICULTIES.map(d => {
                const count = difficultyDistribution[d.value] || 0;
                const total = questionCount || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={d.value} className="text-center p-3 rounded-xl bg-slate-50">
                    <div className="text-2xl font-bold" style={{ color: difficultyColors[d.value] }}>{count}</div>
                    <div className="text-xs text-slate-500 mt-1">{d.label}</div>
                    <div className="text-xs font-medium text-slate-400">{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top topics */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-semibold text-slate-800">Chuyên đề hàng đầu</h3>
            </div>
            <div className="space-y-2.5">
              {topicDistribution.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Chưa có dữ liệu</p>
              ) : (
                topicDistribution.map(({ topic, count }) => {
                  const pct = maxTopic > 0 ? (count / maxTopic) * 100 : 0;
                  return (
                    <div key={topic} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-20 truncate" title={getTopicLabel(topic as any)}>{getTopicLabel(topic as any)}</span>
                      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500 flex items-center justify-end pr-1.5" style={{ width: `${Math.max(pct, 12)}%` }}>
                          <span className="text-[10px] font-bold text-white">{count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent questions */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Bài tập gần đây</h2>
          {recentQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Chưa có bài tập</h3>
              <p className="text-sm text-slate-500 mb-6">Bắt đầu bằng cách thêm bài tập đầu tiên vào kho.</p>
              <Link href="/questions/new" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-md shadow-blue-500/25">
                <Plus className="w-4 h-4" /> Thêm bài tập đầu tiên
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
              {recentQuestions.map((q) => (
                <Link key={q.id} href={`/questions/${q.id}`} className="block p-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 line-clamp-2">
                        <QuestionContent content={q.content} />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Toán {q.grade}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" /> {formatDate(q.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="p-3 text-center">
                <Link href="/questions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Xem tất cả →</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
