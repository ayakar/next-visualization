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
    sortLabel: string;
    sortOrder: string;
}

const Table: React.FC<Props> = ({ tableData, totalPages, currentPage, onSortClickHandler, onPaginationClickHandler, sortLabel, sortOrder }) => {
    const labels = ['Asset Name', 'Lat', 'Long', 'Business Category', 'Risk Rating', 'Risk Factors', 'Year'];

    const thClassName = `text-secondary p-2 bg-secondaryLight first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br hover:cursor-pointer`;
    const thClassNameNonClickable = 'text-secondary p-2 bg-secondaryLight first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br';
    return (
        <>
            <table className="w-full">
                <thead>
                    <tr>
                        {labels.map((label, index) => (
                            <th
                                key={index}
                                onClick={() => label !== 'Year' && label !== 'Risk Factors' && onSortClickHandler(label)}
                                className={label === 'Risk Factors' ? thClassNameNonClickable : thClassName}
                            >
                                {/* <div className="flex relative"> */}
                                {label}
                                {/* {sortLabel === label && sortOrder === 'asc' ? (
                                        <CaretUpFill style={{ position: 'absolute', right: '0' }} />
                                    ) : (
                                        sortLabel === label && sortOrder === 'desc' && <CaretDownFill style={{ position: 'absolute', right: '0' }} />
                                    )} */}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item, index) => {
                        const riskFactorsArr = Object.entries(item['Risk Factors']);
                        return (
                            <tr key={index}>
                                <td className="border-b p-2 w-20 first:pt-6">{item['Asset Name']}</td>
                                <td className="border-b p-2 w-10 first:pt-6">{item['Lat']}</td>
                                <td className="border-b p-2 w-10 first:pt-6">{item['Long']}</td>
                                <td className="border-b p-2 w-10 first:pt-6">{item['Business Category']}</td>
                                <td className="border-b p-2 w-5 first:pt-6">{item['Risk Rating']}</td>

                                <td className="border-b p-2 w-35 first:pt-6">
                                    <ul className="flex flex-wrap gap-x-3">
                                        {riskFactorsArr.map(([key, val], index) => (
                                            <li key={key}>
                                                <span>{key}: </span>
                                                {
                                                    index === riskFactorsArr.length - 1 ? <span>{val}</span> : <span>{val},</span> // No comma for last <li>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border-b p-2 w-10 text-center">{item['Year']}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onClickHandler={onPaginationClickHandler}
            />
        </>
    );
};

export default Table;
