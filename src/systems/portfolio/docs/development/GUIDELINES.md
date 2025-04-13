# Portfolio Management System Development Guidelines

This document outlines the development guidelines for the Portfolio Management System, including coding standards, architecture principles, and best practices.

## Development Principles

The development of the Portfolio Management System follows these core principles:

1. **Component-Based Architecture**: Build the system using reusable, modular components
2. **Separation of Concerns**: Separate business logic, UI components, and data access
3. **Type Safety**: Use TypeScript for type safety and better developer experience
4. **Testing**: Write tests for all components and business logic
5. **Documentation**: Document all components, APIs, and business logic
6. **Performance**: Optimize for performance, especially for data-intensive operations
7. **Accessibility**: Ensure the system is accessible to all users
8. **Responsive Design**: Design the system to work on all device sizes

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Define interfaces for all data structures
- Use type annotations for function parameters and return types
- Avoid using `any` type
- Use enums for fixed sets of values
- Use union types for variables that can have multiple types

### React

- Use functional components with hooks
- Use React Context for shared state
- Use custom hooks for reusable logic
- Use React Router for navigation
- Use React Query for data fetching
- Use React Testing Library for testing

### CSS

- Use Tailwind CSS for styling
- Use CSS modules for component-specific styles
- Follow BEM naming convention for custom CSS classes
- Use responsive design principles
- Use CSS variables for theming

### File Structure

- Organize files by feature, not by type
- Keep related files together
- Use index files for exporting multiple components
- Use barrel exports for cleaner imports

Example file structure:

```
src/systems/portfolio/
├── components/
│   ├── dashboard/
│   │   ├── FundDashboard.tsx
│   │   ├── PortfolioDashboard.tsx
│   │   └── index.ts
│   ├── analysis/
│   │   ├── CashflowAnalysis.tsx
│   │   ├── IncomeAnalysis.tsx
│   │   ├── LTVAnalysis.tsx
│   │   └── index.ts
│   └── index.ts
├── services/
│   ├── analytics.ts
│   ├── portfolio.ts
│   ├── simulation.ts
│   └── index.ts
├── types/
│   ├── deals.ts
│   ├── pipeline.ts
│   ├── portfolio.ts
│   └── index.ts
├── utils/
│   ├── calculations.ts
│   ├── formatting.ts
│   └── index.ts
└── index.ts
```

## Architecture Guidelines

### Frontend Architecture

The frontend architecture follows these guidelines:

1. **Component Hierarchy**: Organize components in a logical hierarchy
2. **Container/Presentational Pattern**: Separate data fetching from presentation
3. **Custom Hooks**: Extract reusable logic into custom hooks
4. **Context Providers**: Use context providers for shared state
5. **Lazy Loading**: Use lazy loading for code splitting
6. **Memoization**: Use memoization for expensive calculations
7. **Error Boundaries**: Use error boundaries for error handling

### Backend Architecture

The backend architecture follows these guidelines:

1. **RESTful API**: Design APIs following REST principles
2. **Service Layer**: Implement business logic in service layer
3. **Repository Pattern**: Use repository pattern for data access
4. **Dependency Injection**: Use dependency injection for testability
5. **Middleware**: Use middleware for cross-cutting concerns
6. **Error Handling**: Implement consistent error handling
7. **Logging**: Implement comprehensive logging

## State Management

The Portfolio Management System uses Zustand for state management, following these guidelines:

1. **Store Organization**: Organize stores by feature
2. **Immutability**: Use immutable state updates
3. **Selectors**: Use selectors for derived state
4. **Actions**: Define actions for state updates
5. **Persistence**: Use persistence for selected stores
6. **Middleware**: Use middleware for side effects

Example store:

```typescript
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface FundParametersState {
  targetIRR: number;
  maxLTV: number;
  minCashReserve: number;
  setTargetIRR: (value: number) => void;
  setMaxLTV: (value: number) => void;
  setMinCashReserve: (value: number) => void;
}

export const useFundParametersStore = create<FundParametersState>(
  persist(
    (set) => ({
      targetIRR: 18,
      maxLTV: 75,
      minCashReserve: 10,
      setTargetIRR: (value) => set({ targetIRR: value }),
      setMaxLTV: (value) => set({ maxLTV: value }),
      setMinCashReserve: (value) => set({ minCashReserve: value }),
    }),
    {
      name: 'fund-parameters',
    }
  )
);
```

## API Integration

The Portfolio Management System integrates with other systems through APIs, following these guidelines:

1. **API Clients**: Implement API clients for each external API
2. **Error Handling**: Implement robust error handling for API calls
3. **Caching**: Use caching for frequently accessed data
4. **Retry Logic**: Implement retry logic for failed API calls
5. **Fallback Mechanisms**: Implement fallback mechanisms for when APIs are unavailable
6. **Mock Data**: Use mock data during development

Example API client:

```typescript
import axios from 'axios';
import { mockSuburbClassifications } from '../data/mockData';

const trafficLightApi = axios.create({
  baseURL: '/api/traffic-light',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSuburbClassifications = async () => {
  try {
    const response = await trafficLightApi.get('/suburbs/classification');
    return response.data;
  } catch (error) {
    console.error('Error fetching suburb classifications:', error);
    // Fall back to mock data if API call fails
    return { suburbs: mockSuburbClassifications };
  }
};
```

## Testing Guidelines

The Portfolio Management System follows these testing guidelines:

1. **Unit Testing**: Test individual components and functions
2. **Integration Testing**: Test component interactions
3. **End-to-End Testing**: Test complete user flows
4. **Mock Data**: Use mock data for testing
5. **Test Coverage**: Aim for high test coverage
6. **Continuous Integration**: Run tests in CI pipeline

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import { FundDashboard } from './FundDashboard';
import { mockPortfolioData } from '../../data/mockData';

jest.mock('../../services/portfolio', () => ({
  fetchPortfolioData: jest.fn().mockResolvedValue(mockPortfolioData),
}));

describe('FundDashboard', () => {
  it('renders fund metrics', async () => {
    render(<FundDashboard />);
    
    // Wait for data to load
    expect(await screen.findByText('Fund Metrics')).toBeInTheDocument();
    
    // Check that metrics are displayed
    expect(screen.getByText('IRR')).toBeInTheDocument();
    expect(screen.getByText('18.5%')).toBeInTheDocument();
    expect(screen.getByText('ROI')).toBeInTheDocument();
    expect(screen.getByText('22.3%')).toBeInTheDocument();
  });
});
```

## Performance Optimization

The Portfolio Management System follows these performance optimization guidelines:

1. **Code Splitting**: Split code into smaller chunks
2. **Lazy Loading**: Load components only when needed
3. **Memoization**: Memoize expensive calculations
4. **Virtualization**: Use virtualization for long lists
5. **Image Optimization**: Optimize images for web
6. **Bundle Size**: Monitor and optimize bundle size
7. **Caching**: Implement caching for API calls

Example code splitting:

```typescript
import { lazy, Suspense } from 'react';
import { Loading } from '../common/Loading';

const FundDashboard = lazy(() => import('./FundDashboard'));

export const PortfolioDashboard = () => {
  return (
    <div>
      <h1>Portfolio Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <FundDashboard />
      </Suspense>
    </div>
  );
};
```

## Accessibility Guidelines

The Portfolio Management System follows these accessibility guidelines:

1. **Semantic HTML**: Use semantic HTML elements
2. **ARIA Attributes**: Use ARIA attributes when necessary
3. **Keyboard Navigation**: Ensure keyboard navigation works
4. **Color Contrast**: Ensure sufficient color contrast
5. **Screen Reader Support**: Ensure screen reader support
6. **Focus Management**: Implement proper focus management
7. **Alternative Text**: Provide alternative text for images

Example accessible component:

```typescript
export const FundMetric = ({ label, value, trend }) => {
  const trendIcon = trend === 'up' ? '↑' : '↓';
  const trendClass = trend === 'up' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="fund-metric" role="group" aria-labelledby="metric-label">
      <div id="metric-label" className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm ${trendClass}`} aria-label={`Trend: ${trend}`}>
        {trendIcon} {trend === 'up' ? 'Increasing' : 'Decreasing'}
      </div>
    </div>
  );
};
```

## Documentation Guidelines

The Portfolio Management System follows these documentation guidelines:

1. **Component Documentation**: Document all components
2. **API Documentation**: Document all API endpoints
3. **Type Documentation**: Document all types and interfaces
4. **Function Documentation**: Document all functions
5. **Example Usage**: Provide example usage for components and functions
6. **Architecture Documentation**: Document system architecture
7. **Development Guidelines**: Document development guidelines

Example component documentation:

```typescript
/**
 * FundDashboard component displays key metrics and performance indicators for the fund.
 * 
 * @component
 * @example
 * ```tsx
 * <FundDashboard />
 * ```
 */
export const FundDashboard = () => {
  // Component implementation
};
```

## Mock Data Guidelines

The Portfolio Management System uses mock data during development, following these guidelines:

1. **Realistic Data**: Create realistic mock data
2. **Consistent Structure**: Ensure mock data has the same structure as real data
3. **Edge Cases**: Include edge cases in mock data
4. **Fallback Mechanism**: Implement fallback to mock data when APIs fail
5. **Clear Separation**: Keep mock data separate from production code
6. **Documentation**: Document mock data structure and usage

Example mock data:

```typescript
export const mockPortfolioData = {
  id: 'portfolio-001',
  name: 'Equihome Main Portfolio',
  totalValue: 15000000,
  loanCount: 25,
  averageLTV: 65,
  weightedAverageInterestRate: 5.2,
  weightedAverageMaturity: 7.5,
  performanceMetrics: {
    irr: 18.5,
    roi: 22.3,
    cashYield: 8.7,
    totalReturn: 3350000
  },
  // More mock data...
};
```

## Conclusion

By following these development guidelines, the Portfolio Management System will be built with a consistent, maintainable, and high-quality codebase. These guidelines should be reviewed and updated regularly to reflect the evolving best practices and requirements of the system.
