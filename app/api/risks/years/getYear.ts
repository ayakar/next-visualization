import risks from '@/app/api/data.json';
import { Risk } from '@/app/types/RiskRating';
export const getYear = () => {
    const years: { [key: string]: boolean } = {};
    risks.forEach((risk: Risk) => (years[risk['Year']] = true));
    const yearsArr = Object.keys(years);
    const yearArrNum = yearsArr.map((year) => parseInt(year)); // [ 2030, 2040, 2050, 2060, 2070 ]
    return yearArrNum;
};
