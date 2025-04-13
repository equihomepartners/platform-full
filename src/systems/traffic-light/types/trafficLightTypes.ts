/**
 * Traffic Light System Types
 * 
 * This file contains all the TypeScript interfaces for the Traffic Light System.
 */

/**
 * Suburb Classification
 * 
 * Classification of a suburb into green, yellow, or red zone
 */
export interface SuburbClassification {
  suburb: string;
  zone: 'green' | 'yellow' | 'red';
  score: number;
  confidence: number;
  key_factors: string[];
  historical_changes?: {
    date: string;
    previous_zone: 'green' | 'yellow' | 'red';
    new_zone: 'green' | 'yellow' | 'red';
  }[];
  loan_metrics?: {
    average_ltv: number;
    foreclosure_rate: number;
  };
}

/**
 * Suburb Analysis
 * 
 * Detailed analysis for a specific suburb
 */
export interface SuburbAnalysis {
  suburb: string;
  property_value_metrics: {
    historical_growth: {
      date: string;
      value: number;
    }[];
    forecast_growth: {
      date: string;
      value: number;
      confidence: number;
    }[];
    stability: number;
  };
  loan_risk_assessment: {
    average_ltv: number;
    foreclosure_rate: number;
    homeowner_default_trends?: {
      date: string;
      rate: number;
    }[];
    risk_score: number;
  };
  infrastructure_score?: number;
  development_status?: string;
  transport_score?: number;
  schools_score?: number;
  market_metrics: {
    median_price: number;
    price_growth: number;
    vacancy_rate: number;
  };
  historical_property_value?: {
    date: string;
    value: number;
  }[];
  forecast_property_value?: {
    date: string;
    value: number;
    confidence: number;
  }[];
  loan_performance_metrics?: {
    default_rates: number;
    repayment_trends: {
      date: string;
      rate: number;
    }[];
  };
}

/**
 * Comparable Suburbs
 * 
 * List of suburbs that are comparable to a specified suburb
 */
export interface ComparableSuburbs {
  suburb: string;
  comparable_suburbs: {
    suburb: string;
    similarity_score: number;
    similarity_factors: string[];
  }[];
}

/**
 * Market Cycle Position
 * 
 * Market cycle position for a specific suburb
 */
export interface MarketCyclePosition {
  suburb: string;
  cycle_position: string;
  cycle_metrics: {
    price_momentum: number;
    demand_supply_ratio: number;
    days_on_market: number;
  };
  historical_positions: {
    date: string;
    position: string;
  }[];
  forecast_positions: {
    date: string;
    position: string;
    confidence: number;
  }[];
}

/**
 * Growth Corridor
 * 
 * Information about a growth corridor
 */
export interface GrowthCorridor {
  name: string;
  suburbs: string[];
  growth_metrics: {
    average_growth: number;
    growth_momentum: number;
    infrastructure_score: number;
  };
}

/**
 * ML Decisions
 * 
 * ML decisions for a specific suburb
 */
export interface MLDecisions {
  suburb: string;
  decisions: {
    zone_classification: {
      zone: 'green' | 'yellow' | 'red';
      confidence: number;
      factors: {
        name: string;
        impact: number;
        direction: 'positive' | 'negative';
      }[];
    };
    investment_recommendation: {
      recommendation: string;
      confidence: number;
      rationale: string;
    };
  };
}

/**
 * ML System Status
 * 
 * Current status of the ML system
 */
export interface MLSystemStatus {
  last_update: string;
  next_update: string;
  data_points: {
    total: number;
    last_24h: number;
    new_properties: number;
  };
  ml_model_metrics: {
    accuracy: number;
    confidence: number;
    validation_score: number;
  };
  llm_performance_metrics?: {
    rationale_coherence: number;
    business_model_alignment: number;
    explanation_quality: number;
  };
  system_health: {
    status: string;
    uptime: number;
    latency: number;
  };
  integration_statuses?: {
    [key: string]: string;
  };
}

/**
 * ML Model Information
 * 
 * Information about the current ML model
 */
export interface MLModelInfo {
  version: string;
  release_date: string;
  next_update: string;
  features: string[];
  data_sources: string[];
  metrics: {
    accuracy: number;
    confidence: number;
    data_points: number;
    validation_score: number;
  };
  training_info?: {
    last_training: string;
    training_duration: number;
    iterations: number;
    convergence_rate: number;
  };
}

/**
 * Risk Correlation Matrix
 * 
 * Correlation matrix of risk factors across suburbs
 */
export interface RiskCorrelationMatrix {
  factors: string[];
  matrix: number[][];
  risk_factors?: {
    name: string;
    description: string;
    impact_score: number;
    correlation_summary: {
      highest_correlation: {
        factor: string;
        value: number;
      };
      lowest_correlation: {
        factor: string;
        value: number;
      };
    };
  }[];
  suburb_correlations?: {
    suburb_pair: string[];
    correlation: number;
    factors: string[];
  }[];
}

/**
 * Portfolio Integration
 * 
 * Integration data specifically for the Portfolio Management System
 */
export interface PortfolioIntegration {
  suburb_level_risk_correlations: {
    suburb_pair: string[];
    risk_correlation: number;
    diversification_benefit: number;
  }[];
  forecast_confidence_intervals: {
    suburb: string;
    forecast_period: string;
    lower_bound: number;
    expected_growth: number;
    upper_bound: number;
    confidence_level: number;
  }[];
  loan_specific_metrics?: {
    loan_id: string;
    suburb: string;
    risk_score: number;
    expected_roi: number;
    diversification_impact: number;
  }[];
  historical_loan_performance?: {
    suburb: string;
    period: string;
    default_rate: number;
    roi: number;
    ltv_ratio: number;
  }[];
  simulation_data?: {
    time_series: {
      date: string;
      portfolio_value: number;
      roi: number;
      default_rate: number;
    }[];
    monte_carlo_parameters: {
      iterations: number;
      confidence_level: number;
      risk_factors: {
        name: string;
        distribution: string;
        mean: number;
        std_dev: number;
      }[];
    };
  };
}

/**
 * Portfolio Feedback
 * 
 * Feedback from the Portfolio Management System about suburb performance
 */
export interface PortfolioFeedback {
  suburb: string;
  feedback_type: string;
  metrics: {
    default_rate: number;
    roi: number;
    ltv_ratio: number;
  };
  recommendation: string;
  confidence: number;
}

/**
 * Underwriting Feedback
 * 
 * Feedback from the Underwriting System about loan evaluations
 */
export interface UnderwritingFeedback {
  suburb: string;
  feedback_type: string;
  metrics: {
    approval_rate: number;
    average_processing_time: number;
    risk_factors: {
      name: string;
      impact: number;
    }[];
  };
  recommendation: string;
  confidence: number;
}

/**
 * Error Response
 * 
 * Error response from the API
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details: {
      [key: string]: any;
    };
  };
}
