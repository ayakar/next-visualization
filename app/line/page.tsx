'use client';
import React, { useEffect, useState } from 'react';
import Line from '@/app/components/Line';
import { config } from '../constants/endpoints';
import { Risk } from '../types/RiskRating';
import useFetch from '../hooks/useFetch';

const LinePage = () => {
    const { errorMessage, fetchData } = useFetch();
    const [selectedFilteredBy, setSelectedFilteredBy] = useState(''); // Possible values: location, asset, business_category
    const [availableOptions, setAvailableOptions] = useState([]); // all options will be dynamically generated based on selectedFilteredBy value
    const [selectedOptions, setSelectedOptions] = useState(''); // selected options to fetch risksData

    const [lineData, setLineData] = useState({}); // { '2030': 0.27, '2050': 0.06 }

    useEffect(() => {
        let endPoint = '';
        switch (selectedFilteredBy) {
            case 'asset':
                endPoint = config.url.RISKS_ASSETS;
                break;
            case 'location':
                endPoint = config.url.RISKS_LOCATIONS; // TODO implement this
                break;
            case 'business_category':
                endPoint = config.url.RISKS_CATEGORIES;
                break;
            default:
                break;
        }

        if (selectedFilteredBy) {
            fetchData(endPoint, setAvailableOptions);
        }
    }, [selectedFilteredBy, fetchData]);

    useEffect(() => {
        const transFormData = (data: Risk[]) => {
            console.log('datais: ', data); // TODO: remove
            let transformedData: { [key: number]: number } = {};
            data.forEach((item: Risk) => {
                const year = item['Year'];
                const riskRating = item['Risk Rating'];
                const current = transformedData[year] ? transformedData[year] : 0;
                transformedData[year] = current + riskRating;
            });
            setLineData(transformedData);
        };

        if (selectedOptions) {
            fetchData(`${config.url.RISKS}/?${selectedFilteredBy}=${selectedOptions}`, transFormData);
        }
    }, [selectedOptions, selectedFilteredBy, fetchData]);

    return (
        <div>
            <label htmlFor="filteredBy">Filtered by:</label>
            <select
                id="filteredBy"
                onChange={(event) => setSelectedFilteredBy(event.target.value)}
                value={selectedFilteredBy}
            >
                <option value="">Please Select</option>
                <option value="location">location</option>
                <option value="asset">Asset</option>
                <option value="business_category">Business Category</option>
            </select>
            <select
                onChange={(event) => setSelectedOptions(event.target.value)}
                value={selectedOptions}
            >
                <option value="">Please Select</option>
                {availableOptions?.map((availableOption) => (
                    <option
                        key={availableOption}
                        value={availableOption}
                    >
                        {availableOption}
                    </option>
                ))}
            </select>

            <Line
                title={selectedOptions}
                lineData={lineData}
            />

            {/* TODO: styled this */}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default LinePage;
