import { NextResponse } from 'next/server';
import risks from '../data-shorter.json'; // change this to data.json

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    if (year) {
        const filtered = risks.filter((risk) => risk['Year'] === parseInt(year));
        return NextResponse.json(filtered);
    }

    return NextResponse.json(risks);
}
