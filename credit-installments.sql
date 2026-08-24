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
