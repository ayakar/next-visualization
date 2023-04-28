import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';
import { config } from './constants/endpoints';
import SelectYear from './components/SelectYear';
import SelectAsset from './components/SelectAsset';

const fetchInitialAvailableYears = async () => {
    const res = await fetch(`${config.url.RISKS_YEARS}`, {
        next: {
            revalidate: 1,
        }, // TODO: remove this
    });
    const data = await res.json();
    return data;
};
const fetchInitialAvailableAsset = async () => {
    const res = await fetch(`${config.url.RISKS_ASSETS}`, {
        next: {
            revalidate: 1,
        }, // TODO: remove this
    });
    const data = await res.json();
    return data;
};

const fetchInitialTableData = async () => {
    const res = await fetch(`${config.url.RISKS}?limit=10`, {
        next: {
            revalidate: 60,
        }, // TODO: remove this
    });
    const data = await res.json();
    return data;
};

export default async function Home() {
    const initialTableResponse = await fetchInitialTableData();
    const initialAvailableYears = await fetchInitialAvailableYears();
    const initialAvailableAsset = await fetchInitialAvailableAsset();
    return (
        <>
            {/* <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div> */}
            <SelectYear initialAvailableYears={initialAvailableYears} />
            <SelectAsset initialAvailableAsset={initialAvailableAsset} />
            <TableSection initialTableResponse={initialTableResponse} />
            {/* <MapSection />
            <LineSection /> */}
        </>
    );
}
