import React from 'react';
import { ChevronDown } from 'lucide-react';

/** Shared styling for the native filter <select> elements. */
export const selectClass =
    'h-9 min-w-control appearance-none rounded-md border border-border bg-card pl-3 pr-9 text-sm font-medium text-ink shadow-subtle outline-none transition-colors hover:border-brand-light focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-ring';

export const SelectChevron = () => (
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted" size={11} aria-hidden="true" />
);
