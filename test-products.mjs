import { client } from './sanity/lib/client.js';

async function testProducts() {
  try {
    console.log('Testing product fetch...');
    const products = await client.fetch('*[_type == "product"]{name, _id, price}');
    console.log('Products found:', products.length);
    console.log('Products:', products);
    
    if (products.length > 0) {
      const firstProduct = products[0];
      console.log('First product:', firstProduct);
      
      // Test fetching by ID
      const productById = await client.fetch('*[_type == "product" && _id == $id][0]', { id: firstProduct._id });
      console.log('Product by ID:', productById);
    } else {
      console.log('No products found in Sanity dataset');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

testProducts();