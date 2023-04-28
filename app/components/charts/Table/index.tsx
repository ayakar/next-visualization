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
            <table>
                <thead>
                    <tr>
                        {labels.map((label, index) => (
                            <th
                                key={index}
                                onClick={() => label !== 'Year' && label !== 'Risk Factors' && onSortClickHandler(label)}
                            >
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item, index) => (
                        <tr key={index}>
                            <td>{item['Asset Name']}</td>
                            <td>{item['Lat']}</td>
                            <td>{item['Long']}</td>
                            <td>{item['Business Category']}</td>
                            <td>{item['Risk Rating']}</td>
                            <td>{JSON.stringify(item['Risk Factors'])}</td>
                            <td>{item['Year']}</td>
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
