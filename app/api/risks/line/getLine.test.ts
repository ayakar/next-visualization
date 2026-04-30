import { Risk } from '@/app/types/RiskRating';
import { getLine } from './getLine';

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

describe('getLine', () => {
    test('averages aggregatedRisk across rows for the same year', () => {
        const filtered = [
            makeRisk({ Year: 2030, 'Risk Factors': { Earthquake: 0.2, Flooding: 0.1 } }),
            makeRisk({ Year: 2030, 'Risk Factors': { Earthquake: 0.4, Flooding: 0.3 } }),
        ];

        const result = getLine(filtered, null);

        expect(result).toHaveLength(1);
        expect(result[0].year).toBe('2030');
        // (0.3 + 0.7) / 2
        expect(result[0].aggregatedRisk).toBeCloseTo(0.5);
        expect(result[0].riskFactors.Earthquake).toBeCloseTo(0.3);
        expect(result[0].riskFactors.Flooding).toBeCloseTo(0.2);
    });

    test('emits one entry per distinct year', () => {
        const filtered = [
            makeRisk({ Year: 2030, 'Risk Factors': { Earthquake: 0.1 } }),
            makeRisk({ Year: 2050, 'Risk Factors': { Earthquake: 0.5 } }),
        ];

        const result = getLine(filtered, null);
        expect(result.map((r) => r.year).sort()).toEqual(['2030', '2050']);
    });

    test('only counts factors named in riskFactorParams', () => {
        const filtered = [
            makeRisk({
                Year: 2030,
                'Risk Factors': { Earthquake: 0.5, Flooding: 0.5, Hurricane: 0.5 },
            }),
        ];

        const result = getLine(filtered, 'Flooding,Hurricane');

        expect(result[0].aggregatedRisk).toBeCloseTo(1.0);
        expect(result[0].riskFactors.Earthquake).toBeUndefined();
        expect(result[0].riskFactors.Flooding).toBeCloseTo(0.5);
        expect(result[0].riskFactors.Hurricane).toBeCloseTo(0.5);
    });

    test('returns an empty array when input is an empty array', () => {
        expect(getLine([], null)).toEqual([]);
    });

    test('rows whose risk factors do not match still count toward the average denominator', () => {
        const filtered = [
            makeRisk({ Year: 2030, 'Risk Factors': { Flooding: 0.4 } }),
            makeRisk({ Year: 2030, 'Risk Factors': { Earthquake: 0.4 } }),
        ];

        // Only Flooding is requested. Row 1 contributes 0.4; row 2 contributes 0.
        const result = getLine(filtered, 'Flooding');
        expect(result[0].aggregatedRisk).toBeCloseTo(0.2); // (0.4 + 0) / 2
    });
});
