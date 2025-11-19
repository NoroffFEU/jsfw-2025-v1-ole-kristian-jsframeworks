"use client";

import Link from "next/link";
import { useCart } from "@/app/cart-provider";
import toast from "react-hot-toast";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (sum, i) => sum + (i.product.discountedPrice ?? i.product.price) * i.quantity,
    0
  );

  if (state.items.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your cart</h1>
        <p>
          Cart is empty.{" "}
          <Link href="/" className="underline">
            Continue shopping
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your cart</h1>

      <ul className="divide-y rounded border overflow-hidden bg-white">
        {state.items.map(({ product, quantity }) => {
          const img =
            typeof product.image === "string" ? product.image : product.image?.url;
          const unit = product.discountedPrice ?? product.price;

          return (
            <li
              key={product.id}
              className="p-3 flex items-start gap-3 sm:items-center"
            >
              <img
                src={img}
                alt={product.title}
                className="w-16 h-16 object-cover rounded flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="font-medium line-clamp-2">{product.title}</div>
                <div className="text-sm text-gray-600">${unit.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-label={`Decrease quantity for ${product.title}`}
                  className="h-8 w-8 rounded border flex items-center justify-center text-lg select-none"
                  onClick={() =>
                    dispatch({
                      type: "SET_QTY",
                      id: product.id,
                      qty: Math.max(1, quantity - 1),
                    })
                  }
                >
                  −
                </button>

                <div className="w-10 text-center">{quantity}</div>

                <button
                  aria-label={`Increase quantity for ${product.title}`}
                  className="h-8 w-8 rounded border flex items-center justify-center text-lg select-none"
                  onClick={() =>
                    dispatch({
                      type: "SET_QTY",
                      id: product.id,
                      qty: quantity + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
              <div className="ml-2">
                <button
                  onClick={() => {
                    dispatch({ type: "REMOVE", id: product.id });
                    toast("Removed from cart");
                  }}
                  className="text-sm underline"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg">
          Total: <strong>${total.toFixed(2)}</strong>
        </div>

        <Link
          href="/checkout/success"
          className="inline-block px-4 py-2 rounded bg-green-600 text-white text-center"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
