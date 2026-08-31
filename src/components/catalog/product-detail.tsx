"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Check, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";
import { Price } from "@/components/ui/price";

const tabs = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "delivery", label: "Доставка и гарантия" },
];

export function ProductDetail({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  return (
    <div className="container-tight">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square bg-surface rounded-2xl p-4 md:p-8">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="text-sm text-text-muted mb-2">{product.brand}</div>
          <h1 className="text-2xl md:text-4xl font-semibold mb-3">{product.name}</h1>
          <Rating value={product.rating} count={product.reviews} />

          {(() => {
            const discountPercent =
              product.oldPrice && product.oldPrice > product.price
                ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                : null;
            return (
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-3xl font-bold"><Price value={product.price} /></span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span
                    className="text-lg text-text-muted"
                    style={{
                      textDecoration: "line-through",
                      textDecorationThickness: "2px",
                      textDecorationColor: "var(--error)",
                    }}
                  >
                    <Price value={product.oldPrice} />
                  </span>
                )}
                {discountPercent && discountPercent > 0 && (
                  <span className="inline-flex items-center rounded-full bg-error/10 px-2.5 py-0.5 text-sm font-medium text-error">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            );
          })()}

          <div className="mt-4 flex items-center gap-2 text-sm">
            <Check className={cn("h-4 w-4", product.inStock ? "text-success" : "text-error")} />
            <span>{product.inStock ? "В наличии" : "Нет в наличии"}</span>
          </div>

          <p className="mt-6 text-text-secondary">{product.shortDescription}</p>

          {product.variants && (
            <div className="mt-6 space-y-3">
              {product.variants.map((v) => (
                <div key={v.label}>
                  <span className="text-sm font-medium">{v.label}: {v.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-border rounded-full">
              <button
                className="px-4 py-2 text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >−</button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                className="px-4 py-2 text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >+</button>
            </div>
            <Button size="lg" onClick={() => addItem(product, quantity)} className="flex-1">
              <ShoppingBag className="h-5 w-5" /> В корзину
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => toggle(product)}
              aria-label={isInWishlist(product.id) ? "Удалить из избранного" : "В избранное"}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isInWishlist(product.id)
                    ? "fill-error text-error"
                    : ""
                )}
              />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Truck className="h-4 w-4" /> Доставка по 9 странам
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <ShieldCheck className="h-4 w-4" /> Гарантия производителя
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <RotateCcw className="h-4 w-4" /> 14 дней на возврат
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <div className="flex gap-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm md:text-base font-medium transition-colors",
                activeTab === tab.id
                  ? "text-accent border-b-2 border-accent"
                  : "text-text-secondary hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <p className="text-text-secondary leading-relaxed">{product.description}</p>
          )}
          {activeTab === "specs" && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-border pb-2">
                  <dt className="text-text-muted">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {activeTab === "delivery" && (
            <div className="space-y-4 text-text-secondary">
              <p>Доставка осуществляется по Беларуси курьером, до пункта выдачи заказов (ПВЗ) или отделения Белпочты.</p>
              <p>Точная стоимость и сроки рассчитываются на этапе оформления заказа после выбора города и адреса.</p>
              <p>На всю технику распространяется официальная гарантия производителя. Возврат товаров надлежащего качества возможен в течение 14 дней.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
