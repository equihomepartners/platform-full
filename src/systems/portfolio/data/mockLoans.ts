/**
 * Mock Loans Data
 * 
 * This file contains mock data for loans in the portfolio.
 * It will be used as a fallback when the real API is not available.
 */

export const mockLoans = [
  {
    id: 'loan-001',
    suburb: 'Mosman',
    propertyValue: 4200000,
    loanAmount: 850000,
    ltv: 20.24,
    location: {
      latitude: -33.8279,
      longitude: 151.2412,
      address: '42 Mosman Street, Mosman, NSW 2088'
    },
    loanTerms: {
      startDate: '2024-03-15',
      endDate: '2030-03-15',
      interestRate: 5.5,
      paymentFrequency: 'monthly',
      balloonPayment: 850000
    },
    propertyDetails: {
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      landSize: 650,
      yearBuilt: 1998,
      condition: 'Excellent',
      yearlyGrowth: 5.2
    },
    borrowerDetails: {
      name: 'James & Sarah Wilson',
      income: 450000,
      occupation: 'Business Owners',
      creditScore: 820
    },
    performanceMetrics: {
      irr: 18.4,
      roi: 22.1,
      cashYield: 8.5,
      totalReturn: 156000
    },
    riskMetrics: {
      defaultProbability: 0.5,
      lossGivenDefault: 12.8,
      expectedLoss: 0.064,
      stressTestImpact: -4.2
    },
    zone: 'green'
  },
  {
    id: 'loan-002',
    suburb: 'Bondi',
    propertyValue: 3800000,
    loanAmount: 780000,
    ltv: 20.53,
    location: {
      latitude: -33.8906,
      longitude: 151.2741,
      address: '15 Campbell Parade, Bondi Beach, NSW 2026'
    },
    loanTerms: {
      startDate: '2024-02-10',
      endDate: '2029-02-10',
      interestRate: 5.2,
      paymentFrequency: 'monthly',
      balloonPayment: 780000
    },
    propertyDetails: {
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      landSize: 0,
      yearBuilt: 2010,
      condition: 'Excellent',
      yearlyGrowth: 4.8
    },
    borrowerDetails: {
      name: 'Michael & Emma Thompson',
      income: 380000,
      occupation: 'Finance Professionals',
      creditScore: 795
    },
    performanceMetrics: {
      irr: 17.8,
      roi: 21.5,
      cashYield: 8.2,
      totalReturn: 142000
    },
    riskMetrics: {
      defaultProbability: 0.6,
      lossGivenDefault: 13.5,
      expectedLoss: 0.081,
      stressTestImpact: -4.5
    },
    zone: 'green'
  },
  {
    id: 'loan-003',
    suburb: 'Manly',
    propertyValue: 4500000,
    loanAmount: 900000,
    ltv: 20.00,
    location: {
      latitude: -33.7971,
      longitude: 151.2858,
      address: '28 North Steyne, Manly, NSW 2095'
    },
    loanTerms: {
      startDate: '2024-01-20',
      endDate: '2031-01-20',
      interestRate: 5.3,
      paymentFrequency: 'monthly',
      balloonPayment: 900000
    },
    propertyDetails: {
      type: 'House',
      bedrooms: 5,
      bathrooms: 3,
      landSize: 720,
      yearBuilt: 2005,
      condition: 'Excellent',
      yearlyGrowth: 5.0
    },
    borrowerDetails: {
      name: 'David & Jennifer Brown',
      income: 520000,
      occupation: 'Medical Professionals',
      creditScore: 830
    },
    performanceMetrics: {
      irr: 19.1,
      roi: 23.0,
      cashYield: 8.8,
      totalReturn: 168000
    },
    riskMetrics: {
      defaultProbability: 0.4,
      lossGivenDefault: 12.0,
      expectedLoss: 0.048,
      stressTestImpact: -3.8
    },
    zone: 'green'
  },
  {
    id: 'loan-004',
    suburb: 'Neutral Bay',
    propertyValue: 3200000,
    loanAmount: 720000,
    ltv: 22.50,
    location: {
      latitude: -33.8312,
      longitude: 151.2195,
      address: '56 Ben Boyd Road, Neutral Bay, NSW 2089'
    },
    loanTerms: {
      startDate: '2024-04-05',
      endDate: '2029-04-05',
      interestRate: 5.4,
      paymentFrequency: 'monthly',
      balloonPayment: 720000
    },
    propertyDetails: {
      type: 'Townhouse',
      bedrooms: 3,
      bathrooms: 2,
      landSize: 320,
      yearBuilt: 2012,
      condition: 'Good',
      yearlyGrowth: 4.5
    },
    borrowerDetails: {
      name: 'Robert & Lisa Johnson',
      income: 340000,
      occupation: 'IT Professionals',
      creditScore: 780
    },
    performanceMetrics: {
      irr: 17.2,
      roi: 20.8,
      cashYield: 7.9,
      totalReturn: 135000
    },
    riskMetrics: {
      defaultProbability: 0.7,
      lossGivenDefault: 14.2,
      expectedLoss: 0.099,
      stressTestImpact: -4.8
    },
    zone: 'green'
  },
  {
    id: 'loan-005',
    suburb: 'Leichhardt',
    propertyValue: 2800000,
    loanAmount: 650000,
    ltv: 23.21,
    location: {
      latitude: -33.8833,
      longitude: 151.1571,
      address: '123 Norton Street, Leichhardt, NSW 2040'
    },
    loanTerms: {
      startDate: '2024-03-01',
      endDate: '2030-03-01',
      interestRate: 5.6,
      paymentFrequency: 'monthly',
      balloonPayment: 650000
    },
    propertyDetails: {
      type: 'House',
      bedrooms: 4,
      bathrooms: 2,
      landSize: 450,
      yearBuilt: 1985,
      condition: 'Good',
      yearlyGrowth: 4.0
    },
    borrowerDetails: {
      name: 'Andrew & Catherine Davis',
      income: 310000,
      occupation: 'Marketing Executives',
      creditScore: 760
    },
    performanceMetrics: {
      irr: 16.5,
      roi: 19.8,
      cashYield: 7.6,
      totalReturn: 125000
    },
    riskMetrics: {
      defaultProbability: 0.9,
      lossGivenDefault: 15.0,
      expectedLoss: 0.135,
      stressTestImpact: -5.2
    },
    zone: 'yellow'
  }
];
