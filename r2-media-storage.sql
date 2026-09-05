BEGIN;

ALTER TABLE media_assets
  ADD COLUMN IF NOT EXISTS r2_bucket text,
  ADD COLUMN IF NOT EXISTS r2_key text,
  ADD COLUMN IF NOT EXISTS r2_url text;

ALTER TABLE media_assets DROP CONSTRAINT IF EXISTS media_assets_storage_check;
ALTER TABLE media_assets ADD CONSTRAINT media_assets_storage_check CHECK(storage IN ('database','r2'));

ALTER TABLE media_assets ALTER COLUMN data DROP NOT NULL;

ALTER TABLE media_versions
  ADD COLUMN IF NOT EXISTS storage text NOT NULL DEFAULT 'database',
  ADD COLUMN IF NOT EXISTS r2_bucket text,
  ADD COLUMN IF NOT EXISTS r2_key text,
  ADD COLUMN IF NOT EXISTS r2_url text;

ALTER TABLE media_versions DROP CONSTRAINT IF EXISTS media_versions_storage_check;
ALTER TABLE media_versions ADD CONSTRAINT media_versions_storage_check CHECK(storage IN ('database','r2'));
ALTER TABLE media_versions ALTER COLUMN data DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_media_assets_r2_key ON media_assets(r2_bucket,r2_key) WHERE storage='r2';
CREATE INDEX IF NOT EXISTS idx_media_versions_r2_key ON media_versions(r2_bucket,r2_key) WHERE storage='r2';

COMMENT ON COLUMN media_assets.storage IS 'database for legacy/internal media, r2 for object storage media';
COMMENT ON COLUMN media_assets.r2_key IS 'Object key in the configured Cloudflare R2 bucket';
COMMENT ON COLUMN media_assets.r2_url IS 'Optional public/custom-domain URL; blank means the application proxy serves the object';

COMMIT;
