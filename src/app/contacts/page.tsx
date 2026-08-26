import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Контакты",
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Контакты</h1>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Телефон</p>
                <a href="tel:+375291314138" className="font-medium hover:text-accent">+375 (29) 131-41-38</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Email</p>
                <a href="mailto:hello@gadgetflow-shop.store" className="font-medium hover:text-accent">hello@gadgetflow-shop.store</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Адрес</p>
                <p className="font-medium">Гомельская обл., г. Гомель, ул. СВИРИДОВА, д. 55</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Режим работы</p>
                <p className="font-medium">Ежедневно 10:00–22:00</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Мессенджеры</h2>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://t.me/gadgetflow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Telegram
              </a>
              <a
                href="https://wa.me/375291314138"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
