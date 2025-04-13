import { create } from 'zustand';
import { RiskAssessment } from '../types';

interface RiskState {
  riskAssessments: RiskAssessment[];
  selectedRiskAssessmentId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setRiskAssessments: (assessments: RiskAssessment[]) => void;
  setSelectedRiskAssessmentId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addRiskAssessment: (assessment: RiskAssessment) => void;
  updateRiskAssessment: (id: string, assessment: Partial<RiskAssessment>) => void;
  deleteRiskAssessment: (id: string) => void;
}

// Mock data for development
const mockRiskAssessments: RiskAssessment[] = [
  {
    id: 'risk-1',
    applicationId: '1',
    overallRisk: 'medium',
    riskScore: 65.5,
    assessmentDate: new Date().toISOString(),
    riskFactors: [
      {
        factor: 'Traffic Light Zone',
        value: 'Green',
        risk: 'low',
        impact: 'positive',
        weight: 0.3,
        score: 0.9
      },
      {
        factor: 'LTV Ratio',
        value: 20,
        risk: 'low',
        impact: 'positive',
        weight: 0.2,
        score: 0.9
      },
      {
        factor: 'Combined LTV',
        value: 60,
        risk: 'medium',
        impact: 'neutral',
        weight: 0.15,
        score: 0.7
      },
      {
        factor: 'Borrower Income',
        value: 150000,
        risk: 'low',
        impact: 'positive',
        weight: 0.15,
        score: 0.8
      },
      {
        factor: 'Employment Status',
        value: 'employed',
        risk: 'low',
        impact: 'positive',
        weight: 0.1,
        score: 0.9
      },
      {
        factor: 'Property Type',
        value: 'house',
        risk: 'low',
        impact: 'positive',
        weight: 0.1,
        score: 0.9
      }
    ],
    mitigationRecommendations: [
      'Verify property valuation with independent assessment',
      'Request additional income documentation',
      'Verify property is in good condition with inspection'
    ]
  },
  {
    id: 'risk-2',
    applicationId: '2',
    overallRisk: 'medium',
    riskScore: 60.2,
    assessmentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    riskFactors: [
      {
        factor: 'Traffic Light Zone',
        value: 'Green',
        risk: 'low',
        impact: 'positive',
        weight: 0.3,
        score: 0.9
      },
      {
        factor: 'LTV Ratio',
        value: 16.7,
        risk: 'low',
        impact: 'positive',
        weight: 0.2,
        score: 0.9
      },
      {
        factor: 'Combined LTV',
        value: 66.7,
        risk: 'medium',
        impact: 'neutral',
        weight: 0.15,
        score: 0.7
      },
      {
        factor: 'Borrower Income',
        value: 180000,
        risk: 'low',
        impact: 'positive',
        weight: 0.15,
        score: 0.9
      },
      {
        factor: 'Employment Status',
        value: 'self-employed',
        risk: 'medium',
        impact: 'neutral',
        weight: 0.1,
        score: 0.7
      },
      {
        factor: 'Property Type',
        value: 'apartment',
        risk: 'medium',
        impact: 'neutral',
        weight: 0.1,
        score: 0.7
      }
    ],
    mitigationRecommendations: [
      'Verify property valuation with independent assessment',
      'Request additional income documentation and business financials',
      'Verify property is in good condition with inspection',
      'Verify strata report for the apartment building'
    ]
  },
  {
    id: 'risk-3',
    applicationId: '3',
    overallRisk: 'low',
    riskScore: 82.5,
    assessmentDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    riskFactors: [
      {
        factor: 'Traffic Light Zone',
        value: 'Green',
        risk: 'low',
        impact: 'positive',
        weight: 0.3,
        score: 0.9
      },
      {
        factor: 'LTV Ratio',
        value: 25,
        risk: 'low',
        impact: 'positive',
        weight: 0.2,
        score: 0.8
      },
      {
        factor: 'Combined LTV',
        value: 71.9,
        risk: 'medium',
        impact: 'neutral',
        weight: 0.15,
        score: 0.7
      },
      {
        factor: 'Borrower Income',
        value: 200000,
        risk: 'low',
        impact: 'positive',
        weight: 0.15,
        score: 0.9
      },
      {
        factor: 'Employment Status',
        value: 'employed',
        risk: 'low',
        impact: 'positive',
        weight: 0.1,
        score: 0.9
      },
      {
        factor: 'Property Type',
        value: 'house',
        risk: 'low',
        impact: 'positive',
        weight: 0.1,
        score: 0.9
      }
    ],
    mitigationRecommendations: [
      'Verify property valuation with independent assessment',
      'Request additional income documentation',
      'Verify property is in good condition with inspection'
    ]
  }
];

export const useRiskStore = create<RiskState>((set) => ({
  riskAssessments: mockRiskAssessments,
  selectedRiskAssessmentId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setRiskAssessments: (assessments) => set({ riskAssessments: assessments }),
  setSelectedRiskAssessmentId: (id) => set({ selectedRiskAssessmentId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addRiskAssessment: (assessment) => set((state) => ({
    riskAssessments: [...state.riskAssessments, assessment]
  })),
  
  updateRiskAssessment: (id, updatedAssessment) => set((state) => ({
    riskAssessments: state.riskAssessments.map((assessment) =>
      assessment.id === id ? { ...assessment, ...updatedAssessment } : assessment
    )
  })),
  
  deleteRiskAssessment: (id) => set((state) => ({
    riskAssessments: state.riskAssessments.filter((assessment) => assessment.id !== id)
  }))
}));
