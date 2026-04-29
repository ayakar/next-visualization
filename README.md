# Risk Viz

An interactive dashboard for exploring climate-risk data across 5,000 assets — a map, a time-series line chart, and a sortable, paginated table, all driven by a shared filter state.

**Live:** https://next-visualization.vercel.app/

<!-- TODO: add a hero screenshot of the redesigned dashboard once design refresh lands -->

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # jest --watch
npm run build        # production build
```

Node 18+ recommended. No env vars required — the dataset is bundled.

## Features

- **Map** (Leaflet) with risk-coded markers; clicking a marker filters the rest of the dashboard to that location.
- **Line chart** (Chart.js) showing average risk rating per year, with per-risk-factor breakdown in the tooltip.
- **Table** with server-paginated rows (10/page) and per-column sorting.
- **Shared filter bar**: year, asset, business category, individual risk factors. All three views react to the same filters.
- Keyboard navigable; Lighthouse 98 a11y / 95 perf.

## Architecture

```
app/
├── api/risks/        # Route handlers — one endpoint per view, returns view-specific shape
│   ├── map/          #   { "lat,long": { markers, riskRating, ... } }   ← keyed for O(1) lookup
│   ├── line/         #   pre-aggregated by year
│   ├── table/        #   paginated, sorted server-side
│   └── filters/      #   distinct years / assets / categories
├── components/
│   ├── charts/       # Map, Line, Table — presentational
│   └── chartSections/# Section wrappers — own data-fetching for each view
├── contexts/         # FilterContext — single source of truth for filter state
├── hooks/            # useFetch
└── page.tsx          # Server component; pre-fetches initial payload for first paint
```

### Key decisions

**One endpoint per view, not one generic `/risks` endpoint.**
Each view needs a different shape (keyed object for the map, year-aggregated for the line, paginated rows for the table). Splitting them keeps payloads small and lets each endpoint do its own aggregation server-side instead of shipping 5k rows to the client and reshaping three times.

**Initial payload rendered on the server.**
`page.tsx` is an async server component that calls the same aggregation functions the route handlers use, so first paint has no client-side fetch waterfall. Subsequent filter changes hit the API.

**Map markers are also a filter.**
Clicking a marker pushes a `lat,long` into `FilterContext`, which the table and line chart both read. This was the cleanest way to make the map feel "live" without a separate "selected location" concept duplicated across components.

**React Context for filter state, not Redux/Zustand.**
The state surface is small (~5 fields) and only the filter bar writes to it. A store would be overkill. If filter state needed to survive reload or be shareable via URL, I'd move it to URL search params (see *What I'd do next*).

**Aggregation in API routes today; backend tomorrow.**
The dataset is loaded into server memory and reshaped per request. This is fine at 5k rows; at production scale (millions of rows, multi-tenant) the aggregation belongs in the database (materialized views or a columnar store like ClickHouse), with the Next API as a thin pass-through.

**Risk bucketing**: low (< 0.5), medium (0.5–0.7), high (> 0.7). Brand-aligned colors.

### Performance

- Map is lazy-loaded with `next/dynamic` (Leaflet is ~140 kB and SSR-incompatible).
- Table is paginated server-side — the client only ever holds 10 rows.
- Aggregations are keyed objects (lat,long → marker bucket) so lookups are O(1).
- Server component pre-fetch eliminates the initial fetch waterfall.

### Testing

Jest + React Testing Library. Coverage is intentionally focused on filter logic and the table — the parts most likely to regress when adding features. Charts are integration-tested through their section wrappers rather than unit-tested against Chart.js internals.

```bash
npm run coverage
```

## What I'd do next

A take-home is a snapshot. Were this a real product, the next iterations would be:

1. **URL-driven filter state** — make views shareable, support back/forward navigation.
2. **Move aggregation behind a real DB** — Postgres + materialized views, or DuckDB for read-heavy analytics. The current in-memory approach doesn't scale past a few tens of thousands of rows.
3. **E2E tests with Playwright** — the highest-value gap. Filter interactions span all three components and are exactly the kind of cross-cutting flow unit tests miss.
4. **Upgrade to Next 15 + React 19** — Server Actions would replace the route handlers, and the React Compiler removes most of the manual memoization a future perf pass would otherwise need.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript 5.7 · Tailwind 3 · React Leaflet · Chart.js · Jest · React Testing Library
