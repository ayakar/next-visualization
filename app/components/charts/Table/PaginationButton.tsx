import React, { MouseEvent } from 'react';

interface Props {
    pageNumber: number;
    currentPage: number;
    onClickHandler: (num: number, event: MouseEvent<HTMLButtonElement>) => void;
}

const PaginationButton: React.FC<Props> = ({ pageNumber, currentPage, onClickHandler }) => {
    const isCurrent = currentPage === pageNumber;
    return (
        <button
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isCurrent ? 'page' : undefined}
            className={`h-9 rounded-md px-3 text-sm font-medium tabular-nums transition-colors ${
                isCurrent
                    ? 'bg-accent-gradient border border-transparent text-white shadow-primary'
                    : 'border border-border bg-card text-ink-soft hover:border-brand-light hover:bg-brand-lighter hover:text-brand'
            }`}
            disabled={isCurrent}
            onClick={(event) => onClickHandler(pageNumber, event)}
        >
            {pageNumber}
        </button>
    );
};

export default PaginationButton;
