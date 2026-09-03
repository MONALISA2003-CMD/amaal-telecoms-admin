-- Amaal customer Google identity linking. Additive only.
-- Apply only after reviewing/testing the migration on a Neon branch.
CREATE TABLE IF NOT EXISTS customer_auth_identities(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 provider text NOT NULL,
 provider_subject text NOT NULL,
 provider_email text NOT NULL DEFAULT '',
 email_verified boolean NOT NULL DEFAULT false,
 profile_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT customer_auth_identities_provider_check CHECK (provider IN ('google')),
 CONSTRAINT customer_auth_identities_provider_subject_key UNIQUE (provider,provider_subject),
 CONSTRAINT customer_auth_identities_customer_provider_key UNIQUE (customer_id,provider)
);
CREATE INDEX IF NOT EXISTS idx_customer_auth_identities_customer ON customer_auth_identities(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_auth_identities_email ON customer_auth_identities(lower(provider_email));
