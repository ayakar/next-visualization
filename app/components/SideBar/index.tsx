'use client';
import React, { useEffect, useState } from 'react';
import DeskTopSideBar from './SideBar';
import MobileMenu from './MobileMenu';

const SideBar = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkWidth = () => {
            const windowSize = window.innerWidth;
            if (windowSize < 1024) {
                setIsMobile(true); // TODO add event listener and remove event listener
            } else {
                setIsMobile(false);
            }
        };
        window.addEventListener('resize', checkWidth);
        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    if (isMobile) {
        return <MobileMenu />;
    }
    return <DeskTopSideBar />;
};

export default SideBar;
