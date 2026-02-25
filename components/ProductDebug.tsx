'use client';

import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: any;
}

export default function ProductDebug() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const productsData: Product[] = await client.fetch('*[_type == "product"]{name, _id, price, description, image}');
        console.log('Products data:', productsData);
        setProducts(productsData);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Unknown error');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Debug</h1>
      <p>Products found: {products.length}</p>
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <h2 className="font-bold">{product.name}</h2>
              <p>ID: {product._id}</p>
              <p>Price: {product.price}</p>
              {product.description && <p>Description: {product.description}</p>}
              {product.image && <p>Has image: Yes</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in Sanity dataset</p>
      )}
    </div>
  );
}