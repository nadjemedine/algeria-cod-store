import { getProductById, getRelatedProducts } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);
    const relatedProducts = await getRelatedProducts(id);

    if (!product) {
        notFound();
    }

    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
