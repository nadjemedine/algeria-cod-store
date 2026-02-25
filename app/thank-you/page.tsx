import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
            <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold text-center mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 text-center mb-8 max-w-md">
                Thank you for your order. We will contact you shortly to confirm your delivery details.
            </p>
            <Link href="/">
                <button className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
}
