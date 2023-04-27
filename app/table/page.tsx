'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Risk } from '../types/RiskRating';
import { config } from '@/app/constants/endpoints';
import useFetch from '../hooks/useFetch';
import SelectYear from '../components/SelectYear';
import Table from '../components/Table';
import SelectAsset from '../components/SelectAsset';
import SelectBusinessCategory from '../components/SelectBusinessCategory';

const TablePage = () => {
    const { fetchData } = useFetch();
    const [tableData, setTableData] = useState<Risk[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2030); // TODO: convert to context
    const [riskFactorLists, setRiskFactorLists] = useState<{ [key: string]: boolean }>({
        Earthquake: false,
        'Extreme heat': false,
        Wildfire: false,
        Tornado: false,
        Flooding: false,
        Volcano: false,
        Hurricane: false,
        Drought: false,
        'Extreme cold': false,
        'Sea level rise': false,
    });
    const [selectedAsset, setSelectedAsset] = useState('');
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('');

    const [sortLabel, setSortLabel] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const limit = 30;

    useEffect(() => {
        fetchData(`${config.url.RISKS}?year=${selectedYear}&limit=${limit}`, setTableData);
    }, [fetchData]);

    useEffect(() => {
        fetchData(`${config.url.RISKS}?year=${selectedYear}&order=${sortOrder}&limit=${limit}&sort=${sortLabel}`, setTableData);

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
        // const offset = pageNum * limit;
        // fetchData(`${config.url.RISKS}?year=${selectedYear}&sort=${sortLabel}&order=${sortOrder}&limit=${limit}?offset=${offset}`, setTableData);
    };

    const onFilterSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let endPoint = `${config.url.RISKS}?year=${selectedYear}&limit=${limit}`;
        if (selectedBusinessCategory) {
            endPoint += `&business_category=${selectedBusinessCategory}`;
        }
        if (selectedAsset) {
            endPoint += `&asset=${selectedAsset}`;
        }
        const checkedRiskFactors = Object.keys(riskFactorLists).filter((list) => riskFactorLists[list] === true);

        if (checkedRiskFactors.length > 0) {
            endPoint += `&risk-factor=${checkedRiskFactors.toString()}`;
        }

        fetchData(endPoint, setTableData);
    };

    // 1. initial load ... filtered by year, sort asc
    // 2. pagination ...
    // 3. filter submit ...
    // 4. sort

    return (
        <div>
            <SelectYear
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />

            <form onSubmit={onFilterSubmitHandler}>
                <SelectBusinessCategory
                    selectedBusinessCategory={selectedBusinessCategory}
                    setSelectedBusinessCategory={setSelectedBusinessCategory}
                />
                <SelectAsset
                    selectedAsset={selectedAsset}
                    setSelectedAsset={setSelectedAsset}
                />
                {Object.entries(riskFactorLists).map(([factorName, isChecked], index) => {
                    return (
                        <div key={factorName}>
                            <input
                                type="checkbox"
                                id={factorName}
                                checked={isChecked}
                                onChange={() => setRiskFactorLists((prev) => ({ ...prev, [factorName]: !prev[factorName as keyof typeof riskFactorLists] }))}
                            />
                            <label htmlFor={factorName}>{factorName}</label>
                        </div>
                    );
                })}

                <button
                    type="submit"
                    className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded"
                >
                    Filter Submit
                </button>
            </form>
            {tableData.length > 0 ? (
                <Table
                    tableData={tableData}
                    onSortClickHandler={onSortClickHandler}
                    onPaginationClickHandler={onPaginationClickHandler}
                />
            ) : (
                // TODO: style this
                <div>No result. Please select different term</div>
            )}
        </div>
    );
};

export default TablePage;
