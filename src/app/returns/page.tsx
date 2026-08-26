import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Truck, RefreshCcw, ShieldCheck, FileText, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Возврат товара",
  description: "Правила возврата и обмена товаров в интернет-магазине GadgetFlow",
};

const steps = [
  {
    icon: FileText,
    title: "Оформите заявку",
    description:
      "Свяжитесь с нами по телефону или email в течение 14 дней с момента получения товара. Укажите номер заказа и причину возврата.",
  },
  {
    icon: ShieldCheck,
    title: "Сохраните товарный вид",
    description:
      "Товар должен сохранить потребительские свойства, товарный вид, упаковку, комплектацию и документы (чек, гарантийный талон).",
  },
  {
    icon: Truck,
    title: "Отправьте товар",
    description:
      "После согласования адреса отправьте товар перевозчиком. Для товаров ненадлежащего качества доставку оплачивает Продавец.",
  },
  {
    icon: RefreshCcw,
    title: "Получите решение",
    description:
      "После получения и проверки товара мы в течение 7 рабочих дней оформляем возврат денег или замену товара.",
  },
];

const rules = [
  {
    title: "Товар надлежащего качества",
    text: "Возврат возможен в течение 14 календарных дней при сохранении товарного вида, упаковки и комплектации. Технически сложные товары возврату не подлежат, если иное не предусмотрено законом.",
  },
  {
    title: "Товар ненадлежащего качества",
    text: "При обнаружении брака сообщите нам в течение гарантийного срока. Мы организуем экспертизу и по результатам предложим замену, ремонт или возврат денежных средств.",
  },
  {
    title: "Возврат денег",
    text: "Деньги возвращаются тем же способом, которым была произведена оплата, в течение 7 рабочих дней с момента согласования возврата.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Возврат и обмен товара</h1>
          <p className="text-text-secondary mb-10">
            Мы соблюдаем законодательство Республики Беларусь и делаем процесс возврата максимально
            прозрачным. Если товар не подошёл или обнаружился дефект — свяжитесь с нами, мы поможем.
          </p>

          <div className="grid gap-4 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 bg-surface rounded-2xl p-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-accent" />
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-text-secondary">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-6">Правила возврата</h2>
          <div className="space-y-4 mb-12">
            {rules.map((rule) => (
              <div key={rule.title} className="border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-2">{rule.title}</h3>
                <p className="text-sm text-text-secondary">{rule.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Контакты для возврата</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text-secondary">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:+375291314138" className="hover:text-accent">+375 (29) 131-41-38</a>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:hello@gadgetflow-shop.store" className="hover:text-accent">hello@gadgetflow-shop.store</a>
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-4">
              Адрес приёма возвратов: Гомельская обл., г. Гомель, ул. СВИРИДОВА, д. 11. Точный адрес пункта выдачи/склада высылается
              после согласования возврата.
            </p>
          </div>

          <div className="text-xs text-text-muted">
            <p className="mb-2">Юридическая информация:</p>
            <p>
              Продавец: ИП Черепкин Александр Анатольевич, Гомельская обл., г. Гомель, ул. СВИРИДОВА, д. 11.
              УНП EA5448379, ИМНС: 432 Инспекция МНС по Железнодорожному району г. Гомеля.
              Свидетельство о государственной регистрации: на учёте с 26.08.2026, выдано Министерством по налогам и сборам Республики Беларусь.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
