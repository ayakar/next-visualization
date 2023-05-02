import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';
import SelectYear from './components/SelectYear';
import SelectAsset from './components/SelectAsset';
import SelectBusinessCategory from './components/SelectBusinessCategory';
import CheckBoxRiskFactor from './components/CheckBoxRiskFactor';
import ClearFilterButton from './components/ClearFilterButton';
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
        <>
            <div className="container">
                <div className="relative max-w-900 flex flex-col md:flex-row gap-x-6 gap-y-3 items-start flex-wrap px-2 pb-4 ">
                    <SelectYear initialAvailableYears={initialAvailableYears} />
                    <SelectAsset initialAvailableAssets={initialAvailableAssets} />
                    <SelectBusinessCategory initialAvailableBusinessCategories={initialAvailableBusinessCategories} />
                    <CheckBoxRiskFactor />
                    <ClearFilterButton />
                </div>
            </div>

            <div className=" container flex  flex-wrap md:flex-row">
                <MapSection initialMapResponse={initialMapResponse} />
                <LineSection initialLineResponse={initialLineResponse} />
                <TableSection initialTableResponse={initialTableResponse} />
            </div>
        </>
    );
}
