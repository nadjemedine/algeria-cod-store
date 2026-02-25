import { client } from '../sanity/lib/client';

export async function getProducts() {
  return await client.fetch(`
    *[_type == "product" && hidden != true] | order(_createdAt desc) {
      _id,
      name,
      price,
      sizes,
      description,
      stockQuantity,
      hidden,
      image,
      "images": images[].asset->url
    }
  `, {}, { next: { revalidate: 60 } });
}

export async function getProductById(id: string) {
  return await client.fetch(`
    *[_type == "product" && _id == $id][0] {
      _id,
      name,
      price,
      sizes,
      description,
      stockQuantity,
      hidden,
      image,
      "images": images[].asset->url
    }
  `, { id }, { next: { revalidate: 60 } });
}

export async function getDeliveryPrices() {
  return await client.fetch(`
    *[_type == "deliveryPrice"]{
      wilayaName,
      homeDeliveryPrice,
      officeDeliveryPrice
    }
  `, {}, { next: { revalidate: 60 * 60 } });
}
export async function getRelatedProducts(productId: string) {
  return await client.fetch(`
    *[_type == "product" && _id != $productId && hidden != true][0...4] {
      _id,
      name,
      price,
      image
    }
  `, { productId }, { next: { revalidate: 60 } });
}
