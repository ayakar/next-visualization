'use client';

import { useEffect, useState } from 'react';
import { Risk } from '../types/RiskRating';
import Location from '../components/Location';
import { config } from '@/app/constants/endpoints';
import useFetch from '../hooks/useFetch';
import SelectYear from '../components/SelectYear';
import Table from '../components/Table';

const TablePage = () => {
    const { fetchData } = useFetch();
    const [tableData, setTableData] = useState<Risk[] | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(2030); // TODO: convert to context
    const [sortLabel, setSortLabel] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const limit = 30;

    useEffect(() => {
        fetchData(`${config.url.RISKS}/?year=${selectedYear}&limit=${limit}`, setTableData);
    }, [selectedYear, fetchData]);

    useEffect(() => {
        fetchData(`${config.url.RISKS}/?year=${selectedYear}&order=${sortOrder}&limit=${limit}&sort=${sortLabel}`, setTableData);

        // adding this because selectedYear shouldn't be dependency here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortLabel, sortOrder, fetchData]);

    const onSortClickHandler = (label: string) => {
        if (label === sortLabel) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }
        setSortLabel(label);
    };

    const onPaginationClickHandler = (pageNum: number) => {
        const offset = pageNum * limit;
        fetchData(`${config.url.RISKS}/?year=${selectedYear}&sort=${sortLabel}&order=${sortOrder}&limit=${limit}?offset=${offset}`, setTableData);
    };

    return (
        <div>
            {JSON.stringify(sortOrder)}
            <SelectYear
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <Table
                tableData={tableData}
                onSortClickHandler={onSortClickHandler}
                onPaginationClickHandler={onPaginationClickHandler}
            />
        </div>
    );
};

export default TablePage;
