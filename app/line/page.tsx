'use client';
import React, { useEffect, useState } from 'react';
import Line from '@/app/components/Line';
import { config } from '../constants/endpoints';
import { LineChartDataset, Risk } from '../types/RiskRating';
import useFetch from '../hooks/useFetch';
import Location from '../components/Location';

const LinePage = () => {
    const { errorMessage, fetchData } = useFetch();

    const [selectedFilteredBy, setSelectedFilteredBy] = useState(''); // Possible values: location, asset, business_category

    const [availableOptions, setAvailableOptions] = useState([]); // all options will be dynamically generated based on selectedFilteredBy value
    const [selectedOptions, setSelectedOptions] = useState(''); // selected options to fetch risksData

    const [locationData, setLocationData] = useState([]); // This is to show maker on map when location is selected. (instead of selectedOptions for assets, category)

    const [lineData, setLineData] = useState<LineChartDataset[]>([{}]); // [{ '2030': 0.27, '2050': 0.06 }]

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
        const colors = ['pink', 'green']; // TODO: change this from theme
        // const datasets = lineData.map((item, index) => ({
        //     label: title,
        //     data: item,
        //     borderColor: colors[index % colors.length],
        //     backgroundColor: colors[index % colors.length],
        // }));

        const transFormData = (data: Risk[]) => {
            console.log('response: ', data); // TODO: remove
            let arr: LineChartDataset[] = [];
            let datasets;
            let transformedData: { [key: number]: number } = {};

            if (selectedFilteredBy === 'location') {
                data.forEach((item: Risk) => {
                    const asset = item['Asset Name'];
                    arr.push();
                }); // [{asset_name:{2060:0.5, 2070:0.3}}, {asset_name2:{2030:0.2, 2070:1}} }]

                // location will have multiple line
                data.forEach((item: Risk) => {
                    const year = item['Year'];
                    const riskRating = item['Risk Rating'];
                    const current = transformedData[year] ? transformedData[year] : 0;
                    transformedData[year] = current + riskRating;
                });
            } else {
                data.forEach((item: Risk) => {
                    const year = item['Year'];
                    const riskRating = item['Risk Rating'];
                    const current = transformedData[year] ? transformedData[year] : 0;
                    transformedData[year] = current + riskRating;
                });
                datasets = {
                    label: selectedOptions,
                    data: transformedData,
                    borderColor: colors[0],
                    backgroundColor: colors[0],
                };
            }

            arr.push(datasets);
            console.log(arr);
            setLineData(arr);
        };

        if (selectedOptions) {
            fetchData(`${config.url.RISKS}/?${selectedFilteredBy}=${selectedOptions}`, transFormData);
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
                <Location
                    locationData={locationData}
                    onClickHandler={(data) => setSelectedOptions(data)}
                />
            ) : (
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
            )}
        </div>
    );
};

export default LinePage;
