'use client';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    type TooltipModel,
    type ScriptableContext,
} from 'chart.js';
import { Line as LineChartJS } from 'react-chartjs-2';
import { LineChartData } from '../../types/RiskRating';
import { SURFACE_COLOR, GRAD_FROM, GRAD_TO } from '../../constants/colors';

interface Props {
    lineData: LineChartData[];
}

const Line: React.FC<Props> = ({ lineData }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        parsing: {
            xAxisKey: 'year',
            yAxisKey: 'aggregatedRisk',
        },
        scales: {
            y: {
                max: 1,
                min: 0,
            },
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
                external: function (context: { chart: ChartJS; tooltip: TooltipModel<'line'> }) {
                    const tooltipModel = context.tooltip;

                    // Avoid throwing error when dataPoints object is not filled
                    if (!tooltipModel.dataPoints || tooltipModel.dataPoints.length === 0) {
                        return;
                    }
                    const point = tooltipModel.dataPoints[0].raw as LineChartData;
                    const aggregatedRiskRating = point.aggregatedRisk;
                    const riskFactors = point.riskFactors;
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

                    Object.entries(riskFactors).forEach(([key, value]) => {
                        if (value == null) return;
                        const rounded = value.toFixed(2);
                        riskFactorsLi += `<tr><td className="border-b">${key}: </td> <td style="text-align:right">${rounded}</td></tr>`;
                    });

                    tooltipEl.innerHTML = `<div style="text-align:center; border-bottom:solid 1px #e7e7e7; padding-bottom:.3rem; margin-bottom:.3rem">
                    Average<br>Risk Rating: ${aggregatedRiskRating.toFixed(2)}
                    </div>
                    <table style="width:100%"><tbody>${riskFactorsLi}</tbody></table>`;

                    const position = context.chart.canvas.getBoundingClientRect();

                    // Setting style on ToolTip
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

    // Aqua gradients (cyan → blue). Scriptable so they size to the chart's draw area.
    const lineGradient = (ctx: ScriptableContext<'line'>) => {
        const { ctx: c, chartArea } = ctx.chart;
        if (!chartArea) return GRAD_FROM;
        const g = c.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
        g.addColorStop(0, GRAD_FROM);
        g.addColorStop(1, GRAD_TO);
        return g;
    };
    const areaGradient = (ctx: ScriptableContext<'line'>) => {
        const { ctx: c, chartArea } = ctx.chart;
        if (!chartArea) return 'rgba(37, 99, 235, 0.12)';
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
        g.addColorStop(1, 'rgba(6, 182, 212, 0.02)');
        return g;
    };

    const data = {
        datasets: [
            {
                data: lineData,
                borderColor: lineGradient,
                backgroundColor: areaGradient,
                fill: true,
                pointBackgroundColor: SURFACE_COLOR,
                pointBorderColor: GRAD_TO,
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 7,
                tension: 0,
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
