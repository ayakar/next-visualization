import { NextResponse } from 'next/server';

import { filterRiskData } from '../filterRiskData';
import { MapChartData, Risk } from '@/app/types/RiskRating';

export async function GET(request: Request) {
    // console.log('map api called');
    const { searchParams } = new URL(request.url);
    const riskFactorParams = searchParams.get('risk-factor'); //  'Flooding,Volcano'

    const riskFactorParamsArr = riskFactorParams
        ? riskFactorParams.split(',')
        : ['Earthquake', 'Extreme heat', 'Wildfire', 'Tornado', 'Flooding', 'Volcano', 'Hurricane', 'Drought', 'Extreme cold', 'Sea level rise'];

    const filtered: Risk[] = await filterRiskData(request);
    let transformedData: MapChartData = {};
    filtered.forEach((item: Risk) => {
        const latLong = `${item['Lat']},${item['Long']}`;

        let totalRiskRating = 0;
        const itemRiskFactor = Object.entries(item['Risk Factors']);
        itemRiskFactor.forEach(([factor, data]) => {
            if (riskFactorParamsArr.includes(factor)) {
                totalRiskRating += data;
            }
        });

        if (transformedData[latLong]) {
            transformedData[latLong].assetsNum += 1;
            transformedData[latLong].totalRiskRating += totalRiskRating;
            transformedData[latLong].businessCategories[item['Business Category']] = true;
        } else {
            transformedData[latLong] = {
                totalRiskRating: totalRiskRating,
                businessCategories: { [item['Business Category']]: true },
                assetsNum: 1,
            };
        }
    });

    return NextResponse.json(transformedData);
}
