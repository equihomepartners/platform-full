import { create } from 'zustand';
import { LoanApplication } from '../types';

interface ApplicationState {
  applications: LoanApplication[];
  selectedApplicationId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setApplications: (applications: LoanApplication[]) => void;
  setSelectedApplicationId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addApplication: (application: LoanApplication) => void;
  updateApplication: (id: string, application: Partial<LoanApplication>) => void;
  deleteApplication: (id: string) => void;
}

// Mock data for development
const mockApplications: LoanApplication[] = [
  {
    id: '1',
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678',
      annualIncome: 150000,
      employmentStatus: 'employed'
    },
    property: {
      address: '123 Main St',
      suburb: 'Mosman',
      state: 'NSW',
      postcode: '2088',
      type: 'house',
      bedrooms: 4,
      bathrooms: 2,
      landSize: 500,
      currentValue: 2500000,
      mortgageBalance: 1000000
    },
    loan: {
      amount: 500000,
      purpose: 'renovation',
      term: 10
    }
  },
  {
    id: '2',
    status: 'in-review',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0412 987 654',
      annualIncome: 180000,
      employmentStatus: 'self-employed'
    },
    property: {
      address: '456 High St',
      suburb: 'Double Bay',
      state: 'NSW',
      postcode: '2028',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      landSize: 0,
      currentValue: 1800000,
      mortgageBalance: 900000
    },
    loan: {
      amount: 300000,
      purpose: 'investment',
      term: 10
    }
  },
  {
    id: '3',
    status: 'approved',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '0413 456 789',
      annualIncome: 200000,
      employmentStatus: 'employed'
    },
    property: {
      address: '789 Beach Rd',
      suburb: 'Bondi',
      state: 'NSW',
      postcode: '2026',
      type: 'house',
      bedrooms: 5,
      bathrooms: 3,
      landSize: 600,
      currentValue: 3200000,
      mortgageBalance: 1500000
    },
    loan: {
      amount: 800000,
      purpose: 'renovation',
      term: 10
    },
    decision: {
      id: '1',
      applicationId: '3',
      decision: 'approved',
      decisionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
        'Borrower must provide proof of income'
      ],
      rationale: [
        'Property is in a green zone',
        'LTV ratio is within acceptable range',
        'Borrower has strong income'
      ],
      financialProjections: {
        irr: 9.5,
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
            accruedInterest: 82000,
            appreciationShare: 0,
            totalReturn: 82000
          }
        ]
      }
    }
  }
];

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: mockApplications,
  selectedApplicationId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setApplications: (applications) => set({ applications }),
  setSelectedApplicationId: (id) => set({ selectedApplicationId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addApplication: (application) => set((state) => ({
    applications: [...state.applications, application]
  })),
  
  updateApplication: (id, updatedApplication) => set((state) => ({
    applications: state.applications.map((app) =>
      app.id === id ? { ...app, ...updatedApplication } : app
    )
  })),
  
  deleteApplication: (id) => set((state) => ({
    applications: state.applications.filter((app) => app.id !== id)
  }))
}));
