import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import ModelInputs from './ModelInputs';
import ReturnAnalysis from './ReturnAnalysis';
import ReturnWaterfall from './ReturnWaterfall';
import ScenarioComparison from './ScenarioComparison';
import ProductComparison from './ProductComparison';
import FundModelTabs from './fund/FundModelTabs';
import { Calculator } from 'lucide-react';
const FinancialModeling = () => {
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
    const handleInputChange = (updates) => {
        setModelInputs(prev => ({
            ...prev,
            ...updates
        }));
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "Financial Modeling" }), _jsx(Calculator, { className: "h-8 w-8 text-indigo-600" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Model potential returns and analyze exit scenarios" })] }), _jsxs(Tabs, { defaultValue: "individual", className: "w-full", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "individual", children: "Individual Model" }), _jsx(TabsTrigger, { value: "fund", children: "Fund Model" })] }) }), _jsx(TabsContent, { value: "individual", children: _jsxs(Tabs, { defaultValue: "inputs", className: "w-full", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "inputs", children: "Model Inputs" }), _jsx(TabsTrigger, { value: "returns", children: "Return Analysis" }), _jsx(TabsTrigger, { value: "waterfall", children: "Return Waterfall" }), _jsx(TabsTrigger, { value: "scenarios", children: "Scenario Comparison" }), _jsx(TabsTrigger, { value: "product", children: "Product Comparison" })] }) }), _jsx(TabsContent, { value: "inputs", children: _jsx(ModelInputs, { inputs: modelInputs, onInputChange: handleInputChange }) }), _jsx(TabsContent, { value: "returns", children: _jsx(ReturnAnalysis, { modelInputs: modelInputs }) }), _jsx(TabsContent, { value: "waterfall", children: _jsx(ReturnWaterfall, { modelInputs: modelInputs }) }), _jsx(TabsContent, { value: "scenarios", children: _jsx(ScenarioComparison, { modelInputs: modelInputs }) }), _jsx(TabsContent, { value: "product", children: _jsx(ProductComparison, { modelInputs: modelInputs }) })] }) }), _jsx(TabsContent, { value: "fund", children: _jsx(FundModelTabs, {}) })] })] }));
};
export default FinancialModeling;
