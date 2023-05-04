import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
    const pathname = usePathname();
    return (
        <div className="flex justify-between items-center px-2 py-3">
            <Image
                src="/assets/Riskthinking-logo.png"
                alt="RiskThinkingAI logo"
                width={120}
                height={55}
                priority={true}
            />

            <div className="flex gap-2 text-sm">
                <Link href="/">
                    <span className={pathname === '/' ? 'sidebar-link__active' : ''}>My Work</span>
                </Link>
                <Link href="/about">
                    <span className={pathname === '/about' ? 'sidebar-link__active' : ''}>About</span>
                </Link>
            </div>
        </div>
    );
};

export default MobileMenu;
