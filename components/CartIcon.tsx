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
            <div className="p-2 text-gray-700">
                <ShoppingCart className="h-6 w-6" />
            </div>
        );
    }

    return (
        <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-primary transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            aria-label="View Cart"
        >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                    {cartItemsCount}
                </span>
            )}
        </Link>
    );
}
