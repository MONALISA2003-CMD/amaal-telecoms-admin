-- Amaal Phase 015 completion additions. Additive/idempotent only.
CREATE TABLE IF NOT EXISTS customer_notification_preferences(
 customer_id uuid PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
 transactional_inbox boolean NOT NULL DEFAULT true,
 marketing_email boolean NOT NULL DEFAULT false,
 marketing_sms boolean NOT NULL DEFAULT false,
 marketing_whatsapp boolean NOT NULL DEFAULT false,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_notification_preferences_updated ON customer_notification_preferences(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_recovery ON abandoned_carts(last_seen_at DESC) WHERE recovered_at IS NULL;

ALTER TABLE customer_notifications ADD COLUMN IF NOT EXISTS source_key text;
CREATE UNIQUE INDEX IF NOT EXISTS ux_customer_notifications_source_key ON customer_notifications(source_key) WHERE source_key IS NOT NULL;
