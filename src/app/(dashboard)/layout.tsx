"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { isDemoMode, DEMO_USER } from "@/lib/demo-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const { setUser, setLoading } = useAuthStore();
  const router = useRouter();

  // Auto-login in demo mode or fetch user in production
  useEffect(() => {
    if (isDemoMode) {
      setUser(DEMO_USER);
      setLoading(false);
    } else {
      // Production mode: fetch user from API
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          if (data.user && data.user.id) {
            setUser(data.user);
          } else {
            // Not logged in
            router.push('/login');
          }
        })
        .catch(() => {
          router.push('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [setUser, setLoading, router]);

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
