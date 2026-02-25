import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { client } from '../sanity/lib/client';

export default async function Header() {
    // We will need Sanity credentials to fetch groups dynamically
    // const groups = await client.fetch(`*[_type == "group"]{_id, title}`);
    const groups: any[] = []; // Placeholder until Sanity is connected

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="relative flex h-20 items-center justify-between px-4 max-w-5xl mx-auto">
                {/* Left: Menu */}
                <button className="p-2 -ml-2 text-gray-700 hover:text-black focus:outline-none z-10">
                    <Menu className="h-6 w-6" />
                </button>

                {/* Center: Logo */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                    <div className="relative h-16 w-48">
                        {/* Fallback to simple text if logo.jpg is not yet provided */}
                        <Image
                            src="/logo.jpg"
                            alt="Store Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Right: Search */}
                <button className="p-2 -mr-2 text-gray-700 hover:text-black focus:outline-none z-10">
                    <Search className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
}
