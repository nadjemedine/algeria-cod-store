"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";

export default function CartIcon() {
    const cartItemsCount = useCartStore((state) => state.items.length);
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-2">
                <ShoppingCart className="h-6 w-6 text-black" />
            </div>
        );
    }

    return (
        <Link
            href="/cart"
            className="relative p-2 transition-all duration-300 transform active:scale-75 active:-translate-y-1 flex items-center justify-center focus:outline-none hover:scale-110 group"
            aria-label="View Cart"
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            <ShoppingCart className="h-6 w-6 text-[#c5a059] transition-colors" />

            {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-none bg-[#c5a059] text-[9px] font-bold text-white shadow-sm border border-white">
                    {cartItemsCount}
                </span>
            )}
        </Link>
    );
}
