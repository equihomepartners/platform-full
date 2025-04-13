/**
 * Mock Analytics Data
 * 
 * This file contains mock data for portfolio analytics.
 * It will be used as a fallback when the real API is not available.
 */

export const mockAnalytics = {
  // Default analytics
  default: {
    title: 'Portfolio Analytics',
    description: 'Overview of portfolio analytics',
    lastUpdated: '2024-04-10T00:00:00Z'
  },
  
  // Performance attribution
  attribution: {
    title: 'Performance Attribution',
    description: 'Analysis of sources of portfolio performance',
    lastUpdated: '2024-04-10T00:00:00Z',
    totalReturn: 18.5,
    attribution: [
      {
        factor: 'Suburb Selection',
        contribution: 5.2,
        percentage: 28.1
      },
      {
        factor: 'Property Type Selection',
        contribution: 3.8,
        percentage: 20.5
      },
      {
        factor: 'Interest Rate',
        contribution: 4.5,
        percentage: 24.3
      },
      {
        factor: 'Loan Term',
        contribution: 2.1,
        percentage: 11.4
      },
      {
        factor: 'LTV Ratio',
        contribution: 1.8,
        percentage: 9.7
      },
      {
        factor: 'Market Timing',
        contribution: 1.1,
        percentage: 5.9
      }
    ],
    bySuburb: [
      {
        suburb: 'Mosman',
        contribution: 4.2,
        percentage: 22.7
      },
      {
        suburb: 'Bondi',
        contribution: 3.8,
        percentage: 20.5
      },
      {
        suburb: 'Manly',
        contribution: 3.5,
        percentage: 18.9
      },
      {
        suburb: 'Neutral Bay',
        contribution: 2.8,
        percentage: 15.1
      },
      {
        suburb: 'Others',
        contribution: 4.2,
        percentage: 22.7
      }
    ]
  },
  
  // Risk decomposition
  risk: {
    title: 'Risk Decomposition',
    description: 'Analysis of sources of portfolio risk',
    lastUpdated: '2024-04-10T00:00:00Z',
    totalRisk: 0.42,
    decomposition: [
      {
        factor: 'Market Risk',
        contribution: 0.18,
        percentage: 42.9
      },
      {
        factor: 'Credit Risk',
        contribution: 0.12,
        percentage: 28.6
      },
      {
        factor: 'Interest Rate Risk',
        contribution: 0.08,
        percentage: 19.0
      },
      {
        factor: 'Concentration Risk',
        contribution: 0.04,
        percentage: 9.5
      }
    ],
    bySuburb: [
      {
        suburb: 'Mosman',
        contribution: 0.08,
        percentage: 19.0
      },
      {
        suburb: 'Bondi',
        contribution: 0.07,
        percentage: 16.7
      },
      {
        suburb: 'Manly',
        contribution: 0.06,
        percentage: 14.3
      },
      {
        suburb: 'Neutral Bay',
        contribution: 0.05,
        percentage: 11.9
      },
      {
        suburb: 'Others',
        contribution: 0.16,
        percentage: 38.1
      }
    ]
  },
  
  // Trend analysis
  trends: {
    title: 'Trend Analysis',
    description: 'Analysis of portfolio trends over time',
    lastUpdated: '2024-04-10T00:00:00Z',
    metrics: [
      {
        name: 'IRR',
        values: [
          { date: '2024-01-01', value: 17.8 },
          { date: '2024-02-01', value: 18.1 },
          { date: '2024-03-01', value: 18.3 },
          { date: '2024-04-01', value: 18.5 }
        ],
        trend: 'increasing',
        annualizedChange: 4.2
      },
      {
        name: 'ROI',
        values: [
          { date: '2024-01-01', value: 21.5 },
          { date: '2024-02-01', value: 21.9 },
          { date: '2024-03-01', value: 22.1 },
          { date: '2024-04-01', value: 22.3 }
        ],
        trend: 'increasing',
        annualizedChange: 3.8
      },
      {
        name: 'Cash Yield',
        values: [
          { date: '2024-01-01', value: 8.2 },
          { date: '2024-02-01', value: 8.4 },
          { date: '2024-03-01', value: 8.5 },
          { date: '2024-04-01', value: 8.7 }
        ],
        trend: 'increasing',
        annualizedChange: 6.1
      },
      {
        name: 'Default Rate',
        values: [
          { date: '2024-01-01', value: 0.9 },
          { date: '2024-02-01', value: 0.85 },
          { date: '2024-03-01', value: 0.82 },
          { date: '2024-04-01', value: 0.8 }
        ],
        trend: 'decreasing',
        annualizedChange: -11.1
      }
    ]
  },
  
  // Suburb comparison
  suburbs: {
    title: 'Suburb Comparison',
    description: 'Comparison of performance across suburbs',
    lastUpdated: '2024-04-10T00:00:00Z',
    metrics: [
      {
        name: 'IRR',
        values: [
          { suburb: 'Mosman', value: 18.8 },
          { suburb: 'Bondi', value: 19.5 },
          { suburb: 'Manly', value: 19.1 },
          { suburb: 'Neutral Bay', value: 18.2 },
          { suburb: 'Coogee', value: 17.9 },
          { suburb: 'Randwick', value: 17.5 },
          { suburb: 'Leichhardt', value: 16.8 },
          { suburb: 'Strathfield', value: 16.5 }
        ]
      },
      {
        name: 'Default Rate',
        values: [
          { suburb: 'Mosman', value: 0.5 },
          { suburb: 'Bondi', value: 0.6 },
          { suburb: 'Manly', value: 0.4 },
          { suburb: 'Neutral Bay', value: 0.7 },
          { suburb: 'Coogee', value: 0.8 },
          { suburb: 'Randwick', value: 0.8 },
          { suburb: 'Leichhardt', value: 0.9 },
          { suburb: 'Strathfield', value: 1.0 }
        ]
      },
      {
        name: 'Property Value Growth',
        values: [
          { suburb: 'Mosman', value: 5.2 },
          { suburb: 'Bondi', value: 4.8 },
          { suburb: 'Manly', value: 5.0 },
          { suburb: 'Neutral Bay', value: 4.5 },
          { suburb: 'Coogee', value: 4.2 },
          { suburb: 'Randwick', value: 4.0 },
          { suburb: 'Leichhardt', value: 3.8 },
          { suburb: 'Strathfield', value: 3.5 }
        ]
      }
    ]
  },
  
  // Correlation analysis
  correlation: {
    title: 'Correlation Analysis',
    description: 'Analysis of correlations between portfolio metrics',
    lastUpdated: '2024-04-10T00:00:00Z',
    correlations: [
      {
        metric1: 'IRR',
        metric2: 'Property Value',
        correlation: 0.72,
        strength: 'strong',
        direction: 'positive'
      },
      {
        metric1: 'IRR',
        metric2: 'LTV Ratio',
        correlation: -0.35,
        strength: 'moderate',
        direction: 'negative'
      },
      {
        metric1: 'Default Rate',
        metric2: 'Property Value',
        correlation: -0.68,
        strength: 'strong',
        direction: 'negative'
      },
      {
        metric1: 'Default Rate',
        metric2: 'LTV Ratio',
        correlation: 0.81,
        strength: 'strong',
        direction: 'positive'
      },
      {
        metric1: 'Cash Yield',
        metric2: 'Interest Rate',
        correlation: 0.92,
        strength: 'very strong',
        direction: 'positive'
      }
    ],
    suburbCorrelations: [
      {
        suburb1: 'Mosman',
        suburb2: 'Neutral Bay',
        correlation: 0.85,
        strength: 'strong',
        direction: 'positive'
      },
      {
        suburb1: 'Bondi',
        suburb2: 'Coogee',
        correlation: 0.78,
        strength: 'strong',
        direction: 'positive'
      },
      {
        suburb1: 'Mosman',
        suburb2: 'Leichhardt',
        correlation: 0.32,
        strength: 'weak',
        direction: 'positive'
      },
      {
        suburb1: 'Bondi',
        suburb2: 'Strathfield',
        correlation: 0.25,
        strength: 'weak',
        direction: 'positive'
      }
    ]
  }
};
