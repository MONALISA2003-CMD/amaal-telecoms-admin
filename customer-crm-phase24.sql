-- Phase 24 Customers & CRM deep build
CREATE TABLE IF NOT EXISTS customer_tasks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 title text NOT NULL, description text NOT NULL DEFAULT '',
 assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
 due_at timestamptz, priority text NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Critical')),
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','In Progress','Completed','Cancelled')),
 completed_at timestamptz, created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_tasks_customer ON customer_tasks(customer_id,status,due_at);
CREATE INDEX IF NOT EXISTS idx_customer_tasks_assignee ON customer_tasks(assigned_to,status,due_at);
CREATE TABLE IF NOT EXISTS customer_groups(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, description text NOT NULL DEFAULT '',
 criteria jsonb NOT NULL DEFAULT '{}'::jsonb, active boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_group_members(
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 group_id uuid NOT NULL REFERENCES customer_groups(id) ON DELETE CASCADE,
 assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(customer_id,group_id)
);
CREATE INDEX IF NOT EXISTS idx_customer_group_members_group ON customer_group_members(group_id,customer_id);
CREATE TABLE IF NOT EXISTS customer_merge_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), survivor_customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
 merged_customer_id uuid NOT NULL, merged_customer_no text NOT NULL, merged_snapshot jsonb NOT NULL,
 moved_counts jsonb NOT NULL DEFAULT '{}'::jsonb, reason text NOT NULL DEFAULT '',
 merged_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_merge_survivor ON customer_merge_history(survivor_customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS customer_notes(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 note text NOT NULL, visibility text NOT NULL DEFAULT 'Internal' CHECK(visibility IN ('Internal','Private')),
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_notes_customer ON customer_notes(customer_id,created_at DESC);
