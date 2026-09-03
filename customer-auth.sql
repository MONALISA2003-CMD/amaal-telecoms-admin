-- Amaal Workstream 2: secure customer authentication and account identity. Additive only.
CREATE TABLE IF NOT EXISTS customer_credentials(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
 password_hash text NOT NULL,
 failed_attempts int NOT NULL DEFAULT 0,
 locked_until timestamptz,
 last_login_at timestamptz,
 password_changed_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_auth_sessions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 token_hash text UNIQUE NOT NULL,
 csrf_hash text NOT NULL,
 device_hash text NOT NULL DEFAULT '',
 user_agent_hash text NOT NULL DEFAULT '',
 expires_at timestamptz NOT NULL,
 last_used_at timestamptz NOT NULL DEFAULT now(),
 revoked_at timestamptz,
 ip text NOT NULL DEFAULT '',
 user_agent text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_auth_sessions_customer ON customer_auth_sessions(customer_id,revoked_at,expires_at);
CREATE INDEX IF NOT EXISTS idx_customer_auth_sessions_token ON customer_auth_sessions(token_hash,revoked_at,expires_at);
CREATE TABLE IF NOT EXISTS customer_auth_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 identifier text NOT NULL DEFAULT '',
 success boolean NOT NULL,
 reason text NOT NULL DEFAULT '',
 ip text NOT NULL DEFAULT '',
 user_agent text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_auth_events_created ON customer_auth_events(created_at DESC);
CREATE TABLE IF NOT EXISTS customer_password_reset_requests(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 identifier_hash text NOT NULL,
 requested_ip text NOT NULL DEFAULT '',
 user_agent text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now(),
 handled_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_customer_password_reset_requests_created ON customer_password_reset_requests(created_at DESC);
