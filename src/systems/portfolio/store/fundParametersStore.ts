/**
 * Fund Parameters Store
 * 
 * This store manages the fund parameters, including target parameters, risk parameters,
 * allocation parameters, fund structure parameters, and product design parameters.
 */

import { create } from 'zustand';
import { getFundParameters, updateFundParameters } from '../services/api';

interface FundParametersState {
  // Fund parameters
  parameters: any | null;
  
  // Loading states
  loading: boolean;
  updating: boolean;
  
  // Error states
  error: Error | null;
  updateError: Error | null;
  
  // Actions
  fetchParameters: () => Promise<void>;
  updateParameters: (parameters: any) => Promise<void>;
  updateTargetParameter: (key: string, value: number) => Promise<void>;
  updateRiskParameter: (key: string, value: number) => Promise<void>;
  updateAllocationParameter: (key: string, value: any) => Promise<void>;
  updateFundStructureParameter: (key: string, value: any) => Promise<void>;
  updateProductDesignParameter: (key: string, value: any) => Promise<void>;
}

export const useFundParametersStore = create<FundParametersState>((set, get) => ({
  // Initial state
  parameters: null,
  
  loading: false,
  updating: false,
  
  error: null,
  updateError: null,
  
  // Actions
  fetchParameters: async () => {
    try {
      set({ loading: true, error: null });
      const parameters = await getFundParameters();
      set({ parameters, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  
  updateParameters: async (parameters) => {
    try {
      set({ updating: true, updateError: null });
      await updateFundParameters(parameters);
      set({ parameters, updating: false });
    } catch (error) {
      set({ updateError: error as Error, updating: false });
    }
  },
  
  updateTargetParameter: async (key, value) => {
    const { parameters, updateParameters } = get();
    if (!parameters) return;
    
    const updatedParameters = {
      ...parameters,
      targetParameters: {
        ...parameters.targetParameters,
        [key]: value
      }
    };
    
    await updateParameters(updatedParameters);
  },
  
  updateRiskParameter: async (key, value) => {
    const { parameters, updateParameters } = get();
    if (!parameters) return;
    
    const updatedParameters = {
      ...parameters,
      riskParameters: {
        ...parameters.riskParameters,
        [key]: value
      }
    };
    
    await updateParameters(updatedParameters);
  },
  
  updateAllocationParameter: async (key, value) => {
    const { parameters, updateParameters } = get();
    if (!parameters) return;
    
    const updatedParameters = {
      ...parameters,
      allocationParameters: {
        ...parameters.allocationParameters,
        [key]: value
      }
    };
    
    await updateParameters(updatedParameters);
  },
  
  updateFundStructureParameter: async (key, value) => {
    const { parameters, updateParameters } = get();
    if (!parameters) return;
    
    const updatedParameters = {
      ...parameters,
      fundStructureParameters: {
        ...parameters.fundStructureParameters,
        [key]: value
      }
    };
    
    await updateParameters(updatedParameters);
  },
  
  updateProductDesignParameter: async (key, value) => {
    const { parameters, updateParameters } = get();
    if (!parameters) return;
    
    const updatedParameters = {
      ...parameters,
      productDesignParameters: {
        ...parameters.productDesignParameters,
        [key]: value
      }
    };
    
    await updateParameters(updatedParameters);
  }
}));
