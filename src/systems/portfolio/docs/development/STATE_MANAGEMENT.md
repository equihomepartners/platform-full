# Portfolio Management System State Management

This document outlines the state management approach for the Portfolio Management System, including store structure, data flow, and best practices.

## State Management Overview

The Portfolio Management System uses Zustand for state management, providing a simple and flexible approach to managing global state. This approach offers several advantages:

1. **Simplicity**: Zustand has a simple API with minimal boilerplate
2. **Performance**: Zustand uses React hooks for efficient updates
3. **Flexibility**: Zustand allows for custom middleware and store composition
4. **TypeScript Support**: Zustand has excellent TypeScript support
5. **DevTools Integration**: Zustand integrates with Redux DevTools

## Store Structure

The state management in the Portfolio Management System is organized into the following stores:

### Fund Parameters Store

Manages fund parameters such as target IRR, max LTV, and allocation targets.

```typescript
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface FundParametersState {
  // Target parameters
  targetIRR: number;
  targetROI: number;
  targetCashYield: number;
  
  // Risk parameters
  maxLTV: number;
  maxDefaultProbability: number;
  minCashReserve: number;
  
  // Allocation parameters
  minGreenZoneAllocation: number;
  maxYellowZoneAllocation: number;
  maxRedZoneAllocation: number;
  maxSuburbExposure: number;
  maxPropertyTypeExposure: number;
  
  // Actions
  setTargetIRR: (value: number) => void;
  setTargetROI: (value: number) => void;
  setTargetCashYield: (value: number) => void;
  setMaxLTV: (value: number) => void;
  setMaxDefaultProbability: (value: number) => void;
  setMinCashReserve: (value: number) => void;
  setMinGreenZoneAllocation: (value: number) => void;
  setMaxYellowZoneAllocation: (value: number) => void;
  setMaxRedZoneAllocation: (value: number) => void;
  setMaxSuburbExposure: (value: number) => void;
  setMaxPropertyTypeExposure: (value: number) => void;
  resetToDefaults: () => void;
}

const defaultParameters = {
  targetIRR: 18,
  targetROI: 22,
  targetCashYield: 8,
  maxLTV: 75,
  maxDefaultProbability: 2.5,
  minCashReserve: 10,
  minGreenZoneAllocation: 80,
  maxYellowZoneAllocation: 20,
  maxRedZoneAllocation: 0,
  maxSuburbExposure: 25,
  maxPropertyTypeExposure: 50,
};

export const useFundParametersStore = create<FundParametersState>(
  persist(
    (set) => ({
      ...defaultParameters,
      
      setTargetIRR: (value) => set({ targetIRR: value }),
      setTargetROI: (value) => set({ targetROI: value }),
      setTargetCashYield: (value) => set({ targetCashYield: value }),
      setMaxLTV: (value) => set({ maxLTV: value }),
      setMaxDefaultProbability: (value) => set({ maxDefaultProbability: value }),
      setMinCashReserve: (value) => set({ minCashReserve: value }),
      setMinGreenZoneAllocation: (value) => set({ minGreenZoneAllocation: value }),
      setMaxYellowZoneAllocation: (value) => set({ maxYellowZoneAllocation: value }),
      setMaxRedZoneAllocation: (value) => set({ maxRedZoneAllocation: value }),
      setMaxSuburbExposure: (value) => set({ maxSuburbExposure: value }),
      setMaxPropertyTypeExposure: (value) => set({ maxPropertyTypeExposure: value }),
      resetToDefaults: () => set(defaultParameters),
    }),
    {
      name: 'fund-parameters',
    }
  )
);
```

### Portfolio Store

Manages portfolio data, including deals, metrics, and performance.

```typescript
import create from 'zustand';
import { mockPortfolioData } from '../data/mockData';
import { PortfolioData, Deal } from '../types';

interface PortfolioState {
  // Portfolio data
  data: PortfolioData | null;
  deals: Deal[];
  loading: boolean;
  error: Error | null;
  
  // Actions
  fetchPortfolioData: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  addDeal: (deal: Deal) => void;
  updateDeal: (dealId: string, updates: Partial<Deal>) => void;
  removeDeal: (dealId: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  data: null,
  deals: [],
  loading: false,
  error: null,
  
  fetchPortfolioData: async () => {
    try {
      set({ loading: true });
      
      // In a real implementation, this would be an API call
      // For now, we're using mock data
      // const response = await fetch('/api/portfolio/summary');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ data: mockPortfolioData, loading: false, error: null });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  
  fetchDeals: async () => {
    try {
      set({ loading: true });
      
      // In a real implementation, this would be an API call
      // For now, we're using mock data
      // const response = await fetch('/api/deals');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ deals: mockPortfolioData.deals, loading: false, error: null });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  
  addDeal: (deal) => {
    set(state => ({
      deals: [...state.deals, deal]
    }));
  },
  
  updateDeal: (dealId, updates) => {
    set(state => ({
      deals: state.deals.map(deal => 
        deal.id === dealId ? { ...deal, ...updates } : deal
      )
    }));
  },
  
  removeDeal: (dealId) => {
    set(state => ({
      deals: state.deals.filter(deal => deal.id !== dealId)
    }));
  },
}));
```

### Simulation Store

Manages simulation data, including scenarios, results, and optimization settings.

```typescript
import create from 'zustand';
import { SimulationScenario, SimulationResult, OptimizationSettings } from '../types';
import { mockSimulationResults } from '../data/mockData';

interface SimulationState {
  // Simulation data
  scenarios: SimulationScenario[];
  currentScenario: SimulationScenario | null;
  results: SimulationResult | null;
  optimizationSettings: OptimizationSettings;
  loading: boolean;
  error: Error | null;
  
  // Actions
  setCurrentScenario: (scenario: SimulationScenario) => void;
  updateScenario: (updates: Partial<SimulationScenario>) => void;
  runSimulation: () => Promise<void>;
  saveScenario: () => void;
  deleteScenario: (scenarioId: string) => void;
  setOptimizationSettings: (settings: Partial<OptimizationSettings>) => void;
  runOptimization: () => Promise<void>;
}

const defaultOptimizationSettings: OptimizationSettings = {
  objectives: {
    maximizeReturn: 0.7,
    minimizeRisk: 0.3,
  },
  constraints: {
    maxRisk: 0.5,
    maxSuburbExposure: 25,
    maxPropertyTypeExposure: 50,
    minGreenZoneAllocation: 80,
    maxRedZoneAllocation: 0,
  },
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  scenarios: [],
  currentScenario: null,
  results: null,
  optimizationSettings: defaultOptimizationSettings,
  loading: false,
  error: null,
  
  setCurrentScenario: (scenario) => {
    set({ currentScenario: scenario });
  },
  
  updateScenario: (updates) => {
    set(state => ({
      currentScenario: state.currentScenario 
        ? { ...state.currentScenario, ...updates } 
        : null
    }));
  },
  
  runSimulation: async () => {
    try {
      const { currentScenario } = get();
      
      if (!currentScenario) {
        throw new Error('No scenario selected');
      }
      
      set({ loading: true });
      
      // In a real implementation, this would be an API call
      // For now, we're using mock data
      // const response = await fetch('/api/simulations/scenario', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(currentScenario),
      // });
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ 
        results: {
          ...mockSimulationResults,
          id: `sim-${Date.now()}`,
          name: currentScenario.name,
          description: currentScenario.description,
          parameters: currentScenario.parameters,
        }, 
        loading: false, 
        error: null 
      });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  
  saveScenario: () => {
    const { currentScenario, scenarios } = get();
    
    if (!currentScenario) {
      return;
    }
    
    // If the scenario already exists, update it
    if (currentScenario.id) {
      set(state => ({
        scenarios: state.scenarios.map(scenario => 
          scenario.id === currentScenario.id ? currentScenario : scenario
        )
      }));
    } else {
      // Otherwise, add it as a new scenario
      const newScenario = {
        ...currentScenario,
        id: `scenario-${Date.now()}`,
      };
      
      set(state => ({
        scenarios: [...state.scenarios, newScenario],
        currentScenario: newScenario,
      }));
    }
  },
  
  deleteScenario: (scenarioId) => {
    set(state => ({
      scenarios: state.scenarios.filter(scenario => scenario.id !== scenarioId),
      currentScenario: state.currentScenario?.id === scenarioId 
        ? null 
        : state.currentScenario,
    }));
  },
  
  setOptimizationSettings: (settings) => {
    set(state => ({
      optimizationSettings: {
        ...state.optimizationSettings,
        ...settings,
      },
    }));
  },
  
  runOptimization: async () => {
    try {
      const { optimizationSettings } = get();
      
      set({ loading: true });
      
      // In a real implementation, this would be an API call
      // For now, we're using mock data
      // const response = await fetch('/api/simulations/optimization', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(optimizationSettings),
      // });
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ 
        results: {
          ...mockSimulationResults,
          id: `opt-${Date.now()}`,
          name: 'Portfolio Optimization',
          description: 'Optimized portfolio allocation based on constraints',
          parameters: optimizationSettings,
        }, 
        loading: false, 
        error: null 
      });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
}));
```

### Integration Store

Manages integration with other systems, such as the Traffic Light System and Underwriting System.

```typescript
import create from 'zustand';
import { SuburbClassification, SuburbAnalysis } from '../types';
import { mockSuburbClassifications, mockSuburbAnalysis } from '../data/mockData';

interface IntegrationState {
  // Traffic Light System data
  suburbClassifications: SuburbClassification[];
  suburbAnalysis: Record<string, SuburbAnalysis>;
  
  // Loading states
  loadingClassifications: boolean;
  loadingAnalysis: boolean;
  
  // Errors
  classificationError: Error | null;
  analysisError: Error | null;
  
  // Actions
  fetchSuburbClassifications: () => Promise<void>;
  fetchSuburbAnalysis: (suburb: string) => Promise<void>;
}

export const useIntegrationStore = create<IntegrationState>((set, get) => ({
  suburbClassifications: [],
  suburbAnalysis: {},
  loadingClassifications: false,
  loadingAnalysis: false,
  classificationError: null,
  analysisError: null,
  
  fetchSuburbClassifications: async () => {
    try {
      set({ loadingClassifications: true });
      
      // In a real implementation, this would be an API call
      // For now, we're using mock data
      // const response = await fetch('/api/traffic-light/suburbs/classification');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        suburbClassifications: mockSuburbClassifications, 
        loadingClassifications: false, 
        classificationError: null 
      });
    } catch (error) {
      set({ 
        classificationError: error as Error, 
        loadingClassifications: false 
      });
    }
  },
  
  fetchSuburbAnalysis: async (suburb) => {
    try {
      set({ loadingAnalysis: true });
      
      // In a real implementation, this would be an API call
      // For now, we're using mock data
      // const response = await fetch(`/api/traffic-light/suburbs/analysis/${suburb}`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({ 
        suburbAnalysis: {
          ...state.suburbAnalysis,
          [suburb]: mockSuburbAnalysis[suburb] || {
            suburb,
            riskScore: 0.5,
            growthForecast: 5.0,
            marketCycle: 'growth',
          },
        }, 
        loadingAnalysis: false, 
        analysisError: null 
      }));
    } catch (error) {
      set({ 
        analysisError: error as Error, 
        loadingAnalysis: false 
      });
    }
  },
}));
```

## Store Composition

The stores can be composed together to create a unified state management system. This allows for separation of concerns while still enabling interaction between different parts of the state.

```typescript
import { usePortfolioStore } from './portfolioStore';
import { useFundParametersStore } from './fundParametersStore';
import { useSimulationStore } from './simulationStore';
import { useIntegrationStore } from './integrationStore';

export const useStore = () => {
  const portfolio = usePortfolioStore();
  const fundParameters = useFundParametersStore();
  const simulation = useSimulationStore();
  const integration = useIntegrationStore();
  
  return {
    portfolio,
    fundParameters,
    simulation,
    integration,
  };
};
```

## Data Flow

The data flow in the Portfolio Management System follows these patterns:

### Component to Store

Components interact with stores through hooks, dispatching actions to update state.

```tsx
import { useFundParametersStore } from '../store/fundParametersStore';

export const TargetParametersForm = () => {
  const { targetIRR, setTargetIRR } = useFundParametersStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetIRR(parseFloat(e.target.value));
  };
  
  return (
    <div>
      <label htmlFor="targetIRR">Target IRR (%)</label>
      <input
        id="targetIRR"
        type="number"
        value={targetIRR}
        onChange={handleChange}
        min={0}
        max={100}
        step={0.1}
      />
    </div>
  );
};
```

### Store to Component

Components subscribe to store updates and re-render when the state changes.

```tsx
import { usePortfolioStore } from '../store/portfolioStore';

export const PortfolioSummary = () => {
  const { data, loading, error, fetchPortfolioData } = usePortfolioStore();
  
  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!data) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Total Value: ${data.totalValue.toLocaleString()}</p>
      <p>Loan Count: {data.loanCount}</p>
      <p>Average LTV: {data.averageLTV}%</p>
    </div>
  );
};
```

### Store to Store

Stores can interact with each other through selectors and actions.

```tsx
import create from 'zustand';
import { usePortfolioStore } from './portfolioStore';
import { useFundParametersStore } from './fundParametersStore';

interface AnalyticsState {
  // Analytics data
  performanceVsTarget: {
    irr: {
      actual: number;
      target: number;
      variance: number;
    };
    roi: {
      actual: number;
      target: number;
      variance: number;
    };
    cashYield: {
      actual: number;
      target: number;
      variance: number;
    };
  };
  
  // Actions
  calculatePerformanceVsTarget: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  performanceVsTarget: {
    irr: { actual: 0, target: 0, variance: 0 },
    roi: { actual: 0, target: 0, variance: 0 },
    cashYield: { actual: 0, target: 0, variance: 0 },
  },
  
  calculatePerformanceVsTarget: () => {
    const portfolioData = usePortfolioStore.getState().data;
    const { targetIRR, targetROI, targetCashYield } = useFundParametersStore.getState();
    
    if (!portfolioData) {
      return;
    }
    
    const { irr, roi, cashYield } = portfolioData.performanceMetrics;
    
    set({
      performanceVsTarget: {
        irr: {
          actual: irr,
          target: targetIRR,
          variance: irr - targetIRR,
        },
        roi: {
          actual: roi,
          target: targetROI,
          variance: roi - targetROI,
        },
        cashYield: {
          actual: cashYield,
          target: targetCashYield,
          variance: cashYield - targetCashYield,
        },
      },
    });
  },
}));
```

### API to Store

Stores fetch data from APIs and update their state accordingly.

```typescript
fetchPortfolioData: async () => {
  try {
    set({ loading: true });
    
    const response = await fetch('/api/portfolio/summary');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    set({ data: data.data, loading: false, error: null });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    
    // Fall back to mock data if API call fails
    set({ 
      data: mockPortfolioData, 
      loading: false, 
      error: error as Error 
    });
  }
},
```

## Best Practices

### Selectors

Use selectors to derive state from the store, avoiding unnecessary re-renders.

```typescript
import { usePortfolioStore } from '../store/portfolioStore';

// Define a selector to get only the required data
const selectPortfolioMetrics = (state) => state.data?.performanceMetrics;

export const PerformanceMetrics = () => {
  // Only re-render when performanceMetrics changes
  const performanceMetrics = usePortfolioStore(selectPortfolioMetrics);
  
  if (!performanceMetrics) {
    return <div>No metrics available</div>;
  }
  
  return (
    <div>
      <p>IRR: {performanceMetrics.irr}%</p>
      <p>ROI: {performanceMetrics.roi}%</p>
      <p>Cash Yield: {performanceMetrics.cashYield}%</p>
    </div>
  );
};
```

### Middleware

Use middleware to add functionality to stores, such as persistence, logging, or side effects.

```typescript
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useFundParametersStore = create<FundParametersState>(
  devtools(
    persist(
      (set) => ({
        // Store implementation
      }),
      {
        name: 'fund-parameters',
      }
    )
  )
);
```

### Immutability

Always update state immutably to ensure proper re-rendering and avoid bugs.

```typescript
// Good: Immutable update
updateDeal: (dealId, updates) => {
  set(state => ({
    deals: state.deals.map(deal => 
      deal.id === dealId ? { ...deal, ...updates } : deal
    )
  }));
},

// Bad: Mutable update
updateDeal: (dealId, updates) => {
  const deals = get().deals;
  const dealIndex = deals.findIndex(deal => deal.id === dealId);
  
  if (dealIndex !== -1) {
    deals[dealIndex] = { ...deals[dealIndex], ...updates };
    set({ deals });
  }
},
```

### Error Handling

Implement robust error handling in store actions to ensure a good user experience.

```typescript
fetchPortfolioData: async () => {
  try {
    set({ loading: true });
    
    const response = await fetch('/api/portfolio/summary');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    set({ data: data.data, loading: false, error: null });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    
    // Fall back to mock data if API call fails
    set({ 
      data: mockPortfolioData, 
      loading: false, 
      error: error as Error 
    });
  }
},
```

### Loading States

Include loading states in stores to provide feedback to users during asynchronous operations.

```typescript
interface PortfolioState {
  data: PortfolioData | null;
  loading: boolean;
  error: Error | null;
  // ...
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  data: null,
  loading: false,
  error: null,
  
  fetchPortfolioData: async () => {
    try {
      set({ loading: true });
      // Fetch data...
      set({ data, loading: false, error: null });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  // ...
}));
```

### Mock Data Integration

Implement fallback mechanisms to use mock data when API calls fail, ensuring a smooth development experience.

```typescript
fetchPortfolioData: async () => {
  try {
    set({ loading: true });
    
    const response = await fetch('/api/portfolio/summary');
    
    if (!response.ok) {
      // Fall back to mock data if API call fails
      set({ data: mockPortfolioData, loading: false, error: null });
      return;
    }
    
    const data = await response.json();
    
    set({ data: data.data, loading: false, error: null });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    
    // Fall back to mock data if API call fails
    set({ data: mockPortfolioData, loading: false, error: null });
  }
},
```

## Conclusion

The state management approach for the Portfolio Management System provides a flexible, efficient, and maintainable way to manage application state. By following the patterns and best practices outlined in this document, developers can create a consistent and reliable state management system that supports the complex requirements of the Portfolio Management System.
