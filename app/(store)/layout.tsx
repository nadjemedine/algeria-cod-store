import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c1c] overflow-x-hidden">
      <Header />
      <main className="flex-grow max-w-md mx-auto w-full bg-background" id="main-content">
        {children}
      </main>
      <div className="w-full bg-[#1c1c1c]">
        <Footer />
      </div>
      <BottomNav />
      <div className="sr-only">
        <a href="#main-content">Aller au contenu principal</a>
      </div>
    </div>
  );
}