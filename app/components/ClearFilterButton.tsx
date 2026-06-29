'use client';
import React, { useCallback, useEffect } from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { X } from 'lucide-react';
import { Button } from './ui/button';

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
            <Button variant="outline" size="sm" onClick={clearFilterHandler} className="ml-auto text-ink-soft hover:text-brand">
                <X size={16} /> Clear filters
            </Button>
        );
    } else {
        return null;
    }
};

export default ClearFilterButton;
