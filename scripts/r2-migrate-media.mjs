#!/usr/bin/env node
/**
 * Safe R2 media migration helper.
 *
 * Usage:
 *   node scripts/r2-migrate-media.mjs /path/to/extracted/media [--dry-run]
 *
 * It intentionally does not delete database media. The production migration should
 * verify SHA-256 and object existence before switching a media record to R2.
 * Filename-to-product matching remains an explicit/manual responsibility when
 * ambiguity exists.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import pg from 'pg';
import { putR2Object, r2Configured, r2Bucket, r2KeyForMedia } from '../r2-storage.js';

const input = process.argv[2];
const dryRun = process.argv.includes('--dry-run');
if (!input) throw new Error('Usage: node scripts/r2-migrate-media.mjs <extracted-directory> [--dry-run]');
if (!r2Configured && !dryRun) throw new Error('R2 is not configured. Set server-side R2 environment variables first.');
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const allowed = new Set(['.jpg','.jpeg','.png','.webp','.gif']);
function hash(bytes){return crypto.createHash('sha256').update(bytes).digest('hex')}
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(allowed.has(path.extname(e.name).toLowerCase()))out.push(p)}return out}
try {
  const files = await walk(path.resolve(input));
  console.log(`Found ${files.length} image files.`);
  for (const file of files) {
    const bytes = await fs.readFile(file);
    const checksum = hash(bytes);
    const existing = (await pool.query('SELECT id,filename,storage,r2_key FROM media_assets WHERE checksum_sha256=$1 LIMIT 1',[checksum])).rows[0];
    if (existing) { console.log(`SKIP ${file} -> media ${existing.id} (${existing.storage})`); continue; }
    if (dryRun) { console.log(`DRY RUN ${file} (${bytes.length} bytes, sha256 ${checksum})`); continue; }
    console.log(`UNMATCHED ${file}: exact media record not found; no upload performed.`);
  }
} finally { await pool.end(); }
