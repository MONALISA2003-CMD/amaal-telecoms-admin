-- Reporting & Business Intelligence: saved management snapshots
CREATE TABLE IF NOT EXISTS bi_report_snapshots(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 report_key text NOT NULL,
 period_start date NOT NULL,
 period_end date NOT NULL,
 payload jsonb NOT NULL,
 generated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_bi_snapshots_key_date ON bi_report_snapshots(report_key,period_end DESC,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bi_snapshots_generated_by ON bi_report_snapshots(generated_by,created_at DESC);
