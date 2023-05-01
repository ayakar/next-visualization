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
            <div className="container flex items-end justify-between">
                <div className="max-w-800 flex gap-x-6  gap-y-3 items-start flex-wrap ">
                    <SelectYear initialAvailableYears={initialAvailableYears} />
                    <SelectAsset initialAvailableAssets={initialAvailableAssets} />
                    <SelectBusinessCategory initialAvailableBusinessCategories={initialAvailableBusinessCategories} />
                    <CheckBoxRiskFactor />
                </div>

                <ClearFilterButton />
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
