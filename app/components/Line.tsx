'use client';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line as LineChartJS } from 'react-chartjs-2';

interface Props {
    title: string;
    lineData: {};
}

const Line: React.FC<Props> = ({ title, lineData }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     position: 'top' as const,
            // }, // TODO
            title: {
                display: true,
                text: title,
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'Risk By Year',
                data: lineData,
                borderColor: 'pink',
                backgroundColor: 'green',
            },
        ],
    };

    return (
        <LineChartJS
            options={options}
            data={data}
        />
    );
};

export default Line;
