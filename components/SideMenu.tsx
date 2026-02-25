"use client";

import { useState, useEffect, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Menu, X, ChevronRight, ExternalLink } from "lucide-react";
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
                className="p-2 transition-all hover:scale-110 active:scale-95 text-gray-700 hover:text-primary focus:outline-none"
                aria-label="Open Menu"
            >
                <Menu className="h-7 w-7" />
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-72 md:w-80 bg-white z-50 transform transition-transform duration-500 ease-out shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                dir="ltr"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b bg-primary/5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                            C
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">Menu</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 transition-all rounded-full"
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
                                    className={`${baseStyles} text-gray-700 hover:text-primary hover:bg-primary/5 font-medium`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        {item.iconName && (LucideIcons as any)[item.iconName] ? (
                                            <div className="w-6 h-6 shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                                                {(() => {
                                                    const Icon = (LucideIcons as any)[item.iconName];
                                                    return <Icon className="w-full h-full" />;
                                                })()}
                                            </div>
                                        ) : item.iconUrl ? (
                                            <div className="relative w-6 h-6 shrink-0 transition-transform group-hover:scale-110">
                                                <Image
                                                    src={item.iconUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />
                                        )}
                                        <span className="text-[17px]">{item.title}</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                                </Link>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-center space-y-3 px-6">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <Menu className="h-6 w-6 text-gray-300" />
                            </div>
                            <p className="text-gray-500 text-sm">Aucun élément pour le moment</p>
                            <Link
                                href="/studio"
                                className="text-xs text-primary hover:underline font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Ajouter des éléments depuis le panneau
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Footer */}
                <div className="p-6 bg-white border-t space-y-4">
                    <div className="flex justify-center gap-4">
                        {/* Social placeholders if needed */}
                    </div>
                    <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        Boutique Celinaa © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </>
    );
}
