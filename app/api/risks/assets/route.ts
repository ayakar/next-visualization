import { NextResponse } from 'next/server';
import risks from '@/app/api/data-shorter.json'; // TODO: back to data.json
import { Risk } from '@/app/types/RiskRating';

export async function GET() {
    console.log('assets');
    const assets: { [key: string]: boolean } = {};
    risks.forEach((risk: Risk) => (assets[risk['Asset Name']] = true));
    const assetsArr = Object.keys(assets);
    const assetArrNum = assetsArr.map((asset) => asset); // [ 'Mcknight, Beasley and Stewart', 'Acevedo-Kennedy', 'Ware PLC' ]
    const sorted = assetArrNum.sort();

    return NextResponse.json(sorted);
}
