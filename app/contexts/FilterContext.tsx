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
});

// Hook
export const useFilterContext = () => {
    return useContext(FilterContext);
};

// Provider with Filter info
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedYear, setSelectedYear] = useState<number | ''>(''); // TODO: convert to context
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
        setSelectedYear,
        riskFactorLists,
        setRiskFactorLists,
        selectedAsset,
        setSelectedAsset,
        selectedBusinessCategory,
        setSelectedBusinessCategory,
        // selectedLocation,
        // setSelectedLocation,
    };

    return (
        <FilterContext.Provider value={value}>
            <div style={{ border: '1px solid red' }}>
                <div>Selected Year: {JSON.stringify(selectedYear)}</div>
                <div>Selected Asset: {JSON.stringify(selectedAsset)}</div>
                <div>Selected riskFactorLists: {JSON.stringify(riskFactorLists)}</div>
                <div>Selected selectedBusinessCategory: {JSON.stringify(selectedBusinessCategory)}</div>
                {/*  <div>Selected selectedLocation: {JSON.stringify(selectedLocation)}</div> */}
            </div>
            {children}
        </FilterContext.Provider>
    );
};
