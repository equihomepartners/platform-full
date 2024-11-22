import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';
const ScenarioAnalysis = () => {
    const { inputs } = useFundStore();
    // Define scenarios
    const scenarios = [
        { name: 'Bear Market', growthAdjustment: -4, ltvAdjustment: 5 },
        { name: 'Conservative', growthAdjustment: -2, ltvAdjustment: 2 },
        { name: 'Base Case', growthAdjustment: 0, ltvAdjustment: 0 },
        { name: 'Optimistic', growthAdjustment: 2, ltvAdjustment: -2 },
        { name: 'Bull Market', growthAdjustment: 4, ltvAdjustment: -5 }
    ];
    // Calculate metrics for each scenario
    const scenarioMetrics = scenarios.map(scenario => {
        const adjustedInputs = {
            ...inputs,
            growthDistribution: {
                ...inputs.growthDistribution,
                mean: inputs.growthDistribution.mean + scenario.growthAdjustment
            },
            ltvDistribution: {
                ...inputs.ltvDistribution,
                mean: inputs.ltvDistribution.mean + scenario.ltvAdjustment
            }
        };
        return {
            name: scenario.name,
            metrics: calculateFundMetrics(adjustedInputs)
        };
    });
    const irrData = {
        labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
        datasets: scenarioMetrics.map((scenario, index) => ({
            label: scenario.name,
            data: scenario.metrics.yearlyReturns.map(r => r.irr),
            borderColor: [
                '#EF4444', // Bear Market (Red)
                '#F59E0B', // Conservative (Orange)
                '#3B82F6', // Base Case (Blue)
                '#10B981', // Optimistic (Green)
                '#8B5CF6' // Bull Market (Purple)
            ][index],
            tension: 0.4
        }))
    };
    const returnData = {
        labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
        datasets: scenarioMetrics.map((scenario, index) => ({
            label: scenario.name,
            data: scenario.metrics.yearlyReturns.map(r => r.totalReturn / 1000000), // Convert to millions
            borderColor: [
                '#EF4444',
                '#F59E0B',
                '#3B82F6',
                '#10B981',
                '#8B5CF6'
            ][index],
            tension: 0.4
        }))
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "IRR by Scenario" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: irrData, options: {
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
                                    } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Total Returns by Scenario" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: returnData, options: {
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
                                    } }) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Scenario Comparison" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Scenario" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "10-Year IRR" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total Returns" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Weighted LTV" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: scenarioMetrics.map((scenario) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: scenario.name }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [scenario.metrics.yearlyReturns[9].irr.toFixed(1), "%"] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["$", (scenario.metrics.yearlyReturns[9].totalReturn / 1000000).toFixed(1), "M"] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [scenario.metrics.weightedLTV.toFixed(1), "%"] })] }, scenario.name))) })] }) })] })] }));
};
export default ScenarioAnalysis;
