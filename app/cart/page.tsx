'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 px-6 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-800">Votre panier est vide</h2>
                    <p className="text-gray-400 max-w-[280px] mx-auto text-sm font-medium">Il semblerait que vous n'ayez pas encore ajouté d'articles à votre panier.</p>
                </div>
                <Link href="/" className="w-full max-w-[240px]">
                    <button className="w-full bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all">
                        Découvrir nos produits
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 pb-32 max-w-md mx-auto">
            <h1 className="text-3xl font-black text-gray-900">Mon Panier</h1>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={`${item._id}-${item.selectedSize}`} className="flex flex-row bg-white rounded-[28px] shadow-sm border border-gray-50 p-4 gap-4 transition-all">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-50">
                            {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-200 font-bold">Img</div>
                            )}
                        </div>

                        <div className="flex flex-col flex-grow justify-between py-1">
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="font-bold text-gray-800 leading-tight line-clamp-1">{item.name}</h3>
                                    {item.selectedSize && <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-wider">Taille: {item.selectedSize}</p>}
                                </div>
                                <button
                                    onClick={() => removeItem(item._id, item.selectedSize)}
                                    className="text-red-400 hover:text-red-500 bg-red-50/50 p-2 rounded-xl transition-all active:scale-90"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <p className="font-black text-primary">{item.price.toLocaleString()} DA</p>

                                <div className="flex items-center space-x-4 bg-gray-50 rounded-xl px-2 py-1.5 border border-gray-100">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.selectedSize, -1)}
                                        className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90 disabled:opacity-30"
                                        disabled={item.quantity <= 1}
                                        aria-label="Réduire la quantité"
                                    >
                                        <Minus className="h-3.5 w-3.5 text-gray-600" />
                                    </button>
                                    <span className="font-black text-sm w-4 text-center text-gray-800" aria-label={`Quantité: ${item.quantity}`}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.selectedSize, 1)}
                                        className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
                                        aria-label="Augmenter la quantité"
                                    >
                                        <Plus className="h-3.5 w-3.5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 space-y-5">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Sous-total</span>
                    <span className="font-black text-2xl text-gray-900">{totalPrice().toLocaleString()} DA</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50/50 py-2 rounded-lg italic">
                    Frais de livraison calculés à l'étape suivante
                </div>

                <Link href="/checkout" className="block w-full">
                    <button className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center space-x-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95">
                        <span>Commander maintenant</span>
                        <ArrowRight className="h-6 w-6" />
                    </button>
                </Link>
            </div>
        </div>
    );
}
