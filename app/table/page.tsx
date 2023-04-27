'use client';

import { useEffect, useState, useCallback } from 'react';
import { Risk, TableRiskData } from '../types/RiskRating';
import { config } from '@/app/constants/endpoints';
import useFetch from '../hooks/useFetch';
import SelectYear from '../components/SelectYear';
import Table from '../components/Table';
import SelectAsset from '../components/SelectAsset';
import SelectBusinessCategory from '../components/SelectBusinessCategory';
import Spinner from '../components/Spinner';

const TablePage = () => {
    const { fetchData, isLoading } = useFetch();
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
    // For sorting
    const [sortLabel, setSortLabel] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    //For pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const limit = 10;

    const getTableData = useCallback(
        (offset: number | null = null) => {
            let endPoint = `${config.url.RISKS}?year=${selectedYear}&limit=${limit}`;

            // Filter: business category, asset, risk factor
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
            // sort
            if (sortLabel) {
                endPoint += `&sort=${sortLabel}&order=${sortOrder}`;
            }

            // offset
            if (offset) {
                endPoint += `&offset=${offset}`;
            }
            console.log(endPoint);
            const transformData = (resData: TableRiskData) => {
                setTableData(resData.data);
                setTotalPages(resData.totalPages);
                setCurrentPage(resData.currentPage);
                console.log('total pages:', resData.totalPages);
                console.log('current page:', resData.currentPage);
            };

            fetchData(endPoint, transformData);
        },
        [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, sortLabel, sortOrder, fetchData]
    );

    // Initial
    useEffect(() => {
        getTableData();
    }, [getTableData]);

    const onSortClickHandler = (label: string) => {
        if (label === sortLabel) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }
        setSortLabel(label);
    };

    const onPaginationClickHandler = (pageNum: number) => {
        const offset = (pageNum - 1) * limit;
        getTableData(offset);
    };

    return (
        <div>
            <div>
                <SelectYear
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                />

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
            </div>

            {isLoading ? (
                <Spinner />
            ) : tableData.length > 0 ? (
                <Table
                    tableData={tableData}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onSortClickHandler={onSortClickHandler}
                    onPaginationClickHandler={onPaginationClickHandler}
                />
            ) : (
                // Style this
                <div>No Result. Please try different term</div>
            )}
        </div>
    );
};

export default TablePage;
