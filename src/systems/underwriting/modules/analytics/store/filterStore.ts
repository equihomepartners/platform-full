import { create } from 'zustand';

interface AnalyticsFilterState {
  metricCategoryFilter: string;
  reportTypeFilter: string;
  dashboardTypeFilter: string;
  dateRangeFilter: {
    startDate: string | null;
    endDate: string | null;
  };
  searchTerm: string;
  
  // Actions
  setMetricCategoryFilter: (category: string) => void;
  setReportTypeFilter: (type: string) => void;
  setDashboardTypeFilter: (type: string) => void;
  setDateRangeFilter: (range: { startDate: string | null; endDate: string | null }) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

export const useAnalyticsFilterStore = create<AnalyticsFilterState>((set) => ({
  metricCategoryFilter: 'all',
  reportTypeFilter: 'all',
  dashboardTypeFilter: 'all',
  dateRangeFilter: {
    startDate: null,
    endDate: null
  },
  searchTerm: '',
  
  // Actions
  setMetricCategoryFilter: (category) => set({ metricCategoryFilter: category }),
  setReportTypeFilter: (type) => set({ reportTypeFilter: type }),
  setDashboardTypeFilter: (type) => set({ dashboardTypeFilter: type }),
  setDateRangeFilter: (range) => set({ dateRangeFilter: range }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  resetFilters: () => set({
    metricCategoryFilter: 'all',
    reportTypeFilter: 'all',
    dashboardTypeFilter: 'all',
    dateRangeFilter: {
      startDate: null,
      endDate: null
    },
    searchTerm: ''
  })
}));
