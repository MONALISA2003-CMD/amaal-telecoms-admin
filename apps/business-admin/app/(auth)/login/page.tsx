'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from '@/components/Brand';

export default function LoginPage() {
  const router = useRouter();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [code,setCode]=useState(''); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError('');try{const r=await fetch('/api/session/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,code:code||undefined})});const d=await r.json();if(!r.ok)throw new Error(d.error||'We could not sign you in.');router.replace('/overview');router.refresh()}catch(err){setError(err instanceof Error?err.message:'We could not sign you in.')}finally{setBusy(false)}}
  return <main className="loginPage"><form className="loginCard" onSubmit={submit}><Brand/><h1>Welcome back</h1><p>Sign in to manage Amaal Telecoms.</p>{error&&<div className="error" role="alert">{error}</div>}<div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required /></div><div className="field"><label htmlFor="password">Password</label><input id="password" type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required /></div><div className="field"><label htmlFor="code">Security code <span className="note">(only when requested)</span></label><input id="code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={e=>setCode(e.target.value)} /></div><button className="primary" disabled={busy}>{busy?'Signing in…':'Sign in'}</button><p className="note">Business access is controlled by your Amaal role. Technical administration remains in the technical console.</p></form></main>;
}
