import fs from 'fs';
import path from 'path';

const root = path.dirname(new URL(import.meta.url).pathname);
const required = [
  'server.js','schema.sql','package.json','public/index.html','public/app.js',
  'suppliers-procurement.js','delivery-logistics.js','warranty-repairs.js',
  'document-management.js','business-intelligence.js','ai-business-intelligence.js','integration-hub.js'
];
const errors=[];
for(const f of required) if(!fs.existsSync(path.join(root,f))) errors.push(`Missing required file: ${f}`);
const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
const schema=fs.readFileSync(path.join(root,'schema.sql'),'utf8');
const app=fs.readFileSync(path.join(root,'public/app.js'),'utf8');
if(/procurement_requisitions/.test(server)) errors.push('Runtime contains forbidden legacy procurement_requisitions reference.');
if(!/CREATE TABLE IF NOT EXISTS purchase_requisitions\s*\(/i.test(schema)) errors.push('Canonical purchase_requisitions table is missing from schema.');
if(!/const MFA_LOGIN_ENABLED=false;/.test(server)) errors.push('Build is not configured for temporary MFA-disabled development login.');
if(/Authenticator code \(if enabled\)/.test(app) || /MFA is required before signing in/.test(app)) errors.push('Login UI still contains MFA enforcement copy.');
if(!/field\('Administrator email'/.test(app) || !/field\('Password'/.test(app)) errors.push('Email/password login fields are missing.');
if(/node_modules/.test(fs.readdirSync(root).join(','))) errors.push('node_modules must not be packaged.');
if(errors.length){console.error('RENDER PREFLIGHT FAILED');for(const e of errors) console.error('- '+e);process.exit(1)}
console.log('RENDER PREFLIGHT PASS');
console.log('Canonical procurement table: purchase_requisitions');
console.log('Temporary build login: email + password only');
console.log('Legacy procurement runtime reference: absent');
