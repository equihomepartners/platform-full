/**
 * Traffic Light System - Integration API Services
 * 
 * This file contains API service functions for integration-related endpoints.
 * Currently using mock data, but designed to be easily replaced with real API calls.
 */

import { UnderwritingIntegration, PortfolioSimulationIntegration } from './types';

// Base API URL - Replace with environment variable in production
const API_BASE_URL = '/api';

/**
 * Get underwriting integration status and metrics
 * 
 * API: GET /api/integration/underwriting
 * Returns the status and metrics for the underwriting integration
 */
export const getUnderwritingIntegration = async (): Promise<UnderwritingIntegration> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/integration/underwriting`);
    // if (!response.ok) throw new Error('Failed to fetch underwriting integration');
    // return await response.json();
    
    // Return empty mock data for now
    return {
      status: 'active',
      assessment_statistics: {
        suburbs_analyzed: 0,
        loans_evaluated: 0,
        total_assessments: 0,
        last_24h: 0
      },
      processing_metrics: {
        average_time: 0,
        automation_rate: 0
      },
      confidence_metrics: {
        overall: 0,
        by_category: {}
      },
      zone_impact_analysis: {
        green: {
          default_rate: 0,
          approval_rate: 0,
          avg_processing_time: 0
        },
        yellow: {
          default_rate: 0,
          approval_rate: 0,
          avg_processing_time: 0
        },
        red: {
          default_rate: 0,
          approval_rate: 0,
          avg_processing_time: 0
        }
      },
      recent_loan_applications: [],
      risk_factor_impact: []
    };
  } catch (error) {
    console.error('Error fetching underwriting integration:', error);
    throw error;
  }
};

/**
 * Get portfolio simulation integration data
 * 
 * API: GET /api/integration/portfolio
 * Returns the data for the portfolio simulation integration
 */
export const getPortfolioSimulationIntegration = async (): Promise<PortfolioSimulationIntegration> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/integration/portfolio`);
    // if (!response.ok) throw new Error('Failed to fetch portfolio simulation integration');
    // return await response.json();
    
    // Return empty mock data for now
    return {
      suburb_level_risk_correlations: [],
      forecast_confidence_intervals: [],
      loan_specific_metrics: [],
      historical_loan_performance: [],
      simulation_data: {
        time_series: [],
        monte_carlo_parameters: {
          iterations: 0,
          confidence_level: 0,
          risk_factors: []
        }
      }
    };
  } catch (error) {
    console.error('Error fetching portfolio simulation integration:', error);
    throw error;
  }
};
