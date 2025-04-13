/**
 * Simulation Store
 * 
 * This store manages the simulation state, including simulation parameters,
 * simulation results, and simulation status.
 */

import { create } from 'zustand';
import { runSimulation, getSimulationStatus, getSimulationResults } from '../services/api';

interface SimulationState {
  // Simulation data
  simulationId: string | null;
  status: 'idle' | 'running' | 'completed' | 'failed';
  parameters: any | null;
  results: any | null;
  
  // Loading states
  loading: boolean;
  
  // Error states
  error: Error | null;
  
  // Actions
  setParameters: (parameters: any) => void;
  runSimulation: () => Promise<void>;
  checkStatus: () => Promise<void>;
  fetchResults: () => Promise<void>;
  reset: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  // Initial state
  simulationId: null,
  status: 'idle',
  parameters: null,
  results: null,
  
  loading: false,
  
  error: null,
  
  // Actions
  setParameters: (parameters) => {
    set({ parameters });
  },
  
  runSimulation: async () => {
    try {
      const { parameters } = get();
      if (!parameters) {
        throw new Error('Simulation parameters are required');
      }
      
      set({ loading: true, error: null, status: 'running' });
      const response = await runSimulation(parameters);
      set({ 
        simulationId: response.simulationId,
        loading: false
      });
      
      // Start checking status
      get().checkStatus();
    } catch (error) {
      set({ 
        error: error as Error, 
        loading: false,
        status: 'failed'
      });
    }
  },
  
  checkStatus: async () => {
    try {
      const { simulationId } = get();
      if (!simulationId) {
        throw new Error('Simulation ID is required');
      }
      
      const response = await getSimulationStatus(simulationId);
      set({ status: response.status as any });
      
      if (response.status === 'completed') {
        get().fetchResults();
      } else if (response.status === 'running') {
        // Check again in 2 seconds
        setTimeout(() => {
          get().checkStatus();
        }, 2000);
      }
    } catch (error) {
      set({ 
        error: error as Error,
        status: 'failed'
      });
    }
  },
  
  fetchResults: async () => {
    try {
      const { simulationId } = get();
      if (!simulationId) {
        throw new Error('Simulation ID is required');
      }
      
      set({ loading: true, error: null });
      const results = await getSimulationResults(simulationId);
      set({ results, loading: false });
    } catch (error) {
      set({ 
        error: error as Error, 
        loading: false
      });
    }
  },
  
  reset: () => {
    set({
      simulationId: null,
      status: 'idle',
      parameters: null,
      results: null,
      loading: false,
      error: null
    });
  }
}));
