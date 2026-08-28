CREATE TABLE IF NOT EXISTS credit_profiles(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
 credit_limit numeric(14,2) NOT NULL DEFAULT 0 CHECK(credit_limit>=0), risk_grade text NOT NULL DEFAULT 'Unrated', status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended','Closed')),
 notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS credit_applications(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), application_no text UNIQUE NOT NULL, customer_id uuid NOT NULL REFERENCES customers(id), requested_amount numeric(14,2) NOT NULL CHECK(requested_amount>0), approved_amount numeric(14,2), down_payment numeric(14,2) NOT NULL DEFAULT 0 CHECK(down_payment>=0), term_months int NOT NULL DEFAULT 1 CHECK(term_months>0), status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Rejected','Cancelled')),
 purpose text NOT NULL DEFAULT '', decision_note text NOT NULL DEFAULT '', applied_at timestamptz NOT NULL DEFAULT now(), decided_at timestamptz, decided_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS credit_accounts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), account_no text UNIQUE NOT NULL, application_id uuid NOT NULL UNIQUE REFERENCES credit_applications(id), customer_id uuid NOT NULL REFERENCES customers(id), principal numeric(14,2) NOT NULL CHECK(principal>0), outstanding_principal numeric(14,2) NOT NULL CHECK(outstanding_principal>=0), status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Paid','Defaulted','Restructured','Cancelled')), opened_at timestamptz NOT NULL DEFAULT now(), closed_at timestamptz
);
CREATE TABLE IF NOT EXISTS credit_installments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE, installment_no int NOT NULL, due_date date NOT NULL, principal_due numeric(14,2) NOT NULL DEFAULT 0, fee_due numeric(14,2) NOT NULL DEFAULT 0, penalty_due numeric(14,2) NOT NULL DEFAULT 0, paid_amount numeric(14,2) NOT NULL DEFAULT 0, status text NOT NULL DEFAULT 'Due' CHECK(status IN ('Due','Partially Paid','Paid','Overdue','Waived')), UNIQUE(credit_account_id,installment_no)
);
CREATE TABLE IF NOT EXISTS credit_payments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), receipt_no text UNIQUE NOT NULL, credit_account_id uuid NOT NULL REFERENCES credit_accounts(id), amount numeric(14,2) NOT NULL CHECK(amount>0), method text NOT NULL DEFAULT 'Cash', reference text NOT NULL DEFAULT '', paid_at timestamptz NOT NULL DEFAULT now(), received_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS credit_payment_allocations(
 payment_id uuid NOT NULL REFERENCES credit_payments(id) ON DELETE CASCADE, installment_id uuid NOT NULL REFERENCES credit_installments(id) ON DELETE CASCADE, amount numeric(14,2) NOT NULL CHECK(amount>0), PRIMARY KEY(payment_id,installment_id)
);
CREATE TABLE IF NOT EXISTS credit_collection_tasks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE, assigned_to uuid REFERENCES users(id) ON DELETE SET NULL, due_at timestamptz, status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','In Progress','Resolved','Cancelled')), priority text NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Critical')), note text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(), resolved_at timestamptz
);
CREATE TABLE IF NOT EXISTS credit_restructures(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE, old_balance numeric(14,2) NOT NULL, new_term_months int NOT NULL, new_installment_amount numeric(14,2) NOT NULL, reason text NOT NULL, approved_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_credit_installments_due ON credit_installments(due_date,status);
CREATE INDEX IF NOT EXISTS idx_credit_payments_account ON credit_payments(credit_account_id,paid_at);


-- Credit integration and lifecycle hardening (additive/backward-compatible)
ALTER TABLE credit_applications ADD COLUMN IF NOT EXISTS source_type text NOT NULL DEFAULT 'Manual';
ALTER TABLE credit_applications ADD COLUMN IF NOT EXISTS source_id uuid;
ALTER TABLE credit_applications ADD COLUMN IF NOT EXISTS eligibility_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS source_type text;
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS source_id uuid;
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS down_payment numeric(14,2) NOT NULL DEFAULT 0 CHECK(down_payment>=0);
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS total_due numeric(14,2) NOT NULL DEFAULT 0 CHECK(total_due>=0);
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS total_paid numeric(14,2) NOT NULL DEFAULT 0 CHECK(total_paid>=0);
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS last_payment_at timestamptz;
ALTER TABLE credit_accounts ADD COLUMN IF NOT EXISTS next_due_date date;
ALTER TABLE credit_installments ADD COLUMN IF NOT EXISTS notes text NOT NULL DEFAULT '';
ALTER TABLE credit_payments ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Completed';
ALTER TABLE credit_payments ADD COLUMN IF NOT EXISTS reversed_at timestamptz;
ALTER TABLE credit_payments ADD COLUMN IF NOT EXISTS reversed_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE credit_restructures ADD COLUMN IF NOT EXISTS approved_at timestamptz;
CREATE TABLE IF NOT EXISTS credit_account_links(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE,
 source_type text NOT NULL CHECK(source_type IN ('Sale','Order')),
 source_id uuid NOT NULL, linked_at timestamptz NOT NULL DEFAULT now(), linked_by uuid REFERENCES users(id) ON DELETE SET NULL,
 UNIQUE(source_type,source_id), UNIQUE(credit_account_id,source_type,source_id)
);
CREATE TABLE IF NOT EXISTS credit_payment_reversals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), payment_id uuid NOT NULL UNIQUE REFERENCES credit_payments(id),
 amount numeric(14,2) NOT NULL CHECK(amount>0), reason text NOT NULL, reversed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 reversed_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_credit_accounts_customer_status ON credit_accounts(customer_id,status);
CREATE INDEX IF NOT EXISTS idx_credit_accounts_source ON credit_accounts(source_type,source_id);
CREATE INDEX IF NOT EXISTS idx_credit_applications_customer_status ON credit_applications(customer_id,status);
CREATE INDEX IF NOT EXISTS idx_credit_collection_due ON credit_collection_tasks(status,due_at);
CREATE INDEX IF NOT EXISTS idx_credit_links_source ON credit_account_links(source_type,source_id);


-- Phase 14: preserve credit installment history during restructuring (additive/repeat-safe)
ALTER TABLE credit_installments ADD COLUMN IF NOT EXISTS superseded_at timestamptz;
ALTER TABLE credit_installments ADD COLUMN IF NOT EXISTS superseded_by uuid REFERENCES credit_restructures(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_credit_installments_active_account ON credit_installments(credit_account_id, due_date) WHERE superseded_at IS NULL;
