import dynamic from 'next/dynamic';
import React from 'react';

const Location = dynamic(() => import('./Map'), { ssr: false });

export default Location;
