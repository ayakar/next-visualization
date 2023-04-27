import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { config } from '../constants/endpoints';

interface Props {
    selectedBusinessCategory: string;
    setSelectedBusinessCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBusinessCategory: React.FC<Props> = ({ selectedBusinessCategory, setSelectedBusinessCategory }) => {
    const { fetchData } = useFetch();
    const [availableBusinessCategories, setAvailableBusinessCategories] = useState<number[]>([]);

    useEffect(() => {
        fetchData(config.url.RISKS_CATEGORIES, setAvailableBusinessCategories);
    }, [fetchData]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBusinessCategory(event.target.value);
    };

    return (
        <select
            value={selectedBusinessCategory}
            onChange={onChangeHandler}
        >
            <option value="">Please Select</option>
            {availableBusinessCategories.map((availableAsset) => (
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

export default SelectBusinessCategory;
