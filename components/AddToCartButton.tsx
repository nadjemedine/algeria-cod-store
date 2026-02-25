'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
    const addItem = useCartStore((state) => state.addItem);

    // Filter sizes to only those with stock > 0
    const availableSizes = product.sizes?.filter((s: any) => typeof s === 'object' ? s.stock > 0 : true) || [];

    // Default to the first available size string
    const [selectedSize, setSelectedSize] = useState(
        availableSizes.length > 0
            ? (typeof availableSizes[0] === 'object' ? availableSizes[0].size : availableSizes[0])
            : ''
    );

    const handleAdd = () => {
        if (!selectedSize && availableSizes.length > 0) {
            alert('Please select a size');
            return;
        }

        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedSize,
        });
        alert('Added to cart!');
    };

    if (availableSizes.length === 0) {
        return (
            <button disabled className="mt-2 w-full py-2 bg-gray-300 text-gray-500 cursor-not-allowed rounded-md font-medium text-sm">
                Out of Stock
            </button>
        );
    }

    return (
        <div className="flex flex-col space-y-2 mt-2">
            {availableSizes.length > 0 && (
                <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="border rounded px-2 py-1 text-sm bg-gray-50 text-black mb-1"
                >
                    {availableSizes.map((s: any) => {
                        const sizeStr = typeof s === 'object' ? s.size : s;
                        return (
                            <option key={sizeStr} value={sizeStr}>{sizeStr}</option>
                        );
                    })}
                </select>
            )}
            <button
                onClick={handleAdd}
                className="flex items-center justify-center space-x-2 bg-black text-white hover:bg-gray-800 transition py-2 rounded-md w-full font-medium shadow-sm transition-transform active:scale-95 text-sm"
            >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
            </button>
        </div>
    );
}
