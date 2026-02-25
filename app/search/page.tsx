'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: any;
  sizes?: any[];
  hidden?: boolean;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts: Product[] = await getProducts();
        const filteredProducts = allProducts.filter((product: Product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="bg-white min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          Résultats pour "{query}"
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Recherche en cours...</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
        {!loading && products.length === 0 && query && (
          <div className="text-center py-10">
            <p className="text-gray-500">Aucun produit trouvé pour "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}