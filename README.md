# GadgetFlow

Интернет-магазин электроники для РБ. Современный e-commerce на Next.js 16 + React 19 + Tailwind CSS 4.

## Стек

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Radix UI, Framer Motion
- **State:** React Context (корзина, избранное)
- **Data:** TypeScript-typed mocks (`src/lib/data/`)
- **Deploy:** Vercel (автодеплой из `master`)

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

- `src/app/` — страницы
- `src/components/` — компоненты
- `src/lib/data/` — типы и мок-данные
- `public/videos/` — видео для hero-слайдера

## Production

- `https://gadgetflow-steel.vercel.app`
