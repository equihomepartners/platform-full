import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { DollarSign, TrendingUp, Building2, Clock } from 'lucide-react';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';
const PortfolioModel = () => {
    const { inputs } = useFundStore();
    const metrics = calculateFundMetrics(inputs);
    const returnData = {
        labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
        datasets: [
            {
                label: 'Interest Returns',
                data: metrics.yearlyReturns.map(r => r.interestReturn / 1000000), // Convert to millions
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            },
            {
                label: 'Appreciation Returns',
                data: metrics.yearlyReturns.map(r => r.appreciationReturn / 1000000), // Convert to millions
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }
        ]
    };
    const irrData = {
        labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
        datasets: [{
                label: 'Portfolio IRR',
                data: metrics.yearlyReturns.map(r => r.irr),
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
    };
    const cumulativeData = {
        labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
        datasets: [{
                label: 'Cumulative Returns',
                data: metrics.yearlyReturns.map(r => r.totalReturn / 1000000),
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true
            }]
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total AUM" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", (inputs.targetAUM / 1000000).toFixed(1), "M"] })] }), _jsx(DollarSign, { className: "h-8 w-8 text-blue-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average Deal Size" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", (inputs.averageDealSize / 1000000).toFixed(1), "M"] })] }), _jsx(Building2, { className: "h-8 w-8 text-green-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average Exit Term" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [inputs.averageExitTerm, " years"] })] }), _jsx(Clock, { className: "h-8 w-8 text-yellow-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Target IRR" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].irr.toFixed(1), "%"] })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-purple-600" })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Components" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: returnData, options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Returns ($M)'
                                                }
                                            }
                                        }
                                    } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Portfolio IRR" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: irrData, options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'IRR (%)'
                                                },
                                                ticks: {
                                                    callback: (value) => `${value.toFixed(1)}%`
                                                }
                                            }
                                        }
                                    } }) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Cumulative Returns" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: cumulativeData, options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Cumulative Returns ($M)'
                                        }
                                    }
                                }
                            } }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Portfolio Composition" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Number of Deals" }), _jsx("div", { className: "text-2xl font-semibold", children: inputs.numberOfDeals })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Weighted LTV" }), _jsxs("div", { className: "text-2xl font-semibold", children: [metrics.weightedLTV.toFixed(1), "%"] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Metrics" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Returns at Exit" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", (metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].totalReturn / 1000000).toFixed(1), "M"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Average Growth Rate" }), _jsxs("div", { className: "text-2xl font-semibold", children: [metrics.weightedGrowthRate.toFixed(1), "%"] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Components" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Interest Returns at Exit" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", (metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].interestReturn / 1000000).toFixed(1), "M"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Appreciation Returns at Exit" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", (metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].appreciationReturn / 1000000).toFixed(1), "M"] })] })] })] })] })] }));
};
export default PortfolioModel;
