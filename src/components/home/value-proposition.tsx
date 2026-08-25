"use client";

import { Headphones, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const benefits = [
  {
    icon: Headphones,
    title: "Экспертная поддержка",
    text: "Поможем выбрать технику под ваши задачи и бюджет",
  },
  {
    icon: Truck,
    title: "Доставка по Беларуси",
    text: "Курьер, ПВЗ и Белпочта в Минске и регионах",
  },
  {
    icon: ShieldCheck,
    title: "Официальная гарантия",
    text: "Все товары с гарантией производителя",
  },
  {
    icon: RotateCcw,
    title: "14 дней на возврат",
    text: "Вернём деньги, если товар не подошёл",
  },
];

export function ValueProposition() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <section className="section-padding bg-accent-subtle">
      <div className="container-tight">
        <SectionTitle
          subtitle="Мы собрали лучшую технику в одном месте, чтобы вы тратили время на впечатления, а не на поиски"
          centered
        >
          Всё необходимое — в одном месте
        </SectionTitle>

        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-card mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-text-secondary">{b.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
