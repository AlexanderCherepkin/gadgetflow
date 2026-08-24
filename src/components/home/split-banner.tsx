"use client";

import Image from "next/image";
import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "./product-card";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function SplitBanner() {
  const editorPicks = getFeaturedProducts().slice(0, 3);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-padding bg-surface">
      <div className="container-tight">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px] rounded-2xl overflow-hidden image-hover">
            <Image
              src="/images/lifestyle/lifestyle-1.jpg"
              alt="Lifestyle с гаджетами"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <SectionTitle className="mb-6">Выбор редакции</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-4">
              {editorPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
