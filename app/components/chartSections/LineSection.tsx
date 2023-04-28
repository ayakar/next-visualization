'use client';
import React, { useEffect, useState } from 'react';
import Line from '@/app/components/charts/Line';
import { config } from '../../constants/endpoints';
import { LineChartData, LineChartDataset, Risk } from '../../types/RiskRating';
import useFetch from '../../hooks/useFetch';
import Map from '../charts/Map';
import SelectBusinessCategory from '../SelectBusinessCategory';
import SelectAsset from '../SelectAsset';

const LineSection = () => {
    const { errorMessage, fetchData } = useFetch();

    const [selectedFilteredBy, setSelectedFilteredBy] = useState(''); // Possible values: location, asset, business_category

    const [availableOptions, setAvailableOptions] = useState([]); // all options will be dynamically generated based on selectedFilteredBy value
    const [selectedOptions, setSelectedOptions] = useState(''); // selected options to fetch risksData

    const [locationData, setLocationData] = useState([]); // This is to show maker on map when location is selected. (instead of selectedOptions for assets, category)

    const [lineData, setLineData] = useState<LineChartDataset | {}>({}); // [{ '2030': 0.27, '2050': 0.06 }]

    useEffect(() => {
        let endPoint = '';
        switch (selectedFilteredBy) {
            case 'asset':
                endPoint = config.url.RISKS_ASSETS;
                break;
            case 'location':
                endPoint = config.url.RISKS; // TODO do I need to reset selectedOption value?
                break;
            case 'business_category':
                endPoint = config.url.RISKS_CATEGORIES;
                break;
            default:
                break;
        }
        if (selectedFilteredBy === 'location') {
            fetchData(endPoint, setLocationData); // TODO: optimize this
        } else if (selectedFilteredBy) {
            fetchData(endPoint, setAvailableOptions);
        }
    }, [selectedFilteredBy, fetchData]);

    useEffect(() => {
        const transFormData = (data: Risk[]) => {
            console.log('response: ', data); // TODO: remove

            let transformedData: LineChartData = {};
            data.forEach((item: Risk) => {
                const year = item['Year'];
                const riskRating = item['Risk Rating'];
                const current = transformedData[year] ? transformedData[year] : 0;
                transformedData[year] = current + riskRating;
            });

            setLineData(transformedData);
        };

        if (selectedOptions) {
            fetchData(`${config.url.RISKS}?${selectedFilteredBy}=${selectedOptions}`, transFormData);
        }
    }, [selectedOptions, selectedFilteredBy, fetchData]);

    return (
        <div>
            <Line
                title={selectedOptions}
                lineData={lineData}
            />

            {/* TODO: styled this */}
            {errorMessage && <div>{errorMessage}</div>}

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
            {selectedFilteredBy === 'location' ? (
                <Map
                    mapData={locationData}
                    onClickHandler={(data) => setSelectedOptions(data)}
                />
            ) : selectedFilteredBy === 'asset' ? (
                <SelectAsset
                    selectedAsset={selectedOptions}
                    setSelectedAsset={setSelectedOptions}
                />
            ) : (
                selectedFilteredBy === 'business_category' && (
                    <SelectBusinessCategory
                        selectedBusinessCategory={selectedOptions}
                        setSelectedBusinessCategory={setSelectedOptions}
                    />
                )
            )}
        </div>
    );
};

export default LineSection;
