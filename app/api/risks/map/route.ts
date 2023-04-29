import { NextResponse } from 'next/server';

import { filterRiskData } from '../filterRiskData';
import { MapChartData, Risk } from '@/app/types/RiskRating';

export async function GET(request) {
    console.log('map api called');
    const filtered: Risk[] = await filterRiskData(request);
    let transformedData: MapChartData = {};
    filtered.forEach((item: Risk) => {
        const latLong = `${item['Lat']},${item['Long']}`;

        const assetDetailObj = {
            assetName: item['Asset Name'],
            businessCategory: item['Business Category'],
            riskRating: item['Risk Rating'],
        };

        if (transformedData[latLong]) {
            transformedData[latLong].assets = [...transformedData[latLong].assets, assetDetailObj];
            let totalRiskRate = 0;
            transformedData[latLong].assets.forEach((asset) => (totalRiskRate += asset.riskRating));

            transformedData[latLong].averageRiskRating = totalRiskRate / transformedData[latLong].assets.length;
            transformedData[latLong].businessCategories[item['Business Category']] = true;
        } else {
            transformedData[latLong] = {
                averageRiskRating: item['Risk Rating'],
                businessCategories: { [item['Business Category']]: true },
                assets: [assetDetailObj],
            };
        }
    });

    return NextResponse.json(transformedData);
}
