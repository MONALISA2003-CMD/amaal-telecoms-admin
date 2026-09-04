import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import pg from 'pg';

const { Pool } = pg;
const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, 'amaal_master_catalogue.json'), 'utf8'));
const mediaRoot = path.join(root, 'apps/public-web/public/products/amaal-master');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined });

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  return ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
}

async function syncImage(client, productSlug, imageFile, title) {
  if (!imageFile) return { status: 'no-image' };
  const filePath = path.join(mediaRoot, imageFile);
  if (!fs.existsSync(filePath)) throw new Error(`Missing image asset: ${filePath}`);
  const bytes = fs.readFileSync(filePath);
  const checksum = crypto.createHash('sha256').update(bytes).digest('hex');
  const mime = mimeFor(imageFile);

  const product = (await client.query('SELECT id FROM products WHERE slug=$1 LIMIT 1', [productSlug])).rows[0];
  if (!product) return { status: 'product-missing' };

  const media = (await client.query(`
    INSERT INTO media_assets(filename,original_filename,mime_type,extension,size_bytes,checksum_sha256,data,status,visibility,title,alt_text,caption)
    VALUES($1,$1,$2,$3,$4,$5,$6,'Active','Public',$7,$7,$7)
    ON CONFLICT(checksum_sha256) DO UPDATE
      SET status='Active', visibility='Public', updated_at=now()
    RETURNING id
  `, [imageFile, mime, path.extname(imageFile).slice(1), bytes.length, checksum, bytes, title])).rows[0];

  const existing = (await client.query(
    'SELECT id FROM product_images WHERE product_id=$1 AND media_id=$2 LIMIT 1',
    [product.id, media.id]
  )).rows[0];

  if (!existing) {
    const hasPrimary = (await client.query(
      'SELECT 1 FROM product_images WHERE product_id=$1 AND is_primary=true LIMIT 1',
      [product.id]
    )).rowCount > 0;
    await client.query(`
      INSERT INTO product_images(product_id,media_id,url,alt_text,sort_order,is_primary)
      VALUES($1,$2,$3,$4,COALESCE((SELECT max(sort_order)+1 FROM product_images WHERE product_id=$1),0),$5)
    `, [product.id, media.id, `/products/amaal-master/${imageFile}`, `${title} product image`, !hasPrimary]);
  }

  await client.query(`
    INSERT INTO media_relationships(media_id,entity_type,entity_id,relation_type)
    VALUES($1,'Product',$2,'attachment')
    ON CONFLICT(media_id,entity_type,entity_id,relation_type) DO NOTHING
  `, [media.id, product.id]);

  return { status: 'synced', productId: product.id, mediaId: media.id };
}

async function main() {
  const client = await pool.connect();
  const results = [];
  try {
    await client.query('BEGIN');
    for (const group of [...data.phones, ...data.audio]) {
      results.push({
        slug: group.slug,
        ...(await syncImage(client, group.slug, group.imageFile, group.name))
      });
    }
    await client.query('COMMIT');
    console.table(results);
    console.log(`Media sync complete: ${results.filter(x => x.status === 'synced').length} images linked.`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
