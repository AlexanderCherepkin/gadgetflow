"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "@/lib/data";
import { CurrencyCode } from "@/lib/utils";

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  deliveryCountry: string;
  setDeliveryCountry: (code: string) => void;
  deliveryCurrency: CurrencyCode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "gadgetflow_cart";
const COUNTRY_KEY = "gadgetflow_delivery_country";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function loadCountry(): string {
  if (typeof window === "undefined") return "BY";
  try {
    return localStorage.getItem(COUNTRY_KEY) || "BY";
  } catch {
    return "BY";
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [deliveryCountry, setDeliveryCountryState] = useState("BY");

  // Load cart after hydration to avoid mismatch between server (empty cart) and client.
  useEffect(() => {
    queueMicrotask(() => {
      setItems(loadCart());
      setDeliveryCountryState(loadCountry());
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem(COUNTRY_KEY, deliveryCountry);
    }
  }, [deliveryCountry, loaded]);

  const setDeliveryCountry = (code: string) => {
    setDeliveryCountryState(code);
  };

  const addItem = (product: Product, quantity = 1, variant?: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variant === variant
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.variant === variant
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, variant }];
    });
  };

  const removeItem = (productId: string, variant?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.variant === variant)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.variant === variant
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  // Delivery currency derived from selected country. Defaults to BYN.
  const deliveryCurrency: CurrencyCode = useMemo(() => {
    if (deliveryCountry === "RU") return "RUB";
    if (deliveryCountry === "KZ") return "KZT";
    if (deliveryCountry === "AM") return "AMD";
    if (deliveryCountry === "KG") return "KGS";
    return "BYN";
  }, [deliveryCountry]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        deliveryCountry,
        setDeliveryCountry,
        deliveryCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
