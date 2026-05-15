"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, FileText, Settings,
  Users, ChevronLeft, ChevronRight, GraduationCap, Plus,
  LogOut, FolderTree, CheckCircle, Heart, Bookmark, Sparkles,
  BarChart3, Clock, Download, ClipboardList, Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useAuthStore } from "@/stores/auth-store";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isDemoMode, DEMO_USER } from "@/lib/demo-data";

// ===== MENU CHÍNH — Tất cả GV đều thấy =====
const mainItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tổng quan" },
  { href: "/questions", icon: BookOpen, label: "Kho bài tập" },
  { href: "/exams", icon: FileText, label: "Kho đề thi" },
];

// ===== SOẠN ĐỀ — Công cụ tạo đề =====
const toolItems = [
  { href: "/exams/auto", icon: Sparkles, label: "Tạo đề tự động" },
  { href: "/worksheets", icon: ClipboardList, label: "Phiếu bài tập" },
  { href: "/questions/export", icon: Download, label: "Xuất bài tập" },
];

// ===== CÁ NHÂN =====
const personalItems = [
  { href: "/favorites", icon: Heart, label: "Yêu thích" },
  { href: "/saved-exams", icon: Bookmark, label: "Đề đã lưu" },
  { href: "/history", icon: Clock, label: "Lịch sử" },
];

// ===== DUYỆT — Reviewer + Admin thấy =====
const reviewItems = [
  { href: "/admin/review", icon: CheckCircle, label: "Duyệt bài tập" },
  { href: "/admin/review-exams", icon: FileText, label: "Duyệt đề thi" },
  { href: "/admin/stats", icon: BarChart3, label: "Thống kê" },
];

// ===== QUẢN TRỊ — Chỉ Admin thấy =====
const adminOnlyItems = [
  { href: "/admin/categories", icon: FolderTree, label: "Quản lý danh mục" },
  { href: "/admin/grades", icon: GraduationCap, label: "Lớp & Loại đề" },
  { href: "/admin/users", icon: Users, label: "Quản lý người dùng" },
  { href: "/admin/settings", icon: Settings, label: "Cài đặt hệ thống" },
];

function NavSection({ 
  title, items, pathname, isCollapsed 
}: { 
  title: string; 
  items: typeof mainItems; 
  pathname: string; 
  isCollapsed: boolean;
}) {
  return (
    <div className="pt-3">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
        {!isCollapsed && title}
      </div>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-800",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0", isActive && "text-blue-600")} />
            {!isCollapsed && item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebarStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const currentRole = user?.role || (isDemoMode ? DEMO_USER.role : 'teacher');
  const isAdmin = currentRole === 'admin';
  const isReviewer = currentRole === 'reviewer';

  const handleLogout = async () => {
    try {
      if (!isDemoMode) {
        await fetch('/api/auth/logout', { method: 'POST' });
      }
      toast.success("Đã đăng xuất");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Lỗi khi đăng xuất");
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-40 flex flex-col transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-slate-800 truncate">KhoĐềToán</span>
          )}
        </Link>
      </div>

      {/* Quick action */}
      <div className="px-3 py-3">
        <Link
          href="/questions/new"
          className={cn(
            "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-all shadow-sm shadow-blue-500/20",
            isCollapsed && "justify-center px-2"
          )}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && "Thêm bài tập"}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto pb-2">
        {/* Menu chính */}
        <NavSection title="Menu chính" items={mainItems} pathname={pathname} isCollapsed={isCollapsed} />

        {/* Công cụ soạn đề */}
        <NavSection title="Công cụ" items={toolItems} pathname={pathname} isCollapsed={isCollapsed} />

        {/* Cá nhân */}
        <NavSection title="Cá nhân" items={personalItems} pathname={pathname} isCollapsed={isCollapsed} />

        {/* Duyệt & Thống kê — Reviewer + Admin */}
        {(isAdmin || isReviewer) && (
          <NavSection title="Duyệt & Báo cáo" items={reviewItems} pathname={pathname} isCollapsed={isCollapsed} />
        )}

        {/* Quản trị — Chỉ Admin */}
        {isAdmin && (
          <NavSection title="Quản trị" items={adminOnlyItems} pathname={pathname} isCollapsed={isCollapsed} />
        )}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-slate-100">
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {user.full_name?.charAt(0).toUpperCase() || "G"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{user.full_name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all w-full",
            isCollapsed && "justify-center px-2"
          )}
          title="Đăng xuất"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && "Đăng xuất"}
        </button>
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5 text-slate-400" /> : <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />}
      </button>
    </aside>
  );
}
