'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Info, Menu, LucideIcon } from 'lucide-react';
import { BRAND, NAV_SECTIONS, AUTHOR, NavIcon } from '@/app/constants/sidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet';

const ICONS: Record<NavIcon, LucideIcon> = {
    dashboard: LayoutDashboard,
    info: Info,
};

const BrandMark = () => (
    <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/20 bg-white/15">
        <span className="h-3 w-3 rounded-full border-2 border-white" />
        <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-soft ring-2 ring-brand" />
    </span>
);

const SidebarGlows = () => (
    <>
        <span aria-hidden="true" className="pointer-events-none absolute rounded-full bg-white/5" style={{ top: -70, right: -70, width: 180, height: 180 }} />
        <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{ bottom: -50, left: -60, width: 230, height: 230, background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.32), transparent 68%)' }}
        />
    </>
);

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
    const pathname = usePathname();
    return (
        <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-2.5 p-6">
                <BrandMark />
                <div className="text-base font-semibold leading-tight text-white">
                    {BRAND.name}
                    <span className="block text-2xs font-medium uppercase tracking-widest text-white/50">{BRAND.tagline}</span>
                </div>
            </div>

            {NAV_SECTIONS.map((section) => (
                <div key={section.label} className="px-3 py-2">
                    <div className="mb-1.5 px-2 text-2xs font-semibold uppercase tracking-widest text-white/50">{section.label}</div>
                    {section.items.map((item) => {
                        const Icon = ICONS[item.icon];
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                aria-current={active ? 'page' : undefined}
                                className={`relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    active ? 'bg-brand/30 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {active && <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-r bg-brand-soft" />}
                                <Icon className="shrink-0 opacity-90" size={16} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            ))}

            {/* author speech bubble */}
            <div className="relative mx-3 mb-4 mt-auto rounded-card border border-white/10 bg-onyx-raised px-4 py-3 text-xs leading-relaxed text-white/90 shadow-bubble">
                {AUTHOR.note.lead} <b className="font-semibold text-white">{AUTHOR.firstName}</b>.<br />
                {AUTHOR.note.tail}
                <span className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-onyx-raised" />
            </div>

            {/* logged-in user */}
            <div className="mx-3 mb-4 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5">
                <div className="relative h-9 w-9 shrink-0">
                    <Image src={AUTHOR.avatar} alt={AUTHOR.name} width={36} height={36} className="h-full w-full rounded-full border-2 border-white/25 object-cover" />
                    <span className="absolute -bottom-px -right-px h-3 w-3 rounded-full border-2 border-onyx bg-risk-low" />
                </div>
                <div className="text-sm font-semibold text-white">{AUTHOR.name}</div>
            </div>
        </div>
    );
};

const SideBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* desktop: fixed sidebar */}
            <aside className="fixed bottom-0 left-0 top-0 z-50 hidden w-sidebar flex-col overflow-hidden bg-onyx lg:flex">
                <SidebarGlows />
                <SidebarContent />
            </aside>

            {/* mobile: top bar + Sheet drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
                <header className="fixed inset-x-0 top-0 z-header flex h-header items-center justify-between bg-onyx px-4 lg:hidden">
                    <div className="flex items-center gap-2.5 font-semibold text-white">
                        <BrandMark />
                        <span>{BRAND.name}</span>
                    </div>
                    <SheetTrigger asChild>
                        <button type="button" aria-label="Open navigation" className="-m-2 rounded-lg p-2 text-white hover:bg-white/10">
                            <Menu size={22} />
                        </button>
                    </SheetTrigger>
                </header>

                <SheetContent side="left" className="overflow-hidden border-0 bg-onyx p-0 text-white">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <SidebarGlows />
                    <SidebarContent onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default SideBar;
