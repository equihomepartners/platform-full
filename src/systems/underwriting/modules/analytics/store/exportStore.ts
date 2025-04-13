import { create } from 'zustand';
import { Export } from '../types';

interface ExportState {
  exports: Export[];
  selectedExportId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setExports: (exports: Export[]) => void;
  setSelectedExportId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addExport: (exportItem: Export) => void;
  updateExport: (id: string, exportItem: Partial<Export>) => void;
  deleteExport: (id: string) => void;
}

// Mock data for development
const mockExports: Export[] = [
  {
    id: '1',
    name: 'Monthly Performance Report - October 2023',
    type: 'report',
    format: 'pdf',
    status: 'completed',
    createdBy: 'admin',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    fileUrl: '/exports/report-1.pdf',
    fileSize: 1024 * 1024 * 2.5, // 2.5 MB
    sourceId: '1',
    sourceName: 'Monthly Performance Report'
  },
  {
    id: '2',
    name: 'Deal Data Export - Q3 2023',
    type: 'data',
    format: 'csv',
    status: 'completed',
    createdBy: 'admin',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    fileUrl: '/exports/deals-q3-2023.csv',
    fileSize: 1024 * 1024 * 1.2, // 1.2 MB
    sourceId: 'deals',
    sourceName: 'Deal Data'
  },
  {
    id: '3',
    name: 'Executive Dashboard - November 2023',
    type: 'dashboard',
    format: 'pdf',
    status: 'in-progress',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    sourceId: '1',
    sourceName: 'Executive Dashboard'
  }
];

export const useExportStore = create<ExportState>((set) => ({
  exports: mockExports,
  selectedExportId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setExports: (exports) => set({ exports }),
  setSelectedExportId: (id) => set({ selectedExportId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addExport: (exportItem) => set((state) => ({
    exports: [...state.exports, exportItem]
  })),
  
  updateExport: (id, updatedExport) => set((state) => ({
    exports: state.exports.map((exportItem) =>
      exportItem.id === id ? { ...exportItem, ...updatedExport } : exportItem
    )
  })),
  
  deleteExport: (id) => set((state) => ({
    exports: state.exports.filter((exportItem) => exportItem.id !== id)
  }))
}));
