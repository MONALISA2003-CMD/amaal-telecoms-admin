import fs from 'fs';
import path from 'path';

const root = path.dirname(new URL(import.meta.url).pathname);
const required = [
  'server.js','schema.sql','package.json','public/index.html','public/app.js',
  'suppliers-procurement.js','customers-crm.js','sales-pos.js','delivery-logistics.js','warranty-repairs.js',
  'document-management.js','business-intelligence.js','ai-business-intelligence.js','integration-hub.js',
  'public/password-reset.html','public/password-reset.js','public/invite.html','public/invite.js'
];
const errors=[];
for(const f of required) if(!fs.existsSync(path.join(root,f))) errors.push(`Missing required file: ${f}`);
const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
const schema=fs.readFileSync(path.join(root,'schema.sql'),'utf8');
const app=fs.readFileSync(path.join(root,'public/app.js'),'utf8');
if(/procurement_requisitions/.test(server)) errors.push('Runtime contains forbidden legacy procurement_requisitions reference.');
if(!/CREATE TABLE IF NOT EXISTS purchase_requisitions\s*\(/i.test(schema)) errors.push('Canonical purchase_requisitions table is missing from schema.');
if(!/CREATE TABLE IF NOT EXISTS sales_quotes\s*\(/i.test(schema)) errors.push('Sales quotations schema is missing.');
if(!/CREATE TABLE IF NOT EXISTS till_shifts\s*\(/i.test(schema)) errors.push('Till shift schema is missing.');
if(!/CREATE TABLE IF NOT EXISTS sale_receipts\s*\(/i.test(schema)) errors.push('Receipt lifecycle schema is missing.');
if(!/registerSalesPos\(\{app,auth,need,q,pool,audit,changeStock\}\)/.test(server)) errors.push('Sales/POS registration is missing.');
if(!/const MFA_LOGIN_ENABLED=false;/.test(server)) errors.push('Build is not configured for temporary MFA-disabled development login.');
if(/Authenticator code \(if enabled\)/.test(app) || /MFA is required before signing in/.test(app)) errors.push('Login UI still contains MFA enforcement copy.');
if(!/field\('Administrator email'/.test(app) || !/field\('Password'/.test(app)) errors.push('Email/password login fields are missing.');
if(!/Forgot password\?/.test(app)) errors.push('Forgot-password entry point is missing from login UI.');
if(!/app.post\('\/api\/password\/forgot'/.test(server) || !/app.post\('\/api\/password\/reset'/.test(server)) errors.push('Password recovery API is incomplete.');
if(!/CREATE TABLE IF NOT EXISTS password_reset_tokens/.test(schema)) errors.push('Password reset token table is missing.');
if(!/app.delete\('\/api\/roles\/:id'/.test(server)) errors.push('Custom role deletion lifecycle is missing.');
if(!/app.delete\('\/api\/departments\/:id'/.test(server)) errors.push('Department deletion lifecycle is missing.');
if(!/app.delete\('\/api\/users\/:id'/.test(server)) errors.push('Super Admin user removal endpoint is missing.');
if(/node_modules/.test(fs.readdirSync(root).join(','))) errors.push('node_modules must not be packaged.');
const yamlFiles=[];(function walk(d){for(const name of fs.readdirSync(d,{withFileTypes:true})){const full=path.join(d,name.name);if(name.isDirectory())walk(full);else if(/\.ya?ml$/i.test(name.name))yamlFiles.push(path.relative(root,full));}})(root);if(yamlFiles.length)errors.push(`YAML files present: ${yamlFiles.join(', ')}`);
if(errors.length){console.error('RENDER PREFLIGHT FAILED');for(const e of errors) console.error('- '+e);process.exit(1)}
console.log('RENDER PREFLIGHT PASS');
console.log('Canonical procurement table: purchase_requisitions');
console.log('Temporary build login: email + password only');
console.log('Legacy procurement runtime reference: absent');
