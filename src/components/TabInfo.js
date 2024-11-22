import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Info } from 'lucide-react';
const TabInfo = () => {
    const [showInfo, setShowInfo] = useState(false);
    const location = useLocation();
    const getTabInfo = () => {
        const path = location.pathname;
        if (path.includes('/deals')) {
            return {
                title: 'Example Loan Portfolio',
                content: (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "This section showcases example loans using real property data from Sydney's premium suburbs. While these specific transactions haven't occurred, they demonstrate how our model would have performed if applied to actual properties that transacted at these prices." }), _jsx("p", { className: "text-gray-600", children: "Each example is based on real market data, including:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-600", children: [_jsx("li", { children: "Actual property values and sales history" }), _jsx("li", { children: "Real suburb growth rates and market dynamics" }), _jsx("li", { children: "Genuine property characteristics and features" }), _jsx("li", { children: "Authentic market comparables and trends" })] })] }))
            };
        }
        if (path.includes('/fund-dashboard')) {
            return {
                title: 'Fund Performance Report',
                content: (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "The Fund Dashboard provides a comprehensive overview of portfolio performance, risk metrics, and investment returns. This powerful tool enables real-time monitoring of:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-600", children: [_jsx("li", { children: "Portfolio-wide performance metrics and IRR tracking" }), _jsx("li", { children: "Geographic distribution and concentration analysis" }), _jsx("li", { children: "Risk exposure and mitigation strategies" }), _jsx("li", { children: "Return attribution and component analysis" }), _jsx("li", { children: "Historical performance trends and projections" })] }), _jsx("p", { className: "text-gray-600", children: "Use this dashboard to understand portfolio composition, track performance metrics, and identify optimization opportunities across the fund." })] }))
            };
        }
        if (path.includes('/underwrite')) {
            return {
                title: 'AI Underwriting System',
                content: (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "Our AI-powered underwriting system processes loan applications instantly, leveraging machine learning to make data-driven lending decisions. This internal system:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-600", children: [_jsx("li", { children: "Processes applications in real-time with instant decisions" }), _jsx("li", { children: "Analyzes multiple data points for comprehensive risk assessment" }), _jsx("li", { children: "Projects returns and optimal exit timing" }), _jsx("li", { children: "Evaluates portfolio fit and concentration risks" }), _jsx("li", { children: "Continuously learns and adapts from portfolio performance" })] }), _jsx("p", { className: "text-gray-600", children: "The system automatically adjusts its parameters based on fund performance, market conditions, and portfolio composition, ensuring optimal decision-making aligned with fund objectives." })] }))
            };
        }
        if (path.includes('/cio-dashboard')) {
            return {
                title: 'CIO Control Center',
                content: (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "The CIO Dashboard serves as the control center for our AI underwriting system, allowing precise calibration of investment parameters and risk controls. This powerful interface enables:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-600", children: [_jsx("li", { children: "Dynamic adjustment of fund parameters affecting AI decisions" }), _jsx("li", { children: "Real-time modification of risk tolerance and return targets" }), _jsx("li", { children: "Geographic exposure management through zone allocations" }), _jsx("li", { children: "Portfolio composition control and optimization" })] }), _jsx("p", { className: "text-gray-600", children: "Changes made here directly influence the AI underwriting model's decision-making process, ensuring alignment with fund strategy and market conditions. The system provides immediate feedback on parameter adjustments and their impact on portfolio metrics." })] }))
            };
        }
        if (path.includes('/pipeline')) {
            return {
                title: 'Pipeline Management',
                content: (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "The Pipeline Management system leverages predictive analytics and machine learning to optimize deal selection and portfolio composition. This dynamic system:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-600", children: [_jsx("li", { children: "Continuously learns from historical and current performance data" }), _jsx("li", { children: "Predicts deal outcomes and portfolio impacts" }), _jsx("li", { children: "Identifies optimal opportunities aligned with fund strategy" }), _jsx("li", { children: "Adapts to changing market conditions and fund parameters" }), _jsx("li", { children: "Provides real-time analytics on pipeline quality and composition" })] }), _jsx("p", { className: "text-gray-600", children: "The system's iterative learning process ensures increasingly accurate predictions and recommendations, helping maintain optimal portfolio composition and risk-adjusted returns." })] }))
            };
        }
        return {
            title: 'Welcome to Equihome Platform',
            content: (_jsx("div", { className: "space-y-4", children: _jsx("p", { className: "text-gray-600", children: "Welcome to our comprehensive platform demonstration. Navigate through different sections to explore our sophisticated underwriting and portfolio management capabilities." }) }))
        };
    };
    const tabInfo = getTabInfo();
    return (_jsxs("div", { className: "fixed top-4 left-4 z-50", children: [_jsxs("button", { onClick: () => setShowInfo(!showInfo), className: "flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [_jsx(Info, { className: "h-5 w-5 text-blue-500" }), _jsx("span", { className: "font-medium", children: "About This Section" })] }), showInfo && (_jsxs("div", { className: "absolute top-12 left-0 w-[600px] bg-white rounded-lg shadow-xl p-6 mt-2", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: tabInfo.title }), _jsx("button", { onClick: () => setShowInfo(false), className: "text-gray-400 hover:text-gray-500", children: "\u00D7" })] }), tabInfo.content] }))] }));
};
export default TabInfo;
