"use client";

import { getFeaturedProducts } from "@/lib/data/products";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductCard } from "./product-card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FeaturedProducts() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const products = getFeaturedProducts();

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <SectionTitle subtitle="Товары, которые чаще всего выбирают наши покупатели">
          Рекомендуемые товары
        </SectionTitle>
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
