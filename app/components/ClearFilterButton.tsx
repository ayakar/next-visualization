'use client';
import React from 'react';
import { X } from 'lucide-react';
import { useFilters } from '../hooks/useFilters';
import { Button } from './ui/button';

const ClearFilterButton = () => {
    const { hasActiveFilters, clearAll } = useFilters();

    if (!hasActiveFilters) return null;

    return (
        <Button variant="outline" size="sm" onClick={clearAll} className="ml-auto text-ink-soft hover:text-brand">
            <X size={16} /> Clear filters
        </Button>
    );
};

export default ClearFilterButton;
