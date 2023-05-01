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
            // revalidate: 60 * 60 * 24, // TODO: use this
            revalidate: 1,
        },
    });
    const data = await res.json();
    return data;
};
const fetchInitialAvailableAssets = async () => {
    const res = await fetch(`${config.url.RISKS_ASSETS}`, {
        next: {
            // revalidate: 60 * 60 * 24, // TODO: use this
            revalidate: 1,
        },
    });
    const data = await res.json();
    return data;
};
const fetchInitialAvailableBusinessCategories = async () => {
    const res = await fetch(`${config.url.RISKS_CATEGORIES}`, {
        next: {
            // revalidate: 60 * 60 * 24, // TODO: use this
            revalidate: 1,
        },
    });
    const data = await res.json();

    return data;
};

const fetchInitialTableData = async () => {
    const res = await fetch(`${config.url.RISKS_TABLE}?limit=10`, {
        next: {
            // revalidate: 60 * 60 * 24, // TODO: use this
            revalidate: 1,
        },
    });
    const data = await res.json();
    return data;
};

const fetchInitialLineData = async () => {
    const res = await fetch(`${config.url.RISKS_LINE}`, {
        next: {
            // revalidate: 60 * 60 * 24, // TODO: use this
            revalidate: 1,
        },
    });
    const data = await res.json();
    return data;
};
const fetchInitialMapData = async () => {
    const res = await fetch(`${config.url.RISKS_MAP}`, {
        next: {
            // revalidate: 60 * 60 * 24, // TODO: use this
            revalidate: 1,
        },
    });
    const data = await res.json();

    return data;
};

// TODO: make sure vercel ENV var enable ssr
export default async function Home() {
    const initialTableResponse = await fetchInitialTableData();
    const initialLineResponse = await fetchInitialLineData();
    const initialMapResponse = await fetchInitialMapData();
    const initialAvailableYears = await fetchInitialAvailableYears();
    const initialAvailableAssets = await fetchInitialAvailableAssets();
    const initialAvailableBusinessCategories = await fetchInitialAvailableBusinessCategories();

    return (
        <>
            <div className="container flex gap-x-6  gap-y-3 items-start flex-wrap ">
                <SelectYear initialAvailableYears={initialAvailableYears} />
                <SelectAsset initialAvailableAssets={initialAvailableAssets} />
                <SelectBusinessCategory initialAvailableBusinessCategories={initialAvailableBusinessCategories} />
                <CheckBoxRiskFactor />
            </div>
            <div className="container flex flex-col flex-wrap gap-10">
                <div className="flex gap-10">
                    <MapSection initialMapResponse={initialMapResponse} />
                    <LineSection initialLineResponse={initialLineResponse} />
                </div>

                <TableSection initialTableResponse={initialTableResponse} />
            </div>
        </>
    );
}
