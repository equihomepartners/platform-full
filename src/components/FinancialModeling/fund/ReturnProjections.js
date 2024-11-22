import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';
const ReturnProjections = () => {
    const { inputs } = useFundStore();
    const metrics = calculateFundMetrics(inputs);
    const cumulativeData = {
        labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
        datasets: [{
                label: 'Cumulative Returns',
                data: metrics.yearlyReturns.map(r => r.totalReturn / 1000000), // Convert to millions
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
    };
    const returnBreakdownData = {
        labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
        datasets: [
            {
                label: 'Interest Returns',
                data: metrics.yearlyReturns.map(r => r.interestReturn / 1000000),
                backgroundColor: '#3B82F6'
            },
            {
                label: 'Appreciation Returns',
                data: metrics.yearlyReturns.map(r => r.appreciationReturn / 1000000),
                backgroundColor: '#10B981'
            }
        ]
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Cumulative Returns" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: cumulativeData, options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: false
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
                            } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Components" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: returnBreakdownData, options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    }
                                },
                                scales: {
                                    y: {
                                        stacked: true,
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Returns ($M)'
                                        }
                                    }
                                }
                            } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Metrics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Returns (Year 10)" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", (metrics.yearlyReturns[9].totalReturn / 1000000).toFixed(1), "M"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Interest Component" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", (metrics.yearlyReturns[9].interestReturn / 1000000).toFixed(1), "M"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Appreciation Component" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", (metrics.yearlyReturns[9].appreciationReturn / 1000000).toFixed(1), "M"] })] })] })] })] }));
};
export default ReturnProjections;
