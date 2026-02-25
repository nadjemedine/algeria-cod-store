"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface Product {
    _id: string;
    name: string;
    price: number;
    image?: string;
    hidden?: boolean;
}

interface Group {
    _id: string;
    title: string;
    image?: string;
    products: Product[];
}

const placeholderImg = "https://via.placeholder.com/300";

export default function StoreContent({ groups }: { groups: Group[] }) {
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    const selectedGroup = groups.find((g) => g._id === selectedGroupId);

    if (selectedGroupId && selectedGroup) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setSelectedGroupId(null)}
                        className="flex items-center gap-2 text-primary font-bold hover:underline"
                    >
                        <span dir="rtl">← العودة للمجموعات</span>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedGroup.title}</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedGroup.products
                        ?.filter((p) => p && !p.hidden)
                        .map((product) => (
                            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group transition-all hover:shadow-md">
                                <div className="relative aspect-[3/4] w-full overflow-hidden">
                                    <Image
                                        src={product.image || placeholderImg}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                                        <p className="font-bold text-primary text-xs">{product.price} DZD</p>
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col flex-grow">
                                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-2 h-10">{product.name}</h3>
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">تسوق حسب المجموعة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <button
                        key={group._id}
                        onClick={() => setSelectedGroupId(group._id)}
                        className="flex flex-col items-center group space-y-3 focus:outline-none"
                    >
                        <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary-light">
                            <Image
                                src={group.image || placeholderImg}
                                alt={group.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">
                            {group.title}
                        </span>
                    </button>
                ))}
            </div>
            {groups.length === 0 && (
                <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-3xl">
                    <p>المجموعات غير متوفرة حالياً. يرجى إضافتها من لوحة التحكم.</p>
                </div>
            )}
        </div>
    );
}
