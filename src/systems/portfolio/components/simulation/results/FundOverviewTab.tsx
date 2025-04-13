import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FundOverviewTabProps {
  results: any;
  parameters: any;
}

/**
 * Fund Overview Tab
 *
 * Displays key metrics and overview of the fund performance.
 */
const FundOverviewTab: React.FC<FundOverviewTabProps> = ({ results, parameters }) => {
  const [keyMetrics, setKeyMetrics] = useState<any>({});
  const [chartData, setChartData] = useState<any>({});
  const [isDataReady, setIsDataReady] = useState(false);

  // Process results when they change
  useEffect(() => {
    if (!results) {
      setIsDataReady(false);
      return;
    }

    console.log('Processing results for Fund Overview Tab:', results);

    try {
      // Extract key metrics from results
      const metrics = extractKeyMetrics(results, parameters);
      setKeyMetrics(metrics);

      // Prepare chart data
      const charts = prepareChartData(results, parameters);
      setChartData(charts);

      setIsDataReady(true);
    } catch (error) {
      console.error('Error processing results for Fund Overview Tab:', error);
      setIsDataReady(false);
    }
  }, [results, parameters]);

  // Extract key metrics from results
  const extractKeyMetrics = (results: any, parameters: any) => {
    // Get parameters with defaults for display
    const fundSize = parameters.fund_size || 100000000;
    const fundTerm = parameters.fund_term || 10;
    const managementFeeRate = parameters.management_fee_rate || 0.02;
    const hurdleRate = parameters.hurdle_rate || 0.06;
    const performanceFeeRate = parameters.performance_fee_rate || 0.20;
    const originationFeeRate = parameters.origination_fee_rate || 0.03;
    const simpleInterestRate = parameters.simple_interest_rate || 0.05;
    const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
    const capitalRecyclingEnabled = parameters.capital_recycling_enabled || false;

    // Extract metrics from results
    const irr = results.irr || 0;
    const roi = results.roi || 0;
    const equityMultiple = results.equityMultiple || 0;
    const totalProfit = fundSize * roi;
    
    // Calculate GP and LP investments
    const gpInvestment = fundSize * gpInvestmentPercentage;
    const lpInvestment = fundSize * (1 - gpInvestmentPercentage);
    
    // Calculate preferred return
    const preferredReturn = lpInvestment * hurdleRate * fundTerm;
    
    // Calculate performance fees
    let performanceFees = 0;
    if (totalProfit > preferredReturn) {
      performanceFees = (totalProfit - preferredReturn) * performanceFeeRate;
    }
    
    // Calculate management fees
    const managementFees = fundSize * managementFeeRate * fundTerm;
    
    // Calculate origination fees
    const totalLoanAmount = results.portfolio?.metrics?.total_loan_amount || fundSize;
    const originationFees = totalLoanAmount * originationFeeRate;
    
    // Calculate GP and LP returns
    const gpReturn = (gpInvestment / fundSize) * totalProfit + performanceFees;
    const lpReturn = totalProfit - gpReturn;
    
    // Calculate GP and LP ROI
    const gpROI = gpReturn / gpInvestment;
    const lpROI = lpReturn / lpInvestment;
    
    // Calculate GP and LP IRR (approximation)
    const gpIRR = irr * (1 + (performanceFees / gpInvestment) / fundTerm);
    const lpIRR = irr * (1 - (performanceFees / lpInvestment) / fundTerm);

    // Portfolio metrics
    const portfolioMetrics = results.portfolio?.metrics || {};
    const totalLoans = portfolioMetrics.total_loans || 0;
    const initialLoans = portfolioMetrics.initial_loans || totalLoans;
    const recycledLoans = portfolioMetrics.recycled_loans || 0;
    const averageLoanSize = portfolioMetrics.average_loan_size || 0;
    const averageLTV = portfolioMetrics.average_ltv || 0;
    const averagePropertyValue = portfolioMetrics.average_property_value || 0;
    const averageAppreciationRate = portfolioMetrics.average_appreciation_rate || 0;
    const averageExitYear = portfolioMetrics.average_exit_year || 0;

    return {
      // Fund metrics
      fundSize,
      fundTerm,
      irr,
      roi,
      equityMultiple,
      totalProfit,
      
      // GP/LP metrics
      gpInvestment,
      lpInvestment,
      gpInvestmentPercentage,
      preferredReturn,
      performanceFees,
      managementFees,
      originationFees,
      gpReturn,
      lpReturn,
      gpROI,
      lpROI,
      gpIRR,
      lpIRR,
      
      // Portfolio metrics
      totalLoans,
      initialLoans,
      recycledLoans,
      averageLoanSize,
      averageLTV,
      averagePropertyValue,
      averageAppreciationRate,
      averageExitYear,
      capitalRecyclingEnabled
    };
  };

  // Prepare chart data
  const prepareChartData = (results: any, parameters: any) => {
    const fundTerm = parameters.fund_term || 10;
    
    // Prepare NAV chart data
    const navChartData = prepareNAVChartData(results, fundTerm);
    
    // Prepare IRR chart data
    const irrChartData = prepareIRRChartData(results, fundTerm);
    
    // Prepare capital structure chart data
    const capitalStructureData = prepareCapitalStructureData(parameters);
    
    // Prepare fee structure chart data
    const feeStructureData = prepareFeeStructureData(results, parameters);
    
    return {
      navChartData,
      irrChartData,
      capitalStructureData,
      feeStructureData
    };
  };

  // Prepare NAV chart data
  const prepareNAVChartData = (results: any, fundTerm: number) => {
    // Extract cashflows from results
    const cashflows = results.cashflows || [];
    const detailedCashflows = results.detailedCashflows || {};
    
    // Calculate NAV for each year
    const navData = [];
    let cumulativeNav = 0;
    
    // If we have detailed cashflows, use them
    if (Object.keys(detailedCashflows).length > 0) {
      for (let year = 0; year <= fundTerm; year++) {
        const yearData = detailedCashflows[year] || { inflows: 0, outflows: 0 };
        const netCashflow = yearData.inflows - yearData.outflows;
        cumulativeNav += netCashflow;
        navData.push(cumulativeNav);
      }
    } 
    // Otherwise, use the simple cashflows array
    else if (cashflows.length > 0) {
      for (let i = 0; i < cashflows.length; i++) {
        cumulativeNav += cashflows[i];
        navData.push(cumulativeNav);
      }
    } 
    // If no cashflow data, create empty chart
    else {
      for (let year = 0; year <= fundTerm; year++) {
        navData.push(0);
      }
    }
    
    return {
      labels: Array.from({ length: navData.length }, (_, i) => `Year ${i}`),
      datasets: [
        {
          label: 'Fund NAV',
          data: navData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  // Prepare IRR chart data
  const prepareIRRChartData = (results: any, fundTerm: number) => {
    // Extract cashflows from results
    const cashflows = results.cashflows || [];
    const detailedCashflows = results.detailedCashflows || {};
    
    // Calculate cumulative IRR for each year
    const irrData = [];
    const cumulativeCashflows = [];
    
    // If we have detailed cashflows, use them
    if (Object.keys(detailedCashflows).length > 0) {
      for (let year = 0; year <= fundTerm; year++) {
        const yearData = detailedCashflows[year] || { inflows: 0, outflows: 0 };
        const netCashflow = yearData.inflows - yearData.outflows;
        cumulativeCashflows.push(netCashflow);
        
        // Calculate IRR for years 1+
        if (year >= 1) {
          const yearlyIrr = calculateIRR(cumulativeCashflows);
          irrData.push(yearlyIrr);
        } else {
          irrData.push(0); // Year 0 IRR is always 0
        }
      }
    } 
    // Otherwise, use the simple cashflows array
    else if (cashflows.length > 0) {
      for (let i = 0; i < cashflows.length; i++) {
        cumulativeCashflows.push(cashflows[i]);
        
        // Calculate IRR for years 1+
        if (i >= 1) {
          const yearlyIrr = calculateIRR(cumulativeCashflows);
          irrData.push(yearlyIrr);
        } else {
          irrData.push(0); // Year 0 IRR is always 0
        }
      }
    } 
    // If no cashflow data, create empty chart
    else {
      for (let year = 0; year <= fundTerm; year++) {
        irrData.push(0);
      }
    }
    
    return {
      labels: Array.from({ length: irrData.length }, (_, i) => `Year ${i}`),
      datasets: [
        {
          label: 'Fund IRR',
          data: irrData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.4
        }
      ]
    };
  };

  // Prepare capital structure chart data
  const prepareCapitalStructureData = (parameters: any) => {
    const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
    const lpInvestmentPercentage = 1 - gpInvestmentPercentage;
    
    return {
      labels: ['GP Investment', 'LP Investment'],
      datasets: [
        {
          data: [gpInvestmentPercentage, lpInvestmentPercentage],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Prepare fee structure chart data
  const prepareFeeStructureData = (results: any, parameters: any) => {
    const managementFeeRate = parameters.management_fee_rate || 0.02;
    const performanceFeeRate = parameters.performance_fee_rate || 0.20;
    const originationFeeRate = parameters.origination_fee_rate || 0.03;
    
    // Calculate fee amounts
    const fundSize = parameters.fund_size || 100000000;
    const fundTerm = parameters.fund_term || 10;
    const totalProfit = results.roi ? fundSize * results.roi : 0;
    const hurdleRate = parameters.hurdle_rate || 0.06;
    const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
    const lpInvestment = fundSize * (1 - gpInvestmentPercentage);
    const preferredReturn = lpInvestment * hurdleRate * fundTerm;
    
    let performanceFees = 0;
    if (totalProfit > preferredReturn) {
      performanceFees = (totalProfit - preferredReturn) * performanceFeeRate;
    }
    
    const managementFees = fundSize * managementFeeRate * fundTerm;
    const totalLoanAmount = results.portfolio?.metrics?.total_loan_amount || fundSize;
    const originationFees = totalLoanAmount * originationFeeRate;
    
    const totalFees = managementFees + performanceFees + originationFees;
    
    return {
      labels: ['Management Fees', 'Performance Fees', 'Origination Fees'],
      datasets: [
        {
          data: [
            managementFees / totalFees,
            performanceFees / totalFees,
            originationFees / totalFees
          ],
          backgroundColor: [
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Helper function to calculate IRR
  const calculateIRR = (cashflows: number[], guess = 0.1, maxIterations = 100) => {
    // Check if we have both positive and negative cashflows
    let hasPositive = false;
    let hasNegative = false;
    
    for (const cf of cashflows) {
      if (cf > 0) hasPositive = true;
      if (cf < 0) hasNegative = true;
      if (hasPositive && hasNegative) break;
    }
    
    // If we don't have both positive and negative cashflows, IRR is undefined
    if (!hasPositive || !hasNegative) {
      return 0;
    }
    
    // Constants for the calculation
    const EPSILON = 1e-10; // Precision threshold
    const MIN_RATE = -0.999; // Minimum rate (-99.9%)
    const MAX_RATE = 1; // Maximum rate (100%)
    
    // Initial guess
    let rate = guess;
    
    // Newton-Raphson iteration
    for (let i = 0; i < maxIterations; i++) {
      // Calculate NPV and its derivative at current rate
      let npv = 0;
      let derivativeNpv = 0;
      
      for (let j = 0; j < cashflows.length; j++) {
        const factor = Math.pow(1 + rate, j);
        npv += cashflows[j] / factor;
        derivativeNpv += -j * cashflows[j] / (factor * (1 + rate));
      }
      
      // If NPV is close enough to zero, we've found the IRR
      if (Math.abs(npv) < EPSILON) {
        return rate;
      }
      
      // Avoid division by zero
      if (Math.abs(derivativeNpv) < EPSILON) {
        break;
      }
      
      // Update rate using Newton-Raphson formula
      const newRate = rate - npv / derivativeNpv;
      
      // Check if the new rate is within bounds
      if (newRate < MIN_RATE || newRate > MAX_RATE) {
        // Use a dampened update to stay within bounds
        rate = rate - 0.5 * (npv / derivativeNpv);
        rate = Math.max(MIN_RATE, Math.min(MAX_RATE, rate));
      } else {
        rate = newRate;
      }
    }
    
    return rate;
  };

  // If data is not ready, show loading state
  if (!isDataReady) {
    return (
      <div style={{ padding: '1rem' }}>
        <p>No simulation results available. Run a simulation to see results.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* Key Metrics Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0a2463' }}>
          Key Fund Metrics
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          <MetricCard 
            title="Fund Size" 
            value={formatCurrency(keyMetrics.fundSize)} 
            icon="💰" 
          />
          <MetricCard 
            title="Fund Term" 
            value={`${keyMetrics.fundTerm} years`} 
            icon="⏱️" 
          />
          <MetricCard 
            title="IRR" 
            value={formatPercentage(keyMetrics.irr)} 
            icon="📈" 
          />
          <MetricCard 
            title="ROI" 
            value={formatPercentage(keyMetrics.roi)} 
            icon="💹" 
          />
          <MetricCard 
            title="Equity Multiple" 
            value={keyMetrics.equityMultiple.toFixed(2) + 'x'} 
            icon="🔄" 
          />
          <MetricCard 
            title="Total Profit" 
            value={formatCurrency(keyMetrics.totalProfit)} 
            icon="💵" 
          />
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          {/* IRR Chart */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0a2463' }}>
              IRR Over Time
            </h3>
            <div style={{ 
              height: '300px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              border: '1px solid #e2e8f0'
            }}>
              <Line
                data={chartData.irrChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => formatPercentage(value as number)
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => `IRR: ${formatPercentage(context.parsed.y)}`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* NAV Chart */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0a2463' }}>
              Fund NAV Over Time
            </h3>
            <div style={{ 
              height: '300px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              border: '1px solid #e2e8f0'
            }}>
              <Line
                data={chartData.navChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => formatCurrency(value as number)
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => `NAV: ${formatCurrency(context.parsed.y)}`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Capital Structure Chart */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0a2463' }}>
              Capital Structure
            </h3>
            <div style={{ 
              height: '300px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ width: '70%', height: '100%' }}>
                <Doughnut
                  data={chartData.capitalStructureData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.label}: ${formatPercentage(context.parsed)}`
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Fee Structure Chart */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0a2463' }}>
              Fee Structure
            </h3>
            <div style={{ 
              height: '300px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ width: '70%', height: '100%' }}>
                <Doughnut
                  data={chartData.feeStructureData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.label}: ${formatPercentage(context.parsed)}`
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GP/LP Returns Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0a2463' }}>
          GP/LP Returns
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          <MetricCard 
            title="GP Investment" 
            value={formatCurrency(keyMetrics.gpInvestment)} 
            icon="💼" 
          />
          <MetricCard 
            title="LP Investment" 
            value={formatCurrency(keyMetrics.lpInvestment)} 
            icon="🏦" 
          />
          <MetricCard 
            title="GP Return" 
            value={formatCurrency(keyMetrics.gpReturn)} 
            icon="💰" 
          />
          <MetricCard 
            title="LP Return" 
            value={formatCurrency(keyMetrics.lpReturn)} 
            icon="💰" 
          />
          <MetricCard 
            title="GP ROI" 
            value={formatPercentage(keyMetrics.gpROI)} 
            icon="📈" 
          />
          <MetricCard 
            title="LP ROI" 
            value={formatPercentage(keyMetrics.lpROI)} 
            icon="📈" 
          />
          <MetricCard 
            title="GP IRR" 
            value={formatPercentage(keyMetrics.gpIRR)} 
            icon="📊" 
          />
          <MetricCard 
            title="LP IRR" 
            value={formatPercentage(keyMetrics.lpIRR)} 
            icon="📊" 
          />
        </div>
      </div>

      {/* Portfolio Overview Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0a2463' }}>
          Portfolio Overview
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          <MetricCard 
            title="Total Loans" 
            value={keyMetrics.totalLoans.toString()} 
            icon="🏠" 
          />
          <MetricCard 
            title="Initial Loans" 
            value={keyMetrics.initialLoans.toString()} 
            icon="🏠" 
          />
          {keyMetrics.capitalRecyclingEnabled && (
            <MetricCard 
              title="Recycled Loans" 
              value={keyMetrics.recycledLoans.toString()} 
              icon="♻️" 
            />
          )}
          <MetricCard 
            title="Average Loan Size" 
            value={formatCurrency(keyMetrics.averageLoanSize)} 
            icon="💵" 
          />
          <MetricCard 
            title="Average LTV" 
            value={formatPercentage(keyMetrics.averageLTV)} 
            icon="📊" 
          />
          <MetricCard 
            title="Average Property Value" 
            value={formatCurrency(keyMetrics.averagePropertyValue)} 
            icon="🏘️" 
          />
          <MetricCard 
            title="Average Appreciation Rate" 
            value={formatPercentage(keyMetrics.averageAppreciationRate)} 
            icon="📈" 
          />
          <MetricCard 
            title="Average Exit Year" 
            value={keyMetrics.averageExitYear.toFixed(1)} 
            icon="🚪" 
          />
        </div>
      </div>

      {/* Fee Structure Section */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0a2463' }}>
          Fee Structure
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          <MetricCard 
            title="Management Fees" 
            value={formatCurrency(keyMetrics.managementFees)} 
            icon="💼" 
          />
          <MetricCard 
            title="Performance Fees" 
            value={formatCurrency(keyMetrics.performanceFees)} 
            icon="🏆" 
          />
          <MetricCard 
            title="Origination Fees" 
            value={formatCurrency(keyMetrics.originationFees)} 
            icon="📝" 
          />
          <MetricCard 
            title="Total Fees" 
            value={formatCurrency(keyMetrics.managementFees + keyMetrics.performanceFees + keyMetrics.originationFees)} 
            icon="💰" 
          />
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      borderRadius: '0.5rem', 
      padding: '1rem',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ marginRight: '0.5rem', fontSize: '1.25rem' }}>{icon}</span>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#64748b', margin: 0 }}>{title}</h4>
      </div>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{value}</p>
    </div>
  );
};

export default FundOverviewTab;
