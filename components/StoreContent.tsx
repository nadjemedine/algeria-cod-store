"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { productImageUrl } from "@/sanity/lib/image";

interface Product {
    _id: string;
    name: string;
    price: number;
    image?: any; // raw Sanity image reference
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
            <div className="space-y-6 animate-in fade-in duration-500 bg-white min-h-screen p-4">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => setSelectedGroupId(null)}
                        className="flex items-center gap-2 text-black font-bold hover:underline text-sm"
                    >
                        <span>← العودة للمجموعات</span>
                    </button>
                    <h2 className="text-xl font-bold text-black">{selectedGroup.title}</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedGroup.products
                        ?.filter((p) => p && !p.hidden)
                        .map((product) => {
                            const imgUrl = product.image
                                ? productImageUrl(product.image, 600, 800)
                                : undefined;
                            return (
                                <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group transition-all hover:shadow-md">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                                                <span className="text-4xl font-black">{product.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                                            <p className="font-bold text-black text-xs">{product.price} DZD</p>
                                        </div>
                                    </div>
                                    <div className="p-3 flex flex-col flex-grow">
                                        <h3 className="font-bold text-black text-sm line-clamp-2 mb-2 h-10">{product.name}</h3>
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
        <div className="space-y-8 animate-in fade-in duration-500 bg-white min-h-screen p-4">
            <h2 className="text-2xl font-bold text-black text-center mb-8">تسوق حسب المجموعة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {groups.map((group) => {
                    const imgUrl = group.image
                        ? productImageUrl(group.image, 800, 800)
                        : undefined;

                    return (
                        <button
                            key={group._id}
                            onClick={() => setSelectedGroupId(group._id)}
                            className="flex flex-col items-center group space-y-3 focus:outline-none"
                        >
                            <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-gray-100 bg-gray-50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-black">
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={group.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        <span className="text-6xl font-black">{group.title.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <span className="font-bold text-lg text-black group-hover:opacity-70 transition-opacity">
                                {group.title}
                            </span>
                        </button>
                    );
                })}
            </div>
            {groups.length === 0 && (
                <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-3xl">
                    <p>المجموعات غير متوفرة حالياً. يرجى إضافتها من لوحة التحكم.</p>
                </div>
            )}
        </div>
    );
}
