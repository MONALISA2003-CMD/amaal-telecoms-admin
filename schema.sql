CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS roles(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, description text NOT NULL DEFAULT '', system boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS permissions(id text PRIMARY KEY, description text NOT NULL);
CREATE TABLE IF NOT EXISTS role_permissions(role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE, permission_id text NOT NULL REFERENCES permissions(id) ON DELETE CASCADE, PRIMARY KEY(role_id,permission_id));
CREATE TABLE IF NOT EXISTS branches(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, address text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')), created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS users(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text UNIQUE NOT NULL, password_hash text NOT NULL, status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')), failed_attempts int NOT NULL DEFAULT 0, locked_until timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS user_roles(user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE, PRIMARY KEY(user_id,role_id));
CREATE TABLE IF NOT EXISTS user_branches(user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE, PRIMARY KEY(user_id,branch_id));
CREATE TABLE IF NOT EXISTS sessions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash text UNIQUE NOT NULL,
 token_expires_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), last_seen_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL, revoked_at timestamptz, ip text, user_agent text);
CREATE TABLE IF NOT EXISTS audit_logs(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor_id uuid REFERENCES users(id) ON DELETE SET NULL, action text NOT NULL, resource_type text NOT NULL, resource_id text, detail text NOT NULL DEFAULT '', before_json jsonb, after_json jsonb, branch_id uuid REFERENCES branches(id) ON DELETE SET NULL, request_id text NOT NULL, ip text, user_agent text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS notifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, body text NOT NULL DEFAULT '', read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS settings(key text PRIMARY KEY, value_json jsonb NOT NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_at timestamptz NOT NULL DEFAULT now());


-- Phase 1B: international administration and security foundation
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS employee_id text UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS job_title text NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS department_id uuid;
ALTER TABLE users ADD COLUMN IF NOT EXISTS country_code text NOT NULL DEFAULT 'UG';
ALTER TABLE users ADD COLUMN IF NOT EXISTS locale text NOT NULL DEFAULT 'en-UG';
ALTER TABLE users ADD COLUMN IF NOT EXISTS timezone text NOT NULL DEFAULT 'Africa/Kampala';
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_token_hash text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_expires_at timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS mfa_enabled boolean NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS organizations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 legal_name text NOT NULL,
 trading_name text NOT NULL DEFAULT '',
 registration_number text NOT NULL DEFAULT '',
 tax_number text NOT NULL DEFAULT '',
 country_code text NOT NULL DEFAULT 'UG',
 currency text NOT NULL DEFAULT 'UGX',
 timezone text NOT NULL DEFAULT 'Africa/Kampala',
 locale text NOT NULL DEFAULT 'en-UG',
 address text NOT NULL DEFAULT '',
 city text NOT NULL DEFAULT '',
 region text NOT NULL DEFAULT '',
 postal_code text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 website text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS departments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text UNIQUE NOT NULL,
 code text UNIQUE NOT NULL,
 description text NOT NULL DEFAULT '',
 manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$ BEGIN
 ALTER TABLE users ADD CONSTRAINT users_department_fk FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS login_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid REFERENCES users(id) ON DELETE SET NULL,
 email text NOT NULL DEFAULT '',
 success boolean NOT NULL,
 reason text NOT NULL DEFAULT '',
 ip text,
 user_agent text,
 request_id text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mfa_credentials(
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 secret_encrypted text NOT NULL,
 enabled_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS password_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 password_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS invitations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL,
 name text NOT NULL DEFAULT '',
 role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
 token_hash text UNIQUE NOT NULL,
 token_expires_at timestamptz,
 expires_at timestamptz NOT NULL,
 accepted_at timestamptz,
 revoked_at timestamptz,
 invited_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS feature_flags(
 key text PRIMARY KEY,
 enabled boolean NOT NULL DEFAULT false,
 description text NOT NULL DEFAULT '',
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_events_created_at ON login_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user_active ON sessions(user_id,revoked_at,expires_at);

CREATE TABLE IF NOT EXISTS security_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 event_type text NOT NULL,
 severity text NOT NULL DEFAULT 'info' CHECK(severity IN ('info','warning','critical')),
 detail text NOT NULL DEFAULT '',
 ip text,
 user_agent text,
 request_id text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department_id);
