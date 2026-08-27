-- Amaal Telecoms: Returns/Warranty/Service physical-unit integrity.
-- Additive and repeat-safe. Never reset, truncate, drop or delete business records.
CREATE UNIQUE INDEX IF NOT EXISTS uq_warranty_active_unit_issue
ON public.warranty_claims (serialized_unit_id, lower(trim(issue)))
WHERE serialized_unit_id IS NOT NULL
  AND status IN ('Submitted','Under Review','Approved','In Repair','Ready for Collection');

CREATE INDEX IF NOT EXISTS idx_return_lines_serialized_unit
ON public.return_lines (serialized_unit_id, created_at DESC)
WHERE serialized_unit_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_warranty_claims_serialized_created
ON public.warranty_claims (serialized_unit_id, created_at DESC)
WHERE serialized_unit_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_repair_jobs_claim_created
ON public.repair_jobs (claim_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_serialized_unit_history_source
ON public.serialized_unit_status_history (source_type, source_id, created_at DESC)
WHERE source_id IS NOT NULL;

ALTER TABLE public.serialized_unit_status_history
  ADD CONSTRAINT serialized_unit_history_status_check
  CHECK (length(trim(to_status)) > 0 AND (from_status IS NULL OR length(trim(from_status)) > 0)) NOT VALID;

ALTER TABLE public.serialized_unit_status_history
  VALIDATE CONSTRAINT serialized_unit_history_status_check;
