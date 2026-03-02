'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import { productImageUrl } from '@/sanity/lib/image';
import { useCartStore } from '@/store/useCartStore';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: any;
  images?: any[];
  description?: string;
  sizes?: any[];
  hidden?: boolean;
}

export default function ProductModal({
  product,
  isOpen,
  onClose
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const availableSizes = product.sizes?.filter((s: any) => (typeof s === 'object' ? s.stock > 0 : true)) || [];

  const [selectedSize, setSelectedSize] = useState(
    availableSizes.length > 0
      ? (typeof availableSizes[0] === 'object' ? availableSizes[0].size : availableSizes[0])
      : ''
  );

  const [activeImage, setActiveImage] = useState(product.image);
  const galleryItems = [product.image, ...(product.images || [])].filter(Boolean);
  const [quantity, setQuantity] = useState(1);

  const imgUrl = productImageUrl(activeImage, 800, 1066);

  useEffect(() => {
    if (isOpen) {
      setActiveImage(product.image);
      setQuantity(1);
      setQuantity(1);
      if (availableSizes.length > 0) {
        setSelectedSize(typeof availableSizes[0] === 'object' ? availableSizes[0].size : availableSizes[0]);
      }
    }
  }, [product, isOpen]);

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

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 flex items-end justify-center sm:items-center transition-opacity duration-300 animate-fade-in backdrop-blur-sm">
      <div
        className="bg-background w-full max-w-md max-h-[92vh] sm:h-auto overflow-y-auto sm:rounded-none rounded-t-[30px] relative flex flex-col transition-transform duration-300 ease-out shadow-2xl"
      >

        {/* Close Button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2.5 bg-white/90 backdrop-blur-md rounded-none shadow-sm text-gray-800 border border-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-95 transition-all"
          aria-label="Fermer"
        >
          <X className="h-5 w-5 stroke-[2.5px]" />
        </button>

        {/* Content */}
        <div className="flex flex-col -mt-10 sm:mt-0">
          {/* Main Image */}
          <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden shrink-0">
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200 text-6xl font-black">
                {product.name.charAt(0)}
              </div>
            )}

            {/* Gallery Thumbnails Overlay */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto scrollbar-hide shrink-0">
                {galleryItems.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(img);
                    }}
                    className={`relative min-w-[55px] h-[75px] rounded-none overflow-hidden border-2 transition-all shadow-md active:scale-95 outline-none focus:outline-none ${activeImage === img ? "border-primary opacity-100 scale-105" : "border-white/50 opacity-80"
                      }`}
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

          <div className="p-6 flex flex-col gap-6 bg-background min-h-[300px]">
            {/* Title Centered */}
            <div className="w-full text-center">
              <h1 className="text-[26px] font-black text-gray-900 leading-[1.1]">{product.name}</h1>
            </div>

            {/* LTR Container for Price, Size, Desc */}
            <div className="flex flex-col gap-6" dir="ltr">
              {/* Price */}
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#1c1c1c] border-b-2 border-[#c5a059]/30 inline-block px-1 py-1">
                  {product.price?.toLocaleString()} DA
                </span>
              </div>

              {/* Sizes */}
              {availableSizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs border-b border-gray-100 pb-2">Taille</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {availableSizes.map((s: any) => {
                      const sizeStr = typeof s === 'object' ? s.size : s;
                      const isSelected = selectedSize === sizeStr;
                      return (
                        <button
                          key={sizeStr}
                          onClick={() => setSelectedSize(sizeStr)}
                          className={`px-4 py-1.5 border-2 rounded-none font-bold text-[13px] transition-all outline-none focus:outline-none active:scale-95 ${isSelected
                            ? "bg-[#1c1c1c] border-[#c5a059] text-[#c5a059] shadow-md shadow-black/20 scale-105"
                            : "bg-[#1c1c1c] border-[#1c1c1c] text-white/70 hover:border-[#c5a059]/50"
                            }`}
                        >
                          <span className="flex items-center gap-1.5 focus:outline-none">
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
                <div className="space-y-3 pt-2 text-left">
                  <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs border-b border-gray-100 pb-2">Détails du produit</h3>
                  <p className="text-gray-700 text-[14px] leading-[1.8] whitespace-pre-wrap font-medium text-left">{product.description}</p>
                </div>
              )}
            </div>

            {/* Empty space for scrolling on small screens */}
            <div className="h-6" />

            {/* Fixed Bottom Action Bar: Quantity & Button on ONE Line */}
            <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t border-[#c5a059]/10 flex items-center justify-between gap-3 shrink-0">

              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-none h-[54px] w-1/3 min-w-[110px] shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 h-full rounded-none flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors active:bg-gray-300 outline-none"
                  aria-label="Réduire"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="font-black text-lg w-10 text-center text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 h-full rounded-none flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors active:bg-gray-300 outline-none"
                  aria-label="Augmenter"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Buy Button */}
              <button
                onClick={handleAddToCart}
                disabled={availableSizes.length === 0}
                className={`flex-1 flex items-center justify-center gap-2 h-[54px] rounded-none font-black transition-all shadow-md active:scale-95 outline-none focus:outline-none ${availableSizes.length === 0
                  ? "bg-gray-200 cursor-not-allowed shadow-none text-gray-400"
                  : "bg-[#1c1c1c] text-[#c5a059] border border-[#c5a059]/30 hover:bg-[#2a2a2a] shadow-black/20 text-lg uppercase tracking-widest"
                  }`}
              >
                <ShoppingBag className="h-6 w-6" />
                <span>{availableSizes.length === 0 ? "Épuisé" : "Ajouter au panier"}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}