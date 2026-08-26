'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navGroups } from '@/lib/labels';
import { Brand } from './Brand';

export function Sidebar() {
  const pathname = usePathname();
  return <aside className="sidebar"><Brand/><nav aria-label="Business navigation">{navGroups.map(item => <Link key={item.href} className={pathname.startsWith(item.href) ? 'active' : ''} href={item.href}>{item.label}</Link>)}</nav><div className="sidebarFoot">Business workspace<br/><span>Technical controls remain in the Console</span></div></aside>;
}
