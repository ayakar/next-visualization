const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://127.0.0.1:3000'; // TODO: fix this
// const domain = process.env.DOMAIN;

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
