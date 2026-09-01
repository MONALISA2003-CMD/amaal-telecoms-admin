'use client';

import { Bell, Command, Menu, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Topbar({ name = 'Amaal Telecoms' }: { name?: string }) {
  const router = useRouter();
  async function logout() {
    await fetch('/api/session/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }
  return <header className="topbar">
    <label className="mobileMenuButton" htmlFor="mobileNavToggle" aria-label="Open business navigation"><Menu size={20} /></label>
    <div><span className="eyebrow">Business workspace</span><h1>{name}</h1></div>
    <div className="topActions">
      <button className="searchButton" onClick={() => router.push('/search')}><Search size={15} /> Search <kbd><Command size={10} />K</kbd></button>
      <button className="topIconButton" aria-label="Notifications"><Bell size={17} /><i /></button>
      <button className="avatar" aria-label="Sign out" onClick={logout}>A</button>
    </div>
  </header>;
}
