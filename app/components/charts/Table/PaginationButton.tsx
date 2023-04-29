import React, { MouseEvent } from 'react';

interface Props {
    pageNumber: number;
    currentPage: number;
    onClickHandler: (num: number, event: MouseEvent<HTMLButtonElement>) => void;
}

const PaginationButton: React.FC<Props> = ({ pageNumber, currentPage, onClickHandler }) => {
    return (
        <button
            key={pageNumber}
            className={
                currentPage !== pageNumber
                    ? 'bg-primary hover:bg-primaryLight hover:text-primary text-white font-bold py-2 px-4 rounded-sm transition-colors duration-300'
                    : 'bg-lightGray text-gray font-bold py-2 px-4 rounded transition-colors duration-300'
            }
            onClick={(event) => onClickHandler(pageNumber, event)}
        >
            {pageNumber}
        </button>
    );
};

export default PaginationButton;
