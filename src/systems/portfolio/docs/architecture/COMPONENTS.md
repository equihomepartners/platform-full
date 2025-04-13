# Portfolio Management System Component Architecture

This document describes the component architecture of the Portfolio Management System, including the frontend components, backend services, and their interactions.

## Overview

The Portfolio Management System is built using a component-based architecture, with clear separation of concerns between different parts of the system. The architecture is designed to be modular, scalable, and maintainable, allowing for easy extension and modification.

## Frontend Components

The frontend of the Portfolio Management System is built using React with TypeScript, following a component-based architecture. The components are organized into the following categories:

### Layout Components

- **PortfolioLayout**: Main layout component for the Portfolio Management System
  - Provides navigation tabs for different sections
  - Handles routing within the system
  - Maintains consistent layout across all pages

### Dashboard Components

- **PortfolioDashboard**: Main dashboard component
  - Serves as the entry point for the Portfolio Management System
  - Aggregates and displays key portfolio metrics
  - Provides navigation to detailed views

- **FundDashboard**: Detailed fund dashboard
  - Displays comprehensive fund performance metrics
  - Shows portfolio composition and allocation
  - Provides insights into fund performance

### Analysis Components

- **FundMetrics**: Displays key fund metrics
  - Shows IRR, ROI, cash yield, and other performance metrics
  - Provides trend analysis and comparisons
  - Highlights key performance indicators

- **PortfolioDistribution**: Visualizes portfolio distribution
  - Shows allocation by suburb, property type, and other dimensions
  - Provides interactive charts for exploring distribution
  - Highlights diversification metrics

- **GeographicDistribution**: Displays geographic distribution
  - Shows portfolio allocation on a map
  - Provides suburb-level insights
  - Integrates with Traffic Light System zones

- **CashflowAnalysis**: Analyzes portfolio cash flows
  - Projects future cash flows
  - Shows historical cash flow trends
  - Breaks down cash flows by source

- **IncomeAnalysis**: Analyzes portfolio income
  - Shows interest income, fee income, and other revenue sources
  - Provides trend analysis and projections
  - Highlights income stability metrics

- **LTVAnalysis**: Analyzes loan-to-value ratios
  - Shows LTV distribution across the portfolio
  - Provides risk analysis based on LTV
  - Highlights high-LTV loans for monitoring

### Configuration Components

- **FundParameters**: Configures fund parameters
  - Sets target IRR, max LTV, and other constraints
  - Configures risk preferences and investment strategy
  - Defines allocation targets by zone

### Simulation Components

- **SimulationEngine**: Runs portfolio simulations
  - Performs scenario analysis and stress testing
  - Optimizes portfolio allocation
  - Projects future performance

- **ScenarioBuilder**: Builds custom scenarios
  - Defines scenario parameters and assumptions
  - Creates stress test scenarios
  - Configures simulation parameters

- **OptimizationSettings**: Configures optimization settings
  - Sets optimization objectives and constraints
  - Defines risk-return preferences
  - Configures rebalancing parameters

## Backend Services

The backend of the Portfolio Management System will be built using Node.js with Express, providing RESTful API services for the frontend. The services are organized into the following categories:

### Portfolio Services

- **PortfolioService**: Manages portfolio data
  - Retrieves current portfolio composition
  - Calculates portfolio metrics
  - Provides historical performance data

- **DealService**: Manages deal data
  - Retrieves deal details
  - Calculates deal metrics
  - Tracks deal performance

### Simulation Services

- **SimulationService**: Runs portfolio simulations
  - Performs scenario analysis
  - Optimizes portfolio allocation
  - Projects future performance

- **OptimizationService**: Optimizes portfolio allocation
  - Implements optimization algorithms
  - Applies constraints and objectives
  - Generates allocation recommendations

### Integration Services

- **TrafficLightIntegrationService**: Integrates with Traffic Light System
  - Retrieves suburb classifications and risk assessments
  - Sends portfolio performance data
  - Synchronizes data between systems

- **UnderwritingIntegrationService**: Integrates with Underwriting System
  - Retrieves approved loans and applications
  - Sends allocation recommendations
  - Synchronizes data between systems

## Component Interaction

The components interact with each other through the following mechanisms:

### Frontend Component Interaction

- **Props**: Components pass data and callbacks to child components through props
- **Context**: Shared state is managed through React Context for related components
- **State Management**: Global state is managed through Zustand stores

### Frontend-Backend Interaction

- **API Calls**: Frontend components make API calls to backend services
- **WebSockets**: Real-time updates are pushed from backend to frontend through WebSockets
- **Authentication**: API calls are authenticated using JWT tokens

### Backend Service Interaction

- **Service Calls**: Services call other services through internal APIs
- **Message Queue**: Asynchronous processing is handled through message queues
- **Database**: Services share data through the database

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend Components                         │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Layout    │    │  Dashboard  │    │  Analysis   │         │
│  │ Components  │    │ Components  │    │ Components  │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │Configuration│    │ Simulation  │    │    UI       │         │
│  │ Components  │    │ Components  │    │ Components  │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Backend Services                           │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Portfolio  │    │ Simulation  │    │ Integration │         │
│  │  Services   │    │  Services   │    │  Services   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       External Systems                           │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Traffic   │    │ Underwriting│    │   Market    │         │
│  │Light System │    │   System    │    │    Data     │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Current Implementation Status

The current implementation of the Portfolio Management System includes:

- **Frontend Components**: Basic implementation of layout, dashboard, and analysis components
- **Mock Data**: Simulated data for development and testing
- **API Contracts**: Defined but not yet implemented

The system is designed to work with mock data during development, with the ability to switch to real data once the backend services are implemented. This approach allows for frontend development to proceed independently of backend implementation, while ensuring a smooth transition to production.

## Future Development

The future development of the Portfolio Management System will focus on:

1. **Implementing Backend Services**: Developing the backend services to replace mock data
2. **Enhancing Simulation Capabilities**: Implementing advanced simulation and optimization algorithms
3. **Improving User Experience**: Refining the user interface and adding interactive features
4. **Integrating with External Systems**: Implementing integration with Traffic Light System and Underwriting System

The component architecture is designed to support these future developments, with clear separation of concerns and modular design allowing for incremental implementation and enhancement.
