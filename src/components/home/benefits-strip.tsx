"use client";

import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

const items = [
  { icon: Truck, title: "Быстрая доставка" },
  { icon: ShieldCheck, title: "Официальная гарантия" },
  { icon: Headphones, title: "Поддержка 7/7" },
  { icon: CreditCard, title: "Безопасная оплата" },
];

export function BenefitsStrip() {
  return (
    <section className="py-8 border-y border-border bg-white">
      <div className="container-tight">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-subtle">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
