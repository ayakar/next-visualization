'use client';
import React, { useEffect, useState } from 'react';
import Line from '@/app/components/charts/Line';
import { config } from '../../constants/endpoints';
import { LineChartData, LineChartDataset, Risk } from '../../types/RiskRating';
import useFetch from '../../hooks/useFetch';

import { useFilterContext } from '@/app/contexts/FilterContext';

const LineSection = () => {
    const { selectedYear, selectedAsset, selectedBusinessCategory, riskFactorLists } = useFilterContext();
    const { errorMessage, fetchData } = useFetch();

    const [lineData, setLineData] = useState<LineChartDataset | {}>({}); // [{ '2030': 0.27, '2050': 0.06 }]

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

        // const transFormData = (data: Risk[]) => {
        //     let transformedData: LineChartData = {};
        //     data.forEach((item: Risk) => {
        //         const year = item['Year'];
        //         const riskRating = item['Risk Rating'];
        //         const current = transformedData[year] ? transformedData[year] : 0;
        //         transformedData[year] = current + riskRating;
        //     });

        //     setLineData(transformedData);
        // };

        fetchData(endPoint, setLineData);
    }, [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, fetchData]);

    return (
        <div>
            <Line
                title={'TITLE HERE'} // TODO: add this
                lineData={lineData}
            />

            {/* TODO: styled this */}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default LineSection;
