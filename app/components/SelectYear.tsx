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
            value={selectedYear}
            onChange={onChangeHandler}
        >
            <option value="">Please Select Year</option>
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
