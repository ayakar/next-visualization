/**
 * Canonical colour values for non-CSS consumers (Chart.js, Leaflet) that need a
 * colour *string* and can't take a Tailwind class. Single source of truth — mirrors
 * the design tokens in tailwind.config.js / globals.css (see public/design/design-rules.html).
 */
export const BRAND_COLOR = '#0891b2';
export const SURFACE_COLOR = '#ffffff';

/** Aqua accent gradient stops (cyan → blue) — mirrors --g-from / --g-to. */
export const GRAD_FROM = '#06b6d4';
export const GRAD_TO = '#2563eb';

export const RISK_COLORS = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
} as const;

/** Risk tier from an average rating, matching the legend buckets. */
export const riskColorFor = (rating: number) => (rating > 0.7 ? RISK_COLORS.high : rating > 0.5 ? RISK_COLORS.medium : RISK_COLORS.low);
