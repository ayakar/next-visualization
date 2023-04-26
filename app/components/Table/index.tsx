import React, { useState } from 'react';
import { Risk } from '../../types/RiskRating';
import Th from './Th';

interface Props {
    tableData: Risk[] | null;
    onClickHandler: (label: string, sortOrder: boolean) => void;
}

const Table: React.FC<Props> = ({ tableData, onClickHandler }) => {
    const labels = ['Asset Name', 'Lat', 'Long', 'Business Category', 'Risk Rating', 'Risk Factors', 'Year'];

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {labels.map((label, index) => (
                            <Th
                                key={index}
                                thLabel={label}
                                sortClickHandler={onClickHandler}
                            />
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
            <div>Pargination here!</div>
        </>
    );
};

export default Table;
