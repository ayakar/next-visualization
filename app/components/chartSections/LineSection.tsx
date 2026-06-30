'use client';
import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Line from '@/app/components/charts/Line';
import { config } from '../../constants/endpoints';
import { LineChartData } from '../../types/RiskRating';
import { useFilters } from '../../hooks/useFilters';
import { riskSearchParams, riskQueryKey, fetchJson } from '../../lib/riskParams';

interface Props {
    initialLineResponse: LineChartData[];
}

const LineSection: React.FC<Props> = ({ initialLineResponse }) => {
    const { filters, hasActiveFilters } = useFilters();

    const { data, isError } = useQuery({
        queryKey: riskQueryKey('line', filters),
        queryFn: ({ signal }) => fetchJson<LineChartData[]>(`${config.url.RISKS_LINE}?${riskSearchParams(filters)}`, signal),
        initialData: hasActiveFilters ? undefined : initialLineResponse,
        placeholderData: keepPreviousData,
    });

    if (isError) {
        return <div className="text-sm text-risk-high-text">Something went wrong. Please try again.</div>;
    }

    return (
        <div className="h-chart">
            <Line lineData={data ?? []} />
        </div>
    );
};

export default LineSection;
