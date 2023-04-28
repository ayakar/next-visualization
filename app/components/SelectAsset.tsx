'use client';
import React, { useState } from 'react';
import { useFilterContext } from '../contexts/FilterContext';

interface Props {
    initialAvailableAsset: string[];
}

const SelectAsset: React.FC<Props> = ({ initialAvailableAsset }) => {
    const { selectedAsset, setSelectedAsset } = useFilterContext();
    const [availableAssets] = useState<string[]>(initialAvailableAsset);

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAsset(event.target.value);
    };

    return (
        <select
            value={selectedAsset}
            onChange={onChangeHandler}
        >
            <option value="">Please Select</option>
            {availableAssets.map((availableAsset) => (
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
