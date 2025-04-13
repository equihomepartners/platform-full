# Portfolio Management System Component Structure

This document outlines the component structure of the Portfolio Management System, including component hierarchy, responsibilities, and interactions.

## Component Overview

The Portfolio Management System is built using a component-based architecture, with components organized into the following categories:

1. **Layout Components**: Components that define the overall layout of the system
2. **Dashboard Components**: Components that display summary information and key metrics
3. **Analysis Components**: Components that provide detailed analysis and visualizations
4. **Configuration Components**: Components that allow users to configure system parameters
5. **Simulation Components**: Components that enable scenario simulation and optimization
6. **Common Components**: Reusable components used throughout the system

## Component Hierarchy

The component hierarchy of the Portfolio Management System is as follows:

```
PortfolioLayout
├── PortfolioDashboard
│   ├── FundDashboard
│   │   ├── FundMetrics
│   │   ├── PortfolioDistribution
│   │   └── GeographicDistribution
│   └── PerformanceSummary
│       ├── ReturnMetrics
│       ├── RiskMetrics
│       └── TrendAnalysis
├── PortfolioAnalytics
│   ├── CashflowAnalysis
│   ├── IncomeAnalysis
│   ├── LTVAnalysis
│   └── RiskAnalysis
├── FundParameters
│   ├── TargetParameters
│   ├── RiskParameters
│   └── AllocationParameters
└── SimulationEngine
    ├── ScenarioBuilder
    ├── OptimizationSettings
    └── SimulationResults
```

## Component Descriptions

### Layout Components

#### PortfolioLayout

The main layout component for the Portfolio Management System, providing navigation tabs and consistent layout.

**Responsibilities:**
- Render navigation tabs for different sections
- Handle routing within the system
- Maintain consistent layout across all pages
- Manage global state and context providers

**Props:**
- `children`: React nodes to render within the layout

**Example Usage:**
```tsx
<PortfolioLayout>
  <PortfolioDashboard />
</PortfolioLayout>
```

### Dashboard Components

#### PortfolioDashboard

The main dashboard component, serving as the entry point for the Portfolio Management System.

**Responsibilities:**
- Display summary information about the portfolio
- Show key performance metrics
- Provide navigation to detailed views
- Aggregate data from multiple sources

**Props:**
- None

**Example Usage:**
```tsx
<PortfolioDashboard />
```

#### FundDashboard

Displays detailed fund performance metrics and portfolio composition.

**Responsibilities:**
- Show fund performance metrics
- Display portfolio composition and allocation
- Provide insights into fund performance
- Visualize key metrics and trends

**Props:**
- `fundId`: Optional ID of the fund to display (defaults to main fund)

**Example Usage:**
```tsx
<FundDashboard fundId="fund-001" />
```

#### FundMetrics

Displays key fund metrics such as IRR, ROI, and cash yield.

**Responsibilities:**
- Show key performance metrics
- Display trend indicators
- Provide comparison to targets
- Highlight important metrics

**Props:**
- `metrics`: Object containing metric values
- `showTrends`: Boolean indicating whether to show trend indicators

**Example Usage:**
```tsx
<FundMetrics
  metrics={{
    irr: 18.5,
    roi: 22.3,
    cashYield: 8.7,
    totalReturn: 3350000
  }}
  showTrends={true}
/>
```

#### PortfolioDistribution

Visualizes portfolio distribution across different dimensions.

**Responsibilities:**
- Show allocation by suburb, property type, and other dimensions
- Provide interactive charts for exploring distribution
- Highlight diversification metrics
- Allow filtering and sorting of data

**Props:**
- `data`: Object containing distribution data
- `dimension`: Dimension to visualize (suburb, propertyType, etc.)
- `chartType`: Type of chart to use (pie, bar, etc.)

**Example Usage:**
```tsx
<PortfolioDistribution
  data={portfolioData.allocation}
  dimension="suburb"
  chartType="pie"
/>
```

#### GeographicDistribution

Displays geographic distribution of the portfolio on a map.

**Responsibilities:**
- Show portfolio allocation on a map
- Provide suburb-level insights
- Integrate with Traffic Light System zones
- Allow interactive exploration of geographic data

**Props:**
- `data`: Object containing geographic distribution data
- `showZones`: Boolean indicating whether to show Traffic Light zones

**Example Usage:**
```tsx
<GeographicDistribution
  data={portfolioData.geographicDistribution}
  showZones={true}
/>
```

### Analysis Components

#### CashflowAnalysis

Analyzes portfolio cash flows, including historical data and projections.

**Responsibilities:**
- Display historical cash flow data
- Show projected future cash flows
- Break down cash flows by source
- Provide interactive visualizations

**Props:**
- `historicalData`: Array of historical cash flow data points
- `projectedData`: Array of projected cash flow data points
- `breakdown`: Boolean indicating whether to show breakdown by source

**Example Usage:**
```tsx
<CashflowAnalysis
  historicalData={cashflowData.historical}
  projectedData={cashflowData.projected}
  breakdown={true}
/>
```

#### IncomeAnalysis

Analyzes portfolio income, including interest income and fee income.

**Responsibilities:**
- Show income breakdown by source
- Display historical income trends
- Provide income projections
- Highlight income stability metrics

**Props:**
- `data`: Object containing income data
- `period`: Time period to analyze (monthly, quarterly, yearly)

**Example Usage:**
```tsx
<IncomeAnalysis
  data={incomeData}
  period="monthly"
/>
```

#### LTVAnalysis

Analyzes loan-to-value ratios across the portfolio.

**Responsibilities:**
- Show LTV distribution across the portfolio
- Provide risk analysis based on LTV
- Highlight high-LTV loans for monitoring
- Display LTV trends over time

**Props:**
- `data`: Object containing LTV data
- `riskThreshold`: LTV threshold for high-risk loans

**Example Usage:**
```tsx
<LTVAnalysis
  data={ltvData}
  riskThreshold={75}
/>
```

#### RiskAnalysis

Analyzes portfolio risk across multiple dimensions.

**Responsibilities:**
- Show risk metrics and indicators
- Display risk distribution across the portfolio
- Provide stress test results
- Highlight risk factors and mitigation strategies

**Props:**
- `data`: Object containing risk data
- `stressTests`: Array of stress test scenarios and results

**Example Usage:**
```tsx
<RiskAnalysis
  data={riskData}
  stressTests={stressTestData}
/>
```

### Configuration Components

#### FundParameters

Configures fund parameters such as target IRR, max LTV, and allocation targets.

**Responsibilities:**
- Allow users to set target IRR, max LTV, and other constraints
- Configure risk preferences and investment strategy
- Define allocation targets by zone
- Save and load parameter configurations

**Props:**
- `initialValues`: Object containing initial parameter values
- `onSave`: Function to call when parameters are saved

**Example Usage:**
```tsx
<FundParameters
  initialValues={{
    targetIRR: 18,
    maxLTV: 75,
    minCashReserve: 10
  }}
  onSave={handleSaveParameters}
/>
```

#### TargetParameters

Configures target parameters such as target IRR, ROI, and cash yield.

**Responsibilities:**
- Allow users to set target return metrics
- Provide guidance on realistic targets
- Show comparison to current performance
- Validate input values

**Props:**
- `values`: Object containing current parameter values
- `onChange`: Function to call when values change

**Example Usage:**
```tsx
<TargetParameters
  values={{
    targetIRR: 18,
    targetROI: 22,
    targetCashYield: 8
  }}
  onChange={handleParameterChange}
/>
```

#### RiskParameters

Configures risk parameters such as max LTV, max default probability, and stress test scenarios.

**Responsibilities:**
- Allow users to set risk thresholds and limits
- Configure stress test scenarios
- Define risk appetite and tolerance
- Validate input values

**Props:**
- `values`: Object containing current parameter values
- `onChange`: Function to call when values change

**Example Usage:**
```tsx
<RiskParameters
  values={{
    maxLTV: 75,
    maxDefaultProbability: 2.5,
    stressTestScenarios: ['interestRateIncrease', 'propertyValueDecline']
  }}
  onChange={handleParameterChange}
/>
```

#### AllocationParameters

Configures allocation parameters such as suburb allocation targets and property type allocation targets.

**Responsibilities:**
- Allow users to set allocation targets by suburb, property type, and zone
- Configure diversification requirements
- Define concentration limits
- Validate input values

**Props:**
- `values`: Object containing current parameter values
- `onChange`: Function to call when values change

**Example Usage:**
```tsx
<AllocationParameters
  values={{
    suburbAllocation: {
      Mosman: 22,
      Bondi: 18
    },
    propertyTypeAllocation: {
      House: 45,
      Apartment: 35,
      Townhouse: 20
    },
    zoneAllocation: {
      green: 85,
      yellow: 15,
      red: 0
    }
  }}
  onChange={handleParameterChange}
/>
```

### Simulation Components

#### SimulationEngine

Runs portfolio simulations and optimizations.

**Responsibilities:**
- Perform scenario analysis and stress testing
- Optimize portfolio allocation
- Project future performance
- Provide simulation results and recommendations

**Props:**
- `parameters`: Object containing simulation parameters
- `onComplete`: Function to call when simulation is complete

**Example Usage:**
```tsx
<SimulationEngine
  parameters={{
    scenarioType: 'interestRateIncrease',
    interestRateChange: 2.0,
    simulationHorizon: 5
  }}
  onComplete={handleSimulationComplete}
/>
```

#### ScenarioBuilder

Builds custom scenarios for simulation.

**Responsibilities:**
- Allow users to define scenario parameters
- Configure simulation assumptions
- Create stress test scenarios
- Validate scenario parameters

**Props:**
- `initialScenario`: Object containing initial scenario parameters
- `onScenarioChange`: Function to call when scenario parameters change
- `onRunSimulation`: Function to call when user wants to run the simulation

**Example Usage:**
```tsx
<ScenarioBuilder
  initialScenario={{
    name: 'Interest Rate Increase',
    interestRateChange: 2.0,
    propertyValueChange: -5.0
  }}
  onScenarioChange={handleScenarioChange}
  onRunSimulation={handleRunSimulation}
/>
```

#### OptimizationSettings

Configures optimization settings for portfolio allocation.

**Responsibilities:**
- Allow users to set optimization objectives and constraints
- Configure risk-return preferences
- Define rebalancing parameters
- Validate optimization settings

**Props:**
- `settings`: Object containing current optimization settings
- `onChange`: Function to call when settings change
- `onRunOptimization`: Function to call when user wants to run the optimization

**Example Usage:**
```tsx
<OptimizationSettings
  settings={{
    objectives: {
      maximizeReturn: 0.7,
      minimizeRisk: 0.3
    },
    constraints: {
      maxRisk: 0.5,
      maxSuburbExposure: 25
    }
  }}
  onChange={handleSettingsChange}
  onRunOptimization={handleRunOptimization}
/>
```

#### SimulationResults

Displays the results of simulations and optimizations.

**Responsibilities:**
- Show simulation results and metrics
- Display optimization recommendations
- Provide interactive visualizations of results
- Allow comparison of different scenarios

**Props:**
- `results`: Object containing simulation or optimization results
- `type`: Type of results to display (simulation or optimization)

**Example Usage:**
```tsx
<SimulationResults
  results={simulationResults}
  type="simulation"
/>
```

### Common Components

#### Chart

Reusable chart component for data visualization.

**Responsibilities:**
- Render different types of charts (line, bar, pie, etc.)
- Handle data formatting and scaling
- Provide interactive features (tooltips, zooming, etc.)
- Support responsive design

**Props:**
- `data`: Array of data points to visualize
- `type`: Type of chart to render
- `options`: Object containing chart options

**Example Usage:**
```tsx
<Chart
  data={performanceData}
  type="line"
  options={{
    title: 'Portfolio Performance',
    xAxis: 'Date',
    yAxis: 'Return (%)'
  }}
/>
```

#### DataTable

Reusable table component for displaying tabular data.

**Responsibilities:**
- Render tabular data with sorting and filtering
- Handle pagination for large datasets
- Support column customization
- Provide interactive features (row selection, expansion, etc.)

**Props:**
- `data`: Array of data objects to display
- `columns`: Array of column definitions
- `options`: Object containing table options

**Example Usage:**
```tsx
<DataTable
  data={dealData}
  columns={[
    { field: 'suburb', header: 'Suburb' },
    { field: 'propertyValue', header: 'Property Value', format: 'currency' },
    { field: 'ltv', header: 'LTV', format: 'percentage' }
  ]}
  options={{
    pagination: true,
    pageSize: 10,
    sorting: true
  }}
/>
```

#### Metric

Reusable component for displaying a single metric.

**Responsibilities:**
- Display a metric with label, value, and trend
- Support different formatting options
- Show comparison to target or benchmark
- Provide visual indicators for performance

**Props:**
- `label`: Label for the metric
- `value`: Value of the metric
- `trend`: Trend indicator (up, down, flat)
- `format`: Format for the value (percentage, currency, number)
- `target`: Optional target value for comparison

**Example Usage:**
```tsx
<Metric
  label="IRR"
  value={18.5}
  trend="up"
  format="percentage"
  target={15}
/>
```

#### Map

Reusable map component for geographic visualization.

**Responsibilities:**
- Render geographic data on a map
- Support different map layers and overlays
- Provide interactive features (zooming, panning, clicking)
- Handle different geographic data formats

**Props:**
- `data`: Array of geographic data points
- `center`: Initial center coordinates
- `zoom`: Initial zoom level
- `layers`: Array of map layers to display

**Example Usage:**
```tsx
<Map
  data={suburbData}
  center={[-33.8688, 151.2093]}
  zoom={10}
  layers={['suburbs', 'trafficLightZones']}
/>
```

## Component Interactions

The components in the Portfolio Management System interact with each other through the following mechanisms:

### Props

Components pass data and callbacks to child components through props. This allows for a unidirectional data flow and clear component boundaries.

Example:
```tsx
<FundDashboard>
  <FundMetrics metrics={fundMetrics} />
  <PortfolioDistribution data={portfolioDistribution} />
</FundDashboard>
```

### Context

Shared state is managed through React Context for related components. This allows components to access shared state without prop drilling.

Example:
```tsx
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  
  // Fetch portfolio data
  
  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
```

### State Management

Global state is managed through Zustand stores. This allows components to access and update global state without prop drilling or context providers.

Example:
```tsx
import create from 'zustand';

interface FundParametersState {
  targetIRR: number;
  maxLTV: number;
  setTargetIRR: (value: number) => void;
  setMaxLTV: (value: number) => void;
}

export const useFundParametersStore = create<FundParametersState>((set) => ({
  targetIRR: 18,
  maxLTV: 75,
  setTargetIRR: (value) => set({ targetIRR: value }),
  setMaxLTV: (value) => set({ maxLTV: value }),
}));

// In a component
const { targetIRR, setTargetIRR } = useFundParametersStore();
```

### Custom Hooks

Custom hooks are used to encapsulate and share logic between components. This allows for reusable logic without duplicating code.

Example:
```tsx
export const usePortfolioData = (portfolioId: string) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/portfolio/${portfolioId}`);
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [portfolioId]);
  
  return { data, loading, error };
};

// In a component
const { data, loading, error } = usePortfolioData('portfolio-001');
```

## Mock Data Implementation

During development, the components use mock data to simulate the functionality of the system. This allows for frontend development to proceed independently of backend implementation, while ensuring a smooth transition to production.

The mock data is structured to match the expected API responses, with realistic values and relationships between different data points. The system includes fallback mechanisms to use mock data when API calls fail, ensuring that the components can be tested and demonstrated without a fully implemented backend.

Example mock data implementation:
```tsx
// Mock data
export const mockPortfolioData = {
  id: 'portfolio-001',
  name: 'Equihome Main Portfolio',
  totalValue: 15000000,
  loanCount: 25,
  averageLTV: 65,
  // More mock data...
};

// Component using mock data with fallback
export const FundDashboard = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio/summary');
        if (!response.ok) {
          // Fall back to mock data if API call fails
          setData(mockPortfolioData);
          return;
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Fall back to mock data if API call fails
        setData(mockPortfolioData);
      }
    };
    
    fetchData();
  }, []);
  
  if (!data) {
    return <Loading />;
  }
  
  return (
    <div>
      <h1>{data.name}</h1>
      <FundMetrics metrics={data.performanceMetrics} />
      <PortfolioDistribution data={data.allocation} />
    </div>
  );
};
```

## Conclusion

The component structure of the Portfolio Management System is designed to be modular, reusable, and maintainable. By following this structure, developers can easily understand the system, add new features, and maintain existing functionality. The use of mock data during development allows for frontend development to proceed independently of backend implementation, while ensuring a smooth transition to production.
