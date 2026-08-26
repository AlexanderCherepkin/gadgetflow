"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
import { eaeuDeliveryZones, getDeliveryZones } from "@/lib/data/delivery";
import { formatPhone, formatPrice, convertPrice } from "@/lib/utils";
import { createOrder } from "@/lib/supabase/orders";

const steps = [
  { id: "contacts", label: "Контакты", icon: User },
  { id: "delivery", label: "Доставка", icon: Truck },
  { id: "payment", label: "Оплата", icon: CreditCard },
];

export function CheckoutForm() {
  const {
    items,
    totalPrice,
    clearCart,
    deliveryCountry,
    setDeliveryCountry,
    deliveryCurrency,
  } = useCart();

  const [step, setStep] = useState("contacts");
  const [zoneName, setZoneName] = useState(() => {
    const zone = getDeliveryZones(deliveryCountry) || eaeuDeliveryZones[0];
    return zone.zones[0]?.name || "";
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(() => {
    const zone = getDeliveryZones(deliveryCountry) || eaeuDeliveryZones[0];
    return zone.phonePrefix;
  });
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentZone = useMemo(
    () => getDeliveryZones(deliveryCountry) || eaeuDeliveryZones[0],
    [deliveryCountry]
  );

  const availableZones = useMemo(
    () => currentZone?.zones || [],
    [currentZone]
  );

  const deliveryCostBYN = useMemo(() => {
    const zone = availableZones.find((z: import("@/lib/data/delivery").DeliverySubZone) => z.name === zoneName);
    return zone?.costBYN || 0;
  }, [availableZones, zoneName]);

  const totalBYN = totalPrice + deliveryCostBYN;

  const deliveryCostLocal = useMemo(
    () => convertPrice(deliveryCostBYN, deliveryCurrency),
    [deliveryCostBYN, deliveryCurrency]
  );
  const totalLocal = useMemo(
    () => convertPrice(totalBYN, deliveryCurrency),
    [totalBYN, deliveryCurrency]
  );

  const handleCountryChange = (value: string) => {
    setDeliveryCountry(value);
    const nextZone = getDeliveryZones(value) || eaeuDeliveryZones[0];
    setPhone(nextZone.phonePrefix);
    setZoneName(nextZone.zones[0]?.name || "");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value, currentZone.phonePrefix));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const fullAddress = street + (postalCode ? `, ${postalCode}` : "");

    const order = await createOrder({
      customer: {
        email,
        phone,
        full_name: fullName,
        address: fullAddress,
        city: address,
      },
      items: items.map((i) => ({
        product_id: i.product.id,
        product_name: i.product.name,
        quantity: i.quantity,
        price_byn: i.product.price,
        total_byn: i.product.price * i.quantity,
        metadata: i.variant ? { variant: i.variant } : undefined,
      })),
      total_byn: totalBYN,
      delivery_cost_byn: deliveryCostBYN,
      delivery_method: zoneName,
      payment_method: paymentMethod,
      currency: deliveryCurrency,
    });

    setIsSubmitting(false);

    if (!order) {
      setSubmitError("Не удалось оформить заказ. Попробуйте ещё раз или свяжитесь с нами.");
      return;
    }

    clearCart();
    setSubmitted(true);
  };

  if (items.length === 0 && !submitted) {
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
        {steps.map((s: { id: string; label: string; icon: typeof User }, idx: number) => {
          const Icon = s.icon;
          const active = s.id === step;
          const done = steps.findIndex((x: { id: string }) => x.id === step) > idx;
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
                <Input
                  placeholder="Имя"
                  required
                  value={fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">
                    Страна доставки
                  </label>
                  <Select value={deliveryCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      {eaeuDeliveryZones.map((zone) => (
                        <SelectItem key={zone.countryCode} value={zone.countryCode}>
                          {zone.countryName} ({zone.currency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={`${currentZone.phonePrefix} ...`}
                  />
                </div>
              </div>

              <Button
                className="mt-4"
                onClick={() => setStep("delivery")}
                disabled={!fullName || !email || phone.length < currentZone.phonePrefix.length + 3}
              >
                Продолжить
              </Button>
            </div>
          )}

          {step === "delivery" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
              <p className="text-sm text-text-secondary">
                Доставка осуществляется в {currentZone.countryName}. Стоимость указана в {currentZone.currency}.
              </p>

              <Select value={zoneName} onValueChange={setZoneName}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите способ доставки" />
                </SelectTrigger>
                <SelectContent>
                  {availableZones.map((zone: import("@/lib/data/delivery").DeliverySubZone) => {
                    const localCost = convertPrice(zone.costBYN, deliveryCurrency);
                    return (
                      <SelectItem key={zone.name} value={zone.name}>
                        {zone.name} —{" "}
                        {localCost === 0 ? "Бесплатно" : formatPrice(localCost, deliveryCurrency)} ({zone.days})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Input
                placeholder="Город"
                required
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              />
              <Input
                placeholder="Улица, дом, квартира"
                required
                value={street}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
              />
              <Input
                placeholder="Почтовый индекс"
                value={postalCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
              />

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep("contacts")}>
                  Назад
                </Button>
                <Button onClick={() => setStep("payment")} disabled={!zoneName || !address || !street}>
                  Продолжить
                </Button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Оплата</h2>
              <p className="text-sm text-text-secondary">
                В MVP доступна демонстрация оплаты. После запуска подключим способы оплаты, актуальные для {currentZone.countryName}.
              </p>

              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите способ оплаты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="erip">ЕРИП / онлайн-банк (Беларусь)</SelectItem>
                  <SelectItem value="card">Банковская карта (Белкарт / Visa / Mastercard)</SelectItem>
                  <SelectItem value="apple-pay">Apple Pay</SelectItem>
                  <SelectItem value="samsung-pay">Samsung Pay</SelectItem>
                  <SelectItem value="cash">Наличные при получении</SelectItem>
                </SelectContent>
              </Select>

              {paymentMethod === "card" && (
                <div className="p-4 border border-border rounded-xl bg-surface">
                  <label className="block text-sm font-medium mb-2">Номер карты</label>
                  <Input placeholder="0000 0000 0000 0000" className="mb-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVC" />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border text-xs text-text-secondary space-y-2">
                <p>
                  <span className="font-medium text-text-primary">Продавец:</span> ИП Черепкин Александр Анатольевич. Юридический адрес: Гомельская обл., г. Гомель, ул. СВИРИДОВА, д. 11.
                </p>
                <p>
                  Нажимая кнопку «Перейти к оплате», вы соглашаетесь с{" "}
                  <Link href="/terms" className="text-accent underline hover:text-accent/80">
                    условиями публичной оферты
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy" className="text-accent underline hover:text-accent/80">
                    политикой обработки персональных данных
                  </Link>.
                </p>
              </div>

              {submitError && (
                <p className="text-sm text-error">{submitError}</p>
              )}

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep("delivery")}>
                  Назад
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!paymentMethod || isSubmitting}
                >
                  {isSubmitting ? "Обработка..." : `Оплатить ${formatPrice(totalLocal, deliveryCurrency)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-surface rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Ваш заказ</h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.variant}`} className="flex gap-3">
                <div className="relative w-16 h-16 bg-white rounded-lg border border-border shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.product.name}</p>
                  {item.variant && (
                    <p className="text-xs text-text-secondary">{item.variant}</p>
                  )}
                  <p className="text-xs text-text-secondary">
                    {item.quantity} × {formatPrice(convertPrice(item.product.price, deliveryCurrency), deliveryCurrency)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Товары ({items.length})</span>
              <span>{formatPrice(convertPrice(totalPrice, deliveryCurrency), deliveryCurrency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Доставка</span>
              <span>
                {deliveryCostLocal === 0 && zoneName
                  ? "Бесплатно"
                  : formatPrice(deliveryCostLocal, deliveryCurrency)}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
            <span className="text-lg font-semibold">К оплате</span>
            <span className="text-2xl font-bold">{formatPrice(totalLocal, deliveryCurrency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
