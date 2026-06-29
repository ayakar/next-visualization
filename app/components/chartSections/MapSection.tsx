'use client';

import { useEffect, useState } from 'react';
import { MapChartData, Risk } from '../../types/RiskRating';
import Map from '../charts/Map';
import { config } from '@/app/constants/endpoints';
import useFetch from '../../hooks/useFetch';
import { useFilterContext } from '@/app/contexts/FilterContext';
import { XCircle } from 'lucide-react';

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
        return <div className="text-sm text-risk-high-text">{errorMessage}</div>;
    }

    return (
        <div className="relative">
            {selectedLocation && (
                <div
                    className="absolute flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs shadow-subtle"
                    style={{ top: '0.5rem', right: '0.5rem', zIndex: 1000 }}
                >
                    <div>
                        <div className="text-2xs font-semibold uppercase tracking-wide text-ink-muted">Selected location</div>
                        <span className="font-medium tabular-nums text-ink">{selectedLocation}</span>
                    </div>
                    <button
                        onClick={() => setSelectedLocation('')}
                        aria-label="Clear selected location"
                        className="text-ink-muted hover:text-brand"
                    >
                        <XCircle size={16} />
                    </button>
                </div>
            )}

            <Map mapData={mapData} />

            <div className="mt-3.5 flex flex-wrap gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-risk-low" /> Low &lt; 0.5
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-risk-medium" /> Medium 0.5-0.7
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-risk-high" /> High &gt; 0.7
                </span>
            </div>
        </div>
    );
};

export default MapSection;
