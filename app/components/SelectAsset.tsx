import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { config } from '../constants/endpoints';

interface Props {
    selectedAsset: string;
    setSelectedAsset: React.Dispatch<React.SetStateAction<string>>;
}

const SelectAsset: React.FC<Props> = ({ selectedAsset, setSelectedAsset }) => {
    const { fetchData } = useFetch();
    const [availableAssets, setAvailableAssets] = useState<number[]>([]);

    useEffect(() => {
        fetchData(config.url.RISKS_ASSETS, setAvailableAssets);
    }, [fetchData]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAsset(event.target.value);
    };

    return (
        <select
            value={selectedAsset}
            onChange={onChangeHandler}
        >
            {' '}
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
