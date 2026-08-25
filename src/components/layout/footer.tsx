import Link from "next/link";
import { Logo } from "./logo";
import { navCategories } from "@/lib/data/categories";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface pt-16 pb-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-text-secondary">
              Современный интернет-магазин электроники и гаджетов. Быстрая доставка, официальная гарантия, удобный сервис.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>г. Минск, пр. Победителей, 7</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+375291234567" className="hover:text-accent">+375 29 123-45-67</a>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:hello@gadgetflow.by" className="hover:text-accent">hello@gadgetflow.by</a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Покупателям</h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/delivery" className="hover:text-accent">Доставка и оплата</Link></li>
              <li><Link href="/warranty" className="hover:text-accent">Гарантия и возврат</Link></li>
              <li><Link href="/faq" className="hover:text-accent">Вопросы и ответы</Link></li>
              <li><Link href="/contacts" className="hover:text-accent">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Каталог</h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              {navCategories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/catalog/${cat.slug}`} className="hover:text-accent">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Связь</h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="https://t.me/gadgetflow" target="_blank" rel="noreferrer" className="hover:text-accent">Telegram</a></li>
              <li><a href="https://wa.me/375291234567" target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp</a></li>
              <li><a href="#" className="hover:text-accent">ВКонтакте</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-text-secondary mb-8">
            <div className="space-y-1">
              <p className="font-medium text-text-primary">Продавец</p>
              <p>ИП Черепкин Александр Александрович</p>
              <p>Республика Беларусь, г. Гомель</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">Реквизиты</p>
              <p>УНП: [укажите УНП]</p>
              <p>Торговый реестр РБ: [дата], № [номер]</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">Контакты</p>
              <p><a href="tel:+375291314138" className="hover:text-accent">+375 (29) 131-41-38</a></p>
              <p><a href="mailto:shopify.shyrikby@gmail.com" className="hover:text-accent">shopify.shyrikby@gmail.com</a></p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">Правовая информация</p>
              <p><Link href="/receipt-sample" className="hover:text-accent">Образец кассового чека</Link></p>
              <p><Link href="/terms" className="hover:text-accent">Публичная оферта</Link></p>
              <p><Link href="/returns" className="hover:text-accent">Возврат товара</Link></p>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-secondary">
              © 2026 GadgetFlow. Все права защищены.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-text-secondary">
              <Link href="/privacy" className="hover:text-accent">Политика конфиденциальности</Link>
              <Link href="/terms" className="hover:text-accent">Пользовательское соглашение</Link>
              <Link href="/about" className="hover:text-accent">О компании</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
