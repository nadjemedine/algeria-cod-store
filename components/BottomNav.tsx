'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, ClipboardList } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useEffect, useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const cartItemsCount = useCartStore((state) => state.items.length);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-gray-100 md:hidden max-w-md mx-auto">
            <div className="flex h-16 items-center justify-around px-4">
                {/* Home */}
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-full gap-0.5 transition-all duration-200 ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}
                >
                    <Home className={`h-6 w-6 ${isActive('/') ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                    <span className="text-[10px] font-bold">Accueil</span>
                </Link>

                {/* Cart */}
                <Link
                    href="/cart"
                    className={`flex flex-col items-center justify-center w-full gap-0.5 transition-all duration-200 ${isActive('/cart') ? 'text-primary' : 'text-gray-400'}`}
                >
                    <div className="relative">
                        <ShoppingCart className={`h-6 w-6 ${isActive('/cart') ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                        {mounted && cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-black text-white">
                                {cartItemsCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-bold">Panier</span>
                </Link>

                {/* Orders */}
                <Link
                    href="/checkout"
                    className={`flex flex-col items-center justify-center w-full gap-0.5 transition-all duration-200 ${isActive('/checkout') ? 'text-primary' : 'text-gray-400'}`}
                >
                    <ClipboardList className={`h-6 w-6 ${isActive('/checkout') ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                    <span className="text-[10px] font-bold">Commander</span>
                </Link>
            </div>
        </nav>
    );
}
