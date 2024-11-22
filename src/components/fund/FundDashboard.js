import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FundMetrics from './FundMetrics';
import PortfolioDistribution from './PortfolioDistribution';
import GeographicDistribution from './GeographicDistribution';
import CashflowAnalysis from './CashflowAnalysis';
import IncomeAnalysis from './IncomeAnalysis';
import LTVAnalysis from './LTVAnalysis';
const FundDashboard = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Fund Report" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Comprehensive overview of the fund's performance and portfolio metrics" })] }), _jsx(FundMetrics, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(PortfolioDistribution, {}), _jsx(GeographicDistribution, {})] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(IncomeAnalysis, {}), _jsx(CashflowAnalysis, {})] }), _jsx(LTVAnalysis, {})] }));
};
export default FundDashboard;
