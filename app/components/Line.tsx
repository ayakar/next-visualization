'use client';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line as LineChartJS } from 'react-chartjs-2';
import { LineChartDataset } from '../types/RiskRating';

interface Props {
    title: string;
    lineData: LineChartDataset[] | [{}];
}

const Line: React.FC<Props> = ({ title, lineData }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    // const colors = ['pink', 'green'];
    // const datasets = lineData.map((item, index) => ({
    //     label: title,
    //     data: item,
    //     borderColor: colors[index % colors.length],
    //     backgroundColor: colors[index % colors.length],
    // }));

    const data = {
        datasets: lineData,
        // datasets: [
        //     {
        //         label: title,
        //         data: lineData,
        //         borderColor: 'pink',
        //         backgroundColor: 'green',
        //     },
        //     {
        //         label: title,
        //         data: { '2030': 0.27, '2050': 0.06 },
        //         borderColor: 'red',
        //         backgroundColor: 'blue',
        //     },
        // ],
    };

    return (
        <LineChartJS
            options={options}
            data={data}
        />
    );
};

export default Line;
