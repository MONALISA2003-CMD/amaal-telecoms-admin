'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, Boxes, CircleDollarSign, ClipboardList, Globe2, LifeBuoy, RefreshCw, ShoppingCart, Truck, Users, WalletCards } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Any = Record<string, any>;

const money = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n) : '—';
};
const number = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(n) : '—';
};

async function get(path: string) {
  const response = await fetch(path, { cache: 'no-store', headers: { Accept: 'application/json' } });
  const text = await response.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  if (!response.ok) throw new Error(data?.error || 'Live business data is temporarily unavailable.');
  return data;
}

async function getFallback() {
  const [sales, inventory, orders, customers] = await Promise.allSettled([
    get('/api/sales/summary'),
    get('/api/inventory/summary'),
    get('/api/orders/summary'),
    get('/api/customers/summary'),
  ]);
  const value = (r: PromiseSettledResult<any>) => r.status === 'fulfilled' ? r.value : null;
  const s = value(sales), i = value(inventory), o = value(orders), c = value(customers);
  if (!s && !i && !o && !c) throw new Error('Live business data is reconnecting.');
  return {
    sales: { revenue: s?.today?.total ?? s?.month?.total ?? 0 },
    orders: { total: o?.total ?? 0, open: (Number(o?.pending ?? 0) + Number(o?.paid ?? 0) + Number(o?.processing ?? 0) + Number(o?.dispatched ?? 0)) },
    inventory: { units: i?.onHand ?? 0, variants: i?.stockedSkus ?? 0 },
    customers: { total: c?.customers ?? 0, acquired: c?.new30d ?? 0 },
    purchasing: { open_orders: 0, committed_value: 0 },
    delivery: { active_shipments: 0, delivered: 0 },
    service: { warranty_open: 0, returns_open: 0, repairs_open: 0 },
    finance: { net_activity: 0 },
    credit: { outstanding: 0, accounts: 0 },
    website: { active_sites: 0, published_pages: 0, published_products: 0 },
    margin: { gross_margin: 0 },
    grossMarginPct: 0,
    trend: [],
    dataHealth: { complete: false, partial: true, failedSections: ['bi-summary'] },
  };
}

export function LiveBusinessPulse() {
  const [summary, setSummary] = useState<Any | null>(null);
  const [trend, setTrend] = useState<Any[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const [partial, setPartial] = useState(false); const [feed,setFeed]=useState<Any[]>([]);

  async function loadFeed(){try{const d=await get('/api/commerce/live-feed');setFeed(Array.isArray(d?.events)?d.events:[])}catch{}}

  async function load() {
    try {
      const live = await get('/api/bi/live-pulse');
      setSummary(live || null);
      setTrend(Array.isArray(live?.trend) ? live.trend : []);
      setUpdatedAt(new Date());
      setPartial(Boolean(live?.dataHealth?.partial));
      setError('');
    } catch {
      try {
        const fallback = await getFallback();
        setSummary(fallback);
        setTrend([]);
        setUpdatedAt(new Date());
        setPartial(true);
        setError('Some live figures are temporarily unavailable. Showing the latest available business records.');
      } catch (e: any) {
        setPartial(true);
        setError(e?.message || 'Live business data is reconnecting.');
      }
    }
  }

  useEffect(() => {
    let active = true;
    const run = async () => { if (active && document.visibilityState !== 'hidden') { await Promise.all([load(),loadFeed()]); } };
    run();
    const timer = window.setInterval(run, 5000);
    const onVisible = () => { if (document.visibilityState === 'visible') run(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { active = false; window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, []);

  const chartData = useMemo(() => trend.slice(-14).map((x: Any) => ({
    day: String(x.day || '').slice(5),
    revenue: Number(x.revenue || 0),
  })), [trend]);

  return <section className="livePulse" aria-label="Live business pulse">
    <div className="livePulseHead">
      <div><span className="eyebrow"><Activity size={12} /> Live business pulse</span><strong>Updates automatically</strong></div>
      <div className="livePulseMeta"><span><i /> Connected to current business records</span>{partial && <span>Some figures are temporarily unavailable</span>}{updatedAt && <span>Updated {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}<button onClick={load} title="Refresh now"><RefreshCw size={13} /></button></div>
    </div>
    <div className="livePulseGrid">
      <div className="livePulseChart"><div className="livePulseLabel"><span>Revenue movement</span><b>{money(summary?.sales?.revenue)}</b></div><div className="livePulseChartBox">{chartData.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><XAxis dataKey="day" hide /><YAxis hide /><Tooltip formatter={(value) => money(value)} /><Area dataKey="revenue" type="monotone" stroke="#b89032" fill="#b89032" fillOpacity={0.10} strokeWidth={2} /></AreaChart></ResponsiveContainer> : <span>No completed sales yet</span>}</div></div>
      <Pulse icon={ShoppingCart} label="Orders" value={number(summary?.orders?.total)} note={`${number(summary?.orders?.open)} open`} />
      <Pulse icon={Boxes} label="Stock" value={number(summary?.inventory?.units)} note={`${number(summary?.inventory?.variants)} product lines`} />
      <Pulse icon={Users} label="Customers" value={number(summary?.customers?.total)} note={`${number(summary?.customers?.acquired)} added in period`} />
      <Pulse icon={CircleDollarSign} label="Gross margin" value={`${Number(summary?.grossMarginPct || 0).toFixed(1)}%`} note={money(summary?.margin?.gross_margin)} />
      <Pulse icon={ClipboardList} label="Purchasing" value={number(summary?.purchasing?.open_orders)} note={`${money(summary?.purchasing?.committed_value)} committed`} />
      <Pulse icon={Truck} label="Delivery" value={number(summary?.delivery?.active_shipments)} note={`${number(summary?.delivery?.delivered)} delivered`} />
      <Pulse icon={LifeBuoy} label="Service" value={number(Number(summary?.service?.warranty_open || 0) + Number(summary?.service?.returns_open || 0) + Number(summary?.service?.repairs_open || 0))} note={`${number(summary?.service?.warranty_open)} warranty · ${number(summary?.service?.returns_open)} returns`} />
      <Pulse icon={WalletCards} label="Finance" value={money(summary?.finance?.net_activity)} note="Posted activity" />
      <Pulse icon={WalletCards} label="Credit" value={money(summary?.credit?.outstanding)} note={`${number(summary?.credit?.accounts)} active accounts`} />
      <Pulse icon={Globe2} label="Website" value={number(summary?.website?.published_products)} note={`${number(summary?.website?.published_pages)} published pages`} />
    </div>{feed.length>0&&<div className="livePulseFeed"><div className="livePulseLabel"><span>Latest storefront activity</span><b>Live</b></div><div className="livePulseFeedRows">{feed.slice(0,8).map((e:any)=><div className="livePulseFeedRow" key={e.id}><span>{String(e.event_type||'activity').replaceAll('_',' ')}</span><strong>{e.product_name||e.order_no||e.customer_name||'Storefront activity'}</strong><small>{new Date(e.created_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</small></div>)}</div></div>}{error && <div className="livePulseError">{error}</div>}
  </section>;
}

function Pulse({ icon: Icon, label, value, note }: { icon: any; label: string; value: string; note: string }) {
  return <div className="livePulseMetric"><span><Icon size={15} /></span><div><small>{label}</small><strong>{value}</strong><em>{note}</em></div></div>;
}
