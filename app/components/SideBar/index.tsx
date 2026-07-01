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
    <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/30 bg-white/18">
        <span className="h-3 w-3 rounded-full border-2 border-white" />
        <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-white ring-2 ring-white/30" />
    </span>
);

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
    const pathname = usePathname();
    return (
        <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-2.5 p-6">
                <BrandMark />
                <div className="text-base font-semibold leading-tight text-white">
                    {BRAND.name}
                    <span className="block text-2xs font-medium uppercase tracking-widest text-white/72">{BRAND.tagline}</span>
                </div>
            </div>

            {NAV_SECTIONS.map((section) => (
                <div key={section.label} className="px-3 py-2">
                    <div className="mb-1.5 px-2 text-2xs font-semibold uppercase tracking-widest text-white/72">{section.label}</div>
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
                                    active ? 'bg-white/20 text-white' : 'text-white/85 hover:bg-white/14 hover:text-white'
                                }`}
                            >
                                {active && <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-r bg-white" />}
                                <Icon className="shrink-0 opacity-90" size={16} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            ))}

            {/* author speech bubble — solid "translucent-looking" colour (bg-note) so the tail joins cleanly */}
            <div className="bg-note relative mx-3 mb-4 mt-auto rounded-card border border-white/24 px-4 py-3 text-xs leading-relaxed text-white/90">
                {AUTHOR.note.lead} <b className="font-semibold text-white">{AUTHOR.firstName}</b>.<br />
                {AUTHOR.note.tail}
                <span className="bg-note absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-white/24" />
            </div>

            {/* logged-in user */}
            <div className="mx-3 mb-4 flex items-center gap-2.5 rounded-xl border border-white/24 bg-white/12 p-2.5">
                <div className="relative h-9 w-9 shrink-0">
                    <Image src={AUTHOR.avatar} alt={AUTHOR.name} width={36} height={36} className="h-full w-full rounded-full border-2 border-white/30 object-cover" />
                    <span className="absolute -bottom-px -right-px h-3 w-3 rounded-full border-2 border-brand-dark bg-risk-low" />
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
            <aside className="bg-brand-gradient fixed bottom-0 left-0 top-0 z-50 hidden w-sidebar flex-col overflow-hidden lg:flex">
                <SidebarContent />
            </aside>

            {/* mobile: top bar + Sheet drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
                <header className="bg-brand-gradient fixed inset-x-0 top-0 z-header flex h-header items-center justify-between px-4 lg:hidden">
                    <div className="flex items-center gap-2.5 font-semibold text-white">
                        <BrandMark />
                        <span>{BRAND.name}</span>
                    </div>
                    <SheetTrigger asChild>
                        <button type="button" aria-label="Open navigation" className="-m-2 rounded-lg p-2 text-white hover:bg-white/14">
                            <Menu size={22} />
                        </button>
                    </SheetTrigger>
                </header>

                <SheetContent side="left" className="bg-brand-gradient overflow-hidden border-0 p-0 text-white">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <SidebarContent onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default SideBar;
