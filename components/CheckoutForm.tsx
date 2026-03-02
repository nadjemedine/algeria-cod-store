'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { MapPin, Building, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { STATIC_DELIVERY_PRICES } from '@/sanity/schemaTypes/deliveryPrice';

// Wilayas with absolutely no delivery service
const NO_DELIVERY_WILAYAS = ['Illizi', 'Tindouf', 'Djanet', 'Bordj Badji Mokhtar'];
// Wilayas with home delivery only (no office/bureau option)
const HOME_ONLY_WILAYAS = ['Tissemsilt', 'Khenchela', 'Timimoun', 'In Salah', 'In Guezzam', "El M'Ghair", 'El Meniaa'];

// Only wilayas that have at least home delivery
const AVAILABLE_WILAYAS = STATIC_DELIVERY_PRICES
    .filter(p => !NO_DELIVERY_WILAYAS.includes(p.wilayaName) && p.homeDeliveryPrice !== null)
    .map(p => p.wilayaName);

export default function CheckoutForm() {
    const { items, totalPrice, clearCart } = useCartStore();
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [wilaya, setWilaya] = useState('');
    const [deliveryType, setDeliveryType] = useState('home');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Check if selected wilaya supports office delivery
    const hasOfficeDelivery = wilaya ? !HOME_ONLY_WILAYAS.includes(wilaya) : true;

    if (items.length === 0) {
        return (
            <div className="text-center py-20 flex flex-col items-center">
                <ShoppingBag className="h-16 w-16 text-gray-200 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">Votre panier est vide</h2>
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 px-6 py-2 bg-[#1c1c1c] text-[#c5a059] border border-[#c5a059]/20 rounded-none font-bold shadow-md shadow-black/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
                >
                    Continuer vos achats
                </button>
            </div>
        );
    }

    const selectedWilayaData = STATIC_DELIVERY_PRICES.find((p) => p.wilayaName === wilaya);
    const deliveryPrice = selectedWilayaData
        ? deliveryType === 'home'
            ? selectedWilayaData.homeDeliveryPrice
            : selectedWilayaData.officeDeliveryPrice
        : 0;

    const subtotal = totalPrice();
    const total = subtotal + (deliveryPrice || 0);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Le nom complet est requis';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Le numéro de téléphone est requis';
        } else if (!/^\d{9,10}$/.test(phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Numéro de téléphone invalide';
        }

        if (!wilaya) {
            newErrors.wilaya = 'Veuillez sélectionner votre wilaya';
        }

        if (!address.trim()) {
            newErrors.address = 'La commune est requise';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
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
                alert('Une erreur est survenue, veuillez réessayer.');
                setIsSubmitting(false);
            }
        } catch (error) {
            alert('Erreur réseau, veuillez réessayer.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col pb-12 w-full">
            <div className="bg-background p-4 md:p-8 rounded-none border-y border-[#c5a059]/10 w-full">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                    <Truck className="h-6 w-6 text-primary" />
                    Informations de Livraison
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">Nom</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                            }}
                            className={`w-full border-2 rounded-none px-5 py-3.5 focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-200 placeholder:text-gray-300 focus:scale-[1.01] origin-left ${errors.fullName ? 'border-red-500' : 'border-gray-50 focus:border-primary/30'}`}
                            placeholder="Votre Nom"
                            aria-invalid={!!errors.fullName}
                            aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        />
                        {errors.fullName && (
                            <p id="fullName-error" className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">Numéro</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            className={`w-full border-2 rounded-none px-5 py-3.5 focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-200 placeholder:text-gray-300 focus:scale-[1.01] origin-left ${errors.phone ? 'border-red-500' : 'border-gray-50 focus:border-primary/30'}`}
                            placeholder="05XX XX XX XX"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                            <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Wilaya</label>
                            <select
                                value={wilaya}
                                onChange={(e) => {
                                    const newWilaya = e.target.value;
                                    setWilaya(newWilaya);
                                    // If this wilaya has no office delivery, force home
                                    if (HOME_ONLY_WILAYAS.includes(newWilaya)) {
                                        setDeliveryType('home');
                                    }
                                    if (errors.wilaya) setErrors(prev => ({ ...prev, wilaya: '' }));
                                }}
                                className={`w-full border-2 rounded-none px-5 py-3.5 focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-200 bg-white appearance-none focus:scale-[1.01] origin-left ${errors.wilaya ? 'border-red-500' : 'border-gray-50 focus:border-primary/30'}`}
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a1a1aa\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
                                aria-invalid={!!errors.wilaya}
                                aria-describedby={errors.wilaya ? "wilaya-error" : undefined}
                            >
                                <option value="" disabled>Sélectionner</option>
                                {AVAILABLE_WILAYAS.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.wilaya && (
                                <p id="wilaya-error" className="text-red-500 text-xs mt-1">{errors.wilaya}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Commune</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                                }}
                                className={`w-full border-2 rounded-none px-5 py-3.5 focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-200 placeholder:text-gray-300 focus:scale-[1.01] origin-left ${errors.address ? 'border-red-500' : 'border-gray-50 focus:border-primary/30'}`}
                                placeholder="Commune"
                                aria-invalid={!!errors.address}
                                aria-describedby={errors.address ? "address-error" : undefined}
                            />
                            {errors.address && (
                                <p id="address-error" className="text-red-500 text-xs mt-1">{errors.address}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">Type de livraison</label>
                        <div className={`grid gap-3 ${hasOfficeDelivery ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            <label className={`cursor-pointer flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-none ${deliveryType === 'home' ? 'bg-[#1c1c1c] border-[#c5a059] text-[#c5a059]' : 'bg-white/50 border-gray-100 text-gray-400 hover:text-gray-600'}`}>
                                <input type="radio" className="sr-only" name="deliveryType" value="home" checked={deliveryType === 'home'} onChange={() => setDeliveryType('home')} />
                                <MapPin className={`h-5 w-5 mr-2 ${deliveryType === 'home' ? 'text-[#c5a059]' : 'text-gray-300'}`} />
                                <span className={`text-sm font-bold ${deliveryType === 'home' ? 'text-[#c5a059]' : 'text-gray-500'}`}>Domicile</span>
                            </label>

                            {hasOfficeDelivery && (
                                <label className={`cursor-pointer flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-none ${deliveryType === 'office' ? 'bg-[#1c1c1c] border-[#c5a059] text-[#c5a059]' : 'bg-white/50 border-gray-100 text-gray-400 hover:text-gray-600'}`}>
                                    <input type="radio" className="sr-only" name="deliveryType" value="office" checked={deliveryType === 'office'} onChange={() => setDeliveryType('office')} />
                                    <Building className={`h-5 w-5 mr-2 ${deliveryType === 'office' ? 'text-[#c5a059]' : 'text-gray-300'}`} />
                                    <span className={`text-sm font-bold ${deliveryType === 'office' ? 'text-[#c5a059]' : 'text-gray-500'}`}>Bureau</span>
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-none border border-gray-100 space-y-8 mt-8">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                            <ShieldCheck className="h-6 w-6 text-green-500" />
                            Résumé de la Commande
                        </h2>

                        <div className="divide-y divide-gray-100 -mx-2">
                            {items.map((item) => (
                                <div key={`${item._id}-${item.selectedSize}`} className="flex justify-between py-4 px-2">
                                    <div className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-white rounded-none border border-gray-100 overflow-hidden shrink-0">
                                            {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full" /> : <div className="w-full h-full bg-gray-50" />}
                                            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-bl-sm">
                                                x{item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold text-gray-800 leading-tight">{item.name}</p>
                                            <p className="text-gray-400 text-xs mt-1">{item.selectedSize ? `Taille: ${item.selectedSize}` : 'Taille Unique'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-black text-gray-800">{(item.price * item.quantity).toLocaleString()} DA</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-none border border-gray-100 space-y-3">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Sous-total</span>
                                <span>{subtotal.toLocaleString()} DA</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Livraison {wilaya ? `(${wilaya})` : ''}</span>
                                <span>{wilaya ? (deliveryPrice ? `${deliveryPrice.toLocaleString()} DA` : 'Gratuite') : 'Calculée ensuite'}</span>
                            </div>
                            <div className="flex justify-between font-black text-2xl pt-4 border-t border-gray-100 text-[#1c1c1c]">
                                <span>Total</span>
                                <span className="text-[#1c1c1c]">{total.toLocaleString()} DA</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest justify-center italic">
                            <ShieldCheck className="h-3 w-3" />
                            Paiement à la livraison
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#1c1c1c] text-[#c5a059] border border-[#c5a059]/30 py-4 px-4 rounded-none font-black text-base flex items-center justify-center mt-6 hover:bg-[#2a2a2a] shadow-md shadow-black/10 transition-all active:scale-95 disabled:bg-gray-200 disabled:shadow-none disabled:cursor-not-allowed uppercase tracking-[0.1em]">
                        {isSubmitting ? 'Traitement...' : `Confirmer la Commande - ${total.toLocaleString()} DA`}
                    </button>
                </form>
            </div>
        </div>
    );
}
