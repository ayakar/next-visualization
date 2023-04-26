import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { config } from '../constants/endpoints';

interface Props {
    selectedYear: number;
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const SelectYear: React.FC<Props> = ({ selectedYear, setSelectedYear }) => {
    const { fetchData } = useFetch();
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    // api call here to get year
    useEffect(() => {
        fetchData(config.url.RISKS_YEARS, setAvailableYears);
    }, [fetchData]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <select
            value={selectedYear}
            onChange={onChangeHandler}
        >
            {availableYears.map((availableYear) => (
                <option
                    key={availableYear}
                    value={availableYear}
                >
                    {availableYear}
                </option>
            ))}
        </select>
    );
};

export default SelectYear;
