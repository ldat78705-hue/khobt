import { create } from 'zustand';
import type { QuestionFilter } from '@/types';

interface QuestionState {
  filter: QuestionFilter;
  selectedIds: string[];
  viewMode: 'grid' | 'list';
  setFilter: (filter: Partial<QuestionFilter>) => void;
  resetFilter: () => void;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

const defaultFilter: QuestionFilter = {};

export const useQuestionStore = create<QuestionState>((set) => ({
  filter: defaultFilter,
  selectedIds: [],
  viewMode: 'list',
  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),
  resetFilter: () => set({ filter: defaultFilter }),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
  setViewMode: (viewMode) => set({ viewMode }),
}));
