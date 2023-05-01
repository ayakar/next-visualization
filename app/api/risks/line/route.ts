import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { filterRiskData } from '../filterRiskData';

import { getLine } from './getLine';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const riskFactorParams = searchParams.get('risk-factor'); //  'Flooding,Volcano'
    const filtered = await filterRiskData(request);
    const finalTransformedData = getLine(filtered, riskFactorParams);

    return NextResponse.json(finalTransformedData);
}
