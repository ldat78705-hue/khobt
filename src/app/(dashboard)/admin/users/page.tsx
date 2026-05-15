"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/dashboard/Header";
import { Users, Shield, Lock, Unlock, Search, Mail, Edit, Save, X, Key, UserCheck, UserX, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Profile } from "@/types";
import { toast } from "sonner";
import { isDemoMode, DEMO_USER } from "@/lib/demo-data";

const ROLES = [
  { value: 'admin', label: 'Admin', color: 'bg-purple-100 text-purple-700', desc: 'Toàn quyền hệ thống' },
  { value: 'reviewer', label: 'Người duyệt', color: 'bg-amber-100 text-amber-700', desc: 'Duyệt bài tập, xem thống kê' },
  { value: 'teacher', label: 'Giáo viên', color: 'bg-blue-100 text-blue-700', desc: 'Tạo bài tập, đề thi' },
];

const DEMO_USERS: Profile[] = [
  DEMO_USER,
  { id: 'demo-teacher-001', full_name: 'Nguyễn Văn An', email: 'an.nguyen@school.vn', role: 'teacher', is_active: true, permissions: { can_create_questions: true, can_review_questions: false, can_manage_categories: false }, created_at: '2024-09-01T00:00:00Z', updated_at: '2024-09-01T00:00:00Z' },
];

type FilterTab = 'all' | 'pending' | 'approved' | 'blocked';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<(Profile & { is_approved?: boolean })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState("");
  const [showResetPw, setShowResetPw] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>('all');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isDemoMode) {
        setUsers(DEMO_USERS);
      } else {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);

        const res = await fetch(`/api/users?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data || []);
        } else {
          throw new Error("Không tải được");
        }
      }
    } catch {
      toast.error("Không thể tải danh sách người dùng");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const toggleActive = async (id: string, currentStatus: boolean) => {
    if (id === DEMO_USER.id) { toast.error("Không thể khóa tài khoản admin chính"); return; }
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentStatus }),
      });
      if (!res.ok) throw new Error("Không thể cập nhật");
      fetchUsers();
      toast.success(currentStatus ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản");
    } catch {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  const startEditRole = (user: Profile) => {
    setEditingId(user.id);
    setEditRole(user.role);
  };

  const saveRole = async (id: string) => {
    if (id === DEMO_USER.id && editRole !== 'admin') { toast.error("Không thể hạ quyền admin chính"); return; }
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: editRole }),
      });
      if (!res.ok) throw new Error("Không thể cập nhật");
      fetchUsers();
      setEditingId(null);
      toast.success("Đã cập nhật vai trò");
    } catch {
      toast.error("Lỗi khi cập nhật vai trò");
    }
  };

  // Duyệt tài khoản
  const approveUser = async (id: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_approved: true, is_active: true }),
      });
      if (!res.ok) throw new Error("Lỗi duyệt tài khoản");
      fetchUsers();
      toast.success("✅ Đã duyệt tài khoản");
    } catch {
      toast.error("Lỗi khi duyệt tài khoản");
    }
  };

  // Từ chối tài khoản
  const rejectUser = async (id: string) => {
    if (!confirm("Từ chối tài khoản này? Tài khoản sẽ bị vô hiệu hóa.")) return;
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_approved: false, is_active: false }),
      });
      if (!res.ok) throw new Error("Lỗi");
      fetchUsers();
      toast.success("Đã từ chối tài khoản");
    } catch {
      toast.error("Lỗi khi từ chối");
    }
  };

  // Reset password thật
  const handleResetPassword = async (id: string) => {
    if (!newPassword || newPassword.length < 6) { toast.error("Mật khẩu phải ít nhất 6 ký tự"); return; }
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, new_password: newPassword }),
      });
      if (!res.ok) throw new Error("Lỗi");
      toast.success("✅ Đã đặt lại mật khẩu");
      setShowResetPw(null);
      setNewPassword("");
    } catch {
      toast.error("Lỗi khi đặt lại mật khẩu");
    }
  };

  const roleInfo = (role: string) => ROLES.find(r => r.value === role) || ROLES[2];

  // Filter
  const filteredUsers = users.filter(u => {
    if (filterTab === 'pending') return u.is_approved === false && u.is_active !== false;
    if (filterTab === 'approved') return u.is_approved === true;
    if (filterTab === 'blocked') return u.is_active === false;
    return true;
  });

  const pendingCount = users.filter(u => u.is_approved === false && u.is_active !== false).length;
  const activeCount = users.filter(u => u.is_active).length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const teacherCount = users.filter(u => u.role === 'teacher').length;

  return (
    <>
      <Header title="Quản lý người dùng" subtitle={`${users.length} tài khoản`} />
      <div className="p-6 space-y-4 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-xs text-slate-500 mt-1">Tổng tài khoản</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-xs text-slate-500 mt-1">Đang hoạt động</div>
          </div>
          <div className={cn("bg-white rounded-xl border p-4 shadow-sm text-center", pendingCount > 0 ? "border-amber-300 bg-amber-50" : "border-slate-100")}>
            <div className={cn("text-2xl font-bold", pendingCount > 0 ? "text-amber-600" : "text-slate-400")}>{pendingCount}</div>
            <div className="text-xs text-slate-500 mt-1">Chờ duyệt</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">{adminCount}</div>
            <div className="text-xs text-slate-500 mt-1">Admin</div>
          </div>
        </div>

        {/* Pending approval banner */}
        {pendingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                Có {pendingCount} tài khoản đang chờ duyệt
              </p>
              <p className="text-xs text-amber-600">Nhấn nút ✅ để duyệt hoặc ❌ để từ chối</p>
            </div>
            <button
              onClick={() => setFilterTab('pending')}
              className="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
            >
              Xem
            </button>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
          {[
            { key: 'all' as FilterTab, label: 'Tất cả', count: users.length },
            { key: 'pending' as FilterTab, label: 'Chờ duyệt', count: pendingCount },
            { key: 'approved' as FilterTab, label: 'Đã duyệt', count: users.filter(u => u.is_approved).length },
            { key: 'blocked' as FilterTab, label: 'Bị khóa', count: users.filter(u => !u.is_active).length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all",
                filterTab === tab.key ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={cn(
                  "px-1.5 py-0.5 text-[10px] font-bold rounded-full",
                  filterTab === tab.key ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm theo tên hoặc email..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Người dùng</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Vai trò</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Ngày tạo</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="px-5 py-4"><div className="skeleton h-4 w-40" /></td>
                    <td className="px-5 py-4"><div className="skeleton h-4 w-20" /></td>
                    <td className="px-5 py-4"><div className="skeleton h-4 w-16" /></td>
                    <td className="px-5 py-4"><div className="skeleton h-4 w-24" /></td>
                    <td className="px-5 py-4"><div className="skeleton h-4 w-12 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-500">Chưa có người dùng nào</td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const ri = roleInfo(user.role);
                  const isPending = user.is_approved === false && user.is_active !== false;
                  return (
                    <tr key={user.id} className={cn(
                      "border-b border-slate-50 hover:bg-slate-50/50 group",
                      isPending && "bg-amber-50/40"
                    )}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-semibold", user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : user.role === 'reviewer' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600')}>
                            {user.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {user.full_name}
                              {isPending && <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full">MỚI</span>}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {editingId === user.id ? (
                          <div className="flex items-center gap-1.5">
                            <select value={editRole} onChange={e => setEditRole(e.target.value)} className="px-2 py-1 text-xs border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                            <button onClick={() => saveRole(user.id)} className="p-1 rounded-md bg-green-100 text-green-600 hover:bg-green-200"><Save className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setEditingId(null)} className="p-1 rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200"><X className="w-3.5 h-3.5" /></button>
                          </div>
                        ) : (
                          <span className={cn("px-2.5 py-0.5 text-xs font-medium rounded-full", ri.color)}>
                            {ri.label}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {isPending ? (
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700 inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Chờ duyệt
                          </span>
                        ) : (
                          <span className={cn("px-2.5 py-0.5 text-xs font-medium rounded-full inline-flex items-center gap-1", user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                            {user.is_active ? <><UserCheck className="w-3 h-3" /> Hoạt động</> : <><UserX className="w-3 h-3" /> Bị khóa</>}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">{formatDate(user.created_at)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Approve/Reject buttons for pending users */}
                          {isPending && (
                            <>
                              <button onClick={() => approveUser(user.id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Duyệt tài khoản">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button onClick={() => rejectUser(user.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Từ chối">
                                <XCircle className="w-4 h-4" />
                              </button>
                              <div className="w-px h-4 bg-slate-200 mx-0.5" />
                            </>
                          )}
                          <button onClick={() => startEditRole(user)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" title="Đổi vai trò">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setShowResetPw(user.id); setNewPassword(""); }} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-all" title="Đặt lại mật khẩu">
                            <Key className="w-4 h-4" />
                          </button>
                          <button onClick={() => toggleActive(user.id, user.is_active)} className={cn("p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100", user.is_active ? "hover:bg-red-50 text-slate-400 hover:text-red-600" : "hover:bg-green-50 text-slate-400 hover:text-green-600")} title={user.is_active ? "Khóa" : "Mở khóa"}>
                            {user.is_active ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Reset password modal */}
        {showResetPw && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowResetPw(null)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-base font-semibold text-slate-800 mb-1">Đặt lại mật khẩu</h3>
              <p className="text-xs text-slate-500 mb-4">Cho: {users.find(u => u.id === showResetPw)?.full_name}</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Mật khẩu mới</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Ít nhất 6 ký tự..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleResetPassword(showResetPw)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90">Đặt lại</button>
                  <button onClick={() => setShowResetPw(null)} className="px-4 py-2.5 text-sm font-medium text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200">Hủy</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Role legend */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-violet-500" /> Mô tả quyền hạn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ROLES.map(r => (
              <div key={r.value} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className={cn("px-2 py-0.5 text-xs font-bold rounded-full", r.color)}>{r.label}</span>
                <p className="text-xs text-slate-500 mt-2">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
