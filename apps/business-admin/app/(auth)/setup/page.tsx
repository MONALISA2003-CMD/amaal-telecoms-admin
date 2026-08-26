'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from '@/components/Brand';

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('Amaal Telecoms');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/session/setup/status', { cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'We could not check setup status.');
        if (active && data.configured) router.replace('/login');
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'We could not check setup status.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/session/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, name, email, password, phone, address }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'We could not complete the initial setup.');
      router.replace('/overview');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not complete the initial setup.');
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <main className="loginPage"><section className="loginCard"><Brand/><p>Preparing first-time setup…</p></section></main>;
  }

  return (
    <main className="loginPage">
      <form className="loginCard" onSubmit={submit}>
        <Brand/>
        <h1>Set up Amaal Telecoms</h1>
        <p>Create the first business administrator account. Your existing business data remains in the existing Amaal engine.</p>
        {error && <div className="error" role="alert">{error}</div>}

        <div className="field"><label htmlFor="companyName">Business name</label><input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} required /></div>
        <div className="field"><label htmlFor="name">Administrator name</label><input id="name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
        <div className="field"><label htmlFor="address">Business address</label><input id="address" autoComplete="street-address" value={address} onChange={e => setAddress(e.target.value)} /></div>
        <div className="field"><label htmlFor="password">Create password</label><input id="password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <div className="field"><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /></div>

        <button className="primary" disabled={busy}>{busy ? 'Setting up…' : 'Create administrator account'}</button>
        <p className="note">This creates the first administrator through the existing Amaal setup service. No new business database is created.</p>
      </form>
    </main>
  );
}
