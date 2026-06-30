'use client';
import React from 'react';
import { useFilters } from '../hooks/useFilters';
import { selectClass, SelectChevron } from './FilterSelect';

interface Props {
    initialAvailableYears: number[];
}

const SelectYear: React.FC<Props> = ({ initialAvailableYears }) => {
    const { year, setYear } = useFilters();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(event.target.value === '' ? null : parseInt(event.target.value, 10));
    };

    return (
        <div className="relative inline-flex">
            <select className={selectClass} value={year ?? ''} onChange={onChangeHandler} data-testid="selectYear" aria-label="Filter by year">
                <option value="">All Years</option>
                {initialAvailableYears.map((availableYear) => (
                    <option key={availableYear} value={availableYear}>
                        {availableYear}
                    </option>
                ))}
            </select>
            <SelectChevron />
        </div>
    );
};

export default SelectYear;
