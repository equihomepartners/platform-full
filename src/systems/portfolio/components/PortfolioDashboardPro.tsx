import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  TrendingUp,
  DollarSign,
  Percent,
  Shield,
  PieChart,
  Map,
  Calendar,
  FileText,
  Users,
  Activity,
  ChevronDown,
  Download,
  Filter,
  Sliders,
  Info,
  Loader
} from 'react-feather';
import { portfolioApiClient } from '../services/portfolioApiClient';
import { PortfolioSummary, PerformanceMetrics, RiskMetrics, AllocationData, CashFlowProjection } from '../types/portfolioTypes';

// Custom components
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border border-neutral-200 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-5 pb-2 border-b border-neutral-100">
    <div>
      <h3 className="text-lg font-semibold text-primary-800">{title}</h3>
      {subtitle && <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

const MetricCard = ({ title, value, change, icon, trend = 'up', className = '' }: { title: string, value: string, change?: string, icon: React.ComponentType<any>, trend?: 'up' | 'down', className?: string }) => {
  const trendColor = trend === 'up' ? 'text-success' : 'text-error';
  const Icon = icon;

  return (
    <Card className={`p-5 hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-bold mt-1 text-primary-800">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 text-xs font-medium ${trendColor}`}>
              <span>{trend === 'up' ? '↑' : '↓'} {change}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-full border border-primary-100">
          <Icon size={20} className="text-primary-600" />
        </div>
      </div>
    </Card>
  );
};

const ProgressBar = ({ value, max, label, color = 'primary-500' }: { value: number, max: number, label: string, color?: string }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <span className="text-sm font-medium text-neutral-700">{value}/{max}</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-sm h-2">
        <div
          className={`bg-${color} h-2 rounded-sm`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const TabButton = ({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) => (
  <button
    className={`px-4 py-2 text-sm font-medium ${
      active
        ? 'text-primary-700 border-b-2 border-primary-500'
        : 'text-neutral-600 hover:text-primary-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const PortfolioDashboardPro = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('1y');
  const [loading, setLoading] = useState(true);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);
  const [allocationData, setAllocationData] = useState<AllocationData | null>(null);
  const [cashFlowProjections, setCashFlowProjections] = useState<CashFlowProjection[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const summaryData = await portfolioApiClient.getPortfolioSummary();
        const performanceData = await portfolioApiClient.getPerformanceMetrics();
        const riskData = await portfolioApiClient.getRiskMetrics();
        const allocationData = await portfolioApiClient.getAllocationData();
        const cashFlowData = await portfolioApiClient.getCashFlowProjections();

        setPortfolioSummary(summaryData);
        setPerformanceMetrics(performanceData);
        setRiskMetrics(riskData);
        setAllocationData(allocationData);
        setCashFlowProjections(cashFlowData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary-500 h-8 w-8" />
        <span className="ml-2 text-neutral-600">Loading portfolio data...</span>
      </div>
    );
  }

  if (!portfolioSummary || !performanceMetrics || !riskMetrics || !allocationData || !cashFlowProjections) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-neutral-600">No portfolio data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary-900">Portfolio Dashboard</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Last updated: {new Date().toLocaleDateString('en-AU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right mr-4">
            <p className="text-sm font-medium text-neutral-500">Portfolio Value</p>
            <p className="text-xl font-bold text-primary-700">{portfolioSummary ? new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(portfolioSummary.totalValue) : '$0'}</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 flex items-center">
              <Filter size={16} className="mr-1.5" />
              Filter
            </button>
            <button className="px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 flex items-center">
              <Download size={16} className="mr-1.5" />
              Export
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 flex items-center">
              <Sliders size={16} className="mr-1.5" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Time period selector */}
      <div className="flex justify-end space-x-1 bg-neutral-100 p-1 rounded-md w-fit ml-auto">
        {['1m', '3m', '6m', '1y', 'All'].map((period) => (
          <button
            key={period}
            className={`px-3 py-1 text-xs font-medium rounded-sm ${
              timeframe === period
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
            onClick={() => setTimeframe(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio Value"
          value={`$${portfolioSummary.totalValue.toLocaleString()}`}
          change="3.2% from last month"
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Internal Rate of Return"
          value={`${performanceMetrics.irr}%`}
          change="0.5% from last month"
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Risk Score"
          value={riskMetrics.riskScore}
          change="0.2 from last month"
          trend="down"
          icon={Shield}
        />
        <MetricCard
          title="Average LTV"
          value={`${portfolioSummary.averageLtv}%`}
          change="1.1% from last month"
          trend="down"
          icon={Percent}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <div className="flex space-x-4">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </TabButton>
          <TabButton
            active={activeTab === 'performance'}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </TabButton>
          <TabButton
            active={activeTab === 'risk'}
            onClick={() => setActiveTab('risk')}
          >
            Risk Analysis
          </TabButton>
          <TabButton
            active={activeTab === 'allocation'}
            onClick={() => setActiveTab('allocation')}
          >
            Allocation
          </TabButton>
          <TabButton
            active={activeTab === 'cashflow'}
            onClick={() => setActiveTab('cashflow')}
          >
            Cash Flow
          </TabButton>
          <TabButton
            active={activeTab === 'esg'}
            onClick={() => setActiveTab('esg')}
          >
            ESG
          </TabButton>
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Portfolio Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 p-5">
              <SectionTitle
                title="Portfolio Composition"
                subtitle="Breakdown by property type and zone"
                action={
                  <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                    <Info size={14} className="mr-1" />
                    Details
                  </button>
                }
              />
              <div className="h-64 bg-neutral-50 rounded-md flex items-center justify-center">
                <span className="text-neutral-400">Portfolio Composition Chart</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-neutral-500">Properties</p>
                  <p className="text-xl font-semibold text-neutral-800">{portfolioSummary.totalProperties}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-neutral-500">Suburbs</p>
                  <p className="text-xl font-semibold text-neutral-800">{portfolioSummary.totalSuburbs}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-neutral-500">Avg. Property Value</p>
                  <p className="text-xl font-semibold text-neutral-800">${(portfolioSummary.totalValue / portfolioSummary.totalProperties).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionTitle
                title="Zone Allocation"
                subtitle="Current vs. Target allocation"
              />
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-success">Green Zone</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {allocationData.zoneAllocation.green}% / {allocationData.targetZoneAllocation.green}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-sm h-2">
                    <div
                      className="bg-success h-2 rounded-sm"
                      style={{ width: `${allocationData.zoneAllocation.green}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-warning">Yellow Zone</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {allocationData.zoneAllocation.yellow}% / {allocationData.targetZoneAllocation.yellow}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-sm h-2">
                    <div
                      className="bg-warning h-2 rounded-sm"
                      style={{ width: `${allocationData.zoneAllocation.yellow}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-error">Red Zone</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {allocationData.zoneAllocation.red}% / {allocationData.targetZoneAllocation.red}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-sm h-2">
                    <div
                      className="bg-error h-2 rounded-sm"
                      style={{ width: `${allocationData.zoneAllocation.red}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <SectionTitle
                  title="Top Performing Suburbs"
                  subtitle="Based on annual growth"
                />
                <div className="space-y-3 mt-4">
                  {allocationData.topSuburbs.map((suburb, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-${suburb.zone === 'green' ? 'success' : suburb.zone === 'yellow' ? 'warning' : 'error'} mr-2`}></div>
                        <span className="text-sm font-medium text-neutral-700">{suburb.name}</span>
                      </div>
                      <span className="text-sm font-medium text-success">+{suburb.growth}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5">
              <SectionTitle
                title="Performance Metrics"
                subtitle="Key financial indicators"
              />
              <div className="space-y-4 mt-4">
                <ProgressBar
                  label="Internal Rate of Return (IRR)"
                  value={performanceMetrics.irr}
                  max={15}
                  color="primary-500"
                />
                <ProgressBar
                  label="Return on Investment (ROI)"
                  value={performanceMetrics.roi}
                  max={20}
                  color="primary-400"
                />
                <ProgressBar
                  label="Cash Yield"
                  value={performanceMetrics.cashYield}
                  max={10}
                  color="secondary-500"
                />
                <ProgressBar
                  label="Sharpe Ratio"
                  value={performanceMetrics.sharpeRatio}
                  max={3}
                  color="primary-600"
                />
              </div>
              <div className="mt-6">
                <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  View detailed performance analysis
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </div>
            </Card>

            <Card className="p-5">
              <SectionTitle
                title="Risk Metrics"
                subtitle="Key risk indicators"
              />
              <div className="space-y-4 mt-4">
                <ProgressBar
                  label="Default Rate"
                  value={riskMetrics.defaultRate}
                  max={5}
                  color="error"
                />
                <ProgressBar
                  label="Expected Loss"
                  value={riskMetrics.expectedLoss}
                  max={10}
                  color="warning"
                />
                <ProgressBar
                  label="Concentration Risk"
                  value={riskMetrics.concentrationRisk}
                  max={100}
                  color="warning"
                />
                <ProgressBar
                  label="Liquidity Risk"
                  value={riskMetrics.liquidityRisk}
                  max={100}
                  color="accent-500"
                />
              </div>
              <div className="mt-6">
                <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  View detailed risk analysis
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </div>
            </Card>
          </div>

          {/* Recent Activity & Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5">
              <SectionTitle
                title="Recent Activity"
                subtitle="Latest portfolio changes"
                action={
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    View all
                  </button>
                }
              />
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 rounded-full bg-primary-50 mr-3">
                      <Activity size={14} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {index === 0 ? 'New loan added to portfolio' :
                         index === 1 ? 'Risk assessment updated' :
                         index === 2 ? 'Portfolio rebalanced' :
                         'Performance report generated'}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {index === 0 ? '2 hours ago' :
                         index === 1 ? 'Yesterday' :
                         index === 2 ? '3 days ago' :
                         '1 week ago'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <SectionTitle
                title="Upcoming Events"
                subtitle="Scheduled activities"
                action={
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    View calendar
                  </button>
                }
              />
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 rounded-full bg-primary-50 mr-3">
                      <Calendar size={14} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {index === 0 ? 'Portfolio Review Meeting' :
                         index === 1 ? 'Quarterly Performance Report' :
                         index === 2 ? 'Risk Assessment Update' :
                         'Annual Strategy Planning'}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {index === 0 ? 'Tomorrow, 10:00 AM' :
                         index === 1 ? 'Next week, Monday' :
                         index === 2 ? 'In 2 weeks' :
                         'Next month'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Documents & Reports */}
          <Card className="p-5">
            <SectionTitle
              title="Documents & Reports"
              subtitle="Recent portfolio documentation"
              action={
                <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  <FileText size={14} className="mr-1" />
                  Generate new report
                </button>
              }
            />
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Document Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {[
                    { name: 'Q2 2023 Portfolio Performance Report', type: 'PDF', date: '15 Jun 2023', size: '2.4 MB' },
                    { name: 'Risk Assessment Summary', type: 'XLSX', date: '02 Jun 2023', size: '1.8 MB' },
                    { name: 'Suburb Allocation Analysis', type: 'PDF', date: '28 May 2023', size: '3.2 MB' },
                    { name: 'Cash Flow Projections', type: 'XLSX', date: '15 May 2023', size: '1.5 MB' },
                  ].map((doc, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-800">{doc.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">{doc.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">{doc.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">{doc.size}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <button className="text-primary-600 hover:text-primary-700 mr-3">View</button>
                        <button className="text-primary-600 hover:text-primary-700">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Other tabs would be implemented similarly */}
      {activeTab !== 'overview' && (
        <div className="h-64 bg-neutral-50 rounded-md flex items-center justify-center">
          <span className="text-neutral-400">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon</span>
        </div>
      )}
    </div>
  );
};

export default PortfolioDashboardPro;
