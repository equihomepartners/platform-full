import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../components/ui/tabs';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface ResultsPanelProps {
  results: any;
  isPythonAvailable: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, isPythonAvailable }) => {
  if (!results) return null;

  // Custom metric component
  const Metric = ({ label, value }: { label: string, value: React.ReactNode }) => {
    return (
      <div className="mb-3">
        <div className="text-xs font-medium text-neutral-500 mb-1">{label}</div>
        <div className="text-base font-semibold text-primary-900">{value}</div>
      </div>
    );
  };

  // Card component
  const Card = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-4">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2">
          <h3 className="text-sm font-medium text-primary-900">{title}</h3>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 flex justify-between items-center">
        <h3 className="text-lg font-medium text-primary-900">Results</h3>
        <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
          {isPythonAvailable ? 'Python Calculations' : 'JavaScript Calculations'}
        </div>
      </div>
      <div className="p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="gp" className="text-xs">GP Economics</TabsTrigger>
            <TabsTrigger value="lp" className="text-xs">LP Economics</TabsTrigger>
            <TabsTrigger value="loan" className="text-xs">Sample Loan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card title="Fund Performance">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Metric label="Fund Size" value={results.fundSize ? formatCurrency(results.fundSize) : 'N/A'} />
                <Metric label="Number of Loans" value={results.numLoans || 'N/A'} />
                <Metric label="Total Return" value={results.totalReturn ? formatCurrency(results.totalReturn) : 'N/A'} />
                <Metric label="Total Profit" value={results.totalProfit ? formatCurrency(results.totalProfit) : 'N/A'} />
                <Metric label="IRR (Simplified)" value={results.irr ? formatPercentage(results.irr) : 'N/A'} />
                <Metric label="Equity Multiple" value={results.equityMultiple ? `${results.equityMultiple.toFixed(2)}x` : 'N/A'} />
                <Metric label="ROI" value={results.roi ? formatPercentage(results.roi) : 'N/A'} />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="gp">
            <Card title="GP Economics">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Metric label="GP Investment" value={results.gpEconomics?.investment ? formatCurrency(results.gpEconomics.investment) : 'N/A'} />
                <Metric label="Management Fees" value={results.gpEconomics?.managementFees ? formatCurrency(results.gpEconomics.managementFees) : 'N/A'} />
                <Metric label="Origination Fees" value={results.gpEconomics?.originationFees ? formatCurrency(results.gpEconomics.originationFees) : 'N/A'} />
                <Metric label="GP Catch-up" value={results.gpEconomics?.catchup ? formatCurrency(results.gpEconomics.catchup) : 'N/A'} />
                <Metric label="Carried Interest" value={results.gpEconomics?.carriedInterest ? formatCurrency(results.gpEconomics.carriedInterest) : 'N/A'} />
                <Metric label="Total GP Return" value={results.gpEconomics?.totalReturn ? formatCurrency(results.gpEconomics.totalReturn) : 'N/A'} />
                <Metric label="GP ROI" value={results.gpEconomics?.roi ? formatPercentage(results.gpEconomics.roi) : 'N/A'} />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="lp">
            <Card title="LP Economics">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Metric label="LP Investment" value={results.lpEconomics?.investment ? formatCurrency(results.lpEconomics.investment) : 'N/A'} />
                <Metric label="Preferred Return" value={results.lpEconomics?.preferredReturn ? formatCurrency(results.lpEconomics.preferredReturn) : 'N/A'} />
                <Metric label="LP Residual" value={results.lpEconomics?.residual ? formatCurrency(results.lpEconomics.residual) : 'N/A'} />
                <Metric label="Total LP Return" value={results.lpEconomics?.totalReturn ? formatCurrency(results.lpEconomics.totalReturn) : 'N/A'} />
                <Metric label="LP ROI" value={results.lpEconomics?.roi ? formatPercentage(results.lpEconomics.roi) : 'N/A'} />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="loan">
            <Card title="Sample Loan Exit Value">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Metric label="Loan Amount" value={results.loanExitResult?.loan?.loan_amount ? formatCurrency(results.loanExitResult.loan.loan_amount) : 'N/A'} />
                <Metric label="Property Value" value={results.loanExitResult?.loan?.property_value ? formatCurrency(results.loanExitResult.loan.property_value) : 'N/A'} />
                <Metric label="Years Held" value={results.loanExitResult?.yearsHeld || 'N/A'} />
                <Metric label="Appreciated Value" value={results.loanExitResult?.appreciatedPropertyValue ? formatCurrency(results.loanExitResult.appreciatedPropertyValue) : 'N/A'} />
                <Metric label="Appreciation" value={results.loanExitResult?.propertyAppreciation ? formatCurrency(results.loanExitResult.propertyAppreciation) : 'N/A'} />
                <Metric label="Interest" value={results.loanExitResult?.interest ? formatCurrency(results.loanExitResult.interest) : 'N/A'} />
                <Metric label="Appreciation Fee" value={results.loanExitResult?.appreciationFee ? formatCurrency(results.loanExitResult.appreciationFee) : 'N/A'} />
                <Metric label="Exit Value" value={results.loanExitResult?.exitValue ? formatCurrency(results.loanExitResult.exitValue) : 'N/A'} />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResultsPanel;
