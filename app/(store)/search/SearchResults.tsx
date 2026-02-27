'use client';

import { useState, useEffect } from 'react';
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

export default function SearchResults({ query }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts: Product[] = await getProducts();
        const filteredProducts = allProducts.filter(product =>
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
    <>
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
    </>
  );
}