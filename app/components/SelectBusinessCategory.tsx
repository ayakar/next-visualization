'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { selectClass, SelectChevron } from './FilterSelect';

interface Props {
    initialAvailableBusinessCategories: string[];
}

const SelectBusinessCategory: React.FC<Props> = ({ initialAvailableBusinessCategories }) => {
    const { selectedBusinessCategory, setSelectedBusinessCategory } = useFilterContext();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBusinessCategory(event.target.value);
    };

    return (
        <div className="relative inline-flex">
            <select className={selectClass} value={selectedBusinessCategory} onChange={onChangeHandler} aria-label="Filter by business category">
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
