#!/usr/bin/env node
/**
 * Non-destructive R2 Phase 1 connection smoke test.
 * Creates one temporary object, reads it back, verifies SHA-256 and deletes only that object.
 * No Neon/database writes are performed.
 */
import crypto from 'node:crypto';
import { DeleteObjectCommand, GetObjectCommand, HeadBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const required = ['R2_ENDPOINT','R2_BUCKET_NAME','R2_ACCESS_KEY_ID','R2_SECRET_ACCESS_KEY'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing R2 environment variables: ${missing.join(', ')}`);
  process.exit(2);
}

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const body = Buffer.from(`Amaal R2 phase-1 smoke test ${new Date().toISOString()}\n`);
const checksum = crypto.createHash('sha256').update(body).digest('hex');
const key = `__amaal-r2-smoke-test/${crypto.randomUUID()}.txt`;

let created = false;
try {
  await client.send(new HeadBucketCommand({ Bucket: process.env.R2_BUCKET_NAME }));
  console.log('PASS bucket access');

  await client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: 'text/plain; charset=utf-8',
    ContentLength: body.length,
    Metadata: { purpose: 'amaal-r2-phase-1-smoke-test' },
  }));
  created = true;
  console.log(`PASS upload ${key}`);

  const out = await client.send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }));
  const downloaded = Buffer.from(await out.Body.transformToByteArray());
  const downloadedChecksum = crypto.createHash('sha256').update(downloaded).digest('hex');
  if (downloadedChecksum !== checksum || !downloaded.equals(body)) {
    throw new Error(`Checksum mismatch: expected ${checksum}, got ${downloadedChecksum}`);
  }
  console.log(`PASS read + SHA-256 ${checksum}`);
} finally {
  if (created) {
    await client.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }));
    console.log(`PASS cleanup ${key}`);
  }
}

console.log('R2 PHASE 1: PASS — connection, upload, read, checksum and cleanup verified.');
