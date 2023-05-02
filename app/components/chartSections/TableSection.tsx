'use client';

import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { Risk, TableRiskData } from '../../types/RiskRating';
import { config } from '@/app/constants/endpoints';
import useFetch from '../../hooks/useFetch';
import Table from '../charts/Table';
import { useFilterContext } from '@/app/contexts/FilterContext';
import NoResult from '../NoResult';

interface Props {
    initialTableResponse: TableRiskData;
}

const TableSection: React.FC<Props> = ({ initialTableResponse }) => {
    const { selectedYear, selectedAsset, selectedBusinessCategory, riskFactorLists, selectedLocation } = useFilterContext();
    const { errorMessage, fetchData } = useFetch();
    const [isInitial, setIsInitial] = useState(true); // To prevent triggering useEffect during the initial rendering
    const [tableData, setTableData] = useState<Risk[]>(initialTableResponse.data);

    // For sorting
    const [sortLabel, setSortLabel] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    //For pagination
    const [totalPages, setTotalPages] = useState(initialTableResponse.totalPages);
    const [currentPage, setCurrentPage] = useState(initialTableResponse.currentPage);

    const limit = 10;

    const getTableData = useCallback(
        (offset: number | null = null) => {
            let endPoint = `${config.url.RISKS_TABLE}?limit=${limit}`;

            // Filter: business category, asset, risk factor, year
            if (selectedYear) {
                endPoint += `&year=${selectedYear}`;
            }
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
            if (selectedLocation) {
                endPoint += `&location=${selectedLocation}`;
            }
            // sort
            if (sortLabel) {
                endPoint += `&sort=${sortLabel}&order=${sortOrder}`;
            }

            // offset
            if (offset) {
                endPoint += `&offset=${offset}`;
            }
            // console.log(endPoint);
            const transformData = (resData: TableRiskData) => {
                setTableData(resData.data);
                setTotalPages(resData.totalPages);
                setCurrentPage(resData.currentPage);
                console.log('total pages:', resData.totalPages);
                console.log('current page:', resData.currentPage);
            };

            fetchData(endPoint, transformData);
        },
        [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, sortLabel, sortOrder, selectedLocation, fetchData]
    );

    // Initial
    useEffect(() => {
        if (!isInitial) {
            getTableData();
        }
        setIsInitial(false);
        // I am adding this because isInitial should not be false right after initialization
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTableData]);

    const onSortClickHandler = (label: string) => {
        if (label === sortLabel) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }
        setSortLabel(label);
    };

    const onPaginationClickHandler = (pageNum: number, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const offset = (pageNum - 1) * limit;
        getTableData(offset);
    };

    return (
        <div className="w-full text-sm overflow-x-scroll md:overflow-x-visible">
            {tableData.length > 0 ? (
                <Table
                    tableData={tableData}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onSortClickHandler={onSortClickHandler}
                    onPaginationClickHandler={onPaginationClickHandler}
                    sortLabel={sortLabel}
                    sortOrder={sortOrder}
                />
            ) : (
                <NoResult />
            )}
            {/* TODO: ADD ERROR MSG */}
        </div>
    );
};

export default TableSection;
