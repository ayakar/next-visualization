import React, { MouseEvent } from 'react';
import { Risk } from '../../../types/RiskRating';
import Pagination from './Pagination';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';

interface Props {
    tableData: Risk[] | null;
    totalPages: number;
    currentPage: number;
    onSortClickHandler: (label: string) => void;
    onPaginationClickHandler: (pageNum: number, event: MouseEvent<HTMLButtonElement>) => void;
    sortLabel: string | null;
    sortOrder: 'asc' | 'desc';
}

const Table: React.FC<Props> = ({ tableData, totalPages, currentPage, onSortClickHandler, onPaginationClickHandler, sortLabel, sortOrder }) => {
    const labels = ['Asset Name', 'Lat', 'Long', 'Business Category', 'Risk Rating', 'Risk Factors', 'Year'];

    return (
        <>
            <div className="sticky top-0 pt-10 bg-white"></div>
            <table className="w-full mb-6">
                <thead>
                    <tr style={{ position: 'sticky', top: '1.5rem' }}>
                        {labels.map((label, index) => (
                            <th
                                key={index}
                                className="bg-secondaryLight text-secondary px-3 py-2 first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br"
                            >
                                <button
                                    className="relative"
                                    onClick={() => onSortClickHandler(label)}
                                    disabled={label === 'Risk Factors'} // Risk Factors don't have sort functionality
                                >
                                    {label}
                                    {sortLabel === label && sortOrder === 'asc' ? (
                                        <CaretUpFill
                                            className="absolute"
                                            style={{ right: '-1.2rem', top: '50%', transform: 'translateY(-50%)' }}
                                        />
                                    ) : (
                                        sortLabel === label &&
                                        sortOrder === 'desc' && (
                                            <CaretDownFill
                                                className="absolute"
                                                style={{ right: '-1.2rem', top: '50%', transform: 'translateY(-50%)' }}
                                            />
                                        )
                                    )}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item, index) => {
                        const riskFactorsArr = Object.entries(item['Risk Factors']).sort();
                        return (
                            <tr key={index}>
                                <td className="border-b px-1 py-2 w-20 first:pt-6">{item['Asset Name']}</td>
                                <td className="border-b px-1 py-2 w-10 first:pt-6 text-center">{item['Lat']}</td>
                                <td className="border-b px-1 py-2 w-10 first:pt-6 text-center">{item['Long']}</td>
                                <td className="border-b px-1 py-2 w-10 first:pt-6 text-center">{item['Business Category']}</td>
                                <td className="border-b px-1 py-2 w-10 first:pt-6 text-center">{item['Risk Rating']}</td>

                                <td className="border-b px-1 py-2 w-30 first:pt-6">
                                    <ul className="flex flex-wrap gap-1">
                                        {riskFactorsArr.map(([key, val], index) => (
                                            <li key={key}>
                                                <span>{key}: </span>
                                                {
                                                    index === riskFactorsArr.length - 1 ? <span>{val}</span> : <span>{val.toFixed(2)}, </span> // No comma for last <li>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border-b px-1 py-2 w-10 text-center">{item['Year']}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex gap-2">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onClickHandler={onPaginationClickHandler}
                />
            </div>
        </>
    );
};

export default Table;
