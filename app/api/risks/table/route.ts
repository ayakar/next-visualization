import { NextResponse } from 'next/server';
import { Risk } from '@/app/types/RiskRating';
import { filterRiskData } from '../filterRiskData';
import { getTable } from './getTable';

export async function GET(request: Request) {
    console.log('table api called');
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit'); // null or number of limit
    const offset = searchParams.get('offset') ?? '0'; // default is 0
    const sortBy = searchParams.get('sort');
    const order = searchParams.get('order') ?? 'asc'; // default is asc

    let filtered = await filterRiskData(request);

    if (sortBy) {
        filtered = sortRisks(filtered, sortBy, order);
        console.log('sortBy', filtered.length);
    }

    if (limit) {
        console.log('limit, offset', limit, offset);
        const transformedData = getTable(filtered, limit, offset);

        return NextResponse.json(transformedData);
    }
}

const sortRisks = (data: Risk[], sortBy: string, order: string) => {
    const isAsc = order === 'asc';
    data.sort((a: Risk, b: Risk) => {
        if (a[sortBy as keyof Risk] < b[sortBy as keyof Risk]) {
            return isAsc ? -1 : 1;
        } else if (a[sortBy as keyof Risk] > b[sortBy as keyof Risk]) {
            return isAsc ? 1 : -1;
        } else {
            return 0;
        }
    });
    console.log(data.length);
    return data;
};
