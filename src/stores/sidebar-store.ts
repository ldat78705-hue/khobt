import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  activeSection: string;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  activeSection: 'dashboard',
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapsed: (isCollapsed) => set({ isCollapsed }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));
