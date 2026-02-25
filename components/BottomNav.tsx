'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, LayoutGrid, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useEffect, useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const cartItemsCount = useCartStore((state) => state.items.length);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Active state helper
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:hidden safe-p-bottom">
            <div className="flex h-16 items-center justify-around px-2">
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${isActive('/') ? 'text-black' : 'text-gray-400'
                        }`}
                >
                    <div className={`p-1 rounded-xl transition-colors ${isActive('/') ? 'bg-black/5' : ''}`}>
                        <Home className={`h-6 w-6 ${isActive('/') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    </div>
                    <span className="text-[10px] font-bold mt-1">الرئيسية</span>
                </Link>

                <Link
                    href="/cart"
                    className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${isActive('/cart') ? 'text-black' : 'text-gray-400'
                        }`}
                >
                    <div className="relative">
                        <div className={`p-1 rounded-xl transition-colors ${isActive('/cart') ? 'bg-black/5' : ''}`}>
                            <ShoppingCart className={`h-6 w-6 ${isActive('/cart') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        </div>
                        {mounted && cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-black text-white ring-2 ring-white">
                                {cartItemsCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-bold mt-1">السلة</span>
                </Link>

                {/* Categories / Groups icon as a shortcut */}
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center w-full text-gray-400"
                >
                    <div className="p-1">
                        <LayoutGrid className="h-6 w-6 stroke-2" />
                    </div>
                    <span className="text-[10px] font-bold mt-1">الأصناف</span>
                </Link>

                <Link
                    href="/checkout"
                    className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${isActive('/checkout') ? 'text-black' : 'text-gray-400'
                        }`}
                >
                    <div className={`p-1 rounded-xl transition-colors ${isActive('/checkout') ? 'bg-black/5' : ''}`}>
                        <User className={`h-6 w-6 ${isActive('/checkout') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    </div>
                    <span className="text-[10px] font-bold mt-1">حسابي</span>
                </Link>
            </div>
        </nav>
    );
}
