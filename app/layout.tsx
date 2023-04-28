import { Montserrat } from 'next/font/google';
import '@/app/globals.css';

import Link from 'next/link';
import { FilterProvider } from './contexts/FilterContext';

export const metadata = {
    title: 'Risk Viz',
};

const montserrat = Montserrat({
    weight: ['400', '500'],
    subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body className={montserrat.className}>
                <nav>side bar here?</nav>
                <main>
                    <FilterProvider>{children}</FilterProvider>
                </main>
            </body>
        </html>
    );
}
