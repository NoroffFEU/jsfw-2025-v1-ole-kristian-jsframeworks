import React from "react";
import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";
import { CartProvider } from "@/app/cart-provider";


test("Cart page shows empty message when there are no items", () => {
  render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
  expect(screen.getByText(/Your cart/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();
});
