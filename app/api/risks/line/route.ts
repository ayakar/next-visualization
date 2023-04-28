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
        const riskRating = item['Risk Rating'];
        const current = transformedData[year] ? transformedData[year] : 0;
        transformedData[year] = current + riskRating;
    });

    return NextResponse.json(transformedData);
}
