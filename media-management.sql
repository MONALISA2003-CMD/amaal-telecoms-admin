-- Phase 40A: enterprise media management. Additive only.
CREATE TABLE IF NOT EXISTS media_folders(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 parent_id uuid REFERENCES media_folders(id) ON DELETE SET NULL,
 description text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(parent_id,name)
);
CREATE TABLE IF NOT EXISTS media_assets(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 filename text NOT NULL,
 original_filename text NOT NULL,
 mime_type text NOT NULL,
 extension text NOT NULL DEFAULT '',
 size_bytes bigint NOT NULL CHECK(size_bytes>0 AND size_bytes<=15728640),
 width integer,
 height integer,
 checksum_sha256 text NOT NULL,
 storage text NOT NULL DEFAULT 'database' CHECK(storage IN ('database')),
 data bytea NOT NULL,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Archived')),
 visibility text NOT NULL DEFAULT 'Private' CHECK(visibility IN ('Private','Internal','Public')),
 folder_id uuid REFERENCES media_folders(id) ON DELETE SET NULL,
 title text NOT NULL DEFAULT '',
 description text NOT NULL DEFAULT '',
 alt_text text NOT NULL DEFAULT '',
 caption text NOT NULL DEFAULT '',
 license text NOT NULL DEFAULT '',
 uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(checksum_sha256)
);
CREATE TABLE IF NOT EXISTS media_versions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 media_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
 version_no integer NOT NULL CHECK(version_no>0),
 filename text NOT NULL,
 mime_type text NOT NULL,
 extension text NOT NULL DEFAULT '',
 size_bytes bigint NOT NULL CHECK(size_bytes>0 AND size_bytes<=15728640),
 width integer,
 height integer,
 checksum_sha256 text NOT NULL,
 data bytea NOT NULL,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(media_id,version_no),
 UNIQUE(media_id,checksum_sha256)
);
CREATE TABLE IF NOT EXISTS media_tags(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL UNIQUE,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS media_tag_links(
 media_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
 tag_id uuid NOT NULL REFERENCES media_tags(id) ON DELETE CASCADE,
 PRIMARY KEY(media_id,tag_id)
);
CREATE TABLE IF NOT EXISTS media_relationships(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 media_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
 entity_type text NOT NULL,
 entity_id uuid NOT NULL,
 relation_type text NOT NULL DEFAULT 'attachment',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(media_id,entity_type,entity_id,relation_type)
);
CREATE TABLE IF NOT EXISTS media_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 media_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
 event_type text NOT NULL,
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 detail text NOT NULL DEFAULT '',
 before_json jsonb,
 after_json jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_media_assets_created ON media_assets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON media_assets(folder_id,status);
CREATE INDEX IF NOT EXISTS idx_media_assets_mime ON media_assets(mime_type,status);
CREATE INDEX IF NOT EXISTS idx_media_assets_checksum ON media_assets(checksum_sha256);
CREATE INDEX IF NOT EXISTS idx_media_assets_search ON media_assets USING gin(to_tsvector('simple',coalesce(filename,'')||' '||coalesce(title,'')||' '||coalesce(description,'')||' '||coalesce(alt_text,'')));
CREATE INDEX IF NOT EXISTS idx_media_relationships_entity ON media_relationships(entity_type,entity_id);
CREATE INDEX IF NOT EXISTS idx_media_events_media ON media_events(media_id,created_at DESC);
