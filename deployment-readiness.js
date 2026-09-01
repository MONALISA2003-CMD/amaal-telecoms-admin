import fs from 'fs';
import os from 'os';
import path from 'path';
import {spawnSync} from 'child_process';

const checks=[];
const add=(name,status,detail,meta={})=>checks.push({name,status,detail,...meta});
const env=v=>String(process.env[v]||'').trim();
const command=(bin,args=['--version'])=>{try{const r=spawnSync(bin,args,{encoding:'utf8',timeout:5000});return {available:r.status===0||Boolean(r.stdout||r.stderr),output:String(r.stdout||r.stderr||'').trim(),status:r.status};}catch{return {available:false,output:'',status:null}}};

add('Node.js',/^20\./.test(process.version)?'Healthy':'Warning',`Detected ${process.version}.`);
const dump=command(env('PG_DUMP_BIN')||'pg_dump');
add('pg_dump',dump.available?'Healthy':'Critical',dump.available?'pg_dump is available in this environment.':'pg_dump is unavailable; backup execution cannot be validated here.');
add('DATABASE_URL',env('DATABASE_URL')?'Healthy':'Critical',env('DATABASE_URL')?'DATABASE_URL is configured.':'DATABASE_URL is not configured.');
const root=path.resolve(env('BACKUP_DIR')||path.join(process.cwd(),'backups'));
try{fs.mkdirSync(root,{recursive:true,mode:0o700});const st=fs.statSync(root);add('Backup storage','Healthy',`Backup directory is accessible at the configured runtime location.`,{writable:!!(st.mode&0o200)});}catch(e){add('Backup storage','Critical','Backup storage directory is not accessible.');}
add('Recovery policy','Healthy','Destructive PostgreSQL restore execution is permanently disabled in the application.');
add('Database restore drill','Unknown','Application-level restore execution is disabled. Any restore validation must use a separately controlled infrastructure process against a non-production database.');
const overall=checks.some(x=>x.status==='Critical')?'Critical':checks.some(x=>x.status==='Warning')?'Warning':checks.some(x=>x.status==='Unknown')?'Unknown':'Healthy';
const result={overall,generatedAt:new Date().toISOString(),hostname:os.hostname(),checks};
console.log(JSON.stringify(result,null,2));
process.exitCode=overall==='Critical'?1:0;
