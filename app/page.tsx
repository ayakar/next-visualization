import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';
import { config } from './constants/endpoints';

const fetchInitialTableData = async () => {
    const res = await fetch(`${config.url.RISKS}?year=2030&limit=10`, {
        next: {
            revalidate: 60,
        },
    });
    const data = await res.json();
    return data;
};

export default async function Home() {
    const initialTableResponse = await fetchInitialTableData();
    return (
        <>
            {/* <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div> */}

            <TableSection initialTableResponse={initialTableResponse} />
            <MapSection />
            <LineSection />
        </>
    );
}
