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

                external: function (context) {
                    console.log(context.tooltip.dataPoints[0].raw.riskFactors);
                    // Tooltip Element
                    let tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.classList.add('toolTipRoot');
                        tooltipEl.id = 'chartjs-tooltip';
                        //   tooltipEl.innerHTML = '<div class="toolTipRoot"></div>';
                        document.body.appendChild(tooltipEl);
                    }

                    const tooltipModel = context.tooltip;

                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Styling the arrow
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines; // ex. "Risk By Year: 487.52"
                    }

                    // Set Text
                    if (tooltipModel.body) {
                        const titleLines = tooltipModel.title || [];
                        // const bodyLines = Object.keys(context.tooltip.dataPoints[0].raw.riskFactors);
                        const bodyLines = tooltipModel.body.map(getBody);

                        let innerHtml = '<div>';

                        titleLines.forEach(function (title) {
                            innerHtml += '<div>' + title + '</div>';
                        });
                        innerHtml += '</div><div>';

                        bodyLines.forEach(function (body, i) {
                            const colors = tooltipModel.labelColors[i];
                            let style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            const span = '<span style="' + style + '">' + body + '</span>';
                            innerHtml += '<div>' + span + '</div>';
                        });
                        innerHtml += '</div>';
                        // console.log(tooltipEl);
                        // let tableRoot = tooltipEl.getElementsByClassName('toolTipRoot')[0];
                        // let tableRoot = tooltipEl.querySelector('table');

                        tooltipEl.innerHTML = innerHtml;
                    }

                    const position = context.chart.canvas.getBoundingClientRect();
                    // const bodyFont = ChartJS.helpers.toFont(tooltipModel.options.bodyFont);

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    // tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
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
                label: 'Aggregated Risk By Year',
                // labels: Object.keys(lineData),
                // data: riskArray,
                data: [
                    { year: '2030', aggregatedRisk: '88', riskFactors: { earthquake: '2', fire: '44' } },
                    { year: '2040', aggregatedRisk: '22', riskFactors: { earthquake: '2', fire: '44', drought: '8' } },
                    { year: '2050', aggregatedRisk: '55', riskFactors: { earthquake: '2', fire: '21' } },
                ],
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
