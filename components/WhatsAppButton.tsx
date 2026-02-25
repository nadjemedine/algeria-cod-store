'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = '213563413607'; // Algeria code + number
    const message = 'Bonjour, je souhaite avoir plus d\'informations sur vos produits.';

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-24 right-4 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
            aria-label="Contact support on WhatsApp"
        >
            <MessageCircle className="h-5 w-5 fill-current" />
        </button>
    );
}
