-- Integration Hub: secure connection registry, webhooks, event history and health checks.
CREATE TABLE IF NOT EXISTS integration_connections(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL UNIQUE,
 provider text NOT NULL,
 connection_type text NOT NULL DEFAULT 'REST',
 base_url text NOT NULL DEFAULT '',
 auth_type text NOT NULL DEFAULT 'None' CHECK(auth_type IN ('None','Bearer','API Key','Basic')),
 auth_header text NOT NULL DEFAULT 'Authorization',
 secret_encrypted text NOT NULL DEFAULT '',
 config_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended','Error')),
 last_tested_at timestamptz,
 last_error text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS integration_webhooks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL UNIQUE,
 endpoint_key text NOT NULL UNIQUE,
 direction text NOT NULL DEFAULT 'Outbound' CHECK(direction IN ('Inbound','Outbound')),
 url text NOT NULL DEFAULT '',
 event_types jsonb NOT NULL DEFAULT '[]'::jsonb,
 secret_encrypted text NOT NULL DEFAULT '',
 active boolean NOT NULL DEFAULT true,
 last_delivery_at timestamptz,
 last_status_code int,
 last_error text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS integration_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 event_type text NOT NULL,
 source_module text NOT NULL,
 resource_type text,
 resource_id text,
 payload jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Recorded' CHECK(status IN ('Recorded','Delivered','Failed','Ignored')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS integration_deliveries(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 webhook_id uuid REFERENCES integration_webhooks(id) ON DELETE CASCADE,
 event_id uuid REFERENCES integration_events(id) ON DELETE CASCADE,
 status_code int,
 response_ms int,
 error_message text NOT NULL DEFAULT '',
 attempted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_integration_connections_status ON integration_connections(status,provider);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_active ON integration_webhooks(active,direction);
CREATE INDEX IF NOT EXISTS idx_integration_events_created ON integration_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_integration_deliveries_event ON integration_deliveries(event_id,attempted_at DESC);
