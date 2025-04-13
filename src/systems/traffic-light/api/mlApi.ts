/**
 * Traffic Light System - ML API Services
 *
 * This file contains API service functions for ML-related endpoints.
 * Currently using mock data, but designed to be easily replaced with real API calls.
 */

import { MLDecisionFactors, MLSystemStatus, MLModelInfo } from './types';

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

    // Return mock data for now
    return {
      last_update: new Date().toISOString(),
      next_update: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Weekly updates
      data_points: {
        total: 250000,
        last_24h: 2500,
        new_properties: 120
      },
      ml_model_metrics: {
        accuracy: 0.857, // 85.7%
        confidence: 0.835, // 83.5%
        validation_score: 0.82
      },
      llm_performance_metrics: {
        rationale_coherence: 0.84,
        business_model_alignment: 0.86,
        explanation_quality: 0.82
      },
      system_health: {
        status: 'operational',
        uptime: 99.5,
        latency: 180 // ms
      },
      integration_statuses: {
        rba: 'connected',
        absCensus: 'connected',
        absPriceIndex: 'connected',
        nswGovInfra: 'connected',
        nswLandRegistry: 'connected'
      }
    };
  } catch (error) {
    console.error('Error fetching ML system status:', error);
    throw error;
  }
};

/**
 * Get ML model information
 *
 * API: GET /api/ml/model-info
 * Returns information about the current ML model
 */
export const getMLModelInfo = async (): Promise<MLModelInfo> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/ml/model-info`);
    // if (!response.ok) throw new Error('Failed to fetch ML model info');
    // return await response.json();

    // Return mock data for now
    return {
      version: '1.0',
      release_date: new Date('2025-04-10').toISOString(),
      next_update: new Date('2025-04-17').toISOString(), // Weekly updates
      features: [
        'Suburb risk classification algorithm',
        'Property value forecasting',
        'Market cycle position detection',
        'Infrastructure impact assessment',
        'Comparable suburb identification'
      ],
      data_sources: [
        'RBA Housing Market Data',
        'ABS Census Demographics',
        'ABS Property Price Index',
        'NSW Government Infrastructure Plans',
        'NSW Land Registry Services'
      ],
      metrics: {
        accuracy: 0.857, // 85.7%
        confidence: 0.835, // 83.5%
        data_points: 250000,
        validation_score: 0.82
      },
      training_info: {
        last_training: new Date('2025-04-03').toISOString(),
        training_duration: 48, // hours
        iterations: 1250,
        convergence_rate: 0.92
      }
    };
  } catch (error) {
    console.error('Error fetching ML model info:', error);
    throw error;
  }
};
