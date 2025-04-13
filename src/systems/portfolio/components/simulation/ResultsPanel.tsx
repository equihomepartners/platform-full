import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../components/ui/tabs';
import FundOverviewTab from './results/FundOverviewTab';
import PortfolioTab from './results/PortfolioTab';
import CashflowsTab from './results/CashflowsTab';
import WaterfallTab from './results/WaterfallTab';
import GPEconomicsTab from './results/GPEconomicsTab';
import LPEconomicsTab from './results/LPEconomicsTab';
import AdvancedAnalyticsTab from './results/AdvancedAnalyticsTab';
import { Loader2 } from 'lucide-react';

interface ResultsPanelProps {
  results: any;
  parameters: any;
  isCalculating: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  parameters,
  isCalculating
}) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Fund Overview',
      content: <FundOverviewTab results={results} parameters={parameters} />
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      content: <PortfolioTab simulationResults={results} />
    },
    {
      id: 'cashflows',
      label: 'Cashflows',
      content: <CashflowsTab results={results} parameters={parameters} />
    },
    {
      id: 'waterfall',
      label: 'Waterfall',
      content: <WaterfallTab results={results} parameters={parameters} />
    },
    {
      id: 'gp-economics',
      label: 'GP Economics',
      content: <GPEconomicsTab results={results} parameters={parameters} />
    },
    {
      id: 'lp-economics',
      label: 'LP Economics',
      content: <LPEconomicsTab results={results} parameters={parameters} />
    },
    {
      id: 'advanced-analytics',
      label: 'Advanced Analytics',
      content: <AdvancedAnalyticsTab results={results} parameters={parameters} />
    }
  ];

  if (isCalculating) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        height: '24rem'
      }}>
        <Loader2 size={48} style={{
          animation: 'spin 1s linear infinite',
          color: '#0a2463',
          marginBottom: '1rem'
        }} />
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#0a2463',
          marginBottom: '0.5rem'
        }}>Running Simulation</h3>
        <p style={{
          color: '#4a4a4a',
          textAlign: 'center'
        }}>
          Generating portfolio and calculating fund performance metrics...
        </p>
      </div>
    );
  }

  if (!results) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        height: '24rem',
        backgroundColor: '#f5f7fa',
        borderRadius: '0.5rem',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#0a2463',
          marginBottom: '0.5rem'
        }}>No Results Yet</h3>
        <p style={{
          color: '#4a4a4a',
          textAlign: 'center',
          maxWidth: '28rem'
        }}>
          Configure the simulation parameters on the left and click "Run Simulation" to see results.
        </p>
      </div>
    );
  }

  if (results.error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        height: '24rem',
        backgroundColor: '#fee2e2',
        borderRadius: '0.5rem',
        border: '1px solid #fca5a5'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#b91c1c',
          marginBottom: '0.5rem'
        }}>Error</h3>
        <p style={{
          color: '#4a4a4a',
          textAlign: 'center',
          maxWidth: '28rem'
        }}>
          {results.error}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#b91c1c',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* JavaScript Fallback Notice */}
      {results?.usingJavaScriptFallback && (
        <div style={{
          backgroundColor: '#fff8e6',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem',
          border: '1px solid #ffd166',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            backgroundColor: '#ffd166',
            borderRadius: '50%',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ fontWeight: 'bold', color: '#7d5700' }}>!</span>
          </div>
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#7d5700',
              marginBottom: '0.25rem'
            }}>Using JavaScript Fallback</h4>
            <p style={{ fontSize: '0.8125rem', color: '#7d5700', margin: 0 }}>
              For more accurate results, please start the Python server. The current calculations are simplified estimates.
            </p>
          </div>
        </div>
      )}

      <Tabs defaultValue="overview" style={{ width: '100%' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <TabsList style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'white'
                  }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div>
            {tabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ResultsPanel;
