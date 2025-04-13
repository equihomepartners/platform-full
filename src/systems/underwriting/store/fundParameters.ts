// Fund Parameters Store
// This file contains the fund parameters store for the Underwriting System

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FundParameters {
  // Loan parameters
  maxLTV: number;
  maxCombinedLTV: number;
  interestRate: number;
  originationFee: number;
  appreciationShare: number;
  
  // Property parameters
  minPropertyValue: number;
  maxPropertyValue: number;
  maxLoanSize: number;
  
  // Financial parameters
  targetIRR: number;
  minimumIRR: number;
  
  // Zone allocation
  zoneAllocation: {
    green: number;
    orange: number;
    red: number;
  };
  
  // Property type allocation
  propertyTypeAllocation: {
    house: number;
    townhouse: number;
    apartment: number;
    other: number;
  };
  
  // Loan purpose allocation
  loanPurposeAllocation: {
    purchase: number;
    refinance: number;
    cashout: number;
    construction: number;
    other: number;
  };
  
  // Update functions
  setMaxLTV: (value: number) => void;
  setMaxCombinedLTV: (value: number) => void;
  setInterestRate: (value: number) => void;
  setOriginationFee: (value: number) => void;
  setAppreciationShare: (value: number) => void;
  setMinPropertyValue: (value: number) => void;
  setMaxPropertyValue: (value: number) => void;
  setMaxLoanSize: (value: number) => void;
  setTargetIRR: (value: number) => void;
  setMinimumIRR: (value: number) => void;
  setZoneAllocation: (green: number, orange: number, red: number) => void;
  setPropertyTypeAllocation: (house: number, townhouse: number, apartment: number, other: number) => void;
  setLoanPurposeAllocation: (purchase: number, refinance: number, cashout: number, construction: number, other: number) => void;
  resetToDefaults: () => void;
}

// Default fund parameters
const defaultFundParameters = {
  // Loan parameters
  maxLTV: 70,
  maxCombinedLTV: 80,
  interestRate: 5,
  originationFee: 3,
  appreciationShare: 20,
  
  // Property parameters
  minPropertyValue: 500000,
  maxPropertyValue: 5000000,
  maxLoanSize: 1000000,
  
  // Financial parameters
  targetIRR: 8,
  minimumIRR: 6,
  
  // Zone allocation
  zoneAllocation: {
    green: 80,
    orange: 20,
    red: 0,
  },
  
  // Property type allocation
  propertyTypeAllocation: {
    house: 50,
    townhouse: 20,
    apartment: 25,
    other: 5,
  },
  
  // Loan purpose allocation
  loanPurposeAllocation: {
    purchase: 40,
    refinance: 30,
    cashout: 20,
    construction: 5,
    other: 5,
  },
};

// Create the fund parameters store
export const useFundParameters = create<FundParameters>()(
  persist(
    (set) => ({
      ...defaultFundParameters,
      
      // Update functions
      setMaxLTV: (value: number) => set({ maxLTV: value }),
      setMaxCombinedLTV: (value: number) => set({ maxCombinedLTV: value }),
      setInterestRate: (value: number) => set({ interestRate: value }),
      setOriginationFee: (value: number) => set({ originationFee: value }),
      setAppreciationShare: (value: number) => set({ appreciationShare: value }),
      setMinPropertyValue: (value: number) => set({ minPropertyValue: value }),
      setMaxPropertyValue: (value: number) => set({ maxPropertyValue: value }),
      setMaxLoanSize: (value: number) => set({ maxLoanSize: value }),
      setTargetIRR: (value: number) => set({ targetIRR: value }),
      setMinimumIRR: (value: number) => set({ minimumIRR: value }),
      
      setZoneAllocation: (green: number, orange: number, red: number) => set({
        zoneAllocation: { green, orange, red }
      }),
      
      setPropertyTypeAllocation: (house: number, townhouse: number, apartment: number, other: number) => set({
        propertyTypeAllocation: { house, townhouse, apartment, other }
      }),
      
      setLoanPurposeAllocation: (purchase: number, refinance: number, cashout: number, construction: number, other: number) => set({
        loanPurposeAllocation: { purchase, refinance, cashout, construction, other }
      }),
      
      resetToDefaults: () => set(defaultFundParameters),
    }),
    {
      name: 'fund-parameters',
    }
  )
);
