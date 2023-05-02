import React from 'react';
import { useFilterContext } from '../contexts/FilterContext';

const NoResult = () => {
    return (
        <div
            className="font-bold text-secondary bg-secondaryLight px-2 py-3 rounded-sm"
            style={{}}
        >
            No Result. Please try different term
        </div>
    );
};

export default NoResult;
