import fs from 'fs';
const server=fs.readFileSync(new URL('./server.js',import.meta.url),'utf8');
const web=fs.readFileSync(new URL('./web-and-hosting.js',import.meta.url),'utf8');
const failures=[];
function pass(name){console.log('PASS: '+name)}
function fail(name){console.log('FAIL: '+name);failures.push(name)}

if(server.includes("Access-Control-Allow-Origin','*")) fail('No wildcard CORS in backend'); else pass('No wildcard CORS in backend');
if(server.includes('function stripPublicSensitive') && /blocked=\/\^\(id\|.*_id\|.*cost.*\|purchase\.\*\|supplier\.\*\|warehouse\.\*\|serial\.\*\|imei\.\*\|barcode\|qr\.\*\|internal\.\*\|tax_rate\|promotion_id\|promotion_name\)/.test(server)) pass('Public sensitive-field projection exists'); else fail('Public sensitive-field projection missing');
if(server.includes("app.post('/api/logout',auth")) pass('Logout requires authentication'); else fail('Logout authentication guard missing');
if(server.includes("app.get('/api/sessions/all',auth,need('sessions.manage')")) pass('Global session listing requires sessions.manage'); else fail('Global session listing guard missing');
if(server.includes("app.delete('/api/sessions/user/:userId',auth,need('sessions.manage')")) pass('Global session revocation requires sessions.manage'); else fail('Global session revocation guard missing');
if(server.includes("UPDATE sessions SET revoked_at=now() WHERE user_id=$1") && server.includes("UPDATE trusted_devices SET revoked_at=now() WHERE user_id=$1")) pass('Password reset revokes sessions and trusted devices'); else fail('Password reset session revocation missing');
if(web.includes('stripPublicSensitive')) pass('Web-hosting public payload projection exists'); else fail('Web-hosting public payload projection missing');
if(server.includes("const bootstrap=['/api/setup','/api/login','/api/invitations/accept','/api/recovery/reset','/api/public/ai/ask']")) pass('CSRF bootstrap exceptions are explicit'); else fail('CSRF bootstrap list changed unexpectedly');
if(server.includes("res.status(403).json({error:'CSRF validation failed'})")) pass('CSRF validation enforced'); else fail('CSRF validation missing');
if(server.includes("res.status(429).json({error:'Too many sign-in attempts. Try again later.'}")) pass('Login IP rate limit enforced'); else fail('Login IP rate limit missing');
if(server.includes('Always return the same response to avoid account enumeration.')) pass('Password reset avoids account enumeration'); else fail('Password reset enumeration guard missing');
console.log(JSON.stringify({failures},null,2));
if(failures.length) process.exit(1);
