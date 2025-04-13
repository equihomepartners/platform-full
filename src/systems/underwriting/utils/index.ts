// Underwriting System Utilities
// This file exports all utilities for the Underwriting System

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Calculate IRR (Internal Rate of Return)
export function calculateIRR(cashflows: number[], initialInvestment: number): number {
  // Newton-Raphson method to calculate IRR
  const maxIterations = 1000;
  const tolerance = 0.0000001;

  let guess = 0.1; // Initial guess (10%)

  for (let i = 0; i < maxIterations; i++) {
    let npv = -initialInvestment;
    let derivativeNpv = 0;

    for (let t = 0; t < cashflows.length; t++) {
      const factor = Math.pow(1 + guess, t + 1);
      npv += cashflows[t] / factor;
      derivativeNpv -= (t + 1) * cashflows[t] / (factor * (1 + guess));
    }

    if (Math.abs(npv) < tolerance) {
      return guess * 100; // Convert to percentage
    }

    guess = guess - npv / derivativeNpv;
  }

  return guess * 100; // Convert to percentage
}

// Calculate LTV (Loan-to-Value) ratio
export function calculateLTV(loanAmount: number, propertyValue: number): number {
  return (loanAmount / propertyValue) * 100;
}

// Calculate CLTV (Combined Loan-to-Value) ratio
export function calculateCLTV(loanAmount: number, mortgageBalance: number, propertyValue: number): number {
  return ((loanAmount + mortgageBalance) / propertyValue) * 100;
}
