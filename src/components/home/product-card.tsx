"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";
import { Price } from "@/components/ui/price";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  const badgeVariant =
    product.badge === "-11%" || product.badge === "Выгода"
      ? "sale"
      : "default";

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl border border-border p-3 md:p-4 card-hover",
        className
      )}
    >
      <Link href={`/catalog/${product.category}/${product.slug}`} className="image-hover relative aspect-square rounded-xl mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
        />
        {product.badge && (
          <Badge variant={badgeVariant} className="absolute top-3 left-3">
            {product.badge}
          </Badge>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product);
          }}
          className="absolute top-3 right-3 flex items-center justify-center h-11 w-11 rounded-full bg-white shadow-card opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          aria-label={isInWishlist(product.id) ? "Удалить из избранного" : "В избранное"}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isInWishlist(product.id)
                ? "fill-error text-error"
                : "text-text-secondary"
            )}
          />
        </button>
      </Link>

      <div className="flex-1 flex flex-col">
        <Rating value={product.rating} count={product.reviews} />
        <Link
          href={`/catalog/${product.category}/${product.slug}`}
          className="mt-2 inline-block min-h-[44px] text-sm md:text-base font-medium leading-snug hover:text-accent transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-text-muted line-through">
                <Price value={product.oldPrice} />
              </span>
            )}
            <span className="text-lg font-semibold"><Price value={product.price} /></span>
          </div>
          <Button
            size="icon"
            onClick={() => addItem(product)}
            aria-label="Добавить в корзину"
            className="h-11 w-11 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
