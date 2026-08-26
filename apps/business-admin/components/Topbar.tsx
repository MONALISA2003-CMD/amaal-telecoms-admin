'use client';
import { useRouter } from 'next/navigation';

export function Topbar({ name = 'Amaal Telecoms' }: { name?: string }) {
  const router = useRouter();
  async function logout() {
    await fetch('/api/session/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }
  return <header className="topbar"><div><span className="eyebrow">Business workspace</span><h1>{name}</h1></div><div className="topActions"><button className="searchButton" onClick={() => document.getElementById('global-search')?.focus()}>Search</button><button className="avatar" aria-label="Account menu" onClick={logout}>A</button></div></header>;
}
