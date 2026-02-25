import Image from 'next/image';
import { getGroupsWithProducts } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';

// Fallback image url if none provided
const placeholderImg = "https://via.placeholder.com/300";

export default async function StorePage() {
  let groupsWithProducts = [];
  try {
    groupsWithProducts = await getGroupsWithProducts();
  } catch (error) {
    console.error("Error fetching groups. Ensure Sanity credentials are provided.", error);
  }

  return (
    <div className="p-4 space-y-8 pb-12">
      {groupsWithProducts.length > 0 ? (
        groupsWithProducts.map((group: any) => (
          <section key={group._id} className="space-y-4">
            <h2 className="text-2xl font-bold bg-white p-2 rounded shadow-sm">{group.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.products
                // only list products that are defined and NOT hidden
                ?.filter((p: any) => p && !p.hidden)
                .map((product: any) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={product.image || placeholderImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{product.name}</h3>
                      <p className="font-bold text-red-600 mt-1">{product.price} DZD</p>

                      <div className="mt-auto pt-3">
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p>Configure Sanity variables and add products to show them here.</p>
        </div>
      )}
    </div>
  );
}
