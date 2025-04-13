import { create } from 'zustand';

interface FilterState {
  statusFilter: string;
  suburbFilter: string[];
  propertyTypeFilter: string[];
  loanPurposeFilter: string[];
  minLoanAmount: number | null;
  maxLoanAmount: number | null;
  minPropertyValue: number | null;
  maxPropertyValue: number | null;
  searchTerm: string;
  
  // Actions
  setStatusFilter: (status: string) => void;
  setSuburbFilter: (suburbs: string[]) => void;
  setPropertyTypeFilter: (types: string[]) => void;
  setLoanPurposeFilter: (purposes: string[]) => void;
  setMinLoanAmount: (amount: number | null) => void;
  setMaxLoanAmount: (amount: number | null) => void;
  setMinPropertyValue: (value: number | null) => void;
  setMaxPropertyValue: (value: number | null) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  statusFilter: 'all',
  suburbFilter: [],
  propertyTypeFilter: [],
  loanPurposeFilter: [],
  minLoanAmount: null,
  maxLoanAmount: null,
  minPropertyValue: null,
  maxPropertyValue: null,
  searchTerm: '',
  
  // Actions
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSuburbFilter: (suburbs) => set({ suburbFilter: suburbs }),
  setPropertyTypeFilter: (types) => set({ propertyTypeFilter: types }),
  setLoanPurposeFilter: (purposes) => set({ loanPurposeFilter: purposes }),
  setMinLoanAmount: (amount) => set({ minLoanAmount: amount }),
  setMaxLoanAmount: (amount) => set({ maxLoanAmount: amount }),
  setMinPropertyValue: (value) => set({ minPropertyValue: value }),
  setMaxPropertyValue: (value) => set({ maxPropertyValue: value }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  resetFilters: () => set({
    statusFilter: 'all',
    suburbFilter: [],
    propertyTypeFilter: [],
    loanPurposeFilter: [],
    minLoanAmount: null,
    maxLoanAmount: null,
    minPropertyValue: null,
    maxPropertyValue: null,
    searchTerm: ''
  })
}));
