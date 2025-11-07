import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-3 rounded">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="mt-2 font-medium">{product.title}</h2>
            <p>${product.discountedPrice} </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
