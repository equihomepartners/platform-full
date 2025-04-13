import { create } from 'zustand';

interface UnderwritingParameter {
  id: string;
  name: string;
  description: string;
  category: string;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  isActive: boolean;
}

interface ParameterState {
  parameters: UnderwritingParameter[];
  selectedParameterId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setParameters: (parameters: UnderwritingParameter[]) => void;
  setSelectedParameterId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateParameter: (id: string, parameter: Partial<UnderwritingParameter>) => void;
  resetToDefaults: () => void;
}

// Mock data for development
const mockParameters: UnderwritingParameter[] = [
  {
    id: '1',
    name: 'Maximum LTV',
    description: 'Maximum loan-to-value ratio for approval',
    category: 'loan',
    value: 70,
    unit: '%',
    minValue: 50,
    maxValue: 80,
    defaultValue: 70,
    isActive: true
  },
  {
    id: '2',
    name: 'Maximum Combined LTV',
    description: 'Maximum combined loan-to-value ratio for approval',
    category: 'loan',
    value: 80,
    unit: '%',
    minValue: 60,
    maxValue: 90,
    defaultValue: 80,
    isActive: true
  },
  {
    id: '3',
    name: 'Minimum Income',
    description: 'Minimum annual income for approval',
    category: 'borrower',
    value: 100000,
    unit: 'AUD',
    minValue: 80000,
    maxValue: 150000,
    defaultValue: 100000,
    isActive: true
  },
  {
    id: '4',
    name: 'Minimum Property Value',
    description: 'Minimum property value for approval',
    category: 'property',
    value: 1000000,
    unit: 'AUD',
    minValue: 750000,
    maxValue: 1500000,
    defaultValue: 1000000,
    isActive: true
  },
  {
    id: '5',
    name: 'Interest Rate',
    description: 'Simple interest rate for loans',
    category: 'loan',
    value: 5,
    unit: '%',
    minValue: 4,
    maxValue: 7,
    defaultValue: 5,
    isActive: true
  },
  {
    id: '6',
    name: 'Origination Fee',
    description: 'Origination fee for loans',
    category: 'loan',
    value: 3,
    unit: '%',
    minValue: 2,
    maxValue: 4,
    defaultValue: 3,
    isActive: true
  },
  {
    id: '7',
    name: 'Appreciation Share',
    description: 'Share of property appreciation',
    category: 'loan',
    value: 20,
    unit: '%',
    minValue: 15,
    maxValue: 25,
    defaultValue: 20,
    isActive: true
  }
];

export const useParameterStore = create<ParameterState>((set) => ({
  parameters: mockParameters,
  selectedParameterId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setParameters: (parameters) => set({ parameters }),
  setSelectedParameterId: (id) => set({ selectedParameterId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  updateParameter: (id, updatedParameter) => set((state) => ({
    parameters: state.parameters.map((parameter) =>
      parameter.id === id ? { ...parameter, ...updatedParameter } : parameter
    )
  })),
  
  resetToDefaults: () => set((state) => ({
    parameters: state.parameters.map((parameter) => ({
      ...parameter,
      value: parameter.defaultValue
    }))
  }))
}));
