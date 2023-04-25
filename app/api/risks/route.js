import { NextResponse } from 'next/server';
import risks from '../data-shorter.json'; // change this to data.json

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const asset = searchParams.get('asset');
    const business_category = searchParams.get('business_category');
    if (year) {
        const filtered = risks.filter((risk) => risk['Year'] === parseInt(year));
        return NextResponse.json(filtered);
    }
    if (asset) {
        const filtered = risks.filter((risk) => risk['Asset Name'] === asset);
        return NextResponse.json(filtered);
    }
    if (business_category) {
        const filtered = risks.filter((risk) => risk['Business Category'] === business_category);
        return NextResponse.json(filtered);
    }

    return NextResponse.json(risks);
}
