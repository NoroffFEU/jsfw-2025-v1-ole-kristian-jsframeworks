"use client";
import { useCart } from "@/app/cart-provider";

export default function CartCount() {
  const { state } = useCart();
  const count = state.items.reduce((n, i) => n + i.quantity, 0);
  return (
    <span className="ml-2 inline-flex items-center rounded bg-black px-2 py-0.5 text-xs text-white">
      {count}
    </span>
  );
}
