'use client';
import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { Checkbox } from './ui/checkbox';

const CheckBoxRiskFactor = () => {
    const { riskFactorLists, setRiskFactorLists } = useFilterContext();
    return (
        <div className="flex flex-wrap gap-1.5">
            {Object.entries(riskFactorLists).map(([factorName, isChecked]) => (
                <label
                    key={factorName}
                    htmlFor={`risk-${factorName}`}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
                        isChecked ? 'border-brand bg-brand text-white shadow-primary' : 'border-border bg-card text-ink-soft hover:border-brand-light'
                    }`}
                >
                    <Checkbox
                        id={`risk-${factorName}`}
                        checked={isChecked}
                        onCheckedChange={() =>
                            setRiskFactorLists((prev) => ({ ...prev, [factorName]: !prev[factorName as keyof typeof riskFactorLists] }))
                        }
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {factorName}
                </label>
            ))}
        </div>
    );
};

export default CheckBoxRiskFactor;
