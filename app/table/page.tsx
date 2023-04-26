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

    const numOfData = 30;
    const offSet = 0;

    useEffect(() => {
        // TODO optimize request based on visible region
        fetchData(`${config.url.RISKS}/?year=${selectedYear}`, setTableData);
    }, [selectedYear, fetchData]);

    const onClickHandler = (label: string, order: boolean) => {
        fetchData(`${config.url.RISKS}/?year=${selectedYear}&sort=${label}&order=${order}`, setTableData);
    };

    return (
        <div>
            <SelectYear
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <Table
                tableData={tableData}
                onClickHandler={onClickHandler}
            />
        </div>
    );
};

export default TablePage;
