'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Brand } from '@/components/Brand';

export default function SetupPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('Amaal Telecoms');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <main className="authPage authPageSetup">
      <div className="authGlow authGlowOne" aria-hidden="true" />
      <div className="authGlow authGlowTwo" aria-hidden="true" />
      <form className="authCard authSetupCard" onSubmit={submit}>
        <div className="authHeader">
          <div className="authBrandRow">
            <Brand />
            <span className="authBadge">First setup</span>
          </div>
          <span className="authKicker">Amaal Telecoms</span>
        </div>

        <div className="authIntro">
          <p className="authEyebrow">Business administration</p>
          <h1>Create administrator</h1>
          <p>Create the first business administrator through the existing Amaal engine. Existing business records remain untouched.</p>
        </div>

        {error && (
          <div className="error authSetupError" role="alert">
            <strong>Setup could not be completed</strong>
            <span>{error}</span>
            {error.toLowerCase().includes('already configured') && (
              <Link href="/login">Return to secure sign in →</Link>
            )}
          </div>
        )}

        <div className="field"><label htmlFor="companyName">Business name</label><input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} required /></div>
        <div className="field"><label htmlFor="name">Administrator name</label><input id="name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
        <div className="field"><label htmlFor="address">Business address</label><input id="address" autoComplete="street-address" value={address} onChange={e => setAddress(e.target.value)} /></div>
        <div className="field"><label htmlFor="password">Create password</label><input id="password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <div className="field"><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /></div>

        <button className="primary authButton" disabled={busy}>
          {busy ? 'Creating account…' : 'Create administrator account'}
          {!busy && <span aria-hidden="true">→</span>}
        </button>

        <p className="note authNote">Your first administrator is created only when the business is ready for setup. Existing business records remain untouched.</p>
      </form>
    </main>
  );
}
