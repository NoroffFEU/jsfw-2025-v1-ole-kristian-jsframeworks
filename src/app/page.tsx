import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}
