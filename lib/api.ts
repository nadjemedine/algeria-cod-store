import { client } from '../sanity/lib/client';

export async function getGroupsWithProducts() {
    return await client.fetch(`
    *[_type == "group"]{
      _id,
      title,
      "image": image.asset->url,
      products[]->{
        _id,
        name,
        price,
        sizes,
        description,
        stockQuantity,
        hidden,
        "image": image.asset->url
      }
    }
  `, {}, { next: { revalidate: 60 } });
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
