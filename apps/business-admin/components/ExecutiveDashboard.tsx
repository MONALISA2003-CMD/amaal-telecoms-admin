'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  PackageCheck,
  ShoppingCart,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type AnyRecord = Record<string, any>;

type Props = {
  dashboard: AnyRecord;
  bi: AnyRecord | null;
  sales: AnyRecord | null;
  inventory: AnyRecord | null;
  orders: AnyRecord | null;
  customers: AnyRecord | null;
  procurement: AnyRecord | null;
  permissions: string[];
};

const chartPalette = ['#c7a24a', '#24324a', '#718096', '#b47f2f', '#9aa7b8', '#d8c58f'];

function num(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function money(value: unknown) {
  const n = num(value);
  if (n === null) return '—';
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);
}

function integer(value: unknown) {
  const n = num(value);
  return n === null ? '—' : n.toLocaleString('en-UG', { maximumFractionDigits: 0 });
}

function trendRows(source: AnyRecord | null) {
  const raw = source?.trend ?? source?.sales?.trend ?? source?.analytics?.trend ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item: AnyRecord) => ({
    label: String(item.date ?? item.day ?? item.label ?? '').slice(0, 10),
    value: num(item.sales ?? item.revenue ?? item.amount) ?? 0,
  }));
}

function paymentRows(source: AnyRecord | null) {
  const raw = source?.byPayment ?? source?.payments ?? source?.sales?.byPayment ?? source?.sales?.payments ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item: AnyRecord) => ({
    name: String(item.method ?? item.name ?? 'Other'),
    value: num(item.amount ?? item.value ?? item.total) ?? 0,
  })).filter((item: { value: number }) => item.value > 0);
}

function productRows(source: AnyRecord | null) {
  const raw = source?.byProduct ?? source?.products ?? source?.sales?.byProduct ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 6).map((item: AnyRecord) => ({
    name: String(item.product ?? item.name ?? item.sku ?? 'Product').slice(0, 18),
    value: num(item.sales ?? item.revenue ?? item.amount) ?? 0,
  }));
}

function Delta({ value }: { value: unknown }) {
  const n = num(value);
  if (n === null) return null;
  const positive = n >= 0;
  return <span className={`kpiDelta ${positive ? 'positive' : 'negative'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{Math.abs(n).toFixed(1)}%</span>;
}

function Kpi({ icon: Icon, label, value, note, delta, href, featured = false }: { icon: typeof CircleDollarSign; label: string; value: string; note: string; delta?: unknown; href: string; featured?: boolean }) {
  return <Link href={href} className={`kpiCard ${featured ? 'featured' : ''}`}>
    <div className="kpiTop"><span className="kpiIcon"><Icon size={18} /></span>{delta != null && <Delta value={delta} />}<ChevronRight className="kpiChevron" size={17} /></div>
    <span className="kpiLabel">{label}</span>
    <strong>{value}</strong>
    <small>{note}</small>
  </Link>;
}

export function ExecutiveDashboard({ dashboard, bi, sales, inventory, orders, customers, procurement, permissions }: Props) {
  const trend = trendRows(sales ?? bi);
  const payments = paymentRows(sales ?? bi);
  const products = productRows(sales ?? bi);
  const revenue = bi?.sales?.revenue ?? bi?.sales?.total ?? sales?.today?.total;
  const grossProfit = bi?.margin?.gross_margin ?? bi?.grossProfit;
  const openOrdersValues = [orders?.pending, orders?.processing, orders?.dispatched].map(num);
  const openOrders = openOrdersValues.every((v) => v !== null) ? openOrdersValues.reduce((a, b) => a + (b ?? 0), 0) : null;
  const unread = num(dashboard?.unreadNotifications);
  const marginPct = bi?.grossMarginPct ?? bi?.margin?.gross_margin_pct;
  const canSales = permissions.includes('sales.view');
  const canProducts = permissions.includes('catalog.view');
  const canStock = permissions.includes('inventory.view');
  const canCustomers = permissions.includes('customers.view');
  const canOrders = permissions.includes('orders.view');

  return <div className="executiveDashboard">
    <section className="dashboardHero">
      <div>
        <div className="eyebrowRow"><span className="eyebrow">Executive command centre</span><span className="liveDot"><i /> Engine connected</span></div>
        <h2>Good business starts with clarity.</h2>
        <p>One operational view across revenue, customers, inventory and fulfilment — using the same trusted business records.</p>
      </div>
      <div className="dashboardHeroActions"><span className="periodControl">This period <strong>{bi?.range?.label ?? bi?.period ?? 'Current'}</strong></span><Link className="goldAction" href="/search">Global search</Link></div>
    </section>

    <section className="kpiGrid" aria-label="Executive KPIs">
      {canSales && <Kpi icon={CircleDollarSign} label="Revenue" value={money(revenue)} note="Authoritative sales / BI data" delta={bi?.sales?.changePct ?? bi?.revenueChangePct} href="/sales" featured />}
      <Kpi icon={Banknote} label="Gross profit" value={money(grossProfit)} note={marginPct == null ? 'Finance data when available' : `${Number(marginPct).toFixed(1)}% gross margin`} href="/finance" />
      {canOrders && <Kpi icon={ShoppingCart} label="Open orders" value={integer(openOrders)} note="Pending through dispatch" href="/orders" />}
      {canStock && <Kpi icon={Boxes} label="Low-stock lines" value={integer(inventory?.lowStock)} note="Replenishment pressure" href="/stock" />}
    </section>

    <div className="dashboardGrid dashboardGridTop">
      <section className="panel dashboardPanel trendPanel">
        <div className="panelHeading"><div><h3>Revenue performance</h3><p>Trend from the existing business-intelligence / sales analytics contract.</p></div><Link className="textAction" href="/reports">Open reports</Link></div>
        <div className="executiveChart">
          {trend.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c7a24a" stopOpacity={0.25} /><stop offset="100%" stopColor="#c7a24a" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="#e9e5dc" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} /><Tooltip formatter={(value) => money(value)} /><Area type="monotone" dataKey="value" stroke="#b88f28" strokeWidth={2.5} fill="url(#revenueFill)" /></AreaChart></ResponsiveContainer> : <ChartEmpty title="Revenue trend unavailable" text="The current role or API contract does not expose a trend for this period." />}
        </div>
      </section>

      <section className="panel dashboardPanel attentionPanel">
        <div className="panelHeading"><div><h3>Attention centre</h3><p>Issues worth acting on now.</p></div><span className="attentionCount">{unread === null ? '—' : integer(unread)} alerts</span></div>
        <div className="attentionStack">
          {canStock && <Attention icon={Boxes} title="Low stock" value={integer(inventory?.lowStock)} text="Stock lines need replenishment review." href="/stock" />}
          {canCustomers && <Attention icon={CreditCard} title="Customer balances" value={money(customers?.outstandingBalance)} text="Outstanding customer balance." href="/customers" />}
          {permissions.includes('procurement.view') && <Attention icon={Clock3} title="Purchasing" value={integer(procurement?.pendingRequisitions)} text="Requests waiting for procurement action." href="/purchasing" />}
          {canOrders && <Attention icon={PackageCheck} title="Fulfilment" value={integer(openOrders)} text="Orders moving through the fulfilment pipeline." href="/orders" />}
        </div>
      </section>
    </div>

    <div className="dashboardGrid dashboardGridCharts">
      <section className="panel dashboardPanel">
        <div className="panelHeading"><div><h3>Sales composition</h3><p>Payment mix for the available analytics period.</p></div></div>
        <div className="donutLayout">{payments.length ? <div className="donutChart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={payments} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="80%" paddingAngle={3}>{payments.map((_, i) => <Cell key={i} fill={chartPalette[i % chartPalette.length]} />)}</Pie><Tooltip formatter={(value) => money(value)} /></PieChart></ResponsiveContainer></div> : <ChartEmpty title="Composition unavailable" text="No payment breakdown is exposed for the current view." />}<div className="legendList executiveLegend">{payments.slice(0, 5).map((item, i) => <div key={item.name}><span><i style={{ background: chartPalette[i % chartPalette.length] }} />{item.name}</span><strong>{money(item.value)}</strong></div>)}</div></div>
      </section>

      <section className="panel dashboardPanel">
        <div className="panelHeading"><div><h3>Top products</h3><p>Sales contribution, not inventory quantity.</p></div>{canProducts && <Link className="textAction" href="/products">Catalogue</Link>}</div>
        <div className="executiveBarChart">{products.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={products} layout="vertical" margin={{ top: 0, right: 10, left: 5, bottom: 0 }}><CartesianGrid stroke="#e9e5dc" strokeDasharray="3 3" horizontal={false} /><XAxis type="number" hide /><YAxis dataKey="name" type="category" width={92} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} /><Tooltip formatter={(value) => money(value)} /><Bar dataKey="value" fill="#24324a" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer> : <ChartEmpty title="Product ranking unavailable" text="The current analytics response does not contain product contribution data." />}</div>
      </section>
    </div>

    <section className="actionStrip">
      <div><span className="eyebrow">Move from insight to action</span><strong>Common operational destinations</strong></div>
      <div className="actionLinks">
        {canSales && <Link href="/sales"><ShoppingCart size={16} /> Sales</Link>}
        {canStock && <Link href="/stock"><Boxes size={16} /> Stock</Link>}
        {canCustomers && <Link href="/customers"><Users size={16} /> Customers</Link>}
        {canOrders && <Link href="/orders"><PackageCheck size={16} /> Orders</Link>}
      </div>
    </section>
  </div>;
}

function Attention({ icon: Icon, title, value, text, href }: { icon: typeof Boxes; title: string; value: string; text: string; href: string }) {
  return <Link className="attentionRow" href={href}><span className="attentionIcon"><Icon size={17} /></span><span className="attentionCopy"><strong>{title}</strong><small>{text}</small></span><b>{value}</b><ChevronRight size={16} /></Link>;
}

function ChartEmpty({ title, text }: { title: string; text: string }) {
  return <div className="chartEmpty"><AlertTriangle size={19} /><strong>{title}</strong><span>{text}</span></div>;
}
