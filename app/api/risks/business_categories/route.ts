import { NextResponse } from 'next/server';
import risks from '@/app/api/data-shorter.json'; // TODO: change this to data.json
import { Risk } from '@/app/types/RiskRating';

export async function GET() {
    const businessCategory: { [key: string]: boolean } = {};
    risks.forEach((risk: Risk) => (businessCategory[risk['Business Category']] = true));
    const businessCategoriesArr = Object.keys(businessCategory);
    const businessCategoriesArrNum = businessCategoriesArr.map((businessCategoryArr) => businessCategoryArr); // [ 'Mcknight, Beasley and Stewart', 'Acevedo-Kennedy', 'Ware PLC' ]

    return NextResponse.json(businessCategoriesArrNum);
}
