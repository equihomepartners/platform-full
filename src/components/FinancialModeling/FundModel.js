import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle, DollarSign, TrendingUp, Building2, Percent } from 'lucide-react';
import Input from '../ui/input';
const FundModel = () => {
    const [inputs, setInputs] = useState({
        targetAUM: 500000000, // $500M
        numberOfDeals: 500,
        ltvDistribution: {
            min: 15,
            max: 75,
            mean: 30,
            standardDev: 10
        },
        growthDistribution: {
            min: 2,
            max: 12,
            mean: 6,
            standardDev: 2
        },
        propertyValueDistribution: {
            min: 1000000,
            max: 10000000,
            mean: 3000000,
            standardDev: 1000000
        }
    });
    // Calculate key metrics based on inputs
    const metrics = React.useMemo(() => {
        const averageDealSize = inputs.targetAUM / inputs.numberOfDeals;
        const weightedLTV = inputs.ltvDistribution.mean;
        const weightedGrowthRate = inputs.growthDistribution.mean;
        // Calculate portfolio returns over time (10 years)
        const yearlyReturns = Array.from({ length: 10 }, (_, year) => {
            const yearNum = year + 1;
            // Calculate interest returns
            const interestReturn = inputs.targetAUM * 0.05 * yearNum; // 5% interest rate
            // Calculate appreciation returns based on weighted growth rate
            const appreciationReturn = inputs.targetAUM * (weightedLTV / 100) *
                (Math.pow(1 + weightedGrowthRate / 100, yearNum) - 1);
            // Calculate total return and IRR
            const totalReturn = interestReturn + appreciationReturn;
            const irr = (Math.pow((totalReturn + inputs.targetAUM) / inputs.targetAUM, 1 / yearNum) - 1) * 100;
            return {
                year: yearNum,
                interestReturn,
                appreciationReturn,
                totalReturn,
                irr
            };
        });
        return {
            averageDealSize,
            weightedLTV,
            weightedGrowthRate,
            yearlyReturns
        };
    }, [inputs]);
    // Prepare chart data
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
    const handleInputChange = (field, value) => {
        setInputs(prev => {
            const newInputs = { ...prev };
            if (field.includes('.')) {
                const [category, subfield] = field.split('.');
                newInputs[category][subfield] = value;
            }
            else {
                newInputs[field] = value;
            }
            return newInputs;
        });
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg", children: _jsxs("div", { className: "flex", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 flex-shrink-0" }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-lg font-medium text-yellow-800", children: "Fund Model Parameters" }), _jsx("p", { className: "mt-2 text-yellow-700", children: "This model simulates fund performance based on statistical distributions of key metrics. Adjust the parameters below to model different portfolio compositions." })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Fund Parameters" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Target AUM" }), _jsxs("div", { className: "relative", children: [_jsx(DollarSign, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }), _jsx(Input, { type: "number", formatNumber: true, value: inputs.targetAUM, onChange: (value) => handleInputChange('targetAUM', value), className: "pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Number of Deals" }), _jsx(Input, { type: "number", value: inputs.numberOfDeals, onChange: (value) => handleInputChange('numberOfDeals', value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-gray-900 mb-3", children: "LTV Distribution" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Mean LTV (%)" }), _jsx(Input, { type: "number", value: inputs.ltvDistribution.mean, onChange: (value) => handleInputChange('ltvDistribution.mean', value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Std Dev (%)" }), _jsx(Input, { type: "number", value: inputs.ltvDistribution.standardDev, onChange: (value) => handleInputChange('ltvDistribution.standardDev', value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" })] })] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-gray-900 mb-3", children: "Growth Rate Distribution" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Mean Growth (%)" }), _jsx(Input, { type: "number", value: inputs.growthDistribution.mean, onChange: (value) => handleInputChange('growthDistribution.mean', value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Std Dev (%)" }), _jsx(Input, { type: "number", value: inputs.growthDistribution.standardDev, onChange: (value) => handleInputChange('growthDistribution.standardDev', value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" })] })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Portfolio Metrics" }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Average Deal Size" }), _jsx(DollarSign, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: ["$", (metrics.averageDealSize / 1000000).toFixed(1), "M"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Weighted LTV" }), _jsx(Percent, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: [metrics.weightedLTV.toFixed(1), "%"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Growth Rate" }), _jsx(TrendingUp, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: [metrics.weightedGrowthRate.toFixed(1), "%"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "10-Year IRR" }), _jsx(Building2, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: [metrics.yearlyReturns[9].irr.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-base font-medium text-gray-900 mb-4", children: "Return Components" }), _jsx("div", { className: "h-[200px]", children: _jsx(Line, { data: returnData, options: {
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
                                            } }) })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-base font-medium text-gray-900 mb-4", children: "Portfolio IRR" }), _jsx("div", { className: "h-[200px]", children: _jsx(Line, { data: irrData, options: {
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
                                                            text: 'IRR (%)'
                                                        },
                                                        ticks: {
                                                            callback: (value) => `${value.toFixed(1)}%`
                                                        }
                                                    }
                                                }
                                            } }) })] })] })] })] }));
};
export default FundModel;
