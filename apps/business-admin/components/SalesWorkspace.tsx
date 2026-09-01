'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type SalesSummary = {
  today?: { total?: number | string; count?: number | string };
  openDrafts?: number | string;
  unitsToday?: number | string;
  payments?: { method?: string; amount?: number | string }[];
  range?: { start?: string; end?: string };
};

export type SalesAnalytics = {
  days?: number;
  trend?: { date: string; sales: number | string; transactions: number | string; discounts: number | string }[];
  byCashier?: { cashier: string; sales: number | string; transactions: number | string }[];
  byProduct?: { product: string; sku: string; units: number | string; sales: number | string; cogs: number | string }[];
  byPayment?: { method: string; amount: number | string }[];
  discounts?: { amount?: number | string; average?: number | string };
};

type Sale = {
  id: string;
  sale_no: string;
  status: string;
  grand_total: number | string;
  created_at: string;
  customer_name?: string;
  location_name?: string;
  cashier_email?: string;
  line_count?: number | string;
  units?: number | string;
};

type Quote = {
  id: string;
  quote_no: string;
  status: string;
  grand_total: number | string;
  customer_name?: string;
  valid_until?: string;
  line_count?: number | string;
};

function num(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function money(value: unknown) {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);
}

function shortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-UG', { day: '2-digit', month: 'short' }).format(date);
}

function dateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-UG', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(date);
}

const chartColors = ['#c6a24a', '#1e293b', '#7c8a9b', '#b07b35', '#5b6b82', '#d6c18a'];

export function SalesWorkspace({
  summary,
  analytics,
  sales,
  quotes,
  canQuoteApprove,
  canQuoteManage,
}: {
  summary: SalesSummary | null;
  analytics: SalesAnalytics | null;
  sales: Sale[];
  quotes: Quote[];
  canQuoteApprove: boolean;
  canQuoteManage: boolean;
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [quoteBusy, setQuoteBusy] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const filteredSales = useMemo(() => sales.filter((sale) => {
    const matchesQuery = !query || [sale.sale_no, sale.customer_name, sale.location_name, sale.cashier_email]
      .filter(Boolean).some((value) => String(value).toLowerCase().includes(query.toLowerCase()));
    const matchesStatus = status === 'All' || sale.status === status;
    return matchesQuery && matchesStatus;
  }), [sales, query, status]);

  const trend = (analytics?.trend ?? []).map((item) => ({
    date: shortDate(item.date),
    sales: num(item.sales),
    transactions: num(item.transactions),
  }));
  const paymentMix = (analytics?.byPayment ?? summary?.payments ?? []).map((item) => ({
    name: String(item.method ?? 'Other'),
    value: num(item.amount),
  }));
  const topProducts = (analytics?.byProduct ?? []).slice(0, 7).map((item) => ({
    name: String(item.product ?? item.sku ?? 'Product').slice(0, 20),
    sales: num(item.sales),
  }));
  const cashiers = (analytics?.byCashier ?? []).slice(0, 7).map((item) => ({
    name: String(item.cashier ?? 'Staff').split('@')[0].slice(0, 16),
    sales: num(item.sales),
  }));

  async function quoteAction(id: string, action: 'approve' | 'cancel') {
    setQuoteBusy(id);
    setMessage('');
    try {
      const response = await fetch(`/api/sales/quotes/${id}/${action}`, { method: 'POST' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'The quote action could not be completed.');
      setMessage(`Quote ${action === 'approve' ? 'approved' : 'cancelled'} successfully. Refresh the page to see the latest status.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'The quote action could not be completed.');
    } finally {
      setQuoteBusy(null);
    }
  }

  return (
    <div className="salesWorkspace">
      <section className="workspaceHero">
        <div>
          <span className="eyebrow">Revenue workspace</span>
          <h2>Sales</h2>
          <p>See performance, investigate transactions and move from insight to action without leaving the business workspace.</p>
        </div>
        <div className="heroActions">
          <Link className="goldAction" href="/sales/pos">Open POS</Link>
          <Link className="softAction" href="/sales/pos">New sale</Link>
        </div>
      </section>

      {message && <div className="inlineMessage" role="status">{message}</div>}

      <section className="metrics salesMetrics">
        <article className="metric metricFeatured"><span>Sales value</span><strong>{money(summary?.today?.total)}</strong><small>{summary?.range?.start ?? 'Current'} to {summary?.range?.end ?? 'today'}</small></article>
        <article className="metric"><span>Transactions</span><strong>{summary?.today?.count == null ? '—' : Number(summary.today.count).toLocaleString('en-UG')}</strong><small>Completed and paid sales</small></article>
        <article className="metric"><span>Units sold</span><strong>{summary?.unitsToday == null ? '—' : Number(summary.unitsToday).toLocaleString('en-UG')}</strong><small>Across the selected range</small></article>
        <article className="metric"><span>Draft sales</span><strong>{summary?.openDrafts == null ? '—' : Number(summary.openDrafts).toLocaleString('en-UG')}</strong><small>Awaiting completion</small></article>
      </section>

      <div className="chartGrid">
        <section className="panel chartPanel chartWide">
          <div className="panelHeading"><div><h3>Sales performance</h3><p>Daily revenue over the current analytics window.</p></div><span className="chartBadge">{analytics?.days ?? 30} days</span></div>
          <div className="chartBox">
            {trend.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e9e4d8" vertical={false} /><XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} /><Tooltip formatter={(value) => money(value)} /><Line type="monotone" dataKey="sales" stroke="#b99020" strokeWidth={3} dot={false} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer> : <ChartEmpty label="Sales trend is unavailable for this role or period." />}
          </div>
        </section>

        <section className="panel chartPanel">
          <div className="panelHeading"><div><h3>Payment mix</h3><p>How customers are paying.</p></div></div>
          <div className="chartBox chartDonut">
            {paymentMix.length ? <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={paymentMix} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="78%" paddingAngle={3}>{paymentMix.map((_, index) => <Cell key={index} fill={chartColors[index % chartColors.length]} />)}</Pie><Tooltip formatter={(value) => money(value)} /></PieChart></ResponsiveContainer> : <ChartEmpty label="Payment mix is unavailable." />}
          </div>
          <div className="legendList">{paymentMix.slice(0, 5).map((item, index) => <div key={item.name}><span><i style={{ background: chartColors[index % chartColors.length] }} />{item.name}</span><strong>{money(item.value)}</strong></div>)}</div>
        </section>

        <section className="panel chartPanel">
          <div className="panelHeading"><div><h3>Top products</h3><p>Products contributing the most sales value.</p></div></div>
          <div className="chartBox barChart">{topProducts.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e9e4d8" horizontal={false} /><XAxis type="number" hide /><YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} /><Tooltip formatter={(value) => money(value)} /><Bar dataKey="sales" fill="#1e293b" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer> : <ChartEmpty label="Product analytics is unavailable." />}</div>
        </section>

        <section className="panel chartPanel">
          <div className="panelHeading"><div><h3>Cashier performance</h3><p>Sales value by cashier for the selected period.</p></div></div>
          <div className="chartBox">{cashiers.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={cashiers} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e9e4d8" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} /><Tooltip formatter={(value) => money(value)} /><Bar dataKey="sales" fill="#b07b35" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer> : <ChartEmpty label="Cashier analytics is unavailable." />}</div>
        </section>
      </div>

      <section className="panel salesHistoryPanel">
        <div className="panelHeading historyHeading"><div><h3>Sales history</h3><p>Recent transactions from the official sales records.</p></div><Link className="textAction" href="/sales">Refresh</Link></div>
        <div className="filterBar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sale, customer, location or cashier" aria-label="Search sales" /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter sales status"><option>All</option>{Array.from(new Set(sales.map((sale) => sale.status))).map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="tableWrap"><table><thead><tr><th>Sale</th><th>Customer</th><th>Status</th><th>Amount</th><th>Units</th><th>Location</th><th>When</th></tr></thead><tbody>{filteredSales.length ? filteredSales.map((sale) => <tr key={sale.id}><td><Link className="tableLink" href={`/sales/${sale.id}`}>{sale.sale_no}</Link></td><td>{sale.customer_name || 'Walk-in customer'}</td><td><span className={`status status-${sale.status.toLowerCase().replace(/\s+/g, '-')}`}>{sale.status}</span></td><td>{money(sale.grand_total)}</td><td>{sale.units == null ? '—' : sale.units}</td><td>{sale.location_name || '—'}</td><td>{dateTime(sale.created_at)}</td></tr>) : <tr><td colSpan={7}><div className="emptyState">No sales match this filter.</div></td></tr>}</tbody></table></div>
      </section>

      <section className="panel salesHistoryPanel">
        <div className="panelHeading historyHeading"><div><h3>Quotes & approvals</h3><p>Quote workflow uses the existing sales approval rules and permissions.</p></div><span className="chartBadge">{quotes.length} visible</span></div>
        {quotes.length ? <div className="tableWrap"><table><thead><tr><th>Quote</th><th>Customer</th><th>Status</th><th>Total</th><th>Valid until</th><th>Lines</th><th>Actions</th></tr></thead><tbody>{quotes.slice(0, 30).map((quote) => <tr key={quote.id}><td>{quote.quote_no}</td><td>{quote.customer_name || 'Walk-in customer'}</td><td><span className="status">{quote.status}</span></td><td>{money(quote.grand_total)}</td><td>{quote.valid_until ? shortDate(quote.valid_until) : '—'}</td><td>{quote.line_count ?? '—'}</td><td className="rowActions">{canQuoteApprove && ['Draft', 'Pending Approval'].includes(quote.status) && <button disabled={quoteBusy === quote.id} onClick={() => quoteAction(quote.id, 'approve')}>{quoteBusy === quote.id ? 'Working…' : 'Approve'}</button>}{canQuoteManage && !['Converted', 'Cancelled'].includes(quote.status) && <button className="dangerAction" disabled={quoteBusy === quote.id} onClick={() => quoteAction(quote.id, 'cancel')}>Cancel</button>}</td></tr>)}</tbody></table></div> : <div className="emptyState">Quotes are not available for the current role, or no quotes have been created.</div>}
      </section>
    </div>
  );
}

function ChartEmpty({ label }: { label: string }) {
  return <div className="chartEmpty"><strong>No chart data</strong><span>{label}</span></div>;
}
