'use client';
import React, { createContext, useState, useContext } from 'react';
import { FilterContext } from '../types/RiskRating';

const FilterContext = createContext<FilterContext>({
    selectedYear: 2030,
});

// Hook
export const useFilterContext = () => {
    return useContext(FilterContext);
};

// Provider with Filter info
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedYear, setSelectedYear] = useState<number>(2030); // TODO: convert to context
    const [riskFactorLists, setRiskFactorLists] = useState<{ [key: string]: boolean }>({
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
    const [selectedAsset, setSelectedAsset] = useState('');
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);

    const value = {
        selectedYear,
        // setSelectedYear,
        // riskFactorLists,
        // setRiskFactorLists,
        // selectedAsset,
        // setSelectedAsset,
        // selectedBusinessCategory,
        // setSelectedBusinessCategory,
        // selectedLocation,
        // setSelectedLocation,
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
