'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { X, XCircle } from 'react-bootstrap-icons';

const ClearFilterButton = () => {
    const {
        selectedYear,
        setSelectedYear,
        riskFactorLists,
        setRiskFactorLists,
        selectedAsset,
        setSelectedAsset,
        selectedBusinessCategory,
        setSelectedBusinessCategory,
        selectedLocation,
        setSelectedLocation,
    } = useFilterContext();
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
    const isRiskFactorChecked = Object.values(riskFactorLists).some((item) => item === true);

    if (selectedYear || isRiskFactorChecked || selectedAsset || selectedBusinessCategory || selectedLocation) {
        return (
            <button
                className="absolute inline-flex items-center gap-1 bg-secondaryLight text-secondary px-2 py-1 text-xs rounded hover:bg-secondaryLight hover:text-secondary  transition-colors duration-300"
                style={{ top: 0, right: '-3rem' }}
                onClick={onClickHandler}
            >
                <X /> Clear Filters
            </button>
        );
    } else {
        return null;
    }
};

export default ClearFilterButton;
