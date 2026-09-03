const fs=require('fs');
const path=require('path');
const root=process.cwd();
const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
const schema=fs.readFileSync(path.join(root,'customer-auth.sql'),'utf8');
const required=[
  ["customer credentials table",schema.includes('CREATE TABLE IF NOT EXISTS customer_credentials')],
  ["customer session table",schema.includes('CREATE TABLE IF NOT EXISTS customer_auth_sessions')],
  ["customer auth event table",schema.includes('CREATE TABLE IF NOT EXISTS customer_auth_events')],
  ["registration endpoint",server.includes("/api/public/auth/register")],
  ["login endpoint",server.includes("/api/public/auth/login")],
  ["existing customer activation endpoint",server.includes("/api/public/auth/claim")],
  ["secure customer session cookie",server.includes('amaal_customer_session=')&&server.includes('HttpOnly; Secure; SameSite=None')],
  ["customer CSRF protection",server.includes('X-Amaal-Customer-CSRF')&&server.includes('requireCustomerCsrf')],
  ["device-bound customer sessions",server.includes('customer_device')&&server.includes('device_hash')],
  ["session management",server.includes('/api/public/auth/sessions/:id')&&server.includes('/api/public/auth/logout-all')],
  ["profile management",server.includes('/api/public/auth/profile')],
  ["password change",server.includes('/api/public/auth/password')],
  ["legacy customer token compatibility",server.includes('publicAccountCustomer')&&server.includes('publicCustomer(req)')],
  ["guest checkout preserved",server.includes("Public storefront checkout: guest checkout only")],
  ["payment gateway not added",!server.includes("/api/public/auth/payment")&&schema.indexOf('payment')===-1],
  ["no destructive auth migration",!/DROP\\s+TABLE|TRUNCATE/i.test(schema)],
];
let failed=0;for(const [label,ok] of required){console.log(`${ok?'PASS':'FAIL'} — ${label}`);if(!ok)failed++;}
process.exitCode=failed?1:0;
