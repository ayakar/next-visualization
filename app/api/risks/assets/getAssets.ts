import { NextResponse } from 'next/server';
import risks from '@/app/api/data.json';
import { Risk } from '@/app/types/RiskRating';

export const getAssets = () => {
    const assets: { [key: string]: boolean } = {};
    risks.forEach((risk: Risk) => (assets[risk['Asset Name']] = true));
    const assetsArr = Object.keys(assets);
    const assetArrNum = assetsArr.map((asset) => asset); // [ 'Mcknight, Beasley and Stewart', 'Acevedo-Kennedy', 'Ware PLC' ]
    const sorted = assetArrNum.sort();

    return sorted;
};
