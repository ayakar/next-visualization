import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { filterRiskData } from '../filterRiskData';
import { LineChartData, Risk } from '@/app/types/RiskRating';

interface TransformedData {
    [key: number]: {
        aggregatedRisk: number;
        riskFactors: { [key: string]: number };
    };
}

export async function GET(request) {
    console.log('line api called');
    const filtered = await filterRiskData(request);
    let transformedData: TransformedData = {};
    filtered.forEach((item: Risk) => {
        const year = item['Year'];
        const riskRating = item['Risk Rating'];
        const riskFactors = item['Risk Factors'];
        // Making aggregatedRisk
        if (year in transformedData) {
            transformedData[year]['aggregatedRisk'] += riskRating;
        } else {
            transformedData[year] = { aggregatedRisk: riskRating };
        }

        // Making riskFactors obj
        if (!('riskFactors' in transformedData[year])) {
            transformedData[year]['riskFactors'] = {};
        }
        Object.entries(riskFactors).forEach(([key, val]) => {
            if (key in transformedData[year]['riskFactors']) {
                transformedData[year]['riskFactors'][key] += val;
            } else {
                transformedData[year]['riskFactors'] = { ...transformedData[year]['riskFactors'], [key]: val };
            }
        });
    });
    // Transforming to send
    let finalTransformedData: LineChartData[] | [] = [];
    Object.entries(transformedData).forEach(([key, value]) => {
        const obj = { year: key, aggregatedRisk: value.aggregatedRisk, riskFactors: value.riskFactors };
        finalTransformedData.push(obj);
    });

    return NextResponse.json(finalTransformedData);
}
