import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MetricCard } from '@/components/MetricCard';
import { businessGetSafe, money, number } from '@/lib/business';

const quickActions = [
  ['sales.view', '/sales', 'Open Sales'],
  ['catalog.view', '/products', 'Manage Products'],
  ['inventory.view', '/stock', 'Check Stock'],
  ['orders.view', '/orders', 'View Orders'],
  ['customers.view', '/customers', 'Customers'],
  ['bi.view', '/reports', 'Reports'],
] as const;

type Me = { permissions?: string[] };

export default async function Overview() {
  const dashboard = await businessGetSafe<any>('/api/dashboard');
  if (!dashboard) redirect('/login');

  const [bi, sales, inventory, orders, customers, procurement, me] = await Promise.all([
    businessGetSafe<any>('/api/bi/summary'),
    businessGetSafe<any>('/api/sales/summary'),
    businessGetSafe<any>('/api/inventory/summary'),
    businessGetSafe<any>('/api/orders/summary'),
    businessGetSafe<any>('/api/customers/summary'),
    businessGetSafe<any>('/api/procurement/summary'),
    businessGetSafe<Me>('/api/me'),
  ]);

  const fmtNumber = (value: unknown) => number(value);
  const fmtMoney = (value: unknown) => money(value);
  const revenue = bi?.sales?.revenue ?? sales?.today?.total;
  const margin = bi?.margin?.gross_margin;
  const openOrderValues = [orders?.pending, orders?.processing, orders?.dispatched];
  const openOrders = openOrderValues.every((value) => value != null && Number.isFinite(Number(value)))
    ? openOrderValues.reduce((sum, value) => sum + Number(value), 0)
    : null;
  const visibleActions = quickActions.filter(([permission]) => me?.permissions?.includes(permission));

  return (
    <div className="workspace">
      <section className="welcome">
        <div>
          <span className="eyebrow">Executive experience</span>
          <h2>Business overview</h2>
          <p>One business view over the same sales, stock, customer, procurement and order data used by the existing engine.</p>
        </div>
      </section>

      <section className="metrics">
        <MetricCard label="Revenue" value={fmtMoney(revenue)} note="Current BI/reporting range" />
        <MetricCard label="Gross profit" value={fmtMoney(margin)} note="Authoritative finance/BI data" />
        <MetricCard label="Low-stock lines" value={fmtNumber(inventory?.lowStock)} note="Needs replenishment review" />
        <MetricCard label="Open orders" value={fmtNumber(openOrders)} note="Pending through dispatch" />
      </section>

      <div className="grid">
        <section className="panel">
          <div className="panelHeading"><div><h3>Business pulse</h3><p>Live summary values; unavailable modules are shown as unavailable rather than invented.</p></div></div>
          <div className="pulseGrid">
            <div><span>Customers</span><strong>{fmtNumber(customers?.customers)}</strong><small>{fmtNumber(customers?.new30d)} new in 30 days</small></div>
            <div><span>Purchase orders</span><strong>{fmtNumber(procurement?.openPurchaseOrders)}</strong><small>{fmtNumber(procurement?.pendingRequisitions)} requests awaiting action</small></div>
            <div><span>Stock units</span><strong>{fmtNumber(inventory?.onHand)}</strong><small>{fmtNumber(inventory?.reserved)} reserved</small></div>
            <div><span>Month order revenue</span><strong>{fmtMoney(orders?.monthRevenue)}</strong><small>{fmtNumber(orders?.delivered)} delivered</small></div>
          </div>
        </section>

        <section className="attention">
          <h3>Needs attention</h3>
          <div className="attentionList">
            <div className="attentionItem"><div><strong>Low stock</strong><br /><span>{fmtNumber(inventory?.lowStock)} stock lines are at or below the default threshold.</span></div><span className="pill">Stock</span></div>
            <div className="attentionItem"><div><strong>Customer balances</strong><br /><span>{fmtMoney(customers?.outstandingBalance)} outstanding across customer balances.</span></div><span className="pill">Finance</span></div>
            <div className="attentionItem"><div><strong>Procurement</strong><br /><span>{fmtNumber(procurement?.pendingRequisitions)} purchase requests are pending.</span></div><span className="pill">Purchasing</span></div>
            <div className="attentionItem"><div><strong>Notifications</strong><br /><span>{fmtNumber(dashboard.unreadNotifications)} unread business notifications.</span></div><span className="pill">Review</span></div>
          </div>
        </section>
      </div>

      {visibleActions.length > 0 && (
        <section className="panel quickPanel">
          <div className="panelHeading"><div><h3>Quick actions</h3><p>Only actions available to your current backend permissions are shown.</p></div></div>
          <div className="quick">
            {visibleActions.map(([, href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
        </section>
      )}
    </div>
  );
}
