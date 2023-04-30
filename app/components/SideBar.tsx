'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const SideBar = () => {
    const pathname = usePathname();
    return (
        <aside className="w-sidebar py-6 sticky top-0 h-screen">
            <div className="flex flex-col gap-4 shadow  p-6 h-full rounded">
                <Image
                    src="/assets/Riskthinking-logo.png"
                    alt="RiskThinkingAI logo"
                    width={150}
                    height={55}
                    className="mx-auto mb-3"
                />

                <Link href="/about">
                    <span className={pathname === '/about' ? 'sidebar-link__active' : ''}>About This Project</span>
                </Link>
                <Link href="/">
                    <span className={pathname === '/' ? 'sidebar-link__active' : ''}>My Work</span>
                </Link>
                <button
                    onClick={() => {}} // TODO add content to this
                    className="mt-auto flex items-center gap-2 text-sm"
                >
                    <Image
                        className="rounded-full "
                        src="/assets/ayaka.jpg"
                        alt="Ayaka"
                        width={40}
                        height={40}
                    />
                    Ayaka Rogoza
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
