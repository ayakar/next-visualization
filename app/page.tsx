import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import TableSection from './components/chartSections/TableSection';
import SelectYear from './components/SelectYear';
import SelectAsset from './components/SelectAsset';
import SelectBusinessCategory from './components/SelectBusinessCategory';
import CheckBoxRiskFactor from './components/CheckBoxRiskFactor';
import ClearFilterButton from './components/ClearFilterButton';
import Card from './components/Card';
import { getYear } from './api/risks/filters/getYear';
import { getAssets } from './api/risks/filters/getAssets';
import { getBusinessCategories } from './api/risks/filters/getBusinessCategories';
import { getLine } from './api/risks/line/getLine';
import { getMap } from './api/risks/map/getMap';
import { getTable } from './api/risks/table/getTable';

export default async function Home() {
    const initialAvailableYears = getYear();
    const initialAvailableAssets = getAssets();
    const initialAvailableBusinessCategories = getBusinessCategories();
    const initialTableResponse = getTable(null, '10', '0');
    const initialLineResponse = getLine(null, null);
    const initialMapResponse = getMap(null, null);

    return (
        <div className="mx-auto max-w-content">
            <header className="mb-5 lg:mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Climate Risk Overview</h1>
                <p className="mt-0.5 text-sm text-ink-soft">Explore risk across 5,000 assets - map, trend, and ledger in one view.</p>
            </header>

            <div className="mb-4 flex flex-wrap items-center gap-2 rounded-card border border-border bg-card p-3.5 shadow-subtle">
                <SelectYear initialAvailableYears={initialAvailableYears} />
                <SelectAsset initialAvailableAssets={initialAvailableAssets} />
                <SelectBusinessCategory initialAvailableBusinessCategories={initialAvailableBusinessCategories} />
                <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
                <CheckBoxRiskFactor />
                <ClearFilterButton />
            </div>

            <div className="mb-4 grid gap-4 xl:grid-cols-dashboard">
                <Card title="Geographic distribution">
                    <MapSection initialMapResponse={initialMapResponse} />
                </Card>
                <Card title="Average risk · by year">
                    <LineSection initialLineResponse={initialLineResponse} />
                </Card>
            </div>

            <Card
                title="Asset ledger"
                padded={false}
            >
                <TableSection initialTableResponse={initialTableResponse} />
            </Card>
        </div>
    );
}
