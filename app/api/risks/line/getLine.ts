import risks from '@/app/api/data.json';
import { LineChartData, Risk } from '@/app/types/RiskRating';

interface TransformedData {
    [key: number]: {
        riskFactors: { [key: string]: number };
    };
}

export const getLine = (filtered: Risk[] | null, riskFactorParams: string | null) => {
    // getLine() can be called from rsc
    if (filtered === null) {
        filtered = risks;
    }
    const riskFactorParamsArr = riskFactorParams
        ? riskFactorParams.split(',')
        : ['Earthquake', 'Extreme heat', 'Wildfire', 'Tornado', 'Flooding', 'Volcano', 'Hurricane', 'Drought', 'Extreme cold', 'Sea level rise'];

    // Transforming data to following format: [ '2070': {riskFactors: {Earthquake: 42.570000000000036, 'Sea level rise': 52.790000000000006,Tornado: 56.610000000000035,} }]
    let transformedData: TransformedData = {};
    filtered.forEach((item: Risk) => {
        const year = item['Year'];
        const riskFactors = item['Risk Factors'];
        // Initializing transformedData {"YEAR":{}}
        if (!(year in transformedData)) {
            transformedData[year] = { riskFactors: {} };
        }

        // Calculating each risk factor if it's in search param.
        Object.entries(riskFactors).forEach(([key, val]) => {
            if (key in transformedData[year]['riskFactors'] && riskFactorParamsArr.includes(key)) {
                // Calculate value when the risk factor obj exists
                transformedData[year]['riskFactors'][key] += val;
            } else if (riskFactorParamsArr.includes(key)) {
                // Initialize obj when the key doesn't exit in the year obj
                transformedData[year]['riskFactors'] = { ...transformedData[year]['riskFactors'], [key]: val };
            }
        });
    });

    // Transforming data to following format: [{"year": "2030","aggregatedRisk": 22, "riskFactors": {"Hurricane": 3,"Tornado": 6,}},{ "year": "2050", "aggregatedRisk": 39, "riskFactors": {"Earthquake": 11,}},]
    let finalTransformedData: LineChartData[] = [];
    Object.entries(transformedData).forEach(([year, data]) => {
        const aggregatedRisk: number = Object.values<number>(data.riskFactors).reduce((prev, curr) => prev + curr, 0);
        const obj = { year: year, aggregatedRisk: aggregatedRisk, riskFactors: data.riskFactors };
        finalTransformedData.push(obj);
    });

    return finalTransformedData;
};
