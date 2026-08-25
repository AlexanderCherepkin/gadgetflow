# Настройка Supabase для GadgetFlow

## 1. Регистрация проекта

1. Откройте https://supabase.com и нажмите **Start your project**.
2. Зарегистрируйтесь через GitHub или email.
3. Создайте новую организацию (например, `gadgetflow-by`).
4. Создайте проект:
   - **Name**: `gadgetflow-mvp`
   - **Database Password**: сохраните в менеджер паролей
   - **Region**: выберите ближайший к Беларуси (например, `Frankfurt`)
   - Дождитесь окончания подготовки (обычно 1–2 минуты).

## 2. Получение ключей

1. В проекте перейдите в **Project Settings → API**.
2. Скопируйте значения:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`
3. Вставьте их в файл `gadgetflow/.env.local`.

## 3. Применение миграции

1. В Supabase откройте **SQL Editor → New query**.
2. Откройте файл `gadgetflow/supabase/migrations/apply.sql` на своём компьютере.
3. Скопируйте весь SQL из файла и вставьте в редактор.
4. Нажмите **Run**.

Если всё успешно, появятся таблицы:
`products`, `customers`, `orders`, `order_items`, `payments`, `deliveries`, `supplier_feed_staging`, `currency_rates`, `settings`.

### Если миграция уже была применена раньше

Запустите также `gadgetflow/supabase/migrations/002_checkout_fixes.sql`:
он добавляет уникальность на `customers.email` и делает `order_items.product_id`
типом `TEXT` (в MVP ID товаров приходят из статического каталога, а не из таблицы `products`).

## 4. Проверка данных

В SQL Editor выполните:

```sql
SELECT * FROM currency_rates;
SELECT * FROM settings;
```

Должны быть строки с курсами BYN/RUB и legal-настройками.

## 5. Запуск локально

```bash
cd gadgetflow
npm install
npm run dev
```

Откройте http://localhost:3000.
Админка: http://localhost:3000/admin (логин/пароль из `.env.local`).

## 6. Следующий шаг

После успешного запуска сайта с Supabase можно переходить к поиску поставщиков и тестированию парсера YML/XML.
