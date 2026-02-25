import { getGroupsWithProducts } from '@/lib/api';
import StoreContent from '@/components/StoreContent';

export default async function StorePage() {
  let groupsWithProducts = [];
  try {
    groupsWithProducts = await getGroupsWithProducts();
  } catch (error) {
    console.error("Error fetching groups.", error);
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen">
      <StoreContent groups={groupsWithProducts} />
    </div>
  );
}
