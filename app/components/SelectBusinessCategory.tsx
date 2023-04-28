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
            value={selectedBusinessCategory}
            onChange={onChangeHandler}
        >
            <option value="">Please Select</option>
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
