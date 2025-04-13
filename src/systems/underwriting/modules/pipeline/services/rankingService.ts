import { RankingCriteria, DealRankingResult } from '../types';

// Ranking Service
export const RankingService = {
  // Get all ranking criteria
  getRankingCriteria: async (): Promise<RankingCriteria[]> => {
    try {
      const response = await fetch('/api/underwriting/pipeline/ranking/criteria');
      const data = await response.json();
      return data.criteria;
    } catch (error) {
      console.error('Error fetching ranking criteria:', error);
      throw error;
    }
  },

  // Update ranking criteria
  updateRankingCriteria: async (id: string, criterion: Partial<RankingCriteria>): Promise<RankingCriteria> => {
    try {
      const response = await fetch(`/api/underwriting/pipeline/ranking/criteria/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criterion),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating ranking criterion ${id}:`, error);
      throw error;
    }
  },

  // Get rankings for deals
  getRankings: async (dealIds?: string[]): Promise<DealRankingResult[]> => {
    try {
      let url = '/api/underwriting/pipeline/ranking';
      if (dealIds && dealIds.length > 0) {
        url += `?dealIds=${dealIds.join(',')}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      return data.rankings;
    } catch (error) {
      console.error('Error fetching rankings:', error);
      throw error;
    }
  },

  // Calculate rankings for deals
  calculateRankings: async (dealIds?: string[]): Promise<DealRankingResult[]> => {
    try {
      let url = '/api/underwriting/pipeline/ranking/calculate';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dealIds }),
      });
      const data = await response.json();
      return data.rankings;
    } catch (error) {
      console.error('Error calculating rankings:', error);
      throw error;
    }
  },
};
