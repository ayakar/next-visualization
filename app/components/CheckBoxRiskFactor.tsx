'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';

const CheckBoxRiskFactor = () => {
    const { riskFactorLists, setRiskFactorLists } = useFilterContext();
    return (
        <div className="w-full flex flex-wrap">
            {Object.entries(riskFactorLists).map(([factorName, isChecked], index) => {
                return (
                    <div
                        className="w-50 md:w-20"
                        key={factorName}
                    >
                        <input
                            type="checkbox"
                            id={factorName}
                            checked={isChecked}
                            onChange={() => setRiskFactorLists((prev) => ({ ...prev, [factorName]: !prev[factorName as keyof typeof riskFactorLists] }))}
                            className="mr-1"
                        />
                        <label htmlFor={factorName}>{factorName}</label>
                    </div>
                );
            })}
        </div>
    );
};

export default CheckBoxRiskFactor;
