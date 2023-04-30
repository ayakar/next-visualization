'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const SideBar = () => {
    const pathname = usePathname();
    console.log(pathname === '/');
    return (
        <aside className="w-sidebar py-6 sticky top-0 h-screen">
            <div className="flex flex-col gap-2 shadow  p-6 h-full rounded">
                <Image
                    src="/assets/Riskthinking-logo.png"
                    alt="RiskThinkingAI logo"
                    width="150"
                    height="55"
                    className="mx-auto"
                />

                <Link href="/about">
                    <span className={pathname === '/about' ? 'sidebar-link__active' : ''}>About this Project</span>
                </Link>
                <Link href="/">
                    <span className={pathname === '/' ? 'sidebar-link__active' : ''}>My Work</span>
                </Link>
            </div>
        </aside>
    );
};

export default SideBar;
