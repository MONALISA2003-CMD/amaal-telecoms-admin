CREATE TABLE IF NOT EXISTS finance_accounts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text UNIQUE NOT NULL, name text NOT NULL, account_type text NOT NULL CHECK(account_type IN ('Asset','Liability','Equity','Revenue','Expense')), parent_id uuid REFERENCES finance_accounts(id) ON DELETE SET NULL, active boolean NOT NULL DEFAULT true, system boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_periods(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, starts_on date NOT NULL, ends_on date NOT NULL, status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Closed')), closed_by uuid REFERENCES users(id) ON DELETE SET NULL, closed_at timestamptz
);
CREATE TABLE IF NOT EXISTS finance_journals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), journal_no text UNIQUE NOT NULL, journal_date date NOT NULL DEFAULT CURRENT_DATE, description text NOT NULL, source_type text NOT NULL DEFAULT 'Manual', source_id text, source_ref text UNIQUE, status text NOT NULL DEFAULT 'Posted' CHECK(status IN ('Draft','Posted','Voided')), created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_journal_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), journal_id uuid NOT NULL REFERENCES finance_journals(id) ON DELETE CASCADE, account_id uuid NOT NULL REFERENCES finance_accounts(id), description text NOT NULL DEFAULT '', debit numeric(14,2) NOT NULL DEFAULT 0 CHECK(debit>=0), credit numeric(14,2) NOT NULL DEFAULT 0 CHECK(credit>=0), customer_id uuid REFERENCES customers(id) ON DELETE SET NULL, supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL, CHECK((debit=0 AND credit>0) OR (credit=0 AND debit>0))
);
CREATE TABLE IF NOT EXISTS finance_cash_accounts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, account_type text NOT NULL DEFAULT 'Cash' CHECK(account_type IN ('Cash','Bank','Mobile Money')), currency text NOT NULL DEFAULT 'UGX', finance_account_id uuid REFERENCES finance_accounts(id), active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_tax_rates(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, rate numeric(7,4) NOT NULL CHECK(rate>=0), code text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true, effective_from date NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE IF NOT EXISTS finance_bank_transactions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), cash_account_id uuid NOT NULL REFERENCES finance_cash_accounts(id), transaction_date date NOT NULL, reference text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', amount numeric(14,2) NOT NULL, direction text NOT NULL CHECK(direction IN ('In','Out')), reconciled boolean NOT NULL DEFAULT false, matched_journal_id uuid REFERENCES finance_journals(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_reconciliations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), cash_account_id uuid NOT NULL REFERENCES finance_cash_accounts(id), statement_date date NOT NULL, statement_balance numeric(14,2) NOT NULL, book_balance numeric(14,2) NOT NULL, difference numeric(14,2) NOT NULL, status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Reconciled')), reconciled_by uuid REFERENCES users(id) ON DELETE SET NULL, reconciled_at timestamptz
);
CREATE TABLE IF NOT EXISTS finance_sync_log(source_type text NOT NULL, source_id text NOT NULL, journal_id uuid NOT NULL REFERENCES finance_journals(id) ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(source_type,source_id));
CREATE INDEX IF NOT EXISTS idx_finance_journal_date ON finance_journals(journal_date);
CREATE INDEX IF NOT EXISTS idx_finance_lines_account ON finance_journal_lines(account_id);
