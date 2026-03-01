import { getProducts } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';

export default async function StorePage() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products.", error);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-6 pb-2">
        <h2 className="text-center font-black text-2xl text-black italic">Nos Produits</h2>
        <div className="w-20 h-1 bg-[#c5a059] mx-auto mt-2"></div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
