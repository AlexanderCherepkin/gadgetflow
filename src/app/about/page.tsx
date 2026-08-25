import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "О компании",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">О компании</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-text-secondary">
              GadgetFlow — современный интернет-магазин электроники и гаджетов, работающий на рынке Беларуси. Мы отбираем технику проверенных брендов и доставляем заказы через надёжных логистических партнёров по всей стране.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Реквизиты</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-text-secondary">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">Продавец</dt>
                <dd className="font-medium text-foreground">ИП Иванов Иван Иванович</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">УНП</dt>
                <dd className="font-medium text-foreground">123456789</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">Юридический адрес</dt>
                <dd className="font-medium text-foreground">г. Минск, пр. Победителей, 7, офис 405</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">Телефон</dt>
                <dd className="font-medium text-foreground">+375 29 123-45-67</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">Email</dt>
                <dd className="font-medium text-foreground">hello@gadgetflow.by</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">Режим работы</dt>
                <dd className="font-medium text-foreground">Ежедневно 10:00–22:00</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-text-muted">Торговый реестр</dt>
                <dd className="font-medium text-foreground">Сведения о включении предоставляются по запросу</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
