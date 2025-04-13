/**
 * Portfolio Management System Data Transformations
 * 
 * This file contains utility functions for transforming data for the Portfolio Management System.
 */

import { 
  PortfolioSummary, 
  PerformanceMetrics, 
  RiskMetrics, 
  AllocationData,
  CashFlowProjection,
  Loan,
  FundParameter,
  SimulationResult,
  StressTestResult,
  PortfolioAnalytics
} from '../types/portfolioTypes';

/**
 * Format currency value
 * 
 * @param value Value to format
 * @param currency Currency code (default: AUD)
 * @param maximumFractionDigits Maximum fraction digits (default: 0)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number, 
  currency: string = 'AUD', 
  maximumFractionDigits: number = 0
): string => {
  return new Intl.NumberFormat('en-AU', { 
    style: 'currency', 
    currency, 
    maximumFractionDigits 
  }).format(value);
};

/**
 * Format percentage value
 * 
 * @param value Value to format
 * @param includeSign Whether to include sign (default: true)
 * @param maximumFractionDigits Maximum fraction digits (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number, 
  includeSign: boolean = true, 
  maximumFractionDigits: number = 1
): string => {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(maximumFractionDigits)}%`;
};

/**
 * Get color class for percentage value
 * 
 * @param value Percentage value
 * @param inverse Whether to inverse colors (default: false)
 * @returns CSS class name
 */
export const getPercentageColorClass = (value: number, inverse: boolean = false): string => {
  if (inverse) {
    if (value > 0) return 'text-danger';
    if (value < 0) return 'text-success';
    return 'text-neutral-500';
  } else {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-danger';
    return 'text-neutral-500';
  }
};

/**
 * Calculate percentage change
 * 
 * @param oldValue Old value
 * @param newValue New value
 * @returns Percentage change
 */
export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
};

/**
 * Format date
 * 
 * @param date Date to format
 * @param format Format (default: 'short')
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date, format: 'short' | 'long' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  } else {
    return dateObj.toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

/**
 * Transform portfolio summary for display
 * 
 * @param summary Portfolio summary
 * @returns Transformed portfolio summary
 */
export const transformPortfolioSummary = (summary: PortfolioSummary): any[] => {
  return [
    { 
      title: 'Total Value', 
      value: formatCurrency(summary.totalValue), 
      icon: 'dollar-sign',
      change: null
    },
    { 
      title: 'Fund IRR', 
      value: `${summary.fundIRR}%`, 
      icon: 'trending-up',
      change: null
    },
    { 
      title: 'Risk Score', 
      value: `${summary.riskScore}/100`, 
      icon: 'shield',
      change: null
    },
    { 
      title: 'Properties', 
      value: summary.totalProperties, 
      icon: 'home',
      change: null
    },
    { 
      title: 'Suburbs', 
      value: summary.totalSuburbs, 
      icon: 'map-pin',
      change: null
    },
    { 
      title: 'Average LTV', 
      value: `${summary.averageLtv}%`, 
      icon: 'percent',
      change: null
    }
  ];
};

/**
 * Transform allocation data for charts
 * 
 * @param allocation Allocation data
 * @returns Transformed allocation data
 */
export const transformAllocationForCharts = (allocation: AllocationData): any => {
  // Transform suburb allocation for pie chart
  const suburbAllocationChart = allocation.bySuburb.map(item => ({
    name: item.suburb,
    value: item.value,
    percentage: item.percentage,
    color: getSuburbColor(item.suburb)
  }));

  // Transform property type allocation for pie chart
  const propertyTypeAllocationChart = allocation.byPropertyType.map(item => ({
    name: item.type,
    value: item.value,
    percentage: item.percentage,
    color: getPropertyTypeColor(item.type)
  }));

  // Transform risk category allocation for pie chart
  const riskCategoryAllocationChart = allocation.byRiskCategory.map(item => ({
    name: item.category,
    value: item.value,
    percentage: item.percentage,
    color: getRiskCategoryColor(item.category)
  }));

  return {
    suburbAllocationChart,
    propertyTypeAllocationChart,
    riskCategoryAllocationChart
  };
};

/**
 * Get color for suburb
 * 
 * @param suburb Suburb name
 * @returns Color hex code
 */
const getSuburbColor = (suburb: string): string => {
  // This is a placeholder function that would be replaced with a proper color mapping
  const colors = [
    '#4C51BF', '#2B6CB0', '#2C7A7B', '#2F855A', '#744210',
    '#9B2C2C', '#702459', '#6B46C1', '#4299E1', '#38B2AC'
  ];
  
  // Simple hash function to get consistent colors
  let hash = 0;
  for (let i = 0; i < suburb.length; i++) {
    hash = suburb.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Get color for property type
 * 
 * @param propertyType Property type
 * @returns Color hex code
 */
const getPropertyTypeColor = (propertyType: string): string => {
  const colorMap: {[key: string]: string} = {
    'House': '#4C51BF',
    'Apartment': '#2B6CB0',
    'Townhouse': '#2C7A7B',
    'Land': '#2F855A',
    'Commercial': '#744210',
    'Industrial': '#9B2C2C',
    'Other': '#702459'
  };
  
  return colorMap[propertyType] || '#6B46C1';
};

/**
 * Get color for risk category
 * 
 * @param riskCategory Risk category
 * @returns Color hex code
 */
const getRiskCategoryColor = (riskCategory: string): string => {
  const colorMap: {[key: string]: string} = {
    'Low': '#48BB78',
    'Medium': '#ECC94B',
    'High': '#F56565',
    'Very High': '#E53E3E'
  };
  
  return colorMap[riskCategory] || '#A0AEC0';
};

/**
 * Transform cash flow projections for charts
 * 
 * @param cashFlows Cash flow projections
 * @returns Transformed cash flow data
 */
export const transformCashFlowsForCharts = (cashFlows: CashFlowProjection[]): any => {
  return {
    labels: cashFlows.map(cf => cf.period),
    datasets: [
      {
        label: 'Income',
        data: cashFlows.map(cf => cf.inflows),
        backgroundColor: 'rgba(72, 187, 120, 0.2)',
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 2
      },
      {
        label: 'Expenses',
        data: cashFlows.map(cf => cf.outflows),
        backgroundColor: 'rgba(245, 101, 101, 0.2)',
        borderColor: 'rgba(245, 101, 101, 1)',
        borderWidth: 2
      },
      {
        label: 'Net Cash Flow',
        data: cashFlows.map(cf => cf.netCashFlow),
        backgroundColor: 'rgba(66, 153, 225, 0.2)',
        borderColor: 'rgba(66, 153, 225, 1)',
        borderWidth: 2,
        type: 'line'
      }
    ]
  };
};

/**
 * Transform loans for display
 * 
 * @param loans Loans
 * @returns Transformed loans
 */
export const transformLoansForDisplay = (loans: Loan[]): any[] => {
  return loans.map(loan => ({
    id: loan.id,
    propertyAddress: loan.propertyAddress,
    loanAmount: formatCurrency(loan.loanAmount),
    interestRate: `${loan.interestRate}%`,
    loanTerm: `${loan.loanTerm} years`,
    loanToValue: `${loan.loanToValue}%`,
    status: loan.status,
    originationDate: formatDate(loan.originationDate),
    maturityDate: formatDate(loan.maturityDate),
    remainingBalance: formatCurrency(loan.remainingBalance),
    paymentAmount: formatCurrency(loan.paymentAmount, 'AUD', 2)
  }));
};

/**
 * Transform simulation results for display
 * 
 * @param simulation Simulation results
 * @returns Transformed simulation results
 */
export const transformSimulationForDisplay = (simulation: SimulationResult): any => {
  return {
    summary: {
      irr: `${simulation.results.irr}%`,
      roi: `${simulation.results.roi}%`,
      npv: formatCurrency(simulation.results.npv),
      paybackPeriod: `${simulation.results.paybackPeriod} years`,
      profitability: simulation.results.profitability.toFixed(2),
      riskScore: `${simulation.results.riskScore}/100`
    },
    cashFlowChart: {
      labels: simulation.cashFlows.map(cf => cf.period),
      datasets: [{
        label: 'Cash Flow',
        data: simulation.cashFlows.map(cf => cf.value),
        backgroundColor: simulation.cashFlows.map(cf => cf.value >= 0 ? 'rgba(72, 187, 120, 0.2)' : 'rgba(245, 101, 101, 0.2)'),
        borderColor: simulation.cashFlows.map(cf => cf.value >= 0 ? 'rgba(72, 187, 120, 1)' : 'rgba(245, 101, 101, 1)'),
        borderWidth: 2
      }]
    },
    sensitivityChart: {
      labels: simulation.sensitivityAnalysis.map(sa => sa.parameter),
      datasets: [{
        label: 'Impact on IRR',
        data: simulation.sensitivityAnalysis.map(sa => sa.impact),
        backgroundColor: simulation.sensitivityAnalysis.map(sa => sa.impact >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(245, 101, 101, 0.7)'),
        borderWidth: 0
      }]
    },
    probabilityChart: {
      labels: simulation.probabilityDistribution.map(pd => pd.outcome),
      datasets: [{
        label: 'Probability',
        data: simulation.probabilityDistribution.map(pd => pd.probability * 100),
        backgroundColor: 'rgba(66, 153, 225, 0.7)',
        borderWidth: 0
      }]
    },
    scenariosChart: {
      labels: simulation.scenarios.map(s => s.name),
      datasets: [{
        label: 'IRR Outcome',
        data: simulation.scenarios.map(s => s.outcome),
        backgroundColor: [
          'rgba(245, 101, 101, 0.7)',
          'rgba(237, 137, 54, 0.7)',
          'rgba(72, 187, 120, 0.7)'
        ],
        borderWidth: 0
      }]
    }
  };
};

/**
 * Transform stress test results for display
 * 
 * @param stressTest Stress test results
 * @returns Transformed stress test results
 */
export const transformStressTestForDisplay = (stressTest: StressTestResult): any => {
  return {
    summary: {
      scenario: stressTest.scenario,
      description: stressTest.description,
      totalValue: formatCurrency(stressTest.impactSummary.totalValue),
      percentageChange: formatPercentage(stressTest.impactSummary.percentageChange),
      riskScore: `${stressTest.impactSummary.riskScore}/100`,
      severity: getSeverityLabel(stressTest.impactSummary.percentageChange)
    },
    metricImpactsChart: {
      labels: stressTest.metricImpacts.map(mi => mi.metric),
      datasets: [{
        label: 'Percentage Change',
        data: stressTest.metricImpacts.map(mi => mi.percentageChange),
        backgroundColor: stressTest.metricImpacts.map(mi => mi.percentageChange >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(245, 101, 101, 0.7)'),
        borderWidth: 0
      }]
    },
    suburbImpactsChart: {
      labels: stressTest.suburbImpacts.map(si => si.suburb),
      datasets: [{
        label: 'Percentage Change',
        data: stressTest.suburbImpacts.map(si => si.percentageChange),
        backgroundColor: stressTest.suburbImpacts.map(si => si.percentageChange >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(245, 101, 101, 0.7)'),
        borderWidth: 0
      }]
    },
    recommendations: stressTest.recommendations
  };
};

/**
 * Get severity label based on percentage change
 * 
 * @param percentageChange Percentage change
 * @returns Severity label
 */
const getSeverityLabel = (percentageChange: number): string => {
  const absChange = Math.abs(percentageChange);
  
  if (absChange < 5) return 'Minimal';
  if (absChange < 10) return 'Moderate';
  if (absChange < 20) return 'Significant';
  if (absChange < 30) return 'Severe';
  return 'Extreme';
};

/**
 * Transform portfolio analytics for display
 * 
 * @param analytics Portfolio analytics
 * @returns Transformed portfolio analytics
 */
export const transformAnalyticsForDisplay = (analytics: PortfolioAnalytics): any => {
  return {
    performanceSummary: {
      startValue: formatCurrency(analytics.performanceSummary.startValue),
      endValue: formatCurrency(analytics.performanceSummary.endValue),
      percentageChange: formatPercentage(analytics.performanceSummary.percentageChange),
      annualizedReturn: formatPercentage(analytics.performanceSummary.annualizedReturn)
    },
    benchmarkComparisonChart: {
      labels: analytics.benchmarkComparison.map(bc => bc.benchmark),
      datasets: [
        {
          label: 'Portfolio Return',
          data: analytics.benchmarkComparison.map(bc => bc.portfolioReturn),
          backgroundColor: 'rgba(66, 153, 225, 0.7)',
          borderWidth: 0
        },
        {
          label: 'Benchmark Return',
          data: analytics.benchmarkComparison.map(bc => bc.benchmarkReturn),
          backgroundColor: 'rgba(160, 174, 192, 0.7)',
          borderWidth: 0
        }
      ]
    },
    attributionAnalysisChart: {
      labels: analytics.attributionAnalysis.map(aa => aa.factor),
      datasets: [{
        label: 'Contribution to Return',
        data: analytics.attributionAnalysis.map(aa => aa.contribution),
        backgroundColor: [
          'rgba(66, 153, 225, 0.7)',
          'rgba(72, 187, 120, 0.7)',
          'rgba(237, 137, 54, 0.7)',
          'rgba(159, 122, 234, 0.7)'
        ],
        borderWidth: 0
      }]
    },
    trendAnalysisCharts: analytics.trendAnalysis.map(ta => ({
      metric: ta.metric,
      chart: {
        labels: ta.data.map(d => d.period),
        datasets: [{
          label: ta.metric,
          data: ta.data.map(d => d.value),
          backgroundColor: 'rgba(66, 153, 225, 0.2)',
          borderColor: 'rgba(66, 153, 225, 1)',
          borderWidth: 2,
          tension: 0.4
        }]
      }
    })),
    correlationMatrix: analytics.correlationMatrix
  };
};

/**
 * Validate portfolio data
 * 
 * @param data Data to validate
 * @param schema Schema to validate against
 * @returns Validation result
 */
export const validatePortfolioData = (data: any, schema: any): { valid: boolean, errors: string[] } => {
  // This is a placeholder function that would be replaced with a proper validation library
  // such as Zod, Yup, or Joi
  return { valid: true, errors: [] };
};

export default {
  formatCurrency,
  formatPercentage,
  getPercentageColorClass,
  calculatePercentageChange,
  formatDate,
  transformPortfolioSummary,
  transformAllocationForCharts,
  transformCashFlowsForCharts,
  transformLoansForDisplay,
  transformSimulationForDisplay,
  transformStressTestForDisplay,
  transformAnalyticsForDisplay,
  validatePortfolioData
};
