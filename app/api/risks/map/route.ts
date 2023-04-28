import { NextResponse } from 'next/server';
import { filterRiskData } from '../filterRiskData';
import { MapChartData, Risk } from '@/app/types/RiskRating';

export async function GET(request: { url: URL }) {
    const filtered: Risk[] = await filterRiskData(request);
    let transformedData: MapChartData = {};
    filtered.forEach((item: Risk) => {
        // const year = item['Year'];
        // const riskRating = item['Risk Rating'];
        // const current = transformedData[year] ? transformedData[year] : 0;
        // transformedData[year] = current + riskRating;
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

            // console.log(totalRiskRate);
            transformedData[latLong].averageRiskRating = totalRiskRate / transformedData[latLong].assets.length;
        } else {
            transformedData[latLong] = { averageRiskRating: item['Risk Rating'], assets: [assetDetailObj] };
        }
    });
    console.log(transformedData);

    return NextResponse.json(transformedData);
}
