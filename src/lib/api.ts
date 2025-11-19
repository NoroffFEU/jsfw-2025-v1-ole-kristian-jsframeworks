const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://v2.api.noroff.dev";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string | { url: string; alt?: string };
  price: number;
  discountedPrice?: number;
  tags?: string[];
  reviews?: { id: string; username: string; rating: number; description: string }[];
};

type ApiWrap<T> = { data: T };

async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const body: ApiWrap<T> | T = await res.json();
  return (body as any).data ?? body;
}

export async function getProducts(): Promise<Product[]> {
  return getJSON<Product[]>("/online-shop");
}

export async function getProduct(id: string): Promise<Product> {
  return getJSON<Product>(`/online-shop/${id}`);
}
