import React, { MouseEvent } from 'react';
import PaginationButton from './PaginationButton';

interface Props {
    currentPage: number;
    totalPages: number;
    onClickHandler: (num: number, event: MouseEvent<HTMLButtonElement>) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onClickHandler }) => {
    const maximumPagination = 3;
    let LeftPagination = [];
    let MiddlePagination = [];
    let RightPagination = [];

    // show all ... when the page is up 6
    if (totalPages <= 6) {
        for (let i = 1; i < totalPages + 1; i++) {
            LeftPagination.push(
                <PaginationButton
                    key={i}
                    pageNumber={i}
                    currentPage={currentPage}
                    onClickHandler={onClickHandler}
                />
            );
        }

        return <div>{LeftPagination}</div>;
    }
    if (currentPage < 3 || currentPage > totalPages - 2) {
        // show 1,2,3, ...  99,100, 101 -> page 1,2, ,100,101 show first and last 3 if the page is more than 6 and current page is first or last 2
        // Generate left
        for (let i = 1; i < maximumPagination + 1; i++) {
            LeftPagination.push(
                <PaginationButton
                    key={i}
                    pageNumber={i}
                    currentPage={currentPage}
                    onClickHandler={onClickHandler}
                />
            );
        }
        // Generate right -1 is for index number
        for (let i = totalPages; i > totalPages - maximumPagination; i--) {
            RightPagination.push(
                <PaginationButton
                    key={i}
                    pageNumber={i}
                    currentPage={currentPage}
                    onClickHandler={onClickHandler}
                />
            );
        }

        return (
            <div>
                {LeftPagination} ... {RightPagination.reverse()}
            </div>
        );
    } else {
        //  show 1 .,3,4, ...99,100,101 -> when the page is more than 6 and current page is more than first 2 or less than last 2
        // Generate left
        LeftPagination.push(
            <PaginationButton
                key={1}
                pageNumber={1}
                currentPage={currentPage}
                onClickHandler={onClickHandler}
            />
        );

        // Middle pagination
        for (let i = currentPage - 1; i < currentPage + 2; i++) {
            MiddlePagination.push(
                <PaginationButton
                    key={i}
                    pageNumber={i}
                    currentPage={currentPage}
                    onClickHandler={onClickHandler}
                />
            );
        }

        // Generate right
        RightPagination.push(
            <PaginationButton
                key={totalPages}
                pageNumber={totalPages}
                currentPage={currentPage}
                onClickHandler={onClickHandler}
            />
        );

        return (
            <div>
                {LeftPagination} ...{MiddlePagination}... {RightPagination.reverse()}
            </div>
        );
    }
};

export default Pagination;
