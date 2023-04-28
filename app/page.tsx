import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';

export default async function Home() {
    return (
        <>
            <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div>
            <TableSection />
            <MapSection />
            <LineSection />
        </>
    );
}
