import risks from '@/app/api/data.json';
import { MapChartData, Risk } from '@/app/types/RiskRating';

export const getMap = (filtered: Risk[] | null, riskFactorParams: string | null) => {
    // getMap() can be called from rsc
    if (filtered === null) {
        filtered = risks;
    }
    const riskFactorParamsArr = riskFactorParams
        ? riskFactorParams.split(',')
        : ['Earthquake', 'Extreme heat', 'Wildfire', 'Tornado', 'Flooding', 'Volcano', 'Hurricane', 'Drought', 'Extreme cold', 'Sea level rise'];

    let transformedData: MapChartData = {};
    filtered.forEach((item: Risk) => {
        const latLong = `${item['Lat']},${item['Long']}`;

        let totalRiskRating = 0;
        const itemRiskFactor = Object.entries(item['Risk Factors']);
        itemRiskFactor.forEach(([factor, data]) => {
            if (riskFactorParamsArr.includes(factor)) {
                totalRiskRating += data;
            }
        });

        if (transformedData[latLong]) {
            transformedData[latLong].assetsNum += 1;
            transformedData[latLong].totalRiskRating += totalRiskRating;
            transformedData[latLong].businessCategories[item['Business Category']] = true;
        } else {
            transformedData[latLong] = {
                totalRiskRating: totalRiskRating,
                businessCategories: { [item['Business Category']]: true },
                assetsNum: 1,
            };
        }
    });

    return transformedData;
};
