'use client';
import React from 'react';
import { useFilters } from '../hooks/useFilters';
import { selectClass, SelectChevron } from './FilterSelect';

interface Props {
    initialAvailableAssets: string[];
}

const SelectAsset: React.FC<Props> = ({ initialAvailableAssets }) => {
    const { asset, setAsset } = useFilters();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAsset(event.target.value || null);
    };

    return (
        <div className="relative inline-flex">
            <select className={selectClass} value={asset} onChange={onChangeHandler} data-testid="selectAsset" aria-label="Filter by asset">
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
