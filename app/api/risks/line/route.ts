import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { filterRiskData } from '../filterRiskData';
import { LineChartData, Risk } from '@/app/types/RiskRating';

interface TransformedData {
    [key: number]: {
        riskFactors: { [key: string]: number };
    };
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const riskFactorParams = searchParams.get('risk-factor'); //  'Flooding,Volcano'
    const riskFactorParamsArr = riskFactorParams
        ? riskFactorParams.split(',')
        : ['Earthquake', 'Extreme heat', 'Wildfire', 'Tornado', 'Flooding', 'Volcano', 'Hurricane', 'Drought', 'Extreme cold', 'Sea level rise'];

    const filtered = await filterRiskData(request);

    let transformedData: TransformedData = {};
    filtered.forEach((item: Risk) => {
        const year = item['Year'];
        const riskFactors = item['Risk Factors'];
        // Initializing transformedData {"YEAR":{}}
        if (!(year in transformedData)) {
            transformedData[year] = {};
        }

        // Making riskFactors obj ex. "riskFactors": { "Hurricane": 44.91000000000002,"Extreme heat": 52.25000000000004,}
        if (!('riskFactors' in transformedData[year])) {
            transformedData[year]['riskFactors'] = {};
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
    // Transforming to send
    let finalTransformedData: LineChartData[] | [] = [];
    Object.entries(transformedData).forEach(([year, data]) => {
        const aggregatedRisk: number = Object.values<number>(data.riskFactors).reduce((prev, curr) => prev + curr, 0);
        const obj = { year: year, aggregatedRisk: aggregatedRisk, riskFactors: data.riskFactors };
        finalTransformedData.push(obj);
    });

    return NextResponse.json(finalTransformedData);
}
