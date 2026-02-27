import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
    return (
        <div className="w-full bg-background min-h-screen pb-32">
            <div className="space-y-2 p-6 md:p-8">
                <h1 className="text-3xl font-black text-gray-900">Finaliser la Commande</h1>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Veuillez remplir vos informations ci-dessous. Le paiement se fait à la livraison.</p>
            </div>

            <CheckoutForm />
        </div>
    );
}
