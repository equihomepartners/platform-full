import { create } from 'zustand';
import { RankingCriteria, DealRankingResult } from '../types';

interface RankingState {
  criteria: RankingCriteria[];
  rankings: DealRankingResult[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCriteria: (criteria: RankingCriteria[]) => void;
  setRankings: (rankings: DealRankingResult[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateCriterion: (id: string, criterion: Partial<RankingCriteria>) => void;
  calculateRankings: (dealIds: string[]) => void;
}

// Mock data for development
const mockRankingCriteria: RankingCriteria[] = [
  { id: '1', name: 'Traffic Light Zone', description: 'Ranking based on Traffic Light System zone', weight: 0.3, source: 'tfs', active: true },
  { id: '2', name: 'LTV Ratio', description: 'Ranking based on loan-to-value ratio', weight: 0.2, source: 'manual', active: true },
  { id: '3', name: 'Property Value', description: 'Ranking based on property value', weight: 0.15, source: 'manual', active: true },
  { id: '4', name: 'Borrower Income', description: 'Ranking based on borrower income', weight: 0.15, source: 'manual', active: true },
  { id: '5', name: 'Portfolio Fit', description: 'Ranking based on fit with current portfolio', weight: 0.2, source: 'pms', active: true }
];

const mockRankings: DealRankingResult[] = [
  {
    dealId: '1',
    score: 0.85,
    rank: 2,
    criteria: [
      { name: 'Traffic Light Zone', weight: 0.3, score: 0.9 },
      { name: 'LTV Ratio', weight: 0.2, score: 0.8 },
      { name: 'Property Value', weight: 0.15, score: 0.8 },
      { name: 'Borrower Income', weight: 0.15, score: 0.8 },
      { name: 'Portfolio Fit', weight: 0.2, score: 0.85 }
    ]
  },
  {
    dealId: '2',
    score: 0.82,
    rank: 3,
    criteria: [
      { name: 'Traffic Light Zone', weight: 0.3, score: 0.9 },
      { name: 'LTV Ratio', weight: 0.2, score: 0.7 },
      { name: 'Property Value', weight: 0.15, score: 0.7 },
      { name: 'Borrower Income', weight: 0.15, score: 0.85 },
      { name: 'Portfolio Fit', weight: 0.2, score: 0.8 }
    ]
  },
  {
    dealId: '3',
    score: 0.88,
    rank: 1,
    criteria: [
      { name: 'Traffic Light Zone', weight: 0.3, score: 0.9 },
      { name: 'LTV Ratio', weight: 0.2, score: 0.8 },
      { name: 'Property Value', weight: 0.15, score: 0.9 },
      { name: 'Borrower Income', weight: 0.15, score: 0.9 },
      { name: 'Portfolio Fit', weight: 0.2, score: 0.85 }
    ]
  }
];

export const useRankingStore = create<RankingState>((set) => ({
  criteria: mockRankingCriteria,
  rankings: mockRankings,
  isLoading: false,
  error: null,
  
  // Actions
  setCriteria: (criteria) => set({ criteria }),
  setRankings: (rankings) => set({ rankings }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  updateCriterion: (id, updatedCriterion) => set((state) => ({
    criteria: state.criteria.map((criterion) =>
      criterion.id === id ? { ...criterion, ...updatedCriterion } : criterion
    )
  })),
  
  calculateRankings: (dealIds) => {
    set({ isLoading: true });
    
    // In a real implementation, this would call an API to calculate rankings
    // For now, we'll just use the mock rankings
    
    setTimeout(() => {
      set((state) => ({
        rankings: dealIds.length > 0
          ? state.rankings.filter(ranking => dealIds.includes(ranking.dealId))
          : mockRankings,
        isLoading: false
      }));
    }, 1000);
  }
}));
