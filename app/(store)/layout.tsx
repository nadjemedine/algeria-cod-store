import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-md mx-auto min-h-[calc(100vh-80px)]" id="main-content">
        {children}
      </main>
      <BottomNav />
      <div className="sr-only">
        <a href="#main-content">Aller au contenu principal</a>
      </div>
    </>
  );
}