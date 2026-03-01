'use client';

import { useEffect, useState } from 'react';
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
    const bgColor = data?.backgroundColor || "#1c1c1c";

    return (
        <footer
            className="w-full max-w-md mx-auto border-t border-white/10"
            style={{
                backgroundColor: bgColor,
                paddingTop: `${footerPadding}px`,
                paddingBottom: `${footerPadding}px`,
            }}
        >
            <div className="px-6 space-y-6">
                <div className="flex flex-col items-center gap-4">
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
