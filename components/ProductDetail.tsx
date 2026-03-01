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
        <div className="bg-background min-h-screen pb-40">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center max-w-md mx-auto">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-xl rounded-none shadow-sm text-gray-800 border border-gray-100"
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
                    <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide pt-2">
                        {galleryItems.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`relative min-w-[70px] h-[90px] rounded-none overflow-hidden border-2 transition-all ${activeImage === img ? "border-primary shadow-md" : "border-gray-50 bg-gray-50"}`}
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

            {/* Content Container (LTR) */}
            <div className="p-6 space-y-6 flex flex-col items-start text-left w-full" dir="ltr">

                {/* Title Centered Below Image */}
                <div className="w-full text-center mt-[-10px] pb-4">
                    <h1 className="text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
                </div>

                {/* Price */}
                <div className="w-full flex justify-start">
                    <p className="text-2xl font-black text-primary bg-primary/5 inline-block px-4 py-2 border border-primary/10">
                        {product.price?.toLocaleString()} DA
                    </p>
                </div>

                {/* Sizes Selection as Buttons */}
                {availableSizes.length > 0 && (
                    <div className="space-y-4 w-full">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 w-full text-left">Taille</h2>
                        <div className="flex flex-wrap gap-2.5 justify-start w-full">
                            {availableSizes.map((s: any) => {
                                const sizeStr = typeof s === 'object' ? s.size : s;
                                const isSelected = selectedSize === sizeStr;
                                return (
                                    <button
                                        key={sizeStr}
                                        onClick={() => setSelectedSize(sizeStr)}
                                        className={`px-4 py-1.5 rounded-none font-bold text-[12px] transition-all border-2 ${isSelected
                                            ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                                            : "bg-gray-50 border-gray-100 text-gray-800 hover:border-primary/50"
                                            }`}
                                        aria-label={`Sélectionner la taille ${sizeStr}`}
                                    >
                                        <span className="flex items-center gap-1">
                                            {sizeStr}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Description */}
                {product.description && (
                    <div className="space-y-3 pt-2 w-full text-left">
                        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs border-b border-gray-100 pb-2 text-left">Détails du produit</h3>
                        <p className="text-gray-700 text-[14px] leading-[1.8] whitespace-pre-wrap font-medium text-left">{product.description}</p>
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
                                    <div className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-50">
                                        {item.image ? (
                                            <Image
                                                src={productImageUrl(item.image, 400, 533) || ""}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                <div className="fixed bottom-12 left-0 right-0 p-3 bg-background border-t border-gray-100 w-full max-w-md mx-auto z-40" dir="ltr">
                    <div className="flex gap-3">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-none h-[54px] w-1/3 min-w-[110px] shadow-sm">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 rounded-none flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                                aria-label="Réduire la quantité"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-bold text-base w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 rounded-none flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                                aria-label="Augmenter la quantité"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={availableSizes.length === 0}
                            className={`flex-1 flex items-center justify-center gap-2 h-[54px] rounded-none font-black text-white transition-all shadow-md active:scale-95 ${availableSizes.length === 0 ? "bg-gray-200 shadow-none text-gray-500 cursor-not-allowed" : "bg-primary hover:opacity-90 shadow-primary/20 text-lg"
                                }`}
                        >
                            <ShoppingBag className="h-6 w-6" />
                            <span className="text-sm">{availableSizes.length === 0 ? "Épuisé" : "Ajouter au Panier"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
