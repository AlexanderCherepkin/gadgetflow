"use client";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}
