"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, Phone } from "lucide-react";
import { Logo } from "./logo";
import { navCategories } from "@/lib/data/categories";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { formatPrice } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount, totalPrice } = useCart();
  const { items } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-tight">
        <div className="flex items-center justify-between h-[72px] md:h-[80px]">
          <Logo />

          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Поиск по товарам..."
                className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="tel:+79990000000"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+7 999 000-00-00</span>
            </a>

            <button
              className="lg:hidden p-2 rounded-full hover:bg-surface"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Поиск"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/account"
              className="hidden sm:flex p-2 rounded-full hover:bg-surface"
              aria-label="Личный кабинет"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/wishlist"
              className="relative hidden sm:flex p-2 rounded-full hover:bg-surface"
              aria-label="Избранное"
            >
              <Heart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
                  {items.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 p-2 sm:pl-3 sm:pr-4 rounded-full border border-border hover:border-foreground transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[10px] text-text-muted">{totalCount} товаров</span>
                <span className="text-sm font-semibold">{formatPrice(totalPrice)}</span>
              </div>
            </Link>

            <button
              className="lg:hidden p-2 rounded-full hover:bg-surface"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Поиск по товарам..."
                autoFocus
                className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        )}
      </div>

      <nav className="hidden lg:block border-t border-border">
        <div className="container-tight">
          <ul className="flex items-center gap-8 h-12 text-sm font-medium">
            {navCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/catalog/${cat.slug}`}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[min(340px,85vw)] bg-white shadow-hover">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold">Меню</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {navCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/catalog/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-lg font-medium"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <Link href="/account" className="flex items-center gap-3 py-2">
                  <User className="h-5 w-5" /> Личный кабинет
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 py-2">
                  <Heart className="h-5 w-5" /> Избранное ({items.length})
                </Link>
                <Link href="/cart" className="flex items-center gap-3 py-2">
                  <ShoppingBag className="h-5 w-5" /> Корзина ({totalCount})
                </Link>
                <a href="tel:+79990000000" className="flex items-center gap-3 py-2">
                  <Phone className="h-5 w-5" /> +7 999 000-00-00
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
