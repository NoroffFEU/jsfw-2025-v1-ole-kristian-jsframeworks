"use client";
import { useCart } from "@/app/cart-provider";
import type { Product } from "@/lib/cart";
import toast from "react-hot-toast";

export default function AddToCart({ product }: { product: Product }) {
  const { dispatch } = useCart();
  return (
    <button
      onClick={() => {
        dispatch({ type: "ADD", product });
        toast.success("Added to cart");
      }}
      className="mt-4 px-4 py-2 rounded bg-black text-white"
    >
      Add to cart
    </button>
  );
}

