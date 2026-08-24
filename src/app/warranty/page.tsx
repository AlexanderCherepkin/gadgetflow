import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, Clock, RefreshCcw } from "lucide-react";

export const metadata = {
  title: "Гарантия и возврат",
};

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Гарантия и возврат</h1>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-surface rounded-2xl p-5">
              <ShieldCheck className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Официальная гарантия</h3>
              <p className="text-sm text-text-secondary">Вся техника продаётся с гарантией производителя.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <Clock className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">14 дней на возврат</h3>
              <p className="text-sm text-text-secondary">Вернём деньги за товары надлежащего качества.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <RefreshCcw className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Обмен товара</h3>
              <p className="text-sm text-text-secondary">Поможем заменить товар при выявлении брака.</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Гарантийные условия</h2>
          <p className="text-text-secondary mb-4">
            На все товары распространяется гарантия производителя. Срок гарантии зависит от бренда и категории и обычно составляет от 12 до 24 месяцев. Гарантийный талон прилагается к каждому устройству.
          </p>
          <ul className="space-y-3 text-text-secondary">
            <li>Смартфоны и планшеты — от 12 месяцев</li>
            <li>Наушники и аудиотехника — от 12 месяцев</li>
            <li>Смарт-часы и фитнес-браслеты — от 12 месяцев</li>
            <li>Аксессуары — от 6 месяцев</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Возврат товара</h2>
          <p className="text-text-secondary mb-4">
            В соответствии с правилами дистанционной торговли в ЕАЭС, вы имеете право вернуть непродовольственный товар надлежащего качества в течение 14 дней с момента получения.
          </p>
          <p className="text-text-secondary">
            Для оформления возврата свяжитесь с поддержкой через Telegram, WhatsApp или email. Мы пришлём адрес для отправки и реквизиты для возврата средств.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
