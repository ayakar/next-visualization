'use client';
import React, { useEffect, useState } from 'react';
import DeskTopSideBar from './SideBar';
import MobileMenu from './MobileMenu';

const SideBar = () => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
    useEffect(() => {
        const checkWidth = () => {
            const windowSize = window.innerWidth;

            if (windowSize < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    if (isMobile === true) {
        return <MobileMenu />;
    } else if (isMobile === false) {
        return <DeskTopSideBar />;
    } else {
        return null;
    }
};

export default SideBar;
