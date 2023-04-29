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

            // tooltip: {
            //     boxWidth: 200,
            //     boxHeight: 200,
            //     backgroundColor: 'gray',
            //     displayColors: false,
            //     cornerRadius: 10,
            //     padding: 15,
            //     titleColor: 'green',
            //     titleFont: {
            //         // family:,
            //         size: 30,
            //     },
            //     bodyColor: 'orange',
            //     bodyFont: {
            //         // family:,
            //         size: 20,
            //     },
            //     callbacks: {
            //         title: function (tooltipItem, data) {
            //             console.log(tooltipItem, data);
            //             return tooltipItem.label;
            //         },

            //         label: (tooltipItem, data) => {
            //             return 'text';
            //         },
            //     },
            // },

            //Custom Tool Tip
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false,

                external: function (context: any) {
                    // console.log(context);
                    // console.log(context.tooltip.dataPoints[0].raw.riskFactors);

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
                    Object.entries(riskFactors).forEach(([key, val]) => (riskFactorsLi += `<tr><td>${key}:</td> <td>${val}</td></tr>`));
                    tooltipEl.innerHTML = `<div>Aggregated Risk Rating for ${year} is ${aggregatedRiskRating}</div>
                    <table><tbody>${riskFactorsLi}</tbody></table>`;

                    const position = context.chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
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
    // Initial server format
    //    {
    //         "2030": {"aggregatedRisk":"497","riskFactors":{"earthquake":"2","fire":"44"}},
    //         "2040": {"aggregatedRisk":"23","riskFactors":["sldkf","lskdjf"]},
    //         "2050": {"aggregatedRisk":"5","riskFactors":["sldkf","lskdjf"]},
    //     }
    // Final server format to send to client:
    // [{"year":"2030","aggregatedRisk":"497","riskFactors":{"earthquake":"2","fire":"44"}},{},{}]

    // riskArray = ["497","23","5"]
    // const riskArray = Object.keys(lineData).map(key=>lineData[key].risk)
    const data = {
        datasets: [
            {
                //label: 'Aggregated Risk By Year',
                // labels: Object.keys(lineData),
                // data: riskArray,
                data: [
                    { year: '2030', aggregatedRisk: '88', riskFactors: { earthquake: '2', fire: '44' } },
                    { year: '2040', aggregatedRisk: '22', riskFactors: { earthquake: '2', fire: '44', drought: '8' } },
                    { year: '2050', aggregatedRisk: '55', riskFactors: { earthquake: '2', fire: '21' } },
                ],
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
