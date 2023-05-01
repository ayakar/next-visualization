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

    let transformedData: TransformedData = {}; // [ '2070': {riskFactors: {Earthquake: 42.570000000000036, 'Sea level rise': 52.790000000000006,Tornado: 56.610000000000035,} }]
    filtered.forEach((item: Risk) => {
        const year = item['Year'];
        const riskFactors = item['Risk Factors'];
        // Initializing transformedData {"YEAR":{}}
        if (!(year in transformedData)) {
            transformedData[year] = { riskFactors: {} };
            // transformedData[year] = { }; // TODO: test well
        }

        // Making riskFactors obj ex. "riskFactors": { "Hurricane": 44.91000000000002,"Extreme heat": 52.25000000000004,}
        // if (!('riskFactors' in transformedData[year])) {
        //     transformedData[year]['riskFactors'] = {};
        // }

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
    // console.log(transformedData);
    // Transforming to send
    let finalTransformedData: LineChartData[] = [];
    Object.entries(transformedData).forEach(([year, data]) => {
        const aggregatedRisk: number = Object.values<number>(data.riskFactors).reduce((prev, curr) => prev + curr, 0);
        const obj = { year: year, aggregatedRisk: aggregatedRisk, riskFactors: data.riskFactors };
        finalTransformedData.push(obj);
    });

    return finalTransformedData;
};
