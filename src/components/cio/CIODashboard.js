import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import PerformanceMetrics from './PerformanceMetrics';
import FundParameters from './FundParameters';
import TrafficLightZones from './TrafficLightZones';
import FundStrategy from './FundStrategy';
import GeoPortfolio from './GeoPortfolio';
import UnderwriteDemo from './UnderwriteDemo';
import TechnicalInfrastructure from './TechnicalInfrastructure';
const CIODashboard = () => {
    return (_jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "CIO Dashboard" }), _jsx("span", { className: "text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-mono", children: "alpha" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Control center for our AI/ML underwriting system" })] }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "parameters", children: "Fund Parameters" }), _jsx(TabsTrigger, { value: "zones", children: "Traffic Light Zones" }), _jsx(TabsTrigger, { value: "strategy", children: "Fund Strategy" }), _jsx(TabsTrigger, { value: "geography", children: "Geographic Analysis" }), _jsx(TabsTrigger, { value: "tech", children: "Technical Infrastructure" }), _jsx(TabsTrigger, { value: "underwrite", children: "Underwrite Demo" })] }) }), _jsx(TabsContent, { value: "overview", children: _jsx(PerformanceMetrics, {}) }), _jsx(TabsContent, { value: "parameters", children: _jsx(FundParameters, {}) }), _jsx(TabsContent, { value: "zones", children: _jsx(TrafficLightZones, {}) }), _jsx(TabsContent, { value: "strategy", children: _jsx(FundStrategy, {}) }), _jsx(TabsContent, { value: "geography", children: _jsx(GeoPortfolio, {}) }), _jsx(TabsContent, { value: "tech", children: _jsx(TechnicalInfrastructure, {}) }), _jsx(TabsContent, { value: "underwrite", children: _jsx(UnderwriteDemo, {}) })] })] }));
};
export default CIODashboard;
