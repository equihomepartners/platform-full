/**
 * Mock Performance Metrics Data
 * 
 * This file contains mock data for portfolio performance metrics.
 * It will be used as a fallback when the real API is not available.
 */

export const mockPerformanceMetrics = {
  current: {
    irr: 18.5,
    roi: 22.3,
    cashYield: 8.7,
    totalReturn: 3350000,
    sharpeRatio: 1.8,
    alphaVsMarket: 3.2
  },
  historical: [
    {
      date: '2024-01-01',
      irr: 17.8,
      roi: 21.5,
      cashYield: 8.2,
      totalReturn: 3150000
    },
    {
      date: '2024-02-01',
      irr: 18.1,
      roi: 21.9,
      cashYield: 8.4,
      totalReturn: 3220000
    },
    {
      date: '2024-03-01',
      irr: 18.3,
      roi: 22.1,
      cashYield: 8.5,
      totalReturn: 3280000
    },
    {
      date: '2024-04-01',
      irr: 18.5,
      roi: 22.3,
      cashYield: 8.7,
      totalReturn: 3350000
    }
  ],
  projected: [
    {
      date: '2024-05-01',
      irr: 18.7,
      roi: 22.5,
      cashYield: 8.8,
      totalReturn: 3420000
    },
    {
      date: '2024-06-01',
      irr: 18.9,
      roi: 22.7,
      cashYield: 8.9,
      totalReturn: 3490000
    },
    {
      date: '2024-07-01',
      irr: 19.1,
      roi: 22.9,
      cashYield: 9.0,
      totalReturn: 3560000
    },
    {
      date: '2024-08-01',
      irr: 19.3,
      roi: 23.1,
      cashYield: 9.1,
      totalReturn: 3630000
    }
  ],
  bySuburb: [
    {
      suburb: 'Mosman',
      irr: 18.8,
      roi: 22.6,
      cashYield: 8.8,
      totalReturn: 740000
    },
    {
      suburb: 'Bondi',
      irr: 19.5,
      roi: 23.4,
      cashYield: 9.2,
      totalReturn: 630000
    },
    {
      suburb: 'Manly',
      irr: 19.1,
      roi: 23.0,
      cashYield: 9.0,
      totalReturn: 520000
    },
    {
      suburb: 'Neutral Bay',
      irr: 18.2,
      roi: 21.9,
      cashYield: 8.5,
      totalReturn: 410000
    },
    {
      suburb: 'Coogee',
      irr: 17.9,
      roi: 21.5,
      cashYield: 8.3,
      totalReturn: 350000
    },
    {
      suburb: 'Randwick',
      irr: 17.5,
      roi: 21.0,
      cashYield: 8.1,
      totalReturn: 280000
    },
    {
      suburb: 'Leichhardt',
      irr: 16.8,
      roi: 20.2,
      cashYield: 7.8,
      totalReturn: 250000
    },
    {
      suburb: 'Strathfield',
      irr: 16.5,
      roi: 19.8,
      cashYield: 7.6,
      totalReturn: 170000
    }
  ],
  byPropertyType: [
    {
      type: 'House',
      irr: 18.9,
      roi: 22.7,
      cashYield: 8.9,
      totalReturn: 1530000
    },
    {
      type: 'Apartment',
      irr: 18.2,
      roi: 21.9,
      cashYield: 8.5,
      totalReturn: 1120000
    },
    {
      type: 'Townhouse',
      irr: 18.0,
      roi: 21.6,
      cashYield: 8.4,
      totalReturn: 700000
    }
  ],
  byZone: [
    {
      zone: 'green',
      irr: 18.8,
      roi: 22.6,
      cashYield: 8.8,
      totalReturn: 2930000
    },
    {
      zone: 'yellow',
      irr: 16.7,
      roi: 20.0,
      cashYield: 7.7,
      totalReturn: 420000
    },
    {
      zone: 'red',
      irr: 0,
      roi: 0,
      cashYield: 0,
      totalReturn: 0
    }
  ]
};
