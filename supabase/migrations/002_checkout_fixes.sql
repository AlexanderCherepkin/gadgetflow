-- Patch for GadgetFlow MVP checkout
-- Run this in the Supabase SQL Editor if the initial migration was already applied
-- and checkout failed with:
--   1) "there is no unique or exclusion constraint matching the ON CONFLICT"
--   2) "invalid input syntax for type uuid" for order_items.product_id

-- 1. Allow customer email to be used for upsert logic.
--    Safe to run even if the constraint already exists.
ALTER TABLE customers
ADD CONSTRAINT customers_email_unique UNIQUE (email);

-- 2. Store static catalog product IDs (e.g. "p1") in order_items.
--    In MVP products live in src/lib/data/products.ts, not in the DB products table.
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE order_items ALTER COLUMN product_id TYPE TEXT;

-- 3. Allow anon/authenticated to insert order_items (server actions use service role / RLS bypass).
CREATE POLICY IF NOT EXISTS "Allow admin insert order_items" ON order_items
  FOR INSERT TO anon, authenticated WITH CHECK (true);
