import { LoanDecision } from '../types';

// Decision Service
export const DecisionService = {
  // Get decision for an application
  getDecision: async (applicationId: string): Promise<LoanDecision> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${applicationId}/decision`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching decision for application ${applicationId}:`, error);
      throw error;
    }
  },

  // Create decision
  createDecision: async (decision: Omit<LoanDecision, 'id'>): Promise<LoanDecision> => {
    try {
      const response = await fetch('/api/underwriting/decisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(decision),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating decision:', error);
      throw error;
    }
  },

  // Update decision
  updateDecision: async (id: string, decision: Partial<LoanDecision>): Promise<LoanDecision> => {
    try {
      const response = await fetch(`/api/underwriting/decisions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(decision),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating decision ${id}:`, error);
      throw error;
    }
  },

  // Generate decision for an application
  generateDecision: async (applicationId: string): Promise<LoanDecision> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${applicationId}/generate-decision`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error generating decision for application ${applicationId}:`, error);
      throw error;
    }
  },

  // Override decision
  overrideDecision: async (id: string, decision: string, rationale: string): Promise<LoanDecision> => {
    try {
      const response = await fetch(`/api/underwriting/decisions/${id}/override`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decision, rationale }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error overriding decision ${id}:`, error);
      throw error;
    }
  },
};
