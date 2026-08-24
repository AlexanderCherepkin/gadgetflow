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
                <span>г. Москва, ул. Технологическая, 12</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+79990000000" className="hover:text-accent">+7 999 000-00-00</a>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:hello@gadgetflow.ru" className="hover:text-accent">hello@gadgetflow.ru</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/delivery" className="hover:text-accent">Доставка и оплата</Link></li>
              <li><Link href="/warranty" className="hover:text-accent">Гарантия и возврат</Link></li>
              <li><Link href="/faq" className="hover:text-accent">Вопросы и ответы</Link></li>
              <li><Link href="/contacts" className="hover:text-accent">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
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
            <h4 className="font-semibold mb-4">Связь</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="https://t.me/gadgetflow" target="_blank" rel="noreferrer" className="hover:text-accent">Telegram</a></li>
              <li><a href="https://wa.me/79990000000" target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp</a></li>
              <li><a href="#" className="hover:text-accent">ВКонтакте</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
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
    </footer>
  );
}
