import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { businessGetSafe } from '@/lib/business';
import { LiveBusinessPulse } from './LiveBusinessPulse';

type Me = { permissions: string[]; isSuperAdmin?: boolean; user?: { name?: string } };

export async function BusinessShell({ children }: { children: ReactNode }) {
  const me = await businessGetSafe<Me>('/api/me');
  return (
    <div className="shell">
      <input id="mobileNavToggle" className="mobileNavToggle" type="checkbox" aria-label="Open business navigation" />
      <Sidebar permissions={me?.permissions ?? []} isSuperAdmin={Boolean(me?.isSuperAdmin)} />
      <main className="main">
        <Topbar name={me?.user?.name ? `Amaal Telecoms · ${me.user.name}` : 'Amaal Telecoms'} />
        <LiveBusinessPulse />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
