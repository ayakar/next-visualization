'use client';

import { useEffect, useState } from 'react';
import { MapChartData, Risk } from '../../types/RiskRating';
import Map from '../charts/Map';
import { config } from '@/app/constants/endpoints';
import useFetch from '../../hooks/useFetch';
import { useFilterContext } from '@/app/contexts/FilterContext';
import { XCircle } from 'react-bootstrap-icons';
import Image from 'next/image';

interface Props {
    initialMapResponse: MapChartData;
}

const MapSection: React.FC<Props> = ({ initialMapResponse }) => {
    const { selectedYear, selectedAsset, selectedBusinessCategory, riskFactorLists, selectedLocation, setSelectedLocation } = useFilterContext();
    const { errorMessage, fetchData } = useFetch();
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

        if (selectedLocation) {
            endPoint += `&location=${selectedLocation}`;
        }

        if (!isInitial) {
            fetchData(endPoint, setMapData);
        }
        setIsInitial(false);
        // Adding this because isInitial should not be false right after initialization
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAsset, riskFactorLists, selectedBusinessCategory, selectedYear, selectedLocation, fetchData]);

    if (errorMessage) {
        return <div className="w-full md:w-40 text-danger">{errorMessage}</div>;
    }

    return (
        <div className="w-full md:w-40 relative">
            {selectedLocation && (
                <div
                    className="absolute bg-secondaryLight rounded shadow flex items-center gap-1 px-4 pl-2 py-3 text-xs "
                    style={{
                        top: '-.5rem',
                        right: '-1rem',
                        zIndex: 100000,
                    }}
                >
                    <button
                        className=""
                        onClick={() => setSelectedLocation('')}
                    >
                        <XCircle color="#008eaa" />
                    </button>
                    <div>
                        <div style={{ lineHeight: 1 }}>Selected Location</div>
                        <span
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, #8be8f5 50%,  #8be8f5 100%)',
                            }}
                        >
                            {selectedLocation}
                        </span>
                    </div>
                </div>
            )}

            <Map mapData={mapData} />
            <div
                className="flex justify-between"
                style={{ minHeight: '2rem' }}
            >
                <div className="inline-flex items-center text-xs gap-2">
                    <div className="flex gap-1">
                        <Image
                            src="./assets/marker-low.svg"
                            alt="Low Risk"
                            width={16}
                            height={16}
                        />
                        Low Risk
                    </div>
                    <div className="flex gap-1">
                        <Image
                            src="./assets/marker-md.svg"
                            alt="Medium Risk"
                            width={16}
                            height={16}
                        />
                        Medium Risk
                    </div>
                    <div className="flex gap-1">
                        <Image
                            src="./assets/marker-high.svg"
                            alt="High Risk"
                            width={16}
                            height={16}
                        />
                        High Risk
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSection;
