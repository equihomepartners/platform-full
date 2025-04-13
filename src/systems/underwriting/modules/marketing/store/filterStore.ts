import { create } from 'zustand';

interface MarketingFilterState {
  propertyStatusFilter: string;
  trafficLightZoneFilter: string[];
  suburbFilter: string[];
  propertyTypeFilter: string[];
  minPropertyValue: number | null;
  maxPropertyValue: number | null;
  campaignStatusFilter: string;
  leadStatusFilter: string;
  searchTerm: string;
  
  // Actions
  setPropertyStatusFilter: (status: string) => void;
  setTrafficLightZoneFilter: (zones: string[]) => void;
  setSuburbFilter: (suburbs: string[]) => void;
  setPropertyTypeFilter: (types: string[]) => void;
  setMinPropertyValue: (value: number | null) => void;
  setMaxPropertyValue: (value: number | null) => void;
  setCampaignStatusFilter: (status: string) => void;
  setLeadStatusFilter: (status: string) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

export const useMarketingFilterStore = create<MarketingFilterState>((set) => ({
  propertyStatusFilter: 'all',
  trafficLightZoneFilter: [],
  suburbFilter: [],
  propertyTypeFilter: [],
  minPropertyValue: null,
  maxPropertyValue: null,
  campaignStatusFilter: 'all',
  leadStatusFilter: 'all',
  searchTerm: '',
  
  // Actions
  setPropertyStatusFilter: (status) => set({ propertyStatusFilter: status }),
  setTrafficLightZoneFilter: (zones) => set({ trafficLightZoneFilter: zones }),
  setSuburbFilter: (suburbs) => set({ suburbFilter: suburbs }),
  setPropertyTypeFilter: (types) => set({ propertyTypeFilter: types }),
  setMinPropertyValue: (value) => set({ minPropertyValue: value }),
  setMaxPropertyValue: (value) => set({ maxPropertyValue: value }),
  setCampaignStatusFilter: (status) => set({ campaignStatusFilter: status }),
  setLeadStatusFilter: (status) => set({ leadStatusFilter: status }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  resetFilters: () => set({
    propertyStatusFilter: 'all',
    trafficLightZoneFilter: [],
    suburbFilter: [],
    propertyTypeFilter: [],
    minPropertyValue: null,
    maxPropertyValue: null,
    campaignStatusFilter: 'all',
    leadStatusFilter: 'all',
    searchTerm: ''
  })
}));
