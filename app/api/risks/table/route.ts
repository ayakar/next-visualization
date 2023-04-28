import { NextResponse } from 'next/server';
import { Risk } from '@/app/types/RiskRating';
import { filterRiskData } from '../filterRiskData';

export async function GET(request: { url: URL }) {
    console.log('table api called');
    let totalPages;
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
        totalPages = Math.ceil(filtered.length / parseInt(limit));
        filtered = trimRisks(filtered, limit, offset);

        return NextResponse.json({ data: filtered, totalPages, currentPage: parseInt(offset) / parseInt(limit) + 1 });
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
const trimRisks = (data: Risk[], limit: string, offset: string) => {
    // TODO: optimize by combine with sortRisks() if possible
    const startIndex = parseInt(offset);
    const endIndex = parseInt(offset) + parseInt(limit);
    const trimmedData = data.slice(startIndex, endIndex);
    return trimmedData;
};
