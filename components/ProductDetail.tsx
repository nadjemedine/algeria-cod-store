"use client";

import { useState } from "react";
import Image from "next/image";
import { productImageUrl } from "@/sanity/lib/image";
import { useCartStore } from "@/store/useCartStore";
import { ChevronLeft, ShoppingBag, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product, relatedProducts }: { product: any, relatedProducts?: any[] }) {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const availableSizes = product.sizes?.filter((s: any) => (typeof s === 'object' ? s.stock > 0 : true)) || [];
    const unavailableSizes = product.sizes?.filter((s: any) => (typeof s === 'object' && s.stock === 0)) || [];

    const [selectedSize, setSelectedSize] = useState(
        availableSizes.length > 0
            ? (typeof availableSizes[0] === 'object' ? availableSizes[0].size : availableSizes[0])
            : ''
    );

    const [activeImage, setActiveImage] = useState(product.image);
    const galleryItems = [product.image, ...(product.images || [])].filter(Boolean);
    
    const [quantity, setQuantity] = useState(1);

    const imgUrl = productImageUrl(activeImage, 1000, 1333);

    const handleAddToCart = () => {
        if (!selectedSize && availableSizes.length > 0) {
            alert("Veuillez choisir une taille");
            return;
        }

        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: productImageUrl(product.image, 400, 533),
            selectedSize,
            quantity,
        });

        alert(`${quantity} article${quantity > 1 ? 's' : ''} ajouté${quantity > 1 ? 's' : ''} au panier !`);
    };

    return (
        <div className="bg-white min-h-screen pb-40">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center max-w-md mx-auto">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-xl rounded-full shadow-sm text-gray-800 border border-gray-100"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
            </div>

            {/* Product Gallery */}
            <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden">
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={product.name}
                            fill
                            priority
                            className="object-cover transition-all duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200 text-6xl font-bold">
                            {product.name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {galleryItems.length > 1 && (
                    <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide">
                        {galleryItems.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`relative min-w-[70px] h-[90px] rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? "border-primary scale-105 shadow-md" : "border-gray-50"}`}
                            >
                                <Image
                                    src={productImageUrl(img, 200, 266) || ""}
                                    alt={`Thumb ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
                    <p className="text-2xl font-black text-primary mt-3">{product.price?.toLocaleString()} DA</p>
                </div>

                {product.description && (
                    <div className="space-y-3">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Description</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                    </div>
                )}

                {/* Sizes Selection as Buttons */}
                {availableSizes.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Taille</h2>
                        <div className="flex flex-wrap gap-3">
                            {availableSizes.map((s: any) => {
                                const sizeStr = typeof s === 'object' ? s.size : s;
                                const stock = typeof s === 'object' ? s.stock : null;
                                const isSelected = selectedSize === sizeStr;
                                return (
                                    <button
                                        key={sizeStr}
                                        onClick={() => setSelectedSize(sizeStr)}
                                        className={`px-6 py-3 rounded-2xl font-black text-sm transition-all border-2 ${isSelected
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                                            : "bg-white border-gray-100 text-gray-800 hover:border-primary/30"
                                            }`}
                                        aria-label={`Sélectionner la taille ${sizeStr}${stock !== null ? `, ${stock} en stock` : ''}`}
                                    >
                                        <span className="flex items-center gap-1">
                                            {sizeStr}
                                            {stock !== null && stock < 5 && stock > 0 && (
                                                <span className="text-[8px] bg-yellow-100 text-yellow-800 rounded-full px-1">{stock} restant</span>
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                            {unavailableSizes.map((s: any) => {
                                const sizeStr = typeof s === 'object' ? s.size : s;
                                return (
                                    <button
                                        key={sizeStr}
                                        className="px-6 py-3 rounded-2xl font-black text-sm border-2 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                                        disabled
                                        aria-label={`Taille ${sizeStr} indisponible`}
                                    >
                                        {sizeStr}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="pt-8 space-y-6">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Vous aimerez aussi</h2>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
                            {relatedProducts.map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/product/${item._id}`}
                                    className="min-w-[160px] max-w-[160px] group space-y-3"
                                >
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 border border-gray-50">
                                        {item.image ? (
                                            <Image
                                                src={productImageUrl(item.image, 400, 533) || ""}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-200 font-bold">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                                        <p className="text-xs font-black text-primary">{item.price.toLocaleString()} DA</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add to Cart Fixed Bottom Bar for Mobile-like feel */}
                <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-50 max-w-md mx-auto z-40">
                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center justify-between bg-white rounded-2xl px-4 py-2 border border-gray-100">
                            <span className="font-bold text-gray-700">Quantité:</span>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                                    aria-label="Réduire la quantité"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                                    aria-label="Augmenter la quantité"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={availableSizes.length === 0}
                            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[24px] font-black text-white transition-all shadow-xl active:scale-95 ${availableSizes.length === 0 ? "bg-gray-200 shadow-none text-gray-400" : "bg-primary shadow-primary/20 hover:opacity-90"
                                }`}
                        >
                            <ShoppingBag className="h-6 w-6" />
                            <span className="text-lg">{availableSizes.length === 0 ? "Épuisé" : "Ajouter au Panier"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
