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
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 max-w-md mx-auto">
            <div className="relative flex h-16 items-center justify-between px-4">
                {/* Left: Logo */}
                <Link href="/" className="active:scale-95 transition-transform">
                    <div className="relative h-12 w-32">
                        <Image
                            src="/logo.jpg"
                            alt="Logo Boutique Celinaa"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Right: Search, Cart & Menu */}
                <div className="flex items-center gap-2">
                    {isSearchOpen ? (
                        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mr-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher des produits..."
                                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                autoFocus
                                aria-label="Champ de recherche"
                            />
                            <button 
                                type="button" 
                                onClick={() => setIsSearchOpen(false)}
                                className="p-1.5 text-gray-500 hover:text-gray-700"
                                aria-label="Fermer la recherche"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <button 
                                type="submit" 
                                className="p-1.5 text-gray-500 hover:text-gray-700"
                                aria-label="Rechercher"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </form>
                    ) : (
                        <button
                            className="p-2 text-gray-700 hover:text-primary"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Ouvrir la recherche"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    )}

                    <CartIcon />

                    <SideMenu menuItems={menuItems} />
                </div>
            </div>
        </header>
    );
}