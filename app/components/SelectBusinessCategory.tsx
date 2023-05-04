'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';

interface Props {
    initialAvailableBusinessCategories: string[];
}

const SelectBusinessCategory: React.FC<Props> = ({ initialAvailableBusinessCategories }) => {
    const { selectedBusinessCategory, setSelectedBusinessCategory } = useFilterContext();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBusinessCategory(event.target.value);
    };

    return (
        <select
            className="border-dark border-1 focus:border-secondary focus:border rounded-sm mr-10 px-2 py-1 outline-none "
            value={selectedBusinessCategory}
            onChange={onChangeHandler}
        >
            <option value="">All Business Categories</option>
            {initialAvailableBusinessCategories.map((availableBusinessCategory) => (
                <option
                    key={availableBusinessCategory}
                    value={availableBusinessCategory}
                >
                    {availableBusinessCategory}
                </option>
            ))}
        </select>
    );
};

export default SelectBusinessCategory;
