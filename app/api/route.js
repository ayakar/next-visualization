import { NextResponse } from 'next/server';
import risks from './data-shorter.json'; // change this to data.json

export async function GET(request) {
    return NextResponse.json(risks);
}
