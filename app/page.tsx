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
    <div className="bg-white min-h-screen">
      <ProductGrid products={products} />
    </div>
  );
}
