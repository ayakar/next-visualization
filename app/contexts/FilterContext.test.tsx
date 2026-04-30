import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterProvider, useFilterContext } from './FilterContext';

const wrapper = ({ children }: { children: React.ReactNode }) => <FilterProvider>{children}</FilterProvider>;

describe('FilterContext', () => {
    test('exposes the documented default shape inside the provider', () => {
        const { result } = renderHook(() => useFilterContext(), { wrapper });

        expect(result.current.selectedYear).toBe('');
        expect(result.current.selectedAsset).toBe('');
        expect(result.current.selectedBusinessCategory).toBe('');
        expect(result.current.selectedLocation).toBe('');
        expect(result.current.riskFactorLists).toEqual({
            Earthquake: false,
            'Extreme heat': false,
            Tornado: false,
            Flooding: false,
            Volcano: false,
            Hurricane: false,
            Drought: false,
            'Extreme cold': false,
            'Sea level rise': false,
            Wildfire: false,
        });
    });

    test('setSelectedYear updates the year', () => {
        const { result } = renderHook(() => useFilterContext(), { wrapper });

        act(() => result.current.setSelectedYear(2050));
        expect(result.current.selectedYear).toBe(2050);
    });

    test('setSelectedAsset and setSelectedBusinessCategory update independently', () => {
        const { result } = renderHook(() => useFilterContext(), { wrapper });

        act(() => result.current.setSelectedAsset('Acevedo-Kennedy'));
        act(() => result.current.setSelectedBusinessCategory('Energy'));

        expect(result.current.selectedAsset).toBe('Acevedo-Kennedy');
        expect(result.current.selectedBusinessCategory).toBe('Energy');
    });

    test('setRiskFactorLists toggles a single risk factor without dropping others', () => {
        const { result } = renderHook(() => useFilterContext(), { wrapper });

        act(() => {
            result.current.setRiskFactorLists((prev) => ({ ...prev, Flooding: true }));
        });

        expect(result.current.riskFactorLists.Flooding).toBe(true);
        expect(result.current.riskFactorLists.Earthquake).toBe(false);
        expect(Object.keys(result.current.riskFactorLists)).toHaveLength(10);
    });

    test('setSelectedLocation accepts a "lat,long" string', () => {
        const { result } = renderHook(() => useFilterContext(), { wrapper });

        act(() => result.current.setSelectedLocation('46.1351,-60.1831'));
        expect(result.current.selectedLocation).toBe('46.1351,-60.1831');
    });

    test('useFilterContext returns no-op defaults outside a provider', () => {
        const { result } = renderHook(() => useFilterContext());

        expect(result.current.selectedYear).toBe('');
        expect(() => result.current.setSelectedYear(2030)).not.toThrow();
        expect(result.current.selectedYear).toBe('');
    });
});
