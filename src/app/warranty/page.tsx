import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, Clock, RefreshCcw, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Гарантия и возврат",
  description: "Гарантийные условия и правила возврата в интернет-магазине GadgetFlow",
};

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Гарантия и возврат</h1>
          <p className="text-text-secondary mb-10">
            Все товары в интернет-магазине GadgetFlow продаются с гарантией производителя или Продавца.
            Гарантийное обслуживание организуется Продавцом с привлечением официальных поставщиков,
            дистрибьюторов и сервисных центров.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-surface rounded-2xl p-5">
              <ShieldCheck className="h-8 w-8 text-accent mb-3" />
              <h2 className="font-semibold mb-1">Официальная гарантия</h2>
              <p className="text-sm text-text-secondary">Вся техника продаётся с гарантией производителя.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <Clock className="h-8 w-8 text-accent mb-3" />
              <h2 className="font-semibold mb-1">14 дней на возврат</h2>
              <p className="text-sm text-text-secondary">Вернём деньги за товары надлежащего качества.</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <RefreshCcw className="h-8 w-8 text-accent mb-3" />
              <h2 className="font-semibold mb-1">Обмен товара</h2>
              <p className="text-sm text-text-secondary">Поможем заменить товар при выявлении брака.</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Гарантийные условия</h2>
          <p className="text-text-secondary mb-4">
            На все товары распространяется гарантия производителя. Срок гарантии зависит от бренда и категории и обычно составляет от 12 до 24 месяцев. Гарантийный талон прилагается к каждому устройству при отгрузке.
          </p>
          <ul className="space-y-3 text-text-secondary mb-8">
            <li>Смартфоны и планшеты — от 12 месяцев</li>
            <li>Наушники и аудиотехника — от 12 месяцев</li>
            <li>Смарт-часы и фитнес-браслеты — от 12 месяцев</li>
            <li>Умный дом и гаджеты — от 12 месяцев</li>
            <li>Аксессуары — от 6 месяцев</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Что делать при обнаружении дефекта</h2>
          <ol className="space-y-3 text-text-secondary mb-8 list-decimal list-inside">
            <li>Свяжитесь с нами по телефону или email в течение гарантийного срока.</li>
            <li>Опишите неисправность и приложите фото/видео, если возможно.</li>
            <li>Мы организуем проведение экспертизы для определения причины неисправности.</li>
            <li>По результатам экспертизы предложим замену, ремонт или возврат денежных средств.</li>
          </ol>

          <h2 className="text-xl font-semibold mt-8 mb-4">Возврат товара</h2>
          <p className="text-text-secondary mb-4">
            В соответствии с законодательством Республики Беларусь, вы имеете право вернуть непродовольственный товар надлежащего качества в течение 14 дней с момента получения при сохранении товарного вида, упаковки и комплектации.
          </p>
          <p className="text-text-secondary mb-4">
            Технически сложные товары надлежащего качества возврату и обмену не подлежат, если иное не предусмотрено законодательством. Подробная информация о процедуре возврата размещена на странице{" "}
            <a href="/returns" className="text-accent hover:underline">Возврат товара</a>.
          </p>

          <div className="bg-surface rounded-2xl p-6 mt-10 text-sm text-text-secondary space-y-3">
            <p className="font-medium text-text-primary">Контакты для гарантии и возврата</p>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-accent" />
              <a href="tel:+375291314138" className="hover:text-accent">+375 (29) 131-41-38</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent" />
              <a href="mailto:hello@gadgetflow-shop.store" className="hover:text-accent">hello@gadgetflow-shop.store</a>
            </div>
            <p className="text-xs text-text-muted mt-2">
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
