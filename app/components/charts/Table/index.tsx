import React, { MouseEvent } from 'react';
import { Risk } from '../../../types/RiskRating';
import Pagination from './Pagination';

interface Props {
    tableData: Risk[] | null;
    totalPages: number;
    currentPage: number;
    onSortClickHandler: (label: string) => void;
    onPaginationClickHandler: (pageNum: number, event: MouseEvent<HTMLButtonElement>) => void;
}

const Table: React.FC<Props> = ({ tableData, totalPages, currentPage, onSortClickHandler, onPaginationClickHandler }) => {
    const labels = ['Asset Name', 'Lat', 'Long', 'Business Category', 'Risk Rating', 'Risk Factors', 'Year'];

    return (
        <>
            <table className="border">
                <thead>
                    <tr>
                        {labels.map((label, index) => (
                            <th
                                key={index}
                                onClick={() => label !== 'Year' && label !== 'Risk Factors' && onSortClickHandler(label)}
                                className="border"
                            >
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item, index) => (
                        <tr key={index}>
                            <td className="border">{item['Asset Name']}</td>
                            <td className="border">{item['Lat']}</td>
                            <td className="border">{item['Long']}</td>
                            <td className="border">{item['Business Category']}</td>
                            <td className="border">{item['Risk Rating']}</td>

                            <td className="border">
                                <ul>
                                    {Object.entries(item['Risk Factors']).map(([key, val]) => (
                                        <li key={key}>
                                            {key}: {val}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="border">{item['Year']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
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
