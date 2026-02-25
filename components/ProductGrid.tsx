"use client";

import Image from "next/image";
import Link from "next/link";
import { productImageUrl } from "@/sanity/lib/image";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

interface Product {
    _id: string;
    name: string;
    price: number;
    image?: any;
    sizes?: any[];
    hidden?: boolean;
}

export default function ProductGrid({ products }: { products: Product[] }) {
    const [isLoading, setIsLoading] = useState(true);
    
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                <p className="text-gray-500 font-medium text-lg">Aucun produit trouvé</p>
            </div>
        );
    }

    return (
        <div className="p-4 grid grid-cols-2 gap-4 pb-24">
            {products.map((product, index) => {
                const imgUrl = product.image
                    ? productImageUrl(product.image, 600, 800)
                    : undefined;

                return (
                    <div
                        key={product._id}
                        className="bg-white rounded-[32px] overflow-hidden flex flex-col group transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 border border-gray-50 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <Link href={`/product/${product._id}`} className="block relative aspect-[3/4] w-full bg-gray-50 overflow-hidden active:scale-95 transition-transform duration-300">
                            {imgUrl ? (
                                <Image
                                    src={imgUrl}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    onLoad={() => index === 0 && setIsLoading(false)}
                                    priority={index < 4}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-200 font-bold text-4xl">
                                    {product.name.charAt(0)}
                                </div>
                            )}
                            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-white/20">
                                <p className="font-black text-primary text-[10px]" aria-label={`Prix: ${product.price.toLocaleString()} Dinars algériens`}>
                                    {product.price.toLocaleString()} DA
                                </p>
                            </div>
                        </Link>

                        <div className="p-4 space-y-3">
                            <h3 className="font-bold text-[14px] text-gray-800 line-clamp-1">
                                <span title={product.name}>{product.name}</span>
                            </h3>
                            <AddToCartButton product={{ ...product, image: imgUrl }} quantity={1} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
