import LineSection from './components/chartSections/LineSection';
import MapSection from './components/chartSections/MapSection';
import styles from './page.module.css';
import TableSection from './components/chartSections/TableSection';
import { config } from './constants/endpoints';
import SelectYear from './components/SelectYear';
import SelectAsset from './components/SelectAsset';
import SelectBusinessCategory from './components/SelectBusinessCategory';
import CheckBoxRiskFactor from './components/CheckBoxRiskFactor';
import { getYear } from './api/risks/years/getYear';
import { getLine } from './api/risks/line/getLine';
import { LineChartData } from './types/RiskRating';

const fetchInitialAvailableYears = () => {
    // TODO: make sure ssr working on Prod
    // try {
    //     const res = await fetch(`${config.url.RISKS_YEARS}`, {
    //         next: {
    //             // revalidate: 60 * 60 * 24, // TODO: use this
    //             revalidate: 1,
    //         },
    //     });
    const data = getYear();
    return data;
    // } catch (err) {
    //     console.log('err: ', err);
    // }
};
// const fetchInitialAvailableAssets = async () => {
//     // TODO: make sure ssr working on Prod
//     try {
//         const res = await fetch(`${config.url.RISKS_ASSETS}`, {
//             next: {
//                 // revalidate: 60 * 60 * 24, // TODO: use this
//                 revalidate: 1,
//             },
//         });
//         const data = await res.json();
//         return data;
//     } catch (err) {
//         console.log('err: ', err);
//     }
// };
// const fetchInitialAvailableBusinessCategories = async () => {
//     // TODO: make sure ssr working on Prod
//     try {
//         const res = await fetch(`${config.url.RISKS_CATEGORIES}`, {
//             next: {
//                 // revalidate: 60 * 60 * 24, // TODO: use this
//                 revalidate: 1,
//             },
//         });
//         const data = await res.json();

//         return data;
//     } catch (err) {
//         console.log('err: ', err);
//     }
// };

// const fetchInitialTableData = async () => {
//     // TODO: make sure ssr working on Prod
//     try {
//         const res = await fetch(`${config.url.RISKS_TABLE}?limit=10`, {
//             next: {
//                 // revalidate: 60 * 60 * 24, // TODO: use this
//                 revalidate: 1,
//             },
//         });
//         const data = await res.json();
//         return data;
//     } catch (err) {
//         console.log('err: ', err);
//     }
// };

const fetchInitialLineData = () => {
    // TODO: make sure ssr working on Prod
    // try {
    // const res = await fetch(`${config.url.RISKS_LINE}`, {
    //     next: {
    //         // revalidate: 60 * 60 * 24, // TODO: use this
    //         revalidate: 1,
    //     },
    // });
    const data = getLine(null, null);
    return data;
    // } catch (err) {
    //     console.log('err: ', err);
    //     return null;
    // }
};
// const fetchInitialMapData = async () => {
//     // TODO: make sure ssr working on Prod
//     try {
//         const res = await fetch(`${config.url.RISKS_MAP}`, {
//             next: {
//                 // revalidate: 60 * 60 * 24, // TODO: use this
//                 revalidate: 1,
//             },
//         });
//         const data = await res.json();

//         return data;
//     } catch (err) {
//         console.log('err: ', err);
//     }
// };
// TODO: make sure data.json is collect content
export default async function Home() {
    // const initialTableResponse = await fetchInitialTableData();
    const initialLineResponse = getLine(null, null);
    // const initialMapResponse = await fetchInitialMapData();
    const initialAvailableYears = getYear();
    // const initialAvailableAssets = await fetchInitialAvailableAssets();
    // const initialAvailableBusinessCategories = await fetchInitialAvailableBusinessCategories();

    return (
        <>
            <div className="container flex gap-x-6  gap-y-3 items-start flex-wrap ">
                <SelectYear initialAvailableYears={initialAvailableYears} />
                {/* <SelectAsset initialAvailableAssets={initialAvailableAssets} />
                <SelectBusinessCategory initialAvailableBusinessCategories={initialAvailableBusinessCategories} />
                <CheckBoxRiskFactor /> */}
            </div>
            <div className="container flex flex-col flex-wrap gap-10">
                <div className="flex gap-10">
                    {/*    <MapSection initialMapResponse={initialMapResponse} /> */}
                    <LineSection initialLineResponse={initialLineResponse} />
                </div>

                {/*  <TableSection initialTableResponse={initialTableResponse} /> */}
            </div>
        </>
    );
}
