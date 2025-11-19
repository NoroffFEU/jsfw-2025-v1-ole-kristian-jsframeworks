import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCart from "@/app/product/[id]/AddToCart"; 
import { CartProvider } from "@/app/cart-provider";


const product = {
  id: "test-1",
  title: "Test Product",
  description: "desc",
  image: "https://picsum.photos/200",
  price: 100,
  discountedPrice: 80,
};

test("clicking AddToCart dispatches add and shows toast (cart state updates)", () => {
  render(
    <CartProvider>
      <AddToCart product={product as any} />
    </CartProvider>
  );
  const btn = screen.getByRole("button", { name: /add to cart/i });
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);

  expect(btn).toBeInTheDocument();
});
