import { Montserrat } from 'next/font/google';
import '@/app/globals.css';

import Link from 'next/link';

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
                <nav>
                    <Link href="/">Home | </Link>
                    <Link href="/location">Location | </Link>
                    <Link href="/line">Line</Link>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
