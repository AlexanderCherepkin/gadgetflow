import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PaymentLogos } from "@/components/payment-logos";
import { Truck, CreditCard, RefreshCcw, MapPin, Package, Clock } from "lucide-react";

export const metadata = {
  title: "Доставка и оплата",
  description: "Условия доставки и оплаты в интернет-магазине GadgetFlow",
};

const deliveryMethods = [
  {
    icon: Truck,
    title: "Курьерская доставка",
    description: "Доставка курьером по Минску и крупным городам Беларуси. Точная стоимость рассчитывается при оформлении заказа.",
    time: "1–3 рабочих дня",
  },
  {
    icon: MapPin,
    title: "Пункты выдачи заказов (ПВЗ)",
    description: "Отправка через СДЭК, Boxberry или Европочту. Выбирайте удобный пункт выдачи в вашем городе.",
    time: "2–5 рабочих дней",
  },
  {
    icon: Package,
    title: "Доставка почтой",
    description: "Белпочта до отделения по всей Беларуси. Надёжный способ для любого населённого пункта.",
    time: "3–7 рабочих дней",
  },
];

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Банковская карта",
    description: "Visa, Mastercard, БЕЛКАРТ. Оплата онлайн через защищённый платёжный шлюз.",
  },
  {
    icon: RefreshCcw,
    title: "ЕРИП и онлайн-банкинг",
    description: "Оплата через ЕРИП или интернет-банк. Удобный способ для белорусских пользователей.",
  },
  {
    icon: Truck,
    title: "Наличные при получении",
    description: "Доступно для курьерской доставки и части пунктов выдачи. Уточняется при подтверждении заказа.",
  },
];

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Доставка и оплата</h1>
          <p className="text-text-secondary mb-10">
            Интернет-магазин GadgetFlow сотрудничает с проверенными службами доставки.
            Товары отгружаются со складов официальных поставщиков и партнёров.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-surface rounded-2xl p-5">
              <Truck className="h-8 w-8 text-accent mb-3" />
              <h2 className="font-semibold mb-1">Доставка по Беларуси</h2>
              <p className="text-sm text-text-secondary">Курьер, ПВЗ и Белпочта по всей стране.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <CreditCard className="h-8 w-8 text-accent mb-3" />
              <h2 className="font-semibold mb-1">Безопасная оплата</h2>
              <p className="text-sm text-text-secondary">Карты Visa, Mastercard, БЕЛКАРТ, ЕРИП.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <RefreshCcw className="h-8 w-8 text-accent mb-3" />
              <h2 className="font-semibold mb-1">14 дней на возврат</h2>
              <p className="text-sm text-text-secondary">Вернём деньги, если товар не подошёл.</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Способы доставки</h2>
          <div className="space-y-4 mb-10">
            {deliveryMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="bg-surface rounded-2xl p-5 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                    <p className="text-sm text-text-secondary mb-2">{method.description}</p>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Срок: {method.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Способы оплаты</h2>
          <div className="space-y-4 mb-10">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="bg-surface rounded-2xl p-5 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                    <p className="text-sm text-text-secondary">{method.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-surface rounded-2xl p-6 mb-10">
            <h3 className="font-semibold text-foreground mb-4">Платёжные системы</h3>
            <PaymentLogos />
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Стоимость и сроки</h2>
          <p className="text-text-secondary mb-4">
            Точная стоимость доставки рассчитывается автоматически на этапе оформления заказа
            после выбора города и способа доставки. Бесплатная доставка доступна при заказе
            от суммы, указанной в текущих акциях.
          </p>
          <p className="text-text-secondary mb-4">
            Сроки доставки указаны ориентировочно и зависят от региона, службы доставки и
            графика работы поставщика. После отправки заказа вы получите трек-номер для
            отслеживания.
          </p>

          <div className="bg-surface rounded-2xl p-6 mt-10 text-sm text-text-secondary">
            <p className="mb-2">
              <span className="font-medium text-text-primary">Юридическая информация:</span>
            </p>
            <p>
              Продавец: ИП Черепкин Александр Анатольевич, Гомельская обл., г. Гомель, ул. СВИРИДОВА, д. 11.
              УНП EA5448379, ИМНС: 432 Инспекция МНС по Железнодорожному району г. Гомеля.
              Свидетельство о государственной регистрации: на учёте с 26.08.2026, выдано Министерством по налогам и сборам Республики Беларусь. По вопросам доставки и оплаты звоните{" "}
              <a href="tel:+375291314138" className="text-accent hover:underline">+375 (29) 131-41-38</a>
              {" "}или пишите на{" "}
              <a href="mailto:hello@gadgetflow-shop.store" className="text-accent hover:underline">hello@gadgetflow-shop.store</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
