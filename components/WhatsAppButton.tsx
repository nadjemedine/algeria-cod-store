'use client';

import { Radio } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = '213563413607'; // Algeria code + number
    const message = 'Bonjour, je souhaite avoir plus d\'informations sur vos produits.';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 right-4 z-40 bg-primary text-white p-2.5 rounded-none shadow-md hover:scale-110 active:scale-95 transition-all animate-bounce"
            aria-label="Contactez-nous sur WhatsApp"
        >
            <Radio className="w-5 h-5 fill-current rotate-90" />
        </a>
    );
}
