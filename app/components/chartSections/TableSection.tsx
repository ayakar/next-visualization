'use client';

import React, { useEffect, useState, MouseEvent } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { TableRiskData } from '../../types/RiskRating';
import { config } from '@/app/constants/endpoints';
import Table from '../charts/Table';
import NoResult from '../NoResult';
import { useFilters } from '../../hooks/useFilters';
import { riskSearchParams, riskQueryKey, fetchJson } from '../../lib/riskParams';

interface Props {
    initialTableResponse: TableRiskData;
}

const LIMIT = 10;

const TableSection: React.FC<Props> = ({ initialTableResponse }) => {
    const { filters, hasActiveFilters } = useFilters();

    const [sortLabel, setSortLabel] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);

    // Reset to the first page whenever the filters change.
    const filterKey = JSON.stringify(filters);
    useEffect(() => {
        setPage(1);
    }, [filterKey]);

    const offset = (page - 1) * LIMIT;
    const extra: Record<string, string> = { limit: String(LIMIT) };
    if (offset) extra.offset = String(offset);
    if (sortLabel) {
        extra.sort = sortLabel;
        extra.order = sortOrder;
    }

    const pristine = !hasActiveFilters && !sortLabel && page === 1;

    const { data, isError } = useQuery({
        queryKey: riskQueryKey('table', filters, { sortLabel, sortOrder, page }),
        queryFn: ({ signal }) => fetchJson<TableRiskData>(`${config.url.RISKS_TABLE}?${riskSearchParams(filters, extra)}`, signal),
        initialData: pristine ? initialTableResponse : undefined,
        placeholderData: keepPreviousData,
    });

    const onSortClickHandler = (label: string) => {
        if (label === sortLabel) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortLabel(label);
            setSortOrder('asc');
        }
        setPage(1);
    };

    const onPaginationClickHandler = (pageNum: number, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setPage(pageNum);
    };

    if (isError) {
        return <div className="p-5 text-sm text-risk-high-text">Something went wrong. Please try again.</div>;
    }

    const rows = data?.data ?? [];
    if (rows.length === 0) {
        return (
            <div className="p-5">
                <NoResult />
            </div>
        );
    }

    return (
        <Table
            tableData={rows}
            totalPages={data?.totalPages ?? 0}
            currentPage={page}
            onSortClickHandler={onSortClickHandler}
            onPaginationClickHandler={onPaginationClickHandler}
            sortLabel={sortLabel}
            sortOrder={sortOrder}
        />
    );
};

export default TableSection;
