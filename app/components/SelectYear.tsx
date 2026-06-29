'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { selectClass, SelectChevron } from './FilterSelect';

interface Props {
    initialAvailableYears: number[];
}

const SelectYear: React.FC<Props> = ({ initialAvailableYears }) => {
    const { selectedYear, setSelectedYear } = useFilterContext();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '') {
            setSelectedYear(parseInt(event.target.value));
        } else {
            setSelectedYear('');
        }
    };

    return (
        <div className="relative inline-flex">
            <select className={selectClass} value={selectedYear} onChange={onChangeHandler} data-testid="selectYear" aria-label="Filter by year">
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
