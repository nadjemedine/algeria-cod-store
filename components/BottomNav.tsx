'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, ReceiptText } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function BottomNav() {
    const pathname = usePathname();
    const cartItemsCount = useCartStore((state) => state.items.length);

    return (
        <nav className="fixed bottom-0 z-50 w-full border-t bg-white pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
            <div className="flex h-16 justify-around items-center px-4">
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-full space-y-1 ${pathname === '/' ? 'text-black' : 'text-gray-500 hover:text-black'
                        }`}
                >
                    <Home className="h-6 w-6" strokeWidth={pathname === '/' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">Store</span>
                </Link>

                <Link
                    href="/cart"
                    className={`relative flex flex-col items-center justify-center w-full space-y-1 ${pathname === '/cart' ? 'text-black' : 'text-gray-500 hover:text-black'
                        }`}
                >
                    <div className="relative">
                        <ShoppingCart className="h-6 w-6" strokeWidth={pathname === '/cart' ? 2.5 : 2} />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {cartItemsCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">Cart</span>
                </Link>

                <Link
                    href="/checkout"
                    className={`flex flex-col items-center justify-center w-full space-y-1 ${pathname === '/checkout' ? 'text-black' : 'text-gray-500 hover:text-black'
                        }`}
                >
                    <ReceiptText className="h-6 w-6" strokeWidth={pathname === '/checkout' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">Orders</span>
                </Link>
            </div>
        </nav>
    );
}
