'use client';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ product, selectedSize, quantity = 1 }: { product: any, selectedSize?: string, quantity?: number }) {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    const hasSizes = product.sizes && product.sizes.length > 0;
    const availableSizes = hasSizes ? product.sizes.filter((s: any) => typeof s === 'object' ? s.stock > 0 : true) : [];

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // If sizes exist and we haven't selected one, go to details
        if (hasSizes && !selectedSize) {
            router.push(`/product/${product._id}`);
            return;
        }

        // Otherwise add to cart
        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedSize: selectedSize || '',
            quantity: quantity,
        });
        alert(`${quantity} article${quantity > 1 ? 's' : ''} ajouté${quantity > 1 ? 's' : ''} au panier !`);
    };

    if (hasSizes && availableSizes.length === 0) {
        return (
            <button disabled className="mt-2 w-full py-2 bg-gray-50 text-gray-300 cursor-not-allowed rounded-none font-bold text-[10px] uppercase tracking-widest border border-gray-50">
                Rupture de Stock
            </button>
        );
    }

    return (
        <button
            onClick={handleAction}
            className="flex items-center justify-center space-x-2 bg-primary text-white hover:opacity-90 transition-all py-2 rounded-none w-full font-black shadow-md shadow-primary/20 active:scale-95 text-[10px] uppercase tracking-[0.1em]"
        >
            <ShoppingBag className="h-4 w-4" />
            <span>{(selectedSize || !hasSizes) ? 'Ajouter' : 'Détails'}</span>
        </button>
    );
}
