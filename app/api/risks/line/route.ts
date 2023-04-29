import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { filterRiskData } from '../filterRiskData';
import { LineChartData, Risk } from '@/app/types/RiskRating';

export async function GET(request) {
    console.log('line api called');
    const filtered = await filterRiskData(request);
    let transformedData: LineChartData = {};
    filtered.forEach((item: Risk) => {
        const year = item['Year'];
        // Making aggregatedRisk
        const riskRating = item['Risk Rating'];
        const current = transformedData[year] ? transformedData[year]['aggregatedRisk'] : 0;
        const total = current + riskRating;

        // Making riskFactors obj
        // const riskFactors = item['Risk Factors'];
        // Object.entries(riskFactors).forEach(([key, val]) => {
        //     transformedData[year]['riskFactors'][key] = val
        //     const current = transformedData[year] && transformedData[year]['Risk Factors'][key] ? transformedData[year]['Risk Factors'][key] : 0;
        //     const total = current + val;
        //     console.log(key, total);
        // });

        // Insert to transformedData
        transformedData[year] = { aggregatedRisk: total };
    });

    return NextResponse.json(transformedData);
}
