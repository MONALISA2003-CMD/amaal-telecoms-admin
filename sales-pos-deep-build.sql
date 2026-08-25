-- Sales & POS deep-build extensions (safe, additive, preserves existing operational data)
ALTER TABLE sales DROP CONSTRAINT IF EXISTS sales_status_check;
ALTER TABLE sales ADD CONSTRAINT sales_status_check CHECK(status IN ('Draft','Suspended','Completed','Partially Paid','Paid','Cancelled','Voided','Reversed'));

ALTER TABLE sale_payments ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Completed';
ALTER TABLE sale_payments ADD COLUMN IF NOT EXISTS reversed_at timestamptz;
ALTER TABLE sale_payments ADD COLUMN IF NOT EXISTS reversed_by uuid REFERENCES users(id);
ALTER TABLE sale_payments DROP CONSTRAINT IF EXISTS sale_payments_status_check;
ALTER TABLE sale_payments ADD CONSTRAINT sale_payments_status_check CHECK(status IN ('Pending','Completed','Failed','Refunded','Reversed'));

CREATE TABLE IF NOT EXISTS sales_controls(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 max_discount_percent numeric(8,4) NOT NULL DEFAULT 5 CHECK(max_discount_percent>=0),
 max_price_override_percent numeric(8,4) NOT NULL DEFAULT 0 CHECK(max_price_override_percent>=0),
 require_discount_approval boolean NOT NULL DEFAULT true,
 require_price_override_approval boolean NOT NULL DEFAULT true,
 updated_by uuid REFERENCES users(id),
 updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO sales_controls(id) VALUES('00000000-0000-0000-0000-000000000001')
ON CONFLICT(id) DO NOTHING;

CREATE TABLE IF NOT EXISTS sales_approvals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid REFERENCES sales(id) ON DELETE CASCADE,
 quote_id uuid,
 approval_type text NOT NULL CHECK(approval_type IN ('Discount','Price Override','Refund','Void','Cash Variance')),
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Rejected','Cancelled')),
 requested_by uuid NOT NULL REFERENCES users(id),
 approved_by uuid REFERENCES users(id),
 reason text NOT NULL DEFAULT '',
 requested_at timestamptz NOT NULL DEFAULT now(),
 approved_at timestamptz,
 metadata_json jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_sales_approvals_sale ON sales_approvals(sale_id,status,requested_at DESC);

CREATE TABLE IF NOT EXISTS suspended_sales(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 hold_no text UNIQUE NOT NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 cashier_id uuid NOT NULL REFERENCES users(id),
 cart_json jsonb NOT NULL,
 notes text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Suspended' CHECK(status IN ('Suspended','Retrieved','Cancelled')),
 retrieved_at timestamptz,
 retrieved_by uuid REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_suspended_sales_status ON suspended_sales(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_suspended_sales_cashier ON suspended_sales(cashier_id,status,created_at DESC);

CREATE TABLE IF NOT EXISTS till_shifts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 cashier_id uuid NOT NULL REFERENCES users(id),
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Closed','Reconciled')),
 opening_cash numeric(18,2) NOT NULL DEFAULT 0 CHECK(opening_cash>=0),
 expected_cash numeric(18,2) NOT NULL DEFAULT 0 CHECK(expected_cash>=0),
 actual_cash numeric(18,2) CHECK(actual_cash>=0),
 variance numeric(18,2),
 variance_reason text NOT NULL DEFAULT '',
 supervisor_id uuid REFERENCES users(id),
 opened_at timestamptz NOT NULL DEFAULT now(),
 closed_at timestamptz,
 reconciled_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_open_till_shift_cashier ON till_shifts(cashier_id) WHERE status='Open';
CREATE INDEX IF NOT EXISTS idx_till_shifts_location_date ON till_shifts(location_id,opened_at DESC);

CREATE TABLE IF NOT EXISTS till_cash_movements(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 shift_id uuid NOT NULL REFERENCES till_shifts(id) ON DELETE RESTRICT,
 movement_type text NOT NULL CHECK(movement_type IN ('Cash In','Cash Out','Float Top Up','Petty Cash')),
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 reason text NOT NULL,
 reference text NOT NULL DEFAULT '',
 actor_id uuid NOT NULL REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_till_cash_movements_shift ON till_cash_movements(shift_id,created_at);

CREATE TABLE IF NOT EXISTS sale_receipts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid NOT NULL UNIQUE REFERENCES sales(id) ON DELETE RESTRICT,
 receipt_no text UNIQUE NOT NULL,
 status text NOT NULL DEFAULT 'Issued' CHECK(status IN ('Issued','Cancelled')),
 issued_by uuid NOT NULL REFERENCES users(id),
 issued_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS receipt_reprints(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 receipt_id uuid NOT NULL REFERENCES sale_receipts(id) ON DELETE RESTRICT,
 reason text NOT NULL,
 authorized_by uuid NOT NULL REFERENCES users(id),
 reprinted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_receipt_reprints_receipt ON receipt_reprints(receipt_id,reprinted_at DESC);

CREATE TABLE IF NOT EXISTS payment_reversals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_payment_id uuid NOT NULL REFERENCES sale_payments(id) ON DELETE RESTRICT,
 sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE RESTRICT,
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 method text NOT NULL,
 reference text NOT NULL DEFAULT '',
 reason text NOT NULL,
 processed_by uuid NOT NULL REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payment_reversals_sale ON payment_reversals(sale_id,created_at DESC);

CREATE TABLE IF NOT EXISTS sales_quotes(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 quote_no text UNIQUE NOT NULL,
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Pending Approval','Approved','Expired','Converted','Cancelled')),
 subtotal numeric(18,2) NOT NULL DEFAULT 0 CHECK(subtotal>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 grand_total numeric(18,2) NOT NULL DEFAULT 0 CHECK(grand_total>=0),
 currency text NOT NULL DEFAULT 'UGX',
 valid_until date,
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_by uuid REFERENCES users(id),
 converted_sale_id uuid REFERENCES sales(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sales_quote_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 quote_id uuid NOT NULL REFERENCES sales_quotes(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_price numeric(18,2) NOT NULL CHECK(unit_price>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 line_total numeric(18,2) NOT NULL CHECK(line_total>=0)
);
CREATE INDEX IF NOT EXISTS idx_sales_quote_lines_quote ON sales_quote_lines(quote_id);
CREATE INDEX IF NOT EXISTS idx_sales_quotes_customer ON sales_quotes(customer_id,created_at DESC);

CREATE TABLE IF NOT EXISTS sales_order_links(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sales_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
 order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(sales_id,order_id)
);

ALTER TABLE sales ADD COLUMN IF NOT EXISTS quote_id uuid REFERENCES sales_quotes(id) ON DELETE SET NULL;
ALTER TABLE sales ADD COLUMN IF NOT EXISTS order_id uuid REFERENCES orders(id) ON DELETE SET NULL;
ALTER TABLE sales ADD COLUMN IF NOT EXISTS till_shift_id uuid REFERENCES till_shifts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_sales_quote ON sales(quote_id);
CREATE INDEX IF NOT EXISTS idx_sales_order ON sales(order_id);
CREATE INDEX IF NOT EXISTS idx_sales_till_shift ON sales(till_shift_id,created_at DESC);

-- Keep canonical procurement implementation unchanged.
-- purchase_requisitions is the only canonical procurement requisition entity.
