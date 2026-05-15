"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, Trash2, Edit, GripVertical, FolderTree, Save, X, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Category } from "@/types";
import { GRADES, type Grade } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { isDemoMode, demoDb } from "@/lib/demo-data";

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#EF4444", "#F59E0B", "#22C55E", "#06B6D4", "#6366F1", "#14B8A6", "#F97316"];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "", color: "#3B82F6", parent_id: "", grade: "" as string });
  const [isSaving, setIsSaving] = useState(false);
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setCategories(demoDb.getCategories());
      } else {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data || []);
        } else {
          const supabase = createClient();
          const { data, error } = await supabase.from("categories").select("*").order("sort_order").order("name");
          if (error) throw error;
          setCategories(data || []);
        }
      }
    } catch {
      toast.error("Không thể tải danh mục");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleSave = async () => {
    if (!formData.name.trim()) { toast.error("Vui lòng nhập tên danh mục"); return; }
    setIsSaving(true);
    try {
      const slug = formData.slug || generateSlug(formData.name);
      const gradeVal = formData.grade ? Number(formData.grade) : null;
      if (isDemoMode) {
        if (editingId) {
          demoDb.updateCategory(editingId, { name: formData.name, slug, description: formData.description, color: formData.color, parent_id: formData.parent_id || null, grade: gradeVal });
          toast.success("Đã cập nhật danh mục");
        } else {
          demoDb.createCategory({ name: formData.name, slug, description: formData.description, color: formData.color, parent_id: formData.parent_id || null, grade: gradeVal });
          toast.success("Đã tạo danh mục");
        }
      } else {
        const body = { name: formData.name, slug, description: formData.description || null, color: formData.color, parent_id: formData.parent_id || null, grade: gradeVal };
        if (editingId) {
          const res = await fetch('/api/categories', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...body }),
          });
          if (!res.ok) throw new Error("Không thể cập nhật");
          toast.success("Đã cập nhật danh mục");
        } else {
          const res = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...body, sort_order: categories.length }),
          });
          if (!res.ok) throw new Error("Không thể tạo");
          toast.success("Đã tạo danh mục");
        }
      }
      setShowForm(false); setEditingId(null);
      setFormData({ name: "", slug: "", description: "", color: "#3B82F6", parent_id: "", grade: "" });
      fetchCategories();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Không thể lưu";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "", color: cat.color, parent_id: cat.parent_id || "", grade: cat.grade ? String(cat.grade) : "" });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa danh mục này?")) return;
    try {
      if (isDemoMode) { demoDb.deleteCategory(id); }
      else {
        const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Không thể xóa");
      }
      toast.success("Đã xóa");
      fetchCategories();
    } catch {
      toast.error("Không thể xóa");
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      if (isDemoMode) { demoDb.updateCategory(id, { is_active: !isActive }); }
      else {
        const res = await fetch('/api/categories', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, is_active: !isActive }),
        });
        if (!res.ok) throw new Error("Không thể cập nhật");
      }
      fetchCategories();
    } catch {
      toast.error("Không thể cập nhật");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Filter and group
  const filteredCategories = filterGrade === "all"
    ? categories
    : categories.filter(c => c.grade === Number(filterGrade) || !c.grade);

  const rootCategories = filteredCategories.filter(c => !c.parent_id);
  const getChildren = (parentId: string) => filteredCategories.filter(c => c.parent_id === parentId);

  // Grade groups for display
  const gradeGroups = GRADES.map(g => ({
    ...g,
    roots: rootCategories.filter(c => c.grade === g.value),
    all: filteredCategories.filter(c => c.grade === g.value),
  }));
  const noGradeRoots = rootCategories.filter(c => !c.grade);

  return (
    <>
      <Header
        title="Quản lý danh mục"
        subtitle={`${categories.length} danh mục`}
        actions={
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: "", slug: "", description: "", color: "#3B82F6", parent_id: "", grade: "" }); }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Thêm danh mục
          </button>
        }
      />
      <div className="p-6 space-y-4 max-w-4xl">
        {/* Grade filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lọc theo lớp:</span>
          <button
            onClick={() => setFilterGrade("all")}
            className={cn("px-3 py-1.5 text-xs font-medium rounded-lg border transition-all", filterGrade === "all" ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300")}
          >
            Tất cả
          </button>
          {GRADES.map(g => (
            <button
              key={g.value}
              onClick={() => setFilterGrade(String(g.value))}
              className={cn("px-3 py-1.5 text-xs font-medium rounded-lg border transition-all", filterGrade === String(g.value) ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300")}
            >
              Lớp {g.value}
            </button>
          ))}
        </div>

        {/* Create/Edit form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-800">{editingId ? "Sửa danh mục" : "Thêm danh mục mới"}</h3>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Tên danh mục *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} placeholder="VD: Hình học phẳng" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Khối lớp</label>
                  <select value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="">Tất cả lớp</option>
                    {GRADES.map(g => <option key={g.value} value={g.value}>Lớp {g.value}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Slug</label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="hinh-hoc-phang" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Danh mục cha</label>
                  <select value={formData.parent_id} onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })} className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="">Không có (gốc)</option>
                    {rootCategories.filter(c => c.id !== editingId).map((c) => <option key={c.id} value={c.id}>{c.name} {c.grade ? `(Lớp ${c.grade})` : ''}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Mô tả</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Mô tả ngắn..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Màu sắc</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((color) => (
                    <button key={color} type="button" onClick={() => setFormData({ ...formData, color })} className={cn("w-8 h-8 rounded-lg transition-all", formData.color === color && "ring-2 ring-offset-2 ring-blue-500")} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-sm disabled:opacity-50">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingId ? "Cập nhật" : "Tạo"}
                </button>
                <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">Hủy</button>
              </div>
            </div>
          </div>
        )}

        {/* Categories by grade */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-12 rounded-xl mb-2" />)}
            </div>
          ) : filterGrade === "all" ? (
            <>
              {/* Show grouped by grade */}
              {gradeGroups.map(g => g.roots.length > 0 && (
                <div key={g.value} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">{g.value}</span>
                      <h3 className="text-sm font-bold text-slate-800">{g.label}</h3>
                      <span className="text-xs text-slate-400">{g.all.length} danh mục</span>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {g.roots.map(cat => (
                      <CategoryRow key={cat.id} cat={cat} categories={categories} getChildren={getChildren} expandedIds={expandedIds} toggleExpand={toggleExpand} handleEdit={handleEdit} handleDelete={handleDelete} toggleActive={toggleActive} depth={0} />
                    ))}
                  </div>
                </div>
              ))}

              {/* No grade */}
              {noGradeRoots.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-800">Chung (tất cả lớp)</h3>
                    <span className="text-xs text-slate-400">{noGradeRoots.length} danh mục</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {noGradeRoots.map(cat => (
                      <CategoryRow key={cat.id} cat={cat} categories={categories} getChildren={getChildren} expandedIds={expandedIds} toggleExpand={toggleExpand} handleEdit={handleEdit} handleDelete={handleDelete} toggleActive={toggleActive} depth={0} />
                    ))}
                  </div>
                </div>
              )}

              {categories.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                  <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Chưa có danh mục nào. Thêm danh mục đầu tiên.</p>
                </div>
              )}
            </>
          ) : (
            /* Filtered by specific grade */
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-slate-500" />
                <h3 className="text-base font-semibold text-slate-800">Danh mục Lớp {filterGrade}</h3>
                <span className="text-xs text-slate-400">{filteredCategories.length} danh mục</span>
              </div>
              {rootCategories.length === 0 ? (
                <div className="p-12 text-center">
                  <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Chưa có danh mục cho lớp {filterGrade}.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {rootCategories.map(cat => (
                    <CategoryRow key={cat.id} cat={cat} categories={categories} getChildren={getChildren} expandedIds={expandedIds} toggleExpand={toggleExpand} handleEdit={handleEdit} handleDelete={handleDelete} toggleActive={toggleActive} depth={0} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** Recursive category row with expand/collapse for children */
function CategoryRow({
  cat, categories, getChildren, expandedIds, toggleExpand,
  handleEdit, handleDelete, toggleActive, depth,
}: {
  cat: Category;
  categories: Category[];
  getChildren: (id: string) => Category[];
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  handleEdit: (cat: Category) => void;
  handleDelete: (id: string) => void;
  toggleActive: (id: string, isActive: boolean) => void;
  depth: number;
}) {
  const children = getChildren(cat.id);
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(cat.id);

  return (
    <>
      <div className={cn("px-6 py-3.5 flex items-center gap-3 hover:bg-slate-50/50 group", depth > 0 && "bg-slate-25")} style={{ paddingLeft: `${24 + depth * 28}px` }}>
        {/* Expand toggle */}
        {hasChildren ? (
          <button onClick={() => toggleExpand(cat.id)} className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 text-slate-400 transition-colors flex-shrink-0">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <span className="w-5 h-5 flex-shrink-0" />
        )}

        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-800">{cat.name}</span>
            {cat.grade && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded">L{cat.grade}</span>
            )}
            {hasChildren && (
              <span className="text-[10px] text-slate-400">{children.length} con</span>
            )}
            {!cat.is_active && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">Ẩn</span>
            )}
          </div>
          {cat.description && <p className="text-xs text-slate-400 mt-0.5 truncate">{cat.description}</p>}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => toggleActive(cat.id, cat.is_active)} className={cn("px-2.5 py-1 text-xs font-medium rounded-lg", cat.is_active ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100" : "text-green-600 bg-green-50 hover:bg-green-100")}>
            {cat.is_active ? "Ẩn" : "Hiện"}
          </button>
          <button onClick={() => handleEdit(cat)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
          <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && children.map(child => (
        <CategoryRow key={child.id} cat={child} categories={categories} getChildren={getChildren} expandedIds={expandedIds} toggleExpand={toggleExpand} handleEdit={handleEdit} handleDelete={handleDelete} toggleActive={toggleActive} depth={depth + 1} />
      ))}
    </>
  );
}
