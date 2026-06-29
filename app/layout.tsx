import { Poppins } from 'next/font/google';
import '@/app/globals.css';

import { FilterProvider } from './contexts/FilterContext';
import SideBar from './components/SideBar';

export const metadata = {
    title: 'Risk Viz',
    icons: {
        icon: '/favicon.png',
    },
};

const poppins = Poppins({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body className="font-sans">
                <SideBar />
                <main className="min-w-0 px-4 pb-16 pt-16 lg:ml-sidebar lg:px-8 lg:pt-7">
                    <FilterProvider>{children}</FilterProvider>
                </main>
            </body>
        </html>
    );
}
