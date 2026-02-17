"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";


type Product = {
  id: string;
  title: string;
  description: string;
  image: string | { url: string; alt?: string };
  price: number;
  discountedPrice?: number;
  rating?: number | { rate: number; count?: number };
};

function getImageSrc(image: Product["image"]) {
  return typeof image === "string" ? image : image?.url;
}

function getFinalPrice(p: Product) {
  const hasDiscount =
    typeof p.discountedPrice === "number" && p.discountedPrice < p.price;
  return {
    hasDiscount,
    finalPrice: hasDiscount ? (p.discountedPrice as number) : p.price,
  };
}

function getRatingValue(rating: Product["rating"]): number | null {
  if (rating === null || rating === undefined) return null;
  if (typeof rating === "number") return rating;
  if (typeof rating === "object" && typeof rating.rate === "number")
    return rating.rate;
  return null;
}

function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  const full = Math.round(v);
  return (
    <span aria-label={`Rating ${v} out of 5`} className="text-sm text-yellow-500">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"name" | "price">("name");

  const filtered = useMemo(() => {
    const list = products.filter((p) =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );
    return [...list].sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price)
    );
  }, [products, q, sort]);

  useEffect(() => {
    if (q.trim().length > 0 && filtered.length === 0) {
      toast("No matching results", { icon: "🔎" });
    }
  }, [q, filtered.length]);

  const suggestions = q
    ? products
        .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:flex-1">
          <div className="flex items-center gap-3 bg-white rounded shadow-sm p-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
              className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
              aria-label="Search products"
            />
            <button
              type="button"
              onClick={() => setQ("")}
              className="text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
              aria-label="Clear search"
            >
              Clear
            </button>
          </div>

          {q && suggestions.length > 0 && (
            <ul
              className="absolute z-20 mt-2 w-full rounded border bg-white shadow"
              role="listbox"
            >
              {suggestions.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.id}`}
                    className="block px-3 py-2 hover:bg-gray-50 text-sm"
                    role="option"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "name" | "price")}
          className="w-full rounded border px-3 py-2 sm:w-48 bg-white"
          aria-label="Sort products"
        >
          <option value="name">Sort by name</option>
          <option value="price">Sort by price</option>
        </select>
      </div>

      {filtered.length === 0 && q.trim().length === 0 && (
        <p className="text-sm text-gray-600">Start typing to search…</p>
      )}

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => {
          const img = getImageSrc(product.image);
          const { hasDiscount, finalPrice } = getFinalPrice(product);
          const ratingVal = getRatingValue(product.rating);

          return (
            <li
              key={product.id}
              className="relative rounded-lg bg-white shadow-sm border overflow-hidden hover:shadow-md transition transform hover:-translate-y-0.5"
            >
              {hasDiscount && (
                <span className="absolute right-3 top-3 rounded bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white z-10">
                  -{Math.round(100 - (finalPrice / product.price) * 100)}%
                </span>
              )}

              <Link href={`/product/${product.id}`} className="block">
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <h2 className="mt-0 text-sm font-medium text-gray-900 line-clamp-2">
                    {product.title}
                  </h2>

                  {ratingVal !== null && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <Stars value={ratingVal} />
                      <span className="text-xs text-gray-600">({ratingVal.toFixed(1)})</span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-3">
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                    <span className="font-semibold text-gray-900">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
