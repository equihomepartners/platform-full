/**
 * Settings Store
 * 
 * This store manages the settings state, including API URL, theme, and refresh interval.
 */

import { create } from 'zustand';
import { getSettings, updateSettings } from '../services/api';

interface SettingsState {
  // Settings data
  apiUrl: string;
  useMockData: boolean;
  theme: 'light' | 'dark';
  refreshInterval: number; // in milliseconds
  
  // Loading states
  loading: boolean;
  updating: boolean;
  
  // Error states
  error: Error | null;
  updateError: Error | null;
  
  // Actions
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<Pick<SettingsState, 'apiUrl' | 'useMockData' | 'theme' | 'refreshInterval'>>) => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => Promise<void>;
  setRefreshInterval: (interval: number) => Promise<void>;
  setUseMockData: (useMockData: boolean) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Initial state
  apiUrl: '/api',
  useMockData: true,
  theme: 'light',
  refreshInterval: 60000, // 1 minute
  
  loading: false,
  updating: false,
  
  error: null,
  updateError: null,
  
  // Actions
  fetchSettings: async () => {
    try {
      set({ loading: true, error: null });
      const settings = await getSettings();
      set({ 
        apiUrl: settings.apiUrl,
        useMockData: settings.useMockData,
        theme: settings.theme,
        refreshInterval: settings.refreshInterval,
        loading: false
      });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  
  updateSettings: async (settings) => {
    try {
      set({ updating: true, updateError: null });
      const currentSettings = {
        apiUrl: get().apiUrl,
        useMockData: get().useMockData,
        theme: get().theme,
        refreshInterval: get().refreshInterval
      };
      
      const updatedSettings = {
        ...currentSettings,
        ...settings
      };
      
      await updateSettings(updatedSettings);
      set({ 
        ...updatedSettings,
        updating: false
      });
    } catch (error) {
      set({ updateError: error as Error, updating: false });
    }
  },
  
  setTheme: async (theme) => {
    await get().updateSettings({ theme });
  },
  
  setRefreshInterval: async (refreshInterval) => {
    await get().updateSettings({ refreshInterval });
  },
  
  setUseMockData: async (useMockData) => {
    await get().updateSettings({ useMockData });
  }
}));
