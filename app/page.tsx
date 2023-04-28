import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';
import { config } from './constants/endpoints';

const fetchAssetData = async () => {
    const res = await fetch(`http://localhost:3000/${config.url.RISKS_ASSETS}`, {
        next: {
            revalidate: 60,
        },
    });

    const data = await res.json();
    console.log(data);
    return data;
};

export default async function Home() {
    const assetData = await fetchAssetData();
    return (
        <>
            <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div>
            {JSON.stringify(assetData)}
            <TableSection />
            <MapSection />
            <LineSection />
        </>
    );
}
