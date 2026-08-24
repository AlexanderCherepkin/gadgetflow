"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export function CartContent() {
  const { items, updateQuantity, removeItem, totalPrice, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-tight">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-border mb-6" />
          <h1 className="text-2xl font-semibold mb-2">Корзина пуста</h1>
          <p className="text-text-secondary mb-6">Добавьте товары, чтобы продолжить покупки</p>
          <Button asChild>
            <Link href="/">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-tight">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Корзина ({totalCount})</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.variant}`}
              className="flex gap-4 p-4 rounded-2xl border border-border"
            >
              <Link
                href={`/catalog/${item.product.category}/${item.product.slug}`}
                className="relative w-24 h-24 md:w-32 md:h-32 bg-surface rounded-xl shrink-0"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-contain p-2"
                />
              </Link>

              <div className="flex-1 flex flex-col">
                <Link
                  href={`/catalog/${item.product.category}/${item.product.slug}`}
                  className="font-medium hover:text-accent transition-colors"
                >
                  {item.product.name}
                </Link>
                {item.variant && (
                  <span className="text-sm text-text-muted">{item.variant}</span>
                )}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-border rounded-full">
                    <button
                      className="px-3 py-1"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                    >−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="px-3 py-1"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                    >+</button>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.product.id, item.variant)}
                className="self-start p-2 text-text-muted hover:text-error transition-colors"
                aria-label="Удалить"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Итого</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Товары ({totalCount})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Доставка</span>
              <span className="text-text-muted">Рассчитывается при оформлении</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
            <span className="text-lg font-semibold">К оплате</span>
            <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
          </div>
          <Button className="w-full mt-6" size="lg" asChild>
            <Link href="/checkout">Оформить заказ</Link>
          </Button>
          <Button variant="secondary" className="w-full mt-3" asChild>
            <Link href="/">Продолжить покупки</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
