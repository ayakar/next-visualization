import { NextResponse } from 'next/server';
import risks from './data.json';

export async function GET(request) {
    return NextResponse.json(risks[0]);
}
