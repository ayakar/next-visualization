import risks from '../data.json';
import { Risk } from '@/app/types/RiskRating';

// 1: filter: year, asset, business cat, location
// 2: sort: sort, order
// 3: trim: limit, offset

export async function filterRiskData(request: Request) {
    let filtered: Risk[] = risks;

    // Query Params
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const asset = searchParams.get('asset');
    const business_category = searchParams.get('business_category'); // TODO: change to -
    const location = searchParams.get('location');
    const riskFactor = searchParams.get('risk-factor');

    // TODO refactor this
    // filter_obj = {year:"", business_category:""}
    // filtered = data.filter((risk) => (if filter_obj['year'] ? risk['Year'].toString()) === year &&)
    if (year) {
        filtered = filtered.filter((risk) => risk['Year'].toString() === year);
        console.log('year', filtered.length);
    }
    if (asset) {
        filtered = filtered.filter((risk) => risk['Asset Name'].toLowerCase() === asset.toLowerCase());
        console.log('asset', filtered.length);
    }
    if (business_category) {
        filtered = filtered.filter((risk) => risk['Business Category'].toLowerCase() === business_category.toLowerCase());
        console.log('bus cate', filtered.length);
    }
    if (location) {
        const splittedLocation = location.split(',');
        const lat = splittedLocation[0];
        const long = splittedLocation[1];
        filtered = filtered.filter((risk) => risk['Lat'].toString() === lat && risk['Long'].toString() === long);
        console.log('location', filtered.length);
    }

    if (riskFactor) {
        const reqRiskFactors = riskFactor.split(','); //[ 'Flooding', 'Volcano', 'Hurricane' ]
        filtered = filtered.filter((risk) => {
            const riskFactors = Object.keys(risk['Risk Factors']);
            return reqRiskFactors.every((factor) => riskFactors.includes(factor));
        });
        console.log('risk factor', filtered.length);
    }

    return filtered;
}
