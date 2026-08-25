"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/home/product-card";
import { searchProducts } from "@/lib/data/products";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") || "");
      setMounted(true);
    });
  }, []);

  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {query ? `Результаты поиска: «${query}»` : "Поиск по товарам"}
          </h1>

          {mounted && query && results.length > 0 && (
            <p className="text-text-secondary mb-8">Найдено {results.length} товаров</p>
          )}

          {mounted && query && results.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-text-secondary mb-6">
                По запросу «{query}» ничего не найдено.
              </p>
              <p className="text-sm text-text-muted">
                Попробуйте другой запрос, например: iPhone, Samsung, наушники, часы.
              </p>
            </div>
          )}

          {mounted && !query && (
            <div className="py-20 text-center text-text-secondary">
              Введите название товара, бренда или категории в поле поиска.
            </div>
          )}

          {!mounted && (
            <div className="py-20 text-center text-text-secondary">
              Загрузка…
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
