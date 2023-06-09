'use client';
import React, { useEffect, useState } from 'react';
import Line from '@/app/components/charts/Line';
import { config } from '../../constants/endpoints';
import { LineChartData, LineChartDataset, Risk } from '../../types/RiskRating';
import useFetch from '../../hooks/useFetch';

import { useFilterContext } from '@/app/contexts/FilterContext';

interface Props {
    initialLineResponse: LineChartData[];
}

const LineSection: React.FC<Props> = ({ initialLineResponse }) => {
    const { selectedYear, selectedAsset, selectedBusinessCategory, riskFactorLists, selectedLocation } = useFilterContext();
    const { errorMessage, fetchData } = useFetch();
    const [isInitial, setIsInitial] = useState(true); // To prevent triggering useEffect during the initial rendering

    const [lineData, setLineData] = useState(initialLineResponse); // [{ '2030': 0.27, '2050': 0.06 }]

    useEffect(() => {
        let endPoint = `${config.url.RISKS_LINE}?`;

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

        if (!isInitial) {
            fetchData(endPoint, setLineData);
        }
        setIsInitial(false);
        // Adding this because isInitial should not be false right after initialization
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, selectedLocation, fetchData]);

    if (errorMessage) {
        return <div className="w-full md:pr-6 md:pl-12  md:w-60 text-danger">{errorMessage}</div>;
    }

    return (
        <div className="w-full md:pl-12 md:w-60 md:pr-6 ">
            <Line lineData={lineData} />
        </div>
    );
};

export default LineSection;
