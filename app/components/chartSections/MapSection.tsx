'use client';

import { useEffect, useState } from 'react';
import { Risk } from '../../types/RiskRating';
import Map from '../charts/Map';
import { config } from '@/app/constants/endpoints';
import useFetch from '../../hooks/useFetch';
import SelectYear from '../SelectYear';

const MapSection = () => {
    const { fetchData } = useFetch();
    const [mapData, setMapData] = useState<Risk[] | null>(null);

    // Will be global state
    const [selectedYear, setSelectedYear] = useState<number>(2030); // TODO: convert to context
    //end: Will be global state

    useEffect(() => {
        // TODO optimize request based on visible region
        fetchData(`${config.url.RISKS}?year=${selectedYear}`, setMapData);
    }, [selectedYear, fetchData]);

    return (
        // TODO: replace with loader
        <>
            <SelectYear
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <Map mapData={mapData} />
        </>
    );
};

export default MapSection;
