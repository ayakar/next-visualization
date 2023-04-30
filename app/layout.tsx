import { Montserrat } from 'next/font/google';
import '@/app/globals.css';

import { FilterProvider } from './contexts/FilterContext';
import SideBar from './components/SideBar';

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
                    <SideBar />
                    <main className="flex-1 py-6">
                        <FilterProvider>{children}</FilterProvider>
                    </main>
                </div>
            </body>
        </html>
    );
}
