'use client';
import React from 'react';
import { useFilters } from '../hooks/useFilters';
import { selectClass, SelectChevron } from './FilterSelect';

interface Props {
    initialAvailableBusinessCategories: string[];
}

const SelectBusinessCategory: React.FC<Props> = ({ initialAvailableBusinessCategories }) => {
    const { category, setCategory } = useFilters();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value || null);
    };

    return (
        <div className="relative inline-flex">
            <select className={selectClass} value={category} onChange={onChangeHandler} aria-label="Filter by business category">
                <option value="">All Categories</option>
                {initialAvailableBusinessCategories.map((availableBusinessCategory) => (
                    <option key={availableBusinessCategory} value={availableBusinessCategory}>
                        {availableBusinessCategory}
                    </option>
                ))}
            </select>
            <SelectChevron />
        </div>
    );
};

export default SelectBusinessCategory;
