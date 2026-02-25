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
        <div className="p-4 space-y-6 pb-24 md:pb-12 max-w-5xl mx-auto">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <p className="text-gray-500 mt-1">Complete your order details below. Payment is Cash on Delivery.</p>
            </div>

            <CheckoutForm deliveryPrices={deliveryPrices} />
        </div>
    );
}
