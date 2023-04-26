import React, { useEffect, useState } from 'react';
import { Risk } from '../../types/RiskRating';

interface Props {
    thLabel: string;
    sortClickHandler: (label: string, sortOrder: boolean) => void;
}

const Th: React.FC<Props> = ({ thLabel, sortClickHandler }) => {
    const [isAcs, setIsAcs] = useState(true);

    useEffect(() => {
        sortClickHandler(thLabel, isAcs);
    }, [isAcs]);

    return (
        <th onClick={() => setIsAcs((prev) => !prev)}>
            {thLabel} - {isAcs ? 'up' : 'down'}
        </th>
    );
};

export default Th;
