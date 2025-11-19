"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type Product = {
  id: string;
  title: string;
  description: string;
  image: string | { url: string; alt?: string };
  price: number;
  discountedPrice?: number;
};

type CartItem = { product: Product; quantity: number };
type CartState = { items: CartItem[] };

const initial: CartState = { items: [] };

type Action =
  | { type: "ADD"; product: Product; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.qty ?? 1;
      const idx = state.items.findIndex(i => i.product.id === action.product.id);
      if (idx === -1) return { items: [...state.items, { product: action.product, quantity: qty }] };
      const items = [...state.items];
      items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
      return { items };
    }
    case "REMOVE":
      return { items: state.items.filter(i => i.product.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map(i =>
          i.product.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      };
    case "CLEAR":
      return initial;
    default:
      return state;
  }
}

const Ctx = createContext<{ state: CartState; dispatch: React.Dispatch<Action> } | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, () => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as CartState) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
