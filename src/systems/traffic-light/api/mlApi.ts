/**
 * Traffic Light System - ML API Services
 * 
 * This file contains API service functions for ML-related endpoints.
 * Currently using mock data, but designed to be easily replaced with real API calls.
 */

import { MLDecisionFactors, MLSystemStatus } from './types';

// Base API URL - Replace with environment variable in production
const API_BASE_URL = '/api';

/**
 * Get ML decision factors for a specific suburb
 * 
 * API: GET /api/ml/decisions/{suburbName}
 * Returns the ML and LLM decision factors for a specific suburb
 */
export const getMLDecisionFactors = async (suburbName: string): Promise<MLDecisionFactors> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/ml/decisions/${encodeURIComponent(suburbName)}`);
    // if (!response.ok) throw new Error(`Failed to fetch ML decision factors for suburb: ${suburbName}`);
    // return await response.json();
    
    // Return empty mock data for now
    return {
      suburb: suburbName,
      short_term: {
        prediction: '',
        confidence: 0,
        factors: []
      },
      medium_term: {
        prediction: '',
        confidence: 0,
        factors: []
      },
      long_term: {
        prediction: '',
        confidence: 0,
        factors: []
      },
      llm_rationale: '',
      decision_weights: []
    };
  } catch (error) {
    console.error(`Error fetching ML decision factors for suburb ${suburbName}:`, error);
    throw error;
  }
};

/**
 * Get ML system status
 * 
 * API: GET /api/ml/system/status
 * Returns the status of the ML and LLM systems
 */
export const getMLSystemStatus = async (): Promise<MLSystemStatus> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/ml/system/status`);
    // if (!response.ok) throw new Error('Failed to fetch ML system status');
    // return await response.json();
    
    // Return empty mock data for now
    return {
      last_update: new Date().toISOString(),
      next_update: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      data_points: {
        total: 0,
        last_24h: 0,
        new_properties: 0
      },
      ml_model_metrics: {
        accuracy: 0,
        confidence: 0,
        validation_score: 0
      },
      llm_performance_metrics: {
        rationale_coherence: 0,
        business_model_alignment: 0,
        explanation_quality: 0
      },
      system_health: {
        status: 'operational',
        uptime: 0,
        latency: 0
      },
      integration_statuses: {}
    };
  } catch (error) {
    console.error('Error fetching ML system status:', error);
    throw error;
  }
};
