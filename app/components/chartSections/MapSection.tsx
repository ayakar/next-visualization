'use client';

import { useEffect, useState } from 'react';
import { MapChartData, Risk } from '../../types/RiskRating';
import Map from '../charts/Map';
import { config } from '@/app/constants/endpoints';
import useFetch from '../../hooks/useFetch';
import { useFilterContext } from '@/app/contexts/FilterContext';

interface Props {
    initialMapResponse: MapChartData;
}

const MapSection: React.FC<Props> = ({ initialMapResponse }) => {
    const { selectedYear, selectedAsset, selectedBusinessCategory, riskFactorLists } = useFilterContext();
    const { isLoading, errorMessage, fetchData } = useFetch();
    const [mapData, setMapData] = useState(initialMapResponse);
    const [isInitial, setIsInitial] = useState(true); // To prevent triggering useEffect during the initial rendering

    useEffect(() => {
        let endPoint = `${config.url.RISKS_MAP}?`;

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
        if (!isInitial) {
            fetchData(endPoint, setMapData);
        }
        setIsInitial(false);
        // I am adding this because isInitial should not be false right after initialization
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, fetchData]);

    return (
        <>
            <Map mapData={mapData} />
            {/* TODO: styled this */}
            {errorMessage && <div>{errorMessage}</div>}
        </>
    );
};

export default MapSection;
