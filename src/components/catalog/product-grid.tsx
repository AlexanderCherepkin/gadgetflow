"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/data";
import { ProductCard } from "@/components/home/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
];

export function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("popular");
  const [showCount, setShowCount] = useState(8);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [products, sort]);

  const visible = sorted.slice(0, showCount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {products.length} товаров
        </span>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-text-secondary">
          В этой категории пока нет товаров
        </div>
      )}

      {sorted.length > showCount && (
        <div className="text-center pt-8">
          <button
            onClick={() => setShowCount((c) => c + 8)}
            className="btn-secondary"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </div>
  );
}
