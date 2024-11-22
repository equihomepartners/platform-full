import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import FundInputs from './FundInputs';
import PortfolioModel from './PortfolioModel';
import RiskAnalysis from './RiskAnalysis';
import ScenarioAnalysis from './ScenarioAnalysis';
const FundModelTabs = () => {
    return (_jsxs(Tabs, { defaultValue: "inputs", className: "w-full", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "inputs", children: "Fund Inputs" }), _jsx(TabsTrigger, { value: "portfolio", children: "Portfolio Model" }), _jsx(TabsTrigger, { value: "risk", children: "Risk Analysis" }), _jsx(TabsTrigger, { value: "scenarios", children: "Scenario Analysis" })] }) }), _jsx(TabsContent, { value: "inputs", children: _jsx(FundInputs, {}) }), _jsx(TabsContent, { value: "portfolio", children: _jsx(PortfolioModel, {}) }), _jsx(TabsContent, { value: "risk", children: _jsx(RiskAnalysis, {}) }), _jsx(TabsContent, { value: "scenarios", children: _jsx(ScenarioAnalysis, {}) })] }));
};
export default FundModelTabs;
