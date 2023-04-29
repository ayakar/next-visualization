import { Montserrat } from 'next/font/google';
import '@/app/globals.css';

import Link from 'next/link';
import { FilterProvider } from './contexts/FilterContext';
import Image from 'next/image';

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
                <div className="flex gap-6 px-6">
                    <aside className="w-sidebar py-6 sticky top-0 h-screen">
                        <div className="flex flex-col gap-2 shadow  p-6 h-full rounded">
                            <Image
                                src="/assets/Riskthinking-logo.png"
                                alt="RiskThinkingAI logo"
                                width="150"
                                height="55"
                                className="mx-auto"
                            />
                            <Link href="#">About this Project</Link>
                            <Link href="/">My Work</Link>
                        </div>
                    </aside>
                    <main className="flex-1 py-6">
                        <FilterProvider>{children}</FilterProvider>
                    </main>
                </div>
            </body>
        </html>
    );
}
