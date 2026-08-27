'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Boxes,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Globe2,
  LayoutDashboard,
  LifeBuoy,
  PackageCheck,
  Search,
  Settings2,
  ShoppingCart,
  Truck,
  Users,
  WalletCards,
} from 'lucide-react';
import { navGroups } from '@/lib/labels';
import { Brand } from './Brand';

const icons: Record<string, typeof LayoutDashboard> = {
  Overview: LayoutDashboard,
  Sales: ShoppingCart,
  Products: Boxes,
  Stock: PackageCheck,
  Purchasing: ClipboardList,
  Customers: Users,
  Orders: ClipboardList,
  Finance: CircleDollarSign,
  Credit: WalletCards,
  Delivery: Truck,
  Service: LifeBuoy,
  Website: Globe2,
  Reports: BarChart3,
  Team: Users,
  'Business Settings': Settings2,
};

const groups = [
  { label: 'Command', items: ['Overview', 'Reports'] },
  { label: 'Commerce', items: ['Sales', 'Products', 'Orders', 'Customers'] },
  { label: 'Operations', items: ['Stock', 'Purchasing', 'Delivery', 'Service'] },
  { label: 'Money', items: ['Finance', 'Credit'] },
  { label: 'Business', items: ['Website', 'Team', 'Business Settings'] },
];

export function Sidebar({ permissions = [], isSuperAdmin = false }: { permissions?: string[]; isSuperAdmin?: boolean }) {
  const pathname = usePathname();
  const visible = navGroups.filter(item => item.label === 'Overview' || isSuperAdmin || permissions.includes(item.permission));
  const visibleByLabel = new Map<string, (typeof navGroups)[number]>(visible.map(item => [item.label, item]));

  return <aside className="sidebar">
    <Brand />
    <div className="sidebarSearch"><Search size={15} /><Link href="/search">Search everything</Link><kbd>⌘K</kbd></div>
    <nav aria-label="Business navigation" className="sidebarGroups">
      {groups.map(group => {
        const items = group.items.map(label => visibleByLabel.get(label)).filter((item): item is (typeof navGroups)[number] => Boolean(item));
        if (!items.length) return null;
        return <div className="sidebarGroup" key={group.label}>
          <span className="sidebarGroupLabel">{group.label}</span>
          {items.map(item => {
            const Icon = icons[item.label] ?? Building2;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <Link key={item.href} className={active ? 'active' : ''} href={item.href}><Icon size={17} strokeWidth={active ? 2.2 : 1.8} /><span>{item.label}</span>{active && <i />}</Link>;
          })}
        </div>;
      })}
    </nav>
    <div className="sidebarFoot"><strong>Amaal Business</strong><span>Operational workspace</span><small>Advanced administration remains separate.</small></div>
  </aside>;
}
