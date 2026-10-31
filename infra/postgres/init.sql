CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS tenants (
  tenant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  allergen_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  source TEXT NOT NULL DEFAULT 'manual',
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS menu_items (
  menu_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(tenant_id),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  version INTEGER NOT NULL DEFAULT 1,
  serving_size_g NUMERIC(10,2) NOT NULL CHECK (serving_size_g > 0),
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  status TEXT NOT NULL CHECK (status IN ('draft','in_clinical_review','approved','retired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, name, version)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(tenant_id),
  customer_reference TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('placed','accepted','preparing','ready','picked_up','delivered','cancelled','compromised')),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  interaction_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_tenant_status ON menu_items(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_tenant_created ON orders(tenant_id, created_at DESC);
