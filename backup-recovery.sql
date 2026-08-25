-- Phase 40D: Backup & Recovery. Additive only.
CREATE TABLE IF NOT EXISTS system_backups(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 backup_no text NOT NULL UNIQUE,
 backup_type text NOT NULL DEFAULT 'database' CHECK(backup_type IN ('database','configuration','full')),
 status text NOT NULL DEFAULT 'Queued' CHECK(status IN ('Queued','Running','Completed','Failed','Verified','Archived','Deleted')),
 storage_path text,
 storage_backend text NOT NULL DEFAULT 'local',
 size_bytes bigint,
 duration_ms bigint,
 checksum_sha256 text,
 verification_status text NOT NULL DEFAULT 'Pending' CHECK(verification_status IN ('Pending','Verified','Failed','NotAvailable')),
 source_environment text NOT NULL DEFAULT 'unknown',
 media_strategy text NOT NULL DEFAULT 'database-included',
 retention_class text NOT NULL DEFAULT 'daily' CHECK(retention_class IN ('daily','weekly','monthly','manual')),
 expires_at timestamptz,
 manifest_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 error_message text,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 completed_at timestamptz,
 verified_at timestamptz,
 archived_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_system_backups_created ON system_backups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_backups_status ON system_backups(status,verification_status);
CREATE INDEX IF NOT EXISTS idx_system_backups_expiry ON system_backups(expires_at) WHERE expires_at IS NOT NULL;
CREATE TABLE IF NOT EXISTS backup_retention_policies(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 retention_class text NOT NULL UNIQUE CHECK(retention_class IN ('daily','weekly','monthly','manual')),
 retention_days integer NOT NULL CHECK(retention_days>=1 AND retention_days<=3650),
 enabled boolean NOT NULL DEFAULT true,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS backup_recovery_plans(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 backup_id uuid NOT NULL REFERENCES system_backups(id) ON DELETE RESTRICT,
 status text NOT NULL DEFAULT 'Prepared' CHECK(status IN ('Prepared','Confirmed','Executing','Completed','Failed','Cancelled')),
 target_environment text NOT NULL,
 confirmation_phrase text NOT NULL,
 requested_by uuid REFERENCES users(id) ON DELETE SET NULL,
 confirmed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 confirmed_at timestamptz,
 completed_at timestamptz,
 error_message text
);
CREATE INDEX IF NOT EXISTS idx_backup_recovery_plans_backup ON backup_recovery_plans(backup_id,status);
INSERT INTO backup_retention_policies(retention_class,retention_days,enabled)
VALUES ('daily',7,true),('weekly',35,true),('monthly',365,true),('manual',3650,true)
ON CONFLICT(retention_class) DO NOTHING;
