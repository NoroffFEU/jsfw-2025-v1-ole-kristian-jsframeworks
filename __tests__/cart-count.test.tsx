import { render, screen } from "@testing-library/react";
import CartCount from "@/components/cart-count";
import { CartProvider } from "@/app/cart-provider";

test("CartCount shows correct quantity", () => {
  
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  render(<CartCount />, { wrapper });

  expect(screen.getByText("0")).toBeInTheDocument();
});
