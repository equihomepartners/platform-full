import { RiskAssessment } from '../types';

// Risk Service
export const RiskService = {
  // Get risk assessment for an application
  getRiskAssessment: async (applicationId: string): Promise<RiskAssessment> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${applicationId}/risk-assessment`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching risk assessment for application ${applicationId}:`, error);
      throw error;
    }
  },

  // Create risk assessment
  createRiskAssessment: async (assessment: Omit<RiskAssessment, 'id'>): Promise<RiskAssessment> => {
    try {
      const response = await fetch('/api/underwriting/risk-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessment),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating risk assessment:', error);
      throw error;
    }
  },

  // Update risk assessment
  updateRiskAssessment: async (id: string, assessment: Partial<RiskAssessment>): Promise<RiskAssessment> => {
    try {
      const response = await fetch(`/api/underwriting/risk-assessment/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessment),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating risk assessment ${id}:`, error);
      throw error;
    }
  },

  // Generate risk assessment for an application
  generateRiskAssessment: async (applicationId: string): Promise<RiskAssessment> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${applicationId}/generate-risk-assessment`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error generating risk assessment for application ${applicationId}:`, error);
      throw error;
    }
  },
};
