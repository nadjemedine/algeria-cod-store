'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { client } from '../sanity/lib/client';
import SideMenu from './SideMenu';
import CartIcon from './CartIcon';
import { useState, useEffect } from 'react';

export default function Header() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const items = await client.fetch(`*[_type == "menu"] | order(order asc) {
                    _id,
                    title,
                    link,
                    isButton,
                    style,
                    iconName,
                    "iconUrl": icon.asset->url
                }`);
                setMenuItems(items);
            } catch (error) {
                console.error("Failed to fetch menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#a1a692] border-b border-secondary max-w-md mx-auto">
            <div className="relative flex h-16 items-center justify-between px-4">
                {/* Left: Menu & Logo */}
                <div className="flex items-center gap-3">
                    <SideMenu menuItems={menuItems} />
                    <Link href="/" className="active:scale-95 transition-transform">
                        <div className="relative h-10 w-24">
                            <Image
                                src="/logo.jpg"
                                alt="Logo IX Boutique"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Right: Cart & Search */}
                <div className="flex items-center gap-2">
                    <CartIcon />

                    {isSearchOpen ? (
                        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher..."
                                className="px-2 py-1 text-xs border border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold"
                                autoFocus
                                aria-label="Champ de recherche"
                            />
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 text-primary hover:opacity-80 transition-all duration-300 transform active:scale-75 active:-translate-y-1 focus:outline-none"
                                aria-label="Fermer la recherche"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <button
                                type="submit"
                                className="p-2 text-primary hover:opacity-80 transition-all duration-300 transform active:scale-75 active:-translate-y-1 focus:outline-none"
                                aria-label="Rechercher"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </form>
                    ) : (
                        <button
                            className="p-2 transition-all duration-300 transform active:scale-75 active:-translate-y-1 focus:outline-none group"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Ouvrir la recherche"
                        >
                            <Search className="h-6 w-6 text-primary group-hover:text-primary transition-colors" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
