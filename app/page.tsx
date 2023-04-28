import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';
import { config } from './constants/endpoints';
import SelectYear from './components/SelectYear';
import SelectAsset from './components/SelectAsset';
import SelectBusinessCategory from './components/SelectBusinessCategory';
import CheckBoxRiskFactor from './components/CheckBoxRiskFactor';

const fetchInitialAvailableYears = async () => {
    const res = await fetch(`${config.url.RISKS_YEARS}`, {
        next: {
            revalidate: 1,
        }, // TODO: remove this
    });
    const data = await res.json();
    return data;
};
const fetchInitialAvailableAssets = async () => {
    const res = await fetch(`${config.url.RISKS_ASSETS}`, {
        next: {
            revalidate: 1,
        }, // TODO: remove this
    });
    const data = await res.json();
    return data;
};
const fetchInitialAvailableBusinessCategories = async () => {
    const res = await fetch(`${config.url.RISKS_CATEGORIES}`, {
        next: {
            revalidate: 1,
        }, // TODO: remove this
    });
    const data = await res.json();

    return data;
};

const fetchInitialTableData = async () => {
    const res = await fetch(`${config.url.RISKS_TABLE}?limit=10`, {
        next: {
            revalidate: 60,
        }, // TODO: remove this
    });
    const data = await res.json();
    return data;
};
// TODO: apply this
// const fetchInitialLineData = async () => {
//     const res = await fetch(`${config.url.RISKS}`, {
//         next: {
//             revalidate: 60,
//         }, // TODO: remove this
//     });
//     const data = await res.json();
//     return data;
// };
// const fetchInitialMapData = async () => {
//     const res = await fetch(`${config.url.RISKS}`, {
//         next: {
//             revalidate: 60,
//         }, // TODO: remove this
//     });
//     const data = await res.json();
//     return data;
// };

export default async function Home() {
    const initialTableResponse = await fetchInitialTableData();
    const initialAvailableYears = await fetchInitialAvailableYears();
    const initialAvailableAssets = await fetchInitialAvailableAssets();
    const initialAvailableBusinessCategories = await fetchInitialAvailableBusinessCategories();
    return (
        <>
            {/* <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div> */}
            <SelectYear initialAvailableYears={initialAvailableYears} />
            <SelectAsset initialAvailableAssets={initialAvailableAssets} />
            <SelectBusinessCategory initialAvailableBusinessCategories={initialAvailableBusinessCategories} />
            {/* TODO: change this to dynamic */}
            <CheckBoxRiskFactor />
            <MapSection />
            <LineSection />
            <TableSection initialTableResponse={initialTableResponse} />
        </>
    );
}
