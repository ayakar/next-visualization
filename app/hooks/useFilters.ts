'use client';

import { useCallback } from 'react';
import { useQueryState, parseAsInteger, parseAsString, parseAsArrayOf } from 'nuqs';
import type { Filters } from '@/app/lib/riskParams';

/**
 * Dashboard filter state, backed by URL search params (nuqs).
 * The URL is the single source of truth, so filters are shareable and
 * survive back/forward navigation — no React context needed.
 */
export function useFilters() {
    const [year, setYear] = useQueryState('year', parseAsInteger);
    const [asset, setAsset] = useQueryState('asset', parseAsString.withDefault(''));
    const [category, setCategory] = useQueryState('category', parseAsString.withDefault(''));
    const [riskFactors, setRiskFactors] = useQueryState('risk', parseAsArrayOf(parseAsString).withDefault([]));
    const [location, setLocation] = useQueryState('location', parseAsString.withDefault(''));

    const toggleRiskFactor = useCallback(
        (name: string) => {
            const next = riskFactors.includes(name) ? riskFactors.filter((f) => f !== name) : [...riskFactors, name];
            setRiskFactors(next.length ? next : null);
        },
        [riskFactors, setRiskFactors]
    );

    const clearAll = useCallback(() => {
        setYear(null);
        setAsset(null);
        setCategory(null);
        setRiskFactors(null);
        setLocation(null);
    }, [setYear, setAsset, setCategory, setRiskFactors, setLocation]);

    const filters: Filters = { year, asset, category, riskFactors, location };
    const hasActiveFilters = year !== null || !!asset || !!category || riskFactors.length > 0 || !!location;

    return { ...filters, filters, setYear, setAsset, setCategory, toggleRiskFactor, setLocation, clearAll, hasActiveFilters };
}
