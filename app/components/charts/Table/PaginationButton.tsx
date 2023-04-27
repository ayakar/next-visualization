import React from 'react';

interface Props {
    pageNumber: number;
    currentPage: number;
    onClickHandler: (num: number) => void;
}

const PaginationButton: React.FC<Props> = ({ pageNumber, currentPage, onClickHandler }) => {
    return (
        <button
            key={pageNumber}
            className={
                currentPage !== pageNumber
                    ? 'bg-primary hover:bg-primaryLight hover:text-primary text-white font-bold py-2 px-4 rounded transition-colors duration-300'
                    : 'bg-lightGray text-gray font-bold py-2 px-4 rounded transition-colors duration-300'
            }
            onClick={() => onClickHandler(pageNumber)}
        >
            {pageNumber}
        </button>
    );
};

export default PaginationButton;
