# GadgetFlow — интернет-магазин электроники (Беларусь)

Самописный MVP-магазин на Next.js 16 + React 19 + Tailwind 4 + shadcn/ui.

## Быстрый старт

```bash
cd gadgetflow
npm install
cp .env.local.example .env.local
# заполните .env.local значениями Supabase и платёжного провайдера
npm run dev
```

Откройте http://localhost:3000.

## Подготовка Supabase

1. Создайте проект на https://supabase.com.
2. Перейдите в SQL Editor и выполните содержимое файла `supabase/migrations/20250825160000_initial_schema.sql`.
3. В Project Settings → API скопируйте `URL` и `anon public` ключ в `.env.local`.
4. (Опционально) Для админки и вебхуков скопируйте `service_role` ключ в `SUPABASE_SERVICE_ROLE_KEY`.

## Панель администратора

Путь: `/admin`

Авторизация базовая HTTP (логин/пароль из `.env.local`):

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
```

**В production обязательно замените пароль.**

## Платежи

По умолчанию стоит демо-провайдер (`PAYMENT_PROVIDER_ID=demo`).
Доступные провайдеры:

- `demo` — тестовая оплата без реальных денег
- `bePaid` — Visa, Mastercard, БЕЛКАРТ
- `webpay` — Visa, Mastercard, БЕЛКАРТ
- `assist` — Assist Belarus
- `erip` — ЕРИП / онлайн-банк

Код провайдеров находится в `src/lib/payments/payment-provider.ts`.

## Валюта

Основная валюта — BYN. Рублевая цена отображается через конвертацию по курсу BYN→RUB.
Курс обновляется вручную через `/api/currency/refresh` или по cron.

## Поставщики / YML

Фид парсится через `src/lib/suppliers/feed-parser.ts`.
API: `POST /api/suppliers/parse` с телом `{ supplierId, feedUrl, format }`.
Результат сохраняется в таблицу `supplier_feed_staging`.

## Развёртывание

### Vercel

```bash
npx vercel
```

Добавьте переменные окружения из `.env.local` в настройках проекта Vercel.

### Сборка локально

```bash
npm run build
npm start
```

## Правовые страницы

- `/terms` — публичная оферта
- `/returns` — условия возврата
- `/delivery` — доставка
- `/warranty` — гарантия
- `/receipt-sample` — образец кассового чека
- `/privacy` — политика конфиденциальности

Реквизиты в футере и на правовых страницах заданы как плейсхолдеры — замените на реальные УНП, торговый реестр и адрес.
