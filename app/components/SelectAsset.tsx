'use client';
import React, { useState } from 'react';
import { useFilterContext } from '../contexts/FilterContext';

interface Props {
    initialAvailableAssets: string[];
}

const SelectAsset: React.FC<Props> = ({ initialAvailableAssets }) => {
    const { selectedAsset, setSelectedAsset } = useFilterContext();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAsset(event.target.value);
    };

    return (
        <select
            className="border-dark border-1 focus:border-secondary focus:border rounded-sm px-2 py-1 outline-none max-w-full"
            value={selectedAsset}
            onChange={onChangeHandler}
            data-testid="selectAsset"
        >
            <option value="">All Assets</option>
            {initialAvailableAssets.map((availableAsset) => (
                <option
                    key={availableAsset}
                    value={availableAsset}
                >
                    {availableAsset}
                </option>
            ))}
        </select>
    );
};

export default SelectAsset;
