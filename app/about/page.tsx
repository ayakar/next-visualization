import Image from 'next/image';
import React from 'react';
import styles from './about.module.css';

export const metadata = {
    title: 'Risk Viz - About Project',
};

const AboutPage = () => {
    return (
        <div className="container">
            <section className={styles.section}>
                <h2 className={styles.largeTitle}>Summary</h2>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        Thank you for taking your time to review my submission. Please find the project requirements and a description of my solutions below.
                    </p>
                </div>
                <h2 className={styles.title}>Tech Stack</h2>
                <ul className={styles.ul}>
                    <li className={styles.li}>Next.js 13 with App directory</li>
                    <li className={styles.li}>TypeScript</li>
                    <li className={styles.li}>React Context for state management</li>
                    <li className={styles.li}>React Leaflet for generating map chart</li>
                    <li className={styles.li}>React Chart.js 2 for generating line chart</li>
                    <li className={styles.li}>Tailwind for styling</li>
                    <li className={styles.li}>Jest/React Testing Library for testing</li>
                    <li className={styles.li}>Eslint</li>
                </ul>
                <div className={styles.logoWrapper}>
                    <Image
                        src="/assets/logo-nextjs.svg"
                        width={40}
                        height={40}
                        alt=""
                    />
                    <Image
                        src="/assets/logo-typescript.png"
                        width={35}
                        height={35}
                        alt=""
                    />
                    <Image
                        src="/assets/logo-react-leaflet.png"
                        width={40}
                        height={40}
                        alt=""
                    />
                    <Image
                        src="/assets/logo-charjs.png"
                        width={40}
                        height={40}
                        alt=""
                    />

                    <Image
                        src="/assets/logo-tailwind.png"
                        width={40}
                        height={40}
                        alt=""
                    />
                    <Image
                        src="/assets/logo-jest.png"
                        width={40}
                        height={40}
                        alt=""
                    />

                    <Image
                        src="/assets/logo-rtl.png"
                        width={40}
                        height={40}
                        alt=""
                    />
                    <Image
                        src="/assets/logo-eslint.png"
                        width={40}
                        height={40}
                        alt=""
                    />
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.largeTitle}>Problem 1: Implement a Map with Location Markers and Risk Indicators</h2>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Set up a Next.js boilerplate app using the provided command.</h3>
                    <p className={styles.text}>
                        The provided command was run and latest Next.js, TypeScript, Tailwind were installed. Only modification made was to remove the src
                        directory flag.
                    </p>
                </div>

                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Load and parse the sample datasets.</h3>
                    <p className={styles.text}>
                        When the Nextjs server is started, the entire 5000 row dataset is loaded into server-side memory. Data for the map component is provided
                        by the risks/map API endpoint. This endpoint performs data transformation server-side to group data by lat, long (see section on
                        performance for more details on API structure). The response object is a json object where keys are the distinct lat,longs in the
                        dataset so that O(1) lookups can be done for a given lat,long if necessary.
                    </p>
                </div>

                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Integrate a mapping library (e.g., Mapbox, Leaflet, Google Maps).</h3>
                    <p className={styles.text}>Leaflet was selected for the mapping library.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}> Implement a control for users to select different decades</h3>
                    <p className={styles.text}>Implemented and integrated into the filter controls along the top of the UI.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Display the locations (Lat, Long) from the dataset as markers on the map of a given decade year.</h3>
                    <p className={styles.text}>Markers were implemented using svg images.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Color-code the markers based on their Risk Rating (climate risk score) derived from the dataset.</h3>
                    <p className={styles.text}>
                        Map markers were colour coded based on brand colours and categorized by low(&gt; .5), medium (.5-.7), high risk (&gt; .7).
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Add interactivity to the map, such as zooming and panning, and display a tooltip with the Asset Name and Business Category on marker
                        hover.
                    </h3>
                    <p className={styles.text}>
                        Implemented using the leaflet library. The map was also considered a filtering tool so when a marker is clicked a filter for the
                        selected lat, long is applied to the dataset. Additionally, when a marker is selected, all other markers are hidden and a message is
                        shown to make clear to the user that a filter is in effect.
                    </p>
                </div>
            </section>
            <section className={styles.section}>
                <h2 className={styles.largeTitle}>Problem 2: Create a Data Table with Sorting and Filtering Capabilities</h2>

                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Create a data table component.</h3>
                    <p className={styles.text}>Datatable component was created &rsquo;from scratch&rsquo; without the use of a library.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Load and display the sample dataset with a given year selection (from Problem 1) in the table.</h3>
                    <p className={styles.text}>
                        Implemented similar to map component, dedicated API created (risks/table) which returns paginated results used by the table. Component
                        also linked to any global filters applied.
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Implement sorting functionality on reasonable columns.</h3>
                    <p className={styles.text}> Sorting applied to Asset Name, Lat, Long, Business Category, Risk Rating, and Year.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Implement filter functionality on reasonable columns, especially risk factors.</h3>
                    <p className={styles.text}>
                        Individual risk factor checkboxes were provided in the filter controls section at the top of the page. Additionally, all other filters
                        (Year, Assets, Business Categories) are also applied to datatable.
                    </p>
                </div>
            </section>
            <section className={styles.section}>
                <h2 className={styles.largeTitle}>Problem 3: Visualize Risk Over Time with Line Graphs</h2>

                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Set up a charting library (e.g., Chart.js, D3.js, Highcharts).</h3>
                    <p className={styles.text}>React Chart.js2 was selected and implemented.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Implement a line graph component that displays the Risk Rating over time (Year) for a selected location (Lat, Long), Asset, or Business
                        Category.
                    </h3>

                    <p className={styles.text}>
                        A specific API endpoint was created to aggregate the data by year and calculate average risk rating for an entire year. Additionally,
                        average risk rating (within a year)for each specific risk factor was calculated.
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Add interactivity to the graph, such as tooltips displaying Asset Name, Risk Rating, Risk Factors, and Year.
                    </h3>
                    <p className={styles.text}>
                        Tool tips were constructed to show average risk rating for a given year for applied filters. Additionally, the average risk rating is
                        displayed for each risk factor for a given year.
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Implement controls for selecting different locations, Assets, or Business Categories to visualize their risk levels over time. You may
                        need to perform some data aggregation in order to achieve this.
                    </h3>
                    <p className={styles.text}>Implemented by linking line data with global filters.</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.largeTitle}>Problem 4: Integrate Components and Optimize Performance</h2>

                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Design a user interface that integrates the map, data table, and line graph components.</h3>
                    <p className={styles.text}>
                        Design was developed around a single set of filters at the top of the UI. The map component also acts as the lat, long filter for the
                        application. All 3 components (map, line chart, table) share the same set of filters.
                    </p>
                    <p className={styles.text}>Applied Basic Mobile Styling. Future improvements include making filter components hidden via side-drawer.</p>
                    <p className={styles.text}>
                        Tested for accessibility with Google Lighthouse (98%). Also implemented keyboard navigation for accessibility.
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Implement state management to handle user interactions and data flow between components (e.g., selecting a location on the map updates
                        the line graph and data table).
                    </h3>
                    <p className={styles.text}>
                        Implemented by React Context which stores all filter values (Year, Asset, Business Category, Risk Factors, Location).
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>
                        Optimize the app&rsquo;s performance by implementing lazy loading for components and efficient data handling, such as pagination for the
                        data table.
                    </h3>
                    <p className={styles.text}>
                        Map component implements lazy loading with &rsquo;next/dynamic&rsquo;. Data table was implemented with pagination so only 10 results at
                        a time are sent client-side.
                    </p>
                    <p className={styles.text}>
                        Additionally, the dataset used for initial page load is pre-generated on server-side so the app can be rendered on first load without
                        making initial API call.
                    </p>
                    <p className={styles.text}>Performance also measured by Google Lighthouse to achieve 95% score:</p>
                    <div className={styles.screenshotWrapper}>
                        <Image
                            src="/assets/screenshot.png"
                            width={300}
                            height={300}
                            alt="google lighthouse screenshot"
                        />
                    </div>

                    <p className={styles.text}>
                        To ensure performance and scalability both on client and server side, each charts were provided individual API endpoint which sends the
                        transformed/aggregated data for the specific component. Currently, these transformations are performed within NextJs API Routes, but
                        would be replaced with API calls to a backend/database in a production environment.
                    </p>
                    <p className={styles.text}>Where possible, data was transformed to javascript objects. This was for O(1) lookups on keys.</p>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>(Bonus) Implement reasonable tests for utility functions, data flow hooks, and React components.</h3>
                    <p className={styles.text}>Jest and React Testing Library was used for testing.</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>References</h2>
                <ul className={styles.ul}>
                    <li className={styles.li}>Official Documentations for each package/library</li>
                    <li className={styles.li}>
                        <a
                            className={styles.link}
                            href="https://www.youtube.com/watch?v=gSSsZReIFRk"
                            target="_blank"
                        >
                            https://www.youtube.com/watch?v=gSSsZReIFRk
                        </a>{' '}
                        for Next.js 13 new functionalities
                    </li>
                    <li className={styles.li}>
                        <a
                            className={styles.link}
                            href="https://www.youtube.com/watch?v=Y6KDk5iyrYE"
                            target="_blank"
                        >
                            https://www.youtube.com/watch?v=Y6KDk5iyrYE
                        </a>{' '}
                        for more in depth Next.js 13 concepts
                    </li>
                    <li className={styles.li}>
                        <a
                            className={styles.link}
                            href="https://www.bekk.christmas/post/2020/13/a-hot-chocolate-map-with-react-leaflet-and-typescript"
                        >
                            https://www.bekk.christmas/post/2020/13/a-hot-chocolate-map-with-react-leaflet-and-typescript
                        </a>{' '}
                        for React leaflet
                    </li>
                    <li className={styles.li}>ChatGPT for tailwind class names as well as TypeScript syntax.</li>
                </ul>
            </section>
        </div>
    );
};

export default AboutPage;
