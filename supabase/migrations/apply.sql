-- Initial schema for GadgetFlow MVP
-- Run this entire file in the Supabase SQL Editor after creating the project.

-- Currency rates for BYN/RUB conversion
CREATE TABLE IF NOT EXISTS currency_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency TEXT NOT NULL,
  target_currency TEXT NOT NULL,
  rate NUMERIC(20, 10) NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (base_currency, target_currency)
);

-- Product catalog (extends static lib/data/products.ts in MVP)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE,
  slug TEXT UNIQUE,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  description TEXT,
  short_description TEXT,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  price_byn NUMERIC(12, 2) NOT NULL,
  old_price_byn NUMERIC(12, 2),
  in_stock BOOLEAN NOT NULL DEFAULT true,
  specs JSONB DEFAULT '{}',
  supplier_id TEXT,
  supplier_sku TEXT,
  warranty_months INTEGER,
  certificate_number TEXT,
  country_of_origin TEXT,
  ean TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Customers (optional, populated from checkout)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  phone TEXT,
  full_name TEXT,
  address TEXT,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  delivery_status TEXT NOT NULL DEFAULT 'pending',
  currency TEXT NOT NULL DEFAULT 'BYN',
  total_byn NUMERIC(12, 2) NOT NULL,
  delivery_cost_byn NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount_byn NUMERIC(12, 2) NOT NULL DEFAULT 0,
  delivery_method TEXT,
  payment_method TEXT,
  delivery_address TEXT,
  delivery_city TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price_byn NUMERIC(12, 2) NOT NULL,
  total_byn NUMERIC(12, 2) NOT NULL,
  metadata JSONB DEFAULT '{}'
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_payment_id TEXT,
  amount_byn NUMERIC(12, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payload JSONB DEFAULT '{}',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Delivery tracking
CREATE TABLE IF NOT EXISTS deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  carrier TEXT NOT NULL,
  tracking_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  estimated_days INTEGER,
  cost_byn NUMERIC(12, 2),
  payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Supplier feed staging (for YML/XML imports)
CREATE TABLE IF NOT EXISTS supplier_feed_staging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id TEXT NOT NULL,
  feed_url TEXT,
  raw_payload TEXT,
  normalized_payload JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Settings (currency, legal placeholders, etc.)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default BYN/RUB rate placeholder (update manually or via cron)
INSERT INTO currency_rates (base_currency, target_currency, rate, source)
VALUES ('BYN', 'RUB', 28.50, 'manual')
ON CONFLICT (base_currency, target_currency) DO NOTHING;

INSERT INTO currency_rates (base_currency, target_currency, rate, source)
VALUES ('RUB', 'BYN', 0.0351, 'manual')
ON CONFLICT (base_currency, target_currency) DO NOTHING;

-- Default legal settings placeholders
INSERT INTO settings (key, value)
VALUES ('legal', '{"unp":"[укажите УНП]","trade_registry_date":"[дата]","trade_registry_number":"[номер]"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_feed_staging ENABLE ROW LEVEL SECURITY;
ALTER TABLE currency_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access to active products (for storefront)
CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (is_active = true);

-- Admin access policies (for server-side /admin pages protected by HTTP auth)
CREATE POLICY "Allow admin read orders" ON orders
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin update orders" ON orders
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin read order_items" ON order_items
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin insert order_items" ON order_items
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow admin read customers" ON customers
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admin read payments" ON payments
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admin read deliveries" ON deliveries
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admin read currency_rates" ON currency_rates
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admin read settings" ON settings
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admin read supplier_feed_staging" ON supplier_feed_staging
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write supplier_feed_staging" ON supplier_feed_staging
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow admin update supplier_feed_staging" ON supplier_feed_staging
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Admin access is managed by service role key in server actions.
-- Real admin authorization is enforced in application code + env-based tokens.

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_order_id ON deliveries(order_id);
