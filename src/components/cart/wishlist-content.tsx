"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/home/product-card";
import { useWishlist } from "@/context/wishlist-context";

export function WishlistContent() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="h-16 w-16 text-border mb-6" />
        <h1 className="text-2xl font-semibold mb-2">Избранное пусто</h1>
        <p className="text-text-secondary mb-6">Сохраняйте товары, чтобы вернуться к ним позже</p>
        <Button asChild>
          <Link href="/">Перейти в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Избранное ({items.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
