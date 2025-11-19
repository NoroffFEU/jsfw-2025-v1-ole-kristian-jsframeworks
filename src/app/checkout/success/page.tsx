"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/app/cart-provider";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SuccessPage() {
  const { dispatch } = useCart();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    dispatch({ type: "CLEAR" });

    toast.dismiss();

    toast.success("Checkout successful", { id: "checkout-success", duration: 3000 });
  }, [dispatch]);

  return (
    <main className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">Thank you for your purchase!</h1>
      <p>Your order has been placed.</p>
      <Link href="/" className="underline">
        Back to store
      </Link>
    </main>
  );
}
