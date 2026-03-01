"use client";

import { useState, useEffect, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Menu, X, ChevronRight, ExternalLink, Instagram, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
    _id: string;
    title: string;
    link?: string;
    iconUrl?: string;
    iconName?: string;
    isButton?: boolean;
    style?: "link" | "primary" | "outline";
}

export default function SideMenu({ menuItems }: { menuItems: MenuItem[] }) {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-1.5 transition-all duration-300 transform active:scale-75 active:-translate-y-1 focus:outline-none group"
                aria-label="Open Menu"
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <div className="relative w-7 h-7">
                    <Image src="/icons/icon.png" alt="Menu" fill className="object-contain filter-gold" />
                </div>
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-72 md:w-80 bg-[#1c1c1c] z-50 transform transition-transform duration-500 ease-out shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                dir="ltr"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#1c1c1c]">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
                            <Image src="/icons/icon.png" alt="Icon" fill className="object-contain filter-gold" />
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight">Menu</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-white hover:bg-white/10 transition-all rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems && menuItems.length > 0 ? (
                        menuItems.map((item) => {
                            const isExternal = item.link?.startsWith("http");
                            const baseStyles = "flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200 group relative overflow-hidden";

                            if (item.isButton) {
                                const variantStyles = item.style === "primary"
                                    ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5"
                                    : "border-2 border-primary text-primary hover:bg-primary/5 font-bold";

                                return (
                                    <Link
                                        key={item._id}
                                        href={item.link || "#"}
                                        onClick={() => setIsOpen(false)}
                                        className={`${baseStyles} ${variantStyles} justify-center text-center font-bold mt-4 mb-2`}
                                    >
                                        <span>{item.title}</span>
                                        {isExternal && <ExternalLink className="h-4 w-4 opacity-70" />}
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={item._id}
                                    href={item.link || "#"}
                                    onClick={() => setIsOpen(false)}
                                    className={`${baseStyles} text-white/90 hover:bg-white/5 font-bold hover:text-white`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        {item.iconName && (LucideIcons as any)[item.iconName] ? (
                                            <div className="w-6 h-6 shrink-0 text-white/50 group-hover:text-white transition-colors">
                                                {(() => {
                                                    const Icon = (LucideIcons as any)[item.iconName];
                                                    return <Icon className="w-full h-full text-[#c5a059]" />;
                                                })()}
                                            </div>
                                        ) : item.iconUrl ? (
                                            <div className="relative w-6 h-6 shrink-0 transition-transform group-hover:scale-110">
                                                <Image
                                                    src={item.iconUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain filter-gold"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                                        )}
                                        <span className="text-[17px]">{item.title}</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-white/30 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                                </Link>
                            );
                        })
                    ) : null}
                </nav>

            </div>
        </>
    );
}
