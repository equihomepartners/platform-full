import { create } from 'zustand';
export const useFundStore = create((set) => ({
    inputs: {
        targetAUM: 500000000, // $500M
        numberOfDeals: 500,
        averageDealSize: 1000000, // Calculated from targetAUM / numberOfDeals
        averageExitTerm: 4.5,
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
    },
    updateInput: (field, value) => set(state => {
        const newInputs = { ...state.inputs };
        if (field.includes('.')) {
            const [category, subfield] = field.split('.');
            newInputs[category][subfield] = value;
        }
        else {
            newInputs[field] = value;
        }
        return { inputs: newInputs };
    }),
    updateDealSize: (field, value) => set(state => {
        const newInputs = { ...state.inputs };
        newInputs[field] = value;
        newInputs.averageDealSize = newInputs.targetAUM / newInputs.numberOfDeals;
        return { inputs: newInputs };
    })
}));
