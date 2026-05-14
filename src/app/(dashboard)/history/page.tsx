"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Clock, BookOpen, FileText, Heart, ThumbsUp, Flag, Eye, Edit, Trash2, Plus } from "lucide-react";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import { formatDate, stripLatex } from "@/lib/utils";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: 'view' | 'create' | 'edit' | 'like' | 'favorite' | 'report' | 'exam_create';
  title: string;
  link?: string;
  time: string;
}

const typeConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  view: { icon: Eye, color: "bg-slate-100 text-slate-500", label: "Xem" },
  create: { icon: Plus, color: "bg-green-50 text-green-600", label: "Tạo mới" },
  edit: { icon: Edit, color: "bg-blue-50 text-blue-600", label: "Sửa" },
  like: { icon: ThumbsUp, color: "bg-blue-50 text-blue-500", label: "Thích" },
  favorite: { icon: Heart, color: "bg-red-50 text-red-500", label: "Yêu thích" },
  report: { icon: Flag, color: "bg-orange-50 text-orange-500", label: "Báo cáo" },
  exam_create: { icon: FileText, color: "bg-purple-50 text-purple-600", label: "Tạo đề" },
};

export default function HistoryPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (isDemoMode) {
      // Build activity from data
      const items: ActivityItem[] = [];
      
      const questions = demoDb.getQuestions({});
      questions.slice(0, 5).forEach(q => {
        items.push({
          id: `q-${q.id}`, type: 'create', 
          title: `Tạo bài tập: ${stripLatex(q.content).slice(0, 60)}...`,
          link: `/questions/${q.id}`, time: q.created_at,
        });
      });

      const exams = demoDb.getExams();
      exams.forEach(e => {
        items.push({
          id: `e-${e.id}`, type: 'exam_create',
          title: `Tạo đề thi: ${e.title}`,
          link: `/exams/${e.id}`, time: e.created_at,
        });
      });

      const favs = demoDb.getFavoriteQuestions(DEMO_USER.id);
      favs.forEach(q => {
        items.push({
          id: `fav-${q.id}`, type: 'favorite',
          title: `Yêu thích: ${stripLatex(q.content).slice(0, 60)}...`,
          link: `/questions/${q.id}`, time: new Date().toISOString(),
        });
      });

      const reports = demoDb.getReports();
      reports.forEach(r => {
        items.push({
          id: `rep-${r.id}`, type: 'report',
          title: `Báo cáo: ${r.reason}`,
          link: `/questions/${r.question_id}`, time: r.created_at,
        });
      });

      items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setActivities(items);
    }
  }, []);

  // Group by date
  const grouped: Record<string, ActivityItem[]> = {};
  activities.forEach(a => {
    const date = new Date(a.time).toLocaleDateString('vi-VN');
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(a);
  });

  return (
    <>
      <Header title="Lịch sử hoạt động" />
      <div className="p-6 max-w-3xl space-y-6">
        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white">
          <p className="text-sm text-blue-100">Tổng hoạt động</p>
          <p className="text-2xl font-bold">{activities.length} hành động</p>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Chưa có hoạt động nào</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-slate-500 mb-3">{date}</h3>
              <div className="space-y-2">
                {items.map(item => {
                  const config = typeConfig[item.type] || typeConfig.view;
                  const Icon = config.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.link || '#'}
                      className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow block"
                    >
                      <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 truncate">{item.title}</p>
                        <p className="text-xs text-slate-400">{config.label}</p>
                      </div>
                      <span className="text-xs text-slate-400 flex-shrink-0">{new Date(item.time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
