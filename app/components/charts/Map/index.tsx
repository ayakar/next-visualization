import dynamic from 'next/dynamic';
import React from 'react';

const Map = dynamic(() => import('./Map'), { ssr: false });

export default Map;
