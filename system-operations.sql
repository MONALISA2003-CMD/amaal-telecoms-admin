-- Phase 40B — System Operations
CREATE TABLE IF NOT EXISTS operations_jobs(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 job_type text NOT NULL,
 status text NOT NULL DEFAULT 'Queued' CHECK(status IN ('Queued','Running','Completed','Failed','Retrying','Cancelled')),
 safe_retry boolean NOT NULL DEFAULT false,
 safe_cancel boolean NOT NULL DEFAULT false,
 related_resource_type text,
 related_resource_id text,
 payload_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 error_summary text,
 attempts integer NOT NULL DEFAULT 0 CHECK(attempts>=0),
 created_at timestamptz NOT NULL DEFAULT now(),
 started_at timestamptz,
 completed_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS operations_scheduled_tasks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 task_key text UNIQUE NOT NULL,
 name text NOT NULL,
 cadence_minutes integer NOT NULL CHECK(cadence_minutes>0),
 enabled boolean NOT NULL DEFAULT true,
 next_run_at timestamptz,
 last_run_at timestamptz,
 last_duration_ms integer,
 failure_count integer NOT NULL DEFAULT 0 CHECK(failure_count>=0),
 metadata_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now(),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS operations_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 event_type text NOT NULL,
 severity text NOT NULL DEFAULT 'info' CHECK(severity IN ('info','warning','critical')),
 detail text NOT NULL DEFAULT '',
 metadata_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_operations_jobs_status_created ON operations_jobs(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_operations_jobs_type_created ON operations_jobs(job_type,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_operations_tasks_next ON operations_scheduled_tasks(enabled,next_run_at);
CREATE INDEX IF NOT EXISTS idx_operations_events_created ON operations_events(created_at DESC);
