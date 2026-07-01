'use client';
import React from 'react';
import { useFilters } from '../hooks/useFilters';
import { RISK_FACTORS } from '../constants/risk';
import { Checkbox } from './ui/checkbox';

const CheckBoxRiskFactor = () => {
    const { riskFactors, toggleRiskFactor } = useFilters();
    return (
        <div className="flex flex-wrap gap-1.5">
            {RISK_FACTORS.map((factorName) => {
                const isChecked = riskFactors.includes(factorName);
                return (
                    <label
                        key={factorName}
                        htmlFor={`risk-${factorName}`}
                        className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
                            isChecked ? 'bg-accent-gradient border-transparent text-white shadow-primary' : 'border-border bg-card text-ink-soft hover:border-brand-light'
                        }`}
                    >
                        <Checkbox
                            id={`risk-${factorName}`}
                            checked={isChecked}
                            onCheckedChange={() => toggleRiskFactor(factorName)}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {factorName}
                    </label>
                );
            })}
        </div>
    );
};

export default CheckBoxRiskFactor;
