'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';

const ClearFilterButton = () => {
    const { setSelectedYear, setRiskFactorLists, setSelectedAsset, setSelectedBusinessCategory, setSelectedLocation } = useFilterContext();
    const onClickHandler = () => {
        setSelectedYear('');
        setRiskFactorLists({
            Earthquake: false,
            'Extreme heat': false,
            Wildfire: false,
            Tornado: false,
            Flooding: false,
            Volcano: false,
            Hurricane: false,
            Drought: false,
            'Extreme cold': false,
            'Sea level rise': false,
        });
        setSelectedAsset('');
        setSelectedBusinessCategory('');
        setSelectedLocation('');
    };
    return (
        <button
            className="bg-secondary text-white px-4 py-2 rounded-sm hover:bg-secondaryLight hover:text-secondary  transition-colors duration-300"
            onClick={onClickHandler}
        >
            Clear Filter
        </button>
    );
};

export default ClearFilterButton;
