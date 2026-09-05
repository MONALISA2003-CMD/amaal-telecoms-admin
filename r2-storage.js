import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const bucket = String(process.env.R2_BUCKET_NAME || '').trim();
const endpoint = String(process.env.R2_ENDPOINT || '').trim();
const publicUrl = String(process.env.R2_PUBLIC_URL || '').trim().replace(/\/$/, '');

export const r2Configured = Boolean(bucket && endpoint && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY);
export const r2Bucket = bucket;

const client = r2Configured ? new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
}) : null;

function cleanKey(v) {
  return String(v || '').replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\.(?=\/|$)/g, '').replace(/\/+/g, '/');
}

export function r2KeyForMedia({ id, filename }) {
  const safeName = String(filename || 'file').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'file';
  return `media/${id}/${safeName}`;
}

export function r2ObjectUrl(key) {
  const k = cleanKey(key);
  return publicUrl ? `${publicUrl}/${encodeURI(k).replace(/#/g, '%23')}` : '';
}

export async function putR2Object({ key, body, contentType, contentLength, cacheControl }) {
  if (!r2Configured) throw new Error('R2 storage is not configured');
  const safeKey = cleanKey(key);
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: safeKey,
    Body: body,
    ContentType: contentType,
    ContentLength: contentLength,
    CacheControl: cacheControl || 'public,max-age=31536000,immutable',
  }));
  return { key: safeKey, url: r2ObjectUrl(safeKey) || null };
}

export async function getR2Object(key) {
  if (!r2Configured) throw new Error('R2 storage is not configured');
  const out = await client.send(new GetObjectCommand({ Bucket: bucket, Key: cleanKey(key) }));
  return out;
}
