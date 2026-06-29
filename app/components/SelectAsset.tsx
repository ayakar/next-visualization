'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { selectClass, SelectChevron } from './FilterSelect';

interface Props {
    initialAvailableAssets: string[];
}

const SelectAsset: React.FC<Props> = ({ initialAvailableAssets }) => {
    const { selectedAsset, setSelectedAsset } = useFilterContext();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAsset(event.target.value);
    };

    return (
        <div className="relative inline-flex">
            <select className={selectClass} value={selectedAsset} onChange={onChangeHandler} data-testid="selectAsset" aria-label="Filter by asset">
                <option value="">All Assets</option>
                {initialAvailableAssets.map((availableAsset) => (
                    <option key={availableAsset} value={availableAsset}>
                        {availableAsset}
                    </option>
                ))}
            </select>
            <SelectChevron />
        </div>
    );
};

export default SelectAsset;
