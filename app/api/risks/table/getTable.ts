import risks from '@/app/api/data.json';
import { Risk } from '@/app/types/RiskRating';

export const getTable = (filtered: Risk[] | null, limit: string, offset: string) => {
    // getTable() can be called from rsc
    if (filtered === null) {
        filtered = risks;
    }

    const totalPages = Math.ceil(filtered.length / parseInt(limit));
    filtered = trimRisks(filtered, limit, offset);

    return { data: filtered, totalPages, currentPage: parseInt(offset) / parseInt(limit) + 1 };
};

const trimRisks = (data: Risk[], limit: string, offset: string) => {
    const startIndex = parseInt(offset);
    const endIndex = parseInt(offset) + parseInt(limit);
    const trimmedData = data.slice(startIndex, endIndex);
    return trimmedData;
};
