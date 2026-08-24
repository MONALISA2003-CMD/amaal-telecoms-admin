-- AI Business Intelligence: server-side Gemini configuration, training guidance and generated management reports.
CREATE TABLE IF NOT EXISTS ai_configuration(
 id boolean PRIMARY KEY DEFAULT true,
 enabled boolean NOT NULL DEFAULT true,
 model text NOT NULL DEFAULT 'gemini-3.7-flash',
 system_prompt text NOT NULL DEFAULT 'You are Amaal Telecoms business intelligence assistant. Use only supplied business data. Be concise, factual, and explicit about uncertainty. Never invent transactions, customers, prices, stock or financial figures. Recommend actions but do not execute business mutations.',
 public_system_prompt text NOT NULL DEFAULT 'You are the Amaal Telecoms customer-facing assistant. Answer only from the supplied public catalog and approved public business information. Never reveal private, operational, financial, employee, customer or security information.',
 report_prompt text NOT NULL DEFAULT 'Produce an executive business report with: headline, key movements, risks, opportunities, actions and data-quality caveats. Quantify claims from the supplied data.',
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_training_examples(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 title text NOT NULL,
 instruction text NOT NULL,
 expected_behavior text NOT NULL,
 active boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_report_schedules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL UNIQUE,
 report_type text NOT NULL DEFAULT 'executive',
 cadence_minutes int NOT NULL DEFAULT 1440 CHECK(cadence_minutes>=15),
 enabled boolean NOT NULL DEFAULT true,
 last_run_at timestamptz,
 next_run_at timestamptz NOT NULL DEFAULT now(),
 recipients_json jsonb NOT NULL DEFAULT '[]'::jsonb,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_generated_reports(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 report_type text NOT NULL,
 period_start date,
 period_end date,
 model text NOT NULL,
 title text NOT NULL DEFAULT 'Amaal Telecoms AI report',
 content text NOT NULL,
 data_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Completed' CHECK(status IN ('Completed','Failed')),
 error_message text NOT NULL DEFAULT '',
 generated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_reports_created ON ai_generated_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_training_active ON ai_training_examples(active,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_schedule_due ON ai_report_schedules(enabled,next_run_at);
INSERT INTO ai_configuration(id) VALUES(true) ON CONFLICT(id) DO NOTHING;
INSERT INTO ai_report_schedules(name,report_type,cadence_minutes,enabled,next_run_at) VALUES('Daily executive report','executive',1440,true,now()) ON CONFLICT(name) DO NOTHING;
