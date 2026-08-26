import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { businessGetSafe } from '@/lib/business';

type Me = { permissions: string[]; isSuperAdmin?: boolean; user?: { name?: string } };

export async function BusinessShell({ children }: { children: ReactNode }) {
  const me = await businessGetSafe<Me>('/api/me');
  return (
    <div className="shell">
      <Sidebar permissions={me?.permissions ?? []} />
      <main className="main">
        <Topbar name={me?.user?.name ? `Amaal Telecoms · ${me.user.name}` : 'Amaal Telecoms'} />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
