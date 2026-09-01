CREATE TABLE IF NOT EXISTS document_blobs(
 document_id uuid PRIMARY KEY REFERENCES documents(id) ON DELETE CASCADE, data bytea NOT NULL
);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Active';
ALTER TABLE documents ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS retention_until timestamptz;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verified_at timestamptz;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verified_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS version_no integer NOT NULL DEFAULT 1 CHECK(version_no>0);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS archived_at timestamptz;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS archived_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_status_check;
ALTER TABLE documents ADD CONSTRAINT documents_status_check CHECK(status IN ('Active','Expired','Archived'));
CREATE INDEX IF NOT EXISTS idx_documents_status_expiry ON documents(status,expires_at);
CREATE INDEX IF NOT EXISTS idx_documents_retention ON documents(retention_until);
CREATE INDEX IF NOT EXISTS idx_documents_tags ON documents USING GIN(tags);
CREATE TABLE IF NOT EXISTS document_versions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE, version_no integer NOT NULL CHECK(version_no>0), name text NOT NULL, mime_type text NOT NULL, size_bytes bigint NOT NULL CHECK(size_bytes>0), checksum_sha256 text NOT NULL, description text NOT NULL DEFAULT '', visibility text NOT NULL DEFAULT 'Private' CHECK(visibility IN ('Private','Internal','Public')), data bytea NOT NULL, created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(document_id,version_no), UNIQUE(document_id,checksum_sha256)
);
CREATE INDEX IF NOT EXISTS idx_document_versions_document ON document_versions(document_id,version_no DESC);
CREATE TABLE IF NOT EXISTS document_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE, event_type text NOT NULL, actor_id uuid REFERENCES users(id) ON DELETE SET NULL, detail text NOT NULL DEFAULT '', before_json jsonb, after_json jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_document_events_document ON document_events(document_id,created_at DESC);
INSERT INTO document_versions(document_id,version_no,name,mime_type,size_bytes,checksum_sha256,description,visibility,data,created_by,created_at)
SELECT d.id,1,d.name,d.mime_type,d.size_bytes,d.checksum_sha256,d.description,d.visibility,b.data,d.created_by,d.created_at
FROM documents d JOIN document_blobs b ON b.document_id=d.id
WHERE NOT EXISTS (SELECT 1 FROM document_versions v WHERE v.document_id=d.id);