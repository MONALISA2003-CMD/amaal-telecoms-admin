-- Web & Hosting: controlled public-web management, staging, publishing, domains, redirects and media
CREATE TABLE IF NOT EXISTS web_sites(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, slug text UNIQUE NOT NULL,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Maintenance','Disabled')),
 primary_domain text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '',
 default_locale text NOT NULL DEFAULT 'en-UG', default_currency text NOT NULL DEFAULT 'UGX',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_pages(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 title text NOT NULL, slug text NOT NULL, template text NOT NULL DEFAULT 'standard', status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','In Review','Approved','Published','Archived')),
 excerpt text NOT NULL DEFAULT '', body_json jsonb NOT NULL DEFAULT '{}'::jsonb, seo_title text NOT NULL DEFAULT '', seo_description text NOT NULL DEFAULT '', canonical_url text NOT NULL DEFAULT '', noindex boolean NOT NULL DEFAULT false,
 version integer NOT NULL DEFAULT 1, published_at timestamptz, created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS web_navigation(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 menu_key text NOT NULL, label text NOT NULL, url text NOT NULL, sort_order int NOT NULL DEFAULT 0, parent_id uuid REFERENCES web_navigation(id) ON DELETE SET NULL,
 open_new_tab boolean NOT NULL DEFAULT false, enabled boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_banners(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 title text NOT NULL, subtitle text NOT NULL DEFAULT '', image_media_id uuid, link_url text NOT NULL DEFAULT '', placement text NOT NULL DEFAULT 'home-hero', status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Scheduled','Published','Archived')),
 starts_at timestamptz, ends_at timestamptz, sort_order int NOT NULL DEFAULT 0, created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_content_blocks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 key text NOT NULL, title text NOT NULL DEFAULT '', content_json jsonb NOT NULL DEFAULT '{}'::jsonb, status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Approved','Published','Archived')),
 version int NOT NULL DEFAULT 1, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(site_id,key)
);
CREATE TABLE IF NOT EXISTS web_domains(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 hostname text UNIQUE NOT NULL, type text NOT NULL DEFAULT 'Custom' CHECK(type IN ('Primary','Custom','Redirect')),
 verification_token text NOT NULL DEFAULT '', verified_at timestamptz, ssl_status text NOT NULL DEFAULT 'Pending' CHECK(ssl_status IN ('Pending','Provisioned','Error')),
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Active','Disabled')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_redirects(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 source_path text NOT NULL, destination_url text NOT NULL, status_code int NOT NULL DEFAULT 301 CHECK(status_code IN (301,302,307,308)), enabled boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(site_id,source_path)
);
CREATE TABLE IF NOT EXISTS web_media(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid REFERENCES web_sites(id) ON DELETE SET NULL,
 filename text NOT NULL, mime_type text NOT NULL, size_bytes int NOT NULL CHECK(size_bytes>0 AND size_bytes<=5242880), alt_text text NOT NULL DEFAULT '', storage text NOT NULL DEFAULT 'database', data_base64 text NOT NULL,
 status text NOT NULL DEFAULT 'Private' CHECK(status IN ('Private','Published','Archived')), uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_publish_releases(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 release_name text NOT NULL, environment text NOT NULL DEFAULT 'Staging' CHECK(environment IN ('Staging','Production')), status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Approved','Published','Rolled Back')),
 notes text NOT NULL DEFAULT '', snapshot_json jsonb NOT NULL DEFAULT '{}'::jsonb, created_by uuid REFERENCES users(id) ON DELETE SET NULL, approved_by uuid REFERENCES users(id) ON DELETE SET NULL, published_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), approved_at timestamptz, published_at timestamptz
);
CREATE TABLE IF NOT EXISTS web_publish_queue(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 resource_type text NOT NULL, resource_id uuid NOT NULL, action text NOT NULL CHECK(action IN ('publish','unpublish','archive')),
 requested_by uuid REFERENCES users(id) ON DELETE SET NULL, status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Executed','Rejected')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL, reviewed_at timestamptz, executed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_settings(
 site_id uuid PRIMARY KEY REFERENCES web_sites(id) ON DELETE CASCADE,
 settings_json jsonb NOT NULL DEFAULT '{}'::jsonb, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_web_pages_site_status ON web_pages(site_id,status);
CREATE INDEX IF NOT EXISTS idx_web_banners_site_status ON web_banners(site_id,status);
CREATE INDEX IF NOT EXISTS idx_web_publish_queue_status ON web_publish_queue(site_id,status);
CREATE INDEX IF NOT EXISTS idx_web_media_site_status ON web_media(site_id,status);
