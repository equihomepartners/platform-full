/**
 * Traffic Light System API Types
 *
 * This file contains TypeScript interfaces for all API responses in the Traffic Light System.
 * These interfaces match the expected response format from the backend API.
 */

// Common types
export type Zone = 'green' | 'yellow' | 'red';

// Suburb Classification API
export interface SuburbClassification {
  suburb: string;
  zone: Zone;
  score: number;
  confidence: number;
  key_factors: string[];
  historical_changes: {
    date: string;
    previous_zone: Zone;
    new_zone: Zone;
  }[];
  loan_metrics: {
    average_ltv: number;
    foreclosure_rate: number;
  };
}

export interface SuburbClassificationResponse {
  suburbs: SuburbClassification[];
  last_updated: string;
  next_update: string;
}

// Suburb Analysis API
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
    stability: number; // 0-100
  };
  loan_risk_assessment: {
    average_ltv: number;
    foreclosure_rate: number;
    homeowner_default_trends: {
      date: string;
      rate: number;
    }[];
    risk_score: number; // 0-100
  };
  infrastructure_score: number; // 0-100
  development_status: 'High' | 'Medium' | 'Low';
  transport_score: number; // 0-100
  schools_score: number; // 0-100
  market_metrics: {
    median_price: number;
    price_growth: number;
    vacancy_rate: number;
  };
  historical_property_value: {
    date: string;
    value: number;
  }[];
  forecast_property_value: {
    date: string;
    value: number;
    confidence: number;
  }[];
  loan_performance_metrics: {
    default_rates: number;
    repayment_trends: {
      date: string;
      rate: number;
    }[];
  };
}

// Risk Correlation API
export interface RiskCorrelationMatrix {
  factors: string[];
  matrix: number[][]; // Correlation values between -1 and 1
  risk_factors: {
    name: string;
    description: string;
    impact_score: number; // 0-100
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
}

// ML and LLM Decision Factors API
export interface MLDecisionFactors {
  suburb: string;
  short_term: {
    prediction: string;
    confidence: number;
    factors: string[];
  };
  medium_term: {
    prediction: string;
    confidence: number;
    factors: string[];
  };
  long_term: {
    prediction: string;
    confidence: number;
    factors: string[];
  };
  llm_rationale: string;
  decision_weights: {
    factor: string;
    weight: number; // Percentage
  }[];
}

// Comparable Suburbs API
export interface ComparableSuburb {
  suburb: string;
  similarity_score: number; // 0-100
  similarities: string[];
  differences: string[];
  comparative_metrics: {
    median_price: number;
    price_growth: number;
    ltv: number;
    foreclosure_rate: number;
    infrastructure_score: number;
  };
  loan_suitability_comparison: string;
}

export interface ComparableSuburbsResponse {
  reference_suburb: string;
  comparable_suburbs: ComparableSuburb[];
}

// Market Cycle API
export interface MarketCycle {
  suburb: string;
  current_position: 'peak' | 'trough' | 'growth' | 'decline' | 'recovery';
  historical_cycle: {
    date: string;
    position: string;
    value: number;
  }[];
  forecast_cycle: {
    date: string;
    position: string;
    value: number;
    confidence: number;
  }[];
  broader_market_comparison: string;
  loan_security_impact: string;
}

// Growth Corridor API
export interface GrowthCorridor {
  name: string;
  geographic_boundaries: {
    type: string;
    coordinates: number[][][];
  };
  transition_probabilities: {
    suburb: string;
    current_zone: Zone;
    probability_green: number;
    probability_yellow: number;
    probability_red: number;
    timeframe: string;
  }[];
  key_suburbs: string[];
  driving_factors: string[];
  risk_factors: string[];
  timeline_expectations: string;
}

export interface GrowthCorridorsResponse {
  corridors: GrowthCorridor[];
  last_updated: string;
}

// ML and LLM System Status API
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
  llm_performance_metrics: {
    rationale_coherence: number;
    business_model_alignment: number;
    explanation_quality: number;
  };
  system_health: {
    status: 'operational' | 'degraded' | 'down';
    uptime: number; // Percentage
    latency: number; // Milliseconds
  };
  integration_statuses: {
    [key: string]: 'connected' | 'disconnected' | 'degraded';
  };
}

// ML Model Info API
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
  training_info: {
    last_training: string;
    training_duration: number; // hours
    iterations: number;
    convergence_rate: number;
  };
}

// Underwriting Integration API
export interface UnderwritingIntegration {
  status: 'active' | 'inactive' | 'maintenance';
  assessment_statistics: {
    suburbs_analyzed: number;
    loans_evaluated: number;
    total_assessments: number;
    last_24h: number;
  };
  processing_metrics: {
    average_time: number; // Minutes
    automation_rate: number; // Percentage
  };
  confidence_metrics: {
    overall: number;
    by_category: {
      [key: string]: number;
    };
  };
  zone_impact_analysis: {
    [key in Zone]: {
      default_rate: number;
      approval_rate: number;
      avg_processing_time: number;
    };
  };
  recent_loan_applications: {
    suburb: string;
    score: number;
    status: 'approved' | 'rejected' | 'pending';
    processing_time: number;
  }[];
  risk_factor_impact: {
    factor: string;
    impact: string;
    percentage: number;
  }[];
}

// Portfolio Simulation Integration API
export interface PortfolioSimulationIntegration {
  suburb_level_risk_correlations: {
    suburb: string;
    correlations: {
      factor1: string;
      factor2: string;
      value: number;
    }[];
  }[];
  forecast_confidence_intervals: {
    suburb: string;
    growth: number;
    confidence_interval: number;
  }[];
  loan_specific_metrics: {
    suburb: string;
    average_ltv: number;
    default_rate: number;
    foreclosure_rate: number;
  }[];
  historical_loan_performance: {
    suburb: string;
    period: string;
    default_rate: number;
    sample_size: number;
  }[];
  simulation_data: {
    time_series: {
      date: string;
      value: number;
    }[];
    monte_carlo_parameters: {
      iterations: number;
      confidence_level: number;
      risk_factors: string[];
    };
  };
}
