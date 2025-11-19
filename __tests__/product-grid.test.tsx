import { render, screen } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";

const mockProducts = [
  {
    id: "1",
    title: "Alpha Product",
    description: "desc",
    image: "https://picsum.photos/200",
    price: 100,
    discountedPrice: 80,
    rating: 4.2,
  },
  {
    id: "2",
    title: "Beta Product",
    description: "desc",
    image: "https://picsum.photos/200",
    price: 50,
    rating: { rate: 3.5, count: 10 },
  },
];

test("ProductGrid renders product titles and prices", () => {
  render(<ProductGrid products={mockProducts} />);

  expect(screen.getByText("Alpha Product")).toBeInTheDocument();
  expect(screen.getByText("Beta Product")).toBeInTheDocument();

  expect(screen.getByText("$80.00")).toBeInTheDocument();
});
