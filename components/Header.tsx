import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { client } from '../sanity/lib/client';
import SideMenu from './SideMenu';
import CartIcon from './CartIcon';

export default async function Header() {
    // We will need Sanity credentials to fetch groups dynamically
    // const groups = await client.fetch(`*[_type == "group"]{_id, title}`);
    const groups: any[] = []; // Placeholder until Sanity is connected

    let menuItems = [];
    try {
        menuItems = await client.fetch(`*[_type == "menu"] | order(order asc) {
            _id,
            title,
            link,
            isButton,
            style,
            iconName,
            "iconUrl": icon.asset->url
        }`);
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="relative flex h-20 items-center justify-between px-4 max-w-5xl mx-auto">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center justify-center z-10 transition-transform hover:scale-105 active:scale-95">
                    <div className="relative h-14 w-40 md:h-16 md:w-48">
                        <Image
                            src="/logo.jpg"
                            alt="Store Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Right: Search, Cart & Menu */}
                <div className="flex items-center gap-1 md:gap-2 z-10">
                    <button
                        className="p-2 text-gray-700 hover:text-primary transition-all hover:scale-110 active:scale-95 focus:outline-none"
                        aria-label="Search"
                    >
                        <Search className="h-6 w-6" />
                    </button>

                    <CartIcon />

                    <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block" />

                    <SideMenu menuItems={menuItems} />
                </div>
            </div>
        </header>
    );
}
