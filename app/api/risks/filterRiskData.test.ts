jest.mock('../data.json', () => [
    {
        'Asset Name': 'Mcknight, Beasley and Stewart',
        Lat: 46.1351,
        Long: -60.1831,
        'Business Category': 'Energy',
        'Risk Rating': 0.06,
        'Risk Factors': { Earthquake: 0.06 },
        Year: 2030,
    },
    {
        'Asset Name': 'Acevedo-Kennedy',
        Lat: 50.26729,
        Long: -119.27337,
        'Business Category': 'Technology',
        'Risk Rating': 0.14,
        'Risk Factors': { Flooding: 0.04, Volcano: 0.05, Hurricane: 0.05 },
        Year: 2050,
    },
    {
        'Asset Name': 'Ware PLC',
        Lat: 33.0,
        Long: -83.0,
        'Business Category': 'Energy',
        'Risk Rating': 0.21,
        'Risk Factors': { Flooding: 0.1, Hurricane: 0.11 },
        Year: 2050,
    },
]);

import { filterRiskData } from './filterRiskData';

// filterRiskData only reads `request.url`, so a minimal stub is enough — and avoids
// pulling in a node-only `Request` global under jsdom.
const buildRequest = (params: Record<string, string> = {}): Request => {
    const url = new URL('http://localhost/api/risks');
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return { url: url.toString() } as Request;
};

describe('filterRiskData', () => {
    test('returns every record when no query params are supplied', async () => {
        const result = await filterRiskData(buildRequest());
        expect(result).toHaveLength(3);
    });

    test('filters by year (string-compared against numeric Year)', async () => {
        const result = await filterRiskData(buildRequest({ year: '2050' }));
        expect(result.map((r) => r['Asset Name'])).toEqual(['Acevedo-Kennedy', 'Ware PLC']);
    });

    test('filters by asset, case-insensitively', async () => {
        const result = await filterRiskData(buildRequest({ asset: 'acevedo-kennedy' }));
        expect(result).toHaveLength(1);
        expect(result[0]['Asset Name']).toBe('Acevedo-Kennedy');
    });

    test('filters by business_category, case-insensitively', async () => {
        const result = await filterRiskData(buildRequest({ business_category: 'ENERGY' }));
        expect(result.map((r) => r['Asset Name'])).toEqual(['Mcknight, Beasley and Stewart', 'Ware PLC']);
    });

    test('filters by location using "lat,long" string', async () => {
        const result = await filterRiskData(buildRequest({ location: '50.26729,-119.27337' }));
        expect(result).toHaveLength(1);
        expect(result[0]['Asset Name']).toBe('Acevedo-Kennedy');
    });

    test('returns only rows whose Risk Factors include every requested factor', async () => {
        const result = await filterRiskData(buildRequest({ 'risk-factor': 'Flooding,Hurricane' }));
        expect(result.map((r) => r['Asset Name'])).toEqual(['Acevedo-Kennedy', 'Ware PLC']);
    });

    test('treats risk-factor as AND, not OR', async () => {
        // Acevedo-Kennedy has Volcano; Ware PLC does not. Both have Hurricane.
        const result = await filterRiskData(buildRequest({ 'risk-factor': 'Volcano,Hurricane' }));
        expect(result.map((r) => r['Asset Name'])).toEqual(['Acevedo-Kennedy']);
    });

    test('combines multiple filters', async () => {
        const result = await filterRiskData(buildRequest({ year: '2050', business_category: 'Energy' }));
        expect(result).toHaveLength(1);
        expect(result[0]['Asset Name']).toBe('Ware PLC');
    });

    test('returns an empty array when filters match nothing', async () => {
        const result = await filterRiskData(buildRequest({ year: '1999' }));
        expect(result).toEqual([]);
    });
});
