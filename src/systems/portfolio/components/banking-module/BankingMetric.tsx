import React from 'react';
import './theme.css';

interface BankingMetricProps {
  label: string;
  value: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const BankingMetric: React.FC<BankingMetricProps> = ({ 
  label, 
  value, 
  trend, 
  trendValue,
  className = '' 
}) => {
  return (
    <div className={`banking-metric ${className}`}>
      <div className="banking-metric-label">{label}</div>
      <div className="banking-metric-value">{value}</div>
      
      {trend && trendValue && (
        <div className={`banking-text-xs banking-mt-1 ${
          trend === 'up' ? 'banking-text-success' : 
          trend === 'down' ? 'banking-text-error' : 
          'banking-text-secondary'
        }`}>
          {trend === 'up' && '↑ '}
          {trend === 'down' && '↓ '}
          {trendValue}
        </div>
      )}
    </div>
  );
};

export default BankingMetric;
