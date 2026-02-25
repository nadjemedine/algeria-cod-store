"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { productImageUrl } from "@/sanity/lib/image";

interface Product {
    _id: string;
    name: string;
    price: number;
    image?: any; // raw Sanity image reference
    sizes?: any[];
    hidden?: boolean;
}

interface Group {
    _id: string;
    title: string;
    image?: any; // raw Sanity image reference
    products: Product[];
}

export default function StoreContent({ groups }: { groups: Group[] }) {
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    const selectedGroup = groups.find((g) => g._id === selectedGroupId);

    if (selectedGroupId && selectedGroup) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen p-6">
                <div className="flex items-center justify-between mb-2">
                    <button
                        onClick={() => setSelectedGroupId(null)}
                        className="flex items-center gap-2 text-gray-400 font-bold hover:text-primary transition-colors text-xs uppercase tracking-widest"
                    >
                        <span>← Retour</span>
                    </button>
                    <h2 className="text-xl font-black text-gray-900">{selectedGroup.title}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-24">
                    {selectedGroup.products
                        ?.filter((p) => p && !p.hidden)
                        .map((product) => {
                            const imgUrl = product.image
                                ? productImageUrl(product.image, 600, 800)
                                : undefined;
                            return (
                                <div key={product._id} className="bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:shadow-primary/5">
                                    <Link href={`/product/${product._id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 block active:scale-95 transition-transform duration-300">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={product.name}
                                                fill
                                                sizes="50vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200">
                                                <span className="text-4xl font-black">{product.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-white/20">
                                            <p className="font-black text-primary text-[10px]">{product.price.toLocaleString()} DA</p>
                                        </div>
                                    </Link>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1 mb-3">{product.name}</h3>
                                        <AddToCartButton product={{ ...product, image: imgUrl }} />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen p-6">
            <div className="text-center space-y-2 pt-4">
                <h2 className="text-3xl font-black text-gray-900 italic tracking-tight">Nos Collections</h2>
                <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-8">
                {groups.map((group) => {
                    const imgUrl = group.image
                        ? productImageUrl(group.image, 800, 800)
                        : undefined;

                    return (
                        <button
                            key={group._id}
                            onClick={() => setSelectedGroupId(group._id)}
                            className="flex flex-col items-center group space-y-4 focus:outline-none"
                        >
                            <div className="relative w-full aspect-square rounded-[48px] overflow-hidden shadow-xl shadow-gray-200/50 border-4 border-white bg-gray-50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/20">
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={group.title}
                                        fill
                                        sizes="50vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200">
                                        <span className="text-6xl font-black">{group.title.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <span className="font-black text-lg text-gray-900 group-hover:text-primary transition-colors">
                                {group.title}
                            </span>
                        </button>
                    );
                })}
            </div>
            {groups.length === 0 && (
                <div className="text-center py-20 text-gray-300 border-4 border-dashed border-gray-50 rounded-[48px] px-8">
                    <p className="font-bold italic">Aucune collection disponible pour le moment.</p>
                </div>
            )}
        </div>
    );
}
