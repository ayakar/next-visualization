import React, { MouseEvent } from 'react';
import { Risk } from '../../../types/RiskRating';
import Pagination from './Pagination';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface Props {
    tableData: Risk[] | null;
    totalPages: number;
    currentPage: number;
    onSortClickHandler: (label: string) => void;
    onPaginationClickHandler: (pageNum: number, event: MouseEvent<HTMLButtonElement>) => void;
    sortLabel: string | null;
    sortOrder: 'asc' | 'desc';
}

const labels = ['Asset Name', 'Lat', 'Long', 'Business Category', 'Risk Rating', 'Risk Factors', 'Year'];

const riskTier = (rating: number) => {
    if (rating < 0.5) return { label: 'low', variant: 'low' as const, dot: 'bg-risk-low' };
    if (rating <= 0.7) return { label: 'medium', variant: 'medium' as const, dot: 'bg-risk-medium' };
    return { label: 'high', variant: 'high' as const, dot: 'bg-risk-high' };
};

const RiskBadge = ({ rating }: { rating: number }) => {
    const t = riskTier(rating);
    return (
        <Badge variant={t.variant}>
            <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
            {rating.toFixed(2)}
            <span className="sr-only"> risk — {t.label}</span>
        </Badge>
    );
};

const Table: React.FC<Props> = ({ tableData, totalPages, currentPage, onSortClickHandler, onPaginationClickHandler, sortLabel, sortOrder }) => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full min-w-table border-collapse text-sm">
                    <thead>
                        <tr>
                            {labels.map((label) => {
                                const sortable = label !== 'Risk Factors';
                                const active = sortLabel === label;
                                const ariaSort = active ? (sortOrder === 'asc' ? 'ascending' : 'descending') : undefined;
                                return (
                                    <th
                                        key={label}
                                        aria-sort={ariaSort}
                                        className={`border-b border-border bg-brand-lighter px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                                            active ? 'text-brand' : 'text-ink-soft'
                                        } ${label === 'Risk Factors' ? 'hidden md:table-cell' : ''}`}
                                    >
                                        {sortable ? (
                                            <button
                                                type="button"
                                                onClick={() => onSortClickHandler(label)}
                                                aria-label={`Sort by ${label}${active ? (sortOrder === 'asc' ? ', ascending' : ', descending') : ''}`}
                                                className="inline-flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                {label}
                                                {active ? (
                                                    sortOrder === 'asc' ? (
                                                        <ChevronUp size={13} />
                                                    ) : (
                                                        <ChevronDown size={13} />
                                                    )
                                                ) : (
                                                    <ChevronsUpDown size={13} className="opacity-40" />
                                                )}
                                            </button>
                                        ) : (
                                            label
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((item, index) => {
                            const riskFactorsArr = Object.entries(item['Risk Factors']).sort();
                            return (
                                <tr key={index} className="transition-colors hover:bg-brand-lighter">
                                    <td className="border-b border-border px-4 py-3 font-medium text-ink">{item['Asset Name']}</td>
                                    <td className="border-b border-border px-4 py-3 tabular-nums text-ink-soft">{item['Lat']}</td>
                                    <td className="border-b border-border px-4 py-3 tabular-nums text-ink-soft">{item['Long']}</td>
                                    <td className="border-b border-border px-4 py-3 text-ink-soft">{item['Business Category']}</td>
                                    <td className="border-b border-border px-4 py-3">
                                        <RiskBadge rating={item['Risk Rating']} />
                                    </td>
                                    <td className="hidden border-b border-border px-4 py-3 text-ink-muted md:table-cell">
                                        <ul className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs">
                                            {riskFactorsArr.map(([key, val]) => (
                                                <li key={key} className="tabular-nums">
                                                    {key}: {val.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="border-b border-border px-4 py-3 tabular-nums text-ink-soft">{item['Year']}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1.5 border-t border-border px-5 py-3.5">
                <Pagination currentPage={currentPage} totalPages={totalPages} onClickHandler={onPaginationClickHandler} />
            </div>
        </>
    );
};

export default Table;
