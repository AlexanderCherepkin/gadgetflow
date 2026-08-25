"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionTitle } from "@/components/ui/section-title";
import { Filter, X } from "lucide-react";
import type { Product } from "@/lib/data/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
  enableFilters?: boolean;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export function ProductGrid({ products, title, enableFilters = false }: ProductGridProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(6);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))).sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;
    if (min !== undefined && !Number.isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
    if (max !== undefined && !Number.isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    const rating = minRating ? Number(minRating) : undefined;
    if (rating !== undefined && !Number.isNaN(rating)) {
      result = result.filter((p) => (p.rating ?? 0) >= rating);
    }

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedBrands, minPrice, maxPrice, inStockOnly, minRating, sort]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setMinRating("");
    setVisibleCount(6);
  };

  // Reset pagination when filters or sort change
  const filterSignature = `${selectedBrands.join(",")}|${minPrice}|${maxPrice}|${inStockOnly}|${minRating}|${sort}`;
  useEffect(() => {
    queueMicrotask(() => setVisibleCount(6));
  }, [filterSignature]);

  const hasFilters =
    selectedBrands.length > 0 || minPrice || maxPrice || inStockOnly || minRating;

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        {title && <SectionTitle className="mb-8">{title}</SectionTitle>}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Filters — desktop sidebar / mobile drawer */}
          {enableFilters && (
            <>
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setFiltersOpen(true)}
                  className="h-11 w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Фильтры
                  </span>
                  {hasFilters && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      Активны
                    </span>
                  )}
                </Button>
              </div>

              <aside
                data-testid="filters-panel"
                className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-background p-6 shadow-xl transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0 lg:rounded-xl lg:border lg:bg-transparent lg:p-4 lg:shadow-none ${
                  filtersOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <h2 className="mb-4 text-lg font-semibold">Фильтры</h2>

                <div className="mb-4 flex items-center justify-between lg:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Закрыть фильтры</span>
                  </Button>
                </div>

                {hasFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="mb-4 h-auto w-full justify-start px-0 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Сбросить все
                  </Button>
                )}

                <div className="space-y-6">
                  {brands.length > 0 && (
                    <fieldset data-testid="filter-brand">
                      <legend className="mb-3 text-sm font-semibold">Бренд</legend>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <label
                            key={brand}
                            className="flex cursor-pointer items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className="h-4 w-4 rounded border-input accent-primary"
                            />
                            <span>{brand}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold">Цена, BYN</legend>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        placeholder="от"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="h-9"
                      />
                      <span className="text-muted-foreground">—</span>
                      <Input
                        type="number"
                        min={0}
                        placeholder="до"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold">Наличие</legend>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="h-4 w-4 rounded border-input accent-primary"
                      />
                      <span>Только в наличии</span>
                    </label>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold">Рейтинг</legend>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Любой" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой</SelectItem>
                        <SelectItem value="4.5">4.5 и выше</SelectItem>
                        <SelectItem value="4">4 и выше</SelectItem>
                        <SelectItem value="3">3 и выше</SelectItem>
                      </SelectContent>
                    </Select>
                  </fieldset>
                </div>
              </aside>

              {filtersOpen && (
                <div
                  className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                  onClick={() => setFiltersOpen(false)}
                />
              )}
            </>
          )}

          <div className="flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "товар"
                  : filteredProducts.length > 1 && filteredProducts.length < 5
                    ? "товара"
                    : "товаров"}
              </p>

              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="h-11 w-[180px]" aria-label="Сортировка">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">По популярности</SelectItem>
                  <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border p-8 text-center">
                <p className="text-lg font-medium">Товары не найдены</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Попробуйте изменить параметры фильтрации или поиска.
                </p>
                {hasFilters && (
                  <Button onClick={resetFilters} className="mt-4">
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {visibleCount < filteredProducts.length && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" className="h-11" onClick={() => setVisibleCount((c) => c + 6)}>
                      Загрузить ещё
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
