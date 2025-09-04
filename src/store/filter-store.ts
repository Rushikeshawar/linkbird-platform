 
// src/store/filter-store.ts
import { create } from 'zustand';

interface FilterStore {
  searchTerm: string;
  selectedCampaign: string;
  selectedStatus: string;
  setSearchTerm: (term: string) => void;
  setSelectedCampaign: (campaign: string) => void;
  setSelectedStatus: (status: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchTerm: "",
  selectedCampaign: "all",
  selectedStatus: "all",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCampaign: (selectedCampaign) => set({ selectedCampaign }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  resetFilters: () => set({ 
    searchTerm: "", 
    selectedCampaign: "all", 
    selectedStatus: "all" 
  }),
}));

