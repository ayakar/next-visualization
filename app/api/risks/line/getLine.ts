import risks from '@/app/api/data.json';
import { LineChartData, Risk } from '@/app/types/RiskRating';

interface TransformedData {
    [key: number]: {
        riskFactors: { [key: string]: { sum: number; count: number } };
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

    // Transforming data to following format: [ '2070': {riskFactors: {Earthquake: {sum:42.570000000000036, count:546}, 'Sea level rise': 52.790000000000006,Tornado: 56.610000000000035,} }]
    let transformedData: TransformedData = {};
    // let riskFactorCounts = {}; //TODO: Remove me
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
                transformedData[year]['riskFactors'][key]['sum'] += val;
                transformedData[year]['riskFactors'][key]['count'] += 1;
                // riskFactorCounts[year][key] += 1;
            } else if (riskFactorParamsArr.includes(key)) {
                // Initialize obj when the key doesn't exit in the year obj
                transformedData[year]['riskFactors'] = { ...transformedData[year]['riskFactors'], [key]: { sum: val, count: 1 } };
                // riskFactorCounts[year] = { ...riskFactorCounts[year], [key]: 1 }; //TODO: Remove me
            }
        });
    });
    // console.log(riskFactorCounts);

    // Transforming data to following format: [{"year": "2030","aggregatedRisk": 22, "riskFactors": {"Hurricane": 3,"Tornado": 6,}},{ "year": "2050", "aggregatedRisk": 39, "riskFactors": {"Earthquake": 11,}},]
    let finalTransformedData: LineChartData[] = [];
    Object.entries(transformedData).forEach(([year, data]) => {
        const aggregatedRisk: number = Object.values<number>(data.riskFactors).reduce((prev, curr) => prev + curr, 0);
        let aggregatedRiskFactors = {};
        Object.keys(data.riskFactors).forEach(
            (riskFactor) => (aggregatedRiskFactors[riskFactor] = data.riskFactors[riskFactor].sum / data.riskFactors[riskFactor].count)
        );
        console.log(aggregatedRiskFactors);
        const obj = {
            year: year,
            aggregatedRisk: Object.values(aggregatedRiskFactors).reduce((prev, curr) => prev + curr) / Object.values(aggregatedRiskFactors).length,
            riskFactors: aggregatedRiskFactors,
        };
        finalTransformedData.push(obj);
    });

    return finalTransformedData;
};
