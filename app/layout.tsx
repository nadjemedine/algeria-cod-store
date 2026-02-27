import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boutique Celinaa',
  description: 'Boutique Celinaa - Votre destination mode en Algérie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${inter.className} bg-background pb-20 md:pb-0 min-h-screen text-foreground`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}