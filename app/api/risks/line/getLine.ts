import risks from '@/app/api/data.json';
import { LineChartData, Risk } from '@/app/types/RiskRating';

interface TransformedData {
    [key: number]: {
        riskFactorsTotals: TransformedDataRiskFactors;
        yearRiskTotal: number;
        numOfRowsForYear: number;
    };
}

interface TransformedDataRiskFactors {
    [key: string]: number;
}

const mergeRiskFactorTotals = (prevState: TransformedDataRiskFactors, current: TransformedDataRiskFactors) => {
    let merged = { ...current };
    Object.entries(prevState).forEach(([key, val]) => {
        if (key in merged) {
            merged[key] += val;
        } else {
            merged[key] = val;
        }
    });
    return merged;
};

export const getLine = (filtered: Risk[] | null, riskFactorParams: string | null) => {
    // getLine() can be called from rsc
    if (filtered === null) {
        filtered = risks;
    }

    const riskFactorParamsArr = riskFactorParams
        ? riskFactorParams.split(',')
        : ['Earthquake', 'Extreme heat', 'Wildfire', 'Tornado', 'Flooding', 'Volcano', 'Hurricane', 'Drought', 'Extreme cold', 'Sea level rise'];

    // Transforming data to following format:
    // [ '2070': {riskFactorsTotals: {Earthquake: 55.2, 'Sea level rise': 52.790000000000006,Tornado: 56.610000000000035,}, yearRiskTotal: 342, numOfRowsForYear: 1000 }]
    // yearRiskTotal is for sum of all riskFactors in this row.
    // yearTotal is to track number of rows in that year
    // yearRiskTotal and yearTotal will be used to calculate aggregatedRisk
    let transformedData: TransformedData = {};
    filtered.forEach((row: Risk) => {
        let year = row['Year'];
        let rowRiskFactors: TransformedDataRiskFactors = {}; // will contain selected riskFactors
        let rowRiskTotal = 0; // total value of selected riskFactors

        // Calculate total risk for this row with the risk factor params
        Object.entries(row['Risk Factors']).forEach(([key, val]) => {
            if (riskFactorParamsArr.includes(key)) {
                rowRiskTotal += val;
                rowRiskFactors[key] = val;
            }
        });

        if (!(year in transformedData)) {
            transformedData[year] = { riskFactorsTotals: rowRiskFactors, yearRiskTotal: rowRiskTotal, numOfRowsForYear: 1 };
        } else {
            transformedData[year]['riskFactorsTotals'] = mergeRiskFactorTotals(transformedData[year]['riskFactorsTotals'], rowRiskFactors);
            transformedData[year]['yearRiskTotal'] += rowRiskTotal;
            transformedData[year]['numOfRowsForYear'] += 1;
        }
    });
    // Calc aggregatedRisk factor and individual risk factors for year. Reformat data.
    // Transforming data to following format: [{"year": "2030","aggregatedRisk": 22, "riskFactors": {"Hurricane": 3,"Tornado": 6,}},{ "year": "2050", "aggregatedRisk": 39, "riskFactors": {"Earthquake": 11,}},]
    let finalTransformedData: LineChartData[] = [];
    Object.entries(transformedData).forEach(([year, data]) => {
        let averagedRiskFactors: { [key: string]: number } = {};
        Object.entries(data['riskFactorsTotals']).forEach(([key, val]) => {
            averagedRiskFactors[key] = (val as number) / data['numOfRowsForYear'];
        });

        const obj: LineChartData = {
            year: year,
            aggregatedRisk: data['yearRiskTotal'] / data['numOfRowsForYear'],
            riskFactors: averagedRiskFactors,
        };

        finalTransformedData.push(obj);
    });
    return finalTransformedData;
};
