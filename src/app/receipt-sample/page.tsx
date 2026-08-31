import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Price } from "@/components/ui/price";

export const metadata = {
  title: "Образец кассового чека",
  description: "Пример электронного кассового чека интернет-магазина GadgetFlow",
};

export default function ReceiptSamplePage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Образец кассового чека
          </h1>
          <p className="text-text-secondary mb-10">
            Ниже показан пример электронного кассового чека, который формируется при оплате
            заказа в интернет-магазине GadgetFlow. Чек отправляется покупателю на email
            и доступен в личном кабинете после оплаты.
          </p>

          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <div className="text-center border-b border-dashed border-border pb-4 mb-4">
              <p className="font-bold text-lg">ИП Черепкин Александр Анатольевич</p>
              <p className="text-sm text-text-secondary">Гомельская обл., г. Гомель, ул. СВИРИДОВА, д. 11</p>
              <p className="text-sm text-text-secondary">УНП EA5448379, ИМНС: 432 Инспекция МНС по Железнодорожному району г. Гомеля</p>
              <p className="text-xs text-text-muted mt-2">КАССОВЫЙ ЧЕК № 0000000001</p>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Дата и время:</span>
                <span>25.08.2026 14:32:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Режим:</span>
                <span>Онлайн-оплата</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">ФД:</span>
                <span>12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">ФН:</span>
                <span>0000000000000000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">РН ККТ:</span>
                <span>0000000000000000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">ЗН ККТ:</span>
                <span>AB0000000000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Сайт:</span>
                <span>gadgetflow.by</span>
              </div>
            </div>

            <div className="border-t border-dashed border-border py-4">
              <p className="text-xs text-text-muted mb-2">ПРИХОД</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1. Умные часы ProWatch X</span>
                  <span><Price value={549} showDecimals /></span>
                </div>
                <div className="flex justify-between text-text-secondary text-xs">
                  <span>1 × <Price value={549} showDecimals /></span>
                  <span>НДС 20%</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Беспроводные наушники AirBuds 3</span>
                  <span><Price value={329} showDecimals /></span>
                </div>
                <div className="flex justify-between text-text-secondary text-xs">
                  <span>1 × <Price value={329} showDecimals /></span>
                  <span>НДС 20%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-border py-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">ИТОГО:</span>
                <span className="font-semibold"><Price value={878} showDecimals /></span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Безналичная оплата:</span>
                <span><Price value={878} showDecimals /></span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Сдача:</span>
                <span><Price value={0} showDecimals /></span>
              </div>
            </div>

            <div className="border-t border-dashed border-border pt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Электронный адрес покупателя:</span>
                <span>customer@example.by</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Номер заказа:</span>
                <span>G-2026-000001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Фискальный признак:</span>
                <span className="font-mono text-xs">1234567890</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-border text-center">
              <p className="text-xs text-text-muted mb-2">QR-код для проверки чека</p>
              <div className="w-32 h-32 mx-auto bg-surface border border-border rounded-lg flex items-center justify-center">
                <span className="text-xs text-text-muted text-center px-2">
                  [QR-код фискального документа]
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-6 text-sm text-text-secondary space-y-3">
            <p>
              <span className="font-medium text-text-primary">Важно:</span> это образец чека.
              Реальный чек формируется в момент оплаты конкретного заказа и содержит уникальный
              фискальный признак, который можно проверить через приложение МНС или на сайте
              налоговой службы Республики Беларусь.
            </p>
            <p>
              Чек оформляется от имени ИП Черепкина Александра Анатольевича и содержит все
              обязательные реквизиты согласно законодательству РБ.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
