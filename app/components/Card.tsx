import React from 'react';
import { Card as UICard, CardHeader, CardTitle, CardContent } from './ui/card';

interface Props {
    title: string;
    children: React.ReactNode;
    /** Set false for the table card, which manages its own padding/scroll. */
    padded?: boolean;
}

const Card: React.FC<Props> = ({ title, children, padded = true }) => (
    <UICard>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className={padded ? undefined : 'p-0'}>{children}</CardContent>
    </UICard>
);

export default Card;
