import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Truck, CreditCard, RefreshCcw } from "lucide-react";

export const metadata = {
  title: "Доставка и оплата",
};

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Доставка и оплата</h1>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-surface rounded-2xl p-5">
              <Truck className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Доставка в 9 стран</h3>
              <p className="text-sm text-text-secondary">Россия, Казахстан, Беларусь, Армения, Азербайджан, Грузия, Сербия, Хорватия, Болгария.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <CreditCard className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Безопасная оплата</h3>
              <p className="text-sm text-text-secondary">Оплата картой и другими популярными способами после подключения эквайринга.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <RefreshCcw className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">14 дней на возврат</h3>
              <p className="text-sm text-text-secondary">Вернём деньги, если товар не подошёл или имеет дефект.</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Способы доставки</h2>
          <ul className="space-y-3 text-text-secondary">
            <li>Курьерская доставка до двери (СДЭК / Boxberry)</li>
            <li>Доставка до пункта выдачи заказов (ПВЗ)</li>
            <li>Почтовая доставка до отделения</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Стоимость и сроки</h2>
          <p className="text-text-secondary mb-4">
            Точная стоимость и сроки доставки рассчитываются автоматически на этапе оформления заказа после выбора страны, города и адреса. Для некоторых регионов доступна бесплатная доставка при заказе от определённой суммы.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Способы оплаты</h2>
          <ul className="space-y-3 text-text-secondary">
            <li>Банковская карта (Visa, Mastercard, МИР) — после подключения эквайринга</li>
            <li>Электронные кошельки и платёжные системы региона</li>
            <li>Оплата при получении — по согласованию для отдельных направлений</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
