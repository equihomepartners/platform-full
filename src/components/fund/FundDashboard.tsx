import React from 'react';
import FundMetrics from './FundMetrics';
import PortfolioDistribution from './PortfolioDistribution';
import GeographicDistribution from './GeographicDistribution';
import CashflowAnalysis from './CashflowAnalysis';
import IncomeAnalysis from './IncomeAnalysis';
import LTVAnalysis from './LTVAnalysis';

const FundDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fund Report
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive overview of the fund's performance and portfolio metrics
        </p>
      </div>

      <FundMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioDistribution />
        <GeographicDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeAnalysis />
        <CashflowAnalysis />
      </div>

      <LTVAnalysis />
    </div>
  );
};

export default FundDashboard;