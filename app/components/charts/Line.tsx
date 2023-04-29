'use client';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line as LineChartJS } from 'react-chartjs-2';
import { LineChartDataset } from '../../types/RiskRating';

interface Props {
    title: string;
    lineData: LineChartDataset | {};
}

const Line: React.FC<Props> = ({ title, lineData }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        parsing: {
            xAxisKey: 'year',
            yAxisKey: 'aggregatedRisk',
        },

        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
            },

            //Custom Tool Tip
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false,

                external: function (context: any) {
                    // console.log('tooltip', context.tooltip);

                    // Avoid throwing error when dataPoints object is not filled
                    if (context.tooltip.dataPoints === undefined) {
                        return;
                    }
                    const tooltipModel = context.tooltip;
                    const year = tooltipModel.dataPoints[0].raw.year;
                    const aggregatedRiskRating = tooltipModel.dataPoints[0].raw.aggregatedRisk;
                    const riskFactors = tooltipModel.dataPoints[0].raw.riskFactors;
                    // Tooltip Element
                    let tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.classList.add('toolTipRoot');
                        tooltipEl.id = 'chartjs-tooltip';

                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = '0';
                        return;
                    }

                    // Styling the arrow
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    // Set Text
                    let riskFactorsLi = '';

                    Object.keys(riskFactors).forEach((key) => {
                        const rounded = riskFactors[key].toFixed(2);
                        riskFactorsLi += `<tr><td>${key}:</td> <td>${rounded}</td></tr>`;
                    });

                    tooltipEl.innerHTML = `<div>Aggregated Risk Rating for ${year} is ${aggregatedRiskRating.toFixed(2)}</div>
                    <table><tbody>${riskFactorsLi}</tbody></table>`;

                    const position = context.chart.canvas.getBoundingClientRect();

                    // Setting style on ToolTip // TODO: replace with tailwind class?
                    tooltipEl.style.opacity = '1';
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.transform = 'translate(-50%, 15px)';
                    tooltipEl.style.maxWidth = '200px';
                    tooltipEl.style.background = 'white';
                    tooltipEl.style.boxShadow = '0 2px 12px 0 #c0c0c0';
                    tooltipEl.style.padding = '10px';
                    tooltipEl.style.borderRadius = '5px';
                    tooltipEl.style.transition = 'opacity .3s ease-in-out';
                    tooltipEl.style.pointerEvents = 'none';
                },
            },
        },
    };

    const data = {
        datasets: [
            {
                data: lineData,
                borderColor: 'pink',
                backgroundColor: 'green',
                pointRadius: 8,
                pointHoverRadius: 10,
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
