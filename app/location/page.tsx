'use client';

import { useEffect, useState } from 'react';
import { Risk } from '../types/RiskRating';
import Location from '../components/Location';
import { config } from '@/app/constants/endpoints';
import useFetch from '../hooks/useFetch';
import SelectYear from '../components/SelectYear';

const LocationPage = () => {
    const { fetchData } = useFetch();
    const [locationData, setLocationData] = useState<Risk[] | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(2030); // TODO: convert to context

    useEffect(() => {
        // TODO optimize request based on visible region
        fetchData(`${config.url.RISKS}/?year=${selectedYear}`, setLocationData);
    }, [selectedYear, fetchData]);

    return (
        // TODO: replace with loader
        <>
            <SelectYear
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <Location locationData={locationData} />
        </>
    );
};

export default LocationPage;
