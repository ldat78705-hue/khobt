"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, Trash2, Edit, Save, X, GraduationCap, FileText, ToggleLeft, ToggleRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GradeConfig, ExamType } from "@/types";
import { toast } from "sonner";

// ================================
// Local storage helpers (Demo mode)
// ================================
const GRADES_KEY = 'khodetoan_grades';
const EXAM_TYPES_KEY = 'khodetoan_exam_types';

const DEFAULT_GRADES: GradeConfig[] = [
  { id: 'g4', grade: 4, name: 'Lớp 4', is_active: true, sort_order: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'g5', grade: 5, name: 'Lớp 5', is_active: true, sort_order: 2, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'g6', grade: 6, name: 'Lớp 6', is_active: true, sort_order: 3, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'g7', grade: 7, name: 'Lớp 7', is_active: true, sort_order: 4, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'g8', grade: 8, name: 'Lớp 8', is_active: true, sort_order: 5, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'g9', grade: 9, name: 'Lớp 9', is_active: true, sort_order: 6, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
];

const DEFAULT_EXAM_TYPES: ExamType[] = [
  { id: 'et1', name: 'Kiểm tra 15 phút', slug: 'kt15', description: 'Đề kiểm tra ngắn', duration_minutes: 15, is_active: true, sort_order: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'et2', name: 'Kiểm tra 1 tiết', slug: 'kt1tiet', description: 'Đề kiểm tra giữa chương', duration_minutes: 45, is_active: true, sort_order: 2, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'et3', name: 'Thi giữa kỳ', slug: 'giua-ky', description: 'Đề thi giữa học kỳ', duration_minutes: 60, is_active: true, sort_order: 3, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'et4', name: 'Thi cuối kỳ', slug: 'cuoi-ky', description: 'Đề thi cuối học kỳ', duration_minutes: 90, is_active: true, sort_order: 4, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'et5', name: 'Thi tuyển sinh', slug: 'tuyen-sinh', description: 'Đề thi tuyển sinh lớp 10', duration_minutes: 120, is_active: true, sort_order: 5, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'et6', name: 'Ôn tập chuyên đề', slug: 'on-tap', description: 'Bài tập ôn tập theo chủ đề', is_active: true, sort_order: 6, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
];

function loadGrades(): GradeConfig[] {
  if (typeof window === 'undefined') return DEFAULT_GRADES;
  const data = localStorage.getItem(GRADES_KEY);
  return data ? JSON.parse(data) : DEFAULT_GRADES;
}
function saveGrades(grades: GradeConfig[]) {
  localStorage.setItem(GRADES_KEY, JSON.stringify(grades));
}
function loadExamTypes(): ExamType[] {
  if (typeof window === 'undefined') return DEFAULT_EXAM_TYPES;
  const data = localStorage.getItem(EXAM_TYPES_KEY);
  return data ? JSON.parse(data) : DEFAULT_EXAM_TYPES;
}
function saveExamTypes(types: ExamType[]) {
  localStorage.setItem(EXAM_TYPES_KEY, JSON.stringify(types));
}
function genId() { return 'id_' + Math.random().toString(36).slice(2, 9); }
function genSlug(name: string) {
  return name.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// ================================
// Confirm Modal Component (thay thế window.confirm)
// ================================
function ConfirmModal({ open, title, message, onConfirm, onCancel }: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
            Hủy
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================
// Page Component
// ================================
export default function AdminGradesPage() {
  const [activeTab, setActiveTab] = useState<'grades' | 'exam_types'>('grades');

  return (
    <>
      <Header title="Quản lý lớp & Loại đề" subtitle="Thêm, sửa, xóa lớp học và loại đề thi" />
      <div className="p-6 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
          <button onClick={() => setActiveTab('grades')} className={cn("px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all", activeTab === 'grades' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
            <GraduationCap className="w-4 h-4" /> Khối lớp
          </button>
          <button onClick={() => setActiveTab('exam_types')} className={cn("px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all", activeTab === 'exam_types' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
            <FileText className="w-4 h-4" /> Loại đề thi
          </button>
        </div>

        {activeTab === 'grades' ? <GradesManager /> : <ExamTypesManager />}
      </div>
    </>
  );
}

// ================================
// Grades Manager
// ================================
function GradesManager() {
  const [grades, setGrades] = useState<GradeConfig[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formGrade, setFormGrade] = useState('');
  const [formName, setFormName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const refresh = useCallback(() => setGrades(loadGrades()), []);
  useEffect(() => { refresh(); }, [refresh]);

  const handleSave = () => {
    const gradeNum = parseInt(formGrade);
    if (!gradeNum || !formName.trim()) { toast.error('Vui lòng nhập đầy đủ'); return; }
    const existing = grades.find(g => g.grade === gradeNum && g.id !== editingId);
    if (existing) { toast.error('Lớp này đã tồn tại'); return; }

    let updated: GradeConfig[];
    if (editingId) {
      updated = grades.map(g => g.id === editingId ? { ...g, grade: gradeNum, name: formName.trim(), updated_at: new Date().toISOString() } : g);
      toast.success('Đã cập nhật');
    } else {
      updated = [...grades, { id: genId(), grade: gradeNum, name: formName.trim(), is_active: true, sort_order: grades.length + 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }];
      toast.success('Đã thêm lớp');
    }
    updated.sort((a, b) => a.grade - b.grade);
    saveGrades(updated);
    setShowForm(false); setEditingId(null); setFormGrade(''); setFormName('');
    refresh();
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = grades.filter(g => g.id !== deleteId);
    saveGrades(updated);
    setGrades(updated);
    setDeleteId(null);
    toast.success('Đã xóa lớp');
  };

  const toggleActive = (id: string) => {
    const updated = grades.map(g => g.id === id ? { ...g, is_active: !g.is_active } : g);
    saveGrades(updated);
    setGrades(updated);
  };

  const startEdit = (g: GradeConfig) => {
    setEditingId(g.id); setFormGrade(String(g.grade)); setFormName(g.name); setShowForm(true);
  };

  const deleteName = deleteId ? grades.find(g => g.id === deleteId)?.name || '' : '';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Danh sách khối lớp</h3>
        <button onClick={() => { setShowForm(true); setEditingId(null); setFormGrade(''); setFormName(''); }} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white rounded-lg gradient-primary hover:opacity-90 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Thêm lớp
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm animate-scale-in">
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Số lớp</label>
              <input type="number" value={formGrade} onChange={e => setFormGrade(e.target.value)} placeholder="VD: 10" className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1">Tên hiển thị</label>
              <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="VD: Lớp 10" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white rounded-lg gradient-primary hover:opacity-90">
                <Save className="w-3.5 h-3.5" /> {editingId ? 'Lưu' : 'Thêm'}
              </button>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-3 py-2 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
        {grades.map(g => (
          <div key={g.id} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/50">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">{g.grade}</span>
            <div className="flex-1">
              <span className="text-sm font-semibold text-slate-800">{g.name}</span>
              {!g.is_active && <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-red-100 text-red-600 rounded-full">Ẩn</span>}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleActive(g.id)} className="p-1.5 rounded-lg hover:bg-slate-100" title={g.is_active ? 'Ẩn' : 'Hiện'}>
                {g.is_active ? <ToggleRight className="w-5 h-5 text-green-500" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
              </button>
              <button onClick={() => startEdit(g)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
              <button onClick={() => setDeleteId(g.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {grades.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">Chưa có lớp nào.</div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Xóa khối lớp"
        message={`Bạn có chắc muốn xóa "${deleteName}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

// ================================
// Exam Types Manager
// ================================
function ExamTypesManager() {
  const [types, setTypes] = useState<ExamType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const refresh = useCallback(() => setTypes(loadExamTypes()), []);
  useEffect(() => { refresh(); }, [refresh]);

  const handleSave = () => {
    if (!formName.trim()) { toast.error('Vui lòng nhập tên'); return; }
    let updated: ExamType[];
    if (editingId) {
      updated = types.map(t => t.id === editingId ? { ...t, name: formName.trim(), description: formDesc.trim() || undefined, duration_minutes: formDuration ? parseInt(formDuration) : undefined, slug: genSlug(formName), updated_at: new Date().toISOString() } : t);
      toast.success('Đã cập nhật');
    } else {
      updated = [...types, { id: genId(), name: formName.trim(), slug: genSlug(formName), description: formDesc.trim() || undefined, duration_minutes: formDuration ? parseInt(formDuration) : undefined, is_active: true, sort_order: types.length + 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }];
      toast.success('Đã thêm loại đề');
    }
    saveExamTypes(updated);
    setShowForm(false); setEditingId(null); setFormName(''); setFormDesc(''); setFormDuration('');
    setTypes(updated);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = types.filter(t => t.id !== deleteId);
    saveExamTypes(updated);
    setTypes(updated);
    setDeleteId(null);
    toast.success('Đã xóa loại đề');
  };

  const toggleActive = (id: string) => {
    const updated = types.map(t => t.id === id ? { ...t, is_active: !t.is_active } : t);
    saveExamTypes(updated);
    setTypes(updated);
  };

  const startEdit = (t: ExamType) => {
    setEditingId(t.id); setFormName(t.name); setFormDesc(t.description || ''); setFormDuration(t.duration_minutes ? String(t.duration_minutes) : ''); setShowForm(true);
  };

  const deleteName = deleteId ? types.find(t => t.id === deleteId)?.name || '' : '';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Danh sách loại đề thi</h3>
        <button onClick={() => { setShowForm(true); setEditingId(null); setFormName(''); setFormDesc(''); setFormDuration(''); }} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white rounded-lg gradient-primary hover:opacity-90 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Thêm loại đề
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm animate-scale-in">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Tên loại đề *</label>
              <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="VD: Đề kiểm tra giữa kỳ" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Thời gian (phút)</label>
              <input type="number" value={formDuration} onChange={e => setFormDuration(e.target.value)} placeholder="45" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-slate-500 mb-1">Mô tả</label>
            <input type="text" value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Mô tả ngắn..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white rounded-lg gradient-primary hover:opacity-90">
              <Save className="w-3.5 h-3.5" /> {editingId ? 'Lưu' : 'Thêm'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-3 py-2 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200">Hủy</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
        {types.map(t => (
          <div key={t.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              {t.duration_minutes ? `${t.duration_minutes}'` : <FileText className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">{t.name}</span>
                {!t.is_active && <span className="px-2 py-0.5 text-[10px] font-medium bg-red-100 text-red-600 rounded-full">Ẩn</span>}
              </div>
              {t.description && <p className="text-xs text-slate-400 mt-0.5 truncate">{t.description}</p>}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleActive(t.id)} className="p-1.5 rounded-lg hover:bg-slate-100" title={t.is_active ? 'Ẩn' : 'Hiện'}>
                {t.is_active ? <ToggleRight className="w-5 h-5 text-green-500" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
              </button>
              <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
              <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {types.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">Chưa có loại đề nào.</div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Xóa loại đề thi"
        message={`Bạn có chắc muốn xóa "${deleteName}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
