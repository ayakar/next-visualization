import { NextResponse } from 'next/server';

import { filterRiskData } from '../filterRiskData';
import { MapChartData, Risk } from '@/app/types/RiskRating';
import { getMap } from './getMap';

export async function GET(request: Request) {
    // console.log('map api called');
    const { searchParams } = new URL(request.url);
    const riskFactorParams = searchParams.get('risk-factor'); //  'Flooding,Volcano'
    const filtered: Risk[] = await filterRiskData(request);

    const transformedData = getMap(filtered, riskFactorParams);

    return NextResponse.json(transformedData);
}
