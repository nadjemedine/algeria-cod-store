'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { MapPin, Building, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { ALGERIAN_STATES } from '@/sanity/schemaTypes/deliveryPrice';

interface CheckoutFormProps {
    deliveryPrices: any[];
}

export default function CheckoutForm({ deliveryPrices }: CheckoutFormProps) {
    const { items, totalPrice, clearCart } = useCartStore();
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [wilaya, setWilaya] = useState('');
    const [deliveryType, setDeliveryType] = useState('home');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (items.length === 0) {
        return (
            <div className="text-center py-20 flex flex-col items-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold">Your cart is empty</h2>
                <button onClick={() => router.push('/')} className="mt-4 px-6 py-2 bg-black text-white rounded-md">Shop Now</button>
            </div>
        );
    }

    const selectedWilayaData = deliveryPrices.find((p) => p.wilayaName === wilaya);
    const deliveryPrice = selectedWilayaData
        ? deliveryType === 'home'
            ? selectedWilayaData.homeDeliveryPrice
            : selectedWilayaData.officeDeliveryPrice
        : 0;

    const subtotal = totalPrice();
    const total = subtotal + (deliveryPrice || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wilaya) {
            alert('Please select your state (Wilaya)');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    phone,
                    wilaya,
                    deliveryType,
                    address,
                    notes,
                    items,
                    subtotal,
                    deliveryPrice: deliveryPrice || 0,
                    totalPrice: total,
                }),
            });

            const result = await response.json();
            if (result.success) {
                clearCart();
                router.push('/thank-you');
            } else {
                alert('Something went wrong, please try again.');
                setIsSubmitting(false);
            }
        } catch (error) {
            alert('Network error, please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-gray-700" />
                    Shipping Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                        <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none" placeholder="First and Last Name" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                        <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none block" placeholder="05XX XX XX XX" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Wilaya *</label>
                        <select required value={wilaya} onChange={(e) => setWilaya(e.target.value)} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none bg-white">
                            <option value="" disabled>Select your Wilaya</option>
                            {ALGERIAN_STATES.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium text-gray-700">Delivery Type *</label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className={`cursor-pointer flex flex-col items-center justify-center border rounded-lg p-3 transition ${deliveryType === 'home' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" className="sr-only" name="deliveryType" value="home" checked={deliveryType === 'home'} onChange={() => setDeliveryType('home')} />
                                <MapPin className={`h-6 w-6 mb-1 ${deliveryType === 'home' ? 'text-black' : 'text-gray-400'}`} />
                                <span className={`text-sm font-medium ${deliveryType === 'home' ? 'text-black' : 'text-gray-600'}`}>Home Delivery</span>
                            </label>

                            <label className={`cursor-pointer flex flex-col items-center justify-center border rounded-lg p-3 transition ${deliveryType === 'office' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" className="sr-only" name="deliveryType" value="office" checked={deliveryType === 'office'} onChange={() => setDeliveryType('office')} />
                                <Building className={`h-6 w-6 mb-1 ${deliveryType === 'office' ? 'text-black' : 'text-gray-400'}`} />
                                <span className={`text-sm font-medium ${deliveryType === 'office' ? 'text-black' : 'text-gray-600'}`}>Office Delivery</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Exact Address *</label>
                        <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none" placeholder="Street, Building, etc." />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Order Notes (Optional)</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none resize-none h-20" placeholder="Any special instructions?" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-4 rounded-lg font-bold flex items-center justify-center mt-6 hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Processing...' : `Confirm Order - ${total} DZD`}
                    </button>
                </form>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-gray-700" />
                    Order Summary
                </h2>

                <div className="divide-y text-sm">
                    {items.map((item) => (
                        <div key={`${item._id}-${item.selectedSize}`} className="flex justify-between py-3">
                            <div className="flex gap-3">
                                <div className="relative w-12 h-12 bg-white rounded border overflow-hidden">
                                    {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full" /> : <div className="w-full h-full bg-gray-100" />}
                                </div>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500 text-xs">Qty: {item.quantity} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''}</p>
                                </div>
                            </div>
                            <p className="font-medium whitespace-nowrap">{item.price * item.quantity} DZD</p>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{subtotal} DZD</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Delivery {wilaya ? `(${wilaya})` : ''}</span>
                        <span>{wilaya ? (deliveryPrice ? `${deliveryPrice} DZD` : 'Free') : 'Calculated next step'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200">
                        <span>Total</span>
                        <span>{total} DZD</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
