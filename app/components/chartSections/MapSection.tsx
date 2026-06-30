'use client';

import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { MapChartData } from '../../types/RiskRating';
import Map from '../charts/Map';
import { config } from '@/app/constants/endpoints';
import { useFilters } from '../../hooks/useFilters';
import { riskSearchParams, riskQueryKey, fetchJson } from '../../lib/riskParams';

interface Props {
    initialMapResponse: MapChartData;
}

const MapSection: React.FC<Props> = ({ initialMapResponse }) => {
    const { filters, hasActiveFilters, location, setLocation } = useFilters();

    const { data, isError } = useQuery({
        queryKey: riskQueryKey('map', filters),
        queryFn: ({ signal }) => fetchJson<MapChartData>(`${config.url.RISKS_MAP}?${riskSearchParams(filters)}`, signal),
        initialData: hasActiveFilters ? undefined : initialMapResponse,
        placeholderData: keepPreviousData,
    });

    if (isError) {
        return <div className="text-sm text-risk-high-text">Something went wrong. Please try again.</div>;
    }

    return (
        <div className="relative">
            {location && (
                <div
                    className="absolute flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs shadow-subtle"
                    style={{ top: '0.5rem', right: '0.5rem', zIndex: 1000 }}
                >
                    <div>
                        <div className="text-2xs font-semibold uppercase tracking-wide text-ink-muted">Selected location</div>
                        <span className="font-medium tabular-nums text-ink">{location}</span>
                    </div>
                    <button onClick={() => setLocation(null)} aria-label="Clear selected location" className="text-ink-muted hover:text-brand">
                        <XCircle size={16} />
                    </button>
                </div>
            )}

            <Map mapData={data ?? {}} />

            <div className="mt-3.5 flex flex-wrap gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-risk-low" /> Low &lt; 0.5
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-risk-medium" /> Medium 0.5–0.7
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-risk-high" /> High &gt; 0.7
                </span>
            </div>
        </div>
    );
};

export default MapSection;
