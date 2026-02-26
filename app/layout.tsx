import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IX Boutique',
  description: 'IX Boutique - Votre destination mode en Algérie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${inter.className} bg-background pb-20 md:pb-0 min-h-screen text-foreground`}>
        <Header />
        <main className="max-w-md mx-auto min-h-[calc(100vh-80px)]" id="main-content">
          {children}
        </main>
        <BottomNav />
        <div className="sr-only">
          <a href="#main-content">Aller au contenu principal</a>
        </div>
      </body>
    </html>
  );
}
