export interface Product {
  id: string;
  title: string;
  description: string;
  image: string | { url: string; alt?: string };
  price: number;
  discountedPrice?: number;
  rating?: number;
  tags?: string[];
  reviews?: {
    id: string;
    username: string;
    rating: number;
    description: string;
  }[];
}
