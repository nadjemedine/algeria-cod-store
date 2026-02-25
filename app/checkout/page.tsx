import { getDeliveryPrices } from '@/lib/api';
import CheckoutForm from '@/components/CheckoutForm';

export default async function CheckoutPage() {
    let deliveryPrices = [];
    try {
        deliveryPrices = await getDeliveryPrices();
    } catch (error) {
        console.error('Failed to load delivery prices form Sanity:', error);
    }

    return (
        <div className="p-6 space-y-8 pb-32 max-w-md mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-gray-900">Finaliser la Commande</h1>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Veuillez remplir vos informations ci-dessous. Le paiement se fait à la livraison.</p>
            </div>

            <CheckoutForm deliveryPrices={deliveryPrices} />
        </div>
    );
}
