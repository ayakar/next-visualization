'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SideBarPopup from './SideBarPopup';
const SideBar = () => {
    const pathname = usePathname();
    const [showPopup, setShowPopup] = useState(true);
    return (
        <aside className="w-sidebar py-6 sticky top-0 h-screen ">
            <div className="flex flex-col gap-4 shadow  p-6 h-full rounded">
                <Image
                    src="/assets/Riskthinking-logo.png"
                    alt="RiskThinkingAI logo"
                    width={150}
                    height={55}
                    className="mx-auto mb-3"
                    priority={true}
                />

                <Link href="/about">
                    <span className={pathname === '/about' ? 'sidebar-link__active' : ''}>About This Project</span>
                </Link>
                <Link href="/">
                    <span className={pathname === '/' ? 'sidebar-link__active' : ''}>My Work</span>
                </Link>
                <div className="relative mt-auto  text-sm">
                    <button
                        onClick={() => setShowPopup(true)}
                        className="flex items-center gap-2 "
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
                    {showPopup && <SideBarPopup closeHandler={setShowPopup} />}
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
