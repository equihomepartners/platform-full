import { create } from 'zustand';

interface FundModelInputs {
  targetAUM: number;
  numberOfDeals: number;
  averageDealSize: number;
  averageExitTerm: number;
  ltvDistribution: {
    min: number;
    max: number;
    mean: number;
    standardDev: number;
  };
  growthDistribution: {
    min: number;
    max: number;
    mean: number;
    standardDev: number;
  };
  propertyValueDistribution: {
    min: number;
    max: number;
    mean: number;
    standardDev: number;
  };
}

interface FundStore {
  inputs: FundModelInputs;
  updateInput: (field: string, value: number) => void;
  updateDealSize: (field: 'targetAUM' | 'numberOfDeals', value: number) => void;
}

export const useFundStore = create<FundStore>((set) => ({
  inputs: {
    targetAUM: 500000000, // $500M
    numberOfDeals: 500,
    averageDealSize: 1000000, // Calculated from targetAUM / numberOfDeals
    averageExitTerm: 4.5,
    ltvDistribution: {
      min: 15,
      max: 75,
      mean: 30,
      standardDev: 10
    },
    growthDistribution: {
      min: 2,
      max: 12,
      mean: 6,
      standardDev: 2
    },
    propertyValueDistribution: {
      min: 1000000,
      max: 10000000,
      mean: 3000000,
      standardDev: 1000000
    }
  },
  updateInput: (field: string, value: number) => 
    set(state => {
      const newInputs = { ...state.inputs };
      if (field.includes('.')) {
        const [category, subfield] = field.split('.');
        (newInputs as any)[category][subfield] = value;
      } else {
        (newInputs as any)[field] = value;
      }
      return { inputs: newInputs };
    }),
  updateDealSize: (field: 'targetAUM' | 'numberOfDeals', value: number) =>
    set(state => {
      const newInputs = { ...state.inputs };
      newInputs[field] = value;
      newInputs.averageDealSize = newInputs.targetAUM / newInputs.numberOfDeals;
      return { inputs: newInputs };
    })
}));