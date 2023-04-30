'use client';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line as LineChartJS } from 'react-chartjs-2';
import { LineChartDataset } from '../../types/RiskRating';

interface Props {
    lineData: LineChartDataset | {};
}

const Line: React.FC<Props> = ({ lineData }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

    const options = {
        maintainAspectRatio: false,
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
                display: false,
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
                        riskFactorsLi += `<tr><td className="border-b">${key}:</td> <td style="text-align:right">${rounded}</td></tr>`;
                    });

                    tooltipEl.innerHTML = `<div style="text-align:center; border-bottom:solid 1px #e7e7e7; padding-bottom:.3rem; margin-bottom:.3rem">
                    Aggregated<br>Risk Rating : ${aggregatedRiskRating.toFixed(2)}
                    </div>
                    <table style="width:100%"><tbody>${riskFactorsLi}</tbody></table>`;

                    const position = context.chart.canvas.getBoundingClientRect();

                    // Setting style on ToolTip // TODO: replace with tailwind class?
                    tooltipEl.style.opacity = '1';
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.transform = 'translate(-50%, 15px)';
                    tooltipEl.style.maxWidth = '180px';
                    tooltipEl.style.background = 'white';
                    tooltipEl.style.boxShadow = '0 2px 12px 0 #c0c0c0';
                    tooltipEl.style.padding = '10px';
                    tooltipEl.style.borderRadius = '5px';
                    tooltipEl.style.transition = 'opacity .3s ease-in-out';
                    tooltipEl.style.pointerEvents = 'none';
                    tooltipEl.style.fontSize = '.85rem';
                },
            },
        },
    };

    const data = {
        datasets: [
            {
                data: lineData,
                borderColor: '#fedca5',
                backgroundColor: '#F0A323',
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{ height: '400px', width: '500px' }}>
            <LineChartJS
                options={options}
                data={data}
            />
        </div>
    );
};

export default Line;
