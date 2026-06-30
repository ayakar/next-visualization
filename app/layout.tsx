import { Poppins } from 'next/font/google';
import '@/app/globals.css';

import Providers from './providers';
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
                <Providers>
                    <SideBar />
                    <main className="min-w-0 px-4 pb-16 pt-16 lg:ml-sidebar lg:px-8 lg:pt-7">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
