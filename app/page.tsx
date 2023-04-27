import LineSection from './components/chartSections/LineSection';
import LocationSection from './components/chartSections/LocationSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';

export default async function Home() {
    return (
        <>
            <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div>
            <TableSection />
            <LocationSection />
            <LineSection />
        </>
    );
}
