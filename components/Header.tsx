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
        <header className="sticky top-0 z-50 w-full max-w-md mx-auto overflow-hidden shadow-lg border-b border-black/10">
            {/* Top Announcement Bar */}
            <div className="w-full bg-[#1c1c1c] text-white overflow-hidden">
                <div className="announcement-bar">
                    <div className="announcement-content">
                        <span>Bienvenue a boutique celinaa &nbsp;&nbsp;&nbsp;&nbsp; livraison 58 willaya &nbsp;&nbsp;&nbsp;&nbsp; paiement a la livraison &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>Bienvenue a boutique celinaa &nbsp;&nbsp;&nbsp;&nbsp; livraison 58 willaya &nbsp;&nbsp;&nbsp;&nbsp; paiement a la livraison &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>Bienvenue a boutique celinaa &nbsp;&nbsp;&nbsp;&nbsp; livraison 58 willaya &nbsp;&nbsp;&nbsp;&nbsp; paiement a la livraison &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>Bienvenue a boutique celinaa &nbsp;&nbsp;&nbsp;&nbsp; livraison 58 willaya &nbsp;&nbsp;&nbsp;&nbsp; paiement a la livraison &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>Bienvenue a boutique celinaa &nbsp;&nbsp;&nbsp;&nbsp; livraison 58 willaya &nbsp;&nbsp;&nbsp;&nbsp; paiement a la livraison &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>Bienvenue a boutique celinaa &nbsp;&nbsp;&nbsp;&nbsp; livraison 58 willaya &nbsp;&nbsp;&nbsp;&nbsp; paiement a la livraison &nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                </div>
            </div>



            <div className="relative flex h-16 items-center bg-[#1c1c1c]">
                {/* Left: Menu */}
                <div className="flex items-center px-2 z-10">
                    <SideMenu menuItems={menuItems} />
                </div>

                {/* Center: Logo (absolutely centered) */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 active:scale-95 transition-transform flex items-center justify-center h-full w-[200px]">
                    <div className="relative h-full w-full flex items-center justify-center bg-transparent">
                        <Image
                            src="/logo.png"
                            alt="Logo Boutique Celinaa"
                            fill
                            className="object-contain object-center scale-[1.5] filter-gold"
                            priority
                        />
                    </div>
                </Link>

                {/* Right: Cart & Search Toggle */}
                <div className="flex items-center gap-2 px-3 ml-auto z-10">
                    <CartIcon />

                    <button
                        className="p-2 transition-all duration-300 transform active:scale-75 active:-translate-y-1 focus:outline-none hover:scale-110 group"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        aria-label={isSearchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isSearchOpen ? (
                            <X className="h-6 w-6 text-[#c5a059] transition-colors" />
                        ) : (
                            <Search className="h-6 w-6 text-[#c5a059] transition-colors" />
                        )}
                    </button>
                </div>
            </div>

            {/* Expandable Search Bar Below Header */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden bg-[#1c1c1c] ${isSearchOpen
                    ? 'max-h-20 opacity-100 border-t border-white/10'
                    : 'max-h-0 opacity-0 border-t-0'
                    }`}
            >
                <div className="p-3">
                    <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-sm mx-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher un produit..."
                            className="w-full px-4 py-2 text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
                            autoFocus={isSearchOpen}
                            aria-label="Champ de recherche"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 p-1 text-white/50 hover:text-white transition-all duration-300 transform active:scale-75 focus:outline-none"
                            aria-label="Rechercher"
                        >
                            <Search className="h-5 w-5 text-[#c5a059]" />
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
