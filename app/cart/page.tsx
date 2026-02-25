'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
                <ShoppingCartIcon />
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-500 text-center">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/">
                    <button className="bg-black text-white px-6 py-3 rounded-md font-semibold mt-4 hover:bg-gray-800 transition">
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 pb-24 md:pb-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold border-b pb-4">Shopping Cart</h1>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={`${item._id}-${item.selectedSize}`} className="flex flex-row bg-white rounded-lg shadow-sm border p-3 gap-4">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                            {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                            )}
                        </div>

                        <div className="flex flex-col flex-grow justify-between">
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="font-semibold text-gray-800 leading-tight">{item.name}</h3>
                                    {item.selectedSize && <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize}</p>}
                                </div>
                                <button
                                    onClick={() => removeItem(item._id, item.selectedSize)}
                                    className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <p className="font-bold text-gray-900">{item.price} DZD</p>

                                <div className="flex items-center space-x-3 bg-gray-50 border rounded-full px-2 py-1">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.selectedSize, -1)}
                                        className="p-1 hover:bg-gray-200 rounded-full transition"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4 text-gray-600" />
                                    </button>
                                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.selectedSize, 1)}
                                        className="p-1 hover:bg-gray-200 rounded-full transition"
                                    >
                                        <Plus className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border mt-8 space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="font-bold text-xl">{totalPrice()} DZD</span>
                </div>
                <p className="text-xs text-gray-500 text-center">Delivery fees are calculated at checkout</p>

                <Link href="/checkout" className="block w-full">
                    <button className="w-full bg-black text-white py-4 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-gray-800 transition shadow-md active:scale-[0.98]">
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

function ShoppingCartIcon() {
    return (
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </div>
    );
}
