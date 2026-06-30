/** Shared shape for the dashboard's filter state (mirrors the URL search params). */
export interface Filters {
    year: number | null;
    asset: string;
    category: string;
    riskFactors: string[];
    location: string;
}

/** Build the query string for a /api/risks/* endpoint from the current filters. */
export function riskSearchParams(f: Filters, extra: Record<string, string> = {}): string {
    const p = new URLSearchParams();
    if (f.year != null) p.set('year', String(f.year));
    if (f.category) p.set('business_category', f.category);
    if (f.asset) p.set('asset', f.asset);
    if (f.riskFactors.length) p.set('risk-factor', f.riskFactors.join(','));
    if (f.location) p.set('location', f.location);
    for (const [k, v] of Object.entries(extra)) p.set(k, v);
    return p.toString();
}

/** Stable React Query key for a view + filters (+ any view-specific extras like sort/page). */
export function riskQueryKey(view: string, f: Filters, extra: Record<string, unknown> = {}) {
    return ['risks', view, { ...f, ...extra }] as const;
}

/** Fetch JSON, throwing on non-2xx. Passes the React Query AbortSignal so stale requests cancel. */
export async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<T>;
}
