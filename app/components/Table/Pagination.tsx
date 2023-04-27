import React from 'react';

interface Props {
    currentPage: number;
    totalPages: number;
    onClickHandler: (num: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onClickHandler }) => {
    const maximumPagination = 4;
    let LeftPagination = [];
    let RightPagination = [];

    // Generate left
    for (let i = 1; i < maximumPagination + 1; i++) {
        LeftPagination.push(
            <button
                key={i}
                className={
                    currentPage !== i
                        ? 'bg-primary hover:bg-primaryLight hover:text-primary text-white font-bold py-2 px-4 rounded transition-colors duration-300'
                        : 'bg-lightGray text-gray font-bold py-2 px-4 rounded transition-colors duration-300'
                }
                disabled={currentPage === i}
                onClick={() => onClickHandler(i)}
            >
                {i}
            </button>
        );
    }
    // Generate right -1 is for index number
    for (let i = totalPages; i > totalPages - maximumPagination; i--) {
        RightPagination.push(
            <button
                key={i}
                className="bg-primary hover:bg-primaryLight hover:text-primary text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => onClickHandler(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div>
            {LeftPagination} ... {RightPagination.reverse()}
        </div>
    );
};

export default Pagination;
