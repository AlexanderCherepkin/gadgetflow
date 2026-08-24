import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Пользовательское соглашение",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Пользовательское соглашение</h1>

          <div className="space-y-6 text-text-secondary">
            <p>
              Настоящее Пользовательское соглашение (далее — «Оферта») регулирует отношения между ИП Иванов Иван Иванович (ИНН 123456789012, ОГРНИП 312345678901234, далее — «Продавец») и пользователем интернет-магазина GadgetFlow.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. Общие положения</h2>
            <p>
              Интернет-магазин GadgetFlow предоставляет пользователям возможность дистанционного заказа товаров через сайт. Оформляя заказ, пользователь соглашается с условиями настоящей Оферты.
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. Порядок оформления заказа</h2>
            <p>
              Пользователь выбирает товары, добавляет их в корзину и заполняет контактные данные. Заказ считается оформленным после подтверждения покупателем и получения подтверждения от Продавца.
            </p>

            <h2 className="text-xl font-semibold text-foreground">3. Цены и оплата</h2>
            <p>
              Цены указаны в российских рублях и включают налоги, предусмотренные законодательством. Оплата производится способами, доступными на сайте на момент оформления заказа.
            </p>

            <h2 className="text-xl font-semibold text-foreground">4. Доставка</h2>
            <p>
              Доставка осуществляется через логистических партнёров на условиях, указанных в разделе «Доставка и оплата». Стоимость и сроки рассчитываются при оформлении заказа.
            </p>

            <h2 className="text-xl font-semibold text-foreground">5. Возврат и обмен</h2>
            <p>
              Возврат товаров надлежащего качества возможен в течение 14 дней с момента получения при сохранении товарного вида, упаковки и комплектации. Товары ненадлежащего качества подлежат замене или возврату денежных средств.
            </p>

            <h2 className="text-xl font-semibold text-foreground">6. Контакты</h2>
            <p>
              По всем вопросам вы можете связаться с нами по телефону +7 999 000-00-00 или email hello@gadgetflow.ru.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
