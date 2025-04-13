# Traffic Light System Component Structure

This document provides an overview of the component structure of the Traffic Light System.

## Component Organization

The Traffic Light System components are organized as follows:

```
src/systems/traffic-light/components/
├── MLEnhancedMap.tsx           # Main map component
├── MLModelEvolution.tsx        # ML model evolution component
├── MLSystemStatus.tsx          # ML system status component
├── SuburbAnalysis.tsx          # Suburb analysis component
├── SuburbComparison.tsx        # Suburb comparison component
├── SuburbForecasting.tsx       # Suburb forecasting component
├── TrafficLightLayout.tsx      # Layout component for the Traffic Light System
├── settings/                   # Settings components
│   ├── Settings.tsx            # Main settings component
│   ├── MLModelSettings.tsx     # ML model settings component
│   ├── DataSourceSettings.tsx  # Data source settings component
│   ├── SystemSettings.tsx      # System settings component
│   └── UserPreferences.tsx     # User preferences component
└── shared/                     # Shared components
    ├── DataCard.tsx            # Data card component
    ├── MetricsChart.tsx        # Metrics chart component
    ├── RiskIndicator.tsx       # Risk indicator component
    └── ZoneBadge.tsx           # Zone badge component
```

## Component Hierarchy

The component hierarchy is as follows:

```
TrafficLightLayout
├── MLDataProvider
│   ├── MLEnhancedMap
│   ├── SuburbForecasting
│   └── Settings
│       ├── MLModelSettings
│       ├── DataSourceSettings
│       ├── SystemSettings
│       └── UserPreferences
```

## Key Components

### MLEnhancedMap

The MLEnhancedMap component is the main map component of the Traffic Light System. It displays a map of Sydney suburbs with color-coded zones based on ML classifications.

**Props:**
- `onSuburbSelect`: Function to call when a suburb is selected
- `predictiveMode`: Boolean to enable predictive mode

**State:**
- `popupInfo`: Information about the currently selected suburb
- `searchTerm`: Search term for filtering suburbs
- `selectedTab`: Currently selected tab
- `selectedLayer`: Currently selected layer (suburbs, postcodes)

**Dependencies:**
- `react-map-gl`: For map rendering
- `useMLData`: Custom hook for accessing ML data

### SuburbForecasting

The SuburbForecasting component displays forecasting information for suburbs, including property value forecasts, market cycle forecasts, and risk forecasts.

**Props:**
- `suburb`: Selected suburb

**State:**
- `forecastPeriod`: Selected forecast period
- `forecastType`: Selected forecast type

**Dependencies:**
- `chart.js`: For chart rendering
- `useMLData`: Custom hook for accessing ML data

### Settings

The Settings component is the main settings component of the Traffic Light System. It provides access to ML model settings, data source settings, system settings, and user preferences.

**State:**
- `activeTab`: Currently selected tab

**Dependencies:**
- `useMLData`: Custom hook for accessing ML data

## Context Providers

### MLDataProvider

The MLDataProvider is a context provider that provides access to ML data across the Traffic Light System.

**Props:**
- `children`: React nodes to render
- `refreshInterval`: Interval for refreshing data (in milliseconds)

**State:**
- `modelInfo`: ML model information
- `systemStatus`: ML system status
- `loading`: Loading state
- `error`: Error state

**Methods:**
- `refreshData`: Function to refresh data

## Custom Hooks

### useMLData

The useMLData hook provides access to ML data from the MLDataProvider.

**Returns:**
- `modelInfo`: ML model information
- `systemStatus`: ML system status
- `loading`: Loading state
- `error`: Error state
- `refreshData`: Function to refresh data
- `lastUpdated`: Timestamp of last update

## Component Design Patterns

### Container Components

Container components are responsible for data fetching and state management. They use the useMLData hook to access ML data and pass it down to presentational components.

Examples:
- `MLEnhancedMap`
- `SuburbForecasting`
- `Settings`

### Presentational Components

Presentational components are responsible for rendering UI based on props. They don't have their own state or side effects.

Examples:
- `DataCard`
- `MetricsChart`
- `RiskIndicator`
- `ZoneBadge`

### Context Providers

Context providers are responsible for providing data to components across the application. They use React context to share data.

Examples:
- `MLDataProvider`

## Component Communication

Components communicate through the following mechanisms:

1. **Props**: Parent components pass data to child components through props
2. **Context**: Components access shared data through context providers
3. **Callbacks**: Child components call functions passed as props to communicate with parent components
4. **Custom Hooks**: Components use custom hooks to access shared data and functionality

## Component Styling

Components are styled using Tailwind CSS. The styling follows these principles:

1. **Utility-First**: Use Tailwind utility classes for styling
2. **Responsive Design**: Use Tailwind's responsive modifiers for responsive design
3. **Component-Based**: Use consistent styling for similar components
4. **Theme Colors**: Use theme colors for consistent branding
