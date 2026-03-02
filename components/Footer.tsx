'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Instagram, Phone, Mail } from 'lucide-react';
import { client } from '../sanity/lib/client';

interface FooterData {
    instagram?: string;
    phone?: string;
    email?: string;
    copyright?: string;
    footerSize?: number;
    fontSize?: number;
    backgroundColor?: string;
}

export default function Footer() {
    const [data, setData] = useState<FooterData | null>(null);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const result = await client.fetch(`*[_type == "footer"][0]`);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch footer data:", error);
            }
        };
        fetchFooter();
    }, []);

    // Default static data if sanity is empty
    const instagram = data?.instagram || "https://www.instagram.com/boutique_celinaa";
    const phone = data?.phone || "0554830740";
    const email = data?.email || "celinamesbahi@gmail.com";
    const copyright = data?.copyright || `Boutique Celinaa © ${new Date().getFullYear()}`;
    const footerPadding = data?.footerSize || 24;
    const fontSize = data?.fontSize || 12;
    const bgColor = "#1c1c1c"; // Force dark background to eliminate white gaps

    return (
        <footer
            className="w-full border-t border-[#c5a059]/30"
            style={{
                backgroundColor: bgColor,
                paddingTop: `${footerPadding}px`,
                paddingBottom: `64px`, // Fixed padding to ensure footer background fills the area behind BottomNav
            }}
        >
            <div className="px-6 space-y-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-20 h-20 filter-gold">
                        <Image
                            src="/icon.png"
                            alt="Logo Boutique Celinaa"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-black text-[#c5a059] uppercase tracking-widest">
                            Boutique Celinaa
                        </h2>
                        <p className="text-white/60 text-xs max-w-[250px] mx-auto leading-relaxed">
                            Votre destination de mode élégante en Algérie. Livraison 58 wilayas et paiement à la livraison.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-8">
                        <a
                            href={instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-[#c5a059] transition-colors"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>

                        <a
                            href={`tel:${phone}`}
                            className="text-white/70 hover:text-[#c5a059] transition-colors"
                        >
                            <Phone className="h-6 w-6" />
                        </a>

                        <a
                            href={`mailto:${email}`}
                            className="text-white/70 hover:text-[#c5a059] transition-colors"
                        >
                            <Mail className="h-6 w-6" />
                        </a>
                    </div>

                    <div className="text-center space-y-2">
                        {data?.phone && (
                            <p className="text-white/50" style={{ fontSize: `${fontSize}px` }}>{phone}</p>
                        )}
                        {data?.email && (
                            <p className="text-white/50" style={{ fontSize: `${fontSize}px` }}>{email}</p>
                        )}
                    </div>
                </div>

                <p className="text-center text-white/30 uppercase tracking-widest font-bold" style={{ fontSize: `${fontSize - 2}px` }}>
                    {copyright}
                </p>
            </div>
        </footer>
    );
}
