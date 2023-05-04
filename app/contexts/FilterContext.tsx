'use client';
import React, { createContext, useState, useContext } from 'react';
import { FilterContext } from '../types/RiskRating';

const FilterContext = createContext<FilterContext>({
    selectedYear: '',
    setSelectedYear: () => {},
    selectedAsset: '',
    setSelectedAsset: () => {},
    selectedBusinessCategory: '',
    setSelectedBusinessCategory: () => {},
    riskFactorLists: {},
    setRiskFactorLists: () => {},
    selectedLocation: '',
    setSelectedLocation: () => {},
});

// Hook
export const useFilterContext = () => {
    return useContext(FilterContext);
};

// Provider with Filter info
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedYear, setSelectedYear] = useState<number | ''>('');
    const [riskFactorLists, setRiskFactorLists] = useState<{ [key: string]: boolean }>({
        Earthquake: false,
        'Extreme heat': false,
        Tornado: false,
        Flooding: false,
        Volcano: false,
        Hurricane: false,
        Drought: false,
        'Extreme cold': false,
        'Sea level rise': false,
        Wildfire: false,
    });
    const [selectedAsset, setSelectedAsset] = useState('');
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(''); //`${item.Lat},${item.Long}`

    const value = {
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
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
