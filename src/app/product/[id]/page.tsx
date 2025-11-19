import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import AddToCart from "./AddToCart";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const product = await getProduct(id);

    const img = typeof product.image === "string" ? product.image : product.image?.url;

    const hasDiscount =
      typeof product.discountedPrice === "number" && product.discountedPrice < product.price;
    const finalPrice = hasDiscount ? product.discountedPrice! : product.price;

    let ratingValue: number | null = null;
    if (product && (product as any).rating != null) {
      const r = (product as any).rating;
      if (typeof r === "number") ratingValue = r;
      else if (typeof r === "object" && typeof r.rate === "number") ratingValue = r.rate;
    }
    if (ratingValue === null && Array.isArray(product.reviews) && product.reviews.length > 0) {
      const sum = product.reviews.reduce((s, rv) => s + (rv.rating ?? 0), 0);
      ratingValue = Number((sum / product.reviews.length).toFixed(1));
    }

    const ratingText = ratingValue ? `${ratingValue}/5` : "No rating";

    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden border bg-white shadow-sm">
              <img
                src={img}
                alt={product.title}
                className="w-full h-[520px] object-cover"
              />
            </div>

            <div className="mt-4 bg-white rounded-lg p-5 border shadow-sm">
              <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>

              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{ratingText}</span>
                  {product.reviews?.length ? (
                    <span className="text-xs text-gray-500">· {product.reviews.length} reviews</span>
                  ) : null}
                </div>

                {product.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((t) => (
                      <span key={t} className="rounded bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-lg border bg-white p-5 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    {hasDiscount && (
                      <div className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</div>
                    )}
                    <div className="text-2xl font-bold text-gray-900">${finalPrice.toFixed(2)}</div>
                  </div>

                  {hasDiscount && (
                    <div className="rounded bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
                      -{Math.round(100 - (finalPrice / product.price) * 100)}%
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <AddToCart product={product} />
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>Secure checkout · Free returns · Fast shipping</p>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Customer reviews</h3>
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="mt-3 space-y-3 max-h-48 overflow-auto pr-2">
                    {product.reviews.slice(0, 4).map((r) => (
                      <div key={r.id} className="rounded border p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{r.username}</span>
                          <span className="text-sm text-gray-700">{r.rating}/5</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{r.description}</p>
                      </div>
                    ))}
                    {product.reviews.length > 4 && (
                      <div className="mt-2 text-xs text-gray-500">Showing 4 of {product.reviews.length} reviews</div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-600">No reviews yet.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
