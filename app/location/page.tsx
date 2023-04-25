'use client';

import { Suspense, useEffect, useState } from 'react';
import { Risk } from '../types/RiskRating';
import Location from '../components/Location';
import { config } from '@/app/constants/endpoints';

const LocationPage = () => {
    const [locationData, setLocationData] = useState<Risk[] | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(2030); // TODO: convert to context
    const [availableYears, setAvailableYears] = useState<number[]>([]);

    useEffect(() => {
        const fetchYears = async () => {
            const res = await fetch(config.url.RISKS_YEARS);
            const data = await res.json();
            setAvailableYears(data);
        };

        fetchYears();
    }, []);

    useEffect(() => {
        // TODO optimize request based on visible region
        const fetchLocationData = async () => {
            const res = await fetch(`${config.url.RISKS}/?year=${selectedYear}`);
            const data = await res.json();
            setLocationData(data);
        };

        fetchLocationData();
    }, [selectedYear]);

    return (
        // TODO: replace with loader
        <Suspense fallback={<div>loading...</div>}>
            <select
                value={selectedYear}
                onChange={(event) => {
                    console.log(typeof event.target.value);
                    setSelectedYear(parseInt(event.target.value));
                }}
            >
                {availableYears.map((availableYear) => (
                    <option
                        key={availableYear}
                        value={availableYear}
                    >
                        {availableYear}
                    </option>
                ))}
            </select>
            <Location locationData={locationData} />
        </Suspense>
    );
};

export default LocationPage;
