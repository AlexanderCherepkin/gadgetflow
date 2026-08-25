"use client";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { CookieConsent } from "./cookie-consent";
import { Watermark } from "./watermark";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Watermark />
        {children}
        <CookieConsent />
      </WishlistProvider>
    </CartProvider>
  );
}
