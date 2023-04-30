import React from 'react';

const Spinner = () => {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            className="spinner"
        >
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
                style={{ stroke: '#e7e7e7', strokeLinecap: 'round' }}
            ></circle>
        </svg>
    );
};

export default Spinner;
