"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function CollectionCard({ category }: { category: (typeof categories)[0] }) {
  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl card-hover"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">{category.name}</h3>
        <p className="text-sm text-white/80">{category.description}</p>
      </div>
    </Link>
  );
}

export function CollectionCards() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <section className="section-padding">
      <div className="container-tight">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-8 md:mb-12">
          Коллекции
        </h2>
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((cat) => (
            <CollectionCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
