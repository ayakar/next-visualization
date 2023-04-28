'use client';

import { useEffect, useState } from 'react';
import { Risk } from '../../types/RiskRating';
import Map from '../charts/Map';
import { config } from '@/app/constants/endpoints';
import useFetch from '../../hooks/useFetch';
import { useFilterContext } from '@/app/contexts/FilterContext';
import Spinner from '../Spinner';

const MapSection = () => {
    const { selectedYear, selectedAsset, selectedBusinessCategory, riskFactorLists } = useFilterContext();
    const { isLoading, errorMessage, fetchData } = useFetch();
    const [mapData, setMapData] = useState<Risk[] | null>(null);

    useEffect(() => {
        let endPoint = `${config.url.RISKS}?`;

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

        fetchData(endPoint, setMapData);
    }, [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, fetchData]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Map mapData={mapData} />
            {/* TODO: styled this */}
            {errorMessage && <div>{errorMessage}</div>}
        </>
    );
};

export default MapSection;
