const BASE_URL = "https://v2.api.noroff.dev";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/online-shop`);
  const json = await res.json();
  return json.data; // API wraps results in .data
}

export async function getProduct(id: string) {
  const res = await fetch(`${BASE_URL}/online-shop/${id}`);
  const json = await res.json();
  return json.data;
}
