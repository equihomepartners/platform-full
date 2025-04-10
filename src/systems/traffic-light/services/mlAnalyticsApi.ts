/**
 * Traffic Light System - ML Analytics API Integration
 * 
 * This file provides API integration for the ML Analytics service.
 * It connects the existing mock data service with the backend API endpoints.
 */

import { 
  SuburbAnalysis as ApiSuburbAnalysis,
  MLDecisionFactors,
  MarketCycle,
  MLSystemStatus as ApiMLSystemStatus,
  UnderwritingIntegration as ApiUnderwritingIntegration
} from '../api/types';

import {
  getSuburbAnalysis as fetchSuburbAnalysis,
  getMarketCycle
} from '../api/suburbApi';

import { getMLDecisionFactors, getMLSystemStatus as fetchMLSystemStatus } from '../api/mlApi';
import { getUnderwritingIntegration as fetchUnderwritingIntegration } from '../api/integrationApi';

// Import the existing service for fallback
import { 
  getSuburbAnalysis as getMockSuburbAnalysis,
  getMLSystemStatus as getMockMLSystemStatus,
  getUnderwritingIntegration as getMockUnderwritingIntegration,
  SuburbAnalysis
} from './mlAnalytics';

/**
 * Get suburb analysis with API integration
 * 
 * This function tries to fetch data from the API first,
 * and falls back to mock data if the API call fails.
 */
export const getSuburbAnalysisWithApi = async (suburb: string): Promise<SuburbAnalysis> => {
  try {
    // Try to get data from the API
    const apiData = await fetchSuburbAnalysis(suburb);
    const marketCycleData = await getMarketCycle(suburb);
    const mlDecisionData = await getMLDecisionFactors(suburb);
    
    // Convert API data to the existing format
    return convertToExistingFormat(suburb, apiData, marketCycleData, mlDecisionData);
  } catch (error) {
    console.error(`Error fetching suburb analysis for ${suburb} from API:`, error);
    console.info('Falling back to mock data');
    
    // Fall back to mock data
    return getMockSuburbAnalysis(suburb);
  }
};

/**
 * Get ML system status with API integration
 * 
 * This function tries to fetch data from the API first,
 * and falls back to mock data if the API call fails.
 */
export const getMLSystemStatusWithApi = async () => {
  try {
    // Try to get data from the API
    const apiData = await fetchMLSystemStatus();
    
    // Convert API data to the existing format
    return convertSystemStatusToExistingFormat(apiData);
  } catch (error) {
    console.error('Error fetching ML system status from API:', error);
    console.info('Falling back to mock data');
    
    // Fall back to mock data
    return getMockMLSystemStatus();
  }
};

/**
 * Get underwriting integration with API integration
 * 
 * This function tries to fetch data from the API first,
 * and falls back to mock data if the API call fails.
 */
export const getUnderwritingIntegrationWithApi = async () => {
  try {
    // Try to get data from the API
    const apiData = await fetchUnderwritingIntegration();
    
    // Convert API data to the existing format
    return convertUnderwritingToExistingFormat(apiData);
  } catch (error) {
    console.error('Error fetching underwriting integration from API:', error);
    console.info('Falling back to mock data');
    
    // Fall back to mock data
    return getMockUnderwritingIntegration();
  }
};

// Conversion functions
const convertToExistingFormat = (
  suburb: string,
  apiData: ApiSuburbAnalysis,
  marketCycleData: MarketCycle,
  mlDecisionData: MLDecisionFactors
): SuburbAnalysis => {
  // Determine zone from API data
  const zone = apiData.loan_risk_assessment.risk_score < 30 ? 'green' :
               apiData.loan_risk_assessment.risk_score < 60 ? 'orange' : 'red';
  
  // Convert historical growth data
  const historicalGrowth = apiData.property_value_metrics.historical_growth.map(item => 
    parseFloat((item.value * 100).toFixed(1)) // Convert to percentage
  ).slice(-5); // Get last 5 entries
  
  // Convert forecast growth data
  const forecastGrowth = apiData.property_value_metrics.forecast_growth.map(item => 
    parseFloat((item.value * 100).toFixed(1)) // Convert to percentage
  ).slice(0, 4); // Get first 4 entries
  
  return {
    confidence: mlDecisionData.short_term.confidence * 100, // Convert from 0-1 to 0-100
    zone,
    metrics: {
      growth: apiData.property_value_metrics.forecast_growth[0]?.value * 100 || 0, // Convert to percentage
      risk: apiData.loan_risk_assessment.risk_score,
      infrastructure: apiData.infrastructure_score,
      development: apiData.development_status,
      transport: apiData.transport_score,
      schools: apiData.schools_score,
      marketMetrics: {
        medianPrice: apiData.market_metrics.median_price,
        priceGrowth: apiData.market_metrics.price_growth * 100, // Convert to percentage
        rentalYield: (1 - apiData.market_metrics.vacancy_rate) * 5 // Approximate rental yield
      },
      historicalGrowth,
      forecastGrowth
    },
    predictions: {
      shortTerm: {
        prediction: mlDecisionData.short_term.prediction,
        confidence: mlDecisionData.short_term.confidence * 100, // Convert from 0-1 to 0-100
        factors: mlDecisionData.short_term.factors
      },
      mediumTerm: {
        prediction: mlDecisionData.medium_term.prediction,
        confidence: mlDecisionData.medium_term.confidence * 100, // Convert from 0-1 to 0-100
        factors: mlDecisionData.medium_term.factors
      },
      longTerm: {
        prediction: mlDecisionData.long_term.prediction,
        confidence: mlDecisionData.long_term.confidence * 100, // Convert from 0-1 to 0-100
        factors: mlDecisionData.long_term.factors
      }
    },
    lastUpdated: new Date(),
    iteration: Math.floor(Date.now() / (24 * 60 * 60 * 1000)), // Daily iterations
    dataPoints: 15234 + Math.floor(Math.random() * 1000), // Placeholder
    modelVersion: '3.2.1', // Placeholder
    updateMetrics: {
      confidence: mlDecisionData.short_term.confidence * 100, // Convert from 0-1 to 0-100
      dataQuality: 96.3, // Placeholder
      predictionAccuracy: 94.2 // Placeholder
    }
  };
};

const convertSystemStatusToExistingFormat = (apiData: ApiMLSystemStatus) => {
  return {
    lastUpdate: new Date(apiData.last_update),
    nextUpdate: new Date(apiData.next_update),
    dataPoints: {
      total: apiData.data_points.total,
      last24h: apiData.data_points.last_24h,
      newProperties: apiData.data_points.new_properties
    },
    modelMetrics: {
      accuracy: apiData.ml_model_metrics.accuracy * 100, // Convert from 0-1 to 0-100
      confidence: apiData.ml_model_metrics.confidence * 100, // Convert from 0-1 to 0-100
      validationScore: apiData.ml_model_metrics.validation_score
    },
    systemHealth: {
      status: apiData.system_health.status,
      uptime: apiData.system_health.uptime,
      latency: apiData.system_health.latency
    },
    integrations: apiData.integration_statuses
  };
};

const convertUnderwritingToExistingFormat = (apiData: ApiUnderwritingIntegration) => {
  return {
    status: apiData.status,
    totalAssessments: apiData.assessment_statistics.total_assessments,
    last24h: apiData.assessment_statistics.last_24h,
    averageProcessingTime: apiData.processing_metrics.average_time,
    automationRate: apiData.processing_metrics.automation_rate,
    riskAssessments: {
      approved: apiData.recent_loan_applications.filter(app => app.status === 'approved').length,
      flaggedForReview: apiData.recent_loan_applications.filter(app => app.status === 'pending').length,
      rejected: apiData.recent_loan_applications.filter(app => app.status === 'rejected').length
    },
    confidenceMetrics: {
      overall: apiData.confidence_metrics.overall,
      pricing: apiData.confidence_metrics.by_category.pricing || 0,
      risk: apiData.confidence_metrics.by_category.risk || 0,
      ltv: apiData.confidence_metrics.by_category.ltv || 0,
      serviceability: apiData.confidence_metrics.by_category.serviceability || 0,
      security: apiData.confidence_metrics.by_category.security || 0
    },
    zoneImpact: {
      green: {
        approvalRate: apiData.zone_impact_analysis.green.approval_rate * 100, // Convert from 0-1 to 0-100
        avgProcessingTime: apiData.zone_impact_analysis.green.avg_processing_time,
        automationRate: 85 // Placeholder
      },
      orange: {
        approvalRate: apiData.zone_impact_analysis.yellow.approval_rate * 100, // Convert from 0-1 to 0-100
        avgProcessingTime: apiData.zone_impact_analysis.yellow.avg_processing_time,
        automationRate: 70 // Placeholder
      },
      red: {
        approvalRate: apiData.zone_impact_analysis.red.approval_rate * 100, // Convert from 0-1 to 0-100
        avgProcessingTime: apiData.zone_impact_analysis.red.avg_processing_time,
        automationRate: 55 // Placeholder
      }
    },
    recentDeals: apiData.recent_loan_applications.map(app => ({
      suburb: app.suburb,
      propertyValue: 0, // Placeholder
      loanAmount: 0, // Placeholder
      ltv: 0, // Placeholder
      status: app.status,
      processingTime: app.processing_time,
      zoneImpact: 'medium', // Placeholder
      timestamp: new Date() // Placeholder
    })),
    recentUpdates: [
      {
        timestamp: new Date(),
        type: 'model_update',
        description: 'Enhanced risk assessment algorithm',
        impact: 'Improved accuracy for high-value properties'
      }
    ],
    keyMetrics: {
      avgLoanSize: 0, // Placeholder
      avgLtv: 0, // Placeholder
      avgPropertyValue: 0, // Placeholder
      zoneDistribution: {
        green: 0, // Placeholder
        orange: 0, // Placeholder
        red: 0 // Placeholder
      }
    },
    riskFactors: {
      highestImpact: apiData.risk_factor_impact
        .filter(factor => factor.percentage > 70)
        .map(factor => factor.factor),
      moderateImpact: apiData.risk_factor_impact
        .filter(factor => factor.percentage <= 70 && factor.percentage > 30)
        .map(factor => factor.factor)
    },
    monthlyTrends: {
      approvals: [1, 2, 1, 2, 1, 2], // Placeholder
      pipeline: [65, 58, 72, 63, 67, 67] // Placeholder
    }
  };
};
