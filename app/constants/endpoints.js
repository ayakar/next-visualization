const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'PROD_url_here!';

export const config = {
    url: {
        RISKS_TABLE: `${domain}/api/risks/table`,
        RISKS_LINE: `${domain}/api/risks/line`,
        RISKS_MAP: `${domain}/api/risks/map`,
        RISKS_YEARS: `${domain}/api/risks/years`,
        RISKS_ASSETS: `${domain}/api/risks/assets`,
        RISKS_LOCATIONS: `${domain}/api/risks/locations`,
        RISKS_CATEGORIES: `${domain}/api/risks/business_categories`,
    },
};
