"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
import { isDemoMode, DEMO_USER } from "@/lib/demo-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const { setUser, setLoading } = useAuthStore();

  // Auto-login in demo mode
  useEffect(() => {
    if (isDemoMode) {
      setUser(DEMO_USER);
      setLoading(false);
    }
  }, [setUser, setLoading]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-300 pt-16 min-h-screen",
          isCollapsed ? "ml-[72px]" : "ml-[280px]"
        )}
      >
        {children}
      </main>
    </div>
  );
}
