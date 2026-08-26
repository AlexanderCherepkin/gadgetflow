import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Политика конфиденциальности</h1>

          <div className="space-y-6 text-text-secondary">
            <p>
              Настоящая Политика конфиденциальности описывает, как ИП Черепкин Александр Анатольевич (далее — «GadgetFlow») собирает, использует и защищает персональные данные пользователей интернет-магазина.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. Какие данные мы собираем</h2>
            <p>
              Мы можем собирать следующие данные: имя, фамилия, контактный телефон, email, адрес доставки, историю заказов, а также техническую информацию (cookies, IP-адрес, тип устройства и браузера).
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. Как мы используем данные</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Для обработки и доставки заказов</li>
              <li>Для связи с покупателем по вопросам заказа</li>
              <li>Для улучшения работы сайта и персонализации предложений</li>
              <li>Для выполнения требований законодательства</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">3. Cookies и аналитика</h2>
            <p>
              Сайт использует cookies для корректной работы корзины, избранного и аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с использованием cookies. Вы можете отключить cookies в настройках браузера.
            </p>

            <h2 className="text-xl font-semibold text-foreground">4. Передача третьим лицам</h2>
            <p>
              Мы передаём данные только логистическим партнёрам и платёжным операторам в объёме, необходимом для выполнения заказа. Продажа и обмен персональными данными не осуществляются.
            </p>

            <h2 className="text-xl font-semibold text-foreground">5. Права пользователя</h2>
            <p>
              Вы имеете право запросить информацию о ваших данных, потребовать их исправления или удаления, а также отозвать согласие на обработку. Для этого свяжитесь с нами по email hello@gadgetflow-shop.store.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
