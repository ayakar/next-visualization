// this can be in page.tsx
import risks from '@/app/api/data.json';
import { Risk } from '@/app/types/RiskRating';
export const getBusinessCategories = () => {
    const businessCategory: { [key: string]: boolean } = {};
    risks.forEach((risk: Risk) => (businessCategory[risk['Business Category']] = true));
    const businessCategoriesArr = Object.keys(businessCategory);
    const businessCategoriesArrNum = businessCategoriesArr.map((businessCategoryArr) => businessCategoryArr);
    const sorted = businessCategoriesArrNum.sort();
    return sorted;
};
