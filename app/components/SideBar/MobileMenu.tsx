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
                width={150}
                height={55}
                priority={true}
            />

            <div className="flex gap-4">
                <Link href="/about">
                    <span className={pathname === '/about' ? 'sidebar-link__active' : ''}>About This Project</span>
                </Link>
                <Link href="/">
                    <span className={pathname === '/' ? 'sidebar-link__active' : ''}>My Work</span>
                </Link>
            </div>
        </div>
    );
};

export default MobileMenu;
