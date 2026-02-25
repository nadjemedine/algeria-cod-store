import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boutique Celinaa',
  description: 'Modern mobile-first e-commerce store with COD in Algeria',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white pb-20 md:pb-0 min-h-screen`}>
        <Header />
        <main className="max-w-5xl mx-auto min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
