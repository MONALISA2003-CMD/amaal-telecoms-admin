-- Document Management: durable database-backed uploads/downloads
CREATE TABLE IF NOT EXISTS documents(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_type text NOT NULL DEFAULT 'General', entity_id uuid, name text NOT NULL, mime_type text NOT NULL, size_bytes bigint NOT NULL CHECK(size_bytes>0), description text NOT NULL DEFAULT '', visibility text NOT NULL DEFAULT 'Private' CHECK(visibility IN ('Private','Internal','Public')), checksum_sha256 text NOT NULL, storage text NOT NULL DEFAULT 'database' CHECK(storage='database'), created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_documents_entity ON documents(entity_type,entity_id,created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS uq_documents_checksum_entity ON documents(entity_type,entity_id,checksum_sha256);
CREATE TABLE IF NOT EXISTS document_blobs(
 document_id uuid PRIMARY KEY REFERENCES documents(id) ON DELETE CASCADE, data bytea NOT NULL
);
