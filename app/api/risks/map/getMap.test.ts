import { Risk } from '@/app/types/RiskRating';
import { getMap } from './getMap';

const makeRisk = (overrides: Partial<Risk>): Risk => ({
    'Asset Name': 'A',
    Lat: 0,
    Long: 0,
    'Business Category': 'Energy',
    'Risk Rating': 0,
    'Risk Factors': {},
    Year: 2030,
    ...overrides,
});

describe('getMap', () => {
    test('keys the result by "lat,long"', () => {
        const filtered = [makeRisk({ Lat: 46.1351, Long: -60.1831, 'Risk Factors': { Earthquake: 0.06 } })];
        const result = getMap(filtered, null);
        expect(Object.keys(result)).toEqual(['46.1351,-60.1831']);
    });

    test('aggregates assetsNum and totalRiskRating for assets at the same coordinates', () => {
        const filtered = [
            makeRisk({ Lat: 46.1, Long: -60.1, 'Business Category': 'Energy', 'Risk Factors': { Earthquake: 0.1 } }),
            makeRisk({ Lat: 46.1, Long: -60.1, 'Business Category': 'Technology', 'Risk Factors': { Flooding: 0.2 } }),
        ];

        const result = getMap(filtered, null);
        const entry = result['46.1,-60.1'];

        expect(entry.assetsNum).toBe(2);
        expect(entry.totalRiskRating).toBeCloseTo(0.3);
        expect(entry.businessCategories).toEqual({ Energy: true, Technology: true });
    });

    test('keeps assets at different coordinates separate', () => {
        const filtered = [
            makeRisk({ Lat: 1, Long: 1, 'Risk Factors': { Earthquake: 0.1 } }),
            makeRisk({ Lat: 2, Long: 2, 'Risk Factors': { Earthquake: 0.2 } }),
        ];

        const result = getMap(filtered, null);
        expect(result['1,1'].assetsNum).toBe(1);
        expect(result['2,2'].assetsNum).toBe(1);
    });

    test('only sums factors listed in riskFactorParams', () => {
        const filtered = [
            makeRisk({
                Lat: 1,
                Long: 1,
                'Risk Factors': { Earthquake: 0.1, Flooding: 0.2, Hurricane: 0.3 },
            }),
        ];

        const result = getMap(filtered, 'Flooding');
        expect(result['1,1'].totalRiskRating).toBeCloseTo(0.2);
    });

    test('returns an empty object for empty input', () => {
        expect(getMap([], null)).toEqual({});
    });
});
