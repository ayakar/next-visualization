'use client';
import React, { useCallback, useEffect } from 'react';
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

    const clearFilterHandler = useCallback(() => {
        // console.log('clear handler called');
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
    }, [setRiskFactorLists, setSelectedAsset, setSelectedBusinessCategory, setSelectedLocation, setSelectedYear]);

    useEffect(() => {
        return () => {
            // console.log('unmount');
            clearFilterHandler();
        };
    }, [clearFilterHandler]);

    const isRiskFactorChecked = Object.values(riskFactorLists).some((item) => item === true);

    if (selectedYear || isRiskFactorChecked || selectedAsset || selectedBusinessCategory || selectedLocation) {
        return (
            <button
                className="lg:absolute inline-flex items-center gap-1 bg-secondaryLight text-secondary px-2 py-1 text-xs rounded hover:bg-secondaryLight hover:text-secondary  transition-colors duration-300"
                style={{ top: 0, right: '-2rem' }}
                onClick={clearFilterHandler}
            >
                <X /> Clear Filters
            </button>
        );
    } else {
        return null;
    }
};

export default ClearFilterButton;
