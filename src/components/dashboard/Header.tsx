"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Search, X, BookOpen, FileText, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useAuthStore } from "@/stores/auth-store";
import { cn, stripLatex } from "@/lib/utils";
import { isDemoMode, demoDb, DEMO_USER } from "@/lib/demo-data";
import type { Notification as AppNotification } from "@/types";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { isCollapsed } = useSidebarStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ type: string; title: string; href: string }[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => document.getElementById("header-search-input")?.focus(), 10);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowUserMenu(false);
        setShowNotifications(false);
        document.getElementById("header-search-input")?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Load notifications
  useEffect(() => {
    if (isDemoMode) {
      setNotifications(demoDb.getNotifications(DEMO_USER.id));
      setUnreadCount(demoDb.getUnreadCount(DEMO_USER.id));
    }
  }, [showNotifications]);

  // Search logic (debounced for production API calls)
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const query = searchQuery.toLowerCase();

    const timer = setTimeout(async () => {
      const results: { type: string; title: string; href: string }[] = [];

      if (isDemoMode) {
        const questions = demoDb.getQuestions({ search: query });
        questions.slice(0, 5).forEach(q => {
          results.push({ type: "bài tập", title: stripLatex(q.content).substring(0, 80) + (q.content.length > 80 ? "..." : ""), href: `/questions/${q.id}` });
        });
        const exams = demoDb.getExams().filter(e => e.title.toLowerCase().includes(query));
        exams.slice(0, 3).forEach(e => {
          results.push({ type: "đề thi", title: e.title, href: `/exams/${e.id}` });
        });
      } else {
        // Production: search via API
        try {
          const [qRes, eRes] = await Promise.all([
            fetch(`/api/questions?search=${encodeURIComponent(query)}&limit=5`),
            fetch(`/api/exams?search=${encodeURIComponent(query)}`),
          ]);
          if (qRes.ok) {
            const qData = await qRes.json();
            const qList = qData.data || qData || [];
            (Array.isArray(qList) ? qList : []).slice(0, 5).forEach((q: any) => {
              results.push({ type: "bài tập", title: stripLatex(q.content).substring(0, 80), href: `/questions/${q.id}` });
            });
          }
          if (eRes.ok) {
            const eData = await eRes.json();
            const eList = Array.isArray(eData) ? eData : [];
            eList.slice(0, 3).forEach((e: any) => {
              results.push({ type: "đề thi", title: e.title, href: `/exams/${e.id}` });
            });
          }
        } catch { /* ignore search errors */ }
      }

      // Static navigation results
      const pages = [
        { title: "Kho bài tập", href: "/questions" },
        { title: "Thêm bài tập mới", href: "/questions/new" },
        { title: "Kho đề thi", href: "/exams" },
        { title: "Tạo đề thi mới", href: "/exams/new" },
        { title: "Duyệt bài tập", href: "/admin/review" },
        { title: "Duyệt đề thi", href: "/admin/review-exams" },
        { title: "Quản lý danh mục", href: "/admin/categories" },
        { title: "Quản lý người dùng", href: "/admin/users" },
        { title: "Cài đặt", href: "/admin/settings" },
      ];
      pages.filter(p => p.title.toLowerCase().includes(query)).forEach(p => {
        results.push({ type: "trang", ...p });
      });
      setSearchResults(results.slice(0, 8));
    }, isDemoMode ? 0 : 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const userInitials = user?.full_name
    ? user.full_name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()
    : "GV";

  const roleLabel = user?.role === "admin" ? "Quản trị viên" : user?.role === "reviewer" ? "Người duyệt" : "Giáo viên";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/80 z-30 flex items-center justify-between px-6 transition-all duration-300",
          isCollapsed ? "left-[72px]" : "left-[280px]"
        )}
      >
        <div>
          <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Inline Search */}
          <div className="relative hidden md:block" ref={searchRef}>
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSearch(true);
                }}
                onFocus={() => setShowSearch(true)}
                placeholder="Tìm kiếm..."
                className="w-64 lg:w-80 pl-9 pr-12 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
              {!searchQuery && (
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-medium bg-slate-200 text-slate-500 rounded pointer-events-none">Ctrl+K</kbd>
              )}
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(""); setShowSearch(false); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {showSearch && searchQuery && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden animate-fade-in z-50">
                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto py-2">
                    {searchResults.map((r, i) => (
                      <Link
                        key={i}
                        href={r.href}
                        onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        {r.type === "bài tập" ? <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" /> :
                         r.type === "đề thi" ? <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" /> :
                         <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 truncate">{r.title}</p>
                          <p className="text-xs text-slate-400 capitalize">{r.type}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-slate-400">Không tìm thấy kết quả cho &ldquo;{searchQuery}&rdquo;</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile search */}
          <button
            onClick={() => { setShowSearch(true); setTimeout(() => document.getElementById("header-search-input")?.focus(), 10); }}
            className="md:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <Search className="w-4 h-4 text-slate-500" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Thông báo</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => {
                        if (isDemoMode) {
                          demoDb.markAllRead(DEMO_USER.id);
                          setNotifications(demoDb.getNotifications(DEMO_USER.id));
                          setUnreadCount(0);
                        }
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Đánh dấu tất cả đã đọc
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-400">Không có thông báo</div>
                  ) : (
                    notifications.slice(0, 8).map(n => (
                      <button
                        key={n.id}
                        onClick={() => {
                          if (isDemoMode) {
                            demoDb.markNotificationRead(n.id);
                            setNotifications(demoDb.getNotifications(DEMO_USER.id));
                            setUnreadCount(demoDb.getUnreadCount(DEMO_USER.id));
                          }
                          if (n.link) {
                            router.push(n.link);
                            setShowNotifications(false);
                          }
                        }}
                        className={cn(
                          "w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-50",
                          !n.is_read && "bg-blue-50/50"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", !n.is_read ? "bg-blue-500" : "bg-transparent")} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{n.title}</p>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {actions}

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-slate-50 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                {userInitials}
              </div>
              {!isCollapsed && (
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-slate-700 leading-tight">{user?.full_name || "Giáo viên"}</p>
                  <p className="text-xs text-slate-400">{roleLabel}</p>
                </div>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg py-1 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-700">{user?.full_name || "Giáo viên"}</p>
                  <p className="text-xs text-slate-400">{user?.email || "demo@khodetoan.vn"}</p>
                </div>
                <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => setShowUserMenu(false)}>
                  <Settings className="w-4 h-4" /> Cài đặt
                </Link>
                <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => setShowUserMenu(false)}>
                  <User className="w-4 h-4" /> Hồ sơ
                </Link>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Modal (simplified) */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-slate-50 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              id="mobile-search-input"
              type="text"
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm bài tập, đề thi..."
              className="flex-1 text-base outline-none bg-transparent"
            />
            <button onClick={() => setShowSearch(false)} className="p-2 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {searchQuery && searchResults.length > 0 ? (
              <div className="bg-white">
                {searchResults.map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                    className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    {r.type === "bài tập" ? <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0" /> :
                     r.type === "đề thi" ? <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0" /> :
                     <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{r.title}</p>
                      <p className="text-xs text-slate-400 capitalize mt-0.5">{r.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-8 text-center text-slate-400 text-sm">Không tìm thấy kết quả cho &ldquo;{searchQuery}&rdquo;</div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">Nhập để tìm kiếm</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
