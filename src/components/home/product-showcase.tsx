"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { getProductBySlug } from "@/lib/data/products";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function ProductShowcase() {
  const product = getProductBySlug("apple-iphone-15-128gb");
  const { addItem } = useCart();
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  if (!product) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div
          ref={ref}
          className={`relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[520px] flex items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Image
            src="/images/lifestyle/showcase.jpg"
            alt="Рекомендуемый товар"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

          <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-xl">
            <Badge variant="sale" className="mb-4">Рекомендуем</Badge>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4">
              {product.name}
            </h2>
            <p className="text-white/80 text-lg mb-6">
              {product.shortDescription}
            </p>
            <div className="flex items-center gap-3 mb-6">
              <Rating value={product.rating} />
              <span className="text-white/80 text-sm">{product.reviews} отзывов</span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => addItem(product)}>
                В корзину
              </Button>
              <Button variant="outline" size="lg" asChild
                className="border-white text-white hover:bg-white hover:text-foreground"
              >
                <Link href={`/catalog/${product.category}/${product.slug}`}>Подробнее</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
