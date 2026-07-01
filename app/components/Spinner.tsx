import React from 'react';

const Spinner = () => {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            className="spinner"
        >
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-brand"></circle>
        </svg>
    );
};

export default Spinner;
