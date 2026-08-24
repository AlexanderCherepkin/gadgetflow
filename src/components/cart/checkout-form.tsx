"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/cart-context";
import { countries, getDeliveryZones } from "@/lib/data/delivery";
import { formatPrice } from "@/lib/utils";

const steps = [
  { id: "contacts", label: "Контакты", icon: User },
  { id: "delivery", label: "Доставка", icon: Truck },
  { id: "payment", label: "Оплата", icon: CreditCard },
];

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState("contacts");
  const [country, setCountry] = useState("");
  const [zone, setZone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const zones = useMemo(() => {
    if (!country) return [];
    return getDeliveryZones(country)?.zones || [];
  }, [country]);

  const deliveryCost = useMemo(() => {
    const z = zones.find((z) => z.name === zone);
    return z?.cost || 0;
  }, [zones, zone]);

  if (items.length === 0) {
    return (
      <div className="container-tight text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">Корзина пуста</h1>
        <Button asChild>
          <Link href="/">В каталог</Link>
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container-tight max-w-2xl text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 text-success mb-6">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-semibold mb-4">Заказ оформлен!</h1>
        <p className="text-text-secondary mb-8">
          Спасибо за покупку. Мы свяжемся с вами для подтверждения деталей.
        </p>
        <Button asChild onClick={() => clearCart()}>
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-tight">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Оформление заказа</h1>

      <div className="flex items-center gap-2 md:gap-4 mb-10">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const active = s.id === step;
          const done = steps.findIndex((x) => x.id === step) > idx;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  active
                    ? "bg-accent text-white"
                    : done
                    ? "bg-success/10 text-success"
                    : "bg-surface text-text-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {idx < steps.length - 1 && <span className="text-border">→</span>}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="bg-white rounded-2xl border border-border p-6">
          {step === "contacts" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Контактные данные</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Имя" required />
                <Input placeholder="Фамилия" />
              </div>
              <Input placeholder="Email" type="email" required />
              <Input placeholder="Телефон" type="tel" required />
              <Button className="mt-4" onClick={() => setStep("delivery")}>
                Продолжить
              </Button>
            </div>
          )}

          {step === "delivery" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
              <Select value={country} onValueChange={(v) => { setCountry(v); setZone(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {zones.length > 0 && (
                <Select value={zone} onValueChange={setZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите зону доставки" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((z) => (
                      <SelectItem key={z.name} value={z.name}>
                        {z.name} — {formatPrice(z.cost)} ({z.days})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Input placeholder="Город" required />
              <Input placeholder="Улица, дом, квартира" required />
              <Input placeholder="Почтовый индекс" />
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep("contacts")}>Назад</Button>
                <Button onClick={() => setStep("payment")} disabled={!zone}>Продолжить</Button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Оплата</h2>
              <p className="text-sm text-text-secondary">
                В MVP оплата происходит через демо-форму. После запуска сайта и прохождения модерации подключится реальный платёжный шлюз.
              </p>

              <div className="p-4 border border-border rounded-xl bg-surface">
                <label className="block text-sm font-medium mb-2">Номер карты</label>
                <Input placeholder="0000 0000 0000 0000" className="mb-3" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep("delivery")}>Назад</Button>
                <Button onClick={() => setSubmitted(true)}>Оплатить {formatPrice(totalPrice + deliveryCost)}</Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-surface rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Ваш заказ</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Товары ({items.length})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Доставка</span>
              <span>{deliveryCost === 0 && zone ? "Бесплатно" : formatPrice(deliveryCost)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
            <span className="text-lg font-semibold">К оплате</span>
            <span className="text-2xl font-bold">{formatPrice(totalPrice + deliveryCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
