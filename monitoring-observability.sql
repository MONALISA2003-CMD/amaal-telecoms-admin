-- Phase 40C — Monitoring & Observability
CREATE TABLE IF NOT EXISTS monitoring_snapshots(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 overall_status text NOT NULL CHECK(overall_status IN ('Healthy','Warning','Critical','Unknown')),
 checks_json jsonb NOT NULL DEFAULT '[]'::jsonb,
 metrics_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS monitoring_alert_rules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 key text UNIQUE NOT NULL,
 name text NOT NULL,
 severity text NOT NULL DEFAULT 'warning' CHECK(severity IN ('warning','critical')),
 threshold numeric,
 window_minutes integer NOT NULL DEFAULT 15 CHECK(window_minutes>0),
 cooldown_minutes integer NOT NULL DEFAULT 30 CHECK(cooldown_minutes>=0),
 enabled boolean NOT NULL DEFAULT true,
 description text NOT NULL DEFAULT '',
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now(),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS monitoring_alerts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 rule_key text NOT NULL,
 severity text NOT NULL CHECK(severity IN ('warning','critical')),
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Acknowledged','Resolved')),
 title text NOT NULL,
 detail text NOT NULL DEFAULT '',
 value numeric,
 threshold numeric,
 first_seen_at timestamptz NOT NULL DEFAULT now(),
 last_seen_at timestamptz NOT NULL DEFAULT now(),
 acknowledged_at timestamptz,
 acknowledged_by uuid REFERENCES users(id) ON DELETE SET NULL,
 resolved_at timestamptz,
 resolved_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_monitoring_snapshots_created ON monitoring_snapshots(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_monitoring_alert_rules_enabled ON monitoring_alert_rules(enabled,key);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_status_seen ON monitoring_alerts(status,last_seen_at DESC);
INSERT INTO monitoring_alert_rules(key,name,severity,threshold,window_minutes,cooldown_minutes,description) VALUES
('failed_jobs_24h','Failed background jobs','warning',1,1440,30,'Alert when one or more background jobs fail in the last 24 hours.'),
('integration_errors','Integration connections in error','warning',1,15,30,'Alert when one or more integrations report Error status.'),
('unread_notifications','Unread notification backlog','warning',100,15,60,'Alert when unread notifications exceed the configured threshold.'),
('failed_finance_postings','Failed finance postings','critical',1,60,30,'Alert when operational-to-finance posting failures are detected.'),
('failed_payments','Failed payments','warning',1,60,30,'Alert when payment failures are detected in the recent window.'),
('negative_stock_attempts','Negative stock attempts','critical',1,60,30,'Alert when negative stock attempts are recorded in inventory audit/events.')
ON CONFLICT(key) DO NOTHING;
