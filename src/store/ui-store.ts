 

// src/store/ui-store.ts
import { create } from 'zustand';

interface UIStore {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  selectedLead: any;
  setSelectedLead: (lead: any) => void;
  leadSheetOpen: boolean;
  setLeadSheetOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  selectedLead: null,
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  leadSheetOpen: false,
  setLeadSheetOpen: (open) => set({ leadSheetOpen: open }),
}));

