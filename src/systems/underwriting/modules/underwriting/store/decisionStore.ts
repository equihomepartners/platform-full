import { create } from 'zustand';
import { LoanDecision } from '../types';

interface DecisionState {
  decisions: LoanDecision[];
  selectedDecisionId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setDecisions: (decisions: LoanDecision[]) => void;
  setSelectedDecisionId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addDecision: (decision: LoanDecision) => void;
  updateDecision: (id: string, decision: Partial<LoanDecision>) => void;
  deleteDecision: (id: string) => void;
}

// Mock data for development
const mockDecisions: LoanDecision[] = [
  {
    id: 'decision-1',
    applicationId: '1',
    decision: 'approved',
    decisionDate: new Date().toISOString(),
    decisionBy: 'system',
    automated: true,
    overridden: false,
    terms: {
      amount: 500000,
      interestRate: 5,
      term: 10,
      originationFee: 3,
      appreciationShare: 20
    },
    conditions: [
      'Property valuation must be confirmed',
      'Borrower must provide proof of income',
      'Property must be in good condition'
    ],
    rationale: [
      'Property is in a green zone',
      'LTV ratio is within acceptable range',
      'Borrower has strong income'
    ],
    financialProjections: {
      irr: 9.5,
      totalReturn: 750000,
      yearlyBreakdown: [
        {
          year: 1,
          propertyValue: 2600000,
          accruedInterest: 25000,
          appreciationShare: 0,
          totalReturn: 25000
        },
        {
          year: 2,
          propertyValue: 2704000,
          accruedInterest: 50000,
          appreciationShare: 0,
          totalReturn: 50000
        },
        {
          year: 3,
          propertyValue: 2812160,
          accruedInterest: 75000,
          appreciationShare: 0,
          totalReturn: 75000
        },
        {
          year: 4,
          propertyValue: 2924646,
          accruedInterest: 100000,
          appreciationShare: 0,
          totalReturn: 100000
        },
        {
          year: 5,
          propertyValue: 3041632,
          accruedInterest: 125000,
          appreciationShare: 108326,
          totalReturn: 233326
        }
      ]
    }
  },
  {
    id: 'decision-2',
    applicationId: '2',
    decision: 'approved',
    decisionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    decisionBy: 'system',
    automated: true,
    overridden: false,
    terms: {
      amount: 300000,
      interestRate: 5,
      term: 10,
      originationFee: 3,
      appreciationShare: 20
    },
    conditions: [
      'Property valuation must be confirmed',
      'Borrower must provide proof of income and business financials',
      'Property must be in good condition'
    ],
    rationale: [
      'Property is in a green zone',
      'LTV ratio is within acceptable range',
      'Borrower has strong income'
    ],
    financialProjections: {
      irr: 9.2,
      totalReturn: 450000,
      yearlyBreakdown: [
        {
          year: 1,
          propertyValue: 1872000,
          accruedInterest: 15000,
          appreciationShare: 0,
          totalReturn: 15000
        },
        {
          year: 2,
          propertyValue: 1946880,
          accruedInterest: 30000,
          appreciationShare: 0,
          totalReturn: 30000
        },
        {
          year: 3,
          propertyValue: 2024755,
          accruedInterest: 45000,
          appreciationShare: 0,
          totalReturn: 45000
        },
        {
          year: 4,
          propertyValue: 2105745,
          accruedInterest: 60000,
          appreciationShare: 0,
          totalReturn: 60000
        },
        {
          year: 5,
          propertyValue: 2189975,
          accruedInterest: 75000,
          appreciationShare: 77995,
          totalReturn: 152995
        }
      ]
    }
  },
  {
    id: 'decision-3',
    applicationId: '3',
    decision: 'approved',
    decisionDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    decisionBy: 'system',
    automated: true,
    overridden: false,
    terms: {
      amount: 800000,
      interestRate: 5,
      term: 10,
      originationFee: 3,
      appreciationShare: 20
    },
    conditions: [
      'Property valuation must be confirmed',
      'Borrower must provide proof of income',
      'Property must be in good condition'
    ],
    rationale: [
      'Property is in a green zone',
      'LTV ratio is within acceptable range',
      'Borrower has strong income'
    ],
    financialProjections: {
      irr: 9.8,
      totalReturn: 1200000,
      yearlyBreakdown: [
        {
          year: 1,
          propertyValue: 3328000,
          accruedInterest: 40000,
          appreciationShare: 0,
          totalReturn: 40000
        },
        {
          year: 2,
          propertyValue: 3461120,
          accruedInterest: 80000,
          appreciationShare: 0,
          totalReturn: 80000
        },
        {
          year: 3,
          propertyValue: 3599565,
          accruedInterest: 120000,
          appreciationShare: 0,
          totalReturn: 120000
        },
        {
          year: 4,
          propertyValue: 3743547,
          accruedInterest: 160000,
          appreciationShare: 0,
          totalReturn: 160000
        },
        {
          year: 5,
          propertyValue: 3893289,
          accruedInterest: 200000,
          appreciationShare: 138658,
          totalReturn: 338658
        }
      ]
    }
  }
];

export const useDecisionStore = create<DecisionState>((set) => ({
  decisions: mockDecisions,
  selectedDecisionId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setDecisions: (decisions) => set({ decisions }),
  setSelectedDecisionId: (id) => set({ selectedDecisionId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addDecision: (decision) => set((state) => ({
    decisions: [...state.decisions, decision]
  })),
  
  updateDecision: (id, updatedDecision) => set((state) => ({
    decisions: state.decisions.map((decision) =>
      decision.id === id ? { ...decision, ...updatedDecision } : decision
    )
  })),
  
  deleteDecision: (id) => set((state) => ({
    decisions: state.decisions.filter((decision) => decision.id !== id)
  }))
}));
