'use client';
import React, { useState } from 'react';
import { useFilterContext } from '../contexts/FilterContext';

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
        <select
            className="border-dark border-1 focus:border-secondary focus:border rounded-sm px-2 py-1 outline-none "
            value={selectedYear}
            onChange={onChangeHandler}
            data-testid="selectYear"
        >
            <option value="">All Years</option>
            {initialAvailableYears.map((availableYear) => (
                <option
                    key={availableYear}
                    value={availableYear}
                >
                    {availableYear}
                </option>
            ))}
        </select>
    );
};

export default SelectYear;
