# Amaal Cloudflare R2 media architecture

Amaal keeps application code in GitHub, commerce data in Neon/PostgreSQL, and large public media in Cloudflare R2.

## Storage model

- `media_assets.storage = database` remains supported for legacy media.
- `media_assets.storage = r2` stores only metadata in Postgres and the binary object in R2.
- `media_assets.r2_bucket` and `media_assets.r2_key` identify the object.
- `media_assets.r2_url` is optional. It can remain blank until a custom image domain exists.
- When `r2_url` is blank, the application can proxy the object through its existing media route.

## Required environment variables

Set these only on the server/runtime (Vercel/Render/etc.), never in the browser or GitHub:

- `R2_ENDPOINT`
- `R2_BUCKET_NAME=amaal-product-images`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_PUBLIC_URL` is optional during development and should be set later to a production custom domain such as `https://images.amaaltelecoms.com`.

## Migration policy

Do not delete existing database-backed media during migration. Upload an exact byte-for-byte copy to R2, verify SHA-256, then update the media metadata to `storage='r2'`. The legacy database blob should only be removed after an independently verified backup and successful R2 verification.

Product image relationships (`product_images.media_id`) do not change during migration.

## Image quality

The migration must upload the original bytes. No resize, JPEG recompression, WebP conversion, or quality reduction is performed by the migration layer.

## ZIP/source architecture

Large image archives should not be committed to GitHub. The source project contains the R2 adapter, schema migration, migration scripts/documentation, and URL handling. Product images are uploaded to R2 separately.
