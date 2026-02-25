import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
            <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-50 animate-pulse" />
                <CheckCircle className="h-28 w-28 text-green-500 relative z-10" />
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">Merci !</h1>
                <p className="text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
                    Votre commande a été confirmée avec succès. Nous vous contacterons très prochainement pour valider les détails de livraison.
                </p>
            </div>

            <Link href="/" className="w-full max-w-xs">
                <button className="w-full bg-primary text-white px-8 py-5 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all">
                    Retour à l'accueil
                </button>
            </Link>
        </div>
    );
}
