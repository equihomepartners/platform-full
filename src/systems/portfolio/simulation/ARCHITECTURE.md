# Equihome Fund Modeling - Architecture Overview

## Introduction

This document provides an overview of the Equihome Fund Modeling application architecture, explaining the core components, their dependencies, and how to integrate them into other projects.

## Core Components

The application consists of the following core components:

1. **HTML Pages**: User interface pages for different sections of the application
2. **JavaScript Modules**: Core functionality and calculations
3. **CSS Styles**: Visual styling for the application
4. **Documentation**: Comprehensive explanation of the financial model

## File Structure

```
equihome-simulation/
├── index.html                # Home page
├── fund-settings.html        # Fund settings configuration
├── portfolio-generation.html # Portfolio generation and simulation
├── fund-overview.html        # Fund performance overview
├── gp-economics.html         # General Partner economics
├── lp-economics.html         # Limited Partner economics
├── portfolio-growth.html     # Portfolio growth analysis
├── documentation.md          # Comprehensive documentation
├── ARCHITECTURE.md           # This file
├── css/
│   └── styles.css            # Application styles
└── js/
    ├── utils.js              # Utility functions
    ├── navigation.js         # Navigation management
    ├── state-manager.js      # State management
    └── math-utils.js         # Mathematical and financial utilities
```

## Dependencies

The application has minimal external dependencies:

- Modern web browser with JavaScript enabled
- No external JavaScript libraries required
- No server-side dependencies (fully client-side)

## Integration Guide

To integrate the Equihome Fund Modeling components into another project:

### Minimal Integration (Core Calculation Engine Only)

If you only need the financial calculation engine:

1. Copy the following files:
   - `js/math-utils.js` - Core financial calculations
   - `js/state-manager.js` - State management (optional)

2. Import these files in your project:
   ```html
   <script src="path/to/math-utils.js"></script>
   <script src="path/to/state-manager.js"></script>
   ```

3. Use the calculation functions in your code:
   ```javascript
   // Example: Calculate IRR
   const cashFlows = [-1000, 200, 300, 400, 500];
   const irr = MathUtils.calculateIRR(cashFlows);
   
   // Example: Calculate compound interest
   const futureValue = MathUtils.calculateCompoundInterest(
     principal, 
     rate, 
     time, 
     compoundingFrequency
   );
   ```

### Full UI Integration

To integrate the complete UI:

1. Copy all HTML, CSS, and JavaScript files
2. Ensure the file structure is maintained
3. Update any paths in the HTML files if your project structure differs

### Customization Points

The application is designed with several customization points:

1. **State Management**: Modify `state-manager.js` to integrate with your application's state management
2. **UI Components**: The HTML files can be broken down into components for frameworks like React or Vue
3. **Styling**: The CSS can be replaced or extended to match your application's design system

## Key Modules and Their Functions

### math-utils.js

Contains all financial and statistical calculations:

- IRR calculation
- NPV calculation
- Compound and simple interest
- Equity multiple and ROI
- Waterfall distribution
- Risk metrics (Sharpe ratio, Sortino ratio, etc.)
- Statistical functions (mean, standard deviation, etc.)
- Random number generation with distributions

### state-manager.js

Handles data persistence and state management:

- Store and retrieve application state
- Calculate derived values
- Track user journey through the application

### utils.js

General utility functions:

- Number formatting
- Date handling
- DOM manipulation helpers

### navigation.js

Manages navigation between pages:

- Handle page transitions
- Validate user journey steps
- Ensure data consistency across pages

## Data Flow

1. User inputs fund settings in `fund-settings.html`
2. Settings are stored in `StateManager`
3. Portfolio is generated in `portfolio-generation.html` based on settings
4. Portfolio data is stored in `StateManager`
5. Fund returns are calculated in `fund-overview.html` using `MathUtils`
6. GP and LP economics are calculated in their respective pages
7. Portfolio growth is analyzed in `portfolio-growth.html`

## Extending the Application

To extend the application with new features:

1. **Add New Calculations**: Extend `math-utils.js` with new financial functions
2. **Add New State**: Extend the state structure in `state-manager.js`
3. **Add New Pages**: Create new HTML files following the existing pattern
4. **Add New Visualizations**: Implement charts or graphs using the calculation results

## Best Practices for Integration

1. **Keep Calculation Logic Separate**: The financial calculations in `math-utils.js` should remain isolated
2. **Maintain State Structure**: If using the state manager, keep the state structure consistent
3. **Test Thoroughly**: Verify calculations after integration, especially IRR and waterfall distributions
4. **Document Extensions**: Update documentation when adding new features or calculations

## Troubleshooting

Common issues and solutions:

1. **Calculation Errors**: Check input values for edge cases (negative values, zeros)
2. **State Persistence Issues**: Verify localStorage availability in the browser
3. **UI Rendering Problems**: Check browser console for JavaScript errors

## Further Resources

- See `documentation.md` for detailed explanation of all financial calculations
- Refer to individual code files for JSDoc comments on functions
