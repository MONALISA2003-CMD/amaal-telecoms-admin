'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from '@/components/Brand';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/session/setup/status', { cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'We could not check account setup status.');
        if (active && data.setupRequired) router.replace('/setup');
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'We could not check account setup status.');
      })
      .finally(() => {
        if (active) setCheckingSetup(false);
      });
    return () => { active = false; };
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not sign you in.');
      router.replace('/overview');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not sign you in.');
    } finally {
      setBusy(false);
    }
  }

  if (checkingSetup) {
    return (
      <main className="authPage">
        <section className="authCard authCardCompact">
          <div className="goldOrb" aria-hidden="true" />
          <Brand />
          <p className="authLoading">Checking Amaal account setup…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="authPage">
      <div className="authGlow authGlowOne" aria-hidden="true" />
      <div className="authGlow authGlowTwo" aria-hidden="true" />
      <form className="authCard" onSubmit={submit}>
        <div className="authHeader">
          <div className="authBrandRow">
            <Brand />
            <span className="authBadge">Business</span>
          </div>
          <span className="authKicker">Amaal Telecoms</span>
        </div>

        <div className="authIntro">
          <p className="authEyebrow">Business administration</p>
          <h1>Welcome back</h1>
          <p>Sign in to manage Amaal Telecoms with secure, role-based access.</p>
        </div>

        {error && <div className="error" role="alert">{error}</div>}

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button className="primary authButton" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
          {!busy && <span aria-hidden="true">→</span>}
        </button>

        <div className="authDivider"><span>Protected business access</span></div>
        <p className="note authNote">Your Amaal role controls what you can do in the business workspace. Business records remain protected at all times.</p>
      </form>
    </main>
  );
}
