import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import ModelInputs from './ModelInputs';
import ReturnAnalysis from './ReturnAnalysis';
import ReturnWaterfall from './ReturnWaterfall';
import ScenarioComparison from './ScenarioComparison';
import ProductComparison from './ProductComparison';
import FundModelTabs from './fund/FundModelTabs';
import { Calculator } from 'lucide-react';

const FinancialModeling: React.FC = () => {
  const [modelInputs, setModelInputs] = useState({
    propertyValue: 2300000,
    loanAmount: 650000,
    loanTerm: 10, // Fixed at 10 years
    interestRate: 5,
    upfrontFee: 3,
    growthRate: 4.65,
    existingMortgage: 0,
    desiredExitYear: 4.5
  });

  const handleInputChange = (updates: Partial<typeof modelInputs>) => {
    setModelInputs(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Financial Modeling
          </h1>
          <Calculator className="h-8 w-8 text-indigo-600" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Model potential returns and analyze exit scenarios
        </p>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="individual">Individual Model</TabsTrigger>
            <TabsTrigger value="fund">Fund Model</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="individual">
          <Tabs defaultValue="inputs" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="inputs">Model Inputs</TabsTrigger>
                <TabsTrigger value="returns">Return Analysis</TabsTrigger>
                <TabsTrigger value="waterfall">Return Waterfall</TabsTrigger>
                <TabsTrigger value="scenarios">Scenario Comparison</TabsTrigger>
                <TabsTrigger value="product">Product Comparison</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="inputs">
              <ModelInputs 
                inputs={modelInputs}
                onInputChange={handleInputChange}
              />
            </TabsContent>

            <TabsContent value="returns">
              <ReturnAnalysis modelInputs={modelInputs} />
            </TabsContent>

            <TabsContent value="waterfall">
              <ReturnWaterfall modelInputs={modelInputs} />
            </TabsContent>

            <TabsContent value="scenarios">
              <ScenarioComparison modelInputs={modelInputs} />
            </TabsContent>

            <TabsContent value="product">
              <ProductComparison modelInputs={modelInputs} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="fund">
          <FundModelTabs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialModeling;