import Image from 'next/image';
import React from 'react';
import styles from './about.module.css';
import { MockCard, type Mock } from './MockCard';

export const metadata = {
    title: 'Risk Viz - About Project',
};

// The colour directions I compared - each card carries its own verdict below the preview.
const EXPLORATION_MOCKS: Mock[] = [
    {
        file: 'dashboard.html',
        title: 'Violet · v1',
        note: 'Scored best on measured contrast - but felt cheap and generic once rendered. Passing an accessibility checker isn’t the same as looking like a product I’d want to ship.',
    },
    {
        file: 'theme-dark-indigo.html',
        title: 'Dark indigo',
        note: 'Read as visibly “AI-generated” - the kind of default dark theme every AI tool reaches for first. I wanted something with more of a point of view.',
    },
    {
        file: 'theme-cyan-sidebars.html',
        title: 'Cyan',
        note: 'Was close, but still felt a bit dated - not quite the sharper, more startup-native feel I was after. This is what sent me to Dribbble to look at what felt current; a few gradient-heavy dashboards stood out.',
    },
    {
        file: 'theme-cyan-gradients.html',
        title: 'Brand · aqua gradient',
        note: 'Where I landed. I asked Claude to try a gradient direction, which produced several color-pair options - cyan → blue was the one that felt the most legible and least “trendy for its own sake” against white surfaces and body text. Distinctive without sacrificing legibility, so I measured its contrast properly and made the deliberate accessibility trade-off documented below.',
        adopted: 'Adopted',
    },
];

// The shipped system, documented as a formal spec.
const SYSTEM_MOCKS: Mock[] = [
    { file: 'design-rules.html', title: 'Design system', note: 'The living spec: tokens, component rules and accessibility notes.' },
];

const AboutPage = () => {
    return (
        <div className="container">
            <h1 className={styles.pageTitle}>About This Project</h1>
            <p className={styles.topLinks}>
                <a
                    className={styles.link}
                    href="https://github.com/ayakar/next-visualization"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View source ↗
                </a>
            </p>

            <div className={styles.roleNav}>
                <p>
                    I like to own things end-to-end. This project shows both sides of that: the <a href="#design-exploration">design decisions</a> (color
                    system, <a href="#accessibility">accessibility trade-offs</a>, visual iteration) and the{' '}
                    <a href="#product-decisions">product &amp; technical calls</a> (API design, scope decisions, state management) that went into it. It also
                    reflects <a href="#documentation">how I keep work like this maintainable</a> - spec- and documentation-driven, for both my team and the AI
                    agents I pair with.
                </p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.largeTitle}>A Note on This Update (2026)</h2>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        This project started as RiskThinking.AI&rsquo;s{' '}
                        <a
                            className={styles.link}
                            href="https://github.com/RiskThinking/work-samples/blob/main/UI-UX-Developer.md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            UI/UX Developer work sample
                        </a>{' '}
                        - it&rsquo;s what got me hired there in 2023. Shared here with RiskThinking.AI&rsquo;s permission, consistent with the work
                        sample&rsquo;s own terms (&ldquo;you are more than welcome to keep your solutions public as a part of your professional
                        portfolio&rdquo;).
                    </p>
                    <p className={styles.text}>Three years later, the core was starting to look dated, so I gave it a refresh:</p>
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <b>Design system rebuilt</b> - new visual direction, documented in a formal design system (colors, type, spacing, motion, accessibility)
                        rather than ad hoc styling
                    </li>
                    <li className={styles.li}>
                        <b>Accessible component layer</b> - the original controls were custom-built (a deliberate call for a work sample); I moved them onto
                        shadcn/ui (Radix primitives) so the buttons, checkboxes and mobile drawer get keyboard and screen-reader support out of the box
                    </li>
                    <li className={styles.li}>
                        <b>Tooling &amp; CI updated</b> to reflect what I actually use in production today: React Query and nuqs for state/URL sync, Playwright
                        for end-to-end tests, and GitHub Actions running typecheck, lint, unit tests, a build and the e2e suite on every push
                    </li>
                    <li className={styles.li}>
                        <b>What didn&rsquo;t change:</b> the core logic and UX decisions below are the same ones I made in 2023. The API structure, data
                        transformation approach, and interaction model are original.
                    </li>
                </ul>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>What changed, concretely</h3>
                </div>
                <div className={styles.tableScroll}>
                    <table className={styles.changeTable}>
                        <caption className={styles.srOnly}>What changed between the 2023 original and the 2026 refresh</caption>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <span className={styles.srOnly}>Aspect</span>
                                </th>
                                <th scope="col">2023 Original</th>
                                <th scope="col">2026 Refresh</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Framework</th>
                                <td>Next.js 13 (App directory)</td>
                                <td>Next.js 14</td>
                            </tr>
                            <tr>
                                <th scope="row">State management</th>
                                <td>React Context</td>
                                <td>React Query + nuqs (URL state)</td>
                            </tr>
                            <tr>
                                <th scope="row">UI components</th>
                                <td>Custom-built</td>
                                <td>shadcn/ui (Radix primitives)</td>
                            </tr>
                            <tr>
                                <th scope="row">Styling</th>
                                <td>Tailwind</td>
                                <td>Tailwind (new design system)</td>
                            </tr>
                            <tr>
                                <th scope="row">Testing</th>
                                <td>Jest / React Testing Library</td>
                                <td>Jest / RTL + Playwright (e2e)</td>
                            </tr>
                            <tr>
                                <th scope="row">CI/CD</th>
                                <td>-</td>
                                <td>GitHub Actions (typecheck · lint · test · build · e2e)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        <b>Kept on purpose:</b> TypeScript, React Leaflet, Chart.js and ESLint were the right tools in 2023 and still are.
                    </p>
                    <p className={styles.text}>
                        I used AI tools (Claude) to iterate quickly through visual design options - in the same spirit of transparency RiskThinking.AI asked for
                        in the original work sample instructions (&ldquo;You can use AI assistants … but make sure to include the full interaction/chat log
                        along with your solution&rdquo;). Every design decision - the color system, the accessibility trade-off below, which direction to ship -
                        was mine.
                    </p>
                </div>
            </section>

            <section
                id="design-exploration"
                className={styles.section}
            >
                <h2 className={styles.largeTitle}>Design Exploration</h2>

                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Why not red, yellow, or green for the primary color</h3>
                    <p className={styles.text}>
                        Before comparing any themes, I ruled out red, amber and green as candidates for the primary/brand color - those three are already reserved
                        to encode risk severity (low/medium/high) throughout the dashboard. Using one of them as the brand color too would blur the one signal that
                        matters most in a risk tool: at a glance, color should tell you &ldquo;how risky,&rdquo; not &ldquo;what&rsquo;s clickable.&rdquo; That
                        constraint is what narrowed the search to blue/cyan/violet/indigo territory in the first place.
                    </p>

                    <h3 className={styles.title}>Comparing options</h3>
                    <p className={styles.text}>
                        I had Claude generate a few color-theme variants sharing the same layout, so I could compare them side-by-side rather than deciding in the
                        abstract:
                    </p>
                </div>
                <div className={styles.mockGrid}>
                    {EXPLORATION_MOCKS.map((mock) => (
                        <MockCard
                            key={mock.file}
                            mock={mock}
                        />
                    ))}
                </div>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        Every color in the shipped system is a token, not a raw hex value in components (see the design system&rsquo;s &ldquo;single source of
                        truth&rdquo; rule) - so this was also an architecture decision, not just a visual one.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.largeTitle}>Design System</h2>
                <p className={styles.processIntro}>
                    Where it landed - the shipped &ldquo;Aqua&rdquo; direction, documented as a formal system rather than ad hoc styling:
                </p>
                <div className={styles.mockGrid}>
                    {SYSTEM_MOCKS.map((mock) => (
                        <MockCard
                            key={mock.file}
                            mock={mock}
                        />
                    ))}
                </div>
            </section>

            <section
                id="documentation"
                className={styles.section}
            >
                <h2 className={styles.largeTitle}>How I Document Work Like This</h2>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        This sample ships with one design-system spec. In production that&rsquo;s the tip of the iceberg - the product I build day-to-day is
                        backed by ~20 living specs covering the craft of the work: a design system and tokens, accessibility, testing strategy, error &amp;
                        loading states, an icon and component inventory, environment setup, and project structure.
                    </p>
                    <p className={styles.text}>
                        I write them for two audiences at once - my team, and the AI coding agents (Claude) I pair with daily, where precise specs are what keep
                        an agent from drifting across a large codebase. I&rsquo;m happy to walk through a selection of these in an interview.
                    </p>
                </div>
            </section>

            <section
                id="accessibility"
                className={styles.section}
            >
                <h2 className={styles.largeTitle}>Accessibility: A Deliberate Trade-off</h2>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        I built a version that fully passed WCAG 2.2 AA across the board. I wasn&rsquo;t happy with it - the accent color felt flat and lost the
                        brand character I wanted. So I made a conscious call: relax contrast only on the aqua accent, only for large/bold labels and chrome, and
                        hold everything else (body text, badges, focus states) to AA. Every ratio is measured, not eyeballed - see the{' '}
                        <a
                            className={styles.link}
                            href="/design/design-rules.html#a11y"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            design system
                        </a>{' '}
                        for the full table.
                    </p>
                </div>
            </section>

            <section
                id="product-decisions"
                className={styles.section}
            >
                <h2 className={styles.largeTitle}>Product &amp; Technical Decisions</h2>
                <div className={styles.wrapper}>
                    <p className={styles.text}>
                        The work sample was deliberately open-ended in places (&ldquo;reasonable columns,&rdquo; &ldquo;reasonable tests,&rdquo; a hint that
                        &ldquo;the amount and dimension of the data we work with are much higher in reality&rdquo;). A few of the calls I made and why:
                    </p>
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <b>API shape: one endpoint per view, not one generic endpoint.</b> I could have shipped a single <code>/risks</code> endpoint and
                        filtered/aggregated client-side. Instead I split it into <code>risks/map</code>, <code>risks/table</code>, and a year-aggregated{' '}
                        <code>risks/line</code> endpoint for the chart - each returns only the shape of data that view needs, pre-aggregated server-side. This
                        trades a bit of backend duplication for meaningfully less client-side compute and payload size, which matters more as the dataset
                        (explicitly flagged in the brief as &ldquo;much higher in reality&rdquo;) scales past 5,000 rows.
                    </li>
                    <li className={styles.li}>
                        <b>Designing for scale beyond the sample data.</b> With that scaling hint in mind, I built lat/long lookups as O(1) keyed objects rather
                        than array scans, and paginated the table server-side rather than shipping all rows to the client - decisions that don&rsquo;t matter
                        much at 5,000 rows but would at 500,000.
                    </li>
                    <li className={styles.li}>
                        <b>Filters as shared state, not per-component props.</b> Every view (map, table, chart) reads from one global filter state, and the map
                        doubles as a filter input itself (clicking a marker filters everything else). This was a product call as much as a technical one - I
                        wanted the three views to feel like one coherent tool for asking &ldquo;where&rsquo;s the risk,&rdquo; not three separate widgets glued
                        together.
                    </li>
                    <li className={styles.li}>
                        <b>Where I drew the line on scope.</b> The brief left &ldquo;reasonable&rdquo; columns/tests deliberately vague. I prioritized sorting
                        and filtering on the fields a risk analyst would actually pivot on (location, category, rating, year) over exhaustive coverage of every
                        field, and wrote tests for the aggregation logic and data hooks - the parts most likely to silently break - over trying to hit 100%
                        coverage.
                    </li>
                    <li className={styles.li}>
                        <b>2026 state management migration (React Context → React Query + nuqs).</b> The original Context implementation worked fine for the
                        assessment&rsquo;s scope, but doesn&rsquo;t survive a page refresh and isn&rsquo;t shareable. Moving filter state into the URL via nuqs,
                        with React Query handling the data-fetching layer, means a filtered view is now a link you can send someone - a small change, but the
                        kind of thing that matters once real users start relying on it.
                    </li>
                </ul>
            </section>

            <div className={styles.eraDivider}>
                <span className={styles.eraLabel}>Original work sample · 2023</span>
            </div>
            <p className={styles.eraNote}>Everything below is my original 2023 submission, kept unchanged.</p>

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
                            target="_blank"
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
