"use client";

import Image from "next/image";
import { productImageUrl } from "@/sanity/lib/image";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addItem = useCartStore((state) => state.addItem);
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                <p className="text-gray-500 font-medium text-lg">Aucun produit trouvé</p>
            </div>
        );
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

        setAddedIds(prev => new Set(prev).add(product._id));
        setTimeout(() => {
            setAddedIds(prev => {
                const next = new Set(prev);
                next.delete(product._id);
                return next;
            });
        }, 2000);
    };

    return (
        <>
            <div className="p-4 grid grid-cols-2 gap-4 pb-24">
                {products.map((product, index) => {
                    const imgUrl = product.image
                        ? productImageUrl(product.image, 600, 800)
                        : undefined;
                    const isAdded = addedIds.has(product._id);

                    return (
                        <div
                            key={product._id}
                            className="bg-white rounded-none overflow-hidden flex flex-col group transition-all shadow-sm hover:shadow-md border border-secondary animate-fade-in cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => handleProductClick(product)}
                        >
                            {/* Image with overlay info */}
                            <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        onLoad={() => index === 0 && setIsLoading(false)}
                                        priority={index < 4}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-4xl">
                                        {product.name.charAt(0)}
                                    </div>
                                )}

                                {/* Cart Icon Top Right */}
                                <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className={`absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-none transition-all duration-300 shadow-sm ${isAdded ? 'bg-green-600' : 'bg-primary/80 hover:bg-primary'
                                        } active:scale-90`}
                                    aria-label={`Ajouter ${product.name} au panier`}
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    {isAdded ? (
                                        <Check className="w-5 h-5 text-white" />
                                    ) : (
                                        <ShoppingBag className="w-5 h-5 text-white" />
                                    )}
                                </button>

                                {/* Transparent overlay with name and price */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3 pt-12">
                                    <div className="flex justify-between items-end gap-2">
                                        <h3 className="font-bold text-white text-[13px] leading-tight flex-1">
                                            <span title={product.name}>{product.name}</span>
                                        </h3>
                                        <div className="font-black text-white text-xs whitespace-nowrap bg-primary/80 px-2 py-1 flex items-center justify-center">
                                            {product.price.toLocaleString()} DA
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
