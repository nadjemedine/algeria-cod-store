'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useEffect, useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const cartItemsCount = useCartStore((state) => state.items.length);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isActive = (path: string) => pathname === path || (path === '/' && pathname.startsWith('/product'));

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1c1c1c] shadow-none border-t border-[#c5a059]/60 md:hidden w-full pb-[env(safe-area-inset-bottom)]">
            <div className="flex h-14 items-center justify-around px-4">
                {/* Store */}
                <Link
                    href="/"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 transform active:scale-95 outline-none focus:outline-none focus-visible:outline-none ${isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'} text-white`}
                >
                    <Store className={`h-5 w-5 text-white ${isActive('/') ? 'stroke-[2px] text-[#c5a059]' : 'stroke-[1.5px]'}`} />
                    <span className={`text-[10px] font-bold ${isActive('/') ? 'text-[#c5a059]' : 'text-white'}`}>Boutique</span>
                </Link>

                {/* Checkout */}
                <Link
                    href="/checkout"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 transform active:scale-95 outline-none focus:outline-none focus-visible:outline-none ${isActive('/checkout') ? 'opacity-100' : 'opacity-60 hover:opacity-100'} text-white`}
                >
                    <div className="relative">
                        <ShoppingBag className={`h-5 w-5 text-white ${isActive('/checkout') ? 'stroke-[2px] text-[#c5a059]' : 'stroke-[1.5px]'}`} />
                        {mounted && cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-none bg-[#c5a059] text-[9px] font-black text-white shadow-none">
                                {cartItemsCount}
                            </span>
                        )}
                    </div>
                    <span className={`text-[10px] font-bold ${isActive('/checkout') ? 'text-[#c5a059]' : 'text-white'}`}>Paiement</span>
                </Link>
            </div>
        </nav>
    );
}
