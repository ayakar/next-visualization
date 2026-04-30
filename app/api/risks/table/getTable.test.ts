import { Risk } from '@/app/types/RiskRating';
import { getTable } from './getTable';

const makeRisk = (i: number): Risk => ({
    'Asset Name': `Asset ${i}`,
    Lat: i,
    Long: i,
    'Business Category': 'Energy',
    'Risk Rating': 0,
    'Risk Factors': {},
    Year: 2030,
});

describe('getTable', () => {
    test('returns the first page when offset is 0', () => {
        const filtered = Array.from({ length: 25 }, (_, i) => makeRisk(i));
        const result = getTable(filtered, '10', '0');

        expect(result.data).toHaveLength(10);
        expect(result.data[0]['Asset Name']).toBe('Asset 0');
        expect(result.totalPages).toBe(3);
        expect(result.currentPage).toBe(1);
    });

    test('returns the next slice when offset is non-zero', () => {
        const filtered = Array.from({ length: 25 }, (_, i) => makeRisk(i));
        const result = getTable(filtered, '10', '10');

        expect(result.data[0]['Asset Name']).toBe('Asset 10');
        expect(result.data).toHaveLength(10);
        expect(result.currentPage).toBe(2);
    });

    test('the final page can be smaller than the limit', () => {
        const filtered = Array.from({ length: 25 }, (_, i) => makeRisk(i));
        const result = getTable(filtered, '10', '20');

        expect(result.data).toHaveLength(5);
        expect(result.currentPage).toBe(3);
        expect(result.totalPages).toBe(3);
    });

    test('rounds totalPages up when the row count is not divisible by limit', () => {
        const filtered = Array.from({ length: 11 }, (_, i) => makeRisk(i));
        const result = getTable(filtered, '5', '0');
        expect(result.totalPages).toBe(3);
    });

    test('returns an empty page and 0 totalPages for an empty input', () => {
        const result = getTable([], '10', '0');
        expect(result.data).toEqual([]);
        expect(result.totalPages).toBe(0);
        expect(result.currentPage).toBe(1);
    });
});
