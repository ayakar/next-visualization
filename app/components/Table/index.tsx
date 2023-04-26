import React, { useState } from 'react';
import { Risk } from '../../types/RiskRating';

interface Props {
    tableData: Risk[] | null;
    onSortClickHandler: (label: string) => void;
    onPaginationClickHandler: (pageNum: number) => void;
}

const Table: React.FC<Props> = ({ tableData, onSortClickHandler, onPaginationClickHandler }) => {
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
                <button onClick={() => onPaginationClickHandler(1)}>1</button>
                <button onClick={() => onPaginationClickHandler(2)}>2</button>
            </div>
        </>
    );
};

export default Table;
